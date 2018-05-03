//解决服务器端没有ensure方法的问题，直接用源生的require替换
if (typeof require.ensure !== 'function') {
    require.ensure = function (dependencies, callback) {
        callback(require)
    }
}

const article = {
    subject: 'React 状态、事件与动态渲染',
    shortSubject: '状态、事件与渲染',
    en_subject: 'React: State,Event And Render',
    category:'react',
    tag:['ReactJS','React','JSX'],
    url: 'react_state_event_and_render',
    des: '在丰富的前端应用中，页面样式是时时刻刻会发生变化的。React通过状态和渲染叠加来控制他。本文除了介绍状态控制、单向数据流渲染以及事件触发之外，还会引入ES6封装React组件的方法。',
    count: 3663,
    index: [{id:'h1-1',name:'组件状态和生命周期',children:[{id:'h2-1',name:'用class替换function来创建一个组件'},{id:'h2-2',name:'向class中增加本地的state'},{id:'h2-3',name:'向类中增加事件方法（Lifecycle Methods）'},{id:'h2-4',name:'正确的使用state'},{id:'h2-5',name:'数据单向性'}]},{id:'h1-2',name:'事件处理'},{id:'h1-3',name:'根据条件渲染',children:[{id:'h2-6',name:'元素变量'},{id:'h2-7',name:'使用&&实现更紧凑的语法'},{id:'h2-8',name:'使用？：；三目表达式'},{id:'h2-9',name:'隐藏组件'}]}],
    page: (call) => {
        require.ensure([], require => {
            call(require("./page").content)
        }, 'react_state_event_and_render')
    },
    modifiedTime: '2018-4-23 19:05:28',
    publishedTime: '2018-4-23 19:05:28'
}

module.exports = article