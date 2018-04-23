import React from 'react'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import {faEnvelope} from "@fortawesome/fontawesome-free-solid/index";
const cn = require('classnames/bind').bind(require('./grid.scss'))

const Mail = props =>
    <div className={cn('mail')}>
        <span className={cn('i-m', 'mail-cell')}>EMail:</span>
        <span className={cn('i-m', 'mail-cell')}>chenkui@chkui.com</span>
        <a className={cn('mail-link')} href="mailto:chenkui@chkui.com?subject=邮件标题&body=输入邮件内容">
            <span className={cn('i-m', 'cell')}><FontAwesomeIcon icon={faEnvelope}/></span>
        </a>
    </div>

export default Mail