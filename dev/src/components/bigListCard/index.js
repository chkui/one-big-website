import React from 'react'
import Title from './title'
import Descr from './descr'
import {ArticleLink, CategoryLink} from '../tag/a'
import {Link} from 'pwfe-dom/router'
import {connect} from 'react-redux'
import {categoryTypeMap} from '../../../data/category'

const cn = require('classnames/bind').bind(require('./text.scss'))

/**
 * 纯文本组件,
 * props的参数结构必须要和article的内容匹配
 * @param {object} props {
 *      publishTime:发布时间
 *      category:所属栏
 *      categoryName:所属栏目编码名称
 *      subject:标题
 *      des:摘要描述
 *      url:内容链接
 * }
 * @returns {*}
 * @constructor
 */
const Text = props => {
    const category = props.category, categoryName = category && categoryTypeMap[category].name;
    return (
        <article className={cn('text')}>
            <time className={cn('time')} dateTime={props.publishTime}>{props.publishTime}</time>
            <Tip category={category}>{categoryName}</Tip>
            <Title subject={props.subject}/>
            <hr className={cn('line')}/>
            <Descr des={props.des}/>
            <Btn category={category} url={props.url}/>
        </article>
    )
}

/**
 * category:
 * children:
 */
const Tip = connect(
    (state) => {
        return {icon: state.headerShowReducer.icon};
    },
)(props => <CategoryLink rel="category tag"
                         category={props.category}
                         style={props.icon ? {backgroundColor: props.icon.color} : {}}
                         className={cn('tip')}>
    {props.children}</CategoryLink>)

/**
 * url
 * category
 */
const Btn = connect(
    (state) => {
        return {icon: state.headerShowReducer.icon};
    },
)(class extends React.Component {
    constructor(...props) {
        super(...props);
        this.state = {over: false};
        this.handleMouseOver = this.handleMouseOver.bind(this)
        this.handleMouseLeave = this.handleMouseLeave.bind(this)
    }

    handleMouseOver() {
        this.setState({over: true});
    }

    handleMouseLeave() {
        this.setState({over: false});
    }

    render() {
        const isOver = this.state.over,
            props = this.props,
            style = getStyle(props.icon);
        return (
            <ArticleLink category={props.category}
                         url={props.url}
                         style={isOver ? style['over'] : style['leave']}
                         onMouseOver={this.handleMouseOver}
                         onMouseLeave={this.handleMouseLeave}
                         className={cn('btn', isOver ? 'over' : 'leave')}>READ MORE</ArticleLink>
        )
    }
})

const getStyle = (icon) => {
    return icon ? {
        over: {borderColor: icon.color, color: icon.color},
        leave: {borderColor: icon.color, backgroundColor: icon.color}
    } : {over: {}, leave: {}}
}

export default Text