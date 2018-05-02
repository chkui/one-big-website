if (typeof require.ensure !== 'function') {
    require.ensure = function (dependencies, callback) {
        callback(require)
    }
}

const article = {
    subject: 'Ubuntu 修改分辨率',
    shortSubject: 'Ubuntu修改分辨率',
    image:'',
    en_subject: 'Ubuntu: Modify View Port By Xrandr',
    category: 'linux',
    tag: ['Linux'],
    url: 'ubuntu_modify_view_port_by_xrandr',
    keywords:'ubuntu,xrandr,分辨率',
    des: '在将Ubuntu升级到17.0.4之后，突然出现了显示器无法识别，分辨率最高只能到1024的情况。本文将介绍通过Xrandr调整分辨率的方法。',
    count: 1333,
    index: [{id:'h2-1',name:'常规方法'},{id:'h2-2',name:'遇到的问题',children:[{id:'h3-1',name:'问题一，xrand命令指针对当前用户'},{id:'h3-2',name:'问题二，最后一步输出 xrandr: Configure crtc 0 failed'}]},{id:'h2-3',name:'永久性问题'}],
    page: (call) => {
        require.ensure([], require => {
            call(require("./page").content)
        }, 'ubuntu_modify_view_port_by_xrandr')
    },
    modifiedTime: '2018-5-2 11:14:20',
    publishedTime: '2018-5-2 11:14:20'
}

module.exports = article