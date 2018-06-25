exports.ids=[16],exports.modules={307:function(s,a,n){"use strict";Object.defineProperty(a,"__esModule",{value:!0});a.content='<p>使用spring的这几个配置，可以将旧&lt;xml&gt;配置形式完全使用Java实现，也可以和&lt;xml&gt;嵌套使用。</p>\n<p>@Configuration和@Bean可以配合使用,案例：</p>\n<p>传统XML配置：</p>\n<pre><code class="xml"><span class="code-tag">&lt;<span class="code-name">beans</span>&gt;</span>\n        <span class="code-tag">&lt;<span class="code-name">bean</span> <span class="hljs-attr">id</span>=<span\n                class="code-string">"classA"</span> <span class="hljs-attr">class</span>=<span class="code-string">"com.ClassA"</span>&gt;</span>\n                <span class="code-tag">&lt;<span class="code-name">constructor-arg</span> <span\n                        class="hljs-attr">ref</span>=<span class="code-string">"ClassB"</span>/&gt;</span>\n        <span class="code-tag">&lt;/<span class="code-name">bean</span>&gt;</span>\n        <span class="code-tag">&lt;<span class="code-name">bean</span> <span class="hljs-attr">id</span>=<span\n                class="code-string">"classB"</span> <span class="hljs-attr">class</span>=<span class="code-string">"com.ClassB"</span>&gt;</span>\n                <span class="code-tag">&lt;<span class="code-name">constructor-arg</span> <span\n                        class="hljs-attr">ref</span>=<span class="code-string">"c"</span>/&gt;</span>\n        <span class="code-tag">&lt;/<span class="code-name">bean</span>&gt;</span>\n        <span class="code-tag">&lt;<span class="code-name">bean</span> <span class="hljs-attr">id</span>=<span\n                class="code-string">"classC"</span> <span class="hljs-attr">class</span>=<span class="code-string">"com.ClassC"</span>/&gt;</span>\n<span class="code-tag">&lt;/<span class="code-name">beans</span>&gt;</span></code></pre>\n<p>对应的可以使用@Configuration和@Bean来实现：</p>\n<pre><code class="java"><span class="code-meta">@Configuration</span>\n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n            class="code-title">config</span></span>{\n        <span class="code-keyword">public</span> <span class="code-meta">@Bean</span> <span class="hljs-function">ClassA <span\n            class="code-title">classA</span><span class="hljs-params">()</span> </span>{\n                <span class="code-keyword">return</span> <span class="code-keyword">new</span> ClassA(classB());\n        }\n        <span class="code-keyword">public</span> <span class="code-meta">@Bean</span> <span class="hljs-function">ClassB <span\n            class="code-title">classB</span><span class="hljs-params">()</span> </span>{\n                <span class="code-keyword">return</span> <span class="code-keyword">new</span> ClassB(c());\n        }\n        <span class="code-keyword">public</span> <span class="code-meta">@Bean</span> <span class="hljs-function">ClassC <span\n            class="code-title">classC</span><span class="hljs-params">()</span> </span>{\n\n        }\n}</code></pre>\n<p>@DependsOn注解类似于&lt;xml&gt;的depends-on元素，案例如下：</p>\n<pre><code class="java"><span class="code-meta">@DependsOn</span>({<span class="code-string">"classA"</span>,<span\n        class="code-string">"classB"</span>})\n<span class="code-meta">@Component</span>\n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n            class="code-title">ClassC</span></span>{\n   <span class="code-comment">//codes here</span>\n}</code></pre>\n<p>这样，在初始化ClassC之前，一定会先初始化ClassA和ClassB。</p>\n<p>@Import是导入通过@Configuration配置的Bean。</p>\n<p>先通过@Configuration声明配置类</p>\n<pre><code class="java"><span class="code-meta">@Configuration</span>\n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n            class="code-title">Config</span> </span>{\n    <span class="code-keyword">public</span> <span class="code-meta">@Bean</span> <span\n            class="hljs-function">ClassA <span class="code-title">classA</span> <span\n            class="hljs-params">()</span> </span>{\n        <span class="code-keyword">return</span> <span class="code-keyword">new</span> ClassA();\n    }\n}</code></pre>\n<p>然后使用@Import导入配置类</p>\n<pre><code class="java"><span class="code-meta">@Configuration</span>\n<span class="code-meta">@Import</span>(Config.class)  <span class="code-comment">//导入CDConfig的配置</span>\n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n            class="code-title">ConfigExt</span> </span>{\n    <span class="code-meta">@Bean</span>(name = <span class="code-string">"classB"</span>)\n    <span class="hljs-function"><span class="code-keyword">public</span> ClassB <span\n            class="code-title">classB</span><span class="hljs-params">(ClassA classA)</span> </span>{\n        <span class="code-comment">// 注入ClassA类型的bean</span>\n        <span class="code-keyword">return</span> <span class="code-keyword">new</span> ClassB(classA);\n    }\n}</code></pre>\n<p>@ImportResource类似于XML配置的&lt;import&gt;元素，如：&lt;import resource="importxml.xml" /&gt;。</p>\n<p>使用方式如下：</p>\n<pre><code class="xml"><span class="code-tag">&lt;<span class="code-name">bean</span> <span class="hljs-attr">id</span>=<span\n        class="code-string">"classA"</span> <span class="hljs-attr">class</span>=<span\n        class="code-string">"com.ClassA"</span>&gt;</span>\n       <span class="code-tag">&lt;<span class="code-name">property</span> <span class="hljs-attr">name</span>=<span\n               class="code-string">"classB"</span> <span class="hljs-attr">ref</span>=<span\n               class="code-string">"classB"</span> /&gt;</span>\n<span class="code-tag">&lt;/<span class="code-name">bean</span>&gt;</span>\n<span class="code-tag">&lt;<span class="code-name">bean</span> <span class="hljs-attr">id</span>=<span\n        class="code-string">"classB"</span> <span class="hljs-attr">class</span>=<span\n        class="code-string">"com.ClassB"</span>/</span></code></pre>\n<p>Java类注入：</p>\n<pre><code class="java"><span class="code-meta">@Configuration</span>\n<span class="code-meta">@Import</span>(Config.class)  \n<span class="code-meta">@ImportResource</span>(<span class="code-string">"classpath:importxml.xml"</span>) <span\n            class="code-comment">//导入xml配置项</span>\n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n            class="code-title">ConfigExt</span></span>{\n\n}</code></pre>'}};