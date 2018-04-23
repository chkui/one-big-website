import React from 'react'
import Page from '../components/page'
import BigListCard from '../components/bigListCard'
import {homes} from '../../data/home'
import {ShowType} from '../header/headerReducer'

const cn = require('classnames/bind').bind(require('./home.scss'))

const Home = props =>
    <Page showType={ShowType.TOP}>
        <List/>
    </Page>

const List = props =>
    <div>
        {homes.map(i => <BigListCard key={i.url} {...i} />)}
    </div>

module.exports = Home