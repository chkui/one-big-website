exports.ids=[32],exports.modules={351:function(s,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});n.content='<h2 id="h2-1">Spring的国际化</h2>\n<p>在<a href="https://www.chkui.com/article/spring/spring_core_context_and_ioc" title="上下文与IoC">上下文与IoC</a>对ApplicationContext以及Context相关的设计模式进行了介绍。ApplicationContext作为一个Context在应用的运行层提供了IoC容器、事件、国际化等功能接口。\n</p>\n<p>Spring的国际化（i18n）功能是通过MessageSource接口实现的，他提供了MessageSource::getMessage方法从预设的资源中获取对应的数据。</p>\n\n<h2 id="h2-2">Java标准资源绑定</h2>\n<p>\n    在介绍MessageSource之前，得先说清楚Java（J2SE）对国际化的基本实现——ResourceBundle，因为MessageSource是用它实现的。ResourceBundle很好理解，他就是按照规范的格式放置*.properties资源文件，然后根据输入的语言环境来返回资源。看一个代码例子就很容易明白了。</p>\n<p>（可执行代码请到<a href="https://gitee.com/chkui-com/spring-core-sample" rel="nofollow">gitee</a>下载，本文的示例代码在<em>chkui.springcore.example.hybrid.i18n</em>包中。）\n</p>\n<p>\n    我们有3个资源文件放置在<strong><em>classpath的根目录</em></strong>（本例是放在src/main/resource）中，文件名分别为<em>i18n_en_US.properties</em>、<em>i18n_zh_CN.properties</em>和<em>i18n_web_BASE64.properties。文件中的内容如下：</em>\n</p>\n<pre><code class="apache"><span class="code-comment">#i18n_en_US.properties</span>\n<span class="code-attribute">say</span>=Hallo world!\n\n<span class="code-comment">#i18n_zh_CN.properties</span>\n<span class="code-attribute">say</span>=大家好！\n\n<span class="code-comment">#i18n_web_BASE64.properties</span>\n<span class="code-attribute">say</span>=+-+-+-ABC</code></pre>\n<p>然后我们通过ResourceBundle类来使用这些i18n的资源文件：</p>\n<pre><code class="java"><span class="code-keyword">package</span> chkui.springcore.example.hybrid.i18n;\n\n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n            class="code-title">I18nApp</span> </span>{\n\t\n\t<span class="hljs-function"><span class="code-keyword">public</span> <span class="code-keyword">static</span> <span\n            class="code-keyword">void</span> <span class="code-title">main</span><span class="hljs-params">(String[] args)</span> </span>{\n        <span class="code-comment">//使用当前操作系统的语言环境</span>\n\t\tResourceBundle rb = ResourceBundle.getBundle(<span class="code-string">"i18n"</span>, Locale.getDefault());\n\t\tSystem.out.println(rb.getString(<span class="code-string">"say"</span>));\n\n        <span class="code-comment">//指定简体中文环境</span>\n        rb = ResourceBundle.getBundle(<span class="code-string">"i18n"</span>, <span class="code-keyword">new</span> Locale(<span\n            class="code-string">"zh"</span>, <span class="code-string">"CN"</span>));\n\t\tSystem.out.println(rb.getString(<span class="code-string">"say"</span>));\n        <span class="code-comment">//通过预设指定简体英文环境</span>\n\t\trb = ResourceBundle.getBundle(<span class="code-string">"i18n"</span>, Locale.SIMPLIFIED_CHINESE);\n\t\tSystem.out.println(rb.getString(<span class="code-string">"say"</span>));\n\n        <span class="code-comment">//指定美国英语</span>\n\t\trb = ResourceBundle.getBundle(<span class="code-string">"i18n"</span>, Locale.US);\n\t\tSystem.out.println(rb.getString(<span class="code-string">"say"</span>));\n\n        <span class="code-comment">//使用自定义的语言环境</span>\n\t\tLocale locale = <span class="code-keyword">new</span> Locale(<span class="code-string">"web"</span>, <span\n            class="code-string">"BASE64"</span>);\n\t\trb = ResourceBundle.getBundle(<span class="code-string">"i18n"</span>, locale);\n\t\tSystem.out.println(rb.getString(<span class="code-string">"say"</span>));\n\t}\n}\n</code></pre>\n<p>按照开发文档的要求，使用ResourceBundle加载的资源文件都必须放置在根目录，并且必须按照${<em>name}_${language}_${region}</em>的方式来命名。这个命名方式正好能对应ResourceBundle::getBundle方法中的参数，例如<em>ResourceBundle.getBundle("i18n",\n    new Locale("zh", "CN"))</em>。"i18n"对应${name}，"zh"定位${language}，而“CN”对应${<em>region</em>}。这样我们就可以通过传导参数来使用不同的资源。如果不指定<em>${language}</em>和<em>${region}</em>，该文件就是一个默认文件。\n</p>\n<p><em>Locale</em>类预设了很多资源类型，比如<em>Locale.SIMPLIFIED_CHINESE、Locale.US</em>，实际上他们就等价于<em>new Locale("zh", "CN")</em>和new\n    Locale<em>("en", "US")。</em>只是Java的开发人员做了一些静态的预设。</p>\n<p>除了预设内容的Locale，我们还可以像<em>Locale locale = new Locale("web", "BASE64")</em>这样添加自定义的内容，他对应名为<em>i18n_web_BASE64.properties</em>的资源文件。\n</p>\n\n<h2 id="h2-3">MessageSource的使用</h2>\n<p>MessageSource的功能就是用Java标准库的ResourceBundle实现的，所以使用起来也差不多。</p>\n<p>首先得将用于处理国际化资源的Bean添加到IoC容器中：</p>\n<pre><code class="java"><span class="code-meta">@Configuration</span>\n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n            class="code-title">I18nApp</span> </span>{\n\t<span class="code-meta">@Bean</span>(<span class="code-string">"messageSource"</span>)\n\t<span class="hljs-function">ResourceBundleMessageSource <span\n            class="code-title">resourceBundleMessageSource</span><span class="hljs-params">()</span> </span>{\n\t\tResourceBundleMessageSource messageSource = <span class="code-keyword">new</span> ResourceBundleMessageSource();\n\t\tmessageSource.setBasenames(<span class="code-keyword">new</span> String[] { <span\n            class="code-string">"i18n"</span>, <span class="code-string">"extend"</span> });<span class="code-comment">//添加资源名称</span>\n\t\t<span class="code-keyword">return</span> messageSource;\n\t}\n}</code></pre>\n<p>或</p>\n<pre><code class="xml"><span class="code-tag">&lt;<span class="code-name">beans</span>&gt;</span>\n    <span class="code-tag">&lt;<span class="code-name">bean</span> <span class="hljs-attr">id</span>=<span\n            class="code-string">"messageSource"</span>\n            <span class="hljs-attr">class</span>=<span class="code-string">"org.springframework.context.support.ResourceBundleMessageSource"</span>&gt;</span>\n        <span class="code-tag">&lt;<span class="code-name">property</span> <span class="hljs-attr">name</span>=<span\n                class="code-string">"basenames"</span>&gt;</span>\n            <span class="code-tag">&lt;<span class="code-name">list</span>&gt;</span>\n                <span class="code-tag">&lt;<span class="code-name">value</span>&gt;</span>i18n<span class="code-tag">&lt;/<span\n            class="code-name">value</span>&gt;</span>\n                <span class="code-tag">&lt;<span class="code-name">value</span>&gt;</span>extend<span class="code-tag">&lt;/<span\n            class="code-name">value</span>&gt;</span>\n            <span class="code-tag">&lt;/<span class="code-name">list</span>&gt;</span>\n        <span class="code-tag">&lt;/<span class="code-name">property</span>&gt;</span>\n    <span class="code-tag">&lt;/<span class="code-name">bean</span>&gt;</span>\n<span class="code-tag">&lt;/<span class="code-name">beans</span>&gt;</span></code></pre>\n<p>切记一定要标记<em>id=messageSource</em>。basenames这个Setter用于指定*.properties资源文件的名称，规则和前面介绍的ResourceBundle一样。然后就可以通过ApplicationContext::getMessage方法获取对应的资源了：\n</p>\n<pre><code class="java"><span class="code-meta">@Configuration</span>\n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n            class="code-title">I18nApp</span> </span>{\n\t<span class="code-meta">@Bean</span>(<span class="code-string">"messageSource"</span>)\n\t<span class="hljs-function">ResourceBundleMessageSource <span\n            class="code-title">resourceBundleMessageSource</span><span class="hljs-params">()</span> </span>{\n\t\tResourceBundleMessageSource messageSource = <span class="code-keyword">new</span> ResourceBundleMessageSource();\n\t\tmessageSource.setBasenames(<span class="code-keyword">new</span> String[] { <span\n            class="code-string">"i18n"</span>, <span class="code-string">"extend"</span> });\n\t\t<span class="code-keyword">return</span> messageSource;\n\t}\n\n\t<span class="hljs-function"><span class="code-keyword">public</span> <span class="code-keyword">static</span> <span\n            class="code-keyword">void</span> <span class="code-title">main</span><span class="hljs-params">(String[] args)</span> </span>{\n\t\tApplicationContext context = <span class="code-keyword">new</span> AnnotationConfigApplicationContext(I18nApp.class);\n\t\tSystem.out.println(<span class="code-string">"Spring Default 1:"</span> + context.getMessage(<span\n            class="code-string">"say"</span>, <span class="code-keyword">null</span>, Locale.getDefault()));\n\t\tSystem.out.println(<span class="code-string">"Spring Default 2:"</span> + context.getMessage(<span\n            class="code-string">"say"</span>, <span class="code-keyword">null</span>, <span\n            class="code-keyword">null</span>));\n\t\tSystem.out.println(<span class="code-string">"Spring Chinese:"</span> + context.getMessage(<span\n            class="code-string">"say"</span>, <span class="code-keyword">null</span>, Locale.SIMPLIFIED_CHINESE));\n\t\tSystem.out.println(<span class="code-string">"Spring Us English:"</span> + context.getMessage(<span\n            class="code-string">"say"</span>, <span class="code-keyword">null</span>, Locale.US));\n\t\tSystem.out.println(<span class="code-string">"Spring Custom:"</span> + context.getMessage(<span\n            class="code-string">"say"</span>, <span class="code-keyword">null</span>, <span\n            class="code-keyword">new</span> Locale(<span class="code-string">"web"</span>, <span class="code-string">"BASE64"</span>)));\n\t\tSystem.out.println(<span class="code-string">"Spring Argument:"</span> + context.getMessage(<span\n            class="code-string">"info"</span>, <span class="code-keyword">new</span> String[] {<span\n            class="code-string">"chkui"</span>},<span class="code-keyword">null</span>));\n\t\tSystem.out.println(<span class="code-string">"Spring Info:"</span> + context.getMessage(<span\n            class="code-string">"say"</span>, <span class="code-keyword">null</span>, <span\n            class="code-keyword">null</span>));\n\t}\n}</code></pre>\n\n<h2 id="h2-4">占位符替换</h2>\n<p>注意上面的示例代码的这一行：<em>context.getMessage("info", new String[] {"chkui"},null))，</em>这里的<em>getMessage</em>向方法传递了一个数组，他用于替换资源文件中的占位符号。在例子中我们除了i18n还加载了一个<em>extend.properties</em>文件，文件内容如下：\n</p>\n<pre><code class="ini"><span class="hljs-attr">info</span>={<span class="hljs-number">0</span>}帅的让人没脾气。</code></pre>\n<p>文件中的<em>{0}</em>表示这个位置用数组中的[0]位置的元素替换。</p>\n<p>还有一点需要注意的是，*.properties文件输入中文等UTF-8的符号时需要保留上面这种ACS的格式，现在大部分IDE都会自动处理的，切记不要为了方便看内容将*.properties的编码格式切换为UTF-8。</p>\n\n<h2 id="h2-5">获取MessageSource接口</h2>\n<p>我们有三种方式获取MessageSource接口：</p>\n<pre><code class="java"><span class="code-comment">//直接使用</span>\nApplicationContext context = <span class="code-keyword">new</span> AnnotationConfigApplicationContext(I18nApp.class);\ncontext.getMessage(<span class="code-string">"say"</span>, <span class="code-keyword">null</span>, Locale.getDefault()));\n\n<span class="code-comment">//MessageSourceAware（ApplicationContextAware）接口</span>\n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n            class="code-title">ExtendBean</span> <span class="code-keyword">implements</span> <span class="code-title">MessageSourceAware</span> </span>{\n\t<span class="code-meta">@Override</span>\n\t<span class="hljs-function"><span class="code-keyword">public</span> <span class="code-keyword">void</span> <span\n            class="code-title">setMessageSource</span><span\n            class="hljs-params">(MessageSource messageSource)</span> </span>{\n\t\t<span class="code-keyword">this</span>.setterMs = messageSource;\n\t}\n}\n\n<span class="code-comment">//从容器直接注入</span>\n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n            class="code-title">ExtendBean</span> <span class="code-keyword">implements</span> <span class="code-title">MessageSourceAware</span> </span>{\n\t<span class="code-meta">@Autowired</span>\n\t<span class="code-keyword">private</span> MessageSource autowiredMs;\n}</code></pre>\n<p>需要注意的是，使用@Autowired等方式直接获取MessageSource类型的数据得到的是添加到容器的那个Bean，而其他方式获取到的是ApplicationContext。</p>'}};