import React from 'react'
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import InnerPop from './pop/innerPop'

const cn = require('classnames/bind').bind(require('./grid.scss'));

class Pop extends React.Component {
    constructor(...props){
        super(...props)
        this.state = {show:false}
        this.handleOver = this.handleOver.bind(this);
        this.handleLeave = this.handleLeave.bind(this);
    }

    handleOver(){
        this.setState({show:true})
    }

    handleLeave(){
        this.setState({show:false})
    }

    render() {
        const props = this.props;
        return (
            <a className={cn('link', 'pop', props.className)}
               onMouseOver={this.handleOver}
               onMouseLeave={this.handleLeave}
               href="javascript:void(0)">
                    <FontAwesomeIcon className={cn('icon')} icon={props.icon}/>
                <InnerPop show={this.state.show} img={props.img}/>
            </a>
        )
    }
}

Pop.propTypes = {
    className: PropTypes.string,
    img: PropTypes.string
}

export default Pop