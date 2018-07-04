exports.ids=[40],exports.modules={293:function(s,a,n){"use strict";Object.defineProperty(a,"__esModule",{value:!0});a.content='<h3 id="h3-1">不使用ES6</h3>\n<p>通常情况下，定义一个React组件可以使用ES6规范中的class关键字：</p>\n<pre class="scala"><code class="language-javascript"><span class="hljs-class"><span class="code-keyword"><span\n        class="hljs-class"><span class="code-keyword">class</span></span></span><span class="hljs-class"> </span><span\n        class="code-title"><span class="hljs-class"><span class="code-title">Greeting</span></span></span><span\n        class="hljs-class"> </span><span class="code-keyword"><span class="hljs-class"><span class="code-keyword">extends</span></span></span><span\n        class="hljs-class"> </span><span class="code-title"><span class="hljs-class"><span\n        class="code-title">React</span></span></span><span class="hljs-class">.</span><span class="code-title"><span\n        class="hljs-class"><span class="code-title">Component</span></span></span><span\n        class="hljs-class"> </span></span>{\n  render() {\n    <span class="code-keyword"><span class="code-keyword">return</span></span> <span class="xml"><span class="code-tag">&lt;<span\n            class="code-name">h1</span>&gt;</span><span class="code-type">Hello</span>, {<span\n            class="code-keyword">this</span>.props.name}<span class="code-tag">&lt;/<span class="code-name">h1</span>&gt;</span></span>;\n  }\n}</code></pre>\n<p>如果不使用ES6语法，可以直接使用&nbsp;<code>React.createClass</code>&nbsp;来实现相同的功能：</p>\n<pre class="javascript"><code class="language-javascript"><span class="code-keyword"><span\n        class="code-keyword">var</span></span> Greeting = React.createClass({\n  render: <span class="hljs-function"><span class="code-keyword"><span class="hljs-function"><span class="code-keyword">function</span></span></span><span\n            class="hljs-function">(</span><span class="hljs-params"></span><span class="hljs-function"><span\n            class="hljs-params"></span>) </span></span>{\n    <span class="code-keyword"><span class="code-keyword">return</span></span> <span class="xml"><span class="code-tag"><span\n            class="xml"><span class="code-tag">&lt;</span></span><span class="code-name"><span class="xml"><span\n            class="code-tag"><span class="code-name">h1</span></span></span></span><span class="xml"><span\n            class="code-tag">&gt;</span></span></span><span class="xml">Hello, {this.props.name}</span><span\n            class="code-tag"><span class="xml"><span class="code-tag">&lt;/</span></span><span class="code-name"><span\n            class="xml"><span class="code-tag"><span class="code-name">h1</span></span></span></span><span\n            class="xml"><span class="code-tag">&gt;</span></span></span></span>;\n  }\n});</code></pre>\n\n<h4 id="h4-1">声明Prop的检查类型以及默认Props值</h4>\n<p>在前面的博文（<a title="React prop类型检查与Dom" href="https://www.chkui.com/article/react/react_typechecking_with_proptypes_and_dom_element">React prop类型检查与Dom</a>）中介绍了如何规约Prop的参数值，给出的例子都是用ES6实现的：</p>\n<pre class="scala"><code class="language-javascript"><span class="hljs-class"><span class="code-keyword"><span\n        class="hljs-class"><span class="code-keyword">class</span></span></span><span class="hljs-class"> </span><span\n        class="code-title"><span class="hljs-class"><span class="code-title">Greeting</span></span></span><span\n        class="hljs-class"> </span><span class="code-keyword"><span class="hljs-class"><span class="code-keyword">extends</span></span></span><span\n        class="hljs-class"> </span><span class="code-title"><span class="hljs-class"><span\n        class="code-title">React</span></span></span><span class="hljs-class">.</span><span class="code-title"><span\n        class="hljs-class"><span class="code-title">Component</span></span></span><span\n        class="hljs-class"> </span></span>{\n  <span class="code-comment"><span class="code-comment">// ...</span></span>\n}\n\n<span class="code-type">Greeting</span>.propTypes = {\n  name: <span class="code-type">React</span>.<span class="code-type">PropTypes</span>.string\n};\n\n<span class="code-type">Greeting</span>.defaultProps = {\n  name: <span class="code-string"><span class="hljs-symbol">\'Mar</span>y\'</span>\n};</code></pre>\n<p>\n    在使用&nbsp;<code>React.createClass</code>&nbsp;时，可以通过设定传入的对象的一个属性值——&nbsp;<code>propTypes</code>&nbsp;来指定参数类型，通过&nbsp;<code>getDefaultProps()</code>&nbsp;方法来设定每个参数的默认值：\n</p>\n<pre class="actionscript"><code class="language-javascript"><span class="code-keyword"><span\n        class="code-keyword">var</span></span> Greeting = React.createClass({\n  propTypes: {\n    name: PropTypes.string\n  },\n\n  getDefaultProps: <span class="hljs-function"><span class="code-keyword"><span class="hljs-function"><span\n            class="code-keyword">function</span></span></span><span class="hljs-function"><span\n            class="hljs-params">(</span></span><span class="hljs-params"></span><span class="hljs-function"><span\n            class="hljs-params">)</span> </span></span>{\n    <span class="code-keyword"><span class="code-keyword">return</span></span> {\n      name: <span class="code-string"><span class="code-string">\'Mary\'</span></span>\n    };\n  },\n\n  <span class="code-comment"><span class="code-comment">// ...</span></span>\n\n});</code></pre>\n\n<h4 id="h4-2">设定初始化状态</h4>\n<p>在ES6的 class&nbsp;结构中，我们可以在构造函数中设定初始化状态：</p>\n<pre class="scala"><code class="language-javascript"><span class="hljs-class"><span class="code-keyword"><span\n        class="hljs-class"><span class="code-keyword">class</span></span></span><span class="hljs-class"> </span><span\n        class="code-title"><span class="hljs-class"><span class="code-title">Counter</span></span></span><span\n        class="hljs-class"> </span><span class="code-keyword"><span class="hljs-class"><span class="code-keyword">extends</span></span></span><span\n        class="hljs-class"> </span><span class="code-title"><span class="hljs-class"><span\n        class="code-title">React</span></span></span><span class="hljs-class">.</span><span class="code-title"><span\n        class="hljs-class"><span class="code-title">Component</span></span></span><span\n        class="hljs-class"> </span></span>{\n  <span class="code-keyword">constructor</span>(props) {\n    <span class="code-keyword"><span class="code-keyword">super</span></span>(props);\n    <span class="code-keyword"><span class="code-keyword">this</span></span>.state = {count: props.initialCount};\n  }\n  <span class="code-comment"><span class="code-comment">// ...</span></span>\n}</code></pre>\n<p>在使用&nbsp;<code>React.createClass</code>&nbsp;时，可以为传入的对象参数添加一个&nbsp;&nbsp;<code>getInitialState</code>&nbsp;方法并返回一个初始状态值：\n</p>\n<pre class="actionscript"><code class="language-javascript"><span class="code-keyword"><span\n        class="code-keyword">var</span></span> Counter = React.createClass({\n  getInitialState: <span class="hljs-function"><span class="code-keyword"><span class="hljs-function"><span\n            class="code-keyword">function</span></span></span><span class="hljs-function"><span\n            class="hljs-params">(</span></span><span class="hljs-params"></span><span class="hljs-function"><span\n            class="hljs-params">)</span> </span></span>{\n    <span class="code-keyword"><span class="code-keyword">return</span></span> {count: <span class="code-keyword"><span\n            class="code-keyword">this</span></span>.props.initialCount};\n  },\n  <span class="code-comment"><span class="code-comment">// ...</span></span>\n});</code></pre>\n\n<h4 id="h4-3">自动绑定</h4>\n<p>当使用ES6的 <em>class </em>关键字声明一个React组件时，类中的方法遵循与常规的方法一样的定义。这就意味着在类中申明的方法在执行时并不会自动属于当前实例，必须在构造函数中显示的使用.bind(this)方法绑定到当前实例：\n</p>\n<pre class="scala"><code class="language-javascript"><span class="hljs-class"><span class="code-keyword"><span\n        class="hljs-class"><span class="code-keyword">class</span></span></span><span class="hljs-class"> </span><span\n        class="code-title"><span class="hljs-class"><span class="code-title">SayHello</span></span></span><span\n        class="hljs-class"> </span><span class="code-keyword"><span class="hljs-class"><span class="code-keyword">extends</span></span></span><span\n        class="hljs-class"> </span><span class="code-title"><span class="hljs-class"><span\n        class="code-title">React</span></span></span><span class="hljs-class">.</span><span class="code-title"><span\n        class="hljs-class"><span class="code-title">Component</span></span></span><span\n        class="hljs-class"> </span></span>{\n  <span class="code-keyword">constructor</span>(props) {\n    <span class="code-keyword"><span class="code-keyword">super</span></span>(props);\n    <span class="code-keyword"><span class="code-keyword">this</span></span>.state = {message: <span\n            class="code-string"><span class="hljs-symbol">\'Hello</span>!\'</span>};\n    <span class="code-comment"><span class="code-comment">// 必须，否在在handleClick中this将指向调用对象</span></span>\n    <span class="code-keyword"><span class="code-keyword">this</span></span>.handleClick = <span\n            class="code-keyword"><span class="code-keyword">this</span></span>.handleClick.bind(<span\n            class="code-keyword"><span class="code-keyword">this</span></span>);\n  }\n\n  handleClick() {\n    alert(<span class="code-keyword"><span class="code-keyword">this</span></span>.state.message);\n  }\n\n  render() {\n    <span class="code-keyword"><span class="code-keyword">return</span></span> (\n      <span class="xml"><span class="code-tag">&lt;<span class="code-name">button</span> <span\n              class="hljs-attr">onClick</span>=<span class="code-string">{<span class="code-keyword">this</span>.handleClick}</span>&gt;</span>\n        <span class="code-type">Say</span> hello\n      <span class="code-tag">&lt;/<span class="code-name">button</span>&gt;</span></span>\n    );\n  }\n}</code></pre>\n<p>在使用&nbsp;<code>React.createClass</code>&nbsp;时不必绑定所有的方法：</p>\n<pre class="javascript"><code class="language-javascript"><span class="code-keyword"><span\n        class="code-keyword">var</span></span> SayHello = React.createClass({\n  getInitialState: <span class="hljs-function"><span class="code-keyword"><span class="hljs-function"><span\n            class="code-keyword">function</span></span></span><span class="hljs-function">(</span><span\n            class="hljs-params"></span><span class="hljs-function"><span class="hljs-params"></span>) </span></span>{\n    <span class="code-keyword"><span class="code-keyword">return</span></span> {message: <span class="code-string"><span\n            class="code-string">\'Hello!\'</span></span>};\n  },\n\n  handleClick: <span class="hljs-function"><span class="code-keyword"><span class="hljs-function"><span\n            class="code-keyword">function</span></span></span><span class="hljs-function">(</span><span\n            class="hljs-params"></span><span class="hljs-function"><span class="hljs-params"></span>) </span></span>{\n    alert(<span class="code-keyword"><span class="code-keyword">this</span></span>.state.message);\n  },\n\n  render: <span class="hljs-function"><span class="code-keyword"><span class="hljs-function"><span class="code-keyword">function</span></span></span><span\n            class="hljs-function">(</span><span class="hljs-params"></span><span class="hljs-function"><span\n            class="hljs-params"></span>) </span></span>{\n    <span class="code-keyword"><span class="code-keyword">return</span></span> (\n      <span class="xml"><span class="code-tag"><span class="xml"><span class="code-tag">&lt;</span></span><span\n              class="code-name"><span class="xml"><span class="code-tag"><span\n              class="code-name">button</span></span></span></span><span class="xml"><span\n              class="code-tag"> </span></span><span class="hljs-attr"><span class="xml"><span class="code-tag"><span\n              class="hljs-attr">onClick</span></span></span></span><span class="xml"><span\n              class="code-tag">=</span></span><span class="code-string"><span class="xml"><span class="code-tag"><span\n              class="code-string">{this.handleClick}</span></span></span></span><span class="xml"><span\n              class="code-tag">&gt;</span></span></span><span class="xml">\n        Say hello\n      </span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;/</span></span><span class="code-name"><span\n              class="xml"><span class="code-tag"><span class="code-name">button</span></span></span></span><span\n              class="xml"><span class="code-tag">&gt;</span></span></span></span>\n    );\n  }\n});</code></pre>\n<p>以上的特性意味着使用ES6编写代码每一个方法都会额外增加一些样板式代码，但是对于大型应用来说代码结构更清晰。</p>\n<p>如果十分排斥样板式代码，可以启用Babal的 类属性功能（&nbsp;<a title="Class Properties" href="https://babeljs.io/docs/plugins/transform-class-properties/"\n                                         rel="nofollow">Class Properties</a>&nbsp;），利用双箭头来创建方法：</p>\n<pre class="scala"><code class="language-javascript"><span class="hljs-class"><span class="code-keyword"><span\n        class="hljs-class"><span class="code-keyword">class</span></span></span><span class="hljs-class"> </span><span\n        class="code-title"><span class="hljs-class"><span class="code-title">SayHello</span></span></span><span\n        class="hljs-class"> </span><span class="code-keyword"><span class="hljs-class"><span class="code-keyword">extends</span></span></span><span\n        class="hljs-class"> </span><span class="code-title"><span class="hljs-class"><span\n        class="code-title">React</span></span></span><span class="hljs-class">.</span><span class="code-title"><span\n        class="hljs-class"><span class="code-title">Component</span></span></span><span\n        class="hljs-class"> </span></span>{\n  <span class="code-keyword">constructor</span>(props) {\n    <span class="code-keyword"><span class="code-keyword">super</span></span>(props);\n    <span class="code-keyword"><span class="code-keyword">this</span></span>.state = {message: <span\n            class="code-string"><span class="hljs-symbol">\'Hello</span>!\'</span>};\n  }\n\n  handleClick = () =&gt; {\n    alert(<span class="code-keyword"><span class="code-keyword">this</span></span>.state.message);\n  }\n\n  render() {\n    <span class="code-keyword"><span class="code-keyword">return</span></span> (\n      <span class="xml"><span class="code-tag">&lt;<span class="code-name">button</span> <span\n              class="hljs-attr">onClick</span>=<span class="code-string">{<span class="code-keyword">this</span>.handleClick}</span>&gt;</span>\n        <span class="code-type">Say</span> hello\n      <span class="code-tag">&lt;/<span class="code-name">button</span>&gt;</span></span>\n    );\n  }\n}</code></pre>\n<p>需要注意的是，目前这个功能还是实验性的，双箭头的表达式很有可能会调整。该提议不一定会被委员会接纳。</p>\n<p>如果非常想要尝试这种写法，你可以有这几种实现方式：</p>\n<ol>\n    <li>在构造函数中绑定方法。</li>\n    <li>使用箭头来定义方法。</li>\n    <li>使用&nbsp;<code>React.createClass</code>&nbsp;。</li>\n</ol>\n\n<h4 id="h4-4">代码混合器</h4>\n<blockquote>\n    <p>注意：</p>\n    <p>ES6在目前的方案中并不支持代码混合功能，因此在使用ES6编写React代码时并不能实现相关功能。</p>\n    <p>官方也收到许多在使用混合器时遇到的问题，强烈建议不要在新的代码中使用混合器功能。</p>\n    <p>以下的内容仅供参考。</p>\n</blockquote>\n<p>某些时候2个不同的组件需要共享一些相同的方法或者功能。这种情况我们称为 横切关联（&nbsp;<a title="cross-cutting concerns" href="https://en.wikipedia.org/wiki/Cross-cutting_concern"\n                                                     rel="nofollow">cross-cutting concerns</a>）。&nbsp;<a title="React.createClass"\n        href="https://facebook.github.io/react/docs/top-level-api.html#react.createclass" rel="nofollow"><code>React.createClass</code></a>&nbsp;可以通过继承来实现组件间公用相同方法。\n</p>\n<p>一个通用的案例是一个组件需要定期更新自己的状态，只要使用<code>setInterval()</code>就可以实现。但是当您不再需要它来节省内存时，取消定时器是很重要的。React提供了生命周期方法来通知创建和销毁事件。下面的代码创建了一个肩带的混合器，混合器的作用是当组件被销毁之前，可以清除已有的定时器：\n</p>\n<pre class="javascript"><code class="language-javascript"><span class="code-comment"><span class="code-comment">// 定义一个混合器</span></span>\n<span class="code-keyword"><span class="code-keyword">var</span></span> SetIntervalMixin = {\n  <span class="code-comment"><span class="code-comment">//组件将要被渲染时调用</span></span>\n  componentWillMount: <span class="hljs-function"><span class="code-keyword"><span class="hljs-function"><span\n            class="code-keyword">function</span></span></span><span class="hljs-function">(</span><span\n            class="hljs-params"></span><span class="hljs-function"><span class="hljs-params"></span>) </span></span>{\n    <span class="code-keyword"><span class="code-keyword">this</span></span>.intervals = [];\n  },\n  <span class="code-comment"><span class="code-comment">// 设置定时器方法</span></span>\n  setInterval: <span class="hljs-function"><span class="code-keyword"><span class="hljs-function"><span\n            class="code-keyword">function</span></span></span><span class="hljs-function">(</span><span\n            class="hljs-params"></span><span class="hljs-function"><span class="hljs-params"></span>) </span></span>{\n    <span class="code-keyword"><span class="code-keyword">this</span></span>.intervals.push(setInterval.apply(<span\n            class="hljs-literal"><span class="hljs-literal">null</span></span>, <span class="code-built_in"><span\n            class="code-built_in">arguments</span></span>));\n  },\n\n  <span class="code-comment"><span class="code-comment">//组件将要被卸载时调用</span></span>\n  componentWillUnmount: <span class="hljs-function"><span class="code-keyword"><span class="hljs-function"><span\n            class="code-keyword">function</span></span></span><span class="hljs-function">(</span><span\n            class="hljs-params"></span><span class="hljs-function"><span class="hljs-params"></span>) </span></span>{\n    <span class="code-keyword"><span class="code-keyword">this</span></span>.intervals.forEach(clearInterval);\n  }\n};\n\n<span class="code-keyword"><span class="code-keyword">var</span></span> TickTock = React.createClass({\n  mixins: [SetIntervalMixin], <span class="code-comment"><span class="code-comment">// 设定混合器</span></span>\n  getInitialState: <span class="hljs-function"><span class="code-keyword"><span class="hljs-function"><span\n            class="code-keyword">function</span></span></span><span class="hljs-function">(</span><span\n            class="hljs-params"></span><span class="hljs-function"><span class="hljs-params"></span>) </span></span>{\n    <span class="code-keyword"><span class="code-keyword">return</span></span> {seconds: <span class="hljs-number"><span\n            class="hljs-number">0</span></span>};\n  },\n  componentDidMount: <span class="hljs-function"><span class="code-keyword"><span class="hljs-function"><span\n            class="code-keyword">function</span></span></span><span class="hljs-function">(</span><span\n            class="hljs-params"></span><span class="hljs-function"><span class="hljs-params"></span>) </span></span>{\n    <span class="code-keyword"><span class="code-keyword">this</span></span>.setInterval(<span\n            class="code-keyword"><span class="code-keyword">this</span></span>.tick, <span class="hljs-number"><span\n            class="hljs-number">1000</span></span>); <span class="code-comment"><span class="code-comment">// 调用混合器中的setInterval 方法</span></span>\n  },\n  tick: <span class="hljs-function"><span class="code-keyword"><span class="hljs-function"><span class="code-keyword">function</span></span></span><span\n            class="hljs-function">(</span><span class="hljs-params"></span><span class="hljs-function"><span\n            class="hljs-params"></span>) </span></span>{\n    <span class="code-keyword"><span class="code-keyword">this</span></span>.setState({seconds: <span\n            class="code-keyword"><span class="code-keyword">this</span></span>.state.seconds + <span\n            class="hljs-number"><span class="hljs-number">1</span></span>});\n  },\n  render: <span class="hljs-function"><span class="code-keyword"><span class="hljs-function"><span class="code-keyword">function</span></span></span><span\n            class="hljs-function">(</span><span class="hljs-params"></span><span class="hljs-function"><span\n            class="hljs-params"></span>) </span></span>{\n    <span class="code-keyword"><span class="code-keyword">return</span></span> (\n      <span class="xml"><span class="code-tag"><span class="xml"><span class="code-tag">&lt;</span></span><span\n              class="code-name"><span class="xml"><span class="code-tag"><span class="code-name">p</span></span></span></span><span\n              class="xml"><span class="code-tag">&gt;</span></span></span><span class="xml">\n        React has been running for {this.state.seconds} seconds.\n      </span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;/</span></span><span class="code-name"><span\n              class="xml"><span class="code-tag"><span class="code-name">p</span></span></span></span><span class="xml"><span\n              class="code-tag">&gt;</span></span></span></span>\n    );\n  }\n});\n\nReactDOM.render(\n  <span class="xml"><span class="code-tag"><span class="xml"><span class="code-tag">&lt;</span></span><span\n          class="code-name"><span class="xml"><span class="code-tag"><span\n          class="code-name">TickTock</span></span></span></span><span class="xml"><span\n          class="code-tag"> /&gt;</span></span></span><span class="xml">,\n  document.getElementById(\'example\')\n);</span></span></code></pre>\n<p>如果组件使用了多个混合器并且很多混合器定义了相同的生命周期方法，比如同时定义了componentWillUnmount方法当组件卸载时注销某些资源。所有混合器的生命周期方法都会被调用，React会按照混合器设定的顺序来执行。</p>\n\n<h3 id="h3-2">不使用JSX</h3>\n<p>对于React来说JSX并不是必须要使用的表达式。当在环境中不想在家额外的编译工具时尤其适用。</p>\n<p>每一个JSX的元素都仅仅是<code>React.createElement(component, props, ...children)</code>的语法糖，所以任何使用JSX表达式实现的内容都可以直接用JavaScript来实现。\n</p>\n<p>例如下面使用JSX编码的例子：</p>\n<pre class="scala"><code class="language-javascript"><span class="hljs-class"><span class="code-keyword"><span\n        class="hljs-class"><span class="code-keyword">class</span></span></span><span class="hljs-class"> </span><span\n        class="code-title"><span class="hljs-class"><span class="code-title">Hello</span></span></span><span\n        class="hljs-class"> </span><span class="code-keyword"><span class="hljs-class"><span class="code-keyword">extends</span></span></span><span\n        class="hljs-class"> </span><span class="code-title"><span class="hljs-class"><span\n        class="code-title">React</span></span></span><span class="hljs-class">.</span><span class="code-title"><span\n        class="hljs-class"><span class="code-title">Component</span></span></span><span\n        class="hljs-class"> </span></span>{\n  render() {\n    <span class="code-keyword"><span class="code-keyword">return</span></span> <span class="xml"><span class="code-tag">&lt;<span\n            class="code-name">div</span>&gt;</span><span class="code-type">Hello</span> {<span\n            class="code-keyword">this</span>.props.toWhat}<span class="code-tag">&lt;/<span class="code-name">div</span>&gt;</span></span>;\n  }\n}\n\n<span class="code-type">ReactDOM</span>.render(\n  <span class="xml"><span class="code-tag">&lt;<span class="code-name"><span class="code-type">Hello</span></span> <span\n          class="hljs-attr">toWhat</span>=<span class="code-string"><span class="code-string">"World"</span></span> /&gt;</span>,\n  document.getElementById(<span class="hljs-symbol">\'roo</span>t\')\n);</span></code></pre>\n<p>如果我们不想使用JSX，可以将其修改为：</p>\n<pre class="scala"><code class="language-javascript"><span class="hljs-class"><span class="code-keyword"><span\n        class="hljs-class"><span class="code-keyword">class</span></span></span><span class="hljs-class"> </span><span\n        class="code-title"><span class="hljs-class"><span class="code-title">Hello</span></span></span><span\n        class="hljs-class"> </span><span class="code-keyword"><span class="hljs-class"><span class="code-keyword">extends</span></span></span><span\n        class="hljs-class"> </span><span class="code-title"><span class="hljs-class"><span\n        class="code-title">React</span></span></span><span class="hljs-class">.</span><span class="code-title"><span\n        class="hljs-class"><span class="code-title">Component</span></span></span><span\n        class="hljs-class"> </span></span>{\n  render() {\n    <span class="code-keyword"><span class="code-keyword">return</span></span> <span class="code-type">React</span>.createElement(<span\n            class="code-string"><span class="hljs-symbol">\'di</span>v\'</span>, <span class="hljs-literal"><span\n            class="hljs-literal">null</span></span>, <span class="code-string">`<span\n            class="code-type">Hello</span> <span class="hljs-subst">${<span class="code-keyword">this</span>.props.toWhat}</span>`</span>);\n  }\n}\n\n<span class="code-type">ReactDOM</span>.render(\n  <span class="code-type">React</span>.createElement(<span class="code-type">Hello</span>, {toWhat: <span\n            class="code-string"><span class="hljs-symbol">\'Worl</span>d\'</span>}, <span class="hljs-literal"><span\n            class="hljs-literal">null</span></span>),\n  <span class="code-built_in">document</span>.getElementById(<span class="code-string"><span\n            class="hljs-symbol">\'roo</span>t\'</span>)\n);</code></pre>\n<p>如果你对JSX如何转换成JavaScript有很强的兴趣，可以打开这个在线编译器试试：<a title="the online Babel compiler"\n        href="https://babeljs.io/repl/#?babili=false&amp;evaluate=true&amp;lineWrap=false&amp;presets=es2015%2Creact%2Cstage-0&amp;code=function%20hello()%20%7B%0A%20%20return%20%3Cdiv%3EHello%20world!%3C%2Fdiv%3E%3B%0A%7D"\n        rel="nofollow">the online Babel compiler</a>。</p>\n<p>组件被编译成一段字符串、由&nbsp;<code>React.Component</code>创建的子类或者一个普通无状态的组件。</p>\n<p>如果对编码时每次都要键入长长React.createElement感到痛苦，一个常见的模式是分配一个别名：</p>\n<pre class="javascript"><code class="language-javascript"><span class="code-keyword"><span\n        class="code-keyword">const</span></span> e = React.createElement;\n\nReactDOM.render(\n  e(<span class="code-string"><span class="code-string">\'div\'</span></span>, <span class="hljs-literal"><span\n            class="hljs-literal">null</span></span>, <span class="code-string"><span\n            class="code-string">\'Hello World\'</span></span>),\n  <span class="code-built_in"><span class="code-built_in">document</span></span>.getElementById(<span\n            class="code-string"><span class="code-string">\'root\'</span></span>)\n);</code></pre>\n<p></p>'}};