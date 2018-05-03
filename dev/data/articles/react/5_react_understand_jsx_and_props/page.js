export const content = '<h3 id="h3-1">JSX说明</h3>\n' +
    '<p>我们可以将JSX理解为React.createElement(component, props, ...children)方法的语法糖。JSX的代码：</p>\n' +
    '<pre class="xml"><code class="language-html xml"><span class="code-tag"><span class="code-tag">&lt;</span><span\n' +
    '        class="code-name"><span class="code-tag"><span class="code-name">MyButton</span></span></span><span\n' +
    '        class="code-tag"> </span><span class="hljs-attr"><span class="code-tag"><span\n' +
    '        class="hljs-attr">color</span></span></span><span class="code-tag">=</span><span class="code-string"><span\n' +
    '        class="code-tag"><span class="code-string">"blue"</span></span></span><span class="code-tag"> </span><span\n' +
    '        class="hljs-attr"><span class="code-tag"><span class="hljs-attr">shadowSize</span></span></span><span\n' +
    '        class="code-tag">=</span><span class="code-string"><span class="code-tag"><span\n' +
    '        class="code-string">{2}</span></span></span><span class="code-tag">&gt;</span></span>\n' +
    '  Click Me\n' +
    '<span class="code-tag"><span class="code-tag">&lt;/</span><span class="code-name"><span class="code-tag"><span\n' +
    '        class="code-name">MyButton</span></span></span><span class="code-tag">&gt;</span></span></code></pre>\n' +
    '<p>最终会被编译成一个React Element 对象：</p>\n' +
    '<pre class="groovy"><code class="language-javascript">React.createElement(\n' +
    '  MyButton,\n' +
    '  {<span class="code-string">color:</span> <span class="code-string"><span\n' +
    '            class="code-string">\'blue\'</span></span>, <span class="code-string">shadowSize:</span> <span\n' +
    '            class="hljs-number"><span class="hljs-number">2</span></span>},\n' +
    '  <span class="code-string"><span class="code-string">\'Click Me\'</span></span>\n' +
    ')</code></pre>\n' +
    '<p>我们可以使用“闭标签”来表示没有子元素的情况：</p>\n' +
    '<pre class="xml"><code class="language-html xml"><span class="code-tag"><span class="code-tag">&lt;</span><span\n' +
    '        class="code-name"><span class="code-tag"><span class="code-name">div</span></span></span><span\n' +
    '        class="code-tag"> </span><span class="hljs-attr"><span class="code-tag"><span class="hljs-attr">className</span></span></span><span\n' +
    '        class="code-tag">=</span><span class="code-string"><span class="code-tag"><span\n' +
    '        class="code-string">"sidebar"</span></span></span><span class="code-tag"> /&gt;</span></span></code></pre>\n' +
    '<p>它会编译成：</p>\n' +
    '<pre class="groovy"><code class="language-javascript">React.createElement(\n' +
    '  <span class="code-string"><span class="code-string">\'div\'</span></span>,\n' +
    '  {<span class="code-string">className:</span> <span class="code-string"><span\n' +
    '            class="code-string">\'sidebar\'</span></span>},\n' +
    '  <span class="hljs-literal"><span class="hljs-literal">null</span></span>\n' +
    ')</code></pre>\n' +
    '<p>如果你想尝试各种JSX是如何转换成JavaScript代码的，你可以打开这个网站试试：<a title="JSX转换为JavaScript代码"\n' +
    '        href="https://babeljs.io/repl/#?babili=false&amp;evaluate=true&amp;lineWrap=false&amp;presets=es2015%2Creact%2Cstage-0&amp;targets=&amp;browsers=&amp;builtIns=false&amp;code=function%20hello()%20%7B%0A%20%20return%20%3Cdiv%3E%3Cdiv%3EHello%20world!%3C%2Fdiv%3E%3C%2Fdiv%3E%3B%0A%7D"\n' +
    '        rel="nofollow">the online Babel compiler</a>。</p>\n' +
    '\n' +
    '<h4 id="h4-1">React组件的作用域</h4>\n' +
    '<p>JSX标签声明的第一个部分是React元素的类型（Type）。首字母大写表明这个JSX标签是一个React的组件。这些标签会被编译成对命名变量的直接引用，因此如果你使用JSX的&lt;Foo /&gt;表达式，那么Foo方法或对象必须包含在当前域中（可以理解在当前页面或闭包中可以找到这个对象）。</p>\n' +
    '<pre class="javascript"><code class="language-javascript"><span class="code-keyword"><span\n' +
    '        class="code-keyword">import</span></span> React <span class="code-keyword"><span\n' +
    '        class="code-keyword">from</span></span> <span class="code-string"><span\n' +
    '        class="code-string">\'react\'</span></span>;\n' +
    '<span class="code-keyword"><span class="code-keyword">import</span></span> Foo <span class="code-keyword"><span\n' +
    '            class="code-keyword">from</span></span> <span class="code-string"><span\n' +
    '            class="code-string">\'./Foo\'</span></span>; <span class="code-comment"><span class="code-comment">//ES6的import语法，必须现在闭包中引入才能使用</span></span></code></pre>\n' +
    '\n' +
    '<h4 id="h4-2">React的作用域</h4>\n' +
    '<p>因为JSX需要调用React.createElement来进行编译，因此在使用JSX表达式时，React应该始终被引用到当前域中（可以理解为页面或闭包可以访问到React.createElement）。</p>\n' +
    '<p>如下面代码的例子，即使没有显示的使用React.createElement方法，但是在使用任何React组建时，React和组件都必须在使用时被引入：</p>\n' +
    '<pre class="javascript"><code class="language-javascript"><span class="code-keyword"><span\n' +
    '        class="code-keyword">import</span></span> React <span class="code-keyword"><span\n' +
    '        class="code-keyword">from</span></span> <span class="code-string"><span\n' +
    '        class="code-string">\'react\'</span></span>;\n' +
    '<span class="code-keyword"><span class="code-keyword">import</span></span> CustomButton <span class="code-keyword"><span\n' +
    '            class="code-keyword">from</span></span> <span class="code-string"><span\n' +
    '            class="code-string">\'./CustomButton\'</span></span>;\n' +
    '\n' +
    '<span class="hljs-function"><span class="code-keyword"><span class="hljs-function"><span\n' +
    '        class="code-keyword">function</span></span></span><span class="hljs-function"> </span><span\n' +
    '        class="code-title"><span class="hljs-function"><span class="code-title">WarningButton</span></span></span><span\n' +
    '        class="hljs-function">(</span><span class="hljs-params"></span><span class="hljs-function"><span\n' +
    '        class="hljs-params"></span>) </span></span>{\n' +
    '  <span class="code-comment"><span class="code-comment">// return React.createElement(CustomButton, {color: \'red\'}, null);</span></span>\n' +
    '  <span class="code-keyword"><span class="code-keyword">return</span></span> <span class="xml"><span\n' +
    '            class="code-tag"><span class="xml"><span class="code-tag">&lt;</span></span><span class="code-name"><span\n' +
    '            class="xml"><span class="code-tag"><span class="code-name">CustomButton</span></span></span></span><span\n' +
    '            class="xml"><span class="code-tag"> </span></span><span class="hljs-attr"><span class="xml"><span\n' +
    '            class="code-tag"><span class="hljs-attr">color</span></span></span></span><span class="xml"><span\n' +
    '            class="code-tag">=</span></span><span class="code-string"><span class="xml"><span class="code-tag"><span\n' +
    '            class="code-string">"red"</span></span></span></span><span class="xml"><span class="code-tag"> /&gt;</span></span></span><span\n' +
    '            class="xml">;\n' +
    '}</span></span></code></pre>\n' +
    '\n' +
    '<h4 id="h4-3">利用点号“.”来引用组件</h4>\n' +
    '<p>在JSX语法中，可以使用点号来引入React组件。这样做的好处是如果某一个模块很多种React组件，我们可以很方便的将其归类。例如&nbsp;MyComponents.DatePicker\n' +
    '    是一个组件，我们可以直接使用JSX语法使用他：</p>\n' +
    '<pre class="javascript"><code class="language-javascript"><span class="code-keyword"><span\n' +
    '        class="code-keyword">import</span></span> React <span class="code-keyword"><span\n' +
    '        class="code-keyword">from</span></span> <span class="code-string"><span\n' +
    '        class="code-string">\'react\'</span></span>;\n' +
    '\n' +
    '<span class="code-keyword"><span class="code-keyword">const</span></span> MyComponents = {\n' +
    '  DatePicker: <span class="hljs-function"><span class="code-keyword"><span class="hljs-function"><span\n' +
    '            class="code-keyword">function</span></span></span><span class="hljs-function"> </span><span\n' +
    '            class="code-title"><span class="hljs-function"><span class="code-title">DatePicker</span></span></span><span\n' +
    '            class="hljs-function">(</span><span class="hljs-params"><span class="hljs-function"><span\n' +
    '            class="hljs-params">props</span></span></span><span class="hljs-function">) </span></span>{\n' +
    '    <span class="code-keyword"><span class="code-keyword">return</span></span> <span class="xml"><span class="code-tag"><span\n' +
    '            class="xml"><span class="code-tag">&lt;</span></span><span class="code-name"><span class="xml"><span\n' +
    '            class="code-tag"><span class="code-name">div</span></span></span></span><span class="xml"><span\n' +
    '            class="code-tag">&gt;</span></span></span><span\n' +
    '            class="xml">Imagine a {props.color} datepicker here.</span><span class="code-tag"><span class="xml"><span\n' +
    '            class="code-tag">&lt;/</span></span><span class="code-name"><span class="xml"><span class="code-tag"><span\n' +
    '            class="code-name">div</span></span></span></span><span class="xml"><span class="code-tag">&gt;</span></span></span></span>;\n' +
    '  }\n' +
    '}\n' +
    '\n' +
    '<span class="hljs-function"><span class="code-keyword"><span class="hljs-function"><span\n' +
    '        class="code-keyword">function</span></span></span><span class="hljs-function"> </span><span\n' +
    '        class="code-title"><span class="hljs-function"><span class="code-title">BlueDatePicker</span></span></span><span\n' +
    '        class="hljs-function">(</span><span class="hljs-params"></span><span class="hljs-function"><span\n' +
    '        class="hljs-params"></span>) </span></span>{\n' +
    '  <span class="code-keyword"><span class="code-keyword">return</span></span> <span class="xml"><span\n' +
    '            class="code-tag"><span class="xml"><span class="code-tag">&lt;</span></span><span class="code-name"><span\n' +
    '            class="xml"><span class="code-tag"><span\n' +
    '            class="code-name">MyComponents.DatePicker</span></span></span></span><span class="xml"><span\n' +
    '            class="code-tag"> </span></span><span class="hljs-attr"><span class="xml"><span class="code-tag"><span\n' +
    '            class="hljs-attr">color</span></span></span></span><span class="xml"><span\n' +
    '            class="code-tag">=</span></span><span class="code-string"><span class="xml"><span class="code-tag"><span\n' +
    '            class="code-string">"blue"</span></span></span></span><span class="xml"><span class="code-tag"> /&gt;</span></span></span><span\n' +
    '            class="xml">;\n' +
    '}</span></span></code></pre>\n' +
    '\n' +
    '<h4 id="h4-4">用户定义的组件首字母必须大写</h4>\n' +
    '<p>当一个元素以小写字母开头时它会被识别为一个内置的组件，比如&lt;div&gt;或&lt;span&gt;将会转译成字符串\'div\'、\'span\'传递给React.createElement方法，最终执行React.createElement(\'div\')。而如果以大写字母开头，例如&lt;Foo\n' +
    '    /&gt;，则会转译成一个对象作为参数传递，最终执行的方法是React.createElement(Foo)。</p>\n' +
    '<p>我们推荐在命名自定义组件时将首字母大写。如果不得不将自定义组件的首字母设置为小写字母，那么在使用JSX之前将其赋值给大写的变量。</p>\n' +
    '<p>下面的代码将不会按照预计执行：</p>\n' +
    '<pre class="javascript"><code class="language-javascript"><span class="code-keyword"><span\n' +
    '        class="code-keyword">import</span></span> React <span class="code-keyword"><span\n' +
    '        class="code-keyword">from</span></span> <span class="code-string"><span\n' +
    '        class="code-string">\'react\'</span></span>;\n' +
    '\n' +
    '<span class="code-comment"><span class="code-comment">// 错误！自定义组件首字母大写</span></span>\n' +
    '<span class="hljs-function"><span class="code-keyword"><span class="hljs-function"><span\n' +
    '        class="code-keyword">function</span></span></span><span class="hljs-function"> </span><span\n' +
    '        class="code-title"><span class="hljs-function"><span class="code-title">hello</span></span></span><span\n' +
    '        class="hljs-function">(</span><span class="hljs-params"><span class="hljs-function"><span class="hljs-params">props</span></span></span><span\n' +
    '        class="hljs-function">) </span></span>{\n' +
    '  <span class="code-comment"><span class="code-comment">// 正确！&lt;div&gt;是一个HTML标签</span></span>\n' +
    '  <span class="code-keyword"><span class="code-keyword">return</span></span> <span class="xml"><span\n' +
    '            class="code-tag"><span class="xml"><span class="code-tag">&lt;</span></span><span class="code-name"><span\n' +
    '            class="xml"><span class="code-tag"><span class="code-name">div</span></span></span></span><span class="xml"><span\n' +
    '            class="code-tag">&gt;</span></span></span><span class="xml">Hello {props.toWhat}</span><span\n' +
    '            class="code-tag"><span class="xml"><span class="code-tag">&lt;/</span></span><span class="code-name"><span\n' +
    '            class="xml"><span class="code-tag"><span class="code-name">div</span></span></span></span><span class="xml"><span\n' +
    '            class="code-tag">&gt;</span></span></span></span>;\n' +
    '}\n' +
    '\n' +
    '<span class="hljs-function"><span class="code-keyword"><span class="hljs-function"><span\n' +
    '        class="code-keyword">function</span></span></span><span class="hljs-function"> </span><span\n' +
    '        class="code-title"><span class="hljs-function"><span class="code-title">HelloWorld</span></span></span><span\n' +
    '        class="hljs-function">(</span><span class="hljs-params"></span><span class="hljs-function"><span\n' +
    '        class="hljs-params"></span>) </span></span>{\n' +
    '  <span class="code-comment"><span class="code-comment">// 错误！因首字母没有大写，React会认为&lt;hello&gt;是一个HTML标签:</span></span>\n' +
    '  <span class="code-keyword"><span class="code-keyword">return</span></span> <span class="xml"><span\n' +
    '            class="code-tag"><span class="xml"><span class="code-tag">&lt;</span></span><span class="code-name"><span\n' +
    '            class="xml"><span class="code-tag"><span class="code-name">hello</span></span></span></span><span\n' +
    '            class="xml"><span class="code-tag"> </span></span><span class="hljs-attr"><span class="xml"><span\n' +
    '            class="code-tag"><span class="hljs-attr">toWhat</span></span></span></span><span class="xml"><span\n' +
    '            class="code-tag">=</span></span><span class="code-string"><span class="xml"><span class="code-tag"><span\n' +
    '            class="code-string">"World"</span></span></span></span><span class="xml"><span\n' +
    '            class="code-tag"> /&gt;</span></span></span><span class="xml">;\n' +
    '}</span></span></code></pre>\n' +
    '<p>我们必须修改为：</p>\n' +
    '<pre class="javascript"><code class="language-javascript"><span class="code-keyword"><span\n' +
    '        class="code-keyword">import</span></span> React <span class="code-keyword"><span\n' +
    '        class="code-keyword">from</span></span> <span class="code-string"><span\n' +
    '        class="code-string">\'react\'</span></span>;\n' +
    '\n' +
    '<span class="hljs-function"><span class="code-keyword"><span class="hljs-function"><span\n' +
    '        class="code-keyword">function</span></span></span><span class="hljs-function"> </span><span\n' +
    '        class="code-title"><span class="hljs-function"><span class="code-title">Hello</span></span></span><span\n' +
    '        class="hljs-function">(</span><span class="hljs-params"><span class="hljs-function"><span class="hljs-params">props</span></span></span><span\n' +
    '        class="hljs-function">) </span></span>{\n' +
    '  <span class="code-keyword"><span class="code-keyword">return</span></span> <span class="xml"><span\n' +
    '            class="code-tag"><span class="xml"><span class="code-tag">&lt;</span></span><span class="code-name"><span\n' +
    '            class="xml"><span class="code-tag"><span class="code-name">div</span></span></span></span><span class="xml"><span\n' +
    '            class="code-tag">&gt;</span></span></span><span class="xml">Hello {props.toWhat}</span><span\n' +
    '            class="code-tag"><span class="xml"><span class="code-tag">&lt;/</span></span><span class="code-name"><span\n' +
    '            class="xml"><span class="code-tag"><span class="code-name">div</span></span></span></span><span class="xml"><span\n' +
    '            class="code-tag">&gt;</span></span></span></span>;\n' +
    '}\n' +
    '\n' +
    '<span class="hljs-function"><span class="code-keyword"><span class="hljs-function"><span\n' +
    '        class="code-keyword">function</span></span></span><span class="hljs-function"> </span><span\n' +
    '        class="code-title"><span class="hljs-function"><span class="code-title">HelloWorld</span></span></span><span\n' +
    '        class="hljs-function">(</span><span class="hljs-params"></span><span class="hljs-function"><span\n' +
    '        class="hljs-params"></span>) </span></span>{\n' +
    '  <span class="code-keyword"><span class="code-keyword">return</span></span> <span class="xml"><span\n' +
    '            class="code-tag"><span class="xml"><span class="code-tag">&lt;</span></span><span class="code-name"><span\n' +
    '            class="xml"><span class="code-tag"><span class="code-name">Hello</span></span></span></span><span\n' +
    '            class="xml"><span class="code-tag"> </span></span><span class="hljs-attr"><span class="xml"><span\n' +
    '            class="code-tag"><span class="hljs-attr">toWhat</span></span></span></span><span class="xml"><span\n' +
    '            class="code-tag">=</span></span><span class="code-string"><span class="xml"><span class="code-tag"><span\n' +
    '            class="code-string">"World"</span></span></span></span><span class="xml"><span\n' +
    '            class="code-tag"> /&gt;</span></span></span><span class="xml">;\n' +
    '}</span></span></code></pre>\n' +
    '\n' +
    '<h4 id="h4-5">在运行时确定类型</h4>\n' +
    '<p>由于JavaScript的语言特性，我们可以在运行时再确定类型。但是我们不能将这个常规的经验应用在JSX表达式中。不过我们可以在JSX表达式之外去确定“运行时类型”，只要将JSX表达式赋值给一个大写变量即可。例子：</p>\n' +
    '<pre class="javascript"><code class="language-javascript"><span class="code-keyword"><span\n' +
    '        class="code-keyword">import</span></span> React <span class="code-keyword"><span\n' +
    '        class="code-keyword">from</span></span> <span class="code-string"><span\n' +
    '        class="code-string">\'react\'</span></span>;\n' +
    '<span class="code-keyword"><span class="code-keyword">import</span></span> { PhotoStory, VideoStory } <span\n' +
    '            class="code-keyword"><span class="code-keyword">from</span></span> <span class="code-string"><span\n' +
    '            class="code-string">\'./stories\'</span></span>;\n' +
    '\n' +
    '<span class="code-keyword"><span class="code-keyword">const</span></span> components = {\n' +
    '  photo: PhotoStory,\n' +
    '  video: VideoStory\n' +
    '};\n' +
    '\n' +
    '<span class="hljs-function"><span class="code-keyword"><span class="hljs-function"><span\n' +
    '        class="code-keyword">function</span></span></span><span class="hljs-function"> </span><span\n' +
    '        class="code-title"><span class="hljs-function"><span class="code-title">Story</span></span></span><span\n' +
    '        class="hljs-function">(</span><span class="hljs-params"><span class="hljs-function"><span class="hljs-params">props</span></span></span><span\n' +
    '        class="hljs-function">) </span></span>{\n' +
    '  <span class="code-comment"><span class="code-comment">// 运行时错误! JSX不支持这样的表达式.</span></span>\n' +
    '  <span class="code-keyword"><span class="code-keyword">return</span></span> <span class="xml"><span\n' +
    '            class="code-tag"><span class="xml"><span class="code-tag">&lt;</span></span><span class="code-name"><span\n' +
    '            class="xml"><span class="code-tag"><span class="code-name">components[props.storyType]</span></span></span></span><span\n' +
    '            class="xml"><span class="code-tag"> </span></span><span class="hljs-attr"><span class="xml"><span\n' +
    '            class="code-tag"><span class="hljs-attr">story</span></span></span></span><span class="xml"><span\n' +
    '            class="code-tag">=</span></span><span class="code-string"><span class="xml"><span class="code-tag"><span\n' +
    '            class="code-string">{props.story}</span></span></span></span><span class="xml"><span\n' +
    '            class="code-tag"> /&gt;</span></span></span><span class="xml">;\n' +
    '}</span></span></code></pre>\n' +
    '<p>调整为：</p>\n' +
    '<pre class="javascript"><code class="language-javascript"><span class="code-keyword"><span\n' +
    '        class="code-keyword">import</span></span> React <span class="code-keyword"><span\n' +
    '        class="code-keyword">from</span></span> <span class="code-string"><span\n' +
    '        class="code-string">\'react\'</span></span>;\n' +
    '<span class="code-keyword"><span class="code-keyword">import</span></span> { PhotoStory, VideoStory } <span\n' +
    '            class="code-keyword"><span class="code-keyword">from</span></span> <span class="code-string"><span\n' +
    '            class="code-string">\'./stories\'</span></span>;\n' +
    '\n' +
    '<span class="code-keyword"><span class="code-keyword">const</span></span> components = {\n' +
    '  photo: PhotoStory,\n' +
    '  video: VideoStory\n' +
    '};\n' +
    '\n' +
    '<span class="hljs-function"><span class="code-keyword"><span class="hljs-function"><span\n' +
    '        class="code-keyword">function</span></span></span><span class="hljs-function"> </span><span\n' +
    '        class="code-title"><span class="hljs-function"><span class="code-title">Story</span></span></span><span\n' +
    '        class="hljs-function">(</span><span class="hljs-params"><span class="hljs-function"><span class="hljs-params">props</span></span></span><span\n' +
    '        class="hljs-function">) </span></span>{\n' +
    '  <span class="code-comment"><span class="code-comment">// 用一个大写变量来指向JSX声明的组件.</span></span>\n' +
    '  <span class="code-keyword"><span class="code-keyword">const</span></span> SpecificStory = components[props.storyType];\n' +
    '  <span class="code-keyword"><span class="code-keyword">return</span></span> <span class="xml"><span\n' +
    '            class="code-tag"><span class="xml"><span class="code-tag">&lt;</span></span><span class="code-name"><span\n' +
    '            class="xml"><span class="code-tag"><span class="code-name">SpecificStory</span></span></span></span><span\n' +
    '            class="xml"><span class="code-tag"> </span></span><span class="hljs-attr"><span class="xml"><span\n' +
    '            class="code-tag"><span class="hljs-attr">story</span></span></span></span><span class="xml"><span\n' +
    '            class="code-tag">=</span></span><span class="code-string"><span class="xml"><span class="code-tag"><span\n' +
    '            class="code-string">{props.story}</span></span></span></span><span class="xml"><span\n' +
    '            class="code-tag"> /&gt;</span></span></span><span class="xml">;\n' +
    '}</span></span></code></pre>\n' +
    '<p>这样写适用于我们基于某些条件来决定使用某个组件的场景。</p>\n' +
    '\n' +
    '<h3 id="h3-2">使用Prop传递JSX参数</h3>\n' +
    '\n' +
    '<h4 id="h4-6">JavaScript表达式</h4>\n' +
    '<p>可以传递任何JavaScript表达式作为props参数，JSX中嵌套的表达式要用{}包裹住。例如：</p>\n' +
    '<pre class="xml"><code class="language-html xml"><span class="code-tag"><span class="code-tag">&lt;</span><span\n' +
    '        class="code-name"><span class="code-tag"><span class="code-name">MyComponent</span></span></span><span\n' +
    '        class="code-tag"> </span><span class="hljs-attr"><span class="code-tag"><span\n' +
    '        class="hljs-attr">foo</span></span></span><span class="code-tag">=</span><span class="code-string"><span\n' +
    '        class="code-tag"><span class="code-string">{1</span></span></span><span class="code-tag"> + </span><span\n' +
    '        class="hljs-attr"><span class="code-tag"><span class="hljs-attr">2</span></span></span><span\n' +
    '        class="code-tag"> + </span><span class="hljs-attr"><span class="code-tag"><span\n' +
    '        class="hljs-attr">3</span></span></span><span class="code-tag"> + </span><span class="hljs-attr"><span\n' +
    '        class="code-tag"><span class="hljs-attr">4</span></span></span><span\n' +
    '        class="code-tag">} /&gt;</span></span></code></pre>\n' +
    '<p>MyComponent组件最终传入的参数是props.foo = 10，因为在传入参数之前“1 + 2 + 3 + 4”这个表达式已经先完成了计算。</p>\n' +
    '<p>在JSX的{}中不能使用for等循环表达式。可以在JSX表达式之外进行循环和遍历。例如：</p>\n' +
    '<pre class="javascript"><code class="language-javascript"><span class="hljs-function"><span class="code-keyword"><span\n' +
    '        class="hljs-function"><span class="code-keyword">function</span></span></span><span\n' +
    '        class="hljs-function"> </span><span class="code-title"><span class="hljs-function"><span class="code-title">NumberDescriber</span></span></span><span\n' +
    '        class="hljs-function">(</span><span class="hljs-params"><span class="hljs-function"><span class="hljs-params">props</span></span></span><span\n' +
    '        class="hljs-function">) </span></span>{\n' +
    '  <span class="code-keyword"><span class="code-keyword">let</span></span> Description;\n' +
    '  <span class="code-keyword"><span class="code-keyword">if</span></span> (props.number % <span class="hljs-number"><span\n' +
    '            class="hljs-number">2</span></span> == <span class="hljs-number"><span class="hljs-number">0</span></span>) {\n' +
    '    Description = <span class="xml"><span class="code-tag"><span class="xml"><span\n' +
    '            class="code-tag">&lt;</span></span><span class="code-name"><span class="xml"><span class="code-tag"><span\n' +
    '            class="code-name">strong</span></span></span></span><span class="xml"><span\n' +
    '            class="code-tag">&gt;</span></span></span><span class="xml">even</span><span class="code-tag"><span\n' +
    '            class="xml"><span class="code-tag">&lt;/</span></span><span class="code-name"><span class="xml"><span\n' +
    '            class="code-tag"><span class="code-name">strong</span></span></span></span><span class="xml"><span\n' +
    '            class="code-tag">&gt;</span></span></span></span>;\n' +
    '  } <span class="code-keyword"><span class="code-keyword">else</span></span> {\n' +
    '    Description = <span class="xml"><span class="code-tag"><span class="xml"><span\n' +
    '            class="code-tag">&lt;</span></span><span class="code-name"><span class="xml"><span class="code-tag"><span\n' +
    '            class="code-name">i</span></span></span></span><span class="xml"><span\n' +
    '            class="code-tag">&gt;</span></span></span><span class="xml">odd</span><span class="code-tag"><span\n' +
    '            class="xml"><span class="code-tag">&lt;/</span></span><span class="code-name"><span class="xml"><span\n' +
    '            class="code-tag"><span class="code-name">i</span></span></span></span><span class="xml"><span\n' +
    '            class="code-tag">&gt;</span></span></span></span>;\n' +
    '  }\n' +
    '  <span class="code-keyword"><span class="code-keyword">return</span></span> <span class="xml"><span\n' +
    '            class="code-tag"><span class="xml"><span class="code-tag">&lt;</span></span><span class="code-name"><span\n' +
    '            class="xml"><span class="code-tag"><span class="code-name">div</span></span></span></span><span class="xml"><span\n' +
    '            class="code-tag">&gt;</span></span></span><span class="xml">{props.number} is an {Description} number</span><span\n' +
    '            class="code-tag"><span class="xml"><span class="code-tag">&lt;/</span></span><span class="code-name"><span\n' +
    '            class="xml"><span class="code-tag"><span class="code-name">div</span></span></span></span><span class="xml"><span\n' +
    '            class="code-tag">&gt;</span></span></span></span>;\n' +
    '}</code></pre>\n' +
    '\n' +
    '<h4 id="h4-7">字符串文字</h4>\n' +
    '<p>也可以直接使用字符串作为一个参数传递，下面的表达式是一样的效果：</p>\n' +
    '<pre class="actionscript"><code class="language-javascript"><span class="code-comment"><span class="code-comment">//直接使用字符串</span></span>\n' +
    '&lt;MyComponent message=<span class="code-string"><span class="code-string">"hello world"</span></span> /&gt;\n' +
    '\n' +
    '<span class="code-comment"><span class="code-comment">//在JavaScript表达式中字符串作为一个参数传入</span></span>\n' +
    '&lt;MyComponent message={<span class="code-string"><span\n' +
    '            class="code-string">\'hello world\'</span></span>} /&gt;</code></pre>\n' +
    '<p>如果直接传递一个字符串，它将会被解析成未转义的HTML语法，比如下面的2个表达式会得带一样的结果：</p>\n' +
    '<pre class="actionscript"><code class="language-html xml"><span class="code-comment">//传入字符串</span>\n' +
    '<span class="code-tag">&lt;<span class="code-name">MyComponent</span> <span class="hljs-attr">message</span>=<span\n' +
    '        class="code-string"><span class="code-string">"&amp;lt;3"</span></span> /&gt;</span>\n' +
    '\n' +
    '<span class="code-comment">//通过JavaScript语法传入变量</span>\n' +
    '<span class="code-tag">&lt;<span class="code-name">MyComponent</span> <span class="hljs-attr">message</span>=<span\n' +
    '        class="code-string">{</span><span class="code-string">\'&lt;</span><span class="hljs-attr"><span\n' +
    '        class="code-string">3</span></span><span class="code-string">\'</span>} /&gt;</span></code></pre>\n' +
    '\n' +
    '<h4 id="h4-8">Prop参数默认为"True"</h4>\n' +
    '<p>如果传递了没有数据的prop参数，它的值默认为true。因此一下2个表达式完全一样：</p>\n' +
    '<pre class="xml"><code class="language-html xml"><span class="code-tag"><span class="code-tag">&lt;</span><span\n' +
    '        class="code-name"><span class="code-tag"><span class="code-name">MyTextBox</span></span></span><span\n' +
    '        class="code-tag"> </span><span class="hljs-attr"><span class="code-tag"><span\n' +
    '        class="hljs-attr">autocomplete</span></span></span><span class="code-tag"> /&gt;</span></span>\n' +
    '\n' +
    '<span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span class="code-tag"><span\n' +
    '        class="code-name">MyTextBox</span></span></span><span class="code-tag"> </span><span class="hljs-attr"><span\n' +
    '        class="code-tag"><span class="hljs-attr">autocomplete</span></span></span><span class="code-tag">=</span><span\n' +
    '        class="code-string"><span class="code-tag"><span class="code-string">{true}</span></span></span><span\n' +
    '        class="code-tag"> /&gt;</span></span></code></pre>\n' +
    '<p>通常情况下不推荐像上面这样使用，因为这会和ES6的简写语法混淆——{foo}是{foo：foo}的简写而不是{foo:true}。提供这个特性仅仅是因为很像HTML语法。</p>\n' +
    '\n' +
    '<h4 id="h4-9">属性扩展传递（Spread 特性）</h4>\n' +
    '<p>如果已经有一个类型为object的props，并且想将这个props传递给JSX。可以使用ES6的“...”语法来扩展传递整个参数。下面的表达式是一样的效果：</p>\n' +
    '<pre class="actionscript"><code class="language-javascript"><span class="hljs-function"><span class="code-keyword"><span\n' +
    '        class="hljs-function"><span class="code-keyword">function</span></span></span><span\n' +
    '        class="hljs-function"> </span><span class="code-title"><span class="hljs-function"><span\n' +
    '        class="code-title">App1</span></span></span><span class="hljs-function"><span\n' +
    '        class="hljs-params">(</span></span><span class="hljs-params"></span><span class="hljs-function"><span\n' +
    '        class="hljs-params">)</span> </span></span>{\n' +
    '  <span class="code-keyword"><span class="code-keyword">return</span></span> &lt;Greeting firstName=<span\n' +
    '            class="code-string">"Ben"</span> lastName=<span class="code-string">"Hector"</span> /&gt;;\n' +
    '}\n' +
    '\n' +
    '<span class="hljs-function"><span class="code-keyword">function</span> <span class="code-title">App2</span><span\n' +
    '        class="hljs-params">()</span> </span>{\n' +
    '  <span class="code-keyword">const</span> props = {firstName: <span class="code-string">\'Ben\'</span>, lastName: <span\n' +
    '            class="code-string">\'Hector\'</span>};\n' +
    '  <span class="code-keyword">return</span> &lt;Greeting {...props} /&gt;;\n' +
    '}</code></pre>\n' +
    '<p>属性扩展传递是一个非常有用的特性，尤其是当参数可变时。然而这个特性也会使得代码混乱并且传递一些无关紧要的参数到组件中，建议谨慎使用这个特性。</p>\n' +
    '\n' +
    '<h3 id="h3-3">JSX中的子标签</h3>\n' +
    '<p>JSX表达式既可以使用开放型标签页也可以使用封闭型标签（例如 开放型标签：&lt;div&gt;&lt;/div&gt;。封闭型标签：&lt;img\n' +
    '    /&gt;）。开放型标签中的内容会通过props.children传递到组件中。</p>\n' +
    '\n' +
    '<h4 id="h4-10">传递字符串</h4>\n' +
    '<p>可以在开放标签之间传递一个字符串，然后在组件中通过props.children获取的数据就是一个字符串。这对于许多内置的HTML标签很有用。例如：</p>\n' +
    '<pre class="xml"><code class="language-html xml"><span class="code-tag"><span class="code-tag">&lt;</span><span\n' +
    '        class="code-name"><span class="code-tag"><span class="code-name">MyComponent</span></span></span><span\n' +
    '        class="code-tag">&gt;</span></span>Hello world!<span class="code-tag"><span class="code-tag">&lt;/</span><span\n' +
    '        class="code-name"><span class="code-tag"><span class="code-name">MyComponent</span></span></span><span\n' +
    '        class="code-tag">&gt;</span></span></code></pre>\n' +
    '<p>在组件“MyComponent”中通过props.children可以获取到"Hello world!"字符串。你只需要按照需求编写字符串而不必考虑HTML的为转移特性，&nbsp;因此你们这样写JSX来影响HTML代码：</p>\n' +
    '<pre class="xml"><code class="language-html xml"><span class="code-tag"><span class="code-tag">&lt;</span><span\n' +
    '        class="code-name"><span class="code-tag"><span class="code-name">div</span></span></span><span class="code-tag">&gt;</span></span>This is valid HTML &amp;amp; JSX at the same time.<span\n' +
    '        class="code-tag"><span class="code-tag">&lt;/</span><span class="code-name"><span class="code-tag"><span\n' +
    '        class="code-name">div</span></span></span><span class="code-tag">&gt;</span></span></code></pre>\n' +
    '<p>JSX会移除掉开头和结尾的的空白字符、空白行、删除与标签相邻的新行。会将文字中间的换行、整行空白符号转义为一个空格符。基于这个特性，下面的表达式结果都是一样的：</p>\n' +
    '<pre class="xml"><code class="language-html xml">//标准\n' +
    '<span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span class="code-tag"><span\n' +
    '        class="code-name">div</span></span></span><span class="code-tag">&gt;</span></span>Hello World<span\n' +
    '            class="code-tag"><span class="code-tag">&lt;/</span><span class="code-name"><span class="code-tag"><span\n' +
    '            class="code-name">div</span></span></span><span class="code-tag">&gt;</span></span>\n' +
    '\n' +
    '//前后换行\n' +
    '<span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span class="code-tag"><span\n' +
    '        class="code-name">div</span></span></span><span class="code-tag">&gt;</span></span>\n' +
    '  Hello World\n' +
    '<span class="code-tag"><span class="code-tag">&lt;/</span><span class="code-name"><span class="code-tag"><span\n' +
    '        class="code-name">div</span></span></span><span class="code-tag">&gt;</span></span>\n' +
    '\n' +
    '//前后换行，中间换行\n' +
    '<span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span class="code-tag"><span\n' +
    '        class="code-name">div</span></span></span><span class="code-tag">&gt;</span></span>\n' +
    '  Hello\n' +
    '  World\n' +
    '<span class="code-tag"><span class="code-tag">&lt;/</span><span class="code-name"><span class="code-tag"><span\n' +
    '        class="code-name">div</span></span></span><span class="code-tag">&gt;</span></span>\n' +
    '\n' +
    '//前空白行，前换行。\n' +
    '<span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span class="code-tag"><span\n' +
    '        class="code-name">div</span></span></span><span class="code-tag">&gt;</span></span>\n' +
    '\n' +
    '  Hello World\n' +
    '<span class="code-tag"><span class="code-tag">&lt;/</span><span class="code-name"><span class="code-tag"><span\n' +
    '        class="code-name">div</span></span></span><span class="code-tag">&gt;</span></span></code></pre>\n' +
    '\n' +
    '<h4 id="h4-11">JSX的子元素</h4>\n' +
    '<p>在JSX的开放标签中间，你可以设置多个子标签，这些标签的内容都可以通过props.children获取：</p>\n' +
    '<pre class="xml"><code class="language-html xml"><span class="code-tag"><span class="code-tag">&lt;</span><span\n' +
    '        class="code-name"><span class="code-tag"><span class="code-name">MyContainer</span></span></span><span\n' +
    '        class="code-tag">&gt;</span></span>\n' +
    '  <span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span class="code-tag"><span\n' +
    '          class="code-name">MyFirstComponent</span></span></span><span class="code-tag"> /&gt;</span></span>\n' +
    '  <span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span class="code-tag"><span\n' +
    '          class="code-name">MySecondComponent</span></span></span><span class="code-tag"> /&gt;</span></span>\n' +
    '<span class="code-tag"><span class="code-tag">&lt;/</span><span class="code-name"><span class="code-tag"><span\n' +
    '        class="code-name">MyContainer</span></span></span><span class="code-tag">&gt;</span></span></code></pre>\n' +
    '<p>也可以同时使用多种类型的子元素，这一点JSX和HTML几乎一模一样，我们可以把JSX的解析过程看成一个HTML，例如：</p>\n' +
    '<pre class="xml"><code class="language-html xml"><span class="code-tag"><span class="code-tag">&lt;</span><span\n' +
    '        class="code-name"><span class="code-tag"><span class="code-name">div</span></span></span><span class="code-tag">&gt;</span></span>\n' +
    '  Here is a list:\n' +
    '  <span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span class="code-tag"><span\n' +
    '          class="code-name">ul</span></span></span><span class="code-tag">&gt;</span></span>\n' +
    '    <span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span class="code-tag"><span\n' +
    '            class="code-name">li</span></span></span><span class="code-tag">&gt;</span></span>Item 1<span\n' +
    '            class="code-tag"><span class="code-tag">&lt;/</span><span class="code-name"><span class="code-tag"><span\n' +
    '            class="code-name">li</span></span></span><span class="code-tag">&gt;</span></span>\n' +
    '    <span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span class="code-tag"><span\n' +
    '            class="code-name">li</span></span></span><span class="code-tag">&gt;</span></span>Item 2<span\n' +
    '            class="code-tag"><span class="code-tag">&lt;/</span><span class="code-name"><span class="code-tag"><span\n' +
    '            class="code-name">li</span></span></span><span class="code-tag">&gt;</span></span>\n' +
    '  <span class="code-tag"><span class="code-tag">&lt;/</span><span class="code-name"><span class="code-tag"><span\n' +
    '          class="code-name">ul</span></span></span><span class="code-tag">&gt;</span></span>\n' +
    '<span class="code-tag"><span class="code-tag">&lt;/</span><span class="code-name"><span class="code-tag"><span\n' +
    '        class="code-name">div</span></span></span><span class="code-tag">&gt;</span></span></code></pre>\n' +
    '<p>一个React组件不能一次返回多个React元素，但是一条独立的JSX表达式可以包含多个子元素，因此，我们可以使用一个外层标签来包裹子元素实现一个React组件渲染多个节点。</p>\n' +
    '\n' +
    '<h4 id="h4-12">JavaScript表达式作为子元素</h4>\n' +
    '<p>在JSX的子元素中，你也可以使用JavaScript表达式，JSX使用{}来表示要执行一段JavaScript语句。例如下面的2个表达式执行完毕后是一样的效果：</p>\n' +
    '<pre class="dust"><code class="language-html xml"><span class="code-tag"><span class="xml"><span\n' +
    '        class="code-tag">&lt;</span></span><span class="code-name"><span class="xml"><span class="code-tag"><span\n' +
    '        class="code-name">MyComponent</span></span></span></span><span class="xml"><span\n' +
    '        class="code-tag">&gt;</span></span></span><span class="xml">foo</span><span class="code-tag"><span\n' +
    '        class="xml"><span class="code-tag">&lt;/</span></span><span class="code-name"><span class="xml"><span\n' +
    '        class="code-tag"><span class="code-name">MyComponent</span></span></span></span><span class="xml"><span\n' +
    '        class="code-tag">&gt;</span></span></span><span class="xml">\n' +
    '\n' +
    '</span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;</span></span><span class="code-name"><span\n' +
    '        class="xml"><span class="code-tag"><span class="code-name">MyComponent</span></span></span></span><span\n' +
    '        class="xml"><span class="code-tag">&gt;</span></span></span><span\n' +
    '        class="code-template-variable">{\'foo\'}</span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;/</span></span><span\n' +
    '        class="code-name"><span class="xml"><span class="code-tag"><span\n' +
    '        class="code-name">MyComponent</span></span></span></span><span class="xml"><span\n' +
    '        class="code-tag">&gt;</span></span></span></code></pre>\n' +
    '<p>在开发过程中，我们经常会遇到需要渲染一个JSX表达式列表的情况，我们可以直接将迭代语句嵌入到子元素中去处理，例如：</p>\n' +
    '<pre class="javascript"><code class="language-javascript"><span class="hljs-function"><span class="code-keyword"><span\n' +
    '        class="hljs-function"><span class="code-keyword">function</span></span></span><span\n' +
    '        class="hljs-function"> </span><span class="code-title"><span class="hljs-function"><span\n' +
    '        class="code-title">Item</span></span></span><span class="hljs-function">(</span><span class="hljs-params"><span\n' +
    '        class="hljs-function"><span class="hljs-params">props</span></span></span><span class="hljs-function">) </span></span>{\n' +
    '  <span class="code-keyword"><span class="code-keyword">return</span></span> <span class="xml"><span\n' +
    '            class="code-tag"><span class="xml"><span class="code-tag">&lt;</span></span><span class="code-name"><span\n' +
    '            class="xml"><span class="code-tag"><span class="code-name">li</span></span></span></span><span\n' +
    '            class="xml"><span class="code-tag">&gt;</span></span></span><span class="xml">{props.message}</span><span\n' +
    '            class="code-tag"><span class="xml"><span class="code-tag">&lt;/</span></span><span class="code-name"><span\n' +
    '            class="xml"><span class="code-tag"><span class="code-name">li</span></span></span></span><span\n' +
    '            class="xml"><span class="code-tag">&gt;</span></span></span></span>;\n' +
    '}\n' +
    '\n' +
    '<span class="hljs-function"><span class="code-keyword"><span class="hljs-function"><span\n' +
    '        class="code-keyword">function</span></span></span><span class="hljs-function"> </span><span\n' +
    '        class="code-title"><span class="hljs-function"><span class="code-title">TodoList</span></span></span><span\n' +
    '        class="hljs-function">(</span><span class="hljs-params"></span><span class="hljs-function"><span\n' +
    '        class="hljs-params"></span>) </span></span>{\n' +
    '  <span class="code-keyword"><span class="code-keyword">const</span></span> todos = [<span class="code-string"><span\n' +
    '            class="code-string">\'finish doc\'</span></span>, <span class="code-string"><span class="code-string">\'submit pr\'</span></span>, <span\n' +
    '            class="code-string"><span class="code-string">\'nag dan to review\'</span></span>];\n' +
    '  <span class="code-keyword"><span class="code-keyword">return</span></span> (\n' +
    '    <span class="xml"><span class="code-tag"><span class="xml"><span class="code-tag">&lt;</span></span><span\n' +
    '            class="code-name"><span class="xml"><span class="code-tag"><span\n' +
    '            class="code-name">ul</span></span></span></span><span class="xml"><span class="code-tag">&gt;</span></span></span><span\n' +
    '            class="xml">\n' +
    '      {todos.map((message) =&gt; </span><span class="code-tag"><span class="xml"><span\n' +
    '            class="code-tag">&lt;</span></span><span class="code-name"><span class="xml"><span class="code-tag"><span\n' +
    '            class="code-name">Item</span></span></span></span><span class="xml"><span\n' +
    '            class="code-tag"> </span></span><span class="hljs-attr"><span class="xml"><span class="code-tag"><span\n' +
    '            class="hljs-attr">key</span></span></span></span><span class="xml"><span\n' +
    '            class="code-tag">=</span></span><span class="code-string"><span class="xml"><span class="code-tag"><span\n' +
    '            class="code-string">{message}</span></span></span></span><span class="xml"><span\n' +
    '            class="code-tag"> </span></span><span class="hljs-attr"><span class="xml"><span class="code-tag"><span\n' +
    '            class="hljs-attr">message</span></span></span></span><span class="xml"><span\n' +
    '            class="code-tag">=</span></span><span class="code-string"><span class="xml"><span class="code-tag"><span\n' +
    '            class="code-string">{message}</span></span></span></span><span class="xml"><span\n' +
    '            class="code-tag"> /&gt;</span></span></span><span class="xml">)}\n' +
    '    </span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;/</span></span><span\n' +
    '            class="code-name"><span class="xml"><span class="code-tag"><span\n' +
    '            class="code-name">ul</span></span></span></span><span class="xml"><span class="code-tag">&gt;</span></span></span><span\n' +
    '            class="xml">\n' +
    '  );\n' +
    '}</span></span></code></pre>\n' +
    '<p>JavaScript表达式可以和任意类型的子元素混合使用，例如我们将其作为一个模板工具使用：</p>\n' +
    '<pre class="javascript"><code class="language-javascript"><span class="hljs-function"><span class="code-keyword"><span\n' +
    '        class="hljs-function"><span class="code-keyword">function</span></span></span><span\n' +
    '        class="hljs-function"> </span><span class="code-title"><span class="hljs-function"><span class="code-title">Hello</span></span></span><span\n' +
    '        class="hljs-function">(</span><span class="hljs-params"><span class="hljs-function"><span class="hljs-params">props</span></span></span><span\n' +
    '        class="hljs-function">) </span></span>{\n' +
    '  <span class="code-keyword"><span class="code-keyword">return</span></span> <span class="xml"><span\n' +
    '            class="code-tag"><span class="xml"><span class="code-tag">&lt;</span></span><span class="code-name"><span\n' +
    '            class="xml"><span class="code-tag"><span class="code-name">div</span></span></span></span><span class="xml"><span\n' +
    '            class="code-tag">&gt;</span></span></span><span class="xml">Hello {props.addressee}!</span><span\n' +
    '            class="code-tag"><span class="xml"><span class="code-tag">&lt;/</span></span><span class="code-name"><span\n' +
    '            class="xml"><span class="code-tag"><span class="code-name">div</span></span></span></span><span class="xml"><span\n' +
    '            class="code-tag">&gt;</span></span></span></span>;\n' +
    '}</code></pre>\n' +
    '\n' +
    '<h4 id="h4-13">Function作为子元素</h4>\n' +
    '<p>\n' +
    '    通常情况下，将JavaScript表达式嵌入到JSX中将会被成一段字符串、一个React元素或者一个包含字符串和React元素的列表。然而，props.chilidren和其他props参数一样，它可以传递任何类型的数据而不仅仅是React知晓的类型。例如，自定义自建Repeat，子元素将接收到一个方法列表，在Repeat逐一执行每个方法：</p>\n' +
    '<pre class="javascript"><code class="language-javascript"><span class="code-comment"><span class="code-comment">// prop.children会接收一个方法列表，每个方法将会被逐一调用。</span></span>\n' +
    '<span class="hljs-function"><span class="code-keyword"><span class="hljs-function"><span\n' +
    '        class="code-keyword">function</span></span></span><span class="hljs-function"> </span><span\n' +
    '        class="code-title"><span class="hljs-function"><span class="code-title">Repeat</span></span></span><span\n' +
    '        class="hljs-function">(</span><span class="hljs-params"><span class="hljs-function"><span class="hljs-params">props</span></span></span><span\n' +
    '        class="hljs-function">) </span></span>{\n' +
    '  <span class="code-keyword"><span class="code-keyword">let</span></span> items = [];\n' +
    '  <span class="code-keyword"><span class="code-keyword">for</span></span> (<span class="code-keyword"><span\n' +
    '            class="code-keyword">let</span></span> i = <span class="hljs-number"><span\n' +
    '            class="hljs-number">0</span></span>; i &lt; props.numTimes; i++) {\n' +
    '    items.push(props.children(i));\n' +
    '  }\n' +
    '  <span class="code-keyword"><span class="code-keyword">return</span></span> <span class="xml"><span\n' +
    '            class="code-tag"><span class="xml"><span class="code-tag">&lt;</span></span><span class="code-name"><span\n' +
    '            class="xml"><span class="code-tag"><span class="code-name">div</span></span></span></span><span class="xml"><span\n' +
    '            class="code-tag">&gt;</span></span></span><span class="xml">{items}</span><span class="code-tag"><span\n' +
    '            class="xml"><span class="code-tag">&lt;/</span></span><span class="code-name"><span class="xml"><span\n' +
    '            class="code-tag"><span class="code-name">div</span></span></span></span><span class="xml"><span\n' +
    '            class="code-tag">&gt;</span></span></span></span>;\n' +
    '}\n' +
    '\n' +
    '<span class="code-comment"><span class="code-comment">// numTimes传递的是循环的次数，而子元素则是一系列方法。会在Repeat组件中被执行。</span></span>\n' +
    '<span class="hljs-function"><span class="code-keyword"><span class="hljs-function"><span\n' +
    '        class="code-keyword">function</span></span></span><span class="hljs-function"> </span><span\n' +
    '        class="code-title"><span class="hljs-function"><span\n' +
    '        class="code-title">ListOfTenThings</span></span></span><span class="hljs-function">(</span><span\n' +
    '        class="hljs-params"></span><span class="hljs-function"><span class="hljs-params"></span>) </span></span>{\n' +
    '  <span class="code-keyword"><span class="code-keyword">return</span></span> (\n' +
    '    <span class="xml"><span class="code-tag"><span class="xml"><span class="code-tag">&lt;</span></span><span\n' +
    '            class="code-name"><span class="xml"><span class="code-tag"><span\n' +
    '            class="code-name">Repeat</span></span></span></span><span class="xml"><span class="code-tag"> </span></span><span\n' +
    '            class="hljs-attr"><span class="xml"><span class="code-tag"><span\n' +
    '            class="hljs-attr">numTimes</span></span></span></span><span class="xml"><span\n' +
    '            class="code-tag">=</span></span><span class="code-string"><span class="xml"><span class="code-tag"><span\n' +
    '            class="code-string">{10}</span></span></span></span><span class="xml"><span\n' +
    '            class="code-tag">&gt;</span></span></span><span class="xml">\n' +
    '      {(index) =&gt; </span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;</span></span><span\n' +
    '            class="code-name"><span class="xml"><span class="code-tag"><span class="code-name">div</span></span></span></span><span\n' +
    '            class="xml"><span class="code-tag"> </span></span><span class="hljs-attr"><span class="xml"><span\n' +
    '            class="code-tag"><span class="hljs-attr">key</span></span></span></span><span class="xml"><span\n' +
    '            class="code-tag">=</span></span><span class="code-string"><span class="xml"><span class="code-tag"><span\n' +
    '            class="code-string">{index}</span></span></span></span><span class="xml"><span class="code-tag">&gt;</span></span></span><span\n' +
    '            class="xml">This is item {index} in the list</span><span class="code-tag"><span class="xml"><span\n' +
    '            class="code-tag">&lt;/</span></span><span class="code-name"><span class="xml"><span class="code-tag"><span\n' +
    '            class="code-name">div</span></span></span></span><span class="xml"><span class="code-tag">&gt;</span></span></span><span\n' +
    '            class="xml">}\n' +
    '    </span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;/</span></span><span\n' +
    '            class="code-name"><span class="xml"><span class="code-tag"><span\n' +
    '            class="code-name">Repeat</span></span></span></span><span class="xml"><span\n' +
    '            class="code-tag">&gt;</span></span></span></span>\n' +
    '  );\n' +
    '}</code></pre>\n' +
    '<p>props.children可以传递任意参数给自定义的组件，只要在React发生渲染之前处理成React可以理解的表达式即可，这样可以极大的延伸JSX的灵活性。</p>\n' +
    '\n' +
    '<h4 id="h4-14">Booleans, Null, and Undefined被忽略</h4>\n' +
    '<p><code>false</code>,&nbsp;<code>null</code>,&nbsp;<code>undefined</code>, and&nbsp;<code>true</code>&nbsp;都是有效的元素，它们在表达式中的含义为“不需要渲染”。下面的表达式都会得到同样的结果：&nbsp;\n' +
    '    &nbsp;</p>\n' +
    '<pre class="dust"><code class="language-html xml"><span class="code-tag"><span class="xml"><span\n' +
    '        class="code-tag">&lt;</span></span><span class="code-name"><span class="xml"><span class="code-tag"><span\n' +
    '        class="code-name">div</span></span></span></span><span class="xml"><span\n' +
    '        class="code-tag"> /&gt;</span></span></span><span class="xml">\n' +
    '\n' +
    '</span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;</span></span><span class="code-name"><span\n' +
    '        class="xml"><span class="code-tag"><span class="code-name">div</span></span></span></span><span\n' +
    '        class="xml"><span class="code-tag">&gt;</span></span></span><span class="code-tag"><span class="xml"><span\n' +
    '        class="code-tag">&lt;/</span></span><span class="code-name"><span class="xml"><span class="code-tag"><span\n' +
    '        class="code-name">div</span></span></span></span><span class="xml"><span\n' +
    '        class="code-tag">&gt;</span></span></span><span class="xml">\n' +
    '\n' +
    '</span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;</span></span><span class="code-name"><span\n' +
    '        class="xml"><span class="code-tag"><span class="code-name">div</span></span></span></span><span\n' +
    '        class="xml"><span class="code-tag">&gt;</span></span></span><span\n' +
    '        class="code-template-variable">{false}</span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;/</span></span><span\n' +
    '        class="code-name"><span class="xml"><span class="code-tag"><span\n' +
    '        class="code-name">div</span></span></span></span><span class="xml"><span\n' +
    '        class="code-tag">&gt;</span></span></span><span class="xml">\n' +
    '\n' +
    '</span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;</span></span><span class="code-name"><span\n' +
    '        class="xml"><span class="code-tag"><span class="code-name">div</span></span></span></span><span\n' +
    '        class="xml"><span class="code-tag">&gt;</span></span></span><span\n' +
    '        class="code-template-variable">{null}</span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;/</span></span><span\n' +
    '        class="code-name"><span class="xml"><span class="code-tag"><span\n' +
    '        class="code-name">div</span></span></span></span><span class="xml"><span\n' +
    '        class="code-tag">&gt;</span></span></span><span class="xml">\n' +
    '\n' +
    '</span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;</span></span><span class="code-name"><span\n' +
    '        class="xml"><span class="code-tag"><span class="code-name">div</span></span></span></span><span\n' +
    '        class="xml"><span class="code-tag">&gt;</span></span></span><span\n' +
    '        class="code-template-variable">{undefined}</span><span class="code-tag"><span class="xml"><span\n' +
    '        class="code-tag">&lt;/</span></span><span class="code-name"><span class="xml"><span class="code-tag"><span\n' +
    '        class="code-name">div</span></span></span></span><span class="xml"><span\n' +
    '        class="code-tag">&gt;</span></span></span><span class="xml">\n' +
    '\n' +
    '</span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;</span></span><span class="code-name"><span\n' +
    '        class="xml"><span class="code-tag"><span class="code-name">div</span></span></span></span><span\n' +
    '        class="xml"><span class="code-tag">&gt;</span></span></span><span\n' +
    '        class="code-template-variable">{true}</span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;/</span></span><span\n' +
    '        class="code-name"><span class="xml"><span class="code-tag"><span\n' +
    '        class="code-name">div</span></span></span></span><span class="xml"><span\n' +
    '        class="code-tag">&gt;</span></span></span></code></pre>\n' +
    '<p>这样的特性有利于编写各种条件表达式。例如下面的例子，只有当<code>showHeader</code>为<code>true</code>时才会渲染&lt;Header /&gt;元素：</p>\n' +
    '<p></p>\n' +
    '<pre class="xml"><code class="language-html xml"><span class="code-tag"><span class="code-tag">&lt;</span><span\n' +
    '        class="code-name"><span class="code-tag"><span class="code-name">div</span></span></span><span class="code-tag">&gt;</span></span>\n' +
    '  {showHeader &amp;&amp; <span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span\n' +
    '            class="code-tag"><span class="code-name">Header</span></span></span><span\n' +
    '            class="code-tag"> /&gt;</span></span>}\n' +
    '  <span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span class="code-tag"><span\n' +
    '          class="code-name">Content</span></span></span><span class="code-tag"> /&gt;</span></span>\n' +
    '<span class="code-tag"><span class="code-tag">&lt;/</span><span class="code-name"><span class="code-tag"><span\n' +
    '        class="code-name">div</span></span></span><span class="code-tag">&gt;</span></span></code></pre>\n' +
    '<p>需要特别说明的是<strong>falsy</strong>值（<a title="JavaScript中的false" href="https://developer.mozilla.org/en-US/docs/Glossary/Falsy" rel="nofollow">参看mozilla官文说明</a>），当变量值为数字型的0时，React还是会将其渲染的。下面的代码当&nbsp;props.messages.length结果为0时，依然会发生渲染：\n' +
    '</p>\n' +
    '<pre class="xml"><code class="language-html xml"><span class="code-tag"><span class="code-tag">&lt;</span><span\n' +
    '        class="code-name"><span class="code-tag"><span class="code-name">div</span></span></span><span class="code-tag">&gt;</span></span>\n' +
    '  {props.messages.length &amp;&amp;\n' +
    '    <span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span class="code-tag"><span\n' +
    '            class="code-name">MessageList</span></span></span><span class="code-tag"> </span><span\n' +
    '            class="hljs-attr"><span class="code-tag"><span class="hljs-attr">messages</span></span></span><span\n' +
    '            class="code-tag">=</span><span class="code-string"><span class="code-tag"><span class="code-string">{props.messages}</span></span></span><span\n' +
    '            class="code-tag"> /&gt;</span></span>\n' +
    '  }\n' +
    '<span class="code-tag"><span class="code-tag">&lt;/</span><span class="code-name"><span class="code-tag"><span\n' +
    '        class="code-name">div</span></span></span><span class="code-tag">&gt;</span></span></code></pre>\n' +
    '<p>需要始终保持&amp;&amp;之前的表达式结果都是boolean类型，所以为了得到正确的结果，我们需要将表达式调整为：</p>\n' +
    '<pre class="xml"><code class="language-html xml"><span class="code-tag"><span class="code-tag">&lt;</span><span\n' +
    '        class="code-name"><span class="code-tag"><span class="code-name">div</span></span></span><span class="code-tag">&gt;</span></span>\n' +
    '  {props.messages.length &gt; 0 &amp;&amp;\n' +
    '    <span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span class="code-tag"><span\n' +
    '            class="code-name">MessageList</span></span></span><span class="code-tag"> </span><span\n' +
    '            class="hljs-attr"><span class="code-tag"><span class="hljs-attr">messages</span></span></span><span\n' +
    '            class="code-tag">=</span><span class="code-string"><span class="code-tag"><span class="code-string">{props.messages}</span></span></span><span\n' +
    '            class="code-tag"> /&gt;</span></span>\n' +
    '  }\n' +
    '<span class="code-tag"><span class="code-tag">&lt;/</span><span class="code-name"><span class="code-tag"><span\n' +
    '        class="code-name">div</span></span></span><span class="code-tag">&gt;</span></span></code></pre>\n' +
    '<p>最后，如果想要将&nbsp;<code>false</code>,&nbsp;<code>true</code>,&nbsp;<code>null</code>, or&nbsp;<code>undefined</code>&nbsp;这些输出到组件中，需要将他们转换成字符串（<a\n' +
    '        title="JavaScript字符串转换"\n' +
    '        href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String#String_conversion"\n' +
    '        rel="nofollow">说明</a>）:</p>\n' +
    '<pre class="dust"><code class="language-html xml"><span class="code-tag"><span class="xml"><span\n' +
    '        class="code-tag">&lt;</span></span><span class="code-name"><span class="xml"><span class="code-tag"><span\n' +
    '        class="code-name">div</span></span></span></span><span class="xml"><span\n' +
    '        class="code-tag">&gt;</span></span></span><span class="xml">\n' +
    '  My JavaScript variable is </span><span class="code-template-variable">{String(myVariable)}</span><span class="xml">.\n' +
    '</span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;/</span></span><span class="code-name"><span\n' +
    '        class="xml"><span class="code-tag"><span class="code-name">div</span></span></span></span><span\n' +
    '        class="xml"><span class="code-tag">&gt;</span></span></span></code></pre>\n' +
    '<p></p>';