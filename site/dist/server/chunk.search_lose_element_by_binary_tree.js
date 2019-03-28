exports.ids=[11],exports.modules={368:function(s,n,a){"use strict";Object.defineProperty(n,"__esModule",{value:!0});n.content='<h2 id="h2-1">问题</h2>\n<ol>\n    <li>\n        在一组相同类型的数据中（对象、数组、字符串、整形等任意类型的数据结构）请用时间空间最优的方式查找缺失的一项。例如有一组数据["A","B","C","D","E","F","G"]，现在给到["B","D","A","F"."G"]，需要找到缺失数据"C"？数据的个数不定。\n    </li>\n    <li>扩展上面的问题，用最优的方式查找缺失的多项。</li>\n</ol>\n<h2 id="h2-2">解决</h2>\n<h3 id="h3-1">2层循环逐个比对查找</h3>\n<p>最简单的办法当然是逐项比对，几乎所有语言都提供对象实例、字符串、数字的比对方法。</p>\n<p>但是这样做有2个问题：</p>\n<ol>\n    <li>少量数据可行，但是海量数据肯定会非常慢，因为时间复杂度是O(n^2)。而且第一层循环是全遍历，第二层循要遍历n/2。</li>\n    <li>在比对过程中如果是字符串比对，效率会非常差。</li>\n</ol>\n<h3 id="h3-2">编码2叉树查找</h3>\n<p>可以对所有的事物进行有序编码，然后通过编码索引到对应的元素。编码也没有什么特别的要求，只要每增加一项将编码加一即可。例如上面的例子["A","B","C","D","E","F","G"]，对其编码建立索引：</p>\n<pre><code class="json">{1:<span class="code-string">"A"</span>,2:<span class="code-string">"B"</span>,3:<span\n        class="code-string">"C"</span>,4:<span class="code-string">"D"</span>,5:<span\n        class="code-string">"E"</span>,6:<span class="code-string">"F"</span>,7:<span class="code-string">"G"</span>}\n</code></pre>\n<p>这是一个标准的dict结构（Java中的map结构）。任何时候增加新的项目只要编码加一即可：</p>\n<pre><code class="json">{1:<span class="code-string">"A"</span>,2:<span class="code-string">"B"</span>,3:<span\n        class="code-string">"C"</span>,4:<span class="code-string">"D"</span>,5:<span\n        class="code-string">"E"</span>,6:<span class="code-string">"F"</span>,7:<span\n        class="code-string">"G"</span>,8:<span class="code-string">"ADD ITEM"</span>}\n</code></pre>\n<p>使用编码还有一个好处是还可以查找一组不同类型的数据。</p>\n<p>建立编码之后实际上就转换为一个数字查询问题。</p>\n<p>如果仅仅是查找一个缺失项，实际上有一个非常简便的算法——求和计算差值：</p>\n<pre><code class="python">    <span class="code-comment"># origin_numbers是所有编码的列表，例如[1,2,3,4,5,6,7,8,9,10]。</span>\n    <span class="code-comment"># random_numbers是缺失了一项的编码无序表，例如[6,2,5,4,7,8,9,10,1]。</span>\n    <span class="code-keyword">for</span> _num <span class="code-keyword">in</span> origin_numbers:\n        total_sum = total_sum + _num\n\n    <span class="code-keyword">for</span> _num <span class="code-keyword">in</span> random_numbers:\n        without_sum = without_sum + _num\n</code></pre>\n<p>差值正好是缺失的项目索引值。</p>\n<p>但是如果是查找多个缺失项，只能用2叉树：</p>\n<pre><code class="python"><span class="code-keyword">import</span> copy\n<span class="code-keyword">import</span> random <span class="code-keyword">as</span> rand\n<span class="code-keyword">import</span> datetime\n<span class="code-keyword">import</span> time\n\n\n<span class="code-comment"># 2叉树结构</span>\n<span class="hljs-class"><span class="code-keyword">class</span> <span class="code-title">Link</span>:</span>\n    <span class="hljs-function"><span class="code-keyword">def</span> <span class="code-title">__init__</span><span\n            class="hljs-params">(self, value)</span>:</span>\n        self.value = value\n        self.left = <span class="code-keyword">None</span>\n        self.right = <span class="code-keyword">None</span>\n\n    <span class="hljs-function"><span class="code-keyword">def</span> <span class="code-title">insert</span><span\n            class="hljs-params">(self, value)</span>:</span>\n        <span class="code-keyword">if</span> value &lt; self.value:\n            self.__addLeftLeaf__(value)\n        <span class="code-keyword">else</span>:\n            self.__addRightLeaf__(value)\n\n    <span class="hljs-function"><span class="code-keyword">def</span> <span\n            class="code-title">__addLeftLeaf__</span><span class="hljs-params">(self, value)</span>:</span>\n        <span class="code-keyword">if</span> self.left <span class="code-keyword">is</span> <span class="code-keyword">not</span> <span\n            class="code-keyword">None</span>:\n            self.left.insert(value)\n        <span class="code-keyword">else</span>:\n            self.left = Link(value)\n\n    <span class="hljs-function"><span class="code-keyword">def</span> <span\n            class="code-title">__addRightLeaf__</span><span class="hljs-params">(self, value)</span>:</span>\n        <span class="code-keyword">if</span> self.right <span class="code-keyword">is</span> <span class="code-keyword">not</span> <span\n            class="code-keyword">None</span>:\n            self.right.insert(value)\n        <span class="code-keyword">else</span>:\n            self.right = Link(value)\n\n    <span class="hljs-function"><span class="code-keyword">def</span> <span class="code-title">traversal</span><span\n            class="hljs-params">(self, _list, _without)</span>:</span>\n        <span class="code-keyword">if</span> self.left <span class="code-keyword">is</span> <span class="code-keyword">not</span> <span\n            class="code-keyword">None</span>:\n            self.left.traversal(_list, _without)\n\n        length = len(_list)\n        <span class="code-keyword">if</span> <span class="hljs-number">0</span> &lt; length:\n            tail = _list[length - <span class="hljs-number">1</span>]\n            diff = self.value - (tail + <span class="hljs-number">1</span>)\n            <span class="code-keyword">if</span> <span class="hljs-number">0</span> &lt; diff:\n                <span class="code-keyword">for</span> _d <span class="code-keyword">in</span> range(<span\n            class="hljs-number">1</span>, diff + <span class="hljs-number">1</span>):\n                    _without.append(self.value - _d)\n\n        _list.append(self.value)\n\n        <span class="code-keyword">if</span> self.right <span class="code-keyword">is</span> <span class="code-keyword">not</span> <span\n            class="code-keyword">None</span>:\n            self.right.traversal(_list, _without)\n\n\n<span class="code-comment"># 从队列中移除项目</span>\n<span class="hljs-function"><span class="code-keyword">def</span> <span class="code-title">remove_number</span><span\n        class="hljs-params">(without_size, numbers)</span>:</span>\n    <span class="code-keyword">for</span> count <span class="code-keyword">in</span> range(without_size):\n        <span class="code-keyword">del</span> numbers[rand.randrange(len(numbers))]\n    <span class="code-keyword">return</span> numbers\n\n\n<span class="code-comment"># 使用有序数组生成随机数组</span>\n<span class="hljs-function"><span class="code-keyword">def</span> <span class="code-title">generation_random</span><span\n        class="hljs-params">(without_size, origin_numbers)</span>:</span>\n    origin_numbers_options = copy.copy(origin_numbers)\n    length = len(origin_numbers)\n    random_numbers = []\n\n    <span class="code-comment"># 随机</span>\n    <span class="code-keyword">while</span> <span class="hljs-number">0</span> &lt; length:\n        rand_number = rand.randrange(length)\n        random_numbers.append(origin_numbers_options[rand_number])\n        <span class="code-keyword">del</span> origin_numbers_options[rand_number]\n        length = len(origin_numbers_options)\n\n    <span class="code-keyword">return</span> remove_number(without_size, random_numbers)\n\n\n<span class="code-comment"># </span>\n<span class="hljs-function"><span class="code-keyword">def</span> <span\n        class="code-title">generation_origin_numbers</span><span class="hljs-params">(without_size=<span\n        class="hljs-number">1</span>, total=<span class="hljs-number">10000</span>)</span>:</span>\n    origin_numbers = list(range(total))\n    <span class="code-keyword">return</span> origin_numbers, generation_random(without_size, origin_numbers)\n\n\n<span class="hljs-function"><span class="code-keyword">def</span> <span class="code-title">tree_2_leaf</span><span\n        class="hljs-params">(numbers)</span>:</span>\n    root = Link(numbers[<span class="hljs-number">0</span>])\n    <span class="code-keyword">for</span> pos <span class="code-keyword">in</span> range(<span\n            class="hljs-number">1</span>, len(numbers)):\n        root.insert(numbers[pos])\n\n    <span class="code-comment"># 使用二叉树</span>\n    _list = []\n    _without = []\n\n    root.traversal(_list=_list, _without=_without)\n\n    <span class="code-keyword">return</span> _without\n\n\n<span class="hljs-function"><span class="code-keyword">def</span> <span\n        class="code-title">without_one_number</span><span\n        class="hljs-params">(origin_numbers, random_numbers)</span>:</span>\n    print(<span class="code-string">"=============== without_one_number start =================="</span>)\n    sum_search_start = time.time()\n    total_sum = <span class="hljs-number">0</span>\n    without_sum = <span class="hljs-number">0</span>\n    print(<span class="code-string">"Sum Search Begin.({})"</span>.format(datetime.datetime.now().strftime(<span\n            class="code-string">\'%H:%M:%S\'</span>)))\n    <span class="code-keyword">for</span> _num <span class="code-keyword">in</span> origin_numbers:\n        total_sum = total_sum + _num\n\n    <span class="code-keyword">for</span> _num <span class="code-keyword">in</span> random_numbers:\n        without_sum = without_sum + _num\n    tree_search_start = sum_search_end = time.time()\n    print(<span class="code-string">"Sum Search Complete.({})"</span>.format(datetime.datetime.now().strftime(<span\n            class="code-string">\'%H:%M:%S\'</span>)))\n    print(<span class="code-string">"Timer:{} S"</span>.format(sum_search_end - sum_search_start))\n    print(<span class="code-string">"Total Sum:{}"</span>.format(total_sum))\n    print(<span class="code-string">"Without One Number Sum:{}"</span>.format(without_sum))\n    print(<span class="code-string">"Without Number:{}"</span>.format(total_sum - without_sum))\n    print(<span class="code-string">"---"</span>)\n    print(<span class="code-string">"2 Tree Search Begin.({})"</span>.format(datetime.datetime.now().strftime(<span\n            class="code-string">\'%H:%M:%S\'</span>)))\n    without_number = tree_2_leaf(random_numbers)\n    print(<span class="code-string">"2 Tree Complete.({})"</span>.format(datetime.datetime.now().strftime(<span\n            class="code-string">\'%H:%M:%S\'</span>)))\n    print(<span class="code-string">"Timer:{} S"</span>.format(time.time() - tree_search_start))\n    print(<span class="code-string">"Without Element:{}"</span>.format(without_number))\n    print(<span class="code-string">"=============== without_one_number end =================="</span>)\n\n\n<span class="hljs-function"><span class="code-keyword">def</span> <span\n        class="code-title">without_multi_number</span><span class="hljs-params">(random_numbers)</span>:</span>\n    print(<span class="code-string">"=============== without_multi_number start =================="</span>)\n    start = time.time()\n    print(<span class="code-string">"Search Begin.({})"</span>.format(datetime.datetime.now().strftime(<span\n            class="code-string">\'%H:%M:%S\'</span>)))\n    without_number = tree_2_leaf(random_numbers)\n    print(<span class="code-string">"Search End.({})"</span>.format(datetime.datetime.now().strftime(<span\n            class="code-string">\'%H:%M:%S\'</span>)))\n    print(<span class="code-string">"Timer:{} S"</span>.format(time.time() - start))\n    print(<span class="code-string">"Without Element:{}"</span>.format(without_number))\n    print(<span class="code-string">"=============== without_multi_number end =================="</span>)\n\n\n<span class="code-keyword">if</span> __name__ == <span class="code-string">\'__main__\'</span>:\n    print(<span class="code-string">"Generation Numbers Begin.({})"</span>.format(datetime.datetime.now().strftime(<span\n            class="code-string">\'%H:%M:%S\'</span>)))\n    generation_number_start = time.time()\n    origin, random = generation_origin_numbers()\n    print(<span\n            class="code-string">"Generation Numbers Complete.({})"</span>.format(datetime.datetime.now().strftime(<span\n            class="code-string">\'%H:%M:%S\'</span>)))\n    generation_number_end = time.time()\n    print(<span class="code-string">"Timer:{} S"</span>.format(generation_number_end - generation_number_start))\n\n    without_one_number(origin, random)\n    without_multi_number(remove_number(<span class="hljs-number">4</span>, random))\n</code></pre>'}};