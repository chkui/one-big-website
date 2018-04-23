import React from 'react'
import Page from '../components/page'
import {ShowType} from '../header/headerReducer'
import Content from './content'
import Related from './related'
import PrevNext from './prevNext'
import {headerBreadcrumbAction, headerScrollAction} from "../header/headerAction";
import {loadArticle} from './articleAction'
import {connect} from 'react-redux'

const cn = require('classnames/bind').bind(require('./article.scss'))

/**
 * 页面现实组件
 *
 **/
const Article = connect(
    (state) => ({
        arts: state.articleInfoReducer
    }),
    (dispatch, props) => ({
        onArts: (category, id) => dispatch(loadArticle(category, id, ShowType.BREADCRUMBTOP))
    }),
)(class extends React.Component {
    constructor(...props) {
        super(...props);
    }

    componentDidMount() {
        !this.props.articles && (() => {
            const {category, id} = this.props.match.params;
            this.props.onArts(category, id);
        })()
    }

    render() {
        const arts = this.props.arts;
        return (
            <Page disableHeaderShow>
                <Content count={arts.count} html={arts.page}/>
                <PrevNext {...arts} />
                <Related {...arts}/>
            </Page>
        )
    }
})

module.exports = Article;