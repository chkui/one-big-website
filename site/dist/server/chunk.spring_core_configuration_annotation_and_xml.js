exports.ids=[30],exports.modules={340:function(a,s,n){"use strict";Object.defineProperty(s,"__esModule",{value:!0});s.content='<h2 id="h2-1">@Configuration</h2>\n<p>在介绍Spring核心容器的系列文章中已经多次出现这个注解，从使用的角度来说可以把他理解为XML配置中的&lt;beans&gt;标签，但是两者肯定是不等价的。</p>\n<p>在&lt;beans&gt;标签中除了使用&lt;bean&gt;声名Bean以外，还有各种&lt;context&gt;标签来扩展功能，比如&lt;context:component-scan/&gt;、&lt;context:annotation-config /&gt;以及&lt;import&gt;等，这些扩展的功能并不是@Configuration注解的参数，而是通过另外一个注解来实现——@ComponentScan、@Import。</p>\n<p>@Configuration的基本使用方法已经在<a href="https://www.chkui.com/article/spring/spring_core_java_base_and_bean_annotation" title="纯Java运行与@Bean">纯Java运行与@Bean</a>的“@Bean注解”部分介绍了使用方法，本篇在此基础上进一步进行说明。</p>\n\n<h2 id="h2-2">@Configuration添加依赖</h2>\n<p>除了在<a href="https://www.chkui.com/article/spring/spring_core_java_base_and_bean_annotation" title="纯Java运行与@Bean">纯Java运行与@Bean</a>文中介绍的使用方法，我们还可以直接通过使用Java代码来添加依赖关系：</p>\n<p>(文中的代码仅用于说明问题，源码在<a href="https://gitee.com/chkui-com/spring-core-sample" rel="nofollow">gitee</a>上，如有需要请自行clone，本文的案例代码在chkui.springcore.example.javabase.configuration包中。)</p>\n<pre><code class="java"><span class="code-meta">@Configuration</span>\n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span class="code-title">MyConfig</span> </span>{\n\n    <span class="code-meta">@Bean</span>\n    <span class="hljs-function"><span class="code-keyword">public</span> Alice <span class="code-title">alice</span><span class="hljs-params">()</span> </span>{\n        <span class="code-comment">//直接使用方法注入数据。</span>\n        <span class="code-comment">//从表面上看这里调用bob()并没有经过容器处理。而是直接使用了。</span>\n        <span class="code-keyword">return</span> <span class="code-keyword">new</span> Alice(bob());\n    }\n\n    <span class="code-meta">@Bean</span>\n    <span class="hljs-function"><span class="code-keyword">public</span> Bob <span class="code-title">bob</span><span class="hljs-params">()</span> </span>{\n        <span class="code-keyword">return</span> <span class="code-keyword">new</span> Bob();\n    }\n}</code></pre>\n<p>看到这里，思维敏捷的码友通过以下逻辑肯定就发现问题了：</p>\n<ol>\n\t<li>通过@Bean注解是向容器添加一个<a href="https://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/beans/factory/config/BeanDefinition.html" rel="nofollow">BeanDefinition</a>，</li>\n\t<li>在所有的<a href="https://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/beans/factory/config/BeanDefinition.html" rel="nofollow">BeanDefinition</a>创建之后容器开始创建Bean之前会执行预设的<a href="https://www.chkui.com/article/spring/spring_core_ioc_extension_points" title="IOC功能扩展点">后置处理器BeanFactoryPostProcessor</a>。</li>\n\t<li>最后容器根据<a href="https://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/beans/factory/config/BeanDefinition.html" rel="nofollow">BeanDefinition</a>的内容创建Bean。</li>\n\t<li><span style="color:#ffffff"><em><span style="background-color:#4e5f70">&nbsp;return new Alice(bob());&nbsp;</span></em></span>这段代码中<em>MyConfig::bob</em>方法的调用看起来完全和容器无关，这样就违反了依赖注入的原则！</li>\n\t<li>所以是不是Alice类中被注入的Bob实例根本就不是IoC容器中的Bob？</li>\n</ol>\n<p>首先可以很负责的告诉码友们Spring并没有限制这个方式去添加Bean，所以例子中Alice类中的Bob实例就是IoC容器中的实例。即使是这样去注入Bean同样实现了依赖注入的功能。至于怎么解决的看完本文自然就能得到答案了。</p>\n\n<h2 id="h2-3">@Component添加依赖</h2>\n<p>之前在<a href="https://www.chkui.com/article/spring/spring_core_stereotype_component_and_bean_scan" title="Stereotype组件与Bean扫描">Stereotype组件与Bean扫描</a>这篇文章已经提到过，除了在@Configuration中的方法使用@Bean，还可以在@Component及其派生类中的方法使用@Bean。例如下面的例子：</p>\n<pre><code class="java"><span class="code-keyword">package</span> chkui.springcore.example.javabase.configuration.bean;\n\n<span class="code-meta">@Component</span>\n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span class="code-title">BeanManager</span> </span>{\n\t\n\t<span class="code-meta">@Bean</span>\n\t<span class="hljs-function"><span class="code-keyword">public</span> Cytus <span class="code-title">cytus</span><span class="hljs-params">()</span> </span>{\n\t\t<span class="code-keyword">return</span> <span class="code-keyword">new</span> Cytus();\n\t}\n\t\n\t<span class="code-meta">@Bean</span>\n\t<span class="hljs-function"><span class="code-keyword">public</span> Dva <span class="code-title">dva</span><span class="hljs-params">()</span> </span>{\n\t\t<span class="code-keyword">return</span> <span class="code-keyword">new</span> Dva();\n\t}\n\t\n\t<span class="code-meta">@Bean</span>\n\t<span class="hljs-function"><span class="code-keyword">public</span> Game <span class="code-title">game</span><span class="hljs-params">(Dva dva)</span> </span>{\n\t\t<span class="code-keyword">return</span> <span class="code-keyword">new</span> Game(cytus(), dva);\n\t}\n}</code></pre>\n<p>BeanManager中的三个方法都会向容器添加Bean。注意第三个方法：<em>public Game game(Dva dva)</em>。这里即采用了通过方法参数注入依赖，也像前面的例子一样直接调用了方法。但是这里与前面介绍的使用@Configuration注解不同，Game中的Cytus实例不是IoC容器中的Cytus。</p>\n<p>通过下面的例子来说明@Configuration和@Component中注入Bean的差异。（代码仅用于展示，有兴趣运行的可以下载<a href="https://gitee.com/chkui-com/spring-core-sample" rel="nofollow">gitee上的源码</a>，代码在<em>chkui.springcore.example.javabase.configuration</em> 包中）。</p>\n<pre><code class="java"><span class="code-comment">//package chkui.springcore.example.javabase.configuration;</span>\n<span class="code-comment">//使用@Configuration注解</span>\n<span class="code-meta">@Configuration</span>\n<span class="hljs-class"><span class="code-keyword">class</span> <span class="code-title">Config</span> </span>{\n\t\n\t<span class="code-meta">@Bean</span>\n\t<span class="hljs-function"><span class="code-keyword">public</span> Alice <span class="code-title">alice</span><span class="hljs-params">()</span> </span>{\n\t\t<span class="code-keyword">return</span> <span class="code-keyword">new</span> Alice(bob());\n\t}\n\t\n\t<span class="code-meta">@Bean</span>\n\t<span class="hljs-function"><span class="code-keyword">public</span> Bob <span class="code-title">bob</span><span class="hljs-params">()</span> </span>{\n\t\t<span class="code-keyword">return</span> <span class="code-keyword">new</span> Bob();\n\t}\n}\n<span class="code-comment">//package chkui.springcore.example.javabase.configuration.bean;</span>\n<span class="code-comment">//使用@Component注解</span>\n<span class="code-meta">@Component</span>\n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span class="code-title">BeanManager</span> </span>{\n\t\n\t<span class="code-meta">@Bean</span>\n\t<span class="hljs-function"><span class="code-keyword">public</span> Cytus <span class="code-title">cytus</span><span class="hljs-params">()</span> </span>{\n\t\t<span class="code-keyword">return</span> <span class="code-keyword">new</span> Cytus();\n\t}\n\t\n\t<span class="code-meta">@Bean</span>\n\t<span class="hljs-function"><span class="code-keyword">public</span> Dva <span class="code-title">dva</span><span class="hljs-params">()</span> </span>{\n\t\t<span class="code-keyword">return</span> <span class="code-keyword">new</span> Dva();\n\t}\n\t\n\t<span class="code-meta">@Bean</span>\n\t<span class="hljs-function"><span class="code-keyword">public</span> Game <span class="code-title">game</span><span class="hljs-params">(Dva dva)</span> </span>{\n\t\t<span class="code-keyword">return</span> <span class="code-keyword">new</span> Game(cytus(), dva);\n\t}\n}\n<span class="code-comment">//运行</span>\n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span class="code-title">ConfigurationApp</span> </span>{\n\t<span class="hljs-function"><span class="code-keyword">public</span> <span class="code-keyword">static</span> <span class="code-keyword">void</span> <span class="code-title">main</span><span class="hljs-params">(String[] args)</span> </span>{\n\t\tApplicationContext ctx = <span class="code-keyword">new</span> AnnotationConfigApplicationContext(Config.class， BeanManager.class);\n\t\tBob bob = ctx.getBean(Bob.class);\n\t\tAlice alice = ctx.getBean(Alice.class);\n\t\tSystem.out.println(<span class="code-string">"Bob instance of IoC hash: "</span> + bob.hashCode());\n\t\tSystem.out.println(<span class="code-string">"Bob instance of Alice hash: "</span> + alice.getBob().hashCode());\n\t\tSystem.out.println(<span class="code-string">"Compare："</span> + (bob == alice.getBob()));\n\t\tSystem.out.println(<span class="code-string">"Config instance："</span> + ctx.getBean(Config.class));\n\n\t\tGame game = ctx.getBean(Game.class);\n\t\tCytus cytus = ctx.getBean(Cytus.class);\n\t\tDva dva = ctx.getBean(Dva.class);\n\t\tSystem.out.println(<span class="code-string">"IoC Cytus: "</span> + cytus.hashCode());\n\t\tSystem.out.println(<span class="code-string">"Game Cytus: "</span> + game.getCytus().hashCode());\n\t\tSystem.out.println(<span class="code-string">"IoC Dva: "</span> + dva.hashCode());\n\t\tSystem.out.println(<span class="code-string">"Game Dva: "</span> + game.getDva().hashCode());\n\t\tSystem.out.println(<span class="code-string">"Cytus："</span> + (cytus == game.getCytus()));\n\t\tSystem.out.println(<span class="code-string">"Dva："</span> + (dva == game.getDva()));\n\t\tSystem.out.println(<span class="code-string">"BeanManager Instance："</span> + ctx.getBean(BeanManager.class));\n\t}\n}</code></pre>\n<p>在最后的main方法中我们对容器中以及Alice、Game中包含的实例进行了hash以及实例对比，在我的电脑上输出结果如下：</p>\n<pre><code class="bash">1.Bob instance of IoC <span class="code-built_in">hash</span>: 1242027525\n2.Bob instance of Alice <span class="code-built_in">hash</span>: 1242027525\n3.Compare：<span class="hljs-literal">true</span>\n4.Config instance：5.chkui.springcore.example.javabase.configuration.Config$<span class="code-variable">$EnhancerBySpringCGLIB</span>$<span class="code-variable">$acdbeb32</span>@74287ea3\n6.IoC Cytus: 2104973502\n7.Game Cytus: 735937428\n8.IoC Dva: 1604247316\n9.Game Dva: 1604247316\n10.Cytus：<span class="hljs-literal">false</span>\n11.Dva：<span class="hljs-literal">true</span>\n12.BeanManager Instance：chkui.springcore.example.javabase.configuration.bean.BeanManager@68746f22</code></pre>\n<p>例子中分别在@Configuration和@Component标记的类中使用@Bean来向容器添加Bean。最后通过输出实例的hash以及地址匹配（使用“==”比对）来确定是否都是同一个单例。</p>\n<p>很明显IoC容器中的Cytus以Game中的Cytus并不是一个实例，其他都是同一个单例。仔细看看第4行和第12行的<strong><em>Config instance</em></strong>和<strong><em>BeanManager instance</em></strong>的输出内容就会得到答案。</p>\n<p>BeanManager是一个常规的类，而在JVM中运行的Config是一个通过CGLIB实现的字节码级别的代理类（<em>如果不知道CGLIB是什么就自己网上找找吧，这玩意在Java界已经红得发紫了</em>）。Spring实际上是使用CGLIB为Config类添加了一个“代理壳”，当我们在任何地方直接调用@Configuration标注的类中的的方法时，代理壳都会将其整理为一个<a href="https://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/beans/factory/config/BeanDefinition.html" rel="nofollow">BeanDefinition</a>的转换过程。</p>\n<p>知道两者的差异后我们选择何种方式来添加Bean就很清晰了：</p>\n<p>使用@Configuration能保证不会出现例子中Cytus这样的例外。也能清晰的明确@Configuration等价于一个&lt;beans&gt;统一管理。</p>\n<p>而在@Component或其他组建中使用@Bean好处是不会启动CGLIB这种重量级工具（不过在Spring中即使这里不使用，其他很多地方也在使用）。并且@Component及其相关的Stereotype组件自身就有摸框级别的功能，在这里使用@Bean注解能很好的表明一个Bean的从属和结构关系，但是需要注意直接调用方法的“副作用”。</p>\n<p>个人建议如果没什么特别的要求就使用@Configuration，引入CGLIB并不会影响多少性能，然而坑会少很多。在spring官网将用@Configuration创建的@Bean称呼为"Full"模式、将@Component创建的@Bean称呼为"\'lite"模式，从字面上也能略知他们的差异。</p>\n\n<h2 id="h2-4">多种方式混合使用</h2>\n<p>从XML配置到纯Java配置，Spring变得越来越简便好用，对应的功能也越来越多样化。如果对他的脉络没有清晰的认识，往往会陷入迷惑中。无论功能再复杂我们都要记住本系列文章开篇提到的IoC容器的初衷：</p>\n<p><strong><em>处理容器与Bean、Bean与Bean的关系。Bean是最小的工作单元，一切功能都是在Bean基础上扩展而来的。</em></strong></p>\n<p>所以无论是XML配置还是纯Java配置基本目标就是解决三个问题：向容器添加Bean，确定Bean的功能，确定Bean与Bean之间的依赖关系。</p>\n<p>既然XML和纯Java配置都是解决同样的问题，那么混合使用当然没问题。比如在XML中配置了&lt;context:component-scan/&gt;，那么指定路径下的@Component以及派生注解（@Service、@Comfiguration等）都会被扫描并添加到容器中成为一个Bean。然后IoC容器会根据注解的类型来确定这个Bean是什么功能。、</p>\n<p>下面是一个使用AnnotationConfigApplicationContext启动容器混合使用Java配置与XML配置的例子（源码在本人<a href="https://gitee.com/chkui-com/spring-core-sample" rel="nofollow">gitee的spring-core-sample</a>仓库中，本节的代码在包<em>chkui.springcore.example.javabase.multiconfiguration</em>中）。</p>\n<p>首先我们使用AnnotationConfigApplicationContext启动IoC容器：</p>\n<pre><code class="java"><span class="code-keyword">package</span> chkui.springcore.example.javabase.multiconfiguration;\n\n<span class="code-meta">@Configuration</span>\n<span class="code-meta">@ComponentScans</span>({ <span class="code-meta">@ComponentScan</span>(<span class="code-string">"chkui.springcore.example.javabase.multiconfiguration.config"</span>),\n\t\t<span class="code-meta">@ComponentScan</span>(<span class="code-string">"chkui.springcore.example.javabase.multiconfiguration.service"</span>) })\n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span class="code-title">MultiConfigurationApp</span> </span>{\n\t<span class="hljs-function"><span class="code-keyword">public</span> <span class="code-keyword">static</span> <span class="code-keyword">void</span> <span class="code-title">main</span><span class="hljs-params">(String[] args)</span> </span>{\n\t\tApplicationContext ctx = <span class="code-keyword">new</span> AnnotationConfigApplicationContext(MultiConfigurationApp.class);\n\t}\n}</code></pre>\n<p>在Main方法中直接指定了当前的类，所以MultiConfigurationApp类会成为一个Bean。由于是一个Stereotype模式的@Configuration标记类（@Configuration继承自@Component，提供了配置相关的分层功能，关于Stereotype模式的内容相见<a href="https://www.chkui.com/article/spring/spring_core_stereotype_component_and_bean_scan" rel="nofollow">Stereotype组件与Bean扫描</a>），所以容器会用CGLIB来代理它实现配置相关的功能。@ComponentScans是一个辅助注解，他的作用就是整合多个@ComponentScan一起使用。</p>\n<p>在config包中有2个@Configuration类：</p>\n<pre><code class="java"><span class="code-keyword">package</span> chkui.springcore.example.javabase.multiconfiguration.config;\n\n<span class="code-meta">@Configuration</span>\n<span class="code-meta">@Import</span>({ClubConfiguration.class})\n<span class="code-meta">@ImportResource</span>(<span class="code-string">"javabase/multiconfiguration/config.xml"</span>)\n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span class="code-title">MainConfiguration</span> </span>{}</code></pre>\n<pre><code class="java"><span class="code-keyword">package</span> chkui.springcore.example.javabase.multiconfiguration.config;\n\n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span class="code-title">ClubConfiguration</span> </span>{\n\t<span class="code-meta">@Bean</span>\n\t<span class="hljs-function"><span class="code-keyword">public</span> Mil <span class="code-title">mil</span><span class="hljs-params">()</span> </span>{<span class="code-keyword">return</span> <span class="code-keyword">new</span> Mil();}\n\t<span class="code-meta">@Bean</span>\n\t<span class="hljs-function"><span class="code-keyword">public</span> Mau <span class="code-title">mau</span><span class="hljs-params">()</span> </span>{<span class="code-keyword">return</span> <span class="code-keyword">new</span> Mau();}\n}</code></pre>\n<p>MainConfiguration类被标记了@Configuration注解，所以他会被扫描并添加到容器中。</p>\n<p>@Import注解的作用是引入其他类成为一个Bean，我们可以看到ClubConfiguration类并没有任何注解，但是他通过@Import注解在其他类添加到容器中。</p>\n<p>而@ImportResource等价于XML配置中的&lt;import&gt;标签，作用就是引入一个XML配置文件。对应的XML文件如下：</p>\n<pre><code class="xml"><span class="code-tag">&lt;<span class="code-name">beans</span> <span class="hljs-attr">...</span>&gt;</span>\n    <span class="code-tag">&lt;<span class="code-name">bean</span> <span class="hljs-attr">class</span>=<span class="code-string">"chkui.springcore.example.javabase.multiconfiguration.bean.Cfc"</span> /&gt;</span>\n    <span class="code-tag">&lt;<span class="code-name">bean</span> <span class="hljs-attr">class</span>=<span class="code-string">"chkui.springcore.example.javabase.multiconfiguration.bean.Jav"</span> /&gt;</span>\n<span class="code-tag">&lt;/<span class="code-name">beans</span>&gt;</span></code></pre>\n<p>这样XML配置中的2个类也会被添加到容器中。案例中对应的实体类如下：</p>\n<pre><code class="java"><span class="code-keyword">package</span> chkui.springcore.example.javabase.multiconfiguration.bean;\n<span class="hljs-class"><span class="code-keyword">class</span> <span class="code-title">Mau</span> </span>{\n\t<span class="hljs-function"><span class="code-keyword">public</span> String <span class="code-title">toString</span><span class="hljs-params">()</span> </span>{\n\t\t<span class="code-keyword">return</span> <span class="code-string">"Manchester United[MAU]"</span>;\n\t}\n}\n<span class="hljs-class"><span class="code-keyword">class</span> <span class="code-title">Cfc</span> </span>{\n\t<span class="hljs-function"><span class="code-keyword">public</span> String <span class="code-title">toString</span><span class="hljs-params">()</span> </span>{\n\t\t<span class="code-keyword">return</span> <span class="code-string">"Chelsea Football Club[CFC]"</span>;\n\t}\n}\n<span class="hljs-class"><span class="code-keyword">class</span> <span class="code-title">Mil</span> </span>{\n\t<span class="hljs-function"><span class="code-keyword">public</span> String <span class="code-title">toString</span><span class="hljs-params">()</span> </span>{\n\t\t<span class="code-keyword">return</span> <span class="code-string">"A.C Milan [MIL]"</span>;\n\t}\n}\n<span class="hljs-class"><span class="code-keyword">class</span> <span class="code-title">Jav</span> </span>{\n\t<span class="hljs-function"><span class="code-keyword">public</span> String <span class="code-title">toString</span><span class="hljs-params">()</span> </span>{\n\t\t<span class="code-keyword">return</span> <span class="code-string">"Juventus [JAV]"</span>;\n\t}\n}</code></pre>\n\n<h2 id="h2-5">Conditionally</h2>\n<p>最后在使用@Configuration时可以使用Conditionally特性来确定是否添加Bean。大致用法就是实现Condition接口，然后通过@Conditional注解和@Bean绑定在一起进行条件判断。</p>\n<p>实现Condition：</p>\n<pre><code class="java"><span class="code-keyword">package</span> chkui.springcore.example.javabase.multiconfiguration.config;\n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span class="code-title">SoySauceCondition</span> <span class="code-keyword">implements</span> <span class="code-title">Condition</span> </span>{\n\t<span class="code-meta">@Override</span>\n\t<span class="hljs-function"><span class="code-keyword">public</span> <span class="code-keyword">boolean</span> <span class="code-title">matches</span><span class="hljs-params">(ConditionContext context, AnnotatedTypeMetadata metadata)</span> </span>{\n\t\t<span class="code-keyword">return</span> <span class="code-keyword">false</span>; <span class="code-comment">//返回false则不会对应的Bean。</span>\n\t}\n}</code></pre>\n<p>然后使用@Conditional注解绑定到一个@Bean上：</p>\n<pre><code class="java"><span class="code-keyword">package</span> chkui.springcore.example.javabase.multiconfiguration.config;\n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span class="code-title">ClubConfiguration</span> </span>{\n\t<span class="code-meta">@Bean</span>\n\t<span class="code-meta">@Conditional</span>(SoySauceCondition.class)\n\t<span class="hljs-function"><span class="code-keyword">public</span> SoySauce <span class="code-title">soySauce</span><span class="hljs-params">()</span> </span>{\n\t\t<span class="code-keyword">return</span> <span class="code-keyword">new</span> SoySauce();\n\t}\n}</code></pre>\n<p>这样，如果SoySauceCondition中的matches方法返回ture则添加SoySauce到IoC容器中，否则不会存在这个Bean。</p>'}};