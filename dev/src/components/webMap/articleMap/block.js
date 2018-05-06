import React from 'react'
import Item from './item'
import {categoryStructure} from '../../../../data/category'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import {faAngleRight, faAngleDown} from '@fortawesome/fontawesome-free-solid'
import {connect} from 'react-redux'
import {articleMapAction} from "../../../../config/redux/webMapAction";

const cn = require('classnames/bind').bind(require('./block.scss'))

/**
 * props {id, name, list:[{subject,shortSubject,url}], unfold}
 */

class Block extends React.Component{
    constructor(...props){
        super(...props)
        this.list = (()=>{
            const articleObjs = categoryStructure[this.props.id]
            return Object.keys(articleObjs).map(
                i=>{
                    const item = articleObjs[i];
                    return {
                        subject: item.subject,
                        shortSubject: item.shortSubject,
                        url: item.url,
                        category: item.category
                    }
                }
            );
        })()
    }

    render(){
        const {name, unfold} = this.props.articleMap[this.props.id],
            height = this.list.length * 1.5;
        return (
            <div className={cn('block')}>
                <div className={cn('label')} onClick={()=>{this.props.onFold(!unfold)}}>
                    <div className={cn('icon-box')}>
                        <span className={cn('icon')}>
                            <FontAwesomeIcon icon={unfold ? faAngleDown : faAngleRight}/>
                        </span>
                    </div>
                    <div className={cn('name-box')}><h3 className={cn('name')}>{name}</h3></div>
                </div>
                <ul style={{height: unfold ? `${height + .1}rem` : 0}} className={cn('list')}>
                    {this.list.map(i => <Item key={i.url} {...i} />)}
                </ul>
            </div>
        )
    }
}

export default connect(
    (state, props) => ({
        articleMap: state.articleMapReducer.articleMap
    }),
    (dispatch, props) => ({
        onFold: unfold => dispatch(articleMapAction(props.id, unfold))
    })
)(Block);

/*class Block extends React.Component{
    constructor(...props){
        super(...props)
        this.height = this.props.list.length * 1.5;
        this.state = {fold:true};
        this.handleFoldClick = this.handleFoldClick.bind(this);
    }

    handleFoldClick() {
        this.setState((prevState, props) => ({
            fold: !prevState.fold
        }));
    }

    render(){
        const {categoryName, articles} = this.props;
        return (
            <div className={cn('block')}>
                <div className={cn('label')} onClick={this.handleFoldClick}>
                    <div className={cn('icon-box')}>
                        <span className={cn('icon')}>
                            <FontAwesomeIcon icon={this.state.fold ? faAngleRight : faAngleDown}/>
                        </span>
                    </div>
                    <div className={cn('name-box')}><h3 className={cn('name')}>{categoryName}</h3></div>
                </div>
                <ul style={{height:this.state.fold ? 0 : `${this.height}rem`}} className={cn('list')}>
                    {articles.map(i=><Item key={i.id} {...i} />)}
                </ul>
            </div>
        )
    }
}*/

