exports.ids=[70],exports.modules={325:function(s,a,n){"use strict";Object.defineProperty(a,"__esModule",{value:!0});a.content='<p>\n    React提供了一系列声明性的API接口，因此在使用时不必担心每次库的更新会修改API接口。这样可以降低编写应用的复杂度，但是带来的问题是无法很好的理解React是如何实现这些功能的。这篇文章会介绍React的差异比对算法——“融合算法”是如何执行的。</p>\n\n<h2 id="h2-1">差异匹配算法实现的前提</h2>\n<p>我们先来看看第一个值得关注的我问题：&nbsp;<code>render()</code>&nbsp;方法的作用是创建React元素的树形结构，当state或props发生更新后，&nbsp;<code>render()</code>&nbsp;会返回一个与之前有差异的结构树。在这个机制下，React需要弄清楚如何匹配最近的树并有效的更新UI。\n</p>\n<p>针对以上问题，有一些通用的算法可供参考，比如比对2颗树的差异，在前一个颗树的基础上生成最小操作树，但是这个算法的时间复杂度为n的三次方=O(n*n*n)，当树的节点较多时，这个算法的时间代价会导致算法几乎无法工作。</p>\n<p>\n    假设在我们使用React时，一共使用了1000个Dom标签元素，那么使用上面的算法，我们要比对数亿次才能得到比对的结果，根本不可能在一个浏览器中短时间完成。React实现了一个计算复杂度是O(n)的算法来解决这个问题，这个算法基于2个假设：</p>\n<ol>\n    <li>不同类型的2个标签元素产生不同的树。</li>\n    <li>开发人员可以为不同的子节点在渲染之前设定一个“key”属性值。</li>\n</ol>\n\n<h2 id="h2-2">差异算法</h2>\n<p>对于2颗有差异的树，React首先比对2颗树的根节点。根据跟节点的类型是否相同，算法接下来会执行不同的操作。</p>\n\n<h2 id="h2-3">Types不一样</h2>\n<p>\n    一旦2棵树之间的根元素类型不一样，React会直接移除旧的树并构建出新的树。例如从&nbsp;<code>&lt;a&gt;</code>&nbsp;变更为&nbsp;<code>&lt;img&gt;</code>、&nbsp;<code>&lt;Article&gt;</code>&nbsp;变更为&nbsp;<code>&lt;Comment&gt;</code>、&nbsp;<code>&lt;Button&gt;</code>&nbsp;变更为&nbsp;<code>&lt;div&gt;</code>&nbsp;，所有的这些变化都会导致整颗树重构。\n</p>\n<p>重构一棵新的树时，所有的旧节点都会移除。组件的<code>componentWillUnmount()</code>方法会被调用。&nbsp;然后到构建完成之后新的Dom会替换原来的Dom。此时组件的<code>componentWillMount()</code>和<code>componentDidMount()</code>会依次被调用。旧树Dom上的所有状态都会丢失。\n</p>\n<p>根据这个特性，根节点之后的所有组件都会卸载并重建，状态也会随之改变。例如下面2个组件对比：</p>\n<pre class="xml"><code class="language-html xml"><span class="code-tag"><span class="code-tag">&lt;</span><span\n        class="code-name"><span class="code-tag"><span class="code-name">div</span></span></span><span class="code-tag">&gt;</span></span>\n  <span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span class="code-tag"><span\n          class="code-name">Counter</span></span></span><span class="code-tag"> /&gt;</span></span>\n<span class="code-tag"><span class="code-tag">&lt;/</span><span class="code-name"><span class="code-tag"><span\n        class="code-name">div</span></span></span><span class="code-tag">&gt;</span></span>\n\n<span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span class="code-tag"><span\n        class="code-name">span</span></span></span><span class="code-tag">&gt;</span></span>\n  <span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span class="code-tag"><span\n          class="code-name">Counter</span></span></span><span class="code-tag"> /&gt;</span></span>\n<span class="code-tag"><span class="code-tag">&lt;/</span><span class="code-name"><span class="code-tag"><span\n        class="code-name">span</span></span></span><span class="code-tag">&gt;</span></span></code></pre>\n<p><code>Counter</code>&nbsp;组件会被销毁并重新安装一个新的组件。</p>\n\n<h2 id="h2-4">Dom元素拥有相同的类型</h2>\n<p>当比较React元素为相同类型时，React会查看元素上的属性来比对。比对之后，React会保持的Dom节点不改变然后仅仅更新不同的属性值，例如：</p>\n<pre class="xml"><code class="language-html xml"><span class="code-tag"><span class="code-tag">&lt;</span><span\n        class="code-name"><span class="code-tag"><span class="code-name">div</span></span></span><span\n        class="code-tag"> </span><span class="hljs-attr"><span class="code-tag"><span class="hljs-attr">className</span></span></span><span\n        class="code-tag">=</span><span class="code-string"><span class="code-tag"><span\n        class="code-string">"before"</span></span></span><span class="code-tag"> </span><span class="hljs-attr"><span\n        class="code-tag"><span class="hljs-attr">title</span></span></span><span class="code-tag">=</span><span\n        class="code-string"><span class="code-tag"><span class="code-string">"stuff"</span></span></span><span\n        class="code-tag"> /&gt;</span></span>\n\n<span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span class="code-tag"><span\n        class="code-name">div</span></span></span><span class="code-tag"> </span><span class="hljs-attr"><span\n        class="code-tag"><span class="hljs-attr">className</span></span></span><span class="code-tag">=</span><span\n        class="code-string"><span class="code-tag"><span class="code-string">"after"</span></span></span><span\n        class="code-tag"> </span><span class="hljs-attr"><span class="code-tag"><span\n        class="hljs-attr">title</span></span></span><span class="code-tag">=</span><span class="code-string"><span\n        class="code-tag"><span class="code-string">"stuff"</span></span></span><span\n        class="code-tag"> /&gt;</span></span></code></pre>\n<p>在比对这2个元素之后，React知道仅仅需要修改当前Dom的<code>className</code>。在更新<code>style</code>时，React同样知道仅仅需要更新修改部分即可。例如：</p>\n<pre class="groovy"><code class="language-html xml"><span class="code-tag">&lt;<span class="code-name">div</span> <span\n        class="hljs-attr">style</span>=<span class="code-string">{{<span class="code-string">color:</span></span> <span\n        class="code-string">\'</span><span class="hljs-attr"><span class="code-string">red</span></span><span\n        class="code-string">\'</span>, <span class="hljs-attr"><span class="code-string">fontWeight:</span></span> <span\n        class="code-string">\'</span><span class="hljs-attr"><span class="code-string">bold</span></span><span\n        class="code-string">\'</span>}} /&gt;</span>\n\n<span class="code-tag">&lt;<span class="code-name">div</span> <span class="hljs-attr">style</span>=<span\n        class="code-string">{{<span class="code-string">color:</span></span> <span class="code-string">\'</span><span\n        class="hljs-attr"><span class="code-string">green</span></span><span class="code-string">\'</span>, <span\n        class="hljs-attr"><span class="code-string">fontWeight:</span></span> <span class="code-string">\'</span><span\n        class="hljs-attr"><span class="code-string">bold</span></span><span class="code-string">\'</span>}} /&gt;</span></code></pre>\n<p>在转换这2个组件时，React知道仅仅需要修改color的样式，而fontWeight不必发生变动。</p>\n<p>在处理完当前Dom节点后，React依次对子节点进行递归。</p>\n\n<h2 id="h2-5">组件元素拥有相同的类型</h2>\n<p>当一个组件发生更新后，实例依然是原来的实例，所以状态还是以前的状态。React通过属性值（props）的更新来影响需要更新组件，此时组件实例的&nbsp;<code>componentWillReceiveProps()</code>&nbsp;和&nbsp;<code>componentWillUpdate()</code>&nbsp;方法会被调用。\n</p>\n<p>然后，&nbsp;<code>render()</code>&nbsp;方法会被调用并返回一个Dom，差异算法会递归比对之前返回Dom的差异。</p>\n\n<h2 id="h2-6">递归子元素</h2>\n<p>默认情况下，在递归子元素的Dom节点时，React同时对2个子元素列表进行迭代比对，如果发现差异都会产生一个突变（<a title="React性能优化"\n                                                               href="https://www.chkui.com/article/react/react_optimizing_performance"\n                                                               rel="nofollow">关于突变的概念请见React学习第六篇性能优化介绍不可变数据结构部分</a>）。\n</p>\n<p>例如，当增加一个元素在子元素的队尾，这2颗树的转换效率很高：</p>\n<pre class="xml"><code class="language-html xml"><span class="code-tag"><span class="code-tag">&lt;</span><span\n        class="code-name"><span class="code-tag"><span class="code-name">ul</span></span></span><span class="code-tag">&gt;</span></span>\n  <span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span class="code-tag"><span\n          class="code-name">li</span></span></span><span class="code-tag">&gt;</span></span>first<span class="code-tag"><span\n            class="code-tag">&lt;/</span><span class="code-name"><span class="code-tag"><span\n            class="code-name">li</span></span></span><span class="code-tag">&gt;</span></span>\n  <span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span class="code-tag"><span\n          class="code-name">li</span></span></span><span class="code-tag">&gt;</span></span>second<span\n            class="code-tag"><span class="code-tag">&lt;/</span><span class="code-name"><span class="code-tag"><span\n            class="code-name">li</span></span></span><span class="code-tag">&gt;</span></span>\n<span class="code-tag"><span class="code-tag">&lt;/</span><span class="code-name"><span class="code-tag"><span\n        class="code-name">ul</span></span></span><span class="code-tag">&gt;</span></span>\n\n<span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span class="code-tag"><span\n        class="code-name">ul</span></span></span><span class="code-tag">&gt;</span></span>\n  <span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span class="code-tag"><span\n          class="code-name">li</span></span></span><span class="code-tag">&gt;</span></span>first<span class="code-tag"><span\n            class="code-tag">&lt;/</span><span class="code-name"><span class="code-tag"><span\n            class="code-name">li</span></span></span><span class="code-tag">&gt;</span></span>\n  <span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span class="code-tag"><span\n          class="code-name">li</span></span></span><span class="code-tag">&gt;</span></span>second<span\n            class="code-tag"><span class="code-tag">&lt;/</span><span class="code-name"><span class="code-tag"><span\n            class="code-name">li</span></span></span><span class="code-tag">&gt;</span></span>\n  <span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span class="code-tag"><span\n          class="code-name">li</span></span></span><span class="code-tag">&gt;</span></span>third<span class="code-tag"><span\n            class="code-tag">&lt;/</span><span class="code-name"><span class="code-tag"><span\n            class="code-name">li</span></span></span><span class="code-tag">&gt;</span></span>\n<span class="code-tag"><span class="code-tag">&lt;/</span><span class="code-name"><span class="code-tag"><span\n        class="code-name">ul</span></span></span><span class="code-tag">&gt;</span></span></code></pre>\n<p>React先匹配&nbsp;<code>&lt;li&gt;first&lt;/li&gt;</code>&nbsp;2棵树，然后再匹配&nbsp;<code>&lt;li&gt;second&lt;/li&gt;</code>&nbsp;。最后直接就添加&nbsp;<code>&lt;li&gt;third&lt;/li&gt;</code>&nbsp;节点。\n</p>\n<p>如果代码按下面的方式修改2颗树，执行的效率相对较差：</p>\n<pre class="xml"><code class="language-html xml"><span class="code-tag"><span class="code-tag">&lt;</span><span\n        class="code-name"><span class="code-tag"><span class="code-name">ul</span></span></span><span class="code-tag">&gt;</span></span>\n  <span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span class="code-tag"><span\n          class="code-name">li</span></span></span><span class="code-tag">&gt;</span></span>Duke<span\n            class="code-tag"><span class="code-tag">&lt;/</span><span class="code-name"><span class="code-tag"><span\n            class="code-name">li</span></span></span><span class="code-tag">&gt;</span></span>\n  <span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span class="code-tag"><span\n          class="code-name">li</span></span></span><span class="code-tag">&gt;</span></span>Villanova<span\n            class="code-tag"><span class="code-tag">&lt;/</span><span class="code-name"><span class="code-tag"><span\n            class="code-name">li</span></span></span><span class="code-tag">&gt;</span></span>\n<span class="code-tag"><span class="code-tag">&lt;/</span><span class="code-name"><span class="code-tag"><span\n        class="code-name">ul</span></span></span><span class="code-tag">&gt;</span></span>\n\n<span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span class="code-tag"><span\n        class="code-name">ul</span></span></span><span class="code-tag">&gt;</span></span>\n  <span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span class="code-tag"><span\n          class="code-name">li</span></span></span><span class="code-tag">&gt;</span></span>Connecticut<span\n            class="code-tag"><span class="code-tag">&lt;/</span><span class="code-name"><span class="code-tag"><span\n            class="code-name">li</span></span></span><span class="code-tag">&gt;</span></span>\n  <span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span class="code-tag"><span\n          class="code-name">li</span></span></span><span class="code-tag">&gt;</span></span>Duke<span\n            class="code-tag"><span class="code-tag">&lt;/</span><span class="code-name"><span class="code-tag"><span\n            class="code-name">li</span></span></span><span class="code-tag">&gt;</span></span>\n  <span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span class="code-tag"><span\n          class="code-name">li</span></span></span><span class="code-tag">&gt;</span></span>Villanova<span\n            class="code-tag"><span class="code-tag">&lt;/</span><span class="code-name"><span class="code-tag"><span\n            class="code-name">li</span></span></span><span class="code-tag">&gt;</span></span>\n<span class="code-tag"><span class="code-tag">&lt;/</span><span class="code-name"><span class="code-tag"><span\n        class="code-name">ul</span></span></span><span class="code-tag">&gt;</span></span></code></pre>\n<p>\n    React会突变修改所有的子节点，最终&nbsp;<code>&lt;li&gt;Duke&lt;/li&gt;</code>&nbsp;and&nbsp;<code>&lt;li&gt;Villanova&lt;/li&gt;</code>&nbsp;会被重新渲染。所以这种方式会带来很大的效率问题。\n</p>\n\n<h2 id="h2-7">Keys</h2>\n<p>为了解决上面的问题，React提供了一个“key”属性。当所有的子元素都有一个key值，React直接使用key值来比对树形结构中的所有子节点列表。例如为上面的的例子增加一个key会大大的提升转换效率：</p>\n<pre class="xml"><code class="language-html xml"><span class="code-tag"><span class="code-tag">&lt;</span><span\n        class="code-name"><span class="code-tag"><span class="code-name">ul</span></span></span><span class="code-tag">&gt;</span></span>\n  <span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span class="code-tag"><span\n          class="code-name">li</span></span></span><span class="code-tag"> </span><span class="hljs-attr"><span\n          class="code-tag"><span class="hljs-attr">key</span></span></span><span class="code-tag">=</span><span\n          class="code-string"><span class="code-tag"><span class="code-string">"2015"</span></span></span><span\n          class="code-tag">&gt;</span></span>Duke<span class="code-tag"><span class="code-tag">&lt;/</span><span\n            class="code-name"><span class="code-tag"><span class="code-name">li</span></span></span><span\n            class="code-tag">&gt;</span></span>\n  <span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span class="code-tag"><span\n          class="code-name">li</span></span></span><span class="code-tag"> </span><span class="hljs-attr"><span\n          class="code-tag"><span class="hljs-attr">key</span></span></span><span class="code-tag">=</span><span\n          class="code-string"><span class="code-tag"><span class="code-string">"2016"</span></span></span><span\n          class="code-tag">&gt;</span></span>Villanova<span class="code-tag"><span class="code-tag">&lt;/</span><span\n            class="code-name"><span class="code-tag"><span class="code-name">li</span></span></span><span\n            class="code-tag">&gt;</span></span>\n<span class="code-tag"><span class="code-tag">&lt;/</span><span class="code-name"><span class="code-tag"><span\n        class="code-name">ul</span></span></span><span class="code-tag">&gt;</span></span>\n\n<span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span class="code-tag"><span\n        class="code-name">ul</span></span></span><span class="code-tag">&gt;</span></span>\n  <span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span class="code-tag"><span\n          class="code-name">li</span></span></span><span class="code-tag"> </span><span class="hljs-attr"><span\n          class="code-tag"><span class="hljs-attr">key</span></span></span><span class="code-tag">=</span><span\n          class="code-string"><span class="code-tag"><span class="code-string">"2014"</span></span></span><span\n          class="code-tag">&gt;</span></span>Connecticut<span class="code-tag"><span class="code-tag">&lt;/</span><span\n            class="code-name"><span class="code-tag"><span class="code-name">li</span></span></span><span\n            class="code-tag">&gt;</span></span>\n  <span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span class="code-tag"><span\n          class="code-name">li</span></span></span><span class="code-tag"> </span><span class="hljs-attr"><span\n          class="code-tag"><span class="hljs-attr">key</span></span></span><span class="code-tag">=</span><span\n          class="code-string"><span class="code-tag"><span class="code-string">"2015"</span></span></span><span\n          class="code-tag">&gt;</span></span>Duke<span class="code-tag"><span class="code-tag">&lt;/</span><span\n            class="code-name"><span class="code-tag"><span class="code-name">li</span></span></span><span\n            class="code-tag">&gt;</span></span>\n  <span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span class="code-tag"><span\n          class="code-name">li</span></span></span><span class="code-tag"> </span><span class="hljs-attr"><span\n          class="code-tag"><span class="hljs-attr">key</span></span></span><span class="code-tag">=</span><span\n          class="code-string"><span class="code-tag"><span class="code-string">"2016"</span></span></span><span\n          class="code-tag">&gt;</span></span>Villanova<span class="code-tag"><span class="code-tag">&lt;/</span><span\n            class="code-name"><span class="code-tag"><span class="code-name">li</span></span></span><span\n            class="code-tag">&gt;</span></span>\n<span class="code-tag"><span class="code-tag">&lt;/</span><span class="code-name"><span class="code-tag"><span\n        class="code-name">ul</span></span></span><span class="code-tag">&gt;</span></span></code></pre>\n<p>现在React可以知道key=\'2014\'的节点是一个新值另外2个节点仅仅需要移动一下位置。</p>\n<p>在实际使用中，key值并不难找。在常规业务中，很多列表都自然包含业务相关的ID了：</p>\n<pre class="dust"><code class="language-html xml"><span class="code-tag"><span class="xml"><span\n        class="code-tag">&lt;</span></span><span class="code-name"><span class="xml"><span class="code-tag"><span\n        class="code-name">li</span></span></span></span><span class="xml"><span class="code-tag"> </span></span><span\n        class="hljs-attr"><span class="xml"><span class="code-tag"><span\n        class="hljs-attr">key</span></span></span></span><span class="xml"><span class="code-tag">=</span></span><span\n        class="code-string"><span class="code-template-variable">{item.id}</span></span><span class="xml"><span\n        class="code-tag">&gt;</span></span></span><span class="code-template-variable">{item.name}</span><span\n        class="code-tag"><span class="xml"><span class="code-tag">&lt;/</span></span><span class="code-name"><span\n        class="xml"><span class="code-tag"><span class="code-name">li</span></span></span></span><span class="xml"><span\n        class="code-tag">&gt;</span></span></span></code></pre>\n<p>当无法使用业务ID时，也可以额外增加一个ID值来标记列表差异，比如根据要使用的数据生成一个hash值，React不需要key值全局唯一，只需要在兄弟节点之间保持唯一即可。</p>\n<p>最差情况下，你可以使用索引数据（0、1、2、....n）。使用索引需要注意的是，如果列表发生重新排序效率会很糟糕。</p>\n\n<h2 id="h2-8">一些常见的问题</h2>\n<p>在使用React时需要谨记每次调用 <strong><em>render()</em></strong>\n    方法，它总会尝试比对调用前后2棵树是否一致。在某些极端情况下，虽然最终呈现效果并没有发生多大的变化，但是有可能每一个简单的操作都导致React全局重新渲染(例如列表没有Key)。</p>\n<p>\n    React在当前版本的实现中还存在一个问题，可以快捷的告知React子树中某个节点的位置已经发生改变，但是无法告知React他移动到了什么位置。因此在遇到这种情况时，算法会重构整个子树。这个问题告诉我们，如果遇到弹窗之类需要偶尔出现的组件，最好是通过隐藏属性控制他，而非直接移除Dom。</p>\n<p>React依赖启发式算法，如果本文开篇提到的2个基本假设不成立，那么会导致算法效率极差。</p>\n<ol>\n    <li>算法不会尝试匹配不同2个组件之间的子树。如果编码中发现2个组件之间有非常相似的输出，应该尝试将2个组件合并为一个类型的组件。在实际应用中，我们还没发现这样导致问题。</li>\n    <li>用作列表的key值最好是稳定、可预见、唯一的。易变的key值（比如由<code>Math.random()</code>方法生成的值）将会导致许多组件实例和Dom节点被非必要的重新创建，这会导致性能低下且子组件丢失已有的状态。&nbsp;\n    </li>\n</ol>'}};