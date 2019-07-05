exports.ids=[18],exports.modules={373:function(n,s,a){"use strict";Object.defineProperty(s,"__esModule",{value:!0});s.content='<p>实际上Ioc容器中的大量功能都是通过后置处理器实现的，这里介绍几个主要的处理器。</p>\n<h3 id="h3-1">RequiredAnnotationBeanPostProcessor</h3>\n<p>\n    官方的一些功能就是用后置处理器的方式实现的，例如RequiredAnnotationBeanPostProcessor，它用于处理@Required注解。当我们一个Setter方法加入@Required后，表示必须设置参数，如果未设置则抛出BeanInitializationException异常。</p>\n<p><strong>使用方法1</strong>，直接添加一个Bean：</p>\n<pre><code class="xml"><span class="code-tag">&lt;<span class="code-name">bean</span> <span\n        class="hljs-attr">class</span>=<span class="code-string">"org.springframework.beans.factory.annotation.RequiredAnnotationBeanPostProcessor"</span> /&gt;</span>\n<span class="code-comment">&lt;!-- 其他bean --&gt;</span></code></pre>\n<p>这相当于直接添加一个后置处理器，他会检查所有的被@Required标注的Setter方法。</p>\n<p><strong>使用方法2</strong>，设置context：</p>\n<pre><code class="xml"><span class="code-comment">&lt;!-- 如果使用了以下2个context级别的标签，则会启用RequiredAnnotationBeanPostProcessor的功能 --&gt;</span>\n<span class="code-tag">&lt;<span class="code-name">context:annotation-config</span> /&gt;</span>\n<span class="code-tag">&lt;<span class="code-name">context:component-scan</span> /&gt;</span></code></pre>\n<p><strong>使用技巧1</strong>，修改扫描的注解。处理器默认会识别@Required注解，但是可以通过RequiredAnnotationBeanPostProcessor::setRequiredAnnotationType修改生效的注解，例如：\n</p>\n<pre><code class="xml"><span class="code-tag">&lt;<span class="code-name">bean</span> <span\n        class="hljs-attr">class</span>=<span class="code-string">"org.springframework.beans.factory.annotation.RequiredAnnotationBeanPostProcessor"</span>&gt;</span>\n   <span class="code-tag">&lt;<span class="code-name">property</span> <span class="hljs-attr">name</span>=<span\n           class="code-string">"requiredAnnotationType"</span> <span class="hljs-attr">value</span>=<span\n           class="code-string">"x.y.Require"</span> /&gt;</span>\n<span class="code-tag">&lt;/<span class="code-name">bean</span>&gt;</span></code></pre>\n<pre><code class="java"><span class="code-keyword">package</span> x.y;\n\n<span class="code-meta">@Target</span>(ElementType.METHOD)\n<span class="code-meta">@Retention</span>(RetentionPolicy.RUNTIME)\n<span class="code-keyword">public</span> <span class="code-meta">@interface</span> Require {}</code></pre>\n<p>使用技巧2，告知RequiredAnnotationBeanPostProcessor不处理某些Bean方法：</p>\n<pre><code class="xml"><span class="code-tag">&lt;<span class="code-name">bean</span> <span\n        class="hljs-attr">class</span>=<span class="code-string">"x.y.A"</span>&gt;</span>\n    <span class="code-tag">&lt;<span class="code-name">meta</span>  <span class="hljs-attr">key</span>=<span\n            class="code-string">"org.springframework.beans.factory.annotation.RequiredAnnotationBeanPostProcessor.skipRequiredCheck"</span> <span\n            class="hljs-attr">value</span>=<span class="code-string">"true"</span> /&gt;</span>\n<span class="code-tag">&lt;/<span class="code-name">bean</span>&gt;</span></code></pre>\n\n<h3 id="h3-2">AutowiredAnnotationBeanPostProcessor</h3>\n<p>这个后置处理器在3.x之后使用Spring框架的系统几乎都会使用，就是他在处理大名鼎鼎的@Autowired和@Value注解。此外他也支持JSR-330中的@Inject注解。当我们使用&lt;context:annotation-config\n    /&gt;<br> 或&lt;context:component-scan /&gt;时，IoC容器也会启用这个功能。</p>\n<p>\n    可以通过setAutowiredAnnotationType、setAutowiredAnnotationTypes方法设定对应的注解，可以通过setRequiredParameterName来设置@Autowired中的属性方法：</p>\n<pre><code class="xml"><span class="code-tag">&lt;<span class="code-name">bean</span> <span\n        class="hljs-attr">class</span>=<span class="code-string">"org.springframework.beans.factory.annotation.AutowiredAnnotationBeanPostProcessor"</span>&gt;</span>\n   <span class="code-tag">&lt;<span class="code-name">property</span> <span class="hljs-attr">name</span>=<span\n           class="code-string">"autowiredAnnotationType"</span> <span class="hljs-attr">value</span>=<span\n           class="code-string">"x.y.MyInjectAnnotation"</span> /&gt;</span>\n<span class="code-tag">&lt;/<span class="code-name">bean</span>&gt;</span></code></pre>\n\n<h3 id="h3-3">CommonAnnotationBeanPostProcessor</h3>\n<p>\n    这个处理器继承InitDestroyAnnotationBeanPostProcessor实现JSR-250的@PostConstruct和@PreDestroy的处理，此外还支持@Resource注解。JSR-250和Resouce貌似没有什么太直接的关系，所以被命名为Common表示这是一个大杂烩一般的存在。同样使用annotation-config和component-scan会被自动启用（因为都是用于处理注解的）。</p>\n<p>同样也有initAnnotationType、destroyAnnotationType等Setter方法来设置自定义注解。</p>\n\n<h3 id="h3-4">InitDestroyAnnotationBeanPostProcessor</h3>\n<p>处理Bean的生命周期方法以及资源数据注入，CommonAnnotationBeanPostProcessor继承自它。</p>'}};