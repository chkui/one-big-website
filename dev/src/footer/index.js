import React from 'react'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import {faEnvelope} from '@fortawesome/fontawesome-free-solid'
import {connect} from 'react-redux'
import {ShowType} from '../header/headerReducer'

const cn = require('classnames/bind').bind(require('./footer.scss'))

const Footer = connect(
    (state) => ({
        showType: state.headerScrollReducer.showType,
        icon: state.headerShowReducer.icon
    }),
)(props => {
    const icon = props.icon,
        style = icon && icon.color ? {style: {backgroundColor: icon.color}} : {}
    return (<footer>
        <FooterComp style={style} className={cn('scroll', getScrollCss(props.showType))}/>
        <FooterComp style={style} className={cn('bottom', getBottomCss(props.showType))}/>
    </footer>)
})

/**
 *
 * @param props {object} {
 *    style:
 *    className:
 * }
 * @returns {*}
 * @constructor
 */
const FooterComp = props =>
    (<div {...props.style} className={cn('footer-wrapper', props.className)}>
            <div className={cn('footer')}>
                <Item>随风溜达的向日葵</Item>
                <Item>
                    <a rel="nofollow" className={cn('link')} href="http://www.miitbeian.gov.cn">粤ICP备15086789号</a>
                </Item>
            </div>
        </div>)

const Item = props =>
    <span className={cn(props.className, 'item')}>{props.children}</span>

const getScrollCss = showType => showType === ShowType.TOP || showType === ShowType.BREADCRUMBTOP ? 'scroll-hide' : ''
const getBottomCss = showType => showType === ShowType.TOP || showType === ShowType.BREADCRUMBTOP ? 'bottom-show' : 'bottom-hide'

module.exports = Footer
module.exports.default = module.exports