export const content = '<h1 id="h1-1">JSX基础介绍</h1>\n' +
    '<p>先看看一个最简单的例子：</p>\n' +
    '<pre class="javascript"><code class="language-javascript"><span class="code-keyword"><span class="code-keyword">const</span></span> element = <span class="xml"><span class="code-tag"><span class="xml"><span class="code-tag">&lt;</span></span><span class="code-name"><span class="xml"><span class="code-tag"><span class="code-name">h1</span></span></span></span><span class="xml"><span class="code-tag">&gt;</span></span></span><span class="xml">Hello, world!</span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;/</span></span><span class="code-name"><span class="xml"><span class="code-tag"><span class="code-name">h1</span></span></span></span><span class="xml"><span class="code-tag">&gt;</span></span></span></span>;</code></pre>\n' +
    '<p>上面这段有趣的例子既不是标准的JavaScript也不是HTML，它就是我们接下来要介绍的JSX的语法，是一种JavaScript的扩展。在React中使用JSX描述一个UI是什么样子的，就好像HTML告诉浏览器我们看到的页面是什么样子。最开始接触JSX时会感觉它很像一种模板语言，但是除了提供模板能力之外，他拥有JavaScript所有的能力。</p>\n' +
    '<p>JSX用于产生React的组件，JSX最大的特色就是就是在JavaScript中嵌入和HTML表达式。我们先看下面这个例子：</p>\n' +
    '<pre class="javascript"><code class="language-javascript"><span class="hljs-function"><span class="code-keyword"><span class="hljs-function"><span class="code-keyword">function</span></span></span><span class="hljs-function"> </span><span class="code-title"><span class="hljs-function"><span class="code-title">formatName</span></span></span><span class="hljs-function">(</span><span class="hljs-params"><span class="hljs-function"><span class="hljs-params">user</span></span></span><span class="hljs-function">) </span></span>{\n' +
    '  <span class="code-comment"><span class="code-comment">//将参数合并成一个srting</span></span>\n' +
    '  <span class="code-keyword"><span class="code-keyword">return</span></span> user.firstName + <span class="code-string"><span class="code-string">\' \'</span></span> + user.lastName;\n' +
    '}\n' +
    '\n' +
    '<span class="code-comment"><span class="code-comment">//创建user对象</span></span>\n' +
    '<span class="code-keyword"><span class="code-keyword">const</span></span> user = {\n' +
    '  firstName: <span class="code-string"><span class="code-string">\'Harper\'</span></span>,\n' +
    '  lastName: <span class="code-string"><span class="code-string">\'Perez\'</span></span>\n' +
    '};\n' +
    '\n' +
    '<span class="code-comment"><span class="code-comment">//创建element对象，并用JSX语法标识为一个html内容。</span></span>\n' +
    '<span class="code-comment"><span class="code-comment">//h1标签中会包含方法计算之后的内容</span></span>\n' +
    '<span class="code-keyword"><span class="code-keyword">const</span></span> element = (\n' +
    '  <span class="xml"><span class="code-tag"><span class="xml"><span class="code-tag">&lt;</span></span><span class="code-name"><span class="xml"><span class="code-tag"><span class="code-name">h1</span></span></span></span><span class="xml"><span class="code-tag">&gt;</span></span></span><span class="xml">\n' +
    '    Hello, {formatName(user)}!\n' +
    '  </span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;/</span></span><span class="code-name"><span class="xml"><span class="code-tag"><span class="code-name">h1</span></span></span></span><span class="xml"><span class="code-tag">&gt;</span></span></span></span>\n' +
    ');\n' +
    '\n' +
    'ReactDOM.render(\n' +
    '  element,\n' +
    '  <span class="code-built_in"><span class="code-built_in">document</span></span>.getElementById(<span class="code-string"><span class="code-string">\'root\'</span></span>)\n' +
    ');</code></pre>\n' +
    '<p><a title="测试代码" href="http://codepen.io/gaearon/pen/PGEjdG?editors=0010" rel="nofollow">测试代码</a></p>\n' +
    '<p>这个例子将JSX语法分成了很多部分，element就是一个HTML的JSX表达式，HTML标签最好使用一组()括号包裹起来以避免分号导致的问题（分号可能会在编译时成为HTML内容的一部分）。ReactDOM是一个react工具，用于提供Dom渲染功能。ReactDOM.render 方法接受2个参数，一个是要渲染的JSX元素，另外一个是Dom对象，render会在这个Dom对象中添加由JSX定义的HTML。</p>\n' +
    '<p>JSX是一种丰富的表达式，他可以随意嵌套JavaScript和HTML使用，例如if、for等等，比如：</p>\n' +
    '<pre class="javascript"><code class="language-javascript"><span class="hljs-function"><span class="code-keyword"><span class="hljs-function"><span class="code-keyword">function</span></span></span><span class="hljs-function"> </span><span class="code-title"><span class="hljs-function"><span class="code-title">getGreeting</span></span></span><span class="hljs-function">(</span><span class="hljs-params"><span class="hljs-function"><span class="hljs-params">user</span></span></span><span class="hljs-function">) </span></span>{\n' +
    '  <span class="code-comment"><span class="code-comment">// 使用if来判断输入参数，根据判断结果来输出HTML内容</span></span>\n' +
    '  <span class="code-keyword"><span class="code-keyword">if</span></span> (user) {\n' +
    '    <span class="code-keyword"><span class="code-keyword">return</span></span> <span class="xml"><span class="code-tag"><span class="xml"><span class="code-tag">&lt;</span></span><span class="code-name"><span class="xml"><span class="code-tag"><span class="code-name">h1</span></span></span></span><span class="xml"><span class="code-tag">&gt;</span></span></span><span class="xml">Hello, {formatName(user)}</span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;/</span></span><span class="code-name"><span class="xml"><span class="code-tag"><span class="code-name">h1</span></span></span></span><span class="xml"><span class="code-tag">&gt;</span></span></span></span>;\n' +
    '  }\n' +
    '  <span class="code-keyword"><span class="code-keyword">return</span></span> <span class="xml"><span class="code-tag"><span class="xml"><span class="code-tag">&lt;</span></span><span class="code-name"><span class="xml"><span class="code-tag"><span class="code-name">h1</span></span></span></span><span class="xml"><span class="code-tag">&gt;</span></span></span><span class="xml">Hello, Stranger.</span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;/</span></span><span class="code-name"><span class="xml"><span class="code-tag"><span class="code-name">h1</span></span></span></span><span class="xml"><span class="code-tag">&gt;</span></span></span></span>;\n' +
    '}</code></pre>\n' +
    '<p>源生的HTML可以任意指定属性，同样在JSX中也有这个能力，例如：</p>\n' +
    '<pre class="javascript"><code class="language-javascript"><span class="code-keyword"><span class="code-keyword">const</span></span> element = <span class="xml"><span class="code-tag"><span class="xml"><span class="code-tag">&lt;</span></span><span class="code-name"><span class="xml"><span class="code-tag"><span class="code-name">div</span></span></span></span><span class="xml"><span class="code-tag"> </span></span><span class="hljs-attr"><span class="xml"><span class="code-tag"><span class="hljs-attr">tabIndex</span></span></span></span><span class="xml"><span class="code-tag">=</span></span><span class="code-string"><span class="xml"><span class="code-tag"><span class="code-string">"0"</span></span></span></span><span class="xml"><span class="code-tag">&gt;</span></span></span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;/</span></span><span class="code-name"><span class="xml"><span class="code-tag"><span class="code-name">div</span></span></span></span><span class="xml"><span class="code-tag">&gt;</span></span></span></span>;\n' +
    '<span class="code-comment"><span class="code-comment">//或</span></span>\n' +
    '<span class="code-keyword"><span class="code-keyword">const</span></span> element = <span class="xml"><span class="code-tag"><span class="xml"><span class="code-tag">&lt;</span></span><span class="code-name"><span class="xml"><span class="code-tag"><span class="code-name">img</span></span></span></span><span class="xml"><span class="code-tag"> </span></span><span class="hljs-attr"><span class="xml"><span class="code-tag"><span class="hljs-attr">src</span></span></span></span><span class="xml"><span class="code-tag">=</span></span><span class="code-string"><span class="xml"><span class="code-tag"><span class="code-string">{user.avatarUrl}</span></span></span></span><span class="xml"><span class="code-tag">&gt;</span></span></span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;/</span></span><span class="code-name"><span class="xml"><span class="code-tag"><span class="code-name">img</span></span></span></span><span class="xml"><span class="code-tag">&gt;</span></span></span></span>;</code></pre>\n' +
    '<p>也可以直接用 /&gt;表示一个HTML标签的闭环：</p>\n' +
    '<pre class="javascript"><code class="language-javascript"><span class="code-keyword"><span class="code-keyword">const</span></span> element = <span class="xml"><span class="code-tag"><span class="xml"><span class="code-tag">&lt;</span></span><span class="code-name"><span class="xml"><span class="code-tag"><span class="code-name">img</span></span></span></span><span class="xml"><span class="code-tag"> </span></span><span class="hljs-attr"><span class="xml"><span class="code-tag"><span class="hljs-attr">src</span></span></span></span><span class="xml"><span class="code-tag">=</span></span><span class="code-string"><span class="xml"><span class="code-tag"><span class="code-string">{user.avatarUrl}</span></span></span></span><span class="xml"><span class="code-tag"> /&gt;</span></span></span><span class="xml">;</span></span></code></pre>\n' +
    '<p>当然也可以同时声明父元素和子元素：</p>\n' +
    '<pre class="javascript"><code class="language-javascript"><span class="code-keyword"><span class="code-keyword">const</span></span> element = (\n' +
    '  <span class="xml"><span class="code-tag"><span class="xml"><span class="code-tag">&lt;</span></span><span class="code-name"><span class="xml"><span class="code-tag"><span class="code-name">div</span></span></span></span><span class="xml"><span class="code-tag">&gt;</span></span></span><span class="xml">\n' +
    '    </span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;</span></span><span class="code-name"><span class="xml"><span class="code-tag"><span class="code-name">h1</span></span></span></span><span class="xml"><span class="code-tag">&gt;</span></span></span><span class="xml">Hello!</span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;/</span></span><span class="code-name"><span class="xml"><span class="code-tag"><span class="code-name">h1</span></span></span></span><span class="xml"><span class="code-tag">&gt;</span></span></span><span class="xml">\n' +
    '    </span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;</span></span><span class="code-name"><span class="xml"><span class="code-tag"><span class="code-name">h2</span></span></span></span><span class="xml"><span class="code-tag">&gt;</span></span></span><span class="xml">Good to see you here.</span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;/</span></span><span class="code-name"><span class="xml"><span class="code-tag"><span class="code-name">h2</span></span></span></span><span class="xml"><span class="code-tag">&gt;</span></span></span><span class="xml">\n' +
    '  </span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;/</span></span><span class="code-name"><span class="xml"><span class="code-tag"><span class="code-name">div</span></span></span></span><span class="xml"><span class="code-tag">&gt;</span></span></span></span>\n' +
    ');</code></pre>\n' +
    '<p>需要注意的是：由于JSX更像JavaScript，在使用JSX语法时建议使用驼峰规范来命名。例如将标签上的"class"命名为"className"。</p>\n' +
    '<p>JSX天生具备防止注入攻击的能力。ReactDom在渲染之前会转义所有嵌入JSX中的值，所以他能确保没有任何特殊的内容被注入到最终的HTML代码中。在渲染之前，所有的东西都会转换成string类型，这将能有效的防止XSS攻击。</p>\n' +
    '\n' +
    '<h2 id="h2-1">JSX对象</h2>\n' +
    '<p>首先需要强调的是，JSX对象就是一个JavaScript对象，所有的JSX表达式最终都会转义成JavaScript。有两种方法可以创建JSX对象：</p>\n' +
    '<pre class="javascript"><code class="language-javascript"><span class="code-keyword"><span class="code-keyword">const</span></span> element = (\n' +
    '  <span class="xml"><span class="code-tag"><span class="xml"><span class="code-tag">&lt;</span></span><span class="code-name"><span class="xml"><span class="code-tag"><span class="code-name">h1</span></span></span></span><span class="xml"><span class="code-tag"> </span></span><span class="hljs-attr"><span class="xml"><span class="code-tag"><span class="hljs-attr">className</span></span></span></span><span class="xml"><span class="code-tag">=</span></span><span class="code-string"><span class="xml"><span class="code-tag"><span class="code-string">"greeting"</span></span></span></span><span class="xml"><span class="code-tag">&gt;</span></span></span><span class="xml">\n' +
    '    Hello, world!\n' +
    '  </span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;/</span></span><span class="code-name"><span class="xml"><span class="code-tag"><span class="code-name">h1</span></span></span></span><span class="xml"><span class="code-tag">&gt;</span></span></span></span>\n' +
    ');</code></pre>\n' +
    '<p>和</p>\n' +
    '<pre class="actionscript"><code class="language-javascript"><span class="code-keyword"><span class="code-keyword">const</span></span> element = React.createElement(\n' +
    '  <span class="code-string"><span class="code-string">\'h1\'</span></span>,\n' +
    '  {className: <span class="code-string"><span class="code-string">\'greeting\'</span></span>},\n' +
    '  <span class="code-string"><span class="code-string">\'Hello, world!\'</span></span>\n' +
    ');</code></pre>\n' +
    '<p>上面2种创建JSX对象的方法结果都是一样的。使用<code>React.createElement()</code>&nbsp;方法的好处是它会执行一些检查，以帮助我们编写无错误的代码。最终通过转义，他会输出这样一个结构：</p>\n' +
    '<pre class="scala"><code class="language-javascript"><span class="code-keyword">const</span> element = {\n' +
    '  <span class="hljs-class"><span class="code-keyword">type</span></span>: <span class="code-string"><span class="hljs-symbol">\'h</span>1\'</span>,\n' +
    '  props: {\n' +
    '    className: <span class="code-string"><span class="hljs-symbol">\'greetin</span>g\'</span>,\n' +
    '    children: <span class="code-string"><span class="hljs-symbol">\'Hello</span>, world\'</span>\n' +
    '  }\n' +
    '};</code></pre>\n' +
    '<p>官方将这个对象的结构称为React元素。React通过这个对象来控制浏览器对dom的渲染，最终显示我们想要的内容。</p>\n' +
    '\n' +
    '<h1 id="h1-2">渲染React元素</h1>\n' +
    '<p>前一小节提到的React元素是React的基本单元，React会由一个一个的基本单元组成，最终构建成一个有效的体系（组件化）。每一个元素用来描述想在屏幕上展示什么。</p>\n' +
    '<p>和Dom结构不同的是，&nbsp;React元素是一个纯粹的对象并且比创建一个Dom花费的资源更少。React会全局维护所有的元素，并在合适的时候更新到浏览器的Dom，这就是虚拟Dom管理机制。</p>\n' +
    '\n' +
    '<h2 id="h2-2">将一个元素渲染成为Dom</h2>\n' +
    '<p>从一个简单的div标签开始：</p>\n' +
    '<pre class="xml"><code class="language-javascript"><span class="code-tag">&lt;<span class="code-name">div</span> <span class="hljs-attr">id</span>=</span><span class="code-string"><span class="code-tag"><span class="code-string">"root"</span></span></span><span class="code-tag">&gt;</span><span class="xml"><span class="code-tag"><span class="code-tag">&lt;/</span><span class="code-name"><span class="code-tag"><span class="code-name">div</span></span></span><span class="code-tag">&gt;</span></span></span></code></pre>\n' +
    '<p>这是一个“根元素”，我们将通过ReactDom来管理他的所有子元素。一个RreactDom.render方法只能用来渲染一个Dom元素。如果想同时对多个元素进行渲染，可以使用互不关联的RreactDom.render方法来对不同的Dom元素进行操作。</p>\n' +
    '<p>下面的例子将一个JSX元素渲染到Dom中，完成后，会在页面中显示Hello world：</p>\n' +
    '<pre class="javascript"><code class="language-javascript"><span class="code-keyword"><span class="code-keyword">const</span></span> element = <span class="xml"><span class="code-tag"><span class="xml"><span class="code-tag">&lt;</span></span><span class="code-name"><span class="xml"><span class="code-tag"><span class="code-name">h1</span></span></span></span><span class="xml"><span class="code-tag">&gt;</span></span></span><span class="xml">Hello, world</span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;/</span></span><span class="code-name"><span class="xml"><span class="code-tag"><span class="code-name">h1</span></span></span></span><span class="xml"><span class="code-tag">&gt;</span></span></span></span>;\n' +
    'ReactDOM.render(\n' +
    '  element,\n' +
    '  <span class="code-built_in"><span class="code-built_in">document</span></span>.getElementById(<span class="code-string"><span class="code-string">\'root\'</span></span>)\n' +
    ');</code></pre>\n' +
    '<p><a href="http://codepen.io/gaearon/pen/rrpgNB?editors=1010" rel="nofollow">测试代码</a></p>\n' +
    '\n' +
    '<h2 id="h2-3">更新已被渲染的元素</h2>\n' +
    '<p>React元素是<a title="不可变对象(Immutable)" href="https://en.wikipedia.org/wiki/Immutable_object" rel="nofollow">不可变对象</a>，一旦创建，将不再能够修改，包括其属性和子元素。更新UI的方法就是创建一个新的元素并用ReactDom.render()再次渲染他。如下面的例子：</p>\n' +
    '<pre class="javascript"><code class="language-javascript"><span class="code-comment"><span class="code-comment">//创建一个tick方法，用于执行重复方法</span></span>\n' +
    '<span class="hljs-function"><span class="code-keyword"><span class="hljs-function"><span class="code-keyword">function</span></span></span><span class="hljs-function"> </span><span class="code-title"><span class="hljs-function"><span class="code-title">tick</span></span></span><span class="hljs-function">(</span><span class="hljs-params"></span><span class="hljs-function"><span class="hljs-params"></span>) </span></span>{\n' +
    '  <span class="code-comment"><span class="code-comment">//创建一个JSX对象</span></span>\n' +
    '  <span class="code-keyword"><span class="code-keyword">const</span></span> element = (\n' +
    '    <span class="xml"><span class="code-tag"><span class="xml"><span class="code-tag">&lt;</span></span><span class="code-name"><span class="xml"><span class="code-tag"><span class="code-name">div</span></span></span></span><span class="xml"><span class="code-tag">&gt;</span></span></span><span class="xml">\n' +
    '      </span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;</span></span><span class="code-name"><span class="xml"><span class="code-tag"><span class="code-name">h1</span></span></span></span><span class="xml"><span class="code-tag">&gt;</span></span></span><span class="xml">Hello, world!</span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;/</span></span><span class="code-name"><span class="xml"><span class="code-tag"><span class="code-name">h1</span></span></span></span><span class="xml"><span class="code-tag">&gt;</span></span></span><span class="xml">\n' +
    '      </span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;</span></span><span class="code-name"><span class="xml"><span class="code-tag"><span class="code-name">h2</span></span></span></span><span class="xml"><span class="code-tag">&gt;</span></span></span><span class="xml">It is {new Date().toLocaleTimeString()}.</span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;/</span></span><span class="code-name"><span class="xml"><span class="code-tag"><span class="code-name">h2</span></span></span></span><span class="xml"><span class="code-tag">&gt;</span></span></span><span class="xml">\n' +
    '    </span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;/</span></span><span class="code-name"><span class="xml"><span class="code-tag"><span class="code-name">div</span></span></span></span><span class="xml"><span class="code-tag">&gt;</span></span></span></span>\n' +
    '  );\n' +
    '  ReactDOM.render(\n' +
    '    element,\n' +
    '    <span class="code-built_in"><span class="code-built_in">document</span></span>.getElementById(<span class="code-string"><span class="code-string">\'root\'</span></span>)\n' +
    '  );\n' +
    '}\n' +
    '\n' +
    'setInterval(tick, <span class="hljs-number"><span class="hljs-number">1000</span></span>);</code></pre>\n' +
    '<p><a title="测试代码" href="http://codepen.io/gaearon/pen/gwoJZk?editors=0010" rel="nofollow">测试代码</a></p>\n' +
    '<p>上面代码中创建了一个tick方法，并使用setInterval让这个方法每1秒执行一次。tick中创建了一个用于显示时间的JSX对象，然后将其渲染到#root节点中。运行代码可以看到例子实现了一个时钟功能，每秒都会调用ReactDom.render动态修改时钟的数字。</p>\n' +
    '<p><span style="color:#FF0000">需要强调的是：重复使用ReactDom.render方法来多次渲染Dom并不是React推崇的方法。后续的内容中会介绍更合理的方法。</span></p>\n' +
    '\n' +
    '<h2 id="h2-4">React只执行必要的更新</h2>\n' +
    '<p>ReactDom会将当前的元素与之前的元素进行比对，并且只会更新被改动部分的Dom以避免全局渲染和多次重复渲染。我们可以通过浏览器工具来验证最后一个例子——我们使用render方法创建了整个Dom结构，但是仅仅只有表示时间的文字部分发生了变动。</p>\n' +
    '\n' +
    '<h1 id="h1-3">组件与属性</h1>\n' +
    '<p>组件是React的重要概念，组件能让我们将整个页面的UI分解成独立、可复用、可继续分割的对象。从概念上来说，组件很像JavaScript的一个方法，他可以接受任意的参数输入（React中将这些参数称呼为属性——Props）并返回一个用于UI展示的React元素。</p>\n' +
    '\n' +
    '<h2 id="h2-5">使用函数或类声明组件</h2>\n' +
    '<p>在React中既可以使用function来声明一个组件，也可以使用ES6规范的class关键字来声明一个组件。下面的例子是使用function创建一个组件：</p>\n' +
    '<pre class="javascript"><code class="language-javascript"><span class="hljs-function"><span class="code-keyword"><span class="hljs-function"><span class="code-keyword">function</span></span></span><span class="hljs-function"> </span><span class="code-title"><span class="hljs-function"><span class="code-title">Welcome</span></span></span><span class="hljs-function">(</span><span class="hljs-params"><span class="hljs-function"><span class="hljs-params">props</span></span></span><span class="hljs-function">) </span></span>{\n' +
    '  <span class="code-keyword"><span class="code-keyword">return</span></span> <span class="xml"><span class="code-tag"><span class="xml"><span class="code-tag">&lt;</span></span><span class="code-name"><span class="xml"><span class="code-tag"><span class="code-name">h1</span></span></span></span><span class="xml"><span class="code-tag">&gt;</span></span></span><span class="xml">Hello, {props.name}</span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;/</span></span><span class="code-name"><span class="xml"><span class="code-tag"><span class="code-name">h1</span></span></span></span><span class="xml"><span class="code-tag">&gt;</span></span></span></span>;\n' +
    '}</code></pre>\n' +
    '<p>例子中使用function声明了一个名为Welcome的组件，他只能接收一个参数用于描述组件的元素。在React中，我们将通过function创建的组件命名为“functional”，因为从字面上看它实际上就是一个JavaScript的函数。</p>\n' +
    '<p>下面的例子是使用ES6 class方式声明一个组件：</p>\n' +
    '<pre class="scala"><code class="language-javascript"><span class="code-comment"><span class="code-comment">//ES6</span></span>\n' +
    '<span class="hljs-class"><span class="code-keyword"><span class="hljs-class"><span class="code-keyword">class</span></span></span><span class="hljs-class"> </span><span class="code-title"><span class="hljs-class"><span class="code-title">Welcome</span></span></span><span class="hljs-class"> </span><span class="code-keyword"><span class="hljs-class"><span class="code-keyword">extends</span></span></span><span class="hljs-class"> </span><span class="code-title"><span class="hljs-class"><span class="code-title">React</span></span></span><span class="hljs-class">.</span><span class="code-title"><span class="hljs-class"><span class="code-title">Component</span></span></span><span class="hljs-class"> </span></span>{\n' +
    '  render() {\n' +
    '    <span class="code-keyword"><span class="code-keyword">return</span></span> <span class="xml"><span class="code-tag">&lt;<span class="code-name">h1</span>&gt;</span><span class="code-type">Hello</span>, {<span class="code-keyword">this</span>.props.name}<span class="code-tag">&lt;/<span class="code-name">h1</span>&gt;</span></span>;\n' +
    '  }\n' +
    '}\n' +
    '\n' +
    '<span class="code-comment"><span class="code-comment">//JavaScript 非官方内容</span></span>\n' +
    '<span class="code-keyword"><span class="code-keyword">var</span></span> <span class="code-type">Welcome</span> = <span class="code-type">React</span>.createClass({\n' +
    '   render: <span class="hljs-function"><span class="code-keyword">function</span> (<span class="hljs-params"></span>) </span>{\n' +
    '     <span class="code-keyword"><span class="code-keyword">return</span></span> <span class="xml"><span class="code-tag">&lt;<span class="code-name">h1</span>&gt;</span><span class="code-type">Hello</span>, {<span class="code-keyword">this</span>.props.name}<span class="code-tag">&lt;/<span class="code-name">h1</span>&gt;</span></span>;\n' +
    '   }\n' +
    '});\n' +
    '<span class="code-comment"><span class="code-comment">//</span></span></code></pre>\n' +
    '<p>上面两种创建组件的方式，从React的角度来说是一样的。</p>\n' +
    '<p>与使用方法创建组件相比，使用ES6 class的方式创建组件有更多特性，后续篇幅会说明。</p>\n' +
    '\n' +
    '<h2 id="h2-6">渲染一个组件</h2>\n' +
    '<p>为了便于说明，我们先用&lt;div&gt;标签创建一个最简单的组件：</p>\n' +
    '<pre class="javascript"><code class="language-javascript"><span class="code-keyword"><span class="code-keyword">const</span></span> element = <span class="xml"><span class="code-tag"><span class="xml"><span class="code-tag">&lt;</span></span><span class="code-name"><span class="xml"><span class="code-tag"><span class="code-name">div</span></span></span></span><span class="xml"><span class="code-tag"> /&gt;</span></span></span><span class="xml">;</span></span></code></pre>\n' +
    '<p>此时，element即可认为是一个组件，组件中只有一个div元素。根据这个定义，我们可以使用用户自定义的组件，比如使用上面的Welcome：</p>\n' +
    '<pre class="javascript"><code class="language-javascript"><span class="code-keyword"><span class="code-keyword">const</span></span> element = <span class="xml"><span class="code-tag"><span class="xml"><span class="code-tag">&lt;</span></span><span class="code-name"><span class="xml"><span class="code-tag"><span class="code-name">Welcome</span></span></span></span><span class="xml"><span class="code-tag"> </span></span><span class="hljs-attr"><span class="xml"><span class="code-tag"><span class="hljs-attr">name</span></span></span></span><span class="xml"><span class="code-tag">=</span></span><span class="code-string"><span class="xml"><span class="code-tag"><span class="code-string">"Sara"</span></span></span></span><span class="xml"><span class="code-tag"> /&gt;</span></span></span><span class="xml">;</span></span></code></pre>\n' +
    '<p>当React发现element中有用户自定义的组件，它会使用JSX语法解析element并将标签上的属性转换成一个JSX对象，这个对象被称为“props”。</p>\n' +
    '<p>例如下面这个例子，我们经使用组件在屏幕上输出"Hello, Sara"：</p>\n' +
    '<pre class="javascript"><code class="language-javascript"><span class="hljs-function"><span class="code-keyword"><span class="hljs-function"><span class="code-keyword">function</span></span></span><span class="hljs-function"> </span><span class="code-title"><span class="hljs-function"><span class="code-title">Welcome</span></span></span><span class="hljs-function">(</span><span class="hljs-params"><span class="hljs-function"><span class="hljs-params">props</span></span></span><span class="hljs-function">) </span></span>{\n' +
    '  <span class="code-keyword"><span class="code-keyword">return</span></span> <span class="xml"><span class="code-tag"><span class="xml"><span class="code-tag">&lt;</span></span><span class="code-name"><span class="xml"><span class="code-tag"><span class="code-name">h1</span></span></span></span><span class="xml"><span class="code-tag">&gt;</span></span></span><span class="xml">Hello, {props.name}</span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;/</span></span><span class="code-name"><span class="xml"><span class="code-tag"><span class="code-name">h1</span></span></span></span><span class="xml"><span class="code-tag">&gt;</span></span></span></span>;\n' +
    '}\n' +
    '\n' +
    '<span class="code-keyword"><span class="code-keyword">const</span></span> element = <span class="xml"><span class="code-tag"><span class="xml"><span class="code-tag">&lt;</span></span><span class="code-name"><span class="xml"><span class="code-tag"><span class="code-name">Welcome</span></span></span></span><span class="xml"><span class="code-tag"> </span></span><span class="hljs-attr"><span class="xml"><span class="code-tag"><span class="hljs-attr">name</span></span></span></span><span class="xml"><span class="code-tag">=</span></span><span class="code-string"><span class="xml"><span class="code-tag"><span class="code-string">"Sara"</span></span></span></span><span class="xml"><span class="code-tag"> /&gt;</span></span></span><span class="xml">;\n' +
    'ReactDOM.render(\n' +
    '  element,\n' +
    '  document.getElementById(\'root\')\n' +
    ');</span></span></code></pre>\n' +
    '<p><a title="测试代码" href="http://codepen.io/gaearon/pen/YGYmEG?editors=0010" rel="nofollow">测试代码</a></p>\n' +
    '<p>看看发生了什么：</p>\n' +
    '<ol>\n' +
    '  <li>使用ReactDOM.render()方法渲染&lt;Welcome name="Sara" /&gt;。</li>\n' +
    '  <li>React调用Welcome方法，并传递了一个参数：{name: \'Sara\'}。</li>\n' +
    '  <li>在Welcome组件中合并了参数，并返回一个&lt;h1&gt;Hello, Sara&lt;/h1&gt;。</li>\n' +
    '  <li>ReactDom将&lt;h1&gt;Hello, Sara&lt;/h1&gt;更新到浏览器的Dom树中。</li>\n' +
    '</ol>\n' +
    '<p><span style="color:#FF0000">需要注意的是，使用React组件时一定要将组件名称首字母大写。例如在html标签中&lt;div&gt;是一个标准的Dom，但是&lt;Welcome&gt;并不是一个标准的html标签，而是一个React组件。React通过判断组件名称的首字母加以区分。</span></p>\n' +
    '\n' +
    '<h2 id="h2-7">组件组合</h2>\n' +
    '<p>一个组件能够被其他的组件引用，就像使用普通的html标签一样。我们可以把组件抽象成各种抽象功能在任何地方使用，例如一个按钮、一个弹出框、一个表单。下面的例子展示了React组件的组合使用：</p>\n' +
    '<pre class="actionscript"><code class="language-javascript"><span class="hljs-function"><span class="code-keyword"><span class="hljs-function"><span class="code-keyword">function</span></span></span><span class="hljs-function"> </span><span class="code-title"><span class="hljs-function"><span class="code-title">Welcome</span></span></span><span class="hljs-function"><span class="hljs-params">(</span></span><span class="hljs-params"><span class="hljs-function"><span class="hljs-params">props</span></span></span><span class="hljs-function"><span class="hljs-params">)</span> </span></span>{<span class="code-comment"><span class="code-comment">//创建Welcome组件</span></span>\n' +
    '  <span class="code-keyword"><span class="code-keyword">return</span></span> <span class="xml"><span class="code-tag">&lt;<span class="code-name">h1</span>&gt;</span>Hello, {props.name}<span class="code-tag">&lt;/<span class="code-name">h1</span>&gt;</span></span>;\n' +
    '}\n' +
    '\n' +
    '<span class="hljs-function"><span class="code-keyword"><span class="hljs-function"><span class="code-keyword">function</span></span></span><span class="hljs-function"> </span><span class="code-title"><span class="hljs-function"><span class="code-title">App</span></span></span><span class="hljs-function"><span class="hljs-params">(</span></span><span class="hljs-params"></span><span class="hljs-function"><span class="hljs-params">)</span> </span></span>{<span class="code-comment"><span class="code-comment">//创建App组件</span></span>\n' +
    '  <span class="code-keyword"><span class="code-keyword">return</span></span> (\n' +
    '    &lt;div&gt;\n' +
    '      &lt;Welcome name=<span class="code-string">"Sara"</span> /&gt; <span class="code-comment">//使用Welcome组件</span>\n' +
    '      &lt;Welcome name=<span class="code-string">"Cahal"</span> /&gt;\n' +
    '      &lt;Welcome name=<span class="code-string">"Edite"</span> /&gt;\n' +
    '    &lt;/div&gt;\n' +
    '  );\n' +
    '}\n' +
    '\n' +
    'ReactDOM.render( <span class="code-comment">//向Dom渲染App组件</span>\n' +
    '  &lt;App /&gt;,\n' +
    '  document.getElementById(<span class="code-string">\'root\'</span>)\n' +
    ');</code></pre>\n' +
    '<p><a title="测试代码" href="http://codepen.io/gaearon/pen/KgQKPr?editors=0010" rel="nofollow">测试代码</a> &nbsp; &nbsp;</p>\n' +
    '<p>在例子中，首先创建了一个Welcome组件，然后在App组件中重复使用它，最后向浏览器渲染App。App组件中整合使用了Welcome组件。基于组件可以层层封装，建议在使用React开始新项目时先从封装一些小的组件开始，比如按钮、弹出框等，这会对后面开发高层次的业务逻辑时有巨大的帮助。</p>\n' +
    '<p>一个组件只能返回一个根元素，不能同时包含2个根元素。因此上面的例子中App组件中增加了一个&lt;div&gt;元素将Welcome组件包裹起来。</p>\n' +
    '\n' +
    '<h2 id="h2-8">抽象提取组件</h2>\n' +
    '<p>不必担心组件的分割粒度太小，开发组件时我们最好是通过多个层次的组件组合实现一个更高层次的组件。</p>\n' +
    '<p>看下面这个例子——封装一个Comment组件：</p>\n' +
    '<pre class="javascript"><code class="language-javascript"><span class="hljs-function"><span class="code-keyword"><span class="hljs-function"><span class="code-keyword">function</span></span></span><span class="hljs-function"> </span><span class="code-title"><span class="hljs-function"><span class="code-title">Comment</span></span></span><span class="hljs-function">(</span><span class="hljs-params"><span class="hljs-function"><span class="hljs-params">props</span></span></span><span class="hljs-function">) </span></span>{\n' +
    '  <span class="code-keyword"><span class="code-keyword">return</span></span> (\n' +
    '    <span class="xml"><span class="code-tag"><span class="xml"><span class="code-tag">&lt;</span></span><span class="code-name"><span class="xml"><span class="code-tag"><span class="code-name">div</span></span></span></span><span class="xml"><span class="code-tag"> </span></span><span class="hljs-attr"><span class="xml"><span class="code-tag"><span class="hljs-attr">className</span></span></span></span><span class="xml"><span class="code-tag">=</span></span><span class="code-string"><span class="xml"><span class="code-tag"><span class="code-string">"Comment"</span></span></span></span><span class="xml"><span class="code-tag">&gt;</span></span></span><span class="xml">\n' +
    '      </span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;</span></span><span class="code-name"><span class="xml"><span class="code-tag"><span class="code-name">div</span></span></span></span><span class="xml"><span class="code-tag"> </span></span><span class="hljs-attr"><span class="xml"><span class="code-tag"><span class="hljs-attr">className</span></span></span></span><span class="xml"><span class="code-tag">=</span></span><span class="code-string"><span class="xml"><span class="code-tag"><span class="code-string">"UserInfo"</span></span></span></span><span class="xml"><span class="code-tag">&gt;</span></span></span><span class="xml">\n' +
    '        </span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;</span></span><span class="code-name"><span class="xml"><span class="code-tag"><span class="code-name">img</span></span></span></span><span class="xml"><span class="code-tag"> </span></span><span class="hljs-attr"><span class="xml"><span class="code-tag"><span class="hljs-attr">className</span></span></span></span><span class="xml"><span class="code-tag">=</span></span><span class="code-string"><span class="xml"><span class="code-tag"><span class="code-string">"Avatar"</span></span></span></span><span class="xml"><span class="code-tag">\n' +
    '          </span></span><span class="hljs-attr"><span class="xml"><span class="code-tag"><span class="hljs-attr">src</span></span></span></span><span class="xml"><span class="code-tag">=</span></span><span class="code-string"><span class="xml"><span class="code-tag"><span class="code-string">{props.author.avatarUrl}</span></span></span></span><span class="xml"><span class="code-tag">\n' +
    '          </span></span><span class="hljs-attr"><span class="xml"><span class="code-tag"><span class="hljs-attr">alt</span></span></span></span><span class="xml"><span class="code-tag">=</span></span><span class="code-string"><span class="xml"><span class="code-tag"><span class="code-string">{props.author.name}</span></span></span></span><span class="xml"><span class="code-tag">\n' +
    '        /&gt;</span></span></span><span class="xml">\n' +
    '        </span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;</span></span><span class="code-name"><span class="xml"><span class="code-tag"><span class="code-name">div</span></span></span></span><span class="xml"><span class="code-tag"> </span></span><span class="hljs-attr"><span class="xml"><span class="code-tag"><span class="hljs-attr">className</span></span></span></span><span class="xml"><span class="code-tag">=</span></span><span class="code-string"><span class="xml"><span class="code-tag"><span class="code-string">"UserInfo-name"</span></span></span></span><span class="xml"><span class="code-tag">&gt;</span></span></span><span class="xml">\n' +
    '          {props.author.name} \n' +
    '        </span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;/</span></span><span class="code-name"><span class="xml"><span class="code-tag"><span class="code-name">div</span></span></span></span><span class="xml"><span class="code-tag">&gt;</span></span></span><span class="xml">\n' +
    '      </span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;/</span></span><span class="code-name"><span class="xml"><span class="code-tag"><span class="code-name">div</span></span></span></span><span class="xml"><span class="code-tag">&gt;</span></span></span><span class="xml">\n' +
    '      </span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;</span></span><span class="code-name"><span class="xml"><span class="code-tag"><span class="code-name">div</span></span></span></span><span class="xml"><span class="code-tag"> </span></span><span class="hljs-attr"><span class="xml"><span class="code-tag"><span class="hljs-attr">className</span></span></span></span><span class="xml"><span class="code-tag">=</span></span><span class="code-string"><span class="xml"><span class="code-tag"><span class="code-string">"Comment-text"</span></span></span></span><span class="xml"><span class="code-tag">&gt;</span></span></span><span class="xml">\n' +
    '        {props.text}\n' +
    '      </span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;/</span></span><span class="code-name"><span class="xml"><span class="code-tag"><span class="code-name">div</span></span></span></span><span class="xml"><span class="code-tag">&gt;</span></span></span><span class="xml">\n' +
    '      </span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;</span></span><span class="code-name"><span class="xml"><span class="code-tag"><span class="code-name">div</span></span></span></span><span class="xml"><span class="code-tag"> </span></span><span class="hljs-attr"><span class="xml"><span class="code-tag"><span class="hljs-attr">className</span></span></span></span><span class="xml"><span class="code-tag">=</span></span><span class="code-string"><span class="xml"><span class="code-tag"><span class="code-string">"Comment-date"</span></span></span></span><span class="xml"><span class="code-tag">&gt;</span></span></span><span class="xml">\n' +
    '        {formatDate(props.date)}\n' +
    '      </span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;/</span></span><span class="code-name"><span class="xml"><span class="code-tag"><span class="code-name">div</span></span></span></span><span class="xml"><span class="code-tag">&gt;</span></span></span><span class="xml">\n' +
    '    </span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;/</span></span><span class="code-name"><span class="xml"><span class="code-tag"><span class="code-name">div</span></span></span></span><span class="xml"><span class="code-tag">&gt;</span></span></span><span class="xml">\n' +
    '  );\n' +
    '}</span></span></code></pre>\n' +
    '<p><a title="测试代码" href="http://codepen.io/gaearon/pen/VKQwEo?editors=0010" rel="nofollow">尝试代码</a></p>\n' +
    '<p>Comment组件很难维护，因为它内部的代码都前台和交织在一起，也无法实现代码复用。现在我们稍微修改组件中的Avator，将其提取成一个组件：</p>\n' +
    '<pre class="javascript"><code class="language-javascript"><span class="hljs-function"><span class="code-keyword"><span class="hljs-function"><span class="code-keyword">function</span></span></span><span class="hljs-function"> </span><span class="code-title"><span class="hljs-function"><span class="code-title">Avatar</span></span></span><span class="hljs-function">(</span><span class="hljs-params"><span class="hljs-function"><span class="hljs-params">props</span></span></span><span class="hljs-function">) </span></span>{\n' +
    '  <span class="code-keyword"><span class="code-keyword">return</span></span> (\n' +
    '    <span class="xml"><span class="code-tag"><span class="xml"><span class="code-tag">&lt;</span></span><span class="code-name"><span class="xml"><span class="code-tag"><span class="code-name">img</span></span></span></span><span class="xml"><span class="code-tag"> </span></span><span class="hljs-attr"><span class="xml"><span class="code-tag"><span class="hljs-attr">className</span></span></span></span><span class="xml"><span class="code-tag">=</span></span><span class="code-string"><span class="xml"><span class="code-tag"><span class="code-string">"Avatar"</span></span></span></span><span class="xml"><span class="code-tag">\n' +
    '      </span></span><span class="hljs-attr"><span class="xml"><span class="code-tag"><span class="hljs-attr">src</span></span></span></span><span class="xml"><span class="code-tag">=</span></span><span class="code-string"><span class="xml"><span class="code-tag"><span class="code-string">{props.user.avatarUrl}</span></span></span></span><span class="xml"><span class="code-tag">\n' +
    '      </span></span><span class="hljs-attr"><span class="xml"><span class="code-tag"><span class="hljs-attr">alt</span></span></span></span><span class="xml"><span class="code-tag">=</span></span><span class="code-string"><span class="xml"><span class="code-tag"><span class="code-string">{props.user.name}</span></span></span></span><span class="xml"><span class="code-tag">\n' +
    '    /&gt;</span></span></span><span class="xml">\n' +
    '  );\n' +
    '}</span></span></code></pre>\n' +
    '<p>Avator组件不需知道他是在哪被使用，它只关心输入的参数，并使用参数生成一个Dom结构。现在可以像下面这样声明一个Comment组件：</p>\n' +
    '<pre class="javascript"><code class="language-javascript"><span class="hljs-function"><span class="code-keyword"><span class="hljs-function"><span class="code-keyword">function</span></span></span><span class="hljs-function"> </span><span class="code-title"><span class="hljs-function"><span class="code-title">Comment</span></span></span><span class="hljs-function">(</span><span class="hljs-params"><span class="hljs-function"><span class="hljs-params">props</span></span></span><span class="hljs-function">) </span></span>{\n' +
    '  <span class="code-keyword"><span class="code-keyword">return</span></span> (\n' +
    '    <span class="xml"><span class="code-tag"><span class="xml"><span class="code-tag">&lt;</span></span><span class="code-name"><span class="xml"><span class="code-tag"><span class="code-name">div</span></span></span></span><span class="xml"><span class="code-tag"> </span></span><span class="hljs-attr"><span class="xml"><span class="code-tag"><span class="hljs-attr">className</span></span></span></span><span class="xml"><span class="code-tag">=</span></span><span class="code-string"><span class="xml"><span class="code-tag"><span class="code-string">"Comment"</span></span></span></span><span class="xml"><span class="code-tag">&gt;</span></span></span><span class="xml">\n' +
    '      </span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;</span></span><span class="code-name"><span class="xml"><span class="code-tag"><span class="code-name">div</span></span></span></span><span class="xml"><span class="code-tag"> </span></span><span class="hljs-attr"><span class="xml"><span class="code-tag"><span class="hljs-attr">className</span></span></span></span><span class="xml"><span class="code-tag">=</span></span><span class="code-string"><span class="xml"><span class="code-tag"><span class="code-string">"UserInfo"</span></span></span></span><span class="xml"><span class="code-tag">&gt;</span></span></span><span class="xml">\n' +
    '        </span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;</span></span><span class="code-name"><span class="xml"><span class="code-tag"><span class="code-name">Avatar</span></span></span></span><span class="xml"><span class="code-tag"> </span></span><span class="hljs-attr"><span class="xml"><span class="code-tag"><span class="hljs-attr">user</span></span></span></span><span class="xml"><span class="code-tag">=</span></span><span class="code-string"><span class="xml"><span class="code-tag"><span class="code-string">{props.author}</span></span></span></span><span class="xml"><span class="code-tag"> /&gt;</span></span></span><span class="xml">//使用Avatar组件\n' +
    '        </span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;</span></span><span class="code-name"><span class="xml"><span class="code-tag"><span class="code-name">div</span></span></span></span><span class="xml"><span class="code-tag"> </span></span><span class="hljs-attr"><span class="xml"><span class="code-tag"><span class="hljs-attr">className</span></span></span></span><span class="xml"><span class="code-tag">=</span></span><span class="code-string"><span class="xml"><span class="code-tag"><span class="code-string">"UserInfo-name"</span></span></span></span><span class="xml"><span class="code-tag">&gt;</span></span></span><span class="xml">\n' +
    '          {props.author.name}\n' +
    '        </span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;/</span></span><span class="code-name"><span class="xml"><span class="code-tag"><span class="code-name">div</span></span></span></span><span class="xml"><span class="code-tag">&gt;</span></span></span><span class="xml">\n' +
    '      </span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;/</span></span><span class="code-name"><span class="xml"><span class="code-tag"><span class="code-name">div</span></span></span></span><span class="xml"><span class="code-tag">&gt;</span></span></span><span class="xml">\n' +
    '      </span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;</span></span><span class="code-name"><span class="xml"><span class="code-tag"><span class="code-name">div</span></span></span></span><span class="xml"><span class="code-tag"> </span></span><span class="hljs-attr"><span class="xml"><span class="code-tag"><span class="hljs-attr">className</span></span></span></span><span class="xml"><span class="code-tag">=</span></span><span class="code-string"><span class="xml"><span class="code-tag"><span class="code-string">"Comment-text"</span></span></span></span><span class="xml"><span class="code-tag">&gt;</span></span></span><span class="xml">\n' +
    '        {props.text}\n' +
    '      </span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;/</span></span><span class="code-name"><span class="xml"><span class="code-tag"><span class="code-name">div</span></span></span></span><span class="xml"><span class="code-tag">&gt;</span></span></span><span class="xml">\n' +
    '      </span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;</span></span><span class="code-name"><span class="xml"><span class="code-tag"><span class="code-name">div</span></span></span></span><span class="xml"><span class="code-tag"> </span></span><span class="hljs-attr"><span class="xml"><span class="code-tag"><span class="hljs-attr">className</span></span></span></span><span class="xml"><span class="code-tag">=</span></span><span class="code-string"><span class="xml"><span class="code-tag"><span class="code-string">"Comment-date"</span></span></span></span><span class="xml"><span class="code-tag">&gt;</span></span></span><span class="xml">\n' +
    '        {formatDate(props.date)}\n' +
    '      </span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;/</span></span><span class="code-name"><span class="xml"><span class="code-tag"><span class="code-name">div</span></span></span></span><span class="xml"><span class="code-tag">&gt;</span></span></span><span class="xml">\n' +
    '    </span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;/</span></span><span class="code-name"><span class="xml"><span class="code-tag"><span class="code-name">div</span></span></span></span><span class="xml"><span class="code-tag">&gt;</span></span></span><span class="xml">\n' +
    '  );\n' +
    '}</span></span></code></pre>\n' +
    '<p>我们再将UserInfo也提取成一个组件：</p>\n' +
    '<pre class="javascript"><code class="language-javascript"><span class="hljs-function"><span class="code-keyword"><span class="hljs-function"><span class="code-keyword">function</span></span></span><span class="hljs-function"> </span><span class="code-title"><span class="hljs-function"><span class="code-title">UserInfo</span></span></span><span class="hljs-function">(</span><span class="hljs-params"><span class="hljs-function"><span class="hljs-params">props</span></span></span><span class="hljs-function">) </span></span>{\n' +
    '  <span class="code-keyword"><span class="code-keyword">return</span></span> (\n' +
    '    <span class="xml"><span class="code-tag"><span class="xml"><span class="code-tag">&lt;</span></span><span class="code-name"><span class="xml"><span class="code-tag"><span class="code-name">div</span></span></span></span><span class="xml"><span class="code-tag"> </span></span><span class="hljs-attr"><span class="xml"><span class="code-tag"><span class="hljs-attr">className</span></span></span></span><span class="xml"><span class="code-tag">=</span></span><span class="code-string"><span class="xml"><span class="code-tag"><span class="code-string">"UserInfo"</span></span></span></span><span class="xml"><span class="code-tag">&gt;</span></span></span><span class="xml">\n' +
    '      </span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;</span></span><span class="code-name"><span class="xml"><span class="code-tag"><span class="code-name">Avatar</span></span></span></span><span class="xml"><span class="code-tag"> </span></span><span class="hljs-attr"><span class="xml"><span class="code-tag"><span class="hljs-attr">user</span></span></span></span><span class="xml"><span class="code-tag">=</span></span><span class="code-string"><span class="xml"><span class="code-tag"><span class="code-string">{props.user}</span></span></span></span><span class="xml"><span class="code-tag"> /&gt;</span></span></span><span class="xml"> //使用Avatar组件\n' +
    '        {props.user.name}\n' +
    '      </span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;/</span></span><span class="code-name"><span class="xml"><span class="code-tag"><span class="code-name">div</span></span></span></span><span class="xml"><span class="code-tag">&gt;</span></span></span><span class="xml">\n' +
    '    </span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;/</span></span><span class="code-name"><span class="xml"><span class="code-tag"><span class="code-name">div</span></span></span></span><span class="xml"><span class="code-tag">&gt;</span></span></span></span>\n' +
    '  );\n' +
    '}</code></pre>\n' +
    '<p>此时的Comment：</p>\n' +
    '<pre class="javascript"><code class="language-javascript"><span class="hljs-function"><span class="code-keyword"><span class="hljs-function"><span class="code-keyword">function</span></span></span><span class="hljs-function"> </span><span class="code-title"><span class="hljs-function"><span class="code-title">Comment</span></span></span><span class="hljs-function">(</span><span class="hljs-params"><span class="hljs-function"><span class="hljs-params">props</span></span></span><span class="hljs-function">) </span></span>{\n' +
    '  <span class="code-keyword"><span class="code-keyword">return</span></span> (\n' +
    '    <span class="xml"><span class="code-tag"><span class="xml"><span class="code-tag">&lt;</span></span><span class="code-name"><span class="xml"><span class="code-tag"><span class="code-name">div</span></span></span></span><span class="xml"><span class="code-tag"> </span></span><span class="hljs-attr"><span class="xml"><span class="code-tag"><span class="hljs-attr">className</span></span></span></span><span class="xml"><span class="code-tag">=</span></span><span class="code-string"><span class="xml"><span class="code-tag"><span class="code-string">"Comment"</span></span></span></span><span class="xml"><span class="code-tag">&gt;</span></span></span><span class="xml">\n' +
    '      </span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;</span></span><span class="code-name"><span class="xml"><span class="code-tag"><span class="code-name">UserInfo</span></span></span></span><span class="xml"><span class="code-tag"> </span></span><span class="hljs-attr"><span class="xml"><span class="code-tag"><span class="hljs-attr">user</span></span></span></span><span class="xml"><span class="code-tag">=</span></span><span class="code-string"><span class="xml"><span class="code-tag"><span class="code-string">{props.author}</span></span></span></span><span class="xml"><span class="code-tag"> /&gt;</span></span></span><span class="xml"> //使用UserInfo组件\n' +
    '      </span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;</span></span><span class="code-name"><span class="xml"><span class="code-tag"><span class="code-name">div</span></span></span></span><span class="xml"><span class="code-tag"> </span></span><span class="hljs-attr"><span class="xml"><span class="code-tag"><span class="hljs-attr">className</span></span></span></span><span class="xml"><span class="code-tag">=</span></span><span class="code-string"><span class="xml"><span class="code-tag"><span class="code-string">"Comment-text"</span></span></span></span><span class="xml"><span class="code-tag">&gt;</span></span></span><span class="xml">\n' +
    '        {props.text}\n' +
    '      </span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;/</span></span><span class="code-name"><span class="xml"><span class="code-tag"><span class="code-name">div</span></span></span></span><span class="xml"><span class="code-tag">&gt;</span></span></span><span class="xml">\n' +
    '      </span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;</span></span><span class="code-name"><span class="xml"><span class="code-tag"><span class="code-name">div</span></span></span></span><span class="xml"><span class="code-tag"> </span></span><span class="hljs-attr"><span class="xml"><span class="code-tag"><span class="hljs-attr">className</span></span></span></span><span class="xml"><span class="code-tag">=</span></span><span class="code-string"><span class="xml"><span class="code-tag"><span class="code-string">"Comment-date"</span></span></span></span><span class="xml"><span class="code-tag">&gt;</span></span></span><span class="xml">\n' +
    '        {formatDate(props.date)}\n' +
    '      </span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;/</span></span><span class="code-name"><span class="xml"><span class="code-tag"><span class="code-name">div</span></span></span></span><span class="xml"><span class="code-tag">&gt;</span></span></span><span class="xml">\n' +
    '    </span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;/</span></span><span class="code-name"><span class="xml"><span class="code-tag"><span class="code-name">div</span></span></span></span><span class="xml"><span class="code-tag">&gt;</span></span></span><span class="xml">\n' +
    '  );\n' +
    '}</span></span></code></pre>\n' +
    '<p><a title="测试代码" href="http://codepen.io/gaearon/pen/rrJNJY?editors=0010" rel="nofollow">测试代码</a></p>\n' +
    '\n' +
    '<h2 id="h2-9">属性（props）只读</h2>\n' +
    '<p>无论是使用函数（function）还是类（class）声明组件，它都不能通过修改props参数来改变值。例如下面这个sum方法：</p>\n' +
    '<pre class="actionscript"><code class="language-javascript"><span class="hljs-function"><span class="code-keyword"><span class="hljs-function"><span class="code-keyword">function</span></span></span><span class="hljs-function"> </span><span class="code-title"><span class="hljs-function"><span class="code-title">sum</span></span></span><span class="hljs-function"><span class="hljs-params">(</span></span><span class="hljs-params"><span class="hljs-function"><span class="hljs-params">a, b</span></span></span><span class="hljs-function"><span class="hljs-params">)</span> </span></span>{\n' +
    '  <span class="code-keyword"><span class="code-keyword">return</span></span> a + b;\n' +
    '}\n' +
    '\n' +
    '<span class="code-keyword"><span class="code-keyword">var</span></span> param1 = <span class="hljs-number"><span class="hljs-number">1</span></span>,\n' +
    '    param2 = <span class="hljs-number"><span class="hljs-number">2</span></span>,\n' +
    '    result = sum(<span class="hljs-number"><span class="hljs-number">1</span></span>, <span class="hljs-number"><span class="hljs-number">2</span></span>);</code></pre>\n' +
    '<p>在第一次计算得到结果之后，无论怎么修改param1、param2的值，result都不会改变。</p>\n' +
    '<p>React相当的灵活自由，但是它有一条必须遵守的规则：</p>\n' +
    '<p><strong>所有的React组件必须像上面的sum方法这样保证传入的属性（props）参数只读。</strong></p>';