import React from 'react'
import Column3 from '../contain/column3'
import {NavLink} from "../tag/a"

const cn = require('classnames/bind').bind(require('./breadcrumb.scss'))

/**
 *
 * @param {object} props {
 *    subject:标题
 *    routs:[{title,name,url}]
 * }
 * @returns {*}
 * @constructor
 */
const Breadcrumb = props => {
    const liList = [], len = props.routes.length;
    let count = 0
    for (let route of props.routes) {
        liList.push(<li key={count} className={cn('li')}><NavLink title={route.title} url={route.url}>{route.name}</NavLink></li>)
        ++count < len && liList.push(<li key={`${count}block`} className={cn('li')}>/</li>)
    }
    return (
        <div className={cn('wrapper')}>
            <Column3 childrenClassName={cn('breadcrumb')}>
                <h2 className={cn('title', 'i-t')}>{props.subject}</h2>
                <div className={cn('ul-box', 'i-t')}>
                    <ul className={cn('ul')}>
                        {liList.map(i => i)}
                    </ul>
                </div>
            </Column3>
        </div>
    )
}

export default Breadcrumb