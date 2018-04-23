import React from 'react'
import {NavLink} from "../tag/a"

const cn = require('classnames/bind').bind(require('./breadcrumb.scss'))

/**
 *
 * @param {object} props {
 *    subject:标题
 *    routs:[{name,url}]
 * }
 * @returns {*}
 * @constructor
 */
const Breadcrumb = props => {
    const liList = [], len = props.routes.length;
    let count = 0
    for (let route of props.routes) {
        liList.push(<li key={count} className={cn('li')}><NavLink url={route.url}>{route.name}</NavLink></li>)
        ++count < len && liList.push(<li key={`${count}block`} className={cn('li')}>/</li>)
    }
    return (
        <div className={cn('wrapper')}>
            <div className={cn('breadcrumb')}>
                <h2 className={cn('title')}>{props.subject}</h2>
                <div className={cn('ul-box')}>
                    <ul className={cn('ul')}>
                        {liList.map(i => i)}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Breadcrumb