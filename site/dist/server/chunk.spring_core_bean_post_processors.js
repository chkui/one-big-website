exports.ids=[19],exports.modules={368:function(s,n,a){"use strict";Object.defineProperty(n,"__esModule",{value:!0});n.content='<h2 id="h2-1">非侵入式框架</h2>\n<p>\n    Spring一直标注自己是一个非侵入式框架。非侵入式设计的概念并不新鲜，目标就是降低使用者和框架代码的耦合，毕竟框架的开发者和使用者几乎肯定不是同一个团队。Spring最早的非侵入式实现就是他的一系列XML配置，理想状态下Spring框架的所有的功能都应该是通过配置实现的。元编程在Java中的使用现给非侵入式的设计提供了更好的解决方案，在Java中通过注解（Annotation）即可标记某个类、方法、域的附加功能，而无需通过继承的方式来扩展原始框架没有的功能。下面通过3段代码的例子来说明侵入式与非侵入式的区别。</p>\n<p><span style="color:#e74c3c">文章中的代码仅仅用于说明原理，已经删除了一些无关代码，无法执行。可执行代码在：<a\n        href="https://github.com/chkui/spring-core-example"\n        rel="nofollow">https://github.com/chkui/spring-core-example</a>，如有需要请自行clone，仅支持gradle依赖。</span></p>\n\n<h3 id="h3-1">一个基本的容器</h3>\n<p>下面的代码是大致模仿的IoC容器创建Bean的过程。BeanFactory::createBeans方法传入Bean的类型列表，而迭代器遍历列表完成每一个类的实例创建：</p>\n<pre><code class="java"><span class="code-comment">/**框架代码*/</span>\n<span class="code-keyword">package</span> chkui.springcore.example.xml.beanpostprocessor.nopluging;\n\n<span class="code-comment">//创建Bean的工厂类,由框架开发者开发</span>\n<span class="hljs-class"><span class="code-keyword">class</span> <span class="code-title">BeanFactory</span> </span>{\n\t<span class="code-comment">//创建一系列的Bean</span>\n\t<span class="hljs-function"><span class="code-keyword">public</span> List&lt;Object&gt; <span class="code-title">createBeans</span><span\n            class="hljs-params">(List&lt;Class&lt;?&gt;&gt; clslist)</span></span>{\n\t\t<span class="code-keyword">return</span> clslist.stream().map(cls-&gt;{\n\t\t\t<span class="code-keyword">return</span> createBean(cls);\n\t\t}).collect(Collectors.toList());\n\t}\n\t<span class="code-comment">//创建一个Bean</span>\n\t<span class="hljs-function">Object <span class="code-title">createBean</span><span class="hljs-params">(Class&lt;?&gt; cls)</span></span>{\n\t\t<span class="code-comment">//添加到容器</span>\n\t\t<span class="code-keyword">return</span> <span class="code-keyword">new</span> BeanWrapper(cls.newInstance());\n\t}\n}\n\n<span class="code-comment">//包装代理</span>\n<span class="hljs-class"><span class="code-keyword">class</span> <span class="code-title">BeanWrapper</span> </span>{\n\t<span class="code-keyword">private</span> Object bean;\n\t<span class="hljs-function"><span class="code-keyword">public</span> <span\n            class="code-title">BeanWrapper</span><span class="hljs-params">(Object bean)</span> </span>{\n\t\t<span class="code-keyword">this</span>.bean = bean;\n\t}\n\t<span class="code-meta">@Override</span>\n\t<span class="hljs-function"><span class="code-keyword">public</span> String <span class="code-title">toString</span><span\n            class="hljs-params">()</span> </span>{\n\t\t<span class="code-keyword">return</span> <span class="code-string">"Wrapper("</span> + <span\n            class="code-keyword">this</span>.bean.toString() + <span class="code-string">")"</span>;\n\t}\n}</code></pre>\n<p>下面的代码是框架使用者的代码——将Bean1和Bean2交给BeanFactory来完成初始化：</p>\n<pre><code class="java"><span class="code-comment">/**使用端代码*/</span>\n<span class="code-keyword">package</span> chkui.springcore.example.xml.beanpostprocessor.nopluging;\n\n<span class="code-comment">//import ...</span>\n\n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n            class="code-title">IocExtensionSampleNoPluging</span> </span>{\n    <span class="hljs-function"><span class="code-keyword">public</span> <span class="code-keyword">static</span> <span\n            class="code-keyword">void</span> <span class="code-title">main</span><span class="hljs-params">(String[] args)</span> </span>{\n    \tList&lt;Class&lt;?&gt;&gt; classes = Arrays.asList(<span class="code-keyword">new</span> Class&lt;?&gt;[]{MyBean1.class, MyBean2.class});\n    \tList&lt;Object&gt; ins = <span class="code-keyword">new</span> BeanFactory().createBeans(classes);\n    \tSystem.out.println(<span class="code-string">"Result:"</span> + ins.toString());\n    }\n}\n\n<span class="code-comment">//Bean1，由使用者编码</span>\n<span class="hljs-class"><span class="code-keyword">class</span> <span class="code-title">MyBean1</span> </span>{\n\t<span class="hljs-function"><span class="code-keyword">public</span> String <span class="code-title">toString</span><span\n            class="hljs-params">()</span> </span>{\n\t\t<span class="code-keyword">return</span> <span class="code-string">"MyBean1 Ins"</span>;\n\t}\n}\n\n<span class="code-comment">//Bean2，使用者编码</span>\n<span class="hljs-class"><span class="code-keyword">class</span> <span class="code-title">MyBean2</span> </span>{\n\t<span class="hljs-function"><span class="code-keyword">public</span> String <span class="code-title">toString</span><span\n            class="hljs-params">()</span> </span>{\n\t\t<span class="code-keyword">return</span> <span class="code-string">"MyBean2 Ins"</span>;\n\t}\n}</code></pre>\n<p>classpath：chkui.springcore.example.xml.beanpostprocessor.nopluging.IocExtensionSample。<a\n        href="https://github.com/chkui/spring-core-example/blob/master/src/main/java/chkui/springcore/example/xml/beanpostprocessor/nopluging/IocExtensionSample.java"\n        rel="nofollow">源码地址</a>。</p>\n<p>某个时刻，框架的使用者有个新需求是在要在每个Bean创建的前后进行一些处理。我们可以通过继承的方式来实现功能。下面我们修改使用端代码实现这个功能。</p>\n\n<h3 id="h3-2">继承实现功能扩展</h3>\n<p>通过继承类BeanFactory，并修改createBean方法可以实现我们的需求：</p>\n<pre><code class="java"><span class="code-keyword">package</span> chkui.springcore.example.xml.beanpostprocessor.extend;\n\n<span class="code-comment">//执行</span>\n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n            class="code-title">IocExtensionSampleNoPluging</span> </span>{\n    <span class="hljs-function"><span class="code-keyword">public</span> <span class="code-keyword">static</span> <span\n            class="code-keyword">void</span> <span class="code-title">main</span><span class="hljs-params">(String[] args)</span> </span>{\n    \tList&lt;Class&lt;?&gt;&gt; classes = Arrays.asList(<span class="code-keyword">new</span> Class&lt;?&gt;[]{MyBean1.class, MyBean2.class});\n    \tList&lt;Object&gt; ins = <span class="code-keyword">new</span> ModifyBeanFactory().createBeans(classes);\n    \tSystem.out.println(<span class="code-string">"Result:"</span> + ins.toString());\n    }\n}\n\n<span class="code-comment">//新建一个BeanFactory的派生类，并修改createBean的实现，添加使用者的处理逻辑</span>\n<span class="hljs-class"><span class="code-keyword">class</span> <span class="code-title">ModifyBeanFactory</span> <span\n        class="code-keyword">extends</span> <span class="code-title">BeanFactory</span> </span>{\n\t<span class="hljs-function">Object <span class="code-title">createBean</span><span class="hljs-params">(Class&lt;?&gt; cls)</span></span>{\n\t\tObject ins = cls.newInstance();\n\t\t<span class="code-comment">//添加容器之前的处理</span>\n\t\tBeanWrapper wrapper = <span class="code-keyword">new</span> BeanWrapper(ins);\n\t\t<span class="code-comment">//添加容器之后的处理</span>\n\t\t<span class="code-keyword">return</span> wrapper;\n\t}\n}</code></pre>\n<p>classpath：chkui.springcore.example.xml.beanpostprocessor.extend.IocExtensionSample。<a\n        href="https://github.com/chkui/spring-core-example/blob/master/src/main/java/chkui/springcore/example/xml/beanpostprocessor/extend/IocExtensionSample.java"\n        rel="nofollow">源码地址</a>。</p>\n<p>这里在使用者的代码里新增了一个ModifyBeanFactory类，并重写了createBean方法。在重写的方法中实现我们需要的功能逻辑。但是这样开发会出现以下2点问题：</p>\n<ol>\n    <li>导致使用者的代码与框架代码产生了极强的耦合性。如果某天框架进行了调整，例如将方法名改为buildBean、或者增加了更多的代理模式会出现一些意想不到的问题。更麻烦的是可能会遇到一些到运行期才出现的问题。</li>\n    <li>我们需要先理解框架的源码才能植入我们的功能，这和很多设计模式的原则是背道而驰的。也会大大影响我们的开发效率。</li>\n</ol>\n<p>出现这些问题就叫做“侵入式”——框架代码侵入到使用者的工程代码，导致2者严重耦合，对未来的升级、扩展、二次开发都有深远的影响。</p>\n\n<h2 id="h2-2">通过注解（Annotation）扩展功能</h2>\n<p>实际上注解和在XML进行配置都是一样的思路，只是注解讲关系写在了源码上，而使用XML是将关系通过XML来描述。这里实现的功能就类似于在<a\n        href="https://www.chkui.com/article/spring/spring_core_bean_lifecycle_callback"\n        rel="nofollow">&nbsp;Bean的定义与控制</a>&nbsp;一文中介绍的Bean的生命周期方法。</p>\n<p>使用注解最大的价值就是非侵入式。非侵入式的好处显而易见：</p>\n<ol>\n    <li>无需和框架代码耦合，更新升级框架风险和成本都很小。</li>\n    <li>任何时候我们需要需要更换框架，只需修改配置或注解，而无需再去调整我们自己的功能代码。</li>\n</ol>\n<p>非侵入式也有一个问题，那就是接入的功能还是需要框架预设，而不可能像继承那样随心所欲。</p>\n<p>我们将前面的代码进行一些修改，支持通过注解来指定扩展的功能：</p>\n<pre><code class="java"><span class="code-keyword">package</span> chkui.springcore.example.xml.beanpostprocessor.annotation;\n\n<span class="hljs-class"><span class="code-keyword">class</span> <span class="code-title">BeanFactory</span> </span>{\n\t<span class="hljs-function"><span class="code-keyword">public</span> List&lt;Object&gt; <span class="code-title">createBeans</span><span\n            class="hljs-params">(List&lt;Class&lt;?&gt;&gt; clslist)</span></span>{\n\t\t<span class="code-comment">//同前文...</span>\n\t}\n\t<span class="hljs-function">Object <span class="code-title">createBean</span><span class="hljs-params">(Class&lt;?&gt; cls)</span></span>{\n\t\tBeanWrapper wrapper = <span class="code-keyword">null</span>;\n\t\tObject ins = cls.newInstance();\n        <span class="code-comment">/**这里增加了一个Handle对象。\n           Handle会对注解进行处理，确定添加容器前后的执行方法。*/</span>\n\t\tHandle handle = processBeforeAndAfterHandle(ins);\n\t\thandle.exeBefore();\n\t\twrapper = <span class="code-keyword">new</span> BeanWrapper(ins);\n\t\thandle.exeAfter();\n\t\t<span class="code-keyword">return</span> wrapper;\n\t}\n\t\n    <span class="code-comment">// 通过反射来确定Bean被添加到容器前后的执行方法。</span>\n\t<span class="hljs-function"><span class="code-keyword">private</span> Handle <span class="code-title">processBeforeAndAfterHandle</span><span\n            class="hljs-params">(Object obj)</span> </span>{\n\t\tMethod[] methods = obj.getClass().getDeclaredMethods();\n\t\tHandle handle = <span class="code-keyword">new</span> Handle(obj);\n\t\t<span class="code-keyword">for</span>(Method method : methods) {\n\t\t\tAnnotation bef = method.getAnnotation(before.class);\n\t\t\tAnnotation aft = method.getAnnotation(after.class);\n\t\t\t<span class="code-keyword">if</span>(<span class="code-keyword">null</span> != bef) handle.setBefore(method);\n\t\t\t<span class="code-keyword">if</span>(<span class="code-keyword">null</span> != aft) handle.setBefore(method);\n\t\t}\n\t\t<span class="code-keyword">return</span> handle;\n\t}\n}</code></pre>\n<p>下面是Handle处理器和对应的注解的代码：</p>\n<pre><code class="java"><span class="hljs-class"><span class="code-keyword">class</span> <span\n        class="code-title">Handle</span></span>{\n\tObject instance;\n\tMethod before;\n\tMethod after;\n\tHandle(Object ins){\n\t\t<span class="code-keyword">this</span>.instance = ins;\n\t}\n\t<span class="hljs-function"><span class="code-keyword">void</span> <span class="code-title">setBefore</span><span\n            class="hljs-params">(Method method)</span> </span>{\n\t\t<span class="code-keyword">this</span>.before = method;\n\t}\n\t<span class="hljs-function"><span class="code-keyword">void</span> <span class="code-title">setAfter</span><span\n            class="hljs-params">(Method method)</span> </span>{\n\t\t<span class="code-keyword">this</span>.after = method;\n\t}\n\t<span class="hljs-function"><span class="code-keyword">void</span> <span class="code-title">exeBefore</span><span\n            class="hljs-params">()</span></span>{\n\t\t<span class="code-keyword">if</span>(<span class="code-keyword">null</span> != <span\n            class="code-keyword">this</span>.before) {\n\t\t\t<span class="code-keyword">this</span>.before.invoke(<span class="code-keyword">this</span>.instance, <span\n            class="code-keyword">null</span>);\n\t\t}\n\t}\n\t<span class="hljs-function"><span class="code-keyword">void</span> <span class="code-title">exeAfter</span><span\n            class="hljs-params">()</span></span>{\n\t\t<span class="code-keyword">if</span>(<span class="code-keyword">null</span> != <span\n            class="code-keyword">this</span>.after) {\n\t\t\t<span class="code-keyword">this</span>.after.invoke(<span class="code-keyword">this</span>.instance, <span\n            class="code-keyword">null</span>);\n\t\t}\n\t}\n}\n\n<span class="code-comment">//注解----------------------------------------</span>\n<span class="code-meta">@Target</span>({ElementType.METHOD})\n<span class="code-meta">@Retention</span>(RetentionPolicy.RUNTIME)\n<span class="code-meta">@interface</span> before {}\n\n<span class="code-meta">@Target</span>({ElementType.METHOD})\n<span class="code-meta">@Retention</span>(RetentionPolicy.RUNTIME)\n<span class="code-meta">@interface</span> after{}</code></pre>\n<p>使用者的代码，我们将注解添加到Bean的对应的方法上：</p>\n<pre><code class="java"><span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n        class="code-title">IocExtensionSampleNoPluging</span> </span>{\n    <span class="hljs-function"><span class="code-keyword">public</span> <span class="code-keyword">static</span> <span\n            class="code-keyword">void</span> <span class="code-title">main</span><span class="hljs-params">(String[] args)</span> </span>{\n    \tList&lt;Class&lt;?&gt;&gt; classes = Arrays.asList(<span class="code-keyword">new</span> Class&lt;?&gt;[]{MyBean1.class, MyBean2.class});\n    \tList&lt;Object&gt; ins = <span class="code-keyword">new</span> BeanFactory().createBeans(classes);\n    \tSystem.out.println(<span class="code-string">"Result:"</span> + ins.toString());\n    }\n}\n\n<span class="code-comment">//预设的Bean1</span>\n<span class="hljs-class"><span class="code-keyword">class</span> <span class="code-title">MyBean1</span> </span>{\n\t<span class="hljs-function"><span class="code-keyword">public</span> String <span class="code-title">toString</span><span\n            class="hljs-params">()</span> </span>{\n\t\t<span class="code-keyword">return</span> <span class="code-string">"MyBean1 Ins"</span>;\n\t}\n\t\n\t<span class="code-meta">@before</span>\n\t<span class="hljs-function"><span class="code-keyword">public</span> <span class="code-keyword">void</span> <span\n            class="code-title">init</span><span class="hljs-params">()</span> </span>{\n    \tSystem.out.println(<span class="code-string">"Before Init:"</span> + <span class="code-keyword">this</span>.toString());\n\t}\n}\n\n<span class="code-comment">//预设的Bean2</span>\n<span class="hljs-class"><span class="code-keyword">class</span> <span class="code-title">MyBean2</span> </span>{\n\t<span class="hljs-function"><span class="code-keyword">public</span> String <span class="code-title">toString</span><span\n            class="hljs-params">()</span> </span>{\n\t\t<span class="code-keyword">return</span> <span class="code-string">"MyBean2 Ins"</span>;\n\t}\n\t\n\t<span class="code-meta">@after</span>\n\t<span class="hljs-function"><span class="code-keyword">public</span> <span class="code-keyword">void</span> <span\n            class="code-title">post</span><span class="hljs-params">()</span> </span>{\n    \tSystem.out.println(<span class="code-string">"After Init:"</span> + <span class="code-keyword">this</span>.toString());\n\t}\n}</code></pre>\n<p>我们为MyBean1和MyBean2分别添加了init、post方法和对应的@before、@after注解。执行之后输出一下内容：</p>\n<pre><code class="apache"><span class="code-attribute">Before</span> Init:MyBean1 Ins\n<span class="code-attribute">After</span> Init:MyBean2 Ins\n<span class="code-attribute">Result</span>:[Wrapper(MyBean1 Ins), Wrapper(MyBean2 Ins)]</code></pre>\n<p>classpath：chkui.springcore.example.xml.beanpostprocessor.annotation.IocExtensionSample。<a\n        href="https://github.com/chkui/spring-core-example/blob/master/src/main/java/chkui/springcore/example/xml/beanpostprocessor/annotation/IocExtensionSample.java"\n        rel="nofollow">源码地址</a>。</p>\n<p>注解对应的方法都顺利执行。</p>\n<p>通过注解，我们实现了扩展功能，任何时候只需要通过添加或修改注解即可向容器扩展功能。在Spring核心功能里，<a\n        href="http://www.chkui.com/article/spring/spring_core_bean_lifecycle_callback" title="Bean的生命周期管理">Bean的生命周期管理</a>都是通过这种思路实现的，除了注解之外还有XML支持。\n</p>\n<p>\n    在使用spring的过程中，我想各位码友多多少少都通过继承Spring某些类来实现了一些需要扩展的功能。而且我发现网上很多使用spring某些功能的例子也是通过继承实现的。建议尽量不要去采用这种加深耦合的方式实现扩展，Spring提供了多种多样的容器扩展机制，后面的文章会一一介绍。</p>\n\n<h2 id="h2-3">后置处理器</h2>\n<p>\n    后置处理器——BeanPostProcessor是Spring核心框架容器扩展功能之一，作用和Bean的生命周期方法类似，也是在Bean完成初始化前后被调用。但是和生命周期方法不同的是，他无需在每一个Bean上去实现代码，而是通过一个独立的Bean来处理全局的初始化过程。</p>\n<p>BeanPostProcessor与Bean生命周期方法体现出的差异是：<span style="color:#e74c3c">我们无论任何时候都可以加入处理器来实现扩展功能，这样做的好处是无需调整之前的Bean的任何代码也可以植入功能</span>。\n</p>\n<p>这种实现方式与切面（AOP）有一些相似的地方，但是实现的方式是完全不一样的，而且处理器会对所有Bean进行处理。</p>\n<p>BeanPostProcessor的实现非常简单，只添加一个Bean实现BeanPostProcessor接口即可：</p>\n<pre><code class="java"><span class="code-keyword">package</span> chkui.springcore.example.xml.beanpostprocessor;\n<span class="code-keyword">import</span> org.springframework.beans.factory.config.BeanPostProcessor;\n\n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n            class="code-title">Processor</span> <span class="code-keyword">implements</span> <span class="code-title">BeanPostProcessor</span> </span>{\n    <span class="code-comment">//初始化之前</span>\n\t<span class="hljs-function"><span class="code-keyword">public</span> Object <span class="code-title">postProcessBeforeInitialization</span><span\n            class="hljs-params">(Object bean, String beanName)</span> </span>{\n        <span class="code-keyword">return</span> bean;\n    }\n\t<span class="code-comment">//初始化之后</span>\n\t<span class="hljs-function"><span class="code-keyword">public</span> Object <span class="code-title">postProcessAfterInitialization</span><span\n            class="hljs-params">(Object bean, String beanName)</span> </span>{\n        System.out.println(<span class="code-string">"Bean \'"</span> + beanName + <span class="code-string">"\' created : "</span> + bean.toString());\n        <span class="code-keyword">return</span> bean;\n    }\n}</code></pre>\n<p>BeanPostProcessor的使用案例请查看<a href="https://github.com/chkui/spring-core-example" rel="nofollow">实例代码</a>中&nbsp;chkui.springcore.example.xml.beanpostprocessor\n    包中的代码，包含：</p>\n<p>一个实体类：<em>chkui.springcore.example.xml.entity.User</em></p>\n<p>一个服务接口和服务类：<em>chkui.springcore.example.xml.service.UserService</em></p>\n<p>处理器：<em>chkui.springcore.example.xml.beanpostprocessor.Processor</em></p>\n<p>Main入口：<em>chkui.springcore.example.xml.beanpostprocessor.BeanPostProcessor</em></p>\n<p>配置文件：<em>/src/main/resources/xml/config.xml</em></p>\n\n<h3 id="h3-3">更多的后置处理器说明</h3>\n<p>见：<a href="https://www.chkui.com/article/spring/spring_core_post_processor_of_official" title="spring后置处理器">https://www.chkui.com/article/spring/spring_core_post_processor_of_official</a>\n</p>'}};