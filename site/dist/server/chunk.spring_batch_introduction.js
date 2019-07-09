exports.ids=[30],exports.modules={365:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});n.content='<h2 id="h2-1">批处理的核心场景</h2>\n<ul>\n    <li>从某个位置读取大量的记录，位置可以是数据库、文件或者外部推送队列（MQ）。</li>\n    <li>根据业务需要实时处理读取的数据。</li>\n    <li>将处理后的数据写入某个位置，可以是数据库、文件或者推送到队列。</li>\n</ul>\n<h2 id="h2-2">Spring Batch能解决的批处理场景</h2>\n<p>Spring Batch为批处理提供了一个轻量化的解决方案，它根据批处理的需要迭代处理各种记录，提供事物功能。但是Spring Batch仅仅适用于"脱机"场景，在处理的过程中不能和外部进行任何交互，也不允许有任何输入。</p>\n<h2 id="h2-3">Spring Batch的目标</h2>\n<ul>\n    <li>开发人员仅关注业务逻辑，底层框架的交互交由Spring Batch去处理。</li>\n    <li>能够清晰分离业务与框架，框架已经限定了批处理的业务切入点，业务开发只需关注这些切入点（Read、Process、Write）。</li>\n    <li>提供开箱即用的通用接口。</li>\n    <li>快速轻松的融入Spring 框架，基于Spring Framework能够快速扩展各种功能。</li>\n    <li>所有现有核心服务都应易于更换或扩展，而不会对基础架构层产生任何影响。</li>\n</ul>\n<h2 id="h2-4">Spring Batch结构</h2>\n<p><img src="https://docs.spring.io/spring-batch/4.2.x/reference/html/images/spring-batch-layers.png"\n        alt="Spring Batch(1)——数据批处理概念" title="Spring Batch结构" class="zoom-in-cursor"></p>\n<p>如上图，通常情况下一个独立的JVM程序就是仅仅用于处理批处理，而不要和其他功能重叠。\n    在最后一层基础设置（Infrastructure）部分主要分为3个部分。<code>JobLauncher</code>、<code>Job</code>以及<code>Step</code>。每一个<code>Step</code>又细分为<code>ItemReader</code>、<code>ItemProcessor</code>、<code>ItemWirte</code>。使用<em>Spring\n        Batch</em>主要就是知道每一个基础设置负责的内容，然后在对应的设施中实现对应的业务。</p>\n<h2 id="h2-5">Spring Batch 批处理原则与建议</h2>\n<p>当我们构建一个批处理的过程时，必须注意以下原则：</p>\n<ol>\n    <li>\n        <p>通常情况下，批处理的过程对系统和架构的设计要够要求比较高，因此尽可能的使用通用架构来处理批量数据处理，降低问题发生的可能性。Spring\n            Batch是一个是一个轻量级的框架，适用于处理一些灵活并没有到海量的数据。</p>\n    </li>\n    <li>\n        <p>批处理应该尽可能的简单，尽量避免在单个批处理中去执行过于复杂的任务。我们可以将任务分成多个批处理或者多个步骤去实现。</p>\n    </li>\n    <li>\n        <p>保证数据处理和物理数据紧密相连。笼统的说就是我们在处理数据的过程中有很多步骤，在某些步骤执行完时应该就写入数据，而不是等所有都处理完。</p>\n    </li>\n    <li>\n        <p>尽可能减少系统资源的使用、尤其是耗费大量资源的IO以及跨服务器引用，尽量分配好数据处理的批次。</p>\n    </li>\n    <li>\n        <p>定期分析系统的IO使用情况、SQL语句的执行情况等，尽可能的减少不必要的IO操作。优化的原则有：</p>\n        <ol>\n            <li>尽量在一次事物中对同一数据进行读取或写缓存。</li>\n            <li>一次事物中，尽可能在开始就读取所有需要使用的数据。</li>\n            <li>优化索引，观察SQL的执行情况，尽量使用主键索引，尽量避免全表扫描或过多的索引扫描。</li>\n            <li>SQL中的where尽可能通过主键查询。</li>\n        </ol>\n    </li>\n    <li>\n        <p>不要在批处理中对相同的数据执行2次相同的操作。</p>\n    </li>\n    <li>\n        <p>对于批处理程序而言应该在批处理启动之前就分配足够的内存，以免处理的过程中去重新申请新的内存页。</p>\n    </li>\n    <li>\n        <p>对数据的完整性应该从最差的角度来考虑，每一步的处理都应该建立完备的数据校验。</p>\n    </li>\n    <li>\n        <p>对于数据的总量我们应该有一个和数据记录在数据结构的某个字段 上。</p>\n    </li>\n    <li>\n        <p>所有的批处理系统都需要进行压力测试。</p>\n    </li>\n    <li>\n        <p>如果整个批处理的过程是基于文件系统，在处理的过程中请切记完成文件的备份以及文件内容的校验。</p>\n    </li>\n</ol>\n<h2 id="h2-6">批处理的通用策略</h2>\n<p>和软件开发的设计模式一样，批处理也有各种各样的现成模式可供参考。当一个开发（设计）人员开始执行批处理任务时，应该将业务逻辑拆分为一下的步骤或者板块分批执行：</p>\n<ol>\n    <li>\n        <p>\n            数据转换：某个（某些）批处理的外部数据可能来自不同的外部系统或者外部提供者，这些数据的结构千差万别。在统一进行批量数据处理之前需要对这些数据进行转换，合并为一个统一的结构。因此在数据开始真正的执行业务处理之前，先要使用其他的方法或者一些批处理任务将这些数据转换为统一的格式。</p>\n    </li>\n    <li>\n        <p>\n            数据校验：批处理是对大量数据进行处理，并且数据的来源千差万别，所以批处理的输入数据需要对数据的完整性性进行校验（比如校验字段数据是否缺失）。另外批处理输出的数据也需要进行合适的校验（例如处理了100条数据，校验100条数据是否校验成功）</p>\n    </li>\n    <li>\n        <p>提取数据：批处理的工作是逐条从数据库或目标文件读取记录（records）,提取时可以通过一些规则从数据源中进行数据筛选。</p>\n    </li>\n    <li>\n        <p>数据实时更新处理：根据业务要求，对实时数据进行处理。某些时候一行数据记录的处理需要绑定在一个事物之下。</p>\n    </li>\n    <li>\n        <p>输出记录到标准的文档格式：数据处理完成之后需要根据格式写入到对应的外部数据系统中。</p>\n    </li>\n</ol>\n<p>以上五个步骤是一个标准的数据批处理过程，Spring batch框架为业务实现提供了以上几个功能入口。</p>\n<h2 id="h2-7">数据额外处理</h2>\n<p>某些情况需要实现对数据进行额外处理，在进入批处理之前通过其他方式将数据进行处理。主要内容有：</p>\n<ol>\n    <li>\n        <p>排序：由于批处理是以独立的行数据（record）进行处理的，在处理的时候并不知道记录前后关系。因此如果需要对整体数据进行排序，最好事先使用其他方式完成。</p>\n    </li>\n    <li>\n        <p>分割：数据拆分也建议使用独立的任务来完成。理由类似排序，因为批处理的过程都是以行记录为基本处理单位的，无法再对分割之后的数据进行扩展处理。</p>\n    </li>\n    <li>\n        <p>合并：理由如上。</p>\n    </li>\n</ol>\n<h2 id="h2-8">常规数据源</h2>\n<p>批处理的数据源通常包括：</p>\n<ol>\n    <li>数据库驱动链接（链接到数据库）对数据进行逐条提取。</li>\n    <li>文件驱动链接，对文件数据进行提取</li>\n    <li>消息驱动链接，从MQ、kafka等消息系统提取数据。</li>\n</ol>\n<h2 id="h2-9">典型的处理过程</h2>\n<ol>\n    <li>\n        <p>在业务停止的窗口期进行批数据处理，例如银行对账、清结算都是在12点日切到黎明之间。简称为离线处理。</p>\n    </li>\n    <li>\n        <p>在线或并发批处理，但是需要对实际业务或用户的响应进行考量。</p>\n    </li>\n    <li>\n        <p>并行处理多种不同的批处理作业。</p>\n    </li>\n    <li>\n        <p>分区处理：将相同的数据分为不同的区块，然后按照相同的步骤分为许多独立的批处理任务对不同的区块进行处理。</p>\n    </li>\n    <li>\n        <p>以上处理过程进行组合。</p>\n    </li>\n</ol>\n<p>在执行2,3点批处理时需要注意事物隔离等级。</p>\n<h2 id="h2-10">Spring Batch批处理的核心概念</h2>\n<p>下图是批处理的核心流程图。\n    <img src="https://docs.spring.io/spring-batch/4.2.x/reference/html/images/spring-batch-reference-model.png"\n         alt="Spring Batch(1)——数据批处理概念" class="zoom-in-cursor"></p>\n<p>（图片来源于网络）</p>\n<p>Spring Batch同样按照批处理的标准实现了各个层级的组件。并且在框架级别保证数据的完整性和事物性。</p>\n<p>如图所示，在一个标准的批处理任务中涵盖的核心概念有<code>JobLauncher</code>、<code>Job</code>、<code>Step</code>，一个<code>Job</code>可以涵盖多个<code>Step</code>，一个<code>Job</code>对应一个启动的<code>JobLauncher</code>。一个<code>Step</code>中分为<code>ItemReader</code>、<code>ItemProcessor</code>、<code>ItemWriter</code>，根据字面意思它们分别对应数据提取、数据处理和数据写入。此外<code>JobLauncher</code>、<code>Job</code>、<code>Step</code>会产生<em>元数据</em>（Metadata），它们会被存储到<code>JobRepository</code>中。\n</p>\n<h3 id="h3-1">Job</h3>\n<p>简单的说<code>Job</code>是封装一个批处理过程的实体，与其他的Spring项目类似，<code>Job</code>可以通过XML或Java类配置，称为“Job\n    Configuration”。如下图<code>Job</code>是单个批处理的最顶层。\n    <img src="https://docs.spring.io/spring-batch/4.2.x/reference/html/images/job-heirarchy.png"\n         alt="Spring Batch(1)——数据批处理概念" class="zoom-in-cursor"></p>\n<p>为了便于理解，可以简单的将<code>Job</code>理解为是每一步（<code>Step</code>）实例的容器。他结合了多个<code>Step</code>，为它们提供统一的服务同时也为<code>Step</code>提供个性化的服务，比如步骤重启。通常情况下<code>Job的配置包含以下内容</code>：\n</p>\n<ul>\n    <li>Job的名称</li>\n    <li>定义和排序<code>Step</code>执行实例。</li>\n    <li>标记每个<code>Step</code>是否可以重启。</li>\n</ul>\n<p>Spring Batch为Job接口提供了默认的实现——<code>SimpleJob</code>，其中实现了一些标准的批处理方法。下面的代码展示了如可注入一个<code>Job</code>。</p>\n<pre><code class="Java"><span class="code-meta">@Bean</span>\n<span class="hljs-function"><span class="code-keyword">public</span> Job <span\n        class="code-title">footballJob</span><span class="hljs-params">()</span> </span>{\n    <span class="code-keyword">return</span> <span class="code-keyword">this</span>.jobBuilderFactory.get(<span\n            class="code-string">"footballJob"</span>) <span class="code-comment">//get中命名了Job的名称</span>\n                     .start(playerLoad())  <span\n            class="code-comment">//playerLoad、gameLoad、playerSummarization都是Step</span>\n                     .next(gameLoad())\n                     .next(playerSummarization())\n                     .end()\n                     .build();\n}\n</code></pre>\n<h4 id="h4-1">JobInstance</h4>\n<p><code>JobInstance</code>是指批处理作业运行的实例。例如一个批处理必须在每天执行一次，系统在2019年5月1日执行了一次我们称之为2019-05-01的实例，类似的还会有2019-05-02、2019-05-03实例。通常情况下，一个<code>JobInstance</code>对应一个<code>JobParameters</code>，对应多个<code>JobExecution</code>。（<code>JobParameters</code>、<code>JobExecution</code>见后文）。同一个<code>JobInstance</code>具有相同的上下文（<code>ExecutionContext</code>内容见后文）。\n</p>\n<h4 id="h4-2">JobParameters</h4>\n<p>\n    前面讨论了<code>JobInstance</code>与<code>Job</code>的区别，但是具体的区别内容都是通过<code>JobParameters</code>体现的。一个<code>JobParameters</code>对象中包含了一系列Job运行相关的参数，这些参数可以用于参考或者用于实际的业务使用。对应的关系如下图：\n</p>\n<p><img src="https://docs.spring.io/spring-batch/4.2.x/reference/html/images/job-heirarchy.png"\n        alt="Spring Batch(1)——数据批处理概念" class="zoom-in-cursor"></p>\n<p>当我们执行2个不同的<code>JobInstance</code>时<code>JobParameters</code>中的属性都会有差异。可以简单的认为一个<code>JobInstance</code>的标识就是<code>Job</code>+<code>JobParameters</code>。\n</p>\n<h4 id="h4-3">JobExecution</h4>\n<p><code>JobExecution</code>可以理解为单次运行<code>Job</code>的容器。一次<code>JobInstance</code>执行的结果可能是成功、也可能是失败。但是对于Spring\n    Batch框架而言，只有返回运行成功才会视为完成一次批处理。例如2019-05-01执行了一次<code>JobInstance</code>，但是执行的过程失败，因此第二次还会有一个“相同的”的<code>JobInstance</code>被执行。\n</p>\n<p><code>Job</code>用于定义批处理如何执行，<code>JobInstance</code>纯粹的就是一个处理对象，把所有的运行内容和信息组织在一起，主要是为了当面临问题时定义正确的重启参数。而<code>JobExecution</code>是运行时的“容器”，记录动态运行时的各种属性和上线文。他包括的信息有：\n</p>\n<table>\n    <thead>\n    <tr>\n        <th>属性</th>\n        <th>说明</th>\n    </tr>\n    </thead>\n    <tbody>\n    <tr>\n        <td>status</td>\n        <td>状态类名为<code>BatchStatus</code>，它指示了执行的状态。在执行的过程中状态为<code>BatchStatus#STARTED</code>，失败：<code>BatchStatus#FAILED</code>，完成：<code>BatchStatus#COMPLETED</code>\n        </td>\n    </tr>\n    <tr>\n        <td>startTime</td>\n        <td><code>java.util.Date</code>对象，标记批处理任务启动的系统时间，批处理任务未启动数据为空</td>\n    </tr>\n    <tr>\n        <td>endTime</td>\n        <td><code>java.util.Date</code>对象，结束时间无论是否成功都包含该数据，如未处理完为空</td>\n    </tr>\n    <tr>\n        <td>exitStatus</td>\n        <td><code>ExitStatus</code>类，记录运行结果。</td>\n    </tr>\n    <tr>\n        <td>createTime</td>\n        <td><code>java.util.Date</code>,<code>JobExecution</code>的创建时间，某些使用execution已经创建但是并未开始运行。</td>\n    </tr>\n    <tr>\n        <td>lastUpdate</td>\n        <td><code>java.util.Date</code>，最后一次更新时间</td>\n    </tr>\n    <tr>\n        <td>executionContext</td>\n        <td>批处理任务执行的所有用户数据</td>\n    </tr>\n    <tr>\n        <td>failureExceptions</td>\n        <td>记录在执行Job时的异常，对于排查问题非常有用</td>\n    </tr>\n    </tbody>\n</table>\n<p>以上这些内容Spring Batch都会通过<code>JobRepository</code>进行持久化（这些信息官方文成称之为MetaData），因此在对应的数据源中可以看到下列信息：</p>\n<p>BATCH_JOB_INSTANCE：</p>\n<table>\n    <thead>\n    <tr>\n        <th>JOB_INST_ID</th>\n        <th>JOB_NAME</th>\n    </tr>\n    </thead>\n    <tbody>\n    <tr>\n        <td>1</td>\n        <td>EndOfDayJob</td>\n    </tr>\n    </tbody>\n</table>\n<p>BATCH_JOB_EXECUTION_PARAMS：</p>\n<table>\n    <thead>\n    <tr>\n        <th>JOB_EXECUTION_ID</th>\n        <th>TYPE_CD</th>\n        <th>KEY_NAME</th>\n        <th>DATE_VAL</th>\n        <th>IDENTIFYING</th>\n    </tr>\n    </thead>\n    <tbody>\n    <tr>\n        <td>1</td>\n        <td>DATE</td>\n        <td>schedule.Date</td>\n        <td>2019-01-01</td>\n        <td>TRUE</td>\n    </tr>\n    </tbody>\n</table>\n<p>BATCH_JOB_EXECUTION：</p>\n<table>\n    <thead>\n    <tr>\n        <th>JOB_EXEC_ID</th>\n        <th>JOB_INST_ID</th>\n        <th>START_TIME</th>\n        <th>END_TIME</th>\n        <th>STATUS</th>\n    </tr>\n    </thead>\n    <tbody>\n    <tr>\n        <td>1</td>\n        <td>1</td>\n        <td>2019-01-01 21:00</td>\n        <td>2017-01-01 21:30</td>\n        <td>FAILED</td>\n    </tr>\n    </tbody>\n</table>\n<p>当某个<code>Job</code>批处理任务失败之后会在对应的数据库表中路对应的状态。假设1月1号执行的任务失败，技术团队花费了大量的时间解决这个问题到了第二天21才继续执行这个任务。</p>\n<p>BATCH_JOB_INSTANCE：</p>\n<table>\n    <thead>\n    <tr>\n        <th>JOB_INST_ID</th>\n        <th>JOB_NAME</th>\n    </tr>\n    </thead>\n    <tbody>\n    <tr>\n        <td>1</td>\n        <td>EndOfDayJob</td>\n    </tr>\n    <tr>\n        <td>2</td>\n        <td>EndOfDayJob</td>\n    </tr>\n    </tbody>\n</table>\n<p>BATCH_JOB_EXECUTION_PARAMS：</p>\n<table>\n    <thead>\n    <tr>\n        <th>JOB_EXECUTION_ID</th>\n        <th>TYPE_CD</th>\n        <th>KEY_NAME</th>\n        <th>DATE_VAL</th>\n        <th>IDENTIFYING</th>\n    </tr>\n    </thead>\n    <tbody>\n    <tr>\n        <td>1</td>\n        <td>DATE</td>\n        <td>schedule.Date</td>\n        <td>2019-01-01</td>\n        <td>TRUE</td>\n    </tr>\n    <tr>\n        <td>2</td>\n        <td>DATE</td>\n        <td>schedule.Date</td>\n        <td>2019-01-01</td>\n        <td>TRUE</td>\n    </tr>\n    <tr>\n        <td>3</td>\n        <td>DATE</td>\n        <td>schedule.Date</td>\n        <td>2019-01-02</td>\n        <td>TRUE</td>\n    </tr>\n    </tbody>\n</table>\n<p>BATCH_JOB_EXECUTION：</p>\n<table>\n    <thead>\n    <tr>\n        <th>JOB_EXEC_ID</th>\n        <th>JOB_INST_ID</th>\n        <th>START_TIME</th>\n        <th>END_TIME</th>\n        <th>STATUS</th>\n    </tr>\n    </thead>\n    <tbody>\n    <tr>\n        <td>1</td>\n        <td>1</td>\n        <td>2019-01-01 21:00</td>\n        <td>2017-01-01 21:30</td>\n        <td>FAILED</td>\n    </tr>\n    <tr>\n        <td>2</td>\n        <td>1</td>\n        <td>2019-01-02 21:00</td>\n        <td>2017-01-02 21:30</td>\n        <td>COMPLETED</td>\n    </tr>\n    <tr>\n        <td>3</td>\n        <td>2</td>\n        <td>2019-01-02 21:31</td>\n        <td>2017-01-02 22:29</td>\n        <td>COMPLETED</td>\n    </tr>\n    </tbody>\n</table>\n<p>从数据上看好似<code>JobInstance</code>是一个接一个顺序执行的，但是对于Spring Batch并没有进行任何控制。不同的<code>JobInstance</code>很有可能是同时在运行（相同的<code>JobInstance</code>同时运行会抛出<code>JobExecutionAlreadyRunningException</code>异常）。\n</p>\n<h3 id="h3-2">Step</h3>\n<p>\n    <code>Step</code>是批处理重复运行的最小单元，它按照顺序定义了一次执行的必要过程。因此每个<code>Job</code>可以视作由一个或多个多个<code>Step</code>组成。一个<code>Step</code>包含了所有所有进行批处理的必要信息，这些信息的内容是由开发人员决定的并没有统一的标准。一个<code>Step</code>可以很简单，也可以很复杂。他可以是复杂业务的组合，也有可能仅仅用于迁移数据。与<code>JobExecution</code>的概念类似，<code>Step</code>也有特定的<code>StepExecution</code>，关系结构如下：\n</p>\n<p><img src="https://docs.spring.io/spring-batch/4.2.x/reference/html/images/jobHeirarchyWithSteps.png"\n        alt="Spring Batch(1)——数据批处理概念" title="Step" class="zoom-in-cursor"></p>\n<h4 id="h4-4">StepExecution</h4>\n<p><code>StepExecution</code>表示单次执行Step的容器，每次<code>Step</code>执行时都会有一个新的<code>StepExecution</code>被创建。与<code>JobExecution</code>不同的是，当某个<code>Step</code>执行失败后默认并不会重新执行。<code>StepExecution</code>包含以下属性：\n</p>\n<table>\n    <thead>\n    <tr>\n        <th>属性</th>\n        <th>说明</th>\n    </tr>\n    </thead>\n    <tbody>\n    <tr>\n        <td>status</td>\n        <td>状态类名为<code>BatchStatus</code>，它指示了执行的状态。在执行的过程中状态为<code>BatchStatus#STARTED</code>，失败：<code>BatchStatus#FAILED</code>，完成：<code>BatchStatus#COMPLETED</code>\n        </td>\n    </tr>\n    <tr>\n        <td>startTime</td>\n        <td><code>java.util.Date</code>对象，标记<code>StepExecution</code>启动的系统时间，未启动数据为空</td>\n    </tr>\n    <tr>\n        <td>endTime</td>\n        <td><code>java.util.Date</code>对象，结束时间，无论是否成功都包含该数据，如未处理完为空</td>\n    </tr>\n    <tr>\n        <td>exitStatus</td>\n        <td><code>ExitStatus</code>类，记录运行结果。</td>\n    </tr>\n    <tr>\n        <td>createTime</td>\n        <td><code>java.util.Date</code>,<code>JobExecution</code>的创建时间，某些使用execution已经创建但是并未开始运行。</td>\n    </tr>\n    <tr>\n        <td>lastUpdate</td>\n        <td><code>java.util.Date</code>，最后一次更新时间</td>\n    </tr>\n    <tr>\n        <td>executionContext</td>\n        <td>批处理任务执行的所有用户数据</td>\n    </tr>\n    <tr>\n        <td>readCount</td>\n        <td>成功读取数据的次数</td>\n    </tr>\n    <tr>\n        <td>wirteCount</td>\n        <td>成功写入数据的次数</td>\n    </tr>\n    <tr>\n        <td>commitCount</td>\n        <td>成功提交数据的次数</td>\n    </tr>\n    <tr>\n        <td>rollbackCount</td>\n        <td>回归数据的次数，有业务代码触发</td>\n    </tr>\n    <tr>\n        <td>readSkipCount</td>\n        <td>当读数据发生错误时跳过处理的次数</td>\n    </tr>\n    <tr>\n        <td>processSkipCount</td>\n        <td>当处理过程发生错误，跳过处理的次数</td>\n    </tr>\n    <tr>\n        <td>filterCount</td>\n        <td>被过滤规则拦截未处理的次数</td>\n    </tr>\n    <tr>\n        <td>writeSkipCount</td>\n        <td>写数据失败，跳过处理的次数</td>\n    </tr>\n    </tbody>\n</table>\n<h3 id="h3-3">ExecutionContext</h3>\n<p>前文已经多次提到<code>ExecutionContext</code>。可以简单的认为<code>ExecutionContext</code>提供了一个<em>Key/Value</em>机制，在<code>StepExecution</code>和<code>JobExecution</code>对象的任何位置都可以获取到<code>ExecutionContext</code>中的任何数据。最有价值的作用是记录数据的执行位置，以便发生重启时候从对应的位置继续执行：\n</p>\n<pre><code class="Java">executionContext.putLong(getKey(LINES_READ_COUNT), reader.getPosition())\n</code></pre>\n<p>比如在任务中有一个名为“loadData”的<code>Step</code>，他的作用是从文件中读取数据写入到数据库，当第一次执行失败后，数据库中有如下数据：</p>\n<p>BATCH_JOB_INSTANCE：</p>\n<table>\n    <thead>\n    <tr>\n        <th>JOB_INST_ID</th>\n        <th>JOB_NAME</th>\n    </tr>\n    </thead>\n    <tbody>\n    <tr>\n        <td>1</td>\n        <td>EndOfDayJob</td>\n    </tr>\n    </tbody>\n</table>\n<p>BATCH_JOB_EXECUTION_PARAMS：</p>\n<table>\n    <thead>\n    <tr>\n        <th>JOB_INST_ID</th>\n        <th>TYPE_CD</th>\n        <th>KEY_NAME</th>\n        <th>DATE_VAL</th>\n    </tr>\n    </thead>\n    <tbody>\n    <tr>\n        <td>1</td>\n        <td>DATE</td>\n        <td>schedule.Date</td>\n        <td>2019-01-01</td>\n    </tr>\n    </tbody>\n</table>\n<p>BATCH_JOB_EXECUTION：</p>\n<table>\n    <thead>\n    <tr>\n        <th>JOB_EXEC_ID</th>\n        <th>JOB_INST_ID</th>\n        <th>START_TIME</th>\n        <th>END_TIME</th>\n        <th>STATUS</th>\n    </tr>\n    </thead>\n    <tbody>\n    <tr>\n        <td>1</td>\n        <td>1</td>\n        <td>2017-01-01 21:00</td>\n        <td>2017-01-01 21:30</td>\n        <td>FAILED</td>\n    </tr>\n    </tbody>\n</table>\n<p>BATCH_STEP_EXECUTION：</p>\n<table>\n    <thead>\n    <tr>\n        <th>STEP_EXEC_ID</th>\n        <th>JOB_EXEC_ID</th>\n        <th>STEP_NAME</th>\n        <th>START_TIME</th>\n        <th>END_TIME</th>\n        <th>STATUS</th>\n    </tr>\n    </thead>\n    <tbody>\n    <tr>\n        <td>1</td>\n        <td>1</td>\n        <td>loadData</td>\n        <td>2017-01-01 21:00</td>\n        <td>2017-01-01 21:30</td>\n        <td>FAILED</td>\n    </tr>\n    </tbody>\n</table>\n<p>BATCH_STEP_EXECUTION_CONTEXT：\n    |STEP_EXEC_ID|SHORT_CONTEXT|\n    |---|---|\n    |1|{piece.count=40321}|</p>\n<p>\n    在上面的例子中，<code>Step</code>运行30分钟处理了40321个“pieces”，我们姑且认为“pieces”表示行间的行数（实际就是每个Step完成循环处理的个数）。这个值会在每个<code>commit</code>之前被更新记录在<code>ExecutionContext</code>中（更新需要用到<code>StepListener</code>后文会详细说明）。当我们再次重启这个<code>Job</code>时并记录在<em>BATCH_STEP_EXECUTION_CONTEXT</em>中的数据会加载到<code>ExecutionContext</code>中,这样当我们继续执行批处理任务时可以从上一次中断的位置继续处理。例如下面的代码在<code>ItemReader</code>中检查上次执行的结果，并从中断的位置继续执行：\n</p>\n<pre><code class="Java"><span class="code-keyword">if</span> (executionContext.containsKey(getKey(LINES_READ_COUNT))) {\n    log.debug(<span class="code-string">"Initializing for restart. Restart data is: "</span> + executionContext);\n\n    <span class="code-keyword">long</span> lineCount = executionContext.getLong(getKey(LINES_READ_COUNT));\n\n    LineReader reader = getReader();\n\n    Object record = <span class="code-string">""</span>;\n    <span class="code-keyword">while</span> (reader.getPosition() &lt; lineCount &amp;&amp; record != <span\n            class="code-keyword">null</span>) {\n        record = readLine();\n    }\n}\n</code></pre>\n<p><code>ExecutionContext</code>是根据<code>JobInstance</code>进行管理的，因此只要是相同的实例都会具备相同的ExecutionContext（无论是否停止）。此外通过以下方法都可以获得一个<code>ExecutionContext</code>：\n</p>\n<pre><code class="Java">ExecutionContext ecStep = stepExecution.getExecutionContext();\nExecutionContext ecJob = jobExecution.getExecutionContext();\n</code></pre>\n<p>\n    但是这2个<code>ExecutionContext</code>并不相同，前者是在一个<code>Step</code>中每次<code>Commit</code>数据之间共享，后者是在<code>Step</code>与<code>Step</code>之间共享。\n</p>\n<h3 id="h3-4">JobRepository</h3>\n<p><code>JobRepository</code>是所有前面介绍的对象实例的持久化机制。他为<code>JobLauncher</code>、<code>Job</code>、<code>Step</code>的实现提供了CRUD操作。当一个<code>Job</code>第一次被启动时，一个<code>JobExecution</code>会从数据源中获取到，同时在执行的过程中<code>StepExecution</code>、<code>JobExecution</code>的实现都会记录到数据源中。使用<code>@EnableBatchProcessing</code>注解后<code>JobRepository</code>会进行自动化配置。\n</p>\n<h3 id="h3-5">JobLauncher</h3>\n<p><code>JobLauncher</code>为<code>Job</code>的启动运行提供了一个边界的入口，在启动<code>Job</code>的同时还可以定制<code>JobParameters</code>：</p>\n<pre><code class="Java"><span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">interface</span> <span\n        class="code-title">JobLauncher</span> </span>{\n\t<span class="hljs-function"><span class="code-keyword">public</span> JobExecution <span\n            class="code-title">run</span><span class="hljs-params">(Job job, JobParameters jobParameters)</span>\n\t\t\t\t<span class="code-keyword">throws</span> JobExecutionAlreadyRunningException, JobRestartException,\n\t\t\t\t\t   JobInstanceAlreadyCompleteException, JobParametersInvalidException</span>;\n}\n</code></pre>'}};