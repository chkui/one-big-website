import React from 'react'
const cn = require('classnames/bind').bind(require('./descr.scss'))

const Descr = props =>
    <p className={cn('des')}>{props.des}</p>

export default Descr