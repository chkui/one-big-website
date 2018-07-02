webpackJsonp([10],{316:function(s,n,a){"use strict";Object.defineProperty(n,"__esModule",{value:!0});n.content='<h2 id="h2-1">分区规范</h2>\n<p>首先要明确，JVM规范中并没有常量池这一说法，都是各种不同的jvm实现为了便于处理加以区分的。在JVM规范中统一称呼为方法区（JDK7之后这样说也不准确，有些数据常量数据又迁移到堆中）。下面的常量池主要以Java8自带的HotSpot为例，其他版本的Jvm会有各种区别。在HotSpot中，JDK6之前的版本所有常量池都在永生代（permanent generation）中，而JDK8取消了永生带用元空间（metaspace）替换，可以简单的理解常量池被移动到元空间中了（但实际处理还是有很多差异，大部分以前放置在永生代数据被迁移到堆中，而元数据区仅存放引用。但是这样说便于理解）。JDK7是一个过渡版本，只是将字符串移动到堆中。</p>\n\n<h2 id="h2-2">class常量池</h2>\n<p>当 .java文件被<span style="color:#FF0000">转译</span>成.class文件之后的字节码中包含一系列描述信息、符号引用和字面量信息。在jvm启动时，这些信息会被加载到class常量池中，当一个类要被<span style="color:#FF0000">编译</span>加载之前这些符号和字符串会经过JVM的加载器将其实例化成为一个常量值（Class对象的实例）存在在运行时常量区。所谓的class常量池并不会真的需要分配一个内存空间（常量池），直接从本地磁盘上加载转换也是可行的，这主要取决与JVM的版本和一些参数的配置处理。</p>\n\n<h2 id="h2-3">运行时常量池</h2>\n<p>运行时常量池（Runtime Constant Pool）主要用于存放jvm在运行时所有静态量。参考"深入理解java虚拟机"一书2.2.6对其的描述：运行时常量池是方法区的一部分。class文件中除了有类的版本、字段、方法、接口等描述信息外，还有一项信息是<strong>常量池表</strong>（Constant Pool Tabel），用于存放编译期生成的各种字面量和符号引用，这部分内容将在类加载后进入该常量池。运行时常量池并不仅仅局限于加载类时产生常量，与<strong>class常量池</strong>的区别是可以在运行期间添加各种数据到这个区域，例如jvm会将代码中直接声明的字符串放置到常量池中，这些字符串被称为字面量。通过<em>String::intern</em> 也可以向常量池表添加新的字面量。</p>\n\n<h2 id="h2-4">代码与字节码案例</h2>\n<p>下面通过一些例子来加深堆常量池的理解。</p>\n<p>字面量定义变量值：</p>\n<pre><code class="java"><span class="code-comment">//会直接在常量池中生成一个字符串常量，并将str1的引用（指针）指向它。</span>\nString str1 = <span class="code-string">"myString"</span>;\nString str2 = <span class="code-string">"myString"</span>;\n<span class="code-comment">//都是指向常量池的同一地址，所以这里输出为true;</span>\nSystem.out.println(str1 == str2);</code></pre>\n<p>与字符串相比，数字处理的情况就比较有趣了。先看一个单纯的例子：</p>\n<pre><code class="java">Integer num1 = <span class="hljs-number">127</span>;\nInteger num2 = <span class="hljs-number">127</span>;\nInteger num3 = <span class="hljs-number">128</span>;\nInteger num4 = <span class="hljs-number">128</span>;\nSystem.out.println(num1 == num2);<span class="code-comment">//TRUE</span>\nSystem.out.println(num3 == num4);<span class="code-comment">//FALSE</span></code></pre>\n<p>第一个对比输出为true，而第二个输出为false。这就是10次Java笔试9次都会遇到的Integer 预设-128~127对象的问题——为了循环、迭代等等常见处理不反复创建新的区域来存储值，Jvm预设了部分Integer整数值，无论哪申请这些值，都指定到固定的常量地址。</p>\n<p>再来看一个有意思的例子：</p>\n<pre><code class="java"><span class="code-keyword">int</span> i = <span class="hljs-number">128</span>;\nInteger I1 = <span class="hljs-number">128</span>;\nInteger I2 = <span class="hljs-number">128</span>;\nSystem.out.println(I1 == I2);<span class="code-comment">//false</span>\nSystem.out.println(I1 == i);<span class="code-comment">//true</span>\nSystem.out.println(I2 == i);<span class="code-comment">//true</span></code></pre>\n<p>输出的结果主要受到Java5之后装箱和拆箱的机制影响。</p>\n<blockquote>\n    <p>字节码解释说明：</p>\n    <p>在每一个字节码指令之后都会有注解说明。每一行注解包括2部分内容，1是指令进行的操作描述，2是操作之后的结果。2部分用;号分割。</p>\n    <p>操作结果中S代表<strong>stack</strong>——线程栈，L代表<strong>local</strong>——本地存储。I(128)表示类型为Integer值为128的引用。"string"标示一个常量，S("string")表示类型为String值为"string"的堆数据。例如，S=[I(128)],L=[128]标示线程栈中存在一个值为128的Integer类型引用，而缓存的L[0]位置存放了值为128的整数。</p>\n    <p>缓存的下标从1开始，因为0位置已经留给了this。</p>\n    <p>用于存放指令集运算结果的本地存储我们通称为缓存。</p>\n</blockquote>\n<p>首先，在Java5之前，是不能这样写的。Java5之后有了装箱机制，这样的语句实际上执行的是 <em>Integer I1 =&nbsp;Integer.valueOf(128)</em>。所以变量I1和I2是指向2个实例的引用地址，因此 "I1==I2"是false很好理解。那么另外2个==为什么是true呢。看下面的Java代码和对应的字节码：</p>\n<pre><code class="java"><span class="code-keyword">int</span> slot1 = <span class="hljs-number">128</span>;\nInteger slot2 = <span class="hljs-number">128</span>;\nSystem.out.println(slot1 == slot2);</code></pre>\n<p>对应的字节码是：&nbsp;</p>\n<pre><code class="apache"> <span class="code-attribute">0</span>: sipush        128 //128压栈;S=[128],L=[]\n <span class="code-attribute">3</span>: istore_1          //128出栈,写入缓存;S=[],L=[128]\n <span class="code-attribute">4</span>: sipush        128 //128压栈;S=[128],L=[128]\n <span class="code-attribute">7</span>: invokestatic  #16 //128出栈,执行I.valueOf(128)结果入栈;S=[I(128)],L=[128]\n<span class="code-attribute">10</span>: astore_2          //I(128)出栈写入缓存。S=[],L=[128,I(128)]\n<span class="code-attribute">11</span>: getstatic     #22 //从常量池读取PrintStream压栈;S=[PrintStream],L=[128,I(128)]\n<span class="code-attribute">14</span>: aload_2           //缓存数据[2]压栈；S=[I(128),PrintStream],L=[128,I(128)]\n<span class="code-attribute">15</span>: invokevirtual #28 //I(128)出栈，执行I.intValue结果入栈;S=[128,PrintStream],L=[128,I(128)]\n<span class="code-attribute">18</span>: iload_1           //缓存数据[1]压栈；S=[128,128,PrintStream],L=[128,I(128)]\n<span class="code-attribute">19</span>: if_icmpne     26  //S[0]和S[1]出栈使用if_icmpne数值对比。S=[PrintStream],L=[128,I(128)]\n<span class="code-attribute">22</span>: iconst_1          //将整数1压入栈;S=[1,PrintStream],L=[128,I(128)]\n<span class="code-attribute">23</span>: goto          27  //跳转到27行\n<span class="code-attribute">26</span>: iconst_0          //将整数0压入栈;S=[0,PrintStream],L=[128,I(128)]\n<span class="code-attribute">27</span>: invokevirtual #32 //S[0]和S[1]出栈使用println输出;S=[],L=[128,I(128)]\n<span class="code-attribute">30</span>: return            \n</code></pre>\n<p>核心在4~10行装箱，将一个128整数转换成一个Integer的引用，数据存储在堆中。然后在14～19行拆箱，将堆中的Integer数据转换成一个int整数，然后再用int整数和int整数进行==比较（if_icmpne）。所以比较之后会输出true。</p>\n<p>接下来是一个解释class常量池和常量池的例子。</p>\n<p>Java代码：</p>\n<pre><code class="java">String slot1 = <span class="code-string">"myString"</span>;\nString slot2 = <span class="code-keyword">new</span> String(<span class="code-string">"myString"</span>);\nSystem.out.println(slot1 == slot2); <span class="code-comment">//FALSE</span></code></pre>\n<p>"myString"这样的字符串，在类加载编译字节码时（从class常量池转变成运行时的常量池）就会生成一个常量并放置在常量池中，随后所有使用到这个字符串的位置，都是直接从常量池引用。下面是对应的字节码：</p>\n<pre><code class="apache"> <span class="code-attribute">0</span>: ldc           #16 //常量池读取<span class="code-string">"myString"</span>压栈;S=[<span class="code-string">"myString"</span>],L=[]\n <span class="code-attribute">2</span>: astore_1          //写入本地缓存;S=[],L=[<span class="code-string">"myString"</span>]\n <span class="code-attribute">3</span>: new           #18 //堆中创建一个String实例压栈;S=[S()],L=[<span class="code-string">"myString"</span>]\n <span class="code-attribute">6</span>: dup               //复制栈顶;S=[S(),S()],L=[<span class="code-string">"myString"</span>]\n <span class="code-attribute">7</span>: ldc           #16 //常量池读取<span class="code-string">"myString"</span>压栈;S=[<span class="code-string">"myString"</span>,S(),S()],L=[<span class="code-string">"myString"</span>]\n <span class="code-attribute">9</span>: invokespecial #20 //弹出S[0,1]作为参数使用init初始化;S=[S(<span class="code-string">"myString"</span>)],L=[<span class="code-string">"myString"</span>]\n<span class="code-attribute">12</span>: astore_2          //弹出栈顶写入缓存[2];S=[],L=[<span class="code-string">"myString"</span>,S(<span class="code-string">"myString"</span>)]\n<span class="code-attribute">13</span>: getstatic     #23 //获取输出常量;S=[PrintStream],L=[<span class="code-string">"myString"</span>,S(<span class="code-string">"myString"</span>)]\n<span class="code-attribute">16</span>: aload_1           //缓存[1]入栈;S=[<span class="code-string">"myString"</span>,PrintStream],L=[<span class="code-string">"myString"</span>,S(<span class="code-string">"myString"</span>)]\n<span class="code-attribute">17</span>: aload_2           //缓存[2]入栈;S=[S(<span class="code-string">"myString"</span>),<span class="code-string">"myString"</span>,PrintStream],L=[<span class="code-string">"myString"</span>,S(<span class="code-string">"myString"</span>)]\n<span class="code-attribute">18</span>: if_acmpne     25  //弹出S[0,1]比较;S=[PrintStream],L=[<span class="code-string">"myString"</span>,S(<span class="code-string">"myString"</span>)]\n<span class="code-attribute">21</span>: iconst_1          //整数1压栈;S=[1,PrintStream],L=[<span class="code-string">"myString"</span>,S(<span class="code-string">"myString"</span>)]\n<span class="code-attribute">22</span>: goto          26  //跳转26\n<span class="code-attribute">25</span>: iconst_0          //整数0压栈;S=[0,PrintStream],L=[<span class="code-string">"myString"</span>,S(<span class="code-string">"myString"</span>)]\n<span class="code-attribute">26</span>: invokevirtual #29 //弹出S[0,1]执行输出;S=[],L=[<span class="code-string">"myString"</span>,S(<span class="code-string">"myString"</span>)]\n<span class="code-attribute">29</span>: return\n</code></pre>\n<p>Java字节码中的ldc标示从常量池获取一个引用入栈，例子将常量池的引用#16压入栈，然后astore_1将#16写到本地存储[1]位置。所以slot1 = "myString"意味着slot1指向了常量池存放"myString"的位置。</p>\n<p>3~12行完成slot2 = new String("myString")的过程：3行，new指令先在栈上创建了一个指向一个String实例堆空间的引用；6行，在栈顶复制这个引用；7行，从常量池读取"myString"这个常量的引用；9行，弹出栈顶的"myString"引用作为执行String.init方法的参数，执行完都会更新堆中的数据；12）将栈顶dup指令复制出的引用弹出并写入本地存储[2]位置。此时slot2引用了堆空间中的一个String实例。所以slot1==slot2操作（if_acmpne）肯定返回false。</p>\n<p>这个例子揭开了一个Java基础问题的答案——String s = new String("String")是创建了2个字符串还是一个？我觉得回答1个或者2个都说得过去，字面常量"String"在加载期已经创建到常量池中了，然后在运行期执行这段代码时，只是从常量池ldc到栈上然后使用它在堆中创建一个新的String实例。从运行期看，确实这个时候只创建了一个实例，但是从整个JVM来看，确实存在2个地址都有"String"的字符串。其实这个问题扩展一下来聊更有价值：</p>\n<pre><code class="java"><span class="code-keyword">package</span> example;\n\n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span class="code-title">StringExample</span> </span>{\n\t<span class="code-keyword">final</span> <span class="code-keyword">static</span> String static1 = <span class="code-string">"myString"</span>;\n\t<span class="hljs-function"><span class="code-keyword">public</span> <span class="code-keyword">static</span> <span class="code-keyword">void</span> <span class="code-title">main</span><span class="hljs-params">(String[] args)</span> </span>{\n\t\tString slot1 = static1;\n\t\tString slot2 = <span class="code-string">"my"</span> + <span class="code-string">"String"</span>;\n\t\tString slot3 = <span class="code-keyword">new</span> String(static1);\n\t\tString slot4 = <span class="code-keyword">new</span> String(<span class="code-string">"myString"</span>);\n\t\tString slot5 = <span class="code-keyword">new</span> String(slot1);\n\t}\n}</code></pre>\n<p>问题是这个main方法运行后在整个JVM内存中创建了几个"myString"？先看了字节码再给答案。</p>\n<pre><code class="apache"><span class="code-attribute">public</span> class string.StringExample {\n  <span class="code-attribute">static</span> final java.lang.String static1; //static签名\n\n  <span class="code-attribute">public</span> string.StringExample();\n    <span class="code-attribute">Code</span>:                    //构造方法\n       <span class="code-attribute">0</span>: aload_0            //读取本地存储[0]压入栈\n       <span class="code-attribute">1</span>: invokespecial #13  //弹出栈顶引用执行Object.init方法\n       <span class="code-attribute">4</span>: return\n\n  <span class="code-attribute">public</span> static void main(java.lang.String[]); //main方法\n    <span class="code-attribute">Code</span>:\n       <span class="code-attribute">0</span>: ldc           #8   //从常量池读引用#8(<span class="code-string">"myString"</span>)压入栈\n       <span class="code-attribute">2</span>: astore_1           //弹出栈顶引用写入本地内存[1],即slot1=static1\n       <span class="code-attribute">3</span>: ldc           #8   //从常量池读#8(<span class="code-string">"myString"</span>)压入栈\n       <span class="code-attribute">5</span>: astore_2           //弹出栈顶引用写入本地内存[2],即slot2=<span class="code-string">"my"</span>+<span class="code-string">"String"</span>\n       <span class="code-attribute">6</span>: new           #21  //在堆中创建一个String实例并将引用压入栈\n       <span class="code-attribute">9</span>: dup                //复制栈顶元素\n      <span class="code-attribute">10</span>: ldc           #8   //从常量池读#8(<span class="code-string">"myString"</span>)压入栈\n      <span class="code-attribute">12</span>: invokespecial #23  //弹出栈顶引用，使用String.init方法初始化堆   \n      <span class="code-attribute">15</span>: astore_3           //弹出栈顶堆引用写入本地存储[3]\n      <span class="code-attribute">16</span>: new           #21  //16～25行执行过错和6～15行一样               \n      <span class="code-attribute">19</span>: dup\n      <span class="code-attribute">20</span>: ldc           #8                  \n      <span class="code-attribute">22</span>: invokespecial #23  \n      <span class="code-attribute">25</span>: astore        4    //栈顶元素写入本地存储[4]\n      <span class="code-attribute">27</span>: new           #21  //与16～15行一致               \n      <span class="code-attribute">30</span>: dup\n      <span class="code-attribute">31</span>: aload_1            //区别在31行是从本地存储[1]的位置读取数据，而[1]引用#8(<span class="code-string">"myString"</span>)\n      <span class="code-attribute">32</span>: invokespecial #23  \n      <span class="code-attribute">35</span>: astore        5    //栈顶元素写入本地存储[5]\n      <span class="code-attribute">37</span>: return\n}\n</code></pre>\n<p>如果看明白了字节码，这个答案就很清晰了，整个JVM一共三个值等于"myString"的字符串，即创建了3个字符串。</p>\n<p>首先，在java代码编译成字节码时，static关键字定义的常量会直接替换为字面量放置在class常量池，所以例子中&nbsp;<em>String slot3 = new String(static1)</em> 这样的写法等于&nbsp;<em>String slot3 = new String("myString") </em>。</p>\n<p>其次，常量池值只有#8的引用值为"myString"的字面量，所以在声明字符串时"my"+"String"这样的写法并不会额外生成多的字符串，编译器会直接合并为"myString"。</p>'},317:function(s,n,a){"use strict";Object.defineProperty(n,"__esModule",{value:!0});n.content='<h2 id="h2-1">从一个类开始</h2>\n<p>我们从一个简单类开始说起：</p>\n<pre><code class="java"><span class="code-keyword">package</span> example.classLifecicle;\n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n            class="code-title">SimpleClass</span> </span>{\n\t<span class="hljs-function"><span class="code-keyword">public</span> <span class="code-keyword">static</span> <span\n            class="code-keyword">void</span> <span class="code-title">main</span><span class="hljs-params">(String[] args)</span> </span>{\n\t\tSimpleClass ins = <span class="code-keyword">new</span> SimpleClass();\n\t}\n}</code></pre>\n<p>这是一段平凡得不能再平凡的Java代码，稍微有点编程语言入门知识的人都能理解它表达的意思：</p>\n<ol>\n    <li>创建一个名为SimpleClass的类；</li>\n    <li>定义一个入口main方法；</li>\n    <li>在main方法中创建一个SimpleClass类实例；</li>\n    <li>退出。</li>\n</ol>\n\n<h2 id="h2-2">什么是Java bytecode</h2>\n<p>那么这一段代码是怎么在机器（JVM）里运行的呢？在向下介绍之前先说清几个概念。</p>\n<p>首先，Java语言和JVM完全可以看成2个完全不相干的体系。虽然JVM全称叫Java Virtual\n    Machine，最开始也是为了能够实现Java的设计思想而制定开发的。但是时至今日他完全独立于Java语言成为一套生命力更为强悍的体系工具。他有整套规范，根据这个规范它有上百个应用实现，其中包括我们最熟悉的hotspot、jrockit等。还有一些知名的变种版本——harmony和android\n    dalvik，严格意义上变种版本并不能叫java虚拟机，因为其并未按照jvm规范开发，但是从设计思想、API上看又有大量的相似之处。</p>\n<p>其次，JVM并不能理解Java语言，他所理解的是称之为Java bytecode的"语言"。Java\n    bytecode从形式上来说是面向过程的，目前包含130多个指令，他更像可以直接用于CPU计算的一组指令集。所以无论什么语言，最后只要按照规范编译成java\n    bytecode（以下简称为"字节码"）都可以在JVM上运行。这也是scala、groovy、kotlin等各具特色的语言虽然在语法规则上不一致，但是最终都可以在JVM上平稳运行的原因。</p>\n\n<h2 id="h2-3">Java bytecode的规范和存储形式</h2>\n<p>前面代码保存成 <em>.java</em> 文件然后用下面的命令编译过后就可以生成.class字节码了：</p>\n<pre><code class="bash">$ javac SimpleClass.java <span class="code-comment">#SimpleClass.class</span></code></pre>\n<p>字节码是直接使用2进制的方式存储的，每一段数据都定义了具体的作用。下面是<em>SimpleClass.class</em> 的16进制数据（使用<em>vim + xxd</em>打开）：</p>\n<p><img alt="Jvm与字节码——类的方法区模型" height="315"\n        src="https://file.mahoooo.com/res/file/java_jvm_class_compile_in_the_method_area_2.png" width="500"></p>\n<p>一个 <em>.class</em> 文件的字节码分为10个部分：</p>\n<p>0~4字节：文件头，用于表示这是一个<em>Java bytecode</em>文件，值固定为0xCAFEBABE。</p>\n<p>2+2字节：编译器的版本信息。</p>\n<p>2+n字节：常量池信息。</p>\n<p>2字节：入口权限标记。</p>\n<p>2字节：类符号名称。</p>\n<p>2字节：父类符号名称。</p>\n<p>2+n字节：接口。</p>\n<p>2+n字节：域（成员变量）。</p>\n<p>2+n字节：方法。</p>\n<p>2+n字节：属性。</p>\n<p>每个部分的前2个字节都是该部分的标识位。</p>\n<p>本篇的目的是说明字节码的作用以及JVM如何使用字节码运转的，想要详细了解2进制意义的请看这里：http://www.jianshu.com/p/252f381a6bc4。</p>\n\n<h2 id="h2-4">反汇编及字节码解析</h2>\n<p>我们可以使用 <strong><em>javap</em></strong> 命令将字节码反汇编成我们容易阅读的格式化了的指令集编码:</p>\n<pre><code class="bash">$ javap -p SimpleClass.class <span class="code-comment">#查看类和成员</span>\n$ javap -s SimpleClass.class <span class="code-comment">#查看方法签名</span>\n$ javap -c SimpleClass.class <span class="code-comment">#反汇编字节码</span>\n$ javap -v SimpleClass.class <span class="code-comment">#返汇编查看所有信息</span></code></pre>\n<p><strong><em>javap</em></strong> 还有很多的参数，可以使用 <strong><em>javap --help</em></strong> 来了解。下面是使用<strong><em>javap\n    -v</em></strong> 命令输出的内容，输出了常量池信息、方法签名、方法描述、堆栈数量、本地内存等信息：</p>\n<pre><code class="apache"><span class="code-attribute">public</span> class example.classLifecicle.SimpleClass\n  <span class="code-attribute">flags</span>: ACC_PUBLIC, ACC_SUPER\n<span class="code-attribute">Constant</span> pool:\n   <span class="code-comment">#1 = Methodref          #4.#13         // java/lang/Object."&lt;init&gt;":()V</span>\n   <span class="code-comment">#2 = Class              #14            // example/classLifecicle/SimpleClass</span>\n   <span class="code-comment">#3 = Methodref          #2.#13         // example/classLifecicle/SimpleClass."&lt;init&gt;":()V</span>\n   <span class="code-comment">#4 = Class              #15            // java/lang/Object</span>\n   <span class="code-comment">#5 = Utf8               &lt;init&gt;</span>\n   <span class="code-comment">#6 = Utf8               ()V</span>\n   <span class="code-comment">#7 = Utf8               Code</span>\n   <span class="code-comment">#8 = Utf8               LineNumberTable</span>\n   <span class="code-comment">#9 = Utf8               main</span>\n  <span class="code-comment">#10 = Utf8               ([Ljava/lang/String;)V</span>\n  <span class="code-comment">#11 = Utf8               SourceFile</span>\n  <span class="code-comment">#12 = Utf8               SimpleClass.java</span>\n  <span class="code-comment">#13 = NameAndType        #5:#6          // "&lt;init&gt;":()V</span>\n  <span class="code-comment">#14 = Utf8               example/classLifecicle/SimpleClass</span>\n  <span class="code-comment">#15 = Utf8               java/lang/Object</span>\n{\n  <span class="code-attribute">public</span> example.classLifecicle.SimpleClass();\n    <span class="code-attribute">descriptor</span>: ()V\n    <span class="code-attribute">flags</span>: ACC_PUBLIC\n    <span class="code-attribute">Code</span>:\n      <span class="code-attribute">stack</span>=1, locals=1, args_size=1\n         <span class="code-attribute">0</span>: aload_0\n         <span class="code-attribute">1</span>: invokespecial #1                  // Method java/lang/Object.<span\n            class="code-string">"&lt;init&gt;"</span>:()V\n         <span class="code-attribute">4</span>: return\n      <span class="code-attribute">LineNumberTable</span>:\n        <span class="code-attribute">line</span> 3: 0\n\n  <span class="code-attribute">public</span> static void main(java.lang.String[]);\n    <span class="code-attribute">descriptor</span>: ([Ljava/lang/String;)V\n    <span class="code-attribute">flags</span>: ACC_PUBLIC, ACC_STATIC\n    <span class="code-attribute">Code</span>:\n      <span class="code-attribute">stack</span>=2, locals=2, args_size=1\n         <span class="code-attribute">0</span>: new           #2                  // class example/classLifecicle/SimpleClass\n         <span class="code-attribute">3</span>: dup\n         <span class="code-attribute">4</span>: invokespecial #3                  // Method <span class="code-string">"&lt;init&gt;"</span>:()V\n         <span class="code-attribute">7</span>: astore_1\n         <span class="code-attribute">8</span>: return\n      <span class="code-attribute">LineNumberTable</span>:\n        <span class="code-attribute">line</span> 5: 0\n        <span class="code-attribute">line</span> 6: 8\n}\n</code></pre>\n<p>下面是关于字节码格式的描述：</p>\n<p><strong><em>public class example.classLifecicle.SimpleClass</em></strong></p>\n<p>这一段表示这个类的符号。</p>\n<p><em><strong>flags: ACC_PUBLIC, ACC_SUPER</strong></em></p>\n<p>该类的标记。例如是否是public类等等，实际上就是将一些Java关键字转译成对应的Java bytecode。</p>\n<p><em><strong>Constant pool:</strong></em></p>\n<p><em>constant pool:</em> 之后的内容一直到<em> { </em>符号，都是我们所说的"常量池"。在对java类进行编译之后就会产生这个常量池。通常我们所说的类加载，就是加载器将字节码描述的常量信息转换成实际存储在运行时常量池中的一些内存数据（当然每个方法中的指令集也会随之加载到方法指向的某个内存空间中）。\n</p>\n<p>"#1"可以理解为常量的ID。可以把常量池看作一个Table，每一个ID都指向一个常量，而在使用时都直接用"#1"这样的ID来引用常量。</p>\n<p>常量池中的包含了运行这个类中方法所有需要用到的所有常量信息，Methodref、Class、Utf8、NameAndType等表示常量的类型，后面跟随的参数表示这个常量的引用位置或者数值。</p>\n<p><em><strong>{}:</strong></em></p>\n<p>常量池之后的{}之间是方法。每一个方法分为符号（名称）、标记、描述以及指令集。descriptor：描述。flags：入口权限标记。Code：指令集。</p>\n<p>Code中，stack表示这一段指令集堆栈的最大深度, locals表示本地存储的最大个数, args_size表述传入参数的个数。</p>\n\n<h2 id="h2-5">字节码如何驱动机器运行</h2>\n<p>\n    在往下说之前，先说下JVM方法区的内容。方法区顾名思义就是存储各种方法的地方。但是从实际应用来看，以Hotspot为例——方法区在实现时通常分为class常量池、运行常量池。在大部分书籍中，运行时常量池被描述为包括类、方法的所有描述信息以及常量数据,（<a\n        href="https://www.chkui.com/article/java/java_jvm_method_area_and_constant_pool" rel="nofollow">详情请看这篇文章</a>。</p>\n<p>对于机器来说并不存在什么类的感念的。到了硬件层面，他所能了解的内容就是：1）我要计算什么（cpu），2）我要存储什么（缓存、主存、磁盘等，我们统称内存）？</p>\n<p>\n    按照分层模型来说JVM只是一个应用进程，是不可能直接和机器打交道的（这话也不是绝对的，有些虚拟机还真直接当作操作系统在特有硬件设备上用）。在JVM到硬件之间还隔着一层操作系统，在本地运行时是直接调用操作系统接口的（windows和linux都是C/C++）。不过为了JVM虚拟机更高效，字节码设计为更接近机器逻辑行为的方式来运行。不然也没必要弄一个字节码来转译Java语言，像nodejs用的V8引擎那样实时编译Javascript不是更直接？这也是过去C/C++唾弃Java效率低下，到了如今Java反而去吐槽其他解释型编译环境跑得慢的原因（不过这也不见得100%正确。比如某些情况下Java在JVM上处理JSON不见得比JavaScript在nodejs上快，而且写起代码来也挺费劲的）。</p>\n<p>\n    我们回到硬件计算和存储的问题。CPU的计算过程实质上就是操作系统的线程不断给CPU传递指令集。线程就像传送带一样，把一系列指令排好队然后一个一个交给CPU去处理。每一个指令告诉CPU干一件事，而干事的前后总得有个依据（输入）和结果（输出），这就是各种缓存、内存、磁盘的作用——提供依据、保存结果。JVM线程和操作系统线程是映射关系（mapping），而JVM的堆（heap）和非堆（Non-heap）就是一个内存管理的模型。所以我们跳出分层的概念，将字节码理解为直接在驱动cpu和内存运行的汇编码更容易理解。</p>\n<p>最后，我们回到方法区（Method\n    Area）这个规范概念。CPU只关心一堆指令，而JVM中所有的指令都是放置在方法区中的。JVM的首要任务是把这些指令有序的组织起来，按照编程好的逻辑将指令一个一个交给CPU去运行。而CPU都是靠线程来组织指令运算的，所以JVM中每个线程都有一个线程栈，通过他将指令组织起来一个一个的交给CPU去运算——这就是计数器（Counter\n    Register，用以指示当前应该执行什么字节码指令）、线程栈（Stacks，线程的运算模型——先进后出） 和 栈帧（Stacks\n    Frame，方法执行的本地变量）&nbsp;的概念。所以无论多复杂的设计，方法区可以简单的理解为：<strong>有序的将指令集组织起来，并在使用的时候可以通过某些方法找到对应的指令集合</strong>。</p>\n<p><strong>解析常量池</strong></p>\n<p><img alt="Jvm与字节码——类的方法区模型" height="339"\n        src="https://file.mahoooo.com/res/file/java_jvm_class_compile_in_the_method_area_1.png" width="563"></p>\n<p>先看 <em><strong>SimpleClass</strong></em>&nbsp;字节码中常量池中的一些数据，上图中每一个方框表示一个常量。方框中第一行的 <em><strong>#1</strong></em>\n    表示当前常量的ID，第二行 <strong><em>Methodref</em></strong> 表示这个这个常量的类型，第三行 <em><strong>#4,#13</strong></em> 表示常量的值。</p>\n<p>我们从 <em><strong>#1</strong></em> 开始跟着每个常量的值向下延伸可以展开一根以 <strong><em>Utf8</em></strong>&nbsp;类型作为叶节点的树，每一个叶节点都是一个值。所有的方法我们都可以通过树的方式展开得到下面的查询字段：\n</p>\n<pre><code class="apache"><span class="code-attribute">class</span> = java/lang/Object //属于哪个类\n<span class="code-attribute">method</span> = <span class="code-string">"&lt;init&gt;"</span> //方法名称\n<span class="code-attribute">params</span> = NaN //参数\n<span class="code-attribute">return</span> = V //返回类型</code></pre>\n<p>所有的方法都会以 <em><strong>package.class.name:(params)return&nbsp;</strong></em>的形式存储在方法区中，通过上面的参数很快可以定位到方法，例如&nbsp; <em>java.lang.Object."&lt;init&gt;":()V</em>，这里"&lt;init&gt;"是构造方法专用的名称。\n</p>\n<p><strong>解析方法中的指令集</strong></p>\n<p>方法除了用于定位的标识符外就是指令集，下面解析main方法的指令集：</p>\n<pre><code class="http"><span class="code-attribute">0</span>: new &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; #2 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;// class example/classLifecicle/SimpleClass\n<span class="code-attribute">3</span>: dup\n<span class="code-attribute">4</span>: invokespecial #3 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;// Method "&lt;init&gt;":()V\n<span class="code-attribute">7</span>: astore_1\n<span class="code-attribute">8</span>: return</code></pre>\n<p>1)）new 表示新建一个ID为#2的对象即SimpleClass(#2-&gt;#15="<em><strong>example/classLifecicle/SimpleClass"</strong></em>)。此时JVM会在堆上创建一个能放置<strong><em>SimpleClass</em></strong>类的空间并将引用地址返回写到栈顶。这里仅仅完成在堆中分配空间，没执行初始化。\n</p>\n<p>2）dup表示复制栈顶数据。此时栈中有2个指向同一内存区域的<em><strong>SimpleClass</strong></em>引用。</p>\n<p>3）invokespecial\n    #3表示执行#3的方法。通过解析常量池#3就是<em><strong>SimpleClass</strong></em>的构造方法。此后会将<em><strong>SimpleClass</strong></em>构造方法中的指令压入栈中执行。\n</p>\n<p>4）接下来来是<em><strong>SimpleClass</strong></em>的构造方法部分： a）aload_0 表示将本地内存的第一个数据压入栈顶，本地内存的第一个数据就是this。b）invokespecial #1\n    表示执行 <em><strong>Object</strong></em> 的构造方法。c）退出方法。这样就完成了实例的构造过程。</p>\n<p>5）完成上述步骤后，线程栈上还剩下一个指向<em><strong>SimpleClass</strong></em>实例的引用，astore_1 表示将引用存入本地缓存第二个位置。</p>\n<p>6）return -&gt; 退出 <em>main</em> 方法。</p>\n\n<h2 id="h2-6">方法区结构</h2>\n<p><strong>那么在方法区中所有的类是如何组织存放的呢？</strong></p>\n<p>我们用一个关系型数据库常的结构就可以解释他。在数据库中我们常用的对象有3个——表、字段、数据。每一个类对应的字节码我们都可以看成会生成2张数据库表——常量池表、方法表。通过字节码的解析，在内存中产生了如下结构的表：</p>\n<p>常量池表:example.classLifecicle.SimpleClass_Constant</p>\n<table border="1" cellpadding="1" cellspacing="1" style="width:500px">\n    <tbody>\n    <tr>\n        <td><strong><em>id</em></strong></td>\n        <td><strong><em>type</em></strong></td>\n        <td><strong><em>value</em></strong></td>\n    </tr>\n    <tr>\n        <td>#1</td>\n        <td>Methodref</td>\n        <td>#4,#13</td>\n    </tr>\n    <tr>\n        <td>…</td>\n        <td>……</td>\n        <td>……</td>\n    </tr>\n    <tr>\n        <td>#4</td>\n        <td>Class</td>\n        <td>#15</td>\n    </tr>\n    <tr>\n        <td>#15</td>\n        <td>Utf8</td>\n        <td>java/lang/Object</td>\n    </tr>\n    </tbody>\n</table>\n<p>方法表:example.classLifecicle.SimpleClass_Method</p>\n<table border="1" cellpadding="1" cellspacing="1" style="width:500px">\n    <tbody>\n    <tr>\n        <td>name</td>\n        <td>params</td>\n        <td>return</td>\n        <td>flag</td>\n        <td>code</td>\n    </tr>\n    <tr>\n        <td>&lt;init&gt;</td>\n        <td>&nbsp; &nbsp; NaN</td>\n        <td>V</td>\n        <td>static,public</td>\n        <td>……</td>\n    </tr>\n    <tr>\n        <td>…&nbsp;</td>\n        <td>……</td>\n        <td>……</td>\n        <td>……</td>\n        <td>……</td>\n    </tr>\n    </tbody>\n</table>\n<p>然后在运行过程中当计数器遇到&nbsp;<strong><em>invokespecial #3</em></strong>&nbsp;这样的指令时就会根据指令后面的ID去本类的常量表中查询并组装数据。当组装出&nbsp;class\n    = java/lang/Object、method = "&lt;init&gt;"、params = NaN、return = V这样的数据后，就会去名为java.lang.Object的表中根据&nbsp;<em>method、params、return&nbsp;</em>字段的数据查询对应的code，找到后为该code创建一个本地内存，随后线程计数器逐个执行code中的指令。\n</p>\n<p>这里仅仅用关系型数据库表的概念来解释方法区中如何将指令执行和字节码对应起来，真正的JVM运行方式比这复杂得多。不过这样很容易理解方法区到底是怎么一回事。</p>'}});