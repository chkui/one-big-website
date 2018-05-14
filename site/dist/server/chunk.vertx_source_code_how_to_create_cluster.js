exports.ids=[10],exports.modules={271:function(s,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});a.content='<p>Vert.x可以使用Zookeeper和Ignite等框架来创建集群，但是首选框架还是Hazelcast。此外，码友们也可以通过<em>ClusterManager</em>接口实现或引入需要的集群管理工具。本文将说明Vert.x是如何利用Hazelcast来创建和管理集群的，同时你也会了解到Vertx如何创建单机实例。</p>\n<h2 id="h2-1"><strong>集群创建</strong></h2>\n<p>在创建Vert.x集调用群时，调用方法和创建单机实例是有差异的。集群需要调<em>Vertx.clusteredVertx</em>异步方法创建。集群可以完全新建和引入已有的Hazelcast实例二种方式来创建。如下：</p>\n<p>1.新建实例</p>\n<blockquote>\n    <p>ClusterManager mgr = new HazelcastClusterManager();</p>\n</blockquote>\n<p>2.引入Hazelcast实例</p>\n<blockquote>\n    <p>ClusterManager mgr = new HazelcastClusterManager(hazelcastInstance);</p>\n</blockquote>\n<p>详情可以参考官方手册<a title="Hazelcast" href="http://vertx.io/docs/vertx-hazelcast/java/" rel="nofollow">http://vertx.io/docs/vertx-hazelcast/java/</a>。</p>\n\n<h2 id="h2-2">新建集群过程</h2>\n<p>调用<em>Vertx.clusteredVertx</em>静态方法后，Vert.x会利用Vertx工厂方法创建Vertx实例。如下</p>\n<p>其中简单直白的使用 <em>new&nbsp;VertxImpl();</em>来创建Vertx实例。</p>\n<pre class="gradle"><code class="gradle">VertxFactoryImpl.clusteredVertx(VertxOptions <span class="code-keyword"><span class="code-keyword">options</span></span>, <span class="code-keyword"><span class="code-keyword">final</span></span> Handler&lt;AsyncResult&lt;Vertx&gt;&gt; resultHandler) {\n    <span class="code-keyword"><span class="code-keyword">options</span></span>.setClustered(<span class="code-keyword"><span class="code-keyword">true</span></span>);<span class="code-comment"><span class="code-comment">//设置参数，启用集群</span></span>\n    <span class="code-keyword"><span class="code-keyword">new</span></span> VertxImpl(<span class="code-keyword"><span class="code-keyword">options</span></span>, resultHandler);<span class="code-comment"><span class="code-comment">//创建Vertx实例</span></span>\n}</code></pre>\n<p style="text-align:center">图1启动集群</p>\n<p>在<em>VertxImpl</em>的构造方法中，若需要创建集群，则执行：</p>\n<pre class="gradle"><code class="gradle">VertxImpl(VertxOptions <span class="code-keyword"><span class="code-keyword">options</span></span>, Handler&lt;AsyncResult&lt;Vertx&gt;&gt; resultHandler) {\n    <span class="code-comment"><span class="code-comment">// some code</span></span>\n    <span class="code-keyword"><span class="code-keyword">if</span></span> (<span class="code-keyword"><span class="code-keyword">options</span></span>.isClustered()) {\n      <span class="code-keyword"><span class="code-keyword">this</span></span>.clusterManager = getClusterManager(<span class="code-keyword"><span class="code-keyword">options</span></span>);<span class="code-comment"><span class="code-comment">//1.获取集群管理对象</span></span>\n      <span class="code-keyword"><span class="code-keyword">this</span></span>.clusterManager.setVertx(<span class="code-keyword"><span class="code-keyword">this</span></span>);<span class="code-comment"><span class="code-comment">//2. 设置实例</span></span>\n      <span class="code-keyword"><span class="code-keyword">this</span></span>.clusterManager.<span class="code-keyword"><span class="code-keyword">join</span></span>(ar -&gt; {<span class="code-comment"><span class="code-comment">//3. 加入集群</span></span>\n        <span class="code-keyword"><span class="code-keyword">if</span></span> (ar.failed()) {\n          log.error(<span class="code-string"><span class="code-string">"Failed to join cluster"</span></span>, ar.cause());\n        } <span class="code-keyword"><span class="code-keyword">else</span></span> {\n          <span class="code-comment"><span class="code-comment">// Provide a memory barrier as we are setting from a different thread</span></span>\n          <span class="code-keyword"><span class="code-keyword">synchronized</span></span> (VertxImpl.<span class="code-keyword"><span class="code-keyword">this</span></span>) {\n            haManager = <span class="code-keyword"><span class="code-keyword">new</span></span> HAManager(<span class="code-keyword"><span class="code-keyword">this</span></span>, deploymentManager, clusterManager, <span class="code-keyword"><span class="code-keyword">options</span></span>.getQuorumSize(),\n                                      <span class="code-keyword"><span class="code-keyword">options</span></span>.getHAGroup(), haEnabled);\n            createAndStartEventBus(<span class="code-keyword"><span class="code-keyword">options</span></span>, resultHandler);\n          }\n        }\n      });\n    } <span class="code-keyword"><span class="code-keyword">else</span></span> {\n      <span class="code-keyword"><span class="code-keyword">this</span></span>.clusterManager = <span class="code-keyword"><span class="code-keyword">null</span></span>;\n      createAndStartEventBus(<span class="code-keyword"><span class="code-keyword">options</span></span>, resultHandler);\n    }\n    <span class="code-comment"><span class="code-comment">// some code</span></span>\n  }</code></pre>\n<p style="text-align:center">图2</p>\n<p>这里会分3部来创建集群，首先调用<em>getClusterManager</em>来获取集群的配置管理实例。如下：</p>\n<pre class="gradle"><code class="language-java">getClusterManager(VertxOptions <span class="code-keyword">options</span>) {\n    <span class="code-keyword"><span class="code-keyword">if</span></span> (<span class="code-keyword">options</span>.isClustered()) {\n      <span class="code-keyword"><span class="code-keyword">if</span></span> (<span class="code-keyword">options</span>.getClusterManager() != <span class="code-keyword"><span class="code-keyword">null</span></span>) {<span class="code-comment"><span class="code-comment">//判断是否已经创建集群管理对方</span></span>\n        <span class="code-keyword"><span class="code-keyword">return</span></span> <span class="code-keyword">options</span>.getClusterManager();<span class="code-comment"><span class="code-comment">//若已创建，直接使用这个对象。</span></span>\n      } <span class="code-keyword"><span class="code-keyword">else</span></span> {<span class="code-comment"><span class="code-comment">//若无创建，执行新建过程。</span></span>\n        ClusterManager mgr;\n        String clusterManagerClassName = System.getProperty(<span class="code-string"><span class="code-string">"vertx.cluster.managerClass"</span></span>);<span class="code-comment"><span class="code-comment">/*通过系统参数设置集群管理对象*/</span></span>\n        <span class="code-keyword"><span class="code-keyword">if</span></span> (clusterManagerClassName != <span class="code-keyword"><span class="code-keyword">null</span></span>) {<span class="code-comment"><span class="code-comment">//clusterManagerClassName变量指定的类名存在，开始加载</span></span>\n          <span class="code-comment"><span class="code-comment">// We allow specify a sys prop for the cluster manager factory which overrides ServiceLoader</span></span>\n          <span class="code-keyword"><span class="code-keyword">try</span></span> {\n            <span class="code-keyword">Class</span>&lt;?&gt; clazz = <span class="code-keyword">Class</span>.forName(clusterManagerClassName);\n            mgr = (ClusterManager)clazz.newInstance();\n          } <span class="code-keyword"><span class="code-keyword">catch</span></span> (Exception e) {\n            <span class="code-keyword"><span class="code-keyword">throw</span></span> <span class="code-keyword"><span class="code-keyword">new</span></span> IllegalStateException(<span class="code-string"><span class="code-string">"Failed to instantiate "</span></span> + clusterManagerClassName, e);\n          }\n        } <span class="code-keyword"><span class="code-keyword">else</span></span> {<span class="code-comment"><span class="code-comment">//clusterManagerClassName指定的变量null,使用默认加载器。</span></span>\n          ServiceLoader&lt;ClusterManager&gt; mgrs = ServiceLoader.load(ClusterManager.<span class="code-keyword">class</span>);\n          <span class="code-keyword"><span class="code-keyword">if</span></span> (!mgrs.iterator().hasNext()) {\n            <span class="code-keyword"><span class="code-keyword">throw</span></span> <span class="code-keyword"><span class="code-keyword">new</span></span> IllegalStateException(<span class="code-string"><span class="code-string">"No ClusterManagerFactory instances found on classpath"</span></span>);\n          }\n          mgr = mgrs.iterator().<span class="code-keyword">next</span>();\n        }\n        <span class="code-keyword"><span class="code-keyword">return</span></span> mgr;\n      }\n    } <span class="code-keyword"><span class="code-keyword">else</span></span> {\n      <span class="code-keyword"><span class="code-keyword">return</span></span> <span class="code-keyword"><span class="code-keyword">null</span></span>;\n    }\n  }</code></pre>\n<p style="text-align:center">图3，获取集群管理类<br> 从源码看，<em><code>getClusterManager</code></em>并没有什么特殊的地方。首先检查用户在创建Vertx实例之前，是否创建了集群的管理对象<code><em>ClusterManager</em>。创建了，则使用这个管理对象，没有创建则自行新建一个。</code></p>\n<p>注意</p>\n<blockquote>\n    <p>String clusterManagerClassName = System.getProperty("vertx.cluster.managerClass");</p>\n</blockquote>\n<p>这行代码 ，这说明可以通过JVM环境参数（<em>-Dvertx.cluster.managerClass=[className]</em>）来指定Vertx加载集群管理对象类。这在官方手册中并没有任何一个地方说明。</p>\n<p>如果指定了managerClass，则会使用默认加载方式加载指定的类，并转换成<em>ClusterManager</em>接口。</p>\n<p>如果没有指定managerClass，则使用默认集群加载类启动集群。</p>\n<blockquote>\n    <p>ServiceLoader&lt;ClusterManager&gt; mgrs = ServiceLoader.load(ClusterManager.class);&nbsp;</p>\n</blockquote>\n<p>ServiceLoader是Java在1.6定义的聚群接口类，有点类似于spring的Ioc容器。其过程也是加载类。详细说明请查阅&nbsp;<a href="http://my.oschina.net/hanzhankang/blog/109794" rel="nofollow">通过ServiceLoader实现链式处理</a>&nbsp;一文，解释得很清楚。</p>\n<p>可以看到在<em>vertx-hazelcast-[vertsion].jar</em>包中，<em>META-INF/services/io.vertx.core.spi.cluster.ClusterManager</em>指定了<em>ClusterManager</em>要<em>ServiceLoader</em>加载<em>HazelcastClusterManager。</em></p>\n<blockquote>\n    <p>io.vertx.spi.cluster.hazelcast.HazelcastClusterManager</p>\n</blockquote>\n<p>回到图2，Vert.x接下来使用</p>\n<blockquote>\n    <p>clusterManager.setVertx(this)</p>\n</blockquote>\n<p>将vertx实例设置到集群管理类中。 随后调用</p>\n<blockquote>\n    <p>clusterManager.join</p>\n</blockquote>\n<p>来加入集群。 下面是<em>clusterManager.join</em>的源码</p>\n<pre class="less"><code class="less"><span class="code-selector-tag"><span class="code-selector-tag">synchronized</span></span> <span class="code-selector-tag"><span class="code-selector-tag">void</span></span> <span class="code-selector-tag"><span class="code-selector-tag">join</span></span>(Handler&lt;AsyncResult&lt;Void&gt;&gt; resultHandler) {\n    <span class="code-selector-tag"><span class="code-selector-tag">vertx</span></span><span class="code-selector-class"><span class="code-selector-class">.executeBlocking</span></span>(fut -&gt; {\n      <span class="code-selector-tag"><span class="code-selector-tag">if</span></span> (!active) {<span class="code-comment"><span class="code-comment">//确保只初始化一次</span></span>\n        active = true;\n        <span class="code-selector-tag"><span class="code-selector-tag">if</span></span> (customHazelcastCluster) {<span class="code-comment"><span class="code-comment">//当使用的是用户自己创建的Hazelcast实例时</span></span>\n          nodeID = hazelcast<span class="code-selector-class"><span class="code-selector-class">.getLocalEndpoint</span></span>()<span class="code-selector-class"><span class="code-selector-class">.getUuid</span></span>();<span class="code-comment"><span class="code-comment">//获取节点编号</span></span>\n          membershipListenerId = hazelcast<span class="code-selector-class"><span class="code-selector-class">.getCluster</span></span>()<span class="code-selector-class"><span class="code-selector-class">.addMembershipListener</span></span>(this);<span class="code-comment"><span class="code-comment">//获取当前节点监听成员变换的事件的ID</span></span>\n          fut<span class="code-selector-class"><span class="code-selector-class">.complete</span></span>();\n          return;\n        }\n        if (conf == null) {<span class="code-comment"><span class="code-comment">//获取Hazelcast的Config</span></span>\n          conf = loadConfigFromClasspath();\n          <span class="code-selector-tag"><span class="code-selector-tag">if</span></span> (conf == null) {\n            log<span class="code-selector-class"><span class="code-selector-class">.warn</span></span>(<span class="code-string"><span class="code-string">"Cannot find cluster configuration on classpath and none specified programmatically. Using default hazelcast configuration"</span></span>);\n          }\n        }\n        <span class="code-comment"><span class="code-comment">//新建hazelcast实例</span></span>\n        hazelcast = Hazelcast.newHazelcastInstance(conf);\n        nodeID = hazelcast.getLocalEndpoint().getUuid();\n        membershipListenerId = hazelcast.getCluster().addMembershipListener(this);\n        fut.complete();\n      }\n    }, resultHandler);\n  }</code></pre>\n<p style="text-align:center">图4，新建hazelcast实例</p>\n<p>如果用户自己创建并传入Hazelcast实例，<em>ClusterManager</em>只是简单的从中获取需要的参数。如果未创建实例，则<em>ClusterManager</em>会自行创建。</p>\n<p>首先，loadConfigFromClasspath会用来加载本地的配置文件。</p>\n<pre class="cs"><code class="language-java"><span class="hljs-function"><span class="hljs-function">Config </span><span class="code-title"><span class="hljs-function"><span class="code-title">loadConfigFromClasspath</span></span></span><span class="hljs-params"><span class="hljs-function">(<span class="hljs-params"></span>)</span></span><span class="hljs-function"> </span></span>{\n    Config cfg = <span class="code-keyword"><span class="hljs-literal">null</span></span>;\n    <span class="code-keyword"><span class="code-keyword">try</span></span> (InputStream <span class="code-keyword">is</span> = getConfigStream();\n         InputStream bis = <span class="code-keyword"><span class="code-keyword">new</span></span> BufferedInputStream(<span class="code-keyword">is</span>)) {\n      <span class="code-keyword"><span class="code-keyword">if</span></span> (<span class="code-keyword">is</span> != <span class="code-keyword"><span class="hljs-literal">null</span></span>) {\n        cfg = <span class="code-keyword"><span class="code-keyword">new</span></span> XmlConfigBuilder(bis).build();<span class="code-comment"><span class="code-comment">//创建HazelcastConfig</span></span>\n      }\n    } <span class="code-keyword"><span class="code-keyword">catch</span></span> (IOException ex) {\n      log.error(<span class="code-string"><span class="code-string">"Failed to read config"</span></span>, ex);\n    }\n    <span class="code-keyword"><span class="code-keyword">return</span></span> cfg;\n  }</code></pre>\n<p style="text-align:center">图5，加载HazelcastConfig</p>\n<p>getConfigStream用来读取配置文件。</p>\n<pre class="kotlin"><code class="language-java"><span class="hljs-function">InputStream <span class="code-title">getConfigStream</span><span class="hljs-params">()</span> </span>{\n    ClassLoader ctxClsLoader = Thread.currentThread().getContextClassLoader();\n    InputStream <span class="code-keyword">is</span> = <span class="code-keyword"><span class="hljs-literal">null</span></span>;\n    <span class="code-keyword"><span class="code-keyword">if</span></span> (ctxClsLoader != <span class="code-keyword"><span class="hljs-literal">null</span></span>) {\n      <span class="code-keyword">is</span> = ctxClsLoader.getResourceAsStream(CONFIG_FILE);\n    }\n    <span class="code-keyword"><span class="code-keyword">if</span></span> (<span class="code-keyword">is</span> == <span class="code-keyword"><span class="hljs-literal">null</span></span>) {\n      <span class="code-keyword">is</span> = getClass().getClassLoader().getResourceAsStream(CONFIG_FILE);\n      <span class="code-keyword"><span class="code-keyword">if</span></span> (<span class="code-keyword">is</span> == <span class="code-keyword"><span class="hljs-literal">null</span></span>) {\n        <span class="code-keyword">is</span> = getClass().getClassLoader().getResourceAsStream(DEFAULT_CONFIG_FILE);\n      }\n    }\n    <span class="code-keyword"><span class="code-keyword">return</span></span> <span class="code-keyword">is</span>;\n  }</code></pre>\n<p style="text-align:center">图6，读取配置文件</p>\n<p>如图5、图6的源码。<em>getConfigStream</em>会先加载classpath下的<em>cluster.xml（CONFIG_FILE）</em>文件。如果不存在，则加载jar包内的<em>default-cluster.xml（DEFAULT_CONFIG_FILE）</em>文件。读取完毕后，<em>loadConfigFromClasspath</em>使用Hazelcast的<em>XmlConfigBuilder</em>来构建<em>HazelcastConfig</em>。而后会用这个Config初始化Hazelcast。</p>\n<p>集群创建成功后， 会初始化一个<em>HAManager</em>实例，用于做verticle迁移。后面在详细说明HA模式。</p>\n<p>最后，在VertxImpl中，会调用<em>createAndStartEventBus</em>方法在集群环境运行的EventBus。</p>'}};