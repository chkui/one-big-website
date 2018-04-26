import React from 'react'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import Tag from '../components/tag'
import {CategoryLink} from '../components/tag/a'

const cn = require('classnames/bind').bind(require('./card.scss'))

/**
 *
 * @param props {object} {
 *    color:
 *    icon:
 *    name:
 *    des:
 *    category:
 *    iconType:
 * }
 * @constructor
 */
const Card = props =>
    <li className={cn('i-m', 'card-box')}>
        <CategoryLink rel="category tag" category={props.category} className={cn('card')}>
            <div style={props.color ? {color: props.color} : {}} className={cn('i-m', 'icon-box')}>
                <span className={cn('icon')}>
                    {showComponent(props.iconType, props.icon, props.alt)}
                </span>
            </div>
            <div className={cn('i-m', 'info-box')}>
                <h3>{props.name}</h3>
                <p>{props.des}</p>
            </div>
        </CategoryLink>
    </li>

const showComponent = (type, icon, alt) =>{
    switch (type){
        case 'img':
            return (<Tag.Img className={cn('i-m','icon-img')} alt={alt} src={icon}/>);
        case 'icon':
            return (<Tag.Icon className={cn('i-m','icon-img')} alt={alt} src={icon}/>);
        case 'font':
        default:
            return (<FontAwesomeIcon title={alt} icon={icon}/>);
    }
}

export default Card