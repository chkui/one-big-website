import React from 'react'
import Item from './item'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import {faAngleRight, faAngleDown} from '@fortawesome/fontawesome-free-solid'
const cn = require('classnames/bind').bind(require('./block.scss'))

/**
 * props {categoryName, articles:[{id,url,name,title}]}
 */
class Block extends React.Component{
    constructor(...props){
        super(...props)
        this.height = this.props.articles.length * 1.5;
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
}

export default Block