exports.ids=[19],exports.modules={341:function(s,a,n){"use strict";Object.defineProperty(a,"__esModule",{value:!0});a.content='<p>“Spring”——每一个Javaer开发者都绕不开的字眼，从21世纪第一个十年国内异常活跃的SSH框架，到现在以Spring\n    Boot作为入口粘合了各种应用。Spring现在已经完成了从web入口到微服务架构再到数据处理整个生态，看着现在<a href="https://spring.io/projects" rel="nofollow">https://spring.io/projects</a>上长长的项目清单，一脸懵逼的自问到这些到底是啥？可以干嘛？\n</p>\n\n<h2 id="h2-1">一切都从IoC开始</h2>\n<p>\n    早期的Spring并没有这么多亮瞎眼的项目，仅仅是围绕着core、context、beans以及MVC提供了一个简单好用搭建网站级应用的工具。那个时候完全是一个与J2EE的繁杂多样对抗简单便捷的小清新。Srping之父Rod的一本《J2EE\n    Development without\n    EJB》宣告J2EE那么名堂完全没多大用处。经过这么多年的发展，事实也证明除了Servlet、JDBC以及JSP似乎其他东西可有可无。后来Vertx、WebFlux等Reactive机制框架的出现，以及前后端分离开发的盛行，似乎Servlet也可有可无了、jsp也快消失了。所以现在Oracle干脆把J2EE这个烫手山芋直接丢给开源社区了。</p>\n<p>Rod的轮子理论造就了Spring的2大核心概念——IoC（Inversion of Control）和beans。Spring\n    IoC和Beans的概念度娘、谷哥一搜一大把，在此就不重复介绍了。个人认为IoC和Beans最基本的实现思想来自于设计模式的几大原则，它之所以这么好用并且深入人心就是体现了设计模式的精髓。</p>\n<p><strong>依赖倒转原则：</strong>Spring的介绍Framework文档的开篇就提到反向依赖注入（DI——<em>dependency injection</em>&nbsp;），其目标是让调用者不要主动去使用被调用者，而是让被调用者向调用者提供服务。IoC和beans的配合完美实现了这个过程，一个@component注解添加一个bean到Ioc容器，一个@autowired注解Ioc容器会找到对应的类注入进来。\n</p>\n<p><strong>接口隔离原则：</strong>Ioc不仅仅根据class类型注入bean，他还会根据接口类型自动装配注入一个bean。</p>\n<p><strong>里氏代换原则：</strong>在接口隔离的原则的基础上我们可以利用XML配置文件来制定装配的服务。例如javax.sql.DataSource是Java里提供数据库链接服务的接口，世面上有各种各样开源或闭源的工具实现了DataSource接口，例如c3p0和druid。我们想要切换他们仅仅需要像下面这样添加或删除一个bean（当然先要引入Jar包）:\n</p>\n<pre><code class="xml"><span class="code-comment">&lt;!-- c3p0 --&gt;</span>\n<span class="code-tag">&lt;<span class="code-name">bean</span> <span class="hljs-attr">id</span>=<span\n        class="code-string">"ds"</span> <span class="hljs-attr">class</span>=<span class="code-string">"com.mchange.v2.c3p0.ComboPooledDataSource"</span>&gt;</span>\n     <span class="code-tag">&lt;<span class="code-name">property</span> <span class="hljs-attr">name</span>=<span\n             class="code-string">"driverClass"</span> <span class="hljs-attr">value</span>=<span class="code-string">"com.mysql.jdbc.Driver"</span>/&gt;</span>\n     <span class="code-tag">&lt;<span class="code-name">property</span> <span class="hljs-attr">name</span>=<span\n             class="code-string">"jdbcUrl"</span> <span class="hljs-attr">value</span>=<span class="code-string">"jdbc:mysql://localhost:3306/c3p0jdbctemplate"</span>/&gt;</span>\n     <span class="code-tag">&lt;<span class="code-name">property</span> <span class="hljs-attr">name</span>=<span\n             class="code-string">"user"</span> <span class="hljs-attr">value</span>=<span\n             class="code-string">"admin"</span>/&gt;</span>\n     <span class="code-tag">&lt;<span class="code-name">property</span> <span class="hljs-attr">name</span>=<span\n             class="code-string">"password"</span> <span class="hljs-attr">value</span>=<span class="code-string">"123456"</span>/&gt;</span>\n<span class="code-tag">&lt;/<span class="code-name">bean</span>&gt;</span>\n<span class="code-comment">&lt;!-- druid --&gt;</span>\n<span class="code-tag">&lt;<span class="code-name">bean</span> <span class="hljs-attr">id</span>=<span\n        class="code-string">"dataSource"</span> <span class="hljs-attr">class</span>=<span class="code-string">"com.alibaba.druid.pool.DruidDataSource"</span>&gt;</span>\n     <span class="code-tag">&lt;<span class="code-name">property</span> <span class="hljs-attr">name</span>=<span\n             class="code-string">"url"</span> <span class="hljs-attr">value</span>=<span class="code-string">"jdbc:mysql://localhost:3306/c3p0jdbctemplate"</span> /&gt;</span>\n\t <span class="code-tag">&lt;<span class="code-name">property</span> <span class="hljs-attr">name</span>=<span\n             class="code-string">"username"</span> <span class="hljs-attr">value</span>=<span class="code-string">"admin"</span>/&gt;</span>\n\t <span class="code-tag">&lt;<span class="code-name">property</span> <span class="hljs-attr">name</span>=<span\n             class="code-string">"password"</span> <span class="hljs-attr">value</span>=<span class="code-string">"123456"</span>/&gt;</span>\n<span class="code-tag">&lt;/<span class="code-name">bean</span>&gt;</span>\n</code></pre>\n<p><strong>聚合复用原则：</strong>SpringFramework号称非侵入式框架，我们在使用的过程中也很少有继承的情况，基本上所有的特性都是通过注解（Annotation）来实现，需要某一项服务也是将其注入后使用。虽然我们在开发的过程中为了实现一些高级功能会继承重写某些方法后，然后再将我们的新类添加到Ioc中，但是Spring本身并不太鼓励这样去实现。\n</p>\n<p>除了前面4项原则，<strong>迪米特法则</strong>和<strong>开闭原则</strong>并没有太直观的体现。对于迪米特法则来说Ioc机制本身就实现了调用者与被调用者之间不会直接发生依赖关系（new创建）。而开闭原则，Spring框架本身那么多构建类都是按照这个原则开发的——新功能用新的类实现，而非增加原有方法。\n</p>\n\n<h2 id="h2-2">Beans</h2>\n\n<h3 id="h3-1">配置</h3>\n<p>\n    现在我们知道Spring的2大核心是IoC和Beans。IoC字面翻译叫“控制反转”，这个“反转”过程实现的思想其实蛮简单的：就是先有一个容器（container），我们把实现各种功能的bean（一个类的实例）一股脑向容器里面扔，至于最后这些bean被谁用了通过配置和注解来确定。</p>\n<p>\n    上面提到了配置，在2.5版本之前配置只能通过XML文件实现，之后引入了annotation配置的方式，然后3.x版本之后可以完全使用Java代码来实现配置而无需XML文件。配置文件的格式和作用其实也不复杂，就是告诉容器我要扔进去什么bean。扔进去的bean当然需要初始化一些数据了，丢一个光秃秃没有任何数据的实例到容器中貌似也没多大用处，所以XML文件中就提供了一些标签来标记如何初始化数据：</p>\n<pre><code class="xml"><span class="php"><span class="code-meta">&lt;?</span>xml version=<span\n        class="code-string">"1.0"</span> encoding=<span class="code-string">"UTF-8"</span><span\n        class="code-meta">?&gt;</span></span>\n<span class="code-comment">&lt;!-- 省略xmlns --&gt;</span>\n<span class="code-tag">&lt;<span class="code-name">beans</span>&gt;</span>\n    <span class="code-tag">&lt;<span class="code-name">bean</span> <span class="hljs-attr">id</span>=<span\n            class="code-string">"otherBean"</span> <span class="hljs-attr">class</span>=<span class="code-string">"myProject.OtherBean"</span> /&gt;</span>\n    <span class="code-tag">&lt;<span class="code-name">bean</span> <span class="hljs-attr">id</span>=<span\n            class="code-string">"myBean"</span> <span class="hljs-attr">class</span>=<span class="code-string">"myProject.MyClass"</span>&gt;</span>\n        <span class="code-comment">&lt;!-- 通过setOtherBean方法设置OtherBean的实例 --&gt;</span>\n        <span class="code-tag">&lt;<span class="code-name">property</span> <span class="hljs-attr">name</span>=<span\n                class="code-string">"otherBean"</span> <span class="hljs-attr">ref</span>=<span class="code-string">"otherBean"</span>/&gt;</span>\n        <span class="code-comment">&lt;!-- 通过setValue方法设置数值 --&gt;</span>\n        <span class="code-tag">&lt;<span class="code-name">property</span> <span class="hljs-attr">name</span>=<span\n                class="code-string">"value"</span> <span class="hljs-attr">value</span>=<span class="code-string">"myValue"</span>/&gt;</span>\n    <span class="code-tag">&lt;/<span class="code-name">bean</span>&gt;</span>\n<span class="code-tag">&lt;/<span class="code-name">beans</span>&gt;</span></code></pre>\n\n<h3 id="h3-2">参数</h3>\n<p>下面是Bean相关的参数，它们可以用<a\n        href="https://docs.spring.io/spring-framework/docs/current/spring-framework-reference/core.html#beans-definition"\n        rel="nofollow">XML&lt;bean&gt;标签</a>来配置，也可以用<a\n        href="https://docs.spring.io/spring-framework/docs/current/spring-framework-reference/core.html#beans-java-bean-annotation"\n        rel="nofollow">@bean</a>传递一个参数来设定：</p>\n<table border="1" cellpadding="1" cellspacing="1" style="width:500px">\n    <tbody>\n    <tr>\n        <td>class</td>\n        <td>标记当前Bean加载的类</td>\n    </tr>\n    <tr>\n        <td>name</td>\n        <td>\n            <a href="https://docs.spring.io/spring-framework/docs/current/spring-framework-reference/core.html#beans-beanname"\n               rel="nofollow">Bean的别名和名称。</a></td>\n    </tr>\n    <tr>\n        <td>\n            <a href="https://docs.spring.io/spring-framework/docs/current/spring-framework-reference/core.html#beans-factory-scopes"\n               rel="nofollow">scope</a></td>\n        <td>Bean的范围，默认是单例。</td>\n    </tr>\n    <tr>\n        <td>\n            <a href="https://docs.spring.io/spring-framework/docs/current/spring-framework-reference/core.html#beans-factory-collaborators"\n               rel="nofollow">constructor</a></td>\n        <td>构造函数注入&lt;constructor-arg /&gt;</td>\n    </tr>\n    <tr>\n        <td>\n            <a href="https://docs.spring.io/spring-framework/docs/current/spring-framework-reference/core.html#beans-factory-collaborators"\n               rel="nofollow">properties</a></td>\n        <td>属性注入&lt;property&gt;</td>\n    </tr>\n    <tr>\n        <td>autowiring</td>\n        <td>\n            <a href="https://docs.spring.io/spring-framework/docs/current/spring-framework-reference/core.html#beans-factory-autowire"\n               rel="nofollow">auto注入模式</a></td>\n    </tr>\n    <tr>\n        <td>lazy</td>\n        <td>\n            <a href="https://docs.spring.io/spring-framework/docs/current/spring-framework-reference/core.html#beans-factory-lazy-init"\n               rel="nofollow">懒加载模式</a></td>\n    </tr>\n    <tr>\n        <td>initialization</td>\n        <td>\n            <a href="https://docs.spring.io/spring-framework/docs/current/spring-framework-reference/core.html#beans-factory-lifecycle-initializingbean"\n               rel="nofollow">制定初始化类时执行的方法</a></td>\n    </tr>\n    <tr>\n        <td>destruction</td>\n        <td>\n            <a href="https://docs.spring.io/spring-framework/docs/current/spring-framework-reference/core.html#beans-factory-lifecycle-disposablebean"\n               rel="nofollow">制定类销毁时要执行的方法</a></td>\n    </tr>\n    </tbody>\n</table>\n<p>Spring Framework的官网用了一个小节专门介绍bean的命名方式，既可以用id来标识，又可以用name来标识，第一次看还挺晕乎的。</p>\n<pre><code class="xml"><span class="code-tag">&lt;<span class="code-name">bean</span> <span class="hljs-attr">id</span>=<span\n        class="code-string">"myBeanId"</span> <span class="hljs-attr">name</span>=<span class="code-string">“myAlias1,myAlias2”</span> /&gt;</span></code></pre>\n<p>其实注意一下四点即可：</p>\n<ol>\n    <li>id和name均可以标识一个bean，但是id必须是全局一对一的，而一个bean可以用多个name，用,号分割。</li>\n    <li>如果不给bean制定id，那么容器会为他自动生成一个唯一的序列号。</li>\n    <li>name可以配合&lt;alias&gt;标签使用来转换别名。</li>\n</ol>\n<p>个人感觉使用spring到现在name出现场景并不多，也很少看到哪个开源项目通过name的方式向外暴露服务。</p>\n\n<h3 id="h3-3">创建模式与Scope</h3>\n<p>\n    Bean只是一个和IoC容器相对应的概念：IoC容器存放并管理bean，bean是IoC机制的最小工作单元。往后的AOP等功能都是建立在Bean的基础上拓展开来的——要使用Spring这些功能首先得是一个Ioc容器中的Bean。Bean实际上就是一个Java类的实例，只不过实例化工作交给了Ioc容器而已。</p>\n<p>Bean的实例化有3种方式——构造方法创建、静态工厂、动态工厂。每一个Bean对应的<a\n        href="https://docs.spring.io/spring-framework/docs/current/spring-framework-reference/core.html#beans-factory-scopes"\n        rel="nofollow">Scope</a>实际上就2个参数——<a\n        href="https://docs.spring.io/spring-framework/docs/current/spring-framework-reference/core.html#beans-factory-scopes-singleton"\n        rel="nofollow">singleton</a>与<a\n        href="https://docs.spring.io/spring-framework/docs/current/spring-framework-reference/core.html#beans-factory-scopes-prototype"\n        rel="nofollow">prototype</a>（实际上还有其他参数可以使用，这里说只有2个具体原因见后面Scope的说明）。</p>\n\n<h4 id="h4-1">单例构造创建</h4>\n<p>90%的Bean都是直接通过这种方法方法来创建的。这也是我们最常见的配置方式：</p>\n<pre><code class="xml"><span class="code-tag">&lt;<span class="code-name">bean</span> <span class="hljs-attr">id</span>=<span\n        class="code-string">"myBean"</span> <span class="hljs-attr">class</span>=<span class="code-string">"myProject.MyClass"</span> /&gt;</span></code></pre>\n<p>当以上面这样的方式配置一个bean时，Ioc容器会直接调用构造方法来创建一个类实例（当然在定义类时必须提供一个公开的构造方法）。由于默认情况下bean的scope参数是<a\n        href="https://docs.spring.io/spring-framework/docs/current/spring-framework-reference/core.html#beans-factory-scopes-singleton"\n        rel="nofollow">singleton</a>，所以创建出来bean在不指定scope的状态下都是一个单例。</p>\n<p>某些时候我们会在类当中再用static 来设定一个嵌入类：</p>\n<pre><code class="java"><span class="code-keyword">package</span> myProject;\n<span class="hljs-class"><span class="code-keyword">class</span> <span class="code-title">MyClass</span> </span>{\n\t<span class="code-keyword">static</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n            class="code-title">MyNestClass</span></span>{\n\t\t<span class="hljs-function"><span class="code-keyword">public</span> <span class="code-title">MyNestClass</span><span\n                class="hljs-params">()</span></span>{}\n\t}\n}</code></pre>\n<p>可以通过“$”符号关联的方式创建这个Bean：</p>\n<pre><code class="xml"><span class="code-tag">&lt;<span class="code-name">bean</span> <span class="hljs-attr">id</span>=<span\n        class="code-string">"myBean"</span> <span class="hljs-attr">class</span>=<span class="code-string">"myProject.MyClass$MyNestClass"</span> /&gt;</span></code></pre>\n\n<h4 id="h4-2">静态工厂创建</h4>\n<p>静态工厂创建bean和静态工厂模式的概念一样，就是指定一个工厂类，然后通过一个静态方法返回一个新的bean。</p>\n<p>XML配置：</p>\n<pre><code class="xml"><span class="code-tag">&lt;<span class="code-name">bean</span> <span class="hljs-attr">id</span>=<span\n        class="code-string">"myFactory"</span>\n    <span class="hljs-attr">class</span>=<span class="code-string">"myProject.MyFactory"</span>\n    <span class="hljs-attr">factory-method</span>=<span\n            class="code-string">"createInstance"</span>/&gt;</span></code></pre>\n<p>工厂类：</p>\n<pre><code class="java"><span class="hljs-class"><span class="code-keyword">class</span> <span class="code-title">MyFactory</span> </span>{\n    <span class="code-keyword">static</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n            class="code-title">MyClass</span></span>{};\n    <span class="code-keyword">private</span> <span class="code-keyword">static</span> MyClass myClass = <span\n            class="code-keyword">new</span> MyClass();\n    <span class="hljs-function"><span class="code-keyword">private</span> <span class="code-title">MyFactory</span><span\n            class="hljs-params">()</span> </span>{}\n\n    <span class="hljs-function"><span class="code-keyword">public</span> <span class="code-keyword">static</span> MyClass <span\n            class="code-title">createInstance</span><span class="hljs-params">()</span> </span>{\n        <span class="code-keyword">return</span> myClass;\n    }\n}</code></pre>\n\n<h4 id="h4-3">动态工厂创建</h4>\n<p>动态工厂在设计模式上叫“抽象工厂”，spring官网将其自称为实例工厂（instance\n    factory）。这里叫“动态工厂”是想对他们加以区分。虽然“实例工厂”并不是教科书似的抽象工厂，但是目的就是实现工厂动态创建。动态工厂与静态工厂最大的区别就是会先将工厂本身设置成一个bean（实例化），然后再通过这个工厂bean来创建“产品bean”。看下面的例子：</p>\n<pre><code class="xml"><span class="code-tag">&lt;<span class="code-name">bean</span> <span class="hljs-attr">id</span>=<span\n        class="code-string">"myLocator"</span> <span class="hljs-attr">class</span>=<span class="code-string">"myProject.MyLocator"</span>&gt;</span>\n    <span class="code-comment">&lt;!-- 自身就是一个实例化的bean，可以设定任何bean的配置 --&gt;</span>\n<span class="code-tag">&lt;/<span class="code-name">bean</span>&gt;</span>\n\n<span class="code-comment">&lt;!-- 绑定bean与一个动态工厂 --&gt;</span>\n<span class="code-tag">&lt;<span class="code-name">bean</span> <span class="hljs-attr">id</span>=<span\n        class="code-string">"instanceFactory"</span>\n    <span class="hljs-attr">factory-bean</span>=<span class="code-string">"myLocator"</span>\n    <span class="hljs-attr">factory-method</span>=<span\n            class="code-string">"createInstance"</span>/&gt;</span></code></pre>\n<pre><code class="java"><span class="hljs-class"><span class="code-keyword">class</span> <span class="code-title">MyFactory</span> </span>{\n    <span class="code-keyword">static</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n            class="code-title">MyClass</span></span>{};\n    <span class="hljs-function"><span class="code-keyword">public</span> MyClass <span\n            class="code-title">createInstance</span><span class="hljs-params">()</span> </span>{\n        <span class="code-keyword">return</span> <span class="code-keyword">new</span> MyClass();\n    }\n}</code></pre>\n<p>一个工厂可以同时用于创建多个bean方法：</p>\n<pre><code class="xml"><span class="code-tag">&lt;<span class="code-name">bean</span> <span class="hljs-attr">id</span>=<span\n        class="code-string">"myLocator"</span> <span class="hljs-attr">class</span>=<span class="code-string">"myProject.MyFactory"</span> /&gt;</span>\n\n<span class="code-tag">&lt;<span class="code-name">bean</span> <span class="hljs-attr">id</span>=<span\n        class="code-string">"serverOne"</span>\n    <span class="hljs-attr">factory-bean</span>=<span class="code-string">"myLocator"</span>\n    <span class="hljs-attr">factory-method</span>=<span class="code-string">"createClassOne"</span>/&gt;</span>\n\n<span class="code-tag">&lt;<span class="code-name">bean</span> <span class="hljs-attr">id</span>=<span\n        class="code-string">"serverTwo"</span>\n    <span class="hljs-attr">factory-bean</span>=<span class="code-string">"myLocator"</span>\n    <span class="hljs-attr">factory-method</span>=<span\n            class="code-string">"createClassTwo"</span>/&gt;</span></code></pre>\n<pre><code class="java"><span class="hljs-class"><span class="code-keyword">class</span> <span class="code-title">MyFactory</span> </span>{\n    <span class="code-keyword">static</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n            class="code-title">MyServerOne</span></span>{};\n    <span class="code-keyword">static</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n            class="code-title">MyServerTwo</span></span>{};\n    \n    <span class="hljs-function"><span class="code-keyword">public</span> MyServerOne <span class="code-title">createClassOne</span><span\n            class="hljs-params">()</span> </span>{\n        <span class="code-keyword">return</span> <span class="code-keyword">new</span> MyServerOne();\n    }\n    <span class="hljs-function"><span class="code-keyword">public</span> MyServerTwo <span class="code-title">createClassTwo</span><span\n            class="hljs-params">()</span> </span>{\n        <span class="code-keyword">return</span> <span class="code-keyword">new</span> MyServerTwo();\n    }\n}</code></pre>\n\n<h4 id="h4-4">为什么需要实例化方法</h4>\n<p>可能你会想，Spring实例化提供一个简单的bean创建实例就好了，干嘛还要整静态工厂、抽象工厂之类的东西？</p>\n<p>\n    实际上我个人认为Spring的架构大神们是想通过一套简单的机制帮你实现设计模式中的所有创建模式——静态工厂、抽象工厂、单例模式、建造者模式和原型模式。因为IoC的最大任务之一就是代替我们创建各种Bean（类实例），而类实例的创建无非就是这几种创建模式。</p>\n<p>这里仅仅介绍了2种工厂模式，下面将结合Bean的Scope属性介绍其他模式的思路。</p>\n\n<h4 id="h4-5">Scope</h4>\n<p>scope直译过来叫范围、界限、广度。不过按照字面意思理解Bean的Scopd属性肯定要跑偏的。Scope数据涉及2个层面的含义。</p>\n<p>首先在实现层面，对于设计模式来说，Scope就只有2种模式——<a\n        href="https://docs.spring.io/spring-framework/docs/current/spring-framework-reference/core.html#beans-factory-scopes-singleton"\n        rel="nofollow">singleton</a>模式和<a\n        href="https://docs.spring.io/spring-framework/docs/current/spring-framework-reference/core.html#beans-factory-scopes-prototype"\n        rel="nofollow">prototype</a>模式。</p>\n<p>其次在应用层面，除了上面2个，Scope还提供了<a\n        href="https://docs.spring.io/spring-framework/docs/current/spring-framework-reference/core.html#beans-factory-scopes-request"\n        rel="nofollow">request</a>、<a\n        href="https://docs.spring.io/spring-framework/docs/current/spring-framework-reference/core.html#beans-factory-scopes-session"\n        rel="nofollow">session</a>、<a\n        href="https://docs.spring.io/spring-framework/docs/current/spring-framework-reference/core.html#beans-factory-scopes-application"\n        rel="nofollow">application</a>、<a\n        href="https://docs.spring.io/spring-framework/docs/current/spring-framework-reference/web.html#websocket-stomp-websocket-scope"\n        rel="nofollow">websocket</a>。从字面上看就知道实际上这些Scope参数仅仅是指定了一个bean的适用范围。</p>\n<p>\n    以<a href="https://docs.spring.io/spring-framework/docs/current/spring-framework-reference/core.html#beans-factory-scopes-request"\n        rel="nofollow">request</a>为例，要启用他需要保证应用的“上下文”是web模式，例如XmlWebApplicationContext，其他情况下会抛出异常。然后"scope=request"的工作方式就是外部发起一个请求后，web层（servlet）启用一个线程来响应这个请求。到了业务层面我们需要指定一些bean来处理这个请求，当这些bean设定为request时，那么它仅仅用于这一次请求就抛弃。下一次请求出现时会创建一个新的实例。\n</p>\n<p>所以不管是<a\n        href="https://docs.spring.io/spring-framework/docs/current/spring-framework-reference/core.html#beans-factory-scopes-request"\n        rel="nofollow">request</a>、<a\n        href="https://docs.spring.io/spring-framework/docs/current/spring-framework-reference/core.html#beans-factory-scopes-session"\n        rel="nofollow">session</a>、<a\n        href="https://docs.spring.io/spring-framework/docs/current/spring-framework-reference/core.html#beans-factory-scopes-application"\n        rel="nofollow">application</a>还是<a\n        href="https://docs.spring.io/spring-framework/docs/current/spring-framework-reference/web.html#websocket-stomp-websocket-scope"\n        rel="nofollow">websocket</a>，实际上都是通过<a\n        href="https://docs.spring.io/spring-framework/docs/current/spring-framework-reference/core.html#beans-factory-scopes-prototype"\n        rel="nofollow">prototype</a>模式创建的实例，也就是设计模式中的原型模式，虽然并不一定是教科书般的标准，但是在整个容器中他实现了原型的特性。</p>\n<p>\n    此外<a\n        href="https://docs.spring.io/spring-framework/docs/current/spring-framework-reference/core.html#beans-factory-scopes-singleton"\n        rel="nofollow">singleton</a>模式和&nbsp;Gang of Four\n    (GoF)中定义的通过ClassLoad实现的单例模式也有很大的区别，但是对于Ioc容器而言，任何bean在一个容器中绝对是一个单例，现在所有的资源都通过容器来管理依赖关系，那么最终的效果也是一个单例。</p>\n\n<h4 id="h4-6">建造者模式</h4>\n<p>到目前为止，还有一个创建模式未出场——建造者模式。建造者模式实际上就是通过一个标准的方法组装一个复杂的对象。</p>\n<p>\n    标准的建造者模式先得有一个Director提供外部访问接口，外部调用者要创建一个复杂对象时向接口传递指定参数，然后Director根据参数调用Builder提供的各种方法，这些方法再用concrete去构建最终的Product。</p>\n<p>实际上把复杂对象创建的过程看成各个bean依赖构造的过程即可实现模式，例如：</p>\n<pre><code class="xml"><span class="code-comment">&lt;!-- cpu部件 --&gt;</span>\n<span class="code-tag">&lt;<span class="code-name">bean</span> <span class="hljs-attr">id</span>=<span\n        class="code-string">"amdCpu"</span> <span class="hljs-attr">class</span>=<span class="code-string">"myProject.cpu.Amd"</span>/&gt;</span>\n<span class="code-tag">&lt;<span class="code-name">bean</span> <span class="hljs-attr">id</span>=<span\n        class="code-string">"intelCpu"</span> <span class="hljs-attr">class</span>=<span class="code-string">"myProject.cpu.Intel"</span>/&gt;</span>\n<span class="code-comment">&lt;!-- 显卡部件 --&gt;</span>\n<span class="code-tag">&lt;<span class="code-name">bean</span> <span class="hljs-attr">id</span>=<span\n        class="code-string">"amdGraphics"</span> <span class="hljs-attr">class</span>=<span class="code-string">"myProject.graphics.Amd"</span>/&gt;</span>\n<span class="code-tag">&lt;<span class="code-name">bean</span> <span class="hljs-attr">id</span>=<span\n        class="code-string">"nvdiaGraphics"</span> <span class="hljs-attr">class</span>=<span class="code-string">"myProject.graphics.Nvdia"</span>/&gt;</span>\n\n<span class="code-comment">&lt;!-- 组装电脑1 --&gt;</span>\n<span class="code-tag">&lt;<span class="code-name">bean</span> <span class="hljs-attr">id</span>=<span\n        class="code-string">"myComputer"</span> <span class="hljs-attr">class</span>=<span class="code-string">"myProject.computer.MyComputer"</span>&gt;</span>\n     <span class="code-tag">&lt;<span class="code-name">property</span> <span class="hljs-attr">name</span>=<span\n             class="code-string">"cpu"</span> <span class="hljs-attr">ref</span>=<span\n             class="code-string">"amdCpu"</span>/&gt;</span>\n     <span class="code-tag">&lt;<span class="code-name">property</span> <span class="hljs-attr">name</span>=<span\n             class="code-string">"graphics"</span> <span class="hljs-attr">ref</span>=<span class="code-string">"nvdiaGraphics"</span>/&gt;</span>\n<span class="code-tag">&lt;/<span class="code-name">bean</span>&gt;</span>\n\n<span class="code-comment">&lt;!-- 组装电脑2 --&gt;</span>\n<span class="code-tag">&lt;<span class="code-name">bean</span> <span class="hljs-attr">id</span>=<span\n        class="code-string">"yourComputer"</span> <span class="hljs-attr">class</span>=<span class="code-string">"myProject.computer.YourComputer"</span>&gt;</span>\n     <span class="code-tag">&lt;<span class="code-name">property</span> <span class="hljs-attr">name</span>=<span\n             class="code-string">"cpu"</span> <span class="hljs-attr">ref</span>=<span\n             class="code-string">"intelCpu"</span>/&gt;</span>\n     <span class="code-tag">&lt;<span class="code-name">property</span> <span class="hljs-attr">name</span>=<span\n             class="code-string">"graphics"</span> <span class="hljs-attr">ref</span>=<span class="code-string">"amdGraphics"</span>/&gt;</span>\n<span class="code-tag">&lt;/<span class="code-name">bean</span>&gt;</span></code></pre>'}};