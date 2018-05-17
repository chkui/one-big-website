webpackJsonp([1],{287:function(s,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});n.content='<p>在hazelcast的官方文档中，提到了其支持read-through，write-through与write-behind三种模式。查阅资料，最后在oracle的官文中找到了比较靠谱的解释。</p>\n<p>read-throug、write-through、write-behind三个概念都是关于数据缓存管理的。其实这些概念在实际使用的过程中经常接触。</p>\n<h2 id="h2-1"><strong>Read-throug</strong></h2>\n<p>当应用系统向缓存系统请求数据时（例如使用key=x向缓存请求数据）；如果缓存中并没有对应的数据存在（key=x的value不存在），缓存系统将向底层数据源的读取数据。如果数据在缓存中存在（命中key=x），则直接返回缓存中存在的数据。这就是所谓的<strong>Read-throug。</strong></p>\n<p>hazelcast原文：</p>\n<blockquote>\n    <p>If an entry does not exist in the memory when an application asks for it, Hazelcast asks your loader implementation to load that entry from the data store。 &nbsp;If the entry exists there, the loader implementation gets it, hands it to Hazelcast, and Hazelcast puts it into the memory. This is read-through persistence mode。</p>\n</blockquote>\n<p>下图是Oracle官网的<strong>Read-throug</strong>图例。\n    <img alt="Hazelcast read-through、write-through与write-behind模式" src="https://file.mahoooo.com/res/file/read_through_write_through_and_write_behind_1.jpg">\n</p>\n<h2 id="h2-2">Write-Through</h2>\n<p>当应用系统对缓存中的数据进行更新时（例如调用put方法更新或添加条目），缓存系统会同步更新缓存数据和底层数据源。</p>\n<p>下图展示了执行过程：</p>\n<p><img alt="Hazelcast read-through、write-through与write-behind模式" src="https://file.mahoooo.com/res/file/read_through_write_through_and_write_behind_2.jpg"></p>\n<h2 id="h2-3">Write-Behind</h2>\n<p>当应用系统对缓存中的数据进行更新时（例如调用put方法更新或添加条目），缓存系统会在指定的时间后向底层数据源更新数据。</p>\n<p><img alt="Hazelcast read-through、write-through与write-behind模式" src="https://file.mahoooo.com/res/file/read_through_write_through_and_write_behind_3.jpg"></p>'},294:function(s,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});n.content='<p>使用react到现在，让人头疼的一个问题是安装node-sass。其实导致问题的根源在于安装过程需要下载一个binding.node文件，而因“你懂的”原因，访问不了这个地址。根据这个原因，总结了以下几个解决方案：</p>\n<h2 id="h2-1">翻墙</h2>\n<p>这没什么好说的了，这是最轻松最彪悍的解决方案。只要能翻墙直接一个&nbsp;<span style="background-color:#D3D3D3">&nbsp;npm i&nbsp;</span>命令就完事了，什么都不必去操心。至于怎么翻墙…………\n</p>\n\n<h2 id="h2-2">使用cnpm</h2>\n<p>cnpm是一个强悍的工具，几乎能解决所有npm安装第三方包时遇到的问题。执行如下命令即可：</p>\n<pre class="sql"><code class="language-bash">npm <span class="code-keyword">install</span>\nnpm rm node-sass\ncnpm <span class="code-keyword">install</span> node-sass\nnpm <span class="code-keyword">install</span></code></pre>\n<p>\n    但是我们在使用cnpm时也遇到了一个坑，在ubuntu14.04打出来的包运行报错，不用cnpm下载居然就不会有这问题，由于没有时间，没有详细去了解原因是什么。如果你是Windows开发而使用Linux环境打包或运行，可能会碰到这个问题。</p>\n\n<h2 id="h2-3">下载后编译</h2>\n<p>\n    实际上为了得到binding.node，是可以直接从github上把源码下载下来之后再编译出来的，node-sass自己也会这样做，但是编译要依赖其他工具。在各种发行版的linux下还好，几乎所有需要的环境（python等）都是预安装的，如果是root权限直接<span\n        style="background-color:#A9A9A9"> upm install </span>就搞定了，所以有时候根本感觉不到这个问题。在windows下就得花时间根据install时的错误日志了解还要安装什么。\n</p>\n<p>linux下遇到权限问题请执行：</p>\n<pre class="lua"><code class="language-bash">npm i <span class="code-comment">--unsafe -perm</span></code></pre>\n\n<h2 id="h2-4">附送一个最奇葩的坑</h2>\n<p>这是我用所有的开源工具遇到过最奇葩的坑。我将一个文件命名为“./dropDown.scss”，然后在linux(是ubuntu\n    14.04其他发行版没时间去测试，windows没这毛病)上用webpack打包，打包过程没有任何异常，但是放到服务器上运行打开某个页面就抛出无法找到"./dropDown.scss"的异常，然后node直接停机了········。我前后跟进了2天寻找问题的原因。最后突发奇想将文件名由dropDown.scss修改为pullDown.scss后一切都好了。我强烈的怀疑是某个临时工在node-sass里写了什么“硬编码”对字符串进行判断，发现“/drop[*]”这样的前缀进行一些特殊处理。在此记录下来。</p>'},302:function(s,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});n.content='<h2 id="h2-1">什么叫前后端同构？</h2>\n<p>为了解决某些问题（比如SEO、提升渲染速度等）<strong><em>react</em></strong>\n    提供了2个方法在服务端生成一个HTML文本格式的字符串。在得到了这个HTML格式的字符串之后，通常会将其组装成一个页面直接返回给用户的浏览器。</p>\n<p>到这里，服务端的活已经干完了，然后就是浏览器这边干活。</p>\n<p>浏览器拿到HTML文本后，立刻进行渲染将内容呈现给用户。然后加载页面所需的 .js 文件，然后执行\n    <em><strong>JavaScript&nbsp;</strong></em>脚本，然后开始初始化&nbsp;<em><strong>react</strong></em> 组件…………</p>\n<p>到这里问题就来了。<strong><em>react</em></strong> 初始化组件后会执行组件内所有\n    <em>render&nbsp;() </em>方法，然后生成虚拟DOM的树形结构，然后在适当的时候将虚拟dom<em>写</em>到浏览器的真实dom中。因为 <strong><em>react</em></strong>\n    总是根据虚拟dom来生成真实dom，所以最后会把服务器端渲染好的HTML全部替换掉。</p>\n<p>\n    上面这个事情说不是问题确实也不是问题，无非就是用户看到页面然后“闪现”一下。说是问题还真是个问题，产品会拿着这毛病从用户体验的角度在各种场合和你死磕半个月。磕累了你索性把服务端渲染关了，然后运营又拿着SEO的问题准备和你开始撕逼了。</p>\n<p>聪明如 Facebook 的工程师当然想到了这些问题，所以他们在<em>ReactDOMServer.renderToString(element) 方法</em>中提供了一个\n    <strong><em>checksum</em></strong> 机制。</p>\n<p>关于&nbsp;<strong><em>checksum </em></strong> <a href="https://facebook.github.io/react/docs/react-dom-server.html"\n                                                  rel="nofollow">官网</a> 并没有太多介绍，但是国内外的各路博客介绍了不少。我一直想找&nbsp;<em><strong>react</strong></em>\n    开发者关于这个机制的介绍一直没找到……。</p>\n<p><strong>前后端同构</strong>就是保证前端和后端的dom结构一致，不会发生重复渲染。<em><strong>react</strong></em>\n    使用&nbsp;<strong><em>checksum </em></strong>机制进行保障。</p>\n\n<h2 id="h2-2">什么叫React首屏渲染？</h2>\n<p>简单的说就是 <em><strong>react</strong></em> 在浏览器内存中第一次生成的虚拟 dom 树。<strong>切记是虚拟 dom ，而不是浏览器的dom</strong>。</p>\n<p>了解 <strong><em>react</em></strong> 的应该知道，所有 <em><strong>react</strong></em> 组件都有一个 <em>render()</em>\n    方法（如果使用function方式编写的组件会把function里的所有代码都塞到 <em>render()</em> 方法中去）。当<em>ReactDOM.render( element, container,\n        [callback] )</em>方法执行时，会执行以下步骤：</p>\n<ol>\n    <li>所有组件的会先进行初始化（es6执行构造函数）。</li>\n    <li>所有组件的&nbsp;<em>render</em>&nbsp;<em>()</em> 方法会被调用一次，完成这个过程后会得到一颗虚拟的 dom 树。</li>\n    <li>&nbsp;<em><strong>react</strong></em> 会将虚拟dom转换成浏览器dom，完成后调用组件的&nbsp;<em>componentDidMount()</em>&nbsp;方法告诉你已经装载到浏览器上了。\n    </li>\n</ol>\n<p>在上面这个过程成中，步骤2完成后即为完成 <em><strong>react</strong></em> 的首屏渲染。结合 <strong><em>checksum</em></strong>&nbsp;机制步骤3有可能不会执行。\n</p>\n<p>当组件状态发生变更时（ <em>setState() </em>生命周期函数被调用）或者 父组件渲染时（父组件的 <em>render()</em> 方法被调用），当前组件的 <em>render()</em>\n    方法都会被执行，都有可能会导致虚拟dom变更，但是这些变更和首屏渲染没任何关系了。</p>\n\n<h2 id="h2-3">React前后端同构首屏渲染</h2>\n<p>了解了同构和首屏渲染，就好理解如何解决首屏不重复渲染的问题了。</p>\n<p>首先服务端渲染完之后会有一个 <em><strong>checksum</strong></em> 值写在根元素的属性上：</p>\n<p><img alt="React 前后端同构防止重复渲染" height="70"\n        src="https://file.mahoooo.com/res/file/react_server_render_with_checksum_1.png" width="601"></p>\n<p>这个 <em><strong>checksum</strong></em>&nbsp;是根据服务端生成的HTML内容哈希计算得到的。</p>\n<p>然后在浏览器加载完所有的js文件之后，开始执行前面介绍的&nbsp;<em>ReactDOM.render( element, container, [callback] )</em> &nbsp;初始化渲染的三个步骤。当执行完第二步生成虚拟dom后，<strong><em>react</em></strong>\n    会根虚拟dom用相同的算法计算一个哈希值，如果和 <em><strong>checksum</strong></em> 一致则认为服务器已经完成渲染，不会再执行第三步。</p>\n<p>如果 <strong><em>checksum</em></strong> 比对不一致，在 <strong>开发环境</strong>&nbsp;和 <strong>测试环境</strong>\n    会在浏览器console中输出以下警告内容：</p>\n<p><img alt="React 前后端同构防止重复渲染" height="85"\n        src="https://file.mahoooo.com/res/file/react_server_render_with_checksum_2.png" width="790"></p>\n<p><strong>生产环境不会输出任何警告。</strong></p>\n<p>同构渲染的内容就这么多，原理其实蛮简单的，无非就是保证DOM一致。但是结合代码分片、异步加载、服务端调接口异步组装数据等等功能后，如何保证服务端和浏览器端第一次渲染的dom一致还得花不少功夫。不过原理清楚了，事情总能办成。</p>'},310:function(s,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});n.content='<h3 id="h3-1">非受控组件（Uncontrolled Components）</h3>\n<h4 id="h4-1">使用非受控组件</h4>\n<p>在大部分情况下，推荐使用 <a title="受控组件" href="https://www.chkui.com/article/react/react_list_key_and_form#h1-2">受控组件</a> 来实现表单、输入框等状态控制。在受控组件中，表单等数据都有React组件自己处理。这里将介绍另外一种非受控组件，表单的数据有Dom自己控制。</p>\n<p>非受控组件实现的重点是用Refs特性获取真实Dom来代替每次数据变更去更新组件的状态值。</p>\n<p>例如下面的代码，在非受控组件中记录被用户输入的名字：</p>\n<pre class="scala"><code class="language-javascript"><span class="hljs-class"><span class="code-keyword"><span class="hljs-class"><span class="code-keyword">class</span></span></span><span class="hljs-class"> </span><span class="code-title"><span class="hljs-class"><span class="code-title">NameForm</span></span></span><span class="hljs-class"> </span><span class="code-keyword"><span class="hljs-class"><span class="code-keyword">extends</span></span></span><span class="hljs-class"> </span><span class="code-title"><span class="hljs-class"><span class="code-title">React</span></span></span><span class="hljs-class">.</span><span class="code-title"><span class="hljs-class"><span class="code-title">Component</span></span></span><span class="hljs-class"> </span></span>{\n  <span class="code-keyword">constructor</span>(props) {\n    <span class="code-keyword"><span class="code-keyword">super</span></span>(props);\n    <span class="code-keyword"><span class="code-keyword">this</span></span>.handleSubmit = <span class="code-keyword"><span class="code-keyword">this</span></span>.handleSubmit.bind(<span class="code-keyword"><span class="code-keyword">this</span></span>);\n  }\n\n  handleSubmit(event) {\n    <span class="code-comment"><span class="code-comment">//在提交时，直接使用ref获取的真实Dom获取值</span></span>\n    alert(<span class="code-string"><span class="hljs-symbol">\'A</span> name was submitted: \'</span> + <span class="code-keyword"><span class="code-keyword">this</span></span>.input.value);\n    event.preventDefault();\n  }\n\n  render() {\n    <span class="code-keyword"><span class="code-keyword">return</span></span> (\n      &lt;form onSubmit={<span class="code-keyword">this</span>.handleSubmit}&gt;\n        &lt;label&gt;\n          <span class="code-type">Name</span>:\n          &lt;input <span class="hljs-class"><span class="code-keyword">type</span></span>=<span class="code-string">"text"</span> ref={(input) =&gt; <span class="code-keyword">this</span>.input = input} /&gt;\n        &lt;/label&gt;\n        &lt;input <span class="hljs-class"><span class="code-keyword">type</span></span>=<span class="code-string">"submit"</span> value=<span class="code-string">"Submit"</span> /&gt;\n      &lt;/form&gt;\n    );\n  }\n}</code></pre>\n<p><a title="代码测试" href="https://codepen.io/gaearon/pen/WooRWa?editors=0010" rel="nofollow">尝试代码</a>。</p>\n<p>由于在非受控组件中使用Refs特性获取了真实Dom的实例，所以在使用非受控组建时，更容易集成React和非React代码，在某些时候也可以省略一些代码。但是建议除了特殊情况，都使用受控组件。</p>\n<p>如果想要深入理解什么情况下使用哪种组件，建议阅读 <a title="受控组件与非受控组件的差异" href="https://goshakkk.name/controlled-vs-uncontrolled-inputs-react/" rel="nofollow">受控和不受控表单输入</a> 一文。</p>\n<h4 id="h4-2">组件默认值</h4>\n<p>在React渲染的生命周期，表单中的value属性会被覆盖Dom中的value值。在使用非受控组件时，通常需要React设定一个默认初始值但是不再控制后续更新。基于这个案例，你可以指定一个<code>defaultValue</code>&nbsp;属性来代替&nbsp;<code>value</code>。</p>\n<pre class="xml"><code class="language-javascript">render() {\n  <span class="code-keyword">return</span> (\n    <span class="code-tag">&lt;<span class="code-name">form</span> <span class="hljs-attr">onSubmit</span>=<span class="code-string">{this.handleSubmit}</span>&gt;</span>\n      <span class="code-tag">&lt;<span class="code-name">label</span>&gt;</span>\n        Name:\n        <span class="code-tag">&lt;<span class="code-name">input</span>\n          <span class="hljs-attr">defaultValue</span>=<span class="code-string">"Bob"</span>\n          <span class="hljs-attr">type</span>=<span class="code-string">"text"</span>\n          <span class="hljs-attr">ref</span>=<span class="code-string">{(input)</span> =&gt;</span> this.input = input} /&gt;\n      <span class="code-tag">&lt;/<span class="code-name">label</span>&gt;</span>\n      <span class="code-tag">&lt;<span class="code-name">input</span> <span class="hljs-attr">type</span>=<span class="code-string">"submit"</span> <span class="hljs-attr">value</span>=<span class="code-string">"Submit"</span> /&gt;</span>\n    <span class="code-tag">&lt;/<span class="code-name">form</span>&gt;</span>\n  );\n}</code></pre>\n<p>例如中“defaultValue = "Bob"”就是指定了一个默认值。同样地，&nbsp;<code>&lt;input type="checkbox"&gt;</code>&nbsp;和&nbsp;<code>&lt;input type="radio"&gt;</code>&nbsp;支持&nbsp;<code>defaultChecked</code>属性，&nbsp;<code>&lt;select&gt;</code>&nbsp;标签支持&nbsp;<code>defaultValue</code>属性。</p>'}});