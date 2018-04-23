import React from 'react'
import LoadingBox from '../../components/loadingBox'
import 'full-rich-text-process/style.css'
const cn = require('classnames/bind').bind(require('./content.scss'))

/**
 *
 * @param {object} props {
 *     count: 字数
 *     html: 富文本
 * }
 * @returns {*}
 * @constructor
 */

const Content = props =>
    <div className={cn('content')}>
        <div className={cn('count')}>全文共 {props.count} 个字</div>
        {props.html && (<div className={cn("chk-content-body")}>
            {props.html && (<div className={cn("chk-content-inner")} dangerouslySetInnerHTML={{__html:props.html}} />)}
        </div>)}
        <LoadingBox className={cn('loading', props.html? 'hide':'show')}/>
    </div>

export default Content