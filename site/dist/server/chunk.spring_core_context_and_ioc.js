exports.ids=[16],exports.modules={352:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.content='<p>前面3篇分别介绍了<a href="https://www.chkui.com/article/spring/spring_core_design_pattern_and_ioc" title="IoC容器与Bean的关系">IoC容器与Bean的关系</a>、<a\n        href="https://www.chkui.com/article/spring/spring_core_dependency_injection_of_bean" title="Bean与Bean之间的关系">Bean与Bean之间的关系</a>以及<a\n        href="https://www.chkui.com/article/spring/spring_core_bean_lifecycle_callback" title="Bean自身的控制和管理">Bean自身的控制和管理</a>。在了解Spinrg核心模式时，一定要谨记他的基本工作元素就是IoC容器和Bean，所有的功能是围绕着这2者展开的。要实现的内容无非就是通过设计模式来解决<strong>IoC与Bean的关系</strong>、<strong>Bean与Bean的关系</strong>、<strong>IoC与IoC的关系，</strong>以及对Ioc和Bean的控制<strong>。</strong>\n</p>\n\n<h2 id="h2-1">IoC控制入口</h2>\n<p>看完整个<em>Spring Core</em>的<em>API\n    Doc</em>，你也不会发现任何一个名为<em>IoC</em>的类或者接口。唯一一个提到<em>IoC</em>这个词的是<strong>spring-beans</strong>工程下关于<em>org.springframework.beans.factory</em>这个包的介绍——"<em>The\n    core package implementing Spring\'s lightweight Inversion of Control (IoC)\n    container.</em>"。实际上<em>Spring</em>核心框架将对<em>IoC</em>容器的控制都交给了<em>BeanFactory</em>和<em>ApplicationContext</em>两个接口。\n</p>\n<p>这个2个接口有什么关系吗？一个叫<em>Factory</em>，一个叫<em>Context</em>，概念上完全是两码事，前者是创建模式的FLAG，后者是行为模式的FLAG。并且在工程结构上，一个属于spring-beans，另外一个属于spring-context。不过仔细看会发现<em>ApplicationContext</em>继承自<em>BeanFactory</em>的派生接口<em>（</em>\n    ListableBeanFactory、HierarchicalBeanFactory <em>）。</em>要想理解他们的关系和作用，还得一个一个来说。</p>\n\n<h2 id="h2-2">factory包中的接口</h2>\n<p>\n    在Spring核心工程中，BeanFactory及其派生被定义为“Ioc容器的轻量级实现”。这也是Spring最基础的IoC容器和Bean的管理接口。factory包中主要涉及5个接口BeanFactory、ListableBeanFactory、HierarchicalBeanFactory、ConfigurableBeanFactory和ConfigurableListableBeanFactory<strong>。</strong>初来咋到看到这5个接口八成懵逼，少数牛逼的码友估计能从名字猜测出他们的功能。其实他们有很清晰的层次结构，一层继承一层，一层扩展一层的功能。\n</p>\n<p style="text-align:center"><img alt="Spring核心——上下文与IoC" height="300"\n                                  src="https://oscimg.oschina.net/oscnet/c5634f6073bb56eae08c276f589ba14dcbb.jpg"\n                                  width="469"></p>\n<p style="text-align:center">（图片来源于他人博客，如有侵权请告知)</p>\n<p><strong>BeanFactory</strong>是IoC容器最基本的功能，他就是前面文章中一直提到的IoC设计模式的具体实现——处理IoC与Bean，Bean与Bean的关系。可以理解BeanFactory自身就是一个IoC容器，然后提供了getter、is、contains接口来获取和判断Bean的状态。对于单例或多例，BeanFactory只提供了BeanFactory::isSingleton和BeanFactory::isPrototype2个方法，这也是为什么我在<a\n        href="https://www.chkui.com/article/spring/spring_core_design_pattern_and_ioc">设计模式与IoC</a>一文中会说从设计模式的角度来说，Bean除了工厂方法外，只涉及<a\n        href="https://docs.spring.io/spring-framework/docs/current/spring-framework-reference/core.html#beans-factory-scopes-singleton"\n        rel="nofollow">singleton</a>和<a\n        href="https://docs.spring.io/spring-framework/docs/current/spring-framework-reference/core.html#beans-factory-scopes-prototype"\n        rel="nofollow">prototype</a>2个创建模式。</p>\n<p><strong>ListableBeanFactory</strong>继承自<strong>BeanFactory</strong>接口。看方法会发现，BeanFactory只提供单个Bean的操作，而ListableBeanFactory都是支持列表操作，比如获取Bean的总数、获取Bean的name列表、通过Bean的Type获取Bean的列表、根据注解获取Bean的列表等。从字面上的Listable也可以看出来其是在基本Factory的基础上扩展了相同类型、相同名称Bean的功能。\n</p>\n<p><strong>HierarchicalBeanFactory</strong>从字面上就应该大概知道他的作用的解决层级问题，提供子父容器的管理方法。</p>\n<p>再往下就是<strong>ConfigurableListableBeanFactory</strong>接口，这个接口提供的IoC控制功能，从子字面<strong>Configurable</strong>来看意思就是可以配置的。顶层的几个接口（<strong>BeanFactory、ListableBeanFactory</strong>）都没提供Setter或Creater的功能，而<strong>ConfigurableListableBeanFactory</strong>集成的3个接口ListableBeanFactory、AutowireCapableBeanFactor、ConfigurableBeanFactory提供了Setter、Creater的功能。实际上<strong>ConfigurableListableBeanFactory</strong>就是提供了Beans的“增改”功能，以及一些附加的依赖控制。\n</p>\n<p>网上关于<em><strong>BeanFactory</strong></em>及其派生结构介绍的资料很多，大部分都是从源码的角度详细说明他们之间的依存关系。不过从使用者的角度，实际上从总体上去了解他的组合模式思路，比你一个一个的去看源码有意义得多，更何况就算你现在看了源码，一年不碰你还能记得？总不能天天还复习吧？看源码主要是要理解作者针对实现所用设计模式。当然你要是要参加什么面试的话，还真得复习复习。记得以前我作为面试官曾叫别人当场写出ConfigurableListableBeanFactory的继承关系。现在想想当时自己有多脑残，被面试的那些小哥估计想拍我吧？开发能力的好坏是一种思维方式，而不是谁记得2个\n    new String("A")到底创建了几个String实例，或者Integer的0到128会被预设。</p>\n<p>实际上进经过多年的发展，Spring Core\n    的BeanFactory这块已经发生了多次改变。从最基础的BeanFactory到ConfigurableListableBeanFactory层层向下推进全是接口或抽象类，每一个接口都在父接口的基础上包装了的新的接口方法。通过多层继承，官方的代码中只有一个名为DefaultListableBeanFactory的类将所有的接口功能都实现了，然后XmlFactory又继承实现了资源读写的功能。XmlFactory并没有多少代码，Ioc的核心功能都在DefaultListableBeanFactory。</p>\n<p>从设计模式上来说，很难去定义这么多接口派生但是一个实现类提供所有功能的模式到底算什么。我个人认为这很像外观模式（Facade&nbsp;Pattern）和装饰模式（Decorator\n    Pattern）结合。现实中我们没也没必要像教科书似的模式来理解应用。下面解释这个思路。</p>\n<p>首先我们来看看效果。</p>\n<p>例如现在你用BeanFactory来“装载”ConfigurableListableBeanFactory的实例：</p>\n<pre><code class="java">BeanFactory ioc = <span\n        class="code-keyword">new</span> ConfigurableListableBeanFactory();</code></pre>\n<p>\n    这个时候对你来说，这个BeanFactory就是一个装饰器或外观，如果BeanFactory接口不发生改变，你所能用的功能仅仅是BeanFactory提供的几个接口方法。即使可能有人在之后的任何时间修改增加了ConfigurableListableBeanFactory的方法。此时尽管ConfigurableListableBeanFactory这个实现类的本质发生了改变，但是对于BeanFactory的使用位置来说一切照旧，他通过&nbsp;BeanFactory这个外观装饰接口看到的效果和之前一模一样。&nbsp;而扩展了接口之后的实现类，新的代码可以用新的接口。例如：</p>\n<pre><code class="java">ConfigurableListableBeanFactory ioc = <span class="code-keyword">new</span> ConfigurableListableBeanFactory();</code></pre>\n<p>然后我们还可以继续向下扩展接口和功能。</p>\n<p>如果你看过源码，你会发现spring\n    beans的BeanFactory代码最早的编写时间停留在2001年4月13号，距今已经很长的历史了。相信之后肯定不断演进扩展了大量的功能。而通过接口派生的实现外观的方式，让古老的代码和后续的新功能友好的共存。对于我们自己的设计系统或实现“代码级别的迭代”这是一个极好的例子——仅维护一个实现，通过增加外观或装饰器来演进功能，使用者一直都是看到的外观。虽然这样做似乎会违背类的单一职责的原则。</p>\n<p>在接下来介绍ApplicationContext之前先要说明，我们现在创建一个Spring应该不使用任何BeanFactory相关的接口了，关于这一点<a\n        href="https://docs.spring.io/spring-framework/docs/current/spring-framework-reference/core.html#context-introduction-ctx-vs-beanfactory"\n        rel="nofollow">官方文档</a>有明确的说明。除了在少数对内存大小有严苛要求的受限制的设备上进行嵌入式开发，其他时候都应该使用ApplicationContext。ApplicationContext实现了BeanFactory的所有功能，并对应用开发提供了很多有用的扩展。BeanFactory现在存在的主要作用是为一些历史第三方库提供支持，现在对于大多数使用Spring的用户来说他是一个历史性的接口。\n</p>\n\n<h2 id="h2-3">ApplicationContext</h2>\n<p>\n    不知道别人在学习编程开发的早年看到Context这个词是什么感觉，反正我是蒙逼了很久。也不知道这词最早是哪位哥翻译的，译成“上下文”?!英文里con-前缀表示聚集、集合吗，context的字面意思明明就是一堆数据的集合吧。其实码界类似让人翻译的翻译还真不少，handle=句柄（deal\n    with，处理器）、socket=套接字（就使用原意插座还好理解）。更狠的是Robustness，真不知道在哪年是哪位大爷出于什么原因把他翻成“鲁棒性”的。</p>\n<p>\n    回到正题，我真正理解Context是在开始了解设计模式之后。在设计模式中Context的概念出现在“策略模式”，该模式的标准解释是执行一个方法会根据当前的状态和对象执行不同的“策略”，“策略”因为实现类的性质不同而发生改变。实际上就是用一个Context对“策略”进行包装，而“策略”可以根据需要调整（细节请度娘）。我直接用Spring的ApplicationContext来说明。</p>\n<p style="text-align: center;"><img alt="Spring核心——上下文与IoC" height="400"\n                                    src="https://oscimg.oschina.net/oscnet/2eb09f38d1ad275a1297fd165e6bd07fb4c.jpg"\n                                    width="464"></p>\n<p style="text-align: center;">(图片来源于网络，如有侵权请告知)</p>\n<p>\n    ApplictionContext的继承思路和BeanFactory类似，就不再介绍了。在核心包中，Spring提供的ApplicationContext实现类目前有FileSystemXmlApplication和ClassPathXmlApplicationContext（Web包里还有Web环境专用的ApplicationContext）。</p>\n<p>\n    FileSystemXmlApplication和ClassPathXmlApplicationContext分别代表了2个不同的“策略”，在我们使用的时候在创建ApplicationContext时确定，并且在运行时也可以调整。</p>\n<pre><code class="java"><span class="hljs-class"><span class="code-keyword">class</span> <span\n        class="code-title">App</span> <span class="code-keyword">implements</span> <span class="code-title">ApplicationContextAware</span></span>{\n\t<span class="hljs-function"><span class="code-keyword">public</span> <span class="code-keyword">static</span> <span\n            class="code-keyword">void</span> <span class="code-title">main</span><span\n            class="hljs-params">()</span> </span>{\n        <span class="code-comment">// 初始化为策略1</span>\n\t\tApplicationContext springContext = <span class="code-keyword">new</span> ClassPathXmlApplicationContext(<span\n            class="code-string">"myXml.xml"</span>);\n        <span class="code-comment">// 使用策略1的方法，使用者不用知道实现细节</span>\n        System.out.println(springContext.getApplicationName());\n\n        <span class="code-comment">// 修改为策略2</span>\n        springContext = <span class="code-keyword">new</span> FileSystemXmlApplicationContext(<span class="code-string">"/myProject/myXml.xml"</span>);\n        <span class="code-comment">// 使用策略2的方法，使用者不用知道实现细节</span>\n        System.out.println(springContext.getApplicationName());\n\t}\n}</code></pre>\n<p>如上面的代码，我们可以根据我们需要指定不同的“策略”。ClassPath和FIleSystem两个类功能都差不多，最大的区别就是加载文件路径的差异——一个从当前工作目录、一个从整个磁盘路径。理论上策略模式还有一个&nbsp;<em>Strategy</em>接口来包装策略，Spring直接将<em>Context</em>设定为一个接口，然后通过不同的实现类整合到了一起。从实现上来看策略模式并没有什么太神奇的东西，实际上还是一个接口多个实现类。那么看到这里你肯定已经忍不住要吼了：这到底有什么用？不就是创建一个实例给一个接口吗？\n</p>\n<p>实际上策略模式和Context是针对分层应用而设计的，很多设计模式的资料只会说模式是什么，但是不会提到模式的来源和立意。我所知道在设计模式中Context的最早概念是来源是来自这篇论文——<a\n        href="https://www.cse.wustl.edu/~schmidt/PDF/Context-Object-Pattern.pdf" rel="nofollow">Context Object A Design\n    Pattern for Efficient Information Sharing across Multiple System Layers</a>（直译为《上下文对象——多层系统的高效信息共享的设计模式》），它大致的结论是在分层应用系统中（例如MVC——view-controller-service-dao）层之间传递（共享）数据时，将相同适用范围和生命周期的所有数据组合到一个Context中去传递可以大大的提升分层之后开发效率——大概就是反正我所有东西都往里面放，你用得着就用，用不着就算，也不用来和我商量要什么了。\n</p>\n<p><span style="color:#e74c3c">所以Context实际上就是按照适用范围（Scope）而不是应用功能（functionality</span><span style="color:#e74c3c">）划分的一个数据对象。</span><span\n        > 这样在层与层之间传递数据的时候，无论有多少个接口都传递同一个的Context。</span></p>\n<p style="text-align: center;"><span><img alt="Spring核心——上下文与IoC" height="500"\n                                                             src="https://oscimg.oschina.net/oscnet/b54ba49ded2c3d92ef130edfc418a4a81ac.jpg"\n                                                             width="331"></span></p>\n<p>\n    例如Spring全局应用就是ApplicatonContext，把IoC和其他全局操作方法的丢到这个Context中。所以最后我们看到除了IoC的Bean控制接口（BeanFactory）外，他还提供资源控制接口（ResourcePatternResolver）、国际化接口（MessageSource）&nbsp;、事件发布管理接口（ApplicationEventPublisher）。这些功能并没有直接的联系，但是他们的适用范围都是Applicaton级别的，所以都被整合到了ApplicatonContext中。</p>\n<p>再例如在WebApplicationContext中，一次请求相关的所有资源以及相关的接口都会整合RequestContext中，RequestContext用于Servlet到我们自定义的Controller层传递数据。</p>\n<p>ApplicationContext继承了BeanFactory，其核心功能还是管理IoC以及Bean。前面也提到ApplicationContext还扩展了许多功能。下图来自于官方，表现了2者的功能差异。</p>\n<table>\n    <tbody>\n    <tr>\n        <th>Feature</th>\n        <th><code>BeanFactory</code></th>\n        <th><code>ApplicationContext</code></th>\n    </tr>\n    </tbody>\n    <tbody>\n    <tr>\n        <td><p>Bean 初始化与设定</p></td>\n        <td><p>Yes</p></td>\n        <td><p>Yes</p></td>\n    </tr>\n    <tr>\n        <td><code>BeanPostProcessor注册</code></td>\n        <td><p>No</p></td>\n        <td><p>Yes</p></td>\n    </tr>\n    <tr>\n        <td><code>BeanFactoryPostProcessor注册</code></td>\n        <td><p>No</p></td>\n        <td><p>Yes</p></td>\n    </tr>\n    <tr>\n        <td><p>国际化支持</p></td>\n        <td><p>No</p></td>\n        <td><p>Yes</p></td>\n    </tr>\n    <tr>\n        <td><p><span style="font-size:13px">事件发布与注册</span></p></td>\n        <td><p>No</p></td>\n        <td><p>Yes</p></td>\n    </tr>\n    </tbody>\n</table>\n<p>后续的文章会继续展开介绍这些功能以及背后设计模式的含义。</p>'}};