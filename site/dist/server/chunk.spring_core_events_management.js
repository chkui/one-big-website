exports.ids=[31],exports.modules={352:function(s,n,a){"use strict";Object.defineProperty(n,"__esModule",{value:!0});n.content='<p><em>ApplicationContext</em>是一个<em>Context</em>策略（见<a\n        href="https://www.chkui.com/article/spring/spring_core_context_and_ioc"\n        title="上下文与IoC">上下文与IoC</a>），他除了提供最基础的<em>IoC</em>容器功能，还提供了<a\n        href="https://www.chkui.com/article/spring/spring_core_internationalization_with_messagesource" title="MessageSource实现的国际化">MessageSource实现的国际化</a>、全局事件、资源层级管理等等功能。本文将详细介绍Spring核心模块的事件管理机制。\n</p>\n<p><em>Spring</em>核心模块的事件机制和常规意义上的“事件”并没有太大区别（例如浏览器上的用户操作事件）都是通过订阅/发布模式实现的。</p>\n<p><em>Spring</em>事件管理的内容包括标准事件、自定义事件、注解标记处理器、异步事件处理、通用实体包装。下面将通过几个例子来说明这些内容，可执行代码请到本人的<a\n        href="https://gitee.com/chkui-com/spring-core-sample" rel="nofollow">gitee库下载</a>，本文的内容在包<em>chkui.springcore.example.javabase.event</em>中。\n</p>\n<p>我们都知道在订阅/发布模式中至少要涉及三个部分——发布者（<em>publisher</em>）、订阅者（<em>listener/subscriber</em>）和事件（<em>event</em>）。针对这个模型Spring也提供了对应的两个接口——<em>ApplicationEventPublisher、ApplicationListener</em>以及一个抽象类<em>ApplicationEvent</em>。基本上，要使用<em>Spring</em>事件的功能，只要<em>实现/继承</em>这这三个<em>接口/抽象类</em>并按照Spring定好的规则来使用即可。掌握这个原则那么接下来的内容就好理解了。\n</p>\n\n<h2 id="h2-1">标准事件</h2>\n<p><em>Spring</em>为一些比较常规的事件制定了标准的事件类型和固定的发布方法，我们只需要定制好订阅者（<em>listener/subscriber</em>）就可以监听这些事件。</p>\n<p>先指定2个订阅者：</p>\n<pre><code class="java"><span class="code-keyword">package</span> chkui.springcore.example.javabase.event.standard;\n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n            class="code-title">ContextStartedListener</span> <span class="code-keyword">implements</span> <span\n            class="code-title">ApplicationListener</span>&lt;<span\n            class="code-title">ContextStartedEvent</span>&gt; </span>{\n\t<span class="code-meta">@Override</span>\n\t<span class="hljs-function"><span class="code-keyword">public</span> <span class="code-keyword">void</span> <span\n            class="code-title">onApplicationEvent</span><span\n            class="hljs-params">(ContextStartedEvent event)</span> </span>{\n\t\tSystem.out.println(<span class="code-string">"Start Listener: I am start"</span>);\n\t}\n}</code></pre>\n<pre><code class="java"><span class="code-keyword">package</span> chkui.springcore.example.javabase.event.standard;\n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n            class="code-title">ContextStopListener</span> <span class="code-keyword">implements</span> <span\n            class="code-title">ApplicationListener</span>&lt;<span\n            class="code-title">ContextStoppedEvent</span>&gt; </span>{\n\t<span class="code-meta">@Override</span>\n\t<span class="hljs-function"><span class="code-keyword">public</span> <span class="code-keyword">void</span> <span\n            class="code-title">onApplicationEvent</span><span\n            class="hljs-params">(ContextStoppedEvent event)</span> </span>{\n\t\tSystem.out.println(<span class="code-string">"Stop Listener: I am stop"</span>);\n\t}\n}</code></pre>\n<p>然后运行使用他们：</p>\n<pre><code class="java"><span class="code-keyword">package</span> chkui.springcore.example.javabase.event;\n<span class="code-meta">@Configuration</span>\n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n            class="code-title">EventApp</span> </span>{\n\n\t<span class="code-meta">@Bean</span>\n\t<span class="hljs-function">ContextStopListener <span class="code-title">contextStopListener</span><span\n            class="hljs-params">()</span> </span>{\n\t\t<span class="code-keyword">return</span> <span class="code-keyword">new</span> ContextStopListener();\n\t}\n\t\n\t<span class="code-meta">@Bean</span>\n\t<span class="hljs-function">ContextStartedListener <span class="code-title">contextStartedListener</span><span\n            class="hljs-params">()</span> </span>{\n\t\t<span class="code-keyword">return</span> <span class="code-keyword">new</span> ContextStartedListener();\n\t}\n\t\n\t<span class="hljs-function"><span class="code-keyword">public</span> <span class="code-keyword">static</span> <span\n            class="code-keyword">void</span> <span class="code-title">main</span><span class="hljs-params">(String[] args)</span> </span>{\n\t\tConfigurableApplicationContext context = <span class="code-keyword">new</span> AnnotationConfigApplicationContext(EventApp.class);\n\t\t<span class="code-comment">//发布start事件</span>\n\t\tcontext.start();\n\t\t<span class="code-comment">//发布stop事件</span>\n\t\tcontext.stop();\n        <span class="code-comment">//关闭容器</span>\n\t\tcontext.close();\n\t}\n}</code></pre>\n<p>在例子代码中，<em>ContextStartedListener</em>和<em>ContextStopListener</em>类都实现了ApplicationListener接口，然后通过<em>onApplicationEvent</em>的方法参数来指定监听的事件类型。在<em>ConfigurableApplicationContext</em>接口中已经为“start”和“stop”事件提供对应的发布方法。除了<em>StartedEvent</em>和<em>StoppedEvent</em>，<em>Spring</em>还为其他几项操作提供了标准事件：\n</p>\n<ol>\n    <li>\n        ContextRefreshedEvent：ConfigurableApplicationContext::refresh方法被调用后触发。事件发出的时机是所有的后置处理器已经执行、所有的Bean已经被加载、所有的ApplicationContext接口方法都可以提供服务。\n    </li>\n    <li>ContextStartedEvent：ConfigurableApplicationContext::start方法被调用后触发。</li>\n    <li>ContextStoppedEvent：ConfigurableApplicationContext::stop方法被调用后触发。</li>\n    <li>ContextClosedEvent：ConfigurableApplicationContext::close方法被调用后触发。</li>\n    <li>RequestHandledEvent：这是一个用于Web容器的事件（例如启用了DispatcherServlet），当接收到前端请求时触发。</li>\n</ol>\n\n<h2 id="h2-2">自定义事件</h2>\n<p>除了使用标准事件，我们还可以定义各种各样的事件。实现前面提到的三个接口/抽象类即可。</p>\n<p>继承<em>ApplicationEvent</em>实现自定义事件：</p>\n<pre><code class="java"><span class="code-keyword">package</span> chkui.springcore.example.javabase.event.custom;\n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n            class="code-title">MyEvent</span> <span class="code-keyword">extends</span> <span class="code-title">ApplicationEvent</span> </span>{\n\n\t<span class="code-keyword">private</span> String value = <span class="code-string">"This is my event!"</span>;\n\t\n\t<span class="hljs-function"><span class="code-keyword">public</span> <span class="code-title">MyEvent</span><span\n            class="hljs-params">(Object source,String value)</span> </span>{\n\t\t<span class="code-keyword">super</span>(source);\n\t\t<span class="code-keyword">this</span>.value = value;\n\t}\n\n\t<span class="hljs-function"><span class="code-keyword">public</span> String <span class="code-title">getValue</span><span\n            class="hljs-params">()</span> </span>{\n\t\t<span class="code-keyword">return</span> value;\n\t}\n}</code></pre>\n<p>定义事件对应的<em>Listener</em>:</p>\n<pre><code class="java"><span class="code-keyword">package</span> chkui.springcore.example.javabase.event.custom;\n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n            class="code-title">MyEventListener</span> <span class="code-keyword">implements</span> <span\n            class="code-title">ApplicationListener</span>&lt;<span class="code-title">MyEvent</span>&gt; </span>{\n\t<span class="hljs-function"><span class="code-keyword">public</span> <span class="code-keyword">void</span> <span\n            class="code-title">onApplicationEvent</span><span class="hljs-params">(MyEvent event)</span> </span>{\n\t\tSystem.out.println(<span class="code-string">"MyEventListener :"</span> + event.getValue());\n\t}\n}</code></pre>\n<p>然后通过<em>ApplicationEventPublisher</em>接口发布事件：</p>\n<pre><code class="java"><span class="code-keyword">package</span> chkui.springcore.example.javabase.event.custom;\n<span class="code-meta">@Service</span>\n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n            class="code-title">MyEventService</span> <span class="code-keyword">implements</span> <span\n            class="code-title">ApplicationEventPublisherAware</span> </span>{\n\t<span class="code-keyword">private</span> ApplicationEventPublisher publisher;\n\t<span class="code-meta">@Override</span>\n\t<span class="hljs-function"><span class="code-keyword">public</span> <span class="code-keyword">void</span> <span\n            class="code-title">setApplicationEventPublisher</span><span class="hljs-params">(ApplicationEventPublisher applicationEventPublisher)</span> </span>{\n\t\tpublisher = applicationEventPublisher;\n\t}\n\n\t<span class="hljs-function"><span class="code-keyword">public</span> <span class="code-keyword">void</span> <span\n            class="code-title">publish</span><span class="hljs-params">(String value)</span> </span>{\n\t\tpublisher.publishEvent(<span class="code-keyword">new</span> MyEvent(<span class="code-keyword">this</span>, value));\n\t}\n}</code></pre>\n\n<h2 id="h2-3">使用@EventListener实现订阅者</h2>\n<p>在<em>Spring Framework4.2</em>之后可以直接使用<em>@EventListener</em>注解来指定事件的处理器，我们将上面的<em>MyEventListener</em>类进行简单的修改：</p>\n<pre><code class="java"><span class="code-keyword">package</span> chkui.springcore.example.javabase.event.custom;\n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n            class="code-title">MyEventListenerAnnotation</span></span>{\n\t<span class="code-meta">@EventListener</span>\n    <span class="hljs-function"><span class="code-keyword">public</span> <span class="code-keyword">void</span> <span\n            class="code-title">handleMyEvent</span><span class="hljs-params">(MyEvent event)</span> </span>{\n\t\tSystem.out.println(<span class="code-string">"MyEventListenerAnnotation :"</span> + event.getValue());\n    }\n}</code></pre>\n<p>使用<em>@EventListener</em>可以不必实现<em>ApplicationListener</em>，只要添加为一个<em>Bean</em>即可。<em>Spring</em>会根据方法的参数类型订阅对应的事件。\n</p>\n<p>我们也可以使用注解指定绑定的事件：</p>\n<pre><code class="java"><span class="code-keyword">package</span> chkui.springcore.example.javabase.event.custom;\n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n            class="code-title">MyEventListenerAnnotation</span></span>{\n\t<span class="code-meta">@EventListener</span>(ContextStartedEvent.class})\n    <span class="hljs-function"><span class="code-keyword">public</span> <span class="code-keyword">void</span> <span\n            class="code-title">handleMyEvent</span><span class="hljs-params">()</span> </span>{\n        <span class="code-comment">//----</span>\n    }\n}</code></pre>\n<p>还可以指定一次性监听多个事件：</p>\n<pre><code class="java"><span class="code-keyword">package</span> chkui.springcore.example.javabase.event.standard;\n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n            class="code-title">MultiEventListener</span> </span>{\n\t<span class="code-meta">@EventListener</span>({ContextStartedEvent.class, ContextStoppedEvent.class})\n    <span class="code-meta">@Order</span>(<span class="hljs-number">2</span>)\n\t<span class="hljs-function"><span class="code-keyword">void</span> <span class="code-title">contenxtStandadrEventHandle</span><span\n            class="hljs-params">(ApplicationContextEvent event)</span> </span>{\n\t\tSystem.out.println(<span class="code-string">"MultiEventListener:"</span> + event.getClass().getSimpleName());\n\t}\n}</code></pre>\n<p>注意上面代码中的<em>@Order</em>注解，同一个事件可以被多个订阅者订阅。在多个定于者存在的情况下可以使用<em>@Order</em>注解来指定他们的执行顺序，数值越小越优先执行。\n</p>\n\n<h2 id="h2-4">EL表达式设定事件监听的条件</h2>\n<p>通过注解还可以使用<em>Spring</em>的<em>EL</em>表达式来更细粒度的控制监听的范围，比如下面的例子仅仅当事件的实例中MyEvent.value == "Second publish!"才触发处理器：</p>\n<p>事件：</p>\n<pre><code class="java"><span class="code-keyword">package</span> chkui.springcore.example.javabase.event.custom;\n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n            class="code-title">MyEvent</span> <span class="code-keyword">extends</span> <span class="code-title">ApplicationEvent</span> </span>{\n\t<span class="code-keyword">private</span> String value = <span class="code-string">"This is my event!"</span>;\n\t<span class="hljs-function"><span class="code-keyword">public</span> <span class="code-title">MyEvent</span><span\n            class="hljs-params">(Object source,String value)</span> </span>{\n\t\t<span class="code-keyword">super</span>(source);\n\t\t<span class="code-keyword">this</span>.value = value;\n\t}\n\n\t<span class="hljs-function"><span class="code-keyword">public</span> String <span class="code-title">getValue</span><span\n            class="hljs-params">()</span> </span>{\n\t\t<span class="code-keyword">return</span> value;\n\t}\n}</code></pre>\n<p>通过EL表达式指定监听的数据：</p>\n<pre><code class="java"><span class="code-keyword">package</span> chkui.springcore.example.javabase.event.custom;\n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n            class="code-title">MyEventListenerElSp</span> </span>{\n\t<span class="code-meta">@EventListener</span>(condition=<span\n            class="code-string">"#p0.value == \'Second publish!\'"</span>)\n    <span class="hljs-function"><span class="code-keyword">public</span> <span class="code-keyword">void</span> <span\n            class="code-title">handleMyEvent</span><span class="hljs-params">(MyEvent event)</span> </span>{\n\t\tSystem.out.println(<span class="code-string">"MyEventListenerElSp :"</span> + event.getValue());\n    }\n}</code></pre>\n<p>这样，当这个事件被发布，而且其中的成员变量value值等于"Second\n    publish!"，对应的MyEventListenerElSp::handleMyEvent方法才会被触发。EL表达式还可以使用通配符等等丰富的表现形式来设定过滤规则，后续介绍EL表达式时会详细说明。</p>\n\n<h2 id="h2-5">通用包装事件</h2>\n<p>Spring还提供一个方式使用事件来包装实体类，起到传递数据但是不用重复定义多个事件的作用。看下面的例子。</p>\n<p>我们先定义2个实体类：</p>\n<pre><code class="java"><span class="code-keyword">package</span> chkui.springcore.example.javabase.event.generics;\n<span class="hljs-class"><span class="code-keyword">class</span> <span class="code-title">PES</span> </span>{\n\t<span class="hljs-function"><span class="code-keyword">public</span> String <span class="code-title">toString</span><span\n            class="hljs-params">()</span> </span>{\n\t\t<span class="code-keyword">return</span> <span class="code-string">"PRO EVOLUTION SOCCER"</span>;\n\t}\n}\n<span class="hljs-class"><span class="code-keyword">class</span> <span class="code-title">WOW</span> </span>{\n\t<span class="hljs-function"><span class="code-keyword">public</span> String <span class="code-title">toString</span><span\n            class="hljs-params">()</span> </span>{\n\t\t<span class="code-keyword">return</span> <span class="code-string">"World Of Warcraft"</span>;\n\t}\n}</code></pre>\n<p>定义可以用于包装任何实体的事件，需要实现ResolvableTypeProvider接口：</p>\n<pre><code class="java"><span class="code-keyword">package</span> chkui.springcore.example.javabase.event.generics;\n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n            class="code-title">EntityWrapperEvent</span>&lt;<span class="code-title">T</span>&gt; <span\n            class="code-keyword">extends</span> <span class="code-title">ApplicationEvent</span> <span\n            class="code-keyword">implements</span> <span class="code-title">ResolvableTypeProvider</span> </span>{\n\n\t<span class="hljs-function"><span class="code-keyword">public</span> <span\n            class="code-title">EntityWrapperEvent</span><span class="hljs-params">(T entity)</span> </span>{\n\t\t<span class="code-keyword">super</span>(entity);\n\t}\n\n\t<span class="hljs-function"><span class="code-keyword">public</span> ResolvableType <span class="code-title">getResolvableType</span><span\n            class="hljs-params">()</span> </span>{\n\t\t<span class="code-keyword">return</span> ResolvableType.forClassWithGenerics(getClass(),\n                ResolvableType.forInstance(getSource()));\n\t}\n\n}</code></pre>\n<p>订阅者可以根据被包裹的entity的不同来监听不同的事件：</p>\n<pre><code class="java"><span class="code-keyword">package</span> chkui.springcore.example.javabase.event.generics;\n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n            class="code-title">EntiryWrapperEventListener</span> </span>{\n\t<span class="code-meta">@EventListener</span>\n\t<span class="hljs-function"><span class="code-keyword">public</span> <span class="code-keyword">void</span> <span\n            class="code-title">handlePES</span><span\n            class="hljs-params">(EntityWrapperEvent&lt;PES&gt; evnet)</span> </span>{\n\t\tSystem.out.println(<span class="code-string">"EntiryWrapper PES: "</span> +  evnet);\n\t}\n\t<span class="code-meta">@EventListener</span>\n\t<span class="hljs-function"><span class="code-keyword">public</span> <span class="code-keyword">void</span> <span\n            class="code-title">handleWOW</span><span\n            class="hljs-params">(EntityWrapperEvent&lt;WOW&gt; evnet)</span> </span>{\n\t\tSystem.out.println(<span class="code-string">"EntiryWrapper WOW: "</span> +  evnet);\n\t}\n}</code></pre>\n<p>\n    上面的代码起到最用的主要是ResolvableType.forInstance(getSource())这一行代码，getSource()方法来自于EventObject类，它实际上就是返回构造方法中super(entity)设定的entity实例。</p>\n\n<h2 id="h2-6">写在最后的</h2>\n<p>\n    订阅/发布模式是几乎所有软件程序都会触及的问题，无论是浏览器前端、还是古老的winMFC程序。而在后端应用中，对于使用过MQ工具或者Vertx这种纯事件轮询驱动的框架码友，应该已经请清楚这种<strong>订阅/发布+事件驱动</strong>的价值。它除了能够降低各层的耦合度，还能更有效的利用多线程而大大的提执行效率（当然对开发人员的要求也会高不少）。\n</p>\n<p>\n    对于Spring核心框架来说，事件的订阅/发布只是IoC容器的一个附属功能，Spring的核心价值并不在这个地方。Spring的订阅发布功能在实现层面至少现在并没有使用EventLoop的方式，还是类与类之间的直接调用，所以在性能上是完全无法向Vertx看齐的。不过Spring事件的机制还是能够起到事件驱动的效果，可以用来全局控制一些状态。如果选用Spring生态中的框架（boot等）作为我们的底层框架，现阶段还是应该使用IoC的方式来组合功能，而事件的订阅/发布仅仅用于辅助。</p>'}};