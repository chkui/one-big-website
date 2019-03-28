exports.ids=[74],exports.modules={305:function(s,n,a){"use strict";Object.defineProperty(n,"__esModule",{value:!0});n.content='<h2 id="h2-1">分区规范</h2>\n<p>首先要明确，JVM规范中并没有常量池这一说法，都是各种不同的jvm实现为了便于处理加以区分的。在JVM规范中统一称呼为方法区（JDK7之后这样说也不准确，有些数据常量数据又迁移到堆中）。下面的常量池主要以Java8自带的HotSpot为例，其他版本的Jvm会有各种区别。在HotSpot中，JDK6之前的版本所有常量池都在永生代（permanent generation）中，而JDK8取消了永生带用元空间（metaspace）替换，可以简单的理解常量池被移动到元空间中了（但实际处理还是有很多差异，大部分以前放置在永生代数据被迁移到堆中，而元数据区仅存放引用。但是这样说便于理解）。JDK7是一个过渡版本，只是将字符串移动到堆中。</p>\n\n<h2 id="h2-2">class常量池</h2>\n<p>当 .java文件被<span style="color:#FF0000">转译</span>成.class文件之后的字节码中包含一系列描述信息、符号引用和字面量信息。在jvm启动时，这些信息会被加载到class常量池中，当一个类要被<span style="color:#FF0000">编译</span>加载之前这些符号和字符串会经过JVM的加载器将其实例化成为一个常量值（Class对象的实例）存在在运行时常量区。所谓的class常量池并不会真的需要分配一个内存空间（常量池），直接从本地磁盘上加载转换也是可行的，这主要取决与JVM的版本和一些参数的配置处理。</p>\n\n<h2 id="h2-3">运行时常量池</h2>\n<p>运行时常量池（Runtime Constant Pool）主要用于存放jvm在运行时所有静态量。参考"深入理解java虚拟机"一书2.2.6对其的描述：运行时常量池是方法区的一部分。class文件中除了有类的版本、字段、方法、接口等描述信息外，还有一项信息是<strong>常量池表</strong>（Constant Pool Tabel），用于存放编译期生成的各种字面量和符号引用，这部分内容将在类加载后进入该常量池。运行时常量池并不仅仅局限于加载类时产生常量，与<strong>class常量池</strong>的区别是可以在运行期间添加各种数据到这个区域，例如jvm会将代码中直接声明的字符串放置到常量池中，这些字符串被称为字面量。通过<em>String::intern</em> 也可以向常量池表添加新的字面量。</p>\n\n<h2 id="h2-4">代码与字节码案例</h2>\n<p>下面通过一些例子来加深堆常量池的理解。</p>\n<p>字面量定义变量值：</p>\n<pre><code class="java"><span class="code-comment">//会直接在常量池中生成一个字符串常量，并将str1的引用（指针）指向它。</span>\nString str1 = <span class="code-string">"myString"</span>;\nString str2 = <span class="code-string">"myString"</span>;\n<span class="code-comment">//都是指向常量池的同一地址，所以这里输出为true;</span>\nSystem.out.println(str1 == str2);</code></pre>\n<p>与字符串相比，数字处理的情况就比较有趣了。先看一个单纯的例子：</p>\n<pre><code class="java">Integer num1 = <span class="hljs-number">127</span>;\nInteger num2 = <span class="hljs-number">127</span>;\nInteger num3 = <span class="hljs-number">128</span>;\nInteger num4 = <span class="hljs-number">128</span>;\nSystem.out.println(num1 == num2);<span class="code-comment">//TRUE</span>\nSystem.out.println(num3 == num4);<span class="code-comment">//FALSE</span></code></pre>\n<p>第一个对比输出为true，而第二个输出为false。这就是10次Java笔试9次都会遇到的Integer 预设-128~127对象的问题——为了循环、迭代等等常见处理不反复创建新的区域来存储值，Jvm预设了部分Integer整数值，无论哪申请这些值，都指定到固定的常量地址。</p>\n<p>再来看一个有意思的例子：</p>\n<pre><code class="java"><span class="code-keyword">int</span> i = <span class="hljs-number">128</span>;\nInteger I1 = <span class="hljs-number">128</span>;\nInteger I2 = <span class="hljs-number">128</span>;\nSystem.out.println(I1 == I2);<span class="code-comment">//false</span>\nSystem.out.println(I1 == i);<span class="code-comment">//true</span>\nSystem.out.println(I2 == i);<span class="code-comment">//true</span></code></pre>\n<p>输出的结果主要受到Java5之后装箱和拆箱的机制影响。</p>\n<blockquote>\n    <p>字节码解释说明：</p>\n    <p>在每一个字节码指令之后都会有注解说明。每一行注解包括2部分内容，1是指令进行的操作描述，2是操作之后的结果。2部分用;号分割。</p>\n    <p>操作结果中S代表<strong>stack</strong>——线程栈，L代表<strong>local</strong>——本地存储。I(128)表示类型为Integer值为128的引用。"string"标示一个常量，S("string")表示类型为String值为"string"的堆数据。例如，S=[I(128)],L=[128]标示线程栈中存在一个值为128的Integer类型引用，而缓存的L[0]位置存放了值为128的整数。</p>\n    <p>缓存的下标从1开始，因为0位置已经留给了this。</p>\n    <p>用于存放指令集运算结果的本地存储我们通称为缓存。</p>\n</blockquote>\n<p>首先，在Java5之前，是不能这样写的。Java5之后有了装箱机制，这样的语句实际上执行的是 <em>Integer I1 =&nbsp;Integer.valueOf(128)</em>。所以变量I1和I2是指向2个实例的引用地址，因此 "I1==I2"是false很好理解。那么另外2个==为什么是true呢。看下面的Java代码和对应的字节码：</p>\n<pre><code class="java"><span class="code-keyword">int</span> slot1 = <span class="hljs-number">128</span>;\nInteger slot2 = <span class="hljs-number">128</span>;\nSystem.out.println(slot1 == slot2);</code></pre>\n<p>对应的字节码是：&nbsp;</p>\n<pre><code class="apache"> <span class="code-attribute">0</span>: sipush        128 //128压栈;S=[128],L=[]\n <span class="code-attribute">3</span>: istore_1          //128出栈,写入缓存;S=[],L=[128]\n <span class="code-attribute">4</span>: sipush        128 //128压栈;S=[128],L=[128]\n <span class="code-attribute">7</span>: invokestatic  #16 //128出栈,执行I.valueOf(128)结果入栈;S=[I(128)],L=[128]\n<span class="code-attribute">10</span>: astore_2          //I(128)出栈写入缓存。S=[],L=[128,I(128)]\n<span class="code-attribute">11</span>: getstatic     #22 //从常量池读取PrintStream压栈;S=[PrintStream],L=[128,I(128)]\n<span class="code-attribute">14</span>: aload_2           //缓存数据[2]压栈；S=[I(128),PrintStream],L=[128,I(128)]\n<span class="code-attribute">15</span>: invokevirtual #28 //I(128)出栈，执行I.intValue结果入栈;S=[128,PrintStream],L=[128,I(128)]\n<span class="code-attribute">18</span>: iload_1           //缓存数据[1]压栈；S=[128,128,PrintStream],L=[128,I(128)]\n<span class="code-attribute">19</span>: if_icmpne     26  //S[0]和S[1]出栈使用if_icmpne数值对比。S=[PrintStream],L=[128,I(128)]\n<span class="code-attribute">22</span>: iconst_1          //将整数1压入栈;S=[1,PrintStream],L=[128,I(128)]\n<span class="code-attribute">23</span>: goto          27  //跳转到27行\n<span class="code-attribute">26</span>: iconst_0          //将整数0压入栈;S=[0,PrintStream],L=[128,I(128)]\n<span class="code-attribute">27</span>: invokevirtual #32 //S[0]和S[1]出栈使用println输出;S=[],L=[128,I(128)]\n<span class="code-attribute">30</span>: return            \n</code></pre>\n<p>核心在4~10行装箱，将一个128整数转换成一个Integer的引用，数据存储在堆中。然后在14～19行拆箱，将堆中的Integer数据转换成一个int整数，然后再用int整数和int整数进行==比较（if_icmpne）。所以比较之后会输出true。</p>\n<p>接下来是一个解释class常量池和常量池的例子。</p>\n<p>Java代码：</p>\n<pre><code class="java">String slot1 = <span class="code-string">"myString"</span>;\nString slot2 = <span class="code-keyword">new</span> String(<span class="code-string">"myString"</span>);\nSystem.out.println(slot1 == slot2); <span class="code-comment">//FALSE</span></code></pre>\n<p>"myString"这样的字符串，在类加载编译字节码时（从class常量池转变成运行时的常量池）就会生成一个常量并放置在常量池中，随后所有使用到这个字符串的位置，都是直接从常量池引用。下面是对应的字节码：</p>\n<pre><code class="apache"> <span class="code-attribute">0</span>: ldc           #16 //常量池读取<span class="code-string">"myString"</span>压栈;S=[<span class="code-string">"myString"</span>],L=[]\n <span class="code-attribute">2</span>: astore_1          //写入本地缓存;S=[],L=[<span class="code-string">"myString"</span>]\n <span class="code-attribute">3</span>: new           #18 //堆中创建一个String实例压栈;S=[S()],L=[<span class="code-string">"myString"</span>]\n <span class="code-attribute">6</span>: dup               //复制栈顶;S=[S(),S()],L=[<span class="code-string">"myString"</span>]\n <span class="code-attribute">7</span>: ldc           #16 //常量池读取<span class="code-string">"myString"</span>压栈;S=[<span class="code-string">"myString"</span>,S(),S()],L=[<span class="code-string">"myString"</span>]\n <span class="code-attribute">9</span>: invokespecial #20 //弹出S[0,1]作为参数使用init初始化;S=[S(<span class="code-string">"myString"</span>)],L=[<span class="code-string">"myString"</span>]\n<span class="code-attribute">12</span>: astore_2          //弹出栈顶写入缓存[2];S=[],L=[<span class="code-string">"myString"</span>,S(<span class="code-string">"myString"</span>)]\n<span class="code-attribute">13</span>: getstatic     #23 //获取输出常量;S=[PrintStream],L=[<span class="code-string">"myString"</span>,S(<span class="code-string">"myString"</span>)]\n<span class="code-attribute">16</span>: aload_1           //缓存[1]入栈;S=[<span class="code-string">"myString"</span>,PrintStream],L=[<span class="code-string">"myString"</span>,S(<span class="code-string">"myString"</span>)]\n<span class="code-attribute">17</span>: aload_2           //缓存[2]入栈;S=[S(<span class="code-string">"myString"</span>),<span class="code-string">"myString"</span>,PrintStream],L=[<span class="code-string">"myString"</span>,S(<span class="code-string">"myString"</span>)]\n<span class="code-attribute">18</span>: if_acmpne     25  //弹出S[0,1]比较;S=[PrintStream],L=[<span class="code-string">"myString"</span>,S(<span class="code-string">"myString"</span>)]\n<span class="code-attribute">21</span>: iconst_1          //整数1压栈;S=[1,PrintStream],L=[<span class="code-string">"myString"</span>,S(<span class="code-string">"myString"</span>)]\n<span class="code-attribute">22</span>: goto          26  //跳转26\n<span class="code-attribute">25</span>: iconst_0          //整数0压栈;S=[0,PrintStream],L=[<span class="code-string">"myString"</span>,S(<span class="code-string">"myString"</span>)]\n<span class="code-attribute">26</span>: invokevirtual #29 //弹出S[0,1]执行输出;S=[],L=[<span class="code-string">"myString"</span>,S(<span class="code-string">"myString"</span>)]\n<span class="code-attribute">29</span>: return\n</code></pre>\n<p>Java字节码中的ldc标示从常量池获取一个引用入栈，例子将常量池的引用#16压入栈，然后astore_1将#16写到本地存储[1]位置。所以slot1 = "myString"意味着slot1指向了常量池存放"myString"的位置。</p>\n<p>3~12行完成slot2 = new String("myString")的过程：3行，new指令先在栈上创建了一个指向一个String实例堆空间的引用；6行，在栈顶复制这个引用；7行，从常量池读取"myString"这个常量的引用；9行，弹出栈顶的"myString"引用作为执行String.init方法的参数，执行完都会更新堆中的数据；12）将栈顶dup指令复制出的引用弹出并写入本地存储[2]位置。此时slot2引用了堆空间中的一个String实例。所以slot1==slot2操作（if_acmpne）肯定返回false。</p>\n<p>这个例子揭开了一个Java基础问题的答案——String s = new String("String")是创建了2个字符串还是一个？我觉得回答1个或者2个都说得过去，字面常量"String"在加载期已经创建到常量池中了，然后在运行期执行这段代码时，只是从常量池ldc到栈上然后使用它在堆中创建一个新的String实例。从运行期看，确实这个时候只创建了一个实例，但是从整个JVM来看，确实存在2个地址都有"String"的字符串。其实这个问题扩展一下来聊更有价值：</p>\n<pre><code class="java"><span class="code-keyword">package</span> example;\n\n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span class="code-title">StringExample</span> </span>{\n\t<span class="code-keyword">final</span> <span class="code-keyword">static</span> String static1 = <span class="code-string">"myString"</span>;\n\t<span class="hljs-function"><span class="code-keyword">public</span> <span class="code-keyword">static</span> <span class="code-keyword">void</span> <span class="code-title">main</span><span class="hljs-params">(String[] args)</span> </span>{\n\t\tString slot1 = static1;\n\t\tString slot2 = <span class="code-string">"my"</span> + <span class="code-string">"String"</span>;\n\t\tString slot3 = <span class="code-keyword">new</span> String(static1);\n\t\tString slot4 = <span class="code-keyword">new</span> String(<span class="code-string">"myString"</span>);\n\t\tString slot5 = <span class="code-keyword">new</span> String(slot1);\n\t}\n}</code></pre>\n<p>问题是这个main方法运行后在整个JVM内存中创建了几个"myString"？先看了字节码再给答案。</p>\n<pre><code class="apache"><span class="code-attribute">public</span> class string.StringExample {\n  <span class="code-attribute">static</span> final java.lang.String static1; //static签名\n\n  <span class="code-attribute">public</span> string.StringExample();\n    <span class="code-attribute">Code</span>:                    //构造方法\n       <span class="code-attribute">0</span>: aload_0            //读取本地存储[0]压入栈\n       <span class="code-attribute">1</span>: invokespecial #13  //弹出栈顶引用执行Object.init方法\n       <span class="code-attribute">4</span>: return\n\n  <span class="code-attribute">public</span> static void main(java.lang.String[]); //main方法\n    <span class="code-attribute">Code</span>:\n       <span class="code-attribute">0</span>: ldc           #8   //从常量池读引用#8(<span class="code-string">"myString"</span>)压入栈\n       <span class="code-attribute">2</span>: astore_1           //弹出栈顶引用写入本地内存[1],即slot1=static1\n       <span class="code-attribute">3</span>: ldc           #8   //从常量池读#8(<span class="code-string">"myString"</span>)压入栈\n       <span class="code-attribute">5</span>: astore_2           //弹出栈顶引用写入本地内存[2],即slot2=<span class="code-string">"my"</span>+<span class="code-string">"String"</span>\n       <span class="code-attribute">6</span>: new           #21  //在堆中创建一个String实例并将引用压入栈\n       <span class="code-attribute">9</span>: dup                //复制栈顶元素\n      <span class="code-attribute">10</span>: ldc           #8   //从常量池读#8(<span class="code-string">"myString"</span>)压入栈\n      <span class="code-attribute">12</span>: invokespecial #23  //弹出栈顶引用，使用String.init方法初始化堆   \n      <span class="code-attribute">15</span>: astore_3           //弹出栈顶堆引用写入本地存储[3]\n      <span class="code-attribute">16</span>: new           #21  //16～25行执行过错和6～15行一样               \n      <span class="code-attribute">19</span>: dup\n      <span class="code-attribute">20</span>: ldc           #8                  \n      <span class="code-attribute">22</span>: invokespecial #23  \n      <span class="code-attribute">25</span>: astore        4    //栈顶元素写入本地存储[4]\n      <span class="code-attribute">27</span>: new           #21  //与16～15行一致               \n      <span class="code-attribute">30</span>: dup\n      <span class="code-attribute">31</span>: aload_1            //区别在31行是从本地存储[1]的位置读取数据，而[1]引用#8(<span class="code-string">"myString"</span>)\n      <span class="code-attribute">32</span>: invokespecial #23  \n      <span class="code-attribute">35</span>: astore        5    //栈顶元素写入本地存储[5]\n      <span class="code-attribute">37</span>: return\n}\n</code></pre>\n<p>如果看明白了字节码，这个答案就很清晰了，整个JVM一共三个值等于"myString"的字符串，即创建了3个字符串。</p>\n<p>首先，在java代码编译成字节码时，static关键字定义的常量会直接替换为字面量放置在class常量池，所以例子中&nbsp;<em>String slot3 = new String(static1)</em> 这样的写法等于&nbsp;<em>String slot3 = new String("myString") </em>。</p>\n<p>其次，常量池值只有#8的引用值为"myString"的字面量，所以在声明字符串时"my"+"String"这样的写法并不会额外生成多的字符串，编译器会直接合并为"myString"。</p>'}};