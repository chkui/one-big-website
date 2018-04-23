import qqMeImg from './icon/chk_qq_me_2018-4-14.jpg'
import weChatMeImg from './icon/chk_wechat_me_2018_4_14.jpg'
import hazelcastLogo from './icon/hazelcast-logo.svg'
import nginxLogo from './icon/nginx-logo.svg'
import springLogo from './icon/spring-logo.svg'
import tensorflowLogo from './icon/tensorflow-logo.svg'
import vertxLogo from './icon/vertx-logo.png'

/**
 * 必须区别业务图片和图标的差异。
 * 图标是一些固定的小图片，由开发人员嵌入到页面中。一般我们通过Tag.Icon标签转换成base64来使用
 * 图片由用于上传，一般比较大。一般我们通过Tag.Img标签直接引入外部路径来使用。
 */

/**
 * 全局图标。
 * 使用说明：
 *
 * //首先通过import在这里引入图标
 * import myImg from './img/myImg.svg'
 *
 * //然后将引入的图标设定到img对象中
 * const img = {
 *    //其他图标.....
 *    myImg:myImg
 * }
 *
 * //在业务代码中通过Tag.Icon标签来使用图标
 * import Tag from 'component/tag'
 * <Tag.Icon src="myImg" />
 *
 * @type {{}}
 */
const img = {
    'qqMeImg':qqMeImg,
    'weChatMeImg':weChatMeImg,
    'hazelcastLogo':hazelcastLogo,
    'nginxLogo':nginxLogo,
    'springLogo':springLogo,
    'tensorflowLogo':tensorflowLogo,
    'vertxLogo':vertxLogo
}

module.exports = img

//window && (window["__REN__ECE"] = img);//模拟css等效果，将图片输出到全局||||||| .r4434
