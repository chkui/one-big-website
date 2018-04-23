import React from 'react'
import WebMap from '../webMap'
import {connect} from 'react-redux'
import {reRoute} from 'pwfe-dom/router'
import {pushHistory} from '../../common/history'
import {headerShowAction, headerScrollAction} from "../../header/headerAction";

const cn = require('classnames/bind').bind(require('./page.scss'));

/**
 * @Param props{
 *      breadcrumb {title:[string], routes:[{name, url}]}，
 *      icon: {img,color,type},
 *      showType:[headerReducer.ShowType]
 *      disableHeaderShow:[boolean]
 * }
 */
const Page = reRoute()(connect(
    () => ({}),
    (dispatch, props) => ({
        crumb: (icon, breadcrumb) => dispatch(headerShowAction(icon, breadcrumb)),
        onScroll: showType => dispatch(headerScrollAction(showType))
    })
)(class extends React.Component {
    constructor(...props) {
        super(...props)
        const params = this.props;
        pushHistory(params.location.pathname)
    }

    componentDidMount() {
        const props = this.props,
            {disableHeaderShow, icon, breadcrumb, showType} = props;
        !disableHeaderShow && (()=>{
            props.crumb(icon, breadcrumb);
            showType && props.onScroll(showType);
        })();
    }

    render() {
        return (<main className={cn('page')}>
            <div className={cn('box')}/>
            <div className={cn('content')}>
                {this.props.children}
            </div>
            <div className={cn('box')}><WebMap/></div>
        </main>)
    }
}))
module.exports = Page
module.exports.default = Page