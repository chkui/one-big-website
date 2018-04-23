import React from 'react'
import PropTypes from 'prop-types';

const cn = require('classnames/bind').bind(require('./innerPop.scss'))

/**
 *
 * @param props {props} {
 *     show:
 *     img:
 * }
 * @returns {*}
 * @constructor
 */
const InnerPop = props =>
    <div className={cn('inner-pop', props.show ? 'show' : 'hide')}>
        <div className={cn('img-box')}>
            <img className={cn('img')} src={props.img}/>
        </div>
        <div className={cn('arrow')}/>
    </div>

InnerPop.propTypes = {
    show: PropTypes.bool,
    img: PropTypes.string
}

export default InnerPop