exports.ids=[21],exports.modules={351:function(n,s,a){"use strict";Object.defineProperty(s,"__esModule",{value:!0});s.content='<h2 id="h2-1">SpringApplication</h2>\n<p>在使用Spring-boot时，永远要记住它仅仅是Spring Framework的延伸（或者说整合），其底层还是基于Spring Framework（core、contest、bean）。所以Spring该有的特性Spring\n    Boot中都会存在。</p>\n\n<h3 id="h3-1">启动异常</h3>\n<p>Spring在启动时需要初始化容器、向容器在注入类等等操作，如果在启动过程中发生任何异常，我们可以通过&nbsp;FailureAnalyzers 特性来获取异常启动的信息，结构如下：</p>\n<pre><code class="markdown"><span class="hljs-strong">*****</span><span class="hljs-strong">*****</span><span\n        class="hljs-strong">*****</span><span class="hljs-strong">*****</span><span class="hljs-strong">*****</span>**\nAPPLICATION FAILED TO START\n<span class="hljs-strong">*****</span><span class="hljs-strong">*****</span><span class="hljs-strong">*****</span><span\n            class="hljs-strong">*****</span><span class="hljs-strong">*****</span>**\n\nDescription:\n\nEmbedded servlet container failed to start. Port 8080 was already in use.\n\nAction:\n\nIdentify and stop the process that\'s listening on port 8080 or configure this application to listen on another port.</code></pre>\n<p>如果需要获取更详细的信息，我们可以开打DEBUG模式。请参看总结的第一章。</p>\n\n<h3 id="h3-2">自定义Banner</h3>\n<p>默认情况下Spring Boot启动时日志会自带一个Banner，如下：</p>\n<pre><code class="ruby"><span class="hljs-number">2018</span>-<span class="hljs-number">01</span>-<span\n        class="hljs-number">22</span> <span class="hljs-number">10</span><span class="hljs-symbol">:</span><span\n        class="hljs-number">49</span><span class="hljs-symbol">:</span><span\n        class="hljs-number">43.865</span> DEBUG <span class="hljs-number">4510</span> --- [  restartedMain] .b.l.ClasspathLoggingApplicationListener : Application started with <span\n        class="hljs-symbol">classpath:</span> [<span class="hljs-symbol">file:</span>/work/demo2/target/classes/]\n\n  .   ___<span class="hljs-number">_</span>          <span class="hljs-number">_</span>            _<span\n            class="hljs-number">_</span> <span class="hljs-number">_</span> <span class="hljs-number">_</span>\n /\\\\ / __<span class="hljs-number">_</span><span class="code-string">\'_ __ _ _(_)_ __  __ _ \\ \\ \\ \\\n( ( )\\___ | \'</span><span class="hljs-number">_</span> <span class="hljs-params">| \'_|</span> <span class="hljs-params">| \'_ \\/ _` |</span> \\ \\ \\ \\\n \\\\/  __<span class="hljs-number">_</span>)<span class="hljs-params">| |</span><span class="hljs-number">_</span>)<span\n            class="hljs-params">| |</span> <span class="hljs-params">| |</span> <span\n            class="hljs-params">| |</span><span class="hljs-params">| (_|</span> <span class="hljs-params">|  ) ) ) )\n  \'  |</span>___<span class="hljs-number">_</span><span class="hljs-params">| .__|</span><span\n            class="hljs-number">_</span><span class="hljs-params">| |</span><span class="hljs-number">_</span><span\n            class="hljs-params">|_|</span> <span class="hljs-params">|_\\__, |</span> / <span\n            class="hljs-regexp">/ /</span> /\n =========<span class="hljs-params">|_|</span>==============<span class="hljs-params">|___/=/_/_/_/\n :: Spring Boot ::        (v1.5.9.RELEASE)\n\n2018-01-22 10:49:44.007  INFO 4510 --- [  restartedMain] o.p.springframe.boot.demo.webmvc.Demo    : Starting Demo on chkui with PID 4510 (/work/demo2/target/classes started by chenkui <span\n                class="code-keyword">in</span> /work/demo2)</span></code></pre>\n<p>绝大部分情况我们直接关闭它，但是在某些场景下我们需要自定义我们的Banner（比如做为一个产品部分给客户时）。</p>\n<p>可以在ClassPath中添加一个名为"banner.txt"的文件，然后在JVM中设定"banner.location"的属性来指向他，还可以通过&nbsp;banner.charset\n    来指定文件的编码。除了文本之外，还可以将Banner设定为图片——在banner.txt中通过banner.gif、banner.jpg、banner.png来指定，或者直接设定JVM的banner.image.location属性。图片会被转换成ASCII并在文本中输出它。</p>\n<p>可以在banner.txt文件描述中通过${}方式引入各种参数，<a\n        href="https://docs.spring.io/spring-boot/docs/1.5.9.RELEASE/reference/htmlsingle/#boot-features-banner"\n        rel="nofollow">详情见Banner的参数描述部分</a>。</p>\n<p>SpringApplication.setBanner()方法或org.springframework.boot.Banner 设置为false可以直接关闭Banner的输出。</p>\n\n<h3 id="h3-3">设置启动参数</h3>\n<p>\n    通常情况下，我们使用SpringApplication.run(args)的静态方法就可以启动Boot。其实静态的run方法也是在代码中创建了一个SpringApplication的实例。我们可以可以像下面这样自己创建SpringApplication实例并设置参数，最后启动它：</p>\n<pre><code class="java"><span class="hljs-function"><span class="code-keyword">public</span> <span class="code-keyword">static</span> <span\n        class="code-keyword">void</span> <span class="code-title">main</span><span\n        class="hljs-params">(String[] args)</span> </span>{\n    SpringApplication app = <span class="code-keyword">new</span> SpringApplication(MySpringConfiguration.class);\n    app.setBannerMode(Banner.Mode.OFF);<span class="code-comment">//不输出Banner</span>\n    app.run(args);\n}</code></pre>\n<p>传递给run方法的args参数可以用于Boot的外部配置，也可以直接使用@Configuration的方式而什么都不传递，关于外部化配置的说明请见后续配置部分说明。</p>\n\n<h3 id="h3-4">"函数式"Builder代码</h3>\n<p>Boot还提供了更加“函数式”方法来构建SpringApplication：</p>\n<pre><code class="java"><span class="code-keyword">new</span> SpringApplicationBuilder()\n        .sources(Parent.class)\n        .child(Application.class)\n        .bannerMode(Banner.Mode.OFF)\n        .run(args);</code></pre>\n<p>SpringApplicationBuilder可以很方便的用于创建多个Context，不过创建多个Context时也有一些限制，详情请看&nbsp;<a\n        href="https://docs.spring.io/spring-boot/docs/1.5.9.RELEASE/api/org/springframework/boot/builder/SpringApplicationBuilder.html"\n        rel="nofollow">SpringApplicationBuilder 的 API</a>。</p>\n\n<h3 id="h3-5">事件以及监听</h3>\n<p>\n    除了<a\n        href="https://docs.spring.io/spring/docs/4.3.13.RELEASE/spring-framework-reference/htmlsingle/#context-functionality-events"\n        rel="nofollow">Spring Framework原有的事件外</a>，Boot还额外增加了一些必要的事件。我们可以通过调用SpringApplication.addListeners(​)来增加事件。Boot特有的事件包括：\n</p>\n<ol>\n    <li>ApplicationStartingEvent：在Application开始运行（这个时候仅仅完成初始化工具的生成和监听器的生成，其他任何context或者bean都不存在）时触发这个事件。</li>\n    <li>ApplicationEnvironmentPreparedEvent：这个事件被触发的时机是，上下文环境已经确定但是还未创建context（即容器还未开始创建）。</li>\n    <li>ApplicationPreparedEvent：触发的时机是所有的Bean（Class类）已经被读取，但是还未执行Context的refresh方法（refresh用于Spring初始化一个Context）。</li>\n    <li>ApplicationReadyEvent：在完成上下文初始化、Beans加载，所有的功能都准备就绪时触发。</li>\n    <li>ApplicationFailedEvent：在启动初始化过程中出现异常时触发。</li>\n</ol>\n<p>\n    使用监听器需要注意的是某些事件会在Context初始化之前就被创建，所以我们无法将这些监听器著注册成一个@Bean使用，除了通过SpringApplication.addListeners(​)和SpringApplicationBuilder.listeners()方法，还可以在META-INF/spring.factories文件中创建一个org.springframework.context.ApplicationListener字段指向监听类列表，例如：</p>\n<pre><code class="">org.springframework.context.ApplicationListener=com.example.project.MyListener</code></pre>\n<p>SpringBoot的事件是通过Spring\n    Framework的事件机制传递的，这个事件的一个特点是当我们向子context发送事件时候，它的所有祖先context都会收到这个事件，所以我们在使用多个层级的SpringBoot应用时监听器必须对收到的事件来源加以区分，我们可以通过ApplicationContextAware来获取当前的Context，或者如果监听器是一个Bean，可以直接使用@Autowired注入。</p>\n\n<h3 id="h3-6">Web环境</h3>\n<p>\n    我们知道Spring有各种各样的ApplicationContext，而Boot的自动配置推导功能会根据ClassPath中所包含的内容来确定使用哪个ApplicationContext。通常情况下，如果你使用的是一个web环境工程（例如依赖了spring-boot-starter-web），Boot会使用AnnotationConfigEmbeddedWebApplicationContext，否则会使用AnnotationConfigApplicationContext。确定当前环境是否为Web环境的算法十分简单，通过判断几个类是否存在而确定，我们可以setWebEnvironment(boolean)方法来手工指定当前的环境。当然如果你对各类ApplicationContext十分了解，可以调用SpringApplication.setApplicationContextClass()直接设置ApplicationContext。</p>\n\n<h3 id="h3-7">获取Application参数</h3>\n<p>我们在运行run方法时会传递由main传入的String[] args 参数，这个参数可以设定各种运行环境参数。我们可以通过注入ApplicationArguments在任何地方获取这个参数。</p>\n<pre><code class="java"><span class="code-keyword">import</span> org.springframework.boot.*\n<span class="code-keyword">import</span> org.springframework.beans.factory.annotation.*\n<span class="code-keyword">import</span> org.springframework.stereotype.*\n\n<span class="code-meta">@Component</span>\n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n            class="code-title">MyBean</span> </span>{\n\n    <span class="code-meta">@Autowired</span>\n    <span class="hljs-function"><span class="code-keyword">public</span> <span class="code-title">MyBean</span><span\n            class="hljs-params">(ApplicationArguments args)</span> </span>{\n        <span class="code-keyword">boolean</span> debug = args.containsOption(<span class="code-string">"debug"</span>);\n        List&lt;String&gt; files = args.getNonOptionArgs();\n        <span class="code-comment">// if run with "--debug logfile.txt" debug=true, files=["logfile.txt"]</span>\n    }\n\n}</code></pre>\n<p>除此之外，CommandLinePropertySource可以获取Boot相关的运行环境参数。</p>\n\n<h3 id="h3-8">Application退出</h3>\n<p>我们关闭一个Java程序通常会直接关闭运行他的JVM，每一个SpringApplication都会向JVM注册一个shutdow\n    hook，以确保程序在退出时正确关闭ApplicationContext。所有SpringFramework标准的生命周期回调方法都会在此时被调用（例如DisposableBean接口，或者@PreDestroy注解标记的方法）。除此之外，Boot还新增了org.springframework.boot.ExitCodeGenerator接口来设定System.exit()退出时的返回编码，</p>\n<pre><code class="java"><span class="code-meta">@SpringBootApplication</span>\n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n            class="code-title">ExitCodeApplication</span> </span>{\n\n\t<span class="code-meta">@Bean</span>\n\t<span class="hljs-function"><span class="code-keyword">public</span> ExitCodeGenerator <span class="code-title">exitCodeGenerator</span><span\n            class="hljs-params">()</span> </span>{\n\t\t<span class="code-keyword">return</span> <span class="code-keyword">new</span> ExitCodeGenerator() {\n\t\t\t<span class="code-meta">@Override</span>\n\t\t\t<span class="hljs-function"><span class="code-keyword">public</span> <span\n                    class="code-keyword">int</span> <span class="code-title">getExitCode</span><span\n                    class="hljs-params">()</span> </span>{\n\t\t\t\t<span class="code-keyword">return</span> <span class="hljs-number">42</span>;\n\t\t\t}\n\t\t};\n\t}\n\n\t<span class="hljs-function"><span class="code-keyword">public</span> <span class="code-keyword">static</span> <span\n            class="code-keyword">void</span> <span class="code-title">main</span><span class="hljs-params">(String[] args)</span> </span>{\n\t\tSystem.exit(SpringApplication\n\t\t\t\t.exit(SpringApplication.run(ExitCodeApplication.class, args)));\n\t}\n\n}</code></pre>\n\n<h3 id="h3-9">JMX MBeanServer</h3>\n<p>通过spring.application.admin.enabled属性可以打开MBean相关的功能，然后我们的系统会向外暴露<a\n        href="https://github.com/spring-projects/spring-boot/blob/v1.5.9.RELEASE/spring-boot/src/main/java/org/springframework/boot/admin/SpringApplicationAdminMXBean.java"\n        rel="nofollow">SpringApplicationAdminMXBean</a>，我们可以通过这个MBean了解一些环境信息和配置信息或直接关闭在运行的程序。</p>\n<p>获取local.server.port属性可以知道当前JMX暴露的端口。</p>\n\n<h2 id="h2-2">外部化配置</h2>\n<p>每一个需要面向市场的系统都需要一些外部化的配置来解决不同环境的问题（例如开发环境、测试环境、生产环境）。</p>\n\n<h3 id="h3-10">加载外部属性值</h3>\n<p>我们一般将配置的数据记录在properties文件、YAML文件、环境变量中，或者通过命令行参数来传入。Spring\n    Boot提供了一套价值将这些外部数据加载到JVM的系统参数中。既然可以通过多种方式给SpringApplication设定外部参数，所以需要明确各种方式的优先级。Spring\n    Boot使用了一个非常特殊的PropertySource命令来设计，用于依次覆盖先前的配置。其优先级依次为：</p>\n<ol>\n    <li>如果有Devtools存在，优先使用Devtools的全局配置参数。</li>\n    <li>在测试用例中&nbsp;@TestPropertySource 的优先级最高。</li>\n    <li>我们会通过@SpringBootTest注解标记一个测试用例，其中的属性参数优先级其次。</li>\n    <li>由命令行传入的参数。</li>\n    <li>SPRING_APPLICATION_JSON指定的参数。</li>\n    <li>ServletConfig 的 init parameters。</li>\n    <li>ServletContext 的 init parameters。</li>\n    <li>java:comp/env 设定的 JNDI参数。</li>\n    <li>通过System.setProperties设定的参数。</li>\n    <li>操作系统参数。</li>\n    <li>以 random.* 形式命名的的&nbsp;RandomValuePropertySource 参数。</li>\n    <li>Jar包之外application-{profile}.properties文件配置的参数。</li>\n    <li>Jar包之内application-{profile}.properties文件配置的参数。</li>\n    <li>Jar包之外application.properties文件配置的参数。</li>\n    <li>Jar包之内application.properties文件配置的参数。</li>\n    <li>@Configuration类上@PropertySource指定的参数。</li>\n</ol>\n<p>例如在 application.properties 文件中设定一个名为 name 的参数，在不同的环境中，我们可以提供不同的&nbsp;application.properties 文件来修改配置参数。此外，我们可以继续保留默认的&nbsp;application.properties\n    文件，通过 java -jar app.jar --name="Spring" 命令的方式来指定 name 参数，由于优先级的问题，命令行使用的数据会覆盖application.properties中的数据。</p>\n\n<h3 id="h3-11">application.properties配置文件规则</h3>\n<p>SpringApplication会从以下路径加载所有的application.properties文件：</p>\n<ol>\n    <li>file:./config/（当前目录下的config文件夹）</li>\n    <li>file:./（当前目录）</li>\n    <li>classpath:/config/（classpath下的config目录）</li>\n    <li>classpath:/（classpath根目录）</li>\n</ol>\n<p>\n    优先级由上至下。需要特别说明的是，这个优先级是指属性最后使用的值，而不是说仅仅扫描优先级高的路径，如果发现了application.properties文件就停止。例如classpath:/config/和file:./config/都存在配置文件，那么加载过程会加载classpath:/config/路径下配置文件的所有属性，然后再加载file:./config/路径下配置文件的属性并替换已有的属性。</p>\n<p>如果你不想使用application.properties的格式命名配置文件，那么可以通过环境变量spring.config.name来设置文件名称，例如：</p>\n<pre><code class="apache">$ <span\n        class="code-attribute">java</span> -jar myproject.jar --spring.config.name=myproject</code></pre>\n<p>此时，要加载的配置文件名为myproject.properties。</p>\n<p>除了修改名称，还可以使用&nbsp;spring.config.location 来添加要加载的路径。例如我们以这个命令启动JVM：</p>\n<pre><code\n        class="bash">$ java -jar myapp.jar --spring.config.location=classpath:/myconfig/,file:./myconfig/</code></pre>\n<p>那么加载application.properties文件的路径以及优先级会变为：</p>\n<ol>\n    <li>file:./myconfig/</li>\n    <li>classpath:/myconfig/</li>\n    <li>file:./config/</li>\n    <li>file:./</li>\n    <li>classpath:/config/</li>\n    <li>classpath:/</li>\n</ol>\n<p>spring.config.location环境变量也可以直接设定到加载文件的名称，例如：</p>\n<pre>--spring.config.location=classpath:/default.properties</pre>\n<p>通常情况下这样做并没有太大问题，但是结合到Profiles文件特性时，会导致无法根据标记加载对应的Profiles文件。详情请看后面的Profiles文件介绍。</p>\n<p>由于配置文件路径和配置文件名称在容器未启动时就需要声明，所以最好在OS的环境变量、JVM的系统环境变量或命令行参数就设定它。</p>\n\n<h3 id="h3-12">替换符与数据注入</h3>\n<p>在从各种外部配置读取数据后，需要将其注入到Bean中作为数据项使用。Spring通常情况下使用@Value注解来实现：</p>\n<pre><code class="java"><span class="code-keyword">import</span> org.springframework.stereotype.*\n<span class="code-keyword">import</span> org.springframework.beans.factory.annotation.*\n<span class="code-meta">@Component</span>\n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n            class="code-title">MyBean</span> </span>{\n    <span class="code-meta">@Value</span>(<span class="code-string">"${name}"</span>)\n    <span class="code-keyword">private</span> String name;\n}</code></pre>\n<p>上面的例子中@Value("${name}")表示将JVM中的属性 --name注入到private String name成员变量。所以${}就是一个替换符号。</p>\n<p>除了直接指定某一个值，还通过JSON的方式更方便一次性指定多个属性。例如LINUX启动时使用：</p>\n<pre><code class="bash">$ SPRING_APPLICATION_JSON=<span class="code-string">\'{"foo":{"bar":"spam"}}\'</span> java -jar myapp.jar</code></pre>\n<p>在Spring环境中就有foo.bar=spam的数据。</p>\n<p>还可以直接通过 -D或直接--设定参数的方式直接设定Json：</p>\n<pre><code class="bash">$ java -Dspring.application.json=<span class="code-string">\'{"foo":"bar"}\'</span> -jar myapp.jar</code></pre>\n<pre><code class="java">$ java -jar myapp.jar --spring.application.json=<span class="code-string">\'{"foo":"bar"}\'</span></code></pre>\n<p>此时foo=bar。</p>\n\n<h3 id="h3-13">安全数据转换</h3>\n<p>使用@Value注解是将JVM中的属性转换为Bean最常规的方式。不过如果配置量很大，我们需要反复的书写很多的@Value，也不便于结构化。所以Spring Boot在Spring\n    Framework的基础上提供了一个支持结构化数据注入、支持安全类型推导转换、支持数据验证的方法——@<em>ConfigurationProperties。</em></p>\n<pre><code class="java"><span class="code-meta">@ConfigurationProperties</span>(<span class="code-string">"foo"</span>)\n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n            class="code-title">FooProperties</span> </span>{\n    <span class="code-keyword">private</span> <span class="code-keyword">boolean</span> enabled;\n    <span class="code-keyword">private</span> InetAddress remoteAddress;\n    <span class="code-keyword">private</span> <span class="code-keyword">final</span> Security security = <span\n            class="code-keyword">new</span> Security();\n    <span class="code-comment">//Getter and Setter</span>\n    <span class="code-keyword">public</span> <span class="code-keyword">static</span> <span class="hljs-class"><span\n            class="code-keyword">class</span> <span class="code-title">Security</span> </span>{\n        <span class="code-keyword">private</span> String username;\n        <span class="code-keyword">private</span> String password;\n        <span class="code-keyword">private</span> List&lt;String&gt; roles = <span class="code-keyword">new</span> ArrayList&lt;&gt;(Collections.singleton(<span\n            class="code-string">"USER"</span>));\n        <span class="code-comment">//Getter and Setter</span>\n    }\n}\n</code></pre>\n<p>上面的类省略了Get和Set方法，当时每一个作为POJO或Entity的类都必须提供完整的Get和Set方法。因为有了@ConfigurationProperties("foo")注解，此时JVM中有一个&nbsp;foo.enabled\n    =&nbsp;false/ture 的属性会被注入到enabled变量中，如果环境中没有foo.enabled，则会设定默认值 false。</p>\n<p>除了在POJO类上增加@ConfigurationProperties注解，还需要在入口类（一般设定在<em>@Configuration类上</em>）通过@EnableConfigurationProperties注解列举要执行@ConfigurationProperties的类，如下：\n</p>\n<pre><code class="java"><span class="code-meta">@Configuration</span>\n<span class="code-meta">@EnableConfigurationProperties</span>(FooProperties.class)\n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n            class="code-title">MyConfiguration</span> </span>{\n}</code></pre>\n<p>\n    对于@ConfigurationProperties，在注入环境的属性值之后，它会成为一个Bean在容器的任意位置使用。虽然一个Bean可以注入其他Bean，但是最好一个@ConfigurationProperties的类仅仅用来记录属性数据，而不要再依赖任何Bean。</p>\n\n<h3 id="h3-14">数据快捷绑定规则</h3>\n<p>用@ConfigurationProperties从JVM的属性转变为Bean可以有多种映射方式。直接用一个例子来说明：</p>\n<pre><code class="java"><span class="code-meta">@ConfigurationProperties</span>(prefix=<span class="code-string">"person"</span>)\n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n            class="code-title">OwnerProperties</span> </span>{<span class="code-comment">//Bean</span>\n    <span class="code-keyword">private</span> String firstName; <span class="code-comment">//值</span>\n    <span class="hljs-function"><span class="code-keyword">public</span> String <span\n            class="code-title">getFirstName</span><span class="hljs-params">()</span> </span>{\n        <span class="code-keyword">return</span> <span class="code-keyword">this</span>.firstName;\n    }\n    <span class="hljs-function"><span class="code-keyword">public</span> <span class="code-keyword">void</span> <span\n            class="code-title">setFirstName</span><span class="hljs-params">(String firstName)</span> </span>{\n        <span class="code-keyword">this</span>.firstName = firstName;\n    }\n\n}</code></pre>\n<p>根据前面的介绍，在SpringContext进行初始化的过程中会将person.firstName的属性注入到这个Bean的firsName成员变量中，但是除此之外，其他命名规则的属性值也会被绑定，如下：</p>\n<table border="1" cellpadding="1" cellspacing="1" style="width:500px">\n    <tbody>\n    <tr>\n        <td>person.firstName</td>\n        <td>标准的驼峰书写规则。</td>\n    </tr>\n    <tr>\n        <td>person.first-name</td>\n        <td>横线表示法，常用于在配置文件的书写中。</td>\n    </tr>\n    <tr>\n        <td>person.first_name</td>\n        <td>下划线表示法，用语配置文件的书写。</td>\n    </tr>\n    <tr>\n        <td>PERSON_FIRST_NAME</td>\n        <td>大写格式。常用于系统的环境变量。</td>\n    </tr>\n    </tbody>\n</table>\n<p>\n    Boot已经为@ConfigurationProperties提供了强大的类型匹配机制，不过如果在开发的过程中还有更特殊的匹配需求，可以用ConversionService、CustomEditorConfigurer来解决属性转换为Bean的类型匹配，<a\n        href="https://docs.spring.io/spring-boot/docs/1.5.9.RELEASE/reference/htmlsingle/#boot-features-external-config-conversion"\n        rel="nofollow">详情看这里</a>。</p>\n\n<h3 id="h3-15">@ConfigurationProperties数据验证</h3>\n<p>\n    可以通过JSR-303描述的Java验证方式对配置数据进行注入验证，只要在@ConfigurationProperties类加上@Validated注解即可，并且在classPath中有JSR-303的实现（Spring已经自带了）。看例子：</p>\n<pre><code class="java"><span class="code-meta">@ConfigurationProperties</span>(prefix=<span\n        class="code-string">"foo"</span>)\n<span class="code-meta">@Validated</span> <span class="code-comment">//验证标记</span>\n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n            class="code-title">FooProperties</span> </span>{\n    <span class="code-meta">@NotNull</span> <span class="code-comment">//注入Bean时，这个数据不能为空</span>\n    <span class="code-keyword">private</span> InetAddress remoteAddress;\n}</code></pre>\n<p>如果在类中还有嵌套在内部的实体，需要使用@Valid注解来触发验证：</p>\n<pre><code class="java"><span class="code-meta">@ConfigurationProperties</span>(prefix=<span class="code-string">"connection"</span>)\n<span class="code-meta">@Validated</span>\n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n            class="code-title">FooProperties</span> </span>{\n    <span class="code-meta">@NotNull</span>\n    <span class="code-keyword">private</span> InetAddress remoteAddress;\n    <span class="code-meta">@Valid</span>\n    <span class="code-keyword">private</span> <span class="code-keyword">final</span> Security security = <span\n            class="code-keyword">new</span> Security();\n    <span class="code-keyword">public</span> <span class="code-keyword">static</span> <span class="hljs-class"><span\n            class="code-keyword">class</span> <span class="code-title">Security</span> </span>{\n        <span class="code-meta">@NotEmpty</span>\n        <span class="code-keyword">public</span> String username;\n    }\n}</code></pre>\n<p>除了已经定义好的验证方式，还可以自定义对Bean的验证，<a\n        href="https://github.com/spring-projects/spring-boot/tree/v1.5.9.RELEASE/spring-boot-samples/spring-boot-sample-property-validation"\n        rel="nofollow">请看这个例子</a>。</p>\n\n<h2 id="h2-3">环境配置</h2>\n<p>\n    前面介绍了如何配置，这一小节将详细介绍如何解决不同环境不同配置的问题。Spring提供了默认配置为主，部分分离配置为辅的配置方式，称之为Profiles特性。可以通过@Profiles注解和Profiles相关的命名来限制配置Beans的使用和配置文件的加载。通常我们使用spring.profiles.active属性来设置被激活指定的配置。例如\n    --spring.profiles.active = dev, hsqldb。</p>\n<p>像下面这样通过@Profiles注解来指定是否激活某个@Component或@Configuration。</p>\n<pre><code class="java"><span class="code-meta">@Configuration</span>\n<span class="code-meta">@Profile</span>(<span class="code-string">"production"</span>)\n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n            class="code-title">ProductionConfiguration</span> </span>{\n    <span class="code-comment">//仅仅在 spring.profiles.active = production时，这个Bean才会被注入</span>\n}</code></pre>\n\n<h3 id="h3-16">设置激活的profiles</h3>\n<p>\n    我们可以通过多种方式来设定spring.profiles.active的参数，这与前面设定属性的优先级一样（PropertySource算法）。这就意味着可以同样在application.properties配置文件中指定他，然后通过命令行的方式覆盖这个参数的内容。</p>\n<p>\n    除了spring.profiles.active，spring.profiles.include可以设置更多的激活内容。而SpringApplication也提供了setAdditionalProfiles()方法来设定当前的profiles。</p>\n\n<h3 id="h3-17">profiles文件</h3>\n<p>在前面介绍properties属性的内容里有提到application-{profile}.properties文件。它也Profiles特性之一，具备以下特点：</p>\n<ol>\n    <li>\n        application-{profile}.properties文件的加载路径和application.properties一样，同样使用spring.config.location和spring.config.name配置。不过优先级更高。\n    </li>\n    <li>若未指定spring.profiles.active环境变量，那么profile的名称默认为default，也就是会优先加载application-default.properties文件。</li>\n    <li>如果我们一次性指定了多个profile，那么最后一个的优先级最高。</li>\n    <li>\n        前面已经提到，如果spring.config.location环境变量直接指定到文件名称无法支持Profiles特性，建议通过spring.config.location设定路径、spring.config.name设定文件名。\n    </li>\n</ol>\n\n<h2 id="h2-4">Loggin日志</h2>\n<p>Spring Boot默认使用&nbsp;<a href="https://commons.apache.org/logging" target="_top" rel="nofollow">Commons Logging</a>&nbsp;作为内嵌的日志输出工具，但是保留了底层日志的实现接口。Boot为&nbsp;<a\n        href="http://docs.oracle.com/javase/7/docs/api/java/util/logging/package-summary.html" target="_top"\n        rel="nofollow">Java Util Logging</a>、<a href="https://logging.apache.org/log4j/2.x/" target="_top"\n                                                rel="nofollow">Log4J2</a>以及<a href="http://logback.qos.ch/"\n                                                                              target="_top" rel="nofollow">Logback</a>提供了默认配置，只要在classpath引入了对应的jar，Spring就会自动推导并注入配置。\n</p>\n<p>默认情况下，如果你引入了某个Starters就会使用Logback来进行日志输出（他们都依赖spring-boot-starter-logging）。Logback的路由功能可以支持其他使用Java Util\n    Logging、Commons Logging、Log4J或SLF4J的库。</p>\n\n<h3 id="h3-18">格式化</h3>\n<p>默认情况下，输出的格式是这样的：</p>\n<pre><code class="sql">2014-03-05 10:57:51.112  INFO 45469 <span class="code-comment">--- [           main] org.apache.catalina.core.StandardEngine  : Starting Servlet Engine: Apache Tomcat/7.0.52</span>\n2014-03-05 10:57:51.253  INFO 45469 <span class="code-comment">--- [ost-startStop-1] o.a.c.c.C.[Tomcat].[localhost].[/]       : Initializing Spring embedded WebApplicationContext</span>\n2014-03-05 10:57:51.253  INFO 45469 <span class="code-comment">--- [ost-startStop-1] o.s.web.context.ContextLoader            : Root WebApplicationContext: initialization completed in 1358 ms</span>\n2014-03-05 10:57:51.698  INFO 45469 <span class="code-comment">--- [ost-startStop-1] o.s.b.c.e.ServletRegistrationBean        : Mapping servlet: \'dispatcherServlet\' to [/]</span>\n2014-03-05 10:57:51.702  INFO 45469 <span class="code-comment">--- [ost-startStop-1] o.s.b.c.embedded.FilterRegistrationBean  : Mapping filter: \'hiddenHttpMethodFilter\' to: [/*]</span></code></pre>\n<p>包含以下内容：</p>\n<ol>\n    <li>日期和时间，精确到毫秒级别。</li>\n    <li>日志等级——ERROR、WARN、INFO、DEBUG、TRACE。</li>\n    <li>进程ID。</li>\n    <li>分隔符 --- 用来标记之后为实际的日志输出内容。</li>\n    <li>输出日志的线程名称。</li>\n    <li>日志名称，一般情况下用缩写表示类名。</li>\n    <li>最后是日志详细信息。</li>\n</ol>\n<p>默认情况下日志仅仅输出ERROR、WARN、INFO（LogBack取消了FATAL级别，合并到ERROR）。我们可以通过Java\n    --debug或application.properties中的debug=true来开启DEBUG级别的日志输出（同样--trace或trace=true会开启跟踪日志）。</p>\n<p>如果你的输出终端支持ANSI，那么根据日志级别输出不同颜色文字，<a\n        href="https://docs.spring.io/spring-boot/docs/1.5.9.RELEASE/reference/htmlsingle/#boot-features-logging-color-coded-output"\n        rel="nofollow">详情请看这里</a>。</p>\n\n<h3 id="h3-19">文件输出</h3>\n<p>默认情况下，Spring Boot只会在console输出日志，但是在服务器运行时输出到文件是必须的。</p>\n<p>实现将日志输出到文件并不复杂，仅仅需要设定2个环境变量logging.file和logging.path即可（例如写到application.properties中）。下面的表说明了2个参数设定值时的情况。</p>\n<table border="1" cellpadding="1" cellspacing="1" style="width:600px">\n    <tbody>\n    <tr>\n        <td>logging.file</td>\n        <td>logging.path</td>\n        <td>说明</td>\n    </tr>\n    <tr>\n        <td>none</td>\n        <td>none</td>\n        <td>仅仅输出到Console</td>\n    </tr>\n    <tr>\n        <td>my.log/log/my.log</td>\n        <td>none</td>\n        <td>从当前位置或绝对路径输出某个日志文件。</td>\n    </tr>\n    <tr>\n        <td>none</td>\n        <td>/var/log</td>\n        <td>输出一个名为spring.log的日志文件到指定位置。</td>\n    </tr>\n    </tbody>\n</table>\n<p>日志文件默认也是输出ERROR、WARN、INFO，每当达到10MB时会切换一个文件继续输出。</p>\n\n<h3 id="h3-20">日志级别控制</h3>\n<p>所有的支持日志系统的库都支持从环境变量中读取相关日志级别，所以我们可以将日志级别的描述也记录在环境变量中（例如application.properties文件）。其格式一般为logging.level.*=&amp;{LEVEL}，LEVEL取值TRACE,\n    DEBUG, INFO, WARN, ERROR, FATAL, OFF。全局日志配置使用logging.level.root环境变量来设定，例如：</p>\n<pre><code class="bash">logging.level.root=WARN\nlogging.level.org.springframework.web=DEBUG\nlogging.level.org.hibernate=ERROR</code></pre>\n<p>通常情况下，我们对日志的控制只要了解上述2个规则即可，但是如果有更特殊的邀请，可以从<a\n        href="https://docs.spring.io/spring-boot/docs/1.5.9.RELEASE/reference/htmlsingle/#boot-features-custom-log-configuration"\n        rel="nofollow">Spring Boot的日志配置</a>开始了解。</p>\n\n<h2 id="h2-5">Web工程相关的特性</h2>\n<p>Spring Boot非常适用于开发一个Web工程，直接引入一个spring-boot-starter-web即可开始开发。</p>\n\n<h3 id="h3-21">Spring Web MVC framework</h3>\n<p>Spring Boot的web功能是通过Spring Web MVC framework（以下简称SpringMVC）来实现的，它通过@Controller和@RestController注解即可快速创建一个基于HTTP\n    Requset/Response的模型：</p>\n<pre><code class="java"><span class="code-meta">@RestController</span>\n<span class="code-meta">@RequestMapping</span>(value=<span class="code-string">"/users"</span>)\n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n            class="code-title">MyRestController</span> </span>{\n    <span class="code-meta">@RequestMapping</span>(value=<span class="code-string">"/{user}"</span>, method=RequestMethod.GET)\n    <span class="hljs-function"><span class="code-keyword">public</span> User <span\n            class="code-title">getUser</span><span class="hljs-params">(@PathVariable Long user)</span> </span>{\n        <span class="code-comment">//拦截/users/{user},user变量能够获取{user}的值</span>\n    }\n    <span class="code-meta">@RequestMapping</span>(value=<span class="code-string">"/{user}/customers"</span>, method=RequestMethod.GET)\n    <span class="hljs-function">List&lt;Customer&gt; <span class="code-title">getUserCustomers</span><span\n            class="hljs-params">(@PathVariable Long user)</span> </span>{\n        <span class="code-comment">//拦截/users/{user}/customers,user变量能够获取{user}的值</span>\n    }\n    <span class="code-meta">@RequestMapping</span>(value=<span class="code-string">"/{user}"</span>, method=RequestMethod.DELETE)\n    <span class="hljs-function"><span class="code-keyword">public</span> User <span class="code-title">deleteUser</span><span\n            class="hljs-params">(@PathVariable Long user)</span> </span>{\n        <span class="code-comment">//拦截/users/{user}的DELETE调用,user变量能够获取{user}的值</span>\n    }\n    <span class="code-meta">@RequestMapping</span>(value=<span class="code-string">"/query"</span>, method=RequestMethod.DELETE)\n    <span class="hljs-function"><span class="code-keyword">public</span> User <span class="code-title">deleteUser</span><span\n            class="hljs-params">(@RequestParam(value=<span class="code-string">"user"</span>, defaultValue=<span\n            class="hljs-number">1</span>L)</span> Long user) </span>{\n        <span class="code-comment">//拦截/users/query请求,当/users/query?user=2时，可以获取query变量中的user=2</span>\n    }\n}</code></pre>\n<p>关于SpringMVC的详细说明请看<a\n        href="https://docs.spring.io/spring/docs/4.3.13.RELEASE/spring-framework-reference/htmlsingle/#spring-web"\n        rel="nofollow">Spring Framework MVC部分的文档说明</a>。</p>\n\n<h3 id="h3-22">SpingMVC的自动配置</h3>\n<p>上一篇文章已经介绍了Boot最大的特色就是为各种引入的包提供了相关配置以降低起步的门槛。Boot为SpringMVC添加了一下配置：</p>\n<ol>\n    <li>自动注入了ContentNegotiatingViewResolver和BeanNameViewResolver Bean。</li>\n    <li>支持静态资源，包括多WebJars的支持。</li>\n    <li>自动注册Converter、GenericConverter、Formatter Bean。</li>\n    <li>支持HttpMessageConverters。</li>\n    <li>提供了一个默认的index.html页面。</li>\n    <li>提供了一个 favicon图表，并支持配置。</li>\n    <li>自定使用&nbsp;ConfigurableWebBindingInitializer bean。</li>\n</ol>\n<p>接下来会介绍自动添加的这些功能到底做了什么事。</p>\n\n<h3 id="h3-23">HttpMessageConverters</h3>\n<p>Spring\n    MVC使用HttpMessageConverters接口来转换HTTP的requests请求和responses响应，Boot提供了一个便捷的HttpMessageConverters实现，Objects对象会自动转换为一个JSON（使用Jackson）或者XML（Jackson\n    XML），并且所有的字符串都会转换为UTF-8。</p>\n<p>如果需要自定义一个converters，可以使用Spring Boot的HttpMessageConverters类：</p>\n<pre><code class="java"><span class="code-keyword">import</span> org.springframework.boot.autoconfigure.web.HttpMessageConverters;\n<span class="code-keyword">import</span> org.springframework.context.annotation.*;\n<span class="code-keyword">import</span> org.springframework.http.converter.*;\n\n<span class="code-meta">@Configuration</span>\n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n            class="code-title">MyConfiguration</span> </span>{\n    <span class="code-meta">@Bean</span>\n    <span class="hljs-function"><span class="code-keyword">public</span> HttpMessageConverters <span class="code-title">customConverters</span><span\n            class="hljs-params">()</span> </span>{\n        HttpMessageConverter&lt;?&gt; additional = ...\n        HttpMessageConverter&lt;?&gt; another = ...\n        <span class="code-keyword">return</span> <span class="code-keyword">new</span> HttpMessageConverters(additional, another);\n    }\n}</code></pre>\n<p>所有添加到容器中的HttpMessageConverter实现类都会添加到converters的处理列表上，当然也可以直接替换默认的HttpMessageConverter。</p>\n\n<h3 id="h3-24">自定义JSON序列化反序列化工具</h3>\n<p>\n    如果我们继续Jackson作为JSON的序列化、反序列化工具，我们可以为特殊的类编写我们自定义的JsonSerializer和JsonDeserializer过程。Boot提供了@JsonComponent注解来快速实现这个功能：</p>\n<pre><code class="java"><span class="code-meta">@JsonComponent</span>\n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n            class="code-title">Example</span> </span>{\n    <span class="code-keyword">public</span> <span class="code-keyword">static</span> <span class="hljs-class"><span\n            class="code-keyword">class</span> <span class="code-title">Serializer</span> <span class="code-keyword">extends</span> <span\n            class="code-title">JsonSerializer</span>&lt;<span class="code-title">SomeObject</span>&gt; </span>{\n        <span class="code-comment">// ...</span>\n    }\n    <span class="code-keyword">public</span> <span class="code-keyword">static</span> <span class="hljs-class"><span\n            class="code-keyword">class</span> <span class="code-title">Deserializer</span> <span class="code-keyword">extends</span> <span\n            class="code-title">JsonDeserializer</span>&lt;<span class="code-title">SomeObject</span>&gt; </span>{\n        <span class="code-comment">// ...</span>\n    }\n}</code></pre>\n<p>所有被@JsonComponent限定的Bean都会自动注册到Jackson中，根据范型的类型对指定的类进行序列化与反序列化操作。</p>'}};