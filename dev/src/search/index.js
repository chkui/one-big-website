import React from 'react'
import Page from '../components/page'
import HistoryInfo from '../components/info/historyInfo'
import {ShowType} from '../../config/redux/headerReducer'
const cn = require('classnames/bind').bind(require('./search.scss'));

const Search = props =>
    <Page showType={ShowType.TOP}>
        <HistoryInfo subject="网页还在紧张准备中......"
                     info="网站内容还在紧张建设当中，敬请期待。"/>
    </Page>

module.exports = Search