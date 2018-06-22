exports.ids=[9],exports.modules={312:function(s,n,a){"use strict";Object.defineProperty(n,"__esModule",{value:!0});n.content='<h2 id="h2-1"><span style="font-family:微软雅黑,microsoft yahei">调用堆栈</span></h2>\n<p><em>&nbsp;&nbsp;&nbsp;&nbsp;io.vertx.ext.mongo.impl.MongoClientImpl；</em></p>\n<p><em>&nbsp;&nbsp;&nbsp;&nbsp;io.vertx.ext.mongo.impl.MongoHolder;</em></p>\n<p><em>&nbsp;&nbsp;&nbsp;&nbsp;io.vertx.ext.mongo.impl.config.MongoClientOptionsParser;</em></p>\n\n<h2 id="h2-2">实现过程</h2>\n<p>当调用<em>MongoClient::createShared()</em>或<em>MongoClient::createNonShared()</em>方法创建<em>mongo</em>的客户端时，最终都会调用到<em>MongoClientImpl</em>的构造函数。</p>\n<pre class="kotlin"><code class="language-java"> <span class="hljs-function"><span class="code-keyword"><span class="code-keyword">public</span></span> <span class="code-title">MongoClientImpl</span><span class="hljs-params">(Vertx vertx, JsonObject config, String dataSourceName)</span> </span>{\n    Objects.requireNonNull(vertx);\n    Objects.requireNonNull(config);\n    Objects.requireNonNull(dataSourceName);\n    <span class="code-keyword"><span class="code-keyword">this</span></span>.vertx = vertx;\n    <span class="code-comment"><span class="code-comment">// 检查或创建新的MongHolder</span></span>\n    <span class="code-keyword"><span class="code-keyword">this</span></span>.holder = lookupHolder(dataSourceName, config);\n    <span class="code-keyword"><span class="code-keyword">this</span></span>.mongo = holder.mongo();\n    <span class="code-keyword"><span class="code-keyword">this</span></span>.useObjectId = config.getBoolean(<span class="code-string"><span class="code-string">"useObjectId"</span></span>, <span class="code-keyword"><span class="hljs-literal">false</span></span>);\n  }</code></pre>\n<p>如果是通过<em>createNonShared</em>方法创建client时，这里传入的<em>dataSourceName</em>是一个UUID。当使用<em>createShared</em>创建<em>client</em>,会在<em>lookupHolder</em>方法中检查是否已经创建了同名的客户端，否则新建。</p>\n<p>下图是检查数据源的过程。会根据传入的&nbsp;<em>datasourceName </em>从 <em>vertx </em>实例的共享数据实例（<em>io.vertx.core.shareddata.SharedData</em>）中获取同名的 <em>MongoHolder </em>实例。</p>\n<pre class="cpp"><code class="language-java"> <span class="hljs-function"><span class="code-keyword"><span class="hljs-function"><span class="code-keyword">private</span></span></span><span class="hljs-function"> MongoHolder </span><span class="code-title"><span class="hljs-function"><span class="code-title">lookupHolder</span></span></span><span class="hljs-params"><span class="hljs-function"><span class="hljs-params">(String datasourceName, JsonObject config)</span></span></span><span class="hljs-function"> </span></span>{\n    <span class="code-keyword">synchronized</span> (vertx) {\n      <span class="code-comment"><span class="code-comment">// 获取共享数据实例中的map</span></span>\n      LocalMap&lt;String, MongoHolder&gt; <span class="code-built_in">map</span> = vertx.sharedData().getLocalMap(DS_LOCAL_MAP_NAME);\n\n      <span class="code-comment"><span class="code-comment">// 检查datasourceName对应的MongoHolder 是否存在</span></span>\n      MongoHolder theHolder = <span class="code-built_in">map</span>.get(datasourceName);\n\n      <span class="code-comment"><span class="code-comment">// 不存在则新构建，并将构建的结果放入sharedData的map中</span></span>\n      <span class="code-keyword"><span class="code-keyword">if</span></span> (theHolder == <span class="code-keyword">null</span>) {\n        theHolder = <span class="code-keyword"><span class="code-keyword">new</span></span> MongoHolder(config, () -&gt; removeFromMap(<span class="code-built_in">map</span>, datasourceName));\n        <span class="code-built_in">map</span>.put(datasourceName, theHolder);\n      } <span class="code-keyword"><span class="code-keyword">else</span></span> {\n        <span class="code-comment"><span class="code-comment">// 递增被引用的计数</span></span>\n        theHolder.incRefCount();\n      }\n      <span class="code-keyword"><span class="code-keyword">return</span></span> theHolder;\n    }\n  }</code></pre>\n<p>如果实例不存在，则会创建新的&nbsp;<em>MongoHolder </em>实例。<span style="color:#FF8C00">个人认为这里有个很不完美的地方是为了解决懒汉模式的问题，增加了一个线程锁。在高并发请求数据库连接资源时，这里会有阻塞。因此我在自己的实现类中存储了MongoClient的实例。不过这个线程锁可以有效减少数据库连接池的爆发式增长，在数据库连接池资源较少的情况下，有不错的效果（比如我们某个项目使用了阿里云的mongDB，最低配置只有200个连接）</span>。</p>\n<p>下图是&nbsp;<em>MongoHolder </em>的构造方法。</p>\n<pre class="kotlin"><code class="language-java"><span class="hljs-function"><span class="code-keyword"><span class="code-keyword">public</span></span> <span class="code-title">MongoHolder</span><span class="hljs-params">(JsonObject config, Runnable closeRunner)</span> </span>{\n      <span class="code-keyword"><span class="code-keyword">this</span></span>.config = config;\n      <span class="code-keyword"><span class="code-keyword">this</span></span>.closeRunner = closeRunner;\n    }</code></pre>\n<p><em>&nbsp;&nbsp;&nbsp;&nbsp;MongoHolder&nbsp;</em>构造方法只是简单的设置了成员变量 <em>config&nbsp;</em>和 <em>closeRunner </em>的值。<em>closeRunner</em>当调用<em>MongoClient::close()</em>方法时，用于回调销毁<em>SharedData::localMap</em>中的对应索引数据。<em>config </em>是用户传入的配置参数，需要注意的是，<em>config </em>传递到这里一直没有被改变。</p>\n<p>创建&nbsp;<em>MongoHolder&nbsp;</em>的实例成功后，接下来会调用&nbsp;<em>MongoHolder::mongo() </em>来创建一个真正&nbsp;<em>com.mongodb.async.client.MongoClient</em> 实例。这里同样使用了懒汉模式，存在线程锁，如果MongoClient的实例存在直接返回，如果不存在，则新建一个实例。</p>\n<pre class="java"><code class="language-java"><span class="code-keyword"><span class="code-keyword">synchronized</span></span> com.mongodb.async.client.<span class="hljs-function"><span class="hljs-function">MongoClient </span><span class="code-title"><span class="hljs-function"><span class="code-title">mongo</span></span></span><span class="hljs-params"><span class="hljs-function"><span class="hljs-params">()</span></span></span><span class="hljs-function"> </span></span>{\n      <span class="code-keyword"><span class="code-keyword">if</span></span> (mongo == <span class="code-keyword"><span class="code-keyword">null</span></span>) {\n        <span class="code-comment"><span class="code-comment">// 解析外部传递的config</span></span>\n        MongoClientOptionsParser parser = <span class="code-keyword"><span class="code-keyword">new</span></span> MongoClientOptionsParser(config);\n\n        <span class="code-comment"><span class="code-comment">// 将解析结果用于创建新的com.mongodb.async.client.MongoClient实例</span></span>\n        mongo = MongoClients.create(parser.settings());\n        String dbName = config.getString(<span class="code-string"><span class="code-string">"db_name"</span></span>, DEFAULT_DB_NAME);\n        db = mongo.getDatabase(dbName);\n      }\n      <span class="code-keyword"><span class="code-keyword">return</span></span> mongo;\n    }</code></pre>\n<p><em>&nbsp;&nbsp;&nbsp;&nbsp;MongoClientOptionsParser 对象</em>是创建Mongo客户端的关键，他会解析用户传递的参数来创建mongDB客户端，理解他的解析方法有利于创建合适的客户端。</p>\n<p><em>&nbsp;&nbsp;&nbsp;&nbsp;MongoClientOptionsParser </em>的构造方法共有60行，这里分几段说明。为了更好的理解创建过程，建议了解下<a title="MongoDB异步Java驱动" href="http://mongodb.github.io/mongo-java-driver/3.2/driver-async" rel="nofollow">MongoDB异步Java驱动</a>。下面的构造客户端参数的第一部分。</p>\n<pre class="gradle"><code class="language-java"> <span class="hljs-function"><span class="code-keyword"><span class="code-keyword">public</span></span> <span class="code-title">MongoClientOptionsParser</span><span class="hljs-params">(JsonObject config)</span> </span>{\n    Objects.requireNonNull(config);\n    \n    <span class="code-comment"><span class="code-comment">// 创建mongoDB的构建对象</span></span>\n    MongoClientSettings.Builder <span class="code-keyword">options</span> = MongoClientSettings.builder();\n\n    <span class="code-comment"><span class="code-comment">// 注册对象数据的存储规则</span></span>\n    <span class="code-keyword">options</span>.codecRegistry(CodecRegistries.fromRegistries(commonCodecRegistry, CodecRegistries.fromCodecs(<span class="code-keyword"><span class="code-keyword">new</span></span> JsonObjectCodec(config))));\n\n    <span class="code-comment"><span class="code-comment">// 获取连接串，所有的定义参数都来自连接串</span></span>\n    String cs = config.getString(<span class="code-string"><span class="code-string">"connection_string"</span></span>);\n\n    <span class="code-comment"><span class="code-comment">// 解析连接串</span></span>\n    ConnectionString connectionString = (cs == <span class="code-keyword"><span class="code-keyword">null</span></span>) ? <span class="code-keyword"><span class="code-keyword">null</span></span> : <span class="code-keyword"><span class="code-keyword">new</span></span> ConnectionString(cs);\n\n    <span class="code-comment"><span class="code-comment">// 解析集群参数</span></span>\n    ClusterSettings clusterSettings = <span class="code-keyword"><span class="code-keyword">new</span></span> ClusterSettingsParser(connectionString, config).settings();\n    <span class="code-keyword">options</span>.clusterSettings(clusterSettings);\n\n    <span class="code-comment"><span class="code-comment">// 解析连接池参数</span></span>\n    ConnectionPoolSettings connectionPoolSettings = <span class="code-keyword"><span class="code-keyword">new</span></span> ConnectionPoolSettingsParser(connectionString, config).settings();\n    <span class="code-keyword">options</span>.connectionPoolSettings(connectionPoolSettings);\n\n    <span class="code-comment"><span class="code-comment">// some code</span></span>\n}</code></pre>\n<p>首先创建&nbsp;<em>MongoClientSettings </em>的构造对象。</p>\n<p>然后根据传递的参数构建&nbsp;<em>CodecRegistry </em>实例。<em>CodecRegistry </em>的说明见 <a title="mongDB官网CodecRegistry的API说明" href="http://api.mongodb.com/java/3.2/?com/mongodb/async/client/MongoClientSettings.html" rel="nofollow">mongDB官网CodecRegistry的API说明</a>。<em>CodecRegistry 用于指定相关的对象在mongoDB的读写实现类，</em>例如官方已经源生实现了<em>&nbsp;StringCodec、IntegerCodec</em>来处理Java的<em>String、Integer</em>对象<em>。</em></p>\n<p>这段代码的最后部分，创建一个&nbsp;<em>ConnectionString&nbsp;</em>实例来分解和存储连接串的解析结果。<em>ConnectionString </em>是&nbsp;<em>mongoDB&nbsp;</em>官方实现的解析连接串参数方法<em>。</em>可以将http协议串解析成对应的初始化参数，例如设置连接池最小连接数为20，最大连接数为200：&nbsp;<span style="color:#FF8C00"><em>mongodb://host:27017/?minPoolSize=20&amp;maxPoolSize=200 </em></span>。详细说明见&nbsp;<a title="ConnectionString API" href="http://api.mongodb.com/java/3.2/?com/mongodb/ConnectionString.html" rel="nofollow"><em>ConnectionString&nbsp;</em>的API文档</a> &nbsp;和 <a title="mongoDB官方指引手册" href="http://mongodb.github.io/mongo-java-driver/3.2/driver-async/reference/connecting/connection-settings/" rel="nofollow">mongoDB官方指引手册</a>&nbsp;。</p>\n<p>下面的代码是&nbsp;<em>ClusterSettingsParser&nbsp;</em>对传入的数据进行解析，<em>vertx-mongdb</em>解析连接参数都是采用类似的思路：优先使用mongodb源生连接串中指定的参数，如果参数不存在，则使用用户传入的参数。因此，在我们设计mongodb的连接参数时，可以在传入的JsonObject实例中统一在key="connection_string"的参数中一次性制定mongdb风格的连接字符串，还可以在这个实例中通过key值设置vertx风格的各种连接参数。如果2个参数都存在，则优先使用连接字符串。</p>\n<pre class="java"><code class="java"><span class="hljs-function"><span class="code-keyword"><span class="hljs-function"><span class="code-keyword">public</span></span></span><span class="hljs-function"> </span><span class="code-title"><span class="hljs-function"><span class="code-title">ClusterSettingsParser</span></span></span><span class="hljs-params"><span class="hljs-function"><span class="hljs-params">(ConnectionString connectionString, JsonObject config)</span></span></span><span class="hljs-function"> </span></span>{\n\n    <span class="code-comment"><span class="code-comment">// 创建mongdb集群builder方法</span></span>\n    ClusterSettings.Builder settings = ClusterSettings.builder();\n\n    <span class="code-comment"><span class="code-comment">// 优先从连接字符串中使用mongdb源生方法解析相关参数 </span></span>\n    <span class="code-keyword"><span class="code-keyword">if</span></span> (connectionString != <span class="code-keyword"><span class="code-keyword">null</span></span>) {\n      settings.applyConnectionString(connectionString);\n    } <span class="code-keyword"><span class="code-keyword">else</span></span> {\n      <span class="code-comment"><span class="code-comment">// 如果连接字符串中相关的参数不存在，则从用户传入的config中提取指定的数据</span></span>\n      <span class="code-comment"><span class="code-comment">// 设置host列表</span></span>\n      <span class="code-comment"><span class="code-comment">// 在parseHosts中优先解析config是否存在包含key=hosts的JsonArray实例，如果有则会即系多个连接服务器</span></span>\n      <span class="code-comment"><span class="code-comment">// 如果没有key=hosts，则解析host和port是否存在</span></span>\n      List&lt;ServerAddress&gt; hosts = parseHosts(config);\n      settings.hosts(hosts);\n\n      <span class="code-comment"><span class="code-comment">// 设置mongdb的运行模式和replica模式</span></span>\n      String replicaSet = config.getString(<span class="code-string"><span class="code-string">"replicaSet"</span></span>);\n      <span class="code-keyword"><span class="code-keyword">if</span></span> (hosts.size() == <span class="hljs-number"><span class="hljs-number">1</span></span> &amp;&amp; replicaSet == <span class="code-keyword"><span class="code-keyword">null</span></span>) {\n        settings.mode(ClusterConnectionMode.SINGLE);\n      } <span class="code-keyword"><span class="code-keyword">else</span></span> {\n        settings.mode(ClusterConnectionMode.MULTIPLE);\n      }\n      <span class="code-keyword"><span class="code-keyword">if</span></span> (replicaSet != <span class="code-keyword"><span class="code-keyword">null</span></span>) {\n        settings.requiredReplicaSetName(replicaSet);\n      }\n    }\n\n    <span class="code-keyword"><span class="code-keyword">this</span></span>.settings = settings.build();\n  }</code></pre>\n<p>这里就不一一说明每一个解析方法，基本上都是一样的套路。</p>\n<p>解析完连接参数后，用这些参数直接调用<em>MongoClients::create</em>来创建mongdb的客户端实例。然后从客户端从获取mongodb的连接。</p>\n\n<h2 id="h2-3"><span style="font-family:微软雅黑,microsoft yahei">总结</span></h2>\n<p>至此，mongdb的创建过程完毕。在创建的过程中，可以实现mongdb源生的连接串，也可以使用vertx风格的JsonObject。mongdb自身已经实现了全异步接口，因此vertx-mongdb只是在此基础上进行了一层封装。下面的附表是vertx-mongdb相关的设置参数。可以在建立vertx-mongdb实例时，通过JsonObject传入。</p>\n<pre class="actionscript"><code class="actionscript">{\n  <span class="code-comment"><span class="code-comment">// 设置单个mongdb服务时使用host、port指定主机和端口</span></span>\n  <span class="code-string"><span class="code-string">"host"</span></span> : <span class="code-string"><span class="code-string">"17.0.0.1"</span></span>, <span class="code-comment"><span class="code-comment">// string --mongdb实例所在的地址</span></span>\n  <span class="code-string"><span class="code-string">"port"</span></span> : <span class="hljs-number"><span class="hljs-number">27017</span></span>,      <span class="code-comment"><span class="code-comment">// int --mongdb实例的端口号</span></span>\n\n  <span class="code-comment"><span class="code-comment">// 设置集群mongdb服务器时使用队列</span></span>\n  <span class="code-string"><span class="code-string">"hosts"</span></span> : [\n    {\n      <span class="code-string"><span class="code-string">"host"</span></span> : <span class="code-string"><span class="code-string">"cluster1"</span></span>, <span class="code-comment"><span class="code-comment">// string --集群1地址</span></span>\n      <span class="code-string"><span class="code-string">"port"</span></span> : <span class="hljs-number"><span class="hljs-number">27000</span></span>       <span class="code-comment"><span class="code-comment">// int --集群1端口号</span></span>\n    },\n    {\n      <span class="code-string"><span class="code-string">"host"</span></span> : <span class="code-string"><span class="code-string">"cluster2"</span></span>, <span class="code-comment"><span class="code-comment">// string --集群2地址</span></span>\n      <span class="code-string"><span class="code-string">"port"</span></span> : <span class="hljs-number"><span class="hljs-number">28000</span></span>       <span class="code-comment"><span class="code-comment">// int --集群2端口号</span></span>\n    },\n    ...\n  ],\n\n  <span class="code-comment"><span class="code-comment">// 数据库分布式方法</span></span>\n  <span class="code-string"><span class="code-string">"replicaSet"</span></span> :  <span class="code-string"><span class="code-string">"foo"</span></span>    <span class="code-comment"><span class="code-comment">// string</span></span>\n\n  <span class="code-comment"><span class="code-comment">// 连接池参数</span></span>\n  <span class="code-string"><span class="code-string">"maxPoolSize"</span></span> : <span class="hljs-number"><span class="hljs-number">100</span></span>,                <span class="code-comment"><span class="code-comment">// int --最大连接数</span></span>\n  <span class="code-string"><span class="code-string">"minPoolSize"</span></span> : <span class="hljs-number"><span class="hljs-number">0</span></span>,                <span class="code-comment"><span class="code-comment">// int --最小连接数</span></span>\n  <span class="code-string"><span class="code-string">"maxIdleTimeMS"</span></span> : <span class="hljs-number"><span class="hljs-number">0</span></span>,          <span class="code-comment"><span class="code-comment">// long --单个连接空闲释放时间，0时表示没有时间限制</span></span>\n  <span class="code-string"><span class="code-string">"maxLifeTimeMS"</span></span> : <span class="hljs-number"><span class="hljs-number">0</span></span>,         <span class="code-comment"><span class="code-comment">// long --单个连接最大存活时间，0时表示灭有时间限制</span></span>\n  <span class="code-string"><span class="code-string">"waitQueueMultiple"</span></span>  : <span class="hljs-number"><span class="hljs-number">500</span></span>,         <span class="code-comment"><span class="code-comment">// int --等待获取连接的排队队列最大数量。</span></span>\n  <span class="code-string"><span class="code-string">"waitQueueTimeoutMS"</span></span> : <span class="hljs-number"><span class="hljs-number">120000</span></span>,      <span class="code-comment"><span class="code-comment">// long --等待获取连接的最大等待时间。</span></span>\n  <span class="code-string"><span class="code-string">"maintenanceFrequencyMS"</span></span> : <span class="hljs-number"><span class="hljs-number">0</span></span>,   <span class="code-comment"><span class="code-comment">// long</span></span>\n  <span class="code-string"><span class="code-string">"maintenanceInitialDelayMS"</span></span> : <span class="hljs-number"><span class="hljs-number">0</span></span>, <span class="code-comment"><span class="code-comment">// long</span></span>\n\n  <span class="code-comment"><span class="code-comment">// 账户、密码、连接信息</span></span>\n  <span class="code-string"><span class="code-string">"username"</span></span>   : <span class="code-string"><span class="code-string">"john"</span></span>,     <span class="code-comment"><span class="code-comment">// string</span></span>\n  <span class="code-string"><span class="code-string">"password"</span></span>   : <span class="code-string"><span class="code-string">"passw0rd"</span></span>, <span class="code-comment"><span class="code-comment">// string</span></span>\n  <span class="code-string"><span class="code-string">"authSource"</span></span> : <span class="code-string"><span class="code-string">"some.db"</span></span>   <span class="code-comment"><span class="code-comment">// string</span></span>\n  <span class="code-string"><span class="code-string">"authMechanism"</span></span>     : <span class="code-string"><span class="code-string">"GSSAPI"</span></span>,        <span class="code-comment"><span class="code-comment">// string --认证机制相关配置，详情见http://docs.mongodb.org/manual/core/authentication/</span></span>\n  <span class="code-string"><span class="code-string">"gssapiServiceName"</span></span> : <span class="code-string"><span class="code-string">"myservicename"</span></span>, <span class="code-comment"><span class="code-comment">// string --Kerberos单点登录相关接口API配置。</span></span>\n\n  <span class="code-comment"><span class="code-comment">// 联网相关的配置</span></span>\n  <span class="code-string"><span class="code-string">"connectTimeoutMS"</span></span> : <span class="hljs-number"><span class="hljs-number">10000</span></span> , <span class="code-comment"><span class="code-comment">// int // --连接到mongdb数据库实例返回的等待时间</span></span>\n  <span class="code-string"><span class="code-string">"socketTimeoutMS"</span></span>  : <span class="hljs-number"><span class="hljs-number">0</span></span>,    <span class="code-comment"><span class="code-comment">// int // --通过socket完成数据库相关操作的等待与返回时间，0时表示没有限制。</span></span>\n  <span class="code-string"><span class="code-string">"sendBufferSize"</span></span>    : <span class="hljs-number"><span class="hljs-number">0</span></span>,  <span class="code-comment"><span class="code-comment">// int // --设置通过socket发送数据的缓存大小,0时表示使用操作系统默认值。</span></span>\n  <span class="code-string"><span class="code-string">"receiveBufferSize"</span></span> : <span class="hljs-number"><span class="hljs-number">0</span></span>,  <span class="code-comment"><span class="code-comment">// int --设置通过socket获取数据的缓存大小,0时表示使用操作系统默认值。</span></span>\n  <span class="code-string"><span class="code-string">"keepAlive"</span></span> : <span class="hljs-literal"><span class="hljs-literal">false</span></span>       <span class="code-comment"><span class="code-comment">// boolean --设置是否保持数据库连接，默认为false</span></span>\n\n  <span class="code-comment"><span class="code-comment">// 设置集群之间的心跳配置</span></span>\n  <span class="code-string"><span class="code-string">"heartbeat.socket"</span></span> : {\n  <span class="code-string"><span class="code-string">"connectTimeoutMS"</span></span> : <span class="hljs-number"><span class="hljs-number">300000</span></span>, <span class="code-comment"><span class="code-comment">// int </span></span>\n  <span class="code-string"><span class="code-string">"socketTimeoutMS"</span></span>  : <span class="hljs-number"><span class="hljs-number">100000</span></span>, <span class="code-comment"><span class="code-comment">// int</span></span>\n  <span class="code-string"><span class="code-string">"sendBufferSize"</span></span>    : <span class="hljs-number"><span class="hljs-number">8192</span></span>,  <span class="code-comment"><span class="code-comment">// int</span></span>\n  <span class="code-string"><span class="code-string">"receiveBufferSize"</span></span> : <span class="hljs-number"><span class="hljs-number">8192</span></span>,  <span class="code-comment"><span class="code-comment">// int</span></span>\n  <span class="code-string"><span class="code-string">"keepAlive"</span></span> : <span class="hljs-literal"><span class="hljs-literal">true</span></span>           <span class="code-comment"><span class="code-comment">// boolean</span></span>\n  }\n\n  <span class="code-comment"><span class="code-comment">// 设置客户端和mongdb实例的心跳测试</span></span>\n  <span class="code-string"><span class="code-string">"heartbeatFrequencyMS"</span></span> :    <span class="hljs-number"><span class="hljs-number">5000</span></span> <span class="code-comment"><span class="code-comment">// long 集群监视器监控到达每个mongdb实例的心跳频率</span></span>\n  <span class="code-string"><span class="code-string">"minHeartbeatFrequencyMS"</span></span> : <span class="hljs-number"><span class="hljs-number">1000</span></span> <span class="code-comment"><span class="code-comment">// long 当前客户端到服务器的监控频率</span></span>\n}</code></pre>\n'}};