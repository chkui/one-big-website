exports.ids=[35],exports.modules={276:function(s,n,a){"use strict";Object.defineProperty(n,"__esModule",{value:!0});n.content='<h2 id="h2-1">Niubility的Nodejs &nbsp;&nbsp;</h2>\n<p>关于大名鼎鼎的Nodejs是什么就不用再介绍了，他的牛逼之处数都数不完——让javascript称霸全宇宙、将一个只用于前端的编程语言同时可以制霸前后端、让致力于前端开发的小哥又多了一项事业新增了一门手艺、亮瞎人的全异步事件驱动型架构（event-driven、non-blocking、scalability）。总的来说就是，学好Nodejs必须能够赚大钱迎娶白富美。</p>\n<p>本人一直垂涎与Nodejs的鼎鼎大名，但是由于工作繁忙，一直没时间深入亵玩。最近因为一些机缘，又要着手一些前端开发的工作才觅得一次全面接触的良机。</p>\n<p>看到这里你肯定要说，又是一个要把Nodejs吹上天的文章！NoNo，本文会一步一步的说明我是怎么学会和用上nodejs的，然后结合其我所了解的语言告诉各位我所了解的Nodejs坑和优势。</p>\n\n<h2 id="h2-2">学习基础</h2>\n<p>先说说本人开始学习使用的基础。早期在某外企开发室内3D设计软件，那段时间用已经成为古董的MFC做各种windows事件驱动开发。</p>\n<p>之后就一直在做Java生态的东西、反正就是SSH啦、MVC啦、Dao啦、Entity啦、JNDI啦、JDBC啦等等，相信每个Javaer都懂的。早些年做Java时，前端部分基本就是玩转Jsp，页面清一色的用Jsp动态生成，然后丢给浏览器。现在所属团队几乎已经放弃这种方式，都是用spring-boot等弄前后端分离了。</p>\n<p>随后有幸接到一个自己可以全权负责的全新的项目，于是带着2个人开始尝试抛弃JSP，引入了大量的ajax异步请求的客户端组装数据。那时候这样做其实蛮痛苦的，新项目根本没有真正意义的前端开发人员（都玩JSP呢），所以自己不得不去研究前端的各种前端技术。在随后的许多时光中，深入且大量的学习了前端开发的所有东西，从一穷二白只会用div画画静态页面，到后面自己封装列表、消息通知等组件，通杀jquery、angularjs，了解各种脚手架。所以学习Nodejs开发，我基本上是没有语言障碍的，只是需要跟上它的思路。</p>\n\n<h2 id="h2-3">安装Nodejs</h2>\n<p>要用一样东西之前，当然是要先安装环境。Nodejs的安装网上一搜一大把，这里就简单记录一下流程，方面以后查阅。因为本人用一台windows（windows10）办公、用一台linux（ubuntu16.04）开发，所以2个操作系统都安装了Nodejs，像OSX这样高大上的玩意，暂时没机器去弄（穷）。</p>\n\n<h3 id="h3-1">windows</h3>\n<ol>\n    <li>先去官网（https://nodejs.org或https://nodejs.org/en/download/）下载一个安装包，我下的是长期稳定版。建议下载.msi。</li>\n    <li>然后就是安装了，这没什么好说的。无非就是设定一下安装目录，然后一通Next。</li>\n    <li>安装好之后检查下环境变量，看看path下添加入了Nodejs的运行路径。cmd中输入path可以看到添加了nodejs的安装目录。然后输入node --version可以看到当前的Nodejs版本号。如下图：&nbsp;&nbsp;&nbsp;&nbsp;<img alt="安装NodeJs运行环境" height="175" src="https://file.mahoooo.com/res/file/install_nodejs_runtime_environment_1.png" width="527"></li>\n    <li>Nodejs自带npm，npm和其他未来要使用的组件都存放在“X:\\yourpath\\nodejs\\node_modules”里。所以需要在windows环境变量重增加一个NODE_PATH=X:\\yourpath\\nodejs\\node_modules的参数，保证未来新增的一些模块工具可以正常使用。右键“我的电脑”-&gt;高级系统设置-&gt;环境变量-&gt;然后新建以上参数。</li>\n    <li>再然后就是最后一步了，设置node_cache（用于npm存放一些临时文件）和node_global（全局工具文件夹），当然这里也可以不设置，他会自动放在当前用户的文件夹下，但是有强迫症的我必须要设置。在cmd中输入一下命令：</li>\n</ol>\n<pre class="sql"><code class="language-bash">npm config <span class="code-built_in"><span class="code-keyword">set</span></span> prefix <span class="code-string"><span class="code-string">\'X:\\yourpath\\nodejs\\node-global\'</span></span>\n\nnpm config <span class="code-built_in"><span class="code-keyword">set</span></span> <span class="code-keyword">cache</span> <span class="code-string"><span class="code-string">\'X:\\yourpath\\nodejs\\node_cache\'</span></span></code></pre>\n\n<h3 id="h3-2">linux</h3>\n<p>linux安装和windows安装Nodejs差不多，都是下载包、解压、开用。</p>\n<ol>\n    <li>先去官网下载一个linux版本的安装包（下首页的那个就行）。下载以后发现是 xz后缀，先得用xz命令解压成tar，再用tar完成解压。</li>\n    <li>添加Nodejs运行环境：直接把node的运行目录添加到&amp;PATH里。在profile中添加Node的运行环境： <pre class="bash"><code class="language-bash"><span class="code-comment"><span class="code-comment">#node</span></span>\n<span class="code-built_in"><span class="code-built_in">export</span></span> NODE_HOME=/yourpath/node-v4.5.0-linux-x64\n<span class="code-built_in"><span class="code-built_in">export</span></span> PATH=<span class="code-variable"><span class="code-variable">$NODE_HOME</span></span>/bin:<span class="code-variable"><span class="code-variable">$PATH</span></span></code></pre> <p>然后再任意位置测试了一下运行node命令都可以正常使用。</p> </li>\n    <li> <p>然后我们需要添加node_modules到PATH中，保证npm可以使用：</p> <pre class="bash"><code class="language-apache"><span class="code-comment">#npm</span>\n<span class="code-built_in">export</span> NODE_PATH=<span class="code-variable">$NODE_HOME</span>/node_modules\n</code></pre> <p>配置完之后，就可以使用npm命令了。（修改之后切记注销用户）</p> </li>\n</ol>\n<p>完成以上步奏之后，就可以用node和npm命令干你相干的事了。安装之前按看到很多教程说是要安装python2.2到2.7的版本。但是我解压完nodejs包后在bin下运行了node -v命令居然可以跑，我就没去管python的事，应该是我用的是打包版的原因。</p>\n\n<h3 id="h3-3">Apt安装Nodejs</h3>\n<p>1.设定Nodejs安装源：</p>\n<pre class="nginx"><code class="language-bash"><span class="code-attribute">curl</span> <span class="hljs-_">-s</span>L https://deb.nodesource.com/setup_8.x | sudo -E bash -</code></pre>\n<p>2.安装Nodejs</p>\n<pre class="actionscript"><code class="language-bash">sudo apt-<span class="code-keyword">get</span> install -y nodejs</code></pre>\n\n<h3 id="h3-4">验证安装结果</h3>\n<p>安装完成之后，我在windows和linux都测试了一下。</p>\n<p>测试nodejs：输入node打开REPL，然后使用log打印数据：</p>\n<pre class="javascript"><code class="language-bash">$ node\n&gt; <span class="code-built_in">console</span>.log(<span class="code-string"><span class="code-string">"hello nodejs!"</span></span>);\nhello nodejs!\n<span class="hljs-literal">undefined</span></code></pre>\n<p>然后用npm测试安装grunt-cli：</p>\n<pre class="groovy"><code class="language-bash">$ npm install -g grunt-cli\n<span class="hljs-regexp">/yourpath/</span>node-v4<span class="hljs-number">.5</span><span class="hljs-number">.0</span>-linux-x64<span class="hljs-regexp">/node_global/</span>bin<span class="hljs-regexp">/grunt -&gt; /</span>yourpath<span class="hljs-regexp">/node-v4.5.0-linux-x64/</span>node_global<span class="hljs-regexp">/lib/</span>node_modules<span class="hljs-regexp">/grunt-cli/</span>bin/grunt\ngrunt-cli@<span class="hljs-number">1.2</span><span class="hljs-number">.0</span> <span class="hljs-regexp">/me/</span>soft<span class="hljs-regexp">/node/</span>node-v4<span class="hljs-number">.5</span><span class="hljs-number">.0</span>-linux-x64<span class="hljs-regexp">/node_global/</span>lib<span class="hljs-regexp">/node_modules/</span>grunt-cli\n├── grunt-known-options@<span class="hljs-number">1.1</span><span class="hljs-number">.0</span>\n├── resolve@<span class="hljs-number">1.1</span><span class="hljs-number">.7</span>\n├── nopt@<span class="hljs-number">3.0</span><span class="hljs-number">.6</span> (abbrev@<span class="hljs-number">1.0</span><span class="hljs-number">.9</span>)\n└── findup-sync@<span class="hljs-number">0.3</span><span class="hljs-number">.0</span> (glob@<span class="hljs-number">5.0</span><span class="hljs-number">.15</span>)</code></pre>\n\n<h3 id="h3-5">运行一个Nodejs程序</h3>\n<p>安装好之后，node的命令行和npm的命令行就都可以使用了，随后当然就是要跑跑Nodejs了。像下面这样创建一个创建一个example.js文件，随便放在某个文件：</p>\n<pre class="javascript"><code class="language-javascript"><span class="code-keyword"><span class="code-keyword">const</span></span> http = <span class="code-built_in"><span class="code-built_in">require</span></span>(<span class="code-string"><span class="code-string">\'http\'</span></span>);\n\n<span class="code-keyword"><span class="code-keyword">const</span></span> hostname = <span class="code-string"><span class="code-string">\'127.0.0.1\'</span></span>;\n<span class="code-keyword"><span class="code-keyword">const</span></span> port = <span class="hljs-number"><span class="hljs-number">3000</span></span>;\n\n<span class="code-keyword"><span class="code-keyword">const</span></span> server = http.createServer((req, res) -&gt; {\n  res.statusCode = <span class="hljs-number"><span class="hljs-number">200</span></span>;\n  res.setHeader(<span class="code-string"><span class="code-string">\'Content-Type\'</span></span>, <span class="code-string"><span class="code-string">\'text/plain\'</span></span>);\n  res.end(<span class="code-string"><span class="code-string">\'Hello World Nodejs\\n\'</span></span>);\n});\n\nserver.listen(port, hostname, () =&gt; {\n  <span class="code-built_in"><span class="code-built_in">console</span></span>.log(<span class="code-string"><span class="code-string">`Server running at http://</span><span class="hljs-subst"><span class="code-string"><span class="hljs-subst">${hostname}</span></span></span><span class="code-string">:</span><span class="hljs-subst"><span class="code-string"><span class="hljs-subst">${port}</span></span></span><span class="code-string">/`</span></span>);\n});</code></pre>\n<p>然后在当前文件下打开一个cmd运行以下命令：</p>\n<pre class="css"><code class="language-bash"><span class="code-selector-tag">node</span> <span class="code-selector-tag">example</span><span class="code-selector-class">.js</span></code></pre>\n<p>可以看到输出：</p>\n<pre class="php"><code class="language-bash"><span class="code-variable">$node</span> example.js\n\nServer running at http:<span class="code-comment">//127.0.0.1:3000</span></code></pre>\n'}};