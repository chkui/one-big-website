exports.ids=[32],exports.modules={297:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});n.content='<h2 id="h2-1">什么叫前后端同构？</h2>\n<p>为了解决某些问题（比如SEO、提升渲染速度等）<strong><em>react</em></strong>\n    提供了2个方法在服务端生成一个HTML文本格式的字符串。在得到了这个HTML格式的字符串之后，通常会将其组装成一个页面直接返回给用户的浏览器。</p>\n<p>到这里，服务端的活已经干完了，然后就是浏览器这边干活。</p>\n<p>浏览器拿到HTML文本后，立刻进行渲染将内容呈现给用户。然后加载页面所需的 .js 文件，然后执行\n    <em><strong>JavaScript&nbsp;</strong></em>脚本，然后开始初始化&nbsp;<em><strong>react</strong></em> 组件…………</p>\n<p>到这里问题就来了。<strong><em>react</em></strong> 初始化组件后会执行组件内所有\n    <em>render&nbsp;() </em>方法，然后生成虚拟DOM的树形结构，然后在适当的时候将虚拟dom<em>写</em>到浏览器的真实dom中。因为 <strong><em>react</em></strong>\n    总是根据虚拟dom来生成真实dom，所以最后会把服务器端渲染好的HTML全部替换掉。</p>\n<p>\n    上面这个事情说不是问题确实也不是问题，无非就是用户看到页面然后“闪现”一下。说是问题还真是个问题，产品会拿着这毛病从用户体验的角度在各种场合和你死磕半个月。磕累了你索性把服务端渲染关了，然后运营又拿着SEO的问题准备和你开始撕逼了。</p>\n<p>聪明如 Facebook 的工程师当然想到了这些问题，所以他们在<em>ReactDOMServer.renderToString(element) 方法</em>中提供了一个\n    <strong><em>checksum</em></strong> 机制。</p>\n<p>关于&nbsp;<strong><em>checksum </em></strong> <a href="https://facebook.github.io/react/docs/react-dom-server.html"\n                                                  rel="nofollow">官网</a> 并没有太多介绍，但是国内外的各路博客介绍了不少。我一直想找&nbsp;<em><strong>react</strong></em>\n    开发者关于这个机制的介绍一直没找到……。</p>\n<p><strong>前后端同构</strong>就是保证前端和后端的dom结构一致，不会发生重复渲染。<em><strong>react</strong></em>\n    使用&nbsp;<strong><em>checksum </em></strong>机制进行保障。</p>\n\n<h2 id="h2-2">什么叫React首屏渲染？</h2>\n<p>简单的说就是 <em><strong>react</strong></em> 在浏览器内存中第一次生成的虚拟 dom 树。<strong>切记是虚拟 dom ，而不是浏览器的dom</strong>。</p>\n<p>了解 <strong><em>react</em></strong> 的应该知道，所有 <em><strong>react</strong></em> 组件都有一个 <em>render()</em>\n    方法（如果使用function方式编写的组件会把function里的所有代码都塞到 <em>render()</em> 方法中去）。当<em>ReactDOM.render( element, container,\n        [callback] )</em>方法执行时，会执行以下步骤：</p>\n<ol>\n    <li>所有组件的会先进行初始化（es6执行构造函数）。</li>\n    <li>所有组件的&nbsp;<em>render</em>&nbsp;<em>()</em> 方法会被调用一次，完成这个过程后会得到一颗虚拟的 dom 树。</li>\n    <li>&nbsp;<em><strong>react</strong></em> 会将虚拟dom转换成浏览器dom，完成后调用组件的&nbsp;<em>componentDidMount()</em>&nbsp;方法告诉你已经装载到浏览器上了。\n    </li>\n</ol>\n<p>在上面这个过程成中，步骤2完成后即为完成 <em><strong>react</strong></em> 的首屏渲染。结合 <strong><em>checksum</em></strong>&nbsp;机制步骤3有可能不会执行。\n</p>\n<p>当组件状态发生变更时（ <em>setState() </em>生命周期函数被调用）或者 父组件渲染时（父组件的 <em>render()</em> 方法被调用），当前组件的 <em>render()</em>\n    方法都会被执行，都有可能会导致虚拟dom变更，但是这些变更和首屏渲染没任何关系了。</p>\n\n<h2 id="h2-3">React前后端同构首屏渲染</h2>\n<p>了解了同构和首屏渲染，就好理解如何解决首屏不重复渲染的问题了。</p>\n<p>首先服务端渲染完之后会有一个 <em><strong>checksum</strong></em> 值写在根元素的属性上：</p>\n<p><img alt="React 前后端同构防止重复渲染" height="70"\n        src="https://file.mahoooo.com/res/file/react_server_render_with_checksum_1.png" width="601"></p>\n<p>这个 <em><strong>checksum</strong></em>&nbsp;是根据服务端生成的HTML内容哈希计算得到的。</p>\n<p>然后在浏览器加载完所有的js文件之后，开始执行前面介绍的&nbsp;<em>ReactDOM.render( element, container, [callback] )</em> &nbsp;初始化渲染的三个步骤。当执行完第二步生成虚拟dom后，<strong><em>react</em></strong>\n    会根虚拟dom用相同的算法计算一个哈希值，如果和 <em><strong>checksum</strong></em> 一致则认为服务器已经完成渲染，不会再执行第三步。</p>\n<p>如果 <strong><em>checksum</em></strong> 比对不一致，在 <strong>开发环境</strong>&nbsp;和 <strong>测试环境</strong>\n    会在浏览器console中输出以下警告内容：</p>\n<p><img alt="React 前后端同构防止重复渲染" height="85"\n        src="https://file.mahoooo.com/res/file/react_server_render_with_checksum_2.png" width="790"></p>\n<p><strong>生产环境不会输出任何警告。</strong></p>\n<p>同构渲染的内容就这么多，原理其实蛮简单的，无非就是保证DOM一致。但是结合代码分片、异步加载、服务端调接口异步组装数据等等功能后，如何保证服务端和浏览器端第一次渲染的dom一致还得花不少功夫。不过原理清楚了，事情总能办成。</p>'}};