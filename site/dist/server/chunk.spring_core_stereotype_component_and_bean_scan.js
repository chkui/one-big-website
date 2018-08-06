exports.ids=[28],exports.modules={332:function(n,s,a){"use strict";Object.defineProperty(s,"__esModule",{value:!0});s.content='<p>在<a href="https://www.chkui.com/article/spring/spring_core_auto_inject_of_annotation" title="注解自动装载">注解自动装载</a>中介绍了通过注解（Annotation）自动向Bean中注入其他Bean的方法，本篇将介绍通过注解（Annotation）向容器添加Bean的方法。\n</p>\n<p>\n    Spring的核心容器提供了@Component和@Bean注解来标记如何向IoC容器添加Bean。在核心包中@Component又派生了@Service、@Controller和@Repository这三个注解（在其他的Spring工程或包中还有更多的派生），本文主要介绍@Component及其派生注解的使用。</p>\n\n<h2 id="h2-1">一个简单的使用例子</h2>\n<p>\n    要想使用@Component等注解来向容器添加Bean，需要向IoC容器指明什么类有这个注解，所以Spring提供了一个扫描机制让使用者指定要检查的路径。配置非常简单，只要使用上下文的component-scan标签即可。我们通过下面的例子来简单说明如何配置。</p>\n<p>例子中的代码仅用于说明问题，并不能运行。源码请到<a href="https://gitee.com/chkui-com/spring-core-sample" rel="nofollow">https://gitee.com/chkui-com/spring-core-sample</a>自行clone，例子在<em>chkui.springcore.example.hybrid.component</em>包中。\n</p>\n<p>有一个接口和一个实现类作为要添加到IoC容器的Bean：</p>\n<pre><code class="java"><span class="code-keyword">package</span> chkui.springcore.example.hybrid.component.bean;\n\n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">interface</span> <span\n            class="code-title">NameService</span> </span>{\n\t<span class="hljs-function">String <span class="code-title">getName</span><span class="hljs-params">()</span></span>;\n}</code></pre>\n<pre><code class="java"><span class="code-keyword">package</span> chkui.springcore.example.hybrid.component.bean;\n\n<span class="code-meta">@Component</span>\n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n            class="code-title">NameServiceImpl</span> <span class="code-keyword">implements</span> <span\n            class="code-title">NameService</span></span>{\n\n\t<span class="code-meta">@Override</span>\n\t<span class="hljs-function"><span class="code-keyword">public</span> String <span\n            class="code-title">getName</span><span class="hljs-params">()</span> </span>{\n\t\t<span class="code-keyword">return</span> <span class="code-string">"This is My Component"</span>;\n\t}\n}</code></pre>\n<p>在实现类NameServiceImpl上使用了@Component注解。</p>\n<p>然后XML（/spring-core-sample/src/main/resources/hybrid/component）配置为：</p>\n<pre><code class="xml"><span class="php"><span class="code-meta">&lt;?</span>xml version=<span\n        class="code-string">"1.0"</span> encoding=<span class="code-string">"UTF-8"</span><span\n        class="code-meta">?&gt;</span></span>\n<span class="code-tag">&lt;<span class="code-name">beans</span> <span class="hljs-attr">xmlns</span>=<span\n        class="code-string">"http://www.springframework.org/schema/beans"</span>\n    <span class="hljs-attr">xmlns:xsi</span>=<span\n            class="code-string">"http://www.w3.org/2001/XMLSchema-instance"</span>\n    <span class="hljs-attr">xmlns:context</span>=<span class="code-string">"http://www.springframework.org/schema/context"</span>\n    <span class="hljs-attr">xsi:schemaLocation</span>=<span class="code-string">"http://www.springframework.org/schema/beans\n        http://www.springframework.org/schema/beans/spring-beans.xsd\n        http://www.springframework.org/schema/context\n        http://www.springframework.org/schema/context/spring-context.xsd"</span>&gt;</span>\n    \n    <span class="code-tag">&lt;<span class="code-name">context:component-scan</span> <span class="hljs-attr">base-package</span>=<span\n            class="code-string">"chkui.springcore.example.hybrid.component.bean"</span>/&gt;</span>\n<span class="code-tag">&lt;/<span class="code-name">beans</span>&gt;</span></code></pre>\n<p>XML配置文件中没有任何&lt;bean&gt;的声明，仅仅是通过component-scan启用了路径扫描功能，base-package指定了扫描的包路径。</p>\n<p>然后我们加载这个XML运行Spring IoC容器：</p>\n<pre><code class="java"><span class="code-keyword">package</span> chkui.springcore.example.hybrid.component;\n\n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n            class="code-title">SimpleScanApp</span> </span>{\n\n\t<span class="hljs-function"><span class="code-keyword">public</span> <span class="code-keyword">static</span> <span\n            class="code-keyword">void</span> <span class="code-title">main</span><span class="hljs-params">(String[] args)</span> </span>{\n\t\tprint(<span class="code-keyword">new</span> ClassPathXmlApplicationContext(<span class="code-string">"hybrid/component/scanConfig.xml"</span>));\n\t}\n\t\n\t<span class="hljs-function"><span class="code-keyword">private</span> <span class="code-keyword">static</span> <span\n            class="code-keyword">void</span> <span class="code-title">print</span><span class="hljs-params">(ApplicationContext context)</span> </span>{\n    \tNameService service = context.getBean(NameService.class);\n    \tSystem.out.println(service.getName());\n\t}\n}</code></pre>\n<p>运行之后NameServiceImpl就会作为一个Bean添加到IoC容器中。</p>\n<p>在<a href="https://www.chkui.com/article/spring/spring_core_ioc_extension_points" title="IOC功能扩展点">IOC功能扩展点</a>&nbsp;一文中已经介绍通过XML、@Component、@Bean任何一种方式去声明一个Bean都会转化为一个&nbsp;<a\n        href="https://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/beans/factory/config/BeanDefinition.html"\n        rel="nofollow">BeanDefinition</a>的实现类交给BeanFactory来创建实例，所以实际上通过@Component注解和在XML文件中编写一个&lt;bean&gt;标签在结果上并没有什么区别——都是向容器添加了一个Bean实例。但是Spring偏偏提供了@Bean和@Component（以及他的派生注解）2个注解来声名Bean，这当中肯定是有一些差异的。\n</p>\n<p>@Bean在后续的文章会介绍，它就等价与在XML编写一个&lt;bean&gt;标签。而@Component以及他的派生注解除了是一个IoC容器中的Bean还有许多附加的含义。</p>\n\n<h2 id="h2-2">Stereotype与功能分层</h2>\n<p>观察@Bean和@Component两个注解的包，前者是在 <em>org.springframework.context.annotation</em> ，而后者是在&nbsp;<em>org.springframework.stereotype</em>\n    。不仅仅是@Component，他的派生注解@Service、@Controller和@Repository都在这个包中，实际上它就是在告诉使用者这些注解提供<em>stereotype</em>的特性（或者称为功能、作用）。\n</p>\n<p>那什么是<em>stereotype</em>特性呢？这很难通过Stereotype这个词的字面意思（这个词能翻译的意思很多，这里最接近的翻译应该是“旧规矩”或者“使固定”）来理解。</p>\n<p>\n    Stereotype特性最早出现在J2EE6中（忘记是哪个JSR提出的了），可以理解为围绕着“元数据”功能而发展出来的一种设计模式，虽然我很难说清楚他属于23个设计模式中的哪一个，但是这确实已经是一种约定俗成的做法，只要看到Stereotype就应该像看到“Factory——工厂模式”、“Adapter——适配器模式”、“Facade——外观模式”一样，一眼就知道他的作用。</p>\n<p>\n    Stereotype特性的目标就是为“组合模式的分层系统”按层标记一个类的功能。所谓的“组合模式的分层系统”实际上就是我们常用的Controller-Service-Dao这种分层模式，只不过有些系统可能会多几层（比如Controller和Service之间加个RPC框架什么的）。根据<a\n        href="https://docs.oracle.com/javaee/6/api/javax/enterprise/inject/Stereotype.html" rel="nofollow">Stereotype特性的Java官网原文</a>介绍，它是一个用来标记注解的注解（annotating\n    annotation）。一个注解如果被@Stereotype标记证明他提供Stereotype模式的功能，例如下面这样：</p>\n<pre><code class="java"><span class="code-meta">@Stereotype</span> \n<span class="code-meta">@Target</span>(TYPE) \n<span class="code-meta">@Retention</span>(RUNTIME) \n<span class="code-meta">@interface</span> controller {}\n\n<span class="code-meta">@Stereotype</span> \n<span class="code-meta">@Target</span>(TYPE) \n<span class="code-meta">@Retention</span>(RUNTIME) \n<span class="code-meta">@interface</span> service {}</code></pre>\n<p>然后我们在使用时可以为不同层的类打上这些标记，表示他们属于不同的分层：</p>\n<pre><code class="java"><span class="hljs-class"><span class="code-keyword">interface</span> <span class="code-title">UserService</span></span>{}\n\n<span class="code-meta">@Service</span>\n<span class="hljs-class"><span class="code-keyword">class</span> <span class="code-title">UserServiceImpl</span> <span\n        class="code-keyword">implements</span> <span class="code-title">UserService</span></span>{\n\t\n}\n\n<span class="code-meta">@Controller</span>\n<span class="hljs-class"><span class="code-keyword">class</span> <span class="code-title">UseController</span></span>{\n\t<span class="code-meta">@Autowired</span>\n\tUserService userService;\n\t\n}</code></pre>\n<p>\n    一个类的实例可能会被用于0到多个分层中（比如Spring的一个Bean既可以是Controller也可以是Service，只要标记对应的注解即可），但是通常情况下一个类最多只会用在一个分层中使用。简单的说Stereotype特性就是用注解来告诉框架某个类是属于系统功能中的哪一层。</p>\n<p>\n    Java的文档上要求提供Stereotype特性的注解需要用@Stereotype来标记。但是Spring的开发大神并没有理会这个事，@Component并没有使用@Stereotype来标记，但是他确实提供了Stereotype的模式。</p>\n<p>\n    在Stereotype模式下，Spring核心工程为Controller-Service-Dao的分层模型分别提供了@Controller、@Service、@Repository注解。我们按照Stereotype的模式为对应的类标记3个注解，然后在引入MVC、ORM、JPA相关的框架之后这些注解会告诉框架对应的类扮演着什么样的功能角色，框架就能很清晰的根据注解提供相关的功能服务。</p>\n<p>\n    例如引入Spring-webmvc之后，一个类如果用@Controller注解标记了之后框架就知道他们都是处理前端请求的，MVC框架就会为他提供RequestMapping之类的功能。随后我们需要将框架调整为WebFlux，基本上直接更换依赖的Jar包就可以了，因为大家都是按照一个模式来开发的。</p>\n<p><span style="color:#e74c3c">所以，如果我们的某个类是用于指定的分层功能，那么最好使用<em>org.springframework.stereotype</em>包中的注解来标记他所属的分层。如果类没有明确的功能（例如用于存储配置数据的类，或者Helper类），使用@Bean等其他方式添加到容器中更合适（@Bean会在后续的文章中介绍）。</span>\n</p>\n<p>使用Stereotype特性来标记分层，还有一个好处是即使工程的结构再复杂多样，都可以很轻松的使用注解（Annotation）来实现拦截器或者AOP功能。因为我们能够很清晰的知道每个分层的作用，开发AOP的功能就非常便利。</p>\n\n<h2 id="h2-3">扫描配置</h2>\n<p>本文开篇使用了一个简单的例子说明使用&lt;context:component-scan&gt;扫描功能来自动添加被注解标记的Bean。除了使用base-package属性还有其他的标签来控制扫描的路径。</p>\n<p>&lt;context:include-filter&gt;和&lt;context:exclude-filter&gt;标签用来指定包含和排除的过滤规则。他们提供2个参数——type和expression，用来指定过滤类型和过滤参数，例如:</p>\n<pre><code class="xml"><span class="code-tag">&lt;<span class="code-name">beans</span>&gt;</span>\n    <span class="code-tag">&lt;<span class="code-name">context:component-scan</span> <span class="hljs-attr">base-package</span>=<span\n            class="code-string">"org.example"</span>&gt;</span>\n        <span class="code-tag">&lt;<span class="code-name">context:include-filter</span> <span\n                class="hljs-attr">type</span>=<span class="code-string">"regex"</span>\n                <span class="hljs-attr">expression</span>=<span\n                    class="code-string">".*Stub.*Repository"</span>/&gt;</span>\n        <span class="code-tag">&lt;<span class="code-name">context:exclude-filter</span> <span\n                class="hljs-attr">type</span>=<span class="code-string">"annotation"</span>\n                <span class="hljs-attr">expression</span>=<span class="code-string">"org.springframework.stereotype.Repository"</span>/&gt;</span>\n    <span class="code-tag">&lt;/<span class="code-name">context:component-scan</span>&gt;</span>\n<span class="code-tag">&lt;/<span class="code-name">beans</span>&gt;</span></code></pre>\n<p>此外还可以使用use-default-filters属性来指定是否扫描默认注解（<code>@Component</code>、<code>@Repository</code>、<code>@Service</code>、<code>@Controller、</code><code>@Configuration</code>），默认值为ture。如果设定成false，需要我们在include-filter中增加对应的annotation。\n</p>\n<p>除了使用XML配置，还可以使用@ComponentScan注解来指定扫描的路径，他提供和XML配置一样的功能。在后续的文章会介绍纯Java配置的功能。</p>\n<p>关于扫描的详细说明见<a\n        href="https://docs.spring.io/spring-framework/docs/current/spring-framework-reference/core.html#beans-scanning-filters"\n        rel="nofollow">官网的过滤规则说明</a>。</p>\n\n<h2 id="h2-4">组件命名</h2>\n<p>和普通的Bean一样，我们也可以在@Component上添加注解来指定Bean在IoC容器的名称：</p>\n<pre><code class="java"><span class="code-keyword">package</span> chkui.springcore.example.hybrid.component.bean;\n\n<span class="code-meta">@Service</span>(<span class="code-string">"implementNameService"</span>)\n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n            class="code-title">NameServiceImpl</span> <span class="code-keyword">implements</span> <span\n            class="code-title">NameService</span></span>{\n\t<span class="code-meta">@Override</span>\n\t<span class="hljs-function"><span class="code-keyword">public</span> String <span\n            class="code-title">getName</span><span class="hljs-params">()</span> </span>{\n\t\t<span class="code-keyword">return</span> <span class="code-string">"This is My Component"</span>;\n\t}\n}</code></pre>\n<p>这样在容器中这个Bean的名称被命名为"implementNameService"。除了直接在注解上添加内容，我们还可以实现&nbsp;BeanNameGenerator 接口来实现全局的命名方法。看下面这个例子。（源码请到<a\n        href="https://gitee.com/chkui-com/spring-core-sample" rel="nofollow">https://gitee.com/chkui-com/spring-core-sample</a>自行clone，例子在<em>chkui.springcore.example.hybrid.component</em>包中。）\n</p>\n<p>首先在XML中使用 "name-generator"&nbsp;指定名称的生成器：</p>\n<pre><code class="xml"><span class="code-tag">&lt;<span class="code-name">beans</span> <span\n        class="hljs-attr">xmlns</span>=<span class="code-string">"http://www.springframework.org/schema/beans"</span>\n\t<span class="hljs-attr">xmlns:xsi</span>=<span\n            class="code-string">"http://www.w3.org/2001/XMLSchema-instance"</span>\n\t<span class="hljs-attr">xmlns:context</span>=<span class="code-string">"http://www.springframework.org/schema/context"</span>\n\t<span class="hljs-attr">xsi:schemaLocation</span>=<span class="code-string">"http://www.springframework.org/schema/beans\n        http://www.springframework.org/schema/beans/spring-beans.xsd\n        http://www.springframework.org/schema/context\n        http://www.springframework.org/schema/context/spring-context.xsd"</span>&gt;</span>\n\n\t<span class="code-tag">&lt;<span class="code-name">context:component-scan</span>\n\t\t<span class="hljs-attr">base-package</span>=<span class="code-string">"chkui.springcore.example.hybrid.component.bean"</span>\n\t\t<span class="hljs-attr">name-generator</span>=<span class="code-string">"chkui.springcore.example.hybrid.component.bean.NameGenerator"</span> /&gt;</span>\n<span class="code-tag">&lt;/<span class="code-name">beans</span>&gt;</span></code></pre>\n<p>然后编写我们的命名生成规则：</p>\n<pre><code class="java"><span class="code-keyword">package</span> chkui.springcore.example.hybrid.component.bean;\n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n            class="code-title">NameGenerator</span> <span class="code-keyword">implements</span> <span\n            class="code-title">BeanNameGenerator</span> </span>{\n\t<span class="code-meta">@Override</span>\n\t<span class="hljs-function"><span class="code-keyword">public</span> String <span class="code-title">generateBeanName</span><span\n            class="hljs-params">(BeanDefinition definition, BeanDefinitionRegistry registry)</span> </span>{\n\t\tAnnotatedBeanDefinition annotdef = AnnotatedBeanDefinition.class.cast(definition);\n\t\tAnnotationMetadata meta = annotdef.getMetadata();\n\t\t<span class="code-comment">//生成规则:如果已经命名不做任何调整，如果未命名则在类名车后面增加”_NoDefinedName“字符串</span>\n\t\t<span class="code-keyword">return</span> Optional.of(meta).map(met -&gt; met.getAnnotationTypes()).map(set -&gt; set.toArray(<span\n            class="code-keyword">new</span> String[] {}))\n\t\t\t\t.map(array -&gt; array[<span class="hljs-number">0</span>]).map(name -&gt; meta.getAnnotationAttributes(name)).map(entry -&gt; entry.get(<span\n            class="code-string">"value"</span>))\n\t\t\t\t.map(obj -&gt; <span class="code-string">""</span>.equals(obj) ? <span class="code-keyword">null</span> : obj).orElse(definition.getBeanClassName() + <span\n            class="code-string">"_NoDefinedName"</span>)\n\t\t\t\t.toString();\n\t}\n}</code></pre>\n\n<h2 id="h2-5">使用索引提升启动速度</h2>\n<p>\n    通常情况下，即使是对整个classpath进行扫描并不会占用太多的时间，但是某些应用对启动时间有极高的要求，对此Spring提供了索引功能。索引功能并不复杂，就是第一次扫描之后生成一个静态文件记录所有的组件，然后下一次扫描就直接读取文件中的内容，而不去执行扫描过程。</p>\n<p>首先引入spring-context-indexer包：</p>\n<pre><code class="xml"><span class="code-tag">&lt;<span class="code-name">dependencies</span>&gt;</span>\n    <span class="code-tag">&lt;<span class="code-name">dependency</span>&gt;</span>\n        <span class="code-tag">&lt;<span class="code-name">groupId</span>&gt;</span>org.springframework<span\n            class="code-tag">&lt;/<span class="code-name">groupId</span>&gt;</span>\n        <span class="code-tag">&lt;<span class="code-name">artifactId</span>&gt;</span>spring-context-indexer<span\n            class="code-tag">&lt;/<span class="code-name">artifactId</span>&gt;</span>\n        <span class="code-tag">&lt;<span class="code-name">version</span>&gt;</span>5.0.7.RELEASE<span class="code-tag">&lt;/<span\n            class="code-name">version</span>&gt;</span>\n        <span class="code-tag">&lt;<span class="code-name">optional</span>&gt;</span>true<span\n            class="code-tag">&lt;/<span class="code-name">optional</span>&gt;</span>\n    <span class="code-tag">&lt;/<span class="code-name">dependency</span>&gt;</span>\n<span class="code-tag">&lt;/<span class="code-name">dependencies</span>&gt;</span></code></pre>\n<pre><code class="json">dependencies {\n    compileOnly(<span class="hljs-attr">"org.springframework:spring-context-indexer:5.0.7.RELEASE"</span>)\n}</code></pre>\n<p>然后在运行后会生成一个&nbsp;META-INF/spring.components\n    的文件，之后只要运行工程发现这个文件都会直接使用他。可以通过环境变量或工程根目录的spring.properties中设置spring.index.ignore=ture来禁用这个功能。</p>\n<p>这个功能如果没有什么明确的需求，慎重使用，会提高工程的管理成本。</p>'}};