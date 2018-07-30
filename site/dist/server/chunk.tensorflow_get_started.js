exports.ids=[12],exports.modules={344:function(s,n,a){"use strict";Object.defineProperty(n,"__esModule",{value:!0});n.content='<h2 id="h2-1">TensorFlow入门</h2>\n<p>本文将初步向码农和程序媛们介绍如何使用TensorFlow进行编程。在阅读之前请先 <a href="https://www.chkui.com/article/tensorflow/tensorflow_windows_install" rel="nofollow">安装TensorFlow</a>，此外为了能够更好的理解本文的内容，阅读之前需要了解一点以下知识：\n</p>\n<ol>\n    <li>python基本编程。能看得懂python代码，最好能使用脚本工具或pycharm之类的IDC编写代码。</li>\n    <li>至少有一点数组的概念。</li>\n    <li>最理想的状态是具备机器学习的基础知识。不过如果在阅读之前没有了解过任何机器学习相关的知也无大碍，可以把本文作为了解机器学习的开端。后面会另开一篇用MNIST了解机器学习的基础知识。</li>\n</ol>\n<p>TensorFlow提供种类繁多的API接口，其中TensorFlow Core是最低层级的接口，为开发TensorFlow提供基础支持。官方推荐把TensorFlow\n    Core用作机器学习研究以及相关的数据建模。除了TensorFlow Core之外还有更高抽象的API接口，这些API接口比TensorFlow Core更易于使用、更易于快速实现业务需求。例如&nbsp;tf.contrib.learn\n    接口，它提供管理数据集合、进行数据评估、训练、推演等功能。在使用TensorFlow开发的过程中需要特别注意，以&nbsp;<code>contrib</code>&nbsp;开头的API接口依然还在不断完善中，很有可能在未来某个发行版本中进行调整或者直接取消。\n</p>\n<p>本文首先介绍TensorFlow Core，然后会演示如何使用&nbsp;tf.contrib.learn 实现简单的建模。了解TensorFlow\n    Core是为了让开发者理解在使用抽象接口时底层是如何工作的，以便于在训练数据时创建更合适的模型。</p>\n\n<h2 id="h2-2">TensorFlow</h2>\n<p>\n    TensorFlow的基础数据单元是张量（tensor）。一个张量认为是一组向量的集合，从数据结构的角度来理解这个集合等价于一组数值存储在1到多个队列中（张量没办法几句话说得清楚，想要了解去谷哥或者度妞搜索“张量分析”，可以简单想象成一个多维度的数组）。一个张量的阶表示了张量的维度，下面是一些张量的例子：</p>\n<blockquote> \n <pre class="lua"><code class="lua"><span class="hljs-number"><span class="hljs-number">3</span></span> # <span\n         class="hljs-number"><span class="hljs-number">0</span></span>阶张量，可以用图形[]来表示\n[<span class="hljs-number"><span class="hljs-number">1.</span></span> ,<span class="hljs-number"><span\n             class="hljs-number">2.</span></span>, <span class="hljs-number"><span class="hljs-number">3.</span></span>] # <span\n             class="hljs-number"><span class="hljs-number">1</span></span>阶张量，是一个图形为[<span class="hljs-number"><span\n             class="hljs-number">3</span></span>]的向量\n<span class="code-string"><span class="code-string">[[1., 2., 3.], [4., 5., 6.]]</span></span> # <span\n             class="hljs-number"><span class="hljs-number">2</span></span>阶张量，是一个图形为[<span class="hljs-number"><span\n             class="hljs-number">2</span></span>,<span class="hljs-number"><span class="hljs-number">3</span></span>]的矩阵\n<span class="code-string"><span class="code-string">[[[1., 2., 3.]]</span></span>, <span class="code-string"><span\n             class="code-string">[[7., 8., 9.]]</span></span>] # 图形为[<span class="hljs-number"><span\n             class="hljs-number">2</span></span>,<span class="hljs-number"><span\n             class="hljs-number">1</span></span>,<span class="hljs-number"><span class="hljs-number">3</span></span>]的三阶张量</code></pre>\n</blockquote>\n\n<h2 id="h2-3">TensorFlow Core教程</h2>\n\n<h3 id="h3-1">导入TensorFlow</h3>\n<p>下面是导入TensorFlow包的标准方式：</p>\n<pre class="haskell"><code class="language-python"><span class="code-keyword"><span\n        class="code-keyword">import</span></span> tensorflow <span class="code-keyword"><span\n        class="code-keyword">as</span></span> tf</code></pre>\n<p>通过python的方式导入之后，&nbsp;tf 提供了访问所有TensorFlow类、方法和符号的入口。</p>\n\n<h3 id="h3-2">图计算（Computational Graph）</h3>\n<p>TensorFlow Core的编程开发可以看就做2个事：</p>\n<ol>\n    <li>构建计算图。（建模）</li>\n    <li>运行计算图。（执行）</li>\n</ol>\n<blockquote>\n    <p>图（graph，也可以叫连接图）表示由多个点链接而成的图。本文中的图指的是TensorFlow建模后运算的路径，可以使用TensorBoard看到图的整个形态。</p>\n    <p>节点（node）表示图中每一个点，这些点都代表了一项计算任务。</p>\n</blockquote>\n<p><strong>所以简而言之</strong>：编程 <em>TensorFlow Core</em> 就是事先安排好一系列节点的计算任务，然后运行这些任务。</p>\n<p>\n    下面我们先构建一个简单的图，图中的节点（node）有0或多个张量作为输入，并产生一个张量作为输出。一个典型的节点是“常量”（constant）。TensorFlow的常量在构建计算模型时就已经存在，在运行计算时并不需要任何输入。下面的代码创建了2个浮点常量值常量&nbsp;<code>node1</code>&nbsp;和&nbsp;<code>node2</code>：\n</p>\n<pre class="go"><code class="language-python">node1 = tf.constant(<span class="hljs-number"><span class="hljs-number">3.0</span></span>, tf.<span\n        class="code-keyword">float32</span>)\nnode2 = tf.constant(<span class="hljs-number"><span class="hljs-number">4.0</span></span>) <span class="code-comment"># also tf.<span\n            class="code-keyword">float32</span> implicitly</span>\n<span class="code-built_in">print</span>(node1, node2)</code></pre>\n<p>运行后会打印输出：</p>\n<pre class="lisp"><code class="language-python">Tensor(<span class="code-string"><span\n        class="code-string">"Const:0"</span></span>, shape=(), dtype=float32) Tensor(<span class="code-string"><span\n        class="code-string">"Const_1:0"</span></span>, shape=(), dtype=float32)</code></pre>\n<p>观察这个打印的结果会发现，它并不是按照预想的那样输出 <em>3.0</em> 或<em> 4.0 </em>的值。这里输出的是一个节点的对象信息。因为到这里还没有执行第二项工作——运行计算模型图。只有在运行时，才会使用到节点真实的值\n    <em>3.0</em> 和<em>4.0</em>。为了进行图运算需要创建一个会话（session），一个会话封装了TensorFlow运行库的各种控制方法和状态量（context）。</p>\n<p>下面的代码会创建一个会话（session）对象实例，然后执行&nbsp;<code>run</code>&nbsp;方法来进行模型计算：</p>\n<pre class="lua"><code class="language-python">sess = tf.Session()\n<span class="code-built_in">print</span>(sess.run([node1, node2]))</code></pre>\n<p>运行后我们会发现，打印的结果是3.0和4.0：</p>\n<pre class="json"><code class="language-python">[<span class="hljs-number"><span class="hljs-number">3.0</span></span>, <span\n        class="hljs-number"><span class="hljs-number">4.0</span></span>]</code></pre>\n<p>\n    然后，对&nbsp;<code>node1</code>&nbsp;和&nbsp;<code>node2</code>&nbsp;进行和运算，这个和运算就是图中的运算模型。下面的代码是构建一个&nbsp;<code>node1</code>&nbsp;、&nbsp;<code>node2</code>&nbsp;进行和运算，&nbsp;<code>node3</code>&nbsp;代表和运算的模型，构建完毕后使用\n    <code>sess.run</code>&nbsp;运行：</p>\n<pre class="lua"><code class="language-python">node3 = tf.add(node1, node2)\n<span class="code-built_in">print</span>(<span class="code-string"><span class="code-string">"node3: "</span></span>, node3)\n<span class="code-built_in">print</span>(<span class="code-string"><span class="code-string">"sess.run(node3): "</span></span>,sess.run(node3))</code></pre>\n<p>运行后会输出了以下内容：</p>\n<pre class="bash"><code class="language-python">node3:  Tensor(<span class="code-string"><span class="code-string">"Add_2:0"</span></span>, shape=(), dtype=<span\n        class="code-built_in">float</span>32)\nsess.run(node3):  <span class="hljs-number">7.0</span></code></pre>\n<p>到此，完成了TensorFlow创建图和执行图的过程。</p>\n<p>前面提到TensorFlow提供了一个名为TensorBoard的工具，这个工具能够显示图运算的节点。下面是一个TensorBoard可视化看到计算图的例子：</p>\n<p><img alt="TensorFlow 使用入门教程" height="130"\n        src="https://file.mahoooo.com/res/file/tensorflow_get_started_0.png" width="269"></p>\n<p>这样的常量运算结果并没有什么价值，因为他总是恒定的产生固定的结果。图中的节点能够以参数的方式接受外部输入——比如使用占位符。占位符可以等到模型运行时再使用动态计算的数值：</p>\n<pre class="ini"><code class="language-python"><span class="hljs-attr">a</span> = tf.placeholder(tf.float32)\n<span class="hljs-attr">b</span> = tf.placeholder(tf.float32)\n<span class="hljs-attr">adder_node</span> = a + b  <span\n            class="code-comment"># + 可以代替tf.add(a, b)构建模型</span></code></pre>\n<p>上面这3行代码有点像用一个function或者一个lambda表达式来获取参数输入。我们可以在运行时输入各种各样的参数到图中进行计算：</p>\n<pre class="css"><code class="language-python"><span class="code-selector-tag">print</span>(<span\n        class="code-selector-tag">sess</span><span class="code-selector-class">.run</span>(<span\n        class="code-selector-tag">adder_node</span>, {<span class="code-attribute">a</span>: <span\n        class="hljs-number"><span class="hljs-number">3</span></span>, b:<span class="hljs-number"><span\n        class="hljs-number">4.5</span></span>}))\n<span class="code-selector-tag">print</span>(<span class="code-selector-tag">sess</span><span\n            class="code-selector-class">.run</span>(<span class="code-selector-tag">adder_node</span>, {<span\n            class="code-attribute">a</span>: [<span class="hljs-number"><span class="hljs-number">1</span></span>,<span\n            class="hljs-number"><span class="hljs-number">3</span></span>], b: [<span class="hljs-number"><span\n            class="hljs-number">2</span></span>, <span class="hljs-number"><span class="hljs-number">4</span></span>]}))</code></pre>\n<p>输出结果为：</p>\n<pre class="css"><code class="css">7<span class="code-selector-class"><span class="code-selector-class">.5</span></span>\n<span class="hljs-selector-attr"><span class="hljs-selector-attr">[ 3. &nbsp;7.]</span></span></code></pre>\n<p>在TensorBoard中，显示的计算图为：</p>\n<p><img alt="TensorFlow 使用入门教程" height="207"\n        src="https://file.mahoooo.com/res/file/tensorflow_get_started_1.png" width="243"></p>\n<p>我们可以使用更复杂的表达式来增加计算的内容：</p>\n<pre class="groovy"><code class="language-python">add_and_triple = adder_node * <span class="hljs-number"><span\n        class="hljs-number">3.</span></span>\nprint(sess.run(add_and_triple, {<span class="code-string">a:</span> <span class="hljs-number"><span class="hljs-number">3</span></span>, <span\n            class="code-string">b:</span><span class="hljs-number"><span class="hljs-number">4.5</span></span>}))</code></pre>\n<p>计算输出：</p>\n<pre class="css"><code class="css">22<span class="code-selector-class"><span\n        class="code-selector-class">.5</span></span></code></pre>\n<p>TensorBoard中的显示：</p>\n<p><img alt="TensorFlow 使用入门教程" height="337"\n        src="https://file.mahoooo.com/res/file/tensorflow_get_started_2.png" width="280"></p>\n<p>在机器学习中一个模型通常需要接收各种类型的数据作为输入。为了使得模型可以不断的训练通常需要能够针对相同的输入修改图的模型以获取新的输出。<strong>变量（Variables）</strong>可以增加可训练的参数到图中，他们由指定一个初始类型和初始值来创建：\n</p>\n<pre class="ini"><code class="language-python"><span class="hljs-attr">W</span> = tf.Variable([<span\n        class="hljs-number">.<span class="hljs-number">3</span></span>], tf.float32)\n<span class="hljs-attr">b</span> = tf.Variable([<span class="hljs-number">-.<span class="hljs-number">3</span></span>], tf.float32)\n<span class="hljs-attr">x</span> = tf.placeholder(tf.float32)\n<span class="hljs-attr">linear_model</span> = W * x + b</code></pre>\n<p>前面已经提到在调用&nbsp;<code>tf.constant</code>&nbsp;时会初始化不可变更的常量。 而这里通过调用&nbsp;<code>tf.Variable</code>&nbsp;创建的变量不会被初始化，为了在TensorFlow运行之前（<code>sess.run</code>执行模型运算之前）初始化所有的变量，需要增加一步&nbsp;<code>init</code>&nbsp;操作：\n</p>\n<pre class="swift"><code class="swift"><span class="code-keyword"><span class="code-keyword">init</span></span> = tf.global_variables_initializer()\nsess.run(<span class="code-keyword"><span class="code-keyword">init</span></span>)</code></pre>\n<p>可以通过重载&nbsp;<code>init</code>&nbsp;方式来全局初始化所有TensorFlow图中的变量。在上面的代码中，在我们调用&nbsp;<code>sess.run</code>&nbsp;之前，所有的变量都没有初始化。\n</p>\n<p>下面的&nbsp;<code>x</code>&nbsp;是一个占位符，<code>{x:[1,2,3,4]}</code>&nbsp;&nbsp;表示在运算中把x的值替换为[1,2,3,4]：</p>\n<pre class="css"><code class="language-python"><span class="code-selector-tag">print</span>(<span\n        class="code-selector-tag">sess</span><span class="code-selector-class">.run</span>(<span\n        class="code-selector-tag">linear_model</span>, {<span class="code-attribute">x</span>:[<span\n        class="hljs-number"><span class="hljs-number">1</span></span>,<span class="hljs-number"><span\n        class="hljs-number">2</span></span>,<span class="hljs-number"><span class="hljs-number">3</span></span>,<span\n        class="hljs-number"><span class="hljs-number">4</span></span>]}))</code></pre>\n<p>输出：</p>\n<pre class="json"><code class="language-python">[ <span class="hljs-number"><span class="hljs-number">0.</span></span> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span\n        class="hljs-number"><span class="hljs-number">0.30000001</span></span> &nbsp;<span class="hljs-number"><span\n        class="hljs-number">0.60000002</span></span> &nbsp;<span class="hljs-number"><span class="hljs-number">0.90000004</span></span>]</code></pre>\n<p>现在已经创建了一个计算模型，但是并不清晰是否足够有效，为了让他越来越有效，需要对这个模型进行数据训练。下面的代码定义名为&nbsp;<code>y</code>&nbsp;的占位符来提供所需的值，然后编写一个“损益功能”（loss\n    function）。</p>\n<p>一个“损益功能”是用来衡量当前的模型对于想达到的输出目标还有多少距离的工具。下面的例子使用线性回归作为损益模型。回归的过程是：计算模型的输出和损益变量（<code>y</code>）的差值，然后再对这个差值进行平方运算（方差），然后再把方差的结果向量进行和运算。下面的代码中，&nbsp;<code>linear_model\n    - y</code>&nbsp;创建了一个向量，向量中的每一个值表示对应的错误增量。然后调用&nbsp;<code>tf.square</code>&nbsp;对错误增量进行平方运算。最后将所有的方差结果相加创建一个数值的标量来抽象的表示错误差异，使用&nbsp;<code>tf.reduce_sum</code>来完成这一步工作。如下列代码：\n</p>\n<pre class="makefile"><code class="language-python"><span class="code-comment"><span class="code-comment"># 定义占位符</span></span>\ny = tf.placeholder(tf.float32)\n<span class="code-comment"><span class="code-comment"># 方差运算</span></span>\nsquared_deltas = tf.square(linear_model - y)\n<span class="code-comment"><span class="code-comment"># 定义损益模型</span></span>\nloss = tf.reduce_sum(squared_deltas)\n<span class="code-comment"><span class="code-comment"># 输出损益计算结果</span></span>\nprint(sess.run(loss, {x:[<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span\n            class="hljs-number">3</span>,<span class="hljs-number">4</span>], y:[<span\n            class="hljs-number">0</span>,<span class="hljs-number">-1</span>,<span class="hljs-number">-2</span>,<span\n            class="hljs-number">-3</span>]}))</code></pre>\n<p>运算之后的差异值是：</p>\n<pre class="css"><code class="css">23<span class="code-selector-class"><span\n        class="code-selector-class">.66</span></span></code></pre>\n<p>\n    可以通过手动将&nbsp;<code>W</code>&nbsp;和&nbsp;<code>b</code>&nbsp;的值修改为-1和1降低差异结果。TensorFlow中使用&nbsp;<code>tf.Variable</code>&nbsp;创建变量，使用&nbsp;<code>tf.assign</code>&nbsp;修改变量。例如&nbsp;<code>W=-1</code>&nbsp;、<code>b=1</code>&nbsp;才是当前模型最佳的值，可以像下面这样修改他们的值：\n</p>\n<pre class="groovy"><code class="language-python">fixW = tf.assign(W, [<span class="hljs-number"><span\n        class="hljs-number">-1.</span></span>])\nfixb = tf.assign(b, [<span class="hljs-number"><span class="hljs-number">1.</span></span>])\nsess.run([fixW, fixb])\nprint(sess.run(loss, {<span class="code-string">x:</span>[<span class="hljs-number"><span\n            class="hljs-number">1</span></span>,<span class="hljs-number"><span\n            class="hljs-number">2</span></span>,<span class="hljs-number"><span\n            class="hljs-number">3</span></span>,<span class="hljs-number"><span\n            class="hljs-number">4</span></span>], <span class="code-string">y:</span>[<span class="hljs-number"><span\n            class="hljs-number">0</span></span>,<span class="hljs-number"><span\n            class="hljs-number">-1</span></span>,<span class="hljs-number"><span\n            class="hljs-number">-2</span></span>,<span class="hljs-number"><span class="hljs-number">-3</span></span>]}))</code></pre>\n<p>修改之后的最终输出结果为：</p>\n<pre class="css"><code class="css">0<span class="code-selector-class"><span class="code-selector-class">.0</span></span></code></pre>\n\n<h3 id="h3-3">tf.train 接口</h3>\n<p>机器学习的完整过程超出了本文的范围，这里仅说明训练的过程。TensorFlow提供了很多优化器来逐渐（迭代或循环）调整每一个参数，最终实现损益值尽可能的小。最简单的优化器之一是“梯度递减”（<strong>gradient\n    descent</strong>），它会对损益计算模型求导，然后根据求导的结果调整输入变量的值（<code>W</code>和<code>b</code>），最终目的让求导的结果逐渐趋向于0。手工进行编写求导运算非常冗长且容易出错，TensorFlow还提供了函数&nbsp;<code>tf.gradients</code>&nbsp;实现自动求导过程。下面的例子展示了使用梯度递减训练样本的过程：\n</p>\n<pre class="bash"><code class="language-python"><span class="code-comment"><span class="code-comment"># 设定优化器，这里的0.01表示训练时的步进值</span></span>\noptimizer = tf.train.GradientDescentOptimizer(<span class="hljs-number">0.01</span>)\ntrain = optimizer.minimize(loss)\nsess.run(init) <span class="code-comment"><span class="code-comment"># 初始化变量值.</span></span>\n<span class="code-keyword"><span class="code-keyword">for</span></span> i <span class="code-keyword"><span\n            class="code-keyword">in</span></span> range(<span class="hljs-number">1000</span>): <span\n            class="code-comment"><span class="code-comment"># 遍历1000次训练数据，每次都重新设置新的W和b值</span></span>\n  sess.run(train, {x:[<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span\n            class="hljs-number">3</span>,<span class="hljs-number">4</span>], y:[<span\n            class="hljs-number">0</span>,<span class="hljs-number">-1</span>,<span class="hljs-number">-2</span>,<span\n            class="hljs-number">-3</span>]})\n\n<span class="code-built_in">print</span>(sess.run([W, b]))</code></pre>\n<p>这个模式的运算结果是：</p>\n<pre class="json"><code class="json">[array([<span class="hljs-number"><span\n        class="hljs-number">-0.9999969</span></span>], dtype=float32), array([ <span class="hljs-number"><span\n        class="hljs-number">0.99999082</span></span>], dtype=float32)]</code></pre>\n<p>\n    现在我们已经完成机器学习的整个过程。虽然进行简单的线性回归计算并不需要用到太多的TensorFlow代码，但是这仅仅是一个用于实例的案例，在实际应用中往往需要编写更多的代码实现复杂的模型匹配运算。TensorFlow为常见的模式、结构和功能提供了更高级别的抽象接口。</p>\n\n<h3 id="h3-4">一个完整的训练过程</h3>\n<p>下面是根据前文的描述，编写的完整线性回归模型：</p>\n<pre class="makefile"><code class="language-python"><span class="code-keyword">import</span> numpy <span\n        class="code-keyword">as</span> np\n<span class="code-keyword">import</span> tensorflow <span class="code-keyword">as</span> tf\n\n<span class="code-comment"><span class="code-comment"># 模型参数</span></span>\nW = tf.Variable([<span class="hljs-number">.3</span>], tf.float32)\nb = tf.Variable([<span class="hljs-number">-.3</span>], tf.float32)\n<span class="code-comment"><span class="code-comment"># 模型输入</span></span>\nx = tf.placeholder(tf.float32)\n<span class="code-comment"><span class="code-comment"># 模型输出</span></span>\nlinear_model = W * x + b\n<span class="code-comment"><span class="code-comment"># 损益评估参数</span></span>\ny = tf.placeholder(tf.float32)\n<span class="code-comment"><span class="code-comment"># 损益模式</span></span>\nloss = tf.reduce_sum(tf.square(linear_model - y)) <span class="code-comment"># 方差和</span>\n<span class="code-comment"><span class="code-comment"># 优化器</span></span>\noptimizer = tf.train.GradientDescentOptimizer(<span class="hljs-number">0.01</span>)\ntrain = optimizer.minimize(loss)\n<span class="code-comment"><span class="code-comment"># 训练数据</span></span>\nx_train = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span\n            class="hljs-number">3</span>,<span class="hljs-number">4</span>]\ny_train = [<span class="hljs-number">0</span>,<span class="hljs-number">-1</span>,<span\n            class="hljs-number">-2</span>,<span class="hljs-number">-3</span>]\n<span class="code-comment"><span class="code-comment"># 定义训练的循环</span></span>\ninit = tf.global_variables_initializer()\nsess = tf.Session()\nsess.run(init) <span class="code-comment"><span class="code-comment"># reset values to wrong</span></span>\n<span class="code-keyword">for</span> i <span class="code-keyword">in</span> range(<span class="hljs-number">1000</span>):\n  sess.run(train, {x:x_train, y:y_train})\n\n<span class="code-comment"><span class="code-comment"># 评估训练结果的精确性</span></span>\ncurr_W, curr_b, curr_loss  = sess.run([W, b, loss], {x:x_train, y:y_train})\nprint(<span class="code-string">"W: %s b: %s loss: %s"</span>%(curr_W, curr_b, curr_loss))</code></pre>\n<p>运行后会输出：</p>\n<pre class="css"><code class="language-python"><span class="code-selector-tag">W</span>: <span\n        class="hljs-selector-attr">[</span><span class="hljs-number"><span class="hljs-selector-attr">-0.9999969</span></span><span\n        class="hljs-selector-attr">]</span> <span class="code-selector-tag">b</span>: <span\n        class="hljs-selector-attr">[ </span><span class="hljs-number"><span class="hljs-selector-attr">0.99999082</span></span><span\n        class="hljs-selector-attr">]</span> <span class="code-selector-tag">loss</span>: <span\n        class="hljs-number">5<span class="code-selector-class">.69997e-11</span></span></code></pre>\n<p>这个复杂的程序仍然可以在TensorBoard中可视化呈现：</p>\n<p><img alt="TensorFlow 使用入门教程" height="721"\n        src="https://file.mahoooo.com/res/file/tensorflow_get_started_3.png" width="832"></p>\n\n<h2 id="h2-4">tf.contrib.learn</h2>\n<p>前面已经提到，TensorFlow除了TensorFlow Core之外，为了便于业务开发还提供了很多更抽象的接口。<code>tf.contrib.learn</code>&nbsp;是TensorFlow的一个高级库，他提供了更加简化的机器学习机制，包括：\n</p>\n<ol>\n    <li>运行训练循环</li>\n    <li>运行评估循环</li>\n    <li>管理数据集合</li>\n    <li>管理训练数据</li>\n</ol>\n<p>tf.contrib.learn&nbsp;定义了一些通用模块。</p>\n\n<h4 id="h4-1">基本用法</h4>\n<p>先看看使用&nbsp;<code>tf.contrib.learn</code>&nbsp;来实现线性回归的方式。</p>\n<pre class="haskell"><code class="language-python"><span class="code-keyword"><span\n        class="code-keyword">import</span></span> tensorflow <span class="code-keyword"><span\n        class="code-keyword">as</span></span> tf\n<span class="code-comment"><span class="code-meta"># NumPy常用语加载、操作、预处理数据.</span></span>\n<span class="code-keyword"><span class="code-keyword">import</span></span> numpy <span class="code-keyword"><span\n            class="code-keyword">as</span></span> np\n\n<span class="code-comment"><span class="code-meta"># 定义一个特性列表features。</span></span>\n<span class="code-comment"><span class="code-meta"># 这里仅仅使用了real-valued特性。还有其他丰富的特性功能</span></span>\n<span class="code-title">features</span> = [tf.contrib.layers.real_valued_column(<span class="code-string"><span\n            class="code-string">"x"</span></span>, dimension=<span class="hljs-number"><span\n            class="hljs-number">1</span></span>)]\n\n<span class="code-comment"><span class="code-meta"># 一个评估者（estimator）是训练（fitting）与评估（inference）的开端。</span></span>\n<span class="code-comment"><span class="code-meta"># 这里预定于了许多类型的训练评估方式，比如线性回归（linear regression）、</span></span>\n<span class="code-comment"><span class="code-meta"># 逻辑回归（logistic regression）、线性分类（linear classification）和回归（regressors）</span></span>\n<span class="code-comment"><span class="code-meta"># 这里的estimator提供了线性回归的功能</span></span>\n<span class="code-title">estimator</span> = tf.contrib.learn.<span class="code-type">LinearRegressor</span>(feature_columns=features)\n\n<span class="code-comment"><span class="code-meta"># TensorFlow提供了许多帮助类来读取和设置数据集合</span></span>\n<span class="code-comment"><span class="code-meta"># 这里使用了‘numpy_input_fn’。</span></span>\n<span class="code-comment"><span class="code-meta"># 我们必须告诉方法我们许多多少批次的数据，以及每次批次的规模有多大。</span></span>\n<span class="code-title">x</span> = np.array([<span class="hljs-number"><span\n            class="hljs-number">1.</span></span>, <span class="hljs-number"><span class="hljs-number">2.</span></span>, <span\n            class="hljs-number"><span class="hljs-number">3.</span></span>, <span class="hljs-number"><span\n            class="hljs-number">4.</span></span>])\n<span class="code-title">y</span> = np.array([<span class="hljs-number"><span\n            class="hljs-number">0.</span></span>, <span class="hljs-number"><span class="hljs-number">-1.</span></span>, <span\n            class="hljs-number"><span class="hljs-number">-2.</span></span>, <span class="hljs-number"><span\n            class="hljs-number">-3.</span></span>])\n<span class="code-title">input_fn</span> = tf.contrib.learn.io.numpy_input_fn({<span class="code-string"><span\n            class="code-string">"x"</span></span>:x}, y, batch_size=<span class="hljs-number"><span class="hljs-number">4</span></span>,\n                                              num_epochs=<span class="hljs-number"><span class="hljs-number">1000</span></span>)\n\n<span class="code-comment"><span class="code-meta"># ‘fit’方法通过指定steps的值来告知方法要训练多少次数据</span></span>\n<span class="code-title">estimator</span>.fit(input_fn=input_fn, steps=<span class="hljs-number"><span\n            class="hljs-number">1000</span></span>)\n\n<span class="code-comment"><span class="code-meta"># 最后我们评估我们的模型价值。在一个实例中，我们希望使用单独的验证和测试数据集来避免过度拟合。</span></span>\n<span class="code-title">estimator</span>.evaluate(input_fn=input_fn)</code></pre>\n<p>运行后输出：</p>\n<pre class="lua"><code class="language-python">&nbsp; &nbsp; {<span class="code-string"><span class="code-string">\'global_step\'</span></span>: <span\n        class="hljs-number"><span class="hljs-number">1000</span></span>, <span class="code-string"><span\n        class="code-string">\'loss\'</span></span>: <span class="hljs-number"><span\n        class="hljs-number">1.9650059e-11</span></span>}</code></pre>\n\n<h4 id="h4-2">自定义模型</h4>\n<p><code>tf.contrib.learn</code>&nbsp;并不限定只能使用它预设的模型。假设现在需要创建一个未预设到TensorFlow中的模型。我们依然可以使用<code>tf.contrib.learn</code>保留数据集合、训练数据、训练过程的高度抽象。我们将使用我们对较低级别TensorFlow\n    API的了解，展示如何使用LinearRegressor实现自己的等效模型。</p>\n<p>使用&nbsp;<code>tf.contrib.learn</code>&nbsp;创建一个自定义模型需要用到它的子类&nbsp;<code>tf.contrib.learn.Estimator</code>&nbsp;。而&nbsp;<code>tf.contrib.learn.LinearRegressor</code>&nbsp;是&nbsp;&nbsp;<code>tf.contrib.learn.Estimator</code>&nbsp;的子类。下面的代码中为&nbsp;<code>Estimator</code>&nbsp;新增了一个&nbsp;<code>model_fn</code>&nbsp;功能，这个功能将告诉&nbsp;<code>tf.contrib.learn</code>&nbsp;如何进行评估、训练以及损益计算：\n</p>\n<pre class="python"><code class="language-python"><span class="code-keyword"><span\n        class="code-keyword">import</span></span> numpy <span class="code-keyword"><span class="code-keyword">as</span></span> np\n<span class="code-keyword"><span class="code-keyword">import</span></span> tensorflow <span class="code-keyword"><span\n            class="code-keyword">as</span></span> tf\n<span class="code-comment"><span class="code-comment"># 定义一个特征数组，这里仅提供实数特征</span></span>\n<span class="hljs-function"><span class="code-keyword"><span class="hljs-function"><span class="code-keyword">def</span></span></span><span\n        class="hljs-function"> </span><span class="code-title"><span class="hljs-function"><span class="code-title">model</span></span></span><span\n        class="hljs-params"><span class="hljs-function"><span class="hljs-params">(features, labels, mode)</span></span></span><span\n        class="hljs-function">:</span></span>\n  <span class="code-comment"><span class="code-comment"># 构建线性模型和预设值</span></span>\n  W = tf.get_variable(<span class="code-string"><span class="code-string">"W"</span></span>, [<span class="hljs-number"><span\n            class="hljs-number">1</span></span>], dtype=tf.float64)\n  b = tf.get_variable(<span class="code-string"><span class="code-string">"b"</span></span>, [<span class="hljs-number"><span\n            class="hljs-number">1</span></span>], dtype=tf.float64)\n  y = W*features[<span class="code-string"><span class="code-string">\'x\'</span></span>] + b\n  <span class="code-comment"><span class="code-comment"># 损益子图</span></span>\n  loss = tf.reduce_sum(tf.square(y - labels))\n  <span class="code-comment"><span class="code-comment"># 训练子图</span></span>\n  global_step = tf.train.get_global_step()\n  optimizer = tf.train.GradientDescentOptimizer(<span class="hljs-number"><span class="hljs-number">0.01</span></span>)\n  train = tf.group(optimizer.minimize(loss),\n                   tf.assign_add(global_step, <span class="hljs-number"><span class="hljs-number">1</span></span>))\n  <span class="code-comment"><span class="code-comment"># ModelFnOps方法将创建我们自定义的一个抽象模型。</span></span>\n  <span class="code-keyword"><span class="code-keyword">return</span></span> tf.contrib.learn.ModelFnOps(\n      mode=mode, predictions=y,\n      loss=loss,\n      train_op=train)\n\nestimator = tf.contrib.learn.Estimator(model_fn=model)\n<span class="code-comment"><span class="code-comment"># 定义数据集</span></span>\nx = np.array([<span class="hljs-number"><span class="hljs-number">1.</span></span>, <span class="hljs-number"><span\n            class="hljs-number">2.</span></span>, <span class="hljs-number"><span class="hljs-number">3.</span></span>, <span\n            class="hljs-number"><span class="hljs-number">4.</span></span>])\ny = np.array([<span class="hljs-number"><span class="hljs-number">0.</span></span>, <span class="hljs-number"><span\n            class="hljs-number">-1.</span></span>, <span class="hljs-number"><span class="hljs-number">-2.</span></span>, <span\n            class="hljs-number"><span class="hljs-number">-3.</span></span>])\ninput_fn = tf.contrib.learn.io.numpy_input_fn({<span class="code-string"><span class="code-string">"x"</span></span>: x}, y, <span\n            class="hljs-number"><span class="hljs-number">4</span></span>, num_epochs=<span class="hljs-number"><span\n            class="hljs-number">1000</span></span>)\n\n<span class="code-comment"><span class="code-comment"># 训练数据</span></span>\nestimator.fit(input_fn=input_fn, steps=<span class="hljs-number"><span class="hljs-number">1000</span></span>)\n<span class="code-comment"><span class="code-comment"># 评估模型</span></span>\nprint(estimator.evaluate(input_fn=input_fn, steps=<span class="hljs-number"><span class="hljs-number">10</span></span>))</code></pre>\n<p>运行后输出：</p>\n<pre class="lua"><code class="language-python">{<span class="code-string"><span class="code-string">\'loss\'</span></span>: <span\n        class="hljs-number"><span class="hljs-number">5.9819476e-11</span></span>, <span class="code-string"><span\n        class="code-string">\'global_step\'</span></span>: <span class="hljs-number"><span class="hljs-number">1000</span></span>}</code></pre>\n\n<h2 id="h2-5">接下来做什么</h2>\n<p>阅读了到这里，你应该初步了解如何在TensorFlow中进行开发和编码。但是如果你刚踏入机器学习的领域，就算很仔细的看了本文，对于如何使用TensorFlow进行机器学习基本上还是懵逼的。<span\n        style="color:#FF0000">请继续阅读</span><a href="https://my.oschina.net/chkui/blog/888346" rel="nofollow">《MNIST\n    机器学习入门</a>》<span style="color:#FF0000">，文章给出了一个完整的机器学习建模案例，适合零知识入门机器学习。</span></p>'}};