exports.ids=[13],exports.modules={325:function(n,o,s){"use strict";Object.defineProperty(o,"__esModule",{value:!0});o.content='<p>本文将解释如何在Windows下安装TensorFlow。</p>\n\n<h2 id="h2-1">确定安装哪类TensorFlow</h2>\n<p>需要先确定哪种类型的TensorFlow：</p>\n<ul>\n    <li><strong>仅支持CUP运算版本：</strong>如果电脑的系统没有&nbsp;NVIDIA®的GPU，那么必须安装这个版本。这个版本的TensorFlow安装非常简单（安装仅需一个命令，5到10分钟），所以即使系统中有满足要求的NVIDIA®\n        GPU官方还是建议在学习阶段安装这个版本。\n    </li>\n    <li><strong>支持GPU运算的版本：</strong>TensorFlow程序在GPU下运行比在CPU下运行明显快很多。如果系统中包含&nbsp;NVIDIA®的GPU满足下一个小节所示的条件并且程序对性能要求很高，建议安装此版本。\n    </li>\n</ul>\n\n<h2 id="h2-2">运行TensorFlow所需要的GPU配置</h2>\n<p>如果在系统中安装使用GPU运行的TensorFlow，需要确保下面介绍的NVIDIA软件已经安装到系统中。</p>\n<ul>\n    <li>CUDA® Toolkit 8.0。请看 <a\n            href="http://docs.nvidia.com/cuda/cuda-installation-guide-microsoft-windows/#axzz4eDEVDKkM" rel="nofollow">NVIDIA安装cuda</a>\n        的文档，根据文档中的描述确保已经将CUDA相关的路径增加到&nbsp;<code>%PATH%</code>&nbsp;环境变量中。\n    </li>\n    <li>NVIDIA的驱动关联&nbsp;CUDA Toolkit 8.0。</li>\n    <li>cuDNN v5.1。请查看 <a href="https://developer.nvidia.com/cudnn" rel="nofollow">NVIDIA&nbsp;cudnn</a>\n        文档。需要注意的是cuDNN通常安装在与其他CUDA动态链接库（dll）不同的位置。确保已经将cuDNN的 动态链接库（dll）的地址添加到系统的&nbsp;&nbsp;<code>%PATH%</code>&nbsp;环境变量中。\n    </li>\n    <li>GPU显卡必须拥有3.0以上版本的CUDA计算能力，查看 <a href="https://developer.nvidia.com/cuda-gpus" rel="nofollow">NVIDIA显卡支持列表</a>\n        了解支持情况。\n    </li>\n</ul>\n<p>如果系统中已经安装了以前的相关包，请更新到所指定的版本。</p>\n\n<h2 id="h2-3">如何安装TensorFlow</h2>\n<p>在安装TensorFlow之前必须选定一个安装机制。目前提供2种机制：</p>\n<ul>\n    <li>"native"app</li>\n    <li>Anaconda</li>\n</ul>\n<p>\n    Native的安装（以下简称本地安装）方式会将TensorFlow直接安装在当前的系统中，不会在系统和TensorFlow之间搭建任何的虚拟环境，所以本地安装不会额外安装一个独立的容器。需要注意的是本地安装可能会干扰系统中其他基于python安装的程序。如果事先已经安装配置了满足需要的python环境，本地安装通常只需要一个命令就可以完成。使用本地安装，用户可以在系统中任何位置运行TensorFlow。</p>\n<p>在Anaconda模式下，需要使用conda创建一个虚拟环境。官方优先推荐使用&nbsp;<code>pip install</code>&nbsp;命令来安装TensorFlow，其次再考虑anaconda的&nbsp;<code>conda\n    install</code>&nbsp;命令。conda包是第三方社区提供的（非TensorFlow官方），TensorFlow团队从始至终都不会去测试在conda中运行的情况，在使用时需考虑这个风险。</p>\n\n<h3 id="h3-1">本地安装</h3>\n<p>首先，需要安装以下版本的python：</p>\n<ul>\n    <li><a href="https://www.python.org/downloads/release/python-352/" rel="nofollow">Python 3.5.x from python.org</a>\n    </li>\n</ul>\n<p>TensorFlow在windows操作系统中仅仅支持3.5.x版本的python。Python 3.5.x附带pip3软件包管理器，这是用于安装TensorFlow的程序。</p>\n<p>安装TensorFlow需要启动一个终端（terminal），然后在该终端中输入对应的pip3 install命令。安装仅支持CPU版本的TensorFlow，输入以下命令：</p>\n<pre class="lua"><code class="language-bash">C:\\&gt; pip3 install <span class="code-comment">--upgrade tensorflow</span></code></pre>\n<p>安装GPU版本的TensorFlow，使用以下命令：</p>\n<pre class="lua"><code class="language-bash">C:\\&gt; pip3 install <span\n        class="code-comment">--upgrade tensorflow-gpu</span></code></pre>\n<p>Anaconda模式安装</p>\n<p><span style="color:#FF0000">再次强调，Anaconda安装是有第三方社区提供的，非官方。</span></p>\n<p>在Anaconda环境中安装TensorFlow分为以下几个步骤：</p>\n<ol>\n    <li>按照&nbsp;<a href="https://www.continuum.io/downloads" rel="nofollow">Anaconda download site</a>&nbsp;的说明进行下载和安装操作。\n    </li>\n    <li>调用以下命令来创建一个名为tensorflow的conda环境：\n        <pre class="groovy"><code class="language-bash"><span class="code-string">C:</span>&gt; conda create -n tensorflow </code></pre>\n        <p></p></li>\n    <li><p>键入以下命令来启用conda环境：</p>\n        <pre class="yaml"><code class="language-bash"><span class="hljs-attr">C:</span>&gt; activate tensorflow\n (tensorflow)C:&gt;  <span class="code-comment"><span\n                    class="code-comment"># Your prompt should change </span></span></code></pre>\n        <p></p></li>\n    <li><p>键入以下命令在conda环境中安装TensorFlow。这里 安装CPU版本的命令：</p>\n        <pre class="groovy"><code class="language-bash">(tensorflow)<span class="code-string">C:</span>&gt; pip install --ignore-installed --upgrade <span\n                class="code-string">https:</span><span class="code-comment">//storage.googleapis.com/tensorflow/windows/cpu/tensorflow-1.0.1-cp35-cp35m-win_amd64.whl </span>\n</code></pre>\n        <p>这是GPU版本的命令：</p>\n        <pre class="groovy"><code class="language-bash">(tensorflow)<span class="code-string">C:</span>&gt; pip install --ignore-installed --upgrade <span\n                class="code-string">https:</span><span class="code-comment">//storage.googleapis.com/tensorflow/windows/gpu/tensorflow_gpu-1.0.1-cp35-cp35m-win_amd64.whl </span></code></pre>\n        <p></p></li>\n</ol>\n\n<h3 id="h3-2">验证安装&nbsp;</h3>\n<ol>\n    <li>通过以下步骤来验证TensorFlow是否安装成功：</li>\n    <li>启动一个终端（比如CMD）</li>\n    <li>如果通过Anaconda安装，先启动Anaconda环境。</li>\n    <li>在终端运行python</li>\n    <li>\n        <pre class="groovy"><code class="language-bash"><span class="code-string">C:</span>&gt; python </code></pre>\n    </li>\n    <li>在python的交互环境中输入以下脚本代码：</li>\n    <li> <pre class="python"><code class="python"><span class="code-meta"><span\n            class="code-meta">&gt;&gt;&gt; </span></span><span class="code-keyword"><span\n            class="code-keyword">import</span></span> tensorflow <span class="code-keyword"><span class="code-keyword">as</span></span> tf\n\n\n\n\nhello = tf.constant(<span class="code-string"><span class="code-string">\'Hello, TensorFlow!\'</span></span>)\nsess = tf.Session()\nprint(sess.run(hello))\n </code></pre>\n        <p>如果python输出以下内容，则表明TensorFlow已经安装成功然后就可以写TensorFlow的程序了：</p></li>\n    <li>\n        <pre class=""><code class="language-bash">Hello, TensorFlow!</code></pre>\n        <p>如果收到了一些异常信息，请继续向下看。</p></li>\n</ol>\n\n<h3 id="h3-3">常见的安装问题</h3>\n<p>TensorFlow通过Stack Overflow网站来记录错误信息以及处理方法。下面的列表包含一些跳转的到&nbsp;Stack Overflow的连接。如果在安装过程中遇到的问题没有在下面中，请到Stack\n    Overflow去搜索相关的关键字。若还是搜索不到，请直接提出新问题并标记&nbsp;<code>tensorflow</code>&nbsp;的标签。</p>\n<table>\n    <tbody>\n    <tr>\n        <th>Stack Overflow Link</th>\n        <th>Error Message</th>\n    </tr>\n    <tr>\n        <td><a href="https://stackoverflow.com/q/41007279" rel="nofollow">41007279</a></td>\n        <td>\n            [...\\stream_executor\\dso_loader.cc] Couldn\'t open CUDA library nvcuda.dll\n        </td>\n    </tr>\n    <tr>\n        <td><a href="https://stackoverflow.com/q/41007279" rel="nofollow">41007279</a></td>\n        <td>\n            [...\\stream_executor\\cuda\\cuda_dnn.cc] Unable to load cuDNN DSO\n        </td>\n    </tr>\n    <tr>\n        <td><a href="http://stackoverflow.com/q/42006320" rel="nofollow">42006320</a></td>\n        <td>\n            ImportError: Traceback (most recent call last): File "...\\tensorflow\\core\\framework\\graph_pb2.py", line 6,\n            in from google.protobuf import descriptor as _descriptor ImportError: cannot import name \'descriptor\'\n        </td>\n    </tr>\n    <tr>\n        <td><a href="https://stackoverflow.com/q/42011070" rel="nofollow">42011070</a></td>\n        <td>\n            No module named "pywrap_tensorflow"\n        </td>\n    </tr>\n    </tbody>\n</table>'}};