import React from 'react'
import Page from '../components/page'
import BigListCard from '../components/bigListCard'
import HistoryInfo from '../components/info/historyInfo'
import {ShowType} from '../header/headerReducer'
import {connect} from 'react-redux'
import {loadCategoryAction} from './categoryAction'

const cn = require('classnames/bind').bind(require('./category.scss'))

const Category = connect(
    (state) => ({
        list: state.categoryTypeListReducer.list
    }),
    (dispatch, props) => ({
        onCategory: type => dispatch(loadCategoryAction(type, ShowType.BREADCRUMBTOP))
    }),
)(class extends React.Component {
    constructor(...props) {
        super(...props)
    }

    componentDidMount() {
        const props = this.props;
        !props.list && (() => {
            props.onCategory(props.match.params.type)
        })();
    }

    render() {
        const list = this.props.list;
        return (<Page disableHeaderShow>
            {list && (0 < list.length ? list.map(item => <BigListCard key={item.url} {...item} />) : (<EmptyInfo/>))}
        </Page>)
    }
})

const EmptyInfo = props =>
    <HistoryInfo subject="网页还在紧张准备中......"
                 info="网站内容还在紧张建设当中，敬请期待。"/>

module.exports = Category