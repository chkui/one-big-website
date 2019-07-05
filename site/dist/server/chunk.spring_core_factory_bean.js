exports.ids=[45],exports.modules={344:function(s,a,n){"use strict";Object.defineProperty(a,"__esModule",{value:!0});a.content='<p><a href="https://www.chkui.com/article/spring/spring_core_bean_post_processors" title="Spring核心——IOC处理器扩展">上一篇文章</a>介绍了非侵入式的框架的概念以及IOC的功能扩展点之一——BeanPostProcessor，我们接下来的内容继续说明IoC更多的扩展方法。\n</p>\n\n<h2 id="h2-1">BeanFactoryPostProcessor</h2>\n<p>BeanFactoryPostProcessor是针对整个容器的后置处理器。他的使用也非常简单，只要向容器中添加一个继承BeanFactoryPostProcessor的Bean即可。</p>\n\n<h3 id="h3-1">如何使用</h3>\n<p>继承了BeanFactoryPostProcessor接口的类PostProcessors：</p>\n<pre><code class="java"><span class="code-keyword">package</span> chkui.springcore.example.xml.beanfactorypostprocessor;\n\n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n            class="code-title">PostProcessors</span> <span class="code-keyword">implements</span> <span\n            class="code-title">BeanFactoryPostProcessor</span></span>{\n<span class="code-meta">@Override</span>\n\t<span class="hljs-function"><span class="code-keyword">public</span> <span class="code-keyword">void</span> <span\n            class="code-title">postProcessBeanFactory</span><span class="hljs-params">(ConfigurableListableBeanFactory beanFactory)</span> <span\n            class="code-keyword">throws</span> BeansException </span>{\n         <span class="code-comment">//DO</span>\n    }\n}</code></pre>\n<p>然后再向容器中添加这个Bean就增加了一个BeanFactoryPostProcessor。</p>\n<pre><code class="xml"><span class="php"><span class="code-meta">&lt;?</span>xml version=<span\n        class="code-string">"1.0"</span> encoding=<span class="code-string">"UTF-8"</span><span\n        class="code-meta">?&gt;</span></span>\n<span class="code-comment">&lt;!-- xml.beanfactorypostprocessor --&gt;</span>\n<span class="code-tag">&lt;<span class="code-name">beans</span>&gt;</span>\n    <span class="code-tag">&lt;<span class="code-name">bean</span> <span class="hljs-attr">class</span>=<span\n            class="code-string">"chkui.springcore.example.xml.beanfactorypostprocessor.PostProcessors"</span> /&gt;</span>\n<span class="code-tag">&lt;/<span class="code-name">beans</span>&gt;</span></code></pre>\n<p>BeanFactoryPostProcessor主要用于处理容器相关的内容，他被触发时机是在IoC容器加载完各种配置后，还没执行Bean的初始化之前。这个时候除了PostProcessors这个Bean，其他任何Bean都没有被创建。&nbsp;所以在BeanFactoryPostProcessor处理Bean是不合适的，Bean应该要到BeanPostProcessor中去处理，2者的区别就是前者面向容器，后者面向Bean。接下来将通过一个详细例子来说明BeanFactoryPostProcessor和BeanPostProcessor的区别以及使用方式。期间还会介绍BeanDefinitio相关的内容。</p>\n\n<h3 id="h3-2">BeanFactoryPostProcessor与BeanPostProcessor使用</h3>\n<p><span style="color:#e74c3c">（文中仅仅是示例代码，无法运行，源码在</span><a href="https://gitee.com/chkui-com/spring-core-sample"\n                                                            rel="nofollow"><span style="color:#e74c3c">https://gitee.com/chkui-com/spring-core-sample</span></a><span\n        style="color:#e74c3c">，如需下载请自行clone）</span></p>\n\n<h4 id="h4-1"><span style="color:null">建造者模式</span></h4>\n<p>下面将会通过一个例子介绍2者的使用方式和使用场景。例子使用建造者模式模拟组装一台个人电脑，分为一下3步：</p>\n<ol>\n    <li>&nbsp;容器启动之后，会将电脑的所有“配件”（Cpu、Graphics、Ram）都添加到容器中。</li>\n    <li>&nbsp;在PostProcessorS实现BeanFactoryPostProcessor接口，它的功能是向容器添加一个Pc对象。</li>\n    <li>&nbsp;在PostProcessor实现BeanPostProcessor接口。他的工作是组装电脑——每一个Bean都会检查域上的@Autowired注解，并注入对应的部件，部件也会标记自己所属的电脑。</li>\n</ol>\n<p>下面是XML配置文件，它负责将Cpu、显卡、内存等电脑常用品牌的部件放置到容器中等待组装。此外它还添加了PostProcessorS和PostProcessor两个后置处理器用于装载电脑。</p>\n<pre><code class="xml"><span class="code-tag">&lt;<span class="code-name">beans</span>&gt;</span>\n    <span class="code-tag">&lt;<span class="code-name">bean</span> <span class="hljs-attr">class</span>=<span\n            class="code-string">"chkui.springcore.example.xml.beanfactorypostprocessor.bean.Cpu"</span>&gt;</span>\n     \t<span class="code-tag">&lt;<span class="code-name">property</span> <span class="hljs-attr">name</span>=<span\n                class="code-string">"brand"</span> <span class="hljs-attr">value</span>=<span\n                class="code-string">"Amd"</span>/&gt;</span>\n    <span class="code-tag">&lt;/<span class="code-name">bean</span>&gt;</span>\n    \n    <span class="code-tag">&lt;<span class="code-name">bean</span> <span class="hljs-attr">class</span>=<span\n            class="code-string">"chkui.springcore.example.xml.beanfactorypostprocessor.bean.Graphics"</span>&gt;</span>\n     \t<span class="code-tag">&lt;<span class="code-name">property</span> <span class="hljs-attr">name</span>=<span\n                class="code-string">"brand"</span> <span class="hljs-attr">value</span>=<span class="code-string">"Nvdia"</span>/&gt;</span>\n    <span class="code-tag">&lt;/<span class="code-name">bean</span>&gt;</span>\n    \n    <span class="code-tag">&lt;<span class="code-name">bean</span> <span class="hljs-attr">class</span>=<span\n            class="code-string">"chkui.springcore.example.xml.beanfactorypostprocessor.bean.Ram"</span>&gt;</span>\n     \t<span class="code-tag">&lt;<span class="code-name">property</span> <span class="hljs-attr">name</span>=<span\n                class="code-string">"brand"</span> <span class="hljs-attr">value</span>=<span class="code-string">"Kingston"</span>/&gt;</span>\n    <span class="code-tag">&lt;/<span class="code-name">bean</span>&gt;</span>\n    \n    <span class="code-tag">&lt;<span class="code-name">bean</span> <span class="hljs-attr">class</span>=<span\n            class="code-string">"chkui.springcore.example.xml.beanfactorypostprocessor.PostProcessor"</span> /&gt;</span>\n    \n    <span class="code-tag">&lt;<span class="code-name">bean</span> <span class="hljs-attr">class</span>=<span\n            class="code-string">"chkui.springcore.example.xml.beanfactorypostprocessor.PostProcessors"</span> /&gt;</span>\n<span class="code-tag">&lt;/<span class="code-name">beans</span>&gt;</span></code></pre>\n<p>下面是一个Cpu对象的结构，他标记了品牌和所属电脑。Graphics和Ram的结构和它一模一样。</p>\n<pre><code class="java"><span class="code-keyword">package</span> chkui.springcore.example.xml.beanfactorypostprocessor.bean;\n\n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n            class="code-title">Cpu</span> </span>{\n\t<span class="code-keyword">private</span> String brand;\n\t\n\t<span class="code-meta">@Autowired</span>\n\t<span class="code-keyword">private</span> Pc belong;\n}</code></pre>\n<p>注意这里的@Autowired注解，我们的配置文件并没有开启Spring的自动装配功能，我们将在PostProcessor实现自动装配。</p>\n<p>PostProcessorS的作用是向容器动态添加一个之前未定义的Bean——Pc。</p>\n<pre><code class="java"><span class="code-keyword">package</span> chkui.springcore.example.xml.beanfactorypostprocessor;\n\n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n            class="code-title">PostProcessors</span> <span class="code-keyword">implements</span> <span\n            class="code-title">BeanFactoryPostProcessor</span></span>{\n\t<span class="code-meta">@Override</span>\n\t<span class="hljs-function"><span class="code-keyword">public</span> <span class="code-keyword">void</span> <span\n            class="code-title">postProcessBeanFactory</span><span class="hljs-params">(ConfigurableListableBeanFactory beanFactory)</span> <span\n            class="code-keyword">throws</span> BeansException </span>{\n\t\t<span class="code-comment">//获取容器的注册接口</span>\n\t\tBeanDefinitionRegistry registry = (BeanDefinitionRegistry)beanFactory;\n\t\t<span class="code-comment">//新建一个BeanDefinition用于动态装配Bean</span>\n\t\tGenericBeanDefinition defininition = <span class="code-keyword">new</span> GenericBeanDefinition();\n\t\t<span class="code-comment">//设置要添加的类</span>\n\t\tdefininition.setBeanClass(Pc.class);\n\t\t<span class="code-comment">//注册BeanDefinition</span>\n\t\tregistry.registerBeanDefinition(<span class="code-string">"postBean"</span>, defininition);\n\t}\n}</code></pre>\n<p>如果看过 <a href="https://www.chkui.com/article/spring/spring_core_context_and_ioc" title="Spring核心——上下文与IoC">Ioc结构介绍的这篇文章</a>，你就会知道BeanFactory经过层层派生，实际上大部分接口都在一个类实现——DefaultListableBeanFactory，它除了实现ConfigurableListableBeanFactory接口，还实现了BeanDefinitionRegistry接口。BeanDefinitionRegistry提供了BeanDefinition的管理功能。\n</p>\n\n<h4 id="h4-2">BeanDefinition与适配器模式</h4>\n<p>\n    在上面的代码中出现了BeanDefinition接口，这里就顺道说一说这个有趣的小玩意。关于他如何使用Spring的官网并没有太详细的介绍（至少我没找到），网上倒是有各路大神的博客在解读他的源码，不过代码只是表象，要理解他的整套设计思路才能提升。</p>\n<p>关于BeanDefinition的使用模式，官网将其称呼为<em>configuration metadata</em>，直译过来叫“配置元数据”。&nbsp;他的作用有点类似于<a\n        href="https://www.chkui.com/article/spring/spring_core_context_and_ioc" title="Spring核心——上下文与IoC">Context分层应用的效果（见Spring核心——上下文与IoC&nbsp;关于\n    ApplicationContext的说明）</a>，目的就是将Bean的配置和初始化工作分成2个互不干扰的部分。</p>\n<p>我们知道 Spring现在支持各种各样的方式来添加Bean，比如在XML配置文件中使用&lt;bean&gt;标签、使用@Component以及他的派生类注解、可以在@Configuration类中生成、甚至还可以通过RMI实现远程配置等等。如果所有的这些配置来源直接和IoC容器产生关系生成Bean，那么耦合度、代码复杂度会越来越高，而且以后指不定什么时候又会加入什么新的配置方式。</p>\n<p>\n    为了解决这个问题Spring的大神们引入了适配器模式——IoC容器只接受BeanDefinition接口，IoC如何初始化一个Bean是仅仅是看BeanDefinition里的信息。而各种配置方式都有自己的适配器，所有的适配器都会根据他所需要处理的内容来生成一个BeanDefinition的实现类。这样，如果新增一个新的配置方式，增加一个适配器就可以搞定。</p>\n<p><img align="left" alt="Spring核心——IOC功能扩展点" height="381"\n        src="https://static.oschina.net/uploads/img/201807/11171429_ggwk.png" width="600"></p>\n<p></p>\n<p></p>\n<p></p>\n<p></p>\n<p></p>\n<p></p>\n<p></p>\n<p></p>\n<p></p>\n<p>所以，我们也可以利用BeanDefinitionRegistry接口向容器添加一个BeanDefinition，进而在随后的执行过程中IoC容器会根据 这个BeanDefinition创建一个对应的Bean。</p>\n\n<h4 id="h4-3">BeanPostProcessor</h4>\n<p>\n    前面已经提到，BeanFactoryPostProcessor用于处理容器级别的问题，而BeanPostProcessor用来处理每一个Bean。我们前面已经用BeanFactoryPostProcessor向容器添加了一个Pc对象的Bean，接下来我们在BeanPostProcessor中处理每一个Bean的自动注入注解。</p>\n<pre><code class="java"><span class="code-keyword">package</span> chkui.springcore.example.xml.beanfactorypostprocessor;\n\n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n            class="code-title">PostProcessor</span> <span class="code-keyword">implements</span> <span\n            class="code-title">BeanPostProcessor</span>, <span class="code-title">BeanFactoryAware</span> </span>{\n\t<span class="code-keyword">private</span> ConfigurableListableBeanFactory beanFactory;\n\t<span class="hljs-function"><span class="code-keyword">public</span> Object <span class="code-title">postProcessBeforeInitialization</span><span\n            class="hljs-params">(Object bean, String beanName)</span> </span>{\n        <span class="code-keyword">return</span> autowiredImplement(bean);\n    }\n\t<span class="hljs-function"><span class="code-keyword">public</span> Object <span class="code-title">postProcessAfterInitialization</span><span\n            class="hljs-params">(Object bean, String beanName)</span> </span>{\n        <span class="code-keyword">return</span> bean;\n    }\n\t\n\t<span class="code-comment">//自定义实现autowired功能</span>\n\t<span class="hljs-function"><span class="code-keyword">private</span> Object <span class="code-title">autowiredImplement</span><span\n            class="hljs-params">(<span class="code-keyword">final</span> Object bean)</span> </span>{\n\t\t<span class="code-keyword">for</span>(Field field : bean.getClass().getDeclaredFields()) {\n\t\t\tAutowired value = field.getAnnotation(Autowired.class);\n\t\t\t<span class="code-keyword">if</span>(<span class="code-keyword">null</span> != value) {\n\t\t\t\tObject obj = beanFactory.getBean(field.getType());\n\t\t\t\tfield.setAccessible(<span class="code-keyword">true</span>);\n\t\t\t\tfield.set(bean, obj);\n\t\t\t}\n\t\t}\n\t\t<span class="code-keyword">return</span> bean;\n\t}\n\t<span class="code-meta">@Override</span>\n\t<span class="hljs-function"><span class="code-keyword">public</span> <span class="code-keyword">void</span> <span\n            class="code-title">setBeanFactory</span><span class="hljs-params">(BeanFactory beanFactory)</span> <span\n            class="code-keyword">throws</span> BeansException </span>{\n\t\t<span class="code-keyword">this</span>.beanFactory = (ConfigurableListableBeanFactory)beanFactory;\n\t}\n}</code></pre>\n<p>这里的PostProcessor实现BeanFactoryAware接口来获取&nbsp;BeanFactory。自动注入的处理逻辑都在autowiredImplement方法中，它会扫描Bean的每一个域检查是否有@Autowired注解，如果有则根据这个域的Class类型到BeanFactory去获取对应的Bean，然后反射注入。</p>\n<p>最后我们创建一个ApplicationContext来运行他们：</p>\n<pre><code class="java"><span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n        class="code-title">SampleApp</span> </span>{\n    <span class="hljs-function"><span class="code-keyword">public</span> <span class="code-keyword">static</span> <span\n            class="code-keyword">void</span> <span class="code-title">main</span><span class="hljs-params">(String[] args)</span> </span>{\n    \tApplicationContext context = <span class="code-keyword">new</span> ClassPathXmlApplicationContext(<span\n            class="code-string">"xml/beanfactorypostprocessor/config.xml"</span>);\n    \tPc pc = context.getBean(Pc.class);\n        <span class="code-comment">/**\n        Pc Info: Graphics=Nvdia, Cpu=Amd, Ram=Kingston]\n        */</span>\n        System.out.println(pc);\n    }\n}</code></pre>\n<p>本文介绍了BeanFactoryPostProcessor和BeanPostProcessor的使用方式，以及IoC容易是如何通过BeanDefinition装载各种配置的。后续还会持续介绍Spring\n    IoC容器的各种功能扩展点。</p>'}};