//解决服务器端没有ensure方法的问题，直接用源生的require替换
if (typeof require.ensure !== 'function') {
    require.ensure = function (dependencies, callback) {
        callback(require)
    }
}

const article = {
    subject: 'React prop类型检查与Dom',
    shortSubject: 'prop类型检查与Dom',
    en_subject: 'React: Type checking With Proptypes And Dom Element',
    category: 'react',
    tag: ['ReactJS', 'React', 'JSX'],
    url: 'react_typechecking_with_proptypes_and_dom_element',
    des: '随着应用规模的增长以及参与开发的人员越来越多，组件模块之间相互调用出现的BUG的情况会呈指数级别的增长，这时我们可以引入传递参数的检测与限定机制来减轻这个问题。React提供了Props参数检查的机制，通过这个机制我们可以限定使用者在使用组件时的传递参数。此外React提供了refs机制用于直接获取真实Dom或者子组件的实例。',
    count: 1870,
    index: [{id: 'h3-1', name: '使用PropTypes进行类型检查'}, {
        id: 'h3-2',
        name: 'React.PropTypes',
        children: [{id: 'h4-1', name: '限定至少接收一个子元素'}, {id: 'h4-2', name: '设定props默认值'}]
    }, {
        id: 'h3-3',
        name: 'Refs和真实Dom',
        children: [{id: 'h4-3', name: '什么时候需要使用Refs'}, {id: 'h4-4', name: '将Ref添加到Dom元素中'}, {
            id: 'h4-5',
            name: '给class组件增加一个Ref属性'
        }, {id: 'h4-6', name: '给Function声明的组件设定Refs'}, {id: 'h4-7', name: '切勿过度使用Refs特性'}, {id: 'h4-8', name: '*使用警告'}]
    }],
    page: (call) => {
        require.ensure([], require => {
            call(require("./page").content)
        }, 'react_typechecking_with_proptypes_and_dom_element')
    },
    modifiedTime: '2018-5-4 14:20:10',
    publishedTime: '2018-5-4 14:20:10'
}

module.exports = article