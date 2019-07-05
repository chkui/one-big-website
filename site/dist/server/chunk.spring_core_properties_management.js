exports.ids=[38],exports.modules={353:function(s,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.content='<p>在<a href="https://www.chkui.com/article/spring/spring_core_environment_management_of_profile" title="Profile管理环境">Profile管理环境</a>一文中介绍了环境的概念以及Spring\n    Profile特性控制Bean的添加。本文将进一步介绍Spring管理和控制操作系统变量、JVM变量和Java标准资源（properties文件）的相关功能。</p>\n<p>文章的代码仅仅用于说明问题，<a href="https://gitee.com/chkui-com/spring-core-sample" rel="nofollow">可执行代码请到我的gitee库clone</a>，本文的代码在<em>chkui.springcore.example.hybrid.propertsource</em>包中。\n</p>\n\n<h2 id="h2-1">PropertySource与优先级</h2>\n<p>在整个Jvm运行期间，我们可以随时随地获取到2个与环境相关的参数：</p>\n<pre><code class="java"><span class="code-keyword">package</span> chkui.springcore.example.hybrid.propertsource;\n\n<span class="code-comment">//env是与操作系统相关的参数</span>\nMap&lt;String, String&gt; env = System.getenv();\n<span class="code-comment">//properties中是Jvm相关的参数</span>\nProperties p = System.getProperties();\nSystem.out.println(<span class="code-string">"env :"</span> + env);\nSystem.out.println(<span class="code-string">"properties :"</span> +  p);</code></pre>\n<p>如果没有人为的添加额外信息，<em>System::getEnv</em>获取的数据都与当前的操作系统相关（以下称为“操作系统参数”），而<em>System::getProperties</em>获取的内容都与Jvm相关（以下称为“JVM参数”）。\n</p>\n<p>Spring会将操作系统参数和Jvm参数都整合到自己的环境管理接口Environment中，例如下面的代码：</p>\n<pre><code class="java"><span class="code-keyword">package</span> chkui.springcore.example.hybrid.propertsource;\n\n<span class="code-comment">//向系统级的properties设置一个参数</span>\nSystem.setProperty(<span class="code-string">"wow"</span>, <span class="code-string">"World of Warcraft"</span>);\nApplicationContext ctx = <span class="code-keyword">new</span> AnnotationConfigApplicationContext(PropertySourcesApp.class);\n<span class="code-comment">//通过spring的Environment获取参数</span>\nEnvironment springEnv = ctx.getEnvironment();\nSystem.out.println(springEnv.getProperty(<span class="code-string">"wow"</span>));\nSystem.out.println(springEnv.getProperty(<span class="code-string">"PATH"</span>));\n</code></pre>\n<p>除了我们自定义的"wow"，操作系统参数"PATH"也可以在Spring的<em>Environment</em>中获取。</p>\n<p>通常情况下，在<em>Environment</em>内部维护了2个<a\n        href="https://docs.spring.io/spring-framework/docs/5.0.8.RELEASE/javadoc-api/org/springframework/core/env/PropertySource.html"\n        rel="nofollow">PropertySources</a>的实例：一个是操作系统参数，另外一个是JVM参数。如果2者有同样的参数，那么我们在调用<em>Environment::getProperty</em>方法时，得到的是JVM参数（<em>System::getProperties</em>）,也就是说&nbsp;Jvm参数具有更高的优先级。\n</p>\n<p>除了通过外部设置，我们也可以直接使用Spring提供的接口来设置：</p>\n<pre><code class="java"><span class="code-keyword">package</span> chkui.springcore.example.hybrid.propertsource;\n\n<span class="code-comment">//我们要对环境进行配置，需要使用ConfigurableApplicationContext接口</span>\nConfigurableApplicationContext configAbleCtx = <span class="code-keyword">new</span> AnnotationConfigApplicationContext(PropertySourcesApp.class);\n\n<span class="code-comment">//ConfigurableApplicationContext接口提供对应的可编辑Environment和PropertySources</span>\nMutablePropertySources ps = configAbleCtx.getEnvironment().getPropertySources();\nMap&lt;String, Object&gt; map = <span class="code-keyword">new</span> HashMap&lt;String, Object&gt;();\nmap.put(<span class="code-string">"wow"</span>, <span class="code-string">"Origin = World of Warcraft!But Edit it already!"</span>);\n<span class="code-comment">//添加到Spring的环境参数中</span>\nps.addFirst(<span class="code-keyword">new</span> MapPropertySource(<span class="code-string">"myPropertySource"</span>, map));\nSystem.out.println(springEnv.getProperty(<span class="code-string">"wow"</span>));</code></pre>\n<p>代码添加到<em>PropertySource</em>中，Environment会额外维护一个<a\n        href="https://docs.spring.io/spring-framework/docs/5.0.8.RELEASE/javadoc-api/org/springframework/core/env/PropertySource.html"\n        rel="nofollow">PropertySources</a>，而自己添加的<a\n        href="https://docs.spring.io/spring-framework/docs/5.0.8.RELEASE/javadoc-api/org/springframework/core/env/PropertySource.html"\n        rel="nofollow">PropertySources</a>优先级是最高的，所以最后Environment::getProperty获取到的值是最后设置的值。</p>\n<p>如果需要添加多个<a\n        href="https://docs.spring.io/spring-framework/docs/5.0.8.RELEASE/javadoc-api/org/springframework/core/env/PropertySource.html"\n        rel="nofollow">PropertySources</a>，可以通过<em>MutablePropertySources::addFirst</em>或<em>MutablePropertySources::addLast</em>方法来控制他们之间的优先级。\n</p>\n\n<h2 id="h2-2">引入资源文件</h2>\n<p><em>*.properties</em>是Java的标准资源文件，在Java的各种项目中常用来记录各种配置参数。Spring提供了注解和XML配置将<em>*.properties</em>文件中的数据整合到Spring的环境参数（Environment）中。\n</p>\n\n<h3 id="h3-1">@PropertySource</h3>\n<p>在<em>@Configuration</em>标记的类上使用<em>@PropertySource</em>注解可以引入0~n个<em>*.properties</em>配置文件。如下面的例子：</p>\n<pre><code class="java"><span class="code-keyword">package</span> chkui.springcore.example.hybrid.propertsource;\n\n<span class="code-meta">@Configuration</span>\n<span class="code-meta">@PropertySource</span>(<span class="code-string">"classpath:/hybrid/propertysource/config.properties"</span>)\n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n            class="code-title">PropertySourcesApp</span> </span>{\n\t<span class="hljs-function"><span class="code-keyword">public</span> <span class="code-keyword">static</span> <span\n            class="code-keyword">void</span> <span class="code-title">main</span><span class="hljs-params">(String[] args)</span> </span>{\n\t\tApplicationContext ctx = <span class="code-keyword">new</span> AnnotationConfigApplicationContext(PropertySourcesApp.class); \n\t\tSystem.out.println(<span class="code-string">"Properties file params: "</span> + springEnv.getProperty(<span\n            class="code-string">"Gdi"</span>));\n\t}\n}</code></pre>\n<p>对应的<em>config.properties</em>文件：</p>\n<pre><code class="bash"><span class="code-comment">#hybrid.propertysource.config.properties</span>\n\nGdi=StarCraft</code></pre>\n<p>\n    同一个工程中支持使用多个@PropertySource注解来引入配置文件，也支持Ant风格（Ant-style，例如"classpath:a/b/**/config.properties"）以及Spring扩展的（比如"classpath*:"）的路径规则，资源路径控制会在后续的文章中介绍。</p>\n\n<h3 id="h3-2">XML配置</h3>\n<p>XML配置在之前介绍容器后置处理器——<a href="https://www.chkui.com/article/spring/spring_core_factory_post_processor_of_official"\n                         title="BeanFactoryPostProcessor">BeanFactoryPostProcessor</a>的文章中已经介绍了，他就是&nbsp;<em>PropertyPlaceholderConfigurer</em>&nbsp;，我们在XML配置文件中进行一下设置即可。\n</p>\n<p>引入Bean：</p>\n<pre><code class="xml"><span class="code-tag">&lt;<span class="code-name">bean</span> <span\n        class="hljs-attr">class</span>=<span class="code-string">"org.springframework.beans.factory.config.PropertyPlaceholderConfigurer"</span>&gt;</span>\n    <span class="code-comment">&lt;!-- 指定*.properties文件的路径 --&gt;</span>\n    <span class="code-tag">&lt;<span class="code-name">property</span> <span class="hljs-attr">name</span>=<span\n            class="code-string">"locations"</span> <span class="hljs-attr">value</span>=<span class="code-string">"classpath:/hybrid/propertysource/config.properties"</span>/&gt;</span>\n<span class="code-tag">&lt;/<span class="code-name">bean</span>&gt;</span></code></pre>\n<p>直接使用context进行全局设置：</p>\n<pre><code class="xml"><span class="code-tag">&lt;<span class="code-name">context:property-placeholder</span> <span\n        class="hljs-attr">location</span>=<span\n        class="code-string">"classpath:/hybrid/propertysource/config.properties"</span>/&gt;</span></code></pre>\n\n<h2 id="h2-3">占位符替换</h2>\n<p><em>PropertyPlaceholderConfigurer</em>继承了抽象类<em>PropertyPlaceholderConfigurer，</em>而<em>*.properties</em>文件的读写就是在<em>PropertyResourceConfigurer</em>类中实现的。<em>PropertyPlaceholderConfigurer</em>进一步实现了配置文件中占位符<em>（${...}）</em>替换功能<em>。</em>\n</p>\n<p>在Spring IoC容器执行Bean的扫描、加载之前添加一个环境变量（也可以动态添加然后再执行<em>ConfigurableApplicationContext::refresh</em>方法），就可以在很多资源路径的位置使用这个占位符，对上面的例子进行一些修改：\n</p>\n<pre><code class="java"><span class="code-meta">@Configuration</span>\n<span class="code-comment">//通过占位符来设置路径</span>\n<span class="code-meta">@PropertySource</span>(<span class="code-string">"classpath:${resource.propertiesPath}/config.properties"</span>)\n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n            class="code-title">PropertySourcesApp</span> </span>{\n\t<span class="hljs-function"><span class="code-keyword">public</span> <span class="code-keyword">static</span> <span\n            class="code-keyword">void</span> <span class="code-title">main</span><span class="hljs-params">(String[] args)</span> </span>{\n        <span class="code-comment">//容器启动之前设置环境变量</span>\n\t\tSystem.setProperty(<span class="code-string">"resource.propertiesPath"</span>, <span class="code-string">"/hybrid/propertysource"</span>);\n\t\tApplicationContext ctx = <span class="code-keyword">new</span> AnnotationConfigApplicationContext(PropertySourcesApp.class);\n\t\t<span class="code-comment">//获取环境对象实例</span>\n\t\tEnvironment springEnv = ctx.getEnvironment();\n\t\tSystem.out.println(<span class="code-string">"Properties : "</span> + springEnv.getProperty(<span\n            class="code-string">"Gdi"</span>));\n\t}\n}</code></pre>\n<p>同样的，只要环境变量存在，也可以使用占位符替换配置文件中的数据，例如：</p>\n<pre><code class="xml"><span class="code-tag">&lt;<span class="code-name">context:property-placeholder</span> <span\n        class="hljs-attr">location</span>=<span class="code-string">"classpath:${resource.propertiesPath:/config}/config.properties"</span>/&gt;</span></code></pre>\n<p>XML中的占位符使用的格式是<em>${resource.propertiesPath:/config}</em>，它表示使用环境变量<em>resource.propertiesPath</em>进行替换，如果<em>resource.propertiesPath</em>不存在则使用值"/config"。\n</p>\n\n<h2 id="h2-4">@Value</h2>\n<p>我们可以在任何Bean中使用@Value注解来获取环境变量。如下面的例子：</p>\n<pre><code class="java"><span class="code-keyword">package</span> chkui.springcore.example.hybrid.propertsource;\n\n<span class="code-meta">@Configuration</span>\n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n            class="code-title">PropertySourcesApp</span> </span>{\n\t<span class="code-meta">@Value</span>(<span class="code-string">"${resource.propertiesPath}"</span>)\n\t<span class="code-keyword">private</span> String value;\n\t<span class="code-meta">@Value</span>(<span\n            class="code-string">"#{systemProperties[\'resource.propertiesPath\']}"</span>)\n\t<span class="code-keyword">private</span> String elValue;\n\t<span class="code-meta">@Value</span>(<span class="code-string">"Resource PropertiesPath"</span>)\n\t<span class="code-keyword">private</span> String staticValue;\n\t\n\t<span class="hljs-function"><span class="code-keyword">public</span> <span class="code-keyword">static</span> <span\n            class="code-keyword">void</span> <span class="code-title">main</span><span class="hljs-params">(String[] args)</span> </span>{\n\t\tSystem.setProperty(<span class="code-string">"resource.propertiesPath"</span>, <span class="code-string">"/hybrid/propertysource"</span>);\n\n\t\tApplicationContext ctx = <span class="code-keyword">new</span> AnnotationConfigApplicationContext(PropertySourcesApp.class);\n\t\t\n\t\tPropertySourcesApp app = ctx.getBean(PropertySourcesApp.class);\n\t\tSystem.out.println(<span class="code-string">"Value: "</span> + app.value);\n\t\tSystem.out.println(<span class="code-string">"EL Value: "</span> + app.elValue);\n\t\tSystem.out.println(<span class="code-string">"Static Value: "</span> + app.staticValue);\n\t}\n}</code></pre>\n<p>\n    @Value可以注入一个纯字面量，如上面示例代码中的staticValue，也可以使用占位符使用环境变量中的任何值。除了使用占位符${}，@Value还支持"#{systemProperties[\'resource.propertiesPath\']}"这样具备代码执行功能的复杂表达式来获取数据，这部分功能会在后续介绍EL表达式的文章中进行分享。</p>'}};