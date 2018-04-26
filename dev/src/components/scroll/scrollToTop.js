import React from 'react'
import ReactDom from 'react-dom'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import {faAngleUp} from '@fortawesome/fontawesome-free-solid'
import {connect} from 'react-redux'
import {ShowType} from '../../header/headerReducer'
const cn = require('classnames/bind').bind(require('./scrollToTop.scss'))


const ScrollToTop = connect(
    (state) => ({
        showType: state.headerScrollReducer.showType,
        icon: state.headerShowReducer.icon
    }),
)(class extends React.Component {
    constructor(...props) {
        super(...props)
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(){
        0 !== window.scrollY && window.scrollTo(0, 0)
    }

    render() {
        return ReactDom.createPortal(
            (
                <div className={cn('scroll', getScrollCss(this.props.showType))} onClick={this.handleClick}>
                    <span className={cn('arrow')}>
                        <FontAwesomeIcon icon={faAngleUp}/>
                    </span>
                </div>)
            ,
            document.getElementById('modal-root')
        )
    }
});


const getScrollCss = showType => showType === ShowType.TOP || showType === ShowType.BREADCRUMBTOP ? 'a-hide' : 'a-show'

export default ScrollToTop