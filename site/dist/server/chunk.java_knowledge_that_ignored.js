exports.ids=[37],exports.modules={266:function(s,n,p){"use strict";Object.defineProperty(n,"__esModule",{value:!0});n.content='<p>本文将一点一滴的累计记录Java中的一些细节知识。不只是加以说明，而是所有的细节都找到来源，以官方文档、知名社区的介绍为主。</p>\n<h2 id="h2-1"><strong>StringTokenizer和String.split</strong></h2>\n<pre class="gradle"><code class="gradle">&nbsp;&nbsp;&nbsp;&nbsp;<span class="code-comment"><span class="code-comment">//Use&nbsp;StringTokenizer&nbsp;</span></span>\n&nbsp;&nbsp;&nbsp;&nbsp;StringTokenizer&nbsp;st&nbsp;=&nbsp;<span class="code-keyword"><span\n            class="code-keyword">new</span></span>&nbsp;StringTokenizer(<span class="code-string"><span\n            class="code-string">"this&nbsp;is&nbsp;a&nbsp;test"</span></span>);\n&nbsp;&nbsp;&nbsp;&nbsp;<span class="code-keyword"><span class="code-keyword">while</span></span>&nbsp;(st.hasMoreTokens())&nbsp;{\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.<span class="code-keyword"><span\n            class="code-keyword">println</span></span>(st.nextToken());\n&nbsp;&nbsp;&nbsp;&nbsp;}</code></pre>\n<pre class="javascript"><code class="javascript">&nbsp;&nbsp;&nbsp;&nbsp;<span class="code-comment"><span\n        class="code-comment">//Use&nbsp;split</span></span>\n&nbsp;&nbsp;&nbsp;&nbsp;<span class="code-built_in"><span class="code-built_in">String</span></span>[]&nbsp;results&nbsp;=&nbsp;<span\n            class="code-string"><span class="code-string">"this&nbsp;is&nbsp;a&nbsp;test"</span></span>.split(<span\n            class="code-string"><span class="code-string">"\\\\s"</span></span>);\n&nbsp;&nbsp;&nbsp;&nbsp;<span class="code-keyword"><span class="code-keyword">for</span></span>&nbsp;(<span\n            class="code-built_in"><span class="code-built_in">String</span></span>&nbsp;result：results){\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.println(result);\n&nbsp;&nbsp;&nbsp;&nbsp;}</code></pre>\n<p></p>\n<p>关于StringTokenizer和String.split的差异说法很多。官方文档<a\n        href="http://docs.oracle.com/javase/6/docs/api/java/util/StringTokenizer.html有定型说明：" rel="nofollow">http://docs.oracle.com/javase/6/docs/api/java/util/StringTokenizer.html</a>&nbsp;有定性说明（附注：最新的JDK8\n    API文档中也是相同的说明）。</p>\n<blockquote>\n    <p><span style="font-size:11px"><span style="font-family:微软雅黑,microsoft yahei">StringTokenizer</span><span\n            style="background-color:rgb(255, 255, 255); font-family:微软雅黑,microsoft yahei">&nbsp;is a legacy class that is retained for compatibility reasons although its use is discouraged in new code. It is recommended that anyone seeking this functionality use the&nbsp;</span><span\n            style="font-family:微软雅黑,microsoft yahei">split</span><span\n            style="background-color:rgb(255, 255, 255); font-family:微软雅黑,microsoft yahei">&nbsp;method of&nbsp;</span><span\n            style="font-family:微软雅黑,microsoft yahei">String</span><span\n            style="background-color:rgb(255, 255, 255); font-family:微软雅黑,microsoft yahei">&nbsp;or the java.util.regex package instead.</span></span>\n    </p>\n</blockquote>\n<p>大意是StringTokenizer是一个历史遗留类，为了保证向后兼容性而保留这个类。推荐在新的代码中使用split或regex替换。</p>\n<p>至于网上的测评资料说<strong>StringTokenizer比<strong>String.split</strong></strong>效率更高，由于没有亲测就不妄加评论了。作为项目管理者，从风险和可靠性的角度考虑，在项目规范和代码review的过程中，还是以官方文档为准。\n</p>\n<h2 id="h2-2"><strong>transient和volatile关键词的使用</strong></h2>\n<pre class="java"><code class="java"><span class="code-keyword"><span class="code-keyword">transient</span></span>&nbsp;<span\n        class="code-keyword"><span class="code-keyword">volatile</span></span>&nbsp;Set&lt;K&gt;&nbsp;keySet&nbsp;=&nbsp;<span\n        class="code-keyword"><span class="code-keyword">null</span></span>;\n<span class="code-keyword"><span class="code-keyword">transient</span></span>&nbsp;<span class="code-keyword"><span\n            class="code-keyword">volatile</span></span>&nbsp;Collection&lt;V&gt;&nbsp;values&nbsp;=&nbsp;<span\n            class="code-keyword"><span class="code-keyword">null</span></span>;</code></pre>\n<p>transient是变量修饰符，表明该字段不是对象持久状态的一部分，储存的时候不用储存，比如序列化这个对象时，该字段是不会储存的。<br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;volatile也是变量修饰符，只能用来修饰变量。volatile修饰的成员变量在每次被线程访问时，都强迫从共享内存中重读该成员变量的值。&nbsp;而且，当成员变量发生变化时，强迫线程将变化值回写到共享内存。这样在任何时刻，两个不同的线程总是看到某个成员变量的同一个值。<br>\n    在此解释一下Java的内存机制：<br>\n    Java使用一个主内存来保存变量当前值，而每个线程则有其独立的工作内存。线程访问变量的时候会将变量的值拷贝到自己的工作内存中，这样，当线程对自己工作内存中的变量进行操作之后，就造成了工作内存中的变量拷贝的值与主内存中的变量值不同。<br>\n    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Java语言规范中指出：为了获得最佳速度，允许线程保存共享成员变量的私有拷贝，而且只当线程进入或者离开同步代码块时才与共享成员变量的原始值对比。这样当多个线程同时与某个对象交互时，就必须要注意到要让线程及时地得到共享成员变量的变化。而volatile关键字就是提示VM：对于这个成员变量不能保存它的私有拷贝，而应直接与共享成员变量交互。<br>\n    使用建议：在两个或者更多的线程访问的成员变量上使用volatile。当要访问的变量已在synchronized代码块中，或者为常量时，不必使用。由于使用volatile屏蔽掉了VM中必要的代码优化，所以在效率上比较低，因此一定在必要时才使用此关键字。\n</p>'}};