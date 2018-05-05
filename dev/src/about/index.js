import React from 'react'
import Page from '../components/page'
import {ShowType} from "../../config/redux/headerReducer";
import {faWeixin, faTwitter, faFacebook,faGithub,faQq,faNpm,faOsi} from '@fortawesome/fontawesome-free-brands'
import Mail from './grid/mail'
import Svg from './grid/svg'
import OsChina from './grid/oschina'
import Pop from './grid/pop'
import HistoryList from '../components/info/historyList'
const cn = require('classnames/bind').bind(require('./about.scss'))

const About = props =>
    <Page breadcrumb={{title:'',routes:[{name: 'home', url: '/'}, {name: 'about', url: '/about'}]}} showType={ShowType.BREADCRUMBTOP}>
        <div className={cn('about')}>
            <h1 className={cn('h1')}>随风溜达的向日葵@</h1>
            <h2 className={cn('h2')}>——用自己的方式输出原创内容！</h2>
            <ul className={cn('ul')}>
                <Li><Mail /></Li>
                <Li>
                    <span className={cn('site')}>Site: </span>
                    <Svg className={cn('github')} to="https://github.com/chkui" icon={faGithub}/>
                    <Svg className={cn('npm')} to="https://www.npmjs.com/~chkui" icon={faNpm}/>
                    <OsChina />
                    <Pop icon={faWeixin} img="https://file.mahoooo.com/res/file/chk_wechat_me_2018_4_14.jpg" className={cn('weChat')}/>
                    <Pop icon={faQq} img="https://file.mahoooo.com/res/file/chk_qq_me_2018-4-14.jpg" className={cn('qq')}/>
                    <Svg className={cn('facebook')} to="https://zh-cn.facebook.com/people/向日葵/100025394923510" icon={faFacebook}/>
                </Li>
            </ul>
            <HistoryList />
        </div>
    </Page>

class Li extends React.Component{
    constructor(...props){
        super(...props)
        this.state = {show:false}
    }
    componentDidMount(){
        this.setState({show:true})
    }
    render(){
        return(<li className={cn('li', this.state.show ? 'li-show':'li-hide')}>{this.props.children}</li>)
    }
}



export default About