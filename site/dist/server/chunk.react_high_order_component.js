exports.ids=[46],exports.modules={308:function(s,n,a){"use strict";Object.defineProperty(n,"__esModule",{value:!0});n.content='<h2 id="h2-1">高阶组件</h2>\n<p>高阶组件（higher-order components：以下简称HOC或HOC组件）是一个React组件复用的高级技巧。HOCs本身并不是React的API接口，他是React组件之间组织方式的一种模式。</p>\n<p>具体来说，一个HOC组件是一个返回另外一个新组件的方法，如下面的代码：</p>\n<pre class="lisp"><code class="language-javascript"><span class="code-keyword">const</span> EnhancedComponent = higherOrderComponent(<span\n        class="code-name">WrappedComponent</span>)<span class="code-comment">;</span></code></pre>\n<p>常规的React组件都是将传入的props值转换成一个UI返回，而高阶组件是将一个组件转换成另外一个组件。HOCs通常以第三方React组件库的方式呈现，比如Redux的 <a\n        href="https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options"\n        rel="nofollow">connect </a>和&nbsp;Relay的&nbsp;<a\n        href="https://facebook.github.io/relay/docs/api-reference-relay.html#createcontainer-static-method"\n        rel="nofollow">createContainer</a>。</p>\n<p>本文会讨论为什么HOCs非常有用，并且介绍如何开发自定义的HOCs。</p>\n\n<h4 id="h4-1">HOCs用于组件代码共用</h4>\n<blockquote>\n    <p>在前面的文章中已经介绍了“混合器”，他也是组件代码共用的一种方式，但是到目前为止“混合器”在使用中遇到很多问题，并且官方已经不再推荐使用它。可以阅读这篇文章（<a\n            href="https://facebook.github.io/react/blog/2016/07/13/mixins-considered-harmful.html" rel="nofollow">Mixins\n        Considered Harmful</a>）了解为什么官方已经不再推荐使用“混合器”以及将代码转换成其他模式的方式。</p>\n</blockquote>\n<p>组件是React中代码重用的主要单元。但是随着应用的深入，开发者会发现一些模式对于一些传统的组件并不总是行之有效。下面这个例子，假设有一个名为&nbsp;<code>CommentList</code>&nbsp;的组件,它利用外部数据源来更新组件内的列表：\n</p>\n<pre class="scala"><code class="language-javascript"><span class="hljs-class"><span class="code-keyword"><span\n        class="hljs-class"><span class="code-keyword">class</span></span></span><span class="hljs-class"> </span><span\n        class="code-title"><span class="hljs-class"><span class="code-title">CommentList</span></span></span><span\n        class="hljs-class"> </span><span class="code-keyword"><span class="hljs-class"><span class="code-keyword">extends</span></span></span><span\n        class="hljs-class"> </span><span class="code-title"><span class="hljs-class"><span\n        class="code-title">React</span></span></span><span class="hljs-class">.</span><span class="code-title"><span\n        class="hljs-class"><span class="code-title">Component</span></span></span><span\n        class="hljs-class"> </span></span>{\n  <span class="code-keyword">constructor</span>() {\n    <span class="code-keyword"><span class="code-keyword">super</span></span>();\n    <span class="code-keyword"><span class="code-keyword">this</span></span>.handleChange = <span\n            class="code-keyword"><span class="code-keyword">this</span></span>.handleChange.bind(<span\n            class="code-keyword"><span class="code-keyword">this</span></span>);\n    <span class="code-keyword"><span class="code-keyword">this</span></span>.state = {\n      <span class="code-comment"><span class="code-comment">// "DataSource"是一个全局的数据源</span></span>\n      comments: <span class="code-type">DataSource</span>.getComments()\n    };\n  }\n\n  componentDidMount() {\n    <span class="code-comment"><span class="code-comment">// 监听数据变更</span></span>\n    <span class="code-type">DataSource</span>.addChangeListener(<span class="code-keyword"><span class="code-keyword">this</span></span>.handleChange);\n  }\n\n  componentWillUnmount() {\n    <span class="code-comment"><span class="code-comment">// 清除注册事件</span></span>\n    <span class="code-type">DataSource</span>.removeChangeListener(<span class="code-keyword"><span\n            class="code-keyword">this</span></span>.handleChange);\n  }\n\n  handleChange() {\n    <span class="code-comment"><span class="code-comment">// 当数据变更时更新组件的列表数据</span></span>\n    <span class="code-keyword"><span class="code-keyword">this</span></span>.setState({\n      comments: <span class="code-type">DataSource</span>.getComments()\n    });\n  }\n\n  render() {\n    <span class="code-keyword"><span class="code-keyword">return</span></span> (\n      <span class="xml"><span class="code-tag">&lt;<span class="code-name">div</span>&gt;</span>\n        {<span class="code-keyword">this</span>.state.comments.map((comment) =&gt; (\n          <span class="code-tag">&lt;<span class="code-name"><span class="code-type">Comment</span></span> <span\n                  class="hljs-attr">comment</span>=<span class="code-string">{comment}</span> <span class="hljs-attr">key</span>=<span\n                  class="code-string">{comment.id}</span> /&gt;</span>\n        ))}\n      <span class="code-tag">&lt;/<span class="code-name">div</span>&gt;</span>\n    );\n  }\n}</span></code></pre>\n<p>随后，再创建一个组件来订阅监听数据的更新，也使用类似的模式：</p>\n<pre class="kotlin"><code class="language-javascript"><span class="hljs-class"><span class="code-keyword"><span\n        class="hljs-class"><span class="code-keyword">class</span></span></span><span class="hljs-class"> </span><span\n        class="code-title"><span class="hljs-class"><span class="code-title">BlogPost</span></span></span><span\n        class="hljs-class"> </span><span class="code-keyword"><span class="hljs-class"><span\n        class="code-title">extends</span></span></span><span class="hljs-class"> </span><span class="code-title"><span\n        class="hljs-class"><span class="code-title">React</span></span></span><span class="hljs-class">.</span><span\n        class="code-title"><span class="hljs-class"><span class="code-title">Component</span></span></span><span\n        class="hljs-class"> </span></span>{\n  <span class="code-keyword"><span class="code-keyword">constructor</span></span>(props) {\n    <span class="code-keyword"><span class="code-keyword">super</span></span>(props);\n    <span class="code-keyword"><span class="code-keyword">this</span></span>.handleChange = <span\n            class="code-keyword"><span class="code-keyword">this</span></span>.handleChange.bind(<span\n            class="code-keyword"><span class="code-keyword">this</span></span>);\n    <span class="code-keyword"><span class="code-keyword">this</span></span>.state = {\n      blogPost: DataSource.getBlogPost(props.id)\n    };\n  }\n\n  componentDidMount() {\n    DataSource.addChangeListener(<span class="code-keyword"><span class="code-keyword">this</span></span>.handleChange);\n  }\n\n  componentWillUnmount() {\n    DataSource.removeChangeListener(<span class="code-keyword"><span class="code-keyword">this</span></span>.handleChange);\n  }\n\n  handleChange() {\n    <span class="code-keyword"><span class="code-keyword">this</span></span>.setState({\n      blogPost: DataSource.getBlogPost(<span class="code-keyword"><span class="code-keyword">this</span></span>.props.id)\n    });\n  }\n\n  render() {\n    <span class="code-keyword"><span class="code-keyword">return</span></span> <span class="xml"><span class="code-tag">&lt;<span\n            class="code-name">TextBlock</span> <span class="hljs-attr">text</span>=<span class="code-string">{<span\n            class="code-keyword">this</span>.state.blogPost}</span> /&gt;</span>;\n  }\n}</span></code></pre>\n<p><code>CommentList</code>&nbsp;和<code>BlogPost</code>&nbsp;没有任何关系，他们只是都调用了<code>DataSource</code>中不同的方法以获取特定的数据。但是实现的模式是一致的，相似点有：\n</p>\n<ol>\n    <li>在生命周期方法完成组件装载后，都增加了对&nbsp;<code>DataSource</code>&nbsp;的监听。</li>\n    <li>在监听方法中，只要数据发生变更都会调用&nbsp;<code>setState</code>&nbsp;。</li>\n    <li>在组件被卸载时，都会移除监听功能。</li>\n</ol>\n<p>可以想象在一个非常庞大的应用中，上面这种订阅&nbsp;<code>DataSource</code>&nbsp;变更并调用&nbsp;<code>setState</code>&nbsp;的模式可以在许多组件中重复使用。所以，我们可以将这一层功能抽象出来在一个地方编码实现这个处理逻辑，将它分享到许多组件中去使用，这就是HOCs。\n</p>\n<p>可以编写一个通用方法来创建类似&nbsp;<code>CommentList</code>&nbsp;和&nbsp;<code>BlogPost</code>&nbsp;组件中一致的功能——统一订阅&nbsp;<code>DataSource</code>。这个方法应该可以接受一个参数，这个参数将外部组件作为一个子组件传入到方法中，并在方法中完成子组件数据订阅的功能，例如下面的例子中的&nbsp;<code>withSubscription</code>：\n</p>\n<pre class="lisp"><code class="language-javascript"><span class="code-keyword">const</span> CommentListWithSubscription = withSubscription(\n  <span class="code-name">CommentList</span>,\n  (<span class="code-name">DataSource</span>) =&gt; DataSource.getComments()\n)<span class="code-comment">;</span>\n\n<span class="code-keyword">const</span> BlogPostWithSubscription = withSubscription(\n  <span class="code-name">BlogPost</span>,\n  (<span class="code-name">DataSource</span>, props) =&gt; DataSource.getBlogPost(<span class="code-name">props</span>.id)\n})<span class="code-comment">;</span></code></pre>\n<p><code>withSubscription</code>的第一个参数就是要被方法包装的子组件。第二个方法设定我们要获取的数据，直接指定&nbsp;<code>DataSource</code>&nbsp;并利用组件传入的\n    props。</p>\n<p>当&nbsp;<code>CommentListWithSubscription</code>&nbsp;和&nbsp;<code>BlogPostWithSubscription</code>&nbsp;被渲染时，<code>CommentList</code>&nbsp;和<code>BlogPost</code>&nbsp;将会被传入一个&nbsp;<code>data</code>&nbsp;属性值，这个值是从&nbsp;<code>DataSource</code>中检索的数据：\n</p>\n<pre class="kotlin"><code class="language-javascript"><span class="code-comment"><span class="code-comment">// 方法第一个参数传入另外一个组件</span></span>\n<span class="hljs-function"><span class="code-keyword">function</span> <span class="code-title">withSubscription</span>(<span\n        class="hljs-params">WrappedComponent, selectData</span>) </span>{\n  <span class="code-comment"><span class="code-comment">// 然后在方法体中构建另外一个组件并返回</span></span>\n  <span class="code-keyword"><span class="code-keyword">return</span></span> <span class="hljs-class"><span\n            class="code-keyword"><span class="hljs-class"><span class="code-keyword">class</span></span></span><span\n            class="hljs-class"> </span><span class="code-keyword"><span class="hljs-class"><span class="code-title">extends</span></span></span><span\n            class="hljs-class"> </span><span class="code-title"><span class="hljs-class"><span\n            class="code-title">React</span></span></span><span class="hljs-class">.</span><span class="code-title"><span\n            class="hljs-class"><span class="code-title">Component</span></span></span><span class="hljs-class"> </span></span>{\n    <span class="code-keyword"><span class="code-keyword">constructor</span></span>(props) {\n      <span class="code-keyword"><span class="code-keyword">super</span></span>(props);\n      <span class="code-keyword"><span class="code-keyword">this</span></span>.handleChange = <span\n            class="code-keyword"><span class="code-keyword">this</span></span>.handleChange.bind(<span\n            class="code-keyword"><span class="code-keyword">this</span></span>);\n      <span class="code-keyword"><span class="code-keyword">this</span></span>.state = {\n        <span class="code-keyword">data</span>: selectData(DataSource, props)\n      };\n    }\n\n    componentDidMount() {\n      <span class="code-comment"><span class="code-comment">// 订阅DataSource的数据</span></span>\n      DataSource.addChangeListener(<span class="code-keyword"><span class="code-keyword">this</span></span>.handleChange);\n    }\n\n    componentWillUnmount() {\n      DataSource.removeChangeListener(<span class="code-keyword"><span class="code-keyword">this</span></span>.handleChange);\n    }\n\n    handleChange() {\n      <span class="code-keyword"><span class="code-keyword">this</span></span>.setState({\n        <span class="code-keyword">data</span>: selectData(DataSource, <span class="code-keyword"><span\n            class="code-keyword">this</span></span>.props)\n      });\n    }\n\n    render() {\n      <span class="code-comment"><span class="code-comment">// 在render返回的部分对传入的组件进行包装，</span></span>\n      <span class="code-comment"><span class="code-comment">// 将变更后的数据以data属性传入包装组件，并返回根据参数渲染之后的组件</span></span>\n      <span class="code-comment"><span class="code-comment">// 如果这里利用ES6的"..."扩展属性 + assgin方法，可以组合更多的参数</span></span>\n      <span class="code-keyword"><span class="code-keyword">return</span></span> <span class="xml"><span\n            class="code-tag">&lt;<span class="code-name">WrappedComponent</span> <span class="hljs-attr"><span\n            class="code-keyword">data</span></span>=<span class="code-string">{<span class="code-keyword">this</span>.state.<span\n            class="code-keyword">data</span>}</span> {<span class="hljs-attr">...<span class="code-keyword">this</span>.props</span>} /&gt;</span>;\n    }\n  };\n}</span></code></pre>\n<p>需要注意的，一个HOC模式的组件不会修改传入的组件，更不会使用继承的方式去复制组件原有的功能。相反地，一个HOC模式的组件是通过组合的方式将原来的组件通过“容器组件”包装起来。概括的来说，HOC是一个零副作用的纯函数。</p>\n<p>就像我们在例子中看到的，被包装的组件从容器获取所有的props属性，根据容器传入给他新属性值——&nbsp;<code>data</code>&nbsp;来渲染并输出。HOC并不关心数据是如何被子组件使用的，而与之对应的是，子组件不会去关心这些数据从何而来。\n</p>\n<p><code>withSubscription</code>&nbsp;并不是一个普通的方法，可以根据需要额外增加许多参数。例如在现在的需求是让传入到子组件的&nbsp;<code>data</code>&nbsp;属性可配置，以进一步实现子组件和包装组件相互分离，或者能够接受一个参数能够配置&nbsp;<code>shouldComponentUpdate</code>方法，或者可以配置数据源。以上这些需求都是可以实现的，因为HOC可以完全控制组件的定义。\n</p>\n\n<h4 id="h4-2">不要让源组件数据突变</h4>\n<p>在HOC编码过程中，一定不能让组件产生数据突变：</p>\n<pre class="javascript"><code class="language-javascript"><span class="hljs-function"><span class="code-keyword"><span\n        class="hljs-function"><span class="code-keyword">function</span></span></span><span\n        class="hljs-function"> </span><span class="code-title"><span class="hljs-function"><span class="code-title">logProps</span></span></span><span\n        class="hljs-function">(</span><span class="hljs-params"><span class="hljs-function"><span class="hljs-params">InputComponent</span></span></span><span\n        class="hljs-function">) </span></span>{\n  InputComponent.prototype.componentWillReceiveProps(nextProps) {\n    <span class="code-built_in"><span class="code-built_in">console</span></span>.log(<span class="code-string"><span\n            class="code-string">\'Current props: \'</span></span>, <span class="code-keyword"><span class="code-keyword">this</span></span>.props);\n    <span class="code-built_in"><span class="code-built_in">console</span></span>.log(<span class="code-string"><span\n            class="code-string">\'Next props: \'</span></span>, nextProps);\n  }\n  <span class="code-comment"><span class="code-comment">// 实时上，这里返回的原始input只是一个映射值，因为它已经发生了突变</span></span>\n  <span class="code-keyword"><span class="code-keyword">return</span></span> InputComponent;\n}\n\n<span class="code-comment"><span class="code-comment">// EnhancedComponent 将在收到props时记录。</span></span>\n<span class="code-keyword"><span class="code-keyword">const</span></span> EnhancedComponent = logProps(InputComponent);</code></pre>\n<p>上面的代码看似没毛病，但是存在一些隐藏的问题。</p>\n<p>首先是输入的组件不能与HOC分开使用，比如例子中的&nbsp;<code>componentWillReceiveProps</code>&nbsp;生命周期方法被增强组件覆盖，那么必须保证原始组件中&nbsp;<code>componentWillReceiveProps</code>&nbsp;不包含任何实现代码。\n</p>\n<p>其次还存在更重要的问题是，如果还有另外一个HOC组件包装了&nbsp;<code>EnhancedComponent</code>&nbsp;并且也以突变的方式覆盖&nbsp;<code>componentWillReceiveProps</code>&nbsp;方法，此时第一个HOC的功能将会被覆盖，组件之间并没有完全意义上实现隔离。\n</p>\n<p>用数据突变的方式去实现HOCs是一种不完备的抽象，开发人员在使用这些HOCs时候必须知道某些实现细节，以避免与其他HOC组件或在自身的编码中与之产生冲突。</p>\n<p>HOCs应该使用组合的方式来代替数据突变，下面的代码展示了使用容器如何包装输入组件以实现相同的功能：</p>\n<pre class="scala"><code class="language-javascript"><span class="hljs-function"><span\n        class="code-keyword">function</span> <span class="code-title">logProps</span>(<span class="hljs-params"><span\n        class="code-type">WrappedComponent</span></span>) </span>{\n  <span class="code-comment"><span class="code-comment">// 新创建一个组件</span></span>\n  <span class="code-keyword"><span class="code-keyword">return</span></span> <span class="hljs-class"><span\n            class="code-keyword"><span class="hljs-class"><span class="code-keyword">class</span></span></span><span\n            class="hljs-class"> </span><span class="code-keyword"><span class="hljs-class"><span class="code-keyword">extends</span></span></span><span\n            class="hljs-class"> </span><span class="code-title"><span class="hljs-class"><span\n            class="code-title">React</span></span></span><span class="hljs-class">.</span><span class="code-title"><span\n            class="hljs-class"><span class="code-title">Component</span></span></span><span class="hljs-class"> </span></span>{\n    <span class="code-comment"><span class="code-comment">//重载生命周期方法</span></span>\n    componentWillReceiveProps(nextProps) {\n      <span class="code-built_in">console</span>.log(<span class="code-string"><span class="hljs-symbol">\'Current</span> props: \'</span>, <span\n            class="code-keyword"><span class="code-keyword">this</span></span>.props);\n      <span class="code-built_in">console</span>.log(<span class="code-string"><span class="hljs-symbol">\'Next</span> props: \'</span>, nextProps);\n    }\n    render() {\n      <span class="code-comment"><span class="code-comment">// 对输入组件进行包装，利用ES6"..."扩展将参数原封不动的传入输入组件</span></span>\n      <span class="code-keyword"><span class="code-keyword">return</span></span> <span class="xml"><span\n            class="code-tag">&lt;<span class="code-name"><span class="code-type">WrappedComponent</span></span> {<span\n            class="hljs-attr">...<span class="code-keyword">this</span>.props</span>} /&gt;</span>;\n    }\n  }\n}</span></code></pre>\n<p>这一段代码和之前的数据突变例子具备相同的功能，同时能避免上面提到的问题，而且无论是class还是function定义的组件它都适用。由于是一个纯函数，所以即使对其继续使用HOC包装也不会有任何问题。</p>\n<p>\n    在前面的介绍中，HOCs和容器组件的实现模式有相似之处。容器组件是将高级组件和底层组件整合在一起形成连接的一部分。容器会管理各种各样的内容，例如：订阅、状态，以及将属性数据传递到子组件中以实现底层组件的渲染功能。容器组件是HOCs模式实现的一部分，可以将HOCs模式看作一个参数化的容器组件。</p>\n\n<h4 id="h4-3">惯例：将无关的属性值传递到包装组件中</h4>\n<p>HOCs为一个组件额外增加了一些特性，但是它不应该影响组件原有的功能。对于一个HOC组件来说，他应该和被包装的子组件有相似的输入接口、有相同的返回。</p>\n<p>HOC组件应该将那些外部传入但是与HOC组件功能无关的参数按照被包装子组件接口定义的方式传递到子组件中。所以大部分HOC组件都会像下面这个编写render方法：</p>\n<pre class="javascript"><code class="language-javascript">render() {\n  <span class="code-comment"><span class="code-comment">// 过滤掉在当前HOC组件中不需要传递的额外参数</span></span>\n  <span class="code-keyword"><span class="code-keyword">const</span></span> { extraProp, ...passThroughProps } = <span\n            class="code-keyword"><span class="code-keyword">this</span></span>.props;\n\n  <span class="code-comment"><span class="code-comment">// 需要注入到包装组件中的参数</span></span>\n  <span class="code-keyword"><span class="code-keyword">const</span></span> injectedProp = someStateOrInstanceMethod;\n\n  <span class="code-comment"><span class="code-comment">// Pass props to wrapped component</span></span>\n  <span class="code-keyword"><span class="code-keyword">return</span></span> (\n    <span class="xml"><span class="code-tag"><span class="xml"><span class="code-tag">&lt;</span></span><span\n            class="code-name"><span class="xml"><span class="code-tag"><span\n            class="code-name">WrappedComponent</span></span></span></span><span class="xml"><span class="code-tag">\n      </span></span><span class="hljs-attr"><span class="xml"><span class="code-tag"><span class="hljs-attr">injectedProp</span></span></span></span><span\n            class="xml"><span class="code-tag">=</span></span><span class="code-string"><span class="xml"><span\n            class="code-tag"><span class="code-string">{injectedProp}</span></span></span></span><span class="xml"><span\n            class="code-tag">\n      {</span></span><span class="hljs-attr"><span class="xml"><span class="code-tag"><span class="hljs-attr">...passThroughProps</span></span></span></span><span\n            class="xml"><span class="code-tag">}\n    /&gt;</span></span></span><span class="xml">\n  );\n}</span></span></code></pre>\n<p>这个惯例能确保HOC具备不错的复用能力。</p>\n\n<h4 id="h4-4">惯例：最大化组合性</h4>\n<p>并不是所有HOC组件都是一样的。某些时候，它们仅仅需求接受一个参数，例如：</p>\n<pre class="lisp"><code class="language-javascript"><span class="code-keyword">const</span> NavbarWithRouter = withRouter(<span\n        class="code-name">Navbar</span>)<span class="code-comment">;</span></code></pre>\n<p>通常情况下，HOC组件会接受额外的参数，下面的例子中一个配置对象 config 用于指定组件的数据依赖：</p>\n<pre class="actionscript"><code class="language-javascript"><span class="code-keyword"><span\n        class="code-keyword">const</span></span> CommentWithRelay = Relay.createContainer(Comment, config);</code></pre>\n<p>最通用的的HOC组件声明方式是这样的：</p>\n<pre class="actionscript"><code class="language-javascript"><span class="code-comment"><span class="code-comment">// React Redux\'s `connect`</span></span>\n<span class="code-keyword"><span class="code-keyword">const</span></span> ConnectedComment = connect(commentSelector, commentActions)(Comment);</code></pre>\n<p>看到这里可能还有点懵逼，但是把它拆开来看就明白了：</p>\n<pre class="actionscript"><code class="language-javascript"><span class="code-comment"><span class="code-comment">// connect是一个返回另外一个方法的方法</span></span>\n<span class="code-keyword"><span class="code-keyword">const</span></span> enhance = connect(commentListSelector, commentListActions);\n<span class="code-comment"><span\n        class="code-comment">// connect返回的方法是一个HOC组件，这个HOC组件会返回一个与Redux store相互关联的组件</span></span>\n<span class="code-keyword"><span\n        class="code-keyword">const</span></span> ConnectedComment = enhance(CommentList);</code></pre>\n<p>换一种说法,&nbsp;<code>connect</code>&nbsp;是一个高阶方法，它返回一个高阶组件！</p>\n<p>这个结构看起来令人困惑或者没有必要，但是他有一个非常有用的特性。由&nbsp;<code>connect</code>&nbsp;返回的只有一个参数的HOC组件拥有一个特殊的结构&nbsp;<code>Component =&gt;\n    Component</code>——输入一个组件输出一个组件，这种结构非常有利于组件之间重复组成组合关系，看下面这个例子：</p>\n<pre class="actionscript"><code class="language-javascript"><span class="code-comment"><span class="code-comment">// 例子用于实现这个过程</span></span>\n<span class="code-comment"><span class="code-comment">// const EnhancedComponent = connect(commentSelector)(withRouter(WrappedComponent))</span></span>\n\n<span class="code-comment"><span class="code-comment">// 有一个已定义的compose(f, g, h)方法，这个方法的执行效果就是不断的包装组件</span></span>\n<span class="code-comment"><span class="code-comment">// 效果等同于 (...args) =&gt; f(g(h(...args)))</span></span>\n<span class="code-keyword"><span class="code-keyword">const</span></span> enhance = compose(\n  <span class="code-comment"><span class="code-comment">// 2个参数都是一个HOC组件</span></span>\n  connect(commentSelector),\n  withRouter\n)\n<span class="code-keyword"><span class="code-keyword">const</span></span> EnhancedComponent = enhance(WrappedComponent)</code></pre>\n<p>有很多第三方库都提供了类似于compose的方法。只要我们编写的HOC组件都使用这个模式，可以很好的延伸使用下去，而不必考虑参数模式。</p>\n\n<h4 id="h4-5">惯例：包装组件名称以便于调试</h4>\n<p>由HOCs模式创建的包装组件很难在&nbsp;<a href="https://github.com/facebook/react-devtools" rel="nofollow">React Developer Tools</a>&nbsp;等调试工具中与原组件关联起来。为了便于调试，需要选择一个用于显示的名称表明它是一个HOC组件。\n</p>\n<p>通用的实现技巧是包装被包装组件的名称。所以如果定义的高阶组件命名为&nbsp;<code>withSubscription</code>， 而被包装的组件名为&nbsp;<code>CommentList</code>，那么HOC组件的名称应该是&nbsp;<code>WithSubscription(CommentList)</code>：\n</p>\n<pre class="scala"><code class="language-javascript"><span class="hljs-function"><span\n        class="code-keyword">function</span> <span class="code-title">withSubscription</span>(<span class="hljs-params"><span\n        class="code-type">WrappedComponent</span></span>) </span>{\n  <span class="hljs-class"><span class="code-keyword"><span class="hljs-class"><span\n          class="code-keyword">class</span></span></span><span class="hljs-class"> </span><span class="code-title"><span\n          class="hljs-class"><span class="code-title">WithSubscription</span></span></span><span\n          class="hljs-class"> </span><span class="code-keyword"><span class="hljs-class"><span class="code-keyword">extends</span></span></span><span\n          class="hljs-class"> </span><span class="code-title"><span class="hljs-class"><span\n          class="code-title">React</span></span></span><span class="hljs-class">.</span><span class="code-title"><span\n          class="hljs-class"><span class="code-title">Component</span></span></span><span\n          class="hljs-class"> </span></span>{<span class="code-comment"><span\n            class="code-comment">/* ... */</span></span>}\n  <span class="code-type">WithSubscription</span>.displayName = <span class="code-string">`<span class="code-type">WithSubscription</span>(<span\n            class="hljs-subst">${getDisplayName(<span class="code-type">WrappedComponent</span>)}</span>)`</span>;\n  <span class="code-keyword"><span class="code-keyword">return</span></span> <span\n            class="code-type">WithSubscription</span>;\n}\n\n<span class="hljs-function"><span class="code-keyword">function</span> <span\n        class="code-title">getDisplayName</span>(<span class="hljs-params"><span\n        class="code-type">WrappedComponent</span></span>) </span>{\n  <span class="code-keyword"><span class="code-keyword">return</span></span> <span\n            class="code-type">WrappedComponent</span>.displayName || <span class="code-type">WrappedComponent</span>.name || <span\n            class="code-string"><span class="hljs-symbol">\'Componen</span>t\'</span>;\n}</code></pre>\n\n<h3 id="h3-1">HOCs的坑</h3>\n<p>对于刚使用React的开发人员来说，HOCs存在的一些隐性问题需要注意。</p>\n\n<h4 id="h4-6">不要在render方法中去编码HOCs模式的实现代码</h4>\n<p>React的对比算法（融合算法）使用组件的标记来确定子树是需要更新还是移除重建。如果组件返回的数据和之前返回的数据相同（===），React会递归的比较子树并更新有差异的部分，如果不相同，则会移除重建整个子树。</p>\n<p>通常在使用组件时，并不需要去了解这个情况。但是如果是编写HOC组件就非常重要，这就意味着开发人员不能在render方法中去编写实现HOC的代码：</p>\n<pre class="javascript"><code class="language-javascript">render() {\n  <span class="code-comment"><span class="code-comment">// 在每次渲染时，一个新的EnhancedComponent 组件都会被创建。</span></span>\n  <span class="code-comment"><span class="code-comment">// 并且每次创建的EnhancedComponent实例都不一样</span></span>\n  <span class="code-keyword"><span class="code-keyword">const</span></span> EnhancedComponent = enhance(MyComponent);\n  <span class="code-comment"><span class="code-comment">// 这样会导致这个组件的子树每次都会重建!</span></span>\n  <span class="code-keyword"><span class="code-keyword">return</span></span> <span class="xml"><span\n            class="code-tag"><span class="xml"><span class="code-tag">&lt;</span></span><span class="code-name"><span\n            class="xml"><span class="code-tag"><span\n            class="code-name">EnhancedComponent</span></span></span></span><span class="xml"><span class="code-tag"> /&gt;</span></span></span><span\n            class="xml">;\n}</span></span></code></pre>\n<p>这个问题并不仅仅是和性能有关，每次重建一个组件会导致组件以及子组件已有的状态都会丢失。我们应该将HOCs模式应用于组件之外，以保证组件的实例只被创建一次，确保每次渲染时，他的标记都是一致的。</p>\n<p>在某些罕见的应用下需要动态的使用HOC组件，可以在组件的生命周期方法或其构造函数中构造HOC模式相关的代码。</p>\n\n<h4 id="h4-7">静态方法必须复制</h4>\n<p>某些时候，在React组件中顶一个静态方法非常有用。当在某个组件上使用HOC组件时，源组件会被容器组件包装起来，这就意味着新的组件并没有源组件的静态方法。</p>\n<pre class="actionscript"><code class="language-javascript"><span class="code-comment"><span class="code-comment">// 定义一个静态方法</span></span>\nWrappedComponent.staticMethod = <span class="hljs-function"><span class="code-keyword"><span class="hljs-function"><span\n            class="code-keyword">function</span></span></span><span class="hljs-function"><span\n            class="hljs-params">(</span></span><span class="hljs-params"></span><span class="hljs-function"><span\n            class="hljs-params">)</span> </span></span>{<span class="code-comment"><span\n            class="code-comment">/*...*/</span></span>}\n<span class="code-comment"><span class="code-comment">// 现在提供一个HOC模式</span></span>\n<span class="code-keyword"><span class="code-keyword">const</span></span> EnhancedComponent = enhance(WrappedComponent);\n\n<span class="code-comment"><span class="code-comment">// 增强组件并没有静态方法</span></span>\n<span class="code-keyword"><span class="code-keyword">typeof</span></span> EnhancedComponent.staticMethod === <span\n            class="code-string"><span class="code-string">\'undefined\'</span></span> <span class="code-comment"><span\n            class="code-comment">// true</span></span></code></pre>\n<p>为了解决这个问题，你必须将源组件上的静态方法拷贝到容器组件上：</p>\n<pre class="scala"><code class="language-javascript"><span class="hljs-function"><span\n        class="code-keyword">function</span> <span class="code-title">enhance</span>(<span class="hljs-params"><span\n        class="code-type">WrappedComponent</span></span>) </span>{\n  <span class="hljs-class"><span class="code-keyword"><span class="hljs-class"><span\n          class="code-keyword">class</span></span></span><span class="hljs-class"> </span><span class="code-title"><span\n          class="hljs-class"><span class="code-title">Enhance</span></span></span><span class="hljs-class"> </span><span\n          class="code-keyword"><span class="hljs-class"><span class="code-keyword">extends</span></span></span><span\n          class="hljs-class"> </span><span class="code-title"><span class="hljs-class"><span\n          class="code-title">React</span></span></span><span class="hljs-class">.</span><span class="code-title"><span\n          class="hljs-class"><span class="code-title">Component</span></span></span><span\n          class="hljs-class"> </span></span>{<span class="code-comment"><span class="code-comment">/*...*/</span></span>}\n  <span class="code-comment"><span class="code-comment">// 必须知道哪些静态方法需要拷贝 :(</span></span>\n  <span class="code-type">Enhance</span>.staticMethod = <span class="code-type">WrappedComponent</span>.staticMethod;\n  <span class="code-keyword"><span class="code-keyword">return</span></span> <span class="code-type">Enhance</span>;\n}</code></pre>\n<p>上面的例子开发人员必须提前知道哪些静态方法需要被拷贝，我们可以利用<a href="https://github.com/mridgway/hoist-non-react-statics" rel="nofollow">hoist-non-react-statics</a>这个扩展工具来自动拷贝所有非React定义的静态方法：\n</p>\n<pre class="scala"><code class="language-javascript"><span class="code-keyword"><span class="code-keyword">import</span></span> hoistNonReactStatic <span\n        class="code-keyword">from</span> <span class="code-string"><span class="hljs-symbol">\'hoist</span>-non-react-statics\'</span>;\n<span class="hljs-function"><span class="code-keyword">function</span> <span class="code-title">enhance</span>(<span\n        class="hljs-params"><span class="code-type">WrappedComponent</span></span>) </span>{\n  <span class="hljs-class"><span class="code-keyword"><span class="hljs-class"><span\n          class="code-keyword">class</span></span></span><span class="hljs-class"> </span><span class="code-title"><span\n          class="hljs-class"><span class="code-title">Enhance</span></span></span><span class="hljs-class"> </span><span\n          class="code-keyword"><span class="hljs-class"><span class="code-keyword">extends</span></span></span><span\n          class="hljs-class"> </span><span class="code-title"><span class="hljs-class"><span\n          class="code-title">React</span></span></span><span class="hljs-class">.</span><span class="code-title"><span\n          class="hljs-class"><span class="code-title">Component</span></span></span><span\n          class="hljs-class"> </span></span>{<span class="code-comment"><span class="code-comment">/*...*/</span></span>}\n  hoistNonReactStatic(<span class="code-type">Enhance</span>, <span class="code-type">WrappedComponent</span>);\n  <span class="code-keyword"><span class="code-keyword">return</span></span> <span class="code-type">Enhance</span>;\n}</code></pre>\n<p>另外一个解决方法是由底层组件的开发者去导出静态方法：</p>\n<pre class="javascript"><code class="language-javascript"><span class="code-comment"><span class="code-comment">// Instead of...</span></span>\nMyComponent.someFunction = someFunction;\n<span class="code-keyword"><span class="code-keyword">export</span></span> <span class="code-keyword"><span\n            class="code-keyword">default</span></span> MyComponent;\n\n<span class="code-comment"><span class="code-comment">// ...export the method separately...</span></span>\n<span class="code-keyword"><span class="code-keyword">export</span></span> { someFunction };\n\n<span class="code-comment"><span class="code-comment">// ...and in the consuming module, import both</span></span>\n<span class="code-keyword"><span class="code-keyword">import</span></span> MyComponent, { someFunction } <span\n            class="code-keyword"><span class="code-keyword">from</span></span> <span class="code-string"><span\n            class="code-string">\'./MyComponent.js\'</span></span>;</code></pre>\n\n<h4 id="h4-8">Refs并不会被传递</h4>\n<p>\n    在前面的惯例中介绍了将所有的props属性传递给被包装子组件的实现方法，但是需要明确的是Refs并不会被传递。这是因为Refs并不是一个真正的属性，对于React来说他是一个处理器。如果你给一个HOC组件添加一个ref，这个ref指向的是外层容器组件而非被包装的组件。</p>\n<p>\n    如果已经在编码中出现了这个问题，明智的解决方案是找到避免使用Refs特性的方法。有时候刚开始使用React开发的编程人员更喜欢使用ref胜过props。在不得不使用Refs的情况下，我们可以考虑将ref作为一个props参数的回调方法来使用：</p>\n<pre class="actionscript"><code class="language-javascript"><span class="hljs-function"><span class="code-keyword"><span\n        class="hljs-function"><span class="code-keyword">function</span></span></span><span\n        class="hljs-function"> </span><span class="code-title"><span class="hljs-function"><span class="code-title">Field</span></span></span><span\n        class="hljs-function"><span class="hljs-params">(</span></span><span class="hljs-params"><span\n        class="hljs-function"><span class="hljs-params">{ inputRef, <span class="hljs-rest_arg">...rest</span> }</span></span></span><span\n        class="hljs-function"><span class="hljs-params">)</span> </span></span>{\n  <span class="code-keyword"><span class="code-keyword">return</span></span> &lt;input ref={inputRef} {...rest} /&gt;;\n}\n\n<span class="code-comment">// HOC包装Field</span>\n<span class="code-keyword">const</span> EnhancedField = enhance(Field);\n\n<span class="code-comment">// render()</span>\n&lt;EnhancedField\n  inputRef={(inputEl) =&gt; {\n    <span class="code-comment">// 指定一个回调函数，通过这个回调将ref通过props传递到外部</span>\n    <span class="code-keyword">this</span>.inputEl = inputEl\n  }}\n/&gt;\n\n<span class="code-comment">// 然后直接使用回调</span>\n<span class="code-keyword">this</span>.inputEl.focus();</code></pre>'}};