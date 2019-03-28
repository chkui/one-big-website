exports.ids=[29],exports.modules={350:function(s,a,n){"use strict";Object.defineProperty(a,"__esModule",{value:!0});a.content='<h2 id="h2-1">Resource——资源</h2>\n<p>对于一个联机事务型系统（业务系统）来说，所依赖的外部运行信息主要有2个来源：<strong>数据项</strong>和<strong>资源项</strong>。数据项的存放位置通常是使用各种关系性或NoSql数据库，而资源项通常是使用文件、网络信息的方式来存储。\n</p>\n<p>早在JDK1.0的时代Java就已经提供了本地资源和网络资源的读取功能——<strong>java.net.URL</strong>。他可以同时管理本地资源（操作系统资源）以及网络资源，如下面这个例子：</p>\n<p>（文中的代码仅仅用于说明问题，源码请到<a href="https://gitee.com/chkui-com/spring-core-sample" rel="nofollow">案例gitee库下载</a>，对应的代码在包<em>chkui.springcore.example.hybrid.resource</em>中。）\n</p>\n<pre><code class="java"><span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n\t\tclass="code-title">ResourceApp</span> </span>{\n\t<span class="hljs-function"><span class="code-keyword">public</span> <span class="code-keyword">static</span> <span\n\t\t\tclass="code-keyword">void</span> <span class="code-title">main</span><span class="hljs-params">(String[] args)</span> <span\n\t\t\tclass="code-keyword">throws</span> MalformedURLException </span>{\n\t\t<span class="code-comment">//读取本地资源</span>\n\t\tURL url = ResourceApp.class.getResource(<span class="code-string">"/extend.properties"</span>);\n\t\tprint(url);\n\t\t<span class="code-comment">//读取互联网资源</span>\n\t\turl = <span class="code-keyword">new</span> URL(<span class="code-string">"http"</span>, <span\n\t\t\tclass="code-string">"www.baidu.com"</span>, <span class="hljs-number">80</span>, <span class="code-string">""</span>);\n\t\tprint(url);\n\t\turl = <span class="code-keyword">new</span> URL(<span class="code-string">"https"</span>, <span\n\t\t\tclass="code-string">"www.chkui.com"</span>, <span class="hljs-number">443</span>, <span class="code-string">"/174870bb04.js"</span>);\n\t\tprint(url);\n\t}\n}\n<span class="code-comment">// 输出</span>\n<span class="code-comment">// file:/work/chkui/spring-core-sample/bin/main/extend.properties</span>\n<span class="code-comment">// http://www.baidu.com:80</span>\n<span class="code-comment">// https://www.chkui.com:443/174870bb04.js</span></code></pre>\n<p>\n\t对于每一个类来说getResource方法可以获取当前类所在的系统路径（getResource("")），以及classpath的路径（getResource("/")），利用这个功能我们可以获取操作系统上所知的任何资源。除了本地文件，URL也可以通过域名规则来获取网络上的资源。</p>\n<p>注意输出内容中的开头<strong><em>file:</em></strong> 、<strong><em>http:</em></strong>以及<strong><em>https:</em></strong>，他们表示资源的协议，除了以上这三者，还有<strong><em>ftp:、mailto:</em></strong>等协议。关于URL的详细解释可以看<a\n\t\thref="http://www.ietf.org/rfc/rfc2396.txt" rel="nofollow">ITEF标准</a>。</p>\n<p>URL指向某一个资源之后，可以使用URL::openStream或URL::getFile等方法进一步获取文件中的内容：</p>\n<pre><code class="java"><span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n\t\tclass="code-title">ResourceApp</span> </span>{\n\t<span class="hljs-function"><span class="code-keyword">public</span> <span class="code-keyword">static</span> <span\n\t\t\tclass="code-keyword">void</span> <span class="code-title">main</span><span class="hljs-params">(String[] args)</span> <span\n\t\t\tclass="code-keyword">throws</span> MalformedURLException </span>{\n\t\tUrl url = <span class="code-keyword">new</span> URL(<span class="code-string">"https"</span>, <span\n\t\t\tclass="code-string">"www.chkui.com"</span>, <span class="hljs-number">443</span>, <span class="code-string">"/174870bb04.js"</span>);\n\t\t<span class="code-keyword">try</span>(InputStream is = url.openStream()){\n\t\t\t<span class="code-keyword">byte</span>[] buffer = <span class="code-keyword">new</span> <span\n\t\t\tclass="code-keyword">byte</span>[<span class="hljs-number">1024</span>*<span class="hljs-number">1024</span>];\n\t\t\tis.read(buffer);\n\t\t\tString content = <span class="code-keyword">new</span> String(buffer, Charset.forName(<span\n\t\t\tclass="code-string">"UTF-8"</span>));\n\t\t\tprint(<span class="code-string">"Content :"</span>, content);\n\t\t} <span class="code-keyword">catch</span> (IOException e) {\n\t\t}\n\t}\n}</code></pre>\n\n<h2 id="h2-2">Spring中的资源管理</h2>\n<p>Spring的资源管理在JDK的基础功能上进行了强大的扩展，即使你不用Spring的整个生态或者容器，你也可以将其资源管理作为一个工具整合到自己的系统中而提高效率。它扩展了以下内容：</p>\n<ol>\n\t<li>\n\t\t隐藏底层实现。对于各种各样的资源Spring都使用了不同的实现类来管理，但是他利用适配器模式让使用者仅仅需要了解<strong><em>org.springframework.core.io.Resource</em></strong>接口即可。\n\t</li>\n\t<li>新增资源存在判断、资源操作权限相关的功能，相对于<em>java.net.URL</em>资源不存在则设置为null更友好。</li>\n\t<li>支持通配符来获取资源，例如 ：<em>classpath:a/b/**/applicationContext-*.xml。</em></li>\n</ol>\n\n<h2 id="h2-3">协议与路径</h2>\n<p>在前面的内容中就提到了多个协议，spring的资源管理功能除了标准的协议，还增加了一个——<strong><em>classpath:</em></strong>协议，他表示从当前的classpath根路径开始获取资源。对于Spring的资源管理功能而言，主要有以下几种协议：\n</p>\n<table border="1" cellpadding="1" cellspacing="1" style="width:500px">\n\t<tbody>\n\t<tr>\n\t\t<th>协议&nbsp;</th>\n\t\t<th>例子</th>\n\t\t<th>说明</th>\n\t</tr>\n\t</tbody>\n\t<tbody>\n\t<tr>\n\t\t<td>classpath:</td>\n\t\t<td>classpath:res/extend.properties</td>\n\t\t<td>从当前jvm的classpath根路径开始获取资源。</td>\n\t</tr>\n\t<tr>\n\t\t<td>file:</td>\n\t\t<td>file:///tmp/myfile.data</td>\n\t\t<td>从操作系统(文件路径)的路径获取资源。</td>\n\t</tr>\n\t<tr>\n\t\t<td>http(s):</td>\n\t\t<td>http(s)://www.chkui.com/</td>\n\t\t<td>从互联网获取资源。</td>\n\t</tr>\n\t<tr>\n\t\t<td>(无标记)</td>\n\t\t<td>/data/extend.data</td>\n\t\t<td>根据应用上下文获取资源。</td>\n\t</tr>\n\t</tbody>\n</table>\n<p><strong><em>classpath:</em></strong>、<strong><em>file:</em></strong>、<strong><em>http(s):</em></strong>这三个协议都很明确的指明了获取资源的路径，但是没有声明协议的情况就比较特殊，他需要根据上下文来判定适用的路径。\n</p>\n<p>在<a href="https://www.chkui.com/article/spring/spring_core_context_and_ioc" title="上下文与IoC">上下文与IoC</a>这篇文章中已经介绍过，经过层层继承和实现，Spring提供容器实现功能的主要是<strong><em>ClassPathXmlApplicationContext</em></strong>和<strong><em>FileSystemXmlApplicationContext</em></strong>两个类，这两个Context本质上都是实现了相同的Context功能，最明显的区别之一就是加载文件的路径不同。比如下面的情况：\n</p>\n<pre><code class="java">ApplicationContext ctx = <span\n\t\tclass="code-keyword">new</span> ClassPathXmlApplicationContext(<span class="code-string">"config/ctx.xml"</span>);</code></pre>\n<p>ClassPathXmlApplicationContext默认启用的是<em>ClassPathResource</em>来管理资源，所以上面的路径配置相当于"classpath:config/ctx.xml"。但是如果修改为以下形式：\n</p>\n<pre><code class="java">ApplicationContext ctx = <span\n\t\tclass="code-keyword">new</span> ClassPathXmlApplicationContext(<span class="code-string">"file:///config/ctx.xml"</span>);</code></pre>\n<p>通过协议明确告知路径规则，那么在<em>ApplicationContext</em>会使用对应的<em>FileSystemResource</em>来加载管理资源。</p>\n<p>而<strong><em>FileSystemXmlApplicationContext</em></strong>与<strong><em>ClassPathXmlApplicationContext</em></strong>相互对应——默认使用的<em>FileSystemResource</em>，可以通过声明协议来指定对应的资源加载类。\n</p>\n<p>上面的内容提到了<em>ClassPathResource和FileSystemResource。</em>Spring为不同类型、协议的资源指定了各种各种的<strong><em>org.springframework.core.io.Resource</em></strong>实现类，主要有&nbsp;<em>UrlResource、ClassPathResource、FileSystemResource、ServletContextResource、InputStreamResource、ByteArrayResource</em>。从字面上看大概能了解对应的功能。在使用的时候我们并不需要了解他们的具体实现，只要知道不同的协议对应的资源路径即可。\n</p>\n\n<h2 id="h2-4">获取资源的方法</h2>\n\n<h3 id="h3-1">直接使用ApplicationContext</h3>\n<p>\n\t在明确所支持的协议之后，我们就可以用ResourcePatternResolver::getResources方法来获取资源。ApplicationContext继承了ResourcePatternResolver接口，所以我们通常使用以下方法获取资源：</p>\n<pre><code class="java"><span class="code-keyword">package</span> chkui.springcore.example.resource;\n\n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n\t\t\tclass="code-title">ResourceApp</span> </span>{\n\t<span class="hljs-function"><span class="code-keyword">public</span> <span class="code-keyword">static</span> <span\n\t\t\tclass="code-keyword">void</span> <span class="code-title">main</span><span class="hljs-params">(String[] args)</span></span>{\n\t\tApplicationContext ctx = <span class="code-keyword">new</span> AnnotationConfigApplicationContext(ResourceApp.class);\n\t\tResource res = ctx.getResource(<span class="code-string">"classpath:extend.properties"</span>);\n\t\tprint(<span class="code-string">"Resource :"</span>, res);\n\t\tres = ctx.getResource(<span class="code-string">"https://www.chkui.com"</span>);\n\t\tprint(<span class="code-string">"Resource :"</span>, res);\n\t}\n}</code></pre>\n\n<h3 id="h3-2">ResourceLoaderAware注入</h3>\n<p>除了直接使用ApplicationContext，还可以通过继承ResourceLoaderAware的方式来获取资源加载接口：</p>\n<pre><code class="java"><span class="code-keyword">package</span> chkui.springcore.example.resource;\n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n\t\t\tclass="code-title">LoadResourceBean</span> <span class="code-keyword">implements</span> <span\n\t\t\tclass="code-title">ResourceLoaderAware</span></span>{\n\n\t<span class="code-meta">@Override</span>\n\t<span class="hljs-function"><span class="code-keyword">public</span> <span class="code-keyword">void</span> <span\n\t\t\tclass="code-title">setResourceLoader</span><span class="hljs-params">(ResourceLoader resourceLoader)</span> </span>{\n\t\tResource res = resourceLoader.getResource(<span class="code-string">"classpath:extend.properties"</span>);\n\t\tSystem.out.println(<span class="code-string">"Bean load Resource :"</span> + res);\n\t}\n}\n</code></pre>\n<p>\n\t实际上这里传入进来的ResourceLoader就是ApplicationContext，所以用ApplicationContextAware也可以实现对应的功能。但是为了明确功能的用途，这里最好还是实现ResourceLoaderAware比较合理。</p>\n\n<h3 id="h3-3">Autowired注入</h3>\n<p>在2.5.x之后，spring可以使用<a href="https://www.chkui.com/article/spring/spring_core_auto_inject_of_annotation"\n\t\t\t\t\t\t title="注解自动装载">@Autowired注解</a>引入ResourceLoader（ApplicationContext）：</p>\n<pre><code class="java"><span class="code-keyword">package</span> chkui.springcore.example.resource;\n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n\t\t\tclass="code-title">LoadResourceBean</span> <span class="code-keyword">implements</span> <span\n\t\t\tclass="code-title">ResourceLoaderAware</span></span>{\n\t<span class="code-meta">@Autowired</span>\n\tResourceLoader resourceLoader;\n\n\t<span class="code-meta">@Override</span>\n\t<span class="hljs-function"><span class="code-keyword">public</span> <span class="code-keyword">void</span> <span\n\t\t\tclass="code-title">setResourceLoader</span><span class="hljs-params">(ResourceLoader resourceLoader)</span> </span>{\n\t\tSystem.out.println(<span class="code-string">"Is ApplicationContext? "</span> + (<span\n\t\t\tclass="code-keyword">this</span>.resourceLoader == resourceLoader));\n\t\tResource res = <span class="code-keyword">this</span>.resourceLoader.getResource(<span class="code-string">"classpath:extend.properties"</span>);\n\t\tSystem.out.println(<span class="code-string">"Bean load Resource :"</span> + res);\n\t}\n}</code></pre>\n<p>和普通的Bean一样，还可以通过构造方法和setter方法注入ResourceLoader。</p>\n\n<h3 id="h3-4">XML配置获取资源</h3>\n<p>我们可以直接在XML中指定资源路径，然后在setter或构造方法中获取到对应的资源，看下面的例子。</p>\n<p>XMLConfigBean的Set方法直接获取一个<em>Resource</em>：</p>\n<pre><code class="java"><span class="code-keyword">package</span> chkui.springcore.example.hybrid.resource;\n\n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n\t\t\tclass="code-title">XMLConfigBean</span> </span>{\n\t<span class="hljs-function"><span class="code-keyword">public</span> <span class="code-keyword">void</span> <span\n\t\t\tclass="code-title">setResource</span><span class="hljs-params">(Resource res)</span> <span\n\t\t\tclass="code-keyword">throws</span> IOException </span>{\n\t\tSystem.out.println(<span class="code-string">"XML load Resource :"</span> + res);\n\t\tProperties p = <span class="code-keyword">new</span> Properties();\n\t\tp.load(res.getInputStream());\n\t\tSystem.out.println(<span class="code-string">"Properties Info: "</span> + p.getProperty(<span\n\t\t\tclass="code-string">"info"</span>));\n\t}\n}</code></pre>\n<p>我们只需要在XML配置文件中指定资源路径位置，Spring会自动帮我们完成转换：</p>\n<pre><code class="xml"><span class="code-tag">&lt;<span class="code-name">beans</span>&gt;</span>\n\t<span class="code-tag">&lt;<span class="code-name">bean</span> <span class="hljs-attr">class</span>=<span\n\t\t\tclass="code-string">"chkui.springcore.example.hybrid.resource.XMLConfigBean"</span>&gt;</span>\n\t\t<span class="code-tag">&lt;<span class="code-name">property</span> <span class="hljs-attr">name</span>=<span\n\t\t\t\tclass="code-string">"resource"</span> <span class="hljs-attr">value</span>=<span class="code-string">"classpath:extend.properties"</span>/&gt;</span>\n\t<span class="code-tag">&lt;/<span class="code-name">bean</span>&gt;</span>\n<span class="code-tag">&lt;/<span class="code-name">beans</span>&gt;</span></code></pre>\n<p>在XMLConfigBean::setResource方法中我们拿到的是"classpath:extend.properties"这一项资源。</p>\n\n<h2 id="h2-5">通配符指定资源</h2>\n<p>除了使用指定固定路径的方式获取一项资源，我们还可以使用"?"、"*"等通配符使用匹配规则来获取资源，例如：</p>\n<pre><code class="java">Resource[] resList = ctx.getResources(<span\n\t\tclass="code-string">"classpath:hybrid/**/*.xml"</span>);</code></pre>\n<p>Spring官网将这种资源匹配规则称为“Ant-style匹配”，虽然并不知道源自什么地方（应该是源自<em>Apache Ant</em>项目，但是我在Ant项目文档中还没看到对应的说明，心细致的码友可以再找找），但是Spring官方文档对其有详细的说明，详见<a\n\t\thref="https://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/util/AntPathMatcher.html"\n\t\trel="nofollow">AntPathMatcher的说明</a>。Ant-style的匹配规则大致如下：</p>\n<ol>\n\t<li>"?"：匹配一个字符。例如<em>"classpath:conf?g.xml"</em>匹配<em>"classpath:config.xml"</em>也匹配<em>"classpath:conf1g.xml"</em>但是不匹配<em>"classpath:conf12g.xml"</em>。\n\t</li>\n\t<li>"*"：匹配0到多个字符。例如<em>"classpath:*.xml"匹配classpath根目录下所有.xml文件。而"classpath:config/*.xml"匹配config文件夹中所有.xml文件。</em>\n\t</li>\n\t<li><em>"**"：匹配0到多个目录。例如"classpath:**/*.xml"匹配整个classpath下所有*.xml文件。"</em><em>classpath:config/**/*.xml"匹配config文件夹以及所有子文件夹的.xml文件。</em>\n\t</li>\n\t<li>{arg1:{a-z}+}：匹配任意多个a-z的字符，并将匹配到的内容赋值到变了arg1中。该条规则实用于<a\n\t\t\thref="https://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/util/AntPathMatcher.html"\n\t\t\trel="nofollow">AntPathMatcher</a>，当无法在ApplicationContext的资源匹配规则中使用。\n\t</li>\n</ol>\n\n<h3 id="h3-5">classpath*:扩展</h3>\n<p>在通配符的基础上，spring扩展了一个<strong><em>classpath*:</em></strong>协议。</p>\n<p>\n\t对于一个运行的Jvm来说，classpath的“根目录”一般有多个。比如在当前开发的工程有一个包含main方法的类文件——chkui/example/spinrg/app.class，此时引入一个jar包也包含一个一样的类文件chkui/example/spring/app.class（有空的码友可以自己试试Jvm到底运行哪个）。这种情况对于Jvm来说就引出"多个classpath"和"首选classpath"的概念，而classpath:和classpath*的差异就是，前者从首选classpath中优先获取资源，而后者会从所有classpath中寻找资源。而首先classpath一般是我们当前工程的编译文件（案例代码在<em>[project-root]/bin/main</em>）。\n</p>\n<p>其实在Jvm的资源加载方式上已经对<em><strong>classpath:</strong></em>和<strong><em>classpath*:</em></strong>提供了不同的实现，但是理解起来比较“绕”。一般情况下我们使用Class::getResource都是获取首选classpath路径下的资源，而使用ClassLoader::getResources(classPath)可以获取所有classpath下的资源。\n</p>\n<p>下面的代码展示了这个过程，案例代码在<a\n\t\thref="https://gitee.com/chkui-com/spring-core-sample/blob/master/src/main/java/chkui/springcore/example/hybrid/resource/ResourceApp.java"\n\t\trel="nofollow">chkui.springcore.example.hybrid.resource.ResourceApp::multiResourceLoad</a>方法中。</p>\n<p>为了演示这个过程我们引入了Google的Guava包（因为整个工程都没用到guava的内容，所以修改他的类不会产生影响），然后对应的在自己的工程中增加一个Guava包中相同的package和类：</p>\n<pre><code class="java"><span class="code-keyword">package</span> com.google.common.base;\n<span class="code-keyword">public</span> <span class="code-keyword">final</span> <span class="hljs-class"><span\n\t\t\tclass="code-keyword">class</span> <span class="code-title">Preconditions</span> </span>{}</code></pre>\n<p>在编译之后，会在bin文件夹（如果是maven就是/target）中产生一个main/com/google/common/base/Preconditions.class文件。然后通过下面的代码测试资源加载：</p>\n<pre><code class="java"><span class="hljs-function"><span class="code-keyword">public</span> <span class="code-keyword">static</span> <span\n\t\tclass="code-keyword">void</span> <span class="code-title">multiResourceLoad</span><span\n\t\tclass="hljs-params">()</span> <span class="code-keyword">throws</span> IOException </span>{\n\t\t<span class="code-keyword">final</span> String classPath = <span class="code-string">"com/google/common/base/Preconditions.class"</span>;\n\n\t\t<span class="code-comment">//class.getResource需要使用"/"表示root路径</span>\n        <span class="code-comment">//首选路径的资源</span>\n\t\tprint(<span class="code-string">"classpath: "</span>, ResourceApp.class.getResource(<span class="code-string">"/"</span> + classPath));\n\t\t<span class="code-comment">//Verify没有被覆盖，输出Jar包中的内容,注意jar:file: 协议的格式</span>\n\t\tprint(<span class="code-string">"In Jar classpath: "</span>, ResourceApp.class.getResource(<span\n\t\t\tclass="code-string">"/"</span> + unMultiClassPath));\n\n\t\t<span class="code-comment">//ClassLoader::getResource获取首选路径资源</span>\n\t\tprint(<span class="code-string">"First classpath: "</span>, Verify.class.getClassLoader().getResource(classPath));\n\t\t<span class="code-comment">//ClassLoader::getResources获取所有资源</span>\n\t\tEnumeration&lt;URL&gt; e = ResourceApp.class.getClassLoader().getResources(classPath);\n\t\t<span class="code-keyword">int</span> count = <span class="hljs-number">1</span>;\n\t\t<span class="code-keyword">while</span> (e.hasMoreElements()) {\n\t\t\tURL url = e.nextElement();\n\t\t\tprint(<span class="code-string">"classpath*["</span>, count++ ,<span class="code-string">"]:"</span>, url);\n\t\t}\n\t}</code></pre>\n<p>\n\t运行之后，只有在最后的迭代器中输出了Guava包中的Preconditions.class的路径，而其余位置都输出的是我自行创建的Preconditions.class，也就是首选classpath下的Preconditions.class，首选的资源也就是ClassLoader::getResources获取的迭代器的第一个值。</p>\n<p>Spring的<strong><em>classpath*:</em></strong>协议实际上底层也是用<em>ClassLoader::getResources</em>的方式实现的，不过扩展了支持通配符并将资源转换为org.springframework.core.io.Resource。上面用JDK演示的代码用spring的资源管理实现为下面的形式：\n</p>\n<pre><code class="java"><span class="hljs-function"><span class="code-keyword">public</span> <span class="code-keyword">static</span> <span\n\t\tclass="code-keyword">void</span> <span class="code-title">multiResourceLoad</span><span class="hljs-params">(ApplicationContext ctx)</span></span>{\n    ApplicationContext ctx = <span class="code-keyword">new</span> AnnotationConfigApplicationContext();\n    <span class="code-keyword">final</span> String classPath = <span class="code-string">"com/google/common/base/Preconditions.class"</span>;\n    <span class="code-keyword">final</span> String unMultiClassPath = <span class="code-string">"com/google/common/base/Verify.class"</span>;\n    print(<span class="code-string">"classpath: "</span>, Arrays.asList(ctx.getResources(<span class="code-string">"classpath:"</span> + classPath)));\n    print(<span class="code-string">"classpath*: "</span>, Arrays.asList(ctx.getResources(<span class="code-string">"classpath*:"</span> + classPath)));\n    print(<span class="code-string">"unmulti-classpath*: "</span>, Arrays.asList(ctx.getResources(<span\n\t\t\tclass="code-string">"classpath*:"</span> + unMultiClassPath)));\n}</code></pre>\n\n<h2 id="h2-6">Spring中的各项资源</h2>\n<p>\n\t不仅仅是ApplicationContext::getResources方法，实际上Spring中绝大部分外部资源加载都是通过前面介绍的规则使用同一个工具类完成的，所以我们可以在许多地方使用对应的"协议"来管理我们的资源，比如下面的例子：</p>\n<pre><code class="java"><span class="code-meta">@ImportResource</span>(<span class="code-string">"classpath:hybrid/resource/config-*.xml"</span>)\n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n\t\t\tclass="code-title">ResourceApp</span> </span>{}</code></pre>'}};