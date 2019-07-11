exports.ids=[32],exports.modules={365:function(n,s,o){"use strict";Object.defineProperty(s,"__esModule",{value:!0});s.content='<h2 id="h2-1">一切从配置开始</h2>\n<p>在<a href="https://www.chkui.com/article/vertx/micro_service_index">微服务架构概念索引</a>一文中介绍了整个云源生应用的搭建体系，后续的内容将会从Spring\n    Cloud从技术架构，到基础设置再到团队协作方式一点一滴的记录搭建整个云服务的过程。现在从最基本的中心化配置开始介绍。</p>\n<p>Spring基金会项目繁多、种类各异，但是他们都脱离不了一个基本的要求——基于<a\n        href="https://www.chkui.com/article/spring/spring_annotation_of_xml_configuration">Spring Ioc的配置</a>。Spring的基础在于IoC容器，各种各样的项目都在IoC容器的基础之上扩展而来。在<a\n        href="https://www.chkui.com/article/spring/spring_core_design_pattern_and_ioc">设计模式与IoC</a>中已经介绍了IoCs的目的就是解决数据与Bean的关系、以及Bean与Bean之间的关系。\n</p>\n<h2 id="h2-2">Spring Cloud 中心化配置</h2>\n<p>在单Jvm的Spring应用中各种配置文件都是通过<a\n        href="https://www.chkui.com/article/spring/spring_core_environment_management_of_profile">Profile</a>结合<a\n        href="https://www.chkui.com/article/spring/spring_core_properties_management">PropertySource</a>进行管理，而到了<a\n        href="https://www.chkui.com/article/spring/spring_features_configuration">Spring Boot</a>则提供了大量的默认配置简化了这个过程。而在Spring\n    Cloud中需要管理大量的节点，中心化配置的需求随之而产生。</p>\n<p>Spring\n    Cloud的中心化配置并没有什么特别神奇的地方，实际上就是把本该放到本地的配置文件（例如application.yml）统一放置到一个仓库中。然后用一个Web服务来管理仓库，其他微服务节点从这个Web服务获取配置文件。所以就算没有Spring\n    Cloud Config提供这个功能，我们也可以自己编码在ApplicationContext的启动装载IoC之前先处理好配置。</p>\n<p>在假设有别的Spring Cloud知识之前，本文介绍不使用Netflix和Eureka注册服务的来管理中心化配置的方法。</p>\n<p><img src="http://file.mahoooo.com/res/file/2019-04-10-spring-cloud-config-struts.png" alt="Spring云源生应用-中心化配置"\n        title="配置服务结构" class="zoom-in-cursor"></p>\n<p>上图是Spring Cloud Config的基本结构。左侧是一系列的微服务节点，右侧是他们对应的配置文件。例如Node-1服务对应的是<em>node-1-config.yml</em>文件，在单一的应用中本来<em>node-1-config.yml</em>文件应该是放置在Node-1工程的classpath下的，现在的区别是将他们分开，将配置文件统一放置到一个仓库中，然后用Config-Service来管理。\n</p>\n<p>中心化配置就是这么简单，除了把配置文件拆走其他的使用方式完全一样，可以通过<a\n        href="https://www.chkui.com/article/spring/spring_core_properties_management">PropertySources或@Value注解</a>来获取配置的参数。\n</p>\n<p>至于中心化配置有什么好处就不用一一细说了，除了在负载均衡中减少配置之外，也便于环境管理等等。</p>\n<h2 id="h2-3">启用中心化配置</h2>\n<p>清楚原理之后做事就简单了，案例代码一共包含三个工程（<a\n        href="https://github.com/chkui/spring-cloud-samples/tree/master/configuration">github源码</a>），分别是<em>configuration-server</em>、<em>configuration-node-1</em>和<em>configuration-node-2</em>。configuration-server就是图中的Config-Service，他为所有的微服务节点提供中心化配置服务，所有的配置都在独立的<a\n        href="https://github.com/chkui/spring-cloud-repo">git仓库中</a>，在某个微服务节点请求配置数据的时候，<em>configuration-server</em>会去仓库中获取对应的配置并传输给微服务节点。\n</p>\n<h3 id="h3-1">Config Service</h3>\n<p>Spring Cloud的中心化配置服务通过Http请求提供配置管理服务，所以他自身也是一个Web。要启用的配置服务就2步：1.写一个配置文件指定服务端口和配置文件仓库，2.启动Spring Web服务。</p>\n<p>下面<code>application.yml</code>指定了中心化服务的端口（8888），然后指定了配置文件的Git仓库。配置文件的仓库可以是本地文件夹、可以是git仓库或者其他任何形式，这里以Git作为例子。</p>\n<pre><code class="yaml makefile"><span class="code-comment"># application.yml</span>\n<span class="code-section">server:</span>\n  port: 8888\n\n<span class="code-section">spring:</span>\n  cloud:\n    config:\n      server:\n        git:\n          uri:  https://github.com/chkui/spring-cloud-repo\n</code></pre>\n<p>配置好之后启动Web服务：</p>\n<pre><code class="java"><span class="code-comment">// chkui.spring.cloud.config.ConfigServiceApplication</span>\n\n<span class="code-meta">@EnableConfigServer</span> <span class="code-comment">//表示这是一个Configuration 服务</span>\n<span class="code-meta">@SpringBootApplication</span>\n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n            class="code-title">ConfigServiceApplication</span> </span>{\n\t<span class="hljs-function"><span class="code-keyword">public</span> <span class="code-keyword">static</span> <span\n            class="code-keyword">void</span> <span class="code-title">main</span><span class="hljs-params">(String[] args)</span> </span>{\n\t\tSpringApplication.run(ConfigServiceApplication.class, args);\n\t}\n}\n</code></pre>\n<p>启动web并没有任何特别之处，像个普通的Spring Boot工程启动即可。</p>\n<h3 id="h3-2">Client Node</h3>\n<p>有了中心化服务之后自然是要使用它。也仅仅需要2步：1.配置微服务，2.启动微服务。配置内容如下：</p>\n<pre><code class="yaml shell"><span class="code-meta">#</span><span class="bash"> bootstrap.yml</span>\nspring:\n  application:\n    name: node-config-1\n  cloud:\n    config:\n      uri: http://localhost:8888\n</code></pre>\n<p>访问中心化配置的参数主要就2个：1.指定配置文件名称、2.指定中心化服务器的地址与端口。</p>\n<p>\n    <strong>切记使用中心化配置时，像上面这个与服务器相关的配置要写到<code>bootstrap.yml</code>中，这样才能在访问远程配置之前先获取远程服务器的参数。写到<code>application.yml</code>里会导致永远都使用默认参数</strong>。\n</p>\n<p>配置文件的名称要与<a href="https://github.com/chkui/spring-cloud-repo">配置仓库</a>中的文件名对应。下面是<em>configuration-node-1</em>对应的配置文件的内容：\n</p>\n<pre><code class="yaml makefile"><span class="code-comment"># https://github.com/chkui/spring-cloud-repo/blob/master/node-config-1.yml</span>\n<span class="code-section">server:</span>\n  port: 9081 <span class="code-comment">#配置node-1端口</span>\n<span class="code-section">message: Response Node Client1 With WebFlux(Netty)! #配置message参数。</span>\n</code></pre>\n<p>下面是<em>configuration-node-1</em>中的主要代码：</p>\n<pre><code class="java"><span class="code-keyword">package</span> chkui.spring.cloud.config;\n<span class="code-comment">//import 省略</span>\n\n<span class="code-meta">@SpringBootApplication</span>\n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n            class="code-title">ConfigClientApplication1</span> </span>{\n    <span class="hljs-function"><span class="code-keyword">public</span> <span class="code-keyword">static</span> <span\n            class="code-keyword">void</span> <span class="code-title">main</span><span class="hljs-params">(String[] args)</span> </span>{\n        SpringApplication.run(ConfigClientApplication1.class, args);\n    }\n}\n\n<span class="code-meta">@RestController</span>\n<span class="hljs-class"><span class="code-keyword">class</span> <span class="code-title">MessageRestController</span> </span>{\n\n    <span class="code-comment">//通过@Value注解获取中心化配置的参数</span>\n    <span class="code-meta">@Value</span>(<span\n            class="code-string">"${message:Configuration Server Error(Node-1)}"</span>)\n    <span class="code-keyword">private</span> String message;\n\n    <span class="code-meta">@RequestMapping</span>(<span class="code-string">"/message"</span>)\n    <span class="hljs-function">Mono&lt;String&gt; <span class="code-title">getMessage</span><span class="hljs-params">()</span> </span>{\n        <span class="code-keyword">return</span> Mono.just(<span class="code-keyword">this</span>.message);\n    }\n}\n</code></pre>\n<p><em>configuration-node-1</em>用spring-boot启动了一个WebFlux，这个时候访问 <a href="http://localhost:9081/message">http://localhost:9081/message</a>\n    会返回配置文件中的信息：<em>Response Node Client1 With WebFlux(Netty)!</em>。</p>\n<h2 id="h2-4">动态刷新</h2>\n<p>可以在不重启微服务节点的情况下更新配置参数，这在某些场景下非常意义。刷新配置参数主要是使用了<code>ConfigurableApplicationContext</code>的<code>refresh</code>接口，不过Spring\n    Cloud整合了Actuator功能直接外部调用接口即可。</p>\n<p><em>configuration-node-2</em>中的代码演示了这个过程：</p>\n<p>首先需要引入<code>spring-boot-starter-actuator</code>:</p>\n<pre><code class="groovy javascript">dependencies {\n\tcompile(<span class="code-string">\'org.springframework.cloud:spring-cloud-starter-config\'</span>)\n\tcompile(<span class="code-string">\'org.springframework.boot:spring-boot-starter-actuator\'</span>) <span\n            class="code-comment">//引入actuator</span>\n\tcompile(<span class="code-string">\'org.springframework.boot:spring-boot-starter-web\'</span>)\n}\n</code></pre>\n<p>然后在Controller层增加*@RefreshScope*注解：</p>\n<pre><code class="java"><span class="code-meta">@SpringBootApplication</span>\n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n            class="code-title">ConfigClientApplication2</span> </span>{\n\t<span class="hljs-function"><span class="code-keyword">public</span> <span class="code-keyword">static</span> <span\n            class="code-keyword">void</span> <span class="code-title">main</span><span class="hljs-params">(String[] args)</span> </span>{\n\t\tSpringApplication.run(ConfigClientApplication2.class, args);\n    }\n}\n\n<span class="code-meta">@RefreshScope</span>\n<span class="code-meta">@RestController</span>\n<span class="hljs-class"><span class="code-keyword">class</span> <span class="code-title">MessageRestController</span> </span>{\n    <span class="code-meta">@Value</span>(<span\n            class="code-string">"${message:Configuration Server Error(Node-2)}"</span>)\n    <span class="code-keyword">private</span> String message;\n\n    <span class="code-meta">@RequestMapping</span>(<span class="code-string">"/message"</span>)\n    <span class="hljs-function">String <span class="code-title">getMessage</span><span\n            class="hljs-params">()</span> </span>{\n        <span class="code-keyword">return</span> <span class="code-keyword">this</span>.message;\n    }\n}\n</code></pre>\n<p>最后在本地配置参数中暴露Actuator的接口：</p>\n<pre><code class="yaml php"><span class="code-comment">#</span>\nmanagement:\n  endpoints:\n    web:\n      exposure:\n        <span class="code-keyword">include</span>: <span class="code-string">\'*\'</span>\n</code></pre>\n<p>现在就可以通过Actuator暴露的接口来更新配置参数——Post访问 <code>localhost:9082/actuator/refresh</code>：</p>\n<pre><code class="bash">curl localhost:9082/actuator/refresh -d {} -H <span class="code-string">"Content-Type: application/json"</span>\n</code></pre>\n<p>到了Spring Boot 2.×之后Actuator默认关闭所有Web服务接口。这里仅仅是说明有这个功能，通常不会使用Web暴露接口的方式来操作。如下图，Spring Boot和Spring\n    Cloud已经暴露了大量的MBean，通常会使用JMX来管理和监控服务状态。\n    <img src="http://file.mahoooo.com/res/file/2019-04-11-spring-cloud-config-mbeans.png" alt="Spring云源生应用-中心化配置"\n         title="Spring Cloud MBeans" class="zoom-in-cursor"></p>\n<p>所以如果要使用 配置刷新 等功能建议使用<code>Spirng Boot Admin</code>或者其他基于JMX的管理工具来操作。</p>\n<h2 id="h2-5">配置说明</h2>\n<h3 id="h3-3">服务端</h3>\n<p>启用必要配置：</p>\n<ol>\n    <li>引入<code>spring-cloud-config-server</code>。</li>\n    <li>设置服务端口：<code>server.port</code></li>\n    <li>设置仓库地址：<code>spring.cloud.config.server.git.uri</code>，仓库类型可以有很多种。</li>\n</ol>\n<p>更多配置：</p>\n<ol>\n    <li><code>spring.cloud.config.server.git.timeout</code><a\n            href="https://cloud.spring.io/spring-cloud-config/spring-cloud-config.html#_setting_http_connection_timeout"\n            title="可以设置访问仓库的超时时间（秒）">可以设置访问仓库的超时时间（秒）</a>。\n    </li>\n    <li><code>spring.cloud.config.server.git.uri</code><a\n            href="https://cloud.spring.io/spring-cloud-config/spring-cloud-config.html#_placeholders_in_git_uri"\n            title="可以使用`{application}`、`{profile}`等占位符">可以使用<code>{application}</code>、<code>{profile}</code>等占位符</a>。用于复杂的仓库管理。\n    </li>\n    <li>占位符可以配合使用通配符和正则表达式来解决更复杂的配置问题：<a\n            href="https://cloud.spring.io/spring-cloud-config/spring-cloud-config.html#_pattern_matching_and_multiple_repositories"\n            title="参考资料">详细</a>。\n    </li>\n    <li>通常git仓库都涉及到权限认证，可以用<a\n            href="https://cloud.spring.io/spring-cloud-config/spring-cloud-config.html#_authentication" title="HTTPS">HTTPS</a>或者<a\n            href="https://cloud.spring.io/spring-cloud-config/spring-cloud-config.html#_git_ssh_configuration_using_properties"\n            title="ssh-key">SSH-KEY</a>的方式解决。\n    </li>\n    <li><a href="https://cloud.spring.io/spring-cloud-config/spring-cloud-config.html#_force_pull_in_git_repositories"\n           title="`force-pull`参数可以强制更新本地仓库中的配置文件"><code>force-pull</code>参数可以强制更新本地仓库中的配置文件</a>。\n    </li>\n    <li><code>spring.cloud.config.server.git.repos</code>参数可以用于多项配置，用子目录来区分配置。</li>\n    <li><code>spring.cloud.config.server.git.refreshRate</code>可以控制服务器到仓库的更新频率。默认为0，表示只要有微服务请求了数据就会去远程仓库获取文件。</li>\n    <li><code>spring.cloud.config.server.git.basedir</code>用于配置远程文件下载本地的临时文件夹，默认使用操作系统的<code>/tmp</code>。</li>\n    <li>除了使用本文介绍的使用git作为配置文件仓库，还支持<a\n            href="https://cloud.spring.io/spring-cloud-config/spring-cloud-config.html#_file_system_backend"\n            title="本地文件系统">本地文件系统</a>、<a\n            href="https://cloud.spring.io/spring-cloud-config/spring-cloud-config.html#vault-backend" title="Vault">Vault</a>、<a\n            href="https://cloud.spring.io/spring-cloud-config/spring-cloud-config.html#_jdbc_backend"\n            title="数据库">数据库</a>、<a\n            href="https://cloud.spring.io/spring-cloud-config/spring-cloud-config.html#_redis_backend" title="Redis">Redis</a>、<a\n            href="https://cloud.spring.io/spring-cloud-config/spring-cloud-config.html#_credhub_backend"\n            title="CredHub">CredHub</a>等方式管理配置仓库。\n    </li>\n    <li>[可以同时使用git、svn等仓库](Composite Environment Repositories "可以同时使用git、svn等仓库")。</li>\n    <li><a href="https://cloud.spring.io/spring-cloud-config/spring-cloud-config.html#_property_overrides"\n           title="`spring.cloud.config.server.overrides`"><code>spring.cloud.config.server.overrides</code></a>用于配置通用属性，通过这个配置可以让所有的节点都获取这个属性。\n    </li>\n    <li><a href="https://cloud.spring.io/spring-cloud-config/spring-cloud-config.html#_security" title="安全管理">安全管理</a>用于在一些非独立的环境做中心化配置，比如配置服务器直接放置在外网。\n    </li>\n    <li>通常情况下会将Config Server作为一个独立的Web服务，但是也可以使用<code>spring.cloud.config.server.bootstrap</code>和``<a\n            href="https://cloud.spring.io/spring-cloud-config/spring-cloud-config.html#_embedding_the_config_server"\n            title="但是也可以把他嵌入别的系统中去">嵌入别的系统中去</a>。\n    </li>\n</ol>\n<h3 id="h3-4">客户端</h3>\n<ol>\n    <li>引入<code>spring-cloud-starter-config</code>。</li>\n    <li>在<code>bootstrap.yml</code>设置中心化配置服务地址：<code>spring.cloud.config.uri</code>。</li>\n    <li>在<code>bootstrap.yml</code>设置文件名：<code>spring.application.name</code>。</li>\n    <li>可以在<code>bootstrap.yml</code>设置profiles：<code>spring.profiles.active</code>。非必要</li>\n</ol>\n<h3 id="h3-5">配置仓库</h3>\n<ol>\n    <li>中心化配置文件同样支持<code>profile</code>特性，所以在仓库中具备以下命名规则：</li>\n</ol>\n<pre><code class="coffeescript"><span class="hljs-regexp">/{application}/</span>{profile}[/{label}]\n/{application}-{profile}.yml\n<span class="hljs-regexp">/{label}/</span>{application}-{profile}.yml\n/{application}-{profile}.properties\n<span class="hljs-regexp">/{label}/</span>{application}-{profile}.properties\n</code></pre>'}};