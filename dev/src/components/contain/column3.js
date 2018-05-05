import React from 'react'
import PropTypes from 'prop-types';
const cn = require('classnames/bind').bind(require('./column3.scss'))

/**
 * 3列布局容器
 * @param props {{
 *     left 左侧容器
 *     children 中间容器
 *     right 右侧容器
 *     className 全局样式
 *     leftClassName 左侧容器样式
 *     childrenClassName 中间容器样式
 *     rightClassName 右侧容器样式
 * }}
 * @constructor
 */
const Column3 = props =>
    (<div className={cn('column3', props.className)}>
        <div className={cn('left', 'i-t', props.leftClassName)}>{props.left}</div>
        <div className={cn('center', 'i-t', props.childrenClassName)}>{props.children}</div>
        <div className={cn('right', 'i-t', props.rightClassName)}>{props.right}</div>
    </div>);

Column3.propTypes = {
    left: PropTypes.node,
    center: PropTypes.array,
    right: PropTypes.node,
    className: PropTypes.string,
    leftClassName: PropTypes.string,
    childrenClassName: PropTypes.string,
    rightClassName: PropTypes.string
};

export default Column3