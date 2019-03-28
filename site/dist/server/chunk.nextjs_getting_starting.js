exports.ids=[52],exports.modules={327:function(s,a,n){"use strict";Object.defineProperty(a,"__esModule",{value:!0});a.content='<h2 id="h2-1">阅读之前</h2>\n<p>在了解<em>Next.js</em>之前，需要掌握<a href="https://www.chkui.com/category/react" title="React">React</a>的基本使用方法。</p>\n<p>参考代码：<a href="https://github.com/chkui/nextjs-getting-started">https://github.com/chkui/nextjs-getting-started</a> 。\n</p>\n<h2 id="h2-2">搭建</h2>\n<h3 id="h3-1">安装</h3>\n<pre><code class="bash"><span class="code-comment"># 创建项目目录</span>\nmkdir you_project\n<span class="code-comment"># 进入项目目录</span>\n<span class="code-built_in">cd</span> you_project\n<span class="code-comment"># 初始化package.json</span>\nnpm init -y\n<span class="code-comment"># 安装依赖包</span>\nnpm install --save react react-dom next\n<span class="code-comment"># 创建一个pages文件夹</span>\nmkdir pages\n</code></pre>\n<p>依次执行以上命令之后，<em>Next.js</em>运行所需的最基本的目录和依赖就创建好了。</p>\n<h3 id="h3-2">运行</h3>\n<p>将<em>package.json</em>里的“scripts"字段修改为：</p>\n<pre><code class="json">{\n  <span class="hljs-attr">"scripts"</span>: {\n    <span class="hljs-attr">"dev"</span>: <span class="code-string">"next"</span>,\n    <span class="hljs-attr">"build"</span>: <span class="code-string">"next build"</span>,\n    <span class="hljs-attr">"start"</span>: <span class="code-string">"next start"</span>\n  }\n}\n</code></pre>\n<p>运行以下命令启动<em>Next.js</em>：</p>\n<pre><code class="shell">npm run dev\n</code></pre>\n<p>在浏览器打开<a href="http://localhost:3000/">http://localhost:3000/</a> 看到输出"404 - This page could not be found"，表示<em>Next.js</em>安装成功。\n</p>\n<h3 id="h3-3">添加页面</h3>\n<p><em>./pages</em>是<em>Next.js</em>默认的网页路径，其中的<em>index.js</em>就代表整个网站的主页。创建一个*./pages/index.js*组件：</p>\n<pre><code class="JavaScript"><span class="code-keyword">const</span> Index = <span class="hljs-function"><span\n        class="hljs-params">()</span> =&gt;</span> (\n  <span class="xml"><span class="code-tag">&lt;<span class="code-name">div</span>&gt;</span>\n    <span class="code-tag">&lt;<span class="code-name">p</span>&gt;</span>Hello World!<span class="code-tag">&lt;/<span\n              class="code-name">p</span>&gt;</span>\n  <span class="code-tag">&lt;/<span class="code-name">div</span>&gt;</span></span>\n)\n<span class="code-keyword">export</span> <span class="code-keyword">default</span> Index\n</code></pre>\n<p>添加*./pages/index.js*后网站会自动刷新，呈现"Hello World!"。</p>\n<h2 id="h2-3">页面与导航栏</h2>\n<h3 id="h3-4">页面</h3>\n<p>添加<a href="http://localhost:3000/about">http://localhost:3000/about</a> 路径下的页面。</p>\n<p>创建*./pages/about.js*文件，添加以下内容：</p>\n<pre><code class="JavaScript"><span class="code-keyword">export</span> <span class="code-keyword">default</span> () =&gt; (\n  <span class="xml"><span class="code-tag">&lt;<span class="code-name">div</span>&gt;</span>\n    <span class="code-tag">&lt;<span class="code-name">p</span>&gt;</span>About page<span class="code-tag">&lt;/<span\n              class="code-name">p</span>&gt;</span>\n  <span class="code-tag">&lt;/<span class="code-name">div</span>&gt;</span></span>\n)\n</code></pre>\n<p>然后在浏览器输入<a href="http://localhost:3000/about">http://localhost:3000/about</a> 即可看到新增的About。</p>\n<h3 id="h3-5">导航栏</h3>\n<p>对*./pages/index.js*稍加修改引入导航栏功能：</p>\n<pre><code class="JavaScript"><span class="code-keyword">import</span> Link <span class="code-keyword">from</span> <span\n        class="code-string">\'next/link\'</span>\n\n<span class="code-keyword">const</span> Index = <span class="hljs-function"><span\n            class="hljs-params">()</span> =&gt;</span> (\n  <span class="xml"><span class="code-tag">&lt;<span class="code-name">div</span>&gt;</span>\n    <span class="code-tag">&lt;<span class="code-name">Link</span> <span class="hljs-attr">href</span>=<span\n            class="code-string">"/about"</span>&gt;</span>\n      <span class="code-tag">&lt;<span class="code-name">a</span> <span class="hljs-attr">style</span>=<span\n              class="code-string">{{fontSize:</span> <span class="hljs-attr">20</span>}}&gt;</span>About Page<span\n              class="code-tag">&lt;/<span class="code-name">a</span>&gt;</span>\n    <span class="code-tag">&lt;/<span class="code-name">Link</span>&gt;</span>\n    <span class="code-tag">&lt;<span class="code-name">p</span>&gt;</span>Hello Next.js<span class="code-tag">&lt;/<span\n              class="code-name">p</span>&gt;</span>\n  <span class="code-tag">&lt;/<span class="code-name">div</span>&gt;</span></span>\n)\n\n<span class="code-keyword">export</span> <span class="code-keyword">default</span> Index\n</code></pre>\n<p><strong>注意</strong>：使用了<em>Next.js</em>作为服务端渲染工具，切记仅使用<em>next/link</em>中的Link组件。</p>\n<p>除了<code>&lt;a&gt;</code>标签，<code>&lt;button&gt;</code>或自定义的组件都可以被<code>Link</code>包装，只要传递<em>Click事件</em>即可，将上面的代码稍作修改实验这个效果：\n</p>\n<pre><code class="JavaScript"><span class="code-keyword">import</span> Link <span class="code-keyword">from</span> <span\n        class="code-string">\'next/link\'</span>\n\n<span class="code-keyword">const</span> Index = <span class="hljs-function"><span\n            class="hljs-params">()</span> =&gt;</span> (\n    <span class="xml"><span class="code-tag">&lt;<span class="code-name">div</span>&gt;</span>\n        <span class="code-tag">&lt;<span class="code-name">Link</span> <span class="hljs-attr">href</span>=<span\n                class="code-string">"/about"</span>&gt;</span>\n            <span class="code-tag">&lt;<span class="code-name">button</span>&gt;</span>Click Me<span class="code-tag">&lt;/<span\n                class="code-name">button</span>&gt;</span>\n        <span class="code-tag">&lt;/<span class="code-name">Link</span>&gt;</span>\n        <span class="code-tag">&lt;<span class="code-name">Link</span> <span class="hljs-attr">href</span>=<span\n                class="code-string">"/about"</span>&gt;</span>\n            <span class="code-tag">&lt;<span class="code-name">A</span>/&gt;</span>\n        <span class="code-tag">&lt;/<span class="code-name">Link</span>&gt;</span>\n        <span class="code-tag">&lt;<span class="code-name">p</span>&gt;</span>Hello Next.js<span\n                class="code-tag">&lt;/<span class="code-name">p</span>&gt;</span>\n    <span class="code-tag">&lt;/<span class="code-name">div</span>&gt;</span></span>\n)\n\n<span class="code-keyword">export</span> <span class="code-keyword">default</span> Index\n\n<span class="code-keyword">const</span> A = <span class="hljs-function"><span\n            class="hljs-params">props</span> =&gt;</span> (<span class="xml"><span class="code-tag">&lt;<span\n            class="code-name">div</span> <span class="hljs-attr">onClick</span>=<span class="code-string">{e</span> =&gt;</span> {\n    props.onClick(e)\n}}&gt;Click Me<span class="code-tag">&lt;/<span class="code-name">div</span>&gt;</span></span>)\n</code></pre>\n<p>关于<em>Next.js</em>路由管理相关的细节内容，<a href="https://github.com/zeit/next.js#routing" title="可以到这里查看">可以到这里查看</a></p>\n<h2 id="h2-4">页面、资源与组件</h2>\n<p><em>./pages</em>是一个保留路径，在*/pages*路径下任何js文件中导出的默认React组件都被视作一个页面。</p>\n<p>除了*./pages*，<em>Next.js</em>还有一个保留路径是*./static*，它用来存放图片等静态资源。</p>\n<p><em>Next.js</em>会对*./pages<em>中的React组件进行“包装"，所以</em>./pages*内外的React组件在呈现结果上有一些差异，看下面的例子。</p>\n<h3 id="h3-6">创建网站结构</h3>\n<p>在工程根目录创建*/components*文件夹，然后添加以下组件：</p>\n<pre><code class="JavaScript"><span class="code-keyword">import</span> Link <span class="code-keyword">from</span> <span\n        class="code-string">\'next/link\'</span>\n\n<span class="code-keyword">const</span> linkStyle = {\n    <span class="hljs-attr">marginRight</span>: <span class="hljs-number">15</span>\n}\n\n<span class="code-keyword">const</span> Header = <span class="hljs-function"><span\n            class="hljs-params">()</span> =&gt;</span> (\n    <span class="xml"><span class="code-tag">&lt;<span class="code-name">div</span>&gt;</span>\n        <span class="code-tag">&lt;<span class="code-name">Link</span> <span class="hljs-attr">href</span>=<span\n                class="code-string">"/"</span>&gt;</span>\n            <span class="code-tag">&lt;<span class="code-name">a</span> <span class="hljs-attr">style</span>=<span\n                    class="code-string">{linkStyle}</span>&gt;</span>Home<span class="code-tag">&lt;/<span\n                class="code-name">a</span>&gt;</span>\n        <span class="code-tag">&lt;/<span class="code-name">Link</span>&gt;</span>\n        <span class="code-tag">&lt;<span class="code-name">Link</span> <span class="hljs-attr">href</span>=<span\n                class="code-string">"/about"</span>&gt;</span>\n            <span class="code-tag">&lt;<span class="code-name">a</span> <span class="hljs-attr">style</span>=<span\n                    class="code-string">{linkStyle}</span>&gt;</span>About<span class="code-tag">&lt;/<span\n                class="code-name">a</span>&gt;</span>\n        <span class="code-tag">&lt;/<span class="code-name">Link</span>&gt;</span>\n    <span class="code-tag">&lt;/<span class="code-name">div</span>&gt;</span></span>\n)\n\n<span class="code-keyword">export</span> <span class="code-keyword">default</span> Header\n</code></pre>\n<p>然后将<code>Header</code>整合到<code>about.js</code>和<code>index.js</code>中：</p>\n<pre><code class="JavaScript"><span class="code-keyword">import</span> Header <span\n        class="code-keyword">from</span> <span class="code-string">\'../components/Header\'</span>\n<span class="code-keyword">export</span> <span class="code-keyword">default</span> () =&gt; (\n    <span class="xml"><span class="code-tag">&lt;<span class="code-name">div</span>&gt;</span>\n        <span class="code-tag">&lt;<span class="code-name">Header</span> /&gt;</span>\n        <span class="code-tag">&lt;<span class="code-name">p</span>&gt;</span>Hello Next.js<span\n                class="code-tag">&lt;/<span class="code-name">p</span>&gt;</span>\n    <span class="code-tag">&lt;/<span class="code-name">div</span>&gt;</span></span>\n)\n</code></pre>\n<p>再次进行页面操作，就会出现表头静止页面变换的效果。</p>\n<h3 id="h3-7">网站布局</h3>\n<p>通常情况下，开发一个网站先制定一个通用的布局（尤其是响应式布局的网站），然后再向布局中的添加各个部分的内容。使用<em>Next.js</em>可以通过组件的方式来设计一个布局，看下面的例子。\n    在*/components*中增加<code>Layout</code>和<code>Footer</code>组件:</p>\n<pre><code class="JavaScript"><span class="code-comment">// componments/layout.js</span>\n<span class="code-keyword">import</span> Header <span class="code-keyword">from</span> <span class="code-string">\'./header\'</span>\n<span class="code-keyword">import</span> Footer <span class="code-keyword">from</span> <span class="code-string">\'./footer\'</span>\n\n<span class="code-keyword">const</span> layoutStyle = {\n    <span class="hljs-attr">margin</span>: <span class="hljs-number">20</span>,\n    <span class="hljs-attr">padding</span>: <span class="hljs-number">20</span>,\n    <span class="hljs-attr">border</span>: <span class="code-string">\'1px solid #DDD\'</span>\n}\n\n<span class="code-keyword">const</span> Layout = <span class="hljs-function">(<span class="hljs-params">props</span>) =&gt;</span> (\n    <span class="xml"><span class="code-tag">&lt;<span class="code-name">div</span> <span class="hljs-attr">style</span>=<span\n            class="code-string">{layoutStyle}</span>&gt;</span>\n        <span class="code-tag">&lt;<span class="code-name">Header</span> /&gt;</span>\n        {props.children}\n        <span class="code-tag">&lt;<span class="code-name">Footer</span> /&gt;</span>\n    <span class="code-tag">&lt;/<span class="code-name">div</span>&gt;</span></span>\n)\n\n<span class="code-keyword">export</span> <span class="code-keyword">default</span> Layout\n</code></pre>\n<pre><code class="JavaScript"><span class="code-comment">// components/footer.js</span>\n<span class="code-keyword">const</span> Footer = <span class="hljs-function"><span\n            class="hljs-params">()</span> =&gt;</span> (\n    <span class="xml"><span class="code-tag">&lt;<span class="code-name">div</span>&gt;</span>\n        <span class="code-tag">&lt;<span class="code-name">p</span> <span class="hljs-attr">style</span>=<span\n                class="code-string">{{color:</span>\'<span class="hljs-attr">blue</span>\'}}&gt;</span>Footer<span\n                class="code-tag">&lt;/<span class="code-name">p</span>&gt;</span>\n    <span class="code-tag">&lt;/<span class="code-name">div</span>&gt;</span></span>\n)\n\n<span class="code-keyword">export</span> <span class="code-keyword">default</span> Footer\n</code></pre>\n<p>然后将*/pages/index.js*修改为：</p>\n<pre><code class="JavaScript"><span class="code-keyword">import</span> Layout <span\n        class="code-keyword">from</span> <span class="code-string">\'../components/layout\'</span>\n\n<span class="code-keyword">export</span> <span class="code-keyword">default</span> () =&gt; (\n    <span class="xml"><span class="code-tag">&lt;<span class="code-name">Layout</span>&gt;</span>\n        <span class="code-tag">&lt;<span class="code-name">p</span>&gt;</span>Hello Next.js<span\n                class="code-tag">&lt;/<span class="code-name">p</span>&gt;</span>\n    <span class="code-tag">&lt;/<span class="code-name">Layout</span>&gt;</span></span>\n)\n</code></pre>\n<p>这样，页面的内容和布局就完全隔离开了。</p>\n<h2 id="h2-5">页面跳转</h2>\n<h3 id="h3-8">传递参数</h3>\n<p>在实际应用中，经常需要在页面间传递参数，可以使用<a href="https://www.chkui.com/article/react/react_high_order_component"\n                              title="高阶组件">高阶组件</a><code>withRouter</code>来实现。\n    下面的代码对*/pages/index.js<em>进行了一些修改，使其在跳转时携带</em>query*参数：</p>\n<pre><code class="JavaScript"><span class="code-keyword">const</span> SubLink = <span class="hljs-function"><span\n        class="hljs-params">props</span> =&gt;</span> (\n    <span class="xml"><span class="code-tag">&lt;<span class="code-name">li</span>&gt;</span>\n        <span class="code-tag">&lt;<span class="code-name">Link</span> <span class="hljs-attr">href</span>=<span\n                class="code-string">{</span>`/<span class="hljs-attr">post</span>?<span\n                class="hljs-attr">title</span>=<span class="code-string">${props.title}</span>`}&gt;</span>\n            <span class="code-tag">&lt;<span class="code-name">a</span>&gt;</span>{props.title}<span class="code-tag">&lt;/<span\n                class="code-name">a</span>&gt;</span>\n        <span class="code-tag">&lt;/<span class="code-name">Link</span>&gt;</span>\n    <span class="code-tag">&lt;/<span class="code-name">li</span>&gt;</span></span>\n)\n\n<span class="code-keyword">export</span> <span class="code-keyword">default</span> () =&gt; (\n    &lt;Layout&gt;\n        &lt;h2&gt;Information&lt;/h2&gt;\n        &lt;SubLink title="First Post"/&gt;\n        &lt;SubLink title="Second Post"/&gt;\n        &lt;SubLink title="Third Post"/&gt;\n    &lt;/Layout&gt;\n)\n</code></pre>\n<p>点击<em>First Post</em>之后浏览器的URL会出现这样的路径：“<a href="http://localhost:3000/post?title=First%20Post”">http://localhost:3000/post?title=First%20Post”</a>\n    。接下来利用<code>withRouter</code>来获取这个参数。创建*./pages/post.js*的文件：</p>\n<pre><code class="JavaScript"><span class="code-keyword">import</span> {withRouter} <span\n        class="code-keyword">from</span> <span class="code-string">\'next/router\'</span>\n<span class="code-keyword">import</span> Layout <span class="code-keyword">from</span> <span class="code-string">\'../components/layout\'</span>\n\n<span class="code-keyword">const</span> Page = withRouter(<span class="hljs-function">(<span\n            class="hljs-params">props</span>) =&gt;</span> (\n    <span class="xml"><span class="code-tag">&lt;<span class="code-name">Layout</span>&gt;</span>\n        <span class="code-tag">&lt;<span class="code-name">h3</span>&gt;</span>Post Page<span\n                class="code-tag">&lt;/<span class="code-name">h3</span>&gt;</span>\n        <span class="code-tag">&lt;<span class="code-name">p</span>&gt;</span>Info:{props.router.query.title}<span\n                class="code-tag">&lt;/<span class="code-name">p</span>&gt;</span>\n    <span class="code-tag">&lt;/<span class="code-name">Layout</span>&gt;</span></span>\n))\n<span class="code-keyword">export</span> <span class="code-keyword">default</span> Page\n</code></pre>\n<p>现在点击<em>First Post</em>链接之后，跳转的页面会显示<em>First Post</em>。</p>\n<h3 id="h3-9">路径隐藏</h3>\n<p>\n    <em>Next.js</em>提供了一个让URL更加清晰干净的特性功能——URL隐藏（官网直译的话应该叫“URL遮挡”），他的作用是可以隐藏原来比较复杂的URL，让网站路径更加清晰，有利于SEO等。实现这个特性非常简单，在使用<code>Link</code>组件时传递一个<em>as</em>参数。下面将继续修改*./pages/index.js*中的内容以实现这个特性：\n</p>\n<pre><code class="JavaScript"><span class="code-keyword">const</span> SubLink = <span class="hljs-function"><span\n        class="hljs-params">props</span> =&gt;</span> (\n    <span class="xml"><span class="code-tag">&lt;<span class="code-name">li</span>&gt;</span>\n        <span class="code-tag">&lt;<span class="code-name">Link</span> <span class="hljs-attr">as</span>=<span\n                class="code-string">{</span>`<span class="hljs-attr">p</span>/${<span class="hljs-attr">props.as</span>}`} <span\n                class="hljs-attr">href</span>=<span class="code-string">{</span>`/<span\n                class="hljs-attr">post</span>?<span class="hljs-attr">title</span>=<span class="code-string">${props.title}</span>`}&gt;</span>\n            <span class="code-tag">&lt;<span class="code-name">a</span>&gt;</span>{props.title}<span class="code-tag">&lt;/<span\n                class="code-name">a</span>&gt;</span>\n        <span class="code-tag">&lt;/<span class="code-name">Link</span>&gt;</span>\n    <span class="code-tag">&lt;/<span class="code-name">li</span>&gt;</span></span>\n)\n\n<span class="code-keyword">export</span> <span class="code-keyword">default</span> () =&gt; (\n    &lt;Layout&gt;\n        &lt;h2&gt;Information&lt;/h2&gt;\n        &lt;SubLink as="first-post" title="First Post"/&gt;\n        &lt;SubLink as="first-post" title="Second Post"/&gt;\n        &lt;SubLink as="first-post" title="Third Post"/&gt;\n    &lt;/Layout&gt;\n)\n</code></pre>\n<p>注意观察<code>SubLink</code>组件中的修改，为<code>Link</code>增加了一个as参数，这个参数传递的内容将会在浏览器的地址栏显示。例如点击<em>FIrst\n    Post</em>后，浏览器的地址栏会显示<a href="http://localhost:3000/p/first-post">http://localhost:3000/p/first-post</a>\n    ，但是我们通过<code>withRouter</code>组件获取的URL还是<em>href</em>传递的路径。</p>\n<h2 id="h2-6">服务端渲染</h2>\n<p>只要运行了<em>Next.js</em>，他时时刻刻都在执行服务端渲染，可以通过刷新页面看到效果。如果没有太多需求，不进行任何调整<em>Next.js</em>能为我们完成静态页面的服务端渲染，但是通常情况下，还需要处理异步请求等等情况。\n</p>\n<h3 id="h3-10">二次服务端渲染</h3>\n<p>前面介绍了在<code>Link</code>组件上使用<em>as</em>参数可以设置浏览器路径栏上显示的内容。但是这个时候仅仅支持客户端跳转，如果进行页面刷新会出现404页面。导致这个问题出现的原因是在服务端并不知道*/p/first-post<em>对应</em>/pages*文件夹中的哪个文件。为了解决这个问题，需要在服务端进行二次渲染。\n</p>\n<p>首先需要添加<em>Express</em>服务：</p>\n<pre><code class="bash">npm install --save express\n</code></pre>\n<p>安装完成之后在根目录添加一个<em>server.js</em>文件，其内容如下：</p>\n<pre><code class="JavaScript"><span class="code-keyword">const</span> express = <span\n        class="code-built_in">require</span>(<span class="code-string">\'express\'</span>)\n<span class="code-keyword">const</span> next = <span class="code-built_in">require</span>(<span class="code-string">\'next\'</span>)\n\n<span class="code-comment">// 不等于\'production\'则表示运行的是开发环境</span>\n<span class="code-keyword">const</span> dev = process.env.NODE_ENV !== <span class="code-string">\'production\'</span>\n<span class="code-comment">// 创建一个服务端运行的Next app</span>\n<span class="code-keyword">const</span> app = next({dev})\n<span class="code-comment">// 请求处理器</span>\n<span class="code-keyword">const</span> handle = app.getRequestHandler()\n\napp.prepare()\n    .then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {\n        <span class="code-keyword">const</span> server = express()\n\n        server.get(<span class="code-string">\'/p/:id\'</span>, (req, res) =&gt; {\n            <span class="code-comment">//将/p/:id的路径切换成/post?title=req.params.id的路径</span>\n            app.render(req, res, <span class="code-string">\'/post\'</span>, {<span class="hljs-attr">title</span>: req.params.id})\n        })\n\n        server.get(<span class="code-string">\'*\'</span>, (req, res) =&gt; {\n            <span class="code-keyword">return</span> handle(req, res)\n        })\n\n        server.listen(<span class="hljs-number">3000</span>, (err) =&gt; {\n            <span class="code-keyword">if</span> (err) <span class="code-keyword">throw</span> err\n            <span class="code-built_in">console</span>.log(<span class="code-string">\'&gt; Ready on http://localhost:3000\'</span>)\n        })\n    })\n    .catch(<span class="hljs-function">(<span class="hljs-params">ex</span>) =&gt;</span> {\n        <span class="code-built_in">console</span>.error(ex.stack)\n        process.exit(<span class="hljs-number">1</span>)\n    })\n</code></pre>\n<p>然后修改<em>package.json</em>的“scripts"字段，将启动方式方式指向<em>server.js</em>：</p>\n<pre><code class="json"><span class="code-string">"scripts"</span>: {\n    <span class="hljs-attr">"dev"</span>: <span class="code-string">"node server.js"</span>,\n    <span class="hljs-attr">"build"</span>: <span class="code-string">"next build"</span>,\n    <span class="hljs-attr">"start"</span>: <span class="code-string">"NODE_ENV=production node server.js"</span>\n  }\n</code></pre>\n<p>完成这2步网站服务端也可以正常跳转，实现功能的位置是这段代码：</p>\n<pre><code class="JavaScript">server.get(<span class="code-string">\'/p/:id\'</span>, (req, res) =&gt; {\n\tapp.render(req, res, <span class="code-string">\'/post\'</span>, {<span class="hljs-attr">title</span>: req.params.id})\n})\n</code></pre>\n<p>他将原来的请求“/p/:id”转换为请求"/post?title=id"。</p>\n<p>更多的<a href="https://github.com/zeit/next.js#custom-server-and-routing" title="服务端渲染的配置">服务端渲染的配置说明请看这里</a>。</p>\n<h3 id="h3-11">数据异步请求</h3>\n<p>对于一个前后端分离的系统来说，异步数据请求是几乎每个页面都需要的。<em>Next.js</em>通过<code>getInitialProps</code>来实现。\n    下面的示例数据来自<a href="https://www.tvmaze.com/api">https://www.tvmaze.com/api</a> 。创建*./pages/tvshows.js*的文件：</p>\n<pre><code class="JavaScript"><span class="code-keyword">import</span> Layout <span\n        class="code-keyword">from</span> <span class="code-string">\'../components/layout.js\'</span>\n<span class="code-keyword">import</span> Link <span class="code-keyword">from</span> <span class="code-string">\'next/link\'</span>\n<span class="code-keyword">import</span> fetch <span class="code-keyword">from</span> <span class="code-string">\'isomorphic-unfetch\'</span>\n\n<span class="code-keyword">const</span> TvShow = <span class="hljs-function">(<span class="hljs-params">props</span>) =&gt;</span> (\n    <span class="xml"><span class="code-tag">&lt;<span class="code-name">Layout</span>&gt;</span>\n        <span class="code-tag">&lt;<span class="code-name">h1</span>&gt;</span>Batman TV Shows<span class="code-tag">&lt;/<span\n                class="code-name">h1</span>&gt;</span>\n        <span class="code-tag">&lt;<span class="code-name">ul</span>&gt;</span>\n            {props.shows.map(({show}) =&gt; (\n                <span class="code-tag">&lt;<span class="code-name">li</span> <span class="hljs-attr">key</span>=<span\n                        class="code-string">{show.id}</span>&gt;</span>\n                    <span class="code-tag">&lt;<span class="code-name">Link</span> <span\n                            class="hljs-attr">href</span>=<span class="code-string">{</span>`/<span\n                            class="hljs-attr">tv</span>?<span class="hljs-attr">id</span>=<span class="code-string">${show.id}</span>`}&gt;</span>\n                        <span class="code-tag">&lt;<span class="code-name">a</span>&gt;</span>{show.name}<span\n                class="code-tag">&lt;/<span class="code-name">a</span>&gt;</span>\n                    <span class="code-tag">&lt;/<span class="code-name">Link</span>&gt;</span>\n                <span class="code-tag">&lt;/<span class="code-name">li</span>&gt;</span>\n            ))}\n        <span class="code-tag">&lt;/<span class="code-name">ul</span>&gt;</span>\n    <span class="code-tag">&lt;/<span class="code-name">Layout</span>&gt;</span></span>\n)\n\nTvShow.getInitialProps = <span class="code-keyword">async</span> <span class="hljs-function"><span class="code-keyword">function</span>(<span\n            class="hljs-params"></span>) </span>{\n    <span class="code-comment">//contxt是衔接Next.js包装组件和自定义主键的上下文，包含的参数有asPath、pathname、query</span>\n\n    <span class="code-comment">// 发送异步请求</span>\n    <span class="code-keyword">const</span> res = <span class="code-keyword">await</span> fetch(<span\n            class="code-string">\'https://api.tvmaze.com/search/shows?q=batman\'</span>)\n\n    <span class="code-comment">// 从response中异步读取数据流</span>\n    <span class="code-keyword">const</span> data = <span class="code-keyword">await</span> res.json()\n\n    <span class="code-built_in">console</span>.log(<span class="code-string">`Show data fetched. Count: <span\n            class="hljs-subst">${data.length}</span>`</span>)\n\n    <span class="code-comment">// 返回已获取的数据</span>\n    <span class="code-keyword">return</span> {\n        <span class="hljs-attr">shows</span>: data\n    }\n}\n\n<span class="code-keyword">export</span> <span class="code-keyword">default</span> TvShow\n</code></pre>\n<p><code>TvShow</code>组件的作用是异步请求数据并组装成列表展示。</p>\n<p>然后再创建一个查看详情的页面——<em>./pages/tv.js</em>，实现过程和上面一样：</p>\n<pre><code class="JavaScript"><span class="code-keyword">import</span> Layout <span\n        class="code-keyword">from</span> <span class="code-string">\'../components/layout\'</span>\n<span class="code-keyword">import</span> fetch <span class="code-keyword">from</span> <span class="code-string">\'isomorphic-unfetch\'</span>\n\n<span class="code-keyword">const</span> Tv =  <span class="hljs-function">(<span class="hljs-params">props</span>) =&gt;</span> (\n    <span class="xml"><span class="code-tag">&lt;<span class="code-name">Layout</span>&gt;</span>\n        <span class="code-tag">&lt;<span class="code-name">h1</span>&gt;</span>{props.show.name}<span class="code-tag">&lt;/<span\n                class="code-name">h1</span>&gt;</span>\n        <span class="code-tag">&lt;<span class="code-name">p</span>&gt;</span>{props.show.summary.replace(/<span\n                class="code-tag">&lt;<span class="code-name">[</span>/]?<span class="hljs-attr">p</span>&gt;</span>/g, \'\')}<span\n                class="code-tag">&lt;/<span class="code-name">p</span>&gt;</span>\n        <span class="code-tag">&lt;<span class="code-name">img</span> <span class="hljs-attr">src</span>=<span\n                class="code-string">{props.show.image.medium}/</span>&gt;</span>\n    <span class="code-tag">&lt;/<span class="code-name">Layout</span>&gt;</span>\n)\n\nTv.getInitialProps = async function (context) {\n    const { id } = context.query\n    const res = await fetch(`https://api.tvmaze.com/shows/${id}`)\n    const show = await res.json()\n\n    console.log(`Fetched show: ${show.name}`)\n\n    return { show }\n}\nexport default Tv\n</span></code></pre>\n<p>按照这个套路可以解决绝大部分数据异步请求的问题。不过如果数据组装过慢，会出页面现卡顿的问题，可以通过服务端缓存或异步页面加载实现，后续的篇幅会介绍。</p>\n<h2 id="h2-7">样式</h2>\n<h3 id="h3-12">源生添加样式</h3>\n<p>一个页面永远离不开样式，在<em>Next.js</em>中推荐一种简介高效的方法——<code>&lt;style jsx&gt;</code>。</p>\n<p>为的主页添加一些样式：</p>\n<pre><code class="JavaScript">(\n    &lt;Layout&gt;\n        &lt;h2&gt;Information&lt;/h2&gt;\n        &lt;SubLink as="first-post" title="First Post"/&gt;\n        &lt;SubLink as="first-post" title="Second Post"/&gt;\n        &lt;SubLink as="first-post" title="Third Post"/&gt;\n        &lt;style jsx&gt;{`\n            h2{\n                font-family: "Arial";\n            }\n        `}&lt;/style&gt;\n        &lt;style jsx global&gt;{`\n            .list{\n                list-style: none;\n                margin: 5px 0;\n            }\n        `}&lt;/style&gt;\n    &lt;/Layout&gt;\n)\n</code></pre>\n<p><code>&lt;style jsx&gt;</code>的作用就是为当前组件声明样式，需要注意的是在这个标签内声明的样式只能覆盖当前组件，子组件是不会出现层叠效果的。而<code>&lt;style jsx\n    global&gt;</code>标签的效果则是和标准的css层叠效果一致，在这个标签中声明的样式会影响到子组件。</p>\n<h3 id="h3-13">Loader添加载样式</h3>\n<p><em>Next.js</em>可以加载各种样式文件，下面以<em>Sass/Scss</em>为例。</p>\n<p>首先添加相关依赖：</p>\n<pre><code class="bash">npm install --save @zeit/next-sass node-sass\n</code></pre>\n<p>在项目根目录添加<em>next.config.js</em>文件，用于指示<em>Next</em>加载对用的功能：</p>\n<pre><code class="bash">const withSass = require(<span class="code-string">\'@zeit/next-sass\'</span>)\nmodule.exports = withSass()\n</code></pre>\n<p>现在就可以加载*.scss<em>文件了，添加一个</em>/pages/post.scss*文件：</p>\n<pre><code class="css">$<span class="code-selector-tag">font-size</span>: 50<span class="code-selector-tag">px</span>;\n<span class="code-selector-class">.header</span>{\n  <span class="code-attribute">font-size</span>: $font-size;\n  <span class="code-attribute">color</span>:red;\n}\n</code></pre>\n<p>修改*/pages/post.js*加载样式：</p>\n<pre><code class="JavaScript"><span class="code-keyword">import</span> {withRouter} <span\n        class="code-keyword">from</span> <span class="code-string">\'next/router\'</span>\n<span class="code-keyword">import</span> Layout <span class="code-keyword">from</span> <span class="code-string">\'../components/layout\'</span>\n<span class="code-comment">//加载样式</span>\n<span class="code-keyword">import</span> <span class="code-string">\'./post.scss\'</span>\n\n<span class="code-keyword">const</span> Page = withRouter(<span class="hljs-function">(<span\n            class="hljs-params">props</span>) =&gt;</span> (\n    <span class="xml"><span class="code-tag">&lt;<span class="code-name">Layout</span>&gt;</span>\n        <span class="code-tag">&lt;<span class="code-name">h3</span> <span class="hljs-attr">className</span>=<span\n                class="code-string">"header"</span>&gt;</span>Post Page<span class="code-tag">&lt;/<span\n                class="code-name">h3</span>&gt;</span>\n        <span class="code-tag">&lt;<span class="code-name">p</span>&gt;</span>Info:{props.router.query.title}<span\n                class="code-tag">&lt;/<span class="code-name">p</span>&gt;</span>\n    <span class="code-tag">&lt;/<span class="code-name">Layout</span>&gt;</span></span>\n))\n\n<span class="code-keyword">export</span> <span class="code-keyword">default</span> Page\n</code></pre>\n<p>由于是使用的<em>webpack</em>的<em>Loader</em>，可以根据需要在<em>next.config.js</em>文件中进行一些相关的设置：</p>\n<pre><code class="JavaScript"><span class="code-built_in">module</span>.exports = withSass({\n  <span class="hljs-attr">cssModules</span>: <span class="hljs-literal">true</span>,\n  <span class="hljs-attr">cssLoaderOptions</span>: {\n    <span class="hljs-attr">importLoaders</span>: <span class="hljs-number">1</span>,\n    <span class="hljs-attr">localIdentName</span>: <span class="code-string">"[local]___[hash:base64:5]"</span>,\n  }\n})\n</code></pre>\n<p>然后在组件中直接以对象的方式使用：</p>\n<pre><code class="JavaScript"><span class="code-keyword">import</span> style <span\n        class="code-keyword">from</span> <span class="code-string">\'./post.scss\'</span>\n<span class="code-keyword">const</span> Page = withRouter(<span class="hljs-function">(<span\n            class="hljs-params">props</span>) =&gt;</span> {\n    <span class="code-built_in">console</span>.log(style)\n    <span class="code-keyword">return</span> (\n        <span class="xml"><span class="code-tag">&lt;<span class="code-name">Layout</span>&gt;</span>\n            <span class="code-tag">&lt;<span class="code-name">h3</span> <span class="hljs-attr">className</span>=<span\n                    class="code-string">{style.header}</span>&gt;</span>Post Page<span class="code-tag">&lt;/<span\n                    class="code-name">h3</span>&gt;</span>\n            <span class="code-tag">&lt;<span class="code-name">p</span>&gt;</span>Info:{props.router.query.title}<span\n                    class="code-tag">&lt;/<span class="code-name">p</span>&gt;</span>\n        <span class="code-tag">&lt;/<span class="code-name">Layout</span>&gt;</span></span>\n    )\n})\n</code></pre>\n<p>更多关于cssLoaderOptions的参数说明可以查看<a href="https://github.com/webpack-contrib/css-loader#options"\n                                   title="webpack里css-loader的options说明">webpack里css-loader的options说明</a>。除了scss,<a\n        href="https://github.com/zeit/next.js#css-in-js" title="*Next.js*还支持css、less、post css的Loader"><em>Next.js</em>还支持css、less、post\n    css的Loader</a>。</p>\n<h2 id="h2-8">发布</h2>\n<p>在了解以上内容之后，已经可以开发一个网站了，接下来介绍如何发布生产包。</p>\n<p><em>package.json</em>中的“scripts"字段可以设置打包和生产运行方式：</p>\n<pre><code class="json">  <span class="code-string">"scripts"</span>: {\n    <span class="hljs-attr">"dev"</span>: <span class="code-string">"node server.js"</span>,\n    <span class="hljs-attr">"build"</span>: <span class="code-string">"next build"</span>,\n    <span class="hljs-attr">"start"</span>: <span class="code-string">"NODE_ENV=production node server.js"</span>\n  }\n</code></pre>\n<p>首先进行打包：</p>\n<pre><code class="bash">npm run build\n</code></pre>\n<p>打包完毕之后可以启动生产环境：</p>\n<pre><code class="bash">npm start\n</code></pre>\n<p>现在用浏览器打开<a href="http://localhost:3000/">http://localhost:3000/</a> 地址可以发现运行的是生产环境（可以使用React工具查看，也可以打开开发人员模式）。\n    由于之前了在<em>server.js</em>中引入了Express，所以现在启动的是一个Express服务器。打包之后的文件都在*./.next*\n    路径下，可以仅仅拷贝<strong>依赖包（node_module）</strong>、<strong>package.json</strong>、<strong>server.js</strong>以及**./.next**来运行生产环境。\n</p>\n<p>除了使用<em>Express</em>这一类第三方nodejs服务器，<a href="https://zeit.co/now" title="*Next.js*还提供了许多其他方式来部署和方法"><em>Next.js</em>还提供了许多其他方式来部署和方法</a>\n</p>'}};