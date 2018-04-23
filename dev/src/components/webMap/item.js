import React from 'react'
import {ArticleLink} from '../tag/a'
import {connect} from 'react-redux'

const cn = require('classnames/bind').bind(require('./item.scss'))

/**
 * props {url, name}
 */
const Item = props =>
    <li className={cn('item')}>
        <ArticleLink className={cn('link')} category={props.category} url={props.url}>
            {props.name}
            <Hr/>
        </ArticleLink>
    </li>

const Hr = connect(
    (state) => ({
        icon: state.headerShowReducer.icon
    }),
)(props => <div style={props.icon ? {
    backgroundColor: props.icon.color
} : {}} className={cn('line')}/>)

export default Item