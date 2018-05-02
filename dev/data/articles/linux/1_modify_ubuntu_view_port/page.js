export const content = '\n' +
    '<p>通常情况下，图形界面的发行版 <em><strong>linux</strong></em> 可以在 <strong><em>Setting-&gt;Device-&gt;Display</em></strong> 中直接设置多个屏幕的分辨率。但是坑总是无处不在的，有时候明明用得好好的分辨率就出毛病了，而且不能在界面上设置。此时可以通过 <em><strong>xrandr</strong></em> 命令来直接设置分辨率。</p>\n' +
    '\n' +
    '<h2 id="h2-1">常规方法</h2>\n' +
    '<p>1.查看显示模式参数：</p>\n' +
    '<pre class="bash"><code class="language-bash"><span class="code-comment"><span class="code-comment">#1440 900就是要修改的分辨率，根据需要可以使用1920 1080、1720 900等</span></span>\n' +
    '<span class="code-variable"><span class="code-variable">$cvt</span></span> 1440 900\n' +
    '<span class="code-comment"><span class="code-comment">#输出内容</span></span>\n' +
    '1440x900 59.89 Hz (CVT 1.30MA) hsync: 55.93 kHz; pclk: 106.50 MHz\n' +
    'Modeline <span class="code-string"><span class="code-string">"1440x900_60.00"</span></span>  106.50  1440 1528 1672 1904  900 903 909 934 -hsync +vsync</code></pre>\n' +
    '<p>Modeline之后的内容就是我们后面添加显示模式要使用的参数。</p>\n' +
    '<p>2.通过addMode命令增加一个现实模式：</p>\n' +
    '<pre class="bash"><code class="language-bash"><span class="code-comment"><span class="code-comment">#将Modeline的阿才能书复制到 --newmode之后即可</span></span>\n' +
    '<span class="code-comment"><span class="code-comment">#后面的参数可以根据需要调整，请查阅cvt相关的说明</span></span>\n' +
    '<span class="code-variable"><span class="code-variable">$xrandr</span></span> --newmode <span class="code-string"><span class="code-string">"1440x900_60.00"</span></span>  106.50  1440 1528 1672 1904  900 903 909 934 -hsync +vsync</code></pre>\n' +
    '<p>3.增加到对应的显示器。</p>\n' +
    '<p>先用xrandr命令查询对应的显示器：</p>\n' +
    '<pre class="scss"><code class="language-bash"><span class="code-variable"><span class="code-variable">$xrandr</span></span>\n' +
    '<span class="code-comment">#输出类似以下的内容</span>\n' +
    'WAYLAND0 connected primary 1366x768+0+0 (<span class="code-attribute">normal</span> <span class="code-attribute">left</span> inverted <span class="code-attribute">right</span> x axis y axis) 309mm x 173mm\n' +
    '   1366x768      60<span class="code-selector-class">.00</span>*+\n' +
    '   1360x768      59<span class="code-selector-class">.80</span>    59<span class="code-selector-class">.96</span>\n' +
    '   1024x768      60<span class="code-selector-class">.04</span>    60<span class="code-selector-class">.00</span>\n' +
    '   960x720       60<span class="code-selector-class">.00</span>\n' +
    '   928x696       60<span class="code-selector-class">.05</span>\n' +
    'WAYLAND1 connected 1024x768+1366+0 (<span class="code-attribute">normal</span> <span class="code-attribute">left</span> inverted <span class="code-attribute">right</span> x axis y axis) 0mm x 0mm\n' +
    '   1024x768      60<span class="code-selector-class">.00</span>*\n' +
    '   800x600       60<span class="code-selector-class">.32</span>    56<span class="code-selector-class">.25</span>\n' +
    '   848x480       60<span class="code-selector-class">.00</span>\n' +
    '   640x480       59<span class="code-selector-class">.94</span>\n' +
    '</code></pre>\n' +
    '<p>记住WAYLAND0\\WAYLAND1的名称，这是我们显示器的代理名称。通常用手提的话WAYLAND0就是对应的手提电脑的显示器、其余的都是扩增屏幕。</p>\n' +
    '<p>然后向对应显示器下增加一个模式：</p>\n' +
    '<pre class="bash"><code class="language-bash"><span class="code-variable"><span class="code-variable">$xrandr</span></span> --addmode WAYLAND1 <span class="code-string"><span class="code-string">"1440x900_60.00"</span></span></code></pre>\n' +
    '<p>然后就OK了..........</p>\n' +
    '\n' +
    '<h2 id="h2-2">遇到的问题</h2>\n' +
    '<p>但是，要是天底下的事情都这么轻松世界就完美了。</p>\n' +
    '\n' +
    '<h3 id="h3-1">问题一，xrand命令指针对当前用户</h3>\n' +
    '<p>在使用 xrand命令时切记是针对当前用户的。例如我就是创建了一个管理员用户，然后把root账户禁用了。在执行命令时习惯性的加 <strong><em>sudo</em></strong>，最后会输出类似于 <em>"MIT-MAGIC-COOKIE-1 keyCan\'t open display :0.0" </em>这样的内容。</p>\n' +
    '\n' +
    '<h3 id="h3-2"><strong><em>问题二，最后一步输出 xrandr: Configure crtc 0 failed</em></strong></h3>\n' +
    '<p>在最后一行&nbsp;<strong><em>$xrandr --addmode WAYLAND1 "1440x900_60.00" </em></strong>命令之后并没有修改成功，而是输出了<strong><em>xrandr: Configure crtc 0 failed&nbsp;</em></strong>或&nbsp;<strong><em>xrandr: Configure crtc 1 failed</em></strong>这样的内容。查阅了一圈资料。在askubuntu找到说明。据说是升级到Ubuntu17.10之后，使用AMD/ATI的显卡容易遇到这个坑，wayland识别不了显示器。这个时候打开Setting的Displays面板显示的是 Unknown Display，最高分辨率只能到1024*768，最不费劲的方法是可以通过安装新的驱动源来解决（但是我安装了一次还是不行）。</p>\n' +
    '<p>实际上，只要显卡和显示器都支持某个分辨率，直接告诉显卡按照这个分辨率输出图像就好了，不用wayland去识别显示器。</p>\n' +
    '<p>首先关闭wayland服务，wayland是17.10之后新用的显示器服务（据说是可以在登陆界面选择和X.org切换，但是我的居然没有）。关闭方法：</p>\n' +
    '<p>1.打开配置文件：</p>\n' +
    '<pre class="nginx"><code class="language-bash"><span class="code-comment"><span class="code-comment">#打开custom.conf文件，不同发行版文件位置可能有差异</span></span>\n' +
    '<span class="code-attribute">vim</span> /etc/gdm3/custom.conf</code></pre>\n' +
    '<p>2.修改文件，找到 <strong><em>#WaylandEnable=false</em></strong> 这一行，然后去掉注释。</p>\n' +
    '<pre class="ini"><code class="language-bash"><span class="code-comment"><span class="code-comment"># Uncoment the line below to force the login screen to use Xorg</span></span>\n' +
    '<span class="hljs-attr">WaylandEnable</span>=<span class="hljs-literal"><span class="hljs-literal">false</span></span>\n' +
    '<span class="code-comment"><span class="code-comment">#......</span></span></code></pre>\n' +
    '<p>3.最后reboot重启电脑。</p>\n' +
    '<p>4.启动完成后输入 xrandr 命令发现之前的&nbsp;WAYLAND0 和&nbsp;WAYLAND1 变成了输出端口的名称：</p>\n' +
    '<pre class="swift"><code class="language-bash"><span class="code-variable">$xrandr</span>\n' +
    '<span class="code-comment">#输出</span>\n' +
    '<span class="code-type">Screen</span> <span class="hljs-number">0</span>: minimum <span class="hljs-number">320</span> x <span class="hljs-number">200</span>, current <span class="hljs-number">2806</span> x <span class="hljs-number">900</span>, maximum <span class="hljs-number">8192</span> x <span class="hljs-number">8192</span>\n' +
    'eDP-<span class="hljs-number">1</span> connected primary 1366x768+<span class="hljs-number">0</span>+<span class="hljs-number">0</span> (normal <span class="code-keyword">left</span> inverted <span class="code-keyword">right</span> x axis y axis) 309mm x 173mm\n' +
    '   1366x768      <span class="hljs-number">60.00</span>*+\n' +
    '   1360x768      <span class="hljs-number">59.80</span>    <span class="hljs-number">59.96</span>\n' +
    '   1024x768      <span class="hljs-number">60.04</span>    <span class="hljs-number">60.00</span>\n' +
    '   960x720       <span class="hljs-number">60.00</span>\n' +
    '   928x696       <span class="hljs-number">60.05</span>\n' +
    '<span class="code-type">HDMI</span>-<span class="hljs-number">1</span> disconnected (normal <span class="code-keyword">left</span> inverted <span class="code-keyword">right</span> x axis y axis)\n' +
    '<span class="code-type">DP</span>-<span class="hljs-number">1</span> connected 1440x900+<span class="hljs-number">1366</span>+<span class="hljs-number">0</span> (normal <span class="code-keyword">left</span> inverted <span class="code-keyword">right</span> x axis y axis) 0mm x 0mm\n' +
    '   1024x768      <span class="hljs-number">60.00</span>\n' +
    '   800x600       <span class="hljs-number">60.32</span>    <span class="hljs-number">56.25</span>\n' +
    '   848x480       <span class="hljs-number">60.00</span>\n' +
    '   640x480       <span class="hljs-number">59.94</span>\n' +
    '<span class="code-type">HDMI</span>-<span class="hljs-number">2</span> disconnected (normal <span class="code-keyword">left</span> inverted <span class="code-keyword">right</span> x axis y axis)</code></pre>\n' +
    '<p>这里的DP-1就是我用的外接显示器，但是现在只能显示到1024*768。然后按照前面介绍的方法依次执行<em><strong>$cvt 1440 900</strong></em>、<strong><em>$xrandr newmode</em></strong>、<em><strong>$xrandr addmode DP-1 "1440x900_60.00"</strong></em>，仅仅是最后addmode的参数有些许差异。</p>\n' +
    '<p>修改后，在Displays里可以看到最新的分辨率。</p>\n' +
    '\n' +
    '<h2 id="h2-3">永久性问题</h2>\n' +
    '<p>最后，用这个方法有个最大的问题是没法保存。每次重启过后还是没法识别显示器的分辨率，又回到修改之前的状态。</p>\n' +
    '<p>有些地方说可以像下面这样添加或修改&nbsp;/etc/X11/xorg.conf&nbsp; 文件：</p>\n' +
    '<pre class="nginx"><code class="nginx"><span class="code-attribute"><span class="code-attribute">Section</span></span> <span class="code-string"><span class="code-string">"Monitor"</span></span>\n' +
    'Identifier <span class="code-string"><span class="code-string">"Configured Monitor"</span></span>\n' +
    'Modeline <span class="code-string"><span class="code-string">"1920x1080_60.00"</span></span>  <span class="hljs-number"><span class="hljs-number">173</span></span>.<span class="hljs-number"><span class="hljs-number">00</span></span>  <span class="hljs-number"><span class="hljs-number">1920</span></span> <span class="hljs-number"><span class="hljs-number">2048</span></span> <span class="hljs-number"><span class="hljs-number">2248</span></span> <span class="hljs-number"><span class="hljs-number">2576</span></span>  <span class="hljs-number"><span class="hljs-number">1080</span></span> <span class="hljs-number"><span class="hljs-number">1083</span></span> <span class="hljs-number"><span class="hljs-number">1088</span></span> <span class="hljs-number"><span class="hljs-number">1120</span></span> -hsync +vsync\n' +
    'Option <span class="code-string"><span class="code-string">"PreferredMode"</span></span> <span class="code-string"><span class="code-string">"1920x1080_60.00"</span></span>\n' +
    'EndSection\n' +
    'Section <span class="code-string"><span class="code-string">"Screen"</span></span>\n' +
    'Identifier <span class="code-string"><span class="code-string">"Default Screen"</span></span>\n' +
    'Monitor <span class="code-string"><span class="code-string">"Configured Monitor"</span></span>\n' +
    'Device <span class="code-string"><span class="code-string">"Configured Video Device"</span></span>\n' +
    'EndSection\n' +
    'Section <span class="code-string"><span class="code-string">"Device"</span></span>\n' +
    'Identifier <span class="code-string"><span class="code-string">"Configured Video Device"</span></span>\n' +
    'EndSection</code></pre>\n' +
    '<p>但是我修改之后没有任何效果。而且还多出一份&nbsp;/etc/X11/xorg.conf.failsafe 文件。不知道是不是17.0.4特有的原因，毕竟我也是将系统升级为17.0.4之后分辨率才出问题的。</p>\n' +
    '<p>既然 xorg.conf 配置无法生效，我直接将命令创建为一个shell，然后开机运行即可：</p>\n' +
    '<pre class="css"><code class="language-bash"><span class="code-comment"><span class="code-selector-id">#view-port-init</span><span class="code-selector-class">.sh</span></span>\n' +
    '<span class="code-selector-tag">xrandr</span> <span class="code-selector-tag">--newmode</span> <span class="code-string">"1920<span class="code-selector-tag">x1080_60</span><span class="code-selector-class">.00</span>"</span>  173<span class="code-selector-class">.00</span>  1920 2048 2248 2576  1080 1083 1088 1120 <span class="code-selector-tag">-hsync</span> +<span class="code-selector-tag">vsync</span>\n' +
    '<span class="code-selector-tag">xrandr</span> <span class="code-selector-tag">--addmode</span> <span class="code-selector-tag">DP-1</span> <span class="code-string">"1920<span class="code-selector-tag">x1080_60</span><span class="code-selector-class">.00</span>"</span>\n' +
    '<span class="code-comment"><span class="code-selector-id">#DP-1</span>这里请根据自己的参数修改。</span>\n' +
    '</code></pre>\n' +
    '<p>参考：<a href="https://askubuntu.com/questions/136139/xrandr-configure-crtc-0-failed-when-trying-to-change-resolution-on-external-m?answertab=active#tab-top" rel="nofollow">xrandr-configure-crtc-0-failed-when-trying-to-change-resolution</a>。</p>\n';