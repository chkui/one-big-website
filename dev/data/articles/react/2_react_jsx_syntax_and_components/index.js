//解决服务器端没有ensure方法的问题，直接用源生的require替换
if (typeof require.ensure !== 'function') {
    require.ensure = function (dependencies, callback) {
        callback(require)
    }
}

const article = {
    subject: 'React JSX语法与组件',
    shortSubject: 'JSX语法与组件',
    en_subject: 'React: Jsx Syntax and Component',
    category:'react',
    tag:['React'],
    url: 'react_jsx_syntax_and_components',
    keywords:'React,React教程,Jsx,Javascript,React组件',
    des: 'JSX的语法是一种JavaScript的扩展。在React中使用JSX描述一个UI是什么样子的，就好像HTML告诉浏览器我们看到的页面是什么样子。最开始接触JSX时会感觉它很像一种模板语言，但是除了提供模板能力之外，他拥有JavaScript所有的能力。JSX用于产生React的组件，React最大的魅力就是能将页面通过组件划分成许多小区块，然后分而治之。',
    count: 3046,
    index: [{id:'h1-1',name:'JSX基础介绍',children:[{id:'h2-1',name:'JSX对象'}]},{id:'h1-2',name:'渲染React元素',children:[{id:'h2-2',name:'将一个元素渲染成为Dom'},{id:'h2-3',name:'更新已被渲染的元素'},{id:'h2-4',name:'React只执行必要的更新'}]},{id:'h1-3',name:'组件与属性',children:[{id:'h2-5',name:'使用函数或类声明组件'},{id:'h2-6',name:'渲染一个组件'},{id:'h2-7',name:'组件组合'},{id:'h2-8',name:'抽象提取组件'},{id:'h2-9',name:'属性（props）只读'}]}],
    page: (call) => {
        require.ensure([], require => {
            call(require("./page").content)
        }, 'react_jsx_syntax_and_components')
    },
    modifiedTime: '2018-4-23 18:59:39',
    publishedTime: '2018-4-23 18:59:39'
}

module.exports = article