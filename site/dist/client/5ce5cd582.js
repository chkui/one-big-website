webpackJsonp([5],{323:function(s,n,a){"use strict";Object.defineProperty(n,"__esModule",{value:!0});n.content='<p>本文将一点一滴的累计记录Java中的一些细节知识。不只是加以说明，而是所有的细节都找到来源，以官方文档、知名社区的介绍为主。</p>\n<h2 id="h2-1"><strong>StringTokenizer和String.split</strong></h2>\n<pre class="gradle"><code class="gradle">&nbsp;&nbsp;&nbsp;&nbsp;<span class="code-comment"><span class="code-comment">//Use&nbsp;StringTokenizer&nbsp;</span></span>\n&nbsp;&nbsp;&nbsp;&nbsp;StringTokenizer&nbsp;st&nbsp;=&nbsp;<span class="code-keyword"><span\n            class="code-keyword">new</span></span>&nbsp;StringTokenizer(<span class="code-string"><span\n            class="code-string">"this&nbsp;is&nbsp;a&nbsp;test"</span></span>);\n&nbsp;&nbsp;&nbsp;&nbsp;<span class="code-keyword"><span class="code-keyword">while</span></span>&nbsp;(st.hasMoreTokens())&nbsp;{\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.<span class="code-keyword"><span\n            class="code-keyword">println</span></span>(st.nextToken());\n&nbsp;&nbsp;&nbsp;&nbsp;}</code></pre>\n<pre class="javascript"><code class="javascript">&nbsp;&nbsp;&nbsp;&nbsp;<span class="code-comment"><span\n        class="code-comment">//Use&nbsp;split</span></span>\n&nbsp;&nbsp;&nbsp;&nbsp;<span class="code-built_in"><span class="code-built_in">String</span></span>[]&nbsp;results&nbsp;=&nbsp;<span\n            class="code-string"><span class="code-string">"this&nbsp;is&nbsp;a&nbsp;test"</span></span>.split(<span\n            class="code-string"><span class="code-string">"\\\\s"</span></span>);\n&nbsp;&nbsp;&nbsp;&nbsp;<span class="code-keyword"><span class="code-keyword">for</span></span>&nbsp;(<span\n            class="code-built_in"><span class="code-built_in">String</span></span>&nbsp;result：results){\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.println(result);\n&nbsp;&nbsp;&nbsp;&nbsp;}</code></pre>\n<p></p>\n<p>关于StringTokenizer和String.split的差异说法很多。官方文档<a\n        href="http://docs.oracle.com/javase/6/docs/api/java/util/StringTokenizer.html有定型说明：" rel="nofollow">http://docs.oracle.com/javase/6/docs/api/java/util/StringTokenizer.html</a>&nbsp;有定性说明（附注：最新的JDK8\n    API文档中也是相同的说明）。</p>\n<blockquote>\n    <p><span style="font-size:11px"><span style="font-family:微软雅黑,microsoft yahei">StringTokenizer</span><span\n            style="background-color:rgb(255, 255, 255); font-family:微软雅黑,microsoft yahei">&nbsp;is a legacy class that is retained for compatibility reasons although its use is discouraged in new code. It is recommended that anyone seeking this functionality use the&nbsp;</span><span\n            style="font-family:微软雅黑,microsoft yahei">split</span><span\n            style="background-color:rgb(255, 255, 255); font-family:微软雅黑,microsoft yahei">&nbsp;method of&nbsp;</span><span\n            style="font-family:微软雅黑,microsoft yahei">String</span><span\n            style="background-color:rgb(255, 255, 255); font-family:微软雅黑,microsoft yahei">&nbsp;or the java.util.regex package instead.</span></span>\n    </p>\n</blockquote>\n<p>大意是StringTokenizer是一个历史遗留类，为了保证向后兼容性而保留这个类。推荐在新的代码中使用split或regex替换。</p>\n<p>至于网上的测评资料说<strong>StringTokenizer比<strong>String.split</strong></strong>效率更高，由于没有亲测就不妄加评论了。作为项目管理者，从风险和可靠性的角度考虑，在项目规范和代码review的过程中，还是以官方文档为准。\n</p>\n<h2 id="h2-2"><strong>transient和volatile关键词的使用</strong></h2>\n<pre class="java"><code class="java"><span class="code-keyword"><span class="code-keyword">transient</span></span>&nbsp;<span\n        class="code-keyword"><span class="code-keyword">volatile</span></span>&nbsp;Set&lt;K&gt;&nbsp;keySet&nbsp;=&nbsp;<span\n        class="code-keyword"><span class="code-keyword">null</span></span>;\n<span class="code-keyword"><span class="code-keyword">transient</span></span>&nbsp;<span class="code-keyword"><span\n            class="code-keyword">volatile</span></span>&nbsp;Collection&lt;V&gt;&nbsp;values&nbsp;=&nbsp;<span\n            class="code-keyword"><span class="code-keyword">null</span></span>;</code></pre>\n<p>transient是变量修饰符，表明该字段不是对象持久状态的一部分，储存的时候不用储存，比如序列化这个对象时，该字段是不会储存的。<br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;volatile也是变量修饰符，只能用来修饰变量。volatile修饰的成员变量在每次被线程访问时，都强迫从共享内存中重读该成员变量的值。&nbsp;而且，当成员变量发生变化时，强迫线程将变化值回写到共享内存。这样在任何时刻，两个不同的线程总是看到某个成员变量的同一个值。<br>\n    在此解释一下Java的内存机制：<br>\n    Java使用一个主内存来保存变量当前值，而每个线程则有其独立的工作内存。线程访问变量的时候会将变量的值拷贝到自己的工作内存中，这样，当线程对自己工作内存中的变量进行操作之后，就造成了工作内存中的变量拷贝的值与主内存中的变量值不同。<br>\n    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Java语言规范中指出：为了获得最佳速度，允许线程保存共享成员变量的私有拷贝，而且只当线程进入或者离开同步代码块时才与共享成员变量的原始值对比。这样当多个线程同时与某个对象交互时，就必须要注意到要让线程及时地得到共享成员变量的变化。而volatile关键字就是提示VM：对于这个成员变量不能保存它的私有拷贝，而应直接与共享成员变量交互。<br>\n    使用建议：在两个或者更多的线程访问的成员变量上使用volatile。当要访问的变量已在synchronized代码块中，或者为常量时，不必使用。由于使用volatile屏蔽掉了VM中必要的代码优化，所以在效率上比较低，因此一定在必要时才使用此关键字。\n</p>'},329:function(s,n,a){"use strict";Object.defineProperty(n,"__esModule",{value:!0});n.content='<h2 id="h2-1">安装</h2>\n\n<h3 id="h3-1">安装SDKMAN</h3>\n<p>Gradle在安装之前可以选择很多安装方式，这里选择SDKMAN。其他方式见<a href="https://gradle.org/install/#install" rel="nofollow">安装说明</a>。</p>\n<p>linux安装SDKMAN，分别执行：</p>\n<pre><code class="bash"><span class="code-comment"># 下载安装执行</span>\n$ curl -s <span class="code-string">"https://get.sdkman.io"</span> | bash\n<span class="code-comment"># 自行设置</span>\n$ <span class="code-built_in">source</span> <span class="code-string">"<span class="code-variable">$HOME</span>/.sdkman/bin/sdkman-init.sh"</span></code></pre>\n<p>安装结果测试。</p>\n<p>输入：</p>\n<pre><code class="bash">$ sdk version </code></pre>\n<p>成功安装会输出：</p>\n<pre><code class="bash">==== BROADCAST =================================================================\n* 02/07/18: Kscript 2.4.5 released on SDKMAN! <span class="code-comment">#kscript</span>\n* 28/06/18: Micronaut 1.0.0.M2 released on SDKMAN! <span class="code-comment">#micronautfw</span>\n* 27/06/18: Infrastructor 0.2.0 rolling out. With stronger encryption and new task progress UI.\n================================================================================\n\nSDKMAN 5.6.4+305</code></pre>\n\n<h3 id="h3-2">安装Gradle</h3>\n<p>Gradle需要JDK7以上才能运行，请先使用 <strong><em>java -version</em></strong> 命令确定环境。&nbsp;</p>\n<p>使用SDKMAN安装Gradle：</p>\n<pre><code class="bash"><span class="code-comment"># 4.8.1是当前gradle的版本，根据需要调整</span>\n$ sdk install gradle 4.8.1</code></pre>\n<p>安装完成后输入gradle -v检查安装结果：</p>\n<pre><code class="bash">$ gradle -v\n------------------------------------------------------------\nGradle 4.8.1\n------------------------------------------------------------</code></pre>\n\n<h3 id="h3-3">Gradle基础要点知识</h3>\n<ul>\n    <li>一个Gradle文件（例如build.gradle）视为一个project。在Gradle的项目组织中就2个层级——Project和Task。</li>\n    <li>在Gradle中有3个重要的概念Project、Plug、Task。三者的关系：Project就是一个容器，里面可以放置各种类型的Task，Plug是一堆Task的集合。</li>\n    <li>Gradle中所有的功能都是以一个Task实现的，包括Jar包的依赖。</li>\n    <li>Properties：Project和Task都有自己的属性（Properties）。Project级别的属性可以设置，也可以通过外部传入。</li>\n</ul>\n\n<h3 id="h3-4">一个配置案例</h3>\n<pre><code class="groovy cs"><span class="code-comment">/**\nbuild.gradle\n这是一个使用 gradle init --type java-application创建的Gradle Project，进行了一些修改\n整个文件的范围都是一个Project。\n**/</span>\n<span class="code-comment">// ---------------------------------------------------------------------</span>\n<span class="code-comment">// 引入预设的Plug</span>\n<span class="code-comment">// 一个plug中会包含多个Task</span>\n<span class="code-comment">// plugins是Project的一个方法</span>\n<span class="code-comment">// 里面的id实际上也是一个方法。</span>\nplugins {\n    id <span class="code-string">\'java\'</span>\n    id <span class="code-string">\'application\'</span>\n}\n\n<span class="code-comment">// 资源路径的设置参数。用于java plug中的task</span>\n<span class="code-comment">// Gradle的资源路径和Maven的几乎一样，也可以单独配置</span>\nsourceSets {\n   main {\n      java {\n         srcDir <span class="code-string">\'src/main/java\'</span>\n      }\n      resources {\n         srcDir <span class="code-string">\'src/main/resources\'</span>\n      }\n   }\n}\n<span class="code-comment">//-----------------------------------</span>\n<span class="code-comment">/**\n如果不设置，资源路径默认为：\nsrc {\n   main{\n      java\n      res\n   }\n   test{\n      java\n      res\n   }\n}\n**/</span>\n<span class="code-comment">//-----------------------------------</span>\n\n<span class="code-comment">// mainClassName可以理解为一个变量</span>\n<span class="code-comment">// 定义这个程序的Main Class，实际上这也是在设定一个Project的属性</span>\nmainClassName = <span class="code-string">\'App\'</span>\n\n<span class="code-comment">//预设一个用于装载结构的类，Gradle使用groovy语法</span>\n<span class="code-keyword">class</span> <span class="code-title">GroupAndVersion</span> {\n\tString <span class="code-keyword">group</span>\n\tString version\n}\n\n<span class="code-comment">// 向project添加一个名为“spring”的属性，属性的值是一个GroupAndVersion的一个实例。</span>\n<span class="code-comment">// ext是Project的一个方法，作用就是添加一个属性。</span>\next {\n\tspring = <span class="code-keyword">new</span> GroupAndVersion(<span class="code-keyword">group</span>:<span\n            class="code-string">\'org.springframework\'</span>, version:<span class="code-string">\'5.0.7.RELEASE\'</span>)\n}\n\n<span class="code-comment">// dependencies 是由某个plug中的预设的“方法”，</span>\n<span class="code-comment">// Gradle是groovy语法，这里就是执行Project.dependencies方法</span>\n<span class="code-comment">// Plug中可以用project.extensions.create扩展Project中的定义方法</span>\ndependencies {\n    <span class="code-comment">//compile表示引入包的执行域</span>\n    compile <span class="code-string">\'com.google.guava:guava:23.0\'</span>\n\n    <span class="code-comment">//使用定义好的属性引入包</span>\n\tcompile <span class="code-keyword">group</span>: spring.<span class="code-keyword">group</span>, name: <span\n            class="code-string">\'spring-core\'</span>, version: spring.version\n\tcompile <span class="code-keyword">group</span>: spring.<span class="code-keyword">group</span>, name: <span\n            class="code-string">\'spring-beans\'</span>, version: spring.version\n\tcompile <span class="code-keyword">group</span>: spring.<span class="code-keyword">group</span>, name: <span\n            class="code-string">\'spring-context\'</span>, version: spring.version\n\n    testCompile <span class="code-string">\'junit:junit:4.12\'</span>\n}\n\n<span class="code-comment">// repositories与dependencies一样的性质，同样会被用于某个task</span>\n<span class="code-comment">// repositories用于指定依赖仓库</span>\nrepositories {\n    jcenter()\n}\n\n<span class="code-comment">// 自定义的一个任务，用于呈现当前依赖包的物理地址</span>\ntask show &lt;&lt; {\n\tprintln configurations.compile.asPath\n}</code></pre>\n<p>配置文件对应的工程结构：</p>\n<pre><code class="bash">project\n--bin IDE动态编译的文件（Eclipse）\n----main\n----<span class="code-built_in">test</span>\n--build 运行gradle build命令生成的文件\n---- classes Java 工程目录对应的.class文件\n---- distributions 打包之后的压缩包\n---- lib 打包之后的jar\n---- report 测试报告\n---- scripts 打包之后的启动脚本\n---- <span class="code-built_in">test</span>-result 测试结果\n---- tmp 临时文件，比如会在打包jar之前临时存放MANIFEST.MF\n--gradle gradle执行相关的文件，比如gradle-wrapper\n--src 源码和资源\n----main\n----text\n--build.gradle\n--gradlew\n--settings.gradle</code></pre>\n\n<h3 id="h3-5">设置仓库源</h3>\n<p>默认情况下Gradle会使用Maven或Ivy的中央仓库，在当前用户的${home}.gradle文件下新建一个init.gradle文件，然后写入：</p>\n<pre><code class="groovy ruby">allprojects{\n  repositories {\n    <span class="hljs-function"><span class="code-keyword">def</span> <span class="code-title">REPOSITORY_URL</span> = \'<span\n            class="code-title">http</span>:<span class="code-title">/</span><span class="code-title">/</span><span\n            class="code-title">maven</span>.<span class="code-title">aliyun</span>.<span\n            class="code-title">com</span><span class="code-title">/</span><span class="code-title">nexus</span><span\n            class="code-title">/</span><span class="code-title">content</span><span class="code-title">/</span><span\n            class="code-title">groups</span><span class="code-title">/</span><span class="code-title">public</span><span\n            class="code-title">/</span>\'</span>\n      all { ArtifactRepository repo -&gt;\n        <span class="code-keyword">if</span>(repo instanceof MavenArtifactRepository){\n          <span class="hljs-function"><span class="code-keyword">def</span> <span class="code-title">url</span> = <span\n                  class="code-title">repo</span>.<span class="code-title">url</span>.<span\n                  class="code-title">toString</span><span class="hljs-params">()</span></span>\n          <span class="code-keyword">if</span> (url.startsWith(<span class="code-string">\'https://repo1.maven.org/maven2\'</span>) <span\n            class="hljs-params">||</span> url.startsWith(<span class="code-string">\'https://jcenter.bintray.com/\'</span>)) {\n            project.logger.lifecycle <span\n            class="code-string">"Repository ${repo.url} replaced by $REPOSITORY_URL."</span>\n            remove repo\n          }\n       }\n    }\n    maven {\n      url REPOSITORY_URL\n    }\n  }\n}</code></pre>\n<p>这样链接的仓库会执行国内的阿里镜像。</p>\n\n<h3 id="h3-6">快速初始化项目</h3>\n<p>Gradle提供了初始化各自类型项目的命令：</p>\n<pre><code class="bash">$ gradle init --<span class="code-built_in">type</span> &lt;name&gt;\n<span class="code-comment"># &lt;name&gt;取以下值</span>\n<span class="code-comment"># java-application java应用程序</span>\n<span class="code-comment"># java-library jar包</span>\n<span class="code-comment"># scala-library scala包</span>\n<span class="code-comment"># groovy-library groovy包</span>\n<span class="code-comment"># basic 基本工程</span>\n<span class="code-comment"># 配置出来的工程结构都可以在后期通过修改build.gradle修改</span></code></pre>\n<p></p>'},367:function(s,n,a){"use strict";Object.defineProperty(n,"__esModule",{value:!0});n.content='<h2 id="h2-1">非侵入式框架</h2>\n<p>\n    Spring一直标注自己是一个非侵入式框架。非侵入式设计的概念并不新鲜，目标就是降低使用者和框架代码的耦合，毕竟框架的开发者和使用者几乎肯定不是同一个团队。Spring最早的非侵入式实现就是他的一系列XML配置，理想状态下Spring框架的所有的功能都应该是通过配置实现的。元编程在Java中的使用现给非侵入式的设计提供了更好的解决方案，在Java中通过注解（Annotation）即可标记某个类、方法、域的附加功能，而无需通过继承的方式来扩展原始框架没有的功能。下面通过3段代码的例子来说明侵入式与非侵入式的区别。</p>\n<p><span style="color:#e74c3c">文章中的代码仅仅用于说明原理，已经删除了一些无关代码，无法执行。可执行代码在：<a\n        href="https://github.com/chkui/spring-core-example"\n        rel="nofollow">https://github.com/chkui/spring-core-example</a>，如有需要请自行clone，仅支持gradle依赖。</span></p>\n\n<h3 id="h3-1">一个基本的容器</h3>\n<p>下面的代码是大致模仿的IoC容器创建Bean的过程。BeanFactory::createBeans方法传入Bean的类型列表，而迭代器遍历列表完成每一个类的实例创建：</p>\n<pre><code class="java"><span class="code-comment">/**框架代码*/</span>\n<span class="code-keyword">package</span> chkui.springcore.example.xml.beanpostprocessor.nopluging;\n\n<span class="code-comment">//创建Bean的工厂类,由框架开发者开发</span>\n<span class="hljs-class"><span class="code-keyword">class</span> <span class="code-title">BeanFactory</span> </span>{\n\t<span class="code-comment">//创建一系列的Bean</span>\n\t<span class="hljs-function"><span class="code-keyword">public</span> List&lt;Object&gt; <span class="code-title">createBeans</span><span\n            class="hljs-params">(List&lt;Class&lt;?&gt;&gt; clslist)</span></span>{\n\t\t<span class="code-keyword">return</span> clslist.stream().map(cls-&gt;{\n\t\t\t<span class="code-keyword">return</span> createBean(cls);\n\t\t}).collect(Collectors.toList());\n\t}\n\t<span class="code-comment">//创建一个Bean</span>\n\t<span class="hljs-function">Object <span class="code-title">createBean</span><span class="hljs-params">(Class&lt;?&gt; cls)</span></span>{\n\t\t<span class="code-comment">//添加到容器</span>\n\t\t<span class="code-keyword">return</span> <span class="code-keyword">new</span> BeanWrapper(cls.newInstance());\n\t}\n}\n\n<span class="code-comment">//包装代理</span>\n<span class="hljs-class"><span class="code-keyword">class</span> <span class="code-title">BeanWrapper</span> </span>{\n\t<span class="code-keyword">private</span> Object bean;\n\t<span class="hljs-function"><span class="code-keyword">public</span> <span\n            class="code-title">BeanWrapper</span><span class="hljs-params">(Object bean)</span> </span>{\n\t\t<span class="code-keyword">this</span>.bean = bean;\n\t}\n\t<span class="code-meta">@Override</span>\n\t<span class="hljs-function"><span class="code-keyword">public</span> String <span class="code-title">toString</span><span\n            class="hljs-params">()</span> </span>{\n\t\t<span class="code-keyword">return</span> <span class="code-string">"Wrapper("</span> + <span\n            class="code-keyword">this</span>.bean.toString() + <span class="code-string">")"</span>;\n\t}\n}</code></pre>\n<p>下面的代码是框架使用者的代码——将Bean1和Bean2交给BeanFactory来完成初始化：</p>\n<pre><code class="java"><span class="code-comment">/**使用端代码*/</span>\n<span class="code-keyword">package</span> chkui.springcore.example.xml.beanpostprocessor.nopluging;\n\n<span class="code-comment">//import ...</span>\n\n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n            class="code-title">IocExtensionSampleNoPluging</span> </span>{\n    <span class="hljs-function"><span class="code-keyword">public</span> <span class="code-keyword">static</span> <span\n            class="code-keyword">void</span> <span class="code-title">main</span><span class="hljs-params">(String[] args)</span> </span>{\n    \tList&lt;Class&lt;?&gt;&gt; classes = Arrays.asList(<span class="code-keyword">new</span> Class&lt;?&gt;[]{MyBean1.class, MyBean2.class});\n    \tList&lt;Object&gt; ins = <span class="code-keyword">new</span> BeanFactory().createBeans(classes);\n    \tSystem.out.println(<span class="code-string">"Result:"</span> + ins.toString());\n    }\n}\n\n<span class="code-comment">//Bean1，由使用者编码</span>\n<span class="hljs-class"><span class="code-keyword">class</span> <span class="code-title">MyBean1</span> </span>{\n\t<span class="hljs-function"><span class="code-keyword">public</span> String <span class="code-title">toString</span><span\n            class="hljs-params">()</span> </span>{\n\t\t<span class="code-keyword">return</span> <span class="code-string">"MyBean1 Ins"</span>;\n\t}\n}\n\n<span class="code-comment">//Bean2，使用者编码</span>\n<span class="hljs-class"><span class="code-keyword">class</span> <span class="code-title">MyBean2</span> </span>{\n\t<span class="hljs-function"><span class="code-keyword">public</span> String <span class="code-title">toString</span><span\n            class="hljs-params">()</span> </span>{\n\t\t<span class="code-keyword">return</span> <span class="code-string">"MyBean2 Ins"</span>;\n\t}\n}</code></pre>\n<p>classpath：chkui.springcore.example.xml.beanpostprocessor.nopluging.IocExtensionSample。<a\n        href="https://github.com/chkui/spring-core-example/blob/master/src/main/java/chkui/springcore/example/xml/beanpostprocessor/nopluging/IocExtensionSample.java"\n        rel="nofollow">源码地址</a>。</p>\n<p>某个时刻，框架的使用者有个新需求是在要在每个Bean创建的前后进行一些处理。我们可以通过继承的方式来实现功能。下面我们修改使用端代码实现这个功能。</p>\n\n<h3 id="h3-2">继承实现功能扩展</h3>\n<p>通过继承类BeanFactory，并修改createBean方法可以实现我们的需求：</p>\n<pre><code class="java"><span class="code-keyword">package</span> chkui.springcore.example.xml.beanpostprocessor.extend;\n\n<span class="code-comment">//执行</span>\n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n            class="code-title">IocExtensionSampleNoPluging</span> </span>{\n    <span class="hljs-function"><span class="code-keyword">public</span> <span class="code-keyword">static</span> <span\n            class="code-keyword">void</span> <span class="code-title">main</span><span class="hljs-params">(String[] args)</span> </span>{\n    \tList&lt;Class&lt;?&gt;&gt; classes = Arrays.asList(<span class="code-keyword">new</span> Class&lt;?&gt;[]{MyBean1.class, MyBean2.class});\n    \tList&lt;Object&gt; ins = <span class="code-keyword">new</span> ModifyBeanFactory().createBeans(classes);\n    \tSystem.out.println(<span class="code-string">"Result:"</span> + ins.toString());\n    }\n}\n\n<span class="code-comment">//新建一个BeanFactory的派生类，并修改createBean的实现，添加使用者的处理逻辑</span>\n<span class="hljs-class"><span class="code-keyword">class</span> <span class="code-title">ModifyBeanFactory</span> <span\n        class="code-keyword">extends</span> <span class="code-title">BeanFactory</span> </span>{\n\t<span class="hljs-function">Object <span class="code-title">createBean</span><span class="hljs-params">(Class&lt;?&gt; cls)</span></span>{\n\t\tObject ins = cls.newInstance();\n\t\t<span class="code-comment">//添加容器之前的处理</span>\n\t\tBeanWrapper wrapper = <span class="code-keyword">new</span> BeanWrapper(ins);\n\t\t<span class="code-comment">//添加容器之后的处理</span>\n\t\t<span class="code-keyword">return</span> wrapper;\n\t}\n}</code></pre>\n<p>classpath：chkui.springcore.example.xml.beanpostprocessor.extend.IocExtensionSample。<a\n        href="https://github.com/chkui/spring-core-example/blob/master/src/main/java/chkui/springcore/example/xml/beanpostprocessor/extend/IocExtensionSample.java"\n        rel="nofollow">源码地址</a>。</p>\n<p>这里在使用者的代码里新增了一个ModifyBeanFactory类，并重写了createBean方法。在重写的方法中实现我们需要的功能逻辑。但是这样开发会出现以下2点问题：</p>\n<ol>\n    <li>导致使用者的代码与框架代码产生了极强的耦合性。如果某天框架进行了调整，例如将方法名改为buildBean、或者增加了更多的代理模式会出现一些意想不到的问题。更麻烦的是可能会遇到一些到运行期才出现的问题。</li>\n    <li>我们需要先理解框架的源码才能植入我们的功能，这和很多设计模式的原则是背道而驰的。也会大大影响我们的开发效率。</li>\n</ol>\n<p>出现这些问题就叫做“侵入式”——框架代码侵入到使用者的工程代码，导致2者严重耦合，对未来的升级、扩展、二次开发都有深远的影响。</p>\n\n<h2 id="h2-2">通过注解（Annotation）扩展功能</h2>\n<p>实际上注解和在XML进行配置都是一样的思路，只是注解讲关系写在了源码上，而使用XML是将关系通过XML来描述。这里实现的功能就类似于在<a\n        href="https://www.chkui.com/article/spring/spring_core_bean_lifecycle_callback"\n        rel="nofollow">&nbsp;Bean的定义与控制</a>&nbsp;一文中介绍的Bean的生命周期方法。</p>\n<p>使用注解最大的价值就是非侵入式。非侵入式的好处显而易见：</p>\n<ol>\n    <li>无需和框架代码耦合，更新升级框架风险和成本都很小。</li>\n    <li>任何时候我们需要需要更换框架，只需修改配置或注解，而无需再去调整我们自己的功能代码。</li>\n</ol>\n<p>非侵入式也有一个问题，那就是接入的功能还是需要框架预设，而不可能像继承那样随心所欲。</p>\n<p>我们将前面的代码进行一些修改，支持通过注解来指定扩展的功能：</p>\n<pre><code class="java"><span class="code-keyword">package</span> chkui.springcore.example.xml.beanpostprocessor.annotation;\n\n<span class="hljs-class"><span class="code-keyword">class</span> <span class="code-title">BeanFactory</span> </span>{\n\t<span class="hljs-function"><span class="code-keyword">public</span> List&lt;Object&gt; <span class="code-title">createBeans</span><span\n            class="hljs-params">(List&lt;Class&lt;?&gt;&gt; clslist)</span></span>{\n\t\t<span class="code-comment">//同前文...</span>\n\t}\n\t<span class="hljs-function">Object <span class="code-title">createBean</span><span class="hljs-params">(Class&lt;?&gt; cls)</span></span>{\n\t\tBeanWrapper wrapper = <span class="code-keyword">null</span>;\n\t\tObject ins = cls.newInstance();\n        <span class="code-comment">/**这里增加了一个Handle对象。\n           Handle会对注解进行处理，确定添加容器前后的执行方法。*/</span>\n\t\tHandle handle = processBeforeAndAfterHandle(ins);\n\t\thandle.exeBefore();\n\t\twrapper = <span class="code-keyword">new</span> BeanWrapper(ins);\n\t\thandle.exeAfter();\n\t\t<span class="code-keyword">return</span> wrapper;\n\t}\n\t\n    <span class="code-comment">// 通过反射来确定Bean被添加到容器前后的执行方法。</span>\n\t<span class="hljs-function"><span class="code-keyword">private</span> Handle <span class="code-title">processBeforeAndAfterHandle</span><span\n            class="hljs-params">(Object obj)</span> </span>{\n\t\tMethod[] methods = obj.getClass().getDeclaredMethods();\n\t\tHandle handle = <span class="code-keyword">new</span> Handle(obj);\n\t\t<span class="code-keyword">for</span>(Method method : methods) {\n\t\t\tAnnotation bef = method.getAnnotation(before.class);\n\t\t\tAnnotation aft = method.getAnnotation(after.class);\n\t\t\t<span class="code-keyword">if</span>(<span class="code-keyword">null</span> != bef) handle.setBefore(method);\n\t\t\t<span class="code-keyword">if</span>(<span class="code-keyword">null</span> != aft) handle.setBefore(method);\n\t\t}\n\t\t<span class="code-keyword">return</span> handle;\n\t}\n}</code></pre>\n<p>下面是Handle处理器和对应的注解的代码：</p>\n<pre><code class="java"><span class="hljs-class"><span class="code-keyword">class</span> <span\n        class="code-title">Handle</span></span>{\n\tObject instance;\n\tMethod before;\n\tMethod after;\n\tHandle(Object ins){\n\t\t<span class="code-keyword">this</span>.instance = ins;\n\t}\n\t<span class="hljs-function"><span class="code-keyword">void</span> <span class="code-title">setBefore</span><span\n            class="hljs-params">(Method method)</span> </span>{\n\t\t<span class="code-keyword">this</span>.before = method;\n\t}\n\t<span class="hljs-function"><span class="code-keyword">void</span> <span class="code-title">setAfter</span><span\n            class="hljs-params">(Method method)</span> </span>{\n\t\t<span class="code-keyword">this</span>.after = method;\n\t}\n\t<span class="hljs-function"><span class="code-keyword">void</span> <span class="code-title">exeBefore</span><span\n            class="hljs-params">()</span></span>{\n\t\t<span class="code-keyword">if</span>(<span class="code-keyword">null</span> != <span\n            class="code-keyword">this</span>.before) {\n\t\t\t<span class="code-keyword">this</span>.before.invoke(<span class="code-keyword">this</span>.instance, <span\n            class="code-keyword">null</span>);\n\t\t}\n\t}\n\t<span class="hljs-function"><span class="code-keyword">void</span> <span class="code-title">exeAfter</span><span\n            class="hljs-params">()</span></span>{\n\t\t<span class="code-keyword">if</span>(<span class="code-keyword">null</span> != <span\n            class="code-keyword">this</span>.after) {\n\t\t\t<span class="code-keyword">this</span>.after.invoke(<span class="code-keyword">this</span>.instance, <span\n            class="code-keyword">null</span>);\n\t\t}\n\t}\n}\n\n<span class="code-comment">//注解----------------------------------------</span>\n<span class="code-meta">@Target</span>({ElementType.METHOD})\n<span class="code-meta">@Retention</span>(RetentionPolicy.RUNTIME)\n<span class="code-meta">@interface</span> before {}\n\n<span class="code-meta">@Target</span>({ElementType.METHOD})\n<span class="code-meta">@Retention</span>(RetentionPolicy.RUNTIME)\n<span class="code-meta">@interface</span> after{}</code></pre>\n<p>使用者的代码，我们将注解添加到Bean的对应的方法上：</p>\n<pre><code class="java"><span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n        class="code-title">IocExtensionSampleNoPluging</span> </span>{\n    <span class="hljs-function"><span class="code-keyword">public</span> <span class="code-keyword">static</span> <span\n            class="code-keyword">void</span> <span class="code-title">main</span><span class="hljs-params">(String[] args)</span> </span>{\n    \tList&lt;Class&lt;?&gt;&gt; classes = Arrays.asList(<span class="code-keyword">new</span> Class&lt;?&gt;[]{MyBean1.class, MyBean2.class});\n    \tList&lt;Object&gt; ins = <span class="code-keyword">new</span> BeanFactory().createBeans(classes);\n    \tSystem.out.println(<span class="code-string">"Result:"</span> + ins.toString());\n    }\n}\n\n<span class="code-comment">//预设的Bean1</span>\n<span class="hljs-class"><span class="code-keyword">class</span> <span class="code-title">MyBean1</span> </span>{\n\t<span class="hljs-function"><span class="code-keyword">public</span> String <span class="code-title">toString</span><span\n            class="hljs-params">()</span> </span>{\n\t\t<span class="code-keyword">return</span> <span class="code-string">"MyBean1 Ins"</span>;\n\t}\n\t\n\t<span class="code-meta">@before</span>\n\t<span class="hljs-function"><span class="code-keyword">public</span> <span class="code-keyword">void</span> <span\n            class="code-title">init</span><span class="hljs-params">()</span> </span>{\n    \tSystem.out.println(<span class="code-string">"Before Init:"</span> + <span class="code-keyword">this</span>.toString());\n\t}\n}\n\n<span class="code-comment">//预设的Bean2</span>\n<span class="hljs-class"><span class="code-keyword">class</span> <span class="code-title">MyBean2</span> </span>{\n\t<span class="hljs-function"><span class="code-keyword">public</span> String <span class="code-title">toString</span><span\n            class="hljs-params">()</span> </span>{\n\t\t<span class="code-keyword">return</span> <span class="code-string">"MyBean2 Ins"</span>;\n\t}\n\t\n\t<span class="code-meta">@after</span>\n\t<span class="hljs-function"><span class="code-keyword">public</span> <span class="code-keyword">void</span> <span\n            class="code-title">post</span><span class="hljs-params">()</span> </span>{\n    \tSystem.out.println(<span class="code-string">"After Init:"</span> + <span class="code-keyword">this</span>.toString());\n\t}\n}</code></pre>\n<p>我们为MyBean1和MyBean2分别添加了init、post方法和对应的@before、@after注解。执行之后输出一下内容：</p>\n<pre><code class="apache"><span class="code-attribute">Before</span> Init:MyBean1 Ins\n<span class="code-attribute">After</span> Init:MyBean2 Ins\n<span class="code-attribute">Result</span>:[Wrapper(MyBean1 Ins), Wrapper(MyBean2 Ins)]</code></pre>\n<p>classpath：chkui.springcore.example.xml.beanpostprocessor.annotation.IocExtensionSample。<a\n        href="https://github.com/chkui/spring-core-example/blob/master/src/main/java/chkui/springcore/example/xml/beanpostprocessor/annotation/IocExtensionSample.java"\n        rel="nofollow">源码地址</a>。</p>\n<p>注解对应的方法都顺利执行。</p>\n<p>通过注解，我们实现了扩展功能，任何时候只需要通过添加或修改注解即可向容器扩展功能。在Spring核心功能里，<a\n        href="http://www.chkui.com/article/spring/spring_core_bean_lifecycle_callback" title="Bean的生命周期管理">Bean的生命周期管理</a>都是通过这种思路实现的，除了注解之外还有XML支持。\n</p>\n<p>\n    在使用spring的过程中，我想各位码友多多少少都通过继承Spring某些类来实现了一些需要扩展的功能。而且我发现网上很多使用spring某些功能的例子也是通过继承实现的。建议尽量不要去采用这种加深耦合的方式实现扩展，Spring提供了多种多样的容器扩展机制，后面的文章会一一介绍。</p>\n\n<h2 id="h2-3">后置处理器</h2>\n<p>\n    后置处理器——BeanPostProcessor是Spring核心框架容器扩展功能之一，作用和Bean的生命周期方法类似，也是在Bean完成初始化前后被调用。但是和生命周期方法不同的是，他无需在每一个Bean上去实现代码，而是通过一个独立的Bean来处理全局的初始化过程。</p>\n<p>BeanPostProcessor与Bean生命周期方法体现出的差异是：<span style="color:#e74c3c">我们无论任何时候都可以加入处理器来实现扩展功能，这样做的好处是无需调整之前的Bean的任何代码也可以植入功能</span>。\n</p>\n<p>这种实现方式与切面（AOP）有一些相似的地方，但是实现的方式是完全不一样的，而且处理器会对所有Bean进行处理。</p>\n<p>BeanPostProcessor的实现非常简单，只添加一个Bean实现BeanPostProcessor接口即可：</p>\n<pre><code class="java"><span class="code-keyword">package</span> chkui.springcore.example.xml.beanpostprocessor;\n<span class="code-keyword">import</span> org.springframework.beans.factory.config.BeanPostProcessor;\n\n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n            class="code-title">Processor</span> <span class="code-keyword">implements</span> <span class="code-title">BeanPostProcessor</span> </span>{\n    <span class="code-comment">//初始化之前</span>\n\t<span class="hljs-function"><span class="code-keyword">public</span> Object <span class="code-title">postProcessBeforeInitialization</span><span\n            class="hljs-params">(Object bean, String beanName)</span> </span>{\n        <span class="code-keyword">return</span> bean;\n    }\n\t<span class="code-comment">//初始化之后</span>\n\t<span class="hljs-function"><span class="code-keyword">public</span> Object <span class="code-title">postProcessAfterInitialization</span><span\n            class="hljs-params">(Object bean, String beanName)</span> </span>{\n        System.out.println(<span class="code-string">"Bean \'"</span> + beanName + <span class="code-string">"\' created : "</span> + bean.toString());\n        <span class="code-keyword">return</span> bean;\n    }\n}</code></pre>\n<p>BeanPostProcessor的使用案例请查看<a href="https://github.com/chkui/spring-core-example" rel="nofollow">实例代码</a>中&nbsp;chkui.springcore.example.xml.beanpostprocessor\n    包中的代码，包含：</p>\n<p>一个实体类：<em>chkui.springcore.example.xml.entity.User</em></p>\n<p>一个服务接口和服务类：<em>chkui.springcore.example.xml.service.UserService</em></p>\n<p>处理器：<em>chkui.springcore.example.xml.beanpostprocessor.Processor</em></p>\n<p>Main入口：<em>chkui.springcore.example.xml.beanpostprocessor.BeanPostProcessor</em></p>\n<p>配置文件：<em>/src/main/resources/xml/config.xml</em></p>\n\n<h3 id="h3-3">更多的后置处理器说明</h3>\n<p>见：<a href="https://www.chkui.com/article/spring/spring_core_post_processor_of_official" title="spring后置处理器">https://www.chkui.com/article/spring/spring_core_post_processor_of_official</a>\n</p>'},368:function(s,n,a){"use strict";Object.defineProperty(n,"__esModule",{value:!0});n.content='<p>实际上Ioc容器中的大量功能都是通过后置处理器实现的，这里介绍几个主要的处理器。</p>\n<h3 id="h3-1">RequiredAnnotationBeanPostProcessor</h3>\n<p>\n    官方的一些功能就是用后置处理器的方式实现的，例如RequiredAnnotationBeanPostProcessor，它用于处理@Required注解。当我们一个Setter方法加入@Required后，表示必须设置参数，如果未设置则抛出BeanInitializationException异常。</p>\n<p><strong>使用方法1</strong>，直接添加一个Bean：</p>\n<pre><code class="xml"><span class="code-tag">&lt;<span class="code-name">bean</span> <span\n        class="hljs-attr">class</span>=<span class="code-string">"org.springframework.beans.factory.annotation.RequiredAnnotationBeanPostProcessor"</span> /&gt;</span>\n<span class="code-comment">&lt;!-- 其他bean --&gt;</span></code></pre>\n<p>这相当于直接添加一个后置处理器，他会检查所有的被@Required标注的Setter方法。</p>\n<p><strong>使用方法2</strong>，设置context：</p>\n<pre><code class="xml"><span class="code-comment">&lt;!-- 如果使用了以下2个context级别的标签，则会启用RequiredAnnotationBeanPostProcessor的功能 --&gt;</span>\n<span class="code-tag">&lt;<span class="code-name">context:annotation-config</span> /&gt;</span>\n<span class="code-tag">&lt;<span class="code-name">context:component-scan</span> /&gt;</span></code></pre>\n<p><strong>使用技巧1</strong>，修改扫描的注解。处理器默认会识别@Required注解，但是可以通过RequiredAnnotationBeanPostProcessor::setRequiredAnnotationType修改生效的注解，例如：\n</p>\n<pre><code class="xml"><span class="code-tag">&lt;<span class="code-name">bean</span> <span\n        class="hljs-attr">class</span>=<span class="code-string">"org.springframework.beans.factory.annotation.RequiredAnnotationBeanPostProcessor"</span>&gt;</span>\n   <span class="code-tag">&lt;<span class="code-name">property</span> <span class="hljs-attr">name</span>=<span\n           class="code-string">"requiredAnnotationType"</span> <span class="hljs-attr">value</span>=<span\n           class="code-string">"x.y.Require"</span> /&gt;</span>\n<span class="code-tag">&lt;/<span class="code-name">bean</span>&gt;</span></code></pre>\n<pre><code class="java"><span class="code-keyword">package</span> x.y;\n\n<span class="code-meta">@Target</span>(ElementType.METHOD)\n<span class="code-meta">@Retention</span>(RetentionPolicy.RUNTIME)\n<span class="code-keyword">public</span> <span class="code-meta">@interface</span> Require {}</code></pre>\n<p>使用技巧2，告知RequiredAnnotationBeanPostProcessor不处理某些Bean方法：</p>\n<pre><code class="xml"><span class="code-tag">&lt;<span class="code-name">bean</span> <span\n        class="hljs-attr">class</span>=<span class="code-string">"x.y.A"</span>&gt;</span>\n    <span class="code-tag">&lt;<span class="code-name">meta</span>  <span class="hljs-attr">key</span>=<span\n            class="code-string">"org.springframework.beans.factory.annotation.RequiredAnnotationBeanPostProcessor.skipRequiredCheck"</span> <span\n            class="hljs-attr">value</span>=<span class="code-string">"true"</span> /&gt;</span>\n<span class="code-tag">&lt;/<span class="code-name">bean</span>&gt;</span></code></pre>\n\n<h3 id="h3-2">AutowiredAnnotationBeanPostProcessor</h3>\n<p>这个后置处理器在3.x之后使用Spring框架的系统几乎都会使用，就是他在处理大名鼎鼎的@Autowired和@Value注解。此外他也支持JSR-330中的@Inject注解。当我们使用&lt;context:annotation-config\n    /&gt;<br> 或&lt;context:component-scan /&gt;时，IoC容器也会启用这个功能。</p>\n<p>\n    可以通过setAutowiredAnnotationType、setAutowiredAnnotationTypes方法设定对应的注解，可以通过setRequiredParameterName来设置@Autowired中的属性方法：</p>\n<pre><code class="xml"><span class="code-tag">&lt;<span class="code-name">bean</span> <span\n        class="hljs-attr">class</span>=<span class="code-string">"org.springframework.beans.factory.annotation.AutowiredAnnotationBeanPostProcessor"</span>&gt;</span>\n   <span class="code-tag">&lt;<span class="code-name">property</span> <span class="hljs-attr">name</span>=<span\n           class="code-string">"autowiredAnnotationType"</span> <span class="hljs-attr">value</span>=<span\n           class="code-string">"x.y.MyInjectAnnotation"</span> /&gt;</span>\n<span class="code-tag">&lt;/<span class="code-name">bean</span>&gt;</span></code></pre>\n\n<h3 id="h3-3">CommonAnnotationBeanPostProcessor</h3>\n<p>\n    这个处理器继承InitDestroyAnnotationBeanPostProcessor实现JSR-250的@PostConstruct和@PreDestroy的处理，此外还支持@Resource注解。JSR-250和Resouce貌似没有什么太直接的关系，所以被命名为Common表示这是一个大杂烩一般的存在。同样使用annotation-config和component-scan会被自动启用（因为都是用于处理注解的）。</p>\n<p>同样也有initAnnotationType、destroyAnnotationType等Setter方法来设置自定义注解。</p>\n\n<h3 id="h3-4">InitDestroyAnnotationBeanPostProcessor</h3>\n<p>处理Bean的生命周期方法以及资源数据注入，CommonAnnotationBeanPostProcessor继承自它。</p>'}});