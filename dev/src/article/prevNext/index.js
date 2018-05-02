import React from 'react'
import {connect} from 'react-redux'
import {getArticlePrevNext} from '../../../data/category'
import {ArticleLink} from '../../components/tag/a'

const cn = require('classnames/bind').bind(require('./prevNext.scss'))

const PrevNext = props => {
    const {category, id} = props, prevNext = getArticlePrevNext(category, id);
    return prevNext ? (
        <div className={cn('prev-next')}>
            <div className={cn('i-m', 'left')}>
                {prevNext.prev && (<ArticleLink className={cn('link')} category={category}
                                                url={prevNext.prev.url}>上一篇<span className={cn('subject')}>：{prevNext.prev.subject}</span></ArticleLink>)}
            </div>
            <div className={cn('i-m', 'right')}>
                {prevNext.next && (<ArticleLink className={cn('link')} category={category}
                                                url={prevNext.next.url}>下一篇<span className={cn('subject')}>：{prevNext.next.subject}</span></ArticleLink>)}
            </div>
        </div>) : null
}

export default PrevNext