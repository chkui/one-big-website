// @flow
import * as React from 'react'
import Page from '../components/page'
import BigListCard from '../components/bigListCard'
import {homes} from '../../data/home'
import {ShowType} from '../header/headerReducer'
const cn = require('classnames/bind').bind(require('./home.scss'))

const Home = (props: void) =>(<Page showType={ShowType.TOP}><List attr={1}/></Page>)

const List = (props: {attr: number}) => (
    <div>
        {homes.map(i => <BigListCard key={i.url} {...i} />)}
    </div>)

module.exports = Home