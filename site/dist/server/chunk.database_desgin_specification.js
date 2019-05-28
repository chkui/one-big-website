exports.ids=[9],exports.modules={378:function(n,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});s.content='<h2 id="h2-1">表命名规范</h2>\n<p>表命名的规则分为3个层级，层级之间通过<code>_</code>分割，例如<code>b_r_identity</code>、<code>d_l_identity</code>。规约为:</p>\n<pre><code class="css"><span class="hljs-selector-attr">[leavel]</span>_<span\n        class="hljs-selector-attr">[type]</span>_<span class="hljs-selector-attr">[name]</span>\n</code></pre>\n<p><strong>[leavel]</strong> 表示数据库表的层级和功能，分为：</p>\n<ol>\n    <li><strong>s</strong>：业务无关的系统数据表。</li>\n    <li><strong>d</strong>：业务字典表。</li>\n    <li><strong>b</strong>：基础业务表。</li>\n    <li><strong>v</strong>：视图。</li>\n    <li><strong>i</strong>：聚合中间表。</li>\n</ol>\n<p><strong>[type]</strong> 表示数据库表的类型，分为：</p>\n<ol>\n    <li><strong>r</strong>：行数据表。</li>\n    <li><strong>l</strong>：列数据表。</li>\n    <li><strong>g</strong>：分组数据表。</li>\n</ol>\n<p><strong>[name]</strong> 用来表示表的作用名称，由于mysql默认对大小写不敏感，采用下划线命名法。比如：\n    <code>identity_enterprise</code>。</p>\n<p>因此，综合上面的规范，如果将<strong>用户模块</strong>命名为<strong>user</strong>，相关的表命名为：</p>\n<ul>\n    <li>数据字典以列数据的方式存储，可以命名为：<code>d_l_user_dc</code>。</li>\n    <li>用户主表以行数据的方式存储，命名为：<code>b_r_user</code>。</li>\n    <li>用户账户表：<code>b_r_user_account</code>。</li>\n</ul>\n<p>采用以上命名法的目的：</p>\n<ol>\n    <li>便于代码开发阶段区分表的功能和数据组织形式；</li>\n    <li>通过前缀为以后可能会引入的开源框架生成的表扩展命名空间。</li>\n</ol>\n<blockquote>\n    <p>比如引入了流程框架activity，会向数据库添加几十个表，其中有名为account的表，如果不适用前缀，会增加引入的成本。</p>\n</blockquote>\n<h2 id="h2-2">字段命名规范</h2>\n<ol>\n    <li>逻辑主键：id。所有的表必须创建逻辑主键。采用统一的主键便于分库分表以及数据抽取。</li>\n    <li>业务主键：code, 确保唯一性或联合主键。业务主键除了反映真实数据关联，也便于程序进行类型判断。</li>\n    <li>外键：columnName_fk，字段信息名+fk后缀，比如state_fk。</li>\n    <li>父主键关联：pid</li>\n</ol>\n<h2 id="h2-3">行数据规范</h2>\n<p>所有的表必须包含modify_date、modify_type、modify_user、modify_access_id、activity字段。</p>\n<ol>\n    <li><code>modify_date</code>：标记数据修改时间，用于数据增量ETL或缺陷回溯。类型：<code>TIMESTAMP(13)</code>。</li>\n    <li>\n        <code>modify_type</code>：数据修改类型，通常数据由运营后台修改<code>OPR(0)</code>，或账号拥有这修改<code>USR(1)</code>。用于记录数据修改的行事人。类型：<code>TINYINT(1)</code>。\n    </li>\n    <li><code>modify_user</code>：结合modify_type，标记是修改人。类型：<code>BIGINT</code>。</li>\n    <li><code>modify_access_id</code>：在数据库中用于标记当前数据修改是由哪个访问id导致的。类型：<code>BIGINT</code>。</li>\n    <li><code>activity</code>：行数据标识符。用于标识行数据的作用范围，ACT(1)/DIS(2)/DEL(0)，启用、停用、逻辑删除。类型：<code>TINYINT(1)</code>。</li>\n    <li>所有的时间字段均以时间戳（Java十三位标准）的方式存储，Mysql对应<code>TIMESTAMP(13)</code>类型。</li>\n</ol>\n<h2 id="h2-4">ER范式规范与反范式规范</h2>\n<h3 id="h3-1">ER三范式</h3>\n<p>在联机事物数据库中（Mysql的InnoDB类型数据库）业务数据与业务数据（命名以<code>b</code>开头的表）之间的ER关系严格按照ER三范式进行设计：</p>\n<pre><code class="markdown">三范式原则：\n<span class="hljs-bullet">1. </span>有逻辑主键、主键非空、主键唯一、字段不可再分。\n<span class="hljs-bullet">2. </span>具备独立不依赖数据内容的逻辑主键。\n<span class="hljs-bullet">3. </span>没有属性传递（不能有数据冗余）\n</code></pre>\n<h3 id="h3-2">反范式适用范围</h3>\n<h4 id="h4-1">业务字典允许数据传递</h4>\n<p>业务数据(<code>b</code>开头)与数据字典（<code>d</code>开头）之间的依赖关系允许数据冗余（传递）。</p>\n<p>满足以上条件必须保证业务字典数据演进严格依赖<strong>开闭原则</strong>：类似设计模式的开闭原则——数据修改关闭，数据添加开放。</p>\n<p>这个时候可以在业务数据表中对业务字典进行数据冗余，例如:</p>\n<p>字典：</p>\n<table>\n    <thead>\n    <tr>\n        <th>id</th>\n        <th>pid</th>\n        <th>code</th>\n        <th>name</th>\n        <th>...</th>\n    </tr>\n    </thead>\n    <tbody>\n    <tr>\n        <td>主键</td>\n        <td>父主键</td>\n        <td>业务编码</td>\n        <td>名称</td>\n        <td></td>\n    </tr>\n    </tbody>\n</table>\n<p>数据表：</p>\n<table>\n    <thead>\n    <tr>\n        <th>id</th>\n        <th>state_fk</th>\n        <th>state_code</th>\n        <th>state_name</th>\n        <th>...</th>\n    </tr>\n    </thead>\n    <tbody>\n    <tr>\n        <td>主键</td>\n        <td>父外键</td>\n        <td>状态编码</td>\n        <td>状态名称</td>\n        <td>...</td>\n    </tr>\n    </tbody>\n</table>\n<h4 id="h4-2">数据仓库或视图完全反范式</h4>\n<p>数据仓库（MyISam）或者事物数据库（InnoDB）中的视图和数据中间表优先使用反范式的规则去实现。</p>\n<h3 id="h3-3">参考阅读</h3>\n<p>关于范式设计的说明请参阅后文的**“ER范式与反范式设计规范设计背景及原因”**。</p>\n<h2 id="h2-5">主键规范</h2>\n<p>\n    逻辑（物理）主键使用64bit的<code>BigInt</code>类型，通过<strong>Snowflake算法获取</strong>。它可以完全充当<em>Mysql</em>主键，也能平滑兼容<em>MyCat</em>、<em>Sharding-jdbc</em>（3.0后更名为<em>Sharding-Sphere</em>）等开源分库分表数据源管理工具。\n</p>\n<p>业务组件原则上不做任何关联查询，只用于标记单表业务内容。</p>\n<p>采用该规范的原因请见后文<strong>主键规范设计背景及原因</strong>。</p>\n<h2 id="h2-6">数据缓存规范</h2>\n<p>缓存通过Redis实现。</p>\n<h3 id="h3-4">key使用规范</h3>\n<p>对应数据结构必须是扁平的（更像一个反范式的数据仓库表或视图）。由于在设计数据主键时保证主键id的全系统唯一性，理论上Nosql中key使用主键即刻确保唯一，但是为了区分业务，需要使用前缀。</p>\n<p><strong>索引数据使用模块+业务名+key：{module}:{buss}:{key}</strong>，例如</p>\n<pre><code class="bash">SET user:mgr:1234567891234567891\n</code></pre>\n<p>原则上key的长度不能超过64个字符。太长的业务key请使用hash进行一次签名。</p>\n<h3 id="h3-5">主数据与业务主键索引</h3>\n<p><strong>主数据</strong>：是指真实存储数据的结构。通常<em>对象</em>都是Redis中的HASH格式存储（HASH格式相当于Java中的map、Python中的dict、Json中的对象块——{}），功能数据数据根据需要使用string、set或list。\n</p>\n<p><strong>业务主键索引</strong>：在我们使用key-value进行数据存储时，用于查询的key并无法满足业务，有时候数据是用业务主键传参的，这个时候需要创建一个指向真实主数据的索引，建立业务主键和逻辑主键的关联关系。这个时候在Redis中可以使用业务索引映射主数据key然后再取值的方式，比如下列格式：\n</p>\n<pre><code class="sql"><span class="code-keyword">SET</span> {<span\n        class="code-keyword">module</span>}:{buss}:{code} {<span class="code-keyword">module</span>}:{buss}:{<span\n        class="code-keyword">id</span>}\n<span class="code-keyword">set</span> hkey {<span class="code-keyword">module</span>}:{buss}:{<span\n            class="code-keyword">id</span>} <span class="code-keyword">id</span> <span\n            class="hljs-number">123</span> <span class="code-keyword">name</span> <span\n            class="code-string">"Alice"</span> age <span class="hljs-number">20</span>\n</code></pre>\n<p>这样，业务主键code通过2次索引可以找到id对应的主数据。</p>\n<h3 id="h3-6">Value数据规范</h3>\n<p>Java中的实体对象使用Redis中的HASH格式存储，确保数据的扁平化，不能使用嵌套结构。例如</p>\n<pre><code class="objectivec"><span class="code-comment">//正确</span>\n<span class="code-keyword">id</span>:{\n    name:<span class="code-string">"Alice"</span>,\n    age:<span class="hljs-number">28</span>,\n    pos:<span class="code-string">"developer"</span>\n    salary:<span class="hljs-number">100000</span>\n}\n<span class="code-comment">//错误</span>\n<span class="code-keyword">id</span>:{\n    baseInfo:{\n        name:<span class="code-string">"Alice"</span>\n        age:<span class="hljs-number">28</span>\n    },\n    workInfo:{\n        pos:<span class="code-string">"developer"</span>,\n        salart:<span class="hljs-number">100000</span>\n    }\n}\n</code></pre>\n<p>其他应用场景可以根据需要使用Set、List、String，请注意他们的差异（与Java对应的数据结构类似），并且一定保证数据扁平。</p>\n<h2 id="h2-7">数据读写规范</h2>\n<ul>\n    <li>当需要批量读写数据时，使用mset、mget等原生批量处理命令，Redis自动保证数据原子性。</li>\n    <li>尽量不要使用通道——pipeline。</li>\n    <li>不要使用Redis做事务处理。</li>\n    <li>禁止线上使用keys、flushall、flushdb等，管理员redis的rename机制禁掉命令。（严重影响性能）</li>\n</ul>\n<p>参考资料：Redis更多的规范参考<a href="https://blog.csdn.net/glx490676405/article/details/79580748" title="阿里云Redis服务使用规范">阿里云Redis服务使用规范</a>。\n</p>\n<hr>\n<h2 id="h2-8">主键规范设计背景及原因。</h2>\n<p>在分布式微服务系统中采用Mysql的自增主键在分表分库、灾备合库、分布式执行、缓存Write-Behind写时会有很大制约，因此需要制定不依赖数据库的行主键规范。</p>\n<h3 id="h3-7">主键类型</h3>\n<p>在解释数据设计规范之前先理解<strong>物理主键</strong>、<strong>逻辑主键</strong>和<strong>业务主键</strong>的区别:</p>\n<p><strong>物理主键</strong>即认为是数据库的自身的物理标识主键，例如oracle的ROW_ID，mysql的自增Sequence，物理主键除了具备独立的物理特性，也是数据库连接数据的核心。mysql中要求单表唯一。\n</p>\n<p><strong>逻辑主键</strong>是与数据库无关的非业务意义的主键，用于对行数据的唯一性进行标识。在单数据库系统中，通常不需要逻辑主键，而在分布式系统中，逻辑主键的意义重大。无论是什么数据库，逻辑主键要求全库（所有的数据库）唯一。某些时候可以将物理主键和逻辑主键合二为一。\n</p>\n<p><strong>业务主键</strong>是指与含有业务特性的的主键，例如订单编号会以 时间+流水号+业务编号实行存在。业务主键通常的要求是单向业务唯一，由于从技术角度来说业务是随时可变的，因此业务主键并不能提到逻辑主键或物理主键。\n</p>\n<h3 id="h3-8">MySql（InnoDB）索引特性</h3>\n<p>由于InnoDB的行数据排列是以主键数据（Oracle是ROW_ID）作为b+树索引，<strong>而扩展的索引都以主键索引作为数据对象——这种方式称为聚集索引</strong>。所以最大效率的保证b+树主键和索引数据进入的递增性对于数据库的性能有决定性作用（b+树越扁平，效率越高）。\n</p>\n<p>使用mysql的自增Sequence可以很自然的解决这个问题，主键就向一个队列一样，只要insert数据向队列尾push数据即可，几乎不会发生索引重建和数据碎片。但是自增队在分布式系统中使用有巨大的局限性。</p>\n<p>如果直接使用UUID既充当物理主键又充当业务主键，由于 <em>UUID并无法保障数据的递增性(？)</em>,会导数据碎片已经主键索引更新效率。此外UUID的长度是32位字符串，即使用ascii的编码方案，也会占据不少的空间。\n</p>\n<h3 id="h3-9">传统中间解决方案</h3>\n<p>\n    基于Mysql目前也可以自动生成UUID，所以有一种中间解决方案是在分布式系统的数据库中物理主键使用Mysql的自增Sequence，逻辑主键使用UUID，所有的ER关联都使用UUID建立，这样可以很好的保障<strong>聚集索引</strong>添加数据的效率，且能极大减少碎片。由于InnoDB聚集索引除了主键索引都会引起二次查询，所以这种方式外关联效率较差（即使是单表查询效率也一般）。\n</p>\n<h3 id="h3-10">主键需求</h3>\n<p>整合以上内容，现在我们需要一个具备以下特征的主键：</p>\n<ol>\n    <li>递增。</li>\n    <li>全系统唯一（至少保证单业务唯一）。</li>\n    <li>高效产生。</li>\n    <li>尽量短。（减少扩展索引的存储空间）</li>\n</ol>\n<h3 id="h3-11">连续递增与趋势递增</h3>\n<p>对于B+树递增要求的并不需要连续递增（0,1,2,3,4......）,只要趋势递增即可（0,3,5,7,18,100.....）。</p>\n<h3 id="h3-12">Snowflake算法</h3>\n<p>为了满足主键需求，现在比较推崇的是<em>Snowflake算法</em>。</p>\n<p>\n    <img src="http://upload-images.jianshu.io/upload_images/2308314-36052935d31a654e.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1000/format/webp"\n         alt="数据结构（数据库）设计规范" title="Snowflake算法" class="zoom-in-cursor"></p>\n<p>Snowflake算法会产生一个<code>64bit</code>的数据，正好在Java中是一个long类型，对应Mysql是一个BigInt类型。</p>\n<ol>\n    <li>第一位是符号位（正负号）。在使用过程中基本不用理睬。</li>\n    <li>其后的41位表示时间戳的差值。</li>\n    <li>10位工作机id称为workid，需要人工指定。10bit=2^10=1024个Id</li>\n    <li>后续的12位用于在微秒级别生成序列号。</li>\n</ol>\n<p><strong>效率：</strong></p>\n<ul>\n    <li>\n        <p>因为其本质上还是一个数字，所以在关联查询能力上不会比源生的自增Sequence的差多少（微秒/纳秒级别）。</p>\n    </li>\n    <li>\n        <p>官方文档Snowflake Id算法理论上单机每秒可以生成409.6万个ID——1000个微秒单位，12位序列编码=1000*(2^12)。</p>\n    </li>\n</ul>\n<p><strong>递增性质：</strong></p>\n<p>算法是以微秒+递增序列作为区分的，并且时间单位处于64bit中的高位，在所有的微服务节点没有达到生成极限时（每秒409.6万个）一定是趋势递增的，计时达到了极限，也仅仅在时间单位出现相同。</p>\n<p><strong>传输：</strong></p>\n<p>64bit的long类型转换为十进制只有20个数字，由于64bit的第一个位置表示符号，所以实际只有19个数字。在http报文中仅仅是19个字符。如果将其转换为16进制或[0~9a~z]满表的36进制。长度还能极大的压缩。</p>\n<p><strong>局限性：</strong></p>\n<ol>\n    <li>\n        <p>\n            由于其本质是基于微秒级的机器时间戳进行ID生成，所以当整个集群有时间一致性服务时候，可能会发生时间回拨（也有可能是人为修改，不过几乎不可能发生）。当时间发生回拨时就会有极大的概率在回拨时间区内出现主键冲突。百度有个Snowflake算法变种解决方案是使用中心化的按块生成ID尽可能的回避这个问题。此外如果并发并没有达到极高的程度时，可以让入口服务器来统一生成access_id作为后续业务新增数据时的主键，当然这也没法完全解决这个问题。</p>\n    </li>\n    <li>\n        <p>\n            64bit的算法如果要求全系统主键唯一，那么基于算法的workid特性最大支持1024台服务器同时生成主键，再多就会出现冲突。解决办法就是不要求全系统唯一，而收敛为单个业务唯一，这样可以视为单个业务可以具有1024个分布式服务。</p>\n    </li>\n    <li>\n        <p>其数据位数决定了其从使用开始最多服务61年，61年后出现类似于千年虫的问题超出现有数据位。</p>\n    </li>\n</ol>\n<h3 id="h3-13">参考</h3>\n<ol>\n    <li>Snowflake算法最早由推特twitter的工程师创立并开源，现在整合到RPC框架<a href="https://twitter.github.io/finagle/"\n                                                      title="Finagle">Finagle</a>中，当然没必要引入整个Finagle，可以到这里<a\n            href="https://github.com/twitter-archive/snowflake/releases/tag/snowflake-2010" title="基本算法下载地址">下载核心算法</a>。\n    </li>\n    <li>Snowflake有个非常方便的使用途径是引入<a href="https://mvnrepository.com/artifact/io.shardingsphere/sharding-core"\n                                  title="sharding-core">sharding-core</a>。然后使用其中的<a\n            href="https://github.com/apache/incubator-shardingsphere/blob/b281f3e52410c2fdbc3e12e69a09e5109a96fa20/sharding-core/sharding-core-common/src/main/java/org/apache/shardingsphere/core/strategy/keygen/SnowflakeShardingKeyGenerator.java"\n            title="SnowflakeShardingKeyGenerator">SnowflakeShardingKeyGenerator</a>。当然Snowflake算法本身并不复杂，使用源码就能解决问题，而且具有极佳的扩展性。\n    </li>\n    <li>算法中workid最大支持1024，通常可以通过主动命名、ip地址、服务器命名等方式决定。</li>\n    <li>网上关于Snowflake算法的极少很多，自行查询解决问题。</li>\n</ol>\n<hr>\n<h2 id="h2-9">ER范式与反范式设计规范设计背景及原因</h2>\n<h3 id="h3-14">业务字典与代码适配器</h3>\n<p>通常情况下，在一个标准的联机事物系统中数据库和业务代码的关系可以总结为：</p>\n<ul>\n    <li>数据库的的作用就是存储业务数据和状态结论。</li>\n    <li>业务代码是为了处理数据从外部进入或数据库内部的状态迁移。</li>\n</ul>\n<p>例如一个用户注册，通过代码各种处理和鉴权之后，最终会将用户的各种注册信息写入到数据库中。一个用户登录会涉及到数据库已经存在的数据的变更。</p>\n<p>\n    数据库可以看成一个静态的网状结构，只是忠实的在网状结构的某些点记录“结论”，结论通常由2部分组成：数据+状态。与之相对的，代码的作用就是接收外部信息后触发数据库中的状态迁移和数据演进。业务代码最困难的也是导致问题最多的就是状态控制与状态处理。</p>\n<p>对于代码而言，处理各种状态是最常见的过程，例如：</p>\n<pre><code class="Java"><span class="code-keyword">if</span>（state = A）{\n    <span class="code-keyword">do</span> A processor\n}<span class="code-keyword">else</span> <span class="code-keyword">if</span>(state = B){\n    <span class="code-keyword">do</span> B processor\n}\n</code></pre>\n<p>一个不规范的数据库状态的存储方式千差万别，例如一个用户信息表<code>user_info</code>有以下结构:</p>\n<table>\n    <thead>\n    <tr>\n        <th>id</th>\n        <th>name</th>\n        <th>user_state</th>\n        <th>...</th>\n    </tr>\n    </thead>\n    <tbody>\n    <tr>\n        <td>1</td>\n        <td>Alice</td>\n        <td>0</td>\n        <td>...</td>\n    </tr>\n    <tr>\n        <td>2</td>\n        <td>Bob</td>\n        <td>1</td>\n        <td>...</td>\n    </tr>\n    </tbody>\n</table>\n<p>现在有一个<code>user_state</code>字段表示用户状态，然后当值为0时表示注销、当值为1时候表示启用，或者还会有其他更多的状态不断添加进来。</p>\n<p>这样会导致3个问题：</p>\n<ol>\n    <li>0和1并没有实际意义，在设计初期可能会很有意识的在字段备注中说明每个数字带边状态意义，但是在系统不断的进化或迭代后，0和1的控制难度会越来越大。</li>\n    <li>状态的不同必然会导致分支处理，分支处理最粗暴的方式就是上面的代码例子会进行if-else堆叠，随着状态的增加，整个系统的if-else块会飞速递增。</li>\n    <li>\n        无论是否使用0和1还是有实际意义的单词标记状态。在理解的过程中要嵌入大量的if块去了解处理的结果，可读性很差。从而导致新加入项目的开发人员无暇去根据已有的状态阅读代码，而更趋向于增加状态而非在原来的状态上进行演进。这样会导致一个简单的业务标识状态的字段会越来越多。\n    </li>\n</ol>\n<p>基于以上原因，引入业务字典来解决这个问题。将上面的状态控制拆分为业务字典表和业务表。</p>\n<p>业务字典表</p>\n<table>\n    <thead>\n    <tr>\n        <th>code</th>\n        <th>name</th>\n        <th>...</th>\n    </tr>\n    </thead>\n    <tbody>\n    <tr>\n        <td>activity</td>\n        <td>账户启用</td>\n        <td>...</td>\n    </tr>\n    <tr>\n        <td>locked</td>\n        <td>账户锁定</td>\n        <td>...</td>\n    </tr>\n    </tbody>\n</table>\n<p>数据报表</p>\n<table>\n    <thead>\n    <tr>\n        <th>id</th>\n        <th>name</th>\n        <th>user_state</th>\n        <th>...</th>\n    </tr>\n    </thead>\n    <tbody>\n    <tr>\n        <td>1</td>\n        <td>Alice</td>\n        <td>activity</td>\n        <td>...</td>\n    </tr>\n    <tr>\n        <td>2</td>\n        <td>Bob</td>\n        <td>locked</td>\n        <td>...</td>\n    </tr>\n    </tbody>\n</table>\n<pre><code class="Java"><span class="code-comment">//伪编码</span>\n\n<span class="hljs-class"><span class="code-keyword">interface</span> <span class="code-title">Processor</span></span>{\n    <span class="hljs-function">Result <span class="code-title">Do</span><span\n            class="hljs-params">(Data data)</span></span>;\n}\n\n<span class="hljs-class"><span class="code-keyword">class</span> <span class="code-title">Activity</span> <span\n        class="code-keyword">implements</span> <span class="code-title">Processor</span></span>{\n    <span class="hljs-function"><span class="code-keyword">public</span> Result <span class="code-title">Do</span><span\n            class="hljs-params">(Data data)</span></span>{\n        <span class="code-comment">//DO</span>\n    }\n}\n\n<span class="hljs-class"><span class="code-keyword">class</span> <span class="code-title">Locked</span> <span\n        class="code-keyword">implements</span> <span class="code-title">Processor</span></span>{\n    <span class="hljs-function"><span class="code-keyword">public</span> Result <span class="code-title">Do</span><span\n            class="hljs-params">(Data data)</span></span>{\n        <span class="code-comment">//DO</span>\n    }\n}\n\n<span class="hljs-class"><span class="code-keyword">class</span> <span class="code-title">AdapterFactory</span></span>{\n\n    <span class="code-comment">//写Java的请注意</span>\n    <span class="code-comment">//这里用js或Python的方式表示一个map结构（python中叫dict结构，js中叫对象结构）</span>\n    <span class="code-comment">//只因用Java表示一个map太麻烦</span>\n    Map processorDict = {\n        <span class="code-string">"activity"</span>:Activity.instance,\n        <span class="code-string">"locked"</span>:Locked.instance\n    }\n\t\n    <span class="hljs-function"><span class="code-keyword">public</span> <span class="code-keyword">static</span> <span\n            class="code-title">getProcessor</span><span class="hljs-params">(<span class="code-keyword">enum</span> state)</span></span>{\n        <span class="code-keyword">return</span> processorDict[State];\n    }\n}\n\n<span class="code-comment">//使用</span>\nProcessor processor = AdapterFactory.getProcessor(state);\nprocessor.<span class="code-keyword">do</span>(data);\n</code></pre>\n<p>使用以上方式。首先在业务流程中不必嵌套大量的if。其次可以将代码与业务字典的状态进行1-1绑定，即一个状态对应一个适配器。最后需要扩展更多的状态的就是对应扩展更多的处理器（适配器）。</p>\n<p>咋一看这样的写法似乎比if多不少代码，但是用这种状态+适配器的模式在系统迭代时能够带来极大的便利。</p>\n<h3 id="h3-15">数据仓库的反范式</h3>\n<p>严格按照ER三范式设计数据库带来的好处是能最好的反应真实业务，能及有效的约束数据强一致性避免“脏数据”的出现。带来的问题是大量的外关联导致大量的关联查询，严重影响查询性能。</p>\n<p>因此建议如果某项业务启用了数据仓库（MyISam），或者在事物数据库（InnoDB）中使用了View或中间表集合数据，务必严格按照Kimball或Inmon模型使用反范式创立单体数据仓库表。</p>'}};