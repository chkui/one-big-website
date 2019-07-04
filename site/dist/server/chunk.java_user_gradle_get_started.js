exports.ids=[75],exports.modules={312:function(s,n,a){"use strict";Object.defineProperty(n,"__esModule",{value:!0});n.content='<h2 id="h2-1">安装</h2>\n\n<h3 id="h3-1">安装SDKMAN</h3>\n<p>Gradle在安装之前可以选择很多安装方式，这里选择SDKMAN。其他方式见<a href="https://gradle.org/install/#install" rel="nofollow">安装说明</a>。</p>\n<p>linux安装SDKMAN，分别执行：</p>\n<pre><code class="bash"><span class="code-comment"># 下载安装执行</span>\n$ curl -s <span class="code-string">"https://get.sdkman.io"</span> | bash\n<span class="code-comment"># 自行设置</span>\n$ <span class="code-built_in">source</span> <span class="code-string">"<span class="code-variable">$HOME</span>/.sdkman/bin/sdkman-init.sh"</span></code></pre>\n<p>安装结果测试。</p>\n<p>输入：</p>\n<pre><code class="bash">$ sdk version </code></pre>\n<p>成功安装会输出：</p>\n<pre><code class="bash">==== BROADCAST =================================================================\n* 02/07/18: Kscript 2.4.5 released on SDKMAN! <span class="code-comment">#kscript</span>\n* 28/06/18: Micronaut 1.0.0.M2 released on SDKMAN! <span class="code-comment">#micronautfw</span>\n* 27/06/18: Infrastructor 0.2.0 rolling out. With stronger encryption and new task progress UI.\n================================================================================\n\nSDKMAN 5.6.4+305</code></pre>\n\n<h3 id="h3-2">安装Gradle</h3>\n<p>Gradle需要JDK7以上才能运行，请先使用 <strong><em>java -version</em></strong> 命令确定环境。&nbsp;</p>\n<p>使用SDKMAN安装Gradle：</p>\n<pre><code class="bash"><span class="code-comment"># 4.8.1是当前gradle的版本，根据需要调整</span>\n$ sdk install gradle 4.8.1</code></pre>\n<p>安装完成后输入gradle -v检查安装结果：</p>\n<pre><code class="bash">$ gradle -v\n------------------------------------------------------------\nGradle 4.8.1\n------------------------------------------------------------</code></pre>\n\n<h3 id="h3-3">Gradle基础要点知识</h3>\n<ul>\n    <li>一个Gradle文件（例如build.gradle）视为一个project。在Gradle的项目组织中就2个层级——Project和Task。</li>\n    <li>在Gradle中有3个重要的概念Project、Plug、Task。三者的关系：Project就是一个容器，里面可以放置各种类型的Task，Plug是一堆Task的集合。</li>\n    <li>Gradle中所有的功能都是以一个Task实现的，包括Jar包的依赖。</li>\n    <li>Properties：Project和Task都有自己的属性（Properties）。Project级别的属性可以设置，也可以通过外部传入。</li>\n</ul>\n\n<h3 id="h3-4">一个配置案例</h3>\n<pre><code class="groovy cs"><span class="code-comment">/**\nbuild.gradle\n这是一个使用 gradle init --type java-application创建的Gradle Project，进行了一些修改\n整个文件的范围都是一个Project。\n**/</span>\n<span class="code-comment">// ---------------------------------------------------------------------</span>\n<span class="code-comment">// 引入预设的Plug</span>\n<span class="code-comment">// 一个plug中会包含多个Task</span>\n<span class="code-comment">// plugins是Project的一个方法</span>\n<span class="code-comment">// 里面的id实际上也是一个方法。</span>\nplugins {\n    id <span class="code-string">\'java\'</span>\n    id <span class="code-string">\'application\'</span>\n}\n\n<span class="code-comment">// 资源路径的设置参数。用于java plug中的task</span>\n<span class="code-comment">// Gradle的资源路径和Maven的几乎一样，也可以单独配置</span>\nsourceSets {\n   main {\n      java {\n         srcDir <span class="code-string">\'src/main/java\'</span>\n      }\n      resources {\n         srcDir <span class="code-string">\'src/main/resources\'</span>\n      }\n   }\n}\n<span class="code-comment">//-----------------------------------</span>\n<span class="code-comment">/**\n如果不设置，资源路径默认为：\nsrc {\n   main{\n      java\n      res\n   }\n   test{\n      java\n      res\n   }\n}\n**/</span>\n<span class="code-comment">//-----------------------------------</span>\n\n<span class="code-comment">// mainClassName可以理解为一个变量</span>\n<span class="code-comment">// 定义这个程序的Main Class，实际上这也是在设定一个Project的属性</span>\nmainClassName = <span class="code-string">\'App\'</span>\n\n<span class="code-comment">//预设一个用于装载结构的类，Gradle使用groovy语法</span>\n<span class="code-keyword">class</span> <span class="code-title">GroupAndVersion</span> {\n\tString <span class="code-keyword">group</span>\n\tString version\n}\n\n<span class="code-comment">// 向project添加一个名为“spring”的属性，属性的值是一个GroupAndVersion的一个实例。</span>\n<span class="code-comment">// ext是Project的一个方法，作用就是添加一个属性。</span>\next {\n\tspring = <span class="code-keyword">new</span> GroupAndVersion(<span class="code-keyword">group</span>:<span\n            class="code-string">\'org.springframework\'</span>, version:<span class="code-string">\'5.0.7.RELEASE\'</span>)\n}\n\n<span class="code-comment">// dependencies 是由某个plug中的预设的“方法”，</span>\n<span class="code-comment">// Gradle是groovy语法，这里就是执行Project.dependencies方法</span>\n<span class="code-comment">// Plug中可以用project.extensions.create扩展Project中的定义方法</span>\ndependencies {\n    <span class="code-comment">//compile表示引入包的执行域</span>\n    compile <span class="code-string">\'com.google.guava:guava:23.0\'</span>\n\n    <span class="code-comment">//使用定义好的属性引入包</span>\n\tcompile <span class="code-keyword">group</span>: spring.<span class="code-keyword">group</span>, name: <span\n            class="code-string">\'spring-core\'</span>, version: spring.version\n\tcompile <span class="code-keyword">group</span>: spring.<span class="code-keyword">group</span>, name: <span\n            class="code-string">\'spring-beans\'</span>, version: spring.version\n\tcompile <span class="code-keyword">group</span>: spring.<span class="code-keyword">group</span>, name: <span\n            class="code-string">\'spring-context\'</span>, version: spring.version\n\n    testCompile <span class="code-string">\'junit:junit:4.12\'</span>\n}\n\n<span class="code-comment">// repositories与dependencies一样的性质，同样会被用于某个task</span>\n<span class="code-comment">// repositories用于指定依赖仓库</span>\nrepositories {\n    jcenter()\n}\n\n<span class="code-comment">// 自定义的一个任务，用于呈现当前依赖包的物理地址</span>\ntask show &lt;&lt; {\n\tprintln configurations.compile.asPath\n}</code></pre>\n<p>配置文件对应的工程结构：</p>\n<pre><code class="bash">project\n--bin IDE动态编译的文件（Eclipse）\n----main\n----<span class="code-built_in">test</span>\n--build 运行gradle build命令生成的文件\n---- classes Java 工程目录对应的.class文件\n---- distributions 打包之后的压缩包\n---- lib 打包之后的jar\n---- report 测试报告\n---- scripts 打包之后的启动脚本\n---- <span class="code-built_in">test</span>-result 测试结果\n---- tmp 临时文件，比如会在打包jar之前临时存放MANIFEST.MF\n--gradle gradle执行相关的文件，比如gradle-wrapper\n--src 源码和资源\n----main\n----text\n--build.gradle\n--gradlew\n--settings.gradle</code></pre>\n\n<h3 id="h3-5">设置仓库源</h3>\n<p>默认情况下Gradle会使用Maven或Ivy的中央仓库，在当前用户的${home}.gradle文件下新建一个init.gradle文件，然后写入：</p>\n<pre><code class="groovy ruby">allprojects{\n  repositories {\n    <span class="hljs-function"><span class="code-keyword">def</span> <span class="code-title">REPOSITORY_URL</span> = \'<span\n            class="code-title">http</span>:<span class="code-title">/</span><span class="code-title">/</span><span\n            class="code-title">maven</span>.<span class="code-title">aliyun</span>.<span\n            class="code-title">com</span><span class="code-title">/</span><span class="code-title">nexus</span><span\n            class="code-title">/</span><span class="code-title">content</span><span class="code-title">/</span><span\n            class="code-title">groups</span><span class="code-title">/</span><span class="code-title">public</span><span\n            class="code-title">/</span>\'</span>\n      all { ArtifactRepository repo -&gt;\n        <span class="code-keyword">if</span>(repo instanceof MavenArtifactRepository){\n          <span class="hljs-function"><span class="code-keyword">def</span> <span class="code-title">url</span> = <span\n                  class="code-title">repo</span>.<span class="code-title">url</span>.<span\n                  class="code-title">toString</span><span class="hljs-params">()</span></span>\n          <span class="code-keyword">if</span> (url.startsWith(<span class="code-string">\'https://repo1.maven.org/maven2\'</span>) <span\n            class="hljs-params">||</span> url.startsWith(<span class="code-string">\'https://jcenter.bintray.com/\'</span>)) {\n            project.logger.lifecycle <span\n            class="code-string">"Repository ${repo.url} replaced by $REPOSITORY_URL."</span>\n            remove repo\n          }\n       }\n    }\n    maven {\n      url REPOSITORY_URL\n    }\n  }\n}</code></pre>\n<p>这样链接的仓库会执行国内的阿里镜像。</p>\n\n<h3 id="h3-6">快速初始化项目</h3>\n<p>Gradle提供了初始化各自类型项目的命令：</p>\n<pre><code class="bash">$ gradle init --<span class="code-built_in">type</span> &lt;name&gt;\n<span class="code-comment"># &lt;name&gt;取以下值</span>\n<span class="code-comment"># java-application java应用程序</span>\n<span class="code-comment"># java-library jar包</span>\n<span class="code-comment"># scala-library scala包</span>\n<span class="code-comment"># groovy-library groovy包</span>\n<span class="code-comment"># basic 基本工程</span>\n<span class="code-comment"># 配置出来的工程结构都可以在后期通过修改build.gradle修改</span></code></pre>\n<p></p>'}};