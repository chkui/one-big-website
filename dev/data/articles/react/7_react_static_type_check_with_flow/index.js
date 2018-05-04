//解决服务器端没有ensure方法的问题，直接用源生的require替换
if (typeof require.ensure !== 'function') {
    require.ensure = function (dependencies, callback) {
        callback(require)
    }
}

const article = {
    subject: 'React Flow代码静态检查',
    shortSubject: 'Flow代码静态检查',
    en_subject: 'React: Static Type Check With Flow',
    category: 'react',
    tag: ['ReactJS', 'React', 'JSX'],
    url: 'react_static_type_check_with_flow',
    des: '上一篇文章已经介绍了通过React的PropTypes对象对组件传入的参数进行限定和检查，除此之外还可以使用Flow来检查JavaScript代码以及Jsx语法存在的问题。Flow面向的是静态类型检查，可以将其融入到项目测试、发布的流程中去。',
    count: 2967,
    index: [{id: 'h2-1', name: 'Flow'}, {id: 'h2-2', name: '将Flow增加到我们的项目中'}, {
        id: 'h2-3',
        name: '编译之后的代码移除Flow相关的语法',
        children: [{id: 'h3-1', name: 'Create React App'}, {id: 'h3-2', name: 'Babel'}, {id: 'h3-3', name: '其他方式'}]
    }, {id: 'h2-4', name: '运行Flow'}, {id: 'h2-5', name: '增加Flow注解'}, {
        id: 'h2-6',
        name: 'React组件参数检查',
        children: [{id: 'h3-4', name: 'Props参数检查'}, {id: 'h3-5', name: '增加对State的检查'}, {
            id: 'h3-6',
            name: '组件默认值'
        }, {id: 'h3-7', name: '函数类型的组件'}, {id: 'h3-8', name: 'React事件、子组件、高阶组件检查扩展'}, {
            id: 'h3-9',
            name: '类型检查扩展'
        }, {id: 'h3-10', name: 'React数据类型参考'}]
    }, {id: 'h2-7', name: '遇到的一些问题'}, {id: 'h2-8', name: '写在最后的使用心得'}],
    page: (call) => {
        require.ensure([], require => {
            call(require("./page").content)
        }, 'react_static_type_check_with_flow')
    },
    modifiedTime: '2018-5-4 23:42:10',
    publishedTime: '2018-5-4 23:42:10'
}

module.exports = article