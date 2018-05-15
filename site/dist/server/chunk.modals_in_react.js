exports.ids=[20],exports.modules={265:function(s,a,n){"use strict";Object.defineProperty(a,"__esModule",{value:!0});a.content='<p>在16.x版本之后React提供了Protals功能来解决模式对话框不在Dom根节点导致的一些BUG。除了Protal还有更多的方法去解决这些问题，本文来自David\n    Gilbertson的博客，详细解释了React中模式对话框的一些问题，以及他给出的解决方案，在了解Protals之前阅读这篇内容，能让你更加明白Protal的重要性。</p>\n<p>对于React的模式对话框，有很多方法可以实现但是并没有一个绝对正确的方法。这句话怎么理解呢？让我们先看看一个模式对话框的特性：</p>\n<ol>\n    <li>能够浮现在最上层，阻止用户的其他操作。</li>\n    <li>能够处理鼠标和键盘事件，例如关闭窗口事件。</li>\n    <li>接受外部传入一个回调函数，当用户进行某些操作的时候调用他，例如点击“确定”或“取消”按钮。</li>\n    <li>接受外部参数，可以设定大小、文字、处理器等等。</li>\n</ol>\n\n<h2 id="h2-1">模式对话框的实现思路</h2>\n<p>下面的这些图片是常见模式对话框的例子：</p>\n<p><img alt="React中的模式对话框" src="https://file.mahoooo.com/res/file/modals_in_react_2018_5_15_2.png"></p>\n<p><img alt="React中的模式对话框" src="https://file.mahoooo.com/res/file/modals_in_react_2018_5_15_3.png"></p>\n<p><img alt="React中的模式对话框" src="https://file.mahoooo.com/res/file/modals_in_react_2018_5_15_4.png"></p>\n<p>这些模式对话框都有一个全局的背景遮罩层、有头部或描述内容、有一些功能按钮、可以随意设定的宽度和高度、位置居中。</p>\n<p>在React中有三种方式实现模式对话框：</p>\n<ol>\n    <li>使用一个常规的组件作为一个模式对话框的包装组件，然后将我们自定义的内容作为子组件传递给模式对话框。例如这个项目：<a href="https://github.com/reactjs/react-modal"\n                                                                   rel="nofollow">https://github.com/reactjs/react-modal</a>。\n    </li>\n    <li>将模式对话框放置到HTML结构的顶层，将其设置为 <em>document.body </em>的子元素。例如：<a href="https://github.com/tajo/react-portal"\n                                                                   rel="nofollow">https://github.com/tajo/react-portal</a>\n    </li>\n    <li>将模式对话框作为整个组件结构中的顶层组件（根元素的子组件），通过全局的数据来控制他显示或隐藏。</li>\n</ol>\n<p>那这三种实现方式有什么问题呢：</p>\n<p>第一种方式有定位问题。如果你用这种方式实现模式对话框，你的HTML上下文会影响当前模式对话框的展示效果，所以这种方式很有可能会出现一些意向不到的问题。你真的认为&nbsp;<strong>position:\n    fixed</strong>&nbsp;可以让某个元素相对与浏览器窗口绝对定位吗？请看这个例子：&nbsp;<a href="https://output.jsbin.com/fepime/" rel="nofollow">https://output.jsbin.com/fepime/</a>，使用开发人员工具看看\n    <em>.top-div</em> 和 <em>.fixed-div</em> 的样式你就懂了。</p>\n<p>\n    第二种方式首先对于单元测试不友好，因为我们不得不把对话框作为body的子元素（或者其他某个真实DOM的子元素）来显示，那么得有浏览器的真实DOM才能看到效果。而且这种方式看起来挺“骇客”的，我们按照单向数据流的思路开发了整套个标准合理的React组件，最后不得不用&nbsp;<strong>ReactDOM.unstable_renderSubtreeIntoContainer() </strong>方法装载一个组件到body元素中，最终可能会导致虚拟DOM与真实DOM不一致或者服务端渲染遇到问题。‘unstable’前缀的含义是React官方明确告诉你：这玩意有坑，踩上了别怪我。详情请看React官方对<strong>unstable_renderSubtreeIntoContainer</strong>的说明。\n</p>\n<p>第三种方式在笔者看来是最合理最优秀的，下面就谈谈这种实现方式的思路。</p>\n\n<h2 id="h2-2">全局数据流控制模式对话框</h2>\n<p>实际上就是用flux或redux的方式去控制对话框显示或关闭。如果之前用过flux之类思路的工具，后面的内容分分钟就理解了。</p>\n<p>先看下模式对话框的组件结构：</p>\n<p><img alt="React中的模式对话框" src="https://file.mahoooo.com/res/file/modals_in_react_2018_5_15_1.png"></p>\n<p></p>\n<ul>\n    <li><strong>App.jsx</strong>——整个工程的根组件，通常不会在这里有什么特殊的处理。它首先会渲染其他所有的顶层组件，然后再最后渲染模式对话框组件。</li>\n    <li><strong>ModalConductor.jsx</strong>——模式框的管理组件，由他来控制当前应该渲染哪个模式框。</li>\n    <li><strong>SignIn.jsx、EditScreen.jsx等组件</strong>——具体样式的模式对话框。</li>\n</ul>\n<p>在这些组件之外，还有store来存储全局模式对话框的相关数据。<strong>store.currentModal </strong>用于指示显示哪个模式框的字符串，如果为 null\n    则表示没有任何模式框要显示，所以整个工程一次只显示一个模式框。</p>\n<p>下面我们看看组件实现过程。</p>\n<p>首先我们在任何位置都可以修改 <strong>store</strong> 。当我们通过某种方式将&nbsp;<strong>store.currentModal </strong>的值修改为<strong>&nbsp;signIn\n    后，ModalConductor </strong>会触发重新渲染并在内部判断要渲染<strong>&nbsp;SignIn </strong>组件。</p>\n<p>这是 <strong>ModalConductor</strong>&nbsp;的示意代码，通过switch语句判断要显示的组件：</p>\n<pre class="typescript"><code class="language-javascript"><span class="code-keyword"><span\n        class="code-keyword">import</span></span> React <span class="code-keyword">from</span> <span\n        class="code-string"><span class="code-string">\'react\'</span></span>;\n\n<span class="code-keyword"><span class="code-keyword">import</span></span> ExportDataModal <span class="code-keyword">from</span> <span\n            class="code-string"><span class="code-string">\'./ExportDataModal.jsx\'</span></span>;\n<span class="code-keyword"><span class="code-keyword">import</span></span> SignInModal <span\n            class="code-keyword">from</span> <span class="code-string"><span\n            class="code-string">\'./SignInModal.jsx\'</span></span>;\n<span class="code-keyword"><span class="code-keyword">import</span></span> FeedbackModal <span\n            class="code-keyword">from</span> <span class="code-string"><span\n            class="code-string">\'./FeedbackModal.jsx\'</span></span>;\n<span class="code-keyword"><span class="code-keyword">import</span></span> BoxDetailsModal <span class="code-keyword">from</span> <span\n            class="code-string"><span class="code-string">\'./BoxDetailsModal.jsx\'</span></span>;\n\n<span class="code-keyword"><span class="code-keyword">const</span></span> ModalConductor = props =&gt; {\n  <span class="code-keyword"><span class="code-keyword">switch</span></span> (props.currentModal) {\n    <span class="code-keyword"><span class="code-keyword">case</span></span> <span class="code-string"><span\n            class="code-string">\'EXPORT_DATA\'</span></span>:\n      <span class="code-keyword"><span class="code-keyword">return</span></span> &lt;ExportDataModal {...props}/&gt;;\n\n    <span class="code-keyword">case</span> <span class="code-string">\'SOCIAL_SIGN_IN\'</span>:\n      <span class="code-keyword">return</span> &lt;SignInModal {...props}/&gt;;\n\n    <span class="code-keyword">case</span> <span class="code-string">\'FEEDBACK\'</span>:\n      <span class="code-keyword">return</span> &lt;FeedbackModal {...props}/&gt;;\n\n    <span class="code-keyword">case</span> <span class="code-string">\'EDIT_BOX\'</span>:\n      <span class="code-keyword">return</span> &lt;BoxDetailsModal {...props}/&gt;;\n\n    <span class="code-keyword">default</span>:\n      <span class="code-keyword">return</span> <span class="hljs-literal">null</span>;\n  }\n};\n\n<span class="code-keyword">export</span> <span class="code-keyword">default</span> ModalConductor;</code></pre>\n<p>下面模式对话框组件的代码结构：</p>\n<pre class="javascript"><code class="language-javascript"><span class="code-keyword"><span\n        class="code-keyword">import</span></span> React <span class="code-keyword"><span\n        class="code-keyword">from</span></span> <span class="code-string"><span\n        class="code-string">\'react\'</span></span>;\n\n<span class="code-keyword"><span class="code-keyword">import</span></span> ModalWrapper <span class="code-keyword"><span\n            class="code-keyword">from</span></span> <span class="code-string"><span class="code-string">\'../ModalWrapper.jsx\'</span></span>;\n\n<span class="code-keyword"><span class="code-keyword">const</span></span> SignIn = props =&gt; {\n  <span class="code-keyword"><span class="code-keyword">const</span></span> signIn = provider =&gt; {\n    props.hideModal();\n    props.signIn(provider);\n  };\n\n  <span class="code-keyword"><span class="code-keyword">return</span></span> (\n    <span class="xml"><span class="code-tag"><span class="xml"><span class="code-tag">&lt;</span></span><span\n            class="code-name"><span class="xml"><span class="code-tag"><span\n            class="code-name">ModalWrapper</span></span></span></span><span class="xml"><span class="code-tag">\n      {</span></span><span class="hljs-attr"><span class="xml"><span class="code-tag"><span\n            class="hljs-attr">...props</span></span></span></span><span class="xml"><span class="code-tag">}\n      </span></span><span class="hljs-attr"><span class="xml"><span class="code-tag"><span\n            class="hljs-attr">title</span></span></span></span><span class="xml"><span\n            class="code-tag">=</span></span><span class="code-string"><span class="xml"><span class="code-tag"><span\n            class="code-string">"Sign in"</span></span></span></span><span class="xml"><span class="code-tag">\n      </span></span><span class="hljs-attr"><span class="xml"><span class="code-tag"><span\n            class="hljs-attr">width</span></span></span></span><span class="xml"><span\n            class="code-tag">=</span></span><span class="code-string"><span class="xml"><span class="code-tag"><span\n            class="code-string">{400}</span></span></span></span><span class="xml"><span class="code-tag">\n      </span></span><span class="hljs-attr"><span class="xml"><span class="code-tag"><span\n            class="hljs-attr">showOk</span></span></span></span><span class="xml"><span class="code-tag">=</span></span><span\n            class="code-string"><span class="xml"><span class="code-tag"><span class="code-string">{false}</span></span></span></span><span\n            class="xml"><span class="code-tag">\n    &gt;</span></span></span><span class="xml">\n      </span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;</span></span><span\n            class="code-name"><span class="xml"><span class="code-tag"><span\n            class="code-name">p</span></span></span></span><span class="xml"><span\n            class="code-tag">&gt;</span></span></span><span class="xml">Choose your flavor</span><span class="code-tag"><span\n            class="xml"><span class="code-tag">&lt;/</span></span><span class="code-name"><span class="xml"><span\n            class="code-tag"><span class="code-name">p</span></span></span></span><span class="xml"><span\n            class="code-tag">&gt;</span></span></span><span class="xml">\n      </span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;</span></span><span\n            class="code-name"><span class="xml"><span class="code-tag"><span\n            class="code-name">button</span></span></span></span><span class="xml"><span class="code-tag"> </span></span><span\n            class="hljs-attr"><span class="xml"><span class="code-tag"><span\n            class="hljs-attr">onClick</span></span></span></span><span class="xml"><span\n            class="code-tag">=</span></span><span class="code-string"><span class="xml"><span class="code-tag"><span\n            class="code-string">{()</span></span></span></span><span class="xml"><span\n            class="code-tag"> =&gt;</span></span></span><span class="xml"> signIn(\'facebook\')}&gt;Facebook</span><span\n            class="code-tag"><span class="xml"><span class="code-tag">&lt;/</span></span><span class="code-name"><span\n            class="xml"><span class="code-tag"><span class="code-name">button</span></span></span></span><span\n            class="xml"><span class="code-tag">&gt;</span></span></span><span class="xml">\n      </span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;</span></span><span\n            class="code-name"><span class="xml"><span class="code-tag"><span\n            class="code-name">button</span></span></span></span><span class="xml"><span class="code-tag"> </span></span><span\n            class="hljs-attr"><span class="xml"><span class="code-tag"><span\n            class="hljs-attr">onClick</span></span></span></span><span class="xml"><span\n            class="code-tag">=</span></span><span class="code-string"><span class="xml"><span class="code-tag"><span\n            class="code-string">{()</span></span></span></span><span class="xml"><span\n            class="code-tag"> =&gt;</span></span></span><span class="xml"> signIn(\'google\')}&gt;Google</span><span\n            class="code-tag"><span class="xml"><span class="code-tag">&lt;/</span></span><span class="code-name"><span\n            class="xml"><span class="code-tag"><span class="code-name">button</span></span></span></span><span\n            class="xml"><span class="code-tag">&gt;</span></span></span><span class="xml">\n      </span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;</span></span><span\n            class="code-name"><span class="xml"><span class="code-tag"><span\n            class="code-name">button</span></span></span></span><span class="xml"><span class="code-tag"> </span></span><span\n            class="hljs-attr"><span class="xml"><span class="code-tag"><span\n            class="hljs-attr">onClick</span></span></span></span><span class="xml"><span\n            class="code-tag">=</span></span><span class="code-string"><span class="xml"><span class="code-tag"><span\n            class="code-string">{()</span></span></span></span><span class="xml"><span\n            class="code-tag"> =&gt;</span></span></span><span class="xml"> signIn(\'twitter\')}&gt;Twitter</span><span\n            class="code-tag"><span class="xml"><span class="code-tag">&lt;/</span></span><span class="code-name"><span\n            class="xml"><span class="code-tag"><span class="code-name">button</span></span></span></span><span\n            class="xml"><span class="code-tag">&gt;</span></span></span><span class="xml">\n    </span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;/</span></span><span\n            class="code-name"><span class="xml"><span class="code-tag"><span\n            class="code-name">ModalWrapper</span></span></span></span><span class="xml"><span\n            class="code-tag">&gt;</span></span></span></span>\n  );\n};\n\n<span class="code-keyword"><span class="code-keyword">export</span></span> <span class="code-keyword"><span\n            class="code-keyword">default</span></span> SignIn;</code></pre>\n<p>他内部使用了一个名为&nbsp;<strong>ModalWrapper </strong>的包装组件，用来显示模式对话框的效果，可以直接使用<a\n        href="https://github.com/reactjs/react-modal" rel="nofollow">https://github.com/reactjs/react-modal</a>或者自己实现，如下是一个模式框的包装组件：\n</p>\n<pre class="javascript"><code class="language-javascript"><span class="code-keyword"><span\n        class="code-keyword">import</span></span> React <span class="code-keyword"><span\n        class="code-keyword">from</span></span> <span class="code-string"><span\n        class="code-string">\'react\'</span></span>;\n<span class="code-keyword"><span class="code-keyword">const</span></span> {PropTypes} = React;\n\n<span class="code-keyword"><span class="code-keyword">const</span></span> ModalWrapper = props =&gt; {\n  <span class="code-keyword"><span class="code-keyword">const</span></span> handleBackgroundClick = e =&gt; {\n    <span class="code-keyword"><span class="code-keyword">if</span></span> (e.target === e.currentTarget) props.hideModal();\n  };\n\n  <span class="code-keyword"><span class="code-keyword">const</span></span> onOk = () =&gt; {\n    props.onOk();\n    props.hideModal();\n  };\n\n  <span class="code-keyword"><span class="code-keyword">const</span></span> okButton = props.showOk\n    ? (\n      <span class="xml"><span class="code-tag"><span class="xml"><span class="code-tag">&lt;</span></span><span\n              class="code-name"><span class="xml"><span class="code-tag"><span\n              class="code-name">button</span></span></span></span><span class="xml"><span class="code-tag">\n        </span></span><span class="hljs-attr"><span class="xml"><span class="code-tag"><span\n              class="hljs-attr">onClick</span></span></span></span><span class="xml"><span\n              class="code-tag">=</span></span><span class="code-string"><span class="xml"><span class="code-tag"><span\n              class="code-string">{onOk}</span></span></span></span><span class="xml"><span class="code-tag">\n        </span></span><span class="hljs-attr"><span class="xml"><span class="code-tag"><span\n              class="hljs-attr">disabled</span></span></span></span><span class="xml"><span\n              class="code-tag">=</span></span><span class="code-string"><span class="xml"><span class="code-tag"><span\n              class="code-string">{props.okDisabled}</span></span></span></span><span class="xml"><span\n              class="code-tag">\n      &gt;</span></span></span><span class="xml">\n        {props.okText}\n      </span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;/</span></span><span class="code-name"><span\n              class="xml"><span class="code-tag"><span class="code-name">button</span></span></span></span><span\n              class="xml"><span class="code-tag">&gt;</span></span></span></span>\n    ) : <span class="hljs-literal"><span class="hljs-literal">null</span></span>;\n\n  <span class="code-keyword"><span class="code-keyword">return</span></span> (\n    <span class="xml"><span class="code-tag"><span class="xml"><span class="code-tag">&lt;</span></span><span\n            class="code-name"><span class="xml"><span class="code-tag"><span class="code-name">div</span></span></span></span><span\n            class="xml"><span class="code-tag"> </span></span><span class="hljs-attr"><span class="xml"><span\n            class="code-tag"><span class="hljs-attr">onClick</span></span></span></span><span class="xml"><span\n            class="code-tag">=</span></span><span class="code-string"><span class="xml"><span class="code-tag"><span\n            class="code-string">{handleBackgroundClick}</span></span></span></span><span class="xml"><span\n            class="code-tag">&gt;</span></span></span><span class="xml">\n      </span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;</span></span><span\n            class="code-name"><span class="xml"><span class="code-tag"><span\n            class="code-name">header</span></span></span></span><span class="xml"><span\n            class="code-tag">&gt;</span></span></span><span class="xml">\n        </span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;</span></span><span\n            class="code-name"><span class="xml"><span class="code-tag"><span\n            class="code-name">h1</span></span></span></span><span class="xml"><span class="code-tag">&gt;</span></span></span><span\n            class="xml">{props.title}</span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;/</span></span><span\n            class="code-name"><span class="xml"><span class="code-tag"><span\n            class="code-name">h1</span></span></span></span><span class="xml"><span class="code-tag">&gt;</span></span></span><span\n            class="xml">\n\n        </span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;</span></span><span\n            class="code-name"><span class="xml"><span class="code-tag"><span\n            class="code-name">button</span></span></span></span><span class="xml"><span class="code-tag"> </span></span><span\n            class="hljs-attr"><span class="xml"><span class="code-tag"><span\n            class="hljs-attr">onClick</span></span></span></span><span class="xml"><span\n            class="code-tag">=</span></span><span class="code-string"><span class="xml"><span class="code-tag"><span\n            class="code-string">{props.hideModal}</span></span></span></span><span class="xml"><span class="code-tag">&gt;</span></span></span><span\n            class="xml">Close</span><span class="code-tag"><span class="xml"><span\n            class="code-tag">&lt;/</span></span><span class="code-name"><span class="xml"><span class="code-tag"><span\n            class="code-name">button</span></span></span></span><span class="xml"><span\n            class="code-tag">&gt;</span></span></span><span class="xml">\n      </span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;/</span></span><span class="code-name"><span\n            class="xml"><span class="code-tag"><span class="code-name">header</span></span></span></span><span\n            class="xml"><span class="code-tag">&gt;</span></span></span><span class="xml">\n\n      {props.children}\n\n      {okButton}\n    </span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;/</span></span><span\n            class="code-name"><span class="xml"><span class="code-tag"><span class="code-name">div</span></span></span></span><span\n            class="xml"><span class="code-tag">&gt;</span></span></span></span>\n  );\n};\n\nModalWrapper.defaultProps = {\n  title: <span class="code-string"><span class="code-string">\'\'</span></span>,\n  showOk: <span class="hljs-literal"><span class="hljs-literal">true</span></span>,\n  okText: <span class="code-string"><span class="code-string">\'OK\'</span></span>,\n  okDisabled: <span class="hljs-literal"><span class="hljs-literal">false</span></span>,\n  width: <span class="hljs-number"><span class="hljs-number">400</span></span>,\n  onOk: () =&gt; {}\n};\n\n<span class="code-keyword"><span class="code-keyword">export</span></span> <span class="code-keyword"><span\n            class="code-keyword">default</span></span> ModalWrapper;</code></pre>'}};