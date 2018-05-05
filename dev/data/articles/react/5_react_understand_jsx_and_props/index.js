//解决服务器端没有ensure方法的问题，直接用源生的require替换
if (typeof require.ensure !== 'function') {
    require.ensure = function (dependencies, callback) {
        callback(require)
    }
}

const article = {
    subject: 'React 深入说明JSX语法与Props特性',
    shortSubject: 'JSX语法与Props特性',
    en_subject: 'React: Understand Jsx And Props Features',
    category: 'react',
    tag: ['ReactJS', 'React', 'JSX'],
    url: 'react_understand_jsx_and_props',
    keywords:'React,React教程,React参数,Props,Jsx',
    des: 'Jsx语法（JavaScript XML）和React组件的结合将整个UI分割成许多松耦合、独立、可复用并且每个部分都自持数据的“模块”。这些“模块”就像类一样，通过“接口”实现与其他组件的交互。本文将介绍React如何通过Jsx和Props特性来实现组件的功能。',
    count: 2703,
    index: [{
        id: 'h3-1',
        name: 'JSX说明',
        children: [{id: 'h4-1', name: 'React组件的作用域'}, {id: 'h4-2', name: 'React的作用域'}, {
            id: 'h4-3',
            name: '利用点号“.”来引用组件'
        }, {id: 'h4-4', name: '用户定义的组件首字母必须大写'}, {id: 'h4-5', name: '在运行时确定类型'}]
    }, {
        id: 'h3-2',
        name: '使用Prop传递JSX参数',
        children: [{id: 'h4-6', name: 'JavaScript表达式'}, {id: 'h4-7', name: '字符串文字'}, {
            id: 'h4-8',
            name: 'Prop参数默认为"True"'
        }, {id: 'h4-9', name: '属性扩展传递（Spread 特性）'}]
    }, {
        id: 'h3-3',
        name: 'JSX中的子标签',
        children: [{id: 'h4-10', name: '传递字符串'}, {id: 'h4-11', name: 'JSX的子元素'}, {
            id: 'h4-12',
            name: 'JavaScript表达式作为子元素'
        }, {id: 'h4-13', name: 'Function作为子元素'}, {id: 'h4-14', name: 'Booleans, Null, and Undefined被忽略'}]
    }],
    page: (call) => {
        require.ensure([], require => {
            call(require("./page").content)
        }, 'react_understand_jsx_and_props')
    },
    modifiedTime: '2018-5-3 14:06:28',
    publishedTime: '2018-5-3 14:06:28'
}

module.exports = article