exports.ids=[11],exports.modules={365:function(a,s,t){"use strict";Object.defineProperty(s,"__esModule",{value:!0});s.content='<h2 id="h2-1">概念与应用</h2>\n<p><strong>Softmax</strong>是机器学习中一个非常重要的工具，他可以兼容 logistics 算法、可以独立作为机器学习的模型进行建模训练、还可以作为深度学习的激励函数。<br>\n    <strong>softmax</strong>的作用简单的说就计算一组数值中每个值的占比，公式一般性描述为：<br> 设一共有<img alt="机器学习——softmax计算"\n                                                                         src="https://math.jianshu.com/math?formula=n">个用数值表示的分类<img\n            alt="机器学习——softmax计算" src="https://math.jianshu.com/math?formula=S_k%EF%BC%8Ck%5Cin(0%2Cn%5D">，其中<img\n            alt="机器学习——softmax计算" src="https://math.jianshu.com/math?formula=n">表示分类的个数。那么softmax计算公式为：<br> <img\n            alt="机器学习——softmax计算"\n            src="https://math.jianshu.com/math?formula=P(S_i)%3D%5Cfrac%7Be%5E%7Bg_i%7D%7D%7B%5Csum_k%5Ene%5E%7Bg_k%7D%7D%2Ci%E8%A1%A8%E7%A4%BAk%E4%B8%AD%E7%9A%84%E6%9F%90%E4%B8%AA%E5%88%86%E7%B1%BB%EF%BC%8Cg_i%E8%A1%A8%E7%A4%BA%E8%AF%A5%E5%88%86%E7%B1%BB%E7%9A%84%E5%80%BC"\n            class="zoom-in-cursor">。</p>\n<p>在机器学习中经常用它来解决MECE原则的分类——每一个分类相互独立，所有的分类被完全穷尽。比如男人和女人就是负责MECE原则的。</p>\n\n<h2 id="h2-2">softmax的例子</h2>\n<p>看一个例子能更好的理解<strong>softmax</strong>。<br> 设有三个数值<img alt="机器学习——softmax计算"\n                                                       src="https://math.jianshu.com/math?formula=A%3D5%2CB%3D1%2CC%3D-1">，那么他们的softmax占比为：<br>\n    <img alt="机器学习——softmax计算"\n         src="https://math.jianshu.com/math?formula=P(A)%3D%5Cfrac%7Be%5E5%7D%7Be%5E5%2Be%2Be%5E%7B-1%7D%7D"><br> <img\n            alt="机器学习——softmax计算"\n            src="https://math.jianshu.com/math?formula=P(B)%3D%5Cfrac%7Be%7D%7Be%5E5%2Be%2Be%5E%7B-1%7D%7D"><br> <img\n            alt="机器学习——softmax计算"\n            src="https://math.jianshu.com/math?formula=P(C)%3D%5Cfrac%7Be%5E%7B-1%7D%7D%7Be%5E5%2Be%2Be%5E%7B-1%7D%7D"><br>\n    计算结果为：<br> <img alt="机器学习——softmax计算"\n                    src="https://math.jianshu.com/math?formula=P(A)%3D0.9817%2CP(B)%3D0.0180%2CP(C)%3D0.0003"\n                    class="zoom-in-cursor"><br> <img alt="机器学习——softmax计算"\n                                                     src="https://math.jianshu.com/math?formula=P(A)%2BP(B)%2BP(C)%3D1"\n                                                     class="zoom-in-cursor"></p>\n\n<h2 id="h2-3">基本特性</h2>\n<p>从上面的计算结果可以看出<em>softmax</em>的一些特性：</p>\n<ol>\n    <li>归一化：最后的合计为1，每一个分类都是一个小于1的数值。</li>\n    <li>放大效果：上面的例子中单纯从数值来看，5和1的差距并不大，但是通过指数运算有明显的放大效果，5的占比能到98%以上。</li>\n    <li>散列性质，每一个比率虽然最后都会进行归一，但是他们放大之前的数值是可以相互不干扰的。</li>\n</ol>\n\n<h2 id="h2-4">softmax的损失函数</h2>\n<p>softmax的损失函数可以用交叉熵来表述，也可以用极大似然评估来描述，后续的数学推导结论会发现2个算法的结果都是一样的。</p>\n\n<h3 id="h3-1">熵与交叉熵</h3>\n\n<h4 id="h4-1">熵</h4>\n<p>这里所说的熵来源于信息论，他表示“为了确保完整的信息被描述所需要的编码长度”。看起来是一个很拗口的概念，下面看一个例子。</p>\n<p>假设26个英文字母每个字母出现概率都是相同的<img alt="机器学习——softmax计算" src="https://math.jianshu.com/math?formula=p">（即<img\n        alt="机器学习——softmax计算"\n        src="https://math.jianshu.com/math?formula=%5Cfrac%7B1%7D%7B26%7D">）,那么记录26个英文字母所需要的信息量是<img\n        alt="机器学习——softmax计算" src="https://math.jianshu.com/math?formula=log_x%5Cfrac%7B1%7D%7Bp%7D">，这个公式就是表述26个字符的熵。如果取<img\n        alt="机器学习——softmax计算" src="https://math.jianshu.com/math?formula=x%3D2">表示用一个信息位表示2个信息（也就是我们用来衡量数据大小最小计算单位bit：0/1），那么计算出<img\n        alt="机器学习——softmax计算" src="https://math.jianshu.com/math?formula=log_226%3D4.7004%5Capprox5">说明表述所有的英文字符需要5bit的信息量。\n</p>\n\n<h4 id="h4-2">交叉熵</h4>\n<p>在实际使用中大部分事物都不是均匀分布的，比如一篇英文文章中\'e\'出现出现的频率明显多于其他字符，而且有时也无法知道真实分布的情况。这时计算信息量就可以使用交叉熵，它是在非均匀分布下信息量的一种表述表示：<br> <img\n        alt="机器学习——softmax计算"\n        src="https://math.jianshu.com/math?formula=H(p%2Cg)%3D%5Csum_i%5ENp_i%5Clog_x%5Cfrac%7B1%7D%7Bq_i%7D">。这里<img\n        alt="机器学习——softmax计算" src="https://math.jianshu.com/math?formula=p_j">表示每一个事物的真实概率，<img alt="机器学习——softmax计算"\n                                                                                                src="https://math.jianshu.com/math?formula=q_j">表示对应的预估概率。<br>\n    关于交叉熵的详细说明可以看<a href="https://www.chkui.com/article/tensorflow/tensorflow_get_started_of_mnist" target="_blank"\n                    rel="nofollow">本人这篇MNIST介绍的文章关于熵与交叉熵的解释说明</a>。</p>\n\n<h3 id="h3-2">极大似然评估</h3>\n<p>softmax算法可以看做是一个概率问题，设<img alt="机器学习——softmax计算"\n                              src="https://math.jianshu.com/math?formula=A_i">表示不同的分类，每个分类的概率表示为<img\n        alt="机器学习——softmax计算" src="https://math.jianshu.com/math?formula=P(A_i%7Cw_%7Bij%7Dx_j)">，其中<img\n        alt="机器学习——softmax计算" src="https://math.jianshu.com/math?formula=i%20%5Cin%20(0%2CN%5D">表示分类的个数。<img\n        alt="机器学习——softmax计算" src="https://math.jianshu.com/math?formula=j%5Cin(0.M%5D">&nbsp;<img alt="机器学习——softmax计算"\n                                                                                                   src="https://math.jianshu.com/math?formula=x_j">表示特征数。设<img\n        alt="机器学习——softmax计算" src="https://math.jianshu.com/math?formula=q_i%3DP(A_i%7Cw_%7Bij%7Dx_j))">，那么在softmax中<img\n        alt="机器学习——softmax计算" src="https://math.jianshu.com/math?formula=%5Csum_i%5EN%20q_i%20%3D%201">。用<img\n        alt="机器学习——softmax计算" src="https://math.jianshu.com/math?formula=p_i">表示分类的真实分布，由于事物分类遵守MECE原则，所以所有的<img\n        alt="机器学习——softmax计算" src="https://math.jianshu.com/math?formula=p_i">组合在一起实际上是个由1和0组成的数组，只有一个元素为1值。可以参照logistics回归算法：<img\n        alt="机器学习——softmax计算" src="https://math.jianshu.com/math?formula=P%3Dq%5Ep(1-q)%5E%7B(1-p)%7D">，softmax也可以使用类似的结构：<img\n        alt="机器学习——softmax计算" src="https://math.jianshu.com/math?formula=P%3D%5Cprod_i%5EN%20q_i%5E%7Bp_i%7D">&nbsp;。用对数最大似然评估作为损失函数：<br>\n    <img alt="机器学习——softmax计算"\n         src="https://math.jianshu.com/math?formula=L%3D%5Clog%5Cprod_i%5ENq_i%5E%7Bp_i%7D%3D%5Csum_i%5ENp_i%5Clog%7Bq_i%7D"\n         class="zoom-in-cursor">，<br> 可以看出极大似然评估和交叉熵最后得到的是一模一样的表达式。<br> 将公式扩展为<img alt="机器学习——softmax计算"\n                                                                                   src="https://math.jianshu.com/math?formula=M">个样本的情况：<br>\n    <img alt="机器学习——softmax计算"\n         src="https://math.jianshu.com/math?formula=L%3D%5Cfrac%7B1%7D%7BM%7D%5Clog%5Cprod_k%5EM%5Cprod_i%5ENq_%7Bij%7D%5E%7Bp_%7Bij%7D%7D%3D%5Cfrac%7B1%7D%7BM%7D%5Csum_k%5EM%5Csum_i%5EN%20p_%7Bkj%7D%5Clog%20q_%7Bkj%7D%2C%20k%5Cin(0%2CM%5D"\n         class="zoom-in-cursor"></p>\n\n<h2 id="h2-5">损失函数的含义</h2>\n<p>前面已经提到softmax分类应该遵守MECE原则，所以一个样本属于某个分类会用<strong>“占位”</strong>的方法来标注。例如现在有三个分类，样本A属于第二个分类表示为[0,1,0]、样本B属于第三个分类表示为[0,0,1]、C属于第一个分类——[1,0,0]。每个数组可以看做是的样本分类的真实概率分布——属于某个分类该分类对应的概率就是1，其他分类概率是0。<br>\n    特征和权重参数通过<em>softmax</em>计算之后得到的是一个概率分布。假设样本A的特征通过softmax计算后分类的概率是[0.2,0.6,0.2]，这个时候对于损失函数的计算结果是：<img\n            alt="机器学习——softmax计算"\n            src="https://math.jianshu.com/math?formula=0%C3%97%5Cln%200.2%2B1%C3%97%5Cln%200.6%20%2B%200%20%C3%97%20%5Cln%200.2%20%3D%20%5Cln%200.6%20%5Capprox%20-0.51"\n            class="zoom-in-cursor">。<br> 我们放大真实分布的比重为[0.1,0.8,0.1]后，计算结果：<img alt="机器学习——softmax计算"\n                                                                              src="https://math.jianshu.com/math?formula=%5Cln%200.8%20%5Capprox%20-0.22">，放大到[0.05,0.9,0.05]得：<img\n            alt="机器学习——softmax计算" src="https://math.jianshu.com/math?formula=%5Capprox%20-0.10">。所以一个很直观的感受是：损失函数是从负数无限接近0。\n</p>\n<p>下面通过大量的数据来模拟这个过程。假设所有的样本属于2个分类，样本分类的标注固定为[1,0]，随机生成100个样本模拟分类的概率为：<br> <img alt="机器学习——softmax计算"\n                                                                               src="https://math.jianshu.com/math?formula=%5Cbegin%7Bmatrix%7D%20p_1%26p_2%5C%5C%200.2%260.8%20%5C%5C%200.7%260.3%20%5C%5C%200.9%260.1%20%5C%5C%20%E2%80%A6%26%E2%80%A6%20%5Cend%7Bmatrix%7D"><br>\n    那么这100组数据和损失函数计算结果构成的关系如下图：</p>\n<p><img alt="机器学习——softmax计算"\n        src="https://upload-images.jianshu.io/upload_images/2418406-e1dfac238be8f1a8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"\n        class="zoom-in-cursor"></p>\n<p>交叉熵与分类的概率的关系</p>\n<p><br> 由于所有样本的标注都是[1,0]，所以<img alt="机器学习——softmax计算" src="https://math.jianshu.com/math?formula=q_1">的概率越接近1、<img\n        alt="机器学习——softmax计算" src="https://math.jianshu.com/math?formula=q_2">越接近0越符合真实分布。可以看到当<img\n        alt="机器学习——softmax计算" src="https://math.jianshu.com/math?formula=q_1">接近1<img alt="机器学习——softmax计算"\n                                                                                      src="https://math.jianshu.com/math?formula=q_2">接近0时，交叉熵的计算结果从负数方向接近0。可以执行<a\n        href="https://github.com/chkui/ml-math-softmax/blob/master/sample/matplot/corss_entropy_feature.py"\n        target="_blank" rel="nofollow">模拟过程的源码</a>用matplotlib看到更清晰的结果。</p>\n<p></p>\n<p>再使用一个过程来确认这个结果。<strong>softmax</strong>是体现一组数值的占比，被标记的那个分类占比越高越接近真实分布。现在假设有5000组样本，每个样本对应20个分类，每个分类的特征值在0～10之间随机产生，每个样本的标记在0~20之间随机设定。现在看看标记项的概率值与损失函数的关系：\n</p>\n<p><img alt="机器学习——softmax计算"\n        src="https://upload-images.jianshu.io/upload_images/2418406-832b3f8fdcfba154.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"\n        class="zoom-in-cursor"></p>\n<p>标注项占比与交叉熵关系趋势</p>\n<p><br> 图中<em>softmax highest</em>表示标注项的概率（占比），<em>corss entropy</em>就是损失函数的计算结果。可以看到当标记项概率越接近1，损失的计算结果越接近0。如果有兴趣可以<a\n        href="https://github.com/chkui/ml-math-softmax/blob/master/sample/matplot/corss_entropy_ratio.py"\n        target="_blank" rel="nofollow">使用生成图像的代码</a>了解分析过程。</p>\n<p></p>\n\n<h2 id="h2-6">建模</h2>\n\n<h3 id="h3-3">softmax计算</h3>\n<p>上面的内容介绍了softmax的公式以及损失函数。下面说明其如何运算。<br> 在实际应用中一个样本的特征是一个的向量：<img alt="机器学习——softmax计算"\n                                                                    src="https://math.jianshu.com/math?formula=X%3D%7Bx_1%2Cx_2%2Cx_3%2C....x_n%7D">，每一个特征在计算过程中都有一个权重，所以引入权重参数建立权重结构（直线结构）：<br>\n    <img alt="机器学习——softmax计算"\n         src="https://math.jianshu.com/math?formula=g(x)%3Dw_0%2Bw_1x_1%2Bw_2x_2%2B...%2Bw_nx_n%3Dw_jx_j">，<img\n            alt="机器学习——softmax计算" src="https://math.jianshu.com/math?formula=j%5Cin%5B0%2Cn%5D%EF%BC%8Cx_0%3D1"><br>\n    所以softmax更加完整的代数表达式是：<br> <img alt="机器学习——softmax计算"\n                                   src="https://math.jianshu.com/math?formula=softmax(x)%3D%5Cfrac%7Be%5E%7Bw_%7Bij%7Dx_j%7D%7D%7B%5Csum_j%5Ene%5E%7Bw_ijx_j%7D%7D"><br>\n    其中<img alt="机器学习——softmax计算" src="https://math.jianshu.com/math?formula=i">表示计算结果有多少个分类<img alt="机器学习——softmax计算"\n                                                                                                src="https://math.jianshu.com/math?formula=i%5Cin(0%2Cm)">，j表示特征的个数<img\n            alt="机器学习——softmax计算" src="https://math.jianshu.com/math?formula=j%5Cin%5B0.n%5D">。<br> 有<img\n            alt="机器学习——softmax计算" src="https://math.jianshu.com/math?formula=o">个样本时就扩展为一个2阶张量，那么用矩阵形式表述更加简洁：<br> <img\n            alt="机器学习——softmax计算"\n            src="https://math.jianshu.com/math?formula=softmax(X)%3D%5Cfrac%7Be%5E%7BXW%5ET%7D%7D%7Be%5E%7BXW%5ET%7DE%7D"><br>\n    用下标<img alt="机器学习——softmax计算" src="https://math.jianshu.com/math?formula=_%7B(o)%7D">表示当前的特征属于第几个样本，例如<img\n            alt="机器学习——softmax计算" src="https://math.jianshu.com/math?formula=x_%7B(1)3%7D">表示第1个样本的第3个特征。矩阵的计算过程如下：</p>\n\n<h4 id="h4-3">1.计算权重指数</h4>\n<p><img alt="机器学习——softmax计算"\n        src="https://math.jianshu.com/math?formula=G%3Dexp%5Cleft(%20%5Cbegin%7Bbmatrix%7D%20x_%7B(1)0%7D%26x_%7B(1)1%7D%26x_%7B(1)2%7D%26%5Ccdots%26x_%7B(1)n%7D%5C%5C%20x_%7B(2)0%7D%26x_%7B(2)1%7D%26x_%7B(2)2%7D%26%5Ccdots%26x_%7B(2)n%7D%5C%5C%20x_%7B(3)0%7D%26x_%7B(3)1%7D%26x_%7B(3)2%7D%26%5Ccdots%26x_%7B(3)n%7D%5C%5C%20%5Cvdots%26%5Cvdots%26%5Cvdots%26%5Cddots%26%5Cvdots%5C%5C%20x_%7B(o)0%7D%26x_%7B(o)1%7D%26x_%7B(o)2%7D%26%5Ccdots%26x_%7B(o)n%7D%20%5Cend%7Bbmatrix%7D%20%C3%97%20%5Cbegin%7Bbmatrix%7D%20w_%7B10%7D%26w_%7B20%7D%26w_%7B30%7D%26%5Ccdots%26w_%7Bm0%7D%5C%5C%20w_%7B11%7D%26w_%7B21%7D%26w_%7B31%7D%26%5Ccdots%26w_%7Bm1%7D%5C%5C%20w_%7B12%7D%26w_%7B22%7D%26w_%7B32%7D%26%5Ccdots%26w_%7Bm2%7D%5C%5C%20%5Cvdots%26%5Cvdots%26%5Cvdots%26%5Cddots%26%5Cvdots%5C%5C%20w_%7B1n%7D%26w_%7B2n%7D%26w_%7B3n%7D%26%5Ccdots%26w_%7Bmn%7D%5C%5C%20%5Cend%7Bbmatrix%7D%5Cright)"><br>\n    矩阵中<img alt="机器学习——softmax计算" src="https://math.jianshu.com/math?formula=x_%7B(o)0%7D%20%3D%201"><br> <img\n            alt="机器学习——softmax计算" src="https://math.jianshu.com/math?formula=exp()">表示矩阵每一个元素求e指数。所以得到：</p>\n<p><img alt="机器学习——softmax计算"\n        src="https://math.jianshu.com/math?formula=G%3D%20%5Cbegin%7Bbmatrix%7D%20e%5E%7B%5Csum_j%5Enw_%7B1j%7Dx_%7B(1)j%7D%7D%26e%5E%7B%5Csum_j%5Enw_%7B2j%7Dx_%7B(1)j%7D%7D%26e%5E%7B%5Csum_j%5Enw_%7B3j%7Dx_%7B(1)j%7D%7D%26%5Ccdots%26e%5E%7B%5Csum_j%5Enw_%7Bmj%7Dx_%7B(1)j%7D%7D%5C%5C%20e%5E%7B%5Csum_j%5Enw_%7B1j%7Dx_%7B(2)j%7D%7D%26e%5E%7B%5Csum_j%5Enw_%7B2j%7Dx_%7B(2)j%7D%7D%26e%5E%7B%5Csum_j%5Enw_%7B3j%7Dx_%7B(2)j%7D%7D%26%5Ccdots%26e%5E%7B%5Csum_j%5Enw_%7Bmj%7Dx_%7B(2)j%7D%7D%5C%5C%20%5Cvdots%26%5Cvdots%26%5Cvdots%26%5Cddots%26%5Cvdots%5C%5C%20e%5E%7B%5Csum_j%5Enw_%7B1j%7Dx_%7B(o)j%7D%7D%26e%5E%7B%5Csum_j%5Enw_%7B2j%7Dx_%7B(o)j%7D%7D%26e%5E%7B%5Csum_j%5Enw_%7B3j%7Dx_%7B(o)j%7D%7D%26%5Ccdots%26e%5E%7B%5Csum_j%5Enw_%7Bmj%7Dx_%7B(o)j%7D%7D%20%5Cend%7Bbmatrix%7D">\n</p>\n<p>令<img alt="机器学习——softmax计算"\n         src="https://math.jianshu.com/math?formula=c_%7Bki%7D%3Dc(w_%7Bij%7D%2Cx_%7B(k)j%7D)%3De%5E%7B%5Csum_j%5Enw_%7Bij%7Dx_%7B(k)j%7D%7D%2Ck%5Cin(0%2Co%5D">，有：\n</p>\n<p><img alt="机器学习——softmax计算"\n        src="https://math.jianshu.com/math?formula=G%3DG(x)%3D%20%5Cbegin%7Bbmatrix%7D%20c_%7B11%7D%26c_%7B12%7D%26c_%7B13%7D%26%5Ccdots%26c_%7B1m%7D%5C%5C%20c_%7B21%7D%26c_%7B22%7D%26c_%7B23%7D%26%5Ccdots%26c_%7B2m%7D%5C%5C%20%5Cvdots%26%5Cvdots%26%5Cvdots%26%5Cddots%26%5Cvdots%5C%5C%20c_%7Bo1%7D%26c_%7Bo2%7D%26c_%7Bo3%7D%26%5Ccdots%26c_%7Bom%7D%5C%5C%20%5Cend%7Bbmatrix%7D">\n</p>\n\n<h4 id="h4-4">2.计算分母</h4>\n<p>现在<img alt="机器学习——softmax计算"\n          src="https://math.jianshu.com/math?formula=Softmax%3DS(x)%3D%5Cfrac%7BG%7D%7BG%C3%97E%7D"><br> <img\n        alt="机器学习——softmax计算" src="https://math.jianshu.com/math?formula=E">是一个形状为<img alt="机器学习——softmax计算"\n                                                                                       src="https://math.jianshu.com/math?formula=m%C3%971">元素全为1的矩阵：<br>\n    <img alt="机器学习——softmax计算"\n         src="https://math.jianshu.com/math?formula=E%3D%5Cbegin%7Bbmatrix%7D%201%5C%5C%201%5C%5C%20%5Ccdots%5C%5C%201%20%5Cend%7Bbmatrix%7D">\n</p>\n<p>分母:<img alt="机器学习——softmax计算"\n           src="https://math.jianshu.com/math?formula=S%3DG%C3%97E%3D%5Cbegin%7Bbmatrix%7D%20c_%7B11%7D%26c_%7B12%7D%26c_%7B13%7D%26%5Ccdots%26c_%7B1m%7D%5C%5C%20c_%7B21%7D%26c_%7B22%7D%26c_%7B23%7D%26%5Ccdots%26c_%7B2m%7D%5C%5C%20%5Cvdots%26%5Cvdots%26%5Cvdots%26%5Cddots%26%5Cvdots%5C%5C%20c_%7Bo1%7D%26c_%7Bo2%7D%26c_%7Bo3%7D%26%5Ccdots%26c_%7Bom%7D%5C%5C%20%5Cend%7Bbmatrix%7D%C3%97%5Cbegin%7Bbmatrix%7D%201%5C%5C%201%5C%5C%20%5Ccdots%5C%5C%201%20%5Cend%7Bbmatrix%7D"><br>\n    所以：<img alt="机器学习——softmax计算"\n            src="https://math.jianshu.com/math?formula=S%3D%5Cbegin%7Bbmatrix%7D%20%5Csum_i%5Emc_%7B1i%7D%5C%5C%20%5Csum_i%5Emc_%7B2i%7D%5C%5C%20%5Csum_i%5Emc_%7B3i%7D%5C%5C%20%5Ccdots%5C%5C%20%5Csum_i%5Emc_%7Boi%7D%20%5Cend%7Bbmatrix%7D%3D%5Cbegin%7Bbmatrix%7Ds_1%5C%5Cs_2%5C%5Cs_3%5C%5C%5Ccdots%5C%5Cs_o%5Cend%7Bbmatrix%7D">\n</p>\n\n<h4 id="h4-5">3.归一化</h4>\n<p>现在<img alt="机器学习——softmax计算"\n          src="https://math.jianshu.com/math?formula=Q%3Dsoftmax%3D%5Cfrac%7BG%7D%7BS%7D%3D%5Cbegin%7Bbmatrix%7D%20c_%7B11%7D%26c_%7B12%7D%26c_%7B13%7D%26%5Ccdots%26c_%7B1m%7D%5C%5C%20c_%7B21%7D%26c_%7B22%7D%26c_%7B23%7D%26%5Ccdots%26c_%7B2m%7D%5C%5C%20%5Cvdots%26%5Cvdots%26%5Cvdots%26%5Cddots%26%5Cvdots%5C%5C%20c_%7Bo1%7D%26c_%7Bo2%7D%26c_%7Bo3%7D%26%5Ccdots%26c_%7Bom%7D%5C%5C%20%5Cend%7Bbmatrix%7D%5Cdiv%5Cbegin%7Bbmatrix%7Ds_1%5C%5Cs_2%5C%5Cs_3%5C%5C%5Ccdots%5C%5Cs_o%5Cend%7Bbmatrix%7D"><br>\n    所以最终<img alt="机器学习——softmax计算"\n             src="https://math.jianshu.com/math?formula=Q%3D%5Cbegin%7Bbmatrix%7D%20%5Cfrac%7Bc_%7B11%7D%7D%7Bd_1%7D%26%5Cfrac%7Bc_%7B12%7D%7D%7Bd_1%7D%26%5Cfrac%7Bc_%7B13%7D%7D%7Bd_1%7D%26%5Ccdots%26%5Cfrac%7Bc_%7B1m%7D%7D%7Bd_1%7D%5C%5C%20%5Cfrac%7Bc_%7B21%7D%7D%7Bd_2%7D%26%5Cfrac%7Bc_%7B22%7D%7D%7Bd_2%7D%26%5Cfrac%7Bc_%7B23%7D%7D%7Bd_2%7D%26%5Ccdots%26%5Cfrac%7Bc_%7B2m%7D%7D%7Bd_2%7D%5C%5C%20%5Cvdots%26%5Cvdots%26%5Cvdots%26%5Cddots%26%5Cvdots%5C%5C%20%5Cfrac%7Bc_%7Bo1%7D%7D%7Bd_o%7D%26%5Cfrac%7Bc_%7B12%7D%7D%7Bd_o%7D%26%5Cfrac%7Bc_%7B12%7D%7D%7Bd_o%7D%26%5Ccdots%26%5Cfrac%7Bc_%7B1m%7D%7D%7Bd_o%7D%5C%5C%20%5Cend%7Bbmatrix%7D%3D%5Cbegin%7Bbmatrix%7D%20q_%7B11%7D%26q_%7B12%7D%26q_%7B13%7D%26%5Ccdots%26q_%7B1m%7D%5C%5C%20q_%7B21%7D%26q_%7B22%7D%26q_%7B23%7D%26%5Ccdots%26q_%7B2m%7D%5C%5C%20%5Cvdots%26%5Cvdots%26%5Cvdots%26%5Cddots%26%5Cvdots%5C%5C%20q_%7Bo1%7D%26s_%7Bo2%7D%26q_%7Bo3%7D%26%5Ccdots%26q_%7Bom%7D%5C%5C%20%5Cend%7Bbmatrix%7D">\n</p>\n\n<h3 id="h3-4">交叉熵（极大似然评估）计算</h3>\n<p>根据交叉熵的公式<img alt="机器学习——softmax计算"\n                src="https://math.jianshu.com/math?formula=L%3D%5Csum_i%5Emp_i%5Clog%20q_i">，这里<img\n        alt="机器学习——softmax计算" src="https://math.jianshu.com/math?formula=p_i">是样本的真实分类（标签label），<img\n        alt="机器学习——softmax计算" src="https://math.jianshu.com/math?formula=q_i">是softmax计算的结果。用矩阵结构表示：<br> <img\n        alt="机器学习——softmax计算"\n        src="https://math.jianshu.com/math?formula=L%3D%5Cfrac%7B1%7D%7Bo%7D%5Cleft%5BP%5Clog%5Cleft(Q%5ET%5Cright)%5Cright%5D%5ED%C3%97E">，矩阵<img\n        alt="机器学习——softmax计算" src="https://math.jianshu.com/math?formula=A_%7Bm%C3%97n%7D%5ED">表示取对角线元素形成一个<img\n        alt="机器学习——softmax计算" src="https://math.jianshu.com/math?formula=1%C3%97n">的矩阵。</p>\n\n<h4 id="h4-6">1.对数及矩阵乘积</h4>\n<p><img alt="机器学习——softmax计算"\n        src="https://math.jianshu.com/math?formula=%5Cleft%5BP%5Clog%5Cleft(S%5ET%5Cright)%5Cright%5D%5ED%3D%20%5Cleft%5B%5Cbegin%7Bbmatrix%7D%20p_%7B(1)1%7D%26p_%7B(1)2%7D%26p_%7B(1)3%7D%26%5Ccdots%26p_%7B(1)m%7D%5C%5C%20p_%7B(2)1%7D%26p_%7B(2)2%7D%26p_%7B(2)3%7D%26%5Ccdots%26p_%7B(2)m%7D%5C%5C%20%5Cvdots%26%5Cvdots%26%5Cvdots%26%5Cddots%26%5Cvdots%5C%5C%20p_%7B(o)1%7D%26p_%7B(o)2%7D%26p_%7B(o)3%7D%26%5Ccdots%26p_%7B(o)m%7D%5C%5C%20%5Cend%7Bbmatrix%7D%C3%97%5Clog%5Cleft(%5Cbegin%7Bbmatrix%7D%20s_%7B11%7D%26s_%7B21%7D%26%5Ccdots%26s_%7Bo1%7D%5C%5C%20s_%7B12%7D%26s_%7B22%7D%26%5Ccdots%26s_%7Bo2%7D%5C%5C%20%5Cvdots%26%5Cvdots%26%5Cddots%26%5Cvdots%5C%5C%20s_%7B1m%7D%26s_%7B2m%7D%26%5Ccdots%26s_%7Bom%7D%5C%5C%20%5Cend%7Bbmatrix%7D%5Cright)%5Cright%5D%5ED"><br>\n    对数<img alt="机器学习——softmax计算" src="https://math.jianshu.com/math?formula=%5Clog()">表示对每个元素进行对数运算，他仅改变每个元素的值，对矩阵结构没任何影响，所以下面用<img\n            alt="机器学习——softmax计算"\n            src="https://math.jianshu.com/math?formula=s_%7Bom%7D%E8%A1%A8%E7%A4%BA%5Clog(s_%7Bom%7D)">继续表示：<br> <img\n            alt="机器学习——softmax计算"\n            src="https://math.jianshu.com/math?formula=%5Cleft%5BP%5Clog%5Cleft(S%5ET%5Cright)%5Cright%5D%5ED%3D%20%5Cbegin%7Bbmatrix%7D%20%5Csum_i%5Em(p_%7B(1)i%7Ds_%7B(1)i%7D)%26%20%5Csum_i%5Em(p_%7B(2)i%7Ds_%7B(2)i%7D)%26%20%5Ccdots%26%20%5Csum_i%5Em(p_%7B(o)i%7Ds_%7B(o)i%7D)%20%5Cend%7Bbmatrix%7D">\n</p>\n\n<h4 id="h4-7">2.交叉熵计算</h4>\n<p><img alt="机器学习——softmax计算"\n        src="https://math.jianshu.com/math?formula=L%3D%5Cfrac%7B1%7D%7Bo%7D%C3%97%5Cbegin%7Bbmatrix%7D%20%5Csum_i%5Em(p_%7B(1)i%7Ds_%7B(1)i%7D)%26%20%5Csum_i%5Em(p_%7B(2)i%7Ds_%7B(2)i%7D)%26%20%5Ccdots%26%20%5Csum_i%5Em(p_%7B(o)i%7Ds_%7B(o)i%7D)%20%5Cend%7Bbmatrix%7D%C3%97%5Cbegin%7Bbmatrix%7D%201%5C%5C%201%5C%5C%20%5Ccdots%5C%5C%201%20%5Cend%7Bbmatrix%7D"><br>\n    将<img alt="机器学习——softmax计算" src="https://math.jianshu.com/math?formula=%5Clog">符号带入公式得到最终的损失函数矩阵计算结果：<br> <img\n            alt="机器学习——softmax计算"\n            src="https://math.jianshu.com/math?formula=L%3D%5Cfrac%7B1%7D%7Bo%7D%5Cbegin%7Bbmatrix%7D%5Csum_k%5Eo%5Csum_i%5Em%5Cleft%5Bp_%7B(o)i%7D%5Clog(s_%7B(o)i%7D)%20%5Cright%5D%5Cend%7Bbmatrix%7D"><br>\n    把矩阵符号去掉，这里的结果和前面<strong>最大似然评估</strong>推导的结果一致。</p>\n\n<h3 id="h3-5">参数优化</h3>\n<p>通过前文的介绍我们知道,损失函数的目标是获得<strong>“最大值”</strong>，这个最大值的含义是从负无穷方向接近0的一个极限过程。所以经常会看到很多文章会在指标函数前面添加一个负号，如下面这样：<br> <img\n        alt="机器学习——softmax计算"\n        src="https://math.jianshu.com/math?formula=Loss%3D-%5Cfrac%7B1%7D%7Bo%7D%5Csum%5Csum%20p%5Cln%20q"><br>\n    这样就可以把这个过程转变为求<strong>“最小值”</strong>——从正无穷方向接近0，本质并没有多大区别。</p>\n<p>既然这是一个极限过程，自然就可以用积分原理逐渐计算合理的参数。现在的目标是通过导数和找到递增量可以逐步求解<img alt="机器学习——softmax计算"\n                                                             src="https://math.jianshu.com/math?formula=w_%7Bij%7D">值：<br>\n    用<img alt="机器学习——softmax计算" src="https://math.jianshu.com/math?formula=%5Cnabla_%7Bij%7D">表示<img\n            alt="机器学习——softmax计算" src="https://math.jianshu.com/math?formula=w_%7Bij%7D">的偏导函数:<img\n            alt="机器学习——softmax计算"\n            src="https://math.jianshu.com/math?formula=%5Cnabla_%7Bij%7D%3D%5Cfrac%7B%5Cpartial%20L(w_%7Bij%7D)%7D%7B%5Cpartial%20w_%7Bij%7D%7D">。<img\n            alt="机器学习——softmax计算" src="https://math.jianshu.com/math?formula=w_%7Bij%7D">的更新公式为：<img\n            alt="机器学习——softmax计算"\n            src="https://math.jianshu.com/math?formula=w_%7Bij%7D%3Dw_%7Bij%7D%2B%5Ceta%5Cnabla_%7Bij%7D">。<img\n            alt="机器学习——softmax计算" src="https://math.jianshu.com/math?formula=%5Ceta">表示每一步更新的步长。<br>\n    如果损失函数前携带了负号，那么更新公式应该修改为<img alt="机器学习——softmax计算"\n                                 src="https://math.jianshu.com/math?formula=w_%7Bij%7D%3Dw_%7Bij%7D-%5Ceta%5Cnabla_%7Bij%7D">，即越来越小。\n</p>\n\n<h4 id="h4-8">1.求偏导函数</h4>\n<p>目的已经明确，那么接下来就是数学运算了：<br> 设softmax计算结果一共有M个分类，输入模型的一个样本一共有N个特征。<br> <img alt="机器学习——softmax计算"\n                                                                           src="https://math.jianshu.com/math?formula=g_i">表示权重计算的结果，下标<img\n        alt="机器学习——softmax计算" src="https://math.jianshu.com/math?formula=i">表示所属的分类，用数组可以表示为：<br> <img\n        alt="机器学习——softmax计算"\n        src="https://math.jianshu.com/math?formula=%5Cbegin%7Bbmatrix%7D%20g_1%3D%5Csum_j%5ENw_%7B1j%7Dx_j%5C%5C%20g_2%3D%5Csum_j%5ENw_%7B2j%7Dx_j%5C%5C%20%5Cvdots%5C%5C%20g_i%3D%5Csum_j%5ENw_%7Bij%7Dx_j%5C%5C%20%5Cvdots%5C%5C%20g_M%3D%5Csum_j%5ENw_%7BMj%7Dx_j%5C%5C%20%5Cend%7Bbmatrix%7D"><br>\n    <img alt="机器学习——softmax计算" src="https://math.jianshu.com/math?formula=q_i">表示每一个分类softmax计算的结果：<img\n            alt="机器学习——softmax计算"\n            src="https://math.jianshu.com/math?formula=q_i%3D%5Cfrac%7Bg_i%7D%7B%5Csum_k%5EMg_k%7D">,k表示分类迭代求和的下标：用数组表示为：<br>\n    <img alt="机器学习——softmax计算"\n         src="https://math.jianshu.com/math?formula=%5Cbegin%7Bbmatrix%7D%20q_1%3D%5Cfrac%7Be%5E%7Bg_1%7D%7D%7B%5Csum_k%5EMe%5E%7Bg_k%7D%7D%5C%5C%20q_2%3D%5Cfrac%7Be%5E%7Bg_2%7D%7D%7B%5Csum_k%5EMe%5E%7Bg_k%7D%7D%5C%5C%20%5Cvdots%5C%5C%20q_i%3D%5Cfrac%7Be%5E%7Bg_i%7D%7D%7B%5Csum_k%5EMe%5E%7Bg_k%7D%7D%5C%5C%20%5Cvdots%5C%5C%20q_M%3D%5Cfrac%7Be%5E%7Bg_M%7D%7D%7B%5Csum_k%5EMe%5E%7Bg_k%7D%7D%5C%5C%20%5Cend%7Bbmatrix%7D"><br>\n    Loss是最终的损失函数：<img alt="机器学习——softmax计算"\n                      src="https://math.jianshu.com/math?formula=Loss%3D%5Csum_k%5EM%20L_k%20%3D%20%5Csum_k%5EM%20p_k%5Cln%20q_k">。<img\n            alt="机器学习——softmax计算" src="https://math.jianshu.com/math?formula=p_k">表示每一个softmax分类对应的真实概率，取值0或1。<br>\n    优化参数是不断的调优权重参数，所以把<img alt="机器学习——softmax计算" src="https://math.jianshu.com/math?formula=w_%7Bij%7D">看做自变量求导：<br>\n    <img alt="机器学习——softmax计算"\n         src="https://math.jianshu.com/math?formula=%5Cnabla_%7Bij%7D%3D%5Cfrac%7B%5Cpartial%20Loss%7D%7B%5Cpartial%20w_%7Bij%7D%7D"><br>\n    按照前面给出的公式将损失函数的计算分为3步：1）计算权重模型，2）计算softmax，3）计算交叉熵。现在把求导过程分为这3步对<img alt="机器学习——softmax计算"\n                                                                         src="https://math.jianshu.com/math?formula=q_i">、<img\n            alt="机器学习——softmax计算" src="https://math.jianshu.com/math?formula=g_i">以及<img alt="机器学习——softmax计算"\n                                                                                         src="https://math.jianshu.com/math?formula=w_%7Bij%7D">复合求导：<br>\n    <img alt="机器学习——softmax计算"\n         src="https://math.jianshu.com/math?formula=%5Cbegin%7Bsplit%7D%20%5Cnabla_%7Bij%7D%26%3D%5Cleft(%5Csum_k%5EM%20p_k%5Cln%20q_k%5Cright)%27%5C%5C%20%26%3D%5Csum_k%5EM%5Cfrac%7Bp_k%7D%7Bq_k%7D%5Cleft(%5Csum_k%5EM%5Cfrac%7Be%5E%7Bg_k%7D%7D%7B%5Csum_l%5EMe%5E%7Bg_l%7D%7D%20%5Cright)%27%5C%5C%20%26%3D%5Csum_k%5EM%5Cfrac%7Bp_k%7D%7Bq_k%7D%5Cfrac%7B%5Cleft(e%5E%7Bg_k%7D%5Cright)%27%5Csum_l%5EMe%5E%7Bg_l%7D%20-%20e%5E%7Bg_k%7D%5Cleft(%5Csum_l%5EMe%5E%7Bg_l%7D%5Cright)%27%7D%7B%5Cleft(%5Csum_l%5EMe%5E%7Bg_l%7D%5Cright)%5E2%7D%5C%5C%20%26%3D%5Csum_k%5EM%5Cfrac%7Bp_k%7D%7Bq_k%7D%5Cleft%5B%5Cfrac%7B%5Cleft(e%5E%7Bg_k%7D%5Cright)%27%7D%7B%5Csum_l%5EMe%5E%7Bg_l%7D%7D%20-%20%5Cfrac%7Be%5E%7Bg_k%7D%7D%7B%5Csum_l%5EMe%5E%7Bg_l%7D%7D%5Cfrac%7Be%5E%7Bg_i%7D%7D%7B%5Csum_l%5EMe%5E%7Bg_l%7D%7D%5Cleft(g_k%5Cright)%27%5Cright%5D%20%5Cend%7Bsplit%7D">\n</p>\n<p>计算到这里需要注意一个问题。因为目标是对<img alt="机器学习——softmax计算"\n                            src="https://math.jianshu.com/math?formula=w_%7Bij%7D">求导，所以在求和公式中包含<img\n        alt="机器学习——softmax计算" src="https://math.jianshu.com/math?formula=w_%7Bij%7D">的项（即包含<img alt="机器学习——softmax计算"\n                                                                                                src="https://math.jianshu.com/math?formula=g_i">的项）和不包含的项求导的结果是不一样的，所以需要将<img\n        alt="机器学习——softmax计算" src="https://math.jianshu.com/math?formula=g_i">项单独拿出来求导。所以有：<br> <img\n        alt="机器学习——softmax计算"\n        src="https://math.jianshu.com/math?formula=%5Cbegin%7Bsplit%7D%20%5Cnabla_%7Bij%7D%26%3D%5Cfrac%7Bp_i%7D%7Bq_i%7D%5Cleft%5B%5Cfrac%7B%5Cleft(e%5E%7Bg_i%7D%5Cright)%27%7D%7B%5Csum_l%5EMe%5E%7Bg_l%7D%7D%20-%20%5Cfrac%7Be%5E%7Bg_i%7D%7D%7B%5Csum_l%5EMe%5E%7Bg_l%7D%7D%5Cfrac%7Be%5E%7Bg_i%7D%7D%7B%5Csum_l%5EMe%5E%7Bg_l%7D%7D%5Cleft(g_k%5Cright)%27%5Cright%5D%20%2B%20%5Csum_%7Bk%20%5Cneq%20i%7D%5EM%5Cfrac%7Bp_k%7D%7Bq_k%7D%5Cleft%5B%5Cfrac%7B%5Cleft(e%5E%7Bg_k%7D%5Cright)%27%7D%7B%5Csum_l%5EMe%5E%7Bg_l%7D%7D%20-%20%5Cfrac%7Be%5E%7Bg_k%7D%7D%7B%5Csum_l%5EMe%5E%7Bg_l%7D%7D%5Cfrac%7Be%5E%7Bg_i%7D%7D%7B%5Csum_l%5EMe%5E%7Bg_l%7D%7D%5Cleft(g_k%5Cright)%27%5Cright%5D%5C%5C%20%26%3D%5Cfrac%7Bp_i%7D%7Bq_i%7D%5Cleft(q_i-q_i%5E2%5Cright)%5Cleft(g_k%5Cright)%27-%5Csum_%7Bk%20%5Cneq%20i%7D%5EM%5Cfrac%7Bp_k%7D%7Bq_k%7Dq_kq_i%5Cleft(g_k%5Cright)%27%5C%5C%20%26%3D%5Cleft%5Bp_i-%5Cleft(p_iq_i%2B%5Csum_%7Bk%5Cneq%20i%7D%5EMp_kq_i%5Cright)%5Cright%5D%5Cleft(g_k%5Cright)%27%5C%5C%20%26%3D%5Cleft(p_i-q_i%5Csum_%7Bk%7D%5EMp_k%5Cright)%5Cfrac%7B%5Cpartial%5Csum_j%5EN%20w_%7Bij%7Dx_j%7D%7B%5Cpartial%20w_%7Bij%7D%7D%5C%5C%20%26%3D%5Cleft(p_i-q_i%5Csum_%7Bk%7D%5EMp_k%5Cright)x_j%20%5Cend%7Bsplit%7D"><br>\n    <img alt="机器学习——softmax计算" src="https://math.jianshu.com/math?formula=p_k">是一个结构为[0,0,0,1,0,0......]的只有一个元素是1其余元素为0的数组，所以它的合计为1，因此得：\n</p>\n<p><img alt="机器学习——softmax计算"\n        src="https://math.jianshu.com/math?formula=%5Cnabla_%7Bij%7D%20%3D%20%5Cleft(p_i-q_i%5Cright)x_j"></p>\n<p>虽然推导这个求偏导的过程要花费一些功夫，但是这个结果却非常简单——<strong>真实分布与预测分布的差值乘权重参数对应的特征值</strong>。如果交叉熵函数中使用了负号，那么导函数为<img\n        alt="机器学习——softmax计算" src="https://math.jianshu.com/math?formula=%5Cnabla_%7Bij%7D%3D(q_i-p_i)x_j">，很多文章更喜欢用这种求最小值的方式。<br>\n    观察<img alt="机器学习——softmax计算" src="https://math.jianshu.com/math?formula=%5Cnabla_%7Bij%7D">的表达式，<img\n            alt="机器学习——softmax计算" src="https://math.jianshu.com/math?formula=p_i">和<img alt="机器学习——softmax计算"\n                                                                                        src="https://math.jianshu.com/math?formula=x_j">都是已知的数值，在优化的过程中只有<img\n            alt="机器学习——softmax计算" src="https://math.jianshu.com/math?formula=q_i">会发生改变。所以当预测分布越接近真实分布时增量会越来越接近0。</p>\n\n<h4 id="h4-9">2.多个样本与矩阵运算</h4>\n<p>上面求导的过程并没有考虑多个样本的情况，设现在有O个样本。那么求导公式变成：<br> <img alt="机器学习——softmax计算"\n                                                   src="https://math.jianshu.com/math?formula=%5Cnabla_%7Bij%7D%3D%5Cfrac%7B1%7D%7BO%7D%5Csum_k%5EO(p_%7B(k)i%7D-q_i)x_%7B(k)j%7D">。<br>\n    因为每一个子项的求导结果都是向0接近，所以求和再平分之后也是靠近0的。<br> 现在模型参数的更新公式用矩阵表示为：<br> <img alt="机器学习——softmax计算"\n                                                                        src="https://math.jianshu.com/math?formula=W%3DW%2B%5Ceta%20D">。其中<img\n            alt="机器学习——softmax计算" src="https://math.jianshu.com/math?formula=D">是<img alt="机器学习——softmax计算"\n                                                                                      src="https://math.jianshu.com/math?formula=%5Cnabla_%7Bij%7D">的矩阵形，<img\n            alt="机器学习——softmax计算" src="https://math.jianshu.com/math?formula=%5Ceta">是一个常量，<img alt="机器学习——softmax计算"\n                                                                                                src="https://math.jianshu.com/math?formula=W">是<img\n            alt="机器学习——softmax计算" src="https://math.jianshu.com/math?formula=w_%7Bij%7D">的矩阵形。<br>\n    设P表示样本真实分布的矩阵（即标记矩阵），Q是文章前面介绍的softmax矩阵计算的结果，X表示样本矩阵。那么D的矩阵表示为：<img alt="机器学习——softmax计算"\n                                                                        src="https://math.jianshu.com/math?formula=D%3D(P-Q)%5ETX">。\n</p>\n\n<h2 id="h2-7">计算法则总结与编码实现</h2>\n\n<h3 id="h3-6">算法总结</h3>\n<p>经过前面推导分析，softmax机器学习算法建模分为以下几项内容。</p>\n\n<h4 id="h4-10">1.定义</h4>\n<p>有<img alt="机器学习——softmax计算" src="https://math.jianshu.com/math?formula=O">个样本、<img alt="机器学习——softmax计算"\n                                                                                      src="https://math.jianshu.com/math?formula=N">个特征、<img\n        alt="机器学习——softmax计算" src="https://math.jianshu.com/math?formula=M">个分类，。<br> <img alt="机器学习——softmax计算"\n                                                                                           src="https://math.jianshu.com/math?formula=X">是样本（feature）矩阵，形状为<img\n        alt="机器学习——softmax计算" src="https://math.jianshu.com/math?formula=(O%2CN)"><br> <img alt="机器学习——softmax计算"\n                                                                                            src="https://math.jianshu.com/math?formula=W">是权重矩阵，形状为<img\n        alt="机器学习——softmax计算" src="https://math.jianshu.com/math?formula=(M%2CN)"><br> <img alt="机器学习——softmax计算"\n                                                                                            src="https://math.jianshu.com/math?formula=P">是标签（label）矩阵，形状为<img\n        alt="机器学习——softmax计算" src="https://math.jianshu.com/math?formula=(O%2CM)"><br> <img alt="机器学习——softmax计算"\n                                                                                            src="https://math.jianshu.com/math?formula=Q">是softmax计算后得到的矩阵，形状为<img\n        alt="机器学习——softmax计算" src="https://math.jianshu.com/math?formula=(O%2CM)"><br> <img alt="机器学习——softmax计算"\n                                                                                            src="https://math.jianshu.com/math?formula=E_1%2CE_2">是两个用于合并计算的单位矩阵，形状为(M,1)和(O,1)，<img\n        alt="机器学习——softmax计算"\n        src="https://math.jianshu.com/math?formula=E%3D%5Cbegin%7Bbmatrix%7D%201%5C%5C1%5C%5C%20%5Ccdots%20%5C%5C1%20%5Cend%7Bbmatrix%7D"><br>\n    矩阵<img alt="机器学习——softmax计算" src="https://math.jianshu.com/math?formula=A%5ET">表示转置矩阵，<img alt="机器学习——softmax计算"\n                                                                                               src="https://math.jianshu.com/math?formula=A%5ED">表示取矩阵的对角线元素（类似于特征）。\n</p>\n\n<h4 id="h4-11">2.softmax计算</h4>\n<p>权重指数：<img alt="机器学习——softmax计算" src="https://math.jianshu.com/math?formula=G%3De%5E%7BXW%5ET%7D"><br> 归一化：<img\n        alt="机器学习——softmax计算" src="https://math.jianshu.com/math?formula=Q%3DSoftmax%3D%5Cfrac%7BG%7D%7BG*E_1%7D"></p>\n\n<h4 id="h4-12">3.损失函数</h4>\n<p><img alt="机器学习——softmax计算"\n        src="https://math.jianshu.com/math?formula=Loss%3D%5Cfrac%7B1%7D%7Bo%7D%5Cleft%5BPlog(Q%5ET)%5Cright%5D%5ED%C3%97E">\n</p>\n\n<h4 id="h4-13">4.参数训练</h4>\n<p><img alt="机器学习——softmax计算"\n        src="https://math.jianshu.com/math?formula=W%3DW%2B%5Ceta%5Cfrac%7B%5Cleft(P-Q%5Cright)%5ET%C3%97X%7D%7BO%7D">，训练会重复这个计算，直到变化率“接近”0。\n</p>\n\n<h3 id="h3-7">编码实现</h3>\n<p>以下代码在<a href="https://github.com/chkui/ml-math-softmax" target="_blank" rel="nofollow">https://github.com/chkui/ml-math-softmax</a>。<br>\n    如下图，<code>sample.softmax_train.softmax_modual.Softmax</code>类模拟了一个softmax机器学习的过程。</p>\n<pre><code class="ruby">import numpy as np\n\n<span class="hljs-class"><span class="code-keyword">class</span> <span class="code-title">Softmax</span>:</span>\n    <span class="hljs-function"><span class="code-keyword">def</span> <span class="code-title">__init__</span><span\n            class="hljs-params">(<span class="code-keyword">self</span>, features, labels)</span></span>:\n        <span class="code-keyword">self</span>.__features = features\n        <span class="code-keyword">self</span>.__labels = labels\n        <span class="code-keyword">self</span>.__weight = np.zeros((labels.shape[<span class="hljs-number">1</span>], features.shape[<span\n            class="hljs-number">1</span>]))\n        <span class="code-comment"># 用于 softmax 归一化计算分布的标量矩阵</span>\n        <span class="code-keyword">self</span>.__e_softmax = np.ones((labels.shape[<span class="hljs-number">1</span>], <span\n            class="hljs-number">1</span>))\n        <span class="code-comment"># 用于 损失函数计算的标量矩阵</span>\n        <span class="code-keyword">self</span>.__e_loss = np.ones((features.shape[<span\n            class="hljs-number">0</span>], <span class="hljs-number">1</span>))\n        <span class="code-comment"># flag用于标记运算符号</span>\n        <span class="code-comment"># flag如果是-1,那么损失函数就是求最小值，那么优化器求差值。</span>\n        <span class="code-comment"># flag如果是+1损失函数就是求最大值，那么优化器求和</span>\n        <span class="code-keyword">self</span>.__flag = <span class="hljs-number">1</span>\n\n    <span class="hljs-function"><span class="code-keyword">def</span> <span class="code-title">__softmax</span><span\n            class="hljs-params">(<span class="code-keyword">self</span>)</span></span>:\n        liner = <span class="code-keyword">self</span>.__features * <span class="code-keyword">self</span>.__weight.T\n        exp = np.exp(liner)\n        den = exp * <span class="code-keyword">self</span>.__e_softmax\n        q = exp / den\n        <span class="code-keyword">return</span> q\n\n    <span class="hljs-function"><span class="code-keyword">def</span> <span class="code-title">__loss</span><span\n            class="hljs-params">(<span class="code-keyword">self</span>, q)</span></span>:\n        h = <span class="code-keyword">self</span>.__labels * np.log(q.T)\n        h = h.diagonal()\n        loss = <span class="code-keyword">self</span>.__flag * h * <span\n            class="code-keyword">self</span>.__e_loss / <span class="code-keyword">self</span>.__e_loss.shape[<span\n            class="hljs-number">0</span>]\n        <span class="code-keyword">return</span> loss\n\n    <span class="hljs-function"><span class="code-keyword">def</span> <span class="code-title">__optimizer</span><span\n            class="hljs-params">(<span class="code-keyword">self</span>, q, step)</span></span>:\n        d = ((<span class="code-keyword">self</span>.__flag * <span class="code-keyword">self</span>.__labels - <span\n            class="code-keyword">self</span>.__flag * q).getT() * <span\n            class="code-keyword">self</span>.__features) / <span class="code-keyword">self</span>.__features.shape[<span\n            class="hljs-number">0</span>]\n        <span class="code-keyword">self</span>.__weight = <span class="code-keyword">self</span>.__weight + (<span\n            class="code-keyword">self</span>.__flag * step) * d\n\n    <span class="hljs-function"><span class="code-keyword">def</span> <span class="code-title">train</span><span\n            class="hljs-params">(<span class="code-keyword">self</span>, handle, repeat=<span\n            class="hljs-number">2000</span>, step=<span class="hljs-number">0</span>.<span class="hljs-number">1</span>)</span></span>:\n        <span class="code-string">""</span><span class="code-string">"\n        训练\n        :param handle: 单轮训练的回调，用于输出各项数据 (count, loss, )\n        :param repeat: 重复的轮次,每轮会执行一次存储 2000\n        :param step: 优化器步近量\n        :return:\n        "</span><span class="code-string">""</span>\n        print(<span class="code-string">"Weight shape={}"</span>.format(<span class="code-keyword">self</span>.__weight.shape))\n        count = <span class="hljs-number">0</span>\n        <span class="code-keyword">while</span> count &lt; <span class="hljs-symbol">repeat:</span>\n            q = <span class="code-keyword">self</span>.__softmax()\n            loss = <span class="code-keyword">self</span>.__loss(q)\n            <span class="code-keyword">self</span>.__optimizer(q, step)\n            count = count + <span class="hljs-number">1</span>\n            handle(count, loss)\n</code></pre>\n<p>\n    类中的<code>__softmax</code>、<code>__loss</code>、<code>__optimizer</code>方法分别对应前面介绍的三步计算（归一化，损失函数，参数优化），而在<code>train</code>方法中就是重复调用这三个方法来不断的优化权重参数。<br>\n    为了执行训练<a href="https://github.com/chkui/ml-math-softmax/blob/master/sample/softmax_train/random_data.py"\n             target="_blank"\n             rel="nofollow"><code>sample.softmax_train.random_data.RandomData</code></a>用于随机生成<em>样本特征</em>和<em>样本标签</em>数据。<br>\n    下图展示了执行5000次优化过程中<strong>Loss</strong>的变化趋势：</p>\n<p><img alt="机器学习——softmax计算"\n        src="https://upload-images.jianshu.io/upload_images/2418406-b3452c5dfefc46a8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"\n        class="zoom-in-cursor"></p>\n<p>训练次数与损失函数的输出</p>\n<p><br> <strong>Count</strong>表示执行训练的次数，<strong>Loss</strong>表示损失函数的输出值，可以发现几个特点：</p>\n<p></p>\n<ol>\n    <li>在优化的过程中<em>Loss</em>是逐渐接近0的。</li>\n    <li>反复使用相同的样本（案例中随机生成了500个样本）优化器在前1000次有比较明显的效果，但是后续增长乏力。</li>\n</ol>\n<p>由于使用的是随机数据，所以收敛的效果并不太理想，但是总的趋势还是收敛。后续的博文中本人会使用MNIST之类的真实数据来测试验证softmax。</p>\n<p>Github的代码中除了<a href="https://github.com/chkui/ml-math-softmax/tree/master/sample/softmax_train" target="_blank"\n                  rel="nofollow"><code>softmax_train</code></a>用于演示训练和收敛的效果，还有<a\n        href="https://github.com/chkui/ml-math-softmax/tree/master/sample/softmax_estimator" target="_blank"\n        rel="nofollow"><code>softmax_estimator</code></a>和<a\n        href="https://github.com/chkui/ml-math-softmax/blob/master/sample/softmax_compute.py" target="_blank"\n        rel="nofollow"><code>softmax_compute</code></a>。前者提供了参数相关的磁盘操作，后者简单展示了softmax算法的编码实现，需要了解的可以到代码库中查看。</p>'}};