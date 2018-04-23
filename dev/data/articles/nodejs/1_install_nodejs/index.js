if (typeof require.ensure !== 'function') {
    require.ensure = function (dependencies, callback) {
        callback(require)
    }
}

const article = {
    subject: '安装NodeJs运行环境',
    shortSubject: '安装NodeJs',
    image:'https://file.mahoooo.com/res/file/react_establish_development_environment_2.png',
    en_subject: 'Install NodeJs Runtime Environment',
    category: 'nodeJs',
    tag: ['Nodejs'],
    url: 'install_nodejs_runtime_environment',
    keywords:'Nodejs,Nodejs安装,Npm',
    des: '要用一样东西之前，当然是要先安装环境。Nodejs的安装网上一搜一大把，这里记录windows、linux、以及ubuntu apt-get的安装方式，方便在工作中快速查阅。',
    count: 1600,
    index: [{id:'h2-1',name:'Niubility的Nodejs'},{id:'h2-2',name:'学习基础'},{id:'h2-3',name:'安装Nodejs',children:[{id:'h3-1',name:'windows'},{id:'h3-2',name:'linux'},{id:'h3-3',name:'Apt安装Nodejs'},{id:'h3-4',name:'验证安装结果'},{id:'h3-5',name:'运行一个Nodejs程序'}]}],
    page: (call) => {
        require.ensure([], require => {
            call(require("./page").content)
        }, 'install_nodejs_runtime_environment')
    },
    modifiedTime: '2018-4-20 17:44:23',
    publishedTime: '2018-4-20 17:44:23'
}

module.exports = article