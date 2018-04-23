import React from 'react'
import {connect} from 'react-redux'
import {categoryStructure, getRelated} from '../../../data/category'
import {ArticleLink} from '../../components/tag/a'

const cn = require('classnames/bind').bind(require('./related.scss'))

class Related extends React.Component {
    render() {
        const {category, id} = this.props,
            list = getRelated(category, id, 5);
        return list && list.length > 0 ? (
            <div className={cn('related')}>
                <h1 className={cn('title')}>更多阅读</h1>
                <ul className={cn('ul')}>{list.map(i => (
                    <li className={cn('li')} key={i.url}>
                        <ArticleLink className={cn('link')} category={i.category} url={i.url}>
                            {i.subject}
                        </ArticleLink>
                    </li>))}
                </ul>
            </div>
        ):null;
    }
}

export default Related