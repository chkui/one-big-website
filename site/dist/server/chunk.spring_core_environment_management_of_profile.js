exports.ids=[42],exports.modules={355:function(s,n,a){"use strict";Object.defineProperty(n,"__esModule",{value:!0});n.content='<h2 id="h2-1">抽象环境的概念</h2>\n<p>在介绍Spring核心模块为运行环境管理提供的功能之前，咱们先得解释清楚“运行环境”是什么。</p>\n<p>\n    码砖早年，对上下文（Context）、环境（Environment）一直都是傻傻分不清楚，感觉2者都是放了一堆参数在里面，貌似并没有多大区别。后来才慢慢摸清楚这2个词的套路。上下文（Context）是用来处理分层传递的，不清楚的可以看看<a\n        href="https://www.chkui.com/article/spring/spring_core_context_and_ioc" title="上下文与IoC">上下文与IoC</a>一文关于ApplicationContext的介绍。\n</p>\n<p>\n    而环境（Environment）是指当前运行程序之外的各种“全局变量”，这些变量反映了当前软件运行的各种外部情况。例如我们执行System.getenv()方法，就会获取到当前包括操作系统、全局路径配置、磁盘、jdk版本等等信息。这些信息实际上与当前运行的程序是无关的——无论你是否启动JVM，这些环境变量都是客观存在的。</p>\n<p>既然环境的作用是体现当前运行的各种外部情况，那么除了JVM启动时提供的固定参数，也可以指定我们需要的环境变量。例如我们最常见的环境——开发环境、测试环境、集成QA环境、仿真环境、生产环境等。</p>\n\n<h2 id="h2-2">Profile特性</h2>\n<p>对于软件开发而言经常要控制的就是当前程序是在开发环境运行还是在生产环境运行。除了后面要介绍的Spring Profile功能，还有各种各样的方法来进行控制，比如Maven的profile标签。Spring&nbsp;Profile只是一种环境控制的参考手段，他的好处是可以在代码级别去控制，具体使用什么根据项目的需要去考量。</p>\n<p>Spring的Profile特性使用起来并不复杂，而且同时支持Java注解和XML配置。我们通过几段代码来说明如何使用Profile。</p>\n\n<h3 id="h3-1">纯Java常规使用</h3>\n<p>（以下案例的可执行代码请到<a href="https://gitee.com/chkui-com/spring-core-sample" rel="nofollow">gitee</a>下载，）</p>\n<p>定义一个servuce接口和三个service的实现类：</p>\n<pre><code class="java"><span class="code-keyword">package</span> chkui.springcore.example.hybrid.profile.service;\n\n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">interface</span> <span\n            class="code-title">Blizzard</span> </span>{\n\t<span class="hljs-function">String <span class="code-title">getName</span><span class="hljs-params">()</span></span>;\n}</code></pre>\n<pre><code class="java"><span class="code-keyword">package</span> chkui.springcore.example.hybrid.profile.service.blizzard;\n<span class="hljs-class"><span class="code-keyword">class</span> <span class="code-title">Warcraft</span> <span\n        class="code-keyword">implements</span> <span class="code-title">Blizzard</span> </span>{\n\t<span class="hljs-function"><span class="code-keyword">public</span> String <span\n            class="code-title">getName</span><span class="hljs-params">()</span> </span>{\n\t\t<span class="code-keyword">return</span> <span class="code-string">"Warcraft"</span>;\n\t}\n\n}\n<span class="hljs-class"><span class="code-keyword">class</span> <span class="code-title">WorldOfWarcraft</span> <span\n        class="code-keyword">implements</span> <span class="code-title">Blizzard</span> </span>{\n\t<span class="hljs-function"><span class="code-keyword">public</span> String <span\n            class="code-title">getName</span><span class="hljs-params">()</span> </span>{\n\t\t<span class="code-keyword">return</span> <span class="code-string">"World of Warcraft"</span>;\n\t}\n\n}\n<span class="hljs-class"><span class="code-keyword">class</span> <span class="code-title">Overwatch</span> <span\n        class="code-keyword">implements</span> <span class="code-title">Blizzard</span> </span>{\n\t<span class="hljs-function"><span class="code-keyword">public</span> String <span\n            class="code-title">getName</span><span class="hljs-params">()</span> </span>{\n\t\t<span class="code-keyword">return</span> <span class="code-string">"Overwatch"</span>;\n\t}\n}</code></pre>\n<p>然后我们通过纯Java配置讲接口的每个实现添加到容器中：</p>\n<pre><code class="java"><span class="code-meta">@Configuration</span>\n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n            class="code-title">EnvironmentApp</span> </span>{\n\t<span class="hljs-function"><span class="code-keyword">public</span> <span class="code-keyword">static</span> <span\n            class="code-keyword">void</span> <span class="code-title">main</span><span class="hljs-params">(String[] args)</span> </span>{\n\t\t<span class="code-comment">//在启动容器之前，先指定环境中的profiles参数</span>\n\t\tSystem.setProperty(<span class="code-string">"spring.profiles.active"</span>, <span\n            class="code-string">"wow"</span>);\n\t\tApplicationContext ctx = <span class="code-keyword">new</span> AnnotationConfigApplicationContext(EnvironmentApp.class);\n        <span class="code-comment">//当前的profile值是wow，所以获取的实现类是worldOfWarcraft</span>\n\t\tBlizzard blizzard = ctx.getBean(Blizzard.class);\n\t}\n\t\n\t<span class="code-meta">@Bean</span>\n\t<span class="code-meta">@Profile</span>(<span class="code-string">"war"</span>)\n\t<span class="hljs-function"><span class="code-keyword">public</span> Blizzard <span\n            class="code-title">warcraft</span><span class="hljs-params">()</span> </span>{\n\t\t<span class="code-keyword">return</span> <span class="code-keyword">new</span> Warcraft();\n\t}\n\t\n\t<span class="code-meta">@Bean</span>\n\t<span class="code-meta">@Profile</span>(<span class="code-string">"wow"</span>)\n\t<span class="hljs-function"><span class="code-keyword">public</span> Blizzard <span class="code-title">worldOfWarcraft</span><span\n            class="hljs-params">()</span> </span>{\n\t\t<span class="code-keyword">return</span> <span class="code-keyword">new</span> WorldOfWarcraft();\n\t}\n\t\n\t<span class="code-meta">@Bean</span>\n\t<span class="code-meta">@Profile</span>(<span class="code-string">"default"</span>)\n\t<span class="hljs-function"><span class="code-keyword">public</span> Blizzard <span\n            class="code-title">overwatch</span><span class="hljs-params">()</span> </span>{\n\t\t<span class="code-keyword">return</span> <span class="code-keyword">new</span> Overwatch();\n\t}\n}</code></pre>\n<p>@Configuration类中每一个@Bean注解之后都有一个@Profile注解。@Profile中的字符串就标记了当前适配的环境变量，他配合<em>System.setProperty("spring.profiles.active",\n    "wow");</em>这一行一起使用。当设定环境参数为wow时，标记了@Profile("wow")的方法会被启用，对应的Bean会添加到容器中。而其他标记的Bean不会被添加，当没有适配到任何Profile值时，@Profile("default")标记的Bean会被启用。\n</p>\n<p>Spring Profile的功能就是根据在环境中指定参数的方法来控制@Bean的创建。</p>\n\n<h2 id="h2-3">在@Configuration上配置Profile</h2>\n<p>@Profile注解除了在@Bean方法上使用，也可以用于@Configuration类上。这样使用可以一次性控制多个Bean的加载。例如下面的例子：</p>\n<pre><code class="java"><span class="code-meta">@Configuration</span>\n<span class="code-meta">@Profile</span>(<span class="code-string">"cast"</span>)\n<span class="hljs-class"><span class="code-keyword">class</span> <span class="code-title">CastConfig</span> </span>{\n\t<span class="code-meta">@Bean</span>\n\t<span class="hljs-function"><span class="code-keyword">public</span> Castlevania <span class="code-title">castlevania</span><span\n            class="hljs-params">()</span> </span>{\n\t\t<span class="code-keyword">return</span> <span class="code-keyword">new</span> Castlevania();\n\t}\n}\n\n<span class="code-meta">@Configuration</span>\n<span class="code-meta">@Profile</span>(<span class="code-string">"pes"</span>)\n<span class="hljs-class"><span class="code-keyword">class</span> <span class="code-title">PESConfig</span> </span>{\n\t<span class="code-meta">@Bean</span>\n\t<span class="hljs-function"><span class="code-keyword">public</span> ProEvolutionSoccer <span class="code-title">proEvolutionSoccer</span><span\n            class="hljs-params">()</span> </span>{\n\t\t<span class="code-keyword">return</span> <span class="code-keyword">new</span> ProEvolutionSoccer();\n\t}\n}</code></pre>\n<p>\n    这样可以控制整个@Configuration类中的Bean是否加载。这个时候如果在@Configuration类上还标注了@Import注解，那么被@Import引入的类中的@Bean也不会添加到IoC容器中，那么这对统一配置环境是很有好处的。</p>\n<p>需要注意的是，如果这个时候又在@Bean之上添加了@Profile注解，那么Spring最终会根据@Bean之上的标签来执行。例如：</p>\n<pre><code class="java"><span class="code-meta">@Configuration</span>\n<span class="code-meta">@Profile</span>(<span class="code-string">"cast"</span>)\n<span class="hljs-class"><span class="code-keyword">class</span> <span class="code-title">CastConfig</span> </span>{\n\t<span class="code-meta">@Bean</span>\n\t<span class="hljs-function"><span class="code-keyword">public</span> Castlevania <span class="code-title">castlevania</span><span\n            class="hljs-params">()</span> </span>{\n\t\t<span class="code-keyword">return</span> <span class="code-keyword">new</span> Castlevania();\n\t}\n\t<span class="code-meta">@Bean</span>\n    <span class="code-meta">@Profile</span>(<span class="code-string">"pes"</span>)\n\t<span class="hljs-function"><span class="code-keyword">public</span> ProEvolutionSoccer <span class="code-title">proEvolutionSoccer</span><span\n            class="hljs-params">()</span> </span>{\n\t\t<span class="code-keyword">return</span> <span class="code-keyword">new</span> ProEvolutionSoccer();\n\t}\n}</code></pre>\n<p>当环境中的profile值包含"pes"时候，@Profile("pes")标注的这个Bean就会添加到IoC容器中。</p>\n\n<h2 id="h2-4">Profile的XML配置</h2>\n<p>Profile特性也可以在XML配置。不过只能在&lt;beans&gt;标签上进行：</p>\n<pre><code class="xml"><span class="code-tag">&lt;<span class="code-name">beans</span> <span\n        class="hljs-attr">...</span> &gt;</span>\n\t<span class="code-tag">&lt;<span class="code-name">beans</span> <span class="hljs-attr">profile</span>=<span\n            class="code-string">"ff"</span>&gt;</span>\n\t\t<span class="code-tag">&lt;<span class="code-name">bean</span> <span class="hljs-attr">class</span>=<span\n                class="code-string">"chkui.springcore.example.hybrid.profile.service.squareenix.FinalFantasy"</span> /&gt;</span>\n\t<span class="code-tag">&lt;/<span class="code-name">beans</span>&gt;</span>\n\t<span class="code-tag">&lt;<span class="code-name">beans</span> <span class="hljs-attr">profile</span>=<span\n            class="code-string">"dog"</span>&gt;</span>\n\t\t<span class="code-tag">&lt;<span class="code-name">bean</span> <span class="hljs-attr">class</span>=<span\n                class="code-string">"chkui.springcore.example.hybrid.profile.service.squareenix.SleepingDogs"</span> /&gt;</span>\n\t<span class="code-tag">&lt;/<span class="code-name">beans</span>&gt;</span>\n<span class="code-tag">&lt;/<span class="code-name">beans</span>&gt;</span></code></pre>\n<p>配置之后，&lt;beans&gt;中的多个&lt;bean&gt;都会被Profile控制。</p>\n\n<h2 id="h2-5">环境变量的设置</h2>\n<p>Profile的环境变量可以包含多个值。例如：</p>\n<pre><code class="java">System.setProperty(<span class="code-string">"spring.profiles.active"</span>, <span\n        class="code-string">"wow,pes"</span>);</code></pre>\n<p>这样环境中就包含了2个Profile的值。对用的@Profile或profile配置就会被启用。</p>\n<p>除了例子中给出的System::setProperty方法，Spring还提供了多种方法来设置Profile的环境变量。</p>\n\n<h4 id="h4-1"><strong>直接在Jvm启动参数中设置</strong></h4>\n<pre><code class="bash">-Dspring.profiles.active=<span class="code-string">"wow,pes"</span></code></pre>\n\n<h4 id="h4-2">使用EnvironmentCapable接口来设置</h4>\n<p>\n    ConfigurableApplicationContext继承了ConfigurableEnvironment接口我们可以通过ConfigurableEnvironment::getEnvironment方法获取到当前Spring中的环境对象——org.springframework.core.env.Environment，然后使用他来设置环境变量：</p>\n<pre><code class="java">ConfigurableApplicationContext ctx = <span class="code-keyword">new</span> AnnotationConfigApplicationContext(EnvironmentApp.class);\nConfigurableEnvironment env = ctx.getEnvironment();\n<span class="code-comment">//通过setActiveProfiles来设置。</span>\nenv.setActiveProfiles(<span class="code-string">"wow"</span>,<span class="code-string">"pes"</span>,<span\n            class="code-string">"ff"</span>);\n<span class="code-comment">//必须重建容器</span>\nctx.refresh();</code></pre>\n<p>\n    需要注意的是，在继承关系中ConfigurableApplicationContext之后才实现ConfigurableEnvironment，如果这里使用ApplicationContext::getEnvironment方法得到的是Environment，它不提供set相关的方法。所以上面的例子使用了ConfigurableApplicationContext。由于ApplicationContext的所有实现类都实现了Configurable的功能，我们也可以像下面这样进行转型：</p>\n<pre><code class="java">ApplicationContext ctx = <span class="code-keyword">new</span> AnnotationConfigApplicationContext(EnvironmentApp.class);\nEnvironment _e =ctx.getEnvironment();\nConfigurableEnvironment env = ConfigurableEnvironment.class.cast(_e);</code></pre>\n\n<h2 id="h2-6">@Profile的实现</h2>\n<p>Profile特性的实现也不复杂，其实就是实现了Conditional功能（Conditional功能见<a\n        href="https://www.chkui.com/article/spring/spring_core_configuration_annotation_and_xml" title="@Configuration与混合使用">@Configuration与混合使用</a>一文中关于Conditionally的介绍）。\n</p>\n<p>首先@Profile注解继承实现了@Conditional：</p>\n<pre><code class="java"><span class="code-meta">@Target</span>({ElementType.TYPE, ElementType.METHOD})\n<span class="code-meta">@Retention</span>(RetentionPolicy.RUNTIME)\n<span class="code-meta">@Documented</span>\n<span class="code-meta">@Conditional</span>(ProfileCondition.class)\n<span class="code-keyword">public</span> <span class="code-meta">@interface</span> Profile {}</code></pre>\n<p>然后他的处理类实现了Condition接口：</p>\n<pre><code class="java"><span class="hljs-class"><span class="code-keyword">class</span> <span class="code-title">ProfileCondition</span> <span\n        class="code-keyword">implements</span> <span class="code-title">Condition</span> </span>{\n\t<span class="code-meta">@Override</span>\n\t<span class="hljs-function"><span class="code-keyword">public</span> <span class="code-keyword">boolean</span> <span\n            class="code-title">matches</span><span class="hljs-params">(ConditionContext context, AnnotatedTypeMetadata metadata)</span> </span>{\n\t\tMultiValueMap&lt;String, Object&gt; attrs = metadata.getAllAnnotationAttributes(Profile.class.getName());\n\t\t<span class="code-keyword">if</span> (attrs != <span class="code-keyword">null</span>) {\n\t\t\t<span class="code-keyword">for</span> (Object value : attrs.get(<span class="code-string">"value"</span>)) {\n\t\t\t\t<span class="code-keyword">if</span> (context.getEnvironment().acceptsProfiles((String[]) value)) {\n\t\t\t\t\t<span class="code-keyword">return</span> <span class="code-keyword">true</span>;\n\t\t\t\t}\n\t\t\t}\n\t\t\t<span class="code-keyword">return</span> <span class="code-keyword">false</span>;\n\t\t}\n\t\t<span class="code-keyword">return</span> <span class="code-keyword">true</span>;\n\t}\n\n}</code></pre>\n<p>处理过程也很简单，实际上就检查@Profile注解中的值，如果和环境中的一致则添加。</p>'}};