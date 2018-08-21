exports.ids=[36],exports.modules={330:function(s,a,n){"use strict";Object.defineProperty(a,"__esModule",{value:!0});a.content='<h3 id="h3-1">性能优化</h3>\n<p>在React内部已经使用了许多巧妙的技术来最小化由于Dom变更导致UI渲染所耗费的时间。对于很多应用来说，使用React后无需太多工作就会让客户端执行性能有质的提升。然而，还是很其他更多的办法来加速React程序。</p>\n<h4 id="h4-1">使用生产模式来构建应用</h4>\n<p>如果在开发和使用的过程中感觉了React应用有明显的性能问题，请先确认是否已经构建了压缩后的生产包：</p>\n<ul>\n    <li>在单页面用中，打包之后的生产文件应该是.min.js版本。</li>\n    <li>对于Brunch（html打包工具：http://brunch.io/），打包命令需要包含-p标记。</li>\n    <li>对于Browserify（UMD规范打包工具：http://browserify.org/），打包时需要增加生产配置参数——&nbsp;<code>NODE_ENV=production</code>。</li>\n    <li>对于在创建React App时，需要执行&nbsp;<code>npm run build</code>&nbsp;命令，并按照说明操作。</li>\n    <li>对于Rollup（JavaScript代码高效压缩工具：https://rollupjs.org/），生产打包时需要在&nbsp;<a title="commonjs插件"\n            href="https://github.com/rollup/rollup-plugin-commonjs" rel="nofollow">commonjs</a>&nbsp;插件之前使用&nbsp;<a title="replace插件"\n            href="https://github.com/rollup/rollup-plugin-replace" rel="nofollow">replace</a>&nbsp;插件：\n        <pre class="javascript"><code class="language-javascript">plugins: [\n  <span class="code-built_in"><span class="code-built_in">require</span></span>(<span class="code-string"><span\n                    class="code-string">\'rollup-plugin-replace\'</span></span>)({\n    <span class="code-string"><span class="code-string">\'process.env.NODE_ENV\'</span></span>: <span\n                    class="code-built_in"><span class="code-built_in">JSON</span></span>.stringify(<span\n                    class="code-string"><span class="code-string">\'production\'</span></span>)\n  }),\n  <span class="code-built_in"><span class="code-built_in">require</span></span>(<span class="code-string"><span\n                    class="code-string">\'rollup-plugin-commonjs\'</span></span>)(),\n  <span class="code-comment"><span class="code-comment">// ...</span></span>\n]</code></pre>\n        <p>可以在这里看到 一个完整的例子：<a title="Rollup生产优化的案例" href="https://gist.github.com/Rich-Harris/cb14f4bc0670c47d00d191565be36bf0"\n                              rel="nofollow">see this gist</a>。</p></li>\n    <li><p>使用Webpack打包，需要在打生产包的配置脚本中增加以下配置和插件：</p>\n        <pre class="javascript"><code class="language-javascript"><span class="code-keyword"><span class="code-keyword">new</span></span> webpack.DefinePlugin({\n  <span class="code-string"><span class="code-string">\'process.env\'</span></span>: {\n    NODE_ENV: <span class="code-built_in"><span class="code-built_in">JSON</span></span>.stringify(<span\n                    class="code-string"><span class="code-string">\'production\'</span></span>)\n  }\n}),\n<span class="code-keyword"><span class="code-keyword">new</span></span> webpack.optimize.UglifyJsPlugin()</code></pre>\n        <p>。</p></li>\n</ul>\n<p>切记不要将开发模式的包发布到生产环境，因为开发包中额外包含了许多用于辅助的测试的信息，无论在加载还是执行时，它都比较慢。</p>\n\n<h4 id="h4-2">使用chrome分析组件的渲染时间线</h4>\n<p>在开发模式中下你可以直接在chrome的性能工具中看到组件是如何装载、更新和卸载的。例如下面的图片展示的效果：</p>\n<p style="text-align:center"><img alt="React 渲染性能优化" height="228"\n                                  src="https://file.mahoooo.com/res/file/react_optimizing_performance_1.png"\n                                  width="651"></p>\n<p>在chrome中按照以下步骤执行：</p>\n<ol>\n    <li>使用?react_perf作为url参数（例如：http://localhost:3000/?react_perf）</li>\n    <li>打开chrome的开发工具Timeline，然后点击Record（左上角的红色按钮）。</li>\n    <li>执行你要监控的操作。请不要记录超过20秒，这可能会导致chrome假死。</li>\n    <li>停止记录。</li>\n    <li>React事件将会批量记录在User Timing标签里。</li>\n</ol>\n<p>关于分析的数据，需要明确的是：渲染的时间只是一个相对的参考值，在构建成生产包之后，渲染的速度会更快。尽管如此，这些数据仍然能够帮助我们分析是否有不相关的UI被错误的更新，以及UI更新的频率和深度。</p>\n<p>目前只有Chrome、Edge和IE支持这个特性，但是官方正在使用<a title="浏览器性能优化分析工具标准" href="https://developer.mozilla.org/en-US/docs/Web/API/User_Timing_API"\n                                       rel="nofollow">User Timing API&nbsp;标准</a>&nbsp;让更多浏览器支持这个特性。</p>\n\n<h4 id="h4-3">手工避免重复渲染</h4>\n<p>\n    React构建和维护了一个内部的虚拟Dom，这个Dom和真实的UI是相互映射的关系，他包含从用户自定义组件中返回的各种React元素。这个虚拟的Dom使得React可以避免重复渲染相同的Dom节点并在访问存在的节点时直接使用React的虚拟层数据，这样设计的原因是重复渲染浏览器或web\n    view的UI比操作一个JavaScript的对象要慢许多。在React Native也采用同样的处理方式。</p>\n<p>当组件的props和state变更时，React会将最新返回的元素与之前旧的元素进行对比来确定是否真的需要重新渲染真实的Dom。当他们不相等时，React会更新真实的Dom。</p>\n<p>在某些情况下，可以在自定义组件中重载<code>shouldComponentUpdate</code>方法来加速触发渲染的比对的过程。该方法的默认实现返回参数为true，此时React将按照原来的方式进行比对和渲染：</p>\n<pre class="kotlin"><code class="language-javascript">shouldComponentUpdate(nextProps, nextState) {\n  <span class="code-keyword"><span class="code-keyword">return</span></span> <span class="hljs-literal"><span\n            class="hljs-literal">true</span></span>;\n}</code></pre>\n<p>如果在某些情况下能够清晰的明确组件不需要重新渲染，可以在&nbsp;<code>shouldComponentUpdate</code>&nbsp;方法中返回&nbsp;false，这样会让让组件跳过整个渲染过程，包括不再调用当前组件和子组件的render()方法。\n</p>\n\n<h4 id="h4-4">shouldComponentUpdate 的执行过程</h4>\n<p>下面是一个组件结构树。图中，“SCU”表示&nbsp;<code>shouldComponentUpdate</code>&nbsp;方法返回的值（绿色true，红色fasle），“vDOMEq”表示React的匹配是否一致（绿色true，红色fasle），有颜色的红圈表示是否执行了UI重绘（绿色表示没重绘，红色表示执行重绘）。\n</p>\n<p style="text-align:center"><img alt="React 渲染性能优化" height="371"\n                                  src="https://static.oschina.net/uploads/space/2017/0406/182936_ZTAG_2649413.png"\n                                  width="555"></p>\n<p style="text-align:left">在C2组件中，<code>shouldComponentUpdate</code>&nbsp;方法返回了false，所以React不会判断是否需要重新渲染C2并且不执行render()方法，&nbsp;因此在C4和C5中不再执行<code>shouldComponentUpdate</code>&nbsp;方法。\n</p>\n<p style="text-align:left">对于C1和C3，<code>shouldComponentUpdate</code>&nbsp;都返回了true，所以React必须对着2个组件进行比对。对于C6，<code>shouldComponentUpdate</code>&nbsp;返回true，而且比对的结果是需要UI重绘，因此C6会更新他们的真实Dom。\n</p>\n<p style="text-align:left">还有一个值得关心的组件是C8，React在这个组件中执行了render()方法，但是由于虚拟Dom并没有发生变更，前后比对一致，所以并没有发生真实Dom渲染。</p>\n<p style="text-align:left">在整个过程中React仅仅变更了C6组件的UI样式，C8由于前后虚拟Dom一致因此没有真正的执行UI渲染。C2、C2的子组件以及C7没有执行render()方法。</p>\n\n<h4 id="h4-5">一个shouldComponentUpdate的例子</h4>\n<p>在例子中，当props.color和state.count发生变更时进行UI渲染，我们在&nbsp;<code>shouldComponentUpdate</code>&nbsp;方法中进行检查：</p>\n<pre class="kotlin"><code class="language-javascript"><span class="hljs-class"><span class="code-keyword"><span\n        class="hljs-class"><span class="code-keyword">class</span></span></span><span class="hljs-class"> </span><span\n        class="code-title"><span class="hljs-class"><span class="code-title">CounterButton</span></span></span><span\n        class="hljs-class"> </span><span class="code-keyword"><span class="hljs-class"><span\n        class="code-title">extends</span></span></span><span class="hljs-class"> </span><span class="code-title"><span\n        class="hljs-class"><span class="code-title">React</span></span></span><span class="hljs-class">.</span><span\n        class="code-title"><span class="hljs-class"><span class="code-title">Component</span></span></span><span\n        class="hljs-class"> </span></span>{\n  <span class="code-keyword"><span class="code-keyword">constructor</span></span>(props) {\n    <span class="code-keyword"><span class="code-keyword">super</span></span>(props);\n    <span class="code-keyword"><span class="code-keyword">this</span></span>.state = {count: <span\n            class="hljs-number"><span class="hljs-number">1</span></span>};\n  }\n\n  shouldComponentUpdate(nextProps, nextState) {\n    <span class="code-comment"><span class="code-comment">//只判断props.color和nextState.count是否变更，其他情况均不渲染</span></span>\n    <span class="code-keyword"><span class="code-keyword">if</span></span> (<span class="code-keyword"><span\n            class="code-keyword">this</span></span>.props.color !== nextProps.color) {\n      <span class="code-keyword"><span class="code-keyword">return</span></span> <span class="hljs-literal"><span\n            class="hljs-literal">true</span></span>;\n    }\n    <span class="code-keyword"><span class="code-keyword">if</span></span> (<span class="code-keyword"><span\n            class="code-keyword">this</span></span>.state.count !== nextState.count) {\n      <span class="code-keyword"><span class="code-keyword">return</span></span> <span class="hljs-literal"><span\n            class="hljs-literal">true</span></span>;\n    }\n    <span class="code-keyword"><span class="code-keyword">return</span></span> <span class="hljs-literal"><span\n            class="hljs-literal">false</span></span>;\n  }\n\n  render() {\n    <span class="code-keyword"><span class="code-keyword">return</span></span> (\n      <span class="xml"><span class="code-tag">&lt;<span class="code-name">button</span>\n        <span class="hljs-attr">color</span>=<span class="code-string">{<span class="code-keyword">this</span>.props.color}</span>\n        <span class="hljs-attr">onClick</span>=<span class="code-string">{()</span> =&gt;</span> <span\n              class="code-keyword">this</span>.setState(state =&gt; ({count: state.count + <span\n              class="hljs-number">1</span>}))}&gt;\n        Count: {<span class="code-keyword">this</span>.state.count}\n      <span class="code-tag">&lt;/<span class="code-name">button</span>&gt;</span></span>\n    );\n  }\n}</code></pre>\n<p>在这段代码中，<code>shouldComponentUpdate</code>&nbsp;仅仅检查&nbsp;<code>props.color</code>和&nbsp;<code>state.count</code>是否发生变更，如果他们的值没有修改，组件将不会发生任何更新。在实际使用中，组件往往比这个复杂，我们可以使用类似于“浅比较”（关于浅比较可以参看：\n    <a title="shallow compare模式" href="https://facebook.github.io/react/docs/shallow-compare.html" rel="nofollow">Shallow Compare</a>）的模式来比对所有的属性或状态是否发生变更。React提供了这个模式的一个实现组件，只要让组件继承自&nbsp;<code>React.PureComponent</code>即可。我们可以将代码进行下面的修改：\n</p>\n<pre class="scala"><code class="language-javascript"><span class="code-comment"><span class="code-comment">//继承自React.PureComponent</span></span>\n<span class="hljs-class"><span class="code-keyword"><span class="hljs-class"><span\n        class="code-keyword">class</span></span></span><span class="hljs-class"> </span><span class="code-title"><span\n        class="hljs-class"><span class="code-title">CounterButton</span></span></span><span\n        class="hljs-class"> </span><span class="code-keyword"><span class="hljs-class"><span class="code-keyword">extends</span></span></span><span\n        class="hljs-class"> </span><span class="code-title"><span class="hljs-class"><span\n        class="code-title">React</span></span></span><span class="hljs-class">.</span><span class="code-title"><span\n        class="hljs-class"><span class="code-title">PureComponent</span></span></span><span class="hljs-class"> </span></span>{\n  <span class="code-keyword">constructor</span>(props) {\n    <span class="code-keyword"><span class="code-keyword">super</span></span>(props);\n    <span class="code-keyword"><span class="code-keyword">this</span></span>.state = {count: <span\n            class="hljs-number"><span class="hljs-number">1</span></span>};\n  }\n\n  render() {\n    <span class="code-keyword"><span class="code-keyword">return</span></span> (\n      <span class="xml"><span class="code-tag">&lt;<span class="code-name">button</span>\n        <span class="hljs-attr">color</span>=<span class="code-string">{<span class="code-keyword">this</span>.props.color}</span>\n        <span class="hljs-attr">onClick</span>=<span class="code-string">{()</span> =&gt;</span> <span\n              class="code-keyword">this</span>.setState(state =&gt; ({count: state.count + <span\n              class="hljs-number">1</span>}))}&gt;\n        <span class="code-type">Count</span>: {<span class="code-keyword">this</span>.state.count}\n      <span class="code-tag">&lt;/<span class="code-name">button</span>&gt;</span></span>\n    );\n  }\n}</code></pre>\n<p>在大部分情况下，只要使用&nbsp;<code>React.PureComponent</code>&nbsp;就可以代替我们自己重载&nbsp;<code>shouldComponentUpdate</code>方法，但是它仅仅适用于“浅比较”，所以这个组件不适用于props和state数据发生突变的情况。\n</p>\n<p><span style="color:#FF0000">附：数据突变（mutated）是指变量的引用没有改变（指针地址未改变），但是引用指向的数据发生了变化（指针指向的数据发生变更）。例如const x = {foo:\'foo\'}。x.foo=\'none\' 就是一个突变。</span>\n</p>\n<p>在更复杂的数据结构中还会存在一些问题。例如下面的代码，我们希望<code>ListOfWords</code>&nbsp;组件将words参数渲染成一个逗号分隔的字符串，而父组件监控点击事件，每次点击都会增加一个单词到列表中，但是下面的代码并不会正确工作：\n</p>\n<pre class="scala"><code class="language-javascript"><span class="hljs-class"><span class="code-keyword"><span\n        class="hljs-class"><span class="code-keyword">class</span></span></span><span class="hljs-class"> </span><span\n        class="code-title"><span class="hljs-class"><span class="code-title">ListOfWords</span></span></span><span\n        class="hljs-class"> </span><span class="code-keyword"><span class="hljs-class"><span class="code-keyword">extends</span></span></span><span\n        class="hljs-class"> </span><span class="code-title"><span class="hljs-class"><span\n        class="code-title">React</span></span></span><span class="hljs-class">.</span><span class="code-title"><span\n        class="hljs-class"><span class="code-title">PureComponent</span></span></span><span class="hljs-class"> </span></span>{\n  render() {\n    <span class="code-keyword"><span class="code-keyword">return</span></span> <span class="xml"><span class="code-tag">&lt;<span\n            class="code-name">div</span>&gt;</span>{<span class="code-keyword">this</span>.props.words.join(\',\')}<span\n            class="code-tag">&lt;/<span class="code-name">div</span>&gt;</span></span>;\n  }\n}\n\n<span class="hljs-class"><span class="code-keyword"><span class="hljs-class"><span\n        class="code-keyword">class</span></span></span><span class="hljs-class"> </span><span class="code-title"><span\n        class="hljs-class"><span class="code-title">WordAdder</span></span></span><span class="hljs-class"> </span><span\n        class="code-keyword"><span class="hljs-class"><span class="code-keyword">extends</span></span></span><span\n        class="hljs-class"> </span><span class="code-title"><span class="hljs-class"><span\n        class="code-title">React</span></span></span><span class="hljs-class">.</span><span class="code-title"><span\n        class="hljs-class"><span class="code-title">Component</span></span></span><span\n        class="hljs-class"> </span></span>{\n  <span class="code-keyword">constructor</span>(props) {\n    <span class="code-keyword"><span class="code-keyword">super</span></span>(props);\n    <span class="code-keyword"><span class="code-keyword">this</span></span>.state = {\n      words: [<span class="code-string"><span class="hljs-symbol">\'markla</span>r\'</span>]\n    };\n    <span class="code-keyword"><span class="code-keyword">this</span></span>.handleClick = <span\n            class="code-keyword"><span class="code-keyword">this</span></span>.handleClick.bind(<span\n            class="code-keyword"><span class="code-keyword">this</span></span>);\n  }\n\n  handleClick() {\n    <span class="code-comment"><span class="code-comment">// 这段内容会导致代码不按照预期工作。</span></span>\n    <span class="code-keyword">const</span> words = <span class="code-keyword"><span\n            class="code-keyword">this</span></span>.state.words;\n    words.push(<span class="code-string"><span class="hljs-symbol">\'markla</span>r\'</span>);\n    <span class="code-keyword"><span class="code-keyword">this</span></span>.setState({words: words});\n  }\n\n  render() {\n    <span class="code-keyword"><span class="code-keyword">return</span></span> (\n      &lt;div&gt;\n        &lt;button onClick={<span class="code-keyword">this</span>.handleClick} /&gt;\n        &lt;<span class="code-type">ListOfWords</span> words={<span class="code-keyword">this</span>.state.words} /&gt;\n      &lt;/div&gt;\n    );\n  }\n}</code></pre>\n<p>导致代码无法正常工作的原因是&nbsp;<code>PureComponent</code>&nbsp;仅仅对 this.props.words的新旧值进行“浅比较”。在words值在<code>handleClick</code>中被修改之后，即使有新的单词被添加到数组中，但是this.props.words的新旧值在进行比较时是一样的（引用对象比较），因此&nbsp;<code>ListOfWords</code>&nbsp;一直不会发生渲染。\n</p>\n\n<h4 id="h4-6">非突变数据的价值</h4>\n<p>有一个简单的方法预防上面提到的问题，就是在使用prop和state时防止数据发生突变。例如下面的例如，我们用数组的concat方法来代替等号“=”，这样在concat后会产生一个新的数组赋值给this.state.words：</p>\n<pre class="less"><code class="language-javascript"><span class="code-selector-tag">handleClick</span>() {\n  <span class="code-keyword"><span class="code-selector-tag">this</span></span><span class="code-selector-class">.setState</span>(prevState =&gt; ({\n    <span class="code-attribute">words</span>: prevState.words.concat([<span class="code-string"><span\n            class="code-string">\'marklar\'</span></span>])\n  }));\n}</code></pre>\n<p>ES6支持列表扩展语法，因此我们更容易在es6中实现非突变的数据赋值，例如：</p>\n<pre class="less"><code class="language-javascript"><span class="code-selector-tag">handleClick</span>() {\n  <span class="code-keyword"><span class="code-selector-tag">this</span></span><span class="code-selector-class">.setState</span>(prevState =&gt; ({\n    <span class="code-attribute">words</span>: [...prevState.words, <span class="code-string"><span class="code-string">\'marklar\'</span></span>],\n  }));\n};</code></pre>\n<p>可以重写传统的赋值语句防止对象中的数据发生数据突变。下面的例子有一个名为&nbsp;<code>colormap</code>&nbsp;的对象，我们想在修改&nbsp;<code>colormap.right</code>&nbsp;的值时渲染组件，我们可以这样重写组件：\n</p>\n<pre class="actionscript"><code class="language-javascript"><span class="hljs-function"><span class="code-keyword"><span\n        class="hljs-function"><span class="code-keyword">function</span></span></span><span\n        class="hljs-function"> </span><span class="code-title"><span class="hljs-function"><span class="code-title">updateColorMap</span></span></span><span\n        class="hljs-function"><span class="hljs-params">(</span></span><span class="hljs-params"><span\n        class="hljs-function"><span class="hljs-params">colormap</span></span></span><span class="hljs-function"><span\n        class="hljs-params">)</span> </span></span>{\n  colormap.right = <span class="code-string"><span class="code-string">\'blue\'</span></span>; <span class="code-comment"><span\n            class="code-comment">//浅拷贝，指针地址未变，数据发生变化。</span></span>\n}</code></pre>\n<p>可以使用&nbsp;<a title="ES6 Object.assign方法" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign"\n                rel="nofollow">Object.assign</a>&nbsp;方法来防止数据突变：</p>\n<pre class="javascript"><code class="language-javascript"><span class="hljs-function"><span class="code-keyword"><span\n        class="hljs-function"><span class="code-keyword">function</span></span></span><span\n        class="hljs-function"> </span><span class="code-title"><span class="hljs-function"><span class="code-title">updateColorMap</span></span></span><span\n        class="hljs-function">(</span><span class="hljs-params"><span class="hljs-function"><span class="hljs-params">colormap</span></span></span><span\n        class="hljs-function">) </span></span>{\n  <span class="code-comment"><span class="code-comment">// 深拷贝，修改返回对象的地址</span></span>\n  <span class="code-keyword"><span class="code-keyword">return</span></span> <span class="code-built_in"><span\n            class="code-built_in">Object</span></span>.assign({}, colormap, {right: <span class="code-string"><span\n            class="code-string">\'blue\'</span></span>});\n}</code></pre>\n<p>修改后&nbsp;<code>updateColorMap</code>&nbsp;方法返回一个新的实例。需要注意的是某些浏览器不支持&nbsp;<code>Object.assign</code>方法，我们需要使用polyfill（差异化抹平，比如我们引入了babel-polyfill）来解决这个问题。\n</p>\n<p>有一个新的JavaScript方案是使用 扩展传播特性（见 <a title="扩展传播性能" href="https://github.com/sebmarkbage/ecmascript-rest-spread" rel="nofollow">object\n    spread properties</a>&nbsp;）来解决数据突变问题，实现如下：</p>\n<pre class="lua"><code class="language-javascript"><span class="hljs-function"><span class="code-keyword"><span\n        class="hljs-function"><span class="code-keyword">function</span></span></span><span\n        class="hljs-function"> </span><span class="code-title"><span class="hljs-function"><span class="code-title">updateColorMap</span></span></span><span\n        class="hljs-function"><span class="hljs-params">(</span></span><span class="hljs-params"><span\n        class="hljs-function"><span class="hljs-params">colormap</span></span></span><span class="hljs-function"><span\n        class="hljs-params">)</span></span> </span>{\n  <span class="code-keyword"><span class="code-keyword">return</span></span> {...colormap, right: <span\n            class="code-string"><span class="code-string">\'blue\'</span></span>};\n}</code></pre>\n<p>如果是构建React的App应用，那么以上方法都能够很好的支持，如果是在浏览器环境使用，需要引入polyfill机制。</p>\n\n<h4 id="h4-7">使用不可变的数据结构</h4>\n<p><a title="Immutable.js Github" href="https://github.com/facebook/immutable-js" rel="nofollow">Immutable.js</a>&nbsp;是解决数据突变问题的另外一种解决方案。它提供不可变、持久化的集合。集合包含下列结构：\n</p>\n<ul>\n    <li><em>Immutable</em>：一旦数据被创建，改集合不能在任何其他地方修改。</li>\n    <li><em>Persistent</em>：可以从已有的的数据集合（例如set）来创建新的数据集合。在创建新的数据集合后，已有的数据集合依然有效。</li>\n    <li>结构分享（<em>Structural Sharing</em>）：使用和原始数据尽可能相似的结构创建新的数据集合，并将复制降至最低，尽可能的提高效率。</li>\n</ul>\n<p>数据结构不可变的特性使跟踪数据变化变得很简单。任何变更将始终导致创建一个新的对象，所以我们只需要检查引用（指针地址）是否已经被修改即可确定数据是否已经修改。例如在常规的JavaScript代码中：</p>\n<pre class="actionscript"><code class="language-javascript"><span class="code-keyword"><span\n        class="code-keyword">const</span></span> x = { foo: <span class="code-string"><span\n        class="code-string">"bar"</span></span> };\n<span class="code-keyword"><span class="code-keyword">const</span></span> y = x;\ny.foo = <span class="code-string"><span class="code-string">"baz"</span></span>;\nx === y; <span class="code-comment"><span class="code-comment">// true</span></span></code></pre>\n<p>尽管y的值已经被修改，但是它和x都是同一个引用（指向相同的地址），因此最后的比较语句会返回true。我们可以使用&nbsp;immutable.js来修改代码：</p>\n<pre class="cs"><code class="language-javascript"><span class="code-keyword"><span\n        class="code-keyword">const</span></span> SomeRecord = Immutable.Record({ foo: <span class="hljs-literal"><span\n        class="hljs-literal">null</span></span>});\n<span class="code-keyword"><span class="code-keyword">const</span></span> x = <span class="code-keyword"><span\n            class="code-keyword">new</span></span> SomeRecord({ foo: <span class="code-string"><span\n            class="code-string">\'bar\'</span></span>});\n<span class="code-keyword"><span class="code-keyword">const</span></span> y = x.<span\n            class="code-keyword">set</span>(<span class="code-string"><span\n            class="code-string">\'foo\'</span></span>, <span class="code-string"><span\n            class="code-string">\'baz\'</span></span>);\nx === y; <span class="code-comment"><span class="code-comment">// false</span></span></code></pre>\n<p>在这个例子中，由于x突变时使用了新的引用，我们可以安全的假设x已经发生改变。</p>\n<p>还有两个库可以帮我们构建不可变数据：&nbsp;<a title="seamless-immutable" href="https://github.com/rtfeldman/seamless-immutable"\n                              rel="nofollow">seamless-immutable</a>&nbsp;and&nbsp;<a title="immutability-helper"\n        href="https://github.com/kolodny/immutability-helper" rel="nofollow">immutability-helper</a>。</p>\n<p>不可变的数据结构为我们跟踪数据对象变更提供了更加简便的方式，这是我们快速实现<code>shouldComponentUpdate</code>方法的基础。使用不可变数据后，可以为React提供不错的性能提升。</p>'}};