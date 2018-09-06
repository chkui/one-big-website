exports.ids=[72],exports.modules={298:function(s,a,n){"use strict";Object.defineProperty(a,"__esModule",{value:!0});a.content='<p>在前2篇博文中，介绍了&nbsp;\n    <a href="https://www.chkui.com/article/hazelcast/hazelcast_get_started_and_code_sample">Hazelcast的基本原理</a> 和\n    <a href="https://www.chkui.com/article/hazelcast/hazelcast_configuration_management">\n        Hazelcast基本配置\n    </a>。\n    后续的博文会逐一介绍<em>Hazelcast</em>的主要功能组件。本篇将详细说明Hazelcast集群组建、集群数据通信相关的内容，大家可以用来当做使用Hazelcast的帮助文档、或进行技术决策分析的指导文档。\n</p>\n<h2 id="h2-1"><em>Hazelcst</em>组网</h2>\n<p><em>Hazelcast</em>自称"分布式数据网格”，那他最基本、最重要的功能就是时时刻刻都在多台服务器之间工作，这样必须有网络环境对其分布式功能提供支持。<em>Hazelcast</em>在网络环境中工作分为2个阶段：首先是组网阶段，随后是数据传输阶段。\n</p>\n<p>组网是指每个<em>Hazelcast</em>节点启动时，都会搜寻是否有<em>Hazelcast</em>节点可以连接，组网过程支持多种协议。完成组网后，节点会和其他组建成集群的节点进行通信，这个阶段就是数据传输阶段，此时只支持使用TCP/IP协议来传递数据。<em>Hazelcast</em>的所有网络行为，都是通过<em>&lt;networt&gt;&lt;/network&gt;</em>元素配置决定的。<em>&lt;join&gt;</em>元素用来配置组建集群的相关的参数。\n</p>\n<h3 id="h3-1">组播协议（Multicast）组建集群</h3>\n<p>在使用组播协议（<em>Multicast</em>）作为自动组建集群机制时，集群中的成员不需要知道其他成员的详细地址（<em>IP</em>），他们仅仅是通过组播将信号广播到其他成员的监听端口中。使用之前确保网络环境支持&nbsp;<em>Multicast</em>。\n</p>\n<p>下面是一个通过组播协议（<em>Multicast</em>）组网的例子：</p>\n<pre class="xml"><code class="language-xml"><span class="code-tag"><span class="code-tag">&lt;</span><span\n        class="code-name"><span class="code-tag"><span class="code-name">hazelcast</span></span></span><span\n        class="code-tag">&gt;</span></span>\n  <span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span class="code-tag"><span\n          class="code-name">network</span></span></span><span class="code-tag">&gt;</span></span>\n        <span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span class="code-tag"><span\n                class="code-name">join</span></span></span><span class="code-tag">&gt;</span></span>\n            <span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span\n                    class="code-tag"><span class="code-name">multicast</span></span></span><span\n                    class="code-tag"> </span><span class="hljs-attr"><span class="code-tag"><span class="hljs-attr">enabled</span></span></span><span\n                    class="code-tag">=</span><span class="code-string"><span class="code-tag"><span class="code-string">"true"</span></span></span><span\n                    class="code-tag">&gt;</span></span>\n                <span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span class="code-tag"><span\n                        class="code-name">multicast-group</span></span></span><span class="code-tag">&gt;</span></span>224.2.2.3<span\n            class="code-tag"><span class="code-tag">&lt;/</span><span class="code-name"><span class="code-tag"><span\n            class="code-name">multicast-group</span></span></span><span class="code-tag">&gt;</span></span>\n                <span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span class="code-tag"><span\n                        class="code-name">multicast-port</span></span></span><span class="code-tag">&gt;</span></span>54327<span\n            class="code-tag"><span class="code-tag">&lt;/</span><span class="code-name"><span class="code-tag"><span\n            class="code-name">multicast-port</span></span></span><span class="code-tag">&gt;</span></span>\n                <span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span class="code-tag"><span\n                        class="code-name">multicast-time-to-live</span></span></span><span class="code-tag">&gt;</span></span>32<span\n            class="code-tag"><span class="code-tag">&lt;/</span><span class="code-name"><span class="code-tag"><span\n            class="code-name">multicast-time-to-live</span></span></span><span class="code-tag">&gt;</span></span>\n                <span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span class="code-tag"><span\n                        class="code-name">multicast-timeout-seconds</span></span></span><span\n                        class="code-tag">&gt;</span></span>2<span class="code-tag"><span\n            class="code-tag">&lt;/</span><span class="code-name"><span class="code-tag"><span class="code-name">multicast-timeout-seconds</span></span></span><span\n            class="code-tag">&gt;</span></span>\n                <span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span class="code-tag"><span\n                        class="code-name">trusted-interfaces</span></span></span><span\n                        class="code-tag">&gt;</span></span>\n                   <span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span\n                           class="code-tag"><span class="code-name">interface</span></span></span><span\n                           class="code-tag">&gt;</span></span>192.168.1.102<span class="code-tag"><span\n            class="code-tag">&lt;/</span><span class="code-name"><span class="code-tag"><span class="code-name">interface</span></span></span><span\n            class="code-tag">&gt;</span></span>\n                <span class="code-tag"><span class="code-tag">&lt;/</span><span class="code-name"><span\n                        class="code-tag"><span class="code-name">trusted-interfaces</span></span></span><span\n                        class="code-tag">&gt;</span></span>\n            <span class="code-tag"><span class="code-tag">&lt;/</span><span class="code-name"><span\n                    class="code-tag"><span class="code-name">multicast</span></span></span><span\n                    class="code-tag">&gt;</span></span>\n            <span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span\n                    class="code-tag"><span class="code-name">tcp-ip</span></span></span><span\n                    class="code-tag"> </span><span class="hljs-attr"><span class="code-tag"><span class="hljs-attr">enabled</span></span></span><span\n                    class="code-tag">=</span><span class="code-string"><span class="code-tag"><span class="code-string">"false"</span></span></span><span\n                    class="code-tag">&gt;</span></span>\n            <span class="code-tag"><span class="code-tag">&lt;/</span><span class="code-name"><span\n                    class="code-tag"><span class="code-name">tcp-ip</span></span></span><span\n                    class="code-tag">&gt;</span></span>\n            <span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span\n                    class="code-tag"><span class="code-name">aws</span></span></span><span\n                    class="code-tag"> </span><span class="hljs-attr"><span class="code-tag"><span class="hljs-attr">enabled</span></span></span><span\n                    class="code-tag">=</span><span class="code-string"><span class="code-tag"><span class="code-string">"false"</span></span></span><span\n                    class="code-tag">&gt;</span></span>\n            <span class="code-tag"><span class="code-tag">&lt;/</span><span class="code-name"><span\n                    class="code-tag"><span class="code-name">aws</span></span></span><span class="code-tag">&gt;</span></span>\n        <span class="code-tag"><span class="code-tag">&lt;/</span><span class="code-name"><span class="code-tag"><span\n                class="code-name">join</span></span></span><span class="code-tag">&gt;</span></span>\n  <span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span class="code-tag"><span\n          class="code-name">network</span></span></span><span class="code-tag">&gt;</span></span></code></pre>\n<p>组网功能的配置由&nbsp;<em>&lt;join&gt;</em> 及其子元素来确定。其中 <em>&lt;multicast&gt;</em> 元素用来配置 <em>组播协议</em> 组网的相关参数。当设置&nbsp;<em>&lt;multicast&gt;</em>\n    元素中 <em>enabled </em>属性为 <em>true </em>时，表示启用 <em>组播协议</em> 组网。下面将详细说明每一个参数：</p>\n<p><strong><em>enabled</em></strong>：<em>[true|false]</em>，指定是否使用组播协议来组建集群。</p>\n<p><em><strong>multicast-group</strong></em>：组播分组的IP地址。当要创建同一个网段的集群时，需要配置这个参数。取值范围从224.0.0.0到239.255.255.255，默认224.2.2.3。\n</p>\n<p><em><strong>multicast-port</strong></em>：组播协议启用套接字的端口（socket port），这个端口用于Hazelcast监听外部发送来的组网请求。默认54327。</p>\n<p><strong><em>multicast-time-to-live</em></strong>：组播协议发送包的生存时间周期（TTL）。可以从 <a title="组播协议的TTL"\n        href="http://www.tldp.org/HOWTO/Multicast-HOWTO-2.html" rel="nofollow">协议官方文档</a>&nbsp;详细了解 组播协议的TTL。</p>\n<p><strong><em>multicast-timeout-seconds</em></strong>：当节点启动后，这个参数（单位：秒）指定了当前节点等待其他节点响应的时间周期。例如，设置为60秒时，每一个节点启动后通过组播协议广播消息，如果主节点在60秒内返回响应消息，则新启动的节点加入这个主节点所在的集群，如果设定时间内没有返回消息，那么节点会把自己设置为一个主节点，并创建新的集群（主节点可以理解为集群的第一个节点）。默认值为2秒。\n</p>\n<p><strong><em>trusted-interfaces</em></strong>：可信任成员的IP地址。当一个节点试图加入集群，如果其不是一个可信任节点，他的加入请求将被拒绝。可以在IP的最后一个数字上使用通配符（*）来设置一个IP范围（例如：192.168.1.*\n    或192.168.1.100-110）。</p>\n\n<h2 id="h2-2">TCP协议组建集群</h2>\n<p>除了使用 组播协议，还可以使用<em>TCP/IP</em>协议来组建集群。当使用<em>TCP/IP</em>来组建新集群时，第一个节点必须将所有要加入集群的节点IP地址添加到对应列表中。在集群已经运行之后，新加入的节点不必知道所有的集群节点，但是至少要知道并连接到一个已经启动的集群节点。\n</p>\n<p>下面是一个使用<em>TCP/IP</em>协议来组建集群的例子：</p>\n<pre class="xml"><code class="language-xml"><span class="code-tag"><span class="code-tag">&lt;</span><span\n        class="code-name"><span class="code-tag"><span class="code-name">hazelcast</span></span></span><span\n        class="code-tag">&gt;</span></span>\n  <span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span class="code-tag"><span\n          class="code-name">network</span></span></span><span class="code-tag">&gt;</span></span>\n    <span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span class="code-tag"><span\n            class="code-name">join</span></span></span><span class="code-tag">&gt;</span></span>\n      <span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span class="code-tag"><span\n              class="code-name">multicast</span></span></span><span class="code-tag"> </span><span\n              class="hljs-attr"><span class="code-tag"><span class="hljs-attr">enabled</span></span></span><span\n              class="code-tag">=</span><span class="code-string"><span class="code-tag"><span class="code-string">"false"</span></span></span><span\n              class="code-tag">&gt;</span></span>\n      <span class="code-tag"><span class="code-tag">&lt;/</span><span class="code-name"><span class="code-tag"><span\n              class="code-name">multicast</span></span></span><span class="code-tag">&gt;</span></span>\n      <span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span class="code-tag"><span\n              class="code-name">tcp-ip</span></span></span><span class="code-tag"> </span><span class="hljs-attr"><span\n              class="code-tag"><span class="hljs-attr">enabled</span></span></span><span class="code-tag">=</span><span\n              class="code-string"><span class="code-tag"><span class="code-string">"true"</span></span></span><span\n              class="code-tag">&gt;</span></span>\n          <span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span class="code-tag"><span\n                  class="code-name">required-member</span></span></span><span class="code-tag">&gt;</span></span>192.168.1.104<span\n            class="code-tag"><span class="code-tag">&lt;/</span><span class="code-name"><span class="code-tag"><span\n            class="code-name">required-member</span></span></span><span class="code-tag">&gt;</span></span>\n          <span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span class="code-tag"><span\n                  class="code-name">member</span></span></span><span\n                  class="code-tag">&gt;</span></span>192.168.1.104<span class="code-tag"><span\n            class="code-tag">&lt;/</span><span class="code-name"><span class="code-tag"><span\n            class="code-name">member</span></span></span><span class="code-tag">&gt;</span></span>\n          <span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span class="code-tag"><span\n                  class="code-name">members</span></span></span><span class="code-tag">&gt;</span></span>192.168.1.105,192.168.1.106<span\n            class="code-tag"><span class="code-tag">&lt;/</span><span class="code-name"><span class="code-tag"><span\n            class="code-name">members</span></span></span><span class="code-tag">&gt;</span></span>\n          <span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span class="code-tag"><span\n                  class="code-name">connection-timeout-seconds</span></span></span><span\n                  class="code-tag">&gt;</span></span>60<span class="code-tag"><span class="code-tag">&lt;/</span><span\n            class="code-name"><span class="code-tag"><span\n            class="code-name">connection-timeout-seconds</span></span></span><span class="code-tag">&gt;</span></span>\n      <span class="code-tag"><span class="code-tag">&lt;/</span><span class="code-name"><span class="code-tag"><span\n              class="code-name">tcp-ip</span></span></span><span class="code-tag">&gt;</span></span>\n    <span class="code-tag"><span class="code-tag">&lt;/</span><span class="code-name"><span class="code-tag"><span\n            class="code-name">join</span></span></span><span class="code-tag">&gt;</span></span>\n  <span class="code-tag"><span class="code-tag">&lt;/</span><span class="code-name"><span class="code-tag"><span\n          class="code-name">network</span></span></span><span class="code-tag">&gt;</span></span>\n<span class="code-tag"><span class="code-tag">&lt;/</span><span class="code-name"><span class="code-tag"><span\n        class="code-name">hazelcast</span></span></span><span class="code-tag">&gt;</span></span></code></pre>\n<p>从上面的例子可以看出使用<em>TCP/IP</em>组建网络涉及的配置参数并不多。首先需要将<em>&lt;tcp-ip&gt;</em>元素中的<em>enabled</em>属性设置为<em>true</em>表示启用<em>TCP/IP</em>协议来组网。然后每个元素对应的含义如下\n</p>\n<p><em><strong>&nbsp;required-member</strong></em>：加入集群的成员<em>IP</em>地址，只有这些<em>IP</em>地址的成员存在时集群才会组建。也就是说如果要当前节点加入集群，必须<em>&lt;required-member&gt;</em>元素中的指定的<em>IP</em>地址已经有集群节点先启动了，该节点才能启动，可以用于限制节点的启动顺序。\n</p>\n<p><strong><em>member</em></strong>：成员的<em>IP</em>地址。指定要加入集群的成员IP地址，这些IP地址中的成员会相互发现对方。</p>\n<p><em><strong>members</strong></em>：<em>member</em>的复数形态。在元素中可以使用逗号（“,”）分割多个IP地址。还可以使用-或*等符号来表达多个<em>IP</em>地址。</p>\n<p><em><strong>connection-timeout-seconds</strong></em>：定义连接超时时间。<em>Hazelcast</em>尝试连接到一个已知的节点（member元素指定）的最大超时时间，如果在指定时间内连接失败，将会放弃连接。当参数设置太小时，可能会导致一个成员可能无法连接到集群。设置太高时，成员启动的等待时间会比较久，因为当某些<em>&lt;member&gt;</em>元素标记的节点未启动时，需要花费较多时间等待。如果有较多的不同<em>IP</em>地址的成员需要加入集群，可以适当增加这个值，以保证所有的成员可以正确加入集群。默认值为5。\n</p>\n\n<h3 id="h3-2">其他组网方式</h3>\n<p>除了上面说的 组播协议 和 <em>TCP/IP</em>协议\n    组建集群的方式，<em>Hazelcast</em>还为某些特定的使用场景提供了组建集群的方法。目前提供了基于亚马逊的<em>EC2</em>环境和<em>jclouds</em>组建集群，目前还没有亚马逊的云服务的使用经验，相关配置就不详细说明了，如果需要在亚马逊云部署集群可以留言一起聊聊，我会尽量把知道的分享给有需要的朋友。\n</p>\n\n<h2 id="h2-3">Hazelcast网络运行</h2>\n<p>在完成集群组网完成以后<em>Hazelcast</em>的节点之间就会开始数据通信，因此<em>Hazelcast</em>还提供了大量的元素来对数据通信进行配置，看下面这个例子：</p>\n<pre class="xml"><code class="language-xml">   <span class="code-tag"><span class="code-tag">&lt;</span><span\n        class="code-name"><span class="code-tag"><span class="code-name">network</span></span></span><span\n        class="code-tag">&gt;</span></span>\n        <span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span class="code-tag"><span\n                class="code-name">public-address</span></span></span><span class="code-tag">&gt;</span></span>11.22.33.44:5555<span\n            class="code-tag"><span class="code-tag">&lt;/</span><span class="code-name"><span class="code-tag"><span\n            class="code-name">public-address</span></span></span><span class="code-tag">&gt;</span></span>\n        <span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span class="code-tag"><span\n                class="code-name">port</span></span></span><span class="code-tag"> </span><span class="hljs-attr"><span\n                class="code-tag"><span class="hljs-attr">auto-increment</span></span></span><span\n                class="code-tag">=</span><span class="code-string"><span class="code-tag"><span class="code-string">"true"</span></span></span><span\n                class="code-tag"> </span><span class="hljs-attr"><span class="code-tag"><span class="hljs-attr">port-count</span></span></span><span\n                class="code-tag">=</span><span class="code-string"><span class="code-tag"><span class="code-string">"100"</span></span></span><span\n                class="code-tag">&gt;</span></span>5701<span class="code-tag"><span class="code-tag">&lt;/</span><span\n            class="code-name"><span class="code-tag"><span class="code-name">port</span></span></span><span\n            class="code-tag">&gt;</span></span>\n        <span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span class="code-tag"><span\n                class="code-name">outbound-ports</span></span></span><span class="code-tag">&gt;</span></span>\n            <span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span\n                    class="code-tag"><span class="code-name">ports</span></span></span><span\n                    class="code-tag">&gt;</span></span>0<span class="code-tag"><span class="code-tag">&lt;/</span><span\n            class="code-name"><span class="code-tag"><span class="code-name">ports</span></span></span><span\n            class="code-tag">&gt;</span></span>\n        <span class="code-tag"><span class="code-tag">&lt;/</span><span class="code-name"><span class="code-tag"><span\n                class="code-name">outbound-ports</span></span></span><span class="code-tag">&gt;</span></span>\n        <span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span class="code-tag"><span\n                class="code-name">reuse-address</span></span></span><span class="code-tag">&gt;</span></span>false<span\n            class="code-tag"><span class="code-tag">&lt;/</span><span class="code-name"><span class="code-tag"><span\n            class="code-name">reuse-address</span></span></span><span class="code-tag">&gt;</span></span>\n        <span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span class="code-tag"><span\n                class="code-name">interfaces</span></span></span><span class="code-tag"> </span><span class="hljs-attr"><span\n                class="code-tag"><span class="hljs-attr">enabled</span></span></span><span\n                class="code-tag">=</span><span class="code-string"><span class="code-tag"><span class="code-string">"false"</span></span></span><span\n                class="code-tag">&gt;</span></span>\n            <span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span\n                    class="code-tag"><span class="code-name">interface</span></span></span><span\n                    class="code-tag">&gt;</span></span>10.10.1.*<span class="code-tag"><span\n            class="code-tag">&lt;/</span><span class="code-name"><span class="code-tag"><span class="code-name">interface</span></span></span><span\n            class="code-tag">&gt;</span></span>\n        <span class="code-tag"><span class="code-tag">&lt;/</span><span class="code-name"><span class="code-tag"><span\n                class="code-name">interfaces</span></span></span><span class="code-tag">&gt;</span></span>\n        <span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span class="code-tag"><span\n                class="code-name">ssl</span></span></span><span class="code-tag"> </span><span class="hljs-attr"><span\n                class="code-tag"><span class="hljs-attr">enabled</span></span></span><span\n                class="code-tag">=</span><span class="code-string"><span class="code-tag"><span class="code-string">"false"</span></span></span><span\n                class="code-tag"> /&gt;</span></span>\n        <span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span class="code-tag"><span\n                class="code-name">socket-interceptor</span></span></span><span class="code-tag"> </span><span\n                class="hljs-attr"><span class="code-tag"><span class="hljs-attr">enabled</span></span></span><span\n                class="code-tag">=</span><span class="code-string"><span class="code-tag"><span class="code-string">"false"</span></span></span><span\n                class="code-tag"> /&gt;</span></span>\n        <span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span class="code-tag"><span\n                class="code-name">symmetric-encryption</span></span></span><span class="code-tag"> </span><span\n                class="hljs-attr"><span class="code-tag"><span class="hljs-attr">enabled</span></span></span><span\n                class="code-tag">=</span><span class="code-string"><span class="code-tag"><span class="code-string">"false"</span></span></span><span\n                class="code-tag">&gt;</span></span>\n            <span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span\n                    class="code-tag"><span class="code-name">algorithm</span></span></span><span\n                    class="code-tag">&gt;</span></span>PBEWithMD5AndDES<span class="code-tag"><span class="code-tag">&lt;/</span><span\n            class="code-name"><span class="code-tag"><span class="code-name">algorithm</span></span></span><span\n            class="code-tag">&gt;</span></span>\n            <span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span\n                    class="code-tag"><span class="code-name">salt</span></span></span><span class="code-tag">&gt;</span></span>thesalt<span\n            class="code-tag"><span class="code-tag">&lt;/</span><span class="code-name"><span class="code-tag"><span\n            class="code-name">salt</span></span></span><span class="code-tag">&gt;</span></span>\n            <span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span\n                    class="code-tag"><span class="code-name">password</span></span></span><span\n                    class="code-tag">&gt;</span></span>thepass<span class="code-tag"><span class="code-tag">&lt;/</span><span\n            class="code-name"><span class="code-tag"><span class="code-name">password</span></span></span><span\n            class="code-tag">&gt;</span></span>\n            <span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span\n                    class="code-tag"><span class="code-name">iteration-count</span></span></span><span class="code-tag">&gt;</span></span>19<span\n            class="code-tag"><span class="code-tag">&lt;/</span><span class="code-name"><span class="code-tag"><span\n            class="code-name">iteration-count</span></span></span><span class="code-tag">&gt;</span></span>\n        <span class="code-tag"><span class="code-tag">&lt;/</span><span class="code-name"><span class="code-tag"><span\n                class="code-name">symmetric-encryption</span></span></span><span class="code-tag">&gt;</span></span>\n    <span class="code-tag"><span class="code-tag">&lt;/</span><span class="code-name"><span class="code-tag"><span\n            class="code-name">network</span></span></span><span class="code-tag">&gt;</span></span></code></pre>\n<p>除了<em>&lt;join&gt;</em>元素，Hazelcast还提供了上面XML中的元素来配置网络数据通信，下面我们一一介绍他的作用。</p>\n\n<h3 id="h3-3"><strong><em>public-address</em></strong></h3>\n<p><strong><em>&nbsp;&nbsp;&nbsp;&nbsp;</em></strong>配置当前节点的对外公开地址。什么叫对外公开地址呢？默认情况下，一个节点会使用它的套接字（<em>sockets</em>）地址作为公开地址。但是经过网络地址转换（<em>NAT</em>），2个节点可能无法彼此访问。此时只有将2个节点的公开地址设置为在<em>NAT</em>上定义的地址才能完成连接。这种情况下，公开地址并不是本地的地址，而是一个由<em>NAT</em>定义的虚拟地址。这个设置对于在私有云的环境中使用<em>Hazelcasst</em>会非常有用。需要注意的是，这个元素的配置需要制定端口，即<em>\n    [domain|ip]:port</em>&nbsp;的格式。</p>\n\n<h3 id="h3-4"><strong><em>port</em></strong></h3>\n<p><strong><em>&nbsp;&nbsp;&nbsp;&nbsp;</em></strong>指定<em>Hazelcast</em>用于集群成员之间数据通信的端口。<em>Hazelcast</em>会根据端口的使用情况自动检查可以使用的端口。检查方式主要通过<em>&lt;port&gt;</em>元素中的<em>port-count</em>和<em>auto-increment</em>来决定。下面是关于他们的说明：\n</p>\n<ul>\n    <li><strong><em>port-count</em></strong>：默认时，<em>Hazelcast</em>将尝试绑定100个端口。意思是，如果将端口设置为5701，当有一个成员加入到集群，<em>Hazelcast</em>将尝试在5701到5801之间寻找一个端口。当有大量的实例运行在同一个机器，而端口较为紧缺时，可以适当的加大这个数字。这个参数就是用于此目的，默认是100。\n    </li>\n    <li><strong><em>auto-increment</em></strong>：<em>Hazelcast</em>将会尝试在5701到5801之间寻找未被使的端口。通常情况下，不需要去修改这个值，这个配置已经非常方便使用。但是在某些时候，系统希望使用指定的端口，此时可以通过关闭自动增长功能来实现——将<em>auto-increment</em>属性设置设为false。\n    </li>\n</ul>\n\n<h3 id="h3-5"><strong><em>outbound-ports</em></strong></h3>\n<p><strong><em>&nbsp;&nbsp;&nbsp;&nbsp;</em></strong>默认情况下，在打开一个套接字（socket）用于传输数据时系统会选择一个临时端口。但是如果启用某些安全策略或防火墙可能会限制某些临时端口的使用。为了解决这个问题，<em>Hazelcast</em>提供&lt;outbound-ports&gt;元素来指定套接字的临时对外传输端口。可以像下面这样配置多个套接字端口：\n</p>\n<pre class="xml"><code class="language-xml"><span class="code-tag"><span class="code-tag">&lt;</span><span\n        class="code-name"><span class="code-tag"><span class="code-name">network</span></span></span><span\n        class="code-tag">&gt;</span></span>\n    <span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span class="code-tag"><span\n            class="code-name">outbound-ports</span></span></span><span class="code-tag">&gt;</span></span>\n      <span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span class="code-tag"><span\n              class="code-name">ports</span></span></span><span class="code-tag">&gt;</span></span>33000-35000<span\n            class="code-tag"><span class="code-tag">&lt;/</span><span class="code-name"><span class="code-tag"><span\n            class="code-name">ports</span></span></span><span class="code-tag">&gt;</span></span>\n      <span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span class="code-tag"><span\n              class="code-name">ports</span></span></span><span class="code-tag">&gt;</span></span>37000,37001,37002,37003<span\n            class="code-tag"><span class="code-tag">&lt;/</span><span class="code-name"><span class="code-tag"><span\n            class="code-name">ports</span></span></span><span class="code-tag">&gt;</span></span>\n      <span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span class="code-tag"><span\n              class="code-name">ports</span></span></span><span\n              class="code-tag">&gt;</span></span>38000,38500-38600<span class="code-tag"><span\n            class="code-tag">&lt;/</span><span class="code-name"><span class="code-tag"><span\n            class="code-name">ports</span></span></span><span class="code-tag">&gt;</span></span>\n    <span class="code-tag"><span class="code-tag">&lt;/</span><span class="code-name"><span class="code-tag"><span\n            class="code-name">outbound-ports</span></span></span><span class="code-tag">&gt;</span></span>\n<span class="code-tag"><span class="code-tag">&lt;/</span><span class="code-name"><span class="code-tag"><span\n        class="code-name">network</span></span></span><span class="code-tag">&gt;</span></span></code></pre>\n<p>默认为<em>&lt;ports&gt;0&lt;/ports&gt;</em>，表示由<em>Hazelcast</em>自己选择可用端口。</p>\n\n<h3 id="h3-6"><em><strong>Reuse Address</strong></em></h3>\n<p>配置地址是否可以重用。当关闭一个集群节点时，服务器的套接字（<em>socket</em>）端口会处于 <em>TIME_WAIT<span style="background-color:rgb(253, 246, 227)">&nbsp;</span></em>状态。如果将<em>&lt;reuse-address&gt;</em>元素设置为true，那么<em>TIME_WAIT</em>状态将被忽略，新加入的节点可以重复使用已经释放的端口。\n</p>\n\n<h3 id="h3-7"><em><strong>Interfaces</strong></em></h3>\n<p><em><strong>&nbsp;&nbsp;&nbsp;&nbsp;</strong></em>指定Hazelcast使用的网络接口地址。一些服务器可能有多个网络接口（多个网卡），因此可能需要限定可用的IP地址。范围字符(\'*\'\n    and \'-\')可以用于多个地址，例如&nbsp;10.3.10.*是指从10.3.10.0到10.3.10.255的端口均可使用，又例如：10.3.10.4-18是指从10.3.10.4到10.3.10.18的IP地址（包含4和18）。将<em>&lt;interfaces&gt;</em>的enabled设置为true，则会启用网络接口配置（默认是禁用的），在启用网络接口配置后如果Hazelcast找不到配置的IP地址，将会输出一个异常信息，并停止启动节点。\n</p>\n\n<h3 id="h3-8">其他商用授权配置</h3>\n<p>除了前面提到的几个配置，<em>Hazelcast</em>还额外提供了<em>&lt;ssl&gt;</em>、<em>&lt;socket-interceptor&gt;</em>、<em>&lt;symmetric-encryption&gt;</em>四个安全相关的配置，但是需要获取<em>Hazlecast</em>的商用授权下载商用版本这些配置才能生效。<em>ssl</em>表示启用<em>ssl</em>传输、<em>interceptor</em>用于传输拦截器、<em>symmetric-encryption</em>用于传输数据加密。\n</p>\n\n<h3 id="h3-9">IPV6支持</h3>\n<p><em>Hazelcast</em>的所有网络<em>IP</em>配置都支持IPV6。例如可以使用下面的方式来配置<em>IP</em>地址：</p>\n<pre class="xml"><code class="language-xml"><span class="code-tag"><span class="code-tag">&lt;</span><span\n        class="code-name"><span class="code-tag"><span class="code-name">hazelcast</span></span></span><span\n        class="code-tag">&gt;</span></span>\n  <span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span class="code-tag"><span\n          class="code-name">network</span></span></span><span class="code-tag">&gt;</span></span>\n    <span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span class="code-tag"><span\n            class="code-name">port</span></span></span><span class="code-tag"> </span><span class="hljs-attr"><span\n            class="code-tag"><span class="hljs-attr">auto-increment</span></span></span><span\n            class="code-tag">=</span><span class="code-string"><span class="code-tag"><span\n            class="code-string">"true"</span></span></span><span class="code-tag">&gt;</span></span>5701<span\n            class="code-tag"><span class="code-tag">&lt;/</span><span class="code-name"><span class="code-tag"><span\n            class="code-name">port</span></span></span><span class="code-tag">&gt;</span></span>\n    <span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span class="code-tag"><span\n            class="code-name">join</span></span></span><span class="code-tag">&gt;</span></span>\n      <span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span class="code-tag"><span\n              class="code-name">multicast</span></span></span><span class="code-tag"> </span><span\n              class="hljs-attr"><span class="code-tag"><span class="hljs-attr">enabled</span></span></span><span\n              class="code-tag">=</span><span class="code-string"><span class="code-tag"><span class="code-string">"false"</span></span></span><span\n              class="code-tag">&gt;</span></span>\n        <span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span class="code-tag"><span\n                class="code-name">multicast-group</span></span></span><span class="code-tag">&gt;</span></span>FF02:0:0:0:0:0:0:1<span\n            class="code-tag"><span class="code-tag">&lt;/</span><span class="code-name"><span class="code-tag"><span\n            class="code-name">multicast-group</span></span></span><span class="code-tag">&gt;</span></span>\n        <span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span class="code-tag"><span\n                class="code-name">multicast-port</span></span></span><span class="code-tag">&gt;</span></span>54327<span\n            class="code-tag"><span class="code-tag">&lt;/</span><span class="code-name"><span class="code-tag"><span\n            class="code-name">multicast-port</span></span></span><span class="code-tag">&gt;</span></span>\n      <span class="code-tag"><span class="code-tag">&lt;/</span><span class="code-name"><span class="code-tag"><span\n              class="code-name">multicast</span></span></span><span class="code-tag">&gt;</span></span>\n      <span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span class="code-tag"><span\n              class="code-name">tcp-ip</span></span></span><span class="code-tag"> </span><span class="hljs-attr"><span\n              class="code-tag"><span class="hljs-attr">enabled</span></span></span><span class="code-tag">=</span><span\n              class="code-string"><span class="code-tag"><span class="code-string">"true"</span></span></span><span\n              class="code-tag">&gt;</span></span>\n        <span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span class="code-tag"><span\n                class="code-name">member</span></span></span><span class="code-tag">&gt;</span></span>fe80::223:6cff:fe93:7c7e:5701<span\n            class="code-tag"><span class="code-tag">&lt;/</span><span class="code-name"><span class="code-tag"><span\n            class="code-name">member</span></span></span><span class="code-tag">&gt;</span></span>\n        <span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span class="code-tag"><span\n                class="code-name">interface</span></span></span><span class="code-tag">&gt;</span></span>fe80:0:0:0:45c5:47ee:fe15:493a<span\n            class="code-tag"><span class="code-tag">&lt;/</span><span class="code-name"><span class="code-tag"><span\n            class="code-name">interface</span></span></span><span class="code-tag">&gt;</span></span>\n      <span class="code-tag"><span class="code-tag">&lt;/</span><span class="code-name"><span class="code-tag"><span\n              class="code-name">tcp-ip</span></span></span><span class="code-tag">&gt;</span></span>\n    <span class="code-tag"><span class="code-tag">&lt;/</span><span class="code-name"><span class="code-tag"><span\n            class="code-name">join</span></span></span><span class="code-tag">&gt;</span></span>\n    <span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span class="code-tag"><span\n            class="code-name">interfaces</span></span></span><span class="code-tag"> </span><span\n            class="hljs-attr"><span class="code-tag"><span class="hljs-attr">enabled</span></span></span><span\n            class="code-tag">=</span><span class="code-string"><span class="code-tag"><span\n            class="code-string">"true"</span></span></span><span class="code-tag">&gt;</span></span>\n      <span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span class="code-tag"><span\n              class="code-name">interface</span></span></span><span class="code-tag">&gt;</span></span>fe80:0:0:0:45c5:47ee:fe15:*<span\n            class="code-tag"><span class="code-tag">&lt;/</span><span class="code-name"><span class="code-tag"><span\n            class="code-name">interface</span></span></span><span class="code-tag">&gt;</span></span>\n      <span class="code-tag"><span class="code-tag">&lt;</span><span class="code-name"><span class="code-tag"><span\n              class="code-name">interface</span></span></span><span class="code-tag">&gt;</span></span>fe80::223:6cff:fe93:0-5555<span\n            class="code-tag"><span class="code-tag">&lt;/</span><span class="code-name"><span class="code-tag"><span\n            class="code-name">interface</span></span></span><span class="code-tag">&gt;</span></span>\n    <span class="code-tag"><span class="code-tag">&lt;/</span><span class="code-name"><span class="code-tag"><span\n            class="code-name">interfaces</span></span></span><span class="code-tag">&gt;</span></span>\n  <span class="code-tag"><span class="code-tag">&lt;/</span><span class="code-name"><span class="code-tag"><span\n          class="code-name">network</span></span></span><span class="code-tag">&gt;</span></span>\n<span class="code-tag"><span class="code-tag">&lt;/</span><span class="code-name"><span class="code-tag"><span\n        class="code-name">hazelcast</span></span></span><span class="code-tag">&gt;</span></span></code></pre>\n<p>需要强调的是，并不是所有的环境都能有效的支持<em>IPV6</em>。而<em>Hazelcast</em>有个坑时在同时支持<em>IPV6</em>和<em>IPV4</em>的环境会优先使用<em>IPV6</em>作为默认地址协议，这样会导致有时组网会失败。可以将jvm系统参数<em>java.net.preferIPv4Stack</em>设置为<em>true</em>（<em>java&nbsp;-Djava.net.preferIPv4Stack=[true|false]...</em>）来指定<em>jvm</em>环境强制使用<em>ipv4</em>。\n</p>\n<p>到此，<em>Hazelcast</em>组建集群和网络通信相关的内容介绍完毕，总的来说都是网络配置相关的说明。后续的博文会逐一介绍Hazelcast的分布式数据结构（Map、List等）和分布式功能。</p>'}};