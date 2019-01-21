exports.ids=[60],exports.modules={316:function(s,a,n){"use strict";Object.defineProperty(a,"__esModule",{value:!0});a.content='<h2 id="h2-1">Web组件</h2>\n<p>从概念上说，React 和 <a title="Web组件" href="https://developer.mozilla.org/en-US/docs/Web/Web_Components" rel="nofollow">Web组件</a>&nbsp;分别用于解决不同的问题。Web组件提供了强大的封装特性来支持其可重复使用性，而React提供了一系列声明性（declarative）接口保证Dom结构和数据同步。但是某些时候这2个目标是互补的。对于开发人员来说将React用于Web组件、或将Web组件用于React、或2者皆有并非难事。\n</p>\n<p>虽然大部分使用React的开发人员并不需要使用Web组件，但是在某些情况，特别是引入了某些第三方库，还是需要使用到相关机制。</p>\n\n<h3 id="h3-1">在React中使用Web组件</h3>\n<pre class="scala"><code class="language-javascript"><span class="hljs-class"><span class="code-keyword"><span\n        class="hljs-class"><span class="code-keyword">class</span></span></span><span class="hljs-class"> </span><span\n        class="code-title"><span class="hljs-class"><span class="code-title">HelloMessage</span></span></span><span\n        class="hljs-class"> </span><span class="code-keyword"><span class="hljs-class"><span class="code-keyword">extends</span></span></span><span\n        class="hljs-class"> </span><span class="code-title"><span class="hljs-class"><span\n        class="code-title">React</span></span></span><span class="hljs-class">.</span><span class="code-title"><span\n        class="hljs-class"><span class="code-title">Component</span></span></span><span\n        class="hljs-class"> </span></span>{\n  render() {\n    <span class="code-keyword"><span class="code-keyword">return</span></span> <span class="xml"><span class="code-tag">&lt;<span\n            class="code-name">div</span>&gt;</span><span class="code-type">Hello</span> <span class="code-tag">&lt;<span\n            class="code-name">x-search</span>&gt;</span>{<span class="code-keyword">this</span>.props.name}<span\n            class="code-tag">&lt;/<span class="code-name">x-search</span>&gt;</span>!<span class="code-tag">&lt;/<span\n            class="code-name">div</span>&gt;</span>;\n  }\n}</span></code></pre>\n<blockquote>\n    <p>Web组件常会暴露一些必要的API接口，例如一个 video Web组件可能会暴露&nbsp;&nbsp;<code>play()</code>&nbsp;和&nbsp;<code>pause()</code>&nbsp;方法。为了获取Web组件暴露的这些API接口，需要在React编码使用Refs特性来直接获取真实的Dom节点。如果引入第三方的Web组件，最好的解决方案使用一个React组件来包装引入的Web组件并最终作为一个React组件来使用。\n    </p>\n    <p>由第三方Web组件触发的事件也许并不能通过React的渲染树传递，此时需要在组件中去手工的触发事件。&nbsp;</p>\n</blockquote>\n<p>一个经常导致混乱的地方是，Web组件使用的是“class”而React使用的是“className”，例如：</p>\n<pre class="javascript"><code class="language-javascript"><span class="hljs-function"><span class="code-keyword"><span\n        class="hljs-function"><span class="code-keyword">function</span></span></span><span\n        class="hljs-function"> </span><span class="code-title"><span class="hljs-function"><span class="code-title">BrickFlipbox</span></span></span><span\n        class="hljs-function">(</span><span class="hljs-params"></span><span class="hljs-function"><span\n        class="hljs-params"></span>) </span></span>{\n  <span class="code-keyword"><span class="code-keyword">return</span></span> (\n    <span class="xml"><span class="code-tag"><span class="xml"><span class="code-tag">&lt;</span></span><span\n            class="code-name"><span class="xml"><span class="code-tag"><span\n            class="code-name">brick-flipbox</span></span></span></span><span class="xml"><span class="code-tag"> </span></span><span\n            class="hljs-attr"><span class="xml"><span class="code-tag"><span\n            class="hljs-attr">class</span></span></span></span><span class="xml"><span\n            class="code-tag">=</span></span><span class="code-string"><span class="xml"><span class="code-tag"><span\n            class="code-string">"demo"</span></span></span></span><span class="xml"><span\n            class="code-tag">&gt;</span></span></span><span class="xml">\n      </span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;</span></span><span\n            class="code-name"><span class="xml"><span class="code-tag"><span class="code-name">div</span></span></span></span><span\n            class="xml"><span class="code-tag">&gt;</span></span></span><span class="xml">front</span><span\n            class="code-tag"><span class="xml"><span class="code-tag">&lt;/</span></span><span class="code-name"><span\n            class="xml"><span class="code-tag"><span class="code-name">div</span></span></span></span><span class="xml"><span\n            class="code-tag">&gt;</span></span></span><span class="xml">\n      </span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;</span></span><span\n            class="code-name"><span class="xml"><span class="code-tag"><span class="code-name">div</span></span></span></span><span\n            class="xml"><span class="code-tag">&gt;</span></span></span><span class="xml">back</span><span\n            class="code-tag"><span class="xml"><span class="code-tag">&lt;/</span></span><span class="code-name"><span\n            class="xml"><span class="code-tag"><span class="code-name">div</span></span></span></span><span class="xml"><span\n            class="code-tag">&gt;</span></span></span><span class="xml">\n    </span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;/</span></span><span\n            class="code-name"><span class="xml"><span class="code-tag"><span\n            class="code-name">brick-flipbox</span></span></span></span><span class="xml"><span\n            class="code-tag">&gt;</span></span></span><span class="xml">\n  );\n}</span></span></code></pre>\n\n<h3 id="h3-2">在Web组件中使用React</h3>\n<pre class="javascript"><code class="language-javascript"><span class="code-keyword"><span\n        class="code-keyword">const</span></span> proto = <span class="code-built_in"><span\n        class="code-built_in">Object</span></span>.create(HTMLElement.prototype, {\n  attachedCallback: {\n    value: <span class="hljs-function"><span class="code-keyword"><span class="hljs-function"><span\n            class="code-keyword">function</span></span></span><span class="hljs-function">(</span><span\n            class="hljs-params"></span><span class="hljs-function"><span class="hljs-params"></span>) </span></span>{\n      <span class="code-keyword"><span class="code-keyword">const</span></span> mountPoint = <span\n            class="code-built_in"><span class="code-built_in">document</span></span>.createElement(<span\n            class="code-string"><span class="code-string">\'span\'</span></span>);\n      <span class="code-keyword"><span class="code-keyword">this</span></span>.createShadowRoot().appendChild(mountPoint);\n\n      <span class="code-keyword"><span class="code-keyword">const</span></span> name = <span class="code-keyword"><span\n            class="code-keyword">this</span></span>.getAttribute(<span class="code-string"><span class="code-string">\'name\'</span></span>);\n      <span class="code-keyword"><span class="code-keyword">const</span></span> url = <span class="code-string"><span\n            class="code-string">\'https://www.google.com/search?q=\'</span></span> + <span class="code-built_in"><span\n            class="code-built_in">encodeURIComponent</span></span>(name);\n      ReactDOM.render(<span class="xml"><span class="code-tag"><span class="xml"><span\n            class="code-tag">&lt;</span></span><span class="code-name"><span class="xml"><span class="code-tag"><span\n            class="code-name">a</span></span></span></span><span class="xml"><span class="code-tag"> </span></span><span\n            class="hljs-attr"><span class="xml"><span class="code-tag"><span class="hljs-attr">href</span></span></span></span><span\n            class="xml"><span class="code-tag">=</span></span><span class="code-string"><span class="xml"><span\n            class="code-tag"><span class="code-string">{url}</span></span></span></span><span class="xml"><span\n            class="code-tag">&gt;</span></span></span><span class="xml">{name}</span><span class="code-tag"><span\n            class="xml"><span class="code-tag">&lt;/</span></span><span class="code-name"><span class="xml"><span\n            class="code-tag"><span class="code-name">a</span></span></span></span><span class="xml"><span\n            class="code-tag">&gt;</span></span></span></span>, mountPoint);\n    }\n  }\n});\n<span class="code-built_in"><span class="code-built_in">document</span></span>.registerElement(<span\n            class="code-string"><span class="code-string">\'x-search\'</span></span>, {prototype: proto});</code></pre>\n\n<h3 id="h3-3">React整合Jquery这一类直接操作Dom的技术</h3>\n<p>\n    React在发生真实Dom渲染之前都会先产生与之对应的虚拟Dom结构，然后再“合适”的时候将虚拟Dom的内容渲染到真实Dom上，完成渲染之后componentDidMount会被调用。Jquery这一类真实Dom的操作技术投入实际使用时最好在componentDidMount中使用，然后保证这个组件不会的虚拟Dom不发生任何改变。</p>'}};