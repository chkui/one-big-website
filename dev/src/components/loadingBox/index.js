import React from 'react'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import {faSpinner} from '@fortawesome/fontawesome-free-solid'
import {connect} from 'react-redux'

const cn = require('classnames/bind').bind(require('./loadingBox.scss'))

/**
 *
 * @param {object} props {
 *    isFixed:false
 *    className
 * }
 * @returns {*}
 * @constructor
 */
const LoadingBox = connect(
    (state) => ({
        icon: state.headerShowReducer.icon
    }),
)(props => {
    const icon = props.icon,
        style = icon && icon.color ? {style: {color: icon.color}} : {};
    return (
        <div style={style} className={cn('loading-box', props.className)}>
            <div className={cn('mask')}/>
            <FontAwesomeIcon className={cn('icon')} pulse icon={faSpinner}/>
        </div>)
})

export default LoadingBox