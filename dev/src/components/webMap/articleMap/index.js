import React from 'react'
import Block from './block'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import {connect} from 'react-redux'

const cn = require('classnames/bind').bind(require('./articleMap.scss'));

class WebMap extends React.Component{
    render(){
        const keys = Object.keys(this.props.articleMap);
        return (<div className={cn('web-map')}>
            <div className={cn('category')}>
                {keys.map(key=> <Block key={key} id={key}/>)}
            </div>
        </div>)
    }
}

export default connect(
    (state) => ({
        articleMap: state.articleMapReducer.articleMap
    }),
)(WebMap);