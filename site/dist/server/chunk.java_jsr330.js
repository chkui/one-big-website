exports.ids=[57],exports.modules={291:function(s,a,n){"use strict";Object.defineProperty(a,"__esModule",{value:!0});a.content='<p>JSR330是Jcp给出的官方标准反向依赖注入规范。Java大部分反向依赖注入的工具或者框架目前基本上都满足JSR330规范、例如spring、guice以及Dagger。</p>\n<p>以我们最常用的spring为例。</p>\n<p>JSR中<span style="color:#cc0000">@Inject</span>可以当做<span style="color:#cc0000">@AutoWired</span>来使用。而<span\n        style="color:#cc0000">@Named</span>可以当做<span style="color:#cc0000">@Component</span>来使用。</p>\n<p>使用JSR330首先要引入javax.inject包：</p>\n<pre><code class="xml"><span class="code-tag">&lt;<span class="code-name">dependency</span>&gt;</span>  \n    <span class="code-tag">&lt;<span class="code-name">groupId</span>&gt;</span>javax.inject<span class="code-tag">&lt;/<span\n            class="code-name">groupId</span>&gt;</span>\n    <span class="code-tag">&lt;<span class="code-name">artifactId</span>&gt;</span>javax.inject<span class="code-tag">&lt;/<span\n            class="code-name">artifactId</span>&gt;</span>\n    <span class="code-tag">&lt;<span class="code-name">version</span>&gt;</span>1<span class="code-tag">&lt;/<span\n            class="code-name">version</span>&gt;</span>\n<span class="code-tag">&lt;/<span class="code-name">dependency</span>&gt;</span> </code></pre>\n<p>目前Maven中央仓库中就一个inject的jar。</p>\n<p>首先使用xml配置通过注解扫描添加bean。</p>\n<pre><code class="xml"><span class="php"><span class="code-meta">&lt;?</span>xml version=<span\n        class="code-string">"1.0"</span> encoding=<span class="code-string">"UTF-8"</span><span\n        class="code-meta">?&gt;</span></span>\n<span class="code-tag">&lt;<span class="code-name">beans</span> <span class="hljs-attr">xmlns</span>=<span\n        class="code-string">"http://www.springframework.org/schema/beans"</span>\n    <span class="hljs-attr">xmlns:xsi</span>=<span\n            class="code-string">"http://www.w3.org/2001/XMLSchema-instance"</span>\n    <span class="hljs-attr">xmlns:context</span>=<span class="code-string">"http://www.springframework.org/schema/context"</span>  \n    <span class="hljs-attr">xsi:schemaLocation</span>=<span class="code-string">"http://www.springframework.org/schema/beans  \n    http://www.springframework.org/schema/beans/spring-beans-3.1.xsd  \n    http://www.springframework.org/schema/context  \n    http://www.springframework.org/schema/context/spring-context-3.1.xsd"</span>&gt;</span>  \n    <span class="code-tag">&lt;<span class="code-name">context:component-scan</span>  <span class="hljs-attr">base-package</span>=<span\n            class="code-string">"com.demo.jsr330"</span>/&gt;</span>\n<span class="code-tag">&lt;/<span class="code-name">beans</span>&gt;</span>  </code></pre>\n<p>然后像下面这个添加一个bean</p>\n<pre><code class="java"><span class="code-meta">@Named</span>  \n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n            class="code-title">service</span> </span>{\n  <span class="hljs-function"><span class="code-keyword">public</span>  <span class="code-keyword">void</span>   <span\n          class="code-title">print</span><span class="hljs-params">()</span></span>{\n     System.out.println(<span class="code-string">"Service  print  method is invoked"</span>);  \n  }  \n}  </code></pre>\n<p>然后将这个bean注入到其他bean中去使用</p>\n<pre><code class="java"><span class="code-meta">@Named</span>  \n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n            class="code-title">Faction</span> </span>{\n  <span class="code-meta">@Inject</span>\n  Service service;\n\n  <span class="hljs-function"><span class="code-keyword">public</span>  <span class="code-keyword">void</span>  <span\n          class="code-title">show</span><span class="hljs-params">()</span></span>{\n     service.print()； \n  }  \n}  </code></pre>\n<p>JSR330还定义了<span style="color:#FF0000">@Qualifier</span>和<span style="color:#FF0000">@Provider</span>，对应到spring都给出了标准的实现。\n</p>\n<p>使用JSR330代替原注解的好处是无论使用任何反向依赖注入工具或框架，只要他是支持JSR330的，都可以平滑的切换。</p>'}};