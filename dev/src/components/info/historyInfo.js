import React from 'react'
import PropTypes from 'prop-types';
import HistoryList from './historyList'

const cn = require('classnames/bind').bind(require('./historyInfo.scss'));

/**
 *
 * @param props {object} {
 *    subject:
 *    info:
 * }
 * @returns {*}
 * @constructor
 */
const HistoryInfo = props => {
    return (
        <div className={cn('history-info')}>
            <h1 className={cn('header')}>{props.subject}</h1>
            <p className={cn('info')}>{props.info}</p>
            <HistoryList/>
        </div>
    )
}

HistoryInfo.propTypes  = {
    subject:PropTypes.string,
    info:PropTypes.string
}

export default HistoryInfo