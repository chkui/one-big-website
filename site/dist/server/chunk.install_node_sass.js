exports.ids=[64],exports.modules={312:function(n,s,p){"use strict";Object.defineProperty(s,"__esModule",{value:!0});s.content='<p>使用react到现在，让人头疼的一个问题是安装node-sass。其实导致问题的根源在于安装过程需要下载一个binding.node文件，而因“你懂的”原因，访问不了这个地址。根据这个原因，总结了以下几个解决方案：</p>\n<h2 id="h2-1">翻墙</h2>\n<p>这没什么好说的了，这是最轻松最彪悍的解决方案。只要能翻墙直接一个&nbsp;<span style="background-color:#D3D3D3">&nbsp;npm i&nbsp;</span>命令就完事了，什么都不必去操心。至于怎么翻墙…………\n</p>\n\n<h2 id="h2-2">使用cnpm</h2>\n<p>cnpm是一个强悍的工具，几乎能解决所有npm安装第三方包时遇到的问题。执行如下命令即可：</p>\n<pre class="sql"><code class="language-bash">npm <span class="code-keyword">install</span>\nnpm rm node-sass\ncnpm <span class="code-keyword">install</span> node-sass\nnpm <span class="code-keyword">install</span></code></pre>\n<p>\n    但是我们在使用cnpm时也遇到了一个坑，在ubuntu14.04打出来的包运行报错，不用cnpm下载居然就不会有这问题，由于没有时间，没有详细去了解原因是什么。如果你是Windows开发而使用Linux环境打包或运行，可能会碰到这个问题。</p>\n\n<h2 id="h2-3">下载后编译</h2>\n<p>\n    实际上为了得到binding.node，是可以直接从github上把源码下载下来之后再编译出来的，node-sass自己也会这样做，但是编译要依赖其他工具。在各种发行版的linux下还好，几乎所有需要的环境（python等）都是预安装的，如果是root权限直接<span\n        style="background-color:#A9A9A9"> upm install </span>就搞定了，所以有时候根本感觉不到这个问题。在windows下就得花时间根据install时的错误日志了解还要安装什么。\n</p>\n<p>linux下遇到权限问题请执行：</p>\n<pre class="lua"><code class="language-bash">npm i <span class="code-comment">--unsafe -perm</span></code></pre>\n\n<h2 id="h2-4">附送一个最奇葩的坑</h2>\n<p>这是我用所有的开源工具遇到过最奇葩的坑。我将一个文件命名为“./dropDown.scss”，然后在linux(是ubuntu\n    14.04其他发行版没时间去测试，windows没这毛病)上用webpack打包，打包过程没有任何异常，但是放到服务器上运行打开某个页面就抛出无法找到"./dropDown.scss"的异常，然后node直接停机了········。我前后跟进了2天寻找问题的原因。最后突发奇想将文件名由dropDown.scss修改为pullDown.scss后一切都好了。我强烈的怀疑是某个临时工在node-sass里写了什么“硬编码”对字符串进行判断，发现“/drop[*]”这样的前缀进行一些特殊处理。在此记录下来。</p>'}};