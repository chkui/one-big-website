import React from 'react'
const cn = require('classnames/bind').bind(require('./title.scss'))

const Title = props =>
    <h2 className={cn('title')}>{props.subject}</h2>

export default Title