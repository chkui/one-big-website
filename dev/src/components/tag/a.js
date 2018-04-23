import React from 'react'
import PropTypes from 'prop-types';
import {Link} from 'pwfe-dom/router'
import {isServerEvn} from 'pwfe-dom/util'
import {connect} from 'react-redux'
import {initRunLocalAction} from '../../appAction'
import {getArticleUrl, getCategoryUrl, getNavUrl} from '../../../config/url'

/**
 * 文章跳转标签,使用时传递数据注意数据突变问题，数据需要整体更新。发生突变不会变更。
 * @param {object} props {
 *     category:
 *     url:
 * }
 * @constructor
 */
export const ArticleLink = props => {
    const attr = Object.assign(getArticleUrl(props.category, props.url), props);
    delete attr.category;
    delete attr.url;
    return (<LinkComponent {...attr}/>)
}
ArticleLink.propTypes = {
    category: PropTypes.string,
    url: PropTypes.string
}

/**
 * 获取分类页面跳转标签,使用时传递数据注意数据突变问题，数据需要整体更新。发生突变不会变更。
 * @param props
 * @constructor
 */
export const CategoryLink = props => {
    const attr = Object.assign(getCategoryUrl(props.category), props);
    delete attr.category;
    return (<LinkComponent {...attr}/>)
}
CategoryLink.propTypes = {
    category: PropTypes.string
}

/**
 *
 * @param {object} props {
 *     url:
 * }
 * @constructor
 */
export const NavLink = props => {
    const attr = Object.assign(getNavUrl(props.url), props);
    delete attr.url;
    return (<LinkComponent {...attr}/>)
}


let _Timer = 0;
/**
 * host
 * local
 * @type {{}}
 */
const LinkComponent = connect(
    (state) => ({
        isLocal: state.initRunLocalEnvReducer.isLocal,
    }),
    (dispatch, props) => ({
        onLocalEnv: isLocal => dispatch(initRunLocalAction(isLocal))
    }),
)(class extends React.Component {
    constructor(...props) {
        super(...props)
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.props !== nextProps && Compare(this.props, nextProps)
    }

    componentDidMount() {
        const _foo = this.props.onLocalEnv;
        !isServerEvn() !== this.props.isLocal && !_Timer && (() => {
            _Timer = setTimeout(() => {
                _foo(true);
                clearTimeout(_Timer);
            }, 2000);
        })();
    }

    render() {
        const props = this.props,
            attr = Object.assign({}, props);
        return props.isLocal ? LinkBuilder(attr) : Abuilder(attr);
    }
})

const LinkBuilder = (attr) => {
    const children = attr.children;
    attr.to = attr.client;
    delete attr.dispatch;
    delete attr.initIsLocal;
    delete attr.server;
    delete attr.client;
    delete attr.target;
    delete attr.rel;
    delete attr.isLocal;
    delete attr.onLocalEnv;
    return (<Link {...attr}>{children}</Link>)
}
const Abuilder = (attr) => {
    const children = attr.children;
    delete attr.children
    attr.href = attr.server;
    delete attr.dispatch;
    delete attr.initIsLocal;
    delete attr.server;
    delete attr.client;
    delete attr.isLocal;
    delete attr.onLocalEnv;
    return (<a {...attr}>{children}</a>)
}

const Compare = (cur, next) => {
    for (let key in cur) {
        if (cur.hasOwnProperty(key) && cur[key] !== next[key]) return true;
    }
}