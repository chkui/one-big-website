import React from 'react'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import {faOsi} from "@fortawesome/fontawesome-free-brands/index";
const cn = require('classnames/bind').bind(require('./grid.scss'));

const OsChina = props =>
    (<a className={cn('link', 'osi')} target="_blank" href="https://my.oschina.net/chkui/blog">
        <span><FontAwesomeIcon className={cn('icon', 'fa-rotate-270')} icon={faOsi}/></span>
    </a>);

export default OsChina