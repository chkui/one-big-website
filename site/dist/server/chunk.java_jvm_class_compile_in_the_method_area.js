exports.ids=[54],exports.modules={292:function(s,n,a){"use strict";Object.defineProperty(n,"__esModule",{value:!0});n.content='<h2 id="h2-1">从一个类开始</h2>\n<p>我们从一个简单类开始说起：</p>\n<pre><code class="java"><span class="code-keyword">package</span> example.classLifecicle;\n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n            class="code-title">SimpleClass</span> </span>{\n\t<span class="hljs-function"><span class="code-keyword">public</span> <span class="code-keyword">static</span> <span\n            class="code-keyword">void</span> <span class="code-title">main</span><span class="hljs-params">(String[] args)</span> </span>{\n\t\tSimpleClass ins = <span class="code-keyword">new</span> SimpleClass();\n\t}\n}</code></pre>\n<p>这是一段平凡得不能再平凡的Java代码，稍微有点编程语言入门知识的人都能理解它表达的意思：</p>\n<ol>\n    <li>创建一个名为SimpleClass的类；</li>\n    <li>定义一个入口main方法；</li>\n    <li>在main方法中创建一个SimpleClass类实例；</li>\n    <li>退出。</li>\n</ol>\n\n<h2 id="h2-2">什么是Java bytecode</h2>\n<p>那么这一段代码是怎么在机器（JVM）里运行的呢？在向下介绍之前先说清几个概念。</p>\n<p>首先，Java语言和JVM完全可以看成2个完全不相干的体系。虽然JVM全称叫Java Virtual\n    Machine，最开始也是为了能够实现Java的设计思想而制定开发的。但是时至今日他完全独立于Java语言成为一套生命力更为强悍的体系工具。他有整套规范，根据这个规范它有上百个应用实现，其中包括我们最熟悉的hotspot、jrockit等。还有一些知名的变种版本——harmony和android\n    dalvik，严格意义上变种版本并不能叫java虚拟机，因为其并未按照jvm规范开发，但是从设计思想、API上看又有大量的相似之处。</p>\n<p>其次，JVM并不能理解Java语言，他所理解的是称之为Java bytecode的"语言"。Java\n    bytecode从形式上来说是面向过程的，目前包含130多个指令，他更像可以直接用于CPU计算的一组指令集。所以无论什么语言，最后只要按照规范编译成java\n    bytecode（以下简称为"字节码"）都可以在JVM上运行。这也是scala、groovy、kotlin等各具特色的语言虽然在语法规则上不一致，但是最终都可以在JVM上平稳运行的原因。</p>\n\n<h2 id="h2-3">Java bytecode的规范和存储形式</h2>\n<p>前面代码保存成 <em>.java</em> 文件然后用下面的命令编译过后就可以生成.class字节码了：</p>\n<pre><code class="bash">$ javac SimpleClass.java <span class="code-comment">#SimpleClass.class</span></code></pre>\n<p>字节码是直接使用2进制的方式存储的，每一段数据都定义了具体的作用。下面是<em>SimpleClass.class</em> 的16进制数据（使用<em>vim + xxd</em>打开）：</p>\n<p><img alt="Jvm与字节码——类的方法区模型" height="315"\n        src="https://file.mahoooo.com/res/file/java_jvm_class_compile_in_the_method_area_2.png" width="500"></p>\n<p>一个 <em>.class</em> 文件的字节码分为10个部分：</p>\n<p>0~4字节：文件头，用于表示这是一个<em>Java bytecode</em>文件，值固定为0xCAFEBABE。</p>\n<p>2+2字节：编译器的版本信息。</p>\n<p>2+n字节：常量池信息。</p>\n<p>2字节：入口权限标记。</p>\n<p>2字节：类符号名称。</p>\n<p>2字节：父类符号名称。</p>\n<p>2+n字节：接口。</p>\n<p>2+n字节：域（成员变量）。</p>\n<p>2+n字节：方法。</p>\n<p>2+n字节：属性。</p>\n<p>每个部分的前2个字节都是该部分的标识位。</p>\n<p>本篇的目的是说明字节码的作用以及JVM如何使用字节码运转的，想要详细了解2进制意义的请看这里：http://www.jianshu.com/p/252f381a6bc4。</p>\n\n<h2 id="h2-4">反汇编及字节码解析</h2>\n<p>我们可以使用 <strong><em>javap</em></strong> 命令将字节码反汇编成我们容易阅读的格式化了的指令集编码:</p>\n<pre><code class="bash">$ javap -p SimpleClass.class <span class="code-comment">#查看类和成员</span>\n$ javap -s SimpleClass.class <span class="code-comment">#查看方法签名</span>\n$ javap -c SimpleClass.class <span class="code-comment">#反汇编字节码</span>\n$ javap -v SimpleClass.class <span class="code-comment">#返汇编查看所有信息</span></code></pre>\n<p><strong><em>javap</em></strong> 还有很多的参数，可以使用 <strong><em>javap --help</em></strong> 来了解。下面是使用<strong><em>javap\n    -v</em></strong> 命令输出的内容，输出了常量池信息、方法签名、方法描述、堆栈数量、本地内存等信息：</p>\n<pre><code class="apache"><span class="code-attribute">public</span> class example.classLifecicle.SimpleClass\n  <span class="code-attribute">flags</span>: ACC_PUBLIC, ACC_SUPER\n<span class="code-attribute">Constant</span> pool:\n   <span class="code-comment">#1 = Methodref          #4.#13         // java/lang/Object."&lt;init&gt;":()V</span>\n   <span class="code-comment">#2 = Class              #14            // example/classLifecicle/SimpleClass</span>\n   <span class="code-comment">#3 = Methodref          #2.#13         // example/classLifecicle/SimpleClass."&lt;init&gt;":()V</span>\n   <span class="code-comment">#4 = Class              #15            // java/lang/Object</span>\n   <span class="code-comment">#5 = Utf8               &lt;init&gt;</span>\n   <span class="code-comment">#6 = Utf8               ()V</span>\n   <span class="code-comment">#7 = Utf8               Code</span>\n   <span class="code-comment">#8 = Utf8               LineNumberTable</span>\n   <span class="code-comment">#9 = Utf8               main</span>\n  <span class="code-comment">#10 = Utf8               ([Ljava/lang/String;)V</span>\n  <span class="code-comment">#11 = Utf8               SourceFile</span>\n  <span class="code-comment">#12 = Utf8               SimpleClass.java</span>\n  <span class="code-comment">#13 = NameAndType        #5:#6          // "&lt;init&gt;":()V</span>\n  <span class="code-comment">#14 = Utf8               example/classLifecicle/SimpleClass</span>\n  <span class="code-comment">#15 = Utf8               java/lang/Object</span>\n{\n  <span class="code-attribute">public</span> example.classLifecicle.SimpleClass();\n    <span class="code-attribute">descriptor</span>: ()V\n    <span class="code-attribute">flags</span>: ACC_PUBLIC\n    <span class="code-attribute">Code</span>:\n      <span class="code-attribute">stack</span>=1, locals=1, args_size=1\n         <span class="code-attribute">0</span>: aload_0\n         <span class="code-attribute">1</span>: invokespecial #1                  // Method java/lang/Object.<span\n            class="code-string">"&lt;init&gt;"</span>:()V\n         <span class="code-attribute">4</span>: return\n      <span class="code-attribute">LineNumberTable</span>:\n        <span class="code-attribute">line</span> 3: 0\n\n  <span class="code-attribute">public</span> static void main(java.lang.String[]);\n    <span class="code-attribute">descriptor</span>: ([Ljava/lang/String;)V\n    <span class="code-attribute">flags</span>: ACC_PUBLIC, ACC_STATIC\n    <span class="code-attribute">Code</span>:\n      <span class="code-attribute">stack</span>=2, locals=2, args_size=1\n         <span class="code-attribute">0</span>: new           #2                  // class example/classLifecicle/SimpleClass\n         <span class="code-attribute">3</span>: dup\n         <span class="code-attribute">4</span>: invokespecial #3                  // Method <span class="code-string">"&lt;init&gt;"</span>:()V\n         <span class="code-attribute">7</span>: astore_1\n         <span class="code-attribute">8</span>: return\n      <span class="code-attribute">LineNumberTable</span>:\n        <span class="code-attribute">line</span> 5: 0\n        <span class="code-attribute">line</span> 6: 8\n}\n</code></pre>\n<p>下面是关于字节码格式的描述：</p>\n<p><strong><em>public class example.classLifecicle.SimpleClass</em></strong></p>\n<p>这一段表示这个类的符号。</p>\n<p><em><strong>flags: ACC_PUBLIC, ACC_SUPER</strong></em></p>\n<p>该类的标记。例如是否是public类等等，实际上就是将一些Java关键字转译成对应的Java bytecode。</p>\n<p><em><strong>Constant pool:</strong></em></p>\n<p><em>constant pool:</em> 之后的内容一直到<em> { </em>符号，都是我们所说的"常量池"。在对java类进行编译之后就会产生这个常量池。通常我们所说的类加载，就是加载器将字节码描述的常量信息转换成实际存储在运行时常量池中的一些内存数据（当然每个方法中的指令集也会随之加载到方法指向的某个内存空间中）。\n</p>\n<p>"#1"可以理解为常量的ID。可以把常量池看作一个Table，每一个ID都指向一个常量，而在使用时都直接用"#1"这样的ID来引用常量。</p>\n<p>常量池中的包含了运行这个类中方法所有需要用到的所有常量信息，Methodref、Class、Utf8、NameAndType等表示常量的类型，后面跟随的参数表示这个常量的引用位置或者数值。</p>\n<p><em><strong>{}:</strong></em></p>\n<p>常量池之后的{}之间是方法。每一个方法分为符号（名称）、标记、描述以及指令集。descriptor：描述。flags：入口权限标记。Code：指令集。</p>\n<p>Code中，stack表示这一段指令集堆栈的最大深度, locals表示本地存储的最大个数, args_size表述传入参数的个数。</p>\n\n<h2 id="h2-5">字节码如何驱动机器运行</h2>\n<p>\n    在往下说之前，先说下JVM方法区的内容。方法区顾名思义就是存储各种方法的地方。但是从实际应用来看，以Hotspot为例——方法区在实现时通常分为class常量池、运行常量池。在大部分书籍中，运行时常量池被描述为包括类、方法的所有描述信息以及常量数据,（<a\n        href="https://www.chkui.com/article/java/java_jvm_method_area_and_constant_pool" rel="nofollow">详情请看这篇文章</a>。</p>\n<p>对于机器来说并不存在什么类的感念的。到了硬件层面，他所能了解的内容就是：1）我要计算什么（cpu），2）我要存储什么（缓存、主存、磁盘等，我们统称内存）？</p>\n<p>\n    按照分层模型来说JVM只是一个应用进程，是不可能直接和机器打交道的（这话也不是绝对的，有些虚拟机还真直接当作操作系统在特有硬件设备上用）。在JVM到硬件之间还隔着一层操作系统，在本地运行时是直接调用操作系统接口的（windows和linux都是C/C++）。不过为了JVM虚拟机更高效，字节码设计为更接近机器逻辑行为的方式来运行。不然也没必要弄一个字节码来转译Java语言，像nodejs用的V8引擎那样实时编译Javascript不是更直接？这也是过去C/C++唾弃Java效率低下，到了如今Java反而去吐槽其他解释型编译环境跑得慢的原因（不过这也不见得100%正确。比如某些情况下Java在JVM上处理JSON不见得比JavaScript在nodejs上快，而且写起代码来也挺费劲的）。</p>\n<p>\n    我们回到硬件计算和存储的问题。CPU的计算过程实质上就是操作系统的线程不断给CPU传递指令集。线程就像传送带一样，把一系列指令排好队然后一个一个交给CPU去处理。每一个指令告诉CPU干一件事，而干事的前后总得有个依据（输入）和结果（输出），这就是各种缓存、内存、磁盘的作用——提供依据、保存结果。JVM线程和操作系统线程是映射关系（mapping），而JVM的堆（heap）和非堆（Non-heap）就是一个内存管理的模型。所以我们跳出分层的概念，将字节码理解为直接在驱动cpu和内存运行的汇编码更容易理解。</p>\n<p>最后，我们回到方法区（Method\n    Area）这个规范概念。CPU只关心一堆指令，而JVM中所有的指令都是放置在方法区中的。JVM的首要任务是把这些指令有序的组织起来，按照编程好的逻辑将指令一个一个交给CPU去运行。而CPU都是靠线程来组织指令运算的，所以JVM中每个线程都有一个线程栈，通过他将指令组织起来一个一个的交给CPU去运算——这就是计数器（Counter\n    Register，用以指示当前应该执行什么字节码指令）、线程栈（Stacks，线程的运算模型——先进后出） 和 栈帧（Stacks\n    Frame，方法执行的本地变量）&nbsp;的概念。所以无论多复杂的设计，方法区可以简单的理解为：<strong>有序的将指令集组织起来，并在使用的时候可以通过某些方法找到对应的指令集合</strong>。</p>\n<p><strong>解析常量池</strong></p>\n<p><img alt="Jvm与字节码——类的方法区模型" height="339"\n        src="https://file.mahoooo.com/res/file/java_jvm_class_compile_in_the_method_area_1.png" width="563"></p>\n<p>先看 <em><strong>SimpleClass</strong></em>&nbsp;字节码中常量池中的一些数据，上图中每一个方框表示一个常量。方框中第一行的 <em><strong>#1</strong></em>\n    表示当前常量的ID，第二行 <strong><em>Methodref</em></strong> 表示这个这个常量的类型，第三行 <em><strong>#4,#13</strong></em> 表示常量的值。</p>\n<p>我们从 <em><strong>#1</strong></em> 开始跟着每个常量的值向下延伸可以展开一根以 <strong><em>Utf8</em></strong>&nbsp;类型作为叶节点的树，每一个叶节点都是一个值。所有的方法我们都可以通过树的方式展开得到下面的查询字段：\n</p>\n<pre><code class="apache"><span class="code-attribute">class</span> = java/lang/Object //属于哪个类\n<span class="code-attribute">method</span> = <span class="code-string">"&lt;init&gt;"</span> //方法名称\n<span class="code-attribute">params</span> = NaN //参数\n<span class="code-attribute">return</span> = V //返回类型</code></pre>\n<p>所有的方法都会以 <em><strong>package.class.name:(params)return&nbsp;</strong></em>的形式存储在方法区中，通过上面的参数很快可以定位到方法，例如&nbsp; <em>java.lang.Object."&lt;init&gt;":()V</em>，这里"&lt;init&gt;"是构造方法专用的名称。\n</p>\n<p><strong>解析方法中的指令集</strong></p>\n<p>方法除了用于定位的标识符外就是指令集，下面解析main方法的指令集：</p>\n<pre><code class="http"><span class="code-attribute">0</span>: new &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; #2 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;// class example/classLifecicle/SimpleClass\n<span class="code-attribute">3</span>: dup\n<span class="code-attribute">4</span>: invokespecial #3 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;// Method "&lt;init&gt;":()V\n<span class="code-attribute">7</span>: astore_1\n<span class="code-attribute">8</span>: return</code></pre>\n<p>1)）new 表示新建一个ID为#2的对象即SimpleClass(#2-&gt;#15="<em><strong>example/classLifecicle/SimpleClass"</strong></em>)。此时JVM会在堆上创建一个能放置<strong><em>SimpleClass</em></strong>类的空间并将引用地址返回写到栈顶。这里仅仅完成在堆中分配空间，没执行初始化。\n</p>\n<p>2）dup表示复制栈顶数据。此时栈中有2个指向同一内存区域的<em><strong>SimpleClass</strong></em>引用。</p>\n<p>3）invokespecial\n    #3表示执行#3的方法。通过解析常量池#3就是<em><strong>SimpleClass</strong></em>的构造方法。此后会将<em><strong>SimpleClass</strong></em>构造方法中的指令压入栈中执行。\n</p>\n<p>4）接下来来是<em><strong>SimpleClass</strong></em>的构造方法部分： a）aload_0 表示将本地内存的第一个数据压入栈顶，本地内存的第一个数据就是this。b）invokespecial #1\n    表示执行 <em><strong>Object</strong></em> 的构造方法。c）退出方法。这样就完成了实例的构造过程。</p>\n<p>5）完成上述步骤后，线程栈上还剩下一个指向<em><strong>SimpleClass</strong></em>实例的引用，astore_1 表示将引用存入本地缓存第二个位置。</p>\n<p>6）return -&gt; 退出 <em>main</em> 方法。</p>\n\n<h2 id="h2-6">方法区结构</h2>\n<p><strong>那么在方法区中所有的类是如何组织存放的呢？</strong></p>\n<p>我们用一个关系型数据库常的结构就可以解释他。在数据库中我们常用的对象有3个——表、字段、数据。每一个类对应的字节码我们都可以看成会生成2张数据库表——常量池表、方法表。通过字节码的解析，在内存中产生了如下结构的表：</p>\n<p>常量池表:example.classLifecicle.SimpleClass_Constant</p>\n<table border="1" cellpadding="1" cellspacing="1" style="width:500px">\n    <tbody>\n    <tr>\n        <td><strong><em>id</em></strong></td>\n        <td><strong><em>type</em></strong></td>\n        <td><strong><em>value</em></strong></td>\n    </tr>\n    <tr>\n        <td>#1</td>\n        <td>Methodref</td>\n        <td>#4,#13</td>\n    </tr>\n    <tr>\n        <td>…</td>\n        <td>……</td>\n        <td>……</td>\n    </tr>\n    <tr>\n        <td>#4</td>\n        <td>Class</td>\n        <td>#15</td>\n    </tr>\n    <tr>\n        <td>#15</td>\n        <td>Utf8</td>\n        <td>java/lang/Object</td>\n    </tr>\n    </tbody>\n</table>\n<p>方法表:example.classLifecicle.SimpleClass_Method</p>\n<table border="1" cellpadding="1" cellspacing="1" style="width:500px">\n    <tbody>\n    <tr>\n        <td>name</td>\n        <td>params</td>\n        <td>return</td>\n        <td>flag</td>\n        <td>code</td>\n    </tr>\n    <tr>\n        <td>&lt;init&gt;</td>\n        <td>&nbsp; &nbsp; NaN</td>\n        <td>V</td>\n        <td>static,public</td>\n        <td>……</td>\n    </tr>\n    <tr>\n        <td>…&nbsp;</td>\n        <td>……</td>\n        <td>……</td>\n        <td>……</td>\n        <td>……</td>\n    </tr>\n    </tbody>\n</table>\n<p>然后在运行过程中当计数器遇到&nbsp;<strong><em>invokespecial #3</em></strong>&nbsp;这样的指令时就会根据指令后面的ID去本类的常量表中查询并组装数据。当组装出&nbsp;class\n    = java/lang/Object、method = "&lt;init&gt;"、params = NaN、return = V这样的数据后，就会去名为java.lang.Object的表中根据&nbsp;<em>method、params、return&nbsp;</em>字段的数据查询对应的code，找到后为该code创建一个本地内存，随后线程计数器逐个执行code中的指令。\n</p>\n<p>这里仅仅用关系型数据库表的概念来解释方法区中如何将指令执行和字节码对应起来，真正的JVM运行方式比这复杂得多。不过这样很容易理解方法区到底是怎么一回事。</p>'}};