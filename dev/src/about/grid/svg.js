import React from 'react'
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
const cn = require('classnames/bind').bind(require('./grid.scss'));

/**
 *
 * @param {object} props {
 *      icon
 *      className:
 *      iconClassName:
 * }
 * @returns {*}
 * @constructor
 */
const Svg = props =>
    (<a target="_blank" className={cn('link', props.className)} href={props.to}><FontAwesomeIcon className={cn('icon')} icon={props.icon}/></a>);

Svg.propTypes = {
    className: PropTypes.string
}

export default Svg