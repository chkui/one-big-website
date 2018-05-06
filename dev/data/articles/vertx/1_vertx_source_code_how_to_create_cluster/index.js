if (typeof require.ensure !== 'function') {
    require.ensure = function (dependencies, callback) {
        callback(require)
    }
}

const article = {
    subject: 'Vert.x 如何创建集群',
    shortSubject: '如何创建集群',
    image: 'https://file.mahoooo.com/res/file/react_establish_development_environment_2.png',
    en_subject: 'Vert.x: How To Create Cluster',
    category: 'vertx',
    tag: ['Vertx', 'Java'],
    url: 'vertx_source_code_how_to_create_cluster',
    keywords: 'Vertx,Vertx教程,Java,Cluster',
    des: '作为Java生态中一款性能非常优异的Web框架，Vert.x自打面世以来就被码友们追捧。他能快速组建无主节点的集群、能基于异步轮询模型创建高效的响应机制、并且还支持JavaScript、Groovy、Ruby等语言。本文将会从源码的角度介绍Vert.x如何创建一个集群。',
    count: 1295,
    index: [{id: 'h2-1', name: '集群创建'}, {id: 'h2-2', name: '新建集群过程'}],
    page: (call) => {
        require.ensure([], require => {
            call(require("./page").content)
        }, 'vertx_source_code_how_to_create_cluster')
    },
    modifiedTime: '2018-5-6 01:36:11',
    publishedTime: '2018-5-6 01:36:11'
}

module.exports = article