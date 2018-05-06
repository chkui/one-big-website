if (typeof require.ensure !== 'function') {
    require.ensure = function (dependencies, callback) {
        callback(require)
    }
}

const article = {
    subject: 'Vert.x 解析MongDB配置',
    shortSubject: '解析MongDB配置',
    image: 'https://file.mahoooo.com/res/file/react_establish_development_environment_2.png',
    en_subject: 'Vert.x: Mongdb Config',
    category: 'vertx',
    tag: ['Vertx', 'Java'],
    url: 'vertx_source_mongdb_config',
    keywords: 'Vertx,Vertx教程,Java,MongDB',
    des: 'Vert.x 完全按照开箱即用（out of box）的方式进行架构，需要使用某一项功能时，只要使用Maven或其他包管理工具引入即可。本文将从源码的角度介绍Vert.x 如何引入、创建、并将自己的事件驱动接口和MongDB结合在一起。',
    count: 2014,
    index: [{id:'h2-1',name:'调用堆栈'},{id:'h2-2',name:'实现过程'},{id:'h2-3',name:'总结'}],
    page: (call) => {
        require.ensure([], require => {
            call(require("./page").content)
        }, 'vertx_source_mongdb_config')
    },
    modifiedTime: '2018-5-6 22:36:11',
    publishedTime: '2018-5-6 22:36:11'
}

module.exports = article