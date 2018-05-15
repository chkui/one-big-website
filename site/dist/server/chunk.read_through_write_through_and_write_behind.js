exports.ids=[33],exports.modules={252:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.content='<p>在hazelcast的官方文档中，提到了其支持read-through，write-through与write-behind三种模式。查阅资料，最后在oracle的官文中找到了比较靠谱的解释。</p>\n<p>read-throug、write-through、write-behind三个概念都是关于数据缓存管理的。其实这些概念在实际使用的过程中经常接触。</p>\n<h2 id="h2-1"><strong>Read-throug</strong></h2>\n<p>当应用系统向缓存系统请求数据时（例如使用key=x向缓存请求数据）；如果缓存中并没有对应的数据存在（key=x的value不存在），缓存系统将向底层数据源的读取数据。如果数据在缓存中存在（命中key=x），则直接返回缓存中存在的数据。这就是所谓的<strong>Read-throug。</strong></p>\n<p>hazelcast原文：</p>\n<blockquote>\n    <p>If an entry does not exist in the memory when an application asks for it, Hazelcast asks your loader implementation to load that entry from the data store。 &nbsp;If the entry exists there, the loader implementation gets it, hands it to Hazelcast, and Hazelcast puts it into the memory. This is read-through persistence mode。</p>\n</blockquote>\n<p>下图是Oracle官网的<strong>Read-throug</strong>图例。\n    <img alt="Hazelcast read-through、write-through与write-behind模式" src="https://file.mahoooo.com/res/file/read_through_write_through_and_write_behind_1.jpg">\n</p>\n<h2 id="h2-2">Write-Through</h2>\n<p>当应用系统对缓存中的数据进行更新时（例如调用put方法更新或添加条目），缓存系统会同步更新缓存数据和底层数据源。</p>\n<p>下图展示了执行过程：</p>\n<p><img alt="Hazelcast read-through、write-through与write-behind模式" src="https://file.mahoooo.com/res/file/read_through_write_through_and_write_behind_2.jpg"></p>\n<h2 id="h2-3">Write-Behind</h2>\n<p>当应用系统对缓存中的数据进行更新时（例如调用put方法更新或添加条目），缓存系统会在指定的时间后向底层数据源更新数据。</p>\n<p><img alt="Hazelcast read-through、write-through与write-behind模式" src="https://file.mahoooo.com/res/file/read_through_write_through_and_write_behind_3.jpg"></p>'}};