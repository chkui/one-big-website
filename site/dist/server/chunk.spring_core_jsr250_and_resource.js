exports.ids=[35],exports.modules={335:function(n,s,a){"use strict";Object.defineProperty(s,"__esModule",{value:!0});s.content='<h2 id="h2-1">JSR-175与元编程</h2>\n<p>要说明JSR-250先要解释清楚JSR-175，要解释清楚JSR就的先了解JCP是什么。网上资料很多，就不细说了，简单的说JCP（Java Community\n    Process）是管理Java生态（包括J2SE、J2EE等等）发展的合作组织。JSR（Java Specification\n    Request）就是组织内的成员针对Java的发展提出的一些需求，通过审核之后即会融入到新版本的Java功能中成为Java的一项特性或功能，不同的发行版本和虚拟机都会遵守这些约定。</p>\n<p>JSR-175的全文标题是<strong><span style="color:null">&nbsp;A Metadata Facility for the Java&nbsp;Programming Language （为Java语言提供元数据设施）</span></strong>。它明确提出了在Java平台引入“元编程”（Meta\n    Programming）的思想，要求提供对“元数据”（Meta Data）的支持。这就是我们现在大量使用的“@”注解（Annotation）功能的最早来源。JSR-175之后的JSR-181（Web服务支持）、JSR-250、<a\n            href="https://www.chkui.com/article/java/java_jsr330" title="JSR-330">JSR-330</a>都是基于“元数据”功能提出的一些更细节的实现。</p>\n<p>至于“元编程”、“元数据”是什么这里就不详细展开说明了，它的理论很早就提出了，据说最早是在Lisp这一类函数式编程语言上开始使用的。网上有很多相关的资料，简单的说它就是“对源码进行编码”，比如下面这样：</p>\n<pre><code class="java"><span class="hljs-class"><span class="code-keyword">class</span> <span class="code-title">MyClass</span> </span>{\n\t<span class="code-meta">@Autowired</span>\n\t<span class="code-keyword">private</span> Interface support;\n}</code></pre>\n<p>通过@Autowired这个注解来对support这个域进行编码就可以很轻松的扩展原先类的功能。</p>\n\n<h2 id="h2-2">JSR-250的Spring实现</h2>\n<p>JSR-250主要是围绕着“资源”的使用预定义了一些注解（Annotation）,这里的“资源”可以理解为一个Class类的实例、一个JavaBean、或者一个Spring中的Bean。</p>\n<p>JSR-250相关的注解全部在 <em>javax.annotation</em> 和 <em>javax.annotation.security </em>包中，分成2个部分——资源定义和权限控制。它并没有提供具体的实现方式，仅仅是提供了指导性的文档和几个注解，由具体的框架去实现。\n</p>\n<p><em>javax.annotation</em> 中包含一下几个注解：</p>\n<ul>\n    <li>@Generated：生成资源的注解，通过该项标记产生的实例是一个资源。类似于Spring中的@Bean注解，用于生成一向资源。</li>\n    <li>@PostConstruct&nbsp;创造资源之后的回调处理，Spring已经实现了这个注解，见<a\n            href="https://www.chkui.com/article/spring/spring_core_bean_lifecycle_callback"\n            title="Bean的定义与控制">Bean的定义与控制</a> 一文的介绍。\n    </li>\n    <li>@PreDestroy&nbsp;销毁资源之前的回调处理，Spring同样实现了这个注解，见<a\n            href="https://www.chkui.com/article/spring/spring_core_bean_lifecycle_callback"\n            title="Bean的定义与控制">Bean的定义与控制</a>。\n    </li>\n    <li>@Resource&nbsp;标记使用资源的位置，Spring同样实现了这个注解的功能（后文会详细介绍）。功能上有些类似于@Autowired、@Inject，但是两者有不少的差别。</li>\n    <li>@Resources&nbsp;标记使用多项资源的位置，类似于使用@Autowired向一个列表装载数据。</li>\n</ul>\n<p>仔细看JSR-250定义的这些注解就会发现，他们都是关于“资源”的构建、销毁、使用的。Spring实现了@PostConstruct、@PreDestroy和@Resource。</p>\n<p>javax.annotation.security&nbsp;包中有以下内容：</p>\n<ul>\n    <li>@DeclareRoles&nbsp;声明角色</li>\n    <li>@DenyAll&nbsp; 拒绝所有角色</li>\n    <li>@PermitAll&nbsp; 授权所有惧色</li>\n    <li>@RolesAllowed&nbsp; 角色授权</li>\n    <li>@RunAs 运行模式</li>\n</ul>\n<p>security中的内容是在资源创建之后对<strong><em>资源的使用进行管理</em></strong>。和常规的权限控制模型一样——定义角色（@DeclareRoles&nbsp;）、确定角色对资源的控制权限（@DenyAll、@PermitAll\n    、@RolesAllowed&nbsp;）。Spring并没有实现这里的任何一个注解，在这里就不深入介绍了。这一块内容在J2EE的构建中有不少的应用。</p>\n\n<h2 id="h2-3">Spring中的@Resource</h2>\n<p>\n    在没有仔细看Spring的官方文档和JSR-250之前，我一直以为@Resource这个注解和@Autowired是2个不同的功能，更早的时候还以为是管理什么Properties资源的，很多网上的内容也写得比较模糊。虽然@Resource的实现是在\n    <em>CommonAnnotationBeanPostProcessor</em>&nbsp;而@Autowired 是在\n    AutowiredAnnotationBeanPostProcessor，但是实际上两者的功能是重叠的，或者说@Resource的提供的功能是@Autowired的子集。</p>\n<p>在Spring中使用@Resource注解时，把Bean理解为一项资源就很好理解了。下面通过一些简单的例子来介绍@Resource的使用。</p>\n<p>@Resource的功能是告诉IoC容器标记的位置需要什么样的“资源”，如下：</p>\n<pre><code class="java"><span class="hljs-class"><span class="code-keyword">class</span> <span\n        class="code-title">Abc</span> </span>{}\n<span class="hljs-class"><span class="code-keyword">class</span> <span class="code-title">Xyz</span> </span>{}\n<span class="hljs-class"><span class="code-keyword">class</span> <span class="code-title">Implement</span> </span>{\n\t<span class="code-meta">@Resource</span>\n\t<span class="code-keyword">private</span> Abc abc;\n\t\n\t<span class="code-keyword">private</span> Xyz xyz;\n\n    <span class="code-meta">@Resource</span>\n    <span class="code-keyword">private</span> ApplicationContext context;\n\n\t<span class="code-meta">@Resource</span>(name=<span class="code-string">"b_instance"</span>)\n\t<span class="hljs-function"><span class="code-keyword">public</span> <span class="code-keyword">void</span> <span\n            class="code-title">setInject</span><span class="hljs-params">(Xyz xyz)</span> </span>{\n\t\t<span class="code-keyword">this</span>.xyz = xyz;\n\t}\n}</code></pre>\n<pre><code class="xml"><span class="code-tag">&lt;<span class="code-name">beans</span>&gt;</span>\n    <span class="code-tag">&lt;<span class="code-name">context:annotation-config</span>/&gt;</span>\n    <span class="code-tag">&lt;<span class="code-name">bean</span> <span class="hljs-attr">id</span>=<span\n            class="code-string">"abc"</span> <span class="hljs-attr">class</span>=<span\n            class="code-string">"x.y.Abc"</span> /&gt;</span>\n    <span class="code-tag">&lt;<span class="code-name">bean</span> <span class="hljs-attr">id</span>=<span\n            class="code-string">"xyz_instance"</span> <span class="hljs-attr">name</span>=<span class="code-string">"inject"</span> <span\n            class="hljs-attr">class</span>=<span class="code-string">"x.y.Xyz"</span> /&gt;</span>\n    <span class="code-tag">&lt;<span class="code-name">bean</span> <span class="hljs-attr">class</span>=<span\n            class="code-string">"x.y.Implement"</span> /&gt;</span>\n<span class="code-tag">&lt;/<span class="code-name">beans</span>&gt;</span></code></pre>\n<p>\n    运行后，IoC会向标记了@Resource的位置注入Bean——是不是感觉和@Autowired一模一样？但是需要注意的是虽然两者最后都是注入一个Bean，但是@Resource和@Autowired的处理过程是不一样的。@Autowired如果没有提供任何参数，那么他优先按照类型注入，如果要对细节进行控制可以配合Primary和Qualifiers功能，详见<a\n        href="https://www.chkui.com/article/spring/spring_core_auto_inject_of_annotation" title="注解自动装载">注解自动装载</a>的介绍。@Resource是按照命名来注入资源的，以上面的代码为例子：\n</p>\n<ol>\n    <li>例如在setter方法上定义了name="xyz_instance"参数，那么会去IoC容器中寻找id、name等于"xyz_instance"的Bean来注入。</li>\n    <li>例如在abc这个域（成员变量）上没有定义name参数，那么会使用域的名称（这里是"abc"）去IoC中按id、name寻找Bean来注入。</li>\n    <li>如果@Resource定义在方法上，并且没有指定name参数，那么他会使用setter的名称（例子中方法名为setInject，名称就是"inject"）来寻找并注入数据。</li>\n    <li>最后，如果名称匹配不上，容器会根据标记位置的类型来注入数据，例如例如中的ApplicationContext。</li>\n</ol>\n<p>所以@Resource的装载资源过程是：1)匹配name参数；2)没有name参数时会根据setter或域的名称来匹配Bean的名称；3)还是匹配不上就根据标记位置的类型来注入数据。</p>\n<p>与@Autowired相比主要有以下几点区别：</p>\n<ol>\n    <li>控制粒度没有@Autowired细，某些参数Spring并没有实现功能。但是使用他更符合整个Java生态的规范。</li>\n    <li>如果是使用类型依赖注入数据，应优先使用@Autowired，效率会好一些。</li>\n    <li>@Resource通过名称注入与@Autowired相比省去了@Qualifiers等内容。</li>\n    <li>@Resource只能用在域和Setter方法上。</li>\n</ol>\n<p>总的来说如果是按照类型注入依赖对象，那么最终得到的结果并没有任何差异，只是执行过程上有差别。如果按Bean的名称使用，@Resource比@Autowired便捷一些，但是功能少很多。</p>\n<p>个人建议如果开发的是一个面向终端用户的应用，比如Web应用、网站什么的，直接用@Autowired就好了。如果制作的是一个给别的开发人员使用的工具，可以考虑@Resourec，他能得到更多框架的支持。</p>\n\n<h2 id="h2-4">@PostConstruct 与@PreDestroy</h2>\n<p>@PostConstruct 与@PreDestroy也是JSR-250中定义的注解，Spring都实现了他们的功能，使用方法可以查看<a\n        href="https://www.chkui.com/article/spring/spring_core_bean_lifecycle_callback" title="Bean的定义与控制">Bean的定义与控制</a>&nbsp;相关的说明和介绍。\n</p>'}};