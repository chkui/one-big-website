import React from 'react'
import Nav from './nav'
import withScroll from '../components/highOrder/withScroll'
import {connect} from 'react-redux'
import {ShowType} from './headerReducer'
import {headerScrollAction} from './headerAction'
import Breadcrumb from '../components/breadcrumb'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import Tag from '../components/tag'
const cn = require('classnames/bind').bind(require('./header.scss'))

const Header = connect(
    (state) => ({
        showType: state.headerScrollReducer.showType,
        show: state.headerShowReducer
    }),
    (dispatch, props) => ({
        onScroll: showType => dispatch(headerScrollAction(showType))
    })
)(withScroll()(
    class extends React.Component {
        constructor(...props) {
            super(...props)
            this.dev = null;
            this.handleScroll = this.handleScroll.bind(this)
            this.props.addListener(this.handleScroll)
        }

        handleScroll(top) {
            const dev = this.dev, {onScroll, showType, show} = this.props, breadcrumb = show.breadcrumb;
            if (dev) {
                let curShowType;
                if (top > dev.offsetTop + dev.offsetHeight) {
                    curShowType = breadcrumb ? ShowType.BREADCRUMBSCROLL : ShowType.SCROLL;
                } else {
                    curShowType = breadcrumb ? ShowType.BREADCRUMBTOP : ShowType.TOP;
                }
                showType !== curShowType && onScroll(curShowType);
            }
        }

        componentDidMount(){
        }

        render() {
            const props = this.props,
                show = props.show,
                icon = show.icon,
                breadcrumb = show.breadcrumb,
                style = icon && icon.color ? {style: {color: icon.color}} : {}
            return (
                <div className={cn('header-wrapper')}>
                    <div ref={(dev) => {
                        this.dev = dev
                    }} className={cn('header-box')}>
                        <div className={cn('annotation', ShowScroll[props.showType])}>
                            <header className={cn('header')}>
                                <div className={cn('header-left')}>
                                    {icon && getImg(style, icon.type, icon.img)}
                                </div>
                                <div className={cn('header-right')}>
                                    <Nav/>
                                </div>
                            </header>
                        </div>
                        {breadcrumb && <Breadcrumb subject={breadcrumb.title} routes={breadcrumb.routes}/>}
                    </div>
                </div>
            )
        }
    }
))

const getImg = (style, type, img) => {
    switch (type){
        case 'icon':
            return (<Tag.Icon className={cn('icon-img')} src={img}/>)
        case 'font':
            return (<span {...style}><FontAwesomeIcon icon={img}/></span>)
        case 'img':
        default:
            return (<img className={cn('icon-img')} src={img}/>);
    }
}

const ShowScroll = ['none',
    'top',
    'scroll',
    'breadcrumb-top',
    'breadcrumb-scroll'
]

module.exports = Header
module.exports.default = module.exports