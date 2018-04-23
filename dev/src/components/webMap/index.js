import React from 'react'
import Block from './block'
import {categoryStructure, categoryTypeMap} from '../../../data/category'
import {connect} from 'react-redux'

const cn = require('classnames/bind').bind(require('./webMap.scss'));

const categoryList = [];
for (let key in categoryStructure) {
    const block = {key, categoryName: categoryTypeMap[key].name},
        structure = categoryStructure[key],
        articles = [];
    for (let innerKey in structure) {
        const article = structure[innerKey];
        articles.push({id: innerKey, category: article.category, url: article.url, name: article.shortSubject})
    }
    block.articles = articles;
    categoryList.push(block);
}

class WebMap extends React.Component {
    constructor(...props) {
        super(...props)
    }

    render() {
        return (
            <div className={cn('web-map')}>
                <Box/>
                {categoryList.map(i => <Block key={i.key}{...i}/>)}
            </div>
        )
    }
}

const Box = connect(
    (state) => ({
        showType: state.headerScrollReducer.showType
    }),
)(props => {
    return (<div className={cn(show[props.showType])}/>)
});

const show = ['box-scroll',
    'box-top',
    'box-scroll',
    'box-bread-crumb-top',
    'box-bread-crumb-scroll'
]

export default WebMap