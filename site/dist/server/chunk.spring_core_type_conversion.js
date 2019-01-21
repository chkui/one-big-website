exports.ids=[25],exports.modules={351:function(s,n,a){"use strict";Object.defineProperty(n,"__esModule",{value:!0});n.content='<p>在<a href="https://www.chkui.com/article/spring/spring_core_string_to_entity" title="字符串到实体转换">字符串到实体转换</a>一文中介绍了Spring核心框架中使用PropertyEditor将任何字符串转换为数字、实体的方法。除了字符串到实体，Spring还提供了更加通用的功能在对象和对象之间进行数据转换。\n</p>\n\n<h2 id="h2-1">Converter&lt;S, T&gt;</h2>\n<p>Spring的类型转换的基础是Converter&lt;S, T&gt;（以下简称转换器）接口：</p>\n<pre><code class="java"><span class="code-keyword">package</span> org.springframework.core.convert.converter;\n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">interface</span> <span\n            class="code-title">Converter</span>&lt;<span class="code-title">S</span>, <span class="code-title">T</span>&gt; </span>{\n    <span class="hljs-function">T <span class="code-title">convert</span><span\n            class="hljs-params">(S source)</span></span>;\n}</code></pre>\n<p>\n    光是看他的结构就很清晰的明白这个接口是要做什么。S表示Source（来源）、T表示Target（目标），所以这个接口的2个范型参数就是数据从S转换为T，Converter::convert方法正是输入一个“S”类型的实例，返回一个“T”类型的实例。</p>\n<p>可以通过这个接口实现规范化、可复用的类型转换功能。下面通过转换器实现字符串到PC实体类相互转换的过程。</p>\n<p>Pc实体：</p>\n<pre><code class="java"><span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n        class="code-title">PC</span> <span class="code-keyword">extends</span> <span\n        class="code-title">Device</span> </span>{\n\tString cpu;\n\tString graphic;\n\tString ram;\n    <span class="code-comment">//Getter &amp; Setter ...</span>\n}</code></pre>\n<p>在基类Device中通过反射实现字符串到实体类的转换：</p>\n<pre><code class="java"><span class="code-keyword">public</span> <span class="code-keyword">abstract</span> <span\n        class="hljs-class"><span class="code-keyword">class</span> <span class="code-title">Device</span> </span>{\n\t<span class="hljs-function"><span class="code-keyword">public</span> <span class="code-keyword">void</span> <span\n            class="code-title">pares</span><span class="hljs-params">(String text)</span></span>{ <span\n            class="code-comment">//字符串转换为实体</span>\n\t\tField[] fields = <span class="code-keyword">this</span>.getClass().getDeclaredFields();\n\t\t<span class="code-keyword">for</span> (Field field : fields) {\n\t\t\t<span class="code-keyword">int</span> begIndex = text.indexOf(field.getName());\n\t\t\t<span class="code-keyword">int</span> endIndex = text.indexOf(<span class="code-string">";"</span>, begIndex);\n\t\t\tString sub = text.substring(begIndex, endIndex), value = sub.split(<span\n            class="code-string">"="</span>)[<span class="hljs-number">1</span>];\n\t\t\tfield.setAccessible(<span class="code-keyword">true</span>);\n\t\t    field.set(<span class="code-keyword">this</span>, value);\n\t\t}\n\t};\n\n\t<span class="hljs-function"><span class="code-keyword">public</span> String <span\n            class="code-title">value</span><span class="hljs-params">()</span></span>{ <span class="code-comment">//实体转换为字符串</span>\n\t\tField[] fields = <span class="code-keyword">this</span>.getClass().getDeclaredFields();\n\t\tStringBuilder sb = <span class="code-keyword">new</span> StringBuilder();\n\t\t<span class="code-keyword">for</span> (Field field : fields) {\n\t\t\tsb.append(field.getName());\n\t\t\tsb.append(<span class="code-string">"="</span>);\n\t\t\tsb.append(field.get(<span class="code-keyword">this</span>).toString());\n\t\t\tsb.append(<span class="code-string">";"</span>);\n\t\t}\n\t\t<span class="code-keyword">return</span> sb.toString();\n\t}\n}</code></pre>\n<p>然后声明两个转换器的实现类：</p>\n<pre><code class="java"><span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n        class="code-title">String2PcConverter</span> <span class="code-keyword">implements</span> <span\n        class="code-title">Converter</span>&lt;<span class="code-title">String</span>, <span\n        class="code-title">PC</span>&gt; </span>{\n    <span class="code-comment">//字符串转换为PC对象</span>\n\t<span class="code-meta">@Override</span>\n\t<span class="hljs-function"><span class="code-keyword">public</span> PC <span class="code-title">convert</span><span\n            class="hljs-params">(String source)</span> </span>{\n\t\tPC pc = <span class="code-keyword">new</span> PC();\n\t\tpc.pares(source);\n\t\t<span class="code-keyword">return</span> pc;\n\t}\n}</code></pre>\n<pre><code class="java"><span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n        class="code-title">PC2StringConverter</span> <span class="code-keyword">implements</span> <span\n        class="code-title">Converter</span>&lt;<span class="code-title">PC</span>, <span\n        class="code-title">String</span>&gt;  </span>{\n    <span class="code-comment">//PC对象转换为字符串</span>\n\t<span class="code-meta">@Override</span>\n\t<span class="hljs-function"><span class="code-keyword">public</span> String <span\n            class="code-title">convert</span><span class="hljs-params">(PC source)</span> </span>{\n\t\t<span class="code-keyword">return</span> source.value();\n\t}\n}</code></pre>\n<p>最后使用这两个转换器：</p>\n<pre><code class="java"><span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n        class="code-title">ConversionApp</span> </span>{\n\t<span class="hljs-function"><span class="code-keyword">void</span> <span\n            class="code-title">singletonConversion</span><span class="hljs-params">()</span> </span>{\n\t\t<span class="code-keyword">final</span> String text = <span class="code-string">"cpu=amd;ram=kingston;graphic=Navidia;"</span>;\n\t\tConverter&lt;String, PC&gt; string2Pc = <span class="code-keyword">new</span> String2PcConverter();\n\t\tPC pc = string2Pc.convert(text);\n\t\tConverter&lt;PC, String&gt; pc2String = <span class="code-keyword">new</span> PC2StringConverter();\n\t\tString string = pc2String.convert(pc);\n\t}\n}</code></pre>\n<p>以上就是Spring最基本的类型转换功能——围绕着转换器（<em>Converter&lt;S, T&gt;）</em>接口实现数据类型转换。看到这里可能有些码友就要问了：这到底有什么用？直接用使用Device::pares和Device::value方法不就完事了？为什么还要引入转换器兜一圈？？！\n</p>\n<p>\n    如果系统仅仅只有1个或几个类型转换确实没必要引入转换器。但是业务总是繁杂多样的，模块与模块之前也会存在数据结构的差异，因此我们需要适配器（Adapter）、外观（Facade）等模式来应对变化多端的外部输入而无需改动业务逻辑。实际上从更高的层次看，Converter接口就是Spring为类型转换提供的一个适配器。后面会看到Spring已经为程序的顺利运行提供了大量的转换器，即使在阅读本文内容之前不知道这些转换器的存在，但Spring框架时时刻刻都在使用他们。</p>\n\n<h2 id="h2-2">ConverterFactory&lt;S, R&gt;</h2>\n<p>转换器只能对单一类型进行转换，如果有大量相同类别的数据需要转换可以使用ConverterFactory（一下简称转换工厂）：</p>\n<pre><code class="java"><span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">interface</span> <span\n        class="code-title">ConverterFactory</span>&lt;<span class="code-title">S</span>, <span\n        class="code-title">R</span>&gt; </span>{\n\n    &lt;T extends R&gt; <span class="hljs-function">Converter&lt;S, T&gt; <span\n            class="code-title">getConverter</span><span class="hljs-params">(Class&lt;T&gt; targetType)</span></span>;\n}</code></pre>\n<p>ConverterFactory::getConverter是返回一个转换器，这里范型标记“T”是“R”的子类。看下面转换工厂的例子，他可以将字符串转换成Device的子类：</p>\n<pre><code class="java"><span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n        class="code-title">String2DeviceConverterFactory</span> <span class="code-keyword">implements</span> <span\n        class="code-title">ConverterFactory</span>&lt;<span class="code-title">String</span>, <span class="code-title">Device</span>&gt; </span>{\n\t<span class="code-keyword">public</span> &lt;T extends Device&gt; <span class="hljs-function">Converter&lt;String, T&gt; <span\n            class="code-title">getConverter</span><span class="hljs-params">(Class&lt;T&gt; targetType)</span> </span>{\n\t\t<span class="code-keyword">return</span> <span class="code-keyword">new</span> String2DeviceConverter(targetType);\n\t}\n\n    <span class="code-comment">// Device的通用转换器</span>\n\t<span class="code-keyword">static</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n            class="code-title">String2DeviceConverter</span>&lt;<span class="code-title">T</span> <span\n            class="code-keyword">extends</span> <span class="code-title">Device</span>&gt; <span class="code-keyword">implements</span> <span\n            class="code-title">Converter</span>&lt;<span class="code-title">String</span>, <span class="code-title">Device</span>&gt; </span>{\n\t\t<span class="code-keyword">private</span> Class&lt;? extends Device&gt; klass;\n\t\t<span class="hljs-function"><span class="code-keyword">public</span> <span class="code-title">String2DeviceConverter</span><span\n                class="hljs-params">(Class&lt;? extends Device&gt; klass)</span> </span>{\n\t\t\t<span class="code-keyword">this</span>.klass = klass;\n\t\t}\n\n\t\t<span class="hljs-function"><span class="code-keyword">public</span> T <span\n                class="code-title">convert</span><span class="hljs-params">(String source)</span> </span>{\n\t\t\tDevice device = <span class="code-keyword">null</span>;\n\t\t\tdevice = klass.newInstance();\n\t\t\tdevice.pares(source);\n\t\t\t<span class="code-keyword">return</span> (T) device;\n\t\t}\n\t}\n}</code></pre>\n<p>然后可以使用这个转换工厂按照目标类型进行转换：</p>\n<pre><code class="java"><span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n        class="code-title">ConversionApp</span> </span>{\n\t<span class="hljs-function"><span class="code-keyword">void</span> <span class="code-title">factoryConversion</span><span\n            class="hljs-params">()</span> </span>{\n\t\tString2DeviceConverterFactory factory = <span class="code-keyword">new</span> String2DeviceConverterFactory();\n\t\tConverter&lt;String, PC&gt; pcConverter = factory.getConverter(PC.class);\n\t\t<span class="code-comment">//将字符串转换为PC</span>\n\t\tPC pc = pcConverter.convert(<span class="code-string">"cpu=amd;ram=kingston;graphic=Navidia;"</span>);\n\n\t\tConverter&lt;String, Phone&gt; phoneConverter = factory.getConverter(Phone.class);\n\t\t<span class="code-comment">//将字符串转换为Phone</span>\n\t\tPhone phone = phoneConverter.convert(<span class="code-string">"name=HUAWEIP20;cpu=Kirin970;ram=64G;"</span>);\n\t}\n}</code></pre>\n<p>Phone是另外一个继承了Device的实体类：</p>\n<pre><code class="java"><span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n        class="code-title">Phone</span> <span class="code-keyword">extends</span> <span class="code-title">Device</span> </span>{\n\tString name;\n\tString cpu;\n\tString ram;\n    <span class="code-comment">// Getter &amp; Setter</span>\n}</code></pre>\n\n<h2 id="h2-3">数据转换服务</h2>\n<p>\n    Spring已经为数据转换预设了大量的Converter，这些Converter可以通过ConversionService直接使用。ConversionService中包含了几乎所有Java常规类型的数据格式转换，看下面的案例。</p>\n<pre><code class="java"><span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n        class="code-title">ConversionApp</span> </span>{<span class="hljs-function">ConversionApp <span\n        class="code-title">registConversionService</span><span class="hljs-params">()</span> </span>{\n\t\tConfigurableApplicationContext ctx = <span class="code-keyword">new</span> AnnotationConfigApplicationContext(ConversionConfig.class);\n        <span class="code-comment">// 获取ConversionService</span>\n\t\tConversionService service = ctx.getBean(ConversionService.class);\n\t\t<span class="code-comment">// 字符串转换为整型</span>\n\t\t<span class="code-keyword">int</span> i = service.convert(<span class="code-string">"123456"</span>, Integer.class);\n\t\t<span class="code-comment">// 字符串转换为浮点</span>\n\t\t<span class="code-keyword">float</span> f = service.convert(<span class="code-string">"1234.56"</span>, Float.class);\n\t\t<span class="code-comment">// 源生列表转换为List</span>\n\t\tList&lt;?&gt; list = service.convert(<span class="code-keyword">new</span> <span class="code-keyword">int</span>[] { <span\n            class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span\n            class="hljs-number">4</span>, <span class="hljs-number">5</span>, <span class="hljs-number">6</span> }, List.class);\n\t\t<span class="code-comment">// 源生列表转换为Set</span>\n\t\tSet&lt;?&gt; set = service.convert(<span class="code-keyword">new</span> <span class="code-keyword">int</span>[] { <span\n            class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span\n            class="hljs-number">4</span>, <span class="hljs-number">5</span>, <span class="hljs-number">6</span> }, Set.class);\n\t\t<span class="code-comment">// 枚举转换</span>\n\t\tGender gender = service.convert(<span class="code-string">"Male"</span>, Gender.class);\n\t\t<span class="code-comment">// 使用自定义转换器</span>\n\t\tPC pc = service.convert(<span class="code-string">"cpu=amd;ram=kingston;graphic=Navidia;"</span>, PC.class);\n\t\t<span class="code-comment">// UUID转换</span>\n\t\tUUID uuid = service.convert(<span class="code-string">"f51b4b95-0925-4ad0-8c62-4daf3ea7918f"</span>, UUID.class);\n\t\t<span class="code-comment">// 字符串转换为Optional&lt;PC&gt;</span>\n\t\tOptional&lt;PC&gt; options = service.convert(<span\n            class="code-string">"cpu=amd;ram=kingston;graphic=Navidia;"</span>, Optional.class);\n\t\t<span class="code-comment">// 使用TypeDescriptor描述进行转换</span>\n\t\tString source = <span class="code-string">"123456789"</span>;\n\t\t<span class="code-keyword">int</span> result = (<span class="code-keyword">int</span>) service.convert(source, TypeDescriptor.valueOf(source.getClass()),\n\t\t\t\tTypeDescriptor.valueOf(Integer.class));\n\t\t_G.print(result);\n\t}\n\n\t<span class="code-keyword">enum</span> Gender {\n\t\tMale, Female, Other\n\t}\n}</code></pre>\n<p>\n    除了上面的转换，ConversionService还提供了其他转换器，详情请看org.springframework.core.convert.support.DefaultConversionService的JavaDoc文档。</p>\n<p>需要通过ConversionServiceFactoryBean来启用ConversionService，下面的代码是在@Configurable中向IoC容器添加ConversionServiceFactoryBean：</p>\n<pre><code class="java"><span class="code-meta">@Configurable</span>\n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n            class="code-title">ConversionConfig</span> </span>{\n\n\t<span class="code-meta">@Bean</span>\n\t<span class="hljs-function"><span class="code-keyword">public</span> ConversionServiceFactoryBean <span\n            class="code-title">ConversionServiceFactoryBean</span><span class="hljs-params">()</span> </span>{\n\t\tConversionServiceFactoryBean factoryBean = <span class="code-keyword">new</span> ConversionServiceFactoryBean();\n\t\tSet&lt;Converter&gt; converters = <span class="code-keyword">new</span> HashSet&lt;&gt;();\n\t\t<span class="code-comment">// 添加自定义转换器</span>\n\t\tconverters.add(<span class="code-keyword">new</span> String2PcConverter());\n\t\tconverters.add(<span class="code-keyword">new</span> PC2StringConverter());\n\t\tfactoryBean.setConverters(converters);\n\t\t<span class="code-keyword">return</span> factoryBean;\n\t}\n}</code></pre>\n<p>也可以通过XML文件配置来引入ConversionService：</p>\n<pre><code class="xml"><span class="code-tag">&lt;<span class="code-name">bean</span> <span class="hljs-attr">id</span>=<span\n        class="code-string">"conversionService"</span>\n        <span class="hljs-attr">class</span>=<span class="code-string">"org.springframework.context.support.ConversionServiceFactoryBean"</span>&gt;</span>\n    <span class="code-tag">&lt;<span class="code-name">property</span> <span class="hljs-attr">name</span>=<span\n            class="code-string">"converters"</span>&gt;</span>\n        <span class="code-tag">&lt;<span class="code-name">set</span>&gt;</span>\n            <span class="code-tag">&lt;<span class="code-name">bean</span> <span class="hljs-attr">class</span>=<span\n                    class="code-string">"chkui.springcore.example.javabase.conversion.support.PC2StringConverter"</span>/&gt;</span>\n            <span class="code-tag">&lt;<span class="code-name">bean</span> <span class="hljs-attr">class</span>=<span\n                    class="code-string">"chkui.springcore.example.javabase.conversion.support.String2PcConverter"</span>/&gt;</span>\n        <span class="code-tag">&lt;/<span class="code-name">set</span>&gt;</span>\n    <span class="code-tag">&lt;/<span class="code-name">property</span>&gt;</span>\n<span class="code-tag">&lt;/<span class="code-name">bean</span>&gt;</span></code></pre>\n<p>ConversionService在Spring MVC中的作用很大，可以全局注册统一的类型转换器，详情请见&nbsp;<a\n        href="https://docs.spring.io/spring-framework/docs/current/spring-framework-reference/web.html#mvc-config-conversion"\n        rel="nofollow">Conversion and Formatting</a>。&nbsp;</p>\n                                            '}};