import React from 'react'
import ReactDom from 'react-dom'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import {faAngleUp} from '@fortawesome/fontawesome-free-solid'
import {connect} from 'react-redux'
import {isServerEvn} from 'pwfe-dom/util'
import {ShowType} from '../../header/headerReducer'

const cn = require('classnames/bind').bind(require('./scrollToTop.scss'))


const ScrollToTop = connect(
    (state) => ({
        showType: state.headerScrollReducer.showType,
        icon: state.headerShowReducer.icon,
        isLocal: state.initRunLocalEnvReducer.isLocal
    }),
)(class extends React.Component {
    constructor(...props) {
        super(...props)
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        0 !== window.scrollY && window.scrollTo(0, 0)
    }

    render() {
        const {icon, isLocal} = this.props;
        return isLocal ? ReactDom.createPortal(
            (
                <div style={icon && icon.color ? {backgroundColor: icon.color} : {}}
                     className={cn('scroll', getScrollCss(this.props.showType))} onClick={this.handleClick}>
                    <span className={cn('arrow')}>
                        <FontAwesomeIcon icon={faAngleUp}/>
                    </span>
                </div>)
            ,
            document.getElementById('modal-root')
        ) : null
    }
});


const getScrollCss = showType => showType === ShowType.TOP || showType === ShowType.BREADCRUMBTOP ? 'a-hide' : 'a-show'

export default ScrollToTop