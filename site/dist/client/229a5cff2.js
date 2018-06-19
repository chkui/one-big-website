webpackJsonp([2],{312:function(s,a,n){"use strict";Object.defineProperty(a,"__esModule",{value:!0});a.content='<p>使用apt安装好处在于统一升级方便，不用单独手工安装。默认情况下nginx已经支持apt-get安装，但是安装的包是比较老旧的10.x版本。我们可以通过添加nginx\n    deb安装源的方式来使用最新稳定版的nginx，还可以实时通过update和upgrade命令保持最新的未定版nginx。</p>\n\n<h2 id="h2-1">添加apt-key</h2>\n<pre class="css"><code class="language-bash"><span class="code-selector-tag">sudo</span> <span\n        class="code-selector-tag">apt-key</span> <span class="code-selector-tag">add</span> <span\n        class="code-selector-tag">nginx_signing</span><span class="code-selector-class">.key</span></code></pre>\n<p>由于需要使用nginx官方指定的deb源下载最新稳定版本的nginx，所以需要先添加一个信任公钥（PGP）。可以将下列公钥复制保存为一个名为nginx_signing.key的文件（也可到<a\n        href="http://nginx.org/keys/nginx_signing.key" rel="nofollow">官网</a>去下载）：</p>\n<pre class="groovy"><code class="groovy">-----BEGIN PGP PUBLIC KEY BLOCK-----\n<span class="code-string"><span class="code-string">Version:</span></span> GnuPG v2<span class="hljs-number"><span\n            class="hljs-number">.0</span></span><span class="hljs-number"><span class="hljs-number">.22</span></span> (GNU/Linux)\n\nmQENBE5OMmIBCAD+FPYKGriGGf7NqwKfWC83cBV01gabgVWQmZbMcFzeW+hMsgxH\nW6iimD0RsfZ9oEbfJCPG0CRSZ7ppq5pKamYs2+EJ8Q2ysOFHHwpGrA2C8zyNAs4I\nQxnZZIbETgcSwFtDun0XiqPwPZgyuXVm9PAbLZRbfBzm8wR/<span class="hljs-number"><span class="hljs-number">3</span></span>SWygqZBBLdQk5TE\nfDR+Eny<span class="hljs-regexp"><span class="hljs-regexp">/M1RVR4xClECONF9UBB2ejFdI1LD45APbP2hsN/</span></span>piFByU1t7yK2gpFyRt\n<span class="hljs-number"><span class="hljs-number">97</span></span>WzGHn9MV5/TL7AmRPM4pcr3JacmtCnxXeCZ8nLqedoSuHFuhwyDnlAbu8I16O5\nXRrfzhrHRJFM1JnIiGmzZi6zBvH0ItfyX6ttABEBAAG0KW5naW54IHNpZ25pbmcg\na2V5IDxzaWduaW5nLWtleUBuZ2lueC5jb20+iQE+BBMBAgAoAhsDBgsJCAcDAgYV\nCAIJCgsEFgIDAQIeAQIXgAUCV2K1+AUJGB4fQQAKCRCr9b2Ce9m<span class="hljs-regexp"><span\n            class="hljs-regexp">/YloaB/</span></span><span class="hljs-number"><span class="hljs-number">9</span></span>XGrol\nkocm7l<span class="hljs-regexp"><span class="hljs-regexp">/tsVjaBQCteXKuwsm4XhCuAQ6YAwA1L1UheGOG/</span></span>aa2xJvrXE8X32tgcTjr\nKoYoXWcdxaFjlXGTt6jV85qRguUzvMOxxSEM2Dn115etN9piPl0Zz+<span class="hljs-number"><span\n            class="hljs-number">4</span></span>rkx8+<span class="hljs-number"><span class="hljs-number">2</span></span>vJG\nF+eMlruPXg/zd88NvyLq5gGHEsFRBMVufYmHtNfcp4okC1klWiRIRSdp4QY1wdrN\n<span class="hljs-number"><span class="hljs-number">1</span></span>O+<span class="hljs-regexp"><span\n            class="hljs-regexp">/oCTl8Bzy6hcHjLIq3aoumcLxMjtBoclc/</span></span><span class="hljs-number"><span\n            class="hljs-number">5</span></span>OTioLDwSDfVx7rWyfRhcBzVbwD\noe<span class="hljs-regexp"><span class="hljs-regexp">/PD08AoAA6fxXvWjSxy+dGhEaXoTHjkCbz/</span></span>l6NxrK3JFyauDgU4K4MytsZ1HDi\nMgMW8hZXxszoICTTiQEcBBABAgAGBQJOTkelAAoJEKZP1bF62zmo79oH/<span class="hljs-number"><span\n            class="hljs-number">1</span></span>XDb29S\nYtWp+MTJTPFEwlWRiyRuDXy3wBd/BpwBRIWfWzMs1gnCjNjk0EVBVGa2grvy9Jtx\nJKMd6l<span class="hljs-regexp"><span class="hljs-regexp">/PWXVucSt+U/</span></span>+GO8rBkw14SdhqxaS2l14v6gyMeUrSbY3XfToGfwHC4sa/\nThn8X4jFaQ2XN5dAIzJGU1s5JA0tjEzUwCnmrKmyMlXZaoQVrmORGjCuH0I0aAFk\nRS0UtnB9HPpxhGVbs24xXZQnZDNbUQeulFxS4uP3OLDBAeCHl+v4t/uotIad8v6J\nSO93vc1evIje6lguE81HHmJn9noxPItvOvSMb2yPsE8mH4cJHRTFNSEhPW6ghmlf\nWa9ZwiVX5igxcvaIRgQQEQIABgUCTk5b0gAKCRDs8OkLLBcgg1G+AKCnacLb/+W6\ncflirUIExgZdUJqoogCeNPVwXiHEIVqithAM1pdY/gcaQZmIRgQQEQIABgUCTk5f\nYQAKCRCpN2E5pSTFPnNWAJ9gUozyiS+<span class="hljs-number"><span class="hljs-number">9</span></span>jf2rJvqmJSeWuCgVRwCcCUFhXRCpQO2Y\nVa3l3WuB+rgKjsQ=\n=EWWI\n-----END PGP PUBLIC KEY BLOCK-----</code></pre>\n<p>然后执行以下命令：</p>\n<pre class="css"><code class="language-bash"><span class="code-selector-tag">sudo</span> <span\n        class="code-selector-tag">apt-key</span> <span class="code-selector-tag">add</span> <span\n        class="code-selector-tag">nginx_signing</span><span class="code-selector-class">.key</span></code></pre>\n\n<h2 id="h2-2">设置apt的deb源</h2>\n<p>首先需要明确当前的ubuntu版本，在安装nginx时不同的ubuntu版本对应不同的nginx安装包。对照如下：</p>\n<table border="1" cellpadding="1" cellspacing="1" style="width:500px">\n    <tbody>\n    <tr>\n        <td>版本</td>\n        <td>安装包别名</td>\n        <td>适用平台</td>\n    </tr>\n    <tr>\n        <td>14.04</td>\n        <td>trusty</td>\n        <td>x86_64, i386, aarch64/arm64</td>\n    </tr>\n    <tr>\n        <td>16.04</td>\n        <td>xenial</td>\n        <td>x86_64, i386, ppc64el, aarch64/arm64</td>\n    </tr>\n    <tr>\n        <td>17.10</td>\n        <td>artful</td>\n        <td>x86_64, i386</td>\n    </tr>\n    </tbody>\n</table>\n<p>打开apt的安装源配置文件——/etc/apt/sources.list。在文件尾部添加：</p>\n<ul>\n    <li>deb http://nginx.org/packages/ubuntu/ <span style="color:#FF0000">code</span> nginx</li>\n    <li>deb-src http://nginx.org/packages/ubuntu/ <span style="color:#FF0000">code</span> nginx</li>\n</ul>\n<p>注意标红的code需要根据ubuntu的版本号按照上面的表替换对应的别名。</p>\n<p>设置好之后使用checklog命令可以看到现在已经切换到最新的稳定版本了。（不会输出日志，只有一个版本号）</p>\n\n<h2 id="h2-3">安装nginx</h2>\n<p>最后更新安装源列表，然后安装nginx。</p>\n<pre class="sql"><code class="language-bash">apt-get <span class="code-keyword">update</span>\napt-<span class="code-keyword">get</span> <span class="code-keyword">install</span> nginx</code></pre>\n\n<h2 id="h2-4">安装最新发布版本</h2>\n<p>除了稳定版本，也可以通过apt的方式安装最新发布版本（Mainline）。只需要修改安装源头的路径即可——将/etc/apt/sources.list中的deb源修改为：</p>\n<ul>\n    <li>deb http://nginx.org/packages/mainline/ubuntu/ <span style="color:#FF0000"><em>code</em></span> nginx</li>\n    <li>deb-src http://nginx.org/packages/mainline/ubuntu/ <span style="color:#FF0000"><em>code</em></span> nginx</li>\n</ul>\n<p>更多的安装方式详见<a href="http://nginx.org/en/docs/install.html" rel="nofollow">官网</a></p>'},316:function(s,a,n){"use strict";Object.defineProperty(a,"__esModule",{value:!0});a.content='<p>\n    React提供了一系列声明性的API接口，因此在使用时不必担心每次库的更新会修改API接口。这样可以降低编写应用的复杂度，但是带来的问题是无法很好的理解React是如何实现这些功能的。这篇文章会介绍React的差异比对算法——“融合算法”是如何执行的。</p>\n\n<h2 id="h2-1">差异匹配算法实现的前提</h2>\n<p>我们先来看看第一个值得关注的我问题：&nbsp;<code>render()</code>&nbsp;方法的作用是创建React元素的树形结构，当state或props发生更新后，&nbsp;<code>render()</code>&nbsp;会返回一个与之前有差异的结构树。在这个机制下，React需要弄清楚如何匹配最近的树并有效的更新UI。\n</p>\n<p>针对以上问题，有一些通用的算法可供参考，比如比对2颗树的差异，在前一个颗树的基础上生成最小操作树，但是这个算法的时间复杂度为n的三次方=O(n*n*n)，当树的节点较多时，这个算法的时间代价会导致算法几乎无法工作。</p>\n<p>\n    假设在我们使用React时，一共使用了1000个Dom标签元素，那么使用上面的算法，我们要比对数亿次才能得到比对的结果，根本不可能在一个浏览器中短时间完成。React实现了一个计算复杂度是O(n)的算法来解决这个问题，这个算法基于2个假设：</p>\n<ol>\n    <li>不同类型的2个标签元素产生不同的树。</li>\n    <li>开发人员可以为不同的子节点在渲染之前设定一个“key”属性值。</li>\n</ol>\n\n<h2 id="h2-2">差异算法</h2>\n<p>对于2颗有差异的树，React首先比对2颗树的根节点。根据跟节点的类型是否相同，算法接下来会执行不同的操作。</p>\n\n<h2 id="h2-3">Types不一样</h2>\n<p>\n    一旦2棵树之间的根元素类型不一样，React会直接移除旧的树并构建出新的树。例如从&nbsp;<code>&lt;a&gt;</code>&nbsp;变更为&nbsp;<code>&lt;img&gt;</code>、&nbsp;<code>&lt;Article&gt;</code>&nbsp;变更为&nbsp;<code>&lt;Comment&gt;</code>、&nbsp;<code>&lt;Button&gt;</code>&nbsp;变更为&nbsp;<code>&lt;div&gt;</code>&nbsp;，所有的这些变化都会导致整颗树重构。\n</p>\n<p>重构一棵新的树时，所有的旧节点都会移除。组件的<code>componentWillUnmount()</code>方法会被调用。&nbsp;然后到构建完成之后新的Dom会替换原来的Dom。此时组件的<code>componentWillMount()</code>和<code>componentDidMount()</code>会依次被调用。旧树Dom上的所有状态都会丢失。\n</p>\n<p>根据这个特性，根节点之后的所有组件都会卸载并重建，状态也会随之改变。例如下面2个组件对比：</p>\n<pre class="xml"><code class="language-html xml"><span class="code-tag"><span class="code-tag">&lt;</span><span\n        class="code-name"><span class="code-tag"><span class="code-name">div</span></span></span><span class="code-tag">&gt;</span></span>\n  <span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span class="code-tag"><span\n          class="code-name">Counter</span></span></span><span class="code-tag"> /&gt;</span></span>\n<span class="code-tag"><span class="code-tag">&lt;/</span><span class="code-name"><span class="code-tag"><span\n        class="code-name">div</span></span></span><span class="code-tag">&gt;</span></span>\n\n<span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span class="code-tag"><span\n        class="code-name">span</span></span></span><span class="code-tag">&gt;</span></span>\n  <span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span class="code-tag"><span\n          class="code-name">Counter</span></span></span><span class="code-tag"> /&gt;</span></span>\n<span class="code-tag"><span class="code-tag">&lt;/</span><span class="code-name"><span class="code-tag"><span\n        class="code-name">span</span></span></span><span class="code-tag">&gt;</span></span></code></pre>\n<p><code>Counter</code>&nbsp;组件会被销毁并重新安装一个新的组件。</p>\n\n<h2 id="h2-4">Dom元素拥有相同的类型</h2>\n<p>当比较React元素为相同类型时，React会查看元素上的属性来比对。比对之后，React会保持的Dom节点不改变然后仅仅更新不同的属性值，例如：</p>\n<pre class="xml"><code class="language-html xml"><span class="code-tag"><span class="code-tag">&lt;</span><span\n        class="code-name"><span class="code-tag"><span class="code-name">div</span></span></span><span\n        class="code-tag"> </span><span class="hljs-attr"><span class="code-tag"><span class="hljs-attr">className</span></span></span><span\n        class="code-tag">=</span><span class="code-string"><span class="code-tag"><span\n        class="code-string">"before"</span></span></span><span class="code-tag"> </span><span class="hljs-attr"><span\n        class="code-tag"><span class="hljs-attr">title</span></span></span><span class="code-tag">=</span><span\n        class="code-string"><span class="code-tag"><span class="code-string">"stuff"</span></span></span><span\n        class="code-tag"> /&gt;</span></span>\n\n<span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span class="code-tag"><span\n        class="code-name">div</span></span></span><span class="code-tag"> </span><span class="hljs-attr"><span\n        class="code-tag"><span class="hljs-attr">className</span></span></span><span class="code-tag">=</span><span\n        class="code-string"><span class="code-tag"><span class="code-string">"after"</span></span></span><span\n        class="code-tag"> </span><span class="hljs-attr"><span class="code-tag"><span\n        class="hljs-attr">title</span></span></span><span class="code-tag">=</span><span class="code-string"><span\n        class="code-tag"><span class="code-string">"stuff"</span></span></span><span\n        class="code-tag"> /&gt;</span></span></code></pre>\n<p>在比对这2个元素之后，React知道仅仅需要修改当前Dom的<code>className</code>。在更新<code>style</code>时，React同样知道仅仅需要更新修改部分即可。例如：</p>\n<pre class="groovy"><code class="language-html xml"><span class="code-tag">&lt;<span class="code-name">div</span> <span\n        class="hljs-attr">style</span>=<span class="code-string">{{<span class="code-string">color:</span></span> <span\n        class="code-string">\'</span><span class="hljs-attr"><span class="code-string">red</span></span><span\n        class="code-string">\'</span>, <span class="hljs-attr"><span class="code-string">fontWeight:</span></span> <span\n        class="code-string">\'</span><span class="hljs-attr"><span class="code-string">bold</span></span><span\n        class="code-string">\'</span>}} /&gt;</span>\n\n<span class="code-tag">&lt;<span class="code-name">div</span> <span class="hljs-attr">style</span>=<span\n        class="code-string">{{<span class="code-string">color:</span></span> <span class="code-string">\'</span><span\n        class="hljs-attr"><span class="code-string">green</span></span><span class="code-string">\'</span>, <span\n        class="hljs-attr"><span class="code-string">fontWeight:</span></span> <span class="code-string">\'</span><span\n        class="hljs-attr"><span class="code-string">bold</span></span><span class="code-string">\'</span>}} /&gt;</span></code></pre>\n<p>在转换这2个组件时，React知道仅仅需要修改color的样式，而fontWeight不必发生变动。</p>\n<p>在处理完当前Dom节点后，React依次对子节点进行递归。</p>\n\n<h2 id="h2-5">组件元素拥有相同的类型</h2>\n<p>当一个组件发生更新后，实例依然是原来的实例，所以状态还是以前的状态。React通过属性值（props）的更新来影响需要更新组件，此时组件实例的&nbsp;<code>componentWillReceiveProps()</code>&nbsp;和&nbsp;<code>componentWillUpdate()</code>&nbsp;方法会被调用。\n</p>\n<p>然后，&nbsp;<code>render()</code>&nbsp;方法会被调用并返回一个Dom，差异算法会递归比对之前返回Dom的差异。</p>\n\n<h2 id="h2-6">递归子元素</h2>\n<p>默认情况下，在递归子元素的Dom节点时，React同时对2个子元素列表进行迭代比对，如果发现差异都会产生一个突变（<a title="React性能优化"\n                                                               href="https://www.chkui.com/article/react/react_optimizing_performance"\n                                                               rel="nofollow">关于突变的概念请见React学习第六篇性能优化介绍不可变数据结构部分</a>）。\n</p>\n<p>例如，当增加一个元素在子元素的队尾，这2颗树的转换效率很高：</p>\n<pre class="xml"><code class="language-html xml"><span class="code-tag"><span class="code-tag">&lt;</span><span\n        class="code-name"><span class="code-tag"><span class="code-name">ul</span></span></span><span class="code-tag">&gt;</span></span>\n  <span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span class="code-tag"><span\n          class="code-name">li</span></span></span><span class="code-tag">&gt;</span></span>first<span class="code-tag"><span\n            class="code-tag">&lt;/</span><span class="code-name"><span class="code-tag"><span\n            class="code-name">li</span></span></span><span class="code-tag">&gt;</span></span>\n  <span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span class="code-tag"><span\n          class="code-name">li</span></span></span><span class="code-tag">&gt;</span></span>second<span\n            class="code-tag"><span class="code-tag">&lt;/</span><span class="code-name"><span class="code-tag"><span\n            class="code-name">li</span></span></span><span class="code-tag">&gt;</span></span>\n<span class="code-tag"><span class="code-tag">&lt;/</span><span class="code-name"><span class="code-tag"><span\n        class="code-name">ul</span></span></span><span class="code-tag">&gt;</span></span>\n\n<span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span class="code-tag"><span\n        class="code-name">ul</span></span></span><span class="code-tag">&gt;</span></span>\n  <span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span class="code-tag"><span\n          class="code-name">li</span></span></span><span class="code-tag">&gt;</span></span>first<span class="code-tag"><span\n            class="code-tag">&lt;/</span><span class="code-name"><span class="code-tag"><span\n            class="code-name">li</span></span></span><span class="code-tag">&gt;</span></span>\n  <span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span class="code-tag"><span\n          class="code-name">li</span></span></span><span class="code-tag">&gt;</span></span>second<span\n            class="code-tag"><span class="code-tag">&lt;/</span><span class="code-name"><span class="code-tag"><span\n            class="code-name">li</span></span></span><span class="code-tag">&gt;</span></span>\n  <span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span class="code-tag"><span\n          class="code-name">li</span></span></span><span class="code-tag">&gt;</span></span>third<span class="code-tag"><span\n            class="code-tag">&lt;/</span><span class="code-name"><span class="code-tag"><span\n            class="code-name">li</span></span></span><span class="code-tag">&gt;</span></span>\n<span class="code-tag"><span class="code-tag">&lt;/</span><span class="code-name"><span class="code-tag"><span\n        class="code-name">ul</span></span></span><span class="code-tag">&gt;</span></span></code></pre>\n<p>React先匹配&nbsp;<code>&lt;li&gt;first&lt;/li&gt;</code>&nbsp;2棵树，然后再匹配&nbsp;<code>&lt;li&gt;second&lt;/li&gt;</code>&nbsp;。最后直接就添加&nbsp;<code>&lt;li&gt;third&lt;/li&gt;</code>&nbsp;节点。\n</p>\n<p>如果代码按下面的方式修改2颗树，执行的效率相对较差：</p>\n<pre class="xml"><code class="language-html xml"><span class="code-tag"><span class="code-tag">&lt;</span><span\n        class="code-name"><span class="code-tag"><span class="code-name">ul</span></span></span><span class="code-tag">&gt;</span></span>\n  <span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span class="code-tag"><span\n          class="code-name">li</span></span></span><span class="code-tag">&gt;</span></span>Duke<span\n            class="code-tag"><span class="code-tag">&lt;/</span><span class="code-name"><span class="code-tag"><span\n            class="code-name">li</span></span></span><span class="code-tag">&gt;</span></span>\n  <span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span class="code-tag"><span\n          class="code-name">li</span></span></span><span class="code-tag">&gt;</span></span>Villanova<span\n            class="code-tag"><span class="code-tag">&lt;/</span><span class="code-name"><span class="code-tag"><span\n            class="code-name">li</span></span></span><span class="code-tag">&gt;</span></span>\n<span class="code-tag"><span class="code-tag">&lt;/</span><span class="code-name"><span class="code-tag"><span\n        class="code-name">ul</span></span></span><span class="code-tag">&gt;</span></span>\n\n<span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span class="code-tag"><span\n        class="code-name">ul</span></span></span><span class="code-tag">&gt;</span></span>\n  <span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span class="code-tag"><span\n          class="code-name">li</span></span></span><span class="code-tag">&gt;</span></span>Connecticut<span\n            class="code-tag"><span class="code-tag">&lt;/</span><span class="code-name"><span class="code-tag"><span\n            class="code-name">li</span></span></span><span class="code-tag">&gt;</span></span>\n  <span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span class="code-tag"><span\n          class="code-name">li</span></span></span><span class="code-tag">&gt;</span></span>Duke<span\n            class="code-tag"><span class="code-tag">&lt;/</span><span class="code-name"><span class="code-tag"><span\n            class="code-name">li</span></span></span><span class="code-tag">&gt;</span></span>\n  <span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span class="code-tag"><span\n          class="code-name">li</span></span></span><span class="code-tag">&gt;</span></span>Villanova<span\n            class="code-tag"><span class="code-tag">&lt;/</span><span class="code-name"><span class="code-tag"><span\n            class="code-name">li</span></span></span><span class="code-tag">&gt;</span></span>\n<span class="code-tag"><span class="code-tag">&lt;/</span><span class="code-name"><span class="code-tag"><span\n        class="code-name">ul</span></span></span><span class="code-tag">&gt;</span></span></code></pre>\n<p>\n    React会突变修改所有的子节点，最终&nbsp;<code>&lt;li&gt;Duke&lt;/li&gt;</code>&nbsp;and&nbsp;<code>&lt;li&gt;Villanova&lt;/li&gt;</code>&nbsp;会被重新渲染。所以这种方式会带来很大的效率问题。\n</p>\n\n<h2 id="h2-7">Keys</h2>\n<p>为了解决上面的问题，React提供了一个“key”属性。当所有的子元素都有一个key值，React直接使用key值来比对树形结构中的所有子节点列表。例如为上面的的例子增加一个key会大大的提升转换效率：</p>\n<pre class="xml"><code class="language-html xml"><span class="code-tag"><span class="code-tag">&lt;</span><span\n        class="code-name"><span class="code-tag"><span class="code-name">ul</span></span></span><span class="code-tag">&gt;</span></span>\n  <span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span class="code-tag"><span\n          class="code-name">li</span></span></span><span class="code-tag"> </span><span class="hljs-attr"><span\n          class="code-tag"><span class="hljs-attr">key</span></span></span><span class="code-tag">=</span><span\n          class="code-string"><span class="code-tag"><span class="code-string">"2015"</span></span></span><span\n          class="code-tag">&gt;</span></span>Duke<span class="code-tag"><span class="code-tag">&lt;/</span><span\n            class="code-name"><span class="code-tag"><span class="code-name">li</span></span></span><span\n            class="code-tag">&gt;</span></span>\n  <span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span class="code-tag"><span\n          class="code-name">li</span></span></span><span class="code-tag"> </span><span class="hljs-attr"><span\n          class="code-tag"><span class="hljs-attr">key</span></span></span><span class="code-tag">=</span><span\n          class="code-string"><span class="code-tag"><span class="code-string">"2016"</span></span></span><span\n          class="code-tag">&gt;</span></span>Villanova<span class="code-tag"><span class="code-tag">&lt;/</span><span\n            class="code-name"><span class="code-tag"><span class="code-name">li</span></span></span><span\n            class="code-tag">&gt;</span></span>\n<span class="code-tag"><span class="code-tag">&lt;/</span><span class="code-name"><span class="code-tag"><span\n        class="code-name">ul</span></span></span><span class="code-tag">&gt;</span></span>\n\n<span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span class="code-tag"><span\n        class="code-name">ul</span></span></span><span class="code-tag">&gt;</span></span>\n  <span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span class="code-tag"><span\n          class="code-name">li</span></span></span><span class="code-tag"> </span><span class="hljs-attr"><span\n          class="code-tag"><span class="hljs-attr">key</span></span></span><span class="code-tag">=</span><span\n          class="code-string"><span class="code-tag"><span class="code-string">"2014"</span></span></span><span\n          class="code-tag">&gt;</span></span>Connecticut<span class="code-tag"><span class="code-tag">&lt;/</span><span\n            class="code-name"><span class="code-tag"><span class="code-name">li</span></span></span><span\n            class="code-tag">&gt;</span></span>\n  <span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span class="code-tag"><span\n          class="code-name">li</span></span></span><span class="code-tag"> </span><span class="hljs-attr"><span\n          class="code-tag"><span class="hljs-attr">key</span></span></span><span class="code-tag">=</span><span\n          class="code-string"><span class="code-tag"><span class="code-string">"2015"</span></span></span><span\n          class="code-tag">&gt;</span></span>Duke<span class="code-tag"><span class="code-tag">&lt;/</span><span\n            class="code-name"><span class="code-tag"><span class="code-name">li</span></span></span><span\n            class="code-tag">&gt;</span></span>\n  <span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span class="code-tag"><span\n          class="code-name">li</span></span></span><span class="code-tag"> </span><span class="hljs-attr"><span\n          class="code-tag"><span class="hljs-attr">key</span></span></span><span class="code-tag">=</span><span\n          class="code-string"><span class="code-tag"><span class="code-string">"2016"</span></span></span><span\n          class="code-tag">&gt;</span></span>Villanova<span class="code-tag"><span class="code-tag">&lt;/</span><span\n            class="code-name"><span class="code-tag"><span class="code-name">li</span></span></span><span\n            class="code-tag">&gt;</span></span>\n<span class="code-tag"><span class="code-tag">&lt;/</span><span class="code-name"><span class="code-tag"><span\n        class="code-name">ul</span></span></span><span class="code-tag">&gt;</span></span></code></pre>\n<p>现在React可以知道key=\'2014\'的节点是一个新值另外2个节点仅仅需要移动一下位置。</p>\n<p>在实际使用中，key值并不难找。在常规业务中，很多列表都自然包含业务相关的ID了：</p>\n<pre class="dust"><code class="language-html xml"><span class="code-tag"><span class="xml"><span\n        class="code-tag">&lt;</span></span><span class="code-name"><span class="xml"><span class="code-tag"><span\n        class="code-name">li</span></span></span></span><span class="xml"><span class="code-tag"> </span></span><span\n        class="hljs-attr"><span class="xml"><span class="code-tag"><span\n        class="hljs-attr">key</span></span></span></span><span class="xml"><span class="code-tag">=</span></span><span\n        class="code-string"><span class="code-template-variable">{item.id}</span></span><span class="xml"><span\n        class="code-tag">&gt;</span></span></span><span class="code-template-variable">{item.name}</span><span\n        class="code-tag"><span class="xml"><span class="code-tag">&lt;/</span></span><span class="code-name"><span\n        class="xml"><span class="code-tag"><span class="code-name">li</span></span></span></span><span class="xml"><span\n        class="code-tag">&gt;</span></span></span></code></pre>\n<p>当无法使用业务ID时，也可以额外增加一个ID值来标记列表差异，比如根据要使用的数据生成一个hash值，React不需要key值全局唯一，只需要在兄弟节点之间保持唯一即可。</p>\n<p>最差情况下，你可以使用索引数据（0、1、2、....n）。使用索引需要注意的是，如果列表发生重新排序效率会很糟糕。</p>\n\n<h2 id="h2-8">一些常见的问题</h2>\n<p>在使用React时需要谨记每次调用 <strong><em>render()</em></strong>\n    方法，它总会尝试比对调用前后2棵树是否一致。在某些极端情况下，虽然最终呈现效果并没有发生多大的变化，但是有可能每一个简单的操作都导致React全局重新渲染(例如列表没有Key)。</p>\n<p>\n    React在当前版本的实现中还存在一个问题，可以快捷的告知React子树中某个节点的位置已经发生改变，但是无法告知React他移动到了什么位置。因此在遇到这种情况时，算法会重构整个子树。这个问题告诉我们，如果遇到弹窗之类需要偶尔出现的组件，最好是通过隐藏属性控制他，而非直接移除Dom。</p>\n<p>React依赖启发式算法，如果本文开篇提到的2个基本假设不成立，那么会导致算法效率极差。</p>\n<ol>\n    <li>算法不会尝试匹配不同2个组件之间的子树。如果编码中发现2个组件之间有非常相似的输出，应该尝试将2个组件合并为一个类型的组件。在实际应用中，我们还没发现这样导致问题。</li>\n    <li>用作列表的key值最好是稳定、可预见、唯一的。易变的key值（比如由<code>Math.random()</code>方法生成的值）将会导致许多组件实例和Dom节点被非必要的重新创建，这会导致性能低下且子组件丢失已有的状态。&nbsp;\n    </li>\n</ol>'},324:function(s,a,n){"use strict";Object.defineProperty(a,"__esModule",{value:!0});a.content='<h2 id="h2-1">为什么要用Fragments</h2>\n<p>在我们使用React开发组件的时候，每个React组件都必须返回一个根元素。例如下面这样：</p>\n<pre class="scala"><code class="language-javascript"><span class="hljs-class"><span class="code-keyword"><span class="hljs-class"><span class="code-keyword">class</span></span></span><span class="hljs-class"> </span><span class="code-title"><span class="hljs-class"><span class="code-title">Table</span></span></span><span class="hljs-class"> </span><span class="code-keyword"><span class="hljs-class"><span class="code-keyword">extends</span></span></span><span class="hljs-class"> </span><span class="code-title"><span class="hljs-class"><span class="code-title">React</span></span></span><span class="hljs-class">.</span><span class="code-title"><span class="hljs-class"><span class="code-title">Component</span></span></span><span class="hljs-class"> </span></span>{\n  render() {\n    <span class="code-keyword"><span class="code-keyword">return</span></span> (\n      <span class="xml"><span class="code-tag">&lt;<span class="code-name">table</span>&gt;</span>\n        <span class="code-tag">&lt;<span class="code-name">tr</span>&gt;</span>\n          <span class="code-tag">&lt;<span class="code-name"><span class="code-type">Columns</span></span> /&gt;</span>\n        <span class="code-tag">&lt;/<span class="code-name">tr</span>&gt;</span>\n      <span class="code-tag">&lt;/<span class="code-name">table</span>&gt;</span>\n    );\n  }\n}\n\n<span class="hljs-class"><span class="code-keyword">class</span> <span class="code-title">Columns</span> <span class="code-keyword">extends</span> <span class="code-title">React</span>.<span class="code-title">Component</span> </span>{\n  render() {\n    <span class="code-keyword">return</span> (\n      <span class="code-tag">&lt;<span class="code-name">div</span>&gt;</span>\n        <span class="code-tag">&lt;<span class="code-name">td</span>&gt;</span><span class="code-type">Hello</span><span class="code-tag">&lt;/<span class="code-name">td</span>&gt;</span>\n        <span class="code-tag">&lt;<span class="code-name">td</span>&gt;</span><span class="code-type">World</span><span class="code-tag">&lt;/<span class="code-name">td</span>&gt;</span>\n      <span class="code-tag">&lt;/<span class="code-name">div</span>&gt;</span>\n    );\n  }\n}</span></code></pre>\n<p>在正常的HTML行文中，&lt;tr&gt;标签与&lt;td&gt;标签之间的&lt;div&gt;标签是不应该存在的。</p>\n<p>虽然在这个小小的例子中，我们可以将tr标签移入到Columns中去解决这个问题，但是在错综复杂的业务层级代码中，我们经常会遇到希望一个组件返回多个并列标签的情况。</p>\n<p>为了解决这个问题，React在16.x版本新推出了一个Fragments特性——组件碎片化。Fragments的使用方法非常简单，我们将Column组件稍作改造即可：</p>\n<pre class="scala"><code class="language-javascript"><span class="hljs-class"><span class="code-keyword"><span class="hljs-class"><span class="code-keyword">class</span></span></span><span class="hljs-class"> </span><span class="code-title"><span class="hljs-class"><span class="code-title">Columns</span></span></span><span class="hljs-class"> </span><span class="code-keyword"><span class="hljs-class"><span class="code-keyword">extends</span></span></span><span class="hljs-class"> </span><span class="code-title"><span class="hljs-class"><span class="code-title">React</span></span></span><span class="hljs-class">.</span><span class="code-title"><span class="hljs-class"><span class="code-title">Component</span></span></span><span class="hljs-class"> </span></span>{\n  render() {\n    <span class="code-keyword"><span class="code-keyword">return</span></span> (\n      <span class="xml"><span class="code-tag">&lt;<span class="code-name"><span class="code-type">React</span>.<span class="code-type">Fragment</span></span>&gt;</span>\n        <span class="code-tag">&lt;<span class="code-name">td</span>&gt;</span><span class="code-type">Hello</span><span class="code-tag">&lt;/<span class="code-name">td</span>&gt;</span>\n        <span class="code-tag">&lt;<span class="code-name">td</span>&gt;</span><span class="code-type">World</span><span class="code-tag">&lt;/<span class="code-name">td</span>&gt;</span>\n      <span class="code-tag">&lt;/<span class="code-name"><span class="code-type">React</span>.<span class="code-type">Fragment</span></span>&gt;</span>\n    );\n  }\n}</span></code></pre>\n<p>这样，在最终渲染成Dom后，并不会出现任何与HTML行文不符的标签。</p>\n\n<h2 id="h2-2">简写与注意事项</h2>\n<p>除了React.Fragment这样的写法，React还推荐使用更加明了的简短写法：</p>\n<pre class="scala"><code class="language-javascript"><span class="hljs-class"><span class="code-keyword"><span class="hljs-class"><span class="code-keyword">class</span></span></span><span class="hljs-class"> </span><span class="code-title"><span class="hljs-class"><span class="code-title">Columns</span></span></span><span class="hljs-class"> </span><span class="code-keyword"><span class="hljs-class"><span class="code-keyword">extends</span></span></span><span class="hljs-class"> </span><span class="code-title"><span class="hljs-class"><span class="code-title">React</span></span></span><span class="hljs-class">.</span><span class="code-title"><span class="hljs-class"><span class="code-title">Component</span></span></span><span class="hljs-class"> </span></span>{\n  render() {\n    <span class="code-keyword"><span class="code-keyword">return</span></span> (\n      <span class="xml"><span class="code-tag">&lt;&gt;</span>\n        <span class="code-tag">&lt;<span class="code-name">td</span>&gt;</span><span class="code-type">Hello</span><span class="code-tag">&lt;/<span class="code-name">td</span>&gt;</span>\n        <span class="code-tag">&lt;<span class="code-name">td</span>&gt;</span><span class="code-type">World</span><span class="code-tag">&lt;/<span class="code-name">td</span>&gt;</span>\n      <span class="code-tag">&lt;/&gt;</span>\n    );\n  }\n}</span></code></pre>\n<p>需要注意的是：<span style="color:#FF0000">这样的写法不支持传递任何参数，而且某些编译器或者编译工具并不支持这种写法</span>。</p>\n\n<h2 id="h2-3">在队列中使用</h2>\n<p>一个React元素除了直接写成一个组件，也可以在队列中返回。Fragment标签使用到队列中同样也要<a href="https://www.chkui.com/article/react/react_list_key_and_form" title="列表与组件的键值">使用key属性来标记队列的位置</a>：</p>\n<pre class="javascript"><code class="language-javascript"><span class="hljs-function"><span class="code-keyword"><span class="hljs-function"><span class="code-keyword">function</span></span></span><span class="hljs-function"> </span><span class="code-title"><span class="hljs-function"><span class="code-title">Glossary</span></span></span><span class="hljs-function">(</span><span class="hljs-params"><span class="hljs-function"><span class="hljs-params">props</span></span></span><span class="hljs-function">) </span></span>{\n  <span class="code-keyword"><span class="code-keyword">return</span></span> (\n    <span class="xml"><span class="code-tag"><span class="xml"><span class="code-tag">&lt;</span></span><span class="code-name"><span class="xml"><span class="code-tag"><span class="code-name">dl</span></span></span></span><span class="xml"><span class="code-tag">&gt;</span></span></span><span class="xml">\n      {props.items.map(item =&gt; (\n        </span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;</span></span><span class="code-name"><span class="xml"><span class="code-tag"><span class="code-name">React.Fragment</span></span></span></span><span class="xml"><span class="code-tag"> </span></span><span class="hljs-attr"><span class="xml"><span class="code-tag"><span class="hljs-attr">key</span></span></span></span><span class="xml"><span class="code-tag">=</span></span><span class="code-string"><span class="xml"><span class="code-tag"><span class="code-string">{item.id}</span></span></span></span><span class="xml"><span class="code-tag">&gt;</span></span></span><span class="xml">\n          </span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;</span></span><span class="code-name"><span class="xml"><span class="code-tag"><span class="code-name">dt</span></span></span></span><span class="xml"><span class="code-tag">&gt;</span></span></span><span class="xml">{item.term}</span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;/</span></span><span class="code-name"><span class="xml"><span class="code-tag"><span class="code-name">dt</span></span></span></span><span class="xml"><span class="code-tag">&gt;</span></span></span><span class="xml">\n          </span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;</span></span><span class="code-name"><span class="xml"><span class="code-tag"><span class="code-name">dd</span></span></span></span><span class="xml"><span class="code-tag">&gt;</span></span></span><span class="xml">{item.description}</span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;/</span></span><span class="code-name"><span class="xml"><span class="code-tag"><span class="code-name">dd</span></span></span></span><span class="xml"><span class="code-tag">&gt;</span></span></span><span class="xml">\n        </span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;/</span></span><span class="code-name"><span class="xml"><span class="code-tag"><span class="code-name">React.Fragment</span></span></span></span><span class="xml"><span class="code-tag">&gt;</span></span></span><span class="xml">\n      ))}\n    </span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;/</span></span><span class="code-name"><span class="xml"><span class="code-tag"><span class="code-name">dl</span></span></span></span><span class="xml"><span class="code-tag">&gt;</span></span></span><span class="xml">\n  );\n}</span></span></code></pre>\n<p></p>'},333:function(s,a,n){"use strict";Object.defineProperty(a,"__esModule",{value:!0});a.content='<h3 id="h3-1">非受控组件（Uncontrolled Components）</h3>\n<h4 id="h4-1">使用非受控组件</h4>\n<p>在大部分情况下，推荐使用 <a title="受控组件" href="https://www.chkui.com/article/react/react_list_key_and_form#h1-2">受控组件</a> 来实现表单、输入框等状态控制。在受控组件中，表单等数据都有React组件自己处理。这里将介绍另外一种非受控组件，表单的数据有Dom自己控制。</p>\n<p>非受控组件实现的重点是用Refs特性获取真实Dom来代替每次数据变更去更新组件的状态值。</p>\n<p>例如下面的代码，在非受控组件中记录被用户输入的名字：</p>\n<pre class="scala"><code class="language-javascript"><span class="hljs-class"><span class="code-keyword"><span class="hljs-class"><span class="code-keyword">class</span></span></span><span class="hljs-class"> </span><span class="code-title"><span class="hljs-class"><span class="code-title">NameForm</span></span></span><span class="hljs-class"> </span><span class="code-keyword"><span class="hljs-class"><span class="code-keyword">extends</span></span></span><span class="hljs-class"> </span><span class="code-title"><span class="hljs-class"><span class="code-title">React</span></span></span><span class="hljs-class">.</span><span class="code-title"><span class="hljs-class"><span class="code-title">Component</span></span></span><span class="hljs-class"> </span></span>{\n  <span class="code-keyword">constructor</span>(props) {\n    <span class="code-keyword"><span class="code-keyword">super</span></span>(props);\n    <span class="code-keyword"><span class="code-keyword">this</span></span>.handleSubmit = <span class="code-keyword"><span class="code-keyword">this</span></span>.handleSubmit.bind(<span class="code-keyword"><span class="code-keyword">this</span></span>);\n  }\n\n  handleSubmit(event) {\n    <span class="code-comment"><span class="code-comment">//在提交时，直接使用ref获取的真实Dom获取值</span></span>\n    alert(<span class="code-string"><span class="hljs-symbol">\'A</span> name was submitted: \'</span> + <span class="code-keyword"><span class="code-keyword">this</span></span>.input.value);\n    event.preventDefault();\n  }\n\n  render() {\n    <span class="code-keyword"><span class="code-keyword">return</span></span> (\n      &lt;form onSubmit={<span class="code-keyword">this</span>.handleSubmit}&gt;\n        &lt;label&gt;\n          <span class="code-type">Name</span>:\n          &lt;input <span class="hljs-class"><span class="code-keyword">type</span></span>=<span class="code-string">"text"</span> ref={(input) =&gt; <span class="code-keyword">this</span>.input = input} /&gt;\n        &lt;/label&gt;\n        &lt;input <span class="hljs-class"><span class="code-keyword">type</span></span>=<span class="code-string">"submit"</span> value=<span class="code-string">"Submit"</span> /&gt;\n      &lt;/form&gt;\n    );\n  }\n}</code></pre>\n<p><a title="代码测试" href="https://codepen.io/gaearon/pen/WooRWa?editors=0010" rel="nofollow">尝试代码</a>。</p>\n<p>由于在非受控组件中使用Refs特性获取了真实Dom的实例，所以在使用非受控组建时，更容易集成React和非React代码，在某些时候也可以省略一些代码。但是建议除了特殊情况，都使用受控组件。</p>\n<p>如果想要深入理解什么情况下使用哪种组件，建议阅读 <a title="受控组件与非受控组件的差异" href="https://goshakkk.name/controlled-vs-uncontrolled-inputs-react/" rel="nofollow">受控和不受控表单输入</a> 一文。</p>\n<h4 id="h4-2">组件默认值</h4>\n<p>在React渲染的生命周期，表单中的value属性会被覆盖Dom中的value值。在使用非受控组件时，通常需要React设定一个默认初始值但是不再控制后续更新。基于这个案例，你可以指定一个<code>defaultValue</code>&nbsp;属性来代替&nbsp;<code>value</code>。</p>\n<pre class="xml"><code class="language-javascript">render() {\n  <span class="code-keyword">return</span> (\n    <span class="code-tag">&lt;<span class="code-name">form</span> <span class="hljs-attr">onSubmit</span>=<span class="code-string">{this.handleSubmit}</span>&gt;</span>\n      <span class="code-tag">&lt;<span class="code-name">label</span>&gt;</span>\n        Name:\n        <span class="code-tag">&lt;<span class="code-name">input</span>\n          <span class="hljs-attr">defaultValue</span>=<span class="code-string">"Bob"</span>\n          <span class="hljs-attr">type</span>=<span class="code-string">"text"</span>\n          <span class="hljs-attr">ref</span>=<span class="code-string">{(input)</span> =&gt;</span> this.input = input} /&gt;\n      <span class="code-tag">&lt;/<span class="code-name">label</span>&gt;</span>\n      <span class="code-tag">&lt;<span class="code-name">input</span> <span class="hljs-attr">type</span>=<span class="code-string">"submit"</span> <span class="hljs-attr">value</span>=<span class="code-string">"Submit"</span> /&gt;</span>\n    <span class="code-tag">&lt;/<span class="code-name">form</span>&gt;</span>\n  );\n}</code></pre>\n<p>例如中“defaultValue = "Bob"”就是指定了一个默认值。同样地，&nbsp;<code>&lt;input type="checkbox"&gt;</code>&nbsp;和&nbsp;<code>&lt;input type="radio"&gt;</code>&nbsp;支持&nbsp;<code>defaultChecked</code>属性，&nbsp;<code>&lt;select&gt;</code>&nbsp;标签支持&nbsp;<code>defaultValue</code>属性。</p>'}});