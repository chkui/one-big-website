exports.ids=[50],exports.modules={322:function(s,n,a){"use strict";Object.defineProperty(n,"__esModule",{value:!0});n.content='<h2 id="h2-1">在一般组件中使用Forwarding Refs</h2>\n<p>通常情况下，我们想获取一个组建或则一个HTML元素的实例通过 <a\n        href="https://www.chkui.com/article/react/react_typechecking_with_proptypes_and_dom_element" title="Ref特性">Ref特性</a>\n    就可以实现，但是某些时候我们需要在子父级组建中传递使用实例，Forwarding Refs提供了一种技术手段来满足这个要求，特别是开发一些重复使用的组建库时。比如下面的例子：</p>\n<pre><code class="javascript"><span class="hljs-function"><span class="code-keyword">function</span> <span\n        class="code-title">MyButton</span>(<span class="hljs-params">props</span>) </span>{\n  <span class="code-keyword">return</span> (\n    <span class="xml"><span class="code-tag">&lt;<span class="code-name">button</span> <span\n            class="hljs-attr">className</span>=<span class="code-string">"MyButton"</span>&gt;</span>\n      {props.children}\n    <span class="code-tag">&lt;/<span class="code-name">button</span>&gt;</span></span>\n  );\n}</code></pre>\n<p>上面的代码中MyButton组件渲染了一个HTML元素。对于使用者而言，React隐藏了将代码渲染成页面元素的过程，当其他组件使用MyButton时，并没有任何直接的方法来获取MyButton中的&lt;button&gt;元素，这样的设计方法有利于组建的分片管理，降低耦合。</p>\n<p>\n    但是像MyButton这样的组建，其实仅仅是对基本的HTML元素进行了简单的封装。某些时候，上层组建使用他时更希望将其作为一个基本的HTML元素来看待，实现某些效果需要直接操作DOM，比如focus、selection和animations效果。</p>\n<p>下面的例子将Forwarding Refs添加到MyButton组件中，以实现实例传递的效果。</p>\n<pre><code class="javascript"><span class="code-keyword">const</span> MyButton = React.forwardRef(<span\n        class="hljs-function">(<span class="hljs-params">props, ref</span>) =&gt;</span> (\n  <span class="xml"><span class="code-tag">&lt;<span class="code-name">button</span> <span class="hljs-attr">ref</span>=<span\n          class="code-string">{ref}</span> <span class="hljs-attr">className</span>=<span\n          class="code-string">"MyButton"</span>&gt;</span>\n    {props.children}\n  <span class="code-tag">&lt;/<span class="code-name">button</span>&gt;</span></span>\n));\n\n<span class="code-comment">// 通过ref可以直接操作&lt;button&gt;元素:</span>\n<span class="code-keyword">const</span> ref = React.createRef();\n<span class="xml"><span class="code-tag">&lt;<span class="code-name">MyButton</span> <span class="hljs-attr">ref</span>=<span\n        class="code-string">{ref}</span>&gt;</span>Click me!<span class="code-tag">&lt;/<span\n        class="code-name">MyButton</span>&gt;</span></span>;</code></pre>\n<p>这个时候，ref可以直接操作&lt;button&gt;元素。其实执行过程非常简单，也就下面5步：</p>\n<ol>\n    <li>通过React.createRef()方法创建一个ref实例。</li>\n    <li>和通常使用Ref一样，将其作为一个ref属性参数传递给MyButton组件。</li>\n    <li>使用React.forwardRef方法来创建一个组件，并将ref作为第二个参数传递。</li>\n    <li>将ref参数以ref属性的方式传递给&lt;button&gt;元素。</li>\n    <li>在渲染之后，可以使用ref.current来获取&lt;button&gt;元素的实例。</li>\n</ol>\n<p><span style="color:#e74c3c">需要注意的是只有使用React.forwardRef来创建一个组件时，第二个ref参数才会存在。固定的方法或者使用类来创建组件并不会接收到ref参数。Forwarding Refs特性并不仅仅局限于用在HTML DOM元素上，这种方式也实用于组件之间传递Ref。&nbsp;</span>\n</p>\n\n<h2 id="h2-2">在高阶组件中使用Forwarding Refs</h2>\n<p><a href="https://www.chkui.com/article/react/react_high_order_component" title="高阶组件">高阶组件（HOCs）</a>仅仅对一般组件的包装。一般组件被包装之后对于使用者来说并不清晰其是否是被包装过，此时使用Ref得到的是高阶组件的实例。因此Forwarding\n    Refs特性对于高阶组件来说更有价值。</p>\n<p>下面是一个高阶组件记录日志的例子：</p>\n<pre><code class="javascript"><span class="hljs-function"><span class="code-keyword">function</span> <span\n        class="code-title">logProps</span>(<span class="hljs-params">WrappedComponent</span>) </span>{\n  <span class="hljs-class"><span class="code-keyword">class</span> <span class="code-title">LogProps</span> <span\n          class="code-keyword">extends</span> <span class="code-title">React</span>.<span\n          class="code-title">Component</span> </span>{\n    componentDidUpdate(prevProps) {\n      <span class="code-built_in">console</span>.log(<span class="code-string">\'old props:\'</span>, prevProps);\n      <span class="code-built_in">console</span>.log(<span class="code-string">\'new props:\'</span>, <span\n            class="code-keyword">this</span>.props);\n    }\n\n    render() {\n      <span class="code-keyword">return</span> <span class="xml"><span class="code-tag">&lt;<span class="code-name">WrappedComponent</span> {<span\n            class="hljs-attr">...this.props</span>} /&gt;</span>;\n    }\n  }\n\n  return LogProps;\n}</span></code></pre>\n<p>logProps组件用于在每次数据更新前后记录props中的数据。我们用其包装前面的MyButton组件。</p>\n<pre><code class="javascript"><span class="hljs-class"><span class="code-keyword">class</span> <span class="code-title">MyButton</span> <span\n        class="code-keyword">extends</span> <span class="code-title">React</span>.<span\n        class="code-title">Component</span> </span>{\n  focus() {\n    <span class="code-comment">// ...</span>\n  }\n\n  render() {\n    <span class="code-comment">//</span>\n  }\n}\n\n<span class="code-keyword">export</span> <span class="code-keyword">default</span> logProps(MyButton);</code></pre>\n<p>此时通过import并使用Refs实际上得到的是LogProps的实例：</p>\n<pre><code class="javascript"><span class="code-keyword">import</span> FancyButton <span\n        class="code-keyword">from</span> <span class="code-string">\'./FancyButton\'</span>;\n\n<span class="code-keyword">const</span> ref = React.createRef();\n<span class="xml"><span class="code-tag">&lt;<span class="code-name">MyButton</span>\n  <span class="hljs-attr">label</span>=<span class="code-string">"Click Me"</span>\n  <span class="hljs-attr">handleClick</span>=<span class="code-string">{handleClick}</span>\n  <span class="hljs-attr">ref</span>=<span class="code-string">{ref}</span>\n/&gt;</span>;</span></code></pre>\n<p>我们使用Forwarding Refs对高阶组件进行简单的改造即可解决这个问题：</p>\n<pre><code class="javascript"><span class="hljs-function"><span class="code-keyword">function</span> <span\n        class="code-title">logProps</span>(<span class="hljs-params">Component</span>) </span>{\n  <span class="hljs-class"><span class="code-keyword">class</span> <span class="code-title">LogProps</span> <span\n          class="code-keyword">extends</span> <span class="code-title">React</span>.<span\n          class="code-title">Component</span> </span>{\n    componentDidUpdate(prevProps) {\n      <span class="code-built_in">console</span>.log(<span class="code-string">\'old props:\'</span>, prevProps);\n      <span class="code-built_in">console</span>.log(<span class="code-string">\'new props:\'</span>, <span\n            class="code-keyword">this</span>.props);\n    }\n\n    render() {\n      <span class="code-keyword">const</span> {forwardedRef, ...rest} = <span class="code-keyword">this</span>.props;\n\n      <span class="code-comment">// 通过forwardedRef参数传递ref的值</span>\n      <span class="code-keyword">return</span> &lt;Component ref={forwardedRef} {...rest} /&gt;;\n    }\n  }\n  \n  //然后使用 React.forwardRef 来包装创建 LogProps组件的实例\n  //注意这里使用 forwardedRef 来传递 父组件的 ref\n  //\n  return React.forwardRef((props, ref) =&gt; {\n    return &lt;LogProps {...props} forwardedRef={ref} /&gt;;\n  });\n}</code></pre>\n\n<h2 id="h2-3">开发调试组件名称显示</h2>\n<p>如果我们不进行任何调整，下面的代码在调试工具中输出的组件名称为："ForwardRef(MyComonent)"：</p>\n<pre><code class="javascript"><span class="code-keyword">const</span> WrappedComponent = React.forwardRef(\n  <span class="hljs-function"><span class="code-keyword">function</span> <span\n          class="code-title">myFunction</span>(<span class="hljs-params">props, ref</span>) </span>{\n    <span class="code-keyword">return</span> <span class="xml"><span class="code-tag">&lt;<span class="code-name">LogProps</span> {<span\n            class="hljs-attr">...props</span>} <span class="hljs-attr">forwardedRef</span>=<span class="code-string">{ref}</span> /&gt;</span>;\n  }\n);</span></code></pre>\n<p>可以通过displayName来设定想要现实的名字：</p>\n<pre><code class="javascript"><span class="hljs-function"><span class="code-keyword">function</span> <span\n        class="code-title">logProps</span>(<span class="hljs-params">Component</span>) </span>{\n  <span class="hljs-class"><span class="code-keyword">class</span> <span class="code-title">LogProps</span> <span\n          class="code-keyword">extends</span> <span class="code-title">React</span>.<span\n          class="code-title">Component</span> </span>{\n    <span class="code-comment">// ...</span>\n  }\n\n  <span class="code-comment">//先定义返回的高阶组件方法</span>\n  <span class="hljs-function"><span class="code-keyword">function</span> <span\n          class="code-title">forwardRef</span>(<span class="hljs-params">props, ref</span>) </span>{\n    <span class="code-keyword">return</span> <span class="xml"><span class="code-tag">&lt;<span class="code-name">LogProps</span> {<span\n            class="hljs-attr">...props</span>} <span class="hljs-attr">forwardedRef</span>=<span class="code-string">{ref}</span> /&gt;</span>;\n  }\n\n  //然后设定这个组件的名称\n  const name = Component.displayName || Component.name;\n  forwardRef.displayName = `logProps(${name})`;\n\n  //构建组件\n  return React.forwardRef(forwardRef);\n}</span></code></pre>'}};