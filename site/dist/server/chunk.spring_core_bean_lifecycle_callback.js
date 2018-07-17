exports.ids=[17],exports.modules={329:function(s,a,n){"use strict";Object.defineProperty(a,"__esModule",{value:!0});a.content='<p>在前面两篇介绍Sring核心与设计模式的文章中，分别介绍了<a title="Ioc容器"\n                                   href="https://www.chkui.com/article/spring/spring_core_design_pattern_and_ioc">Ioc容器</a>和\n    <a title="Bean的依赖关系" href="https://www.chkui.com/article/spring/spring_core_design_pattern_and_ioc">Bean的依赖关系</a>。如果阅读过前2文就会知道，Spring的整个运转机制就是围绕着IoC容器以及Bean展开的。IoC就是一个篮子，所有的Bean都向里面扔。除了提供篮子功能创建并存放Bean之外，IoC还要负责管理Bean与Bean之间的关系——依赖注入。之前也提到Bean是Spring核心容器的最小工作单元，Spring一些更高级的功能（例如切面、代理）都是在Bean的基础上实现。\n</p>\n<p>除了管理Bean与Bean之间的关系，IoC还提供了对Bean自身进行控制的各项功能，本文将介绍Bean的<strong>生命周期功能</strong>以及<strong>状态定义功能。</strong></p>\n\n<h2 id="h2-1">前置依赖</h2>\n<p>\n    Bean与Bean之间存在依赖关系，可以是强依赖（通过XML和注解直接声明依赖）、也可以是弱依赖（ApplicationContextAware等方式获取）。当一个Bean需要另外一个Bean完成初始化后自身才能工作时，例如一个Bean依赖DataSoruce，但是DataSource的初始化需要较长时间。这个时候用<em>depends-on</em>声明前置依赖即可：\n</p>\n<pre><code class="xml"><span class="code-comment">&lt;!-- 依赖多个Bean使用,号分割 --&gt;</span>\n<span class="code-tag">&lt;<span class="code-name">bean</span> <span class="hljs-attr">id</span>=<span\n        class="code-string">"beanOne"</span> <span class="hljs-attr">class</span>=<span class="code-string">"ExampleBean"</span> <span\n        class="hljs-attr">depends-on</span>=<span class="code-string">"manager,accountDao"</span>&gt;</span>\n    <span class="code-tag">&lt;<span class="code-name">property</span> <span class="hljs-attr">name</span>=<span\n            class="code-string">"manager"</span> <span class="hljs-attr">ref</span>=<span\n            class="code-string">"manager"</span> /&gt;</span>\n<span class="code-tag">&lt;/<span class="code-name">bean</span>&gt;</span>\n\n<span class="code-tag">&lt;<span class="code-name">bean</span> <span class="hljs-attr">id</span>=<span\n        class="code-string">"manager"</span> <span class="hljs-attr">class</span>=<span class="code-string">"ManagerBean"</span> /&gt;</span>\n<span class="code-tag">&lt;<span class="code-name">bean</span> <span class="hljs-attr">id</span>=<span\n        class="code-string">"accountDao"</span> <span class="hljs-attr">class</span>=<span class="code-string">"x.y.jdbc.JdbcAccountDao"</span> /&gt;</span></code></pre>\n\n<h2 id="h2-2">延迟加载</h2>\n<p>通常情况下，所有的&nbsp;<a\n        href="https://docs.spring.io/spring-framework/docs/current/spring-framework-reference/core.html#beans-factory-scopes-singleton"\n        rel="nofollow">singleton</a>&nbsp;类型的Bean都会在容器创建后进行初始化，简单的说就是启动Jvm就开始创建（实际上是创建ApplicationContext的某个实现类实例之后）。</p>\n<p>IoC支持所有的&nbsp;<a\n        href="https://docs.spring.io/spring-framework/docs/current/spring-framework-reference/core.html#beans-factory-scopes-singleton"\n        rel="nofollow">singleton</a>&nbsp;Bean在使用时再加载，这样做的好处是可以大大节省初始化的时间。<span style="color:#e74c3c">但是如果你的应用对启动时间的长短并不敏感，建议让所有的&nbsp;</span><a\n        href="https://docs.spring.io/spring-framework/docs/current/spring-framework-reference/core.html#beans-factory-scopes-singleton"\n        rel="nofollow"><span style="color:#e74c3c">singleton</span></a><span style="color:#e74c3c">&nbsp;都启动时加载。这样可以在启动时就发现一些问题，而不是在运行很久直到使用时才由用户去触发这个问题</span>。或者可以根据场景来使用决定是否延迟，例如开发时使用延迟加载，而在集成测试或上生产时关闭。\n</p>\n<p>可以设置全局延迟加载，也可以设置某个Bean延迟加载：</p>\n<pre><code class="xml"><span class="code-tag">&lt;<span class="code-name">beans</span> <span class="hljs-attr">default-lazy-init</span>=<span\n        class="code-string">"true"</span>&gt;</span>\n    <span class="code-comment">&lt;!-- 所有的Bean知道使用的时候才会进行加载... --&gt;</span>\n<span class="code-tag">&lt;/<span class="code-name">beans</span>&gt;</span></code></pre>\n<pre><code class="xml"><span class="code-comment">&lt;!-- 只有lazy类延迟加载 --&gt;</span>\n<span class="code-tag">&lt;<span class="code-name">bean</span> <span class="hljs-attr">id</span>=<span\n        class="code-string">"lazy"</span> <span class="hljs-attr">class</span>=<span class="code-string">"com.foo.ExpensiveToCreateBean"</span> <span\n        class="hljs-attr">lazy-init</span>=<span class="code-string">"true"</span>/&gt;</span>\n<span class="code-tag">&lt;<span class="code-name">bean</span> <span class="hljs-attr">name</span>=<span\n        class="code-string">"not.lazy"</span> <span class="hljs-attr">class</span>=<span class="code-string">"com.foo.AnotherBean"</span>/&gt;</span></code></pre>\n<p>需要注意的是，在设置某个单独的Bean延迟加载时，如果有某个没有延迟加载的Bean要依赖他，那实际上也会在初始化的时候就加载。</p>\n<p>还要强调一下，这里的“加载”仅仅是为了表示一个类被Ioc创造并放置容器中，和classLoad方法将class文件中的字节码加载到方法区的加载是两个概念。</p>\n<p>延迟加载在设计模式上是单例模式一种延伸，通常也被称为懒汉模式。单例通常有双重锁+volatile、静态类和枚举三种方式实现。在<a\n        href="http://www.baidu.com/link?url=kGkdnL7l_ll3LfLYL8dxNgxmZdGW-wKRbUh6i8wRu2CERbWLWDBkpLtu38Jg9qTx0-KOIOBr6FXsjRwJigZmxa"\n        target="_blank" rel="nofollow">Effective&nbsp;<em>Java</em></a>一书中对三种模式都有深入的解析。而对于Spring容器而言，枚举的方式肯定不好用了，静态类由于属于自身代码级别应该也不会用，所以双重锁的实现方式较为可信。不过我没去看过源码，仅属于猜测。\n</p>\n\n<h2 id="h2-3">生命周期方法</h2>\n<p>一个Bean的创建、使用再到最后销毁称为"Bean的生命周期"。Spring框架为Bean的生命周期各个阶段提供了多种回掉方法来处理各种状态或者数据。</p>\n\n<h3 id="h3-1">初始化方法</h3>\n<p>\n    当一个Bean完成初始化并注入各项参数之后，初始化回掉方法会被调用，简单的说就是完成创建之后会被调用。实现初始化回调方法有2个路径：1.继承org.springframework.beans.factory.InitializingBean接口，然后实现\n    afterPropertiesSet方法。2.在Bean的XML配置上使用init-method属性来制定要调用的初始化：</p>\n<p>继承实现：</p>\n<pre><code class="xml"><span class="code-tag">&lt;<span class="code-name">bean</span> <span class="hljs-attr">id</span>=<span\n        class="code-string">"a"</span> <span class="hljs-attr">class</span>=<span class="code-string">"x.y.A"</span> /&gt;</span></code></pre>\n<pre><code class="java"><span class="code-keyword">package</span> x.y;\n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n            class="code-title">A</span> <span class="code-keyword">implements</span> <span class="code-title">InitializingBean</span> </span>{\n    <span class="hljs-function"><span class="code-keyword">public</span> <span class="code-keyword">void</span> <span\n            class="code-title">afterPropertiesSet</span><span class="hljs-params">()</span></span>{\n        <span class="code-comment">// init</span>\n    }\n}</code></pre>\n<p>配置实现：</p>\n<pre><code class="xml"><span class="code-tag">&lt;<span class="code-name">bean</span> <span class="hljs-attr">id</span>=<span\n        class="code-string">"a"</span> <span class="hljs-attr">class</span>=<span\n        class="code-string">"x.y.A"</span> <span class="hljs-attr">init-method</span>=<span\n        class="code-string">"init"</span> /&gt;</span></code></pre>\n<pre><code class="java"><span class="code-keyword">package</span> x.y;\n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n            class="code-title">A</span> </span>{\n    <span class="hljs-function"><span class="code-keyword">public</span> <span class="code-keyword">void</span> <span\n            class="code-title">init</span><span class="hljs-params">()</span></span>{}\n}</code></pre>\n<p>2种方法都等效，实际使用是我们应该使用哪一种方法呢？</p>\n<p>InitializingBean是Spring早期实现的一个生命周期回调方法。但是在JCP推出JSR-250和<a title="JSR-330"\n                                                             href="https://www.chkui.com/article/java/java_jsr330"\n>JSR-330</a>规范之后，Spring的大神们开始意识到基于元编程思想和配置手段来实现非侵入式框架（Not\n    Coupled）才是正道。所以现在都是推荐使用配置文件和JSR-250的@PostConstruct（关于各种Annotation的使用请关注后续的文章）。现在依然保留InitializingBean应该是考虑到兼容问题。</p>\n\n<h3 id="h3-2">销毁方法</h3>\n<p>与创建方法相对应的是销毁方法。当一个类将要被销毁之前，对应的销毁回调方法会被调用。销毁方法也有一个继承实现和配置+注解实现：</p>\n<p>继承实现：</p>\n<pre><code class="xml"><span class="code-tag">&lt;<span class="code-name">bean</span> <span class="hljs-attr">id</span>=<span\n        class="code-string">"a"</span> <span class="hljs-attr">class</span>=<span class="code-string">"x.y.A"</span> /&gt;</span></code></pre>\n<pre><code class="java"><span class="code-keyword">package</span> x.y;\n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n            class="code-title">A</span> <span class="code-keyword">implements</span> <span class="code-title">DisposableBean</span> </span>{\n    <span class="hljs-function"><span class="code-keyword">public</span> <span class="code-keyword">void</span> <span\n            class="code-title">destroy</span><span class="hljs-params">()</span></span>{\n        <span class="code-comment">// 销毁资源</span>\n    }\n}</code></pre>\n<p>配置实现：</p>\n<pre><code class="xml"><span class="code-tag">&lt;<span class="code-name">bean</span> <span class="hljs-attr">id</span>=<span\n        class="code-string">"a"</span> <span class="hljs-attr">class</span>=<span\n        class="code-string">"x.y.A"</span> <span class="hljs-attr">destroy-method</span>=<span class="code-string">"cleanUp"</span> /&gt;</span></code></pre>\n<pre><code class="java"><span class="code-keyword">package</span> x.y;\n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n            class="code-title">A</span> </span>{\n    <span class="hljs-function"><span class="code-keyword">public</span> <span class="code-keyword">void</span> <span\n            class="code-title">cleanUp</span><span class="hljs-params">()</span></span>{\n        <span class="code-comment">// 销毁资源</span>\n    }\n}</code></pre>\n<p>依然建议销毁手段也使用配置或@PreDestroy来设定销毁方法。</p>\n\n<h3 id="h3-3">全局配置初始化与销毁方法</h3>\n<p>IoC容器还提供了全局配置初始化与销毁方法的配置：</p>\n<pre><code class="java"><span class="code-keyword">package</span> x.y;\n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n            class="code-title">A</span> </span>{\n    <span class="hljs-function"><span class="code-keyword">public</span> <span class="code-keyword">void</span> <span\n            class="code-title">init</span><span class="hljs-params">()</span></span>{\n        <span class="code-comment">// 初始化资源</span>\n    }\n    <span class="hljs-function"><span class="code-keyword">public</span> <span class="code-keyword">void</span> <span\n            class="code-title">destroy</span><span class="hljs-params">()</span></span>{\n        <span class="code-comment">// 销毁资源</span>\n    }\n}</code></pre>\n<pre><code class="xml"><span class="code-tag">&lt;<span class="code-name">beans</span> <span class="hljs-attr">default-init-method</span>=<span\n        class="code-string">"init"</span> <span class="hljs-attr">default-destroy-method</span>=<span\n        class="code-string">"destroy"</span>&gt;</span>\n     <span class="code-tag">&lt;<span class="code-name">bean</span> <span class="hljs-attr">id</span>=<span\n             class="code-string">"a"</span> <span class="hljs-attr">class</span>=<span\n             class="code-string">"x.y.A"</span>/&gt;</span>\n     <span class="code-comment">&lt;!-- bean configuration --&gt;</span>\n<span class="code-tag">&lt;/<span class="code-name">beans</span>&gt;</span></code></pre>\n<p>通过在&lt;beans&gt;标签上使用<em>default-init-method</em>和<em>default-destroy-method</em>&nbsp;属性参数，可以为容器中所有的Bean统一指定初始化和销毁的生命周期方法。\n</p>\n<p>如果在&lt;beans&gt;上设定2个默认的生命周期方法，同时在&lt;bean&gt;上也指定了<em>init-method</em>或<em>destroy-method，</em>回调方法会以&lt;bean&gt;上的配置为准。这样就保证全局配置与单独配置可以共存。\n</p>\n<p>使用初始化或销毁2个生命周期方法注意的要点：</p>\n<ol>\n    <li>\n        初始化和销毁都提供了3种手段：XML配置、注解、以及实现接口。系统的各个部分会交由不同的团队开发，不遵循统一的规范，建议使用满足JSR规范的注解——@PostConstruct、@PreDestroy。如果是统一的团队，准训一致的规范，建议使用&lt;beans&gt;的属性统一名称使用全局配置。\n    </li>\n    <li>如果Bean设计到代理模式时（例如使用了AOP），那么生命周期方法被调用时，有可能代理类还没有被创建出来。因为生命周期方法是实体类完成对应工作之后就会被调用，而与代理类无关。</li>\n</ol>'}};