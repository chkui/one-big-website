import React from 'react'
import {Link} from 'pwfe-dom/router'
import {getHistory, cleanHistory} from '../../common/history'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import {faEye} from '@fortawesome/fontawesome-free-solid'
import {faClock, faTrashAlt} from '@fortawesome/fontawesome-free-regular'
import {faSafari, faChrome, faInternetExplorer, faEdge, faFirefox} from '@fortawesome/fontawesome-free-brands'
import {BrowserType} from '../../common/browser'
import {connect} from 'react-redux'

const cn = require('classnames/bind').bind(require('./historyList.scss'));

/**
 *
 * @param props {object} {
 *    subject:
 *    info:
 * }
 * @returns {*}
 * @constructor
 */
class HistoryList extends React.Component {
    constructor(...props) {
        super(...props)
        this.history = getHistory();
        this.handleClean = this.handleClean.bind(this)
    }

    handleClean() {
        this.history = cleanHistory();
        this.forceUpdate();
    }

    render() {
        const history = this.history;
        return (
            <div className={cn('history-list')}>
                {history && 0 < history.length && (
                    <div>
                        <div className={cn('info')}>
                            <span className={cn('i-m', 'left')}><h3 className={cn('h3')}>站内浏览历史记录:</h3></span>
                            <span className={cn('i-m', 'right')} onClick={this.handleClean}>
                                <span className={cn('right-icon')}>
                                    <FontAwesomeIcon icon={faTrashAlt}/>
                                </span>清除列表
                            </span>
                        </div>
                        <ul className={cn('history')}>
                            {history.reverse().map(i => <Item key={i.timeStamp}{...i}/>)}
                        </ul>
                    </div>)}
            </div>
        )
    }
}

/**
 *
 * @param props
 * @returns {*}
 * @constructor
 */
const Item = props =>
    (
        <li className={cn('row')}>
            <Link className={cn('link')} to={props.url}>
                <Cell className={cn('page')} icon={getBrowserIcon(props.browser)}>{props.name}</Cell>
                <Cell className={cn('time')} icon={faClock}>{props.time}</Cell>
                <Cell className={cn('duration')} icon={faEye}>{props.duration}</Cell>
                <Hr/>
            </Link>
        </li>
    )

const Hr = connect(
    (state) => ({
        icon: state.headerShowReducer.icon
    }),
)(props => <div style={props.icon ? {
    backgroundColor: props.icon.color
} : {}} className={cn('line')}/>)

const getBrowserIcon = type => {
    switch (type) {
        case BrowserType.Chrome:
            return faChrome;
        case BrowserType.Firefox:
            return faFirefox;
        case BrowserType.Edge:
            return faEdge;
        case BrowserType.Safari:
            return faSafari;
        default:
            return faInternetExplorer
    }
}

const Cell = props =>
    props.children && (
        <div className={cn('i-m', props.className)}>
            <span className={cn('icon')}>
                <FontAwesomeIcon icon={props.icon}/>
            </span>
            {props.children}
        </div>
    )

export default HistoryList