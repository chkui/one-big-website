exports.ids=[21],exports.modules={343:function(s,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});n.content='<h3 id="h3-1">初始化Spring-boot</h3>\n\n<h4 id="h4-1">最佳的文档结构。</h4>\n<pre><code class="ruby">com\n +- example\n     +- myproject\n         +- Application.java\n         <span class="hljs-params">|\n         +- domain\n         |</span>   +- Customer.java\n         <span class="hljs-params">|   +- CustomerRepository.java\n         |</span>\n         +- service\n         <span class="hljs-params">|   +- CustomerService.java\n         |</span>\n         +- web\n             +- CustomerController.java</code></pre>\n<p>spring-boot还是建议按照标准的controller-service-dao结构分层。有一个独立的Application.java作为系统启动入口。</p>\n\n<h4 id="h4-2">引入</h4>\n<p>这里仅仅以Maven为例：</p>\n<pre><code class="xml"><span class="php"><span class="code-meta">&lt;?</span>xml version=<span\n        class="code-string">"1.0"</span> encoding=<span class="code-string">"UTF-8"</span><span\n        class="code-meta">?&gt;</span></span>\n<span class="code-tag">&lt;<span class="code-name">project</span> <span class="hljs-attr">xmlns</span>=<span\n        class="code-string">"http://maven.apache.org/POM/4.0.0"</span> <span class="hljs-attr">xmlns:xsi</span>=<span\n        class="code-string">"http://www.w3.org/2001/XMLSchema-instance"</span>\n    <span class="hljs-attr">xsi:schemaLocation</span>=<span class="code-string">"http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd"</span>&gt;</span>\n    <span class="code-tag">&lt;<span class="code-name">modelVersion</span>&gt;</span>4.0.0<span\n            class="code-tag">&lt;/<span class="code-name">modelVersion</span>&gt;</span>\n    <span class="code-tag">&lt;<span class="code-name">groupId</span>&gt;</span>org.springframework<span\n            class="code-tag">&lt;/<span class="code-name">groupId</span>&gt;</span>\n    <span class="code-tag">&lt;<span class="code-name">artifactId</span>&gt;</span>gs-spring-boot-demo<span\n            class="code-tag">&lt;/<span class="code-name">artifactId</span>&gt;</span>\n    <span class="code-tag">&lt;<span class="code-name">version</span>&gt;</span>0.1.0<span class="code-tag">&lt;/<span\n            class="code-name">version</span>&gt;</span>\n    <span class="code-tag">&lt;<span class="code-name">dependencies</span>&gt;</span>\n        <span class="code-tag">&lt;<span class="code-name">dependency</span>&gt;</span>\n            <span class="code-tag">&lt;<span class="code-name">groupId</span>&gt;</span>org.springframework.boot<span\n            class="code-tag">&lt;/<span class="code-name">groupId</span>&gt;</span>\n            <span class="code-tag">&lt;<span class="code-name">artifactId</span>&gt;</span>spring-boot-starter-web<span\n            class="code-tag">&lt;/<span class="code-name">artifactId</span>&gt;</span>\n\t    \t<span class="code-tag">&lt;<span class="code-name">version</span>&gt;</span>1.5.9.RELEASE<span\n            class="code-tag">&lt;/<span class="code-name">version</span>&gt;</span>\n        <span class="code-tag">&lt;/<span class="code-name">dependency</span>&gt;</span>\n    <span class="code-tag">&lt;/<span class="code-name">dependencies</span>&gt;</span>\n    <span class="code-tag">&lt;<span class="code-name">properties</span>&gt;</span>\n        <span class="code-tag">&lt;<span class="code-name">java.version</span>&gt;</span>1.8<span class="code-tag">&lt;/<span\n            class="code-name">java.version</span>&gt;</span>\n    <span class="code-tag">&lt;/<span class="code-name">properties</span>&gt;</span>\n<span class="code-tag">&lt;/<span class="code-name">project</span>&gt;</span></code></pre>\n<p>引入了&nbsp;spring-boot-starter-web，基本上开发一个web应用所需的包都会引入其中。如果需要使用JPA等等功能需要另外引入对应的<strong><em>starter</em></strong>。spring-boot用pom的方式整合了许多开箱即用的工具，官方称之为<em><strong>starter</strong></em>特性，后面会介绍什么是<em><strong>starter。</strong></em>\n</p>\n\n<h4 id="h4-3">启动</h4>\n<p>Spring boot提供了多种启动方式，最简单的方式是在main方法中调用&nbsp;SpringApplication.run 方法即可启动Spring Boot。当然，run方法必须要配合相关的注解才能实现Spring\n    Boot目标功能。关于spring boot打包以及<strong><em>jara -jar</em></strong>或者<em><strong>CLI</strong></em>启动，后续的博文会介绍。</p>\n\n<h4 id="h4-4">DEBUG模式</h4>\n<p>通常情况下，启动Spting Boot时日志输出都是生产模式（关闭DEBUG级别的日志），在启动参数中增加--debug参数即可开启调试模式的日志输出。</p>\n<p>Eclipse的设置：工程右键-&gt;Debug As-&gt;Debug Configurations-&gt;打开Arguments选项-&gt;在Program arguments中增加 --debug 参数。</p>\n<p><img height="429" src="https://file.mahoooo.com/res/file/spring_boot_features_get_started_1.png" width="879"\n        alt="Spring Boot特性入门篇"></p>\n\n<h4 id="h4-5">纯Java配置——@Configuration</h4>\n<p>\n    <em>@Configuration</em>是一个用于类的注解，他可以替换原来定义在<em>xml</em>文件中的<em>spring</em>配置。当为某一个类增加这个注解后，会将其视作一个源自配置文件的<em>Bean</em>。<br>\n    其实<em>spring</em>的<em>ioc</em>容器一直以来都没多大变化，延续基于单例的<em>IOC</em>的机制一直向下衍生功能线，不管使用什么注解，基本上所有用到的实例都是一个<em>Bean</em>，所有的<em>Bean</em>都放在同一个的<em>IOC</em>容器中（当然也可以创建多个容器，但是似乎并没什么应用需要这么特殊的实现）。<em>Spring\n    Xml</em>配置是根据<em>xml</em>的描述生成多个<em>Bean</em>，而引入<em>@Configuration</em>注解使得配置可以彻底基于<em>Java</em>代码。</p>\n\n<h4 id="h4-6">自动配置注入——@EnableAutoConfiguration&nbsp;</h4>\n<p>这个注解用于在<em>Spring</em>的<em>IOC</em>容器中启用自动推导配置功能（使用boot中定义的默认配置）。其执行过程实际就是根据<em>classpath</em>中的包来决定是否需要注入某个用于资源配置的Bean来支持其工作。比如在<em>classpath</em>中发现了<code>tomcat-embedded.jar</code>&nbsp;这个包，那么可以推定需要启用tomcat的嵌入工具，那么boot会帮助我们创建一个&nbsp;<a\n        href="https://docs.spring.io/spring-boot/docs/1.5.9.RELEASE/api/org/springframework/boot/context/embedded/tomcat/TomcatEmbeddedServletContainerFactory.html"\n        rel="nofollow"><code>TomcatEmbeddedServletContainerFactory</code></a>&nbsp;的实例作为Bean放置到容器中以供其使用。我们可以通过注解的&nbsp;&nbsp;<a\n        href="https://docs.spring.io/spring-boot/docs/1.5.9.RELEASE/api/org/springframework/boot/autoconfigure/EnableAutoConfiguration.html#exclude--"\n        rel="nofollow"><code>exclude()</code></a>&nbsp;和&nbsp;<a\n        href="https://docs.spring.io/spring-boot/docs/1.5.9.RELEASE/api/org/springframework/boot/autoconfigure/EnableAutoConfiguration.html#excludeName--"\n        rel="nofollow"><code>excludeName()</code></a>&nbsp;方法告知不需要自动生成某些配置。也可以通过声明&nbsp;&nbsp;<code>spring.autoconfigure.exclude</code>&nbsp;JVM参数。&nbsp;\n</p>\n<p>\n    实质上Spring-Boot-Web就是一个更加自动化的Spring-Webmvc——不用整合servlet容器并且分分钟启动。而Spring-Boot最大的亮点之一就是根据引入的包自动注入配置。如果打开--debug模式会看到很多匹配相关的内容输出。下面是自动匹配输出的一些内容，为了便于说明只选取了很小一部分，实际输出的内容比这个多得多。</p>\n<pre><code class="ruby">=========================\nAUTO-CONFIGURATION REPORT\n=========================\n\nPositive <span class="hljs-symbol">matches:</span>\n-----------------\n\n   DispatcherServletAutoConfiguration <span class="hljs-symbol">matched:</span>\n      - @ConditionalOnClass found required <span class="hljs-class"><span class="code-keyword">class</span> \'<span\n            class="code-title">org</span>.<span class="code-title">springframework</span>.<span\n            class="code-title">web</span>.<span class="code-title">servlet</span>.<span class="code-title">DispatcherServlet</span>\';</span> @ConditionalOnMissingClass did <span\n            class="code-keyword">not</span> find unwanted <span class="hljs-class"><span\n            class="code-keyword">class</span> (<span class="code-title">OnClassCondition</span>)</span>\n      - @ConditionalOnWebApplication (required) found StandardServletEnvironment (OnWebApplicationCondition)\n\n   DispatcherServletAutoConfiguration.DispatcherServletConfiguration <span class="hljs-symbol">matched:</span>\n      - @ConditionalOnClass found required <span class="hljs-class"><span class="code-keyword">class</span> \'<span\n            class="code-title">javax</span>.<span class="code-title">servlet</span>.<span class="code-title">ServletRegistration</span>\';</span> @ConditionalOnMissingClass did <span\n            class="code-keyword">not</span> find unwanted <span class="hljs-class"><span\n            class="code-keyword">class</span> (<span class="code-title">OnClassCondition</span>)</span>\n      - Default DispatcherServlet did <span class="code-keyword">not</span> find dispatcher servlet beans (DispatcherServletAutoConfiguration.DefaultDispatcherServletCondition)\n\n\nNegative <span class="hljs-symbol">matches:</span>\n-----------------\n\n   <span class="hljs-symbol">ActiveMQAutoConfiguration:</span>\n      Did <span class="code-keyword">not</span> <span class="hljs-symbol">match:</span>\n         - @ConditionalOnClass did <span class="code-keyword">not</span> find required classes <span\n            class="code-string">\'javax.jms.ConnectionFactory\'</span>, <span class="code-string">\'org.apache.activemq.ActiveMQConnectionFactory\'</span> (OnClassCondition)\n\n</code></pre>\n<p>从<em>AUTO-CONFIGURATION REPORT </em>开始就是匹配日志，<em>Positive matche</em>&nbsp;之后的表示匹配上的配置，<em>Negative matches</em>之后表示未匹配上的配置。每一项的内容都详细说明了匹配上的依赖关系和未匹配的原因。\n</p>\n\n<h4 id="h4-7">包扫描——@ComponentScan</h4>\n<p>\n    <em>@ComponentScan</em>注解用于设定<em>IOC</em>容器加载<em>Bean</em>的扫描路径，等价于<em>xml</em>配置中的<em>&lt;context:component-scan&gt;</em>元素（<em>@ComponentScan</em>属于<em>Spring\n    Framework的Context</em>模块）。在指定的路径中会将<em>@Component</em>及其子类限定的类（如<em>@Service</em>、<em>@Repository</em>、<em>@Controller</em>）作为一个<em>Bean</em>添加到<em>IOC</em>容器中。\n</p>\n<p><em>@ComponentScan</em>中包含多个参数，例如<em>basePackages</em>、<em>basePackageClasses</em>、<em>excludeFilters</em>等，都是用于定义扫描的包路径或限定名。如果没有为@ComponentScan注解设定任何参数，则会扫描当前包以及所有子孙包。\n</p>\n\n<h4 id="h4-8">Spring-boot整合——@SpringBootApplication</h4>\n<p><em>@SpringBootApplication</em>注解整合了<em>@Configuration</em>、<em>@EnableAutoConfiguration</em>、<em>@ComponentScan</em>的效果。当为一个入口类（包含启动的main方法）定义一个@SpringBootApplication注解后，意味着增加了上述三个注解的功能——1）当前类是一个资源Bean，2）启用spring\n    boot的自动推导配置（开箱即用）、3）自动扫描入口类之后的所有子包。</p>\n<p>所以下面2种写法实现的效果是几乎一致的（在<em>@SpringBootApplication</em>中对<em>@ComponentScan</em>做了参数限定，所以只能说几乎一致。）：</p>\n<pre><code class="java"><span class="code-meta">@EnableAutoConfiguration</span>\n<span class="code-meta">@ComponentScan</span>\n<span class="code-meta">@Configuration</span>\n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n            class="code-title">Demo</span></span>{\n    <span class="hljs-function"><span class="code-keyword">public</span> <span class="code-keyword">static</span> <span\n            class="code-keyword">void</span> <span class="code-title">main</span><span class="hljs-params">(String[] args)</span> <span\n            class="code-keyword">throws</span> Exception </span>{\n        SpringApplication.run(Demo.class, args);\n    }\n}</code></pre>\n<pre><code class="java"><span class="code-meta">@SpringBootApplication</span>\n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n            class="code-title">Demo</span></span>{\n    <span class="hljs-function"><span class="code-keyword">public</span> <span class="code-keyword">static</span> <span\n            class="code-keyword">void</span> <span class="code-title">main</span><span class="hljs-params">(String[] args)</span> <span\n            class="code-keyword">throws</span> Exception </span>{\n        SpringApplication.run(Demo.class, args);\n    }\n}</code></pre>\n\n<h4 id="h4-9">开箱即用——Starter</h4>\n<p>Spring Boot通过Maven的方式提供了一系列开箱即用（一站式服务）的工具，包括MQ、AOP、JPA等，文档上将这个特性命名为<em><strong>Starter。</strong></em>前面 <em><strong>引入</strong></em>\n    部分使用的&nbsp;<em>spring-boot-starter-web </em>就是一个<em><strong>Starter</strong></em>&nbsp;。<strong><em>Starter </em></strong>特性并没有什么新的技术，仅仅是通过pom文件的方式引用了一些必要的包，然后在引入之后通过<em>Spring\n        Boot</em>的自动推导配置为引入的<em>jar包</em>注入必要的配置Bean。<a\n            href="https://docs.spring.io/spring-boot/docs/current/reference/html/using-boot-build-systems.html#using-boot-starter"\n            rel="nofollow">官网的表13.1</a> 列举了所有<em>Sprint Boot</em>官方提供的<em><strong>Starter</strong></em>。</p>\n<p>当然除了官方提供的<strong><em>Starter</em></strong>我们还可以自定义。不过需要注意的是命名规则——由官方提供的<strong><em>Starter</em></strong>命名规则为<em>spring-boot-starter-*</em>，而自定义（第三方提供）的规则为<em>&nbsp;acme-spring-boot-starter-*。自定义的<strong>Starter</strong>在某些使用需要额外指定自动配置功能，详情请看\n    <a href="https://docs.spring.io/spring-boot/docs/current/reference/html/boot-features-developing-auto-configuration.html#boot-features-custom-starter"\n       rel="nofollow">关于自定义Starter的说明</a>。</em></p>\n\n<h4 id="h4-10">逐渐替换默认配置</h4>\n<p>这也是<em>Spring Boot</em>的最佳实践之一。虽然它提供了相当丰富的默认配置，但是并不是所有的东西用默认配置就可以解决。Spring Boot建议根据需要逐渐替换工程所需的配置。例如默认情况下工程引入了 <a\n        href="http://hsqldb.org/" rel="nofollow">HSQLDB</a>&nbsp;，并且没有配置<strong><em>DataSource</em></strong>，那么我们所有的数据库操作（例如<em>JPA</em>）都会直接使用<a\n        href="http://hsqldb.org/" rel="nofollow">HSQLDB</a>内存数据库。如果我们向<em>容器</em>注入了<strong><em>DataSource</em></strong>实例，那么我们定义的配置将会替换默认配置。\n</p>\n\n<h3 id="h3-2">开发Spring-boot</h3>\n\n<h4 id="h4-11">全局定义开发环境——spring-boot-devtools</h4>\n<p><em>spring-boot-devtools</em>（以下简称<em>Devtools</em>）为开发环境提供了许多快速便捷的设置，仅需要增加一个依赖即可实现开发所需的配置，以<em>Maven</em>为例：</p>\n<pre><code class="xml"><span class="code-tag">&lt;<span class="code-name">dependencies</span>&gt;</span>\n    <span class="code-tag">&lt;<span class="code-name">dependency</span>&gt;</span>\n        <span class="code-tag">&lt;<span class="code-name">groupId</span>&gt;</span>org.springframework.boot<span\n            class="code-tag">&lt;/<span class="code-name">groupId</span>&gt;</span>\n        <span class="code-tag">&lt;<span class="code-name">artifactId</span>&gt;</span>spring-boot-devtools<span\n            class="code-tag">&lt;/<span class="code-name">artifactId</span>&gt;</span>\n        <span class="code-tag">&lt;<span class="code-name">optional</span>&gt;</span>true<span\n            class="code-tag">&lt;/<span class="code-name">optional</span>&gt;</span>\n    <span class="code-tag">&lt;/<span class="code-name">dependency</span>&gt;</span>\n<span class="code-tag">&lt;/<span class="code-name">dependencies</span>&gt;</span></code></pre>\n<p>在引入他之后当前环境自动变为开发环境。需要注意的是如果运行完整打包的工程<em>Spring Boot</em>不启用任何<em>Devtools</em>相关的功能（实际上打包工具<em>spring-boot-maven-plugin</em>默认情况下不会去打包<em>Devtools</em>），为了防止<em>Devtools</em>的作用域污染子项目，我们最好增加\n    <em>Maven </em>的 <em>optional</em> 标记。</p>\n<p>下面介绍<em>Devtools</em>具体提供了什么功能。</p>\n<p><strong>1.代码修改与热部署</strong></p>\n<p><em>Devtools&nbsp;</em>的一项功能就是能够监控代码的变更，并在发现变更时“热部署”最新的代码。不过这里的热部署不是Jvm bytecode级别的热部属，也和OGSI没任何关系。</p>\n<p>根据官方的介绍是实现了两个ClassLoader——BaseClassLoader和RestartClassLoader（推断这2个ClassLoader应该破坏了双亲委派模型）。第一次启动<em>JVM</em>时所有的<em>.class</em>文件和<em>.jar</em>文件中的类都用<em>BaseClassLoader</em>加载，然后在开发的过程中凡是变更过的<em>.class</em>\n    文件都会被标记，这些被标记的<em>.class</em>之后都会使用<em>RestartClassLoader</em>加载。在初始化一个类时，被标记了用RestartClassLoader加载的Class&lt;?&gt;实例，没有被标则委派给BaseClassLoader加载，每次发起“热部署”时都会新建一个RestartClassLoader重新加载类，这样可以保证变更过的代码都是重新加载的。\n</p>\n<p>在<em>Devtools</em>进行“热部署”时会调用<a href="https://www.concretepage.com/spring/registershutdownhook_spring"\n                                   rel="nofollow">spring的上下文挂钩（spring context hook）</a>来重新部署IOC容器。如果你关闭了它——<span\n        style="color:#FF0000"><em>SpringApplication.setRegisterShutdownHook(false)</em></span>，“热部署”无法将新加载的类实例部署到<em>IOC</em>容器中导致代码替换失败。\n</p>\n<p><img height="385" src="https://file.mahoooo.com/res/file/spring_boot_features_get_started_2.png" width="807"\n        alt="Spring Boot特性入门篇"></p>\n<p>上面是开发过程中Jconsole的输出，每一次修改代码保存都会新增一些非堆（方法区）的空间，这说明重新加载了新的字节码数据并解析到非堆中。</p>\n<p><em>jvm</em>环境中classPath路径下的任何文件修改都会触发<em>Devtools&nbsp;</em>的热部署，某些时候并不需要都监控所有的路径，例如/resources、/static、/template等，我们可以通过设定<em>spring.devtools.restart.exclude</em>属性来排除热部署监控的位置。例如：\n</p>\n<pre><code class="javascript">spring.devtools.restart.exclude=<span class="code-keyword">static</span><span\n        class="code-comment">/**</span></code></pre>\n<p>此外，使用“热部署”时还需注意以下几点（个个都有可能是引发问题的坑啊）：</p>\n<ol>\n    <li>属性<em>spring.devtools.restart.additional-paths</em>属性可以用来增加监控<em>classpath</em>之外的路径。</li>\n    <li><em>Devtools</em>内嵌了<a href="http://livereload.com/extensions/" rel="nofollow">LiveReload</a>，如果不想启用它可以将<em>spring.devtools.livereload.enabled</em>属性设置为<em>fasles</em>。\n    </li>\n    <li><em>Devtools</em>会自动忽略某些包的扫描，例如<em>spring-boot、spring-boot-devtools、spring-boot-autoconfigure、spring-boot-actuator、spring-boot-starter</em>。\n    </li>\n    <li><em>Devtools</em>会修改<em>SpringContext</em>指定的<em>ResourceLoader</em>，如果自定义了一个新的<em>ResourceLoader</em>，修改后的<em>getResource</em>方法将无法生效。\n    </li>\n    <li>将<em>spring.devtools.restart.enabled</em>属性设置为<em>false</em>可以关闭<em>Devtools</em>的“热部署”功能。</li>\n    <li>\n        某些<em>IDE</em>整合了代码监控功能，可以通过<em>spring.devtools.restart.trigger-file</em>属性指定要监控的文件，只有这个文件发生变更时才会触发<em>Devtools</em>进行全局的文件变更检查。\n    </li>\n    <li>前面介绍了<em>Devtools</em>的“热部署”是通过2个<em>ClassLoader</em>（<em>BaseClassLoader、RestartClassLoader</em>）实现的，默认情况下<em>.jar</em>包中的类只会使用<em>BaseClassLoader</em>加载。我们可以通过在根目录新建一个<em>META-INF/spring-devtools.properties</em>文件，然后在其中设置restart.exclude.\n        和&nbsp;restart.include. 属性来指定被&nbsp;RestartClassLoader 加载的 .jar 类。详情见<a\n                href="https://docs.spring.io/spring-boot/docs/1.5.9.RELEASE/reference/htmlsingle/#using-boot-devtools-customizing-classload"\n                rel="nofollow">官网例子</a>。\n    </li>\n</ol>\n<p><strong>2.缓存启用和停用</strong></p>\n<p>很多框架、工具都提供了缓存功能，在生产环境中对某些热数据进行适当的缓存能够有效的提高性能。但是在开发环境这些缓存反而会影响我们验证功能。所以<em>Devtools</em>全局提供了缓存管理，并默认关闭大部分工具或框架的缓存。开发人员可用通过设置运行环境properties的方式来指定缓存功能，例如：\n</p>\n<pre><code class="java">System.setProperty(<span class="code-string">"spring.thymeleaf.cache"</span>, <span\n        class="code-string">"true"</span>);</code></pre>\n<p>就可以指定启用thymeleaf模板引擎的缓存。缓存管理相关的配置请看 <a\n        href="https://github.com/spring-projects/spring-boot/blob/v1.5.9.RELEASE/spring-boot-devtools/src/main/java/org/springframework/boot/devtools/env/DevToolsPropertyDefaultsPostProcessor.java"\n        rel="nofollow">github上spring-<em>boot-devtools环境设置</em>相关的代码</a> 。</p>\n<p><strong>3.文件配置</strong></p>\n<p>除了使用参数，我们可以把<em>Devtools</em>的所有配置写到<em>$HOME</em>目录下一个"<em>.spring-boot-devtools.properties</em>"的文件中。例如：</p>\n<pre>spring.devtools.reload.trigger-file=.reloadtrigger</pre>\n<p><strong>4.远程开发</strong></p>\n<p>Devtools除了提供本机开发的增强功能之外，还增加了强大的远程开发与调试功能。</p>\n<p>首先，<a href="https://docs.spring.io/spring-boot/docs/1.5.9.RELEASE/reference/htmlsingle/#using-boot-devtools-remote"\n         rel="nofollow">我们需要在打包的时候连同spring-boot-devtools一起打包并发布</a>，而<em>spring-boot-maven-plugin</em>默认不是打包<em>Devtools</em>的，所以我们需要将<em>Pom</em>文件的<em>plugins</em>配置简单修改一下：\n</p>\n<pre><code class="xml"><span class="code-tag">&lt;<span class="code-name">build</span>&gt;</span>\n    <span class="code-tag">&lt;<span class="code-name">plugins</span>&gt;</span>\n        <span class="code-tag">&lt;<span class="code-name">plugin</span>&gt;</span>\n            <span class="code-tag">&lt;<span class="code-name">groupId</span>&gt;</span>org.springframework.boot<span\n            class="code-tag">&lt;/<span class="code-name">groupId</span>&gt;</span>\n            <span class="code-tag">&lt;<span class="code-name">artifactId</span>&gt;</span>spring-boot-maven-plugin<span\n            class="code-tag">&lt;/<span class="code-name">artifactId</span>&gt;</span>\n            <span class="code-tag">&lt;<span class="code-name">configuration</span>&gt;</span>\n                <span class="code-tag">&lt;<span class="code-name">excludeDevtools</span>&gt;</span>false<span\n            class="code-tag">&lt;/<span class="code-name">excludeDevtools</span>&gt;</span>\n            <span class="code-tag">&lt;/<span class="code-name">configuration</span>&gt;</span>\n        <span class="code-tag">&lt;/<span class="code-name">plugin</span>&gt;</span>\n    <span class="code-tag">&lt;/<span class="code-name">plugins</span>&gt;</span>\n<span class="code-tag">&lt;/<span class="code-name">build</span>&gt;</span></code></pre>\n<p>发布之前需要设置一个属性：</p>\n<pre>spring.devtools.remote.secret=mysecret</pre>\n<p><span style="color:#FF0000">&nbsp;特别需要注意：这个属性会带来安全风险，所以仅仅用于测试和开发，切记不要用于生产运行。</span></p>\n<p>将打好的包部署到远程服务器即可，我们称之为服务端。</p>\n<p>然后，<a\n        href="https://docs.spring.io/spring-boot/docs/1.5.9.RELEASE/reference/htmlsingle/#_running_the_remote_client_application"\n        rel="nofollow">要在本地开发环境配置一个客户端</a>。</p>\n<p>客户端需要配合IDE一起使用。假设你的工程名字为<em>my-app</em>在Eclipse下进行下面的配置：</p>\n<ol>\n    <li><em><strong>Run</strong></em> 菜单栏目里选择<em><strong>Run Configurations...</strong></em>。</li>\n    <li>创建一个新的&nbsp;<em><strong>Java Application</strong></em>（在<em><strong>Java\n        Application</strong></em>处右键，然后选择<em><strong>new</strong></em>）。\n    </li>\n    <li><strong><em>Project</em></strong>一栏里选择<em>my-app</em>工程。</li>\n    <li><strong><em>Main\n        Class</em></strong>一栏里使用<em>org.springframework.boot.devtools.RemoteSpringApplication</em>作为<em>main</em>方法类。\n    </li>\n    <li><em><strong>Arguments</strong></em>选项卡中，在<strong><em>Program arguments</em></strong>中添加服务端的地址（类似https://myapp.cfapps.io的格式）\n    </li>\n</ol>\n<p>最后，启用了<em>spring.devtools.remote.secret</em>之后，客户端会监控本地classpath下文件变更。一旦触发“热部署”它会先在本地完成，然后将变更的内容推送到远程服务端触发“热部署”。就像你在本地开发一样，这对开发一些回调应用和不同环境的调试带来了极大的便利。\n</p>\n<p>还有，<em>Devtools</em>在基于<em>jdwp</em>远程调式的基础上进行了扩展，提供支持<em>HTTP</em>传输远程调试信息。绝大部分情况下都能使用<em>Java</em>的远程调试能解问题，如有特殊需求（如用到<em>docker</em>等），可以看\n    <a href="https://docs.spring.io/spring-boot/docs/1.5.9.RELEASE/reference/htmlsingle/#using-boot-devtools-remote-debugtunnel"\n       rel="nofollow">这里</a>。</p>'}};