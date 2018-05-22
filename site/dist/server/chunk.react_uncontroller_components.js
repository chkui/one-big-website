exports.ids=[14],exports.modules={281:function(s,a,n){"use strict";Object.defineProperty(a,"__esModule",{value:!0});a.content='<h3 id="h3-1">非受控组件（Uncontrolled Components）</h3>\n<h4 id="h4-1">使用非受控组件</h4>\n<p>在大部分情况下，推荐使用 <a title="受控组件" href="https://www.chkui.com/article/react/react_list_key_and_form#h1-2">受控组件</a> 来实现表单、输入框等状态控制。在受控组件中，表单等数据都有React组件自己处理。这里将介绍另外一种非受控组件，表单的数据有Dom自己控制。</p>\n<p>非受控组件实现的重点是用Refs特性获取真实Dom来代替每次数据变更去更新组件的状态值。</p>\n<p>例如下面的代码，在非受控组件中记录被用户输入的名字：</p>\n<pre class="scala"><code class="language-javascript"><span class="hljs-class"><span class="code-keyword"><span class="hljs-class"><span class="code-keyword">class</span></span></span><span class="hljs-class"> </span><span class="code-title"><span class="hljs-class"><span class="code-title">NameForm</span></span></span><span class="hljs-class"> </span><span class="code-keyword"><span class="hljs-class"><span class="code-keyword">extends</span></span></span><span class="hljs-class"> </span><span class="code-title"><span class="hljs-class"><span class="code-title">React</span></span></span><span class="hljs-class">.</span><span class="code-title"><span class="hljs-class"><span class="code-title">Component</span></span></span><span class="hljs-class"> </span></span>{\n  <span class="code-keyword">constructor</span>(props) {\n    <span class="code-keyword"><span class="code-keyword">super</span></span>(props);\n    <span class="code-keyword"><span class="code-keyword">this</span></span>.handleSubmit = <span class="code-keyword"><span class="code-keyword">this</span></span>.handleSubmit.bind(<span class="code-keyword"><span class="code-keyword">this</span></span>);\n  }\n\n  handleSubmit(event) {\n    <span class="code-comment"><span class="code-comment">//在提交时，直接使用ref获取的真实Dom获取值</span></span>\n    alert(<span class="code-string"><span class="hljs-symbol">\'A</span> name was submitted: \'</span> + <span class="code-keyword"><span class="code-keyword">this</span></span>.input.value);\n    event.preventDefault();\n  }\n\n  render() {\n    <span class="code-keyword"><span class="code-keyword">return</span></span> (\n      &lt;form onSubmit={<span class="code-keyword">this</span>.handleSubmit}&gt;\n        &lt;label&gt;\n          <span class="code-type">Name</span>:\n          &lt;input <span class="hljs-class"><span class="code-keyword">type</span></span>=<span class="code-string">"text"</span> ref={(input) =&gt; <span class="code-keyword">this</span>.input = input} /&gt;\n        &lt;/label&gt;\n        &lt;input <span class="hljs-class"><span class="code-keyword">type</span></span>=<span class="code-string">"submit"</span> value=<span class="code-string">"Submit"</span> /&gt;\n      &lt;/form&gt;\n    );\n  }\n}</code></pre>\n<p><a title="代码测试" href="https://codepen.io/gaearon/pen/WooRWa?editors=0010" rel="nofollow">尝试代码</a>。</p>\n<p>由于在非受控组件中使用Refs特性获取了真实Dom的实例，所以在使用非受控组建时，更容易集成React和非React代码，在某些时候也可以省略一些代码。但是建议除了特殊情况，都使用受控组件。</p>\n<p>如果想要深入理解什么情况下使用哪种组件，建议阅读 <a title="受控组件与非受控组件的差异" href="https://goshakkk.name/controlled-vs-uncontrolled-inputs-react/" rel="nofollow">受控和不受控表单输入</a> 一文。</p>\n<h4 id="h4-2">组件默认值</h4>\n<p>在React渲染的生命周期，表单中的value属性会被覆盖Dom中的value值。在使用非受控组件时，通常需要React设定一个默认初始值但是不再控制后续更新。基于这个案例，你可以指定一个<code>defaultValue</code>&nbsp;属性来代替&nbsp;<code>value</code>。</p>\n<pre class="xml"><code class="language-javascript">render() {\n  <span class="code-keyword">return</span> (\n    <span class="code-tag">&lt;<span class="code-name">form</span> <span class="hljs-attr">onSubmit</span>=<span class="code-string">{this.handleSubmit}</span>&gt;</span>\n      <span class="code-tag">&lt;<span class="code-name">label</span>&gt;</span>\n        Name:\n        <span class="code-tag">&lt;<span class="code-name">input</span>\n          <span class="hljs-attr">defaultValue</span>=<span class="code-string">"Bob"</span>\n          <span class="hljs-attr">type</span>=<span class="code-string">"text"</span>\n          <span class="hljs-attr">ref</span>=<span class="code-string">{(input)</span> =&gt;</span> this.input = input} /&gt;\n      <span class="code-tag">&lt;/<span class="code-name">label</span>&gt;</span>\n      <span class="code-tag">&lt;<span class="code-name">input</span> <span class="hljs-attr">type</span>=<span class="code-string">"submit"</span> <span class="hljs-attr">value</span>=<span class="code-string">"Submit"</span> /&gt;</span>\n    <span class="code-tag">&lt;/<span class="code-name">form</span>&gt;</span>\n  );\n}</code></pre>\n<p>例如中“defaultValue = "Bob"”就是指定了一个默认值。同样地，&nbsp;<code>&lt;input type="checkbox"&gt;</code>&nbsp;和&nbsp;<code>&lt;input type="radio"&gt;</code>&nbsp;支持&nbsp;<code>defaultChecked</code>属性，&nbsp;<code>&lt;select&gt;</code>&nbsp;标签支持&nbsp;<code>defaultValue</code>属性。</p>'}};