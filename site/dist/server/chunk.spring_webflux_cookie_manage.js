exports.ids=[23],exports.modules={349:function(s,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.content='<h2 id="h2-1">WebFLux与WebMvc的差异</h2>\n<p><em>WebFlux</em>读写<em>Cookie</em>不像<em>WebMvc</em>那么直接，最主要的原因是<em>WebMvc</em>是基于<em>Servlet</em>规范的，而<em>WebFlux</em>仅仅遵守的是<em>HTTP</em>协议。所以在使用的时候会发现<code>HttpServletRequest</code>、<code>HttpServletResponse</code>这些<em>Servlet</em>层级的接口根本就无法使用。\n</p>\n<p><em>Cookie</em>与<em>Servlet</em>并没有太直接的关系，前者是属于<em>HTTP</em>规范的而后者是一个<em>J2EE</em>的规范，在应用层面仅有的联系就是<em>Servlet</em>会读写<em>Cookie</em>中的<em>JSESSIONID</em>来标记与前端浏览器和服务端的关系。而<code>HttpServletRequest</code>、<code>HttpServletResponse</code>仅是<em>Servlet</em>为请求和响应提供<em>header</em>、<em>body</em>管理的接口。\n</p>\n<h2 id="h2-2">WebFlux的Cookie管理</h2>\n<p><em>WebFlux</em>目前并没有为写<em>Cookie</em>提供任何工具。这就需要开发者按照<em>HTTP</em>的规范来写<em>Cookie</em>。\n    在HTTP协议交互的过程中，服务端可以通过在<em>response</em>中添加<strong>Set-Cookie</strong>头来让浏览器记录<em>Cookie</em>，而浏览器则在<em>request</em>中使用<strong>Cookie</strong>头来传递cookie。\n</p>\n<h2 id="h2-3">写Cookie</h2>\n<p>写<em>cookie</em>使用<code>ResponseEntity</code>向response头中添加<strong>Set-Cookie</strong>即可。<code>CookieBuilder</code>的代码比较长，它是用于构建一个<em>cookie</em>字符串，<strong>Set-Cookie</strong>头除了设置<em>key=value</em>，还可以设置过期日期<em>expires</em>，域名<em>domain</em>，路径<em>path</em>等。\n</p>\n<pre><code class="java"><span class="code-meta">@RestController</span>\n<span class="code-meta">@RequestMapping</span>(<span class="code-string">"/cookie"</span>)\n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n            class="code-title">CookieReadAWriteController</span> </span>{\n\t<span class="code-meta">@GetMapping</span>(<span class="code-string">"/write"</span>)\n\t<span class="hljs-function"><span class="code-keyword">public</span> ResponseEntity&lt;String&gt; <span\n            class="code-title">cookieWrite</span><span class="hljs-params">()</span> </span>{\n\t\tHttpHeaders headers = <span class="code-keyword">new</span> HttpHeaders();\n\t\tString cookie = <span class="code-keyword">new</span> CookieBuilder().setKey(<span class="code-string">"cookie-text"</span>)\n\t\t\t.setValue(cookieText)\n\t\t\t.setMaxAge(<span class="hljs-number">840000</span>)\n\t\t\t.setPath(<span class="code-string">"/"</span>)\n\t\t\t.build();\n\t\theaders.add(<span class="code-string">"Set-Cookie"</span>, cookie);\n\t\t<span class="code-keyword">return</span> <span\n            class="code-keyword">new</span> ResponseEntity&lt;String&gt;(<span class="code-string">"hi,"</span> + userName, headers, HttpStatus.OK);\n\t}\n}\n\n\n<span class="hljs-class"><span class="code-keyword">class</span> <span class="code-title">CookieBuilder</span> </span>{\n\t<span class="code-keyword">private</span> String key;\n\t<span class="code-keyword">private</span> String value;\n\t<span class="code-keyword">private</span> String expires;\n\t<span class="code-keyword">private</span> String domain;\n\t<span class="code-keyword">private</span> String path;\n\n\t<span class="hljs-function"><span class="code-keyword">public</span> CookieBuilder <span\n            class="code-title">setKey</span><span class="hljs-params">(String key)</span> </span>{\n\t\t<span class="code-keyword">this</span>.key = key;\n\t\t<span class="code-keyword">return</span> <span class="code-keyword">this</span>;\n\t}\n\n\t<span class="hljs-function"><span class="code-keyword">public</span> CookieBuilder <span\n            class="code-title">setValue</span><span class="hljs-params">(String value)</span> </span>{\n\t\t<span class="code-keyword">this</span>.value = value;\n\t\t<span class="code-keyword">return</span> <span class="code-keyword">this</span>;\n\t}\n\n\t<span class="hljs-function"><span class="code-keyword">public</span> CookieBuilder <span class="code-title">setMaxAge</span><span\n            class="hljs-params">(<span class="code-keyword">long</span> ms)</span> </span>{\n\t\t<span class="code-comment">//cookie的过期日期为GMT格式的时间。</span>\n\t\tDate date = <span class="code-keyword">new</span> Date(<span class="code-keyword">new</span> Date().getTime() + ms);\n\t\tSimpleDateFormat sdf = <span class="code-keyword">new</span> SimpleDateFormat(<span class="code-string">"EEE d MMM yyyy HH:mm:ss \'GMT\'"</span>, Locale.US);\n\t\tsdf.setTimeZone(TimeZone.getTimeZone(<span class="code-string">"GMT"</span>));\n\t\t<span class="code-keyword">this</span>.expires = sdf.format(date);\n\t\t<span class="code-keyword">return</span> <span class="code-keyword">this</span>;\n\t}\n\n\t<span class="hljs-function"><span class="code-keyword">public</span> CookieBuilder <span class="code-title">setDomain</span><span\n            class="hljs-params">(String domain)</span> </span>{\n\t\t<span class="code-keyword">this</span>.domain = domain;\n\t\t<span class="code-keyword">return</span> <span class="code-keyword">this</span>;\n\t}\n\n\t<span class="hljs-function"><span class="code-keyword">public</span> CookieBuilder <span\n            class="code-title">setPath</span><span class="hljs-params">(String path)</span> </span>{\n\t\t<span class="code-keyword">this</span>.path = path;\n\t\t<span class="code-keyword">return</span> <span class="code-keyword">this</span>;\n\t}\n\n\t<span class="hljs-function"><span class="code-keyword">public</span> String <span\n            class="code-title">build</span><span class="hljs-params">()</span> </span>{\n\t\tStringBuilder sb = <span class="code-keyword">new</span> StringBuilder();\n\t\tsb.append(<span class="code-keyword">this</span>.key);\n\t\tsb.append(<span class="code-string">"="</span>);\n\t\tsb.append(<span class="code-keyword">this</span>.value);\n\t\tsb.append(<span class="code-string">";"</span>);\n\t\t<span class="code-keyword">if</span> (<span class="code-keyword">null</span> != <span\n            class="code-keyword">this</span>.expires) {\n\t\t\tsb.append(<span class="code-string">"expires="</span>);\n\t\t\tsb.append(<span class="code-keyword">this</span>.expires);\n\t\t\tsb.append(<span class="code-string">";"</span>);\n\t\t}\n\t\t<span class="code-keyword">if</span> (<span class="code-keyword">null</span> != <span\n            class="code-keyword">this</span>.domain) {\n\t\t\tsb.append(<span class="code-string">"domain="</span>);\n\t\t\tsb.append(<span class="code-keyword">this</span>.domain);\n\t\t\tsb.append(<span class="code-string">";"</span>);\n\t\t}\n\t\t<span class="code-keyword">if</span> (<span class="code-keyword">null</span> != <span\n            class="code-keyword">this</span>.path) {\n\t\t\tsb.append(<span class="code-string">"path="</span>);\n\t\t\tsb.append(<span class="code-keyword">this</span>.path);\n\t\t\tsb.append(<span class="code-string">";"</span>);\n\t\t}\n\t\t<span class="code-keyword">return</span> sb.toString();\n\t}\n}\n</code></pre>\n<h2 id="h2-4">读cookie</h2>\n<p>获取<em>cookie</em>就比较直观，可以直接使用<code>@CookieValue</code>这个<em>Annotation</em>来获取：</p>\n<pre><code class="java"><span class="code-meta">@RestController</span>\n<span class="code-meta">@RequestMapping</span>(<span class="code-string">"/cookie"</span>)\n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n            class="code-title">CookieReadAWriteController</span> </span>{\n\t<span class="code-meta">@GetMapping</span>(<span class="code-string">"/read/annotation"</span>)\n\t<span class="code-comment">/**\n\t * <span class="hljs-doctag">@param</span> value\n\t * <span class="hljs-doctag">@return</span>\n\t */</span>\n\t<span class="hljs-function"><span class="code-keyword">public</span> String <span class="code-title">cookieReadAnnotation</span><span\n            class="hljs-params">(@CookieValue(<span\n            class="code-string">"cookie-text"</span>)</span> String value) </span>{\n\t\t<span class="code-keyword">return</span> <span class="code-string">"当前Cookie中的内容"</span> + value;\n\t}\n}\n</code></pre>\n<p>也可以直接从<em>Request的Header</em>中获取：</p>\n<pre><code class="java"><span class="code-meta">@RestController</span>\n<span class="code-meta">@RequestMapping</span>(<span class="code-string">"/cookie"</span>)\n<span class="code-keyword">public</span> <span class="hljs-class"><span class="code-keyword">class</span> <span\n            class="code-title">CookieReadAWriteController</span> </span>{\n\t<span class="code-meta">@GetMapping</span>(<span class="code-string">"/read/annotation"</span>)\n\t<span class="code-comment">/**\n\t * <span class="hljs-doctag">@param</span> value\n\t * <span class="hljs-doctag">@return</span>\n\t */</span>\n\t<span class="code-meta">@GetMapping</span>(<span class="code-string">"/read/entity"</span>)\n\t<span class="hljs-function"><span class="code-keyword">public</span> String <span class="code-title">cookieReadEntity</span><span\n            class="hljs-params">(RequestEntity&lt;String&gt; entity)</span> </span>{\n\t\tHttpHeaders headers = entity.getHeaders();\n\t\tList&lt;String&gt; cookie = headers.get(<span class="code-string">"Cookie"</span>);\n\t\t<span class="code-keyword">return</span> <span class="code-string">"当前Cookie中的内容"</span> + cookie;\n\t}\n}\n</code></pre>\n<p>\n    使用<em>Annotatin</em>是直接标记<em>Cookie</em>的<em>key</em>来获取<em>value</em>。而使用<em>RequestEntity</em>需要从头中先获取<em>Cookie</em>的内容，然后再解析<em>key</em>和<em>value</em>，存在一个<em>key</em>对应多个<em>value</em>的情况需要使用<em>RequestEntity</em>。\n</p>                                    '}};