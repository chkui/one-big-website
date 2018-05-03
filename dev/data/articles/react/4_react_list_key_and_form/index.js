//解决服务器端没有ensure方法的问题，直接用源生的require替换
if (typeof require.ensure !== 'function') {
    require.ensure = function (dependencies, callback) {
        callback(require)
    }
}

const article = {
    subject: 'React 列表、键值与表单',
    shortSubject: '列表、键值与表单',
    en_subject: 'React: Lists,Keys And Forms',
    category:'react',
    tag:['ReactJS','React','JSX'],
    url: 'react_list_key_and_form',
    des: '所有的WEB页面都可以粗略分为2个大类——列表与表单。无论是官网、企业级应用、商城，页面的组织形式都是列表+表单。react对列表和表单的实现延伸了单向数据流的精髓。为了配合对比渲染算法，还增加了一个与业务相关的key属性。本文将介列表、表单的应用方式。',
    count: 2203,
    index: [{id:'h1-1',name:'列表与组件的键值',children:[{id:'h2-1',name:'渲染多个组件'},{id:'h2-2',name:'基于列表的组件'},{id:'h2-3',name:'键值的使用'},{id:'h2-4',name:'使用键值扩展组件'},{id:'h2-5',name:'键值需要与兄弟节点保证唯一'},{id:'h2-6',name:'将map()方法嵌入到JSX中'}]},{id:'h1-2',name:'表单',children:[{id:'h2-7',name:'受控组件'},{id:'h2-8',name:'textarea标签'},{id:'h2-9',name:'select标签'},{id:'h2-10',name:'受控组件的替代方案'}]}],
    page: (call) => {
        require.ensure([], require => {
            call(require("./page").content)
        }, 'react_list_key_and_form')
    },
    modifiedTime: '2018-5-3 11:05:28',
    publishedTime: '2018-5-3 11:05:28'
}

module.exports = article