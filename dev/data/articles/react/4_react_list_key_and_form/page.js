export const content = '<h1 id="h1-1">列表与组件的键值</h1>\n' +
    '<p>首先让我们看看在JavaScript中我们是如何处理一个列表的：</p>\n' +
    '<pre class="typescript"><code class="language-javascript"><span class="code-keyword"><span\n' +
    '        class="code-keyword">const</span></span> numbers = [<span class="hljs-number"><span class="hljs-number">1</span></span>, <span\n' +
    '        class="hljs-number"><span class="hljs-number">2</span></span>, <span class="hljs-number"><span\n' +
    '        class="hljs-number">3</span></span>, <span class="hljs-number"><span class="hljs-number">4</span></span>, <span\n' +
    '        class="hljs-number"><span class="hljs-number">5</span></span>];\n' +
    '<span class="code-keyword"><span class="code-keyword">const</span></span> doubled = numbers.map((<span\n' +
    '            class="code-built_in">number</span>) =&gt; <span class="code-built_in">number</span> * <span\n' +
    '            class="hljs-number"><span class="hljs-number">2</span></span>);\n' +
    '<span class="code-built_in"><span class="code-built_in">console</span></span>.log(doubled);</code></pre>\n' +
    '<p>例子中使用map方法将每个元素的值*2，最后得到的数组为：[2, 4, 6, 8, 10]。在React中，处理组件数组的方式与之类似。</p>\n' +
    '\n' +
    '<h2 id="h2-1">渲染多个组件</h2>\n' +
    '<p>下面的例子，我们使用map()方法来创建组件中的一系列元素：</p>\n' +
    '<pre class="javascript"><code class="language-javascript"><span class="code-keyword"><span\n' +
    '        class="code-keyword">const</span></span> numbers = [<span class="hljs-number"><span class="hljs-number">1</span></span>, <span\n' +
    '        class="hljs-number"><span class="hljs-number">2</span></span>, <span class="hljs-number"><span\n' +
    '        class="hljs-number">3</span></span>, <span class="hljs-number"><span class="hljs-number">4</span></span>, <span\n' +
    '        class="hljs-number"><span class="hljs-number">5</span></span>];\n' +
    '<span class="code-keyword"><span class="code-keyword">const</span></span> listItems = numbers.map((number) =&gt;\n' +
    '  <span class="xml"><span class="code-tag"><span class="xml"><span class="code-tag">&lt;</span></span><span\n' +
    '          class="code-name"><span class="xml"><span class="code-tag"><span\n' +
    '          class="code-name">li</span></span></span></span><span class="xml"><span\n' +
    '          class="code-tag">&gt;</span></span></span><span class="xml">{number}</span><span class="code-tag"><span\n' +
    '          class="xml"><span class="code-tag">&lt;/</span></span><span class="code-name"><span class="xml"><span\n' +
    '          class="code-tag"><span class="code-name">li</span></span></span></span><span class="xml"><span\n' +
    '          class="code-tag">&gt;</span></span></span></span>\n' +
    ');</code></pre>\n' +
    '<p>listItem就是一个包含多个&lt;li&gt;标签的组件。然后我们将listItem用&lt;ul&gt;标签包裹起来并在浏览器呈现：</p>\n' +
    '<pre class="javascript"><code class="language-javascript">ReactDOM.render(\n' +
    '  <span class="xml"><span class="code-tag"><span class="xml"><span class="code-tag">&lt;</span></span><span\n' +
    '          class="code-name"><span class="xml"><span class="code-tag"><span\n' +
    '          class="code-name">ul</span></span></span></span><span class="xml"><span\n' +
    '          class="code-tag">&gt;</span></span></span><span class="xml">{listItems}</span><span class="code-tag"><span\n' +
    '          class="xml"><span class="code-tag">&lt;/</span></span><span class="code-name"><span class="xml"><span\n' +
    '          class="code-tag"><span class="code-name">ul</span></span></span></span><span class="xml"><span\n' +
    '          class="code-tag">&gt;</span></span></span></span>,\n' +
    '  <span class="code-built_in"><span class="code-built_in">document</span></span>.getElementById(<span\n' +
    '            class="code-string"><span class="code-string">\'root\'</span></span>)\n' +
    ');</code></pre>\n' +
    '<p><a title="React列表键值表单示例代码" href="https://codepen.io/gaearon/pen/GjPyQr?editors=0011" rel="nofollow">测试代码</a></p>\n' +
    '<p>通过类似的方法，我们可以使用数组来创建一系列元素。</p>\n' +
    '\n' +
    '<h2 id="h2-2">基于列表的组件</h2>\n' +
    '<p>大部分情况，我们希望在一个组件中完成一个列表元素的渲染。将前面的例子稍加修改：</p>\n' +
    '<pre class="javascript"><code class="language-javascript"><span class="code-comment"><span\n' +
    '        class="code-comment">//构建组件</span></span>\n' +
    '<span class="hljs-function"><span class="code-keyword"><span class="hljs-function"><span\n' +
    '        class="code-keyword">function</span></span></span><span class="hljs-function"> </span><span\n' +
    '        class="code-title"><span class="hljs-function"><span class="code-title">NumberList</span></span></span><span\n' +
    '        class="hljs-function">(</span><span class="hljs-params"><span class="hljs-function"><span class="hljs-params">props</span></span></span><span\n' +
    '        class="hljs-function">) </span></span>{\n' +
    '  <span class="code-keyword"><span class="code-keyword">const</span></span> numbers = props.numbers;\n' +
    '  <span class="code-comment"><span class="code-comment">//根据输入的参数获取一个&lt;li&gt;标签的列表</span></span>\n' +
    '  <span class="code-keyword"><span class="code-keyword">const</span></span> listItems = numbers.map((number) =&gt;\n' +
    '    <span class="xml"><span class="code-tag"><span class="xml"><span class="code-tag">&lt;</span></span><span\n' +
    '            class="code-name"><span class="xml"><span class="code-tag"><span\n' +
    '            class="code-name">li</span></span></span></span><span class="xml"><span class="code-tag">&gt;</span></span></span><span\n' +
    '            class="xml">{number}</span><span class="code-tag"><span class="xml"><span\n' +
    '            class="code-tag">&lt;/</span></span><span class="code-name"><span class="xml"><span class="code-tag"><span\n' +
    '            class="code-name">li</span></span></span></span><span class="xml"><span class="code-tag">&gt;</span></span></span></span>\n' +
    '  );\n' +
    '  <span class="code-comment"><span class="code-comment">//用&lt;ul&gt;包裹&lt;li&gt;并返回</span></span>\n' +
    '  <span class="code-keyword"><span class="code-keyword">return</span></span> (\n' +
    '    <span class="xml"><span class="code-tag"><span class="xml"><span class="code-tag">&lt;</span></span><span\n' +
    '            class="code-name"><span class="xml"><span class="code-tag"><span\n' +
    '            class="code-name">ul</span></span></span></span><span class="xml"><span class="code-tag">&gt;</span></span></span><span\n' +
    '            class="xml">{listItems}</span><span class="code-tag"><span class="xml"><span\n' +
    '            class="code-tag">&lt;/</span></span><span class="code-name"><span class="xml"><span class="code-tag"><span\n' +
    '            class="code-name">ul</span></span></span></span><span class="xml"><span class="code-tag">&gt;</span></span></span></span>\n' +
    '  );\n' +
    '}\n' +
    '<span class="code-comment"><span class="code-comment">//设置输入参数</span></span>\n' +
    '<span class="code-keyword"><span class="code-keyword">const</span></span> numbers = [<span class="hljs-number"><span\n' +
    '            class="hljs-number">1</span></span>, <span class="hljs-number"><span\n' +
    '            class="hljs-number">2</span></span>, <span class="hljs-number"><span\n' +
    '            class="hljs-number">3</span></span>, <span class="hljs-number"><span\n' +
    '            class="hljs-number">4</span></span>, <span class="hljs-number"><span class="hljs-number">5</span></span>];\n' +
    '<span class="code-comment"><span class="code-comment">//渲染组件</span></span>\n' +
    'ReactDOM.render(\n' +
    '  <span class="xml"><span class="code-tag"><span class="xml"><span class="code-tag">&lt;</span></span><span\n' +
    '          class="code-name"><span class="xml"><span class="code-tag"><span\n' +
    '          class="code-name">NumberList</span></span></span></span><span class="xml"><span\n' +
    '          class="code-tag"> </span></span><span class="hljs-attr"><span class="xml"><span class="code-tag"><span\n' +
    '          class="hljs-attr">numbers</span></span></span></span><span class="xml"><span\n' +
    '          class="code-tag">=</span></span><span class="code-string"><span class="xml"><span class="code-tag"><span\n' +
    '          class="code-string">{numbers}</span></span></span></span><span class="xml"><span\n' +
    '          class="code-tag"> /&gt;</span></span></span><span class="xml">,\n' +
    '  document.getElementById(\'root\')\n' +
    ');</span></span></code></pre>\n' +
    '<p>当我们执行这个例子的代码时，会发现在浏览器中输出一个警告："&nbsp;a key should be provided for list\n' +
    '    items"。"键值（Key）"在创建列表元素时是一个附加的属性，下一节会详细说明使用它的原因。</p>\n' +
    '<p>通过number.map()方法向组建中的元素增加键值：</p>\n' +
    '<pre class="php"><code class="language-javascript"><span class="hljs-function"><span class="code-keyword"><span\n' +
    '        class="hljs-function"><span class="code-keyword">function</span></span></span><span\n' +
    '        class="hljs-function"> </span><span class="code-title"><span class="hljs-function"><span class="code-title">NumberList</span></span></span><span\n' +
    '        class="hljs-function"><span class="hljs-params">(</span></span><span class="hljs-params"><span\n' +
    '        class="hljs-function"><span class="hljs-params">props</span></span></span><span class="hljs-function"><span\n' +
    '        class="hljs-params">)</span> </span></span>{\n' +
    '  <span class="code-keyword"><span class="code-keyword">const</span></span> numbers = props.numbers;\n' +
    '  <span class="code-keyword"><span class="code-keyword">const</span></span> listItems = numbers.map((number) =&gt;\n' +
    '    <span class="code-comment"><span class="code-comment">//根据number输出设置li的key</span></span>\n' +
    '    &lt;li key={number.toString()}&gt;\n' +
    '      {number}\n' +
    '    &lt;<span class="hljs-regexp">/li&gt;\n' +
    '  );\n' +
    '  <span class="code-keyword">return</span> (\n' +
    '    &lt;ul&gt;{listItems}&lt;/u</span>l&gt;\n' +
    '  );\n' +
    '}\n' +
    '\n' +
    '<span class="code-keyword"><span class="code-keyword">const</span></span> numbers = [<span class="hljs-number"><span\n' +
    '            class="hljs-number">1</span></span>, <span class="hljs-number"><span\n' +
    '            class="hljs-number">2</span></span>, <span class="hljs-number"><span\n' +
    '            class="hljs-number">3</span></span>, <span class="hljs-number"><span\n' +
    '            class="hljs-number">4</span></span>, <span class="hljs-number"><span class="hljs-number">5</span></span>];\n' +
    'ReactDOM.render(\n' +
    '  <span class="xml"><span class="code-tag">&lt;<span class="code-name">NumberList</span> <span\n' +
    '          class="hljs-attr">numbers</span>=<span class="code-string">{numbers}</span> /&gt;</span>,\n' +
    '  document.getElementById(<span class="code-string">\'root\'</span>)\n' +
    ');</span></code></pre>\n' +
    '<p><a title="React列表键值表单示例代码" href="https://codepen.io/gaearon/pen/jrXYRR?editors=0011" rel="nofollow">测试代码</a></p>\n' +
    '\n' +
    '<h2 id="h2-3">键值的使用</h2>\n' +
    '<p>在React中，键值（keys）用来标记那些元素被修改了。在使用数组时，应该给数组元素标记键值以便于批量更新的效率：</p>\n' +
    '<pre class="javascript"><code class="language-javascript"><span class="code-keyword"><span\n' +
    '        class="code-keyword">const</span></span> numbers = [<span class="hljs-number"><span class="hljs-number">1</span></span>, <span\n' +
    '        class="hljs-number"><span class="hljs-number">2</span></span>, <span class="hljs-number"><span\n' +
    '        class="hljs-number">3</span></span>, <span class="hljs-number"><span class="hljs-number">4</span></span>, <span\n' +
    '        class="hljs-number"><span class="hljs-number">5</span></span>];\n' +
    '<span class="code-keyword"><span class="code-keyword">const</span></span> listItems = numbers.map((number) =&gt;\n' +
    '  <span class="xml"><span class="code-tag"><span class="xml"><span class="code-tag">&lt;</span></span><span\n' +
    '          class="code-name"><span class="xml"><span class="code-tag"><span\n' +
    '          class="code-name">li</span></span></span></span><span class="xml"><span class="code-tag"> </span></span><span\n' +
    '          class="hljs-attr"><span class="xml"><span class="code-tag"><span\n' +
    '          class="hljs-attr">key</span></span></span></span><span class="xml"><span class="code-tag">=</span></span><span\n' +
    '          class="code-string"><span class="xml"><span class="code-tag"><span\n' +
    '          class="code-string">{number.toString()}</span></span></span></span><span class="xml"><span class="code-tag">&gt;</span></span></span><span\n' +
    '          class="xml">\n' +
    '    {number}\n' +
    '  </span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;/</span></span><span\n' +
    '          class="code-name"><span class="xml"><span class="code-tag"><span\n' +
    '          class="code-name">li</span></span></span></span><span class="xml"><span\n' +
    '          class="code-tag">&gt;</span></span></span></span>\n' +
    ');</code></pre>\n' +
    '<p>最好使用一个字符串来表示key值，并且确保兄弟节点之间的唯一性。例如使用业务id作为键值：</p>\n' +
    '<pre class="javascript"><code class="language-javascript"><span class="code-keyword"><span\n' +
    '        class="code-keyword">const</span></span> todoItems = todos.map((todo) =&gt;\n' +
    '  <span class="xml"><span class="code-tag"><span class="xml"><span class="code-tag">&lt;</span></span><span\n' +
    '          class="code-name"><span class="xml"><span class="code-tag"><span\n' +
    '          class="code-name">li</span></span></span></span><span class="xml"><span class="code-tag"> </span></span><span\n' +
    '          class="hljs-attr"><span class="xml"><span class="code-tag"><span\n' +
    '          class="hljs-attr">key</span></span></span></span><span class="xml"><span class="code-tag">=</span></span><span\n' +
    '          class="code-string"><span class="xml"><span class="code-tag"><span class="code-string">{todo.id}</span></span></span></span><span\n' +
    '          class="xml"><span class="code-tag">&gt;</span></span></span><span class="xml">\n' +
    '    {todo.text}\n' +
    '  </span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;/</span></span><span\n' +
    '          class="code-name"><span class="xml"><span class="code-tag"><span\n' +
    '          class="code-name">li</span></span></span></span><span class="xml"><span\n' +
    '          class="code-tag">&gt;</span></span></span></span>\n' +
    ');</code></pre>\n' +
    '<p>在某些情况下无法获取到合理的id值，可以直接使用列表索引：</p>\n' +
    '<pre class="javascript"><code class="language-javascript"><span class="code-keyword"><span\n' +
    '        class="code-keyword">const</span></span> todoItems = todos.map((todo, index) =&gt;\n' +
    '  <span class="xml"><span class="code-tag"><span class="xml"><span class="code-tag">&lt;</span></span><span\n' +
    '          class="code-name"><span class="xml"><span class="code-tag"><span\n' +
    '          class="code-name">li</span></span></span></span><span class="xml"><span class="code-tag"> </span></span><span\n' +
    '          class="hljs-attr"><span class="xml"><span class="code-tag"><span\n' +
    '          class="hljs-attr">key</span></span></span></span><span class="xml"><span class="code-tag">=</span></span><span\n' +
    '          class="code-string"><span class="xml"><span class="code-tag"><span\n' +
    '          class="code-string">{index}</span></span></span></span><span class="xml"><span\n' +
    '          class="code-tag">&gt;</span></span></span><span class="xml">\n' +
    '    {todo.text}\n' +
    '  </span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;/</span></span><span\n' +
    '          class="code-name"><span class="xml"><span class="code-tag"><span\n' +
    '          class="code-name">li</span></span></span></span><span class="xml"><span\n' +
    '          class="code-tag">&gt;</span></span></span></span>\n' +
    ');</code></pre>\n' +
    '<p>如果列表中的元素可以重新排序，建议不要使用索引作为键值，这样会导致渲染缓慢。如果你对键值（keys）的使用有浓厚的兴趣，参看：<a title="React列表键值机制"\n' +
    '                                                                     href="https://facebook.github.io/react/docs/reconciliation.html#recursing-on-children"\n' +
    '                                                                     rel="nofollow">in-depth explanation about why keys\n' +
    '    are necessary</a>。</p>\n' +
    '\n' +
    '<h2 id="h2-4">使用键值扩展组件</h2>\n' +
    '<p>键值仅仅在最外层列表中存在意义。例如，如果想抽取出一个名为<code>ListItem</code>的组件，最好在&lt;ListItem /&gt;上标记key值，而不是组件中的&lt;li&gt;元素上。</p>\n' +
    '<p>下面是一些错误使用键值的例子：</p>\n' +
    '<pre class="php"><code class="language-javascript"><span class="hljs-function"><span class="code-keyword"><span\n' +
    '        class="hljs-function"><span class="code-keyword">function</span></span></span><span\n' +
    '        class="hljs-function"> </span><span class="code-title"><span class="hljs-function"><span class="code-title">ListItem</span></span></span><span\n' +
    '        class="hljs-function"><span class="hljs-params">(</span></span><span class="hljs-params"><span\n' +
    '        class="hljs-function"><span class="hljs-params">props</span></span></span><span class="hljs-function"><span\n' +
    '        class="hljs-params">)</span> </span></span>{\n' +
    '  <span class="code-keyword"><span class="code-keyword">const</span></span> value = props.value;\n' +
    '  <span class="code-comment"><span class="code-comment">//不应该在这里使用键值</span></span>\n' +
    '  <span class="code-keyword"><span class="code-keyword">return</span></span> (\n' +
    '    <span class="xml"><span class="code-tag">&lt;<span class="code-name">li</span> <span\n' +
    '            class="hljs-attr">key</span>=<span class="code-string">{value.toString()}</span>&gt;</span>\n' +
    '      {value}\n' +
    '    <span class="code-tag">&lt;/<span class="code-name">li</span>&gt;</span></span>\n' +
    '  );\n' +
    '}\n' +
    '\n' +
    '<span class="hljs-function"><span class="code-keyword"><span class="hljs-function"><span\n' +
    '        class="code-keyword">function</span></span></span><span class="hljs-function"> </span><span\n' +
    '        class="code-title"><span class="hljs-function"><span class="code-title">NumberList</span></span></span><span\n' +
    '        class="hljs-function"><span class="hljs-params">(</span></span><span class="hljs-params"><span\n' +
    '        class="hljs-function"><span class="hljs-params">props</span></span></span><span class="hljs-function"><span\n' +
    '        class="hljs-params">)</span> </span></span>{\n' +
    '  <span class="code-keyword"><span class="code-keyword">const</span></span> numbers = props.numbers;\n' +
    '  <span class="code-comment"><span class="code-comment">/**建议在这里使用并标记键值*/</span></span>\n' +
    '  <span class="code-keyword"><span class="code-keyword">const</span></span> listItems = numbers.map((number) =&gt;\n' +
    '    &lt;ListItem value={number} /&gt;\n' +
    '  );\n' +
    '  <span class="code-keyword">return</span> (\n' +
    '    &lt;ul&gt;\n' +
    '      {listItems}\n' +
    '    &lt;/ul&gt;\n' +
    '  );\n' +
    '}\n' +
    '\n' +
    '<span class="code-keyword">const</span> numbers = [<span class="hljs-number">1</span>, <span\n' +
    '            class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span\n' +
    '            class="hljs-number">5</span>];\n' +
    'ReactDOM.render(\n' +
    '  &lt;NumberList numbers={numbers} /&gt;,\n' +
    '  document.getElementById(<span class="code-string">\'root\'</span>)\n' +
    ');</code></pre>\n' +
    '<p>正确使用键值的例子：</p>\n' +
    '<pre class="php"><code class="language-javascript"><span class="hljs-function"><span class="code-keyword"><span\n' +
    '        class="hljs-function"><span class="code-keyword">function</span></span></span><span\n' +
    '        class="hljs-function"> </span><span class="code-title"><span class="hljs-function"><span class="code-title">ListItem</span></span></span><span\n' +
    '        class="hljs-function"><span class="hljs-params">(</span></span><span class="hljs-params"><span\n' +
    '        class="hljs-function"><span class="hljs-params">props</span></span></span><span class="hljs-function"><span\n' +
    '        class="hljs-params">)</span> </span></span>{\n' +
    '  <span class="code-keyword"><span class="code-keyword">return</span></span> <span class="xml"><span class="code-tag">&lt;<span\n' +
    '            class="code-name">li</span>&gt;</span>{props.value}<span class="code-tag">&lt;/<span\n' +
    '            class="code-name">li</span>&gt;</span></span>;\n' +
    '}\n' +
    '\n' +
    '<span class="hljs-function"><span class="code-keyword"><span class="hljs-function"><span\n' +
    '        class="code-keyword">function</span></span></span><span class="hljs-function"> </span><span\n' +
    '        class="code-title"><span class="hljs-function"><span class="code-title">NumberList</span></span></span><span\n' +
    '        class="hljs-function"><span class="hljs-params">(</span></span><span class="hljs-params"><span\n' +
    '        class="hljs-function"><span class="hljs-params">props</span></span></span><span class="hljs-function"><span\n' +
    '        class="hljs-params">)</span> </span></span>{\n' +
    '  <span class="code-keyword"><span class="code-keyword">const</span></span> numbers = props.numbers;\n' +
    '  <span class="code-keyword"><span class="code-keyword">const</span></span> listItems = numbers.map((number) =&gt;\n' +
    '    &lt;ListItem key={number.toString()}\n' +
    '              value={number} /&gt;\n' +
    '  );\n' +
    '  <span class="code-keyword">return</span> (\n' +
    '    &lt;ul&gt;\n' +
    '      {listItems}\n' +
    '    &lt;/ul&gt;\n' +
    '  );\n' +
    '}\n' +
    '\n' +
    '<span class="code-keyword">const</span> numbers = [<span class="hljs-number">1</span>, <span\n' +
    '            class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span\n' +
    '            class="hljs-number">5</span>];\n' +
    'ReactDOM.render(\n' +
    '  &lt;NumberList numbers={numbers} /&gt;,\n' +
    '  document.getElementById(<span class="code-string">\'root\'</span>)\n' +
    ');</code></pre>\n' +
    '\n' +
    '<h2 id="h2-5">键值需要与兄弟节点保证唯一</h2>\n' +
    '<p>在使用的过程中，键值只要保证和兄弟节点的键值没有碰撞即可，并不需要全局唯一。在不同的列表中我们可以使用相同的key：</p>\n' +
    '<pre class="javascript"><code class="language-javascript"><span class="hljs-function"><span class="code-keyword"><span\n' +
    '        class="hljs-function"><span class="code-keyword">function</span></span></span><span\n' +
    '        class="hljs-function"> </span><span class="code-title"><span class="hljs-function"><span\n' +
    '        class="code-title">Blog</span></span></span><span class="hljs-function">(</span><span class="hljs-params"><span\n' +
    '        class="hljs-function"><span class="hljs-params">props</span></span></span><span class="hljs-function">) </span></span>{\n' +
    '  <span class="code-keyword"><span class="code-keyword">const</span></span> sidebar = (\n' +
    '    <span class="xml"><span class="code-tag"><span class="xml"><span class="code-tag">&lt;</span></span><span\n' +
    '            class="code-name"><span class="xml"><span class="code-tag"><span\n' +
    '            class="code-name">ul</span></span></span></span><span class="xml"><span class="code-tag">&gt;</span></span></span><span\n' +
    '            class="xml">\n' +
    '      {props.posts.map((post) =&gt;\n' +
    '        </span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;</span></span><span\n' +
    '            class="code-name"><span class="xml"><span class="code-tag"><span\n' +
    '            class="code-name">li</span></span></span></span><span class="xml"><span\n' +
    '            class="code-tag"> </span></span><span class="hljs-attr"><span class="xml"><span class="code-tag"><span\n' +
    '            class="hljs-attr">key</span></span></span></span><span class="xml"><span\n' +
    '            class="code-tag">=</span></span><span class="code-string"><span class="xml"><span class="code-tag"><span\n' +
    '            class="code-string">{post.id}</span></span></span></span><span class="xml"><span\n' +
    '            class="code-tag">&gt;</span></span></span><span class="xml">\n' +
    '          {post.title}\n' +
    '        </span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;/</span></span><span\n' +
    '            class="code-name"><span class="xml"><span class="code-tag"><span\n' +
    '            class="code-name">li</span></span></span></span><span class="xml"><span class="code-tag">&gt;</span></span></span><span\n' +
    '            class="xml">\n' +
    '      )}\n' +
    '    </span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;/</span></span><span\n' +
    '            class="code-name"><span class="xml"><span class="code-tag"><span\n' +
    '            class="code-name">ul</span></span></span></span><span class="xml"><span class="code-tag">&gt;</span></span></span></span>\n' +
    '  );\n' +
    '  <span class="code-keyword"><span class="code-keyword">const</span></span> content = props.posts.map((post) =&gt;\n' +
    '    <span class="xml"><span class="code-tag"><span class="xml"><span class="code-tag">&lt;</span></span><span\n' +
    '            class="code-name"><span class="xml"><span class="code-tag"><span class="code-name">div</span></span></span></span><span\n' +
    '            class="xml"><span class="code-tag"> </span></span><span class="hljs-attr"><span class="xml"><span\n' +
    '            class="code-tag"><span class="hljs-attr">key</span></span></span></span><span class="xml"><span\n' +
    '            class="code-tag">=</span></span><span class="code-string"><span class="xml"><span class="code-tag"><span\n' +
    '            class="code-string">{post.id}</span></span></span></span><span class="xml"><span\n' +
    '            class="code-tag">&gt;</span></span></span><span class="xml">\n' +
    '      </span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;</span></span><span\n' +
    '            class="code-name"><span class="xml"><span class="code-tag"><span\n' +
    '            class="code-name">h3</span></span></span></span><span class="xml"><span class="code-tag">&gt;</span></span></span><span\n' +
    '            class="xml">{post.title}</span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;/</span></span><span\n' +
    '            class="code-name"><span class="xml"><span class="code-tag"><span\n' +
    '            class="code-name">h3</span></span></span></span><span class="xml"><span class="code-tag">&gt;</span></span></span><span\n' +
    '            class="xml">\n' +
    '      </span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;</span></span><span\n' +
    '            class="code-name"><span class="xml"><span class="code-tag"><span\n' +
    '            class="code-name">p</span></span></span></span><span class="xml"><span\n' +
    '            class="code-tag">&gt;</span></span></span><span class="xml">{post.content}</span><span\n' +
    '            class="code-tag"><span class="xml"><span class="code-tag">&lt;/</span></span><span class="code-name"><span\n' +
    '            class="xml"><span class="code-tag"><span class="code-name">p</span></span></span></span><span\n' +
    '            class="xml"><span class="code-tag">&gt;</span></span></span><span class="xml">\n' +
    '    </span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;/</span></span><span\n' +
    '            class="code-name"><span class="xml"><span class="code-tag"><span class="code-name">div</span></span></span></span><span\n' +
    '            class="xml"><span class="code-tag">&gt;</span></span></span></span>\n' +
    '  );\n' +
    '  <span class="code-keyword"><span class="code-keyword">return</span></span> (\n' +
    '    <span class="xml"><span class="code-tag"><span class="xml"><span class="code-tag">&lt;</span></span><span\n' +
    '            class="code-name"><span class="xml"><span class="code-tag"><span class="code-name">div</span></span></span></span><span\n' +
    '            class="xml"><span class="code-tag">&gt;</span></span></span><span class="xml">\n' +
    '      {sidebar}\n' +
    '      </span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;</span></span><span\n' +
    '            class="code-name"><span class="xml"><span class="code-tag"><span\n' +
    '            class="code-name">hr</span></span></span></span><span class="xml"><span\n' +
    '            class="code-tag"> /&gt;</span></span></span><span class="xml">\n' +
    '      {content}\n' +
    '    </span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;/</span></span><span\n' +
    '            class="code-name"><span class="xml"><span class="code-tag"><span class="code-name">div</span></span></span></span><span\n' +
    '            class="xml"><span class="code-tag">&gt;</span></span></span></span>\n' +
    '  );\n' +
    '}\n' +
    '\n' +
    '<span class="code-keyword"><span class="code-keyword">const</span></span> posts = [\n' +
    '  {id: <span class="hljs-number"><span class="hljs-number">1</span></span>, title: <span class="code-string"><span\n' +
    '            class="code-string">\'Hello World\'</span></span>, content: <span class="code-string"><span\n' +
    '            class="code-string">\'Welcome to learning React!\'</span></span>},\n' +
    '  {id: <span class="hljs-number"><span class="hljs-number">2</span></span>, title: <span class="code-string"><span\n' +
    '            class="code-string">\'Installation\'</span></span>, content: <span class="code-string"><span\n' +
    '            class="code-string">\'You can install React from npm.\'</span></span>}\n' +
    '];\n' +
    'ReactDOM.render(\n' +
    '  <span class="xml"><span class="code-tag"><span class="xml"><span class="code-tag">&lt;</span></span><span\n' +
    '          class="code-name"><span class="xml"><span class="code-tag"><span\n' +
    '          class="code-name">Blog</span></span></span></span><span class="xml"><span\n' +
    '          class="code-tag"> </span></span><span class="hljs-attr"><span class="xml"><span class="code-tag"><span\n' +
    '          class="hljs-attr">posts</span></span></span></span><span class="xml"><span\n' +
    '          class="code-tag">=</span></span><span class="code-string"><span class="xml"><span class="code-tag"><span\n' +
    '          class="code-string">{posts}</span></span></span></span><span class="xml"><span class="code-tag"> /&gt;</span></span></span><span\n' +
    '          class="xml">,\n' +
    '  document.getElementById(\'root\')\n' +
    ');</span></span></code></pre>\n' +
    '<p><a title="React列表键值表单示例代码" href="https://codepen.io/gaearon/pen/NRZYGN?editors=0010" rel="nofollow">测试代码</a></p>\n' +
    '<p>在上面的例子中sidebar、content是两个不同的队列，但是使用了相同的key值。</p>\n' +
    '<p>键值虽然显示的设置到元素或组件上，但是并不能在组件内部直接获取，如果需要使用键值，我们需要另外设置：</p>\n' +
    '<pre class="javascript"><code class="language-javascript"><span class="code-keyword"><span\n' +
    '        class="code-keyword">const</span></span> content = posts.map((post) =&gt;\n' +
    '  <span class="xml"><span class="code-tag"><span class="xml"><span class="code-tag">&lt;</span></span><span\n' +
    '          class="code-name"><span class="xml"><span class="code-tag"><span\n' +
    '          class="code-name">Post</span></span></span></span><span class="xml"><span class="code-tag">\n' +
    '    </span></span><span class="hljs-attr"><span class="xml"><span class="code-tag"><span\n' +
    '          class="hljs-attr">key</span></span></span></span><span class="xml"><span class="code-tag">=</span></span><span\n' +
    '          class="code-string"><span class="xml"><span class="code-tag"><span class="code-string">{post.id}</span></span></span></span><span\n' +
    '          class="xml"><span class="code-tag">\n' +
    '    </span></span><span class="hljs-attr"><span class="xml"><span class="code-tag"><span\n' +
    '          class="hljs-attr">id</span></span></span></span><span class="xml"><span class="code-tag">=</span></span><span\n' +
    '          class="code-string"><span class="xml"><span class="code-tag"><span class="code-string">{post.id}</span></span></span></span><span\n' +
    '          class="xml"><span class="code-tag">\n' +
    '    </span></span><span class="hljs-attr"><span class="xml"><span class="code-tag"><span class="hljs-attr">title</span></span></span></span><span\n' +
    '          class="xml"><span class="code-tag">=</span></span><span class="code-string"><span class="xml"><span\n' +
    '          class="code-tag"><span class="code-string">{post.title}</span></span></span></span><span class="xml"><span\n' +
    '          class="code-tag"> /&gt;</span></span></span><span class="xml">\n' +
    ');</span></span></code></pre>\n' +
    '<p>这样，在Post组件中可以通过this.props.id获取到id值，而this.props.key获取不到任何值。</p>\n' +
    '\n' +
    '<h2 id="h2-6">将map()方法嵌入到JSX中</h2>\n' +
    '<p>在下面的例子中，我们直接在map()方法中生成ListItem：</p>\n' +
    '<pre class="javascript"><code class="language-javascript"><span class="hljs-function"><span class="code-keyword"><span\n' +
    '        class="hljs-function"><span class="code-keyword">function</span></span></span><span\n' +
    '        class="hljs-function"> </span><span class="code-title"><span class="hljs-function"><span class="code-title">NumberList</span></span></span><span\n' +
    '        class="hljs-function">(</span><span class="hljs-params"><span class="hljs-function"><span class="hljs-params">props</span></span></span><span\n' +
    '        class="hljs-function">) </span></span>{\n' +
    '  <span class="code-keyword"><span class="code-keyword">const</span></span> numbers = props.numbers;\n' +
    '  <span class="code-keyword"><span class="code-keyword">const</span></span> listItems = numbers.map((number) =&gt;\n' +
    '    <span class="xml"><span class="code-tag"><span class="xml"><span class="code-tag">&lt;</span></span><span\n' +
    '            class="code-name"><span class="xml"><span class="code-tag"><span\n' +
    '            class="code-name">ListItem</span></span></span></span><span class="xml"><span\n' +
    '            class="code-tag"> </span></span><span class="hljs-attr"><span class="xml"><span class="code-tag"><span\n' +
    '            class="hljs-attr">key</span></span></span></span><span class="xml"><span\n' +
    '            class="code-tag">=</span></span><span class="code-string"><span class="xml"><span class="code-tag"><span\n' +
    '            class="code-string">{number.toString()}</span></span></span></span><span class="xml"><span class="code-tag">\n' +
    '              </span></span><span class="hljs-attr"><span class="xml"><span class="code-tag"><span class="hljs-attr">value</span></span></span></span><span\n' +
    '            class="xml"><span class="code-tag">=</span></span><span class="code-string"><span class="xml"><span\n' +
    '            class="code-tag"><span class="code-string">{number}</span></span></span></span><span class="xml"><span\n' +
    '            class="code-tag"> /&gt;</span></span></span><span class="xml">\n' +
    '  );\n' +
    '  return (\n' +
    '    </span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;</span></span><span\n' +
    '            class="code-name"><span class="xml"><span class="code-tag"><span\n' +
    '            class="code-name">ul</span></span></span></span><span class="xml"><span class="code-tag">&gt;</span></span></span><span\n' +
    '            class="xml">\n' +
    '      {listItems}\n' +
    '    </span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;/</span></span><span\n' +
    '            class="code-name"><span class="xml"><span class="code-tag"><span\n' +
    '            class="code-name">ul</span></span></span></span><span class="xml"><span class="code-tag">&gt;</span></span></span><span\n' +
    '            class="xml">\n' +
    '  );\n' +
    '}</span></span></code></pre>\n' +
    '<p>JSX允许在大括号"{}"中嵌入任何表达式，因此我们可以直接嵌入map()方法使用：</p>\n' +
    '<pre class="javascript"><code class="language-javascript"><span class="hljs-function"><span class="code-keyword"><span\n' +
    '        class="hljs-function"><span class="code-keyword">function</span></span></span><span\n' +
    '        class="hljs-function"> </span><span class="code-title"><span class="hljs-function"><span class="code-title">NumberList</span></span></span><span\n' +
    '        class="hljs-function">(</span><span class="hljs-params"><span class="hljs-function"><span class="hljs-params">props</span></span></span><span\n' +
    '        class="hljs-function">) </span></span>{\n' +
    '  <span class="code-keyword"><span class="code-keyword">const</span></span> numbers = props.numbers;\n' +
    '  <span class="code-keyword"><span class="code-keyword">return</span></span> (\n' +
    '    <span class="xml"><span class="code-tag"><span class="xml"><span class="code-tag">&lt;</span></span><span\n' +
    '            class="code-name"><span class="xml"><span class="code-tag"><span\n' +
    '            class="code-name">ul</span></span></span></span><span class="xml"><span class="code-tag">&gt;</span></span></span><span\n' +
    '            class="xml">\n' +
    '      {numbers.map((number) =&gt;\n' +
    '        </span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;</span></span><span\n' +
    '            class="code-name"><span class="xml"><span class="code-tag"><span\n' +
    '            class="code-name">ListItem</span></span></span></span><span class="xml"><span\n' +
    '            class="code-tag"> </span></span><span class="hljs-attr"><span class="xml"><span class="code-tag"><span\n' +
    '            class="hljs-attr">key</span></span></span></span><span class="xml"><span\n' +
    '            class="code-tag">=</span></span><span class="code-string"><span class="xml"><span class="code-tag"><span\n' +
    '            class="code-string">{number.toString()}</span></span></span></span><span class="xml"><span class="code-tag">\n' +
    '                  </span></span><span class="hljs-attr"><span class="xml"><span class="code-tag"><span\n' +
    '            class="hljs-attr">value</span></span></span></span><span class="xml"><span\n' +
    '            class="code-tag">=</span></span><span class="code-string"><span class="xml"><span class="code-tag"><span\n' +
    '            class="code-string">{number}</span></span></span></span><span class="xml"><span\n' +
    '            class="code-tag"> /&gt;</span></span></span><span class="xml">\n' +
    '      )}\n' +
    '    </span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;/</span></span><span\n' +
    '            class="code-name"><span class="xml"><span class="code-tag"><span\n' +
    '            class="code-name">ul</span></span></span></span><span class="xml"><span class="code-tag">&gt;</span></span></span><span\n' +
    '            class="xml">\n' +
    '  );\n' +
    '}</span></span></code></pre>\n' +
    '<p><a title="React列表键值表单示例代码" href="https://codepen.io/gaearon/pen/BLvYrB?editors=0010" rel="nofollow">测试代码</a></p>\n' +
    '\n' +
    '<h1 id="h1-2">表单</h1>\n' +
    '<p>因为表单元素都保持着一些内部状态，所以HTML的表单与React的表单工作方式有一些区别。例如在标准的HTML表单只接收单个名称：</p>\n' +
    '<pre class="xml"><code class="language-html xml"><span class="code-tag"><span class="code-tag">&lt;</span><span\n' +
    '        class="code-name"><span class="code-tag"><span class="code-name">form</span></span></span><span\n' +
    '        class="code-tag">&gt;</span></span>\n' +
    '  <span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span class="code-tag"><span\n' +
    '          class="code-name">label</span></span></span><span class="code-tag">&gt;</span></span>\n' +
    '    Name:\n' +
    '    <span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span class="code-tag"><span\n' +
    '            class="code-name">input</span></span></span><span class="code-tag"> </span><span class="hljs-attr"><span\n' +
    '            class="code-tag"><span class="hljs-attr">type</span></span></span><span class="code-tag">=</span><span\n' +
    '            class="code-string"><span class="code-tag"><span class="code-string">"text"</span></span></span><span\n' +
    '            class="code-tag"> </span><span class="hljs-attr"><span class="code-tag"><span class="hljs-attr">name</span></span></span><span\n' +
    '            class="code-tag">=</span><span class="code-string"><span class="code-tag"><span\n' +
    '            class="code-string">"name"</span></span></span><span class="code-tag"> /&gt;</span></span>\n' +
    '  <span class="code-tag"><span class="code-tag">&lt;/</span><span class="code-name"><span class="code-tag"><span\n' +
    '          class="code-name">label</span></span></span><span class="code-tag">&gt;</span></span>\n' +
    '  <span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span class="code-tag"><span\n' +
    '          class="code-name">input</span></span></span><span class="code-tag"> </span><span class="hljs-attr"><span\n' +
    '          class="code-tag"><span class="hljs-attr">type</span></span></span><span class="code-tag">=</span><span\n' +
    '          class="code-string"><span class="code-tag"><span class="code-string">"submit"</span></span></span><span\n' +
    '          class="code-tag"> </span><span class="hljs-attr"><span class="code-tag"><span\n' +
    '          class="hljs-attr">value</span></span></span><span class="code-tag">=</span><span class="code-string"><span\n' +
    '          class="code-tag"><span class="code-string">"Submit"</span></span></span><span\n' +
    '          class="code-tag"> /&gt;</span></span>\n' +
    '<span class="code-tag"><span class="code-tag">&lt;/</span><span class="code-name"><span class="code-tag"><span\n' +
    '        class="code-name">form</span></span></span><span class="code-tag">&gt;</span></span></code></pre>\n' +
    '<p>\n' +
    '    在用户提交表单时，浏览器默认会跳转到新的页面，当然在默认情况下React中的表单也是这样工作的。但是在大多数情况下，在用户提交数据到后台之前需要使用JavaScript来验证某些数据的合法性。实现这一点的方法我们称之为“controlled\n' +
    '    components（受控组件）”。</p>\n' +
    '\n' +
    '<h2 id="h2-7">受控组件</h2>\n' +
    '<p>在HTML中，<code>&lt;input&gt;</code>,&nbsp;<code>&lt;textarea&gt;</code>, and&nbsp;<code>&lt;select&gt;</code>&nbsp;这些表单元素都包含自己的状态，并在用户输入时发生改变。而在React中，可变的状态通常保存在state属性值中，并且只能通过setState来改变。\n' +
    '</p>\n' +
    '<p>我们使用“受控组件”将2者合并，负责渲染表单的React组件还需要控制用户在渲染完毕后的各种输入操作。看下面这个例子：</p>\n' +
    '<pre class="kotlin"><code class="language-javascript"><span class="hljs-class"><span class="code-keyword"><span\n' +
    '        class="hljs-class"><span class="code-keyword">class</span></span></span><span class="hljs-class"> </span><span\n' +
    '        class="code-title"><span class="hljs-class"><span class="code-title">NameForm</span></span></span><span\n' +
    '        class="hljs-class"> </span><span class="code-keyword"><span class="hljs-class"><span\n' +
    '        class="code-title">extends</span></span></span><span class="hljs-class"> </span><span class="code-title"><span\n' +
    '        class="hljs-class"><span class="code-title">React</span></span></span><span class="hljs-class">.</span><span\n' +
    '        class="code-title"><span class="hljs-class"><span class="code-title">Component</span></span></span><span\n' +
    '        class="hljs-class"> </span></span>{\n' +
    '  <span class="code-keyword"><span class="code-keyword">constructor</span></span>(props) {\n' +
    '    <span class="code-keyword"><span class="code-keyword">super</span></span>(props);\n' +
    '    <span class="code-keyword"><span class="code-keyword">this</span></span>.state = {value: <span\n' +
    '            class="code-string"><span class="code-string">\'\'</span></span>};\n' +
    '\n' +
    '    <span class="code-keyword"><span class="code-keyword">this</span></span>.handleChange = <span\n' +
    '            class="code-keyword"><span class="code-keyword">this</span></span>.handleChange.bind(<span\n' +
    '            class="code-keyword"><span class="code-keyword">this</span></span>);\n' +
    '    <span class="code-keyword"><span class="code-keyword">this</span></span>.handleSubmit = <span\n' +
    '            class="code-keyword"><span class="code-keyword">this</span></span>.handleSubmit.bind(<span\n' +
    '            class="code-keyword"><span class="code-keyword">this</span></span>);\n' +
    '  }\n' +
    '\n' +
    '  handleChange(event) {\n' +
    '    <span class="code-keyword"><span class="code-keyword">this</span></span>.setState({value: event.target.value});\n' +
    '  }\n' +
    '\n' +
    '  handleSubmit(event) {\n' +
    '    alert(<span class="code-string"><span class="code-string">\'A name was submitted: \'</span></span> + <span\n' +
    '            class="code-keyword"><span class="code-keyword">this</span></span>.state.value);\n' +
    '    event.preventDefault();\n' +
    '  }\n' +
    '\n' +
    '  render() {\n' +
    '    <span class="code-keyword"><span class="code-keyword">return</span></span> (\n' +
    '      &lt;form onSubmit={<span class="code-keyword">this</span>.handleSubmit}&gt;\n' +
    '        &lt;label&gt;\n' +
    '          Name:\n' +
    '          &lt;input type=<span class="code-string">"text"</span> value={<span class="code-keyword">this</span>.state.value} onChange={<span\n' +
    '            class="code-keyword">this</span>.handleChange} /&gt;\n' +
    '        &lt;/label&gt;\n' +
    '        &lt;input type=<span class="code-string">"submit"</span> value=<span class="code-string">"Submit"</span> /&gt;\n' +
    '      &lt;/form&gt;\n' +
    '    );\n' +
    '  }\n' +
    '}</code></pre>\n' +
    '<p><a title="React列表键值表单示例代码" href="https://codepen.io/gaearon/pen/VmmPgp?editors=0010" rel="nofollow">测试代码</a></p>\n' +
    '<p>\n' +
    '    例子中通过在onChange中注册this.handleChange方法来记录值的改变，在改变时会通过setState()设置this.state值，并使用render渲染。此外，组件还用this.handleSubmit来拦截提交事件。这个例子中的组件称之为"受控组件"。</p>\n' +
    '<p>在受控组件中，每一个状态值的改变都会有一个相关处理函数来处理，这样可以直接修改或验证用户的输入。例如下面这个例子，我们将所有的输入强行变成大写：</p>\n' +
    '<pre class="cs"><code class="language-javascript">handleChange(<span class="code-keyword">event</span>) {\n' +
    '  <span class="code-keyword"><span class="code-keyword">this</span></span>.setState({<span\n' +
    '            class="code-keyword">value</span>: <span class="code-keyword">event</span>.target.<span\n' +
    '            class="code-keyword">value</span>.toUpperCase()});\n' +
    '}</code></pre>\n' +
    '\n' +
    '<h2 id="h2-8">textarea标签</h2>\n' +
    '<p>在HTML中，&lt;textarea&gt;由其子元素来定义文本：</p>\n' +
    '<pre class="kotlin"><code class="language-javascript">&lt;textarea&gt;\n' +
    '  Hello there, <span class="code-keyword"><span class="code-keyword">this</span></span> <span\n' +
    '            class="code-keyword">is</span> some text <span class="code-keyword"><span\n' +
    '            class="code-keyword">in</span></span> a text area\n' +
    '&lt;<span class="hljs-regexp">/textarea&gt;</span></code></pre>\n' +
    '<p>在React中，&lt;textarea&gt;使用一个value属性来代替子元素。这样使用&lt;textarea&gt;标签与使用单行输入元素（&lt;input type="text"&gt;）类似：</p>\n' +
    '<pre class="kotlin"><code class="language-javascript"><span class="hljs-class"><span class="code-keyword"><span\n' +
    '        class="hljs-class"><span class="code-keyword">class</span></span></span><span class="hljs-class"> </span><span\n' +
    '        class="code-title"><span class="hljs-class"><span class="code-title">EssayForm</span></span></span><span\n' +
    '        class="hljs-class"> </span><span class="code-keyword"><span class="hljs-class"><span\n' +
    '        class="code-title">extends</span></span></span><span class="hljs-class"> </span><span class="code-title"><span\n' +
    '        class="hljs-class"><span class="code-title">React</span></span></span><span class="hljs-class">.</span><span\n' +
    '        class="code-title"><span class="hljs-class"><span class="code-title">Component</span></span></span><span\n' +
    '        class="hljs-class"> </span></span>{\n' +
    '  <span class="code-keyword"><span class="code-keyword">constructor</span></span>(props) {\n' +
    '    <span class="code-keyword"><span class="code-keyword">super</span></span>(props);\n' +
    '    <span class="code-keyword"><span class="code-keyword">this</span></span>.state = {\n' +
    '      value: <span class="code-string"><span class="code-string">\'Please write an essay about your favorite DOM element.\'</span></span>\n' +
    '    };\n' +
    '\n' +
    '    <span class="code-keyword"><span class="code-keyword">this</span></span>.handleChange = <span\n' +
    '            class="code-keyword"><span class="code-keyword">this</span></span>.handleChange.bind(<span\n' +
    '            class="code-keyword"><span class="code-keyword">this</span></span>);\n' +
    '    <span class="code-keyword"><span class="code-keyword">this</span></span>.handleSubmit = <span\n' +
    '            class="code-keyword"><span class="code-keyword">this</span></span>.handleSubmit.bind(<span\n' +
    '            class="code-keyword"><span class="code-keyword">this</span></span>);\n' +
    '  }\n' +
    '\n' +
    '  handleChange(event) {\n' +
    '    <span class="code-keyword"><span class="code-keyword">this</span></span>.setState({value: event.target.value});\n' +
    '  }\n' +
    '\n' +
    '  handleSubmit(event) {\n' +
    '    alert(<span class="code-string"><span class="code-string">\'An essay was submitted: \'</span></span> + <span\n' +
    '            class="code-keyword"><span class="code-keyword">this</span></span>.state.value);\n' +
    '    event.preventDefault();\n' +
    '  }\n' +
    '\n' +
    '  render() {\n' +
    '    <span class="code-keyword"><span class="code-keyword">return</span></span> (\n' +
    '      &lt;form onSubmit={<span class="code-keyword">this</span>.handleSubmit}&gt;\n' +
    '        &lt;label&gt;\n' +
    '          Name:\n' +
    '          &lt;textarea value={<span class="code-keyword">this</span>.state.value} onChange={<span class="code-keyword">this</span>.handleChange} /&gt;\n' +
    '        &lt;/label&gt;\n' +
    '        &lt;input type=<span class="code-string">"submit"</span> value=<span class="code-string">"Submit"</span> /&gt;\n' +
    '      &lt;/form&gt;\n' +
    '    );\n' +
    '  }\n' +
    '}</code></pre>\n' +
    '<p>在这里例子中，在构造函数就初始化了this.state.value。因此&lt;textarea&gt;会显示一个初始值。</p>\n' +
    '\n' +
    '<h2 id="h2-9">select标签</h2>\n' +
    '<p>在HTML中，select会创建一个下拉菜单，例如：</p>\n' +
    '<pre class="xml"><code class="language-html xml"><span class="code-tag"><span class="code-tag">&lt;</span><span\n' +
    '        class="code-name"><span class="code-tag"><span class="code-name">select</span></span></span><span\n' +
    '        class="code-tag">&gt;</span></span>\n' +
    '  <span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span class="code-tag"><span\n' +
    '          class="code-name">option</span></span></span><span class="code-tag"> </span><span class="hljs-attr"><span\n' +
    '          class="code-tag"><span class="hljs-attr">value</span></span></span><span class="code-tag">=</span><span\n' +
    '          class="code-string"><span class="code-tag"><span class="code-string">"grapefruit"</span></span></span><span\n' +
    '          class="code-tag">&gt;</span></span>Grapefruit<span class="code-tag"><span class="code-tag">&lt;/</span><span\n' +
    '            class="code-name"><span class="code-tag"><span class="code-name">option</span></span></span><span\n' +
    '            class="code-tag">&gt;</span></span>\n' +
    '  <span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span class="code-tag"><span\n' +
    '          class="code-name">option</span></span></span><span class="code-tag"> </span><span class="hljs-attr"><span\n' +
    '          class="code-tag"><span class="hljs-attr">value</span></span></span><span class="code-tag">=</span><span\n' +
    '          class="code-string"><span class="code-tag"><span class="code-string">"lime"</span></span></span><span\n' +
    '          class="code-tag">&gt;</span></span>Lime<span class="code-tag"><span class="code-tag">&lt;/</span><span\n' +
    '            class="code-name"><span class="code-tag"><span class="code-name">option</span></span></span><span\n' +
    '            class="code-tag">&gt;</span></span>\n' +
    '  <span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span class="code-tag"><span\n' +
    '          class="code-name">option</span></span></span><span class="code-tag"> </span><span class="hljs-attr"><span\n' +
    '          class="code-tag"><span class="hljs-attr">selected</span></span></span><span class="code-tag"> </span><span\n' +
    '          class="hljs-attr"><span class="code-tag"><span class="hljs-attr">value</span></span></span><span\n' +
    '          class="code-tag">=</span><span class="code-string"><span class="code-tag"><span\n' +
    '          class="code-string">"coconut"</span></span></span><span class="code-tag">&gt;</span></span>Coconut<span\n' +
    '            class="code-tag"><span class="code-tag">&lt;/</span><span class="code-name"><span class="code-tag"><span\n' +
    '            class="code-name">option</span></span></span><span class="code-tag">&gt;</span></span>\n' +
    '  <span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span class="code-tag"><span\n' +
    '          class="code-name">option</span></span></span><span class="code-tag"> </span><span class="hljs-attr"><span\n' +
    '          class="code-tag"><span class="hljs-attr">value</span></span></span><span class="code-tag">=</span><span\n' +
    '          class="code-string"><span class="code-tag"><span class="code-string">"mango"</span></span></span><span\n' +
    '          class="code-tag">&gt;</span></span>Mango<span class="code-tag"><span class="code-tag">&lt;/</span><span\n' +
    '            class="code-name"><span class="code-tag"><span class="code-name">option</span></span></span><span\n' +
    '            class="code-tag">&gt;</span></span>\n' +
    '<span class="code-tag"><span class="code-tag">&lt;/</span><span class="code-name"><span class="code-tag"><span\n' +
    '        class="code-name">select</span></span></span><span class="code-tag">&gt;</span></span></code></pre>\n' +
    '<p>由于"cocount"设置了selected属性，所以默认状态下这个&lt;option&gt;是被选中的。在React中，&lt;select&gt;元素使用value元素来设定这个默认值，这在受控组件中使用更方便，因为只需要在一个地方更新它：</p>\n' +
    '<pre class="javascript"><code class="language-javascript"><span class="hljs-class"><span class="code-keyword"><span\n' +
    '        class="hljs-class"><span class="code-keyword">class</span></span></span><span class="hljs-class"> </span><span\n' +
    '        class="code-title"><span class="hljs-class"><span class="code-title">FlavorForm</span></span></span><span\n' +
    '        class="hljs-class"> </span><span class="code-keyword"><span class="hljs-class"><span class="code-keyword">extends</span></span></span><span\n' +
    '        class="hljs-class"> </span><span class="code-title"><span class="hljs-class"><span\n' +
    '        class="code-title">React</span></span></span><span class="hljs-class">.</span><span class="code-title"><span\n' +
    '        class="hljs-class"><span class="code-title">Component</span></span></span><span\n' +
    '        class="hljs-class"> </span></span>{\n' +
    '  <span class="code-keyword"><span class="code-keyword">constructor</span></span>(props) {\n' +
    '    <span class="code-keyword"><span class="code-keyword">super</span></span>(props);\n' +
    '    <span class="code-keyword"><span class="code-keyword">this</span></span>.state = {value: <span\n' +
    '            class="code-string"><span class="code-string">\'coconut\'</span></span>};\n' +
    '\n' +
    '    <span class="code-keyword"><span class="code-keyword">this</span></span>.handleChange = <span\n' +
    '            class="code-keyword"><span class="code-keyword">this</span></span>.handleChange.bind(<span\n' +
    '            class="code-keyword"><span class="code-keyword">this</span></span>);\n' +
    '    <span class="code-keyword"><span class="code-keyword">this</span></span>.handleSubmit = <span\n' +
    '            class="code-keyword"><span class="code-keyword">this</span></span>.handleSubmit.bind(<span\n' +
    '            class="code-keyword"><span class="code-keyword">this</span></span>);\n' +
    '  }\n' +
    '\n' +
    '  handleChange(event) {\n' +
    '    <span class="code-keyword"><span class="code-keyword">this</span></span>.setState({value: event.target.value});\n' +
    '  }\n' +
    '\n' +
    '  handleSubmit(event) {\n' +
    '    alert(<span class="code-string"><span class="code-string">\'Your favorite flavor is: \'</span></span> + <span\n' +
    '            class="code-keyword"><span class="code-keyword">this</span></span>.state.value);\n' +
    '    event.preventDefault();\n' +
    '  }\n' +
    '\n' +
    '  render() {\n' +
    '    <span class="code-keyword"><span class="code-keyword">return</span></span> (\n' +
    '      <span class="xml"><span class="code-tag"><span class="xml"><span class="code-tag">&lt;</span></span><span\n' +
    '              class="code-name"><span class="xml"><span class="code-tag"><span\n' +
    '              class="code-name">form</span></span></span></span><span class="xml"><span class="code-tag"> </span></span><span\n' +
    '              class="hljs-attr"><span class="xml"><span class="code-tag"><span class="hljs-attr">onSubmit</span></span></span></span><span\n' +
    '              class="xml"><span class="code-tag">=</span></span><span class="code-string"><span class="xml"><span\n' +
    '              class="code-tag"><span class="code-string">{this.handleSubmit}</span></span></span></span><span\n' +
    '              class="xml"><span class="code-tag">&gt;</span></span></span><span class="xml">\n' +
    '        </span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;</span></span><span\n' +
    '              class="code-name"><span class="xml"><span class="code-tag"><span\n' +
    '              class="code-name">label</span></span></span></span><span class="xml"><span\n' +
    '              class="code-tag">&gt;</span></span></span><span class="xml">\n' +
    '          Pick your favorite La Croix flavor:\n' +
    '          </span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;</span></span><span\n' +
    '              class="code-name"><span class="xml"><span class="code-tag"><span\n' +
    '              class="code-name">select</span></span></span></span><span class="xml"><span\n' +
    '              class="code-tag"> </span></span><span class="hljs-attr"><span class="xml"><span class="code-tag"><span\n' +
    '              class="hljs-attr">value</span></span></span></span><span class="xml"><span\n' +
    '              class="code-tag">=</span></span><span class="code-string"><span class="xml"><span class="code-tag"><span\n' +
    '              class="code-string">{this.state.value}</span></span></span></span><span class="xml"><span\n' +
    '              class="code-tag"> </span></span><span class="hljs-attr"><span class="xml"><span class="code-tag"><span\n' +
    '              class="hljs-attr">onChange</span></span></span></span><span class="xml"><span\n' +
    '              class="code-tag">=</span></span><span class="code-string"><span class="xml"><span class="code-tag"><span\n' +
    '              class="code-string">{this.handleChange}</span></span></span></span><span class="xml"><span\n' +
    '              class="code-tag">&gt;</span></span></span><span class="xml">\n' +
    '            </span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;</span></span><span\n' +
    '              class="code-name"><span class="xml"><span class="code-tag"><span\n' +
    '              class="code-name">option</span></span></span></span><span class="xml"><span\n' +
    '              class="code-tag"> </span></span><span class="hljs-attr"><span class="xml"><span class="code-tag"><span\n' +
    '              class="hljs-attr">value</span></span></span></span><span class="xml"><span\n' +
    '              class="code-tag">=</span></span><span class="code-string"><span class="xml"><span class="code-tag"><span\n' +
    '              class="code-string">"grapefruit"</span></span></span></span><span class="xml"><span\n' +
    '              class="code-tag">&gt;</span></span></span><span class="xml">Grapefruit</span><span class="code-tag"><span\n' +
    '              class="xml"><span class="code-tag">&lt;/</span></span><span class="code-name"><span class="xml"><span\n' +
    '              class="code-tag"><span class="code-name">option</span></span></span></span><span class="xml"><span\n' +
    '              class="code-tag">&gt;</span></span></span><span class="xml">\n' +
    '            </span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;</span></span><span\n' +
    '              class="code-name"><span class="xml"><span class="code-tag"><span\n' +
    '              class="code-name">option</span></span></span></span><span class="xml"><span\n' +
    '              class="code-tag"> </span></span><span class="hljs-attr"><span class="xml"><span class="code-tag"><span\n' +
    '              class="hljs-attr">value</span></span></span></span><span class="xml"><span\n' +
    '              class="code-tag">=</span></span><span class="code-string"><span class="xml"><span class="code-tag"><span\n' +
    '              class="code-string">"lime"</span></span></span></span><span class="xml"><span class="code-tag">&gt;</span></span></span><span\n' +
    '              class="xml">Lime</span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;/</span></span><span\n' +
    '              class="code-name"><span class="xml"><span class="code-tag"><span\n' +
    '              class="code-name">option</span></span></span></span><span class="xml"><span\n' +
    '              class="code-tag">&gt;</span></span></span><span class="xml">\n' +
    '            </span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;</span></span><span\n' +
    '              class="code-name"><span class="xml"><span class="code-tag"><span\n' +
    '              class="code-name">option</span></span></span></span><span class="xml"><span\n' +
    '              class="code-tag"> </span></span><span class="hljs-attr"><span class="xml"><span class="code-tag"><span\n' +
    '              class="hljs-attr">value</span></span></span></span><span class="xml"><span\n' +
    '              class="code-tag">=</span></span><span class="code-string"><span class="xml"><span class="code-tag"><span\n' +
    '              class="code-string">"coconut"</span></span></span></span><span class="xml"><span\n' +
    '              class="code-tag">&gt;</span></span></span><span class="xml">Coconut</span><span class="code-tag"><span\n' +
    '              class="xml"><span class="code-tag">&lt;/</span></span><span class="code-name"><span class="xml"><span\n' +
    '              class="code-tag"><span class="code-name">option</span></span></span></span><span class="xml"><span\n' +
    '              class="code-tag">&gt;</span></span></span><span class="xml">\n' +
    '            </span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;</span></span><span\n' +
    '              class="code-name"><span class="xml"><span class="code-tag"><span\n' +
    '              class="code-name">option</span></span></span></span><span class="xml"><span\n' +
    '              class="code-tag"> </span></span><span class="hljs-attr"><span class="xml"><span class="code-tag"><span\n' +
    '              class="hljs-attr">value</span></span></span></span><span class="xml"><span\n' +
    '              class="code-tag">=</span></span><span class="code-string"><span class="xml"><span class="code-tag"><span\n' +
    '              class="code-string">"mango"</span></span></span></span><span class="xml"><span\n' +
    '              class="code-tag">&gt;</span></span></span><span class="xml">Mango</span><span class="code-tag"><span\n' +
    '              class="xml"><span class="code-tag">&lt;/</span></span><span class="code-name"><span class="xml"><span\n' +
    '              class="code-tag"><span class="code-name">option</span></span></span></span><span class="xml"><span\n' +
    '              class="code-tag">&gt;</span></span></span><span class="xml">\n' +
    '          </span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;/</span></span><span\n' +
    '              class="code-name"><span class="xml"><span class="code-tag"><span\n' +
    '              class="code-name">select</span></span></span></span><span class="xml"><span\n' +
    '              class="code-tag">&gt;</span></span></span><span class="xml">\n' +
    '        </span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;/</span></span><span\n' +
    '              class="code-name"><span class="xml"><span class="code-tag"><span\n' +
    '              class="code-name">label</span></span></span></span><span class="xml"><span\n' +
    '              class="code-tag">&gt;</span></span></span><span class="xml">\n' +
    '        </span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;</span></span><span\n' +
    '              class="code-name"><span class="xml"><span class="code-tag"><span\n' +
    '              class="code-name">input</span></span></span></span><span class="xml"><span\n' +
    '              class="code-tag"> </span></span><span class="hljs-attr"><span class="xml"><span class="code-tag"><span\n' +
    '              class="hljs-attr">type</span></span></span></span><span class="xml"><span class="code-tag">=</span></span><span\n' +
    '              class="code-string"><span class="xml"><span class="code-tag"><span\n' +
    '              class="code-string">"submit"</span></span></span></span><span class="xml"><span class="code-tag"> </span></span><span\n' +
    '              class="hljs-attr"><span class="xml"><span class="code-tag"><span\n' +
    '              class="hljs-attr">value</span></span></span></span><span class="xml"><span\n' +
    '              class="code-tag">=</span></span><span class="code-string"><span class="xml"><span class="code-tag"><span\n' +
    '              class="code-string">"Submit"</span></span></span></span><span class="xml"><span\n' +
    '              class="code-tag"> /&gt;</span></span></span><span class="xml">\n' +
    '      </span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;/</span></span><span class="code-name"><span\n' +
    '              class="xml"><span class="code-tag"><span class="code-name">form</span></span></span></span><span\n' +
    '              class="xml"><span class="code-tag">&gt;</span></span></span><span class="xml">\n' +
    '    );\n' +
    '  }\n' +
    '}</span></span></code></pre>\n' +
    '<p><a title="React列表键值表单示例代码" href="https://codepen.io/gaearon/pen/JbbEzX?editors=0010" rel="nofollow">测试代码</a></p>\n' +
    '\n' +
    '<h2 id="h2-10">受控组件的替代方案</h2>\n' +
    '<p>在某些情况下使用受控组件会非常的繁琐，因为它针对所有的变更都需要编写一个处理器来管理对应的状态。React官网推荐使用"非受控组件"技术来解决这个问题，详情请参阅官网：<a\n' +
    '        href="https://facebook.github.io/react/docs/uncontrolled-components.html" rel="nofollow">uncontrolled\n' +
    '    components</a>，它是用于实现输入表单的替代技术。</p>\n';