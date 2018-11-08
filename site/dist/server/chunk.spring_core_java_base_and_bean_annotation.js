exports.ids=[32],exports.modules={336:function(n,s,a){"use strict";Object.defineProperty(s,"__esModule",{value:!0});s.content='<h2 id="h2-1">3.0新增容器启动方法</h2>\n<p>在3.0之前的Spring核心框架中，我们启动一个Spring容器必须使用一个XML文件。而到了3.X之后的版本Spring为创建容器新增了一个入口类——<strong><em>AnnotationConfigApplicationContext</em></strong>。\n</p>\n<p>\n    AnnotationConfigApplicationContext和过去的ClassPathXmlApplicationContext、FileSystemXmlApplicationContext等方法不同的是他不用再指定任何XML配置文件，而是可以通过指定类向容器添加Bean。我们通过几个简单的例子来说明他的使用。</p>\n<p>（以下例子只用于说明问题，源码<a href="https://gitee.com/chkui-com/spring-core-sample" rel="nofollow">请到 gitee&nbsp;自行 clone</a>，本节的代码在&nbsp;chkui.springcore.example.javabase.simple\n    包中）。</p>\n\n<h3 id="h3-1">直接添加Bean</h3>\n<p>我们可以通过AnnotationConfigApplicationContext直接向容器添加指定的类作为Bean，先定义我们的class：</p>\n<pre><code class="java"><span class="code-keyword">package</span> chkui.springcore.example.javabase.simple.pureBean;\n\n<span class="hljs-class"><span class="code-keyword">class</span> <span class="code-title">LolBean</span> </span>{\n\t<span class="hljs-function"><span class="code-keyword">public</span> String <span class="code-title">toString</span><span\n            class="hljs-params">()</span> </span>{\n\t\t<span class="code-keyword">return</span> <span class="code-string">"I AM LOL!"</span>;\n\t}\n}\n\n<span class="hljs-class"><span class="code-keyword">class</span> <span class="code-title">WowBean</span> </span>{\n\t<span class="hljs-function"><span class="code-keyword">public</span> String <span class="code-title">toString</span><span\n            class="hljs-params">()</span> </span>{\n\t\t<span class="code-keyword">return</span> <span class="code-string">"I AM WOW!"</span>;\n\t}\n}</code></pre>\n<p>然后向容器添加这些Bean：</p>\n<pre><code class="java"><span class="code-keyword">package</span> chkui.springcore.example.javabase.simple;\n\n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n            class="code-title">WithoutAnnotation</span> </span>{\n\t<span class="hljs-function"><span class="code-keyword">public</span> <span class="code-keyword">static</span> <span\n            class="code-keyword">void</span> <span class="code-title">main</span><span class="hljs-params">(String[] args)</span> </span>{\n\t\tApplicationContext ctx = <span class="code-keyword">new</span> AnnotationConfigApplicationContext(WowBean.class, LolBean.class);\n\t\tSystem.out.println(ctx.getBean(WowBean.class));\n\t\tSystem.out.println(ctx.getBean(LolBean.class));\n\t}\n}</code></pre>\n<p>这样就启动了一个Spring的容器，并且容器中包含了WowBean和LolBean这两个类的单例。</p>\n\n<h3 id="h3-2">替代&lt;beans&gt;标签</h3>\n<p>@Configuration在之前介绍Spring核心容器的文章中出现过一两次，配合各种注解的使用@Configuration可以替代&lt;beans&gt;配置中的所有功能。基本上AnnotationConfigApplicationContext和@Configuration组合使用就可以实现Spring容器纯Java启动。请看下面的例子。</p>\n<p>我们在前面例子的基础上增加几个类：</p>\n<pre><code class="java"><span class="code-keyword">package</span> chkui.springcore.example.javabase.simple.bean;\n\n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n            class="code-title">DotaBean</span> </span>{\n\t<span class="hljs-function"><span class="code-keyword">public</span> String <span class="code-title">toString</span><span\n            class="hljs-params">()</span> </span>{\n\t\t<span class="code-keyword">return</span> <span class="code-string">"I AM Dota!"</span>;\n\t}\n}\n\n<span class="code-meta">@Component</span>\n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n            class="code-title">PseBean</span> </span>{\n\n\t<span class="code-meta">@Override</span>\n\t<span class="hljs-function"><span class="code-keyword">public</span> String <span class="code-title">toString</span><span\n            class="hljs-params">()</span> </span>{\n\t\t<span class="code-keyword">return</span> <span class="code-string">"I AM PSE!"</span>;\n\t}\n}</code></pre>\n<p>注意DotaBean上是没有@Component注解的。然后添加@Configuration配置：</p>\n<pre><code class="java"><span class="code-keyword">package</span> chkui.springcore.example.javabase.simple.bean;\n\n<span class="code-meta">@Configuration</span>\n<span class="code-meta">@ComponentScan</span>(<span\n            class="code-string">"chkui.springcore.example.javabase.simple.bean"</span>)\n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n            class="code-title">Config</span> </span>{\n\t<span class="code-meta">@Bean</span>\n\t<span class="hljs-function"><span class="code-keyword">public</span> DotaBean <span\n            class="code-title">dotaBean</span><span class="hljs-params">()</span> </span>{\n\t\t<span class="code-keyword">return</span> <span class="code-keyword">new</span> DotaBean();\n\t}\n}</code></pre>\n<p>最后运行他们：</p>\n<pre><code class="java"><span class="code-keyword">package</span> chkui.springcore.example.javabase.simple;\n\n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n            class="code-title">WithScan</span> </span>{\n\t<span class="hljs-function"><span class="code-keyword">public</span> <span class="code-keyword">static</span> <span\n            class="code-keyword">void</span> <span class="code-title">main</span><span class="hljs-params">(String[] args)</span> </span>{\n\t\tApplicationContext ctx = <span class="code-keyword">new</span> AnnotationConfigApplicationContext(Config.class, WowBean.class, LolBean.class);\n\t\tSystem.out.println(ctx.getBean(Config.class));\n\t\tSystem.out.println(ctx.getBean(PseBean.class));\n\t\tSystem.out.println(ctx.getBean(WowBean.class));\n\t\tSystem.out.println(ctx.getBean(LolBean.class));\n\t\tSystem.out.println(ctx.getBean(DotaBean.class));\n\t}\n}</code></pre>\n<p>@Component已经在&nbsp;<a href="https://www.chkui.com/article/spring/spring_core_stereotype_component_and_bean_scan"\n                         title="Stereotype组件与Bean扫描">Stereotype组件与Bean扫描</a>&nbsp;这篇文章介绍过，@ComponentScan的作用等价于&lt;context:component-scan/&gt;标签，属性参数都是一一对应的，只不过前者是驼峰命名规则（camelCase）——@ComponentScan(basePackages="...")，后者是短横线命名规则（kebab-case）——&lt;context:component-scan\n    base-package="..."/&gt;。实际上使用Annotation来替换XML配置中的内容，大部分都使用这种转换方式。</p>\n<p>@Configuration和@Bean标签会在后续的内容中详细介绍。@Bean主要用于方法标记，表明这个方法返回一个要添加到容器中的Bean。</p>\n\n<h3 id="h3-3">AnnotationConfigApplicationContext的其他使用方法</h3>\n<p>除了以上常规的使用方法，AnnotationConfigApplicationContext还有其他方式向容器添加Bean。</p>\n<p>可以使用AnnotationConfigApplicationContext::register方法来添加配置和Bean：</p>\n<pre><code class="java"><span class="hljs-function"><span class="code-keyword">public</span> <span class="code-keyword">static</span> <span\n        class="code-keyword">void</span> <span class="code-title">main</span><span\n        class="hljs-params">(String[] args)</span> </span>{\n    AnnotationConfigApplicationContext ctx = <span class="code-keyword">new</span> AnnotationConfigApplicationContext();\n    <span class="code-comment">//动态添加配置文件</span>\n    ctx.register(Config1.class, Config2.class);\n    <span class="code-comment">//动态添加Bean</span>\n    ctx.register(Bean1.class);\n    <span class="code-comment">//刷新</span>\n    ctx.refresh();\n}</code></pre>\n<p>\n    注意最后的refresh方法，这个方法来源于ConfigurableApplicationContext接口，然后是在AbstractApplicationContext中实现的。他的过程相当于销毁之前已经创建的资源，然后再重新创建了一个新的容器。这里的代码会执行以下几步：</p>\n<ol>\n    <li><em>new AnnotationConfigApplicationContext()</em>：创建一个新的容器，容器中没有自定义的Bean。</li>\n    <li>AnnotationConfigApplicationContext::register：向容器添加<a\n            href="https://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/beans/factory/config/BeanDefinition.html"\n            rel="nofollow">BeanDefinition</a>，但是这些<a\n            href="https://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/beans/factory/config/BeanDefinition.html"\n            rel="nofollow">BeanDefinition</a>并没有转化为容器中的Bean。\n    </li>\n    <li>ConfigurableApplicationContext::refresh()：纳入新添加的<a\n            href="https://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/beans/factory/config/BeanDefinition.html"\n            rel="nofollow">BeanDefinition</a>重建容器。\n    </li>\n</ol>\n<p>还可以直接使用AnnotationConfigApplicationContext::scan方法扫描指定的路径：</p>\n<pre><code class="java"><span class="hljs-function"><span class="code-keyword">public</span> <span class="code-keyword">static</span> <span\n        class="code-keyword">void</span> <span class="code-title">main</span><span\n        class="hljs-params">(String[] args)</span> </span>{\n    AnnotationConfigApplicationContext ctx = <span class="code-keyword">new</span> AnnotationConfigApplicationContext();\n    ctx.scan(<span class="code-string">"com.acme"</span>);\n    ctx.refresh();\n}</code></pre>\n<p>执行原理和上面介绍的一样。</p>\n<p>\n    按照以上介绍的内容。如果你的工程中需要使用AnnotationConfigApplicationContext::register、AnnotationConfigApplicationContext::scan等方法创建容器和其中Bean的依赖关系，最好是所有的Bean都在register或scan中添加。因为重建一批Bean会花费不少时间，尤其是Bean中还有销毁方法要回收资源时。</p>\n\n<h2 id="h2-2">@Bean注解</h2>\n<p>@Bean注解等价于配置文件中的&lt;bean&gt;标签，对应的参数也是将短横线命名切换为驼峰命名——&lt;bean init-method="..."&gt; =&gt;\n    @Bean(initMethod="...")。@Bean注解只能使用在方法上，方法必须是在@Configuration标记的类或者其他Bean中，两者存在的差异会在后续的文章中介绍。下面通过一个例子来说明Bean的使用。</p>\n<p>（以下例子只用于说明问题，源码<a href="https://gitee.com/chkui-com/spring-core-sample" rel="nofollow">请到 gitee&nbsp;自行 clone</a>，本节的代码在&nbsp;chkui.springcore.example.javabase.beanAnnotation\n    包中）。</p>\n<p>定义两个要添加到容器中的Bean：</p>\n<pre><code class="java"><span class="code-keyword">package</span> chkui.springcore.example.javabase.beanAnnotation.bean;\n\n<span class="hljs-class"><span class="code-keyword">class</span> <span class="code-title">FinalFantasy</span> </span>{\n\t<span class="code-meta">@Override</span>\n\t<span class="hljs-function"><span class="code-keyword">public</span> String <span class="code-title">toString</span><span\n            class="hljs-params">()</span> </span>{\n\t\t<span class="code-keyword">return</span> <span class="code-string">"Final Fantasy 1~15"</span>;\n\t}\n\t<span class="hljs-function"><span class="code-keyword">public</span> <span class="code-keyword">void</span> <span\n            class="code-title">init</span><span class="hljs-params">()</span> </span>{\n\t\tSystem.out.println(<span class="code-string">"Final Fantasy init!"</span>);\n\t}\n\t\n\t<span class="hljs-function"><span class="code-keyword">public</span> <span class="code-keyword">void</span> <span\n            class="code-title">destroy</span><span class="hljs-params">()</span> </span>{\n\t\tSystem.out.println(<span class="code-string">"Final Fantasy destroy!"</span>);\n\t}\n}\n\n<span class="hljs-class"><span class="code-keyword">class</span> <span class="code-title">DragonQuest</span> </span>{\n\t<span class="hljs-function"><span class="code-keyword">public</span> String <span class="code-title">toString</span><span\n            class="hljs-params">()</span> </span>{\n\t\t<span class="code-keyword">return</span> <span class="code-string">"Dragon Quest 1~11"</span>;\n\t}\n\t\n\t<span class="code-meta">@PostConstruct</span>\n\t<span class="hljs-function"><span class="code-keyword">public</span> <span class="code-keyword">void</span> <span\n            class="code-title">init</span><span class="hljs-params">()</span> </span>{\n\t\tSystem.out.println(<span class="code-string">"Dragon Quest init!"</span>);\n\t}\n\t\n\t<span class="code-meta">@PreDestroy</span>\n\t<span class="hljs-function"><span class="code-keyword">public</span> <span class="code-keyword">void</span> <span\n            class="code-title">destroy</span><span class="hljs-params">()</span> </span>{\n\t\tSystem.out.println(<span class="code-string">"Dragon Quest destroy!"</span>);\n\t}\n}\n</code></pre>\n<p>定义一个功能接口及其实现类：</p>\n<pre><code class="java"><span class="code-keyword">package</span> chkui.springcore.example.javabase.beanAnnotation.bean;\n\n<span class="hljs-class"><span class="code-keyword">interface</span> <span class="code-title">Support</span> </span>{\n\t<span class="hljs-function"><span class="code-keyword">void</span> <span\n            class="code-title">setFinalFantasy</span><span class="hljs-params">(FinalFantasy ff)</span></span>;\n\t<span class="hljs-function">FinalFantasy <span class="code-title">getFinalFantasy</span><span\n            class="hljs-params">()</span></span>;\n}\n<span class="hljs-class"><span class="code-keyword">class</span> <span class="code-title">SupportImpl</span> <span\n        class="code-keyword">implements</span> <span class="code-title">Support</span> </span>{\n\t<span class="code-keyword">private</span> FinalFantasy ff; \n\t<span class="hljs-function"><span class="code-keyword">public</span> <span class="code-keyword">void</span> <span\n            class="code-title">setFinalFantasy</span><span class="hljs-params">(FinalFantasy ff)</span> </span>{\n\t\t<span class="code-keyword">this</span>.ff = ff;\n\t}\n\t<span class="hljs-function"><span class="code-keyword">public</span> FinalFantasy <span class="code-title">getFinalFantasy</span><span\n            class="hljs-params">()</span> </span>{\n\t\t<span class="code-keyword">return</span> ff;\n\t}\n}</code></pre>\n<p>然后顶一个@Configuration类：</p>\n<pre><code class="java"><span class="code-keyword">package</span> chkui.springcore.example.javabase.beanAnnotation.bean;\n\n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n            class="code-title">BeanAnnotationConfig</span> </span>{\n\t<span class="code-meta">@Bean</span>\n\t<span class="hljs-function"><span class="code-keyword">public</span> Support <span class="code-title">support</span><span\n            class="hljs-params">(FinalFantasy ff)</span> </span>{\n\t\tSupport support = <span class="code-keyword">new</span> SupportImpl();\n\t\tsupport.setFinalFantasy(ff);\n\t\t<span class="code-keyword">return</span> support;\n\t}\n\t\n\t<span class="code-meta">@Bean</span>(initMethod=<span class="code-string">"init"</span>, destroyMethod=<span\n            class="code-string">"destroy"</span>)\n\t<span class="code-meta">@Description</span>(<span class="code-string">"Final Fantasy"</span>)\n\t<span class="hljs-function"><span class="code-keyword">public</span> FinalFantasy <span class="code-title">finalFantasy</span><span\n            class="hljs-params">()</span> </span>{\n\t\t<span class="code-keyword">return</span> <span class="code-keyword">new</span> FinalFantasy();\n\t}\n\t\n\t<span class="code-meta">@Bean</span>(name= {<span class="code-string">"dragon-quest"</span>, <span\n            class="code-string">"DragonQuest"</span>})\n\t<span class="hljs-function"><span class="code-keyword">public</span> DragonQuest <span class="code-title">dragonQuest</span><span\n            class="hljs-params">()</span> </span>{\n\t\t<span class="code-keyword">return</span> <span class="code-keyword">new</span> DragonQuest();\n\t}\n}</code></pre>\n<p>最后运行他们：</p>\n<pre><code class="java"><span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n        class="code-title">BeanAnnotApp</span> </span>{\n\n\t<span class="hljs-function"><span class="code-keyword">public</span> <span class="code-keyword">static</span> <span\n            class="code-keyword">void</span> <span class="code-title">main</span><span class="hljs-params">(String[] args)</span> </span>{\n\t\tApplicationContext ctx = <span class="code-keyword">new</span> AnnotationConfigApplicationContext(BeanAnnotationConfig.class);\n\t\tSupport support = ctx.getBean(Support.class);\n\t\tSystem.out.println(support.getFinalFantasy());\n\t\tSystem.out.println(ctx.getBean(DragonQuest.class));\n\t}\n\n}</code></pre>\n<p>在配置类BeanAnnotationConfig中，我们配置了3个Bean。这里的写在方法上的@Bean注解和写在配置文件中的&lt;bean&gt;注解一个效果：</p>\n<ul>\n    <li>\n        <strong><em>@Bean</em></strong>中的<strong><em>initMethod</em></strong>和<strong><em>destroyMethod</em></strong>对应<strong><em>&lt;bean&gt;</em></strong>标签中的<strong><em>init-method</em></strong>和<strong><em>destroy-method</em></strong>属性。\n    </li>\n    <li><strong><em>@Bean</em></strong>中的<strong><em>name</em></strong>参数只有一个值时相当于id，有多个的时候相当于设置了多个别名</li>\n    <li><strong><em>Support support(FinalFantasy ff)</em></strong>：我们可以直接在方法中暴露参数来引入其他Bean，这就类似于配置中<strong><em>ref</em></strong>的功能。\n    </li>\n    <li>如果不指定<strong><em>initMethod</em></strong>和<strong><em>destroyMethod</em></strong>，使用JSR-330的生命周期注解（@PostConstruct、@PreDestroy）同样有效\n    </li>\n</ul>\n'}};