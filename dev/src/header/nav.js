import React from 'react'
import {NavLink} from '../components/tag/a'
import {connect} from 'react-redux'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import {faHome, faIndent, faPlug, faSearch} from '@fortawesome/fontawesome-free-solid'
const cn = require('classnames/bind').bind(require('./nav.scss'))

const Nav = props =>
    <nav className={cn('nav')}>
        <ul className={cn('ul')}>
            <Li style={{width:'18px',height:'16px'}} title="网站首页" rel="home" to="/" name="首页" icon={faHome}/>
            <Li style={{width:'14px',height:'16px'}} title="技术分类" rel="category tag" to="/category" name="分类" icon={faIndent}/>
            <Li style={{width:'12px',height:'16px'}} title="关于作者" rel="nofollow" to="/about" name="关于" icon={faPlug}/>
            <Li style={{width:'16px',height:'16px'}} title="检索" rel="nofollow" to="/search" name="检索" icon={faSearch}/>
        </ul>
    </nav>

const Li = props =>
    <li className={cn('li')}>
        <NavLink rel={props.rel} title={props.title} className={cn('link')} url={props.to}>
            <p>
                <span style={props.style} className={cn('icon')}>
                    <FontAwesomeIcon icon={props.icon}/>
                </span>
                <span  className={cn('icon')}>
                    {props.name}
                </span>
            </p>
            <Hr/>
        </NavLink>
    </li>

const Hr = connect(
    (state) => ({
        icon: state.headerShowReducer.icon
    }),
)(props =>{
    const icon = props.icon,
        style = icon && icon.color ? {style:{backgroundColor:icon.color}}:{}
    return(<div {...style}/>)
})

export default Nav