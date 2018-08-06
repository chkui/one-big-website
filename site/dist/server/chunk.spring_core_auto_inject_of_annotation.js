exports.ids=[30],exports.modules={330:function(s,a,n){"use strict";Object.defineProperty(a,"__esModule",{value:!0});a.content='<h2 id="h2-1">从配置上扩展</h2>\n<p>之前的文章介绍了Spring的IoC容器配置管理方面的详细内容，需要了解的可以从<a\n        href="https://www.chkui.com/article/spring/spring_core_design_pattern_and_ioc" rel="nofollow">IoC容器的设计模式</a>开始阅读。在介绍基于注解配置的配置之前我们再重复一下在之前提到的基本认识：\n</p>\n<ol>\n    <li>Spring的基本工作单位是Bean，所有的高级功能都是在Bean的基础上扩展而来的。Bean可以理解成Java类的一个实例。</li>\n    <li>Bean只是一个个体，Spring用一个名为IoC（Inversion of Control控制反转）的容器来管理所有的Bean。</li>\n    <li>Spring的核心功能就是管理Bean与Bean之间、IoC容器与Bean之间的依赖、组合关系。这些关系通过XML配置来定义。</li>\n</ol>\n<p>基于以上3点，对XML配置有清晰的理解对Spring核心框架的使用至关重要。在Spring没有<strong>注解（Annotation）</strong>之前，我们都是通过XML配置来实现Spring的功能，而在3.x版本之后，我们可以仅使用注解而无需XML即可运行Spring。注解并没有扩展Spring的核心功能，他仅仅是将原来XML上的配置迁移到Java源码中以“元数据”（bytecode\n    metadata）的方式提供非侵入式（non-invasive）的框架服务。所以无论XML配置还是注解的方式，或者两者混合使用都可以实现Spring提供的所有功能。</p>\n<p>在之前<a href="https://www.chkui.com/article/spring/spring_core_ioc_extension_points" title="IOC功能扩展点">IOC功能扩展点</a>一文中介绍了BeanDefinition的适配器模式。如下图，了解BeanDefinition的作用之后就能明白无论是注解还是XML配置，最后都会转化为一个BeanDefinition结构让IoC容器来执行初始化。\n</p>\n<p style="text-align:center"><img alt="Spring核心——注解自动装载" height="381"\n                                  src="https://file.mahoooo.com/res/file/spring_core_ioc_extension_points.png" width="600"></p>\n<p>Spring的注解相关的功能是在2.x版本开始出现然后到3.x才全部完善的，支持JCP制定的JSR-250和<a href="https://www.chkui.com/article/java/java_jsr330"\n                                                            title="JSR-330">JSR-330</a>。所以在使用注解的时候需要注意版本号。</p>\n\n<h2 id="h2-2">启用Annotation配置功能</h2>\n<p>在使用注解功能之前要告诉IoC现在需要启用注解相关的功能，通过上下文级别的配置即可开启所有注解相关的功能：</p>\n<pre><code class="xml"><span class="php"><span class="code-meta">&lt;?</span>xml version=<span\n        class="code-string">"1.0"</span> encoding=<span class="code-string">"UTF-8"</span><span\n        class="code-meta">?&gt;</span></span>\n<span class="code-tag">&lt;<span class="code-name">beans</span> <span class="hljs-attr">xmlns</span>=<span\n        class="code-string">"http://www.springframework.org/schema/beans"</span>\n    <span class="hljs-attr">xmlns:xsi</span>=<span\n            class="code-string">"http://www.w3.org/2001/XMLSchema-instance"</span>\n    <span class="hljs-attr">xmlns:context</span>=<span class="code-string">"http://www.springframework.org/schema/context"</span>\n    <span class="hljs-attr">xsi:schemaLocation</span>=<span class="code-string">"http://www.springframework.org/schema/beans\n        http://www.springframework.org/schema/beans/spring-beans.xsd\n        http://www.springframework.org/schema/context\n        http://www.springframework.org/schema/context/spring-context.xsd"</span>&gt;</span>\n\n    <span class="code-tag">&lt;<span class="code-name">context:annotation-config</span>/&gt;</span>\n\n<span class="code-tag">&lt;/<span class="code-name">beans</span>&gt;</span></code></pre>\n<ol>\n</ol>\n<p>在<a href="https://www.chkui.com/article/spring/spring_core_post_processor_of_official" title="spring-官配后置处理器">官配后置处理器</a>一文已经介绍了注解的处理都是通过后置处理器实现的，所以添加了&lt;context:annotation-config/&gt;这个配置之后在实现层面会向IoC容器增加<a\n        href="https://docs.spring.io/spring-framework/docs/5.0.7.RELEASE/javadoc-api/org/springframework/beans/factory/annotation/AutowiredAnnotationBeanPostProcessor.html"\n        rel="nofollow">AutowiredAnnotationBeanPostProcessor</a>,<a\n        href="https://docs.spring.io/spring-framework/docs/5.0.7.RELEASE/javadoc-api/org/springframework/context/annotation/CommonAnnotationBeanPostProcessor.html"\n        rel="nofollow">CommonAnnotationBeanPostProcessor</a>,<a\n        href="https://docs.spring.io/spring-framework/docs/5.0.7.RELEASE/javadoc-api/org/springframework/orm/jpa/support/PersistenceAnnotationBeanPostProcessor.html"\n        rel="nofollow">PersistenceAnnotationBeanPostProcessor</a>、<a\n        href="https://docs.spring.io/spring-framework/docs/5.0.7.RELEASE/javadoc-api/org/springframework/beans/factory/annotation/RequiredAnnotationBeanPostProcessor.html"\n        rel="nofollow">RequiredAnnotationBeanPostProcessor</a>这几个后设置处理器。每个处理器都针对某一个或者某些注解进行处理。</p>\n<p>还有，如果在工程中混合使用注解和XML配置，如果同一个Bean同时在XML和注解都进行了配置，那么最终生效的是XML上的配置，因为Spring容器会先处理注解再处理XML配置。</p>\n<p>下面是关于自动装载的注解介绍：</p>\n\n<h2 id="h2-3">@Autowired</h2>\n<p>\n    这个注解应该是使用spring最常用的注解，也是IoC容器反向依赖注入的极致体现。基本上容器里有什么实现我们根本不必操心，之需要声明一个接口加一个@Autowired就可以获得对应的接口功能。如果不使用参数的话@Autowired的效果就相当于BeanFactory.getBean(Class&lt;T&gt;\n    )。</p>\n\n<h3 id="h3-1">多种方法注入数据</h3>\n<p>@Autowired可以直接写在域（成员变量）上、可以用在一般的方法和构造方法上：</p>\n<pre><code class="java"><span class="hljs-class"><span class="code-keyword">interface</span> <span\n        class="code-title">A</span> </span>{}\n<span class="hljs-class"><span class="code-keyword">interface</span> <span class="code-title">B</span> </span>{}\n<span class="hljs-class"><span class="code-keyword">interface</span> <span class="code-title">C</span> </span>{}\n\n<span class="hljs-class"><span class="code-keyword">class</span> <span class="code-title">MyClass</span> </span>{\n\t<span class="code-meta">@Autowired</span> <span class="code-comment">//从成员变量注入</span>\n\t<span class="code-keyword">private</span> A a;\n\t<span class="code-keyword">private</span> B b;\n\t<span class="code-keyword">private</span> C c;\n\n\t<span class="code-meta">@Autowired</span> <span class="code-comment">//从构造方法注入</span>\n\t<span class="hljs-function"><span class="code-keyword">public</span> <span class="code-title">MyClass</span><span\n            class="hljs-params">(C c)</span> </span>{\n\t\t<span class="code-keyword">this</span>.c = c;\n\t}\n\t<span class="hljs-function"><span class="code-keyword">public</span> A <span class="code-title">getA</span><span\n            class="hljs-params">()</span> </span>{\n\t\t<span class="code-keyword">return</span> a;\n\t}\n\t<span class="hljs-function"><span class="code-keyword">public</span> <span class="code-keyword">void</span> <span\n            class="code-title">setA</span><span class="hljs-params">(A a)</span> </span>{\n\t\t<span class="code-keyword">this</span>.a = a;\n\t}\n\t<span class="hljs-function"><span class="code-keyword">public</span> B <span class="code-title">getB</span><span\n            class="hljs-params">()</span> </span>{\n\t\t<span class="code-keyword">return</span> b;\n\t}\n\t<span class="code-meta">@Autowired</span> <span class="code-comment">//从普通方法注入</span>\n\t<span class="hljs-function"><span class="code-keyword">public</span> <span class="code-keyword">void</span> <span\n            class="code-title">setB</span><span class="hljs-params">(B b)</span> </span>{\n\t\t<span class="code-keyword">this</span>.b = b;\n\t}\n\t<span class="hljs-function"><span class="code-keyword">public</span> C <span class="code-title">getC</span><span\n            class="hljs-params">()</span> </span>{\n\t\t<span class="code-keyword">return</span> c;\n\t}\n\t<span class="hljs-function"><span class="code-keyword">public</span> <span class="code-keyword">void</span> <span\n            class="code-title">setC</span><span class="hljs-params">(C c)</span> </span>{\n\t\t<span class="code-keyword">this</span>.c = c;\n\t}\n}</code></pre>\n\n<h3 id="h3-2">获取同一个接口的多个实现</h3>\n<p>如果容器中同一个接口有相同的实现，我们可以用数据、列表或Map结构来获取多个Bean：</p>\n<pre><code class="java"><span class="hljs-class"><span class="code-keyword">interface</span> <span\n        class="code-title">A</span> </span>{}\n<span class="hljs-class"><span class="code-keyword">class</span> <span class="code-title">implA1</span> <span\n        class="code-keyword">implements</span> <span class="code-title">A</span></span>{}\n<span class="hljs-class"><span class="code-keyword">class</span> <span class="code-title">implA2</span> <span\n        class="code-keyword">implements</span> <span class="code-title">A</span></span>{}\n\n<span class="hljs-class"><span class="code-keyword">class</span> <span class="code-title">MyClass</span> </span>{\n\t<span class="code-meta">@Autowired</span>\n\t<span class="code-keyword">private</span> A[] a;\n\t<span class="code-meta">@Autowired</span>\n\t<span class="code-keyword">private</span> Set&lt;A&gt; set;\n\t<span class="code-meta">@Autowired</span>\n\t<span class="code-keyword">private</span> Map&lt;String, A&gt; map;\n}</code></pre>\n<p>使用Map时，key必须声明为String，在运行时会key是注入Bean的name/id。</p>\n\n<h3 id="h3-3">声明非必要数据</h3>\n<p>当我们使用@Autowired时，如果容器中没有我们所需的Bean会抛出异常。当这个Bean并不是必要数据时可以使用@Autowired的required参数：</p>\n<pre><code class="java"><span class="hljs-class"><span class="code-keyword">interface</span> <span\n        class="code-title">A</span> </span>{}\n<span class="hljs-class"><span class="code-keyword">class</span> <span class="code-title">MyClass</span> </span>{\n\t<span class="code-meta">@Autowired</span>(required=<span class="code-keyword">false</span>)\n\t<span class="code-keyword">private</span> A a;\n}</code></pre>\n\n<h3 id="h3-4">自动空指针处理</h3>\n<p>在Java8之后专门为空指针处理添加了<a href="https://www.chkui.com/article/java/java_lambda_optional_for_null" title="Optional空指针处理">Optional这个工具类</a>。在4.x之后Spring在注入数据阶段会根据目标对象自动进行包装：\n</p>\n<pre><code class="java"><span class="hljs-class"><span class="code-keyword">interface</span> <span\n        class="code-title">A</span> </span>{}\n<span class="hljs-class"><span class="code-keyword">class</span> <span class="code-title">impl</span> <span\n        class="code-keyword">implements</span> <span class="code-title">A</span></span>{}\n<span class="hljs-class"><span class="code-keyword">class</span> <span class="code-title">MyClass</span> </span>{\n\t<span class="code-meta">@Autowired</span>(required=<span class="code-keyword">false</span>)\n\t<span class="code-keyword">private</span> Optional&lt;A&gt; a;\n}</code></pre>\n<p>这个时候在容器中存放的是接口A的实现类，但是会自定根据注入对象的声明新建一个Optional包装的Bean。</p>\n<p>在5.x版本之后还可以使用JSR-305提出的@NullAble告诉IoC这里可以注入一个空指针数据或什么也不需要。</p>\n<pre><code class="java"><span class="hljs-class"><span class="code-keyword">interface</span> <span\n        class="code-title">A</span> </span>{}\n<span class="hljs-class"><span class="code-keyword">class</span> <span class="code-title">impl</span> <span\n        class="code-keyword">implements</span> <span class="code-title">A</span></span>{}\n<span class="hljs-class"><span class="code-keyword">class</span> <span class="code-title">MyClass</span> </span>{\n\t<span class="code-keyword">private</span> A a;\n\t<span class="hljs-function"><span class="code-keyword">public</span> <span class="code-keyword">void</span> <span\n            class="code-title">setA</span><span class="hljs-params">(@Nullable A a)</span> </span>{\n\t\t<span class="code-keyword">this</span>.a = a;\n\t}\n}</code></pre>\n\n<h3 id="h3-5">获取容器中的所有资源</h3>\n<p>除了我们自己声明的接口、类，@Autowired还可以获取Spring定义的所有Bean，凡是只要在IoC容器中的Bean都可以通过它来获取：</p>\n<pre><code class="java"><span class="hljs-class"><span class="code-keyword">class</span> <span class="code-title">MyClass</span> </span>{\n\t<span class="code-meta">@Autowired</span>\n\t<span class="code-keyword">private</span> ApplicationContext context;\n}</code></pre>\n<p>\n    不过需要注意的是，这些注解（Annotation）支持的功能都是由后置处理器实现的，所以无法自动注入后置处理器（<code>BeanPostProcessor或</code><code>BeanFactoryPostProcessor</code>&nbsp;）。\n</p>\n\n<h3 id="h3-6">JSR-330支持</h3>\n<p>\n    JSR-330提出了反向依赖注入的相关内容，主要是关于@Inject、@ManagedBean、@Singleton的作用和实现方式。使用@Inject可以替换@Autowired的绝大部分功能，但是还有些许的差异。使用JSR-330要引入javax.inject包，maven的配置如下：</p>\n<pre><code class="xml"><span class="code-tag">&lt;<span class="code-name">dependency</span>&gt;</span>\n    <span class="code-tag">&lt;<span class="code-name">groupId</span>&gt;</span>javax.inject<span class="code-tag">&lt;/<span\n            class="code-name">groupId</span>&gt;</span>\n    <span class="code-tag">&lt;<span class="code-name">artifactId</span>&gt;</span>javax.inject<span class="code-tag">&lt;/<span\n            class="code-name">artifactId</span>&gt;</span>\n    <span class="code-tag">&lt;<span class="code-name">version</span>&gt;</span>1<span class="code-tag">&lt;/<span\n            class="code-name">version</span>&gt;</span>\n<span class="code-tag">&lt;/<span class="code-name">dependency</span>&gt;</span></code></pre>\n<p>然后可以用@Inject注解任何使用@Autowired的地方，唯一的区别是@Inject没有required参数，如果要实现对应的功能只能通过注入Optional&lt;Class&lt;T&gt;&gt;的方式实现。</p>\n\n<h2 id="h2-4">对自动装配的控制</h2>\n<p>@Autowired虽然好用，但是也会遇到一些问题，比如当容器中有2个类实现同一个接口的时候在运行时注入就会抛出异常，针对这个问题Spring提供了一些针对自动装配更细节的操作——Primary和Qualifiers。</p>\n\n<h3 id="h3-7">Primary控制自动装配</h3>\n<p>Primary字面意思就是主要的，意思是告诉容器这个Bean是“主”Bean。实现Primary有两种方式，通过在@Configuration中注解实现或在XML配置中实现。</p>\n<p>首先是配置方式。有一个接口A、有2个A的实现类ImplFirst和ImplSecond，然后在功能类MyClass中自动装配了接口A：</p>\n<pre><code class="java"><span class="hljs-class"><span class="code-keyword">interface</span> <span\n        class="code-title">A</span> </span>{}\n<span class="hljs-class"><span class="code-keyword">class</span> <span class="code-title">ImplFirst</span> <span\n        class="code-keyword">implements</span> <span class="code-title">A</span></span>{}\n<span class="hljs-class"><span class="code-keyword">class</span> <span class="code-title">ImplSecond</span> <span\n        class="code-keyword">implements</span> <span class="code-title">A</span></span>{}\n<span class="hljs-class"><span class="code-keyword">class</span> <span class="code-title">MyClass</span> </span>{\n\t<span class="code-meta">@Autowired</span>\n\t<span class="code-keyword">private</span> A a;\n}</code></pre>\n<p>在配置文件中我们可以使用primary属性来控制注入哪一个实现类。</p>\n<pre><code class="xml"><span class="code-tag">&lt;<span class="code-name">beans</span>&gt;</span>\n    <span class="code-tag">&lt;<span class="code-name">context:annotation-config</span>/&gt;</span>\n    <span class="code-comment">&lt;!-- 自动装配时会使用这个Bean --&gt;</span>\n    <span class="code-tag">&lt;<span class="code-name">bean</span> <span class="hljs-attr">class</span>=<span\n            class="code-string">"x.y.ImplFirst"</span> <span class="hljs-attr">primary</span>=<span class="code-string">"true"</span>/&gt;</span>\n    <span class="code-tag">&lt;<span class="code-name">bean</span> <span class="hljs-attr">class</span>=<span\n            class="code-string">"x.y.ImplSecond"</span>/&gt;</span>\n    <span class="code-tag">&lt;<span class="code-name">bean</span> <span class="hljs-attr">class</span>=<span\n            class="code-string">"x.y.MyClass"</span>&gt;</span>\n<span class="code-tag">&lt;/<span class="code-name">beans</span>&gt;</span></code></pre>\n<p>此外，我们还可是使用Java配置功能（@Configuration相关的Java配置内容后续篇幅会介绍）指明“主”Bean。将XML配置文件替换为下面的Java配置形式：</p>\n<pre><code class="java"><span class="code-meta">@Configuration</span>\n<span class="hljs-class"><span class="code-keyword">class</span> <span class="code-title">MyClassConfig</span> </span>{\n\t<span class="code-meta">@Bean</span>\n\t<span class="code-meta">@Primary</span>\n\t<span class="hljs-function"><span class="code-keyword">public</span> A <span\n            class="code-title">firstImpl</span><span class="hljs-params">()</span> </span>{\n\t\t<span class="code-keyword">return</span> <span class="code-keyword">new</span> ImplFirst();\n\t}\n\t<span class="code-meta">@Bean</span>\n\t<span class="hljs-function"><span class="code-keyword">public</span> A <span\n            class="code-title">secondImpl</span><span class="hljs-params">()</span> </span>{\n\t\t<span class="code-keyword">return</span> <span class="code-keyword">new</span> ImplSecond();\n\t}\n}</code></pre>\n\n<h3 id="h3-8">Qualifiers控制自动装配</h3>\n<p>Primary是类的实现者决定使用那个一个类，而Qualifiers是让类的使用者来确定使用哪一个类。先看一个最基本的用法：</p>\n<pre><code class="java"><span class="hljs-class"><span class="code-keyword">interface</span> <span\n        class="code-title">A</span> </span>{}\n<span class="hljs-class"><span class="code-keyword">class</span> <span class="code-title">ImplFirst</span> <span\n        class="code-keyword">implements</span> <span class="code-title">A</span> </span>{}\n<span class="hljs-class"><span class="code-keyword">class</span> <span class="code-title">ImplSecond</span> <span\n        class="code-keyword">implements</span> <span class="code-title">A</span> </span>{}\n<span class="hljs-class"><span class="code-keyword">class</span> <span class="code-title">MyClass</span> </span>{\n\t<span class="code-meta">@Autowired</span>\n\t<span class="code-meta">@Qualifier</span>(<span class="code-string">"implSecond"</span>)\n\t<span class="code-keyword">private</span> A a;\n}</code></pre>\n<pre><code class="xml"><span class="code-tag">&lt;<span class="code-name">beans</span>&gt;</span>\n    <span class="code-tag">&lt;<span class="code-name">context:annotation-config</span>/&gt;</span>\n    <span class="code-tag">&lt;<span class="code-name">bean</span> <span class="hljs-attr">id</span>=<span\n            class="code-string">"implFirst"</span> <span class="hljs-attr">class</span>=<span class="code-string">"x.y.ImplFirst"</span>/&gt;</span>\n    <span class="code-tag">&lt;<span class="code-name">bean</span> <span class="hljs-attr">id</span>=<span\n            class="code-string">"implSecond"</span> <span class="hljs-attr">class</span>=<span class="code-string">"x.y.ImplSecond"</span>/&gt;</span>\n    <span class="code-tag">&lt;<span class="code-name">bean</span> <span class="hljs-attr">class</span>=<span\n            class="code-string">"x.y.MyClass"</span>&gt;</span>\n<span class="code-tag">&lt;/<span class="code-name">beans</span>&gt;</span></code></pre>\n<p>这样通过@Qualifiers注解就制定加载了ImplFIrst这个类。不过Spring官方并不建议这样去使用Qualifiers。主要的原因是失去了@Autowired的使用初衷——在使用的时候还需要去了解&lt;bean&gt;的定义结构。官方建议通过别名的形式告知每一个类的作用，然后通过Qualifiers来使用。例如我们还是用组装电脑的例子：</p>\n<pre><code class="java"><span class="hljs-class"><span class="code-keyword">interface</span> <span class="code-title">Cpu</span> </span>{}\n<span class="hljs-class"><span class="code-keyword">class</span> <span class="code-title">Athlon</span> <span\n        class="code-keyword">implements</span> <span class="code-title">Cpu</span> </span>{\n\t<span class="code-keyword">private</span> String brand = <span class="code-string">"Amd"</span>;\n}\n<span class="hljs-class"><span class="code-keyword">class</span> <span class="code-title">Celeron</span> <span\n        class="code-keyword">implements</span> <span class="code-title">Cpu</span> </span>{\n\t<span class="code-keyword">private</span> String brand = <span class="code-string">"Intel"</span>;\n}\n\n<span class="hljs-class"><span class="code-keyword">class</span> <span class="code-title">MyPc</span> </span>{\n\t<span class="code-meta">@Autowired</span>\n\t<span class="code-meta">@Qualifier</span>(<span class="code-string">"Intel"</span>)\n\t<span class="code-keyword">private</span> Cpu a;\n}\n\n<span class="hljs-class"><span class="code-keyword">class</span> <span class="code-title">YourPc</span> </span>{\n\t<span class="code-meta">@Autowired</span>\n\t<span class="code-meta">@Qualifier</span>(<span class="code-string">"Amd"</span>)\n\t<span class="code-keyword">private</span> Cpu a;\n}</code></pre>\n<pre><code class="xml"><span class="code-tag">&lt;<span class="code-name">beans</span>&gt;</span>\n    <span class="code-tag">&lt;<span class="code-name">context:annotation-config</span>/&gt;</span>\n    <span class="code-tag">&lt;<span class="code-name">bean</span> <span class="hljs-attr">id</span>=<span\n            class="code-string">"athlon"</span> <span class="hljs-attr">class</span>=<span class="code-string">"x.y.Athlon"</span>&gt;</span>\n        <span class="code-tag">&lt;<span class="code-name">qualifier</span> <span class="hljs-attr">value</span>=<span\n                class="code-string">"Amd"</span>/&gt;</span>\n    <span class="code-tag">&lt;/<span class="code-name">bean</span>&gt;</span>\n    <span class="code-tag">&lt;<span class="code-name">bean</span> <span class="hljs-attr">id</span>=<span\n            class="code-string">"celeron"</span> <span class="hljs-attr">class</span>=<span class="code-string">"x.y.Celeron"</span>&gt;</span>\n        <span class="code-tag">&lt;<span class="code-name">qualifier</span> <span class="hljs-attr">value</span>=<span\n                class="code-string">"Intel"</span>/&gt;</span>\n    <span class="code-tag">&lt;/<span class="code-name">bean</span>&gt;</span>\n    <span class="code-tag">&lt;<span class="code-name">bean</span> <span class="hljs-attr">class</span>=<span\n            class="code-string">"x.y.MyPc"</span>/&gt;</span>\n    <span class="code-tag">&lt;<span class="code-name">bean</span> <span class="hljs-attr">class</span>=<span\n            class="code-string">"x.y.YourPc"</span>/&gt;</span>\n<span class="code-tag">&lt;/<span class="code-name">beans</span>&gt;</span></code></pre>\n<p>&lt;qualifier value="Intel"/&gt;可以声名当前的Bean对应的Qualifier的名称。这样完全就将Id和Qualifer定义的名称隔离开，我们可以使用规范来约定使用的功能内容。</p>\n<p>还可以通过继承@Qualifier来实现我们更细节的控制和管理，我们将上面的代码进行如下修改：</p>\n<pre><code class="java"><span class="code-meta">@Target</span>({ ElementType.FIELD, ElementType.PARAMETER })\n<span class="code-meta">@Retention</span>(RetentionPolicy.RUNTIME)\n<span class="code-meta">@Qualifier</span>\n<span class="code-meta">@interface</span> CpuType {\n\t<span class="hljs-function">String <span class="code-title">value</span><span class="hljs-params">()</span></span>;\n}\n<span class="hljs-class"><span class="code-keyword">interface</span> <span class="code-title">Cpu</span> </span>{\n}\n<span class="hljs-class"><span class="code-keyword">class</span> <span class="code-title">Athlon</span> <span\n        class="code-keyword">implements</span> <span class="code-title">Cpu</span> </span>{\n\t<span class="code-keyword">private</span> String brand = <span class="code-string">"Amd"</span>;\n}\n<span class="hljs-class"><span class="code-keyword">class</span> <span class="code-title">Celeron</span> <span\n        class="code-keyword">implements</span> <span class="code-title">Cpu</span> </span>{\n\t<span class="code-keyword">private</span> String brand = <span class="code-string">"Intel"</span>;\n}\n<span class="hljs-class"><span class="code-keyword">class</span> <span class="code-title">MyPc</span> </span>{\n\t<span class="code-meta">@Autowired</span>\n\t<span class="code-meta">@CpuType</span>(<span class="code-string">"Intel"</span>)\n\t<span class="code-keyword">private</span> Cpu a;\n}\n<span class="hljs-class"><span class="code-keyword">class</span> <span class="code-title">YourPc</span> </span>{\n\t<span class="code-meta">@Autowired</span>\n\t<span class="code-meta">@CpuType</span>(<span class="code-string">"Amd"</span>)\n\t<span class="code-keyword">private</span> Cpu a;\n}</code></pre>\n<pre><code class="xml"><span class="code-tag">&lt;<span class="code-name">beans</span>&gt;</span>\n    <span class="code-tag">&lt;<span class="code-name">context:annotation-config</span>/&gt;</span>\n    <span class="code-tag">&lt;<span class="code-name">bean</span> <span class="hljs-attr">id</span>=<span\n            class="code-string">"athlon"</span> <span class="hljs-attr">class</span>=<span class="code-string">"x.y.Athlon"</span>&gt;</span>\n        <span class="code-tag">&lt;<span class="code-name">qualifier</span> <span class="hljs-attr">type</span>=<span\n                class="code-string">"CpuType"</span> <span class="hljs-attr">value</span>=<span class="code-string">"Amd"</span>/&gt;</span>\n    <span class="code-tag">&lt;/<span class="code-name">bean</span>&gt;</span>\n    <span class="code-tag">&lt;<span class="code-name">bean</span> <span class="hljs-attr">id</span>=<span\n            class="code-string">"celeron"</span> <span class="hljs-attr">class</span>=<span class="code-string">"x.y.Celeron"</span>&gt;</span>\n        <span class="code-tag">&lt;<span class="code-name">qualifier</span> <span class="hljs-attr">type</span>=<span\n                class="code-string">"x.y.CpuType"</span> <span class="hljs-attr">value</span>=<span class="code-string">"Intel"</span>/&gt;</span>\n    <span class="code-tag">&lt;/<span class="code-name">bean</span>&gt;</span>\n    <span class="code-tag">&lt;<span class="code-name">bean</span> <span class="hljs-attr">class</span>=<span\n            class="code-string">"x.y.MyPc"</span>/&gt;</span>\n    <span class="code-tag">&lt;<span class="code-name">bean</span> <span class="hljs-attr">class</span>=<span\n            class="code-string">"x.y.YourPc"</span>/&gt;</span>\n<span class="code-tag">&lt;/<span class="code-name">beans</span>&gt;</span></code></pre>\n<p>在&lt;qualifier&gt;中type指向的注解类可以是全限定名，也可以用短编码。</p>\n<p>我们还可以在继承的注解中使用自定义参数。例如：</p>\n<pre><code class="java"><span class="code-meta">@Target</span>({ ElementType.FIELD, ElementType.PARAMETER })\n<span class="code-meta">@Retention</span>(RetentionPolicy.RUNTIME)\n<span class="code-meta">@Qualifier</span>\n<span class="code-meta">@interface</span> CpuType {\n\t<span class="hljs-function">String <span class="code-title">brand</span><span class="hljs-params">()</span></span>;\n    <span class="hljs-function">String <span class="code-title">ver</span><span class="hljs-params">()</span></span>;\n}</code></pre>\n<p>配置：</p>\n<pre><code class="xml"><span class="code-tag">&lt;<span class="code-name">beans</span>&gt;</span>\n    <span class="code-tag">&lt;<span class="code-name">context:annotation-config</span>/&gt;</span>\n    <span class="code-tag">&lt;<span class="code-name">bean</span> <span class="hljs-attr">id</span>=<span\n            class="code-string">"athlon"</span> <span class="hljs-attr">class</span>=<span class="code-string">"x.y.Athlon"</span>&gt;</span>\n        <span class="code-tag">&lt;<span class="code-name">qualifier</span> <span class="hljs-attr">type</span>=<span\n                class="code-string">"CpuType"</span>&gt;</span>\n            <span class="code-tag">&lt;<span class="code-name">attribute</span> <span class="hljs-attr">key</span>=<span\n                    class="code-string">"brand"</span> <span class="hljs-attr">value</span>=<span class="code-string">"Amd"</span>/&gt;</span>\n            <span class="code-tag">&lt;<span class="code-name">attribute</span> <span class="hljs-attr">key</span>=<span\n                    class="code-string">"ver"</span> <span class="hljs-attr">value</span>=<span class="code-string">"4321"</span>/&gt;</span>\n        <span class="code-tag">&lt;/<span class="code-name">qualifier</span>&gt;</span>\n    <span class="code-tag">&lt;/<span class="code-name">bean</span>&gt;</span>\n    <span class="code-tag">&lt;<span class="code-name">bean</span> <span class="hljs-attr">class</span>=<span\n            class="code-string">"x.y.MyPc"</span>/&gt;</span>\n<span class="code-tag">&lt;/<span class="code-name">beans</span>&gt;</span></code></pre>'}};