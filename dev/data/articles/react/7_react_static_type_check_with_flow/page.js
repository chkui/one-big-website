export const content = '<h2 id="h2-1">Flow</h2>\n' +
    '<p>Flow是Facebook开源的静态代码检查工具，他的作用是在运行代码之前对React组件以及Jsx语法进行静态代码的检查以发现一些可能存在的问题。Flow可以用于所有前端开发的项目而不仅仅局限于React，码友们可以到\n' +
    '  <a title="Flow官网" href="https://flow.org/en/docs/getting-started/" rel="nofollow">官网</a>仔细了解（友情提示：可能需要VPN，非常不稳定），本文只介绍如何配合React开发使用。</p>\n' +
    '<p>Flow仅仅是一个用于检查的工具，安装使用都很方便，使用时注意以下3点即可：</p>\n' +
    '<ol>\n' +
    '  <li>将Flow增加到我们的项目中。</li>\n' +
    '  <li>确保编译之后的代码移除了Flow相关的语法。</li>\n' +
    '  <li>在需要检查的地方增加了Flow相关的类型注解。（类似与Java的Annotation机制）</li>\n' +
    '</ol>\n' +
    '<p>接下来我们来一一说明以上三点的具体内容。码友们边阅读边操作即可。</p>\n' +
    '\n' +
    '<h2 id="h2-2">将Flow增加到我们的项目中</h2>\n' +
    '<p>安装最新版本的Flow：</p>\n' +
    '<p>Npm：</p>\n' +
    '<pre class="sql"><code class="language-bash">npm <span class="code-keyword">install</span> <span class="code-comment">--save-dev flow-bin</span></code></pre>\n' +
    '<p>安装完成之后在package.json文件中增加执行脚本：</p>\n' +
    '<pre class="actionscript"><code class="language-javascript">{\n' +
    '  <span class="code-comment"><span class="code-comment">// ...</span></span>\n' +
    '  <span class="code-string"><span class="code-string">"scripts"</span></span>: {\n' +
    '    <span class="code-string"><span class="code-string">"your-script-name"</span></span>: <span class="code-string"><span class="code-string">"flow"</span></span>,\n' +
    '    <span class="code-comment"><span class="code-comment">// ...</span></span>\n' +
    '  },\n' +
    '  <span class="code-comment"><span class="code-comment">// ...</span></span>\n' +
    '}</code></pre>\n' +
    '<p>然后初始化Flow：</p>\n' +
    '<pre class="nginx"><code class="language-bash"><span class="code-attribute">npm</span> run flow init</code></pre>\n' +
    '<p>执行完成后，Flow会在终端输出一下内容：</p>\n' +
    '<pre class="css"><code class="css">&gt; <span class="code-selector-tag"><span class="code-selector-tag">yourProjectName</span></span>@<span class="code-keyword"><span class="code-keyword">1</span></span>.<span class="code-keyword"><span class="code-keyword">0</span></span>.<span class="code-keyword"><span class="code-keyword">0</span></span> flow /yourProjectPath\n' +
    '&gt; flow <span class="code-string"><span class="code-string">"init"</span></span>\n' +
    '</code></pre>\n' +
    '<p>然后在根目录下生成一个名为&nbsp;.flowconfig 的文件，打开之后是这样的：</p>\n' +
    '<pre class="json"><code class="language-bash">[ignore]\n' +
    '\n' +
    '[include]\n' +
    '\n' +
    '[libs]\n' +
    '\n' +
    '[lints]\n' +
    '\n' +
    '[options]\n' +
    '\n' +
    '[strict]\n' +
    '</code></pre>\n' +
    '<p>基本上，配置文件没有什么特殊需求是不用去配置的，Flow默认涵盖了当前目录之后的所有文件。[include]用于引入项目之外的文件。例如：</p>\n' +
    '<pre class="gradle"><code class="gradle">[<span class="code-keyword"><span class="code-keyword">include</span></span>]\n' +
    '\n' +
    '..<span class="hljs-regexp"><span class="hljs-regexp">/otherProject/</span></span>a.js\n' +
    '\n' +
    '[libs]\n' +
    '</code></pre>\n' +
    '<p>他会将和当前项目平级的otherProject/a.js 文件纳入进来。关于配置文件请看<a title="Flow配置文件说明" href="https://flow.org/en/docs/config/" rel="nofollow">这里</a>。</p>\n' +
    '\n' +
    '<h2 id="h2-3">编译之后的代码移除Flow相关的语法</h2>\n' +
    '<p>Flow在JavaScript语法的基础上增加了一些 注解（annotation）进行了扩展。因此浏览器无法正确的解读这些Flow相关的语法，我们必须在编译之后的代码中（最终发布的代码）将增加的Flow注解移除掉。具体方法需要看我们使用了什么样的编译工具。下面将说明一些React开发常用的编译工具</p>\n' +
    '\n' +
    '<h3 id="h3-1">Create React App</h3>\n' +
    '<p>如果你的项目是使用<a title="Create React App" href="https://github.com/facebook/create-react-app" rel="nofollow">Create React App</a>直接创建的。那么移除Flow语法的事项就不用操心了，Create React App已经帮你搞定了这个事，直接跳过这一小节吧。</p>\n' +
    '\n' +
    '<h3 id="h3-2">Babel</h3>\n' +
    '<p>在15.x版本之前入坑React的码友应该绝大部分都用的Babel作为语法糖编译器，那个时候毕竟Create React App完全没有成熟。如果使用Babel我们还需要安装一个Babel对于Flow的preset：</p>\n' +
    '<pre class="sql"><code class="language-apache">npm <span class="code-keyword">install</span> <span class="code-comment">--save-dev babel-preset-flow</span></code></pre>\n' +
    '<p>然后，我们需要在<a title="Babel配置文件" href="http://babeljs.io/docs/usage/babelrc/" target="_blank" rel="nofollow">项目根目录Babel的配置文件 .babelrc 中</a>添加一个Flow相关的preset：</p>\n' +
    '<pre class="json"><code class="language-javascript">{\n' +
    '  <span class="code-string"><span class="hljs-attr">"presets"</span></span>: [\n' +
    '    <span class="code-string"><span class="code-string">"flow"</span></span>,\n' +
    '    <span class="code-comment">//other config</span>\n' +
    '  ]\n' +
    '}</code></pre>\n' +
    '\n' +
    '<h3 id="h3-3">其他方式</h3>\n' +
    '<p>如果你既没有使用Create React App也没使用Babel作为语法糖编译器，那么可以使用<a title="Flow语法处理工具" href="https://github.com/flowtype/flow-remove-types" rel="nofollow">&nbsp;flow-remove-types </a>这个工具在发布之前移除Flow代码。</p>\n' +
    '\n' +
    '<h2 id="h2-4">运行Flow</h2>\n' +
    '<p>完成上述步骤之后，就可以开始运行flow了：</p>\n' +
    '<pre class="nginx"><code class="language-bash"><span class="code-attribute">npm</span> run flow</code></pre>\n' +
    '<p>然后会输类似一下的内容：</p>\n' +
    '<pre class="css"><code class="css">&gt; <span class="code-selector-tag"><span class="code-selector-tag">yourProjectName</span></span>@<span class="code-keyword"><span class="code-keyword">1</span></span>.<span class="code-keyword"><span class="code-keyword">0</span></span>.<span class="code-keyword"><span class="code-keyword">0</span></span> flow /yourProjectPath\n' +
    '&gt; flow\n' +
    '\n' +
    'Launching Flow server for /yourProjectPath\n' +
    'Spawned flow server (pid=<span class="hljs-number"><span class="hljs-number">10705</span></span>)\n' +
    'Logs will go to /tmp/flow/zSworkzSchkuizSone-big-website.log\n' +
    'Monitor logs will go to /tmp/flow/zSworkzSchkuizSone-big-website.monitor_log\n' +
    'No errors!\n' +
    '</code></pre>\n' +
    '<p>第一次运行会生成很多临时文件比较慢，之后会快许多。</p>\n' +
    '\n' +
    '<h2 id="h2-5">增加Flow注解</h2>\n' +
    '<p>如果你了解C++/C#的元编程或者Java的Annotation，那么理解Flow的Annotation就会非常轻松。大概就是在文件、方法、代码块之前增加一个注解（Annotation）用来告知Flow的执行行为。</p>\n' +
    '<p>首先，Flow只检查包含 // @flow 注解的文件。所以如果需要检查，我们需要这样编写我们的文件：</p>\n' +
    '<pre class="scala"><code class="language-javascript"><span class="code-comment"><span class="code-comment">// @flow</span></span>\n' +
    '<span class="code-keyword"><span class="code-keyword">import</span></span> <span class="code-type">React</span> <span class="code-keyword">from</span> <span class="code-string"><span class="hljs-symbol">\'reac</span>t\'</span>\n' +
    '\n' +
    '<span class="hljs-class"><span class="code-keyword"><span class="hljs-class"><span class="code-keyword">class</span></span></span><span class="hljs-class"> </span><span class="code-title"><span class="hljs-class"><span class="code-title">MyComponent</span></span></span><span class="hljs-class"> </span><span class="code-keyword"><span class="hljs-class"><span class="code-keyword">extends</span></span></span><span class="hljs-class"> </span><span class="code-title"><span class="hljs-class"><span class="code-title">React</span></span></span><span class="hljs-class">.</span><span class="code-title"><span class="hljs-class"><span class="code-title">Component</span></span></span><span class="hljs-class"> </span></span>{\n' +
    '    render(){\n' +
    '        <span class="code-keyword"><span class="code-keyword">return</span></span> (<span class="xml"><span class="code-tag">&lt;<span class="code-name">div</span>&gt;</span><span class="code-type">MyComponent</span><span class="code-tag">&lt;/<span class="code-name">div</span>&gt;</span></span>)\n' +
    '    }\n' +
    '}\n' +
    '\n' +
    '<span class="code-keyword">export</span> <span class="code-keyword"><span class="code-keyword">default</span></span> <span class="code-type">MyComponent</span></code></pre>\n' +
    '<p>然后我们再运行Flow就变成这样的风格了：</p>\n' +
    '<pre class="scala"><code class="language-bash">&gt; yourProjectName@<span class="hljs-number">1.0</span><span class="hljs-number">.0</span> flow /yourProjectPath\n' +
    '&gt; flow\n' +
    '\n' +
    '<span class="code-type">Error</span> ┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈ dev/src/home/test.js:<span class="hljs-number">5</span>:<span class="hljs-number">21</span>\n' +
    '\n' +
    '<span class="code-type">Cannot</span> use property <span class="code-type">Component</span> [<span class="hljs-number">1</span>] <span class="code-keyword">with</span> less than <span class="hljs-number">1</span> <span class="code-built_in"><span class="hljs-class"><span class="code-keyword">type</span></span></span><span class="hljs-class"> <span class="code-title">argument</span>.</span>\n' +
    '\n' +
    '     dev/src/home/test.js\n' +
    '      <span class="hljs-number">2</span>│\n' +
    '      <span class="hljs-number">3</span>│ <span class="code-keyword">import</span> <span class="code-type">React</span> from <span class="code-string"><span class="hljs-symbol">\'reac</span>t\'</span>\n' +
    '      <span class="hljs-number">4</span>│\n' +
    '      <span class="hljs-number">5</span>│ <span class="hljs-class"><span class="code-keyword">class</span> <span class="code-title">MyComponent</span> <span class="code-keyword">extends</span> <span class="code-title">React</span>.<span class="code-title">Component</span> </span>{\n' +
    '      <span class="hljs-number">6</span>│     <span class="hljs-function"><span class="code-title">render</span></span>(){\n' +
    '      <span class="hljs-number">7</span>│         <span class="code-built_in"><span class="code-keyword">return</span></span> (&lt;div&gt;<span class="code-type">MyComponent</span>&lt;/div&gt;)\n' +
    '      <span class="hljs-number">8</span>│     }\n' +
    '\n' +
    '     /tmp/flow/flowlib_cc1898a/react.js\n' +
    ' [<span class="hljs-number">1</span>] <span class="hljs-number">26</span>│ <span class="code-built_in">declare</span> <span class="hljs-class"><span class="code-keyword">class</span> <span class="code-title">React</span></span><span class="code-variable"><span class="hljs-class"><span class="code-title">$Component</span></span></span><span class="hljs-class"><span class="code-title">&lt;Props</span>, <span class="code-title">State</span> </span>= void&gt; {</code></pre>\n' +
    '<p>到这里，Flow已经算是安装成功了，接写来的事是要增加各种注解以加强类型限定或者参数检测。之后的内容将简要介绍flow的相关语法规则。</p>\n' +
    '\n' +
    '<h2 id="h2-6">React组件参数检查</h2>\n' +
    '<p><a title="PropType参数类型检测" href="/article/react/react_typechecking_with_proptypes_and_dom_element">https://www.chkui.com/article/react/react_typechecking_with_proptypes_and_dom_element</a>介绍了React通过PropType机制限定使用者使用组件传递的参数类型以及范围，但是PropType是一种运行检测机制，在程序跑起来之后获取到具体数据才会执行检查。而Flow是静态检查，是在代码编译运行之前进行一次检查，两者相辅相成互不干扰。</p>\n' +
    '\n' +
    '<h3 id="h3-4">Props参数检查</h3>\n' +
    '<p>承接上面 MyComponent 的例子，我们引入Flow的注解对代码进行检查：</p>\n' +
    '<pre class="scala"><code class="language-javascript"><span class="code-comment"><span class="code-comment">// @flow</span></span>\n' +
    '<span class="code-comment"><span class="code-comment">// flow的例子，可以看看和PropType的差异在哪</span></span>\n' +
    '<span class="code-keyword"><span class="code-keyword">import</span></span> <span class="code-type">React</span> <span class="code-keyword">from</span> <span class="code-string"><span class="hljs-symbol">\'reac</span>t\'</span>\n' +
    '\n' +
    '<span class="hljs-class"><span class="code-keyword">type</span> <span class="code-title">Props</span> </span>= {\n' +
    '    num : number,\n' +
    '    text : ?string\n' +
    '}\n' +
    '\n' +
    '<span class="code-comment"><span class="code-comment">//通过&lt;&gt;引入Flow类型检查</span></span>\n' +
    '<span class="code-comment"><span class="code-comment">//可以直接写成 React.Component&lt;{num : number, text ?: string}&gt;这样的形式</span></span>\n' +
    '<span class="hljs-class"><span class="code-keyword"><span class="hljs-class"><span class="code-keyword">class</span></span></span><span class="hljs-class"> </span><span class="code-title"><span class="hljs-class"><span class="code-title">MyComponent</span></span></span><span class="hljs-class"> </span><span class="code-keyword"><span class="hljs-class"><span class="code-keyword">extends</span></span></span><span class="hljs-class"> </span><span class="code-title"><span class="hljs-class"><span class="code-title">React</span></span></span><span class="hljs-class">.</span><span class="code-title"><span class="hljs-class"><span class="code-title">Component</span></span></span><span class="hljs-class"><span class="code-title">&lt;</span></span><span class="code-title"><span class="hljs-class"><span class="code-title">Props</span></span></span><span class="hljs-class"><span class="code-title">&gt;</span> </span></span>{\n' +
    '    render(){\n' +
    '        <span class="code-keyword"><span class="code-keyword">return</span></span> (<span class="xml"><span class="code-tag">&lt;<span class="code-name">div</span>&gt;</span>{<span class="code-keyword">this</span>.props.num}\\{<span class="code-keyword">this</span>.props.text}<span class="code-tag">&lt;/<span class="code-name">div</span>&gt;</span></span>)\n' +
    '    }\n' +
    '}\n' +
    '\n' +
    '<span class="code-keyword">export</span> <span class="code-keyword"><span class="code-keyword">default</span></span> <span class="code-type">MyComponent</span></code></pre>\n' +
    '<p>然后在运行Flow，输出了No Error。</p>\n' +
    '<p>然后我们使用这个组件：</p>\n' +
    '<pre class="scala"><code class="language-javascript"><span class="code-comment"><span class="code-comment">// @flow</span></span>\n' +
    '<span class="code-comment"><span class="code-comment">// flow的例子，可以看看和PropType的差异在哪</span></span>\n' +
    '<span class="code-keyword"><span class="code-keyword">import</span></span> <span class="code-type">React</span> <span class="code-keyword">from</span> <span class="code-string"><span class="hljs-symbol">\'reac</span>t\'</span>\n' +
    '\n' +
    '<span class="hljs-class"><span class="code-keyword">type</span> <span class="code-title">Props</span> </span>= {\n' +
    '    num : number,\n' +
    '    text : ?string\n' +
    '}\n' +
    '\n' +
    '<span class="hljs-class"><span class="code-keyword"><span class="hljs-class"><span class="code-keyword">class</span></span></span><span class="hljs-class"> </span><span class="code-title"><span class="hljs-class"><span class="code-title">MyComponent</span></span></span><span class="hljs-class"> </span><span class="code-keyword"><span class="hljs-class"><span class="code-keyword">extends</span></span></span><span class="hljs-class"> </span><span class="code-title"><span class="hljs-class"><span class="code-title">React</span></span></span><span class="hljs-class">.</span><span class="code-title"><span class="hljs-class"><span class="code-title">Component</span></span></span><span class="hljs-class"><span class="code-title">&lt;</span></span><span class="code-title"><span class="hljs-class"><span class="code-title">Props</span></span></span><span class="hljs-class"><span class="code-title">&gt;</span> </span></span>{\n' +
    '    render(){\n' +
    '        <span class="code-keyword"><span class="code-keyword">this</span></span>.props.myValue;\n' +
    '        <span class="code-keyword"><span class="code-keyword">return</span></span> (<span class="xml"><span class="code-tag">&lt;<span class="code-name">div</span>&gt;</span>{<span class="code-keyword">this</span>.props.num}\\{<span class="code-keyword">this</span>.props.text}<span class="code-tag">&lt;/<span class="code-name">div</span>&gt;</span></span>)\n' +
    '    }\n' +
    '}\n' +
    '\n' +
    '<span class="code-comment"><span class="code-comment">//void 表示 undefined 不传递参数</span></span>\n' +
    '<span class="code-comment"><span class="code-comment">//这里传递类型发生错误</span></span>\n' +
    '<span class="code-keyword">const</span> <span class="code-type">UseComponent</span> = (props : <span class="code-keyword">void</span>) =&gt;(<span class="xml"><span class="code-tag">&lt;<span class="code-name"><span class="code-type">MyComponent</span></span> <span class="hljs-attr">num</span>=<span class="code-string"><span class="code-string">"2"</span></span> <span class="hljs-attr">text</span>=<span class="code-string">{<span class="hljs-number">2</span>}/</span>&gt;</span>)\n' +
    '\n' +
    'export <span class="code-keyword">default</span> <span class="code-type">UseComponent</span></span></code></pre>\n' +
    '<p>运行flow之后输出：</p>\n' +
    '<pre class="actionscript"><code class="language-bash">Error ┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈ dev/src/home/test.js:<span class="hljs-number">12</span>:<span class="hljs-number">20</span>\n' +
    '\n' +
    'Cannot <span class="code-keyword">get</span> <span class="code-keyword">this</span>.props.myValue because property myValue <span class="code-keyword">is</span> missing <span class="code-keyword"><span class="code-keyword">in</span></span> Props [<span class="hljs-number">1</span>].\n' +
    '\n' +
    '      <span class="hljs-number">9</span>│\n' +
    ' [<span class="hljs-number">1</span>] <span class="hljs-number">10</span>│ <span class="hljs-class"><span class="code-keyword">class</span> <span class="code-title">MyComponent</span> <span class="code-keyword">extends</span> <span class="code-title">React</span>.<span class="code-title">Component</span>&lt;<span class="code-title">Props</span>&gt; </span>{\n' +
    '     <span class="hljs-number">11</span>│     <span class="hljs-function"><span class="code-title">render</span></span>(){\n' +
    '     <span class="hljs-number">12</span>│         <span class="code-keyword">this</span>.props.myValue;\n' +
    '     <span class="hljs-number">13</span>│         <span class="code-built_in"><span class="code-keyword">return</span></span> (&lt;div&gt;{<span class="code-keyword">this</span>.props.num}\\{<span class="code-keyword">this</span>.props.text}&lt;/div&gt;)\n' +
    '     <span class="hljs-number">14</span>│     }\n' +
    '     <span class="hljs-number">15</span>│ }\n' +
    '\n' +
    '\n' +
    'Error ┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈ dev/src/home/test.js:<span class="hljs-number">17</span>:<span class="hljs-number">40</span>\n' +
    '\n' +
    'Cannot create MyComponent element because:\n' +
    ' • string [<span class="hljs-number">1</span>] <span class="code-keyword">is</span> incompatible <span class="code-keyword">with</span> number [<span class="hljs-number">2</span>] <span class="code-keyword"><span class="code-keyword">in</span></span> property num.\n' +
    ' • number [<span class="hljs-number">3</span>] <span class="code-keyword">is</span> incompatible <span class="code-keyword">with</span> string [<span class="hljs-number">4</span>] <span class="code-keyword"><span class="code-keyword">in</span></span> property text.\n' +
    '\n' +
    '    [<span class="hljs-number">2</span>]  <span class="hljs-number">6</span>│     num : number,\n' +
    '    [<span class="hljs-number">4</span>]  <span class="hljs-number">7</span>│     text : ?string\n' +
    '          :\n' +
    '        <span class="hljs-number">14</span>│     }\n' +
    '        <span class="hljs-number">15</span>│ }\n' +
    '        <span class="hljs-number">16</span>│\n' +
    ' [<span class="hljs-number">1</span>][<span class="hljs-number">3</span>] <span class="hljs-number">17</span>│ <span class="code-keyword">const</span> UseComponent = (props : <span class="code-keyword">void</span>) =&gt;(&lt;MyComponent num=<span class="code-string"><span class="code-string">"2"</span></span> text={<span class="hljs-number">2</span>}/&gt;)\n' +
    '        <span class="hljs-number">18</span>│\n' +
    '        <span class="hljs-number">19</span>│ <span class="code-built_in">export</span> <span class="code-keyword">default</span> UseComponent\n' +
    '\n' +
    '\n' +
    '\n' +
    'Found <span class="hljs-number">3</span> errors</code></pre>\n' +
    '<p>输出内容可以看出一共有2个错误栏输出：</p>\n' +
    '<ul>\n' +
    '  <li>第一栏表示myValue并没有声明。</li>\n' +
    '  <li>第二栏[1]违反了[2]的限定，[3]违反了[4]的限定。我们将组件变更为&lt;MyComponent num={2}&nbsp;text="2"/&gt;即可检查通过。</li>\n' +
    '</ul>\n' +
    '\n' +
    '<h3 id="h3-5">增加对State的检查</h3>\n' +
    '<p>React的数据通过两处控制——<a title="React 深入说明JSX语法与Props特性" href="https://www.chkui.com/article/react/react_understand_jsx_and_props">props</a> 和&nbsp;<a title="React 状态、事件与动态渲染" href="https://www.chkui.com/article/react/react_state_event_and_render" rel="nofollow">state</a>。Flow也提供了state数据的检查，我们在例子中增加state检查：</p>\n' +
    '<pre class="scala"><code class="language-javascript"><span class="code-comment"><span class="code-comment">// @flow</span></span>\n' +
    '<span class="code-comment"><span class="code-comment">// flow的例子，可以看看和PropType的差异在哪</span></span>\n' +
    '<span class="code-keyword"><span class="code-keyword">import</span></span> <span class="code-type">React</span> <span class="code-keyword">from</span> <span class="code-string"><span class="hljs-symbol">\'reac</span>t\'</span>\n' +
    '\n' +
    '<span class="hljs-class"><span class="code-keyword">type</span> <span class="code-title">Props</span> </span>= {\n' +
    '    num : number,\n' +
    '    text : ?string\n' +
    '}\n' +
    '\n' +
    '<span class="hljs-class"><span class="code-keyword">type</span> <span class="code-title">State</span> </span>= {\n' +
    '    count: number,\n' +
    '};\n' +
    '\n' +
    '<span class="hljs-class"><span class="code-keyword"><span class="hljs-class"><span class="code-keyword">class</span></span></span><span class="hljs-class"> </span><span class="code-title"><span class="hljs-class"><span class="code-title">MyComponent</span></span></span><span class="hljs-class"> </span><span class="code-keyword"><span class="hljs-class"><span class="code-keyword">extends</span></span></span><span class="hljs-class"> </span><span class="code-title"><span class="hljs-class"><span class="code-title">React</span></span></span><span class="hljs-class">.</span><span class="code-title"><span class="hljs-class"><span class="code-title">Component</span></span></span><span class="hljs-class"><span class="code-title">&lt;</span></span><span class="code-title"><span class="hljs-class"><span class="code-title">Props</span></span></span><span class="hljs-class">, </span><span class="code-title"><span class="hljs-class"><span class="code-title">State</span></span></span><span class="hljs-class"><span class="code-title">&gt;</span> </span></span>{\n' +
    '    <span class="code-keyword">constructor</span>(...props){\n' +
    '        <span class="code-keyword"><span class="code-keyword">super</span></span>(...props)\n' +
    '        <span class="code-keyword"><span class="code-keyword">this</span></span>.state = {count:<span class="code-string">\'<span class="hljs-number">1</span>\'</span>}\n' +
    '    }\n' +
    '\n' +
    '    render(){\n' +
    '        <span class="code-keyword"><span class="code-keyword">return</span></span> (<span class="xml"><span class="code-tag">&lt;<span class="code-name">div</span>&gt;</span>{<span class="code-keyword">this</span>.props.num}\\{<span class="code-keyword">this</span>.props.text}<span class="code-tag">&lt;/<span class="code-name">div</span>&gt;</span></span>)\n' +
    '    }\n' +
    '}\n' +
    '\n' +
    '<span class="code-keyword">const</span> <span class="code-type">UseComponent</span> = (props : <span class="code-keyword">void</span>) =&gt;(<span class="xml"><span class="code-tag">&lt;<span class="code-name"><span class="code-type">MyComponent</span></span> <span class="hljs-attr">num</span>=<span class="code-string">{<span class="hljs-number">2</span>}</span> <span class="hljs-attr">text</span>=<span class="code-string"><span class="code-string">"2"</span></span>/&gt;</span>)\n' +
    '\n' +
    'export <span class="code-keyword">default</span> <span class="code-type">UseComponent</span></span></code></pre>\n' +
    '<p>此时运行Flow会输出：</p>\n' +
    '<pre class="scala"><code class="language-bash"><span class="code-type">Error</span> ┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈ dev/src/home/test.js:<span class="hljs-number">17</span>:<span class="hljs-number">29</span>\n' +
    '\n' +
    '<span class="code-type">Cannot</span> assign <span class="hljs-class"><span class="code-keyword">object</span> <span class="code-title">literal</span> <span class="code-title">to</span> <span class="code-title">this</span>.<span class="code-title">state</span> <span class="code-title">because</span> <span class="code-title">string</span> [1] <span class="code-title">is</span> <span class="code-title">incompatible</span></span>\n' +
    '<span class="code-keyword">with</span> number [<span class="hljs-number">2</span>] <span class="code-keyword">in</span> property count.\n' +
    '\n' +
    ' [<span class="hljs-number">2</span>] <span class="hljs-number">11</span>│     count: number,\n' +
    '     <span class="hljs-number">12</span>│ };\n' +
    '     <span class="hljs-number">13</span>│\n' +
    '     <span class="hljs-number">14</span>│ <span class="hljs-class"><span class="code-keyword">class</span> <span class="code-title">MyComponent</span> <span class="code-keyword">extends</span> <span class="code-title">React</span>.<span class="code-title">Component&lt;Props</span>, <span class="code-title">State&gt;</span> </span>{\n' +
    '     <span class="hljs-number">15</span>│     constructor(...props){\n' +
    '     <span class="hljs-number">16</span>│         <span class="code-keyword">super</span>(...props)\n' +
    ' [<span class="hljs-number">1</span>] <span class="hljs-number">17</span>│         <span class="code-keyword">this</span>.state = {count:<span class="code-string">\'<span class="hljs-number">1</span>\'</span>}\n' +
    '     <span class="hljs-number">18</span>│     }\n' +
    '     <span class="hljs-number">19</span>│\n' +
    '     <span class="hljs-number">20</span>│     <span class="hljs-function"><span class="code-title">render</span></span>(){\n' +
    '</code></pre>\n' +
    '<p>检测出state.count在构造函数中赋值的类型错误。</p>\n' +
    '\n' +
    '<h3 id="h3-6">组件默认值</h3>\n' +
    '<p>使用Flow后一样可以使用默认值，但是必须要注意默认值的类型要和注解声明的一致：</p>\n' +
    '<pre class="scala"><code class="language-javascript"><span class="code-keyword"><span class="code-keyword">import</span></span> * <span class="code-keyword">as</span> <span class="code-type">React</span> <span class="code-keyword">from</span> <span class="code-string"><span class="hljs-symbol">\'reac</span>t\'</span>;\n' +
    '\n' +
    '<span class="hljs-class"><span class="code-keyword">type</span> <span class="code-title">Props</span> </span>= {\n' +
    '  foo: number, \n' +
    '};\n' +
    '\n' +
    '<span class="hljs-class"><span class="code-keyword"><span class="hljs-class"><span class="code-keyword">class</span></span></span><span class="hljs-class"> </span><span class="code-title"><span class="hljs-class"><span class="code-title">MyComponent</span></span></span><span class="hljs-class"> </span><span class="code-keyword"><span class="hljs-class"><span class="code-keyword">extends</span></span></span><span class="hljs-class"> </span><span class="code-title"><span class="hljs-class"><span class="code-title">React</span></span></span><span class="hljs-class">.</span><span class="code-title"><span class="hljs-class"><span class="code-title">Component</span></span></span><span class="hljs-class"><span class="code-title">&lt;</span></span><span class="code-title"><span class="hljs-class"><span class="code-title">Props</span></span></span><span class="hljs-class"><span class="code-title">&gt;</span> </span></span>{\n' +
    '  <span class="code-keyword">static</span> defaultProps = {\n' +
    '    foo: <span class="hljs-number"><span class="hljs-number">42</span></span>, \n' +
    '  };\n' +
    '}</code></pre>\n' +
    '\n' +
    '<h3 id="h3-7">函数类型的组件</h3>\n' +
    '<p>除了使用Class关键字，使用函数同样可以构造一个React组件，配合Flow使用：</p>\n' +
    '<pre class="javascript"><code class="language-javascript"><span class="code-keyword"><span class="code-keyword">import</span></span> React <span class="code-keyword"><span class="code-keyword">from</span></span> <span class="code-string"><span class="code-string">\'react\'</span></span>;\n' +
    '\n' +
    'type Props = {<span class="code-comment"><span class="code-comment">//参数检查</span></span>\n' +
    '  foo: number,\n' +
    '  bar?: string,\n' +
    '};\n' +
    '\n' +
    '<span class="hljs-function"><span class="code-keyword"><span class="hljs-function"><span class="code-keyword">function</span></span></span><span class="hljs-function"> </span><span class="code-title"><span class="hljs-function"><span class="code-title">MyComponent</span></span></span><span class="hljs-function">(</span><span class="hljs-params"><span class="hljs-function"><span class="hljs-params">props: Props</span></span></span><span class="hljs-function">) </span></span>{\n' +
    '  <span class="code-keyword"><span class="code-keyword">return</span></span> <span class="xml"><span class="code-tag"><span class="xml"><span class="code-tag">&lt;</span></span><span class="code-name"><span class="xml"><span class="code-tag"><span class="code-name">div</span></span></span></span><span class="xml"><span class="code-tag">&gt;</span></span></span><span class="xml">{props.bar}</span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;/</span></span><span class="code-name"><span class="xml"><span class="code-tag"><span class="code-name">div</span></span></span></span><span class="xml"><span class="code-tag">&gt;</span></span></span></span>;\n' +
    '}\n' +
    '\n' +
    'MyComponent.defaultProps = {\n' +
    '  foo: <span class="hljs-number"><span class="hljs-number">42</span></span> <span class="code-comment"><span class="code-comment">//指定默认值</span></span>\n' +
    '};</code></pre>\n' +
    '\n' +
    '<h3 id="h3-8">React事件、子组件、高阶组件检查扩展</h3>\n' +
    '<p>除了对单个组件基本的检查，Flow还提供了对React事件、refs、子组件、高阶组件、Redux。本文就不一一介绍了，有需要的码友可以按照下面的资源清单去了解相关的内容：</p>\n' +
    '<ul>\n' +
    '  <li><a title="Flow React事件检查" href="https://flow.org/en/docs/react/events/" rel="nofollow">React事件</a></li>\n' +
    '  <li><a title="Flow Refs引入对象检查" href="https://flow.org/en/docs/react/refs/" rel="nofollow">Refs引入对象</a></li>\n' +
    '  <li><a title="Flow React子组件列表检查" href="https://flow.org/en/docs/react/children/" rel="nofollow">子组件列表</a></li>\n' +
    '  <li><a title="Flow React高阶组件参数检查" href="https://flow.org/en/docs/react/hoc/" rel="nofollow">高阶组件参数</a></li>\n' +
    '  <li><a title="Flow ReactRedux整合参数检查" href="https://flow.org/en/docs/react/redux/" rel="nofollow">Redux整合</a></li>\n' +
    '</ul>\n' +
    '\n' +
    '<h3 id="h3-9">类型检查扩展</h3>\n' +
    '<p>Flow会检查所有的JavaScript基础类型——Boolean、String、Number、null、undefined（在Flow中用void代替）。除此之外还提供了一些操作符号，例如例子中的 text : ?string，他表示参数存在“没有值”的情况，除了传递string类型之外，还可以是null或undefined。需要特别注意的是，这里的没有值和JavaScript的表达式的“非”是两个概念，Flow的“没有值”只有null、void（undefined），而JavaScript表达式的“非”包含：null、undefined、0、false。</p>\n' +
    '<p>除了前面的例子中给出的各种类型参数，Flow还有更丰富的检查功能，查看 <a title="Flow 检查参数说明" href="https://flow.org/en/docs/types/" rel="nofollow">这里</a> 以了解更多内容。</p>\n' +
    '\n' +
    '<h3 id="h3-10">React数据类型参考</h3>\n' +
    '<p>对于Flow来说，除了常规的JavaScript数据类型之外，React也有自己特有的数据类型。比如React.Node、React.Key、React.Ref&lt;&gt;等。需要详细了解的，可以查看官网关于<a title="Flow React类型的说明" href="https://flow.org/en/docs/react/types/" rel="nofollow">React类型的说明</a>。</p>\n' +
    '<p>需要特别说明的是，如果所要使用React的类型，在通过ES6引入React对象时需要使用这样的方式：</p>\n' +
    '<pre class="python"><code class="language-javascript"><span class="code-keyword"><span class="code-keyword">import</span></span> * <span class="code-keyword"><span class="code-keyword">as</span></span> React <span class="code-keyword"><span class="code-keyword">from</span></span> <span class="code-string"><span class="code-string">\'react\'</span></span>\n' +
    '<span class="code-comment">//替换 <span class="code-keyword">import</span> React <span class="code-keyword">from</span> <span class="code-string">\'react\'</span></span>\n' +
    '\n' +
    '<span class="code-comment">//或者单独引入一个类型</span>\n' +
    '<span class="code-comment">//<span class="code-keyword">import</span> type {Node} <span class="code-keyword">from</span> <span class="code-string">\'react</span></span></code></pre>\n' +
    '<p>两者的差异在于ES6的星号import的特性，使用*号会将一个文件中的所有 export 内容组合成一个对象返回，而不使用星号仅仅能获取到exprot default 那个原型。而引入Flow后不会修改React的默认导出类型，因为默认导出不一定是一个对象，他会通过export为React扩展更多的类型。</p>\n' +
    '<p>比如我们用React.Node限制render方法的返回类型：</p>\n' +
    '<pre class="scala"><code class="language-javascript"><span class="code-keyword"><span class="code-keyword">import</span></span> * <span class="code-keyword">as</span> <span class="code-type">React</span> <span class="code-keyword">from</span> <span class="code-string"><span class="hljs-symbol">\'reac</span>t\'</span>\n' +
    '<span class="hljs-class"><span class="code-keyword"><span class="hljs-class"><span class="code-keyword">class</span></span></span><span class="hljs-class"> </span><span class="code-title"><span class="hljs-class"><span class="code-title">MyComponent</span></span></span><span class="hljs-class"> </span><span class="code-keyword"><span class="hljs-class"><span class="code-keyword">extends</span></span></span><span class="hljs-class"> </span><span class="code-title"><span class="hljs-class"><span class="code-title">React</span></span></span><span class="hljs-class">.</span><span class="code-title"><span class="hljs-class"><span class="code-title">Component</span></span></span><span class="hljs-class"><span class="code-title">&lt;</span></span></span>{}&gt; {\n' +
    '  render(): <span class="code-type">React</span>.<span class="code-type">Node</span> {\n' +
    '    <span class="code-comment"><span class="code-comment">// ...</span></span>\n' +
    '  }\n' +
    '}</code></pre>\n' +
    '\n' +
    '<h2 id="h2-7">遇到的一些问题</h2>\n' +
    '<p>我在使用的过程中目前遇到的问题之一是import 样式资源&nbsp;或&nbsp; 图片时报 “./xxx.scss. Required module not found” 的以常，查看官方文档了解Flow只支持.js、.jsx、.mjs、.json的文件，如果需要导入其他文件需要并支持需要扩展options。在.flowconfig添加options：</p>\n' +
    '<pre class=""><code class="">[ignore]\n' +
    '[<span class="code-keyword"><span class="code-keyword">include</span></span>]\n' +
    '[libs]\n' +
    '[lints]\n' +
    '[options]\n' +
    '<span class="code-keyword"><span class="code-keyword">module</span></span>.file_ext=.scss\n' +
    '[strict]</code></pre>\n' +
    '<p>此外，某些IDE对Flow的支持不是很好。我目前所使用的webstorm 2017.3.5相对还不错，不过切记要到File-&gt;Setting-&gt;Languages&amp;Frameworks-&gt;Javascript中将version设置为Flow。</p>\n' +
    '\n' +
    '<h2 id="h2-8">写在最后的使用心得</h2>\n' +
    '<p>引入并按照Flow的规范去约束每一个组件会导致开发量增加不少（当然你引入不用是另外一回事，但是不用引入他做什么？）。搭建好Flow的框架功能仅仅是开始，之后除了团队成员要去了解flow的使用方法，早期还会遇到各种坑需要去解决。而且Flow也要比React的 <a title="React 深入说明JSX语法与Props特性" href="/article/react/react_understand_jsx_and_props">PropTypes</a>&nbsp;要”重“许多。</p>\n' +
    '<p>JavaScript本来是一个类型推导的原型语言，弄个Flow进来搞得越来越像Java这种强类型语言，也不知道是好是坏，而Java10又学JavaScript等加如了val这种类型推导得关键字....。</p>\n' +
    '<p>总的来说引入规范是有成本的，具体要看团队规模以及项目大小，不是引入越多得技术栈就越有逼格。如果你独立项目的前端开发人数并不多，或者代码膨胀（代码腐烂）速度也没有让你措手不及，建议慎重引入Flow。Flow除了开发人员自检还要整合到整个测试框架中，在集成测试或某个版本的代码发布之前进行集中检查。需要思考它在项目的开发、测试、仿真、上线迭代周期中扮演的角色，甚至整合到类似与CMMI之类的管理流程去反向量化考核代码质量。</p>';