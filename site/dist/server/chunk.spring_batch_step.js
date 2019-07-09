exports.ids=[27],exports.modules={368:function(s,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.content='<p>批处理任务的主要业务逻辑都是在<code>Step</code>中去完成的。可以将<code>Job</code>理解为运行<code>Step</code>的框架，而<code>Step</code>理解为业务功能。</p>\n<h2 id="h2-1">Step配置</h2>\n<p><code>Step</code>是<code>Job</code>中的工作单元，每一个<code>Step</code>涵盖了单行记录的处理闭环。下图是一个<code>Step</code>的简要结构：</p>\n<p><img src="https://docs.spring.io/spring-batch/4.2.x/reference/html/images/step.png" alt="Spring Batch(3)——Step控制"\n        class="zoom-in-cursor"></p>\n<p>一个<code>Step</code>通常涵盖三个部分：读数据（Reader）、处理数据（Processor）和写数据（Writer）。但是并不是所有的<code>Step</code>都需要自身来完成数据的处理，比如存储过程等方式是通过外部功能来完成，因此Spring\n    Batch提供了2种Step的处理方式：1）面向分片的<code>ChunkStep</code>，2）面向过程的<code>TaskletStep</code>。但是基本上大部分情况下都是使用面向分片的方式来解决问题。</p>\n<h2 id="h2-2">面向分片的处理过程</h2>\n<p>在<code>Step</code>中数据是按记录（按行）处理的，但是每条记录处理完毕之后马上提交事物反而会导致IO的巨大压力。因此Spring\n    Batch提供了数据处理的分片功能。设置了分片之后，一次工作会从Read开始，然后交由给Processor处理。处理完毕后会进行聚合，待聚合到一定的数量的数据之后一次性调用Write将数据提交到物理数据库。其过程大致为：</p>\n<p><img src="https://docs.spring.io/spring-batch/4.2.x/reference/html/images/chunk-oriented-processing.png"\n        alt="Spring Batch(3)——Step控制" class="zoom-in-cursor"></p>\n<p>在Spring Batch中所谓的事物和数据事物的概念一样，就是一次性提交多少数据。如果在聚合数据期间出现任何错误，所有的这些数据都将不执行写入。</p>\n<h2 id="h2-3">面向对象配置Step</h2>\n<pre><code class="Java"><span class="code-meta">@Bean</span>\n<span class="hljs-function"><span class="code-keyword">public</span> Job <span class="code-title">sampleJob</span><span\n        class="hljs-params">(JobRepository jobRepository, Step sampleStep)</span> </span>{\n    <span class="code-keyword">return</span> <span class="code-keyword">this</span>.jobBuilderFactory.get(<span\n            class="code-string">"sampleJob"</span>)\n    \t\t\t.repository(jobRepository)\n                .start(sampleStep)\n                .build();\n}\n\n<span class="code-meta">@Bean</span>\n<span class="hljs-function"><span class="code-keyword">public</span> Step <span\n        class="code-title">sampleStep</span><span\n        class="hljs-params">(PlatformTransactionManager transactionManager)</span> </span>{\n\t<span class="code-keyword">return</span> <span class="code-keyword">this</span>.stepBuilderFactory.get(<span\n            class="code-string">"sampleStep"</span>)\n\t\t\t\t.transactionManager(transactionManager)\n\t\t\t\t.&lt;String, String&gt;chunk(<span class="hljs-number">10</span>) <span\n            class="code-comment">//分片配置</span>\n\t\t\t\t.reader(itemReader()) <span class="code-comment">//reader配置</span>\n\t\t\t\t.writer(itemWriter()) <span class="code-comment">//write配置</span>\n\t\t\t\t.build();\n}\n</code></pre>\n<p>观察sampleStep方法：</p>\n<ol>\n    <li>reader: 使用ItemReader提供读数据的方法。</li>\n    <li>write：ItemWrite提供写数据的方法。</li>\n    <li>transactionManager：使用默认的 <code>PlatformTransactionManager</code> 对事物进行管理。<strong>当配置好事物之后Spring\n        Batch会自动对事物进行管理，无需开发人员显示操作</strong>。\n    </li>\n    <li>chunk：指定一次性数据提交的记录数，因为任务是基于Step分次处理的，当累计到chunk配置的次数则进行一次提交。提交的内容除了业务数据，还有批处理任务运行相关的元数据。</li>\n</ol>\n<p>是否使用<code>ItemProcessor</code>是一个可选项。如果没有Processor可以将数据视为读取并直接写入。</p>\n<h2 id="h2-4">提交间隔</h2>\n<p><code>Step</code>使用<code>PlatformTransactionManager</code>管理事物。每次事物提交的间隔根据<code>chunk</code>方法中配置的数据执行。如果设置为1，那么在每一条数据处理完之后都会调用<code>ItemWrite</code>进行提交。提交间隔设置太小，那么会浪费需要多不必要的资源，提交间隔设置的太长，会导致事物链太长占用空间，并且出现失败会导致大量数据回滚。因此设定一个合理的间隔是非常必要的，这需要根据实际业务情况、性能要求、以及数据安全程度来设定。如果没有明确的评估目标，设置为10~20较为合适。\n</p>\n<h2 id="h2-5">配置Step重启</h2>\n<p>前文介绍了<code>Job</code>的重启，但是每次重启对<code>Step</code>也是有很大的影响的，因此需要特定的配置。</p>\n<h3 id="h3-1">限定重启次数</h3>\n<p>某些<code>Step</code>可能用于处理一些先决的任务，所以当Job再次重启时这<code>Step</code>就没必要再执行，可以通过设置startLimit来限定某个<code>Step</code>重启的次数。当设置为1时候表示仅仅运行一次，而出现重启时将不再执行：\n</p>\n<pre><code class="Java"><span class="code-meta">@Bean</span>\n<span class="hljs-function"><span class="code-keyword">public</span> Step <span class="code-title">step1</span><span\n        class="hljs-params">()</span> </span>{\n\t<span class="code-keyword">return</span> <span class="code-keyword">this</span>.stepBuilderFactory.get(<span\n            class="code-string">"step1"</span>)\n\t\t\t\t.&lt;String, String&gt;chunk(<span class="hljs-number">10</span>)\n\t\t\t\t.reader(itemReader())\n\t\t\t\t.writer(itemWriter())\n\t\t\t\t.startLimit(<span class="hljs-number">1</span>)\n\t\t\t\t.build();\n}\n</code></pre>\n<h3 id="h3-2">重启已经完成任务的Step</h3>\n<p>\n    在单个<code>JobInstance</code>的上下文中，如果某个<code>Step</code>已经处理完毕（COMPLETED）那么在默认情况下重启之后这个<code>Step</code>并不会再执行。可以通过设置<code>allow-start-if-complete</code>为true告知框架每次重启该<code>Step</code>都要执行：\n</p>\n<pre><code class="Java"><span class="code-meta">@Bean</span>\n<span class="hljs-function"><span class="code-keyword">public</span> Step <span class="code-title">step1</span><span\n        class="hljs-params">()</span> </span>{\n\t<span class="code-keyword">return</span> <span class="code-keyword">this</span>.stepBuilderFactory.get(<span\n            class="code-string">"step1"</span>)\n\t\t\t\t.&lt;String, String&gt;chunk(<span class="hljs-number">10</span>)\n\t\t\t\t.reader(itemReader())\n\t\t\t\t.writer(itemWriter())\n\t\t\t\t.allowStartIfComplete(<span class="code-keyword">true</span>)\n\t\t\t\t.build();\n}\n</code></pre>\n<h2 id="h2-6">配置略过逻辑</h2>\n<p>某些时候在任务处理单个记录时中出现失败并不应该停止任务，而应该跳过继续处理下一条数据。是否跳过需要根据业务来判定，因此框架提供了跳过机制交给开发人员使用。如何配置跳过机制：</p>\n<pre><code class="Java"><span class="code-meta">@Bean</span>\n<span class="hljs-function"><span class="code-keyword">public</span> Step <span class="code-title">step1</span><span\n        class="hljs-params">()</span> </span>{\n\t<span class="code-keyword">return</span> <span class="code-keyword">this</span>.stepBuilderFactory.get(<span\n            class="code-string">"step1"</span>)\n\t\t\t\t.&lt;String, String&gt;chunk(<span class="hljs-number">10</span>)\n\t\t\t\t.reader(flatFileItemReader())\n\t\t\t\t.writer(itemWriter())\n\t\t\t\t.faultTolerant()\n\t\t\t\t.skipLimit(<span class="hljs-number">10</span>)\n\t\t\t\t.skip(FlatFileParseException.class)\n\t\t\t\t.build();\n}\n</code></pre>\n<p>代码的含义是当处理过程中抛出<code>FlatFileParseException</code>异常时就跳过该条记录的处理。<code>skip-limit</code>（skipLimit方法）配置的参数表示当跳过的次数超过数值时则会导致整个<code>Step</code>失败，从而停止继续运行。还可以通过反向配置的方式来忽略某些异常：\n</p>\n<pre><code class="Java"><span class="code-meta">@Bean</span>\n<span class="hljs-function"><span class="code-keyword">public</span> Step <span class="code-title">step1</span><span\n        class="hljs-params">()</span> </span>{\n\t<span class="code-keyword">return</span> <span class="code-keyword">this</span>.stepBuilderFactory.get(<span\n            class="code-string">"step1"</span>)\n\t\t\t\t.&lt;String, String&gt;chunk(<span class="hljs-number">10</span>)\n\t\t\t\t.reader(flatFileItemReader())\n\t\t\t\t.writer(itemWriter())\n\t\t\t\t.faultTolerant()\n\t\t\t\t.skipLimit(<span class="hljs-number">10</span>)\n\t\t\t\t.skip(Exception.class)\n\t\t\t\t.noSkip(FileNotFoundException.class)\n\t\t\t\t.build();\n}\n</code></pre>\n<p><code>skip</code>表示要当捕捉到<em>Exception</em>异常就跳过。但是<em>Exception</em>有很多继承类，此时可以使用<code>noSkip</code>方法指定某些异常不能跳过。</p>\n<h2 id="h2-7">设置重试逻辑</h2>\n<p>当处理记录出个异常之后并不希望他立即跳过或者停止运行，而是希望可以多次尝试执行直到失败：</p>\n<pre><code class="Java"><span class="code-meta">@Bean</span>\n<span class="hljs-function"><span class="code-keyword">public</span> Step <span class="code-title">step1</span><span\n        class="hljs-params">()</span> </span>{\n\t<span class="code-keyword">return</span> <span class="code-keyword">this</span>.stepBuilderFactory.get(<span\n            class="code-string">"step1"</span>)\n\t\t\t\t.&lt;String, String&gt;chunk(<span class="hljs-number">2</span>)\n\t\t\t\t.reader(itemReader())\n\t\t\t\t.writer(itemWriter())\n\t\t\t\t.faultTolerant()\n\t\t\t\t.retryLimit(<span class="hljs-number">3</span>)\n\t\t\t\t.retry(DeadlockLoserDataAccessException.class)\n\t\t\t\t.build();\n}\n</code></pre>\n<p><code>retry(DeadlockLoserDataAccessException.class)</code>表示只有捕捉到该异常才会重试，<code>retryLimit(3)</code>表示最多重试3次，<code>faultTolerant()</code>表示启用对应的容错功能。\n</p>\n<h2 id="h2-8">事物回滚控制</h2>\n<p>默认情况下，无论是设置了重试（retry）还是跳过（skip），只要从<code>Writer</code>抛出一个异常都会导致事物回滚。如果配置了skip机制，那么在<code>Reader</code>中抛出的异常不会导致回滚。有些从<code>Writer</code>抛出一个异常并不需要回滚数据，<code>noRollback</code>属性为<code>Step</code>提供了不必进行事物回滚的异常配置：\n</p>\n<pre><code class="Java"><span class="code-meta">@Bean</span>\n<span class="hljs-function"><span class="code-keyword">public</span> Step <span class="code-title">step1</span><span\n        class="hljs-params">()</span> </span>{\n\t<span class="code-keyword">return</span> <span class="code-keyword">this</span>.stepBuilderFactory.get(<span\n            class="code-string">"step1"</span>)\n\t\t\t\t.&lt;String, String&gt;chunk(<span class="hljs-number">2</span>)\n\t\t\t\t.reader(itemReader())\n\t\t\t\t.writer(itemWriter())\n\t\t\t\t.faultTolerant()\n\t\t\t\t.noRollback(ValidationException.class) <span class="code-comment">//不必回滚的异常</span>\n\t\t\t\t.build();\n}\n</code></pre>\n<h2 id="h2-9">事物数据读取的缓存</h2>\n<p>一次<code>Setp</code>分为<code>Reader</code>、<code>Processor</code>和<code>Writer</code>三个阶段，这些阶段统称为<code>Item</code>。默认情况下如果错误不是发生在Reader阶段，那么没必要再去重新读取一次数据。但是某些场景下需要Reader部分也需要重新执行，比如Reader是从一个JMS队列中消费消息，当发生回滚的时候消息也会在队列上重放，因此也要将Reader纳入到回滚的事物中，根据这个场景可以使用<code>readerIsTransactionalQueue</code>来配置数据重读：\n</p>\n<pre><code class="Java"><span class="code-meta">@Bean</span>\n<span class="hljs-function"><span class="code-keyword">public</span> Step <span class="code-title">step1</span><span\n        class="hljs-params">()</span> </span>{\n\t<span class="code-keyword">return</span> <span class="code-keyword">this</span>.stepBuilderFactory.get(<span\n            class="code-string">"step1"</span>)\n\t\t\t\t.&lt;String, String&gt;chunk(<span class="hljs-number">2</span>)\n\t\t\t\t.reader(itemReader())\n\t\t\t\t.writer(itemWriter())\n\t\t\t\t.readerIsTransactionalQueue() <span class="code-comment">//数据重读</span>\n\t\t\t\t.build();\n}\n</code></pre>\n<h2 id="h2-10">事物属性</h2>\n<p>\n    事物的属性包括<strong>隔离等级（isolation）</strong>、<strong>传播方式（propagation）<strong>以及</strong>过期时间（timeout）</strong>。关于事物的控制详见<a\n        href="https://docs.spring.io/spring/docs/current/spring-framework-reference/data-access.html#transaction"\n        title="Spring Data Access">Spring Data Access</a>的说明，下面是相关配置的方法：</p>\n<pre><code class="Java"><span class="code-meta">@Bean</span>\n<span class="hljs-function"><span class="code-keyword">public</span> Step <span class="code-title">step1</span><span\n        class="hljs-params">()</span> </span>{\n\t<span class="code-comment">//配置事物属性</span>\n\tDefaultTransactionAttribute attribute = <span class="code-keyword">new</span> DefaultTransactionAttribute();\n\tattribute.setPropagationBehavior(Propagation.REQUIRED.value());\n\tattribute.setIsolationLevel(Isolation.DEFAULT.value());\n\tattribute.setTimeout(<span class="hljs-number">30</span>);\n\n\t<span class="code-keyword">return</span> <span class="code-keyword">this</span>.stepBuilderFactory.get(<span\n            class="code-string">"step1"</span>)\n\t\t\t\t.&lt;String, String&gt;chunk(<span class="hljs-number">2</span>)\n\t\t\t\t.reader(itemReader())\n\t\t\t\t.writer(itemWriter())\n\t\t\t\t.transactionAttribute(attribute) <span class="code-comment">//设置事物属性</span>\n\t\t\t\t.build();\n}\n</code></pre>\n<h2 id="h2-11">向Step注册 ItemStream</h2>\n<p><code>ItemStream</code>是用于每一个阶段（Reader、Processor、Writer）的“生命周期回调数据处理器”，后续的文章会详细介绍<code>ItemStream</code>。在4.×版本之后默认注入注册了通用的<code>ItemStream</code>。\n</p>\n<p>有2种方式将<code>ItemStream</code>注册到<code>Step</code>中，一是使用<code>stream</code>方法：</p>\n<pre><code class="Java"><span class="code-meta">@Bean</span>\n<span class="hljs-function"><span class="code-keyword">public</span> Step <span class="code-title">step1</span><span\n        class="hljs-params">()</span> </span>{\n\t<span class="code-keyword">return</span> <span class="code-keyword">this</span>.stepBuilderFactory.get(<span\n            class="code-string">"step1"</span>)\n\t\t\t\t.&lt;String, String&gt;chunk(<span class="hljs-number">2</span>)\n\t\t\t\t.reader(itemReader())\n\t\t\t\t.writer(compositeItemWriter())\n\t\t\t\t.stream(fileItemWriter1())\n\t\t\t\t.stream(fileItemWriter2())\n\t\t\t\t.build();\n}\n</code></pre>\n<p>二是使用相关方法的代理：</p>\n<pre><code class="Java"><span class="code-meta">@Bean</span>\n<span class="hljs-function"><span class="code-keyword">public</span> CompositeItemWriter <span class="code-title">compositeItemWriter</span><span\n        class="hljs-params">()</span> </span>{\n\tList&lt;ItemWriter&gt; writers = <span class="code-keyword">new</span> ArrayList&lt;&gt;(<span\n            class="hljs-number">2</span>);\n\twriters.add(fileItemWriter1());\n\twriters.add(fileItemWriter2());\n\tCompositeItemWriter itemWriter = <span class="code-keyword">new</span> CompositeItemWriter();\n\titemWriter.setDelegates(writers);\n\t<span class="code-keyword">return</span> itemWriter;\n}\n</code></pre>\n<h2 id="h2-12">StepExecution拦截器</h2>\n<p>在<code>Step</code>执行的过程中会产生各种各样的事件，开发人员可以利用各种<code>Listener</code>接口对<code>Step</code>及<code>Item</code>进行监听。通常在创建一个Step的时候添加拦截器：\n</p>\n<pre><code class="Java"><span class="code-meta">@Bean</span>\n<span class="hljs-function"><span class="code-keyword">public</span> Step <span class="code-title">step1</span><span\n        class="hljs-params">()</span> </span>{\n\t<span class="code-keyword">return</span> <span class="code-keyword">this</span>.stepBuilderFactory.get(<span\n            class="code-string">"step1"</span>)\n\t\t\t\t.&lt;String, String&gt;chunk(<span class="hljs-number">10</span>)\n\t\t\t\t.reader(reader())\n\t\t\t\t.writer(writer())\n\t\t\t\t.listener(chunkListener()) <span class="code-comment">//添加拦截器</span>\n\t\t\t\t.build();\n}\n</code></pre>\n<p>Spring Batch提供了多个接口以满足不同事件的监听。</p>\n<h3 id="h3-3">StepExecutionListener</h3>\n<p><code>StepExecutionListener</code>可以看做一个通用的<code>Step</code>拦截器，他的作用是在Step开始之前和结束之后进行拦截处理：</p>\n<pre><code class="Java"><span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">interface</span> <span\n        class="code-title">StepExecutionListener</span> <span class="code-keyword">extends</span> <span\n        class="code-title">StepListener</span> </span>{\n    <span class="hljs-function"><span class="code-keyword">void</span> <span class="code-title">beforeStep</span><span\n            class="hljs-params">(StepExecution stepExecution)</span></span>; <span\n            class="code-comment">//Step执行之前</span>\n    <span class="hljs-function">ExitStatus <span class="code-title">afterStep</span><span class="hljs-params">(StepExecution stepExecution)</span></span>; <span\n            class="code-comment">//Step执行完毕之后</span>\n}\n</code></pre>\n<p>在结束的时候开发人员可以自己定义返回的<code>ExitStatus</code>，用于配合流程控制（见后文）实现对整个Step执行过程的控制。</p>\n<h3 id="h3-4">ChunkListener</h3>\n<p><code>ChunkListener</code>是在数据事物发生的两端被触发。<code>chunk</code>的配置决定了处理多少项记录才进行一次事物提交，<code>ChunkListener</code>的作用就是对一次事物开始之后或事物提交之后进行拦截：\n</p>\n<pre><code class="Java"><span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">interface</span> <span\n        class="code-title">ChunkListener</span> <span class="code-keyword">extends</span> <span class="code-title">StepListener</span> </span>{\n    <span class="hljs-function"><span class="code-keyword">void</span> <span class="code-title">beforeChunk</span><span\n            class="hljs-params">(ChunkContext context)</span></span>; <span\n            class="code-comment">//事物开始之后，ItemReader调用之前</span>\n    <span class="hljs-function"><span class="code-keyword">void</span> <span class="code-title">afterChunk</span><span\n            class="hljs-params">(ChunkContext context)</span></span>; <span class="code-comment">//事物提交之后</span>\n    <span class="hljs-function"><span class="code-keyword">void</span> <span\n            class="code-title">afterChunkError</span><span\n            class="hljs-params">(ChunkContext context)</span></span>; <span class="code-comment">//事物回滚之后</span>\n}\n</code></pre>\n<p>如果没有设定chunk也可以使用<code>ChunkListener</code>，它会被<code>TaskletStep</code>调用（<code>TaskletStep</code>见后文）。</p>\n<h3 id="h3-5">ItemReadListener</h3>\n<p>该接口用于对<code>Reader</code>相关的事件进行监控：</p>\n<pre><code class="Java"><span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">interface</span> <span\n        class="code-title">ItemReadListener</span>&lt;<span class="code-title">T</span>&gt; <span class="code-keyword">extends</span> <span\n        class="code-title">StepListener</span> </span>{\n    <span class="hljs-function"><span class="code-keyword">void</span> <span class="code-title">beforeRead</span><span\n            class="hljs-params">()</span></span>;\n    <span class="hljs-function"><span class="code-keyword">void</span> <span class="code-title">afterRead</span><span\n            class="hljs-params">(T item)</span></span>;\n    <span class="hljs-function"><span class="code-keyword">void</span> <span class="code-title">onReadError</span><span\n            class="hljs-params">(Exception ex)</span></span>;\n}\n</code></pre>\n<p><code>beforeRead</code>在每次<code>Reader</code>调用之前被调用，<code>afterRead</code>在每次<code>Reader</code>成功返回之后被调用，而<code>onReadError</code>会在出现异常之后被调用，可以将其用于记录异常日志。\n</p>\n<h3 id="h3-6">ItemProcessListener</h3>\n<p><code>ItemProcessListener</code>和<code>ItemReadListener</code>类似，是围绕着<code>ItemProcessor</code>进行处理的：</p>\n<pre><code class="Java"><span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">interface</span> <span\n        class="code-title">ItemProcessListener</span>&lt;<span class="code-title">T</span>, <span\n        class="code-title">S</span>&gt; <span class="code-keyword">extends</span> <span\n        class="code-title">StepListener</span> </span>{\n    <span class="hljs-function"><span class="code-keyword">void</span> <span\n            class="code-title">beforeProcess</span><span class="hljs-params">(T item)</span></span>; <span\n            class="code-comment">//processor执行之前</span>\n    <span class="hljs-function"><span class="code-keyword">void</span> <span class="code-title">afterProcess</span><span\n            class="hljs-params">(T item, S result)</span></span>; <span class="code-comment">//processor直线成功之后</span>\n    <span class="hljs-function"><span class="code-keyword">void</span> <span\n            class="code-title">onProcessError</span><span class="hljs-params">(T item, Exception e)</span></span>; <span\n            class="code-comment">//processor执行出现异常</span>\n}\n</code></pre>\n<h3 id="h3-7">ItemWriteListener</h3>\n<p><code>ItemWriteListener</code>的功能和<code>ItemReadListener</code>、<code>ItemReadListener</code>类似，但是需要注意的是它接收和处理的数据对象是一个<code>List</code>。<code>List</code>的长度与chunk配置相关。\n</p>\n<pre><code class="Java"><span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">interface</span> <span\n        class="code-title">ItemWriteListener</span>&lt;<span class="code-title">S</span>&gt; <span class="code-keyword">extends</span> <span\n        class="code-title">StepListener</span> </span>{\n    <span class="hljs-function"><span class="code-keyword">void</span> <span class="code-title">beforeWrite</span><span\n            class="hljs-params">(List&lt;? extends S&gt; items)</span></span>;\n    <span class="hljs-function"><span class="code-keyword">void</span> <span class="code-title">afterWrite</span><span\n            class="hljs-params">(List&lt;? extends S&gt; items)</span></span>;\n    <span class="hljs-function"><span class="code-keyword">void</span> <span class="code-title">onWriteError</span><span\n            class="hljs-params">(Exception exception, List&lt;? extends S&gt; items)</span></span>;\n}\n</code></pre>\n<h3 id="h3-8">SkipListener</h3>\n<p><code>ItemReadListener</code>、<code>ItemProcessListener</code>和<code>ItemWriteListener</code>都提供了错误拦截处理的机制，但是没有处理跳过（skip）的数据记录。因此框架提供了<code>SkipListener</code>来专门处理那么被跳过的记录：\n</p>\n<pre><code class="Java"><span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">interface</span> <span\n        class="code-title">SkipListener</span>&lt;<span class="code-title">T</span>,<span class="code-title">S</span>&gt; <span\n        class="code-keyword">extends</span> <span class="code-title">StepListener</span> </span>{\n    <span class="hljs-function"><span class="code-keyword">void</span> <span class="code-title">onSkipInRead</span><span\n            class="hljs-params">(Throwable t)</span></span>; <span class="code-comment">//Read期间导致跳过的异常</span>\n    <span class="hljs-function"><span class="code-keyword">void</span> <span\n            class="code-title">onSkipInProcess</span><span\n            class="hljs-params">(T item, Throwable t)</span></span>; <span\n            class="code-comment">//Process期间导致跳过的异常</span>\n    <span class="hljs-function"><span class="code-keyword">void</span> <span\n            class="code-title">onSkipInWrite</span><span class="hljs-params">(S item, Throwable t)</span></span>; <span\n            class="code-comment">//Write期间导致跳过的异常</span>\n}\n</code></pre>\n<p><code>SkipListener</code>的价值是可以将那些未能成功处理的记录在某个位置保存下来，然后交给其他批处理进一步解决，或者人工来处理。Spring Batch保证以下2个特征：</p>\n<ol>\n    <li>跳过的元素只会出现一次。</li>\n    <li><code>SkipListener</code>始终在事物提交之前被调用，这样可以保证监听器使用的事物资源不会被业务事物影响。</li>\n</ol>\n<h2 id="h2-13">TaskletStep</h2>\n<p>面向分片（Chunk-oriented processing\n    ）的过程并不是Step的唯一执行方式。比如用数据库的存储过程来处理数据，这个时候使用标准的Reader、Processor、Writer会很奇怪，针对这些情况框架提供了<code>TaskletStep</code>。</p>\n<p><code>TaskletStep</code>是一个非常简单的接口，仅有一个方法——<code>execute</code>。<code>TaskletStep</code>会反复的调用这个方法直到获取一个<code>RepeatStatus.FINISHED</code>返回或者抛出一个异常。所有的<code>Tasklet</code>调用都会包装在一个事物中。\n</p>\n<p>注册一个<code>TaskletStep</code>非常简单，只要添加一个实现了<code>Tasklet</code>接口的类即可：</p>\n<pre><code class="Java"><span class="code-meta">@Bean</span>\n<span class="hljs-function"><span class="code-keyword">public</span> Step <span class="code-title">step1</span><span\n        class="hljs-params">()</span> </span>{\n    <span class="code-keyword">return</span> <span class="code-keyword">this</span>.stepBuilderFactory.get(<span\n            class="code-string">"step1"</span>)\n    \t\t\t.tasklet(myTasklet()) <span class="code-comment">//注入Tasklet的实现</span>\n    \t\t\t.build();\n}\n</code></pre>\n<p><code>TaskletStep</code>还支持适配器处理等，详见<a\n        href="https://docs.spring.io/spring-batch/4.2.x/reference/html/step.html#taskletStep" title="官网说明">官网说明</a>。</p>\n<h2 id="h2-14">控制Step执行流程</h2>\n<h3 id="h3-9">顺序执行</h3>\n<p>默认情况下。Step与Step之间是顺序执行的，如下图：</p>\n<p><img src="https://docs.spring.io/spring-batch/4.2.x/reference/html/images/sequential-flow.png"\n        alt="Spring Batch(3)——Step控制" title="Step顺序执行" class="zoom-in-cursor"></p>\n<p>顺序执行通过<code>next</code>方法来标记：</p>\n<pre><code class="Java"><span class="code-meta">@Bean</span>\n<span class="hljs-function"><span class="code-keyword">public</span> Job <span class="code-title">job</span><span\n        class="hljs-params">()</span> </span>{\n\t<span class="code-keyword">return</span> <span class="code-keyword">this</span>.jobBuilderFactory.get(<span\n            class="code-string">"job"</span>)\n\t\t\t\t.start(stepA())\n\t\t\t\t.next(stepB()) <span class="code-comment">//顺序执行</span>\n\t\t\t\t.next(stepC())\n\t\t\t\t.build();\n}\n</code></pre>\n<h3 id="h3-10">条件执行</h3>\n<p>在顺序执行的过程中，在整个执行链条中有一个<code>Step</code>执行失败则整个<code>Job</code>就会停止。但是通过条件执行，可以指定各种情况下的执行分支：</p>\n<p><img src="https://docs.spring.io/spring-batch/4.2.x/reference/html/images/conditional-flow.png"\n        alt="Spring Batch(3)——Step控制" title="Step条件执行" class="zoom-in-cursor"></p>\n<p>为了实现更加复杂的控制，可以通过<code>Step</code>执行后的退出命名来定义条件分之。先看一个简单的代码：</p>\n<pre><code class="Java"><span class="code-meta">@Bean</span>\n<span class="hljs-function"><span class="code-keyword">public</span> Job <span class="code-title">job</span><span\n        class="hljs-params">()</span> </span>{\n\t<span class="code-keyword">return</span> <span class="code-keyword">this</span>.jobBuilderFactory.get(<span\n            class="code-string">"job"</span>)\n\t\t\t\t.start(stepA()) <span class="code-comment">//启动时执行的step</span>\n\t\t\t\t.on(<span class="code-string">"*"</span>).to(stepB()) <span class="code-comment">//默认跳转到stepB</span>\n\t\t\t\t.from(stepA()).on(<span class="code-string">"FAILED"</span>).to(stepC()) <span class="code-comment">//当返回的ExitStatus为"FAILED"时，执行。</span>\n\t\t\t\t.end()\n\t\t\t\t.build();\n}\n</code></pre>\n<p>这里使用*来表示默认处理，*是一个通配符表示处理任意字符串，对应的还可以使用?表示匹配任意字符。在<a\n        href="https://www.chkui.com/article/spring/spring_batch_introduction" title="Spring Batch(1)——数据批处理概念">Spring\n    Batch(1)——数据批处理概念</a>一文中介绍了Step的退出都会有<code>ExitStatus</code>，命名都来源于它。下面是一个更加全面的代码。</p>\n<ol>\n    <li>配置拦截器处理ExitCode：</li>\n</ol>\n<pre><code class="Java"><span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n        class="code-title">SkipCheckingListener</span> <span class="code-keyword">extends</span> <span\n        class="code-title">StepExecutionListenerSupport</span> </span>{\n    <span class="hljs-function"><span class="code-keyword">public</span> ExitStatus <span\n            class="code-title">afterStep</span><span class="hljs-params">(StepExecution stepExecution)</span> </span>{\n        String exitCode = stepExecution.getExitStatus().getExitCode();\n        <span class="code-keyword">if</span> (!exitCode.equals(ExitStatus.FAILED.getExitCode()) &amp;&amp;\n              stepExecution.getSkipCount() &gt; <span class="hljs-number">0</span>) { <span class="code-comment">//当Skip的Item大于0时，则指定ExitStatus的内容</span>\n            <span class="code-keyword">return</span> <span class="code-keyword">new</span> ExitStatus(<span\n            class="code-string">"COMPLETED WITH SKIPS"</span>);\n        }\n        <span class="code-keyword">else</span> {\n            <span class="code-keyword">return</span> <span class="code-keyword">null</span>;\n        }\n    }\n}\n</code></pre>\n<p>拦截器指示当有一个以上被跳过的记录时，返回的<code>ExitStatus</code>为"COMPLETED WITH SKIPS"。对应的控制流程：</p>\n<pre><code class="Java"><span class="code-meta">@Bean</span>\n<span class="hljs-function"><span class="code-keyword">public</span> Job <span class="code-title">job</span><span\n        class="hljs-params">()</span> </span>{\n\t<span class="code-keyword">return</span> <span class="code-keyword">this</span>.jobBuilderFactory.get(<span\n            class="code-string">"job"</span>)\n\t\t\t.start(step1()).on(<span class="code-string">"FAILED"</span>).end() <span\n            class="code-comment">//执行失败直接退出</span>\n\t\t\t.from(step1()).on(<span class="code-string">"COMPLETED WITH SKIPS"</span>).to(errorPrint1()) <span\n            class="code-comment">//有跳过元素执行 errorPrint1()</span>\n\t\t\t.from(step1()).on(<span class="code-string">"*"</span>).to(step2()) <span class="code-comment">//默认（成功）情况下执行 Step2</span>\n\t\t\t.end()\n\t\t\t.build();\n}\n</code></pre>\n<h3 id="h3-11">Step的停机退出机制</h3>\n<p>Spring Batch为<code>Job</code>提供了三种退出机制，这些机制为批处理的执行提供了丰富的控制方法。在介绍退出机制之前需要回顾一下 <a\n        href="https://www.chkui.com/article/spring/spring_batch_introduction" title="数据批处理概念">数据批处理概念</a>一文中关于<code>StepExecution</code>的内容。在<code>StepExecution</code>中有2个表示状态的值，一个名为<code>status</code>，另外一个名为<code>exitStatus</code>。前者也被称为<code>BatchStatus</code>。\n</p>\n<p>前面以及介绍了<code>ExitStatus</code>的使用，他可以控制Step执行链条的条件执行过程。除此之外<code>BatchStatus</code>也会参与到过程的控制。</p>\n<h4 id="h4-1">End退出</h4>\n<p>默认情况下（没有使用<code>end</code>、<code>fail</code>方法结束），<code>Job</code>要顺序执行直到退出，这个退出称为<code>end</code>。这个时候，<code>BatchStatus</code>=<code>COMPLETED</code>、<code>ExitStatus</code>=<code>COMPLETED</code>，表示成功执行。\n</p>\n<p>除了<code>Step</code>链式处理自然退出，也可以显示调用<code>end</code>来退出系统。看下面的例子：</p>\n<pre><code class="Java"><span class="code-meta">@Bean</span>\n<span class="hljs-function"><span class="code-keyword">public</span> Job <span class="code-title">job</span><span\n        class="hljs-params">()</span> </span>{\n\t<span class="code-keyword">return</span> <span class="code-keyword">this</span>.jobBuilderFactory.get(<span\n            class="code-string">"job"</span>)\n\t\t\t\t.start(step1()) <span class="code-comment">//启动</span>\n\t\t\t\t.next(step2()) <span class="code-comment">//顺序执行</span>\n\t\t\t\t.on(<span class="code-string">"FAILED"</span>).end()\n\t\t\t\t.from(step2()).on(<span class="code-string">"*"</span>).to(step3()) <span\n            class="code-comment">//条件执行</span>\n\t\t\t\t.end()\n\t\t\t\t.build();\n}\n</code></pre>\n<p>\n    上面的代码，<code>step1</code>到<code>step2</code>是顺序执行，当<code>step2</code>的<code>exitStatus</code>返回"FAILED"时则直接<em>End退出</em>。其他情况执行<code>Step3</code>。\n</p>\n<h4 id="h4-2">Fail退出</h4>\n<p>除了<code>end</code>还可以使用<code>fail</code>退出，这个时候，<code>BatchStatus</code>=<code>FAILED</code>、<code>ExitStatus</code>=<code>EARLY\n    TERMINATION</code>，表示执行失败。这个状态与<code>End</code>最大的区别是<code>Job</code>会尝试重启执行新的<code>JobExecution</code>。看下面代码的例子：\n</p>\n<pre><code class="Java"><span class="code-meta">@Bean</span>\n<span class="hljs-function"><span class="code-keyword">public</span> Job <span class="code-title">job</span><span\n        class="hljs-params">()</span> </span>{\n\t<span class="code-keyword">return</span> <span class="code-keyword">this</span>.jobBuilderFactory.get(<span\n            class="code-string">"job"</span>)\n\t\t\t.start(step1()) <span class="code-comment">//执行step1</span>\n\t\t\t.next(step2()).on(<span class="code-string">"FAILED"</span>).fail() <span class="code-comment">//step2的ExitStatus=FAILED 执行fail</span>\n\t\t\t.from(step2()).on(<span class="code-string">"*"</span>).to(step3()) <span\n            class="code-comment">//否则执行step3</span>\n\t\t\t.end()\n\t\t\t.build();\n}\n</code></pre>\n<h4 id="h4-3">在指定的节点中断</h4>\n<p>Spring Batch还支持在指定的节点退出，退出后下次重启会从中断的点继续执行。中断的作用是某些批处理到某个步骤后需要人工干预，当干预完之后又接着处理：</p>\n<pre><code class="Java"><span class="code-meta">@Bean</span>\n<span class="hljs-function"><span class="code-keyword">public</span> Job <span class="code-title">job</span><span\n        class="hljs-params">()</span> </span>{\n\t<span class="code-keyword">return</span> <span class="code-keyword">this</span>.jobBuilderFactory.get(<span\n            class="code-string">"job"</span>)\n\t \t\t<span class="code-comment">//如果step1的ExitStatus=COMPLETED则在step2中断</span>\n\t\t\t.start(step1()).on(<span class="code-string">"COMPLETED"</span>).stopAndRestart(step2())\n\t\t\t <span class="code-comment">//否则直接退出批处理</span>\n\t\t\t.end()\n\t\t\t.build();\n}\n</code></pre>\n<h3 id="h3-12">程序化流程的分支</h3>\n<p>可以直接进行编码来控制<code>Step</code>之间的扭转，Spring Batch提供了<code>JobExecutionDecider</code>接口来协助分支管理：</p>\n<pre><code class="Java"><span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n        class="code-title">MyDecider</span> <span class="code-keyword">implements</span> <span class="code-title">JobExecutionDecider</span> </span>{\n    <span class="hljs-function"><span class="code-keyword">public</span> FlowExecutionStatus <span class="code-title">decide</span><span\n            class="hljs-params">(JobExecution jobExecution, StepExecution stepExecution)</span> </span>{\n        String status;\n        <span class="code-keyword">if</span> (someCondition()) {\n            status = <span class="code-string">"FAILED"</span>;\n        }\n        <span class="code-keyword">else</span> {\n            status = <span class="code-string">"COMPLETED"</span>;\n        }\n        <span class="code-keyword">return</span> <span class="code-keyword">new</span> FlowExecutionStatus(status);\n    }\n}\n</code></pre>\n<p>接着将<code>MyDecider</code>作为过滤器添加到配置过程中：</p>\n<pre><code class="Java"><span class="code-meta">@Bean</span>\n<span class="hljs-function"><span class="code-keyword">public</span> Job <span class="code-title">job</span><span\n        class="hljs-params">()</span> </span>{\n\t<span class="code-keyword">return</span> <span class="code-keyword">this</span>.jobBuilderFactory.get(<span\n            class="code-string">"job"</span>)\n\t\t\t.start(step1())\n\t\t\t.next(decider()).on(<span class="code-string">"FAILED"</span>).to(step2())\n\t\t\t.from(decider()).on(<span class="code-string">"COMPLETED"</span>).to(step3())\n\t\t\t.end()\n\t\t\t.build();\n}\n</code></pre>\n<h3 id="h3-13">流程分裂</h3>\n<p>在线性处理过程中，流程都是一个接着一个执行的。但是为了满足某些特殊的需要，Spring Batch提供了执行的过程分裂并行<code>Step</code>的方法。参看下面的<code>Job</code>配置：</p>\n<pre><code class="Java"><span class="code-meta">@Bean</span>\n<span class="hljs-function"><span class="code-keyword">public</span> Job <span class="code-title">job</span><span\n        class="hljs-params">()</span> </span>{\n\tFlow flow1 = <span class="code-keyword">new</span> FlowBuilder&lt;SimpleFlow&gt;(<span\n            class="code-string">"flow1"</span>)\n\t\t\t.start(step1())\n\t\t\t.next(step2())\n\t\t\t.build();<span class="code-comment">//并行流程1</span>\n\tFlow flow2 = <span class="code-keyword">new</span> FlowBuilder&lt;SimpleFlow&gt;(<span\n            class="code-string">"flow2"</span>)\n\t\t\t.start(step3())\n\t\t\t.build();<span class="code-comment">//并行流程2</span>\n\n\t<span class="code-keyword">return</span> <span class="code-keyword">this</span>.jobBuilderFactory.get(<span\n            class="code-string">"job"</span>)\n\t\t\t\t.start(flow1)\n\t\t\t\t.split(<span class="code-keyword">new</span> SimpleAsyncTaskExecutor()) <span class="code-comment">//创建一个异步执行任务</span>\n\t\t\t\t.add(flow2)\n\t\t\t\t.next(step4()) <span class="code-comment">//2个分支执行完毕之后再执行step4。</span>\n\t\t\t\t.end()\n\t\t\t\t.build();\n}\n</code></pre>\n<p>这里表示flow1和flow2会并行执行，待2者执行成功后执行step4。</p>\n<h3 id="h3-14">数据绑定</h3>\n<p>在<code>Job</code>或<code>Step</code>的任何位置，都可以获取到统一配置的数据。比如使用标准的Spring Framework方式：</p>\n<pre><code class="Java"><span class="code-meta">@Bean</span>\n<span class="hljs-function"><span class="code-keyword">public</span> FlatFileItemReader <span class="code-title">flatFileItemReader</span><span\n        class="hljs-params">(@Value(<span class="code-string">"${input.file.name}"</span>)</span> String name) </span>{\n\t<span class="code-keyword">return</span> <span class="code-keyword">new</span> FlatFileItemReaderBuilder&lt;Foo&gt;()\n\t\t\t.name(<span class="code-string">"flatFileItemReader"</span>)\n\t\t\t.resource(<span class="code-keyword">new</span> FileSystemResource(name))\n\t\t\t...\n}\n</code></pre>\n<p>当我们通过配置文件（application.properties中\n    <code>input.file.name=filepath</code>）或者jvm参数（<code>-Dinput.file.name=filepath</code>）指定某些数据时，都可以通过这种方式获取到对应的配置参数。\n</p>\n<p>此外，也可以从<code>JobParameters</code>从获取到<code>Job</code>运行的上下文参数：</p>\n<pre><code class="Java"><span class="code-meta">@StepScope</span>\n<span class="code-meta">@Bean</span>\n<span class="hljs-function"><span class="code-keyword">public</span> FlatFileItemReader <span class="code-title">flatFileItemReader</span><span\n        class="hljs-params">(@Value(<span class="code-string">"#{jobParameters[\'input.file.name\']}"</span>)</span> String name) </span>{\n\t<span class="code-keyword">return</span> <span class="code-keyword">new</span> FlatFileItemReaderBuilder&lt;Foo&gt;()\n\t\t\t.name(<span class="code-string">"flatFileItemReader"</span>)\n\t\t\t.resource(<span class="code-keyword">new</span> FileSystemResource(name))\n\t\t\t...\n}\n</code></pre>\n<p>无论是<code>JobExecution</code>还是<code>StepExecution</code>，其中的内容都可以通过这种方式去获取参数，例如：</p>\n<pre><code class="Java"><span class="code-meta">@StepScope</span>\n<span class="code-meta">@Bean</span>\n<span class="hljs-function"><span class="code-keyword">public</span> FlatFileItemReader <span class="code-title">flatFileItemReader</span><span\n        class="hljs-params">(@Value(<span class="code-string">"#{jobExecutionContext[\'input.file.name\']}"</span>)</span> String name) </span>{\n\t<span class="code-keyword">return</span> <span class="code-keyword">new</span> FlatFileItemReaderBuilder&lt;Foo&gt;()\n\t\t\t.name(<span class="code-string">"flatFileItemReader"</span>)\n\t\t\t.resource(<span class="code-keyword">new</span> FileSystemResource(name))\n\t\t\t...\n}\n</code></pre>\n<p>或者</p>\n<pre><code class="Java"><span class="code-meta">@StepScope</span>\n<span class="code-meta">@Bean</span>\n<span class="hljs-function"><span class="code-keyword">public</span> FlatFileItemReader <span class="code-title">flatFileItemReader</span><span\n        class="hljs-params">(@Value(<span\n        class="code-string">"#{stepExecutionContext[\'input.file.name\']}"</span>)</span> String name) </span>{\n\t<span class="code-keyword">return</span> <span class="code-keyword">new</span> FlatFileItemReaderBuilder&lt;Foo&gt;()\n\t\t\t.name(<span class="code-string">"flatFileItemReader"</span>)\n\t\t\t.resource(<span class="code-keyword">new</span> FileSystemResource(name))\n\t\t\t...\n}\n</code></pre>\n<h4 id="h4-4">Step Scope</h4>\n<p>注意看上面的代码例子，都有一个<code>@StepScope</code>注解。这是为了进行后期绑定进行的标识。因为在Spring的IoCs容器进行初始化的阶段并没有任何的<code>*Execution</code>在执行，进而也不存在任何<code>*ExecutionContext</code>，所以这个时候根本无法注入标记的数据。所以需要使用注解显式的告诉容器直到<code>Step</code>执行的阶段才初始化这个<code>@Bean</code>。\n</p>\n<h4 id="h4-5">Job Scope</h4>\n<p>Job Scope的概念和 Step Scope类似，都是用于标识在到了某个执行时间段再添加和注入Bean。<code>@JobScope</code>用于告知框架知道<code>JobInstance</code>存在时候才初始化对应的<code>@Bean</code>：\n</p>\n<pre><code class="Java"><span class="code-meta">@JobScope</span>\n<span class="code-meta">@Bean</span>\n<span class="code-comment">// 初始化获取 jobParameters中的参数</span>\n<span class="hljs-function"><span class="code-keyword">public</span> FlatFileItemReader <span class="code-title">flatFileItemReader</span><span\n        class="hljs-params">(@Value(<span\n        class="code-string">"#{jobParameters[input]}"</span>)</span> String name) </span>{\n\t<span class="code-keyword">return</span> <span class="code-keyword">new</span> FlatFileItemReaderBuilder&lt;Foo&gt;()\n\t\t\t.name(<span class="code-string">"flatFileItemReader"</span>)\n\t\t\t.resource(<span class="code-keyword">new</span> FileSystemResource(name))\n\t\t\t...\n}\n</code></pre>\n<pre><code class="Java"><span class="code-meta">@JobScope</span>\n<span class="code-meta">@Bean</span>\n<span class="code-comment">// 初始化获取jobExecutionContext中的参数</span>\n<span class="hljs-function"><span class="code-keyword">public</span> FlatFileItemReader <span class="code-title">flatFileItemReader</span><span\n        class="hljs-params">(@Value(<span class="code-string">"#{jobExecutionContext中的参数[\'input.name\']}"</span>)</span> String name) </span>{\n\t<span class="code-keyword">return</span> <span class="code-keyword">new</span> FlatFileItemReaderBuilder&lt;Foo&gt;()\n\t\t\t.name(<span class="code-string">"flatFileItemReader"</span>)\n\t\t\t.resource(<span class="code-keyword">new</span> FileSystemResource(name))\n\t\t\t...\n}\n</code></pre>'}};