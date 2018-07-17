exports.ids=[36],exports.modules={310:function(s,a,n){"use strict";Object.defineProperty(a,"__esModule",{value:!0});a.content='<h2 id="h2-1">React</h2>\n<p>本文记录了本人以及目前团队从无到有使用React的过程，我们将从webpack开始说起，一步一步展现React最基本的开发生态。在这里并不会介绍任何jsx或es6相关的语法，只聚焦于如何使用react生态搭建利于团队协作、有利于提升开发效率的开发环境。</p>\n\n<h2 id="h2-2">脚手架工具——webpack&nbsp;</h2>\n<p>工欲善必须利其器，想要高效的开发react，必须保证有一个高效有序的开发环境。我们使用的是Facebook开源的脚手架工具——webpack来搭建一个完全不依赖服务器的开发环境。实现高效集成、实时编辑可见、动态编译jsx和es6等强悍功能。</p>\n\n<h3 id="h3-1">添加webpack</h3>\n<p>webpack最早是Facebook的instagram团队研发出的脚手架工具，用于支持前端系统的开发。虽然webpack一直都和react嵌套在一起使用，但是他的使用场景并不局限于react，你可以把他应用于所有的前端开发场景。</p>\n<p>webpack也是依赖nodejs和npm的，在安装webpack之前务必先安装nodejs的环境，如果在此之前你还没有安装nodejs的环境，可以看这篇<a title="nodejs安装介绍" href="http://www.chkui.com/article/nodeJs/install_nodejs_runtime_environment">关于nodejs安装</a>的文章获得一些参考。</p>\n<p>可以像下面这样安装一个全局的webpack环境。</p>\n<pre class=""><code class=""><span class="code-variable"><span class="code-variable">$ </span></span>npm install webpack -g</code></pre>\n<p>或者以依赖工程的方式安装</p>\n<pre class=""><code class=""><span class="code-comment"><span class="code-comment"># 进入项目目录</span></span>\n<span class="code-comment"><span class="code-comment"># 确定已经有 package.json，没有就通过 npm init 创建</span></span>\n<span class="code-comment"><span class="code-comment"># 安装 webpack 依赖</span></span>\n<span class="code-variable"><span class="code-variable">$ </span></span>npm install webpack --save-dev</code></pre>\n\n<h3 id="h3-2">测试运行webpack</h3>\n<p>（本例子的代码存放在：<a title="React搭建开发环境示例代码" href="https://github.com/chkui/webpack-demo" rel="nofollow">https://github.com/chkui/webpack-demo</a>。下载后用 npm install 下载npm依赖即可使用。）</p>\n<p>Setp1:简单打包</p>\n<p>首先我们增加一些用于测试元素。先写一个index.html</p>\n<pre class="xml"><code class="language-html xml"><span class="code-meta"><span class="code-meta">&lt;!DOCTYPE html&gt;</span></span>\n<span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span class="code-tag"><span class="code-name">html</span></span></span><span class="code-tag"> </span><span class="hljs-attr"><span class="code-tag"><span class="hljs-attr">lang</span></span></span><span class="code-tag">=</span><span class="code-string"><span class="code-tag"><span class="code-string">"en"</span></span></span><span class="code-tag">&gt;</span></span>\n<span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span class="code-tag"><span class="code-name">head</span></span></span><span class="code-tag">&gt;</span></span>\n    <span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span class="code-tag"><span class="code-name">meta</span></span></span><span class="code-tag"> </span><span class="hljs-attr"><span class="code-tag"><span class="hljs-attr">charset</span></span></span><span class="code-tag">=</span><span class="code-string"><span class="code-tag"><span class="code-string">"UTF-8"</span></span></span><span class="code-tag">&gt;</span></span>\n    <span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span class="code-tag"><span class="code-name">title</span></span></span><span class="code-tag">&gt;</span></span>Title<span class="code-tag"><span class="code-tag">&lt;/</span><span class="code-name"><span class="code-tag"><span class="code-name">title</span></span></span><span class="code-tag">&gt;</span></span>\n<span class="code-tag"><span class="code-tag">&lt;/</span><span class="code-name"><span class="code-tag"><span class="code-name">head</span></span></span><span class="code-tag">&gt;</span></span>\n<span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span class="code-tag"><span class="code-name">body</span></span></span><span class="code-tag">&gt;</span></span>\n    <span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span class="code-tag"><span class="code-name">script</span></span></span><span class="code-tag"> </span><span class="hljs-attr"><span class="code-tag"><span class="hljs-attr">src</span></span></span><span class="code-tag">=</span><span class="code-string"><span class="code-tag"><span class="code-string">"bundle.js"</span></span></span><span class="code-tag">&gt;</span></span><span class="undefined"></span><span class="code-tag"><span class="undefined"></span><span class="code-tag">&lt;/</span><span class="code-name"><span class="code-tag"><span class="code-name">script</span></span></span><span class="code-tag">&gt;</span></span>\n<span class="code-tag"><span class="code-tag">&lt;/</span><span class="code-name"><span class="code-tag"><span class="code-name">body</span></span></span><span class="code-tag">&gt;</span></span>\n<span class="code-tag"><span class="code-tag">&lt;/</span><span class="code-name"><span class="code-tag"><span class="code-name">html</span></span></span><span class="code-tag">&gt;</span></span></code></pre>\n<p>然后添加一个entry.js</p>\n<pre class="javascript"><code class="language-javascript"><span class="code-comment"><span class="code-comment">/**\n * Created by chkui on 2016/11/16.\n */</span></span>\n<span class="code-built_in"><span class="code-built_in">require</span></span>(<span class="code-string"><span class="code-string">"!style!css!./style.css"</span></span>);\n<span class="code-built_in"><span class="code-built_in">document</span></span>.write(<span class="code-string"><span class="code-string">\'&lt;h1&gt;hello webpack&lt;/h1&gt;\'</span></span>);</code></pre>\n<p>然后就可以执行打包命令了：</p>\n<pre class=""><code class="language-bash"><span class="code-variable">$ </span>webpack ./entry.js bundle.js</code></pre>\n<p>运行以后，就会发现在目录中生成了一个bundle.js文件。浏览器中打开index.html就会看到执行效果。</p>\n<p>Step2:利用webpack分析工具打包&nbsp;</p>\n<p>增加一个名为module.js的文件：</p>\n<pre class="javascript"><code class="language-javascript"><span class="code-comment"><span class="code-comment">/**\n * Created by chkui on 2016/11/16.\n */</span></span>\n<span class="code-built_in"><span class="code-built_in">module</span></span>.exports = <span class="code-string"><span class="code-string">\'It works from module.js.\'</span></span></code></pre>\n<p>在原来的entry.js增加引用：</p>\n<pre class="javascript"><code class="language-javascript"><span class="code-comment"><span class="code-comment">/**\n * Created by chkui on 2016/11/16.\n */</span></span>\n<span class="code-built_in"><span class="code-built_in">require</span></span>(<span class="code-string"><span class="code-string">"!style!css!./style.css"</span></span>);\n<span class="code-built_in"><span class="code-built_in">document</span></span>.write(<span class="code-string"><span class="code-string">\'&lt;h1&gt;hello webpack&lt;/h1&gt;\'</span></span>);\n<span class="code-comment"><span class="code-comment">//新增对module.js的引用</span></span>\n<span class="code-built_in"><span class="code-built_in">document</span></span>.write(<span class="code-built_in"><span class="code-built_in">require</span></span>(<span class="code-string"><span class="code-string">\'./module.js\'</span></span>));</code></pre>\n<p>然后同样执行webpack打包命令：</p>\n<pre class=""><code class="language-bash"><span class="code-variable">$ </span>webpack ./entry.js bundle.js</code></pre>\n<p>然后在打开index.html，会发现我们新增加的module.js的内容被正确输出。这是因为我们在页面中通过nodejs的require的方式引入的module.js，而使用webpack打包时会自动在依赖关系中引入module.js。</p>\n\n<h3 id="h3-3">加载器</h3>\n<p>webpack提供了一个非常强大的loader功能，这个功能可以用于管理各种依赖关系模块，在webpack中所有的文件都视作一个模块。</p>\n<p>首先npm导入webpack loader：</p>\n<pre class="sql"><code class="language-bash">npm <span class="code-keyword">install</span> css-loader <span class="code-keyword">style</span>-loader</code></pre>\n<p>添加一个用于测试的style.css文件：</p>\n<pre class="css"><code class="language-css"><span class="code-selector-tag"><span class="code-selector-tag">h1</span></span>{\n    <span class="code-attribute"><span class="code-attribute">color</span></span>:red;\n}</code></pre>\n<p>在entry.js中添加引用：</p>\n<pre class="javascript"><code class="language-javascript"><span class="code-comment"><span class="code-comment">/**\n * Created by chkui on 2016/11/16.\n */</span></span>\n<span class="code-built_in"><span class="code-built_in">require</span></span>(<span class="code-string"><span class="code-string">"!style!css!./style.css"</span></span>);<span class="code-comment"><span class="code-comment">//添加对css的引用</span></span>\n<span class="code-built_in"><span class="code-built_in">document</span></span>.write(<span class="code-string"><span class="code-string">\'&lt;h1&gt;hello webpack&lt;/h1&gt;\'</span></span>);\n<span class="code-built_in"><span class="code-built_in">document</span></span>.write(<span class="code-built_in"><span class="code-built_in">require</span></span>(<span class="code-string"><span class="code-string">\'./module.js\'</span></span>));</code></pre>\n<p>使用命令行打包：</p>\n<pre class=""><code class="language-bash">webpack ./entry.js bundle.js --<span class="code-keyword">module</span>-bind <span class="code-string"><span class="code-string">\'css=style!css\'</span></span></code></pre>\n<p>会发现css的样式生效了。可以将繁琐的“!style!css!./style.css”简写成"./style.css"。</p>\n\n<h3 id="h3-4">使用配置管理</h3>\n<p>细心的人会发现，我们每次使用命令行打包都带了大量的参数，这样不仅繁琐更不利于规模化使用。webpack同样可以使用标准化配置文件来替代命令行中的各种参数。</p>\n<p>webpack的配置文件是nodejs的文件，通常命名为&nbsp;<code>webpack.config.js</code>。我们在工程中增加配置文件：</p>\n<pre class="typescript"><code class="language-javascript"><span class="code-comment"><span class="code-comment">/**\n * Created by chkui on 2016/11/16.\n */</span></span>\n<span class="code-built_in"><span class="code-built_in">module</span></span>.exports = {\n    entry: <span class="code-string"><span class="code-string">\'./entry.js\'</span></span>,<span class="code-comment"><span class="code-comment">//定义要引入的js文件</span></span>\n    output: {\n        path: __dirname,\n        filename: <span class="code-string"><span class="code-string">\'bundle.js\'</span></span> <span class="code-comment"><span class="code-comment">//定义要输出的js文件</span></span>\n    },\n    <span class="code-built_in"><span class="code-keyword">module</span></span>: {\n        loaders: [<span class="code-comment"><span class="code-comment">//定义加载内容</span></span>\n            {test: <span class="hljs-regexp"><span class="hljs-regexp">/\\.css$/</span></span>, loader: <span class="code-string"><span class="code-string">\'style!css\'</span></span>}\n        ]\n    }\n}</code></pre>\n<p>现在，我们在命令行中输入webpack就可以实现和前面一样的打包。</p>\n\n<h3 id="h3-5">丰富打包输出内容</h3>\n<p>可以使用：</p>\n<pre class="lua"><code class="lua">webpack <span class="code-comment"><span class="code-comment">--progress --colors</span></span></code></pre>\n<p>命令来丰富打包输出的内容，更容易了解出现的问题。</p>\n\n<h3 id="h3-6">监听更新模式</h3>\n<p>在我们进行编码开发的时候，每次对文件的编辑我们都想立即看到编译效果，如果每次编辑都要去打包，会非常麻烦。webpack提供了一个监听模式（类似grunt的watch），用于监听每次对文件的修改，修改后会立即进行增量更新。启用监听模式：</p>\n<pre class="lua"><code class="lua">webpack <span class="code-comment"><span class="code-comment">--progress --colors --watch</span></span></code></pre>\n<p>监听模式使用的是内存增量更新。webpack会将所有需要打包的文件copy到内存，然后监控文件修改，如果文件发生了修改，会将修改的文件替换内存中的对应文件。因此开发完之后，切记进行一次手动打包才能生效。</p>\n\n<h3 id="h3-7">开发环境模式</h3>\n<p>webpack更强大的是，他整合了nodejs的express提供了一个静态服务器。（虽然没有官方正式，我觉得webstrom和微信本地开发环境都是整合的nodejs的express）</p>\n<p>使用了开发环境模式，我们所有的动态修改和操作都可以实时看到效果，并且解决了静态资源各种路径引用的问题。首先npm安装工具：</p>\n<pre class="sql"><code class="language-bash">npm <span class="code-keyword">install</span> webpack-dev-<span class="code-keyword">server</span> -g</code></pre>\n<p>然后使用命令行工具启用开发环境：</p>\n<pre class="lua"><code class="language-bash">webpack-dev-server <span class="code-comment">--progress --colors</span></code></pre>\n<p>webpack的开发环境模式很强悍，比使用--watch更犀利的地方在于可以实现编辑即可见。浏览器立即同步刷新运行。开发环境模式可以延伸到生产环境实现代码同步级别的热部署。&nbsp;</p>\n\n<h4 id="h4-1">开发环境扩展——Linux下文件变化监控个数配置</h4>\n<p>webpack在linux下监控文件的变化用到了 Inotify机制。有可能在文件比较多的时候修改、编辑文件无法触发webpack热部署。我们可以通过一下方式检测并调整监控文件个数：</p>\n<pre class="tcl"><code class="language-bash"><span class="code-comment"><span class="code-comment">#检查inotify监控文件的个数</span></span>\ncat /<span class="code-keyword">proc</span>/sys/fs/inotify/max_user_watches</code></pre>\n<p>然后可以</p>\n<pre class="bash"><code class="language-bash"><span class="code-comment"><span class="code-comment">#将同时监控的文件个数修改为18000</span></span>\n<span class="code-built_in"><span class="code-built_in">echo</span></span> fs.inotify.max_user_watches=18000 | sudo tee <span class="hljs-_"><span class="hljs-_">-a</span></span> /etc/sysctl.conf &amp;&amp; sudo sysctl -p\n</code></pre>\n<p>再次查看个数可以看到输出已经配置的参数</p>\n\n<h4 id="h4-2">开发环境扩展——webstorm的坑</h4>\n<p>由于本人的前端页面使用webstorm开发，在使用过程中发现了一个webstorm的坑。webstorm有文件缓存的功能，在编辑完毕保存之后并不会实时的更新磁盘文件，这样的就导致webpack的开发环境无法同步更新文件。以下是解决方法：</p>\n<p>1.File-&gt;settings-&gt;System Settings</p>\n<p>2.找到弹出框的Use "safe write"，将其勾选解除。</p>\n<p><img alt="React 搭建开发环境" height="507" src="https://file.mahoooo.com/res/file/react_establish_development_environment_1.png" width="1020"></p>\n\n<h3 id="h3-8">输出调试信息</h3>\n<p>webpack的配置较为复杂，一不小心就会出现错误。它提供了一个输出调试信息的参数：</p>\n<pre class="lua"><code class="language-bash">$ webpack <span class="code-comment">--display-error-details</span></code></pre>\n<p>调试运行webpack命令出错的时候使用。Webpack 中涉及路径配置最好使用绝对路径，建议通过&nbsp;<code>path.resolve(__dirname, "app/folder")</code>&nbsp;或&nbsp;<code>path.join(__dirname, "app", "folder")</code>&nbsp;的方式来配置，以兼容 Windows 环境。</p>\n\n<h3 id="h3-9">webpack插件</h3>\n<p>某些时候，webpack的常规功能无法满足我们的需求，我们可以为webpack开发插件，或者使用其他开发团队已经完成的插件。</p>\n<p>下面是一个插件的标准格式：</p>\n<pre class="javascript"><code class="language-javascript"><span class="hljs-function"><span class="code-keyword"><span class="hljs-function"><span class="code-keyword">function</span></span></span><span class="hljs-function"> </span><span class="code-title"><span class="hljs-function"><span class="code-title">MyPlugin</span></span></span><span class="hljs-function">(</span><span class="hljs-params"><span class="hljs-function"><span class="hljs-params">options</span></span></span><span class="hljs-function">) </span></span>{\n  <span class="code-comment"><span class="code-comment">// Configure your plugin with options...</span></span>\n}\n\nMyPlugin.prototype.apply = <span class="hljs-function"><span class="code-keyword"><span class="hljs-function"><span class="code-keyword">function</span></span></span><span class="hljs-function">(</span><span class="hljs-params"><span class="hljs-function"><span class="hljs-params">compiler</span></span></span><span class="hljs-function">) </span></span>{\n  compiler.plugin(<span class="code-string"><span class="code-string">"compile"</span></span>, <span class="hljs-function"><span class="code-keyword"><span class="hljs-function"><span class="code-keyword">function</span></span></span><span class="hljs-function">(</span><span class="hljs-params"><span class="hljs-function"><span class="hljs-params">params</span></span></span><span class="hljs-function">) </span></span>{\n    <span class="code-built_in"><span class="code-built_in">console</span></span>.log(<span class="code-string"><span class="code-string">"The compiler is starting to compile..."</span></span>);\n  });\n\n  compiler.plugin(<span class="code-string"><span class="code-string">"compilation"</span></span>, <span class="hljs-function"><span class="code-keyword"><span class="hljs-function"><span class="code-keyword">function</span></span></span><span class="hljs-function">(</span><span class="hljs-params"><span class="hljs-function"><span class="hljs-params">compilation</span></span></span><span class="hljs-function">) </span></span>{\n    <span class="code-built_in"><span class="code-built_in">console</span></span>.log(<span class="code-string"><span class="code-string">"The compiler is starting a new compilation..."</span></span>);\n\n    compilation.plugin(<span class="code-string"><span class="code-string">"optimize"</span></span>, <span class="hljs-function"><span class="code-keyword"><span class="hljs-function"><span class="code-keyword">function</span></span></span><span class="hljs-function">(</span><span class="hljs-params"></span><span class="hljs-function"><span class="hljs-params"></span>) </span></span>{\n      <span class="code-built_in"><span class="code-built_in">console</span></span>.log(<span class="code-string"><span class="code-string">"The compilation is starting to optimize files..."</span></span>);\n    });\n  });\n\n  compiler.plugin(<span class="code-string"><span class="code-string">"emit"</span></span>, <span class="hljs-function"><span class="code-keyword"><span class="hljs-function"><span class="code-keyword">function</span></span></span><span class="hljs-function">(</span><span class="hljs-params"><span class="hljs-function"><span class="hljs-params">compilation, callback</span></span></span><span class="hljs-function">) </span></span>{\n    <span class="code-built_in"><span class="code-built_in">console</span></span>.log(<span class="code-string"><span class="code-string">"The compilation is going to emit files..."</span></span>);\n    callback();\n  });\n};\n\n<span class="code-built_in"><span class="code-built_in">module</span></span>.exports = MyPlugin;</code></pre>\n<p>需要实现什么功能，可以按照这个标准去开发自己的插件。</p>\n\n<h2 id="h2-3">React开发</h2>\n<p>使用webpack搭建好开发环境后，我们就可以开始着手开发react了。开始之前，我们还是要优先完成开发环境的配置和搭建。</p>\n<p>react使用的语法是jsx，现在还新增了对es6的支持。为了可以高效开发，我们需要使用webpack的loader功能，将jsx或es6使用语法糖转义成浏览器可以识别的标准JavaScript语法。</p>\n<p>下面将继续在前文webpack的基础上继续说明如何开发react。</p>\n\n<h3 id="h3-10">安装必要的依赖工具</h3>\n<p>react的基础工具包：</p>\n<pre class="sql"><code class="language-bash">$ npm <span class="code-keyword">install</span> react <span class="code-comment">--save-dev</span></code></pre>\n<p>react的dom组件：</p>\n<pre class="sql"><code class="language-bash">$ npm <span class="code-keyword">install</span> react react-dom <span class="code-comment">--save-dev</span></code></pre>\n<p>在前面介绍webpack的时候已经介绍了加载器的概念，这里需要额外安装babel用于对react的jsx风格的编码进行解析，babel除了jsx外还可以解析es6等。安装babel：</p>\n<pre class=""><code class="language-bash"><span class="code-variable">$ </span>npm install babel-loader</code></pre>\n<p>安装babel-loader之后\\node_modules目录中会额外多安装一个babel-core，这是babel的核心包。</p>\n<p>有了babel，我们还需要安装编码转换规则，用于解析jsx、es6等等。</p>\n<pre class="sql"><code class="language-bash">$ npm <span class="code-keyword">install</span> babel-preset-es2015 babel-preset-react <span class="code-comment">--save-dev</span></code></pre>\n<p>除了babel提供的es6和jsx，webpack还可以使用各种loader来转换编码，比如coffeescript等。想要什么就去google找吧。</p>\n\n<h3 id="h3-11">完善本地开发环境命令</h3>\n<p>前面的案例使用 webpack-dev-server 来热部署本地开发环境提升开发效率。但是每次都靠长长的命令行启动和停止太过于繁琐。我们可以利用npm的package.json配置脚本运行来统一管理脚本命令：</p>\n<pre class="actionscript"><code class="language-javascript">{\n  <span class="code-string"><span class="code-string">"name"</span></span>: <span class="code-string"><span class="code-string">"demo2-react"</span></span>,\n  <span class="code-string"><span class="code-string">"version"</span></span>: <span class="code-string"><span class="code-string">"1.0.0"</span></span>,\n  <span class="code-string"><span class="code-string">"description"</span></span>: <span class="code-string"><span class="code-string">"react demo"</span></span>,\n  <span class="code-string"><span class="code-string">"main"</span></span>: <span class="code-string"><span class="code-string">"index.js"</span></span>,\n  <span class="code-string"><span class="code-string">"scripts"</span></span>:{\n    <span class="code-string"><span class="code-string">"dev"</span></span>: <span class="code-string"><span class="code-string">"webpack-dev-server --progress --colors --inline"</span></span> <span class="code-comment"><span class="code-comment">//配置运行命令</span></span>\n  },\n  <span class="code-comment"><span class="code-comment">//more</span></span>\n}</code></pre>\n<p>添加了scripts后，我们今后只需要运行</p>\n<pre class=""><code class="language-bash"><span class="code-variable">$ </span>npm run dev</code></pre>\n<p>即可使用配置好的命令行参数启动本地开发环境服务器。</p>\n\n<h3 id="h3-12">终于可以开始码农的核心工作了</h3>\n<p>（demo代码存放在：<a title="React搭建开发环境示例代码" href="https://github.com/chkui/react-demo" rel="nofollow">https://github.com/chkui/react-demo</a>。下载后用 npm install 下载npm依赖即可使用）</p>\n<p>前面准备了这么久，就是为了随后我们可以快乐的编码。首先我们按照下面这个结构创建工程结构：</p>\n<pre class="haml"><code class="haml"><span class="code-comment"><span class="code-comment">/root</span></span>\n-<span class="ruby"><span class="ruby">-</span><span class="hljs-regexp"><span class="ruby"><span class="hljs-regexp">/dev\n</span></span></span></span>-<span class="ruby"><span class="hljs-regexp"><span class="ruby"><span class="hljs-regexp">---/js</span></span></span><span class="ruby">\n</span></span>-<span class="ruby"><span class="ruby">-----</span><span class="hljs-regexp"><span class="ruby"><span class="hljs-regexp">/index\n</span></span></span></span>-<span class="ruby"><span class="hljs-regexp"><span class="ruby"><span class="hljs-regexp">-------/comps</span></span></span><span class="ruby">\n</span></span>-<span class="ruby"><span class="ruby">---------component1.jsx\n</span></span>-<span class="ruby"><span class="ruby">---------main.jsx\n</span></span>-<span class="ruby"><span class="ruby">-------index.js\n</span></span>-<span class="ruby"><span class="ruby">---</span><span class="hljs-regexp"><span class="ruby"><span class="hljs-regexp">/style\n</span></span></span></span>-<span class="ruby"><span class="hljs-regexp"><span class="ruby"><span class="hljs-regexp">-----/index</span></span></span><span class="ruby">\n</span></span>-<span class="ruby"><span class="ruby">-------index.css\n</span></span>-<span class="ruby"><span class="ruby">---index.html</span></span></code></pre>\n<p>然后根据工程的结构修改我们的webpack.config.js：</p>\n<pre class="typescript"><code class="language-javascript"><span class="code-comment"><span class="code-comment">/**\n * Created by Administrator on 2016/11/17.\n */</span></span>\n<span class="code-keyword"><span class="code-keyword">var</span></span> path = <span class="code-built_in"><span class="code-built_in">require</span></span>(<span class="code-string"><span class="code-string">\'path\'</span></span>);\n<span class="code-built_in"><span class="code-built_in">module</span></span>.exports = {\n    entry: [<span class="code-string"><span class="code-string">\'./dev/js/index/comps/main.jsx\'</span></span>],<span class="code-comment"><span class="code-comment">//定义要引入的js文件</span></span>\n    output: {\n        path: __dirname,\n        filename: <span class="code-string"><span class="code-string">\'./dev/js/index/index.js\'</span></span> <span class="code-comment"><span class="code-comment">//定义要输出的js文件</span></span>\n    },\n    <span class="code-built_in"><span class="code-keyword">module</span></span>: {\n        loaders: [{\n            test: <span class="hljs-regexp"><span class="hljs-regexp">/\\.js[x]?$/</span></span>,\n            exclude: <span class="hljs-regexp"><span class="hljs-regexp">/(node_modules|bower_components)/</span></span>,\n            loader: <span class="code-string"><span class="code-string">\'babel-loader\'</span></span>,\n            query: {\n                presets: [<span class="code-string"><span class="code-string">\'es2015\'</span></span>,<span class="code-string"><span class="code-string">\'react\'</span></span>]\n            }\n        }, {\n            test: <span class="hljs-regexp"><span class="hljs-regexp">/\\.css$/</span></span>,\n            loader: <span class="code-string"><span class="code-string">\'style!css\'</span></span>\n        }, {\n            test: <span class="hljs-regexp"><span class="hljs-regexp">/\\.(png|jpg)$/</span></span>,\n            loader: <span class="code-string"><span class="code-string">\'url?limit=25000\'</span></span> <span class="code-comment"><span class="code-comment">//只解析小于25000字节的图片</span></span>\n        }]\n    }\n};</code></pre>\n<p>和前面介绍webpack的例子相比，这里的配置文件新增了了一个babel-loader的配置。</p>\n<p>test后的正则表达式表示对所有的js或者jsx文件进行解析；</p>\n<p>exclude表示不解析npm安装目录下和bower安装目录下的文件；</p>\n<p>loader表示使用的解析工具；</p>\n<p>query表示扩展参数，这里的\'es2015\'和\'react\'表示启用babel-preset-es2015和bable-preset-react解析规则。这里需要注意的是解析的优先级的倒序的，即会先解析‘react’。</p>\n<p>然后我们添加编码内容（所有的例子都分别实现了jsx规范和es2015规范）：</p>\n<p>index.html：</p>\n<pre class="xml"><code class="language-html xml"><span class="code-meta"><span class="code-meta">&lt;!DOCTYPE html&gt;</span></span>\n<span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span class="code-tag"><span class="code-name">html</span></span></span><span class="code-tag"> </span><span class="hljs-attr"><span class="code-tag"><span class="hljs-attr">lang</span></span></span><span class="code-tag">=</span><span class="code-string"><span class="code-tag"><span class="code-string">"en"</span></span></span><span class="code-tag">&gt;</span></span>\n<span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span class="code-tag"><span class="code-name">head</span></span></span><span class="code-tag">&gt;</span></span>\n    <span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span class="code-tag"><span class="code-name">meta</span></span></span><span class="code-tag"> </span><span class="hljs-attr"><span class="code-tag"><span class="hljs-attr">charset</span></span></span><span class="code-tag">=</span><span class="code-string"><span class="code-tag"><span class="code-string">"UTF-8"</span></span></span><span class="code-tag">&gt;</span></span>\n    <span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span class="code-tag"><span class="code-name">title</span></span></span><span class="code-tag">&gt;</span></span>Title<span class="code-tag"><span class="code-tag">&lt;/</span><span class="code-name"><span class="code-tag"><span class="code-name">title</span></span></span><span class="code-tag">&gt;</span></span>\n<span class="code-tag"><span class="code-tag">&lt;/</span><span class="code-name"><span class="code-tag"><span class="code-name">head</span></span></span><span class="code-tag">&gt;</span></span>\n<span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span class="code-tag"><span class="code-name">body</span></span></span><span class="code-tag">&gt;</span></span>\n    <span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span class="code-tag"><span class="code-name">div</span></span></span><span class="code-tag"> </span><span class="hljs-attr"><span class="code-tag"><span class="hljs-attr">id</span></span></span><span class="code-tag">=</span><span class="code-string"><span class="code-tag"><span class="code-string">"comp"</span></span></span><span class="code-tag">&gt;</span></span><span class="code-tag"><span class="code-tag">&lt;/</span><span class="code-name"><span class="code-tag"><span class="code-name">div</span></span></span><span class="code-tag">&gt;</span></span>\n    <span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span class="code-tag"><span class="code-name">script</span></span></span><span class="code-tag"> </span><span class="hljs-attr"><span class="code-tag"><span class="hljs-attr">src</span></span></span><span class="code-tag">=</span><span class="code-string"><span class="code-tag"><span class="code-string">"/dev/js/index/index.js"</span></span></span><span class="code-tag">&gt;</span></span><span class="undefined"></span><span class="code-tag"><span class="undefined"></span><span class="code-tag">&lt;/</span><span class="code-name"><span class="code-tag"><span class="code-name">script</span></span></span><span class="code-tag">&gt;</span></span>\n<span class="code-tag"><span class="code-tag">&lt;/</span><span class="code-name"><span class="code-tag"><span class="code-name">body</span></span></span><span class="code-tag">&gt;</span></span>\n<span class="code-tag"><span class="code-tag">&lt;/</span><span class="code-name"><span class="code-tag"><span class="code-name">html</span></span></span><span class="code-tag">&gt;</span></span></code></pre>\n<p>main.jsx：</p>\n<pre class="javascript"><code class="language-javascript"><span class="code-comment"><span class="code-comment">/**\n * Created by chkui on 2016/11/17.\n */</span></span>\n\n<span class="code-comment"><span class="code-comment">//jsx</span></span>\n<span class="code-comment"><span class="code-comment">/*\nvar React = require(\'react\');\nvar ReactDOM = require(\'react-dom\');\nvar Comp1 = require(\'./component1.jsx\');\nrequire(\'../../../style/index/index.css\');\n\nReactDOM.render(\n    &lt;div className="main"&gt;\n        react jsx demo:\n        &lt;Comp1 /&gt;\n    &lt;/div&gt;,\n    document.getElementById(\'comp\')\n);\n*/</span></span>\n\n<span class="code-comment"><span class="code-comment">//es2015</span></span>\n<span class="code-keyword"><span class="code-keyword">import</span></span> React <span class="code-keyword"><span class="code-keyword">from</span></span> <span class="code-string"><span class="code-string">\'react\'</span></span>;\n<span class="code-keyword"><span class="code-keyword">import</span></span> ReactDOM <span class="code-keyword"><span class="code-keyword">from</span></span> <span class="code-string"><span class="code-string">\'react-dom\'</span></span>;\n<span class="code-keyword"><span class="code-keyword">import</span></span> Comp1 <span class="code-keyword"><span class="code-keyword">from</span></span> <span class="code-string"><span class="code-string">\'./component1.jsx\'</span></span> <span class="code-comment"><span class="code-comment">/*切记，大写是变量小写是标签*/</span></span>\n<span class="code-keyword"><span class="code-keyword">import</span></span> style <span class="code-keyword"><span class="code-keyword">from</span></span> <span class="code-string"><span class="code-string">\'../../../style/index/index.css\'</span></span>\n\nReactDOM.render(\n    <span class="xml"><span class="code-tag"><span class="xml"><span class="code-tag">&lt;</span></span><span class="code-name"><span class="xml"><span class="code-tag"><span class="code-name">div</span></span></span></span><span class="xml"><span class="code-tag"> </span></span><span class="hljs-attr"><span class="xml"><span class="code-tag"><span class="hljs-attr">className</span></span></span></span><span class="xml"><span class="code-tag">=</span></span><span class="code-string"><span class="xml"><span class="code-tag"><span class="code-string">"main"</span></span></span></span><span class="xml"><span class="code-tag">&gt;</span></span></span><span class="xml">\n        react es2015 demo:\n        </span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;</span></span><span class="code-name"><span class="xml"><span class="code-tag"><span class="code-name">Comp1</span></span></span></span><span class="xml"><span class="code-tag"> /&gt;</span></span></span><span class="xml">\n    </span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;/</span></span><span class="code-name"><span class="xml"><span class="code-tag"><span class="code-name">div</span></span></span></span><span class="xml"><span class="code-tag">&gt;</span></span></span></span>\n    ,\n    <span class="code-built_in"><span class="code-built_in">document</span></span>.getElementById(<span class="code-string"><span class="code-string">\'comp\'</span></span>)\n);\n</code></pre>\n<p>component1.jsx：</p>\n<pre class="scala"><code class="language-javascript"><span class="code-comment"><span class="code-comment">/**\n * Created by Administrator on 2016/11/17.\n */</span></span>\n\n<span class="code-comment"><span class="code-comment">//jsx</span></span>\n<span class="code-comment"><span class="code-comment">/*\nvar React = require(\'react\');\nvar comp1 = React.createClass({\n    render: function () {\n        return (\n          &lt;div className = "index"&gt;\n            hello react!\n          &lt;/div&gt;\n        );\n    }\n});\nmodule.exports = comp1;\n*/</span></span>\n\n<span class="code-comment"><span class="code-comment">//es6</span></span>\n<span class="code-keyword"><span class="code-keyword">import</span></span> <span class="code-type">React</span> <span class="code-keyword">from</span> <span class="code-string"><span class="code-string">"react"</span></span>\n<span class="hljs-class"><span class="code-keyword"><span class="hljs-class"><span class="code-keyword">class</span></span></span><span class="hljs-class"> </span><span class="code-title"><span class="hljs-class"><span class="code-title">Comp1</span></span></span><span class="hljs-class"> </span><span class="code-keyword"><span class="hljs-class"><span class="code-keyword">extends</span></span></span><span class="hljs-class"> </span><span class="code-title"><span class="hljs-class"><span class="code-title">React</span></span></span><span class="hljs-class">.</span><span class="code-title"><span class="hljs-class"><span class="code-title">Component</span></span></span></span>{\n    <span class="code-comment"><span class="code-comment">//构造函数</span></span>\n    <span class="code-keyword">constructor</span>(...args){\n        <span class="code-keyword"><span class="code-keyword">super</span></span>(...args);\n    }\n    <span class="code-comment"><span class="code-comment">//覆盖父类的渲染方法</span></span>\n    render() {\n        <span class="code-keyword"><span class="code-keyword">return</span></span> (\n            <span class="xml"><span class="code-tag">&lt;<span class="code-name">div</span> <span class="hljs-attr">className</span> = <span class="code-string"><span class="code-string">"index"</span></span>&gt;</span>\n                hello react!\n            <span class="code-tag">&lt;/<span class="code-name">div</span>&gt;</span></span>\n        );\n    }\n}\n<span class="code-keyword">export</span> <span class="code-keyword"><span class="code-keyword">default</span></span> <span class="code-type">Comp1</span>;\n</code></pre>\n<p>编码完毕之后，我们使用我们设定好的脚本运行我们的本地开发环境：</p>\n<pre class=""><code class="language-bash"><span class="code-variable">$ </span>npm run dev</code></pre>\n<p>启动时，所有的文本都会被读取到内存中，我们可以根据输出来聊天到底添加了哪些依赖的文件。启动完成后，浏览器上输入&nbsp;http://localhost:8080/dev/index.html 或&nbsp;http://localhost:8080/webpack-dev-server/dev/index.html 即可看到我们用react开发的页面。此时修改js或css文件，编辑效果都会立刻呈现在浏览器上。</p>\n\n<h2 id="h2-4">React浏览器调试工具</h2>\n<p>Facebook提供了基于chrome的页面调试工具，可以看到所有react组件及其效果。</p>\n<p>工具安装：</p>\n<ol>\n    <li>首先最重要的是——翻墙-_-。不翻墙chrome的网上商店就别想了。</li>\n    <li>然后在chrome网店搜索“React Developer Tool”。</li>\n    <li>找到后添加到chrome。</li>\n</ol>\n<p>添加完成后可以发现在chrome中增加了react的图标。</p>\n<p><img alt="React 搭建开发环境" height="282" src="https://file.mahoooo.com/res/file/react_establish_development_environment_2.png" width="638"></p>\n<p>然后在demo页面按F12打开开发人员工具，会发现多了一个React栏目。选择这个栏目后，会显示出React组件的效果。</p>\n<p><img alt="React 搭建开发环境" height="198" src="https://file.mahoooo.com/res/file/react_establish_development_environment_3.png" width="693"></p>'}};