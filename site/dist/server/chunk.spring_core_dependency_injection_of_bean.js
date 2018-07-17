exports.ids=[18],exports.modules={328:function(s,a,n){"use strict";Object.defineProperty(a,"__esModule",{value:!0});a.content='<h3 id="h3-1">依赖注入</h3>\n<p>在<a href="https://www.chkui.com/article/spring/spring_core_design_pattern_and_ioc" rel="nofollow">设计模式与IoC</a>这篇文章中，介绍了Spring基础的三大支柱的两项内容——IoC、Bean。本篇将继续围绕着Bean的创建时的注入方式来介绍Spring的核心思想与设计模式。\n</p>\n<p>天底下所有面向对象的语言都不可能只用一个类来解决问题，即使是最简单的应用程序都存在类与类之间的依存关系。如下面这个人人都理解的组合例子：</p>\n<pre><code class="java"><span class="hljs-class"><span class="code-keyword">class</span> <span\n        class="code-title">Foo</span></span>{\n   <span class="code-keyword">private</span> Other other;\n   <span class="hljs-function"><span class="code-keyword">public</span> <span class="code-title">Foo</span><span\n           class="hljs-params">()</span></span>{\n      other = <span class="code-keyword">new</span> Other();\n   }\n}\n\n<span class="hljs-class"><span class="code-keyword">class</span> <span\n        class="code-title">Other</span></span>{}</code></pre>\n<p>在设计模式上关于类的组合与继承的适用性不属于本篇的讨论范围，但是从Spring框架非侵入式的设计思路来看，组合才是使用Spring的正确姿势。</p>\n<p>官方将这种组合的关系叫做“依赖注入（DI——<em>Dependency injection</em>）”。从名字上来看这也是一种依托Ioc容器很自然的实现方式——所有的Bean都放置在容器中，然后通过一些配置来告诉容器bean与bean之间的依存关系。一个类除了在内部块中通过new关键字实现一个组合关系，也可以通过构造方法传参或接口方法设置。\n</p>\n<p>由于IoC容器不可能去修改一个类内部的代码，所以类与类的组合方式通过构造方法（Constructor）和set方法（Setter）来实现。此外，Ioc可以根据接口（interface）来注入对应的实现类（class extands\n    interface）,所以从设计模式的角度来说，依赖注入的方式很好的规避了<strong>标准组合模式</strong>中new关键字违反<strong>依赖倒置原则</strong>的问题。</p>\n\n<h3 id="h3-2">构造方法注入</h3>\n<p>直接通过构造方法注入组合数据。</p>\n<p>class：</p>\n<pre><code class="java"><span class="code-keyword">package</span> x.y;\n\n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n            class="code-title">A</span> </span>{\n    <span class="code-keyword">private</span> B b;\n    <span class="code-keyword">private</span> C c;\n    <span class="hljs-function"><span class="code-keyword">public</span> <span class="code-title">Foo</span><span\n            class="hljs-params">(B b, C c)</span> </span>{\n       <span class="code-keyword">this</span>.b = b;\n       <span class="code-keyword">this</span>.c = c;\n    }\n}\n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n            class="code-title">B</span> </span>{}\n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n            class="code-title">C</span> </span>{}\n</code></pre>\n<p>xml：</p>\n<pre><code class="xml"><span class="code-tag">&lt;<span class="code-name">beans</span>&gt;</span>\n    <span class="code-tag">&lt;<span class="code-name">bean</span> <span class="hljs-attr">id</span>=<span\n            class="code-string">"a"</span> <span class="hljs-attr">class</span>=<span class="code-string">"x.y.A"</span>&gt;</span>\n        <span class="code-tag">&lt;<span class="code-name">constructor-arg</span> <span\n                class="hljs-attr">ref</span>=<span class="code-string">"b"</span>/&gt;</span>\n        <span class="code-tag">&lt;<span class="code-name">constructor-arg</span> <span\n                class="hljs-attr">ref</span>=<span class="code-string">"c"</span>/&gt;</span>\n    <span class="code-tag">&lt;/<span class="code-name">bean</span>&gt;</span>\n\n    <span class="code-tag">&lt;<span class="code-name">bean</span> <span class="hljs-attr">id</span>=<span\n            class="code-string">"b"</span> <span class="hljs-attr">class</span>=<span class="code-string">"x.y.B"</span>/&gt;</span>\n\n    <span class="code-tag">&lt;<span class="code-name">bean</span> <span class="hljs-attr">id</span>=<span\n            class="code-string">"c"</span> <span class="hljs-attr">class</span>=<span class="code-string">"x.y.C"</span>/&gt;</span>\n<span class="code-tag">&lt;/<span class="code-name">beans</span>&gt;</span></code></pre>\n<p>如果是源生类型的参数，可以通过指定类型来注入数据：</p>\n<pre><code class="java"><span class="code-keyword">package</span> x.y;\n\n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n            class="code-title">A</span> </span>{\n    <span class="code-keyword">private</span> <span class="code-keyword">int</span> b;\n    <span class="code-keyword">private</span> String c;\n    <span class="hljs-function"><span class="code-keyword">public</span> <span class="code-title">Foo</span><span\n            class="hljs-params">(<span class="code-keyword">int</span> b, String c)</span> </span>{\n       <span class="code-keyword">this</span>.b = b;\n       <span class="code-keyword">this</span>.c = c;\n    }\n}\n</code></pre>\n<pre><code class="xml"><span class="code-tag">&lt;<span class="code-name">bean</span> <span class="hljs-attr">id</span>=<span\n        class="code-string">"a"</span> <span class="hljs-attr">class</span>=<span class="code-string">"x.y.A"</span>&gt;</span>\n    <span class="code-tag">&lt;<span class="code-name">constructor-arg</span> <span class="hljs-attr">type</span>=<span\n            class="code-string">"int"</span> <span class="hljs-attr">value</span>=<span class="code-string">"1"</span>/&gt;</span>\n    <span class="code-tag">&lt;<span class="code-name">constructor-arg</span> <span class="hljs-attr">type</span>=<span\n            class="code-string">"java.lang.String"</span> <span class="hljs-attr">value</span>=<span\n            class="code-string">"42"</span>/&gt;</span>\n<span class="code-tag">&lt;/<span class="code-name">bean</span>&gt;</span></code></pre>\n<p>也可以通过索引的方式：</p>\n<pre><code class="xml"><span class="code-tag">&lt;<span class="code-name">bean</span> <span class="hljs-attr">id</span>=<span\n        class="code-string">"a"</span> <span class="hljs-attr">class</span>=<span class="code-string">"x.y.A"</span>&gt;</span>\n    <span class="code-tag">&lt;<span class="code-name">constructor-arg</span> <span class="hljs-attr">index</span>=<span\n            class="code-string">"0"</span> <span class="hljs-attr">value</span>=<span class="code-string">"1"</span>/&gt;</span>\n    <span class="code-tag">&lt;<span class="code-name">constructor-arg</span> <span class="hljs-attr">index</span>=<span\n            class="code-string">"1"</span> <span class="hljs-attr">value</span>=<span class="code-string">"42"</span>/&gt;</span>\n<span class="code-tag">&lt;/<span class="code-name">bean</span>&gt;</span></code></pre>\n<p>配合<a href="http://download.oracle.com/javase/6/docs/api/java/beans/ConstructorProperties.html" rel="nofollow">@ConstructorProperties</a>注解，还可以直接使用名称来注入：\n</p>\n<pre><code class="java"><span class="code-keyword">package</span> x.y;\n\n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n            class="code-title">A</span> </span>{\n    <span class="code-keyword">private</span> <span class="code-keyword">int</span> b;\n    <span class="code-keyword">private</span> String c;\n    <span class="code-meta">@ConstructorProperties</span>({<span class="code-string">"b"</span>, <span\n            class="code-string">"c"</span>})\n    <span class="hljs-function"><span class="code-keyword">public</span> <span class="code-title">Foo</span><span\n            class="hljs-params">(<span class="code-keyword">int</span> b, String c)</span> </span>{\n       <span class="code-keyword">this</span>.b = b;\n       <span class="code-keyword">this</span>.c = c;\n    }\n}\n</code></pre>\n<pre><code class="xml"><span class="code-tag">&lt;<span class="code-name">bean</span> <span class="hljs-attr">id</span>=<span\n        class="code-string">"exampleBean"</span> <span class="hljs-attr">class</span>=<span class="code-string">"examples.ExampleBean"</span>&gt;</span>\n    <span class="code-tag">&lt;<span class="code-name">constructor-arg</span> <span class="hljs-attr">name</span>=<span\n            class="code-string">"b"</span> <span class="hljs-attr">value</span>=<span class="code-string">"1"</span>/&gt;</span>\n    <span class="code-tag">&lt;<span class="code-name">constructor-arg</span> <span class="hljs-attr">name</span>=<span\n            class="code-string">"c"</span> <span class="hljs-attr">value</span>=<span class="code-string">"42"</span>/&gt;</span>\n<span class="code-tag">&lt;/<span class="code-name">bean</span>&gt;</span></code></pre>\n<p>在Debug模式下不用这个注解也可以实现按名字注入，但是千万别这样做。</p>\n\n<h3 id="h3-3">Set方法注入</h3>\n<pre><code class="java"><span class="code-keyword">package</span> x.y;\n\n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n            class="code-title">A</span> </span>{\n    <span class="code-keyword">private</span> B b;\n    <span class="code-keyword">private</span> C c;\n    <span class="code-keyword">private</span> String value;\n    <span class="hljs-function"><span class="code-keyword">public</span> <span class="code-keyword">void</span> <span\n            class="code-title">setA</span><span class="hljs-params">(A a)</span></span>{<span\n            class="code-keyword">this</span>.a = a;}\n    <span class="hljs-function"><span class="code-keyword">public</span> <span class="code-keyword">void</span> <span\n            class="code-title">setB</span><span class="hljs-params">(B b)</span></span>{<span\n            class="code-keyword">this</span>.b = b;}\n    <span class="hljs-function"><span class="code-keyword">public</span> <span class="code-keyword">void</span> <span\n            class="code-title">setB</span><span class="hljs-params">(String value)</span></span>{<span\n            class="code-keyword">this</span>.value = value;}\n}\n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n            class="code-title">B</span> </span>{}\n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n            class="code-title">C</span> </span>{}\n</code></pre>\n<pre><code class="xml"><span class="code-tag">&lt;<span class="code-name">bean</span> <span class="hljs-attr">id</span>=<span\n        class="code-string">"a"</span> <span class="hljs-attr">class</span>=<span class="code-string">"x.y.A"</span>&gt;</span>\n    <span class="code-tag">&lt;<span class="code-name">property</span> <span class="hljs-attr">name</span>=<span\n            class="code-string">"b"</span> <span class="hljs-attr">ref</span>=<span class="code-string">"b"</span>/&gt;</span>\n    <span class="code-tag">&lt;<span class="code-name">property</span> <span class="hljs-attr">name</span>=<span\n            class="code-string">"c"</span> <span class="hljs-attr">ref</span>=<span class="code-string">"c"</span>/&gt;</span>\n    <span class="code-tag">&lt;<span class="code-name">property</span> <span class="hljs-attr">name</span>=<span\n            class="code-string">"value"</span> <span class="hljs-attr">value</span>=<span class="code-string">"1"</span>/&gt;</span>\n<span class="code-tag">&lt;/<span class="code-name">bean</span>&gt;</span>\n<span class="code-tag">&lt;<span class="code-name">bean</span> <span class="hljs-attr">id</span>=<span\n        class="code-string">"b"</span> <span class="hljs-attr">class</span>=<span class="code-string">"x.y.B"</span>/&gt;</span>\n<span class="code-tag">&lt;<span class="code-name">bean</span> <span class="hljs-attr">id</span>=<span\n        class="code-string">"c"</span> <span class="hljs-attr">class</span>=<span class="code-string">"x.y.C"</span>/&gt;</span></code></pre>\n\n<h3 id="h3-4">使用&nbsp;Constructor还是Setter？</h3>\n<p>\n    2种注入方法在使用的过程中我们应该如何选取呢？Spring官方给出的答案是如果注入的数据或bean是一个“必要依赖”那么使用构造方法注入，如果属于配置性的非必须数据，使用Set方法注入。但是在实际应用时，会发现绝大部分注入方式都是通过Setter实现的，包括一些很流行的开源工具，例如下面的druid：</p>\n<pre><code class="xml"><span class="code-tag">&lt;<span class="code-name">bean</span> <span class="hljs-attr">id</span>=<span\n        class="code-string">"ds"</span> <span class="hljs-attr">class</span>=<span class="code-string">"com.mchange.v2.c3p0.ComboPooledDataSource"</span>&gt;</span>\n     <span class="code-tag">&lt;<span class="code-name">property</span> <span class="hljs-attr">name</span>=<span\n             class="code-string">"driverClass"</span> <span class="hljs-attr">value</span>=<span class="code-string">"com.mysql.jdbc.Driver"</span>/&gt;</span>\n     <span class="code-tag">&lt;<span class="code-name">property</span> <span class="hljs-attr">name</span>=<span\n             class="code-string">"jdbcUrl"</span> <span class="hljs-attr">value</span>=<span class="code-string">"jdbc:mysql://localhost:3306/c3p0jdbctemplate"</span>/&gt;</span>\n     <span class="code-tag">&lt;<span class="code-name">property</span> <span class="hljs-attr">name</span>=<span\n             class="code-string">"user"</span> <span class="hljs-attr">value</span>=<span\n             class="code-string">"admin"</span>/&gt;</span>\n     <span class="code-tag">&lt;<span class="code-name">property</span> <span class="hljs-attr">name</span>=<span\n             class="code-string">"password"</span> <span class="hljs-attr">value</span>=<span class="code-string">"123456"</span>/&gt;</span>\n<span class="code-tag">&lt;/<span class="code-name">bean</span>&gt;</span></code></pre>\n<p>话说你不提供账户和密码能链接到数据库吗？这算必要依赖还是配置性依赖？所以也不用死守这些规则。下面是一些关键性的建议：</p>\n<ol>\n    <li>数据配置类使用constructor注入的方法来实现，因为这样可以将bean设置为一个不可变对象（<em>immutable objects</em>）。这样结合单例模式能够很好实现享元模式共享数据，结合原型模式可以创建“浅对比”对象（变更则替换）。\n    </li>\n    <li>如果构造函数要传入的参数太多，证明你的类要完成的责任太多，这个时候用Setter当然比较合理，但是建议回头去看看类当中是不是有可以拆分的功能。</li>\n    <li>Setter注入主要用于可选的依赖关系，如果没有设置值，类应该提供默认值。所以Setter方法应该检查传入值的有效性（not null、not blank等）。</li>\n    <li>如果出现了循环依赖，其实可以通过一个bean使用setter注入另外一个bean使用constructor注入来解决，不过最好检查一下代码为什么会循环，这是设计模式上的大忌。</li>\n    <li>最有一个建议最重要。如果用第三方类，别人给什么你只能用什么，没得选。</li>\n</ol>\n\n<h3 id="h3-5">注入参数</h3>\n<p>在XML配置中，用来设定注入方式和注入数据的XML标签很多，详细内容就不一一复述了，常规用法可以到官网&nbsp;<a\n        href="https://docs.spring.io/spring-framework/docs/current/spring-framework-reference/core.html#beans-factory-properties-detailed"\n        rel="nofollow">Dependencies and configuration in detail</a>&nbsp; 一节了解。这里仅仅说明一些要点：</p>\n<ol>\n    <li>父子Bean。Ioc容器提供Bean的父子关系配置。父子关系Bean可以进行数据合并，但是很少看见什么地方有实际应用。</li>\n    <li>&lt;idref&gt;标签和&lt;ref&gt;标签的差异：1)前者只能通过id引入，后者可以通过id或name引入；2)前者可以直接用value属性替换，但是value属性的效率会差很多；3)前者只能适用与当前配置文件或当前容器，后者可以引入任何位置的内容。</li>\n    <li>当需要设置一个null值时，用&lt;null&gt;标签代替value=""。在执行代码时直接传入一个null。</li>\n</ol>\n\n<h3 id="h3-6">自动装配</h3>\n<p>这里所说的自动装配是通过&lt;bean&gt;上的autowire属性实现的功能，与@Autowired注解并不是一回事，但是他的一些参数会影像@Autowired注解的行为。</p>\n<p>\n    在有@Autowired注解的情况下，autowire属性现在用得很少。基本上他实现的结果和@Autowired差不多，就是让Ioc容器根据bean的类型或者bean名称等自动将容器中其他能对应得上的bean注入到对于的构造方法或者set方法中。详情了解&nbsp;<a\n        href="https://docs.spring.io/spring-framework/docs/current/spring-framework-reference/core.html#beans-factory-autowire"\n        rel="nofollow">Autowiring collaborators</a>。</p>\n\n<h3 id="h3-7">方法注入</h3>\n<p>如果每一个Bean都是单例模式，那么我们通过常规的XML配置引用的手段就可以实现所有的依赖组合关系。但是每个bean都有不同的生命周期，常规配置方法很难实现某些应用不同生命周期bean的依赖关系。</p>\n<p>第一种方式是通过继承&nbsp;ApplicationContextAware 类，继承后可以直接使用&nbsp;applicationContext 的 getBean 接口来获取任何一个 bean。</p>\n<pre><code class="java"><span class="code-keyword">package</span> x.y;\n<span class="code-keyword">import</span> org.springframework.beans.BeansException;\n<span class="code-keyword">import</span> org.springframework.context.ApplicationContext;\n<span class="code-keyword">import</span> org.springframework.context.ApplicationContextAware;\n\n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n            class="code-title">BeanManagerFoo</span> <span class="code-keyword">implements</span> <span\n            class="code-title">ApplicationContextAware</span> </span>{\n\n    <span class="code-keyword">private</span> ApplicationContext applicationContext;\n\n    <span class="code-keyword">public</span> &lt;T&gt; <span class="hljs-function">T <span\n            class="code-title">getBean</span><span class="hljs-params">(Class&lt;T&gt; type)</span></span>{\n\t\t<span class="code-keyword">return</span> applicationContext.getBean(type);\n\t}\n\n    <span class="hljs-function"><span class="code-keyword">public</span> Object <span\n            class="code-title">getBean</span><span class="hljs-params">(String id)</span></span>{\n\t\t<span class="code-keyword">return</span> springContext.getBean(id);\n\t}\n\n    <span class="hljs-function"><span class="code-keyword">public</span> <span class="code-keyword">void</span> <span\n            class="code-title">setApplicationContext</span><span class="hljs-params">(\n            ApplicationContext applicationContext)</span> <span\n            class="code-keyword">throws</span> BeansException </span>{\n        <span class="code-keyword">this</span>.applicationContext = applicationContext;\n    }\n}</code></pre>\n<p>第二种方法是使用Lookup Method。</p>\n<p>Lookup Method的实现思路是使用CGLIB生成了动态代理类并放置到Ioc中代替源生的类。看下面的例子。</p>\n<p>首先实现我们的抽象类，抽象的要求至少有一个抽象方法：</p>\n<pre><code class="java"><span class="code-keyword">package</span> x.y;\n\n<span class="code-keyword">public</span> <span class="code-keyword">abstract</span> <span class="hljs-class"><span\n            class="code-keyword">class</span> <span class="code-title">A</span> </span>{\n    <span class="hljs-function"><span class="code-keyword">public</span> String <span\n            class="code-title">getName</span><span class="hljs-params">()</span> </span>{\n        B b = <span class="code-keyword">this</span>.createB();\n        <span class="code-keyword">return</span> b.getName();\n    }\n\n    <span class="hljs-function"><span class="code-keyword">protected</span> <span class="code-keyword">abstract</span> B <span\n            class="code-title">createB</span><span class="hljs-params">()</span></span>;\n}\n\n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n            class="code-title">B</span> </span>{\n    <span class="code-keyword">private</span> String name = <span class="code-string">"B class"</span>;\n    <span class="hljs-function"><span class="code-keyword">public</span> String <span\n            class="code-title">getName</span><span class="hljs-params">()</span></span>{\n        <span class="code-keyword">return</span> <span class="code-keyword">this</span>.name;\n    }\n}</code></pre>\n<p>然后通过&lt;lookup-method&gt;标签来指定获取bean的方式：</p>\n<pre><code class="xml"><span class="code-tag">&lt;<span class="code-name">bean</span> <span class="hljs-attr">id</span>=<span\n        class="code-string">"b"</span> <span class="hljs-attr">class</span>=<span\n        class="code-string">"x.y.B"</span> <span class="hljs-attr">scope</span>=<span\n        class="code-string">"prototype"</span> /&gt;</span>\n\n<span class="code-tag">&lt;<span class="code-name">bean</span> <span class="hljs-attr">id</span>=<span\n        class="code-string">"a"</span> <span class="hljs-attr">class</span>=<span class="code-string">"x.y.A"</span>&gt;</span>\n    <span class="code-tag">&lt;<span class="code-name">lookup-method</span> <span class="hljs-attr">name</span>=<span\n            class="code-string">"createB"</span> <span class="hljs-attr">bean</span>=<span\n            class="code-string">"b"</span>/&gt;</span>\n<span class="code-tag">&lt;/<span class="code-name">bean</span>&gt;</span></code></pre>\n<p>现在，在调用A.getName方法时都会创建一个新的B类实例。需要注意scope属性，如果修改为<a\n        href="https://docs.spring.io/spring-framework/docs/current/spring-framework-reference/core.html#beans-factory-scopes-singleton"\n        rel="nofollow">singleton</a>则每次都获取同一个B实例。</p>\n<p>使用动态代理由于是字节码级别的变换，所有有很多限制需要注意：方法和类都不能用fina关键字；测试用例需要自己实现代理模式，否则抽象类没有实现；</p>\n<p>第三种方法是使用委派模式，即我们执行A.compute方法时，实际执行的是被委派的B.reimplement方法。</p>\n<p>先定义2个基础类——Origin、Replace：</p>\n<pre><code class="java"><span class="code-keyword">package</span> x.y\n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n            class="code-title">Origin</span> </span>{\n    <span class="hljs-function"><span class="code-keyword">public</span> <span class="code-keyword">int</span> <span\n            class="code-title">compute</span><span class="hljs-params">(<span class="code-keyword">int</span> in1, <span\n            class="code-keyword">int</span> in2)</span> </span>{\n        <span class="code-keyword">return</span> in1+in2;\n    }\n}\n\n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n            class="code-title">Replace</span> </span>{\n    <span class="hljs-function"><span class="code-keyword">public</span> <span class="code-keyword">int</span> <span\n            class="code-title">reimplement</span><span\n            class="hljs-params">(Object o, Method m, Object[] args)</span> </span>{\n        <span class="code-keyword">int</span> in1 = (<span class="code-keyword">int</span>)args[<span\n            class="hljs-number">0</span>];\n        <span class="code-keyword">int</span> in2 = (<span class="code-keyword">int</span>)args[<span\n            class="hljs-number">1</span>];\n        <span class="code-keyword">return</span> in1+in2;\n    }\n}</code></pre>\n<p>然后定义Spring配置：</p>\n<pre><code class="xml"><span class="code-tag">&lt;<span class="code-name">bean</span> <span class="hljs-attr">id</span>=<span\n        class="code-string">"origin"</span> <span class="hljs-attr">class</span>=<span\n        class="code-string">"x.y.Origin"</span>&gt;</span>\n    <span class="code-tag">&lt;<span class="code-name">replaced-method</span> <span class="hljs-attr">name</span>=<span\n            class="code-string">"compute"</span> <span class="hljs-attr">replacer</span>=<span class="code-string">"replace"</span>&gt;</span>\n        <span class="code-tag">&lt;<span class="code-name">arg-type</span>&gt;</span>int<span\n            class="code-tag">&lt;/<span class="code-name">arg-type</span>&gt;</span>\n        <span class="code-tag">&lt;<span class="code-name">arg-type</span>&gt;</span>int<span\n            class="code-tag">&lt;/<span class="code-name">arg-type</span>&gt;</span>\n    <span class="code-tag">&lt;/<span class="code-name">replaced-method</span>&gt;</span>\n<span class="code-tag">&lt;/<span class="code-name">bean</span>&gt;</span>\n\n<span class="code-tag">&lt;<span class="code-name">bean</span> <span class="hljs-attr">id</span>=<span\n        class="code-string">"replace"</span> <span class="hljs-attr">class</span>=<span class="code-string">"x.y.Replace"</span>/&gt;</span></code></pre>\n<p>这个时候，在任何时候执行“origin”这个bean的compute方法，实际上都是执行的Replace::reimplement方法。</p>\n<p>上面&lt;arg-type/&gt;的参数用全称或简写都可以，例如java.lang.String，使用String，Str都是指向这个类型。</p>\n<p>\n    使用委派模式的好处是限制少、灵活，并且不会用到CGLIB这种重量级工具。但是委派之后委派方法的真实参数和被委派方法的参数完全不一样，开发时需要时时刻刻紧跟委派类的结构来修改代码。一旦委派类发生任何修改而没有相应的调整被委派类，可能会出现意想不到的问题。</p>'}};