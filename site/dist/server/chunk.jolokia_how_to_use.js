exports.ids=[38],exports.modules={279:function(o,n,a){"use strict";Object.defineProperty(n,"__esModule",{value:!0});n.content='<h2 id="h2-1">jolokia架构</h2>\n<p>虽然jolokia是为了满足JSR-160的要求，但是他和JSR-160连接器有巨大的差异。其中最引人注目的区别是jolokia传递数据是无类型的数据（<span style="color:#FF8C00"><em>说白了就是使用了Json数据传递，替代了RMI传递Java序列化数据的方式</em></span>）。\n</p>\n<p>2003年提交的JSR-160规定客户端可以透明的调用MBean服务，无论被调用的MBean是驻留在本地还是在远程的MBean服务中。这样做的好处是提供了一个简洁通用的Java\n    API接口。但是JSR-160的实现存在许多问题：</p>\n<ol>\n    <li>它非常危险，因为它隐性暴露了JMX的远程接口。</li>\n    <li>它还存在性能问题。无论是远程还是本地调用，调用者至少要知道调用过程是怎么样的、会收到什么结果。在实际使用时，需要有明确的远程消息传递模式，让调用者知道现在是在使用响应较慢的远程调用。</li>\n    <li>使用RMI（<em><span style="color:#FF8C00">JSR-160连接器的默认协议栈</span></em>）时需要使用Java对象的序列化与反序列化机制来构建传递管道。这样做就阻碍了Java技术栈之外的环境来使用它。\n    </li>\n</ol>\n<p>以上3个原因大概就是RMI（<span style="color:#FF8C00"><em>JSR-160连接器的默认协议栈</em></span>）在远程传输协议上逐渐失去市场份额的原因。</p>\n<p>Jolokia是无类型的数据，使用了Json这种轻量化的序列化方案来替代RMI方案。使用这样的方法当然存在一些缺点（<em>比如需要额外增加一层代理</em>），但是带来了一些优势，至少这样的实现方案在JMX世界是独一无二的。</p>\n\n<h2 id="h2-2">Jolokia植入模式（Agent mode）</h2>\n<p><img alt="Jolokia——架构与使用介绍" height="489"\n        src="https://file.mahoooo.com/res/file/jolokia_how_to_use_2.png" width="666"></p>\n<p>上如展示了Jolokia 植入模式的体系结构，说明了与之有关的运行环境。</p>\n<p>Jolokia植入模式是在本地基于http协议提供了一个使用Json作为数据格式的外部接口，此时Jolokia会桥接到本地的JMX\n    MBeans接口。Jolokia使用http服务扩展了JSR-160，因此需要针对Jolokia的运行进行一些额外的处理。多种技术可以工作于http协议，最常规的方法是将jolokia放置到servlet容器中，比如Tomcat或Jetty，这样Jolokia完全可以看做是一个常规的Java\n    web应用，让所有的开发人员都能够很好理解并快速的从中读取数据。</p>\n<p>当然还有更多的方式使用Jolokia植入，比如使用OSGi HttpService或嵌入到有Jetty-Server的应用中。Jvm代理者需要使用Java1.6以上版本，在他运行时，可以连接到任何本地运行的Java进程。</p>\n<p><span style="color:#FF8C00"><em>附注——关于“植入模式”的称呼的说明：官方名为“Agent mode”，按照字面意思应该译为“代理者模式”。但是后面又一个模式叫代理模式（Proxy Mode），为了更便于理解和表达中文意思，这里命名其为“植入模式”。</em></span>\n</p>\n\n<h2 id="h2-3">Jolokia代理模式</h2>\n<p>代理模式用于无法将Jolokia部署到目标平台上（说白了就是无法部署到同一台服务器）。在这个模式下，唯一可用的方式就是目标服务开启了JSR-160连接。这样做大部分是规范原因（原文是“political\n    reasons”——政治原因-_-）——有时候根本不允许在目标服务器部署一个额外的软件系统，或者是这样做需要等待一个漫长的审批流程。还有一个原因是目标服务器已经通过RMI开启了JSR-160连接，并且我们不想额外再去在本地部署Jolokia。</p>\n<p>可以将jolokia.war部署到servlet容器中（这个war包也可用于植入模式）。下图是一个典型的代理模式架构。</p>\n<p><img alt="Jolokia——架构与使用介绍" height="439"\n        src="https://file.mahoooo.com/res/file/jolokia_how_to_use_1.png" width="617"></p>\n<p>一个jolokia客户端发送常规的请求到jolokia代理服务，这个请求包含了额外的数据用于标记要查询的目标。所有的路由信息包含在请求信息中，使得代理服务无需特别的配置即可工作。</p>\n\n<h2 id="h2-4">结尾</h2>\n<p>如果没有什么特别的限制，优先使用植入模式。植入模式比代理模式有更多的优势，因为他没有附加层、减少了维度成本和技术复杂性、而且性能也优于代理模式。此外，一些jolokia特性也无法在代理模式中使用，例如“merging of\n    MBeanServers”。</p>'}};