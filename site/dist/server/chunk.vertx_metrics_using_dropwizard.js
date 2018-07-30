exports.ids=[8],exports.modules={348:function(s,n,a){"use strict";Object.defineProperty(n,"__esModule",{value:!0});n.content='<p>最近项目中需要针对Vert.x的运行效率进行监控，查阅Vert.x官文，发现目前提供了Dropwizard和Hawkular两种开箱即用的工具。本文将介绍使用Dropwizard\n    Metrics实现Vert.x性能统计的过程（当然还有踩过的坑）。</p>\n<p>首先简要说说dropwizard&nbsp;metrics。</p>\n<h2 id="h2-1">Dropwizard Metrics</h2>\n<p>按照官网的说法：Metrics是一个Java库，这个库可以让我们有无可比拟的能力去了解编码是如何在生产环境运行的。Metrics提供了强大的工具来测量关键组件在生产环境的运行行为。</p>\n<p>如果仅仅使用Metrics的功能，其实并没有什么复杂，也就是嵌入一些类去使用。把他理解log4j就很容易了。</p>\n<p>在运行之前，通过Maven引入依赖关系：</p>\n<blockquote>\n    <p><br> &nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&lt;dependency&gt;<br> &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;\n        &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&lt;groupId&gt;io.dropwizard.metrics&lt;/groupId&gt;<br> &nbsp;&nbsp;\n        &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&lt;artifactId&gt;metrics-core&lt;/artifactId&gt;<br>\n        &nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&lt;version&gt;${metrics.version}&lt;/version&gt;<br>\n        &nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&lt;/dependency&gt;</p>\n</blockquote>\n<p><em>metrics.version&nbsp;</em>使用最新的版本号。</p>\n<p>下面的例子简要说明了如何使用metric。例子中先是包装了一个具有监控功能的队列，在调用add和remove方法时更新指标数据。</p>\n<pre class="cpp"><code class="cpp"><span class="code-comment"><span class="code-comment">//声明一个自带指标功能的队列</span></span>\n<span class="code-keyword"><span class="code-keyword">class</span></span> QueueWarp {\n\t<span class="code-comment"><span class="code-comment">// 真实队列</span></span>\n    <span class="code-keyword"><span class="code-keyword">private</span></span> final Queue&lt;Object&gt; <span\n            class="code-built_in"><span class="code-built_in">queue</span></span>;\n    <span class="code-comment"><span class="code-comment">// 计数器指标</span></span>\n    <span class="code-keyword"><span class="code-keyword">private</span></span> Counter counter;\n    <span class="code-comment"><span class="code-comment">// 柱状图指标</span></span>\n    <span class="code-keyword"><span class="code-keyword">private</span></span> Histogram size_rate;\n    <span class="code-comment"><span class="code-comment">// 计时器指标</span></span>\n    <span class="code-keyword"><span class="code-keyword">private</span></span> Timer optTimer;\n    <span class="code-comment"><span class="code-comment">// 构造函数</span></span>\n    <span class="hljs-function"><span class="code-keyword"><span class="hljs-function"><span\n            class="code-keyword">public</span></span></span><span class="hljs-function"> </span><span\n            class="code-title"><span class="hljs-function"><span class="code-title">QueueWarp</span></span></span><span\n            class="hljs-params"><span class="hljs-function"><span class="hljs-params">(MetricRegistry metrics, String name)</span></span></span><span\n            class="hljs-function"> </span></span>{\n        <span class="code-keyword"><span class="code-keyword">this</span></span>.<span class="code-built_in"><span\n            class="code-built_in">queue</span></span> = <span class="code-keyword"><span class="code-keyword">new</span></span> LinkedList&lt;Object&gt;();\n\n        <span class="code-comment"><span class="code-comment">//注册一个测量值对象</span></span>\n        metrics.<span class="code-keyword"><span class="code-keyword">register</span></span>(MetricRegistry.name(QueueWarp.<span\n            class="code-keyword"><span class="code-keyword">class</span></span>, name, <span class="code-string"><span\n            class="code-string">"size"</span></span>),\n                         <span class="code-keyword"><span class="code-keyword">new</span></span> Gauge&lt;Integer&gt;() {\n                             @Override\n                             <span class="code-comment"><span class="code-comment">//每次发起统计时获取数据的接口</span></span>\n                             <span class="code-keyword"><span class="code-keyword">public</span></span> Integer getValue() {\n                                 <span class="code-keyword"><span class="code-keyword">return</span></span> <span\n            class="code-built_in"><span class="code-built_in">queue</span></span>.size();\n                             }\n                         });\n        <span class="code-comment"><span class="code-comment">// 注册计数器</span></span>\n        counter = metrics.<span class="code-keyword"><span class="code-keyword">register</span></span>(MetricRegistry.name(QueueWarp.<span\n            class="code-keyword"><span class="code-keyword">class</span></span>, name, <span class="code-string"><span\n            class="code-string">"count"</span></span>), <span class="code-keyword"><span class="code-keyword">new</span></span> Counter());\n        <span class="code-comment"><span class="code-comment">// 注册柱状图</span></span>\n        size_rate = metrics.histogram(MetricRegistry.name(QueueWarp.<span class="code-keyword"><span\n            class="code-keyword">class</span></span>, <span class="code-string"><span\n            class="code-string">"size-rate"</span></span>));\n        <span class="code-comment"><span class="code-comment">// 注册计时器</span></span>\n        optTimer = metrics.timer(MetricRegistry.name(QueueWarp.<span class="code-keyword"><span class="code-keyword">class</span></span>, <span\n            class="code-string"><span class="code-string">"opt-timer"</span></span>));\n    }\n    <span class="code-comment"><span class="code-comment">//增加</span></span>\n    <span class="hljs-function"><span class="code-keyword"><span class="hljs-function"><span\n            class="code-keyword">public</span></span></span><span class="hljs-function"> boolean </span><span\n            class="code-title"><span class="hljs-function"><span class="code-title">add</span></span></span><span\n            class="hljs-params"><span class="hljs-function"><span\n            class="hljs-params">(Object e)</span></span></span></span>{\n    \tfinal Timer.Context timerContext = optTimer.time();<span class="code-comment"><span\n            class="code-comment">//开始计时</span></span>\n    \tcounter.inc();<span class="code-comment"><span class="code-comment">//计数器+1</span></span>\n    \tsize_rate.update(<span class="code-built_in"><span class="code-built_in">queue</span></span>.size());<span\n            class="code-comment"><span class="code-comment">//柱状图更新</span></span>\n    \tboolean ret = <span class="code-keyword"><span class="code-keyword">this</span></span>.<span\n            class="code-built_in"><span class="code-built_in">queue</span></span>.add(e);<span\n            class="code-comment"><span class="code-comment">//添加数据到队列</span></span>\n    \ttimerContext.stop();<span class="code-comment"><span class="code-comment">//停止计时</span></span>\n        <span class="code-keyword"><span class="code-keyword">return</span></span> ret;\n    }\n    <span class="code-comment"><span class="code-comment">// 删除</span></span>\n    <span class="hljs-function"><span class="code-keyword"><span class="hljs-function"><span\n            class="code-keyword">public</span></span></span><span class="hljs-function"> Object </span><span\n            class="code-title"><span class="hljs-function"><span class="code-title">remove</span></span></span><span\n            class="hljs-params"><span class="hljs-function"><span\n            class="hljs-params">(Object e)</span></span></span></span>{\n    \tfinal Timer.Context timerContext = optTimer.time();\n    \tcounter.dec();\n    \tsize_rate.update(<span class="code-built_in"><span class="code-built_in">queue</span></span>.size());\n    \tObject ret = <span class="code-keyword"><span class="code-keyword">this</span></span>.<span\n            class="code-built_in"><span class="code-built_in">queue</span></span>.remove();\n    \ttimerContext.stop();\n        <span class="code-keyword"><span class="code-keyword">return</span></span> ret;\n    }\n}</code></pre>\n<p>在上面的代码中，当调用add、remove方法时，会记录：</p>\n<ol>\n    <li>方法从调用到返回的时间间隔。</li>\n    <li>更新队列中的数据规模。（Counter和Gauge都记录了规模）</li>\n    <li>更新当前队列成员个数和最大值的比率。</li>\n</ol>\n<p>然后使用一个main方法来测试这个类并输出指标数据：</p>\n<pre class="cpp"><code class="cpp"><span class="code-keyword"><span class="code-keyword">public</span></span> <span\n        class="code-keyword"><span class="code-keyword">class</span></span> MetricDemoRun {\n\t<span class="code-comment"><span class="code-comment">// 注册指标实例</span></span>\n\t<span class="code-keyword"><span class="code-keyword">static</span></span> final MetricRegistry metrics = <span\n            class="code-keyword"><span class="code-keyword">new</span></span> MetricRegistry();\n\t<span class="hljs-function"><span class="code-keyword"><span class="hljs-function"><span\n            class="code-keyword">public</span></span></span><span class="hljs-function"> </span><span\n            class="code-keyword"><span class="hljs-function"><span class="code-keyword">static</span></span></span><span\n            class="hljs-function"> </span><span class="code-keyword"><span class="hljs-function"><span\n            class="code-keyword">void</span></span></span><span class="hljs-function"> </span><span\n            class="code-title"><span class="hljs-function"><span class="code-title">main</span></span></span><span\n            class="hljs-params"><span class="hljs-function"><span\n            class="hljs-params">(String args[])</span></span></span><span class="hljs-function"> </span></span>{\n\t\t<span class="code-comment"><span class="code-comment">//新建队列</span></span>\n\t\tQueueWarp <span class="code-built_in"><span class="code-built_in">queue</span></span> = <span\n            class="code-keyword"><span class="code-keyword">new</span></span> QueueWarp(metrics, <span\n            class="code-string"><span class="code-string">"jobss"</span></span>);\n\t\t<span class="code-built_in"><span class="code-built_in">queue</span></span>.add(<span class="code-string"><span\n            class="code-string">"1"</span></span>);\n\t\t<span class="code-comment"><span class="code-comment">// 启动指标数据输出</span></span>\n\t\tstartReport();\n\t\t<span class="code-keyword"><span class="code-keyword">try</span></span> {\n\t\t\tThread.sleep(<span class="hljs-number"><span class="hljs-number">5</span></span> * <span\n            class="hljs-number"><span class="hljs-number">1000</span></span>);\n\t\t} <span class="code-keyword"><span class="code-keyword">catch</span></span> (InterruptedException e) {\n\t\t}\n\t\t<span class="code-built_in"><span class="code-built_in">queue</span></span>.add(<span class="code-string"><span\n            class="code-string">"2"</span></span>);\n\t\tMeter requests = metrics.meter(<span class="code-string"><span class="code-string">"requests"</span></span>);\n\t\trequests.mark();\n\t\twait5Seconds();\n\t}\n\n\t<span class="hljs-function"><span class="code-keyword"><span class="hljs-function"><span\n            class="code-keyword">static</span></span></span><span class="hljs-function"> </span><span\n            class="code-keyword"><span class="hljs-function"><span class="code-keyword">void</span></span></span><span\n            class="hljs-function"> </span><span class="code-title"><span class="hljs-function"><span class="code-title">startReport</span></span></span><span\n            class="hljs-params"><span class="hljs-function"><span class="hljs-params">()</span></span></span><span\n            class="hljs-function"> </span></span>{\n\t\t<span class="code-comment"><span class="code-comment">//注册报告对象</span></span>\n\t\tConsoleReporter reporter = ConsoleReporter.forRegistry(metrics).\n\t\t\t\tconvertRatesTo(TimeUnit.SECONDS).\n\t\t\t\tconvertDurationsTo(TimeUnit.MILLISECONDS)\n\t\t\t\t.build();\n\n\t\t<span class="code-comment"><span class="code-comment">// 开始输出报告</span></span>\n\t\treporter.start(<span class="hljs-number"><span class="hljs-number">1</span></span>, TimeUnit.SECONDS);\n\t}\n\n\t<span class="hljs-function"><span class="code-keyword"><span class="hljs-function"><span\n            class="code-keyword">static</span></span></span><span class="hljs-function"> </span><span\n            class="code-keyword"><span class="hljs-function"><span class="code-keyword">void</span></span></span><span\n            class="hljs-function"> </span><span class="code-title"><span class="hljs-function"><span class="code-title">wait5Seconds</span></span></span><span\n            class="hljs-params"><span class="hljs-function"><span class="hljs-params">()</span></span></span><span\n            class="hljs-function"> </span></span>{\n\t\t<span class="code-keyword"><span class="code-keyword">try</span></span> {\n\t\t\tThread.sleep(<span class="hljs-number"><span class="hljs-number">300</span></span> * <span\n            class="hljs-number"><span class="hljs-number">1000</span></span>);\n\t\t} <span class="code-keyword"><span class="code-keyword">catch</span></span> (InterruptedException e) {\n\t\t}\n\t}\n}</code></pre>\n<p>MetricDemoRun类中还有2个静态方法，一个用来输出报告数据。一个用来将主线程睡眠一段的时间。运行main以后，会在控制台重复输出下列内容：</p>\n<blockquote>\n    <p>16-7-7 16:50:35 ================================================================</p>\n    <p>-- Gauges ----------------------------------------------------------------------<br>\n        com.oakss.demo.metrics.app.QueueWarp.jobss.size<br> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;value = 2\n    </p>\n    <p>-- Counters --------------------------------------------------------------------<br>\n        com.oakss.demo.metrics.app.QueueWarp.jobss.count<br> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;count = 2\n    </p>\n    <p>-- Histograms ------------------------------------------------------------------<br>\n        com.oakss.demo.metrics.app.QueueWarp.size-rate<br> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;count = 2<br>\n        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;min = 0<br> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;\n        &nbsp; &nbsp;max = 1<br> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; mean = 0.52<br> &nbsp; &nbsp; &nbsp;\n        &nbsp; &nbsp; &nbsp; stddev = 0.50<br> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; median = 1.00<br> &nbsp; &nbsp;\n        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 75% &lt;= 1.00<br> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 95% &lt;=\n        1.00<br> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 98% &lt;= 1.00<br> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;\n        &nbsp; &nbsp; 99% &lt;= 1.00<br> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 99.9% &lt;= 1.00</p>\n    <p>-- Meters ----------------------------------------------------------------------<br> requests<br> &nbsp; &nbsp;\n        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;count = 1<br> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;mean rate = 1.00 events/second<br>\n        &nbsp; &nbsp; &nbsp;1-minute rate = 0.00 events/second<br> &nbsp; &nbsp; &nbsp;5-minute rate = 0.00\n        events/second<br> &nbsp; &nbsp; 15-minute rate = 0.00 events/second</p>\n    <p>-- Timers ----------------------------------------------------------------------<br>\n        com.oakss.demo.metrics.app.QueueWarp.opt-timer<br> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;count = 2<br>\n        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;mean rate = 0.33 calls/second<br> &nbsp; &nbsp; &nbsp;1-minute rate = 0.20\n        calls/second<br> &nbsp; &nbsp; &nbsp;5-minute rate = 0.20 calls/second<br> &nbsp; &nbsp; 15-minute rate = 0.20\n        calls/second<br> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;min = 0.07 milliseconds<br> &nbsp;\n        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;max = 2.75 milliseconds<br> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;\n        &nbsp; &nbsp; mean = 1.35 milliseconds<br> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; stddev = 1.34\n        milliseconds<br> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; median = 0.07 milliseconds<br> &nbsp; &nbsp; &nbsp;\n        &nbsp; &nbsp; &nbsp; &nbsp; 75% &lt;= 2.75 milliseconds<br> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 95%\n        &lt;= 2.75 milliseconds<br> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 98% &lt;= 2.75 milliseconds<br>\n        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 99% &lt;= 2.75 milliseconds<br> &nbsp; &nbsp; &nbsp; &nbsp;\n        &nbsp; &nbsp; 99.9% &lt;= 2.75 milliseconds<br> &nbsp;</p>\n</blockquote>\n<p>看完上面的例子。并没有感受什么特别牛逼的地方，无非是在代码中嵌入一些统计点。&nbsp;看来看去都像一个增强版的日志工具。</p>\n\n<h2 id="h2-2">Vert.x指标统计&nbsp; &nbsp;&nbsp;</h2>\n\n<h3 id="h3-1">嵌入Metrics</h3>\n<p>说完基本的dropwizard&nbsp;metrics功能我们再看看如何整合Vert.x和dropwizard&nbsp;metrics用来统计各种有效的指标。</p>\n<p>\n    Vert.x通过MetricsService的SPI接口提供了接入指标统计工具的入口。在创建Vertx实例时使用DropwizardMetricsOptions来告诉Vertx使用对应的实现类。首先需要加入Vert.x的Dropwizard包：</p>\n<pre class="xml"><code class="xml"><span class="code-tag"><span class="code-tag">&lt;</span><span\n        class="code-name"><span class="code-tag"><span class="code-name">dependency</span></span></span><span\n        class="code-tag">&gt;</span></span>\n  <span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span class="code-tag"><span\n          class="code-name">groupId</span></span></span><span class="code-tag">&gt;</span></span>io.vertx<span\n            class="code-tag"><span class="code-tag">&lt;/</span><span class="code-name"><span class="code-tag"><span\n            class="code-name">groupId</span></span></span><span class="code-tag">&gt;</span></span>\n  <span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span class="code-tag"><span\n          class="code-name">artifactId</span></span></span><span class="code-tag">&gt;</span></span>vertx-dropwizard-metrics<span\n            class="code-tag"><span class="code-tag">&lt;/</span><span class="code-name"><span class="code-tag"><span\n            class="code-name">artifactId</span></span></span><span class="code-tag">&gt;</span></span>\n  <span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span class="code-tag"><span\n          class="code-name">version</span></span></span><span class="code-tag">&gt;</span></span>3.3.0<span\n            class="code-tag"><span class="code-tag">&lt;/</span><span class="code-name"><span class="code-tag"><span\n            class="code-name">version</span></span></span><span class="code-tag">&gt;</span></span>\n<span class="code-tag"><span class="code-tag">&lt;/</span><span class="code-name"><span class="code-tag"><span\n        class="code-name">dependency</span></span></span><span class="code-tag">&gt;</span></span></code></pre>\n<p>然后下列代码展示了创建一个具有Metrics功能的<em>Vertx</em>实例以及从中读取指标数据。</p>\n<pre class="cs"><code class="cs"><span class="code-keyword"><span class="code-keyword">public</span></span> <span\n        class="code-keyword"><span class="code-keyword">class</span></span> <span class="code-title"><span\n        class="code-title">VertxMetricDemo</span></span> {\n\t<span class="hljs-function"><span class="code-keyword"><span class="hljs-function"><span\n            class="code-keyword">public</span></span></span><span class="hljs-function"> </span><span\n            class="code-keyword"><span class="hljs-function"><span class="code-keyword">static</span></span></span><span\n            class="hljs-function"> </span><span class="code-keyword"><span class="hljs-function"><span\n            class="code-keyword">void</span></span></span><span class="hljs-function"> </span><span\n            class="code-title"><span class="hljs-function"><span class="code-title">main</span></span></span><span\n            class="hljs-function">(</span><span class="hljs-params"><span class="hljs-function"><span\n            class="hljs-params">String[] args</span></span></span><span class="hljs-function">) </span></span>{\n\t\t<span class="code-comment"><span class="code-comment">// 使用DropwizardMetricsOptions配置创建单机Vertx实例</span></span>\n\t\tVertx vertx = Vertx.vertx(\n\t\t\t\t<span class="code-keyword"><span class="code-keyword">new</span></span> VertxOptions().setMetricsOptions(\n\t\t\t\t\t\t<span class="code-keyword"><span class="code-keyword">new</span></span> DropwizardMetricsOptions().setEnabled(<span\n            class="hljs-literal"><span class="hljs-literal">true</span></span>)\n\t\t\t\t));\n\n\t\t<span class="code-comment"><span class="code-comment">// 创建指标服务</span></span>\n\t\tMetricsService metricsService = MetricsService.create(vertx);\n\n\t\t<span class="code-comment"><span class="code-comment">// 获取当前的指标服务</span></span>\n\t\tJsonObject json = metricsService.getMetricsSnapshot(vertx);\n\n\t\t<span class="code-comment"><span class="code-comment">// 输出</span></span>\n\t\tSystem.<span class="code-keyword"><span class="code-keyword">out</span></span>.println(json);\n\t}\n}</code></pre>\n<p>Vert.x实现指标功能的原理是接口继承Measured，这些接口包括HttpServer、NetServer、EventBus、Vertx等。通过Measured可以注入对各种组件的指标统计。</p>\n<p><a title="MetricsService" href="http://vertx.io/docs/apidocs/io/vertx/ext/dropwizard/MetricsService.html"\n      rel="nofollow">MetricsService</a>提供了丰富的功能接口来获取各种指标数据，每一项指标数据都有自己特定的命名规则。我们可以过全称获取某一项指标，例如获取eventBus上的handler相关指标，可以使用以下方法：\n</p>\n<pre class="lua"><code class="lua">JsonObject metrics = metricsService.getMetricsSnapshot(vertx);\nmetrics.getJsonObject(<span class="code-string"><span\n            class="code-string">"vertx.eventbus.handlers"</span></span>);</code></pre>\n<p>或者直接从指定的eventBus获取数据：</p>\n<pre class="lua"><code class="lua">EventBus eventBus = vertx.eventBus();\nJsonObject metrics = metricsService.getMetricsSnapshot(eventBus);\nmetrics.getJsonObject(<span class="code-string"><span class="code-string">"handlers"</span></span>);</code></pre>\n<p>两种方式获得同样的数据，只要接口继承了Measured就可以用MetricsService::create来获取指标。</p>\n\n<h3 id="h3-2">指标格式和指标数据</h3>\n<p>Metric提供了丰富的数据格式。目前有：Gauge（测量值）、Counter（计数器）、Histogram（柱状图）、Meter（仪表）、ThroughputMeter（吞吐量统计）、Timer（计时器）和Throughput\n    Timer（吞吐量计时器）。</p>\n<p>Vert.x提供了丰富的指标数据内容，下面将一一列举说明。</p>\n\n<h4 id="h4-1">Vert.x指标</h4>\n<blockquote>\n    <ul>\n        <li><p><code>vertx.event-loop-size</code>&nbsp;- 类型：Gauge（测量值）含义：event loop线程池的线程数量。</p></li>\n        <li><p><code>vertx.worker-pool-size</code>&nbsp;- 类型：Gauge（测量值）含义：worker线程池的线程数量。</p></li>\n        <li><p><code>vertx.cluster-host</code>&nbsp;- 类型：Gauge（测量值）含义：集群主机的设置值。</p></li>\n        <li><p><code>vertx.cluster-port</code>&nbsp;- 类型：Gauge（测量值）含义：集群接口的设置值。</p></li>\n        <li><p><code>vertx.verticles</code>&nbsp;- 类型：Counter（计数器）含义：当前已部署的verticles数量。</p></li>\n        <li><p><code>vertx.verticles.&lt;verticle-name&gt;</code>&nbsp;- 类型：Counter（计数器）含义：&lt;verticle-name&gt;指定名称的verticle部署数量。\n        </p></li>\n    </ul>\n</blockquote>\n\n<h4 id="h4-2">Event bus 指标</h4>\n<p>基础名称:&nbsp;<code>vertx.eventbus</code></p>\n<blockquote>\n    <ul>\n        <li><p><code>handlers</code>&nbsp;- 类型：Counter（计数器）含义： event bus中已注册handler的数量。</p></li>\n        <li><p><code>handlers.myaddress</code>&nbsp;- 类型：Timer（计时器）含义：名为<em>myaddress</em>的handler出个单个messages的速率。</p>\n        </li>\n        <li><p><code>messages.bytes-read</code>&nbsp;- 类型：Meter（仪表）含义：获取远程信息的字节数总量。</p></li>\n        <li><p><code>messages.bytes-written</code>&nbsp;- 类型：Meter（仪表）含义：发送到远程地址的信息数据总量。</p></li>\n        <li><p><code>messages.pending</code>&nbsp;- 类型：Counter（计数器）含义：已经被eventbus接受，但是还未被handler处理的信息数。</p></li>\n        <li><p><code>messages.pending-local</code>&nbsp;- 类型：Counter（计数器）含义：由本地发送的已经被eventbus接受，但是还未被handler处理的信息数。</p>\n        </li>\n        <li><p><code>messages.pending-remote</code>&nbsp;- 类型：Counter（计数器）含义：由远程发送的已经被eventbus接受，但是还未被handler处理的信息数。</p>\n        </li>\n        <li><p><code>messages.received</code>&nbsp;- 类型：ThroughputMeter（吞吐量统计）含义：表示接受消息条目数的速率。</p></li>\n        <li><p><code>messages.received-local</code>&nbsp;- 类型：ThroughputMeter（吞吐量统计）含义：表示接受本地消息条目数的速率。</p></li>\n        <li><p><code>messages.received-remote</code>&nbsp;- 类型：ThroughputMeter（吞吐量统计）含义：表示接受远程消息条目数的速率。</p></li>\n        <li><p><code>messages.delivered</code>&nbsp;- 类型：ThroughputMeter（吞吐量统计）含义：表示消息被传递到一个处理程序的速率。</p></li>\n        <li><p><code>messages.delivered-local</code>&nbsp;- 类型：ThroughputMeter（吞吐量统计）含义：表示本地消息被传递到一个handler的速率。</p></li>\n        <li><p><code>messages.delivered-remote</code>&nbsp;- 类型：ThroughputMeter（吞吐量统计）含义：表示远程消息被传递到一个handler的速率。</p>\n        </li>\n        <li><p><code>messages.sent</code>&nbsp;- 类型：ThroughputMeter（吞吐量统计）含义：表示消息被发送的速率。</p></li>\n        <li><p><code>messages.sent-local</code>&nbsp;- 类型：ThroughputMeter（吞吐量统计）含义：表示消息被发送到本地的速率。</p></li>\n        <li><p><code>messages.sent-remote</code>&nbsp;- 类型：ThroughputMeter（吞吐量统计）含义：表示消息被发送到远程服务的速率。</p></li>\n        <li><p><code>messages.published</code>&nbsp;- 类型：ThroughputMeter（吞吐量统计）含义：表示发布消息的速率。</p></li>\n        <li><p><code>messages.published-local</code>&nbsp;- 类型：ThroughputMeter（吞吐量统计）含义：表示发布本地消息的速率。</p></li>\n        <li><p><code>messages.published-remote</code>&nbsp;- 类型：ThroughputMeter（吞吐量统计）含义：表示发布远程消息的速率。</p></li>\n        <li><p><code>messages.reply-failures</code>&nbsp;- 类型：Meter含义：表示回复失败的频率。</p></li>\n    </ul>\n</blockquote>\n\n<h4 id="h4-3">Http 服务指标</h4>\n<p>基础名称:&nbsp;<code>vertx.http.servers.&lt;host&gt;:&lt;port&gt;</code></p>\n<p>Http 服务的数据包括&nbsp;<strong><em>Net服务的指标&nbsp;</em></strong>加上以下指标：</p>\n<blockquote>\n    <ul>\n        <li><p><code>requests</code>&nbsp;- 类型：Throughput Timer（吞吐量计时器）含义：单个请求及其出现的频率。</p></li>\n        <li><p><code>&lt;http-method&gt;-requests</code>&nbsp;- 类型：Throughput Timer（吞吐量计时器）含义：指定由&lt;http-method&gt;（PUT、GET、POST等）表示方法获取的请求及其频率。\n        </p>\n            <ul>\n                <li><p>例如:&nbsp;<code>get-requests</code>,&nbsp;<code>post-requests</code></p></li>\n            </ul>\n        </li>\n        <li><p><code>&lt;http-method&gt;-requests./&lt;uri&gt;</code>&nbsp;- A&nbsp;Throughput Timer（吞吐量计时器）含义：指定由&lt;http-method&gt;表示的方法和/&lt;uri&gt;表示的路径的请求内容及其频率。\n        </p>\n            <ul>\n                <li><p>例如:&nbsp;<code>get-requests./some/uri</code>,&nbsp;<code>post-requests./some/uri?foo=bar</code>\n                </p></li>\n            </ul>\n        </li>\n        <li><p><code>responses-1xx</code>&nbsp;- 类型：ThroughputMeter（吞吐量统计）含义：1xx响应的频次。</p></li>\n        <li><p><code>responses-2xx</code>&nbsp;- 类型：ThroughputMeter（吞吐量统计）含义：2xx响应的频次。</p></li>\n        <li><p><code>responses-3xx</code>&nbsp;- 类型：ThroughputMeter（吞吐量统计）含义：3xx响应的频次。</p></li>\n        <li><p><code>responses-4xx</code>&nbsp;- 类型：ThroughputMeter（吞吐量统计）含义：4xx响应的频次。</p></li>\n        <li><p><code>responses-5xx</code>&nbsp;- 类型：ThroughputMeter（吞吐量统计）含义：5xx响应的频次。</p></li>\n        <li><p><code>open-websockets</code>&nbsp;- 类型：Counter（计数器）含义：打开网络套接字的连接个数。</p></li>\n        <li><p><code>open-websockets.&lt;remote-host&gt;</code>&nbsp;- 类型：Counter（计数器）含义：连接到&lt;remote-host&gt;指定的地址打开网络套接字的连接个数。\n        </p></li>\n    </ul>\n</blockquote>\n\n<h4 id="h4-4">Net 服务指标</h4>\n<p>基础名称:&nbsp;<code>vertx.net.servers.&lt;host&gt;:&lt;port&gt;</code></p>\n<blockquote>\n    <ul>\n        <li><p><code>open-netsockets</code>&nbsp;- 类型：Counter（计数器）含义：打开net socket的连接数。</p></li>\n        <li><p><code>open-netsockets.&lt;remote-host&gt;</code>&nbsp;- 类型：Counter（计数器）含义：连接到指定的远程主机所打开的net socket连接数。\n        </p></li>\n        <li><p><code>connections</code>&nbsp;- 类型：Timer（计时器）含义：创建连接的频率。</p></li>\n        <li><p><code>exceptions</code>&nbsp;- 类型：Counter（计数器）含义：出现异常的次数。</p></li>\n        <li><p><code>bytes-read</code>&nbsp;- 类型：Histogram（柱状图）含义：读取的字节数。</p></li>\n        <li><p><code>bytes-written</code>&nbsp;- 类型：Histogram（柱状图）含义：写入的字节数。</p></li>\n    </ul>\n</blockquote>\n\n<h4 id="h4-5">池指标（Pool metrics）</h4>\n<p>基础名称:&nbsp;<code>vertx.pool.&lt;type&gt;.&lt;name&gt;</code>。这里的<code>type</code>表示池类型(例如&nbsp;<em>worker</em>、<em>datasource</em>)，&nbsp;<code>name</code>表示池的名称(例如&nbsp;<code>vert.x-worker-thread</code>)。\n</p>\n<p>类型为<em>worker</em>的线程池是用于阻塞运行的工作线程池，Vert.x将其用于<em>vert.x-worker-thread</em>线程或<em>vert.x-internal-blocking</em>线程。\n    名为worker的执行线程都使用<code><a title="WorkerExecutor"\n                             href="http://vertx.io/docs/apidocs/io/vertx/core/WorkerExecutor.html" rel="nofollow">WorkerExecutor</a></code>来创建。\n</p>\n<p>数据源（Datasource）使用Vert.x的JDBC客户端创建，名为<em>datasource</em>.</p>\n<blockquote>\n    <ul>\n        <li><p><code>queue-delay</code>&nbsp;- 类型：Timer（计时器）含义：测量获取某个资源的等待时间，例如在队列中的等待时间。</p></li>\n        <li><p><code>queue-size</code>&nbsp;- 类型：Counter（计数器）含义：在队列中等待的资源数。</p></li>\n        <li><p><code>usage</code>&nbsp;- 类型：Timer（计时器）含义：测量某个资源被持续使用的时间。</p></li>\n        <li><p><code>in-use</code>&nbsp;- 类型：Counter（计数器）含义：使用资源的实际数量。</p></li>\n        <li><p><code>pool-ratio</code>&nbsp;- 类型：Gauge（测量值）含义：已使用的资源和池规模的比率。</p></li>\n        <li><p><code>max-pool-size</code>&nbsp;- 类型：Gauge（测量值）含义：池的最大规模。</p></li>\n    </ul>\n</blockquote>\n<p>当池的最大规模没有声明时，<code>pool-ratio</code>和<code>max_pool_size</code>将没有任何数据。</p>\n<p>除了以上服务器端的指标之外，Vertx还包括一些客户端指标，有需要可以去官网查看。</p>\n\n<h2 id="h2-3">图形化展示指标数据</h2>\n<p>在收集到各种指标数据之后，如果只能输出到console看各字符串就太没意思了。在互联网时代，必须有牛逼闪闪的图形统计工具啊，下面将介绍使用开源项目呈现数据报表。</p>\n<p>官网介绍了2个开源工具来实现呈现报表的功能——Jolokia和Hawtio。</p>\n\n<h3 id="h3-3">Jolokia代理</h3>\n<p><a title="Jolokia" href="https://jolokia.org/" rel="nofollow">Jolokia </a>是按照JSR-160的要求实现JMX-HTTP桥接的工具。按照官网的说法，有非常多的平台使用了Jolokia，并且Jolokia在处理远程连接时提供了更安全的支持。（另外一篇博文介绍了Jolokia，想了解点这里：<a\n        href="http://my.oschina.net/chkui/blog/708639" rel="nofollow">http://my.oschina.net/chkui/blog/708639</a>）</p>\n<p>首先，需要像下面这样创建一个Vertx实例：</p>\n<pre class="actionscript"><code class="language-java">Vertx vertx = Vertx.vertx(<span class="code-keyword"><span\n        class="code-keyword">new</span></span> VertxOptions().setMetricsOptions(\n    <span class="code-keyword"><span class="code-keyword">new</span></span> DropwizardMetricsOptions()\n        .setEnabled(<span class="code-keyword"><span class="hljs-literal">true</span></span>)\n        .setJmxEnabled(<span class="code-keyword"><span class="hljs-literal">true</span></span>)\n        .setJmxDomain(<span class="code-string"><span class="code-string">"vertx-metrics"</span></span>)));</code></pre>\n<p><em>Domain&nbsp;</em>参数是可以修改的，这个参数会影响Hawtio的服务的浏览名称，下文会有说明。完成这个配并启用统计功能后，vertx-dropwizard-metric会暴露本地的的Mbean服务接口，Jolokia可以通过这个接口获取指标数据。（<span\n        style="color:#FFA07A">以上配置也可以用于Vert.x的集群环境。</span>）</p>\n<p>然后，我们插入Jolokia来做桥接功能。</p>\n<p>首先到官网去下载最新的代理包&lt;<a title="Jolokia代理包"\n                        href="http://search.maven.org/remotecontent?filepath=org/jolokia/jolokia-jvm/1.3.3/jolokia-jvm-1.3.3-agent.jar"\n                        rel="nofollow">点我下载</a>&gt;。下载完成后，需要嵌入到我们自己的应用中，像下面这样在java启动命令中增加以下参数来植入Jolokia代理：</p>\n<pre class="xml"><code class="xml">-javaagent:%jolokia_home%/jolokia-jvm-<span class="code-tag"><span class="code-tag">&lt;</span><span\n        class="code-name"><span class="code-tag"><span class="code-name">version</span></span></span><span\n        class="code-tag">&gt;</span></span>-agent.jar=port=7777,host=localhost</code></pre>\n<p>下面是完整的例子：</p>\n<pre class="groovy"><code class="groovy">java -<span class="code-string"><span\n        class="code-string">javaagent:</span></span><span class="code-string"><span class="code-string">D:</span></span><span\n        class="hljs-regexp"><span class="hljs-regexp">/soft/</span></span>jolokia/jolokia-jvm<span\n        class="hljs-number"><span class="hljs-number">-1.3</span></span><span class="hljs-number"><span\n        class="hljs-number">.3</span></span>-agent.jar=port=<span class="hljs-number"><span\n        class="hljs-number">7777</span></span>,host=localhost com.a.b.c.runApp</code></pre>\n<p>在eclipse下，右键-&gt;[Debug|Run] As-&gt;[Debug|Run] Config。弹出的选项卡中，选择Arguments。然后在VM arguments中增加代理参数，如下图：</p>\n<p><img alt="Vert.x Dropwizard指标数据监控" height="535"\n        src="http://static.oschina.net/uploads/space/2016/0712/165407_jrTG_2649413.png" width="900"></p>\n<p>然后点击右下角的Debug启动。如果启动成功，会在控制台输出。</p>\n<blockquote>\n    <p>I&gt; No access restrictor found, access to any MBean is allowed<br> Jolokia: Agent started with URL\n        http://127.0.0.1:7777/jolokia/</p>\n</blockquote>\n<p>至此。我们的Vertx实例成功启动，启动的同时开启了：</p>\n<ol>\n    <li>Dropwizard Metrics用于指标收集；</li>\n    <li>Jmx暴露桥接接口；</li>\n    <li>Jolokia提供指标数据Rest接口；</li>\n</ol>\n<p>随后，我们需要添加一个Hawtio来获取Jolokia暴露的接口数据。</p>\n\n<h3 id="h3-4">Hawtio展示指标数据</h3>\n<p>Hawtio看做一个web服务即可，他按照servlet规范开发，是个标准的web服务。他功能就是从暴露的Jolokia接口中读取指标数据，然后以图像化的方式呈现给用户。下面说明如何搭建好Hawtio服务。</p>\n<p>首先下载Hawtio的war包&lt;<a title="Hawtio运行包"\n                         href="https://oss.sonatype.org/content/repositories/public/io/hawt/hawtio-default/1.4.65/hawtio-default-1.4.65.war"\n                         rel="nofollow">点我下载</a>&gt;。</p>\n<p>然后将war包放置到web容器中。Hawtio支持多种servlet规范的web容器，如中国javaer最喜欢的tomcat和jetty，还有Karaf\n    、Wildfly(Jboss)等。每种容器的配置都有些许不同，我们这里只说明如何配置Tomcat，其他容器的配置方法见<a title="Hawtio的配置说明"\n                                                                  href="http://hawt.io/configuration/index.html"\n                                                                  rel="nofollow">Hawtio的配置说明</a>。</p>\n<p>使用的tomcat并没有多少配置，如果不需要管理用户权限的话，把download的war包直接丢到webapps里启动tomcat就可以看到以下页面了：</p>\n<p><img alt="Vert.x Dropwizard指标数据监控" height="337"\n        src="https://file.mahoooo.com/res/file/vertx_metrics_using_dropwizard_2018_5_7_1.png" width="600"></p>\n<p>然后点击Connect栏,可以看到以下内容：</p>\n<p><img alt="Vert.x Dropwizard指标数据监控" height="319"\n        src="https://file.mahoooo.com/res/file/vertx_metrics_using_dropwizard_2018_5_7_2.png" width="600"></p>\n<p>\n    在表单中填写连接内容：Name随便取一个即可、Scheme选择默认的http、Host填写主机地址（本例是在本地运行，使用127.0.0.1或者localhost）、端口使用前面启动Jolokia使用的端口、Path选择Jolokia。然后点击Connect\n    to remote server。</p>\n<p>连接成功后点击左上角导航栏里的JMX（其他菜单可以看到cpu、内存、线程的使用情况等）。下图就是Hawtio图形化的指标数据，提供多种图标（Chart）。这里的文件夹名称“vertx-metrics”就是在上面代码 <span\n        style="color:#0000FF"><em>setJmxDomain("vertx-metrics")&nbsp;</em></span>中命名的domian名称。</p>\n<p><img alt="Vert.x Dropwizard指标数据监控" height="392"\n        src="https://file.mahoooo.com/res/file/vertx_metrics_using_dropwizard_2018_5_7_3.png" width="800">&nbsp;&nbsp;&nbsp;\n</p>\n<p>Hawtio除了展示Vertx相关的所有数据外，还可以看到Jvm相关的其他数据，例如Cpu、堆、栈、线程池等。如果需要的话，还可以把自己定义更多的监控数据传递到Hawtio显示。</p>\n\n<h3 id="h3-5">Hawtio权限管理</h3>\n<p>上面例子说明了如何使用Hawtio展示指标数据。但是任何使用者都可以查看到相关数据。Hawtio提供了开箱即用的用户权限控制功能。需要针对不同的容器环境进行配置。这里以tomcat为例。</p>\n<p>在tomcat的启动脚本中添加下面的参数：</p>\n<p>linux：</p>\n<pre class="bash"><code class="bash"><span class="code-built_in"><span class="code-built_in">export</span></span> CATALINA_OPTS=<span\n        class="code-string"><span class="code-string">\'-Dhawtio.authenticationEnabled=true -Dhawtio.role=manager\'</span></span></code></pre>\n<p>windows：</p>\n<pre class="bash"><code class="bash"><span class="code-built_in"><span class="code-built_in">set</span></span> JAVA_OPTS=-Dhawtio.authenticationEnabled=<span\n        class="hljs-literal"><span class="hljs-literal">true</span></span>\n</code></pre>\n<p>然后Hawtio会使用tomcat的用户权限来控制自身的用户权限。也就是说，如果在 %TOMCAT_HOME%/conf/tomcat-users.xml中配置了以下内容：</p>\n<pre class="xml"><code class="xml"><span class="code-tag"><span class="code-tag">&lt;</span><span\n        class="code-name"><span class="code-tag"><span class="code-name">user</span></span></span><span\n        class="code-tag"> </span><span class="hljs-attr"><span class="code-tag"><span class="hljs-attr">username</span></span></span><span\n        class="code-tag">=</span><span class="code-string"><span class="code-tag"><span\n        class="code-string">"user"</span></span></span><span class="code-tag"> </span><span class="hljs-attr"><span\n        class="code-tag"><span class="hljs-attr">password</span></span></span><span class="code-tag">=</span><span\n        class="code-string"><span class="code-tag"><span class="code-string">"passwd"</span></span></span><span\n        class="code-tag"> </span><span class="hljs-attr"><span class="code-tag"><span\n        class="hljs-attr">roles</span></span></span><span class="code-tag">=</span><span class="code-string"><span\n        class="code-tag"><span class="code-string">"tomcat"</span></span></span><span\n        class="code-tag">/&gt;</span></span></code></pre>\n<p>则可以使用user/passwd作为账号密码登录Hawtio。</p>\n<p>配置生效后输入Hawtio的地址会跳转到下面这个页面。</p>\n<p><img alt="Vert.x Dropwizard指标数据监控" height="243"\n        src="https://file.mahoooo.com/res/file/vertx_metrics_using_dropwizard_2018_5_7_4.png" width="400"></p>\n<p>只有登录成功才能继续访问其他资源。</p>\n<p>现在，你的Vert.x已经有了一个牛逼闪闪的图像化监控工具。当然，本文提到的工具不仅仅只能用于监控Vert.x，只要稍加改动，可以监控JVM的方方面面。</p>'}};