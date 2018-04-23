import React from 'react'
import Page from '../components/page'
import Card from './card'
import {categoryTypeMap} from '../../data/category'
import {ShowType} from '../header/headerReducer'
const cn = require('classnames/bind').bind(require('./categoryList.scss'))

const react = categoryTypeMap.react
const nodeJs = categoryTypeMap.nodeJs
const CardList = [];
for(let key in categoryTypeMap){
    const item = categoryTypeMap[key];
    CardList.push(<Card key={item.code}
                        name={item.name}
                        des={item.des}
                        category={item.code}
                        icon={item.icon.img}
                        alt={item.alt}
                        color={item.icon.color}
                        iconType={item.icon.type}
    />)
}

const Category = props =>
    <Page showType={ShowType.TOP}>
        <ul className={cn('ul')}>
            {CardList.map(i=>i)}
        </ul>
    </Page>
module.exports = Category