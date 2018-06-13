exports.ids=[35],exports.modules={272:function(s,n,a){"use strict";Object.defineProperty(n,"__esModule",{value:!0});n.content='<p>使用apt安装好处在于统一升级方便，不用单独手工安装。默认情况下nginx已经支持apt-get安装，但是安装的包是比较老旧的10.x版本。我们可以通过添加nginx\n    deb安装源的方式来使用最新稳定版的nginx，还可以实时通过update和upgrade命令保持最新的未定版nginx。</p>\n\n<h2 id="h2-1">添加apt-key</h2>\n<pre class="css"><code class="language-bash"><span class="code-selector-tag">sudo</span> <span\n        class="code-selector-tag">apt-key</span> <span class="code-selector-tag">add</span> <span\n        class="code-selector-tag">nginx_signing</span><span class="code-selector-class">.key</span></code></pre>\n<p>由于需要使用nginx官方指定的deb源下载最新稳定版本的nginx，所以需要先添加一个信任公钥（PGP）。可以将下列公钥复制保存为一个名为nginx_signing.key的文件（也可到<a\n        href="http://nginx.org/keys/nginx_signing.key" rel="nofollow">官网</a>去下载）：</p>\n<pre class="groovy"><code class="groovy">-----BEGIN PGP PUBLIC KEY BLOCK-----\n<span class="code-string"><span class="code-string">Version:</span></span> GnuPG v2<span class="hljs-number"><span\n            class="hljs-number">.0</span></span><span class="hljs-number"><span class="hljs-number">.22</span></span> (GNU/Linux)\n\nmQENBE5OMmIBCAD+FPYKGriGGf7NqwKfWC83cBV01gabgVWQmZbMcFzeW+hMsgxH\nW6iimD0RsfZ9oEbfJCPG0CRSZ7ppq5pKamYs2+EJ8Q2ysOFHHwpGrA2C8zyNAs4I\nQxnZZIbETgcSwFtDun0XiqPwPZgyuXVm9PAbLZRbfBzm8wR/<span class="hljs-number"><span class="hljs-number">3</span></span>SWygqZBBLdQk5TE\nfDR+Eny<span class="hljs-regexp"><span class="hljs-regexp">/M1RVR4xClECONF9UBB2ejFdI1LD45APbP2hsN/</span></span>piFByU1t7yK2gpFyRt\n<span class="hljs-number"><span class="hljs-number">97</span></span>WzGHn9MV5/TL7AmRPM4pcr3JacmtCnxXeCZ8nLqedoSuHFuhwyDnlAbu8I16O5\nXRrfzhrHRJFM1JnIiGmzZi6zBvH0ItfyX6ttABEBAAG0KW5naW54IHNpZ25pbmcg\na2V5IDxzaWduaW5nLWtleUBuZ2lueC5jb20+iQE+BBMBAgAoAhsDBgsJCAcDAgYV\nCAIJCgsEFgIDAQIeAQIXgAUCV2K1+AUJGB4fQQAKCRCr9b2Ce9m<span class="hljs-regexp"><span\n            class="hljs-regexp">/YloaB/</span></span><span class="hljs-number"><span class="hljs-number">9</span></span>XGrol\nkocm7l<span class="hljs-regexp"><span class="hljs-regexp">/tsVjaBQCteXKuwsm4XhCuAQ6YAwA1L1UheGOG/</span></span>aa2xJvrXE8X32tgcTjr\nKoYoXWcdxaFjlXGTt6jV85qRguUzvMOxxSEM2Dn115etN9piPl0Zz+<span class="hljs-number"><span\n            class="hljs-number">4</span></span>rkx8+<span class="hljs-number"><span class="hljs-number">2</span></span>vJG\nF+eMlruPXg/zd88NvyLq5gGHEsFRBMVufYmHtNfcp4okC1klWiRIRSdp4QY1wdrN\n<span class="hljs-number"><span class="hljs-number">1</span></span>O+<span class="hljs-regexp"><span\n            class="hljs-regexp">/oCTl8Bzy6hcHjLIq3aoumcLxMjtBoclc/</span></span><span class="hljs-number"><span\n            class="hljs-number">5</span></span>OTioLDwSDfVx7rWyfRhcBzVbwD\noe<span class="hljs-regexp"><span class="hljs-regexp">/PD08AoAA6fxXvWjSxy+dGhEaXoTHjkCbz/</span></span>l6NxrK3JFyauDgU4K4MytsZ1HDi\nMgMW8hZXxszoICTTiQEcBBABAgAGBQJOTkelAAoJEKZP1bF62zmo79oH/<span class="hljs-number"><span\n            class="hljs-number">1</span></span>XDb29S\nYtWp+MTJTPFEwlWRiyRuDXy3wBd/BpwBRIWfWzMs1gnCjNjk0EVBVGa2grvy9Jtx\nJKMd6l<span class="hljs-regexp"><span class="hljs-regexp">/PWXVucSt+U/</span></span>+GO8rBkw14SdhqxaS2l14v6gyMeUrSbY3XfToGfwHC4sa/\nThn8X4jFaQ2XN5dAIzJGU1s5JA0tjEzUwCnmrKmyMlXZaoQVrmORGjCuH0I0aAFk\nRS0UtnB9HPpxhGVbs24xXZQnZDNbUQeulFxS4uP3OLDBAeCHl+v4t/uotIad8v6J\nSO93vc1evIje6lguE81HHmJn9noxPItvOvSMb2yPsE8mH4cJHRTFNSEhPW6ghmlf\nWa9ZwiVX5igxcvaIRgQQEQIABgUCTk5b0gAKCRDs8OkLLBcgg1G+AKCnacLb/+W6\ncflirUIExgZdUJqoogCeNPVwXiHEIVqithAM1pdY/gcaQZmIRgQQEQIABgUCTk5f\nYQAKCRCpN2E5pSTFPnNWAJ9gUozyiS+<span class="hljs-number"><span class="hljs-number">9</span></span>jf2rJvqmJSeWuCgVRwCcCUFhXRCpQO2Y\nVa3l3WuB+rgKjsQ=\n=EWWI\n-----END PGP PUBLIC KEY BLOCK-----</code></pre>\n<p>然后执行以下命令：</p>\n<pre class="css"><code class="language-bash"><span class="code-selector-tag">sudo</span> <span\n        class="code-selector-tag">apt-key</span> <span class="code-selector-tag">add</span> <span\n        class="code-selector-tag">nginx_signing</span><span class="code-selector-class">.key</span></code></pre>\n\n<h2 id="h2-2">设置apt的deb源</h2>\n<p>首先需要明确当前的ubuntu版本，在安装nginx时不同的ubuntu版本对应不同的nginx安装包。对照如下：</p>\n<table border="1" cellpadding="1" cellspacing="1" style="width:500px">\n    <tbody>\n    <tr>\n        <td>版本</td>\n        <td>安装包别名</td>\n        <td>适用平台</td>\n    </tr>\n    <tr>\n        <td>14.04</td>\n        <td>trusty</td>\n        <td>x86_64, i386, aarch64/arm64</td>\n    </tr>\n    <tr>\n        <td>16.04</td>\n        <td>xenial</td>\n        <td>x86_64, i386, ppc64el, aarch64/arm64</td>\n    </tr>\n    <tr>\n        <td>17.10</td>\n        <td>artful</td>\n        <td>x86_64, i386</td>\n    </tr>\n    </tbody>\n</table>\n<p>打开apt的安装源配置文件——/etc/apt/sources.list。在文件尾部添加：</p>\n<ul>\n    <li>deb http://nginx.org/packages/ubuntu/ <span style="color:#FF0000">code</span> nginx</li>\n    <li>deb-src http://nginx.org/packages/ubuntu/ <span style="color:#FF0000">code</span> nginx</li>\n</ul>\n<p>注意标红的code需要根据ubuntu的版本号按照上面的表替换对应的别名。</p>\n<p>设置好之后使用checklog命令可以看到现在已经切换到最新的稳定版本了。（不会输出日志，只有一个版本号）</p>\n\n<h2 id="h2-3">安装nginx</h2>\n<p>最后更新安装源列表，然后安装nginx。</p>\n<pre class="sql"><code class="language-bash">apt-get <span class="code-keyword">update</span>\napt-<span class="code-keyword">get</span> <span class="code-keyword">install</span> nginx</code></pre>\n\n<h2 id="h2-4">安装最新发布版本</h2>\n<p>除了稳定版本，也可以通过apt的方式安装最新发布版本（Mainline）。只需要修改安装源头的路径即可——将/etc/apt/sources.list中的deb源修改为：</p>\n<ul>\n    <li>deb http://nginx.org/packages/mainline/ubuntu/ <span style="color:#FF0000"><em>code</em></span> nginx</li>\n    <li>deb-src http://nginx.org/packages/mainline/ubuntu/ <span style="color:#FF0000"><em>code</em></span> nginx</li>\n</ul>\n<p>更多的安装方式详见<a href="http://nginx.org/en/docs/install.html" rel="nofollow">官网</a></p>'}};