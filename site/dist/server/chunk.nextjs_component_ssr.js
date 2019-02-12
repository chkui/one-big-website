exports.ids=[51],exports.modules={327:function(s,n,a){"use strict";Object.defineProperty(n,"__esModule",{value:!0});n.content='<p><a href="https://www.chkui.com/" title="@随风溜达的向日葵">@随风溜达的向日葵</a></p>\n<h2 id="h2-1">Nextjs</h2>\n<p><a href="https://nextjs.org/"><em>Nextjs</em></a>是<a href="https://reactjs.org/"><em>React</em></a>生态中非常受欢迎的SSR（server\n    side render——服务端渲染）框架，只需要几个步骤就可以搭建一个支持SSR的工程（_Nextjs_的快速搭建见<a\n            href="https://www.chkui.com/article/react/nextjs_getting_starting"><em>Next.js入门</em></a>）。 本文的案例代码来自于<a\n            href="https://github.com/palmg/website-standard-with-next">前端标准模板项目</a>。</p>\n<h2 id="h2-2">服务端组织数据</h2>\n<p><em>Nextjs</em>提供了便捷强大的服务端渲染功能——<strong>getInitialProps()</strong>，通过这个方法可以简单为服务端和前端同时处理异步请求数据：</p>\n<pre><code class="javascript"><span class="code-keyword">const</span> load = <span class="code-keyword">async</span> () =&gt;{\n    <span class="code-keyword">return</span> <span class="code-keyword">new</span> <span\n            class="code-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">res, rej</span>)=&gt;</span>{\n        res(<span class="code-string">\'Success\'</span>)\n    })\n}\n<span class="hljs-class"><span class="code-keyword">class</span> <span class="code-title">Simple</span> <span\n        class="code-keyword">extends</span> <span class="code-title">React</span>.<span\n        class="code-title">Component</span></span>{\n    <span class="code-keyword">static</span> <span class="code-keyword">async</span> getInitialProps({req, query}) {\n        <span class="code-keyword">const</span> data = <span class="code-keyword">await</span> load();\n        <span class="code-keyword">return</span> {data}\n    }\n    render() {\n        <span class="code-keyword">return</span>(<span class="xml"><span class="code-tag">&lt;<span\n            class="code-name">p</span>&gt;</span>{this.props.data}<span class="code-tag">&lt;/<span\n            class="code-name">p</span>&gt;</span></span>)\n    }\n}\n</code></pre>\n<p>Next的强大之一体现在就这么几行代码就解决了SSR中最麻烦的前后端异步数据组装功能。再复杂的异步数据组装过程都可以放置到代码中的Promise对象中。</p>\n<h2 id="h2-3">页面与内页</h2>\n<p>在继续述说本文内容之前还需要强化两个概念——<strong>内页</strong>与<strong>页面</strong>。</p>\n<p>通过浏览器输入一个地址获取到的内容称之为<strong>页面</strong>。</p>\n<p>而在单页面应用中也会有通过导航栏或菜单控制的内容切换效果，我们将这些切换的内容称之为<strong>内页</strong>。单页面应用中一般会先打开一个页面，然后通过Dom的增删改模拟页面切换的效果。</p>\n<h2 id="h2-4">Nextjs中SSR渲染的局限性</h2>\n<p>\n    <code>getInitialProps()</code>方法虽然强大好用，但是现在还存在一个问题——<strong>只能在“内页”中使用</strong>。<em>Nextjs_规定了所有放置到<code>./pages</code>中的文件（通常是*.js_文件，也可以引入</em>.ts*文件）都视为一个内页，这些文件中被导出的React组件可以直接输入地址上访问。例如现在有<a\n        href="https://github.com/palmg/website-standard-with-next/blob/master/pages/about.js"><em>./pages/about.js</em></a>文件，运行\n    <em>Nextjs</em> 后在浏览输入<code>http://localhost:3000/about</code>就可以看到这个组件，而<a\n        href="https://github.com/palmg/website-standard-with-next/blob/master/pages/async/simple.js"><em>./pages/async/simple.js</em></a>对用的路径是<code>http://localhost:3000/async/simple</code>。\n</p>\n<p>但是在其他路径（比如<code>./component</code>）的组件是无法使用<code>getInitialProps()</code>方法的。乍一看这样似乎没多大问题，但是某些应用又需要这些组件不能放置到<code>./pages</code>中暴露到_url_中，又需要异步加载数据。看下面的例子。\n</p>\n<h3 id="h3-1">按需加载菜单的例子</h3>\n<p><img src="https://oscimg.oschina.net/oscnet/fd51a66e0f097658f7db8e37fb621c76857.jpg" alt="Nextjs+React非页面组件SSR渲染"\n        title="应用菜单" class="zoom-in-cursor"></p>\n<p>如上图。在企业级应用中（例如OA系统）通常不太需要实现SSR，这个时候可以根据角色权限在组件的<code>componentDidMount()</code>方法中异步加载菜单，但是在某些时候（例如一个可配置菜单的内容网站，或者对企业级应用进行服务端缓存）也会有菜单异步加载并且实现SSR的需要，这个时候需要在_Nextjs_框架的基础上扩展。\n</p>\n<p>看到这里可能你会想可以把菜单的组装像下面放到每个内页的<code>getInitialProps()</code>方法中去：</p>\n<pre><code class="javascript"><span class="code-keyword">const</span> Comp = <span class="hljs-function"><span\n        class="hljs-params">props</span> =&gt;</span>(<span class="xml"><span class="code-tag">&lt;<span\n        class="code-name">div</span>&gt;</span><span class="code-tag">&lt;<span class="code-name">Menus</span> <span\n        class="hljs-attr">menus</span>=<span class="code-string">{props.menus}/</span>&gt;</span><span class="code-tag">&lt;<span\n        class="code-name">div</span>&gt;</span>{props.pageData}<span class="code-tag">&lt;/<span\n        class="code-name">div</span>&gt;</span><span class="code-tag">&lt;/<span class="code-name">div</span>&gt;</span>);\nComp.getInitialProps = async ({req})=&gt;{\n    //load Menu Promise\n    const menus = await getMenus();\n    //load Page Data Promise\n    const pageData = await getPageData();\n    return {menus, pageData}\n}\n</span></code></pre>\n<p>这样做在实现上没问题，但是在架构设计上是颇为糟糕的。以下三个原因：</p>\n<ol>\n    <li>\n        对于React有各种各样的描述，比如单向数据流、组件化等等。但是他的核心思想其实是<strong>分而治之</strong>。在Jquery“统治”的年代可以使用_selector_(比如<code>$(\'#id\')</code>)轻易获取到页面上的任何元素。一个项目如果没有很好的规范化管理（长久的人工规范化管理是需要投入不少成本的），久而久之会发现各个板块之间耦合性越来越强、坑越来越多(代码腐烂)。而React的单向数据流让组件与组件之间没有直接的沟通方式，规范化从技术层面就被强化，进而才会产生了_Redux_、_Flux_这一类按照“分-总-分”的模式（实际上就是一个消息总线模式）去控制模块间沟通的。所以将业务逻辑相关性并不强的页面和菜单放置在一个地方处理并不合理。\n    </li>\n    <li>绝大多数项目都不是一个人开发的，一个架构设计者要考虑到未来参与项目的开发者水平参差不齐。如果让框架级的结构直接暴露到业务开发者的面前，保不准某个负责业务开发的小伙伴忽略或修改了什么代码导致框架级的坑出现。</li>\n    <li>按照上面的代码，实际上要求每个内页都保留<code>const menus = await getMenus();</code>、<code>&lt;Menus menus={props.menus}/&gt;</code>这一类的代码（每个内页都复制粘贴）。在架构上这叫“样板式代码”，架构设计者应当尽量将这些代码通过“分层”的方式放到一个地方去处理。\n    </li>\n</ol>\n<p>所以有理由为_Nextjs_的<code>./pages</code>之外的组件实现ssr数据异步加载。</p>\n<h2 id="h2-5">组件ssr异步数据实现</h2>\n<p>为了实现本文的需求——让所有组件实现类似于<code>getInitialProps()</code>的方法，我们先要理清_Nextjs_前后端渲染的过程。</p>\n<h3 id="h3-2">渲染过程</h3>\n<p>_Nextjs_为使用者提供了<a href="https://github.com/palmg/website-standard-with-next/blob/master/pages/_app.js"><code>./pages/_app.js</code></a>和<a\n        href="https://github.com/palmg/website-standard-with-next/blob/master/pages/_document.js"><code>./pages/_document.js</code></a>在内页处理之前执行某些任务,后者用于构建整个HTML的结构。并且<a\n        href="https://github.com/palmg/website-standard-with-next/blob/master/pages/_document.js"><code>./pages/_document.js</code></a>只会在服务端执行。本文将开发者自行实现的内页称为_page,现在对于_Nextjs_就有三个类型的构建——_<em>document</em>、_<em>app_和_component</em>,每个构建都可以包含<code>static\n    getInitialProps()</code>、<code>constructor()</code>和<code>render()</code>方法，他们的执行过程如下。</p>\n<h4 id="h4-1">服务端执行过程</h4>\n<ol>\n    <li>_document getInitialProps()</li>\n    <li>_app getInitialProps()</li>\n    <li>_page getInitialProps()</li>\n    <li>_app constructor()</li>\n    <li>_app render()</li>\n    <li>_page constructor()</li>\n    <li>_page render()</li>\n    <li>_document constructor()</li>\n    <li>_document render()</li>\n</ol>\n<p>以上的过程分解如下：</p>\n<ol>\n    <li>\n        <p><strong>组装异步数据（1~3）</strong>：服务端会先开始执行<code>_document.getInitialProps()</code>这个静态方法，方法中会执行<code>_app.getInitialProps()</code>再遍历所有的<code>_page.getInitialProps()</code>执行到这里所有的异步数据完成组装。\n        </p>\n    </li>\n    <li>\n        <p><strong>渲染React组件（4~7）</strong>：有了数据之后开始渲染页面，会使用<a\n                href="https://reactjs.org/docs/react-dom-server.html"><code>ReactDOMServer</code></a>执行产生一个HTML格式的字符串。\n        </p>\n    </li>\n    <li>\n        <p><strong>构建静态HTML（8~9）</strong>：有了<a href="https://reactjs.org/docs/react-dom-server.html"><code>ReactDOMServer</code></a>产生的字符串剩下的工作就是将其组装为一个标准的HTML文档返回给客户端。\n        </p>\n    </li>\n</ol>\n<h4 id="h4-2">客户端执行过程</h4>\n<p><strong>初始化页面时（首次打开页面）：</strong></p>\n<ol>\n    <li>_app constructor()</li>\n    <li>_app render()</li>\n    <li>_page constructor()</li>\n    <li>_page render()</li>\n</ol>\n<p>\n    客户端在首次打开页面时（或刷新页面）服务端已经提供了完整的HTML文档可以立即显示。此时React的组件依然执行一次虚拟Dom渲染，所以所有的组件都会执行。然后_Nextjs_利用类似于_React_服务端渲染的_checksum_的机制防止虚拟Dom对真实Dom进行渲染，关于_React_服务端渲染的_checksum_机制可以到<a\n        href="https://www.chkui.com/article/react/react_server_render_with_checksum">React 前后端同构防止重复渲染</a>一文了解。</p>\n<p><strong>内页跳转时（通过<code>next/link</code>跳转）：</strong></p>\n<ol>\n    <li>_app getInitialProps()</li>\n    <li>_page getInitialProps()</li>\n    <li>_app render()</li>\n    <li>_page constructor()</li>\n    <li>_page render()</li>\n</ol>\n<p>客户端跳转到一个新的内页和服务端渲染就没有什么关系了。__app和_page_的<code>getInitialProps()</code>先组装数据，然后通过<code>props</code>将组装好的数据传递给组件去渲染。需要注意的是_app的构造方法在内页跳转的时候并不会执行，因为它只在整个页面渲染的时候实例化一次。\n</p>\n<h3 id="h3-3">实现</h3>\n<p>在了解_Nextjs_解执行过程之后实现需求就很简单了——先通过_document或_app的<code>getInitialProps()</code>方法完成数据组装，然后将数据传递给对应的组件即可。当然按照分而治之的思想不能直接在框架去完成业务的事，需要为组件提供一个注册接口然后由_document或_app使用注册的方法去构建业务数据。\n</p>\n<p><strong>数据加载方法注册</strong></p>\n<p>首先需要为我们组件提供一个注册异步加载数据的接口，组件可以利用这个接口注册异步加载数据的方法让框架统一去<code>getInitialProps()</code>执行。 <a\n        href="https://github.com/palmg/website-standard-with-next/blob/master/util/serverInitProps.js"><code>./util/serverInitProps.js</code></a>提供了这个功能:\n</p>\n<pre><code class="javascript"><span class="code-keyword">const</span> FooDict = {};\n<span class="code-comment">//注册方法</span>\n<span class="code-keyword">export</span> <span class="code-keyword">const</span> registerAsyncFoo = <span\n            class="hljs-function">(<span class="hljs-params">key, foo, params = {}</span>) =&gt;</span> {\n    FooDict[key] = {foo, params};\n};\n\n<span class="code-comment">//获取方法</span>\n<span class="code-keyword">export</span> <span class="code-keyword">const</span> executeAsyncFoo = <span\n            class="code-keyword">async</span> () =&gt; {\n    <span class="code-keyword">const</span> valueDict = {};\n    <span class="code-keyword">const</span> keys = <span class="code-built_in">Object</span>.keys(FooDict);\n    <span class="code-keyword">for</span> (<span class="code-keyword">let</span> key <span\n            class="code-keyword">of</span> keys) {\n        <span class="code-keyword">const</span> dict = FooDict[key];\n        valueDict[key] = <span class="code-keyword">await</span> dict.foo(dict.params);\n    }\n    <span class="code-keyword">return</span> valueDict;\n};\n\n\n</code></pre>\n<p>然后我们在<a\n        href="https://github.com/palmg/website-standard-with-next/blob/master/components/app/application/menu.js"><code>menu</code></a>组件中注册异步获取数据的方法：\n</p>\n<pre><code class="javascript">registerAsyncFoo(<span class="code-string">\'menus\'</span>, getMenus);\n</code></pre>\n<p><code>getMenus</code>模拟异步获取数据的过程:</p>\n<pre><code class="javascript"><span class="code-keyword">import</span> {Menus} <span\n        class="code-keyword">from</span> <span class="code-string">"../../../../data/menuData"</span>;\n<span class="code-keyword">export</span> <span class="code-keyword">const</span> getMenus = <span class="hljs-function"><span\n            class="hljs-params">()</span> =&gt;</span> {\n    <span class="code-comment">//可以将这个promise修改为一个net方法实现异步动态装菜菜单</span>\n    <span class="code-keyword">return</span> <span class="code-keyword">new</span> <span\n            class="code-built_in">Promise</span>(<span class="hljs-function">(<span\n            class="hljs-params">resolve, reject</span>) =&gt;</span> {\n        resolve(Menus)\n    })\n};\n</code></pre>\n<p>注册完成后再<code>_app</code>中执行异步加载：</p>\n<pre><code class="javascript"><span class="code-keyword">import</span> {executeAsyncFoo} <span\n        class="code-keyword">from</span> <span class="code-string">"../util/serverInitProps"</span>;\n<span class="hljs-class"><span class="code-keyword">class</span> <span class="code-title">ExpressApp</span> <span\n        class="code-keyword">extends</span> <span class="code-title">App</span> </span>{\n    <span class="code-keyword">static</span> <span class="code-keyword">async</span> getInitialProps({Component, router, ctx}) {\n        info(<span class="code-string">\'Execute _App getInitialProps()!\'</span>, <span class="code-string">\'executeReport\'</span>);\n        <span class="code-comment">/**\n         * app的getInitialProps会在服务端被调用一次，在前端每次切换页面时被调用。\n         */</span>\n        <span class="code-keyword">let</span> pageProps = {}, appProps = {};\n        <span class="code-keyword">if</span> (Component.getInitialProps) {\n            pageProps = <span class="code-keyword">await</span> Component.getInitialProps(ctx);\n        }\n        <span class="code-keyword">if</span> (ctx &amp;&amp; !ctx.req) {<span class="code-comment">//客户端执行</span>\n            appProps = <span class="code-built_in">window</span>.__NEXT_DATA__.props.appProps;\n        } <span class="code-keyword">else</span> {<span class="code-comment">//服务端执行</span>\n            appProps = <span class="code-keyword">await</span> executeAsyncFoo();\n        }\n        <span class="code-keyword">return</span> {pageProps, appProps}\n    }\n    <span class="code-comment">//other function</span>\n}\n</code></pre>\n<p>在服务端获取到数据之后会返回给<code>_ducoment</code>，_Nextjs_会将这些数据写到HTML的<code>window.__NEXT_DATA__</code>对象上而后在客户端可以从这个对象获取到已经在服务端加载的数据。\n    最后用React的Context特性传递数据，有需要用到这些数据的组件可以从<a\n            href="https://github.com/palmg/website-standard-with-next/blob/master/components/app/applicationContext.js"><code>ApplicationContext</code></a>中获取这些数据:\n</p>\n<pre><code class="javascript"><span class="code-comment">//_app</span>\n<span class="code-keyword">import</span> ApplicationContext <span class="code-keyword">from</span> <span\n            class="code-string">\'../components/app/applicationContext\'</span>\n<span class="hljs-class"><span class="code-keyword">class</span> <span class="code-title">ExpressApp</span> <span\n        class="code-keyword">extends</span> <span class="code-title">App</span> </span>{\n     <span class="code-comment">//other function</span>\n     render() {\n        info(<span class="code-string">\'Execute _App render()!\'</span>, <span class="code-string">\'executeReport\'</span>);\n        <span class="code-keyword">const</span> {Component, pageProps, appProps} = <span\n            class="code-keyword">this</span>.props;\n        <span class="code-keyword">return</span> (\n            &lt;ApplicationContext.Provider value={appProps}&gt;\n                &lt;Application&gt;\n                    &lt;Component {...pageProps} /&gt;\n                &lt;/Application&gt;\n            &lt;/ApplicationContext.Provider&gt;\n        )\n    }\n    //other function\n}\n</code></pre>\n<pre><code class="javascript"><span class="code-comment">//menu</span>\n<span class="code-keyword">import</span> ApplicationContext <span class="code-keyword">from</span> <span\n            class="code-string">\'../applicationContext\'</span>\n<span class="code-keyword">const</span> Menu = <span class="hljs-function"><span class="hljs-params">props</span> =&gt;</span> {\n    <span class="code-keyword">return</span> (\n        <span class="xml"><span class="code-tag">&lt;<span\n                class="code-name">ApplicationContext.Consumer</span>&gt;</span>\n            {appProps =&gt; {\n                const {menus} = appProps;\n                return menus.map(menu =&gt; (\n                    <span class="code-tag">&lt;<span class="code-name">Link</span> <span\n                            class="hljs-attr">href</span>=<span class="code-string">{menu.href}</span>&gt;</span>\n                        <span class="code-tag">&lt;<span class="code-name">a</span>&gt;</span>{menu.name}<span\n                    class="code-tag">&lt;/<span class="code-name">a</span>&gt;</span>\n                    <span class="code-tag">&lt;/<span class="code-name">Link</span>&gt;</span>\n                ))\n            }}\n        <span class="code-tag">&lt;/<span class="code-name">ApplicationContext.Consumer</span>&gt;</span>\n    );\n};\n</span></code></pre>\n<p><a href="https://github.com/palmg/website-standard-with-next/blob/master/util/serverInitProps.js"><code>./util/serverInitProps.js</code></a>可以在任何组件中使用，<code>_app</code>会逐一执行方法获取数据按照kev-value的方式设置到<code>ApplicationContext</code>中，而任意组件要做的仅仅是从<code>ApplicationContext</code>拿到目标数据。\n</p>\n<p>当然传递数据的方式不仅仅局限于React的Context特性，换成Redux或全局管理数据的方法都是可行的。</p>\n<p><a href="https://www.chkui.com/" title="@随风溜达的向日葵">@随风溜达的向日葵</a></p>'}};