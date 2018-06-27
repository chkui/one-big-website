webpackJsonp([3],{311:function(s,a,n){"use strict";Object.defineProperty(a,"__esModule",{value:!0});a.content='<p>本文将一点一滴的累计记录Java中的一些细节知识。不只是加以说明，而是所有的细节都找到来源，以官方文档、知名社区的介绍为主。</p>\n<h2 id="h2-1"><strong>StringTokenizer和String.split</strong></h2>\n<pre class="gradle"><code class="gradle">&nbsp;&nbsp;&nbsp;&nbsp;<span class="code-comment"><span class="code-comment">//Use&nbsp;StringTokenizer&nbsp;</span></span>\n&nbsp;&nbsp;&nbsp;&nbsp;StringTokenizer&nbsp;st&nbsp;=&nbsp;<span class="code-keyword"><span\n            class="code-keyword">new</span></span>&nbsp;StringTokenizer(<span class="code-string"><span\n            class="code-string">"this&nbsp;is&nbsp;a&nbsp;test"</span></span>);\n&nbsp;&nbsp;&nbsp;&nbsp;<span class="code-keyword"><span class="code-keyword">while</span></span>&nbsp;(st.hasMoreTokens())&nbsp;{\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.<span class="code-keyword"><span\n            class="code-keyword">println</span></span>(st.nextToken());\n&nbsp;&nbsp;&nbsp;&nbsp;}</code></pre>\n<pre class="javascript"><code class="javascript">&nbsp;&nbsp;&nbsp;&nbsp;<span class="code-comment"><span\n        class="code-comment">//Use&nbsp;split</span></span>\n&nbsp;&nbsp;&nbsp;&nbsp;<span class="code-built_in"><span class="code-built_in">String</span></span>[]&nbsp;results&nbsp;=&nbsp;<span\n            class="code-string"><span class="code-string">"this&nbsp;is&nbsp;a&nbsp;test"</span></span>.split(<span\n            class="code-string"><span class="code-string">"\\\\s"</span></span>);\n&nbsp;&nbsp;&nbsp;&nbsp;<span class="code-keyword"><span class="code-keyword">for</span></span>&nbsp;(<span\n            class="code-built_in"><span class="code-built_in">String</span></span>&nbsp;result：results){\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.println(result);\n&nbsp;&nbsp;&nbsp;&nbsp;}</code></pre>\n<p></p>\n<p>关于StringTokenizer和String.split的差异说法很多。官方文档<a\n        href="http://docs.oracle.com/javase/6/docs/api/java/util/StringTokenizer.html有定型说明：" rel="nofollow">http://docs.oracle.com/javase/6/docs/api/java/util/StringTokenizer.html</a>&nbsp;有定性说明（附注：最新的JDK8\n    API文档中也是相同的说明）。</p>\n<blockquote>\n    <p><span style="font-size:11px"><span style="font-family:微软雅黑,microsoft yahei">StringTokenizer</span><span\n            style="background-color:rgb(255, 255, 255); font-family:微软雅黑,microsoft yahei">&nbsp;is a legacy class that is retained for compatibility reasons although its use is discouraged in new code. It is recommended that anyone seeking this functionality use the&nbsp;</span><span\n            style="font-family:微软雅黑,microsoft yahei">split</span><span\n            style="background-color:rgb(255, 255, 255); font-family:微软雅黑,microsoft yahei">&nbsp;method of&nbsp;</span><span\n            style="font-family:微软雅黑,microsoft yahei">String</span><span\n            style="background-color:rgb(255, 255, 255); font-family:微软雅黑,microsoft yahei">&nbsp;or the java.util.regex package instead.</span></span>\n    </p>\n</blockquote>\n<p>大意是StringTokenizer是一个历史遗留类，为了保证向后兼容性而保留这个类。推荐在新的代码中使用split或regex替换。</p>\n<p>至于网上的测评资料说<strong>StringTokenizer比<strong>String.split</strong></strong>效率更高，由于没有亲测就不妄加评论了。作为项目管理者，从风险和可靠性的角度考虑，在项目规范和代码review的过程中，还是以官方文档为准。\n</p>\n<h2 id="h2-2"><strong>transient和volatile关键词的使用</strong></h2>\n<pre class="java"><code class="java"><span class="code-keyword"><span class="code-keyword">transient</span></span>&nbsp;<span\n        class="code-keyword"><span class="code-keyword">volatile</span></span>&nbsp;Set&lt;K&gt;&nbsp;keySet&nbsp;=&nbsp;<span\n        class="code-keyword"><span class="code-keyword">null</span></span>;\n<span class="code-keyword"><span class="code-keyword">transient</span></span>&nbsp;<span class="code-keyword"><span\n            class="code-keyword">volatile</span></span>&nbsp;Collection&lt;V&gt;&nbsp;values&nbsp;=&nbsp;<span\n            class="code-keyword"><span class="code-keyword">null</span></span>;</code></pre>\n<p>transient是变量修饰符，表明该字段不是对象持久状态的一部分，储存的时候不用储存，比如序列化这个对象时，该字段是不会储存的。<br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;volatile也是变量修饰符，只能用来修饰变量。volatile修饰的成员变量在每次被线程访问时，都强迫从共享内存中重读该成员变量的值。&nbsp;而且，当成员变量发生变化时，强迫线程将变化值回写到共享内存。这样在任何时刻，两个不同的线程总是看到某个成员变量的同一个值。<br>\n    在此解释一下Java的内存机制：<br>\n    Java使用一个主内存来保存变量当前值，而每个线程则有其独立的工作内存。线程访问变量的时候会将变量的值拷贝到自己的工作内存中，这样，当线程对自己工作内存中的变量进行操作之后，就造成了工作内存中的变量拷贝的值与主内存中的变量值不同。<br>\n    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Java语言规范中指出：为了获得最佳速度，允许线程保存共享成员变量的私有拷贝，而且只当线程进入或者离开同步代码块时才与共享成员变量的原始值对比。这样当多个线程同时与某个对象交互时，就必须要注意到要让线程及时地得到共享成员变量的变化。而volatile关键字就是提示VM：对于这个成员变量不能保存它的私有拷贝，而应直接与共享成员变量交互。<br>\n    使用建议：在两个或者更多的线程访问的成员变量上使用volatile。当要访问的变量已在synchronized代码块中，或者为常量时，不必使用。由于使用volatile屏蔽掉了VM中必要的代码优化，所以在效率上比较低，因此一定在必要时才使用此关键字。\n</p>'},312:function(s,a,n){"use strict";Object.defineProperty(a,"__esModule",{value:!0});a.content='<h2 id="h2-1">那些年困扰着我们的null</h2>\n<p>在Java江湖流传着这样一个传说：<strong>直到真正了解了空指针异常，才能算一名合格的Java开发人员</strong>。在我们逼格闪闪的java码字符生涯中，每天都会遇到各种null的处理，像下面这样的代码可能我们每天都在反复编写：\n</p>\n<pre><code class="java"><span class="code-keyword">if</span>(<span class="code-keyword">null</span> != obj1){\n  <span class="code-keyword">if</span>(<span class="code-keyword">null</span> != obje2){\n     <span class="code-comment">// do something</span>\n  }\n}</code></pre>\n<p>稍微有点眼界<em>javaer</em>就去干一些稍有逼格的事，弄一个判断<em>null</em>的方法：</p>\n<pre><code class="java"><span class="hljs-function"><span class="code-keyword">boolean</span> <span class="code-title">checkNotNull</span><span\n        class="hljs-params">(Object obj)</span></span>{\n  <span class="code-keyword">return</span> <span class="code-keyword">null</span> == obj ? <span class="code-keyword">false</span> : <span\n            class="code-keyword">true</span>;\n}\n\n<span class="hljs-function"><span class="code-keyword">void</span> <span class="code-title">do</span><span\n        class="hljs-params">()</span></span>{\n  <span class="code-keyword">if</span>(checkNotNull(obj1)){\n     <span class="code-keyword">if</span>(checkNotNull(obj2)){\n        <span class="code-comment">//do something</span>\n     }\n  }\n}</code></pre>\n<p>然后，问题又来了：如果一个null表示一个空字符串，那""表示什么？</p>\n<p>然后惯性思维告诉我们，""和null不都是空字符串码？索性就把判断空值升级了一下：</p>\n<pre><code class="java"><span class="hljs-function"><span class="code-keyword">boolean</span> <span class="code-title">checkNotBlank</span><span\n        class="hljs-params">(Object obj)</span></span>{\n  <span class="code-keyword">return</span> <span class="code-keyword">null</span> != obj &amp;&amp; !<span\n            class="code-string">""</span>.equals(obj) ? <span class="code-keyword">true</span> : <span\n            class="code-keyword">false</span>;\n}\n<span class="hljs-function"><span class="code-keyword">void</span> <span class="code-title">do</span><span\n        class="hljs-params">()</span></span>{\n  <span class="code-keyword">if</span>(checkNotBlank(obj1)){\n     <span class="code-keyword">if</span>(checkNotNull(obj2)){\n        <span class="code-comment">//do something</span>\n     }\n  }\n}</code></pre>\n<p>有空的话各位可以看看目前项目中或者自己过往的代码，到底写了多少和上面类似的代码。</p>\n<p><strong>不知道你是否认真思考过一个问题：一个null到底意味着什么？</strong></p>\n<ol>\n    <li>浅显的认识——null当然表示“值不存在”。</li>\n    <li>对内存管理有点经验的理解——null表示内存没有被分配，指针指向了一个空地址。</li>\n    <li>稍微透彻点的认识——null可能表示某个地方处理有问题了，也可能表示某个值不存在。</li>\n    <li>被虐千万次的认识——哎哟，又一个NullPointerException异常，看来我得加一个<em>if(null != value)</em>了。</li>\n</ol>\n<p>\n    回忆一下，在咱们前面码字生涯中到底遇到过多少次java.lang.NullPointerException异常？NullPointerException作为一个RuntimeException级别的异常不用显示捕获，若不小心处理我们经常会在生产日志中看到各种由NullPointerException引起的异常堆栈输出。而且根据这个异常堆栈信息我们根本无法定位到导致问题的原因，因为并不是抛出NullPointerException的地方引发了这个问题。我们得更深处去查询什么地方产生了这个null，而这个时候日志往往无法跟踪。</p>\n<p>有时更悲剧的是，产生null值的地方往往不在我们自己的项目代码中。这就存在一个更尴尬的事实——在我们调用各种良莠不齐第三方接口时，说不清某个接口在某种机缘巧合的情况下就会返回一个null……</p>\n<p>回到前面对null的认知问题。很多javaer认为null就是表示“什么都没有”或者“值不存在”。按照这个惯性思维我们的代码逻辑就是：<span style="color:#FF8C00">你调用我的接口，按照你给我的参数返回对应的“值”，如果这条件没法找到对应的“值”，那我当然返回一个null给你表示没有“任何东西”了</span>。我们看看下面这个代码，用很传统很标准的Java编码风格编写：\n</p>\n<pre><code class="java"><span class="hljs-class"><span class="code-keyword">class</span> <span class="code-title">MyEntity</span></span>{\n   <span class="code-keyword">int</span> id;\n   String name;\n   <span class="hljs-function">String <span class="code-title">getName</span><span class="hljs-params">()</span></span>{\n      <span class="code-keyword">return</span> name;\n   }\n}\n\n<span class="code-comment">// main</span>\n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n            class="code-title">Test</span></span>{\n   <span class="hljs-function"><span class="code-keyword">public</span> <span class="code-keyword">static</span> <span\n           class="code-keyword">void</span> <span class="code-title">main</span><span class="hljs-params">(String[] args)</span>\n       <span class="code-keyword">final</span> MyEntity myEntity </span>= getMyEntity(<span\n            class="code-keyword">false</span>);\n       System.out.println(myEntity.getName());\n   }\n\n   <span class="hljs-function"><span class="code-keyword">private</span> <span\n           class="code-title">getMyEntity</span><span class="hljs-params">(<span class="code-keyword">boolean</span> isSuc)</span></span>{\n       <span class="code-keyword">if</span>(isSuc){\n           <span class="code-keyword">return</span> <span class="code-keyword">new</span> MyEntity();\n       }<span class="code-keyword">else</span>{\n           <span class="code-keyword">return</span> <span class="code-keyword">null</span>;\n       }\n   }\n}</code></pre>\n<p>\n    这一段代码很简单，日常的业务代码肯定比这个复杂的多，但是实际上我们大量的Java编码都是按这种套路编写的，懂货的人一眼就可以看出最终肯定会抛出NullPointerException。但是在我们编写业务代码时，很少会想到要处理这个可能会出现的null（<span\n        style="color:#FF0000">也许API文档已经写得很清楚在某些情况下会返回null，但是你确保你会认真看完API文档后才开始写代码么？</span>），直到我们到了某个测试阶段，突然蹦出一个NullPointerException异常，我们才意识到原来我们得像下面这样加一个判断来搞定这个可能会返回的null值。\n</p>\n<pre><code class="java"><span class="code-comment">// main</span>\n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n            class="code-title">Test</span></span>{\n   <span class="hljs-function"><span class="code-keyword">public</span> <span class="code-keyword">static</span> <span\n           class="code-keyword">void</span> <span class="code-title">main</span><span class="hljs-params">(String[] args)</span>\n       <span class="code-keyword">final</span> MyEntity myEntity </span>= getMyEntity(<span\n            class="code-keyword">false</span>);\n       <span class="code-keyword">if</span>(<span class="code-keyword">null</span> != myEntity){\n           System.out.println(myEntity.getName());\n       }<span class="code-keyword">else</span>{\n           System.out.println(<span class="code-string">"ERROR"</span>);\n       }\n   }\n}</code></pre>\n<p>仔细想想过去这么些年，咱们是不是都这样干过来的？如果直到测试阶段才能发现某些null导致的问题，那么现在问题就来了——在那些雍容繁杂、层次分明的业务代码中到底还有多少null没有被正确处理呢？</p>\n<p>对于null的处理态度，往往可以看出一个项目的成熟和严谨程度。比如Guava早在JDK1.6之前就给出了优雅的null处理方式，可见功底之深。</p>\n\n<h2 id="h2-2">鬼魅一般的null阻碍我们进步</h2>\n<p>如果你是一位聚焦于传统面向对象开发的Javaer，或许你已经习惯了null带来的种种问题。但是早在许多年前，大神就说了null这玩意就是个坑。</p>\n<p>托尼.霍尔（你不知道这货是谁吗？自己去查查吧）曾经说过：“I call it my billion-dollar mistake. It was the invention of the null reference in 1965.\n    I couldn\'t resist the temptation to put in a null reference, simply because it was so easy to\n    implement.”（大意是：“哥将发明null这事称为价值连城的错误。因为在1965那个计算机的蛮荒时代，空引用太容易实现，让哥根本经不住诱惑发明了空指针这玩意。”）。</p>\n<p>然后，我们再看看null还会引入什么问题。</p>\n<p>看看下面这个代码：</p>\n<pre><code class="java">String address = person.getCountry().getProvince().getCity();</code></pre>\n<p>如果你玩过一些函数式语言（Haskell、Erlang、Clojure、Scala等等），上面这样是一种很自然的写法。用Java当然也可以实现上面这样的编写方式。</p>\n<p>但是为了完满的处理所有可能出现的null异常，我们不得不把这种优雅的函数编程范式改为这样：</p>\n<pre><code class="java"><span class="code-keyword">if</span> (person != <span class="code-keyword">null</span>) {\n\tCountry country = person.getCountry();\n\t<span class="code-keyword">if</span> (country != <span class="code-keyword">null</span>) {\n\t\tProvince province = country.getProvince();\n\t\t<span class="code-keyword">if</span> (province != <span class="code-keyword">null</span>) {\n\t\t\taddress = province.getCity();\n\t\t}\n\t}\n}</code></pre>\n<p>瞬间，高逼格的函数式编程Java8又回到了10年前。这样一层一层的嵌套判断，增加代码量和不优雅还是小事。更可能出现的情况是：在大部分时间里，人们会忘记去判断这可能会出现的null，即使是写了多年代码的老人家也不例外。</p>\n<p>上面这一段层层嵌套的 null 处理，也是传统Java长期被诟病的地方。如果以Java早期版本作为你的启蒙语言，这种get-&gt;if null-&gt;return\n    的臭毛病会影响你很长的时间（记得在某国外社区，这被称为：面向entity开发）。</p>\n\n<h2 id="h2-3">利用Optional实现Java函数式编程</h2>\n<p>好了，说了各种各样的毛病，然后我们可以进入新时代了。</p>\n<p>早在推出Java SE 8版本之前，其他类似的函数式开发语言早就有自己的各种解决方案。下面是Groovy的代码：</p>\n<pre><code class="groovy javascript"><span class="code-built_in">String</span> version = computer?.getSoundcard()?.getUSB()?.getVersion()：<span\n        class="code-string">"unkonwn"</span>;</code></pre>\n<p>Haskell用一个&nbsp;Maybe 类型类标识处理null值。而号称多范式开发语言的Scala则提供了一个和Maybe差不多意思的Option[T]，用来包裹处理null。</p>\n<p>Java8引入了&nbsp;java.util.Optional&lt;T&gt;来处理函数式编程的null问题，Optional&lt;T&gt;的处理思路和Haskell、Scala类似，但又有些许区别。先看看下面这个Java代码的例子：</p>\n<pre><code class="java"><span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n        class="code-title">Test</span> </span>{\n\t<span class="hljs-function"><span class="code-keyword">public</span> <span class="code-keyword">static</span> <span\n            class="code-keyword">void</span> <span class="code-title">main</span><span class="hljs-params">(String[] args)</span> </span>{\n\t\t<span class="code-keyword">final</span> String text = <span class="code-string">"Hallo world!"</span>;\n\t\tOptional.ofNullable(text)<span class="code-comment">//显示创建一个Optional壳</span>\n\t\t    .map(Test::print)\n\t\t\t.map(Test::print)\n\t\t\t.ifPresent(System.out::println);\n\n\t\tOptional.ofNullable(text)\n\t\t\t.map(s -&gt;{ \n\t\t\t\tSystem.out.println(s);\n\t\t\t\t<span class="code-keyword">return</span> s.substring(<span class="hljs-number">6</span>);\n\t\t\t})\n\t\t\t.map(s -&gt; <span class="code-keyword">null</span>)<span class="code-comment">//返回 null</span>\n\t\t\t.ifPresent(System.out::println);\n\t}\n\t<span class="code-comment">// 打印并截取str[5]之后的字符串</span>\n\t<span class="hljs-function"><span class="code-keyword">private</span> <span class="code-keyword">static</span> String <span\n            class="code-title">print</span><span class="hljs-params">(String str)</span> </span>{\n\t\tSystem.out.println(str);\n\t\t<span class="code-keyword">return</span> str.substring(<span class="hljs-number">6</span>);\n\t}\n}\n<span class="code-comment">//Consol 输出</span>\n<span class="code-comment">//num1:Hallo world!</span>\n<span class="code-comment">//num2:world!</span>\n<span class="code-comment">//num3:</span>\n<span class="code-comment">//num4:Hallo world!</span></code></pre>\n<p><span style="color:#FFA500"><em> （可以把上面的代码copy到你的IDE中运行，前提是必须安装了JDK8。）</em></span></p>\n<p>上面的代码中创建了2个<em>Optional</em>，实现的功能基本相同，都是使用<em>Optional</em>作为<em>String</em>的外壳对<em>String</em>进行截断处理。当在处理过程中遇到null值时，就不再继续处理。我们可以发现第二个<em>Optional</em>中出现<em>s-&gt;null</em>之后，后续的ifPresent不再执行。\n</p>\n<p>注意观察输出的&nbsp;//num3:，这表示输出了一个""字符，而不是一个null。</p>\n<p><em>Optional</em>提供了丰富的接口来处理各种情况，比如可以将代码修改为：</p>\n<pre><code class="java"><span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n        class="code-title">Test</span> </span>{\n\t<span class="hljs-function"><span class="code-keyword">public</span> <span class="code-keyword">static</span> <span\n            class="code-keyword">void</span> <span class="code-title">main</span><span class="hljs-params">(String[] args)</span> </span>{\n\t\t<span class="code-keyword">final</span> String text = <span class="code-string">"Hallo World!"</span>;\n\t\tSystem.out.println(lowerCase(text));<span class="code-comment">//方法一</span>\n\t\tlowerCase(<span class="code-keyword">null</span>, System.out::println);<span class="code-comment">//方法二</span>\n\t}\n\n\t<span class="hljs-function"><span class="code-keyword">private</span> <span class="code-keyword">static</span> String <span\n            class="code-title">lowerCase</span><span class="hljs-params">(String str)</span> </span>{\n\t\t<span class="code-keyword">return</span> Optional.ofNullable(str).map(s -&gt; s.toLowerCase()).map(s-&gt;s.replace(<span\n            class="code-string">"world"</span>, <span class="code-string">"java"</span>)).orElse(<span\n            class="code-string">"NaN"</span>);\n\t}\n\n\t<span class="hljs-function"><span class="code-keyword">private</span> <span class="code-keyword">static</span> <span\n            class="code-keyword">void</span> <span class="code-title">lowerCase</span><span class="hljs-params">(String str, Consumer&lt;String&gt; consumer)</span> </span>{\n\t\tconsumer.accept(lowerCase(str));\n\t}\n}\n<span class="code-comment">//输出</span>\n<span class="code-comment">//hallo java!</span>\n<span class="code-comment">//NaN</span></code></pre>\n<p>这样，我们可以动态的处理一个字符串，如果在任何时候发现值为<em>null</em>，则使用<em>orElse</em>返回预设默认的<em>"NaN"</em>。</p>\n<p>总的来说，我们可以将任何数据结构用<em>Optional</em>包裹起来，然后使用函数式的方式对他进行处理，而不必关心随时可能会出现的<em>null</em>。</p>\n<p>我们看看前面提到的<em>Person.getCountry().getProvince().getCity()</em>怎么不用一堆if来处理。</p>\n<p><strong>第一种方法是不改变以前的entity：</strong></p>\n<pre><code class="java"><span class="code-keyword">import</span> java.util.Optional;\n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n            class="code-title">Test</span> </span>{\n\t<span class="hljs-function"><span class="code-keyword">public</span> <span class="code-keyword">static</span> <span\n            class="code-keyword">void</span> <span class="code-title">main</span><span class="hljs-params">(String[] args)</span> </span>{\n\t\tSystem.out.println(Optional.ofNullable(<span class="code-keyword">new</span> Person())\n\t\t\t.map(x-&gt;x.country)\n\t\t\t.map(x-&gt;x.provinec)\n\t\t\t.map(x-&gt;x.city)\n\t\t\t.map(x-&gt;x.name)\n\t\t\t.orElse(<span class="code-string">"unkonwn"</span>));\n\t}\n}\n<span class="hljs-class"><span class="code-keyword">class</span> <span class="code-title">Person</span> </span>{\n\tCountry country;\n}\n<span class="hljs-class"><span class="code-keyword">class</span> <span class="code-title">Country</span> </span>{\n\tProvince provinec;\n}\n<span class="hljs-class"><span class="code-keyword">class</span> <span class="code-title">Province</span> </span>{\n\tCity city;\n}\n<span class="hljs-class"><span class="code-keyword">class</span> <span class="code-title">City</span> </span>{\n\tString name;\n}</code></pre>\n<p>这里用<em>Optional</em>作为每一次返回的外壳，如果有某个位置返回了null，则会直接得到"unkonwn"。</p>\n<p><strong>第二种办法是将所有的值都用Optional来定义：</strong></p>\n<pre><code class="java"><span class="code-keyword">import</span> java.util.Optional;\n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n            class="code-title">Test</span> </span>{\n\t<span class="hljs-function"><span class="code-keyword">public</span> <span class="code-keyword">static</span> <span\n            class="code-keyword">void</span> <span class="code-title">main</span><span class="hljs-params">(String[] args)</span> </span>{\n\t\tSystem.out.println(<span class="code-keyword">new</span> Person()\n\t\t\t\t.country.flatMap(x -&gt; x.provinec)\n\t\t\t\t.flatMap(Province::getCity)\n\t\t\t\t.flatMap(x -&gt; x.name)\n\t\t\t\t.orElse(<span class="code-string">"unkonwn"</span>));\n\t}\n}\n<span class="hljs-class"><span class="code-keyword">class</span> <span class="code-title">Person</span> </span>{\n\tOptional&lt;Country&gt; country = Optional.empty();\n}\n<span class="hljs-class"><span class="code-keyword">class</span> <span class="code-title">Country</span> </span>{\n\tOptional&lt;Province&gt; provinec;\n}\n<span class="hljs-class"><span class="code-keyword">class</span> <span class="code-title">Province</span> </span>{\n\tOptional&lt;City&gt; city;\n\t<span class="hljs-function">Optional&lt;City&gt; <span class="code-title">getCity</span><span\n            class="hljs-params">()</span></span>{<span class="code-comment">//用于::</span>\n\t\t<span class="code-keyword">return</span> city;\n\t}\n}\n<span class="hljs-class"><span class="code-keyword">class</span> <span class="code-title">City</span> </span>{\n\tOptional&lt;String&gt; name;\n}</code></pre>\n<p>第一种方法可以平滑的和已有的JavaBean、<em>Entity</em>或<em>POJA</em>整合，而无需改动什么，也能更轻松的整合到第三方接口中（例如<em>spring</em>的<em>bean</em>）。建议目前还是以第一种<em>Optional</em>的使用方法为主，毕竟不是团队中每一个人都能理解每个<em>get/set</em>带着一个<em>Optional</em>的用意。\n</p>\n<p><em>Optional</em>还提供了一个<em>filter</em>方法用于过滤数据（实际上<em>Java8</em>里<em>stream</em>风格的接口都提供了<em>filter</em>方法）。例如过去我们判断值存在并作出相应的处理：\n</p>\n<pre><code class="java"><span class="code-keyword">if</span>(Province!= <span class="code-keyword">null</span>){\n  City city = Province.getCity();\n  <span class="code-keyword">if</span>(<span class="code-keyword">null</span> != city &amp;&amp; <span\n            class="code-string">"guangzhou"</span>.equals(city.getName()){\n    System.out.println(city.getName());\n  }<span class="code-keyword">else</span>{\n    System.out.println(<span class="code-string">"unkonwn"</span>);\n  }\n}</code></pre>\n<p><strong>&nbsp; &nbsp; </strong>现在我们可以修改为</p>\n<pre><code class="java">Optional.ofNullable(province)\n   .map(x-&gt;x.city)\n   .filter(x-&gt;<span class="code-string">"guangzhou"</span>.equals(x.getName()))\n   .map(x-&gt;x.name)\n   .orElse(<span class="code-string">"unkonw"</span>);</code></pre>\n<p>\n    到此，利用<em>Optional</em>来进行函数式编程介绍完毕。<em>Optional</em>除了上面提到的方法，还有<em>orElseGet</em>、<em>orElseThrow</em>等根据更多需要提供的方法。<em>orElseGet</em>会因为出现null值抛出空指针异常，而<em>orElseThrow</em>会在出现<em>null</em>时，抛出一个使用者自定义的异常。可以查看<em>API</em>文档来了解所有方法的细节。\n</p>\n\n<h2 id="h2-4">写在最后的</h2>\n<p>\n    <em>Optional</em>只是<em>Java</em>函数式编程的冰山一角，需要结合<em>lambda</em>、<em>stream</em>、<em>Funcationinterface</em>等特性才能真正的了解<em>Java8</em>函数式编程的效用。本来还想介绍一些<em>Optional</em>的源码和运行原理的，但是<em>Optional</em>本身的代码就很少、API接口也不多，仔细想想也没什么好说的就省略了。\n</p>\n<p><em>Optional</em>虽然优雅，但是个人感觉有一些效率问题，不过还没去验证。如果有谁有确实的数据，请告诉我。</p>\n<p>本人也不是“函数式编程支持者”。从团队管理者的角度来说，每提升一点学习难度，人员的使用成本和团队交互成本就会更高一些。就像在传说中<em>Lisp</em>可以比<em>C++</em>的代码量少三十倍、开发更高效，但是若一个国内的常规IT公司真用<em>Lisp</em>来做项目，请问去哪、得花多少钱弄到这些用<em>Lisp</em>的哥们啊？\n</p>\n<p>\n    但是我非常鼓励大家都学习和了解函数式编程的思路。尤其是过去只侵淫在<em>Java</em>这一门语言、到现在还不清楚<em>Java8</em>会带来什么改变的开发人员，<em>Java8</em>是一个良好的契机。更鼓励把新的<em>Java8</em>特性引入到目前的项目中，一个长期配合的团队以及一门古老的编程语言都需要不断的注入新活力，否则不进则退。\n</p>'},331:function(s,a,n){"use strict";Object.defineProperty(a,"__esModule",{value:!0});a.content='<h2 id="h2-1">为什么要用Fragments</h2>\n<p>在我们使用React开发组件的时候，每个React组件都必须返回一个根元素。例如下面这样：</p>\n<pre class="scala"><code class="language-javascript"><span class="hljs-class"><span class="code-keyword"><span class="hljs-class"><span class="code-keyword">class</span></span></span><span class="hljs-class"> </span><span class="code-title"><span class="hljs-class"><span class="code-title">Table</span></span></span><span class="hljs-class"> </span><span class="code-keyword"><span class="hljs-class"><span class="code-keyword">extends</span></span></span><span class="hljs-class"> </span><span class="code-title"><span class="hljs-class"><span class="code-title">React</span></span></span><span class="hljs-class">.</span><span class="code-title"><span class="hljs-class"><span class="code-title">Component</span></span></span><span class="hljs-class"> </span></span>{\n  render() {\n    <span class="code-keyword"><span class="code-keyword">return</span></span> (\n      <span class="xml"><span class="code-tag">&lt;<span class="code-name">table</span>&gt;</span>\n        <span class="code-tag">&lt;<span class="code-name">tr</span>&gt;</span>\n          <span class="code-tag">&lt;<span class="code-name"><span class="code-type">Columns</span></span> /&gt;</span>\n        <span class="code-tag">&lt;/<span class="code-name">tr</span>&gt;</span>\n      <span class="code-tag">&lt;/<span class="code-name">table</span>&gt;</span>\n    );\n  }\n}\n\n<span class="hljs-class"><span class="code-keyword">class</span> <span class="code-title">Columns</span> <span class="code-keyword">extends</span> <span class="code-title">React</span>.<span class="code-title">Component</span> </span>{\n  render() {\n    <span class="code-keyword">return</span> (\n      <span class="code-tag">&lt;<span class="code-name">div</span>&gt;</span>\n        <span class="code-tag">&lt;<span class="code-name">td</span>&gt;</span><span class="code-type">Hello</span><span class="code-tag">&lt;/<span class="code-name">td</span>&gt;</span>\n        <span class="code-tag">&lt;<span class="code-name">td</span>&gt;</span><span class="code-type">World</span><span class="code-tag">&lt;/<span class="code-name">td</span>&gt;</span>\n      <span class="code-tag">&lt;/<span class="code-name">div</span>&gt;</span>\n    );\n  }\n}</span></code></pre>\n<p>在正常的HTML行文中，&lt;tr&gt;标签与&lt;td&gt;标签之间的&lt;div&gt;标签是不应该存在的。</p>\n<p>虽然在这个小小的例子中，我们可以将tr标签移入到Columns中去解决这个问题，但是在错综复杂的业务层级代码中，我们经常会遇到希望一个组件返回多个并列标签的情况。</p>\n<p>为了解决这个问题，React在16.x版本新推出了一个Fragments特性——组件碎片化。Fragments的使用方法非常简单，我们将Column组件稍作改造即可：</p>\n<pre class="scala"><code class="language-javascript"><span class="hljs-class"><span class="code-keyword"><span class="hljs-class"><span class="code-keyword">class</span></span></span><span class="hljs-class"> </span><span class="code-title"><span class="hljs-class"><span class="code-title">Columns</span></span></span><span class="hljs-class"> </span><span class="code-keyword"><span class="hljs-class"><span class="code-keyword">extends</span></span></span><span class="hljs-class"> </span><span class="code-title"><span class="hljs-class"><span class="code-title">React</span></span></span><span class="hljs-class">.</span><span class="code-title"><span class="hljs-class"><span class="code-title">Component</span></span></span><span class="hljs-class"> </span></span>{\n  render() {\n    <span class="code-keyword"><span class="code-keyword">return</span></span> (\n      <span class="xml"><span class="code-tag">&lt;<span class="code-name"><span class="code-type">React</span>.<span class="code-type">Fragment</span></span>&gt;</span>\n        <span class="code-tag">&lt;<span class="code-name">td</span>&gt;</span><span class="code-type">Hello</span><span class="code-tag">&lt;/<span class="code-name">td</span>&gt;</span>\n        <span class="code-tag">&lt;<span class="code-name">td</span>&gt;</span><span class="code-type">World</span><span class="code-tag">&lt;/<span class="code-name">td</span>&gt;</span>\n      <span class="code-tag">&lt;/<span class="code-name"><span class="code-type">React</span>.<span class="code-type">Fragment</span></span>&gt;</span>\n    );\n  }\n}</span></code></pre>\n<p>这样，在最终渲染成Dom后，并不会出现任何与HTML行文不符的标签。</p>\n\n<h2 id="h2-2">简写与注意事项</h2>\n<p>除了React.Fragment这样的写法，React还推荐使用更加明了的简短写法：</p>\n<pre class="scala"><code class="language-javascript"><span class="hljs-class"><span class="code-keyword"><span class="hljs-class"><span class="code-keyword">class</span></span></span><span class="hljs-class"> </span><span class="code-title"><span class="hljs-class"><span class="code-title">Columns</span></span></span><span class="hljs-class"> </span><span class="code-keyword"><span class="hljs-class"><span class="code-keyword">extends</span></span></span><span class="hljs-class"> </span><span class="code-title"><span class="hljs-class"><span class="code-title">React</span></span></span><span class="hljs-class">.</span><span class="code-title"><span class="hljs-class"><span class="code-title">Component</span></span></span><span class="hljs-class"> </span></span>{\n  render() {\n    <span class="code-keyword"><span class="code-keyword">return</span></span> (\n      <span class="xml"><span class="code-tag">&lt;&gt;</span>\n        <span class="code-tag">&lt;<span class="code-name">td</span>&gt;</span><span class="code-type">Hello</span><span class="code-tag">&lt;/<span class="code-name">td</span>&gt;</span>\n        <span class="code-tag">&lt;<span class="code-name">td</span>&gt;</span><span class="code-type">World</span><span class="code-tag">&lt;/<span class="code-name">td</span>&gt;</span>\n      <span class="code-tag">&lt;/&gt;</span>\n    );\n  }\n}</span></code></pre>\n<p>需要注意的是：<span style="color:#FF0000">这样的写法不支持传递任何参数，而且某些编译器或者编译工具并不支持这种写法</span>。</p>\n\n<h2 id="h2-3">在队列中使用</h2>\n<p>一个React元素除了直接写成一个组件，也可以在队列中返回。Fragment标签使用到队列中同样也要<a href="https://www.chkui.com/article/react/react_list_key_and_form" title="列表与组件的键值">使用key属性来标记队列的位置</a>：</p>\n<pre class="javascript"><code class="language-javascript"><span class="hljs-function"><span class="code-keyword"><span class="hljs-function"><span class="code-keyword">function</span></span></span><span class="hljs-function"> </span><span class="code-title"><span class="hljs-function"><span class="code-title">Glossary</span></span></span><span class="hljs-function">(</span><span class="hljs-params"><span class="hljs-function"><span class="hljs-params">props</span></span></span><span class="hljs-function">) </span></span>{\n  <span class="code-keyword"><span class="code-keyword">return</span></span> (\n    <span class="xml"><span class="code-tag"><span class="xml"><span class="code-tag">&lt;</span></span><span class="code-name"><span class="xml"><span class="code-tag"><span class="code-name">dl</span></span></span></span><span class="xml"><span class="code-tag">&gt;</span></span></span><span class="xml">\n      {props.items.map(item =&gt; (\n        </span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;</span></span><span class="code-name"><span class="xml"><span class="code-tag"><span class="code-name">React.Fragment</span></span></span></span><span class="xml"><span class="code-tag"> </span></span><span class="hljs-attr"><span class="xml"><span class="code-tag"><span class="hljs-attr">key</span></span></span></span><span class="xml"><span class="code-tag">=</span></span><span class="code-string"><span class="xml"><span class="code-tag"><span class="code-string">{item.id}</span></span></span></span><span class="xml"><span class="code-tag">&gt;</span></span></span><span class="xml">\n          </span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;</span></span><span class="code-name"><span class="xml"><span class="code-tag"><span class="code-name">dt</span></span></span></span><span class="xml"><span class="code-tag">&gt;</span></span></span><span class="xml">{item.term}</span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;/</span></span><span class="code-name"><span class="xml"><span class="code-tag"><span class="code-name">dt</span></span></span></span><span class="xml"><span class="code-tag">&gt;</span></span></span><span class="xml">\n          </span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;</span></span><span class="code-name"><span class="xml"><span class="code-tag"><span class="code-name">dd</span></span></span></span><span class="xml"><span class="code-tag">&gt;</span></span></span><span class="xml">{item.description}</span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;/</span></span><span class="code-name"><span class="xml"><span class="code-tag"><span class="code-name">dd</span></span></span></span><span class="xml"><span class="code-tag">&gt;</span></span></span><span class="xml">\n        </span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;/</span></span><span class="code-name"><span class="xml"><span class="code-tag"><span class="code-name">React.Fragment</span></span></span></span><span class="xml"><span class="code-tag">&gt;</span></span></span><span class="xml">\n      ))}\n    </span><span class="code-tag"><span class="xml"><span class="code-tag">&lt;/</span></span><span class="code-name"><span class="xml"><span class="code-tag"><span class="code-name">dl</span></span></span></span><span class="xml"><span class="code-tag">&gt;</span></span></span><span class="xml">\n  );\n}</span></span></code></pre>\n<p></p>'},340:function(s,a,n){"use strict";Object.defineProperty(a,"__esModule",{value:!0});a.content='<h3 id="h3-1">非受控组件（Uncontrolled Components）</h3>\n<h4 id="h4-1">使用非受控组件</h4>\n<p>在大部分情况下，推荐使用 <a title="受控组件" href="https://www.chkui.com/article/react/react_list_key_and_form#h1-2">受控组件</a> 来实现表单、输入框等状态控制。在受控组件中，表单等数据都有React组件自己处理。这里将介绍另外一种非受控组件，表单的数据有Dom自己控制。</p>\n<p>非受控组件实现的重点是用Refs特性获取真实Dom来代替每次数据变更去更新组件的状态值。</p>\n<p>例如下面的代码，在非受控组件中记录被用户输入的名字：</p>\n<pre class="scala"><code class="language-javascript"><span class="hljs-class"><span class="code-keyword"><span class="hljs-class"><span class="code-keyword">class</span></span></span><span class="hljs-class"> </span><span class="code-title"><span class="hljs-class"><span class="code-title">NameForm</span></span></span><span class="hljs-class"> </span><span class="code-keyword"><span class="hljs-class"><span class="code-keyword">extends</span></span></span><span class="hljs-class"> </span><span class="code-title"><span class="hljs-class"><span class="code-title">React</span></span></span><span class="hljs-class">.</span><span class="code-title"><span class="hljs-class"><span class="code-title">Component</span></span></span><span class="hljs-class"> </span></span>{\n  <span class="code-keyword">constructor</span>(props) {\n    <span class="code-keyword"><span class="code-keyword">super</span></span>(props);\n    <span class="code-keyword"><span class="code-keyword">this</span></span>.handleSubmit = <span class="code-keyword"><span class="code-keyword">this</span></span>.handleSubmit.bind(<span class="code-keyword"><span class="code-keyword">this</span></span>);\n  }\n\n  handleSubmit(event) {\n    <span class="code-comment"><span class="code-comment">//在提交时，直接使用ref获取的真实Dom获取值</span></span>\n    alert(<span class="code-string"><span class="hljs-symbol">\'A</span> name was submitted: \'</span> + <span class="code-keyword"><span class="code-keyword">this</span></span>.input.value);\n    event.preventDefault();\n  }\n\n  render() {\n    <span class="code-keyword"><span class="code-keyword">return</span></span> (\n      &lt;form onSubmit={<span class="code-keyword">this</span>.handleSubmit}&gt;\n        &lt;label&gt;\n          <span class="code-type">Name</span>:\n          &lt;input <span class="hljs-class"><span class="code-keyword">type</span></span>=<span class="code-string">"text"</span> ref={(input) =&gt; <span class="code-keyword">this</span>.input = input} /&gt;\n        &lt;/label&gt;\n        &lt;input <span class="hljs-class"><span class="code-keyword">type</span></span>=<span class="code-string">"submit"</span> value=<span class="code-string">"Submit"</span> /&gt;\n      &lt;/form&gt;\n    );\n  }\n}</code></pre>\n<p><a title="代码测试" href="https://codepen.io/gaearon/pen/WooRWa?editors=0010" rel="nofollow">尝试代码</a>。</p>\n<p>由于在非受控组件中使用Refs特性获取了真实Dom的实例，所以在使用非受控组建时，更容易集成React和非React代码，在某些时候也可以省略一些代码。但是建议除了特殊情况，都使用受控组件。</p>\n<p>如果想要深入理解什么情况下使用哪种组件，建议阅读 <a title="受控组件与非受控组件的差异" href="https://goshakkk.name/controlled-vs-uncontrolled-inputs-react/" rel="nofollow">受控和不受控表单输入</a> 一文。</p>\n<h4 id="h4-2">组件默认值</h4>\n<p>在React渲染的生命周期，表单中的value属性会被覆盖Dom中的value值。在使用非受控组件时，通常需要React设定一个默认初始值但是不再控制后续更新。基于这个案例，你可以指定一个<code>defaultValue</code>&nbsp;属性来代替&nbsp;<code>value</code>。</p>\n<pre class="xml"><code class="language-javascript">render() {\n  <span class="code-keyword">return</span> (\n    <span class="code-tag">&lt;<span class="code-name">form</span> <span class="hljs-attr">onSubmit</span>=<span class="code-string">{this.handleSubmit}</span>&gt;</span>\n      <span class="code-tag">&lt;<span class="code-name">label</span>&gt;</span>\n        Name:\n        <span class="code-tag">&lt;<span class="code-name">input</span>\n          <span class="hljs-attr">defaultValue</span>=<span class="code-string">"Bob"</span>\n          <span class="hljs-attr">type</span>=<span class="code-string">"text"</span>\n          <span class="hljs-attr">ref</span>=<span class="code-string">{(input)</span> =&gt;</span> this.input = input} /&gt;\n      <span class="code-tag">&lt;/<span class="code-name">label</span>&gt;</span>\n      <span class="code-tag">&lt;<span class="code-name">input</span> <span class="hljs-attr">type</span>=<span class="code-string">"submit"</span> <span class="hljs-attr">value</span>=<span class="code-string">"Submit"</span> /&gt;</span>\n    <span class="code-tag">&lt;/<span class="code-name">form</span>&gt;</span>\n  );\n}</code></pre>\n<p>例如中“defaultValue = "Bob"”就是指定了一个默认值。同样地，&nbsp;<code>&lt;input type="checkbox"&gt;</code>&nbsp;和&nbsp;<code>&lt;input type="radio"&gt;</code>&nbsp;支持&nbsp;<code>defaultChecked</code>属性，&nbsp;<code>&lt;select&gt;</code>&nbsp;标签支持&nbsp;<code>defaultValue</code>属性。</p>'}});