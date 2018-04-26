import React from 'react'
import Block from './block'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import {faAngleDoubleRight, faAngleDoubleLeft} from '@fortawesome/fontawesome-free-solid'
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
        super(...props);
        this.state = {show: false};
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState((prevState, props) => ({
            show: !prevState.show
        }));
    }

    render() {
        const show = this.state.show;
        return (
            <div className={cn('web-map')}>
                <Box/>
                <Menu img={show ? faAngleDoubleRight : faAngleDoubleLeft} onClick={this.handleClick}/>
                <div className={cn('category', this.state.show ? 'show' : 'hide')}>
                    {categoryList.map(i => <Block key={i.key}{...i}/>)}
                </div>
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

/**
 * img
 */
const Menu = connect(
    (state) => ({
        icon: state.headerShowReducer.icon
    }),
)(props => {
    const icon = props.icon;
    return (
        <div style={icon && icon.color ? {backgroundColor: icon.color} : {}}
             className={cn('menu')} onClick={props.onClick}>
            <FontAwesomeIcon icon={props.img}/>
        </div>)
});

const show = ['box-scroll',
    'box-top',
    'box-scroll',
    'box-bread-crumb-top',
    'box-bread-crumb-scroll'
]

export default WebMap