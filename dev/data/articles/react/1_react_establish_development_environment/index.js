if (typeof require.ensure !== 'function') {
    require.ensure = function (dependencies, callback) {
        callback(require)
    }
}

const article = {
    subject: 'React 搭建开发环境',
    shortSubject: '搭建环境',
    image:'https://file.mahoooo.com/res/file/react_establish_development_environment_2.png',
    en_subject: 'React Establish Development Environment',
    category: 'react',
    tag: ['React', 'Nodejs'],
    url: 'react_establish_development_environment',
    keywords:'React,Nodejs,webpack,React教程,Jsx,ES6,ES2015,Javascript,脚手架工具',
    des: '本系列文章介绍了本人以及团队从无到有使用React的过程，我们将从Nodejs、webpack的环境搭建开始说起随后的内容会逐步深入到React的所有内容。工欲善必须利其器，想要高效的开发react，必须保证有一个高效有序的开发环境。我们使用的是Facebook开源的脚手架工具——webpack来搭建一个完全不依赖服务器的开发环境。实现高效集成、实时编辑可见、动态编译jsx和es6等强悍功能。',
    count: 3281,
    index:[{id:'h2-1',name:'React'},{id:'h2-2',name:'脚手架工具——webpack',children:[{id:'h3-1',name:'添加webpack'},{id:'h3-2',name:'测试运行webpack'},{id:'h3-3',name:'加载器'},{id:'h3-4',name:'使用配置管理'},{id:'h3-5',name:'丰富打包输出内容'},{id:'h3-6',name:'监听更新模式'},{id:'h3-7',name:'开发环境模式',children:[{id:'h4-1',name:'开发环境扩展——Linux下文件变化监控个数配置'},{id:'h4-2',name:'开发环境扩展——webstorm的坑'}]},{id:'h3-8',name:'输出调试信息'},{id:'h3-9',name:'webpack插件'}]},{id:'h2-3',name:'React开发',children:[{id:'h3-10',name:'安装必要的依赖工具'},{id:'h3-11',name:'完善本地开发环境命令'},{id:'h3-12',name:'终于可以开始码农的核心工作了'}]},{id:'h2-4',name:'React浏览器调试工具'}],
    page: (call) => {
        require.ensure([], require => {
            call(require("./page").content)
        }, 'react_establish_development_environment')
    },
    modifiedTime: '2018-4-23 18:12:11',
    publishedTime: '2018-4-23 18:12:11'
}

module.exports = article