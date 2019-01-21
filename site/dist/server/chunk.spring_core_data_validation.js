exports.ids=[27],exports.modules={349:function(a,s,n){"use strict";Object.defineProperty(s,"__esModule",{value:!0});s.content='<p>在<a href="https://www.chkui.com/article/java/java_bean_validation" title="Java数据校验详解">Java数据校验详解</a>中详细介绍了Java数据校验相关的功能（简称<em>Bean\n    Validation，</em>涵盖<em>JSR-303、JSR-349、JSR-380</em>）,本文将在<em>Bean Validation</em>的基础上介绍Spring框架提供的数据校验功能。</p>\n<p>Spring提供的数据校验功能分为2个部分，一个是Spring自定义的数据校验功能（以下称为<em>Spring Validation</em>），一个是符合<em>Bean Validation</em>规范的数据校验功能。</p>\n\n<h2 id="h2-1">Spring Validation数据校验</h2>\n<p>Spring的自行开发的数据校验功能由3个部分组成：</p>\n<ol>\n    <li>校验器——Validator，他会运行校验代码。</li>\n    <li>校验对象，实际上就是一个JavaBean，Validator会对其进行校验。</li>\n    <li>校验结果——Errors，一次校验的结果都存放在Errors实例中。</li>\n</ol>\n<p>这是Spring在<em>Bean Validation</em>规范制定之前就实现的数据校验功能，ValidationUtils的注释中@since标签是2003年5月6号，而JSR-303定稿时间已经是6年之后（2009年）的事了。\n</p>\n<p>（文中仅为示例代码，可执行代码请到本人<a href="https://gitee.com/chkui-com/spring-core-sample" rel="nofollow">gitee库获取</a>，本文代码在<em>chkui.springcore.example.hybrid.springvalidation</em>包中。）\n</p>\n<p>Spring的数据校验功能就是实现检验器、校验对象、校验结果三个对象。先声明个一个校验对象（实体）：</p>\n<pre><code class="java"><span class="code-keyword">package</span> chkui.springcore.example.hybrid.springvalidation.entity;\n<span class="code-comment">//车辆信息</span>\n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n            class="code-title">Vehicle</span> </span>{\n\t<span class="code-keyword">private</span> String name;\n\t<span class="code-keyword">private</span> String type;\n\t<span class="code-keyword">private</span> String engine;\n\t<span class="code-keyword">private</span> String manufacturer;\n\t<span class="code-keyword">private</span> Calendar productionDate; \n\n    <span class="code-comment">/**Getter Setter*/</span>\n}</code></pre>\n<p>然后针对这个实体声明一个校验器。校验器要实现<em>org.springframework.validation.Validator</em>接口：</p>\n<pre><code class="java"><span class="code-keyword">package</span> chkui.springcore.example.hybrid.springvalidation.validator;\n\n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n            class="code-title">VehicleValidator</span> <span class="code-keyword">implements</span> <span\n            class="code-title">Validator</span> </span>{\n\t<span class="code-keyword">private</span> List&lt;String&gt; _TYPE = Arrays.asList(<span\n            class="code-keyword">new</span> String[] { <span class="code-string">"CAR"</span>, <span\n            class="code-string">"SUV"</span>, <span class="code-string">"MPV"</span> });\n\n\t<span class="hljs-function"><span class="code-keyword">public</span> <span class="code-keyword">boolean</span> <span\n            class="code-title">supports</span><span class="hljs-params">(Class&lt;?&gt; clazz)</span> </span>{\n        <span class="code-comment">//将验证器和实体类进行绑定，如果这里返回false在验证过程中会抛出类型不匹配的异常</span>\n\t\t<span class="code-keyword">return</span> Vehicle.class.isAssignableFrom(clazz);\n\t}\n\n\t<span class="hljs-function"><span class="code-keyword">public</span> <span class="code-keyword">void</span> <span\n            class="code-title">validate</span><span\n            class="hljs-params">(Object target, Errors errors)</span> </span>{ <span class="code-comment">//验证数据</span>\n\t\tVehicle vehicle = Vehicle.class.cast(target);\n\t\t<span class="code-keyword">if</span> (<span class="code-keyword">null</span> == vehicle.getName()) {\n            <span class="code-comment">//使用验证工具绑定结果</span>\n\t\t\tValidationUtils.rejectIfEmpty(errors, <span class="code-string">"name"</span>, <span class="code-string">"name.empty"</span>, <span\n            class="code-string">"车辆名称为空"</span>);\n\t\t}\n\t\t<span class="code-keyword">if</span> (!_TYPE.contains(vehicle.getType())) {\n            <span class="code-comment">//向Error添加验证错误信息</span>\n\t\t\t&lt;<span class="hljs-number">2</span>&gt; errors.rejectValue(<span class="code-string">"type"</span>, <span\n            class="code-string">"type.error"</span>, <span class="code-string">"汽车类型必须是"</span> + _TYPE);\n\t\t}\n        <span class="code-comment">//More validate ......</span>\n\t}\n}</code></pre>\n<p>有了验证对象（JavaBean）和对应的验证器（Validator）就完成了一组验证功能。注意<em>VehicleValidator::validate</em>方法传递的errors参数，验证工具会将错误实例传递进来交给开发者去组装验证结果。\n</p>\n<p>代码中的ValidationUtils就是数据校验工具，他提供了2个功能：</p>\n<ol>\n    <li>执行校验（接下来会马上介绍）。</li>\n    <li>提供错误信息绑定的功能，例如<em>ValidationUtils.rejectIfEmpty</em>这一行代码。会将对应的信息写入到Errors中。</li>\n</ol>\n<p>有了验证对象和验证器就可以执行验证：</p>\n<pre><code class="java"><span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n        class="code-title">SpringValidationApp</span> </span>{\n\t<span class="hljs-function"><span class="code-keyword">private</span> <span class="code-keyword">static</span> <span\n            class="code-keyword">void</span> <span class="code-title">springValidation</span><span class="hljs-params">(ApplicationContext ctx)</span> </span>{\n\t\tVehicleValidator vehicleValidator = <span class="code-keyword">new</span> VehicleValidator();<span\n            class="code-comment">//创建验证器</span>\n\t\tVehicle vehicle = <span class="code-keyword">new</span> Vehicle();<span class="code-comment">//创建验证对象</span>\n\t\t&lt;<span class="hljs-number">1</span>&gt; ValidationError error = <span class="code-keyword">new</span> ValidationError(<span\n            class="code-string">"Vehicle"</span>);<span class="code-comment">//创建错误信息</span>\n\t\tValidationUtils.invokeValidator(vehicleValidator, vehicle, error);<span class="code-comment">//执行验证</span>\n\t\tList&lt;FieldError&gt; list = error.getFieldErrors();\n\t\t<span class="code-keyword">int</span> count = <span class="hljs-number">1</span>;\n        <span class="code-comment">//输出验证结果</span>\n\t\t<span class="code-keyword">for</span>(FieldError res : list) {\n\t\t\tprint(<span class="code-string">"Error Info "</span>, count++ , <span class="code-string">"."</span>);\n\t\t\tprint(<span class="code-string">"Entity:"</span>, res.getObjectName());\n\t\t\tprint(<span class="code-string">"Field:"</span>, res.getField());\n\t\t\tprint(<span class="code-string">"Code:"</span>, res.getCode());\n\t\t\tprint(<span class="code-string">"Message:"</span>, res.getDefaultMessage());\n\t\t\tprint(<span class="code-string">"-"</span>);\n\t\t}\n\t}\n}</code></pre>\n<p>执行完毕后，ValidationError中记录了所有校验错误信息。错误信息分为4个部分：</p>\n<ul>\n    <li>验证的对象的名称：在执行验证器的代码中&lt;1&gt;部分创建错误对象时指定。Vehicle就是验证对象的名称。</li>\n    <li>错误的域、错误code和错误信息：每一个错误都有对应的域、错误编码以及错误信息，在验证器&lt;2&gt;位置的代码就是指定错误信息。</li>\n</ul>\n<p>以上错误信息可以通过<em>error.getFieldErrors();</em>来获取。</p>\n<p>如果JavaBean有嵌套的结构，可以在校验器中调用其他的校验器来实现嵌套检验。先为Vehicle类增加一个Gearbox（变速箱）域：</p>\n<pre><code class="java"><span class="code-keyword">package</span> chkui.springcore.example.hybrid.springvalidation.entity;\n<span class="code-comment">//车辆信息</span>\n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n            class="code-title">Vehicle</span> </span>{\n\t<span class="code-keyword">private</span> String name;\n\t<span class="code-keyword">private</span> String type;\n\t<span class="code-keyword">private</span> String engine;\n\t<span class="code-keyword">private</span> String manufacturer;\n    <span class="code-keyword">private</span> Gearbox gearbox; <span class="code-comment">//Gearbox是另外一个实例</span>\n\t<span class="code-keyword">private</span> Calendar productionDate; \n\n    <span class="code-comment">/**Getter Setter*/</span>\n}</code></pre>\n<pre><code class="java"><span class="code-comment">//变速箱</span>\n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n            class="code-title">Gearbox</span> </span>{\n\t<span class="code-keyword">private</span> String name;\n\t<span class="code-keyword">private</span> String manufacturer;\n\n    <span class="code-comment">/**Getter Setter*/</span>\n}</code></pre>\n<p>在校验器VehicleValidator::validate中增加对Gearbox验证：</p>\n<pre><code class="java"><span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n        class="code-title">VehicleValidator</span> <span class="code-keyword">implements</span> <span\n        class="code-title">Validator</span> </span>{\n\t<span class="code-meta">@Autowired</span>\n\tGearboxValidator gearboxValidator; <span class="code-comment">//用于校验Gearbox的校验器</span>\n\n\t<span class="code-meta">@Override</span>\n\t<span class="hljs-function"><span class="code-keyword">public</span> <span class="code-keyword">void</span> <span\n            class="code-title">validate</span><span class="hljs-params">(Object target, Errors errors)</span> </span>{\n\t\tVehicle vehicle = Vehicle.class.cast(target);\n\n\t\t<span class="code-comment">//some code ......</span>\n        \n\t\t}\n\t\t<span class="code-keyword">if</span>(<span class="code-keyword">null</span> == vehicle.getGearbox()) {\n\t\t\terrors.rejectValue(<span class="code-string">"gearbox"</span>, <span\n            class="code-string">"gearbox.error"</span>, <span class="code-string">"变速箱信息为空"</span>);\n\t\t}<span class="code-keyword">else</span> {\n            <span class="code-comment">//指定子实体的名称</span>\n\t\t\terrors.pushNestedPath(<span class="code-string">"gearbox"</span>);\n            <span class="code-comment">//执行对Gearbox的校验</span>\n            ValidationUtils.invokeValidator(gearboxValidator, vehicle.getGearbox(), errors);\n\t\t}\n\t}\n}</code></pre>\n\n<h2 id="h2-2"><em>Bean Validation</em>数据校验</h2>\n<p>Spring现在推荐使用<em>Bean Validation</em>来进行数据校验，而且已经整合到Spring MVC框架中。</p>\n<p>在Spring中使用<em>Bean Validation</em>和<a href="https://www.chkui.com/article/java/java_bean_validation" title="Java数据校验详解">Java数据校验详解</a>一文中介绍的内容差不多——也是注解和校验器组成一个约束，通过注解来控制校验的过程。\n</p>\n<p>Spring核心部分没有提供<em>Bean Validation相关的实现类，所以需要引入对应的实现框架。本文引入的是</em><a href="http://hibernate.org/validator/"\n                                                                       rel="nofollow">Hibernate Validator</a>，他包括验证器和el，详情可以看源码根目录的build.gradle文件。\n</p>\n<p>首先我们向IoC容器中添加全局校验器：</p>\n<pre><code class="java"><span class="code-meta">@Configuration</span>\n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n            class="code-title">SpringValidationConfig</span> </span>{\n\n\t<span class="code-meta">@Bean</span>(<span class="code-string">"validator"</span>)\n\t<span class="hljs-function"><span class="code-keyword">public</span> Validator <span\n            class="code-title">validator</span><span class="hljs-params">()</span> </span>{\n\t\t<span class="code-keyword">return</span> <span class="code-keyword">new</span> LocalValidatorFactoryBean();\n}</code></pre>\n<p>这一段添加Bean的代码非常简单，就是新建了一个<em>LocalValidatorFactoryBean</em>实例。LocalValidatorFactoryBean实现了javax.validation.Validator接口，并且会自动使用已经引入的<em>Bean\n    Validation</em>框架。</p>\n<p>然后向Vehicle增加<em>Bean Validation相关的</em>注解：</p>\n<pre><code class="java"><span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n        class="code-title">Vehicle</span> </span>{\n\t<span class="code-meta">@NotBlank</span>\n\t<span class="code-keyword">private</span> String name;\n\t<span class="code-meta">@NotBlank</span>\n\t<span class="code-meta">@VehicleType</span>\n\t<span class="code-keyword">private</span> String type;\n\t<span class="code-meta">@NotBlank</span>\n\t<span class="code-keyword">private</span> String engine;\n\t<span class="code-meta">@NotBlank</span>\n\t<span class="code-keyword">private</span> String manufacturer;\n\t&lt;<span class="hljs-number">3</span>&gt; <span class="code-meta">@Valid</span> <span class="code-comment">//@Valid的作用是对嵌套的解构进行校验</span>\n\t<span class="code-keyword">private</span> Gearbox gearbox;\n\t<span class="code-meta">@Valid</span>\n\t<span class="code-keyword">private</span> Tyre tyre;\n\t<span class="code-meta">@VehicleProductionDate</span>\n\t<span class="code-keyword">private</span> Calendar productionDate;\n\n    <span class="code-comment">/**Getter Setter*/</span>\n\n}</code></pre>\n<p>在上面的代码中，除了常规的@NotBlank等注解，还有@VehicleType这个自定义注解。在代码&lt;3&gt;的位置<em><a href="https://my.oschina.net/u/3652407"\n                                                                         class="referer" target="_blank">@Valid</a></em>是告诉校验器还要对gearbox的实例进行校验，相当于前面介绍的嵌套校验功能。最后我们使用检验器来对<em>Vehicle</em>的实例进行校验：\n</p>\n<pre><code class="java"><span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n        class="code-title">SpringValidationApp</span> </span>{\n\t<span class="hljs-function"><span class="code-keyword">public</span> <span class="code-keyword">static</span> <span\n            class="code-keyword">void</span> <span class="code-title">main</span><span class="hljs-params">(String[] args)</span> </span>{\n\t\tApplicationContext ctx = <span class="code-keyword">new</span> AnnotationConfigApplicationContext(SpringValidationConfig.class);\n\t\tBeanValidation(ctx);<span class="code-comment">//JSR规范验证</span>\n\t}\n\n\t<span class="hljs-function"><span class="code-keyword">private</span> <span class="code-keyword">static</span> <span\n            class="code-keyword">void</span> <span class="code-title">BeanValidation</span><span class="hljs-params">(ApplicationContext ctx)</span> </span>{\n\t\tValidator validator = ctx.getBean(Validator.class);<span class="code-comment">//获取校验器</span>\n\t\tVehicle vehicle = <span class="code-keyword">new</span> Vehicle();<span class="code-comment">//新建要校验的对象</span>\n\t\tvalidator.validate(vehicle).forEach(err -&gt; { <span class="code-comment">//执行校验</span>\n\t\t\tprint(<span class="code-string">"Field: "</span>, err.getPropertyPath());\n\t\t\tprint(<span class="code-string">"Error: "</span>, err.getMessage());\n\t\t});\n\t}\n}</code></pre>\n<p>关于<em>Bean Validation的详细使用方法已经在</em>&nbsp;<a href="https://www.chkui.com/article/java/java_bean_validation"\n\t\t\t\t\t\t\t\t\t\t\t\ttitle="Java数据校验详解">Java数据校验详解</a>介绍。</p>\n\n<h2 id="h2-3">兼容Bean Validation和Spring Validation</h2>\n<p>一些相对比较久远的项目可能会遇见在<em>Spring Validation</em>的基础上新增<em>Bean Validation</em>功能的情况。可以使用SpringValidatorAdapter适配器来解决这个问题：\n</p>\n<pre><code class="java"><span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n        class="code-title">SpringValidationApp</span> </span>{\n\n\t<span class="hljs-function"><span class="code-keyword">private</span> <span class="code-keyword">static</span> <span\n            class="code-keyword">void</span> <span class="code-title">adapterValidation</span><span class="hljs-params">(ApplicationContext ctx)</span> </span>{\n\t\t<span class="code-comment">// 获取校验器</span>\n\t\t<span class="code-comment">// LocalValidatorFactoryBean继承了SpringValidatorAdapter</span>\n        <span class="code-comment">// 所以这里就是获取LocalValidatorFactoryBean</span>\n\t\tSpringValidatorAdapter adapter = ctx.getBean(SpringValidatorAdapter.class);\n\n\t\tVehicle vehicle = <span class="code-keyword">new</span> Vehicle();<span class="code-comment">// 检验对象</span>\n\t\tValidationError error = <span class="code-keyword">new</span> ValidationError(<span class="code-string">"Vehicle"</span>);\n\t\t\n\t\t<span class="code-comment">// Spring Validation</span>\n\t\tValidationUtils.invokeValidator(adapter, vehicle, error);<span class="code-comment">//执行校验</span>\n\t\tList&lt;FieldError&gt; list = error.getFieldErrors();<span class="code-comment">//检验信息</span>\n\n\t\t<span class="code-comment">// Bean Validation 校验</span>\n\t\tadapter.validate(vehicle).forEach(err -&gt; { <span class="code-comment">// 执行检验&amp;输出校验结果</span>\n\t\t\tprint(<span class="code-string">"Field: "</span>, err.getPropertyPath());\n\t\t\tprint(<span class="code-string">"Error: "</span>, err.getMessage());\n\t\t});\n\t}\n}</code></pre>\n<p>上面的代码使用SpringValidatorAdapter分别执行了<em>Bean Validation</em>和<em>Spring\n    Validation</em>。可以将SpringValidatorAdapter看作一个<em>org.springframework.validation.Validator</em>的实现类用ValidationUtils来执行校验，而验证的过程完全是按照Bean\n    Validation的规范来执行的。</p>\n\n<h2 id="h2-4">方法参数校验</h2>\n<p>除了校验一个实体类，Spring在<em>Bean Validation</em>的基础上使用<a\n        href="https://www.chkui.com/article/spring/spring_core_bean_post_processors" title="IOC处理器扩展">后置处理器</a>和AOP实现了方法参数的检验。例如下面的方法：\n</p>\n<pre><code class="java"><span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">interface</span> <span\n        class="code-title">PersonService</span> </span>{\n\t<span class="code-keyword">public</span> <span class="code-meta">@NotBlank</span> <span class="hljs-function">String <span\n            class="code-title">execute</span><span class="hljs-params">(@NotBlank(message = <span class="code-string">"必须设置人员名称"</span>)</span> String name,\n\t\t\t@<span class="code-title">Min</span><span class="hljs-params">(value = <span class="hljs-number">18</span>, message = <span\n                class="code-string">"年龄必须大于18"</span>)</span> <span class="code-keyword">int</span> age)</span>;\n}</code></pre>\n<p>他表示返回数据不能为空字符串，传入的2个参数name不能为空字符串、age必须大于18。</p>\n<p>要启用方法参数校验关键点是引入MethodValidationPostProcessor并在需要验证的Bean上增加一个@Validated注解。</p>\n<p>先通过@Configuration引入后置处理器：</p>\n<pre><code class="java"><span class="code-meta">@Configuration</span>\n<span class="code-meta">@ComponentScan</span>(<span class="code-string">"chkui.springcore.example.hybrid.springvalidation.service"</span>)\n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n            class="code-title">SpringValidationConfig</span> </span>{\n\t<span class="code-meta">@Bean</span>(<span class="code-string">"validator"</span>)\n\t<span class="hljs-function"><span class="code-keyword">public</span> Validator <span\n            class="code-title">validator</span><span class="hljs-params">()</span> </span>{\n\t\t<span class="code-keyword">return</span> <span class="code-keyword">new</span> LocalValidatorFactoryBean();\n\t}\n\n\t<span class="code-meta">@Bean</span>\n\t<span class="hljs-function"><span class="code-keyword">public</span> MethodValidationPostProcessor <span\n            class="code-title">methodValidationPostProcessor</span><span\n            class="hljs-params">(Validator validator)</span> </span>{\n\t\tMethodValidationPostProcessor postProcessor = <span class="code-keyword">new</span> MethodValidationPostProcessor();\n\t\tpostProcessor.setValidator(validator);\n\t\t<span class="code-keyword">return</span> postProcessor;\n\t}\n}</code></pre>\n<p>然后实现上面的PersonService接口并标记@Validated表示这个类中的方法要进行参数校验：</p>\n<pre><code class="java"><span class="code-meta">@Service</span>\n<span class="code-meta">@Validated</span>\n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n            class="code-title">PersonServiceImpl</span> <span class="code-keyword">implements</span> <span\n            class="code-title">PersonService</span> </span>{\n\n\t<span class="code-meta">@Override</span>\n\t<span class="hljs-function"><span class="code-keyword">public</span> String <span\n            class="code-title">execute</span><span class="hljs-params">(String name, <span\n            class="code-keyword">int</span> age)</span> </span>{\n\t\t<span class="code-keyword">return</span> <span class="code-string">"I\'m "</span> + name + <span\n            class="code-string">". "</span> + age + <span class="code-string">" years old."</span>;\n\t}\n}</code></pre>\n<p>最后使用这个Service：</p>\n<pre><code class="java"><span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n        class="code-title">SpringValidationApp</span> </span>{\n\n\t<span class="hljs-function"><span class="code-keyword">public</span> <span class="code-keyword">static</span> <span\n            class="code-keyword">void</span> <span class="code-title">main</span><span class="hljs-params">(String[] args)</span> </span>{\n\t\tApplicationContext ctx = <span class="code-keyword">new</span> AnnotationConfigApplicationContext(SpringValidationConfig.class);\n\t\tmethodValidation(ctx);<span class="code-comment">//方法参数校验</span>\n\t}\n\t\n\t<span class="hljs-function"><span class="code-keyword">private</span> <span class="code-keyword">static</span> <span\n            class="code-keyword">void</span> <span class="code-title">methodValidation</span><span class="hljs-params">(ApplicationContext ctx)</span> </span>{\n\t\t<span class="code-comment">//对方法进行参数校验</span>\n\t\t<span class="code-keyword">try</span> {\n\t\t\tPersonService personService = ctx.getBean(PersonService.class);\n\t\t\tpersonService.execute(<span class="code-keyword">null</span>, <span class="hljs-number">1</span>);<span\n            class="code-comment">//传递参数</span>\n\t\t} <span class="code-keyword">catch</span> (ConstraintViolationException error) {\n\t\t\terror.getConstraintViolations().forEach(err -&gt; {<span class="code-comment">//输出校验错误信息</span>\n\t\t\t\tprint(<span class="code-string">"Field: "</span>, err.getPropertyPath());\n\t\t\t\tprint(<span class="code-string">"Error: "</span>, err.getMessage());\n\t\t\t});\n\t\t}\n\t}\n}</code></pre>\n<p>在运行的过程中，如果参数或返回数据不符合验证规则会抛出ConstraintViolationException异常，可以从中获取校验错误的信息。</p>'}};