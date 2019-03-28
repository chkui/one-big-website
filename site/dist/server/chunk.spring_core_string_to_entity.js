exports.ids=[27],exports.modules={352:function(s,a,n){"use strict";Object.defineProperty(a,"__esModule",{value:!0});a.content='<p>笼统的说一个系统主要是由3个部分组成的：</p>\n<ol>\n    <li>执行程序：主要负责处理业务逻辑，对接用户操作。</li>\n    <li>内部数据：嵌套在源码中的数据，用于指导程序运行。</li>\n    <li>外部数据：业务数据，外部配置数据。</li>\n</ol>\n<p>\n    内部数据本身就是程序的一部分，在Java中这些数据通常停留在类的静态成员变量中。而外部数据往往与代码无关，所以对于程序而言要“读懂”它们需要进行一些前置处理。例如用户在前端页面提交的数据我们从RequestContext中获取的数据类型都是字符串，而我们的业务需要将字符串转换成数字、列表、对象等等，这就引入了我们接下来要介绍的内容——数据类型转换。</p>\n<p>JavaBean对于J2SE或者J2EE而言有着非常重要的意义，ORACLE为了统一各个组织对JavaBean的使用方式制定了详尽的JavaBean规范，包括<code><a\n        href="https://docs.oracle.com/javase/8/docs/api/java/beans/BeanInfo.html" target="_blank" rel="nofollow">BeanInfo</a>、<a\n        href="https://docs.oracle.com/javase/8/docs/api/java/beans/PropertyEditor.html" target="_blank" rel="nofollow">PropertyEditor</a>、</code><code><a\n        href="https://docs.oracle.com/javase/8/docs/api/java/beans/PropertyEditorSupport.html" target="_blank"\n        rel="nofollow">PropertyEditorSupport</a></code>等方面的内容。本文会涉及到JavaBean的一些规范，但是重点是介绍Spring的数据管理。</p>\n<p>（可执行代码请到本人gitee库下载，本文的代码在<em>chkui.springcore.example.hybrid.beanmanipulation</em>包）</p>\n\n<h2 id="h2-1">Properties结构转换为实体</h2>\n<p>标准资源文件*.properties是Java程序常用的数据存储文件，Spring提供了BeanWrapper接口将*.properties文件中的数据转换成一个标准的JavaBean对象。看下面的例子：</p>\n<p>有一个实体类Person：</p>\n<pre><code class="java"><span class="hljs-class"><span class="code-keyword">class</span> <span\n        class="code-title">Person</span> </span>{\n\t<span class="code-keyword">private</span> String name;\n\t<span class="code-keyword">private</span> <span class="code-keyword">int</span> age;\n\t<span class="code-keyword">private</span> <span class="code-keyword">boolean</span> license;\n\t<span class="code-keyword">private</span> Date birtday;\n\t<span class="code-keyword">private</span> Address address;\n\t<span class="code-keyword">private</span> Map&lt;String, String&gt; otherInfo;\n\n    <span class="code-comment">// Getter &amp; Setter ......</span>\n}\n</code></pre>\n<p>然后可以通过BeanWrapper将Properties对象中的数据设置到对象中：</p>\n<pre><code class="java">   <span class="hljs-function"><span class="code-keyword">private</span> <span\n        class="code-keyword">void</span> <span class="code-title">simpleDataBind</span><span\n        class="hljs-params">()</span> </span>{\n\t\tBeanWrapper wrapper = <span class="code-keyword">new</span> BeanWrapperImpl(<span\n            class="code-keyword">new</span> Person());\n\t\t\n\t\t<span class="code-comment">//使用 BeanWrapper::setPropertyValue 接口设置数据</span>\n\t\twrapper.setPropertyValue(<span class="code-string">"name"</span>, <span class="code-string">"niubility"</span>);\n\t\twrapper.setPropertyValue(<span class="code-string">"age"</span>, <span class="hljs-number">18</span>);\n\t\twrapper.setPropertyValue(<span class="code-string">"license"</span>, <span class="code-keyword">true</span>);\n\t\tprint(wrapper.getWrappedInstance());\n\n\t\t<span class="code-comment">//使用 Properties对象设置数据，Properties实例可以来源于*.properties文件</span>\n\t\tProperties p = <span class="code-keyword">new</span> Properties();\n\t\tp.setProperty(<span class="code-string">"name"</span>, <span class="code-string">"From Properties"</span>);\n\t\tp.setProperty(<span class="code-string">"age"</span>, <span class="code-string">"25"</span>);\n\t\tp.setProperty(<span class="code-string">"license"</span>, <span class="code-string">"false"</span>);\n\t\tp.setProperty(<span class="code-string">"otherInfo[birthday]"</span>, <span\n            class="code-string">"2000-01-01"</span>);\n\t\twrapper.setPropertyValues(p);\n\t\tprint(wrapper.getWrappedInstance());\n\t}</code></pre>\n<p>这样，使用Spring的BeanWrapper接口，可以快速的将Properties数据结构转换为一个JavaBean实体。</p>\n<p>除了配置单个实体的数据，BeanWrapper还可以为嵌套结构的实体设置数据。现在增加一个实体Vehicle：</p>\n<pre><code class="java"><span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n        class="code-title">Vehicle</span> </span>{\n\t<span class="code-keyword">private</span> String name;\n\t<span class="code-keyword">private</span> String manufacturer;\n\t<span class="code-keyword">private</span> Person person; <span class="code-comment">//Person对象</span>\n\n    <span class="code-comment">// Getter &amp; Setter ......</span>\n\n}</code></pre>\n<p>在Vehicle中有一个Person类型的成员变量（person域），我们可以利用下面具备嵌套结构的语法来设置数据：</p>\n<pre><code class="java">   <span class="hljs-function"><span\n        class="code-keyword">private</span> BeanManipulationApp <span class="code-title">nestedDataBind</span><span\n        class="hljs-params">()</span> </span>{\n\t\t<span class="code-comment">// 数据嵌套转换</span>\n\t\tBeanWrapper wrapper = <span class="code-keyword">new</span> BeanWrapperImpl(<span\n            class="code-keyword">new</span> Vehicle(<span class="code-keyword">new</span> Person()));\n\n\t\tProperties p = <span class="code-keyword">new</span> Properties();\n\t\tp.setProperty(<span class="code-string">"name"</span>, <span class="code-string">"Envision"</span>);\n\t\tp.setProperty(<span class="code-string">"manufacturer"</span>, <span class="code-string">"Buick"</span>);\n\t\t\n\t\t<span class="code-comment">//person.name表示设置person域的name变量数值</span>\n\t\tp.setProperty(<span class="code-string">"person.name"</span>, <span class="code-string">"Alice"</span>);\n\t\tp.setProperty(<span class="code-string">"person.age"</span>, <span class="code-string">"25"</span>);\n\t\tp.setProperty(<span class="code-string">"person.license"</span>, <span class="code-string">"true"</span>);\n\t\tp.setProperty(<span class="code-string">"person.otherInfo[license code]"</span>, <span class="code-string">"123456789"</span>);\n\t\twrapper.setPropertyValues(p);\n\t\tprint(wrapper.getWrappedInstance());\n\n\t\t<span class="code-keyword">return</span> <span class="code-keyword">this</span>;\n\t}</code></pre>\n<p>在*.properties文件中，经常使用<em>path.name=param</em>的的语法来指定一个嵌套结构（比如LOG4J的配置文件），这里也使用类似的方式来指定嵌套结构。person.name在程序执行时会调用Vehicle::getPerson::setName方法来设定数据。\n</p>\n<p>除了设定单个数据BeanWrapper还提供了更丰富的方法来设置数据，以上面的Vehicle、person为例：</p>\n<table border="1" cellpadding="1" cellspacing="1" style="width:500px">\n    <tbody>\n    <tr>\n        <th>表达式</th>\n        <th>效果</th>\n    </tr>\n    </tbody>\n    <tbody>\n    <tr>\n        <td><em>p.setProperty("name", "Envision")</em></td>\n        <td>name域的数据设置为"Envision"</td>\n    </tr>\n    <tr>\n        <td><em>p.setProperty("person.name", "Alice")</em></td>\n        <td>将嵌套的person域下的name数据设置为"Alice"</td>\n    </tr>\n    <tr>\n        <td><em>p.setProperty("list[1]", "Step2")</em></td>\n        <td>list域是一个列表，将第二个数据设置为"Step2"</td>\n    </tr>\n    <tr>\n        <td><em>p.setProperty("otherInfo[birthday]", "2000-01-01")</em></td>\n        <td>otherInfo域是一个Map，将key=birthday、value="2000-01-01"的数据添加到Map中。</td>\n    </tr>\n    </tbody>\n</table>\n<p>上面这4条规则可以组合使用，比如<em>p.setProperty("person.otherInfo[license code]", "123456789")。</em></p>\n<p>关于在Java如何使用Properties有很多讨论（<a href="https://stackoverflow.com/questions/70471/no-properties-in-java" target="_blank" rel="nofollow">比如这篇stackoverflow的问答</a>），BeanWrapper不仅仅是针对资源文件，他还衍生扩展了数据类型转换等等功能。\n</p>\n\n<h2 id="h2-2">PropertyEditor转换数据</h2>\n<p>在JavaBean规范中定义了<em>java.beans.PropertyEditor，</em>他的作用简单的说就是将字符串转换为任意对象结构。</p>\n<blockquote>\n    <p>PropertyEditor最早是用来支持java.awt中的可视化接口编辑数据的（详情见<a\n            href="https://docs.oracle.com/javase/tutorial/javabeans/advanced/customization.html" target="_blank" rel="nofollow">Oracle关于IDE数据定制化的介绍</a>）。但是在Spring或其他应用场景中更多的仅仅是用来做字符串到特定数据格式的转换（毕竟java.awt应用不多），所以PropertyEditor提供的BeanWrapper::paintValue之类的支持awt的方法不用太去关心他，主要聚焦在BeanWrapper::setAsText方法上。\n    </p>\n</blockquote>\n<p>BeanWrapper继承了PropertyEditorRegistry接口用于注册PropertyEditor。BeanWrapperImpl已经预设了很多有价值的PropertyEditor，比如上面的例子的代码<em>p.setProperty("age",\n    "25");</em>，age域是一个数字整型，而Properties中的数据都是字符串，在设置数据时会自动启用CustomNumberEditor将字符串转换为数字。</p>\n<p>Spring已经提供的PropertyEditor可以看这里的<a\n        href="https://docs.spring.io/spring-framework/docs/current/spring-framework-reference/core.html#beans-beans-conversion" target="_blank"\n        rel="nofollow">清单</a>。需要注意的是，这些PropertyEditor并不是每一个都默认启用，比如CustomDateEditor必须由开发者提供DateFormat才能使用，所以需要像下面这样将其添加注册到BeanWrapper中：\n</p>\n<pre><code class="java"><span class="hljs-function"><span class="code-keyword">private</span> <span\n        class="code-keyword">void</span> <span class="code-title">propertyEditor</span><span\n        class="hljs-params">()</span> </span>{\n\tBeanWrapper wrapper = <span class="code-keyword">new</span> BeanWrapperImpl(<span class="code-keyword">new</span> Person());\n\n\t<span class="code-comment">// 设定日期转换格式</span>\n\tDateFormat df = <span class="code-keyword">new</span> java.text.SimpleDateFormat(<span class="code-string">"yyyy-MM-dd"</span>);\n\t\t\n\t<span class="code-comment">// 将Editor与DateFormat进行帮顶，使用指定的格式</span>\n\tCustomDateEditor dateEditor = <span class="code-keyword">new</span> CustomDateEditor(df, <span class="code-keyword">false</span>);\n\t\t\n\t<span class="code-comment">// 注册dateEditor，将其与Date类进行绑定</span>\n\twrapper.registerCustomEditor(Date.class, dateEditor);\n\n\t<span class="code-comment">// CustomNumberEditor执行转换</span>\n\twrapper.setPropertyValue(<span class="code-string">"age"</span>, <span class="code-string">"18"</span>);\n\t<span class="code-comment">// CustomBooleanEditor执行转换</span>\n\twrapper.setPropertyValue(<span class="code-string">"license"</span>, <span class="code-string">"false"</span>);\n\t<span class="code-comment">// dateEditor执行转换</span>\n\twrapper.setPropertyValue(<span class="code-string">"birtday"</span>, <span class="code-string">"1999-01-30"</span>);\n\tprint(wrapper.getWrappedInstance());\n}</code></pre>\n<p>添加之后，设定<em>setPropertyValue("birtday", "1999-01-30")</em>时会自动使用指定的DateFormat转换日期。</p>\n\n<h2 id="h2-3">自定义PropertyEditor</h2>\n<p>除了预设的各种PropertyEditor，我们还可以开发自定义的PropertyEditor。Person中有一个类型为Address的成员变量：</p>\n<pre><code class="java"><span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n        class="code-title">Address</span> </span>{\n\t<span class="code-keyword">private</span> String province; <span class="code-comment">//省</span>\n\t<span class="code-keyword">private</span> String city;  <span class="code-comment">//市</span>\n\t<span class="code-keyword">private</span> String district;  <span class="code-comment">//区</span>\n\n    <span class="code-comment">// Getter &amp; Setter</span>\n}</code></pre>\n<p>我们为Address实体添加一个PropertyEditor，将特定格式的字符串转换为Address结构：</p>\n<pre><code class="java"><span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n        class="code-title">AddressEditor</span> <span class="code-keyword">extends</span> <span class="code-title">PropertyEditorSupport</span> </span>{\n\t<span class="code-keyword">private</span> String[] SPLIT_FLAG = { <span class="code-string">","</span>, <span\n            class="code-string">"-"</span>, <span class="code-string">";"</span>, <span class="code-string">":"</span> };\n\n\t<span class="hljs-function"><span class="code-keyword">public</span> <span class="code-keyword">void</span> <span\n            class="code-title">setAsText</span><span class="hljs-params">(String text)</span> </span>{\n\t\t<span class="code-keyword">int</span> pos = -<span class="hljs-number">1</span>;\n\t\tAddress address = <span class="code-keyword">new</span> Address();\n\t\t<span class="code-keyword">for</span> (String flag : SPLIT_FLAG) {\n\t\t\tpos = text.indexOf(flag);\n\t\t\t<span class="code-keyword">if</span> (-<span class="hljs-number">1</span> &lt; pos) {\n\t\t\t\tString[] split = text.split(flag);\n\t\t\t\taddress.setProvince(split[<span class="hljs-number">0</span>]);\n\t\t\t\taddress.setCity(split[<span class="hljs-number">1</span>]);\n\t\t\t\taddress.setDistrict(split[<span class="hljs-number">2</span>]);\n\t\t\t\t<span class="code-keyword">break</span>;\n\t\t\t}\n\t\t}\n\t\t<span class="code-keyword">if</span> (-<span class="hljs-number">1</span> == pos) {\n\t\t\t<span class="code-keyword">throw</span> <span class="code-keyword">new</span> IllegalArgumentException(<span\n            class="code-string">"地址格式错误"</span>);\n\t\t}\n\t\tsetValue(address);<span class="code-comment">//设定Address实例</span>\n\t}\n}</code></pre>\n<p>\n    通过AddressEditor::setAsText方法，可以将输入的字符串最红转换为一个Address实例。通常情况下开发一个Editor转换器不会直接去实现PropertyEditor接口，而是继承PropertyEditorSupport。</p>\n<p>然后我们使用AddressEditor来将字符串转换为Address对象：</p>\n<pre><code class="java"><span class="hljs-function"><span class="code-keyword">private</span> BeanManipulationApp <span\n        class="code-title">propertyEditor</span><span class="hljs-params">()</span> </span>{\n\t<span class="code-comment">//使用预设转换工具和自定义转换工具</span>\n\tBeanWrapper wrapper = <span class="code-keyword">new</span> BeanWrapperImpl(<span class="code-keyword">new</span> Person());\n\n\t<span class="code-comment">// 创建AddressEditor实例</span>\n\tAddressEditor addressEditor = <span class="code-keyword">new</span> AddressEditor();\n\t\t\n\t<span class="code-comment">// 注册addressEditor，将其与Address类进行绑定</span>\n\twrapper.registerCustomEditor(Address.class, addressEditor);\n\n    <span class="code-comment">// 设置值自动进行转化</span>\n\twrapper.setPropertyValue(<span class="code-string">"address"</span>, <span class="code-string">"广东-广州-白云"</span>);\n\tprint(wrapper.getWrappedInstance());\n}</code></pre>\n<p>按照JavaBean规范，PropertyEditor和对应的JavaBean可以使用命名规则来表示绑定关系，而无需显式的调用注册方法。</p>\n<p>\n    绑定的规则是：有一个JavaBean命名为Tyre，在相同的包下（package）有一个实现了PropertyEditor接口并且命名为TyreEditor的类，那么框架认为TyreEditor就是Tyre的Editor，无需调用BeanWrapper::registerCustomEditor方法来声明Tyre和TyreEditor的绑定关系，详情请看源码中chkui.springcore.example.hybrid.beanmanipulation.bean.Tyre的使用。</p>\n\n<h2 id="h2-4">IoC与数据转换整合</h2>\n<p>对于Spring的ApplicationContext而言，BeanWrapper、PropertyEditor都是相对比较底层的功能，在使用Spring\n    Ioc容器的时候可以直接将这些功能嵌入到Bean初始化中或MVC的requestContext的数据转换中。</p>\n<p>从框架使用者的角度来看，Spring的XML配置数据或者通过MVC接口传递数据都是字符串，因此PropertyEditor在处理这些数据时有极大的用武之地。IoC容器使用<a\n        href="https://www.chkui.com/article/spring/spring_core_bean_post_processors" title="IOC处理器扩展">后置处理器</a>CustomEditorConfigurer来管理Bean初始化相关的PropertyEditor。通过CustomEditorConfigurer可以使用所有预设的Editor，还可以增加自定义的Editor，下面是使用@Configurable启用CustomEditorConfigurer的例子：\n</p>\n<pre><code class="java"><span class="code-meta">@Configurable</span>\n<span class="code-meta">@ImportResource</span>(<span\n            class="code-string">"classpath:hybrid/beanmanipulation/config.xml"</span>)\n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n            class="code-title">BeanManipulationConfig</span> </span>{\n\n\t<span class="code-meta">@Bean</span>\n\t<span class="hljs-function">CustomEditorConfigurer <span class="code-title">customEditorConfigurer</span><span\n            class="hljs-params">()</span> </span>{\n\t\t<span class="code-comment">// 构建CustomEditorConfigurer</span>\n\t\tCustomEditorConfigurer configurer = <span class="code-keyword">new</span> CustomEditorConfigurer();\n\t\t\n\t\tMap&lt;Class&lt;?&gt;, Class&lt;? extends PropertyEditor&gt;&gt; customEditors = <span\n            class="code-keyword">new</span> HashMap&lt;&gt;();\n\t\t\n\t\t<span class="code-comment">// 添加AddressEditor和Address的绑定</span>\n\t\tcustomEditors.put(Address.class, AddressEditor.class);\n\t\t\n\t\t<span class="code-comment">// 添加绑定列表</span>\n\t\tconfigurer.setCustomEditors(customEditors);\n\t\t\n\t\t<span class="code-comment">// 通过PropertyEditorRegistrar注册PropertyEditor</span>\n\t\tconfigurer.setPropertyEditorRegistrars(<span class="code-keyword">new</span> PropertyEditorRegistrar[] { <span\n            class="code-keyword">new</span> DateFormatRegistrar() });\n\t\t<span class="code-keyword">return</span> configurer;\n\t}\n}</code></pre>\n<p><em>CustomEditorConfigurer::setCustomEditors</em>和<em>CustomEditorConfigurer::setPropertyEditorRegistrars</em>都可以向容器中添加PropertyEditor，最主要区别在于：\n</p>\n<ol>\n    <li>前者是直接申明一对绑定关系的类对象（Class&lt;?&gt;），例如<em>customEditors.put(Address.class, AddressEditor.class);</em>\n        这行代码并没有实例化AddressEditor，而是将实例化交给后置处理器。\n    </li>\n    <li>\n        而后者是提供一个实例化的PropertyEditor，比前者更能实现更复杂的功能。比如下面的DateFormatRegistrar代码，由于需要组装DateFormat和CustomDateEditor，所以使用PropertyEditorRegistrar来实现这个过程更加合理，后置处理器会在某个时候调用这个注册方法。\n    </li>\n</ol>\n<pre><code class="java"><span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n        class="code-title">DateFormatRegistrar</span> <span class="code-keyword">implements</span> <span\n        class="code-title">PropertyEditorRegistrar</span> </span>{\n\n\t<span class="code-meta">@Override</span>\n\t<span class="hljs-function"><span class="code-keyword">public</span> <span class="code-keyword">void</span> <span\n            class="code-title">registerCustomEditors</span><span\n            class="hljs-params">(PropertyEditorRegistry registry)</span> </span>{\n\t\tDateFormat df = <span class="code-keyword">new</span> java.text.SimpleDateFormat(<span class="code-string">"yyyy-MM-dd"</span>);\n\t\tCustomDateEditor editor = <span class="code-keyword">new</span> CustomDateEditor(df, <span class="code-keyword">false</span>);\n\t\tregistry.registerCustomEditor(Date.class, editor);\n\t}\n}</code></pre>\n<p>配置好CustomEditorConfigurer之后，就可以直接在配置Bean的时候直接使用预定的格式了，比如：</p>\n<pre><code class="xml"><span class="code-tag">&lt;<span class="code-name">beans</span>&gt;</span>\n\t<span class="code-tag">&lt;<span class="code-name">bean</span> <span class="hljs-attr">id</span>=<span\n            class="code-string">"person"</span> <span class="hljs-attr">class</span>=<span class="code-string">"chkui.springcore.example.hybrid.beanmanipulation.bean.Person"</span>&gt;</span>\n\t\t<span class="code-tag">&lt;<span class="code-name">property</span> <span class="hljs-attr">name</span>=<span\n                class="code-string">"name"</span> <span class="hljs-attr">value</span>=<span\n                class="code-string">"XML"</span> /&gt;</span>\n\t\t<span class="code-comment">&lt;!-- 使用CustomNumberEditor转换 --&gt;</span>\n\t\t<span class="code-tag">&lt;<span class="code-name">property</span> <span class="hljs-attr">name</span>=<span\n                class="code-string">"age"</span> <span class="hljs-attr">value</span>=<span\n                class="code-string">"20"</span> /&gt;</span>\n\t\t<span class="code-comment">&lt;!-- 使用CustomBooleanEditor转换 --&gt;</span>\n\t\t<span class="code-tag">&lt;<span class="code-name">property</span> <span class="hljs-attr">name</span>=<span\n                class="code-string">"license"</span> <span class="hljs-attr">value</span>=<span\n                class="code-string">"1"</span> /&gt;</span>\n\t\t<span class="code-comment">&lt;!-- 使用CustomDateEditor转换 --&gt;</span>\n\t\t<span class="code-tag">&lt;<span class="code-name">property</span> <span class="hljs-attr">name</span>=<span\n                class="code-string">"birtday"</span> <span class="hljs-attr">value</span>=<span class="code-string">"1998-12-30"</span> /&gt;</span>\n\t\t<span class="code-comment">&lt;!-- 使用AddressEditor转换 --&gt;</span>\n\t\t<span class="code-tag">&lt;<span class="code-name">property</span> <span class="hljs-attr">name</span>=<span\n                class="code-string">"address"</span> <span class="hljs-attr">value</span>=<span class="code-string">"广东,深圳,南山"</span> /&gt;</span>\n\t<span class="code-tag">&lt;/<span class="code-name">bean</span>&gt;</span>\n\t\n\t<span class="code-tag">&lt;<span class="code-name">bean</span> <span class="hljs-attr">class</span>=<span\n            class="code-string">"chkui.springcore.example.hybrid.beanmanipulation.bean.Vehicle"</span>&gt;</span>\n\t\t<span class="code-tag">&lt;<span class="code-name">property</span> <span class="hljs-attr">name</span>=<span\n                class="code-string">"name"</span> <span class="hljs-attr">value</span>=<span class="code-string">"Mercedes-Benz C-Class"</span> /&gt;</span>\n\t\t<span class="code-tag">&lt;<span class="code-name">property</span> <span class="hljs-attr">name</span>=<span\n                class="code-string">"manufacturer"</span> <span class="hljs-attr">value</span>=<span\n                class="code-string">"Mercedes-Benz"</span> /&gt;</span>\n\t\t<span class="code-tag">&lt;<span class="code-name">property</span> <span class="hljs-attr">name</span>=<span\n                class="code-string">"person"</span> <span class="hljs-attr">ref</span>=<span class="code-string">"person"</span> /&gt;</span>\n\t<span class="code-tag">&lt;/<span class="code-name">bean</span>&gt;</span>\n<span class="code-tag">&lt;/<span class="code-name">beans</span>&gt;</span></code></pre>\n<p>此外，在Spring MVC中，可以SimpleFormController::initBinder方法将外部传入的数据和某个Bean进行绑定：</p>\n<pre><code class="java"><span class="code-keyword">public</span> <span class="code-keyword">final</span> <span\n        class="hljs-class"><span class="code-keyword">class</span> <span class="code-title">MyController</span> <span\n        class="code-keyword">extends</span> <span class="code-title">SimpleFormController</span> </span>{\n\n    <span class="code-comment">// 通过任何方式获取PropertyEditorRegistrar</span>\n    <span class="code-meta">@Autowired</span>\n    <span class="code-keyword">private</span> MyPropertyEditorRegistrar editorRegistrar;\n\n    <span class="hljs-function"><span class="code-keyword">protected</span> <span class="code-keyword">void</span> <span\n            class="code-title">initBinder</span><span class="hljs-params">(HttpServletRequest request,\n            ServletRequestDataBinder binder)</span> <span class="code-keyword">throws</span> Exception </span>{\n        <span class="code-comment">// 将Editor与当前Controller进行绑定</span>\n        <span class="code-keyword">this</span>.editorRegistrar.registerCustomEditors(binder);\n    }\n}</code></pre>\n<p>Spring MVC并不属于Sring核心功能范畴，这里就不展开了，需要了解的话看看SimpleFormController的JavaDoc文档即可。</p>\n'}};