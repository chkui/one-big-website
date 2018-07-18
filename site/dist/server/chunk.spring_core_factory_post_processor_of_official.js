exports.ids=[25],exports.modules={323:function(s,a,n){"use strict";Object.defineProperty(a,"__esModule",{value:!0});a.content='<p>在<a href="https://www.chkui.com/article/spring/spring_core_ioc_extension_points" title="IoC功能扩展点">IoC功能扩展点</a>这篇文章中介绍了BeanFactoryPostProcessor及其使用方法，本篇介绍Spring官方提供的典型BeanFactoryPostProcessor。\n</p>\n\n<h2 id="h2-1">占位符参数替换——PropertyPlaceholderConfigurer</h2>\n<p>\n    如果你的工程有很多配置内容放置到Java的标准配置文件*.properties中，当把Properties的内容整合到Spring中时就会用到PropertyPlaceholderConfigurer。PropertyPlaceholderConfigurer3个功能：</p>\n<ol>\n    <li>将配置中${property-name}格式的占位符换为加载的*.properties文件中的内容。</li>\n    <li>将配置中${property-name}格式的占位符替换为环境变量systemProperties（System.getProperty(key)）中的内容。</li>\n    <li>如果文件和环境中有相同的key，按照规则对数据进行合并。</li>\n</ol>\n\n<h3 id="h3-1">基本使用方法</h3>\n<p>PropertyPlaceholderConfigurer继承了配置BeanFactoryPostProcessor接口，在IoC开始初始化Bean之前修改对应<a\n        href="https://www.chkui.com/article/spring/spring_core_ioc_extension_points" title="IoC功能扩展点">BeanDefinition</a>。在使用时我们直接向容器添加一个PropertyPlaceholderConfigurer即可：\n</p>\n<pre><code class="xml"><span class="code-comment">&lt;!-- 启用占位符替换需要引入PropertyPlaceholderConfigurer --&gt;</span>\n<span class="code-tag">&lt;<span class="code-name">bean</span> <span class="hljs-attr">class</span>=<span\n        class="code-string">"org.springframework.beans.factory.config.PropertyPlaceholderConfigurer"</span>&gt;</span>\n    <span class="code-comment">&lt;!-- 指定*.properties文件的路径 --&gt;</span>\n    <span class="code-tag">&lt;<span class="code-name">property</span> <span class="hljs-attr">name</span>=<span\n            class="code-string">"locations"</span> <span class="hljs-attr">value</span>=<span class="code-string">"classpath:project/config.properties"</span>/&gt;</span>\n<span class="code-tag">&lt;/<span class="code-name">bean</span>&gt;</span>\n\n<span class="code-comment">&lt;!-- 替换Bean中的内容 --&gt;</span>\n<span class="code-tag">&lt;<span class="code-name">bean</span> <span class="hljs-attr">id</span>=<span\n        class="code-string">"A"</span> <span class="hljs-attr">class</span>=<span\n        class="code-string">"x.y.z.User"</span>&gt;</span>\n    <span class="code-tag">&lt;<span class="code-name">property</span> <span class="hljs-attr">name</span>=<span\n            class="code-string">"name"</span> <span class="hljs-attr">value</span>=<span class="code-string">"${user.name}"</span>/&gt;</span>\n    <span class="code-tag">&lt;<span class="code-name">property</span> <span class="hljs-attr">name</span>=<span\n            class="code-string">"address"</span> <span class="hljs-attr">value</span>=<span class="code-string">"${user.address}"</span>/&gt;</span>\n    <span class="code-tag">&lt;<span class="code-name">property</span> <span class="hljs-attr">name</span>=<span\n            class="code-string">"age"</span> <span class="hljs-attr">value</span>=<span class="code-string">"${user.age}"</span>/&gt;</span>\n<span class="code-tag">&lt;/<span class="code-name">bean</span>&gt;</span></code></pre>\n<p>对应的config.properties文件中的内容：</p>\n<pre><code class="json">user.name=\'Alice\'\nuser.address=\'China\'\nuser.age=<span class="hljs-number">20</span></code></pre>\n<p>除了直接引入一个Bean，可以通过全局上下文配置启动这一项功能：</p>\n<pre><code class="xml"><span class="code-tag">&lt;<span class="code-name">context:property-placeholder</span> <span\n        class="hljs-attr">location</span>=<span\n        class="code-string">"classpath:project/config.properties"</span>/&gt;</span></code></pre>\n\n<h3 id="h3-2">设置环境变量加载行为</h3>\n<p>\n    前面说了PropertyPlaceholderConfigurer除了会用*.properties文件中的参数去替换占位符的内容，还会使用环境变量（System.getProperty(key)）中的参数去替换。如果一个参数在配置文件中和系统环境变量中都存在，那么默认会使用*.properties中的参数来替换配置中的占位符。可以使用PropertyPlaceholderConfigurer::systemPropertiesMode来修改这个行为。他接受3个参数：</p>\n<ul>\n    <li>PropertyPlaceholderConfigurer.SYSTEM_PROPERTIES_MODE_NEVER(0)：从不加载环境变量中的参数。</li>\n    <li>PropertyPlaceholderConfigurer.SYSTEM_PROPERTIES_MODE_FALLBACK(1)：优先使用*.properties文件中的变量，如果不存在再使用环境变量中的。</li>\n    <li>PropertyPlaceholderConfigurer.SYSTEM_PROPERTIES_MODE_OVERRIDE(2)：优先使用环境变量中的参数。</li>\n</ul>\n<p>可以这样设置：</p>\n<pre><code class="xml"><span class="code-tag">&lt;<span class="code-name">bean</span> <span\n        class="hljs-attr">class</span>=<span class="code-string">"org.springframework.beans.factory.config.PropertyPlaceholderConfigurer"</span>&gt;</span>\n    <span class="code-comment">&lt;!-- 优先使用环境变量中的参数 --&gt;</span>\n    <span class="code-tag">&lt;<span class="code-name">property</span> <span class="hljs-attr">name</span>=<span\n            class="code-string">"systemPropertiesMode"</span> <span class="hljs-attr">value</span>=<span\n            class="code-string">"2"</span>/&gt;</span>\n<span class="code-tag">&lt;/<span class="code-name">bean</span>&gt;</span></code></pre>\n\n<h3 id="h3-3">动态设置参数&amp;动态替换类</h3>\n<p>除了通过环境变量和*.properties配置文件引入参数，还可以直接写在XML的配置上：</p>\n<pre><code class="xml"><span class="code-tag">&lt;<span class="code-name">bean</span> <span\n        class="hljs-attr">class</span>=<span class="code-string">"org.springframework.beans.factory.config.PropertyPlaceholderConfigurer"</span>&gt;</span>\n    <span class="code-comment">&lt;!-- 加载资源文件位置 --&gt;</span>\n    <span class="code-tag">&lt;<span class="code-name">property</span> <span class="hljs-attr">name</span>=<span\n            class="code-string">"locations"</span>&gt;</span>\n        <span class="code-tag">&lt;<span\n                class="code-name">value</span>&gt;</span>classpath:myProject/config.properties<span class="code-tag">&lt;/<span\n            class="code-name">value</span>&gt;</span>\n    <span class="code-tag">&lt;/<span class="code-name">property</span>&gt;</span>\n    <span class="code-comment">&lt;!-- 动态添加配置参数 --&gt;</span>\n    <span class="code-tag">&lt;<span class="code-name">property</span> <span class="hljs-attr">name</span>=<span\n            class="code-string">"properties"</span>&gt;</span>\n        <span class="code-tag">&lt;<span class="code-name">value</span>&gt;</span>define.runtime.class=x.y.z.A<span\n            class="code-tag">&lt;/<span class="code-name">value</span>&gt;</span>\n    <span class="code-tag">&lt;/<span class="code-name">property</span>&gt;</span>\n<span class="code-tag">&lt;/<span class="code-name">bean</span>&gt;</span>\n<span class="code-comment">&lt;!-- 动态加载一个类 --&gt;</span>\n<span class="code-tag">&lt;<span class="code-name">bean</span> <span class="hljs-attr">id</span>=<span\n        class="code-string">"a"</span> <span class="hljs-attr">class</span>=<span class="code-string">"${define.runtime.class}"</span>/&gt;</span></code></pre>\n<p>上面XML配置还展示了一个动态装载类的方法。</p>\n\n<h2 id="h2-2">按命名规则注入——PropertyOverrideConfigurer</h2>\n<p>\n    PropertyOverrideConfigurer就是在PropertyPlaceholderConfigurer的基础上扩展了一些功能节约一些写配置文件的时间。他可以让你不必在XML文件写占位符而直接注入数据。看下面的例子：</p>\n<p>通过&lt;bean&gt;标签引入了PropertyOverrideConfigurer类，然后有一个独立的User单例，以及将Cpu、Ram、Graphics单例组合到Pc中。</p>\n<pre><code class="xml"><span class="code-tag">&lt;<span class="code-name">beans</span>&gt;</span>\n    <span class="code-comment">&lt;!-- 引入PropertyOverrideConfigurer --&gt;</span>\n    <span class="code-tag">&lt;<span class="code-name">bean</span> <span class="hljs-attr">class</span>=<span\n            class="code-string">"org.springframework.beans.factory.config.PropertyOverrideConfigurer"</span>&gt;</span>\n        <span class="code-tag">&lt;<span class="code-name">property</span> <span class="hljs-attr">name</span>=<span\n                class="code-string">"locations"</span> <span class="hljs-attr">value</span>=<span class="code-string">"classpath:xml/configoverride/config.properties"</span>/&gt;</span>\n    <span class="code-tag">&lt;/<span class="code-name">bean</span>&gt;</span>\n    <span class="code-comment">&lt;!-- 配置Bean之间的组合关系 --&gt;</span>\n    <span class="code-tag">&lt;<span class="code-name">bean</span> <span class="hljs-attr">id</span>=<span\n            class="code-string">"user"</span> <span class="hljs-attr">class</span>=<span class="code-string">"chkui.springcore.example.xml.configoverride.User"</span> /&gt;</span>\n    <span class="code-tag">&lt;<span class="code-name">bean</span> <span class="hljs-attr">id</span>=<span\n            class="code-string">"cpu"</span> <span class="hljs-attr">class</span>=<span class="code-string">"chkui.springcore.example.xml.configoverride.entity.Cpu"</span> /&gt;</span>\n    <span class="code-tag">&lt;<span class="code-name">bean</span> <span class="hljs-attr">id</span>=<span\n            class="code-string">"ram"</span> <span class="hljs-attr">class</span>=<span class="code-string">"chkui.springcore.example.xml.configoverride.entity.Ram"</span> /&gt;</span>\n    <span class="code-tag">&lt;<span class="code-name">bean</span> <span class="hljs-attr">id</span>=<span\n            class="code-string">"graphics"</span> <span class="hljs-attr">class</span>=<span class="code-string">"chkui.springcore.example.xml.configoverride.entity.Graphics"</span> /&gt;</span>\n    <span class="code-tag">&lt;<span class="code-name">bean</span> <span class="hljs-attr">id</span>=<span\n            class="code-string">"pc"</span> <span class="hljs-attr">class</span>=<span class="code-string">"chkui.springcore.example.xml.configoverride.entity.Pc"</span>&gt;</span>\n        <span class="code-tag">&lt;<span class="code-name">property</span> <span class="hljs-attr">name</span>=<span\n                class="code-string">"cpu"</span> <span class="hljs-attr">ref</span>=<span\n                class="code-string">"cpu"</span>/&gt;</span>\n        <span class="code-tag">&lt;<span class="code-name">property</span> <span class="hljs-attr">name</span>=<span\n                class="code-string">"ram"</span> <span class="hljs-attr">ref</span>=<span\n                class="code-string">"ram"</span>/&gt;</span>\n        <span class="code-tag">&lt;<span class="code-name">property</span> <span class="hljs-attr">name</span>=<span\n                class="code-string">"graphics"</span> <span class="hljs-attr">ref</span>=<span class="code-string">"graphics"</span>/&gt;</span>\n    <span class="code-tag">&lt;/<span class="code-name">bean</span>&gt;</span>\n<span class="code-tag">&lt;/<span class="code-name">beans</span>&gt;</span></code></pre>\n<p>对应的*.properties配置是这样的：</p>\n<pre><code class="bash">user.name=Alice\nuser.address=china\nuser.age=20\n\npc.cpu.brand=AMD\npc.graphics.brand=Nvdia\npc.ram.brand=Kingston</code></pre>\n<p>Cpu类的结构：</p>\n<pre><code class="java"><span class="code-keyword">package</span> chkui.springcore.example.xml.configoverride.entity;\n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n            class="code-title">Cpu</span> </span>{\n\t<span class="code-keyword">private</span> String brand;\n\t<span class="hljs-function"><span class="code-keyword">public</span> String <span class="code-title">getBrand</span><span\n            class="hljs-params">()</span> </span>{\n\t\t<span class="code-keyword">return</span> brand;\n\t}\n\t<span class="hljs-function"><span class="code-keyword">public</span> <span class="code-keyword">void</span> <span\n            class="code-title">setBrand</span><span class="hljs-params">(String brand)</span> </span>{\n\t\t<span class="code-keyword">this</span>.brand = brand;\n\t}\n}</code></pre>\n<p>这个时候PropertyOverrideConfigurer会根据容器中Bean的id或name来注入数据，比如*.properties配置中的"pc"就对应XML中的&lt;bean id="pc"&gt;，接着pc中有一个域（成员变量）名为cpu那么它对应*.properties配置文件中"pc.cpu."，所以pc.cpu.brand=AMD的配置会告诉PropertyOverrideConfigurer向pc单例中的cpu实例的"brand"域注入数据"AMD"。</p>\n<p>所以使用PropertyOverrideConfigurer运行之后，不需要在XML使用${property-name}这样的参数它会按照id或name的结构注入数据，此时user.getName() ==\n    "Alice"。如果类的关系是这个多层的结构一样可以根据Properties的结构注入数据，例如 pc.getPc().getBrand() == "AMD"。</p>\n<p>例子的可执行代码见<strong><a\n        href="https://gitee.com/chkui-com/spring-core-sample/tree/master/src/main/java/chkui/springcore/example/xml/configoverride"\n        rel="nofollow">本人码云库中configoverride包</a>。</strong></p>'}};