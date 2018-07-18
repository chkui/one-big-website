exports.ids=[38],exports.modules={310:function(s,a,n){"use strict";Object.defineProperty(a,"__esModule",{value:!0});a.content='<h2 id="h2-1">为什么要用Fragments</h2>\n<p>在我们使用React开发组件的时候，每个React组件都必须返回一个根元素。例如下面这样：</p>\n<pre class="scala"><code class="language-javascript"><span class="hljs-class"><span class="code-keyword"><span class="hljs-class"><span class="code-keyword">class</span></span></span><span class="hljs-class"> </span><span class="code-title"><span class="hljs-class"><span class="code-title">Table</span></span></span><span class="hljs-class"> </span><span class="code-keyword"><span class="hljs-class"><span class="code-keyword">extends</span></span></span><span class="hljs-class"> </span><span class="code-title"><span class="hljs-class"><span class="code-title">React</span></span></span><span class="hljs-class">.</span><span class="code-title"><span class="hljs-class"><span class="code-title">Component</span></span></span><span class="hljs-class"> </span></span>{\n  render() {\n    <span class="code-keyword"><span class="code-keyword">return</span></span> (\n      <span class="xml"><span class="code-tag">&lt;<span class="code-name">table</span>&gt;</span>\n        <span class="code-tag">&lt;<span class="code-name">tr</span>&gt;</span>\n          <span class="code-tag">&lt;<span class="code-name"><span class="code-type">Columns</span></span> /&gt;</span>\n        <span class="code-tag">&lt;/<span class="code-name">tr</span>&gt;</span>\n      <span class="code-tag">&lt;/<span class="code-name">table</span>&gt;</span>\n    );\n  }\n}\n\n<span class="hljs-class"><span class="code-keyword">class</span> <span class="code-title">Columns</span> <span class="code-keyword">extends</span> <span class="code-title">React</span>.<span class="code-title">Component</span> </span>{\n  render() {\n    <span class="code-keyword">return</span> (\n      <span class="code-tag">&lt;<span class="code-name">div</span>&gt;</span>\n        <span class="code-tag">&lt;<span class="code-name">td</span>&gt;</span><span class="code-type">Hello</span><span class="code-tag">&lt;/<span class="code-name">td</span>&gt;</span>\n        <span class="code-tag">&lt;<span class="code-name">td</span>&gt;</span><span class="code-type">World</span><span class="code-tag">&lt;/<span class="code-name">td</span>&gt;</span>\n      <span class="code-tag">&lt;/<span class="code-name">div</span>&gt;</span>\n    );\n  }\n}</span></code></pre>\n<p>在正常的HTML行文中，&lt;tr&gt;标签与&lt;td&gt;标签之间的&lt;div&gt;标签是不应该存在的。</p>\n<p>虽然在这个小小的例子中，我们可以将tr标签移入到Columns中去解决这个问题，但是在错综复杂的业务层级代码中，我们经常会遇到希望一个组件返回多个并列标签的情况。</p>\n<p>为了解决这个问题，React在16.x版本新推出了一个Fragments特性——组件碎片化。Fragments的使用方法非常简单，我们将Column组件稍作改造即可：</p>\n<pre class="scala"><code class="language-javascript"><span class="hljs-class"><span class="code-keyword"><span class="hljs-class"><span class="code-keyword">class</span></span></span><span class="hljs-class"> </span><span class="code-title"><span class="hljs-class"><span class="code-title">Columns</span></span></span><span class="hljs-class"> </span><span class="code-keyword"><span class="hljs-class"><span class="code-keyword">extends</span></span></span><span class="hljs-class"> </span><span class="code-title"><span class="hljs-class"><span class="code-title">React</span></span></span><span class="hljs-class">.</span><span class="code-title"><span class="hljs-class"><span class="code-title">Component</span></span></span><span class="hljs-class"> </span></span>{\n  render() {\n    <span class="code-keyword"><span class="code-keyword">return</span></span> (\n      <span class="xml"><span class="code-tag">&lt;<span class="code-name"><span class="code-type">React</span>.<span class="code-type">Fragment</span></span>&gt;</span>\n        <span class="code-tag">&lt;<span class="code-name">td</span>&gt;</span><span class="code-type">Hello</span><span class="code-tag">&lt;/<span class="code-name">td</span>&gt;</span>\n        <span class="code-tag">&lt;<span class="code-name">td</span>&gt;</span><span class="code-type">World</span><span class="code-tag">&lt;/<span class="code-name">td</span>&gt;</span>\n      <span class="code-tag">&lt;/<span class="code-name"><span class="code-type">React</span>.<span class="code-type">Fragment</span></span>&gt;</span>\n    );\n  }\n}</span></code></pre>\n<p>这样，在最终渲染成Dom后，并不会出现任何与HTML行文不符的标签。</p>\n\n<h2 id="h2-2">简写与注意事项</h2>\n<p>除了React.Fragment这样的写法，React还推荐使用更加明了的简短写法：</p>\n<pre class="scala"><code class="language-javascript"><span class="hljs-class"><span class="code-keyword"><span class="hljs-class"><span class="code-keyword">class</span></span></span><span class="hljs-class"> </span><span class="code-title"><span class="hljs-class"><span class="code-title">Columns</span></span></span><span class="hljs-class"> </span><span class="code-keyword"><span class="hljs-class"><span class="code-keyword">extends</span></span></span><span class="hljs-class"> </span><span class="code-title"><span class="hljs-class"><span class="code-title">React</span></span></span><span class="hljs-class">.</span><span class="code-title"><span class="hljs-class"><span class="code-title">Component</span></span></span><span class="hljs-class"> </span></span>{\n  render() {\n    <span class="code-keyword"><span class="code-keyword">return</span></span> (\n      <span class="xml"><span class="code-tag">&lt;&gt;</span>\n        <span class="code-tag">&lt;<span class="code-name">td</span>&gt;</span><span class="code-type">Hello</span><span class="code-tag">&lt;/<span class="code-name">td</span>&gt;</span>\n        <span class="code-tag">&lt;<span class="code-name">td</span>&gt;</span><span class="code-type">World</span><span class="code-tag">&lt;/<span class="code-name">td</span>&gt;</span>\n      <span class="code-tag">&lt;/&gt;</span>\n    );\n  }\n}</span></code></pre>\n<p>需要注意的是：<span style="color:#FF0000">这样的写法不支持传递任何参数，而且某些编译器或者编译工具并不支持这种写法</span>。</p>\n\n<h2 id="h2-3">在队列中使用</h2>\n<p>一个React元素除了直接写成一个组件，也可以在队列中返回。Fragment标签使用到队列中同样也要<a href="https://www.chkui.com/article/react/react_list_key_and_form" title="列表与组件的键值">使用key属性来标记队列的位置</a>：</p>\n<pre class="javascript"><code class="language-javascript"><span class="hljs-function"><span class="code-keyword"><span class="hljs-function"><span class="code-keyword">function</span></span></span><span class="hljs-function"> </span><span class="code-title"><span class="hljs-function"><span class="code-title">Glossary</span></span></span><span class="hljs-function">(</span><span class="hljs-params"><span class="hljs-function"><span class="hljs-params">props</span></span></span><span class="hljs-function">) </span></span>{\n  <span class="code-keyword"><span class="code-keyword">return</span></span> (\n    <span class="xml"><span class="code-tag"><span class="xml"><span class="code-tag">&lt;</span></span><span class="code-name"><span class="xml"><span class="code-tag"><span class="code-name">dl</span></span></span></span><span class="xml"><span class="code-tag">&gt;</span></span></span><span class="xml">\n      {props.items.map(item =&gt; (\n        </span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;</span></span><span class="code-name"><span class="xml"><span class="code-tag"><span class="code-name">React.Fragment</span></span></span></span><span class="xml"><span class="code-tag"> </span></span><span class="hljs-attr"><span class="xml"><span class="code-tag"><span class="hljs-attr">key</span></span></span></span><span class="xml"><span class="code-tag">=</span></span><span class="code-string"><span class="xml"><span class="code-tag"><span class="code-string">{item.id}</span></span></span></span><span class="xml"><span class="code-tag">&gt;</span></span></span><span class="xml">\n          </span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;</span></span><span class="code-name"><span class="xml"><span class="code-tag"><span class="code-name">dt</span></span></span></span><span class="xml"><span class="code-tag">&gt;</span></span></span><span class="xml">{item.term}</span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;/</span></span><span class="code-name"><span class="xml"><span class="code-tag"><span class="code-name">dt</span></span></span></span><span class="xml"><span class="code-tag">&gt;</span></span></span><span class="xml">\n          </span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;</span></span><span class="code-name"><span class="xml"><span class="code-tag"><span class="code-name">dd</span></span></span></span><span class="xml"><span class="code-tag">&gt;</span></span></span><span class="xml">{item.description}</span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;/</span></span><span class="code-name"><span class="xml"><span class="code-tag"><span class="code-name">dd</span></span></span></span><span class="xml"><span class="code-tag">&gt;</span></span></span><span class="xml">\n        </span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;/</span></span><span class="code-name"><span class="xml"><span class="code-tag"><span class="code-name">React.Fragment</span></span></span></span><span class="xml"><span class="code-tag">&gt;</span></span></span><span class="xml">\n      ))}\n    </span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;/</span></span><span class="code-name"><span class="xml"><span class="code-tag"><span class="code-name">dl</span></span></span></span><span class="xml"><span class="code-tag">&gt;</span></span></span><span class="xml">\n  );\n}</span></span></code></pre>\n<p></p>'}};