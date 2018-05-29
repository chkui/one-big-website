webpackJsonp([3],{298:function(s,n,a){"use strict";Object.defineProperty(n,"__esModule",{value:!0});n.content='<p>使用apt安装好处在于统一升级方便，不用单独手工安装。默认情况下nginx已经支持apt-get安装，但是安装的包是比较老旧的10.x版本。我们可以通过添加nginx\n    deb安装源的方式来使用最新稳定版的nginx，还可以实时通过update和upgrade命令保持最新的未定版nginx。</p>\n\n<h2 id="h2-1">添加apt-key</h2>\n<pre class="css"><code class="language-bash"><span class="code-selector-tag">sudo</span> <span\n        class="code-selector-tag">apt-key</span> <span class="code-selector-tag">add</span> <span\n        class="code-selector-tag">nginx_signing</span><span class="code-selector-class">.key</span></code></pre>\n<p>由于需要使用nginx官方指定的deb源下载最新稳定版本的nginx，所以需要先添加一个信任公钥（PGP）。可以将下列公钥复制保存为一个名为nginx_signing.key的文件（也可到<a\n        href="http://nginx.org/keys/nginx_signing.key" rel="nofollow">官网</a>去下载）：</p>\n<pre class="groovy"><code class="groovy">-----BEGIN PGP PUBLIC KEY BLOCK-----\n<span class="code-string"><span class="code-string">Version:</span></span> GnuPG v2<span class="hljs-number"><span\n            class="hljs-number">.0</span></span><span class="hljs-number"><span class="hljs-number">.22</span></span> (GNU/Linux)\n\nmQENBE5OMmIBCAD+FPYKGriGGf7NqwKfWC83cBV01gabgVWQmZbMcFzeW+hMsgxH\nW6iimD0RsfZ9oEbfJCPG0CRSZ7ppq5pKamYs2+EJ8Q2ysOFHHwpGrA2C8zyNAs4I\nQxnZZIbETgcSwFtDun0XiqPwPZgyuXVm9PAbLZRbfBzm8wR/<span class="hljs-number"><span class="hljs-number">3</span></span>SWygqZBBLdQk5TE\nfDR+Eny<span class="hljs-regexp"><span class="hljs-regexp">/M1RVR4xClECONF9UBB2ejFdI1LD45APbP2hsN/</span></span>piFByU1t7yK2gpFyRt\n<span class="hljs-number"><span class="hljs-number">97</span></span>WzGHn9MV5/TL7AmRPM4pcr3JacmtCnxXeCZ8nLqedoSuHFuhwyDnlAbu8I16O5\nXRrfzhrHRJFM1JnIiGmzZi6zBvH0ItfyX6ttABEBAAG0KW5naW54IHNpZ25pbmcg\na2V5IDxzaWduaW5nLWtleUBuZ2lueC5jb20+iQE+BBMBAgAoAhsDBgsJCAcDAgYV\nCAIJCgsEFgIDAQIeAQIXgAUCV2K1+AUJGB4fQQAKCRCr9b2Ce9m<span class="hljs-regexp"><span\n            class="hljs-regexp">/YloaB/</span></span><span class="hljs-number"><span class="hljs-number">9</span></span>XGrol\nkocm7l<span class="hljs-regexp"><span class="hljs-regexp">/tsVjaBQCteXKuwsm4XhCuAQ6YAwA1L1UheGOG/</span></span>aa2xJvrXE8X32tgcTjr\nKoYoXWcdxaFjlXGTt6jV85qRguUzvMOxxSEM2Dn115etN9piPl0Zz+<span class="hljs-number"><span\n            class="hljs-number">4</span></span>rkx8+<span class="hljs-number"><span class="hljs-number">2</span></span>vJG\nF+eMlruPXg/zd88NvyLq5gGHEsFRBMVufYmHtNfcp4okC1klWiRIRSdp4QY1wdrN\n<span class="hljs-number"><span class="hljs-number">1</span></span>O+<span class="hljs-regexp"><span\n            class="hljs-regexp">/oCTl8Bzy6hcHjLIq3aoumcLxMjtBoclc/</span></span><span class="hljs-number"><span\n            class="hljs-number">5</span></span>OTioLDwSDfVx7rWyfRhcBzVbwD\noe<span class="hljs-regexp"><span class="hljs-regexp">/PD08AoAA6fxXvWjSxy+dGhEaXoTHjkCbz/</span></span>l6NxrK3JFyauDgU4K4MytsZ1HDi\nMgMW8hZXxszoICTTiQEcBBABAgAGBQJOTkelAAoJEKZP1bF62zmo79oH/<span class="hljs-number"><span\n            class="hljs-number">1</span></span>XDb29S\nYtWp+MTJTPFEwlWRiyRuDXy3wBd/BpwBRIWfWzMs1gnCjNjk0EVBVGa2grvy9Jtx\nJKMd6l<span class="hljs-regexp"><span class="hljs-regexp">/PWXVucSt+U/</span></span>+GO8rBkw14SdhqxaS2l14v6gyMeUrSbY3XfToGfwHC4sa/\nThn8X4jFaQ2XN5dAIzJGU1s5JA0tjEzUwCnmrKmyMlXZaoQVrmORGjCuH0I0aAFk\nRS0UtnB9HPpxhGVbs24xXZQnZDNbUQeulFxS4uP3OLDBAeCHl+v4t/uotIad8v6J\nSO93vc1evIje6lguE81HHmJn9noxPItvOvSMb2yPsE8mH4cJHRTFNSEhPW6ghmlf\nWa9ZwiVX5igxcvaIRgQQEQIABgUCTk5b0gAKCRDs8OkLLBcgg1G+AKCnacLb/+W6\ncflirUIExgZdUJqoogCeNPVwXiHEIVqithAM1pdY/gcaQZmIRgQQEQIABgUCTk5f\nYQAKCRCpN2E5pSTFPnNWAJ9gUozyiS+<span class="hljs-number"><span class="hljs-number">9</span></span>jf2rJvqmJSeWuCgVRwCcCUFhXRCpQO2Y\nVa3l3WuB+rgKjsQ=\n=EWWI\n-----END PGP PUBLIC KEY BLOCK-----</code></pre>\n<p>然后执行以下命令：</p>\n<pre class="css"><code class="language-bash"><span class="code-selector-tag">sudo</span> <span\n        class="code-selector-tag">apt-key</span> <span class="code-selector-tag">add</span> <span\n        class="code-selector-tag">nginx_signing</span><span class="code-selector-class">.key</span></code></pre>\n\n<h2 id="h2-2">设置apt的deb源</h2>\n<p>首先需要明确当前的ubuntu版本，在安装nginx时不同的ubuntu版本对应不同的nginx安装包。对照如下：</p>\n<table border="1" cellpadding="1" cellspacing="1" style="width:500px">\n    <tbody>\n    <tr>\n        <td>版本</td>\n        <td>安装包别名</td>\n        <td>适用平台</td>\n    </tr>\n    <tr>\n        <td>14.04</td>\n        <td>trusty</td>\n        <td>x86_64, i386, aarch64/arm64</td>\n    </tr>\n    <tr>\n        <td>16.04</td>\n        <td>xenial</td>\n        <td>x86_64, i386, ppc64el, aarch64/arm64</td>\n    </tr>\n    <tr>\n        <td>17.10</td>\n        <td>artful</td>\n        <td>x86_64, i386</td>\n    </tr>\n    </tbody>\n</table>\n<p>打开apt的安装源配置文件——/etc/apt/sources.list。在文件尾部添加：</p>\n<ul>\n    <li>deb http://nginx.org/packages/ubuntu/ <span style="color:#FF0000">code</span> nginx</li>\n    <li>deb-src http://nginx.org/packages/ubuntu/ <span style="color:#FF0000">code</span> nginx</li>\n</ul>\n<p>注意标红的code需要根据ubuntu的版本号按照上面的表替换对应的别名。</p>\n<p>设置好之后使用checklog命令可以看到现在已经切换到最新的稳定版本了。（不会输出日志，只有一个版本号）</p>\n\n<h2 id="h2-3">安装nginx</h2>\n<p>最后更新安装源列表，然后安装nginx。</p>\n<pre class="sql"><code class="language-bash">apt-get <span class="code-keyword">update</span>\napt-<span class="code-keyword">get</span> <span class="code-keyword">install</span> nginx</code></pre>\n\n<h2 id="h2-4">安装最新发布版本</h2>\n<p>除了稳定版本，也可以通过apt的方式安装最新发布版本（Mainline）。只需要修改安装源头的路径即可——将/etc/apt/sources.list中的deb源修改为：</p>\n<ul>\n    <li>deb http://nginx.org/packages/mainline/ubuntu/ <span style="color:#FF0000"><em>code</em></span> nginx</li>\n    <li>deb-src http://nginx.org/packages/mainline/ubuntu/ <span style="color:#FF0000"><em>code</em></span> nginx</li>\n</ul>\n<p>更多的安装方式详见<a href="http://nginx.org/en/docs/install.html" rel="nofollow">官网</a></p>'},317:function(s,n,a){"use strict";Object.defineProperty(n,"__esModule",{value:!0});n.content='<h3 id="h3-1">非受控组件（Uncontrolled Components）</h3>\n<h4 id="h4-1">使用非受控组件</h4>\n<p>在大部分情况下，推荐使用 <a title="受控组件" href="https://www.chkui.com/article/react/react_list_key_and_form#h1-2">受控组件</a> 来实现表单、输入框等状态控制。在受控组件中，表单等数据都有React组件自己处理。这里将介绍另外一种非受控组件，表单的数据有Dom自己控制。</p>\n<p>非受控组件实现的重点是用Refs特性获取真实Dom来代替每次数据变更去更新组件的状态值。</p>\n<p>例如下面的代码，在非受控组件中记录被用户输入的名字：</p>\n<pre class="scala"><code class="language-javascript"><span class="hljs-class"><span class="code-keyword"><span class="hljs-class"><span class="code-keyword">class</span></span></span><span class="hljs-class"> </span><span class="code-title"><span class="hljs-class"><span class="code-title">NameForm</span></span></span><span class="hljs-class"> </span><span class="code-keyword"><span class="hljs-class"><span class="code-keyword">extends</span></span></span><span class="hljs-class"> </span><span class="code-title"><span class="hljs-class"><span class="code-title">React</span></span></span><span class="hljs-class">.</span><span class="code-title"><span class="hljs-class"><span class="code-title">Component</span></span></span><span class="hljs-class"> </span></span>{\n  <span class="code-keyword">constructor</span>(props) {\n    <span class="code-keyword"><span class="code-keyword">super</span></span>(props);\n    <span class="code-keyword"><span class="code-keyword">this</span></span>.handleSubmit = <span class="code-keyword"><span class="code-keyword">this</span></span>.handleSubmit.bind(<span class="code-keyword"><span class="code-keyword">this</span></span>);\n  }\n\n  handleSubmit(event) {\n    <span class="code-comment"><span class="code-comment">//在提交时，直接使用ref获取的真实Dom获取值</span></span>\n    alert(<span class="code-string"><span class="hljs-symbol">\'A</span> name was submitted: \'</span> + <span class="code-keyword"><span class="code-keyword">this</span></span>.input.value);\n    event.preventDefault();\n  }\n\n  render() {\n    <span class="code-keyword"><span class="code-keyword">return</span></span> (\n      &lt;form onSubmit={<span class="code-keyword">this</span>.handleSubmit}&gt;\n        &lt;label&gt;\n          <span class="code-type">Name</span>:\n          &lt;input <span class="hljs-class"><span class="code-keyword">type</span></span>=<span class="code-string">"text"</span> ref={(input) =&gt; <span class="code-keyword">this</span>.input = input} /&gt;\n        &lt;/label&gt;\n        &lt;input <span class="hljs-class"><span class="code-keyword">type</span></span>=<span class="code-string">"submit"</span> value=<span class="code-string">"Submit"</span> /&gt;\n      &lt;/form&gt;\n    );\n  }\n}</code></pre>\n<p><a title="代码测试" href="https://codepen.io/gaearon/pen/WooRWa?editors=0010" rel="nofollow">尝试代码</a>。</p>\n<p>由于在非受控组件中使用Refs特性获取了真实Dom的实例，所以在使用非受控组建时，更容易集成React和非React代码，在某些时候也可以省略一些代码。但是建议除了特殊情况，都使用受控组件。</p>\n<p>如果想要深入理解什么情况下使用哪种组件，建议阅读 <a title="受控组件与非受控组件的差异" href="https://goshakkk.name/controlled-vs-uncontrolled-inputs-react/" rel="nofollow">受控和不受控表单输入</a> 一文。</p>\n<h4 id="h4-2">组件默认值</h4>\n<p>在React渲染的生命周期，表单中的value属性会被覆盖Dom中的value值。在使用非受控组件时，通常需要React设定一个默认初始值但是不再控制后续更新。基于这个案例，你可以指定一个<code>defaultValue</code>&nbsp;属性来代替&nbsp;<code>value</code>。</p>\n<pre class="xml"><code class="language-javascript">render() {\n  <span class="code-keyword">return</span> (\n    <span class="code-tag">&lt;<span class="code-name">form</span> <span class="hljs-attr">onSubmit</span>=<span class="code-string">{this.handleSubmit}</span>&gt;</span>\n      <span class="code-tag">&lt;<span class="code-name">label</span>&gt;</span>\n        Name:\n        <span class="code-tag">&lt;<span class="code-name">input</span>\n          <span class="hljs-attr">defaultValue</span>=<span class="code-string">"Bob"</span>\n          <span class="hljs-attr">type</span>=<span class="code-string">"text"</span>\n          <span class="hljs-attr">ref</span>=<span class="code-string">{(input)</span> =&gt;</span> this.input = input} /&gt;\n      <span class="code-tag">&lt;/<span class="code-name">label</span>&gt;</span>\n      <span class="code-tag">&lt;<span class="code-name">input</span> <span class="hljs-attr">type</span>=<span class="code-string">"submit"</span> <span class="hljs-attr">value</span>=<span class="code-string">"Submit"</span> /&gt;</span>\n    <span class="code-tag">&lt;/<span class="code-name">form</span>&gt;</span>\n  );\n}</code></pre>\n<p>例如中“defaultValue = "Bob"”就是指定了一个默认值。同样地，&nbsp;<code>&lt;input type="checkbox"&gt;</code>&nbsp;和&nbsp;<code>&lt;input type="radio"&gt;</code>&nbsp;支持&nbsp;<code>defaultChecked</code>属性，&nbsp;<code>&lt;select&gt;</code>&nbsp;标签支持&nbsp;<code>defaultValue</code>属性。</p>'}});