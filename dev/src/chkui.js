/**
 * Created by chkui on 2017/6/9.
 */
import React from 'react'
import entry from 'pwfe-dom/entry'
import reducer from '../config/reducer'
import routes from '../config/clientRoutes'
import Header from './header/'
import Footer from './footer'
import './chkui.css'

entry({
    reducer: reducer,
    routes: routes,
    header: <Header />,
    footer: <Footer />
})


