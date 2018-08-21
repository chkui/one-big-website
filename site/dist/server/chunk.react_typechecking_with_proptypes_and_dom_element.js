exports.ids=[39],exports.modules={327:function(s,n,a){"use strict";Object.defineProperty(n,"__esModule",{value:!0});n.content='<h3 id="h3-1">使用PropTypes进行类型检查</h3>\n<p>当应用不断增长时，可以用过类型检查发现很多bug。对于某些应用，可以使用JavaScript扩展工具来完成，比如使用&nbsp;\n    <a title="flow类型检查工具" href="https://chkui.com/article/react/react_static_type_check_with_flow">Flow </a>或\n    <a title="Typescript官网" href="https://www.typescriptlang.org/" rel="nofollow">TypeScript </a>来检查整个工程。除了引入外部工具之外，React也提供了参数类型检查的功能，只需要为每一个属性指定一个&nbsp;<code>propTypes</code>&nbsp;即可：\n</p>\n<pre class="scala"><code class="language-javascript"><span class="code-comment"><span class="code-comment">// 15.5之后，需要单独引入依赖才能使用类型检查</span></span>\n<span class="code-keyword"><span class="code-keyword">import</span></span> <span\n            class="code-type">PropTypes</span> <span class="code-keyword">from</span> <span class="code-string"><span\n            class="hljs-symbol">\'prop</span>-types\'</span>;\n<span class="code-comment"><span class="code-comment">//定义组件</span></span>\n<span class="hljs-class"><span class="code-keyword"><span class="hljs-class"><span\n        class="code-keyword">class</span></span></span><span class="hljs-class"> </span><span class="code-title"><span\n        class="hljs-class"><span class="code-title">Greeting</span></span></span><span class="hljs-class"> </span><span\n        class="code-keyword"><span class="hljs-class"><span class="code-keyword">extends</span></span></span><span\n        class="hljs-class"> </span><span class="code-title"><span class="hljs-class"><span\n        class="code-title">React</span></span></span><span class="hljs-class">.</span><span class="code-title"><span\n        class="hljs-class"><span class="code-title">Component</span></span></span><span\n        class="hljs-class"> </span></span>{\n  render() {\n    <span class="code-keyword"><span class="code-keyword">return</span></span> (\n      <span class="xml"><span class="code-tag">&lt;<span class="code-name">h1</span>&gt;</span><span class="code-type">Hello</span>, {<span\n              class="code-keyword">this</span>.props.name}<span class="code-tag">&lt;/<span class="code-name">h1</span>&gt;</span></span>\n    );\n  }\n}\n\n<span class="code-comment"><span class="code-comment">//指定类型检查</span></span>\n<span class="code-type">Greeting</span>.propTypes = {\n  name: <span class="code-type">React</span>.<span class="code-type">PropTypes</span>.string\n};</code></pre>\n<p> PropTypes将会设定一系列验证器，这些验证器用于确保组件接受到的参数（props）是指定的类型。比如上面的例子，当一个错误的类型被组件接收到，会有一段警告内容使通过console输出。<span\n        style="color:#FF0000">propsTypes仅仅在开发模式下使用</span>。</p>\n\n<h3 id="h3-2">PropTypes</h3>\n<p>以下是各种验证器的示例：</p>\n<pre class="javascript"><code class="language-javascript">MyComponent.propTypes = {\n  <span class="code-comment"><span class="code-comment">// 指明每个传入参数的具体类型，传递的参数仅限于这些JavaScript的内置类型</span></span>\n  optionalArray: PropTypes.array,\n  optionalBool: PropTypes.bool,\n  optionalFunc: PropTypes.func,\n  optionalNumber: PropTypes.number,\n  optionalObject: PropTypes.object,\n  optionalString: PropTypes.string,\n  optionalSymbol: PropTypes.symbol,\n\n  <span class="code-comment"><span class="code-comment">// number、string、element或者一个列表都是允许的</span></span>\n  optionalNode: PropTypes.node,\n\n  <span class="code-comment"><span class="code-comment">// 接收一个React组件</span></span>\n  optionalElement: PropTypes.element,\n\n  <span class="code-comment"><span class="code-comment">// 声明这个参数只接收某个对象(class)的实例，适用于传递一个对象作为配置参数的</span></span>\n  optionalMessage: PropTypes.instanceOf(Message),\n\n  <span class="code-comment"><span class="code-comment">// 指定参数限定在多个对象之内</span></span>\n  optionalEnum: PropTypes.oneOf([<span class="code-string"><span class="code-string">\'News\'</span></span>, <span\n            class="code-string"><span class="code-string">\'Photos\'</span></span>]),\n\n  <span class="code-comment"><span class="code-comment">// 指定参数允许多个类型</span></span>\n  optionalUnion: PropTypes.oneOfType([\n    PropTypes.string,\n    PropTypes.number,\n    PropTypes.instanceOf(Message)\n  ]),\n\n  <span class="code-comment"><span class="code-comment">// 指定类型的列表</span></span>\n  optionalArrayOf: PropTypes.arrayOf(PropTypes.number),\n\n  <span class="code-comment"><span class="code-comment">// 指定传递某个类型，是一个对象不是数据本身</span></span>\n  optionalObjectOf: PropTypes.objectOf(PropTypes.number),\n\n  <span class="code-comment"><span class="code-comment">// 指定传递参数的结构，适用于传递一个对象时限定对象的结构</span></span>\n  optionalObjectWithShape: PropTypes.shape({\n    color: PropTypes.string,\n    fontSize: PropTypes.number\n  }),\n\n  <span class="code-comment"><span class="code-comment">// 表明这个参数是必须要传递的参数，在使用这个组件时，这个参数必须传入数据</span></span>\n  requiredFunc: PropTypes.func.isRequired,\n\n  <span class="code-comment"><span class="code-comment">// 允许任何类型的数据。</span></span>\n  requiredAny: PropTypes.any.isRequired,\n\n  <span class="code-comment"><span class="code-comment">// 指定一个自定义的检查器，当检查失败时需要返回一个Error对象来指明错误。</span></span>\n  <span class="code-comment"><span class="code-comment">// 错误只需要返回，切记不能使用throw或console.warn输出</span></span>\n  <span class="code-comment"><span class="code-comment">// 不适用于 oneOfType 类型。</span></span>\n  customProp: <span class="hljs-function"><span class="code-keyword"><span class="hljs-function"><span\n            class="code-keyword">function</span></span></span><span class="hljs-function">(</span><span\n            class="hljs-params"><span class="hljs-function"><span\n            class="hljs-params">props, propName, componentName</span></span></span><span class="hljs-function">) </span></span>{\n    <span class="code-keyword"><span class="code-keyword">if</span></span> (!<span class="hljs-regexp"><span\n            class="hljs-regexp">/matchme/</span></span>.test(props[propName])) {\n      <span class="code-keyword"><span class="code-keyword">return</span></span> <span class="code-keyword"><span\n            class="code-keyword">new</span></span> <span class="code-built_in"><span class="code-built_in">Error</span></span>(\n        <span class="code-string"><span class="code-string">\'Invalid prop `\'</span></span> + propName + <span\n            class="code-string"><span class="code-string">\'` supplied to\'</span></span> +\n        <span class="code-string"><span class="code-string">\' `\'</span></span> + componentName + <span\n            class="code-string"><span class="code-string">\'`. Validation failed.\'</span></span>\n      );\n    }\n  },\n\n  <span class="code-comment"><span class="code-comment">// 用于检测一个数组传递的自定义检查器，适用于arrayOf和objectOf类型。</span></span>\n  <span class="code-comment"><span class="code-comment">// 当出现检查错误时需要返回Error</span></span>\n  customArrayProp: PropTypes.arrayOf(<span class="hljs-function"><span class="code-keyword"><span\n            class="hljs-function"><span class="code-keyword">function</span></span></span><span\n            class="hljs-function">(</span><span class="hljs-params"><span class="hljs-function"><span\n            class="hljs-params">propValue, key, componentName, location, propFullName</span></span></span><span\n            class="hljs-function">) </span></span>{\n    <span class="code-keyword"><span class="code-keyword">if</span></span> (!<span class="hljs-regexp"><span\n            class="hljs-regexp">/matchme/</span></span>.test(propValue[key])) {\n      <span class="code-keyword"><span class="code-keyword">return</span></span> <span class="code-keyword"><span\n            class="code-keyword">new</span></span> <span class="code-built_in"><span class="code-built_in">Error</span></span>(\n        <span class="code-string"><span class="code-string">\'Invalid prop `\'</span></span> + propFullName + <span\n            class="code-string"><span class="code-string">\'` supplied to\'</span></span> +\n        <span class="code-string"><span class="code-string">\' `\'</span></span> + componentName + <span\n            class="code-string"><span class="code-string">\'`. Validation failed.\'</span></span>\n      );\n    }\n  })\n};</code></pre>\n\n<h4 id="h4-1">限定至少接收一个子元素</h4>\n<p>可以使用&nbsp;<code>PropTypes.element</code>&nbsp;来指明组件必须接收一个子元素：</p>\n<pre class="scala"><code class="language-javascript"><span class="hljs-class"><span class="code-keyword"><span\n        class="hljs-class"><span class="code-keyword">class</span></span></span><span class="hljs-class"> </span><span\n        class="code-title"><span class="hljs-class"><span class="code-title">MyComponent</span></span></span><span\n        class="hljs-class"> </span><span class="code-keyword"><span class="hljs-class"><span class="code-keyword">extends</span></span></span><span\n        class="hljs-class"> </span><span class="code-title"><span class="hljs-class"><span\n        class="code-title">React</span></span></span><span class="hljs-class">.</span><span class="code-title"><span\n        class="hljs-class"><span class="code-title">Component</span></span></span><span\n        class="hljs-class"> </span></span>{\n  render() {\n    <span class="code-comment"><span\n            class="code-comment">// This must be exactly one element or it will warn.</span></span>\n    <span class="code-keyword">const</span> children = <span class="code-keyword"><span class="code-keyword">this</span></span>.props.children;\n    <span class="code-keyword"><span class="code-keyword">return</span></span> (\n      <span class="xml"><span class="code-tag">&lt;<span class="code-name">div</span>&gt;</span>\n        {children}\n      <span class="code-tag">&lt;/<span class="code-name">div</span>&gt;</span></span>\n    );\n  }\n}\n\n<span class="code-type">MyComponent</span>.propTypes = {\n  children: <span class="code-type">React</span>.<span class="code-type">PropTypes</span>.element.isRequired\n};</code></pre>\n\n<h4 id="h4-2">设定props默认值</h4>\n<p>还可以使用&nbsp;<code>defaultProps</code>来指定默认值：</p>\n<pre class="scala"><code class="language-javascript"><span class="hljs-class"><span class="code-keyword"><span\n        class="hljs-class"><span class="code-keyword">class</span></span></span><span class="hljs-class"> </span><span\n        class="code-title"><span class="hljs-class"><span class="code-title">Greeting</span></span></span><span\n        class="hljs-class"> </span><span class="code-keyword"><span class="hljs-class"><span class="code-keyword">extends</span></span></span><span\n        class="hljs-class"> </span><span class="code-title"><span class="hljs-class"><span\n        class="code-title">React</span></span></span><span class="hljs-class">.</span><span class="code-title"><span\n        class="hljs-class"><span class="code-title">Component</span></span></span><span\n        class="hljs-class"> </span></span>{\n  render() {\n    <span class="code-keyword"><span class="code-keyword">return</span></span> (\n      <span class="xml"><span class="code-tag">&lt;<span class="code-name">h1</span>&gt;</span><span class="code-type">Hello</span>, {<span\n              class="code-keyword">this</span>.props.name}<span class="code-tag">&lt;/<span class="code-name">h1</span>&gt;</span></span>\n    );\n  }\n}\n\n<span class="code-comment"><span class="code-comment">// 指定props.name的默认值:</span></span>\n<span class="code-type">Greeting</span>.defaultProps = {\n  name: <span class="code-string"><span class="hljs-symbol">\'Strange</span>r\'</span>\n};\n\n<span class="code-type">ReactDOM</span>.render(\n  <span class="xml"><span class="code-tag">&lt;<span class="code-name"><span class="code-type">Greeting</span></span> /&gt;</span>,\n  document.getElementById(<span class="hljs-symbol">\'exampl</span>e\')\n);</span></code></pre>\n\n<h3 id="h3-3">Refs和真实Dom</h3>\n<p>\n    在典型的React数据流中，props参数传递的唯一接口。当需要修改参数时，必须修改props值并重新渲染（render）。然而，有很多场景需要在单向数据流之外修改子组件，React提供“Refs”特性来直接修改真实Dom元素。</p>\n\n<h4 id="h4-3">什么时候需要使用Refs</h4>\n<p>当遇到以下情况时，建议使用Refs特性：</p>\n<ul>\n    <li>需要管理聚（focus）、文档选择或媒体回放等真实Dom事件时。</li>\n    <li>触发需要马上执行的动画。</li>\n    <li>引入第三方库时。</li>\n</ul>\n<p>避免将Refs用于任何声明性的工作，如使用一个props.isOpen参数来代替Dialog的open()和close()接口。</p>\n\n<h4 id="h4-4">将Ref添加到Dom元素中</h4>\n<p>React支持在任何组件上使用ref。ref属性提供一个回调方法，当组件被渲染或被移除后，这个回调方法会被调用。</p>\n<p>当ref属性用于一个HTML元素时，ref的回调方法会获取Dom的实例。例如，下面的例子获取到input标签的Dom实例并保存到this.textInput变量中，这个变量一直指向Dom节点。</p>\n<pre class="scala"><code class="language-javascript"><span class="hljs-class"><span class="code-keyword"><span\n        class="hljs-class"><span class="code-keyword">class</span></span></span><span class="hljs-class"> </span><span\n        class="code-title"><span class="hljs-class"><span class="code-title">CustomTextInput</span></span></span><span\n        class="hljs-class"> </span><span class="code-keyword"><span class="hljs-class"><span class="code-keyword">extends</span></span></span><span\n        class="hljs-class"> </span><span class="code-title"><span class="hljs-class"><span\n        class="code-title">React</span></span></span><span class="hljs-class">.</span><span class="code-title"><span\n        class="hljs-class"><span class="code-title">Component</span></span></span><span\n        class="hljs-class"> </span></span>{\n  <span class="code-keyword">constructor</span>(props) {\n    <span class="code-keyword"><span class="code-keyword">super</span></span>(props);\n    <span class="code-keyword"><span class="code-keyword">this</span></span>.focus = <span class="code-keyword"><span\n            class="code-keyword">this</span></span>.focus.bind(<span class="code-keyword"><span class="code-keyword">this</span></span>);\n  }\n\n  <span class="code-comment"><span class="code-comment">// 定义一个focus方法</span></span>\n  focus() {\n    <span class="code-keyword"><span class="code-keyword">this</span></span>.textInput.focus();\n  }\n\n  render() {\n    <span class="code-keyword"><span class="code-keyword">return</span></span> (\n      &lt;div&gt;\n        &lt;input\n          <span class="hljs-class"><span class="code-keyword">type</span></span>=<span class="code-string">"text"</span>\n          ref={(input) =&gt; { <span class="code-keyword">this</span>.textInput = input; }} /&gt;\n        &lt;input\n          <span class="hljs-class"><span class="code-keyword">type</span></span>=<span\n            class="code-string">"button"</span>\n          value=<span class="code-string">"Focus the text input"</span>\n          onClick={<span class="code-keyword">this</span>.focus}\n        /&gt;\n      &lt;/div&gt;\n    );\n  }\n}</code></pre>\n<p>当Dom元素被渲染后，React会回调ref指定的方法，并传递当前Dom的实例作为参数，当Dom被移除时，ref指向的方法也会被调用，传入的参数为null。</p>\n<p>使用ref回调方法来设置class的属性是获取真实Dom对象的常用方法，上面的例子给出了一个编写方式，只要语法正确你可以用各种方式来编写，如更简短的：&nbsp;<code>ref={input =&gt;\n    this.textInput = input}</code>。</p>\n\n<h4 id="h4-5">给class组件增加一个Ref属性</h4>\n<p>当ref用于一个由class关键字声明的自定义组件时，ref指向的回调方法会在组件完成渲染后被回调，传递的参数是组件的实例。例如下面的例子，在&nbsp;<code>CustomTextInput</code>&nbsp;组件完成渲染后立即模拟一次focus事件：\n</p>\n<pre class="scala"><code class="language-javascript"><span class="hljs-class"><span class="code-keyword"><span\n        class="hljs-class"><span class="code-keyword">class</span></span></span><span class="hljs-class"> </span><span\n        class="code-title"><span class="hljs-class"><span\n        class="code-title">AutoFocusTextInput</span></span></span><span class="hljs-class"> </span><span\n        class="code-keyword"><span class="hljs-class"><span class="code-keyword">extends</span></span></span><span\n        class="hljs-class"> </span><span class="code-title"><span class="hljs-class"><span\n        class="code-title">React</span></span></span><span class="hljs-class">.</span><span class="code-title"><span\n        class="hljs-class"><span class="code-title">Component</span></span></span><span\n        class="hljs-class"> </span></span>{\n  componentDidMount() {<span class="code-comment"><span class="code-comment">//完成渲染后被回调</span></span>\n    <span class="code-keyword"><span class="code-keyword">this</span></span>.textInput.focus();<span\n            class="code-comment"><span class="code-comment">//聚焦到当前组件</span></span>\n  }\n\n  render() {\n    <span class="code-comment"><span class="code-comment">// CustomTextInput 已经在上一段代码中声明</span></span>\n    <span class="code-keyword"><span class="code-keyword">return</span></span> (\n      <span class="xml"><span class="code-tag">&lt;<span class="code-name"><span\n              class="code-type">CustomTextInput</span></span>\n        <span class="hljs-attr">ref</span>=<span class="code-string">{(input)</span> =&gt;</span> { <span\n              class="code-keyword">this</span>.textInput = input; }} /&gt;\n    );\n  }\n}</span></code></pre>\n<p>必须用class来定义&nbsp;<code>CustomTextInput</code>&nbsp;组件才会生效。</p>\n\n<h4 id="h4-6">给Function声明的组件设定Refs</h4>\n<p>不能再function定义的组件直接使用ref，因为在声明时他并没有实例化：</p>\n<pre class="scala"><code class="language-javascript"><span class="hljs-function"><span\n        class="code-keyword">function</span> <span class="code-title"><span\n        class="code-type">MyFunctionalComponent</span></span>(<span class="hljs-params"></span>) </span>{\n  <span class="code-keyword"><span class="code-keyword">return</span></span> &lt;input /&gt;;\n}\n\n<span class="hljs-class"><span class="code-keyword">class</span> <span class="code-title">Parent</span> <span\n        class="code-keyword">extends</span> <span class="code-title">React</span>.<span\n        class="code-title">Component</span> </span>{\n  render() {\n    <span class="code-comment">// 错误，这里的ref不会有任何效果。</span>\n    <span class="code-keyword">return</span> (\n      &lt;<span class="code-type">MyFunctionalComponent</span>\n        ref={(input) =&gt; { <span class="code-keyword">this</span>.textInput = input; }} /&gt;\n    );\n  }\n}</code></pre>\n<p>最合理的方式是将function定义的组件转换为class，这和我们需要使用state来控制状态是一个道理。不过在function组件中，如果内部引用的是另一个class组件也是可以使用Refs特性的：</p>\n<pre class="php"><code class="language-javascript"><span class="hljs-function"><span class="code-keyword"><span\n        class="hljs-function"><span class="code-keyword">function</span></span></span><span\n        class="hljs-function"> </span><span class="code-title"><span class="hljs-function"><span class="code-title">CustomTextInput</span></span></span><span\n        class="hljs-function"><span class="hljs-params">(</span></span><span class="hljs-params"><span\n        class="hljs-function"><span class="hljs-params">props</span></span></span><span class="hljs-function"><span\n        class="hljs-params">)</span> </span></span>{\n  <span class="code-comment"><span class="code-comment">// 在这里声明textInput，每次重新渲染时，都会新生成一个本地变量</span></span>\n  <span class="code-keyword">let</span> textInput = <span class="hljs-literal"><span\n            class="code-keyword">null</span></span>;\n\n  <span class="code-comment"><span class="code-comment">// 每次重新渲染时，都会新生成一个回调方法</span></span>\n  <span class="hljs-function"><span class="code-keyword"><span class="hljs-function"><span\n          class="code-keyword">function</span></span></span><span class="hljs-function"> </span><span\n          class="code-title"><span class="hljs-function"><span class="code-title">handleClick</span></span></span><span\n          class="hljs-function"><span class="hljs-params">(</span></span><span class="hljs-params"></span><span\n          class="hljs-function"><span class="hljs-params">)</span> </span></span>{\n    textInput.focus();\n  }\n\n  <span class="code-keyword"><span class="code-keyword">return</span></span> (\n    &lt;div&gt;\n      &lt;input\n        type=<span class="code-string">"text"</span>\n        ref={(input) =&gt; { textInput = input; }} /&gt;\n      &lt;input\n        type=<span class="code-string">"button"</span>\n        value=<span class="code-string">"Focus the text input"</span>\n        onClick={handleClick}\n      /&gt;\n    &lt;/div&gt;\n  );  \n}</code></pre>\n\n<h4 id="h4-7">切勿过度使用Refs特性</h4>\n<p>\n    可能在了解Refs的机制后，某些开发人员更倾向于在代码中使用Refs这种“操作即发生”特性来实现功能。但是在使用之前最好多花点时间来思考为什么状态需要由不同的组件层次来控制，通常情况下组件之间的状态最好由他们共同的祖先来控制：\n    <a title="React 状态、事件与动态渲染" href="/article/react/react_state_event_and_render" rel="nofollow">React 状态、事件与动态渲染</a>\n</p>\n<h4 id="h4-8">*使用警告</h4>\n<p>\n    如果ref的回调方法被定义为一个内联方法，它在更新之前会发生2次调用，第一调用时会传递一个null值，第二次会赋予真正的Dom对象。这是因为在每次渲染时都会有一个新的方法实例被创建所以React必须清除已有的ref并创建一个的ref。可以通过将ref回调方法定义为类的绑定方法来避免这种情况，但请注意，在大多数情况下，这并不会导致什么问题。</p>'}};