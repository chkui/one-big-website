import React from 'react'
import Page from '../components/page'
import {ShowType} from '../../config/redux/headerReducer'
import HistoryInfo from '../components/info/historyInfo'
const cn = require('classnames/bind').bind(require('./error404.scss'))

const Error404 = props =>
    <Page breadcrumb={{title:'',routes:[{name: 'home', url: '/'}, {name: '404', url: '/404error'}]}} showType={ShowType.BREADCRUMBTOP}>
        <HistoryInfo subject="您访问的页面外出旅游去了......" info="请选择历史记录回到已有网页！"/>
    </Page>

module.exports = Error404