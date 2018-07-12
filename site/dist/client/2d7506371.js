webpackJsonp([2],{322:function(s,n,a){"use strict";Object.defineProperty(n,"__esModule",{value:!0});n.content='<p>JSR330是Jcp给出的官方标准反向依赖注入规范。Java大部分反向依赖注入的工具或者框架目前基本上都满足JSR330规范、例如spring、guice以及Dagger。</p>\n<p>以我们最常用的spring为例。</p>\n<p>JSR中<span style="color:#cc0000">@Inject</span>可以当做<span style="color:#cc0000">@AutoWired</span>来使用。而<span\n        style="color:#cc0000">@Named</span>可以当做<span style="color:#cc0000">@Component</span>来使用。</p>\n<p>使用JSR330首先要引入javax.inject包：</p>\n<pre><code class="xml"><span class="code-tag">&lt;<span class="code-name">dependency</span>&gt;</span>  \n    <span class="code-tag">&lt;<span class="code-name">groupId</span>&gt;</span>javax.inject<span class="code-tag">&lt;/<span\n            class="code-name">groupId</span>&gt;</span>\n    <span class="code-tag">&lt;<span class="code-name">artifactId</span>&gt;</span>javax.inject<span class="code-tag">&lt;/<span\n            class="code-name">artifactId</span>&gt;</span>\n    <span class="code-tag">&lt;<span class="code-name">version</span>&gt;</span>1<span class="code-tag">&lt;/<span\n            class="code-name">version</span>&gt;</span>\n<span class="code-tag">&lt;/<span class="code-name">dependency</span>&gt;</span> </code></pre>\n<p>目前Maven中央仓库中就一个inject的jar。</p>\n<p>首先使用xml配置通过注解扫描添加bean。</p>\n<pre><code class="xml"><span class="php"><span class="code-meta">&lt;?</span>xml version=<span\n        class="code-string">"1.0"</span> encoding=<span class="code-string">"UTF-8"</span><span\n        class="code-meta">?&gt;</span></span>\n<span class="code-tag">&lt;<span class="code-name">beans</span> <span class="hljs-attr">xmlns</span>=<span\n        class="code-string">"http://www.springframework.org/schema/beans"</span>\n    <span class="hljs-attr">xmlns:xsi</span>=<span\n            class="code-string">"http://www.w3.org/2001/XMLSchema-instance"</span>\n    <span class="hljs-attr">xmlns:context</span>=<span class="code-string">"http://www.springframework.org/schema/context"</span>  \n    <span class="hljs-attr">xsi:schemaLocation</span>=<span class="code-string">"http://www.springframework.org/schema/beans  \n    http://www.springframework.org/schema/beans/spring-beans-3.1.xsd  \n    http://www.springframework.org/schema/context  \n    http://www.springframework.org/schema/context/spring-context-3.1.xsd"</span>&gt;</span>  \n    <span class="code-tag">&lt;<span class="code-name">context:component-scan</span>  <span class="hljs-attr">base-package</span>=<span\n            class="code-string">"com.demo.jsr330"</span>/&gt;</span>\n<span class="code-tag">&lt;/<span class="code-name">beans</span>&gt;</span>  </code></pre>\n<p>然后像下面这个添加一个bean</p>\n<pre><code class="java"><span class="code-meta">@Named</span>  \n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n            class="code-title">service</span> </span>{\n  <span class="hljs-function"><span class="code-keyword">public</span>  <span class="code-keyword">void</span>   <span\n          class="code-title">print</span><span class="hljs-params">()</span></span>{\n     System.out.println(<span class="code-string">"Service  print  method is invoked"</span>);  \n  }  \n}  </code></pre>\n<p>然后将这个bean注入到其他bean中去使用</p>\n<pre><code class="java"><span class="code-meta">@Named</span>  \n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n            class="code-title">Faction</span> </span>{\n  <span class="code-meta">@Inject</span>\n  Service service;\n\n  <span class="hljs-function"><span class="code-keyword">public</span>  <span class="code-keyword">void</span>  <span\n          class="code-title">show</span><span class="hljs-params">()</span></span>{\n     service.print()； \n  }  \n}  </code></pre>\n<p>JSR330还定义了<span style="color:#FF0000">@Qualifier</span>和<span style="color:#FF0000">@Provider</span>，对应到spring都给出了标准的实现。\n</p>\n<p>使用JSR330代替原注解的好处是无论使用任何反向依赖注入工具或框架，只要他是支持JSR330的，都可以平滑的切换。</p>'},339:function(s,n,a){"use strict";Object.defineProperty(n,"__esModule",{value:!0});n.content='<h2 id="h2-1">什么叫前后端同构？</h2>\n<p>为了解决某些问题（比如SEO、提升渲染速度等）<strong><em>react</em></strong>\n    提供了2个方法在服务端生成一个HTML文本格式的字符串。在得到了这个HTML格式的字符串之后，通常会将其组装成一个页面直接返回给用户的浏览器。</p>\n<p>到这里，服务端的活已经干完了，然后就是浏览器这边干活。</p>\n<p>浏览器拿到HTML文本后，立刻进行渲染将内容呈现给用户。然后加载页面所需的 .js 文件，然后执行\n    <em><strong>JavaScript&nbsp;</strong></em>脚本，然后开始初始化&nbsp;<em><strong>react</strong></em> 组件…………</p>\n<p>到这里问题就来了。<strong><em>react</em></strong> 初始化组件后会执行组件内所有\n    <em>render&nbsp;() </em>方法，然后生成虚拟DOM的树形结构，然后在适当的时候将虚拟dom<em>写</em>到浏览器的真实dom中。因为 <strong><em>react</em></strong>\n    总是根据虚拟dom来生成真实dom，所以最后会把服务器端渲染好的HTML全部替换掉。</p>\n<p>\n    上面这个事情说不是问题确实也不是问题，无非就是用户看到页面然后“闪现”一下。说是问题还真是个问题，产品会拿着这毛病从用户体验的角度在各种场合和你死磕半个月。磕累了你索性把服务端渲染关了，然后运营又拿着SEO的问题准备和你开始撕逼了。</p>\n<p>聪明如 Facebook 的工程师当然想到了这些问题，所以他们在<em>ReactDOMServer.renderToString(element) 方法</em>中提供了一个\n    <strong><em>checksum</em></strong> 机制。</p>\n<p>关于&nbsp;<strong><em>checksum </em></strong> <a href="https://facebook.github.io/react/docs/react-dom-server.html"\n                                                  rel="nofollow">官网</a> 并没有太多介绍，但是国内外的各路博客介绍了不少。我一直想找&nbsp;<em><strong>react</strong></em>\n    开发者关于这个机制的介绍一直没找到……。</p>\n<p><strong>前后端同构</strong>就是保证前端和后端的dom结构一致，不会发生重复渲染。<em><strong>react</strong></em>\n    使用&nbsp;<strong><em>checksum </em></strong>机制进行保障。</p>\n\n<h2 id="h2-2">什么叫React首屏渲染？</h2>\n<p>简单的说就是 <em><strong>react</strong></em> 在浏览器内存中第一次生成的虚拟 dom 树。<strong>切记是虚拟 dom ，而不是浏览器的dom</strong>。</p>\n<p>了解 <strong><em>react</em></strong> 的应该知道，所有 <em><strong>react</strong></em> 组件都有一个 <em>render()</em>\n    方法（如果使用function方式编写的组件会把function里的所有代码都塞到 <em>render()</em> 方法中去）。当<em>ReactDOM.render( element, container,\n        [callback] )</em>方法执行时，会执行以下步骤：</p>\n<ol>\n    <li>所有组件的会先进行初始化（es6执行构造函数）。</li>\n    <li>所有组件的&nbsp;<em>render</em>&nbsp;<em>()</em> 方法会被调用一次，完成这个过程后会得到一颗虚拟的 dom 树。</li>\n    <li>&nbsp;<em><strong>react</strong></em> 会将虚拟dom转换成浏览器dom，完成后调用组件的&nbsp;<em>componentDidMount()</em>&nbsp;方法告诉你已经装载到浏览器上了。\n    </li>\n</ol>\n<p>在上面这个过程成中，步骤2完成后即为完成 <em><strong>react</strong></em> 的首屏渲染。结合 <strong><em>checksum</em></strong>&nbsp;机制步骤3有可能不会执行。\n</p>\n<p>当组件状态发生变更时（ <em>setState() </em>生命周期函数被调用）或者 父组件渲染时（父组件的 <em>render()</em> 方法被调用），当前组件的 <em>render()</em>\n    方法都会被执行，都有可能会导致虚拟dom变更，但是这些变更和首屏渲染没任何关系了。</p>\n\n<h2 id="h2-3">React前后端同构首屏渲染</h2>\n<p>了解了同构和首屏渲染，就好理解如何解决首屏不重复渲染的问题了。</p>\n<p>首先服务端渲染完之后会有一个 <em><strong>checksum</strong></em> 值写在根元素的属性上：</p>\n<p><img alt="React 前后端同构防止重复渲染" height="70"\n        src="https://file.mahoooo.com/res/file/react_server_render_with_checksum_1.png" width="601"></p>\n<p>这个 <em><strong>checksum</strong></em>&nbsp;是根据服务端生成的HTML内容哈希计算得到的。</p>\n<p>然后在浏览器加载完所有的js文件之后，开始执行前面介绍的&nbsp;<em>ReactDOM.render( element, container, [callback] )</em> &nbsp;初始化渲染的三个步骤。当执行完第二步生成虚拟dom后，<strong><em>react</em></strong>\n    会根虚拟dom用相同的算法计算一个哈希值，如果和 <em><strong>checksum</strong></em> 一致则认为服务器已经完成渲染，不会再执行第三步。</p>\n<p>如果 <strong><em>checksum</em></strong> 比对不一致，在 <strong>开发环境</strong>&nbsp;和 <strong>测试环境</strong>\n    会在浏览器console中输出以下警告内容：</p>\n<p><img alt="React 前后端同构防止重复渲染" height="85"\n        src="https://file.mahoooo.com/res/file/react_server_render_with_checksum_2.png" width="790"></p>\n<p><strong>生产环境不会输出任何警告。</strong></p>\n<p>同构渲染的内容就这么多，原理其实蛮简单的，无非就是保证DOM一致。但是结合代码分片、异步加载、服务端调接口异步组装数据等等功能后，如何保证服务端和浏览器端第一次渲染的dom一致还得花不少功夫。不过原理清楚了，事情总能办成。</p>'},353:function(s,n,a){"use strict";Object.defineProperty(n,"__esModule",{value:!0});n.content='<p><a href="https://www.chkui.com/article/spring/spring_core_bean_post_processors" title="Spring核心——IOC处理器扩展">上一篇文章</a>介绍了非侵入式的框架的概念以及IOC的功能扩展点之一——BeanPostProcessor，我们接下来的内容继续说明IoC更多的扩展方法。\n</p>\n\n<h2 id="h2-1">BeanFactoryPostProcessor</h2>\n<p>BeanFactoryPostProcessor是针对整个容器的后置处理器。他的使用也非常简单，只要向容器中添加一个继承BeanFactoryPostProcessor的Bean即可。</p>\n\n<h3 id="h3-1">如何使用</h3>\n<p>继承了BeanFactoryPostProcessor接口的类PostProcessors：</p>\n<pre><code class="java"><span class="code-keyword">package</span> chkui.springcore.example.xml.beanfactorypostprocessor;\n\n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n            class="code-title">PostProcessors</span> <span class="code-keyword">implements</span> <span\n            class="code-title">BeanFactoryPostProcessor</span></span>{\n<span class="code-meta">@Override</span>\n\t<span class="hljs-function"><span class="code-keyword">public</span> <span class="code-keyword">void</span> <span\n            class="code-title">postProcessBeanFactory</span><span class="hljs-params">(ConfigurableListableBeanFactory beanFactory)</span> <span\n            class="code-keyword">throws</span> BeansException </span>{\n         <span class="code-comment">//DO</span>\n    }\n}</code></pre>\n<p>然后再向容器中添加这个Bean就增加了一个BeanFactoryPostProcessor。</p>\n<pre><code class="xml"><span class="php"><span class="code-meta">&lt;?</span>xml version=<span\n        class="code-string">"1.0"</span> encoding=<span class="code-string">"UTF-8"</span><span\n        class="code-meta">?&gt;</span></span>\n<span class="code-comment">&lt;!-- xml.beanfactorypostprocessor --&gt;</span>\n<span class="code-tag">&lt;<span class="code-name">beans</span>&gt;</span>\n    <span class="code-tag">&lt;<span class="code-name">bean</span> <span class="hljs-attr">class</span>=<span\n            class="code-string">"chkui.springcore.example.xml.beanfactorypostprocessor.PostProcessors"</span> /&gt;</span>\n<span class="code-tag">&lt;/<span class="code-name">beans</span>&gt;</span></code></pre>\n<p>BeanFactoryPostProcessor主要用于处理容器相关的内容，他被触发时机是在IoC容器加载完各种配置后，还没执行Bean的初始化之前。这个时候除了PostProcessors这个Bean，其他任何Bean都没有被创建。&nbsp;所以在BeanFactoryPostProcessor处理Bean是不合适的，Bean应该要到BeanPostProcessor中去处理，2者的区别就是前者面向容器，后者面向Bean。接下来将通过一个详细例子来说明BeanFactoryPostProcessor和BeanPostProcessor的区别以及使用方式。期间还会介绍BeanDefinitio相关的内容。</p>\n\n<h3 id="h3-2">BeanFactoryPostProcessor与BeanPostProcessor使用</h3>\n<p><span style="color:#e74c3c">（文中仅仅是示例代码，无法运行，源码在</span><a href="https://gitee.com/chkui-com/spring-core-sample"\n                                                            rel="nofollow"><span style="color:#e74c3c">https://gitee.com/chkui-com/spring-core-sample</span></a><span\n        style="color:#e74c3c">，如需下载请自行clone）</span></p>\n\n<h4 id="h4-1"><span style="color:null">建造者模式</span></h4>\n<p>下面将会通过一个例子介绍2者的使用方式和使用场景。例子使用建造者模式模拟组装一台个人电脑，分为一下3步：</p>\n<ol>\n    <li>&nbsp;容器启动之后，会将电脑的所有“配件”（Cpu、Graphics、Ram）都添加到容器中。</li>\n    <li>&nbsp;在PostProcessorS实现BeanFactoryPostProcessor接口，它的功能是向容器添加一个Pc对象。</li>\n    <li>&nbsp;在PostProcessor实现BeanPostProcessor接口。他的工作是组装电脑——每一个Bean都会检查域上的@Autowired注解，并注入对应的部件，部件也会标记自己所属的电脑。</li>\n</ol>\n<p>下面是XML配置文件，它负责将Cpu、显卡、内存等电脑常用品牌的部件放置到容器中等待组装。此外它还添加了PostProcessorS和PostProcessor两个后置处理器用于装载电脑。</p>\n<pre><code class="xml"><span class="code-tag">&lt;<span class="code-name">beans</span>&gt;</span>\n    <span class="code-tag">&lt;<span class="code-name">bean</span> <span class="hljs-attr">class</span>=<span\n            class="code-string">"chkui.springcore.example.xml.beanfactorypostprocessor.bean.Cpu"</span>&gt;</span>\n     \t<span class="code-tag">&lt;<span class="code-name">property</span> <span class="hljs-attr">name</span>=<span\n                class="code-string">"brand"</span> <span class="hljs-attr">value</span>=<span\n                class="code-string">"Amd"</span>/&gt;</span>\n    <span class="code-tag">&lt;/<span class="code-name">bean</span>&gt;</span>\n    \n    <span class="code-tag">&lt;<span class="code-name">bean</span> <span class="hljs-attr">class</span>=<span\n            class="code-string">"chkui.springcore.example.xml.beanfactorypostprocessor.bean.Graphics"</span>&gt;</span>\n     \t<span class="code-tag">&lt;<span class="code-name">property</span> <span class="hljs-attr">name</span>=<span\n                class="code-string">"brand"</span> <span class="hljs-attr">value</span>=<span class="code-string">"Nvdia"</span>/&gt;</span>\n    <span class="code-tag">&lt;/<span class="code-name">bean</span>&gt;</span>\n    \n    <span class="code-tag">&lt;<span class="code-name">bean</span> <span class="hljs-attr">class</span>=<span\n            class="code-string">"chkui.springcore.example.xml.beanfactorypostprocessor.bean.Ram"</span>&gt;</span>\n     \t<span class="code-tag">&lt;<span class="code-name">property</span> <span class="hljs-attr">name</span>=<span\n                class="code-string">"brand"</span> <span class="hljs-attr">value</span>=<span class="code-string">"Kingston"</span>/&gt;</span>\n    <span class="code-tag">&lt;/<span class="code-name">bean</span>&gt;</span>\n    \n    <span class="code-tag">&lt;<span class="code-name">bean</span> <span class="hljs-attr">class</span>=<span\n            class="code-string">"chkui.springcore.example.xml.beanfactorypostprocessor.PostProcessor"</span> /&gt;</span>\n    \n    <span class="code-tag">&lt;<span class="code-name">bean</span> <span class="hljs-attr">class</span>=<span\n            class="code-string">"chkui.springcore.example.xml.beanfactorypostprocessor.PostProcessors"</span> /&gt;</span>\n<span class="code-tag">&lt;/<span class="code-name">beans</span>&gt;</span></code></pre>\n<p>下面是一个Cpu对象的结构，他标记了品牌和所属电脑。Graphics和Ram的结构和它一模一样。</p>\n<pre><code class="java"><span class="code-keyword">package</span> chkui.springcore.example.xml.beanfactorypostprocessor.bean;\n\n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n            class="code-title">Cpu</span> </span>{\n\t<span class="code-keyword">private</span> String brand;\n\t\n\t<span class="code-meta">@Autowired</span>\n\t<span class="code-keyword">private</span> Pc belong;\n}</code></pre>\n<p>注意这里的@Autowired注解，我们的配置文件并没有开启Spring的自动装配功能，我们将在PostProcessor实现自动装配。</p>\n<p>PostProcessorS的作用是向容器动态添加一个之前未定义的Bean——Pc。</p>\n<pre><code class="java"><span class="code-keyword">package</span> chkui.springcore.example.xml.beanfactorypostprocessor;\n\n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n            class="code-title">PostProcessors</span> <span class="code-keyword">implements</span> <span\n            class="code-title">BeanFactoryPostProcessor</span></span>{\n\t<span class="code-meta">@Override</span>\n\t<span class="hljs-function"><span class="code-keyword">public</span> <span class="code-keyword">void</span> <span\n            class="code-title">postProcessBeanFactory</span><span class="hljs-params">(ConfigurableListableBeanFactory beanFactory)</span> <span\n            class="code-keyword">throws</span> BeansException </span>{\n\t\t<span class="code-comment">//获取容器的注册接口</span>\n\t\tBeanDefinitionRegistry registry = (BeanDefinitionRegistry)beanFactory;\n\t\t<span class="code-comment">//新建一个BeanDefinition用于动态装配Bean</span>\n\t\tGenericBeanDefinition defininition = <span class="code-keyword">new</span> GenericBeanDefinition();\n\t\t<span class="code-comment">//设置要添加的类</span>\n\t\tdefininition.setBeanClass(Pc.class);\n\t\t<span class="code-comment">//注册BeanDefinition</span>\n\t\tregistry.registerBeanDefinition(<span class="code-string">"postBean"</span>, defininition);\n\t}\n}</code></pre>\n<p>如果看过 <a href="https://www.chkui.com/article/spring/spring_core_context_and_ioc" title="Spring核心——上下文与IoC">Ioc结构介绍的这篇文章</a>，你就会知道BeanFactory经过层层派生，实际上大部分接口都在一个类实现——DefaultListableBeanFactory，它除了实现ConfigurableListableBeanFactory接口，还实现了BeanDefinitionRegistry接口。BeanDefinitionRegistry提供了BeanDefinition的管理功能。\n</p>\n\n<h4 id="h4-2">BeanDefinition与适配器模式</h4>\n<p>\n    在上面的代码中出现了BeanDefinition接口，这里就顺道说一说这个有趣的小玩意。关于他如何使用Spring的官网并没有太详细的介绍（至少我没找到），网上倒是有各路大神的博客在解读他的源码，不过代码只是表象，要理解他的整套设计思路才能提升。</p>\n<p>关于BeanDefinition的使用模式，官网将其称呼为<em>configuration metadata</em>，直译过来叫“配置元数据”。&nbsp;他的作用有点类似于<a\n        href="https://www.chkui.com/article/spring/spring_core_context_and_ioc" title="Spring核心——上下文与IoC">Context分层应用的效果（见Spring核心——上下文与IoC&nbsp;关于\n    ApplicationContext的说明）</a>，目的就是将Bean的配置和初始化工作分成2个互不干扰的部分。</p>\n<p>我们知道 Spring现在支持各种各样的方式来添加Bean，比如在XML配置文件中使用&lt;bean&gt;标签、使用@Component以及他的派生类注解、可以在@Configuration类中生成、甚至还可以通过RMI实现远程配置等等。如果所有的这些配置来源直接和IoC容器产生关系生成Bean，那么耦合度、代码复杂度会越来越高，而且以后指不定什么时候又会加入什么新的配置方式。</p>\n<p>\n    为了解决这个问题Spring的大神们引入了适配器模式——IoC容器只接受BeanDefinition接口，IoC如何初始化一个Bean是仅仅是看BeanDefinition里的信息。而各种配置方式都有自己的适配器，所有的适配器都会根据他所需要处理的内容来生成一个BeanDefinition的实现类。这样，如果新增一个新的配置方式，增加一个适配器就可以搞定。</p>\n<p><img align="left" alt="Spring核心——IOC功能扩展点" height="381"\n        src="https://static.oschina.net/uploads/img/201807/11171429_ggwk.png" width="600"></p>\n<p></p>\n<p></p>\n<p></p>\n<p></p>\n<p></p>\n<p></p>\n<p></p>\n<p></p>\n<p></p>\n<p>所以，我们也可以利用BeanDefinitionRegistry接口向容器添加一个BeanDefinition，进而在随后的执行过程中IoC容器会根据 这个BeanDefinition创建一个对应的Bean。</p>\n\n<h4 id="h4-3">BeanPostProcessor</h4>\n<p>\n    前面已经提到，BeanFactoryPostProcessor用于处理容器级别的问题，而BeanPostProcessor用来处理每一个Bean。我们前面已经用BeanFactoryPostProcessor向容器添加了一个Pc对象的Bean，接下来我们在BeanPostProcessor中处理每一个Bean的自动注入注解。</p>\n<pre><code class="java"><span class="code-keyword">package</span> chkui.springcore.example.xml.beanfactorypostprocessor;\n\n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n            class="code-title">PostProcessor</span> <span class="code-keyword">implements</span> <span\n            class="code-title">BeanPostProcessor</span>, <span class="code-title">BeanFactoryAware</span> </span>{\n\t<span class="code-keyword">private</span> ConfigurableListableBeanFactory beanFactory;\n\t<span class="hljs-function"><span class="code-keyword">public</span> Object <span class="code-title">postProcessBeforeInitialization</span><span\n            class="hljs-params">(Object bean, String beanName)</span> </span>{\n        <span class="code-keyword">return</span> autowiredImplement(bean);\n    }\n\t<span class="hljs-function"><span class="code-keyword">public</span> Object <span class="code-title">postProcessAfterInitialization</span><span\n            class="hljs-params">(Object bean, String beanName)</span> </span>{\n        <span class="code-keyword">return</span> bean;\n    }\n\t\n\t<span class="code-comment">//自定义实现autowired功能</span>\n\t<span class="hljs-function"><span class="code-keyword">private</span> Object <span class="code-title">autowiredImplement</span><span\n            class="hljs-params">(<span class="code-keyword">final</span> Object bean)</span> </span>{\n\t\t<span class="code-keyword">for</span>(Field field : bean.getClass().getDeclaredFields()) {\n\t\t\tAutowired value = field.getAnnotation(Autowired.class);\n\t\t\t<span class="code-keyword">if</span>(<span class="code-keyword">null</span> != value) {\n\t\t\t\tObject obj = beanFactory.getBean(field.getType());\n\t\t\t\tfield.setAccessible(<span class="code-keyword">true</span>);\n\t\t\t\tfield.set(bean, obj);\n\t\t\t}\n\t\t}\n\t\t<span class="code-keyword">return</span> bean;\n\t}\n\t<span class="code-meta">@Override</span>\n\t<span class="hljs-function"><span class="code-keyword">public</span> <span class="code-keyword">void</span> <span\n            class="code-title">setBeanFactory</span><span class="hljs-params">(BeanFactory beanFactory)</span> <span\n            class="code-keyword">throws</span> BeansException </span>{\n\t\t<span class="code-keyword">this</span>.beanFactory = (ConfigurableListableBeanFactory)beanFactory;\n\t}\n}</code></pre>\n<p>这里的PostProcessor实现BeanFactoryAware接口来获取&nbsp;BeanFactory。自动注入的处理逻辑都在autowiredImplement方法中，它会扫描Bean的每一个域检查是否有@Autowired注解，如果有则根据这个域的Class类型到BeanFactory去获取对应的Bean，然后反射注入。</p>\n<p>最后我们创建一个ApplicationContext来运行他们：</p>\n<pre><code class="java"><span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n        class="code-title">SampleApp</span> </span>{\n    <span class="hljs-function"><span class="code-keyword">public</span> <span class="code-keyword">static</span> <span\n            class="code-keyword">void</span> <span class="code-title">main</span><span class="hljs-params">(String[] args)</span> </span>{\n    \tApplicationContext context = <span class="code-keyword">new</span> ClassPathXmlApplicationContext(<span\n            class="code-string">"xml/beanfactorypostprocessor/config.xml"</span>);\n    \tPc pc = context.getBean(Pc.class);\n        <span class="code-comment">/**\n        Pc Info: Graphics=Nvdia, Cpu=Amd, Ram=Kingston]\n        */</span>\n        System.out.println(pc);\n    }\n}</code></pre>\n<p>本文介绍了BeanFactoryPostProcessor和BeanPostProcessor的使用方式，以及IoC容易是如何通过BeanDefinition装载各种配置的。后续还会持续介绍Spring\n    IoC容器的各种功能扩展点。</p>'},363:function(s,n,a){"use strict";Object.defineProperty(n,"__esModule",{value:!0});n.content='<p>本文将解释如何在Windows下安装TensorFlow。</p>\n\n<h2 id="h2-1">确定安装哪类TensorFlow</h2>\n<p>需要先确定哪种类型的TensorFlow：</p>\n<ul>\n    <li><strong>仅支持CUP运算版本：</strong>如果电脑的系统没有&nbsp;NVIDIA®的GPU，那么必须安装这个版本。这个版本的TensorFlow安装非常简单（安装仅需一个命令，5到10分钟），所以即使系统中有满足要求的NVIDIA®\n        GPU官方还是建议在学习阶段安装这个版本。\n    </li>\n    <li><strong>支持GPU运算的版本：</strong>TensorFlow程序在GPU下运行比在CPU下运行明显快很多。如果系统中包含&nbsp;NVIDIA®的GPU满足下一个小节所示的条件并且程序对性能要求很高，建议安装此版本。\n    </li>\n</ul>\n\n<h2 id="h2-2">运行TensorFlow所需要的GPU配置</h2>\n<p>如果在系统中安装使用GPU运行的TensorFlow，需要确保下面介绍的NVIDIA软件已经安装到系统中。</p>\n<ul>\n    <li>CUDA® Toolkit 8.0。请看 <a\n            href="http://docs.nvidia.com/cuda/cuda-installation-guide-microsoft-windows/#axzz4eDEVDKkM" rel="nofollow">NVIDIA安装cuda</a>\n        的文档，根据文档中的描述确保已经将CUDA相关的路径增加到&nbsp;<code>%PATH%</code>&nbsp;环境变量中。\n    </li>\n    <li>NVIDIA的驱动关联&nbsp;CUDA Toolkit 8.0。</li>\n    <li>cuDNN v5.1。请查看 <a href="https://developer.nvidia.com/cudnn" rel="nofollow">NVIDIA&nbsp;cudnn</a>\n        文档。需要注意的是cuDNN通常安装在与其他CUDA动态链接库（dll）不同的位置。确保已经将cuDNN的 动态链接库（dll）的地址添加到系统的&nbsp;&nbsp;<code>%PATH%</code>&nbsp;环境变量中。\n    </li>\n    <li>GPU显卡必须拥有3.0以上版本的CUDA计算能力，查看 <a href="https://developer.nvidia.com/cuda-gpus" rel="nofollow">NVIDIA显卡支持列表</a>\n        了解支持情况。\n    </li>\n</ul>\n<p>如果系统中已经安装了以前的相关包，请更新到所指定的版本。</p>\n\n<h2 id="h2-3">如何安装TensorFlow</h2>\n<p>在安装TensorFlow之前必须选定一个安装机制。目前提供2种机制：</p>\n<ul>\n    <li>"native"app</li>\n    <li>Anaconda</li>\n</ul>\n<p>\n    Native的安装（以下简称本地安装）方式会将TensorFlow直接安装在当前的系统中，不会在系统和TensorFlow之间搭建任何的虚拟环境，所以本地安装不会额外安装一个独立的容器。需要注意的是本地安装可能会干扰系统中其他基于python安装的程序。如果事先已经安装配置了满足需要的python环境，本地安装通常只需要一个命令就可以完成。使用本地安装，用户可以在系统中任何位置运行TensorFlow。</p>\n<p>在Anaconda模式下，需要使用conda创建一个虚拟环境。官方优先推荐使用&nbsp;<code>pip install</code>&nbsp;命令来安装TensorFlow，其次再考虑anaconda的&nbsp;<code>conda\n    install</code>&nbsp;命令。conda包是第三方社区提供的（非TensorFlow官方），TensorFlow团队从始至终都不会去测试在conda中运行的情况，在使用时需考虑这个风险。</p>\n\n<h3 id="h3-1">本地安装</h3>\n<p>首先，需要安装以下版本的python：</p>\n<ul>\n    <li><a href="https://www.python.org/downloads/release/python-352/" rel="nofollow">Python 3.5.x from python.org</a>\n    </li>\n</ul>\n<p>TensorFlow在windows操作系统中仅仅支持3.5.x版本的python。Python 3.5.x附带pip3软件包管理器，这是用于安装TensorFlow的程序。</p>\n<p>安装TensorFlow需要启动一个终端（terminal），然后在该终端中输入对应的pip3 install命令。安装仅支持CPU版本的TensorFlow，输入以下命令：</p>\n<pre class="lua"><code class="language-bash">C:\\&gt; pip3 install <span class="code-comment">--upgrade tensorflow</span></code></pre>\n<p>安装GPU版本的TensorFlow，使用以下命令：</p>\n<pre class="lua"><code class="language-bash">C:\\&gt; pip3 install <span\n        class="code-comment">--upgrade tensorflow-gpu</span></code></pre>\n<p>Anaconda模式安装</p>\n<p><span style="color:#FF0000">再次强调，Anaconda安装是有第三方社区提供的，非官方。</span></p>\n<p>在Anaconda环境中安装TensorFlow分为以下几个步骤：</p>\n<ol>\n    <li>按照&nbsp;<a href="https://www.continuum.io/downloads" rel="nofollow">Anaconda download site</a>&nbsp;的说明进行下载和安装操作。\n    </li>\n    <li>调用以下命令来创建一个名为tensorflow的conda环境：\n        <pre class="groovy"><code class="language-bash"><span class="code-string">C:</span>&gt; conda create -n tensorflow </code></pre>\n        <p></p></li>\n    <li><p>键入以下命令来启用conda环境：</p>\n        <pre class="yaml"><code class="language-bash"><span class="hljs-attr">C:</span>&gt; activate tensorflow\n (tensorflow)C:&gt;  <span class="code-comment"><span\n                    class="code-comment"># Your prompt should change </span></span></code></pre>\n        <p></p></li>\n    <li><p>键入以下命令在conda环境中安装TensorFlow。这里 安装CPU版本的命令：</p>\n        <pre class="groovy"><code class="language-bash">(tensorflow)<span class="code-string">C:</span>&gt; pip install --ignore-installed --upgrade <span\n                class="code-string">https:</span><span class="code-comment">//storage.googleapis.com/tensorflow/windows/cpu/tensorflow-1.0.1-cp35-cp35m-win_amd64.whl </span>\n</code></pre>\n        <p>这是GPU版本的命令：</p>\n        <pre class="groovy"><code class="language-bash">(tensorflow)<span class="code-string">C:</span>&gt; pip install --ignore-installed --upgrade <span\n                class="code-string">https:</span><span class="code-comment">//storage.googleapis.com/tensorflow/windows/gpu/tensorflow_gpu-1.0.1-cp35-cp35m-win_amd64.whl </span></code></pre>\n        <p></p></li>\n</ol>\n\n<h3 id="h3-2">验证安装&nbsp;</h3>\n<ol>\n    <li>通过以下步骤来验证TensorFlow是否安装成功：</li>\n    <li>启动一个终端（比如CMD）</li>\n    <li>如果通过Anaconda安装，先启动Anaconda环境。</li>\n    <li>在终端运行python</li>\n    <li>\n        <pre class="groovy"><code class="language-bash"><span class="code-string">C:</span>&gt; python </code></pre>\n    </li>\n    <li>在python的交互环境中输入以下脚本代码：</li>\n    <li> <pre class="python"><code class="python"><span class="code-meta"><span\n            class="code-meta">&gt;&gt;&gt; </span></span><span class="code-keyword"><span\n            class="code-keyword">import</span></span> tensorflow <span class="code-keyword"><span class="code-keyword">as</span></span> tf\n\n\n\n\nhello = tf.constant(<span class="code-string"><span class="code-string">\'Hello, TensorFlow!\'</span></span>)\nsess = tf.Session()\nprint(sess.run(hello))\n </code></pre>\n        <p>如果python输出以下内容，则表明TensorFlow已经安装成功然后就可以写TensorFlow的程序了：</p></li>\n    <li>\n        <pre class=""><code class="language-bash">Hello, TensorFlow!</code></pre>\n        <p>如果收到了一些异常信息，请继续向下看。</p></li>\n</ol>\n\n<h3 id="h3-3">常见的安装问题</h3>\n<p>TensorFlow通过Stack Overflow网站来记录错误信息以及处理方法。下面的列表包含一些跳转的到&nbsp;Stack Overflow的连接。如果在安装过程中遇到的问题没有在下面中，请到Stack\n    Overflow去搜索相关的关键字。若还是搜索不到，请直接提出新问题并标记&nbsp;<code>tensorflow</code>&nbsp;的标签。</p>\n<table>\n    <tbody>\n    <tr>\n        <th>Stack Overflow Link</th>\n        <th>Error Message</th>\n    </tr>\n    <tr>\n        <td><a href="https://stackoverflow.com/q/41007279" rel="nofollow">41007279</a></td>\n        <td>\n            [...\\stream_executor\\dso_loader.cc] Couldn\'t open CUDA library nvcuda.dll\n        </td>\n    </tr>\n    <tr>\n        <td><a href="https://stackoverflow.com/q/41007279" rel="nofollow">41007279</a></td>\n        <td>\n            [...\\stream_executor\\cuda\\cuda_dnn.cc] Unable to load cuDNN DSO\n        </td>\n    </tr>\n    <tr>\n        <td><a href="http://stackoverflow.com/q/42006320" rel="nofollow">42006320</a></td>\n        <td>\n            ImportError: Traceback (most recent call last): File "...\\tensorflow\\core\\framework\\graph_pb2.py", line 6,\n            in from google.protobuf import descriptor as _descriptor ImportError: cannot import name \'descriptor\'\n        </td>\n    </tr>\n    <tr>\n        <td><a href="https://stackoverflow.com/q/42011070" rel="nofollow">42011070</a></td>\n        <td>\n            No module named "pywrap_tensorflow"\n        </td>\n    </tr>\n    </tbody>\n</table>'}});