exports.ids=[3],exports.modules={296:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}var o=n(101),a=r(o),u=n(0),l=r(u),c=n(302),i=r(c),f=n(332),d=r(f),s=n(339),p=n(13),h=n(40),m=(n(19).bind(n(362)),function(e){return l.default.createElement(i.default,{showType:p.ShowType.TOP,webMapType:h.WebMapType.ArticleMap},l.default.createElement(v,null))}),v=function(e){return l.default.createElement("div",null,s.homes.map(function(e){return l.default.createElement(d.default,(0,a.default)({key:e.url},e))}))};e.exports=m},298:function(e,t,n){e.exports={default:n(311),__esModule:!0}},299:function(e,t){e.exports="\t\n\v\f\r   ᠎             　\u2028\u2029\ufeff"},300:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getBrowserType=t.BrowserType=void 0;var r=n(9),o=t.BrowserType={Chrome:0,Firefox:1,Edge:2,IE:3,Safari:4,Opera:5,Other:99},a=(0,r.isServerEvn)()?o.Other:function(){var e=navigator.userAgent;return e.indexOf("Opera")>-1?o.Opera:e.indexOf("Firefox")>-1?o.Firefox:e.indexOf("Chrome")>-1?o.Chrome:e.indexOf("Safari")>-1?o.Safari:e.indexOf("compatible")>-1&&e.indexOf("MSIE")>-1&&!isOpera?o.IE:e.indexOf("Trident")>-1?o.Edge:o.Other}();t.getBrowserType=function(){return a}},301:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){this.storage=t,this.id=e,this.timerId=!1}Object.defineProperty(t,"__esModule",{value:!0}),t.cleanHistory=t.getHistory=t.pushHistory=void 0;var a=n(66),u=r(a),l=n(309),c=r(l),i=n(20),f=n(300),d=n(24),s=n(9),p=(0,d.flow)(!(0,s.isServerEvn)()).then(function(){return window.localStorage}).then(function(e){var t=e.history;return!!t&&JSON.parse(t)}).else(function(){return[]}),h=(t.pushHistory=function(e){var t=void 0;t=0===e.indexOf("/category/")?w:"/category"===e?x:0===e.indexOf("/article/")?M:"/about"===e?E:"/search"===e?S:"/"===e?O:T,p&&p.length>150&&h(),_(t(e))},t.getHistory=function(){return(0,d.flow)((0,s.isServerEvn)()).then(function(){return[]}).else(function(){var e=window.localStorage;return p.map(function(t){var n=e&&e[t.timeStamp];if(n){var r=(0,c.default)(n)-(0,c.default)(t.timeStamp);t.duration=m(Math.floor(r)/1e3)}else t.duration=!1;return t.time=y(t.timeStamp),t})})},t.cleanHistory=function(){return p=[],(0,d.flow)(window.localStorage).then(function(){return window.localStorage.clear()}).else(),p}),m=function(e){var t=Math.floor(e/3600),n=Math.floor((e-3600*t)/60),r=Math.floor(e-3600*t-60*n),o=r+"秒";return n&&(o=n+"分:"+r+"秒"),t&&(o=t+"时:"+n+"分:"+r+"秒"),o},v=(new Date).getFullYear(),y=function(e){var t=new Date(e),n=t.getFullYear();return v!==n?t.getFullYear()+"/"+b(t.getMonth()+1)+"/"+b(t.getDate())+" "+b(t.getHours())+":"+b(t.getMinutes())+":"+b(t.getSeconds()):t.getMonth()+1+"/"+b(t.getDate())+" "+b(t.getHours())+":"+b(t.getMinutes())+":"+b(t.getSeconds())},b=function(e){return 10>e?"0"+e:e},_=function(e){var t=new Date;e.browser=(0,f.getBrowserType)(),e.timeStamp=t.getTime(),g(e)},g=function(e){var t=0<p.length&&p[p.length-1],n=!0;t&&t.code===e.code&&1e5>e.timeStamp-t.timeStamp&&(n=!1),n?(p.push(e),k.push(e.timeStamp),(0,d.flow)(!(0,s.isServerEvn)()).then(function(){return window.localStorage}).then(function(e){return e.history=(0,u.default)(p)})):t&&k.push(t.timeStamp)},x=function(e){return{code:"categoryList",valid:!0,name:"内容分类",url:e}},w=function(e){return(0,d.flow)(e).then(function(e){return e.substr("/category/".length)}).then(function(e){return i.categoryTypeMap[e]}).then(function(t){return{code:"category",valid:!0,name:"内容分类 / "+t.name,url:e}}).else(function(){return T(e)})},M=function(e){return(0,d.flow)(e).then(function(e){return e.substr("/article/".length)}).then(function(e){return e.split("/")}).then(function(e){var t=void 0,n=void 0;return(0,d.flow)(e).then(function(){return 2===e.length}).then(function(){return t=i.categoryTypeMap[e[0]]}).then(function(){return i.categoryStructure[t.code]}).then(function(t){return n=t[e[1]]}).then(function(){return"文章 / "+t.name+" / "+n.subject}).else()}).then(function(t){return{code:"article",valid:!0,name:t,url:e}}).else(function(){return T(e)})},E=function(e){return{code:"about",valid:!0,name:"关于我们",url:e}},S=function(e){return{code:"home",valid:!0,name:"搜索",url:e}},O=function(e){return{code:"home",valid:!0,name:"首页",url:e}},T=function(e){return{code:"unknown",valid:!1,name:"未知页面"+e,url:e}},k=function(){function e(){}return e.prototype.push=function(e){var t=this;(0,d.flow)(!(0,s.isServerEvn)()).then(function(){return window.localStorage}).then(function(n){return t.ins&&t.ins.stop(),t.ins=new o(e,n)}).then(function(e){return e.run()}).else()},new e}();o.prototype.run=function(){var e=this;this.timerId=setInterval(function(){e.storage[e.id]=(new Date).getTime()},1e3)},o.prototype.stop=function(){this.storage[this.id]=(new Date).getTime(),clearInterval(this.timerId)}},302:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}var o=n(34),a=r(o),u=n(35),l=r(u),c=n(36),i=r(c),f=n(38),d=r(f),s=n(37),p=r(s),h=n(0),m=r(h),v=n(41),y=r(v),b=n(308),_=r(b),g=n(303),x=r(g),w=n(64),M=r(w),E=n(12),S=n(42),O=n(301),T=n(43),k=n(100),N=(n(19).bind(n(316)),(0,S.reRoute)()((0,E.connect)(function(){return{}},function(e,t){return{crumb:function(t,n){return e((0,T.headerShowAction)(t,n))},onScroll:function(t){return e((0,T.headerScrollAction)(t))},onWebType:function(t){return e((0,k.webMapTypeAction)(t))}}})(function(e){function t(){var e;(0,l.default)(this,t);for(var n=arguments.length,r=Array(n),o=0;o<n;o++)r[o]=arguments[o];var u=(0,d.default)(this,(e=t.__proto__||(0,a.default)(t)).call.apply(e,[this].concat(r))),c=u.props;return(0,O.pushHistory)(c.location.pathname),u}return(0,p.default)(t,e),(0,i.default)(t,[{key:"componentDidMount",value:function(){var e=this.props,t=e.disableHeaderShow,n=e.icon,r=e.breadcrumb,o=e.showType,a=e.webMapType;!t&&function(){e.crumb(n,r),o&&e.onScroll(o),a&&e.onWebType(a)}()}},{key:"render",value:function(){return m.default.createElement(M.default,{right:m.default.createElement(_.default,null)},this.props.children,m.default.createElement(x.default,null))}}]),t}(m.default.Component))));N.propTypes={webMapType:y.default.number},e.exports=N,e.exports.default=N},303:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=n(34),a=r(o),u=n(35),l=r(u),c=n(36),i=r(c),f=n(38),d=r(f),s=n(37),p=r(s),h=n(0),m=r(h),v=n(327),y=r(v),b=n(323),_=r(b),g=n(39),x=r(g),w=n(62),M=n(12),E=(n(9),n(13)),S=n(19).bind(n(317)),O=(0,M.connect)(function(e){return{showType:e.headerScrollReducer.showType,icon:e.headerShowReducer.icon,isLocal:e.initRunLocalEnvReducer.isLocal}})(function(e){function t(){var e;(0,l.default)(this,t);for(var n=arguments.length,r=Array(n),o=0;o<n;o++)r[o]=arguments[o];var u=(0,d.default)(this,(e=t.__proto__||(0,a.default)(t)).call.apply(e,[this].concat(r)));return u.handleClick=u.handleClick.bind(u),u}return(0,p.default)(t,e),(0,i.default)(t,[{key:"handleClick",value:function(){(0,_.default)("html,body").animate({scrollTop:0},1e3)}},{key:"render",value:function(){var e=this.props,t=e.icon;return e.isLocal?y.default.createPortal(m.default.createElement("div",{style:t&&t.color?{backgroundColor:t.color}:{},className:S("scroll",T(this.props.showType)),onClick:this.handleClick},m.default.createElement("span",{className:S("arrow")},m.default.createElement(x.default,{icon:w.faAngleUp}))),document.getElementById("modal-root")):null}}]),t}(m.default.Component)),T=function(e){return e===E.ShowType.TOP||e===E.ShowType.BREADCRUMBTOP?"a-hide":"a-show"};t.default=O,e.exports=t.default},304:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=n(34),a=r(o),u=n(35),l=r(u),c=n(36),i=r(c),f=n(38),d=r(f),s=n(37),p=r(s),h=n(65),m=r(h),v=n(0),y=r(v),b=n(323),_=r(b),g=n(12),x=n(24),w=n(20),M=n(13),E=n(19).bind(n(318)),S=function(e){var t=e.articleInfo;return(0,x.flow)(w.categoryStructure[t.category]).then(function(e){return e[t.id]}).then(function(e){return y.default.createElement(O,e)}).else(null)};t.default=(0,g.connect)(function(e){return{articleInfo:e.articleInfoReducer}})(S);var O=function(e){var t=e.index;return y.default.createElement("div",{className:E("articleIndex")},y.default.createElement(T,null),y.default.createElement("div",{className:E("wrapper")},y.default.createElement(k,{list:t})))},T=(0,g.connect)(function(e){return{showType:e.headerScrollReducer.showType}})(function(e){return y.default.createElement("div",{className:E("shell",M.ShowType.BREADCRUMBSCROLL===e.showType?"scroll":"top")})}),k=function e(t){return y.default.createElement("ul",{className:E("box")},function(){var n=[],r=!0,o=!1,a=void 0;try{for(var u,l=(0,m.default)(t.list);!(r=(u=l.next()).done);r=!0){var c=u.value;n.push(y.default.createElement(N,{key:c.id,id:c.id,name:c.name})),c.children&&n.push(y.default.createElement(e,{key:c.id+"-box",list:c.children}))}}catch(e){o=!0,a=e}finally{try{!r&&l.return&&l.return()}finally{if(o)throw a}}return n}())},N=function(e){function t(){var e;(0,l.default)(this,t);for(var n=arguments.length,r=Array(n),o=0;o<n;o++)r[o]=arguments[o];var u=(0,d.default)(this,(e=t.__proto__||(0,a.default)(t)).call.apply(e,[this].concat(r)));return u.onLocal=u.onLocal.bind(u),u}return(0,p.default)(t,e),(0,i.default)(t,[{key:"onLocal",value:function(){(0,_.default)("html,body").animate({scrollTop:(0,_.default)("#"+this.props.id).offset().top-50},1e3)}},{key:"render",value:function(){return y.default.createElement("li",{className:E("li")},y.default.createElement("a",{href:"javascript:void(0)",onClick:this.onLocal,className:E("anchor")},this.props.name,y.default.createElement(C,null)))}}]),t}(y.default.Component),C=(0,g.connect)(function(e){return{icon:e.headerShowReducer.icon}})(function(e){return y.default.createElement("div",{style:e.icon?{backgroundColor:e.icon.color}:{},className:E("line")})});e.exports=t.default},305:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=n(101),a=r(o),u=n(298),l=r(u),c=n(34),i=r(c),f=n(35),d=r(f),s=n(36),p=r(s),h=n(38),m=r(h),v=n(37),y=r(v),b=n(0),_=r(b),g=n(307),x=r(g),w=n(20),M=n(39),E=r(M),S=n(62),O=n(12),T=n(100),k=n(19).bind(n(320)),N=function(e){function t(){var e;(0,d.default)(this,t);for(var n=arguments.length,r=Array(n),o=0;o<n;o++)r[o]=arguments[o];var a=(0,m.default)(this,(e=t.__proto__||(0,i.default)(t)).call.apply(e,[this].concat(r)));return a.list=function(){var e=w.categoryStructure[a.props.id];return(0,l.default)(e).map(function(t){var n=e[t];return{subject:n.subject,shortSubject:n.shortSubject,url:n.url,category:n.category}})}(),a}return(0,y.default)(t,e),(0,p.default)(t,[{key:"render",value:function(){var e=this,t=this.props.articleMap[this.props.id],n=t.name,r=t.unfold,o=1.5*this.list.length;return _.default.createElement("div",{className:k("block")},_.default.createElement("div",{className:k("label"),onClick:function(){e.props.onFold(!r)}},_.default.createElement("div",{className:k("icon-box")},_.default.createElement("span",{className:k("icon")},_.default.createElement(E.default,{icon:r?S.faAngleDown:S.faAngleRight}))),_.default.createElement("div",{className:k("name-box")},_.default.createElement("h3",{className:k("name")},n))),_.default.createElement("ul",{style:{height:r?o+.1+"rem":0},className:k("list")},this.list.map(function(e){return _.default.createElement(x.default,(0,a.default)({key:e.url},e))})))}}]),t}(_.default.Component);t.default=(0,O.connect)(function(e,t){return{articleMap:e.articleMapReducer.articleMap}},function(e,t){return{onFold:function(n){return e((0,T.articleMapAction)(t.id,n))}}})(N),e.exports=t.default},306:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=n(298),a=r(o),u=n(34),l=r(u),c=n(35),i=r(c),f=n(36),d=r(f),s=n(38),p=r(s),h=n(37),m=r(h),v=n(0),y=r(v),b=n(305),_=r(b),g=n(12),x=n(19).bind(n(319)),w=function(e){function t(){return(0,i.default)(this,t),(0,p.default)(this,(t.__proto__||(0,l.default)(t)).apply(this,arguments))}return(0,m.default)(t,e),(0,d.default)(t,[{key:"render",value:function(){var e=(0,a.default)(this.props.articleMap);return y.default.createElement("div",{className:x("web-map")},y.default.createElement("div",{className:x("category")},e.map(function(e){return y.default.createElement(_.default,{key:e,id:e})})))}}]),t}(y.default.Component);t.default=(0,g.connect)(function(e){return{articleMap:e.articleMapReducer.articleMap}})(w),e.exports=t.default},307:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),o=function(e){return e&&e.__esModule?e:{default:e}}(r),a=n(63),u=n(12),l=n(19).bind(n(321)),c=function(e){return o.default.createElement("li",{className:l("item")},o.default.createElement(a.ArticleLink,{className:l("link"),category:e.category,url:e.url},e.shortSubject,o.default.createElement(i,null)))},i=(0,u.connect)(function(e){return{icon:e.headerShowReducer.icon}})(function(e){return o.default.createElement("div",{style:e.icon?{backgroundColor:e.icon.color}:{},className:l("line")})});t.default=c,e.exports=t.default},308:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=n(0),a=r(o),u=n(306),l=r(u),c=n(304),i=r(c),f=n(40),d=n(12),s=(n(19).bind(n(322)),function(e){switch(e.type){case f.WebMapType.ArticleMap:return a.default.createElement(l.default,null);case f.WebMapType.ArticleIndex:return a.default.createElement(i.default,null);case f.WebMapType.OwnerInfo:case f.WebMapType.None:default:return null}});t.default=(0,d.connect)(function(e){return{type:e.webMapTypeReducer.webMapType}})(s),e.exports=t.default},309:function(e,t,n){e.exports={default:n(310),__esModule:!0}},310:function(e,t,n){n(314),e.exports=n(1).Number.parseInt},311:function(e,t,n){n(315),e.exports=n(1).Object.keys},312:function(e,t,n){var r=n(2).parseInt,o=n(313).trim,a=n(299),u=/^[-+]?0[xX]/;e.exports=8!==r(a+"08")||22!==r(a+"0x16")?function(e,t){var n=o(String(e),3);return r(n,t>>>0||(u.test(n)?16:10))}:r},313:function(e,t,n){var r=n(4),o=n(44),a=n(14),u=n(299),l="["+u+"]",c="​",i=RegExp("^"+l+l+"*"),f=RegExp(l+l+"*$"),d=function(e,t,n){var o={},l=a(function(){return!!u[e]()||c[e]()!=c}),i=o[e]=l?t(s):u[e];n&&(o[n]=i),r(r.P+r.F*l,"String",o)},s=d.trim=function(e,t){return e=String(o(e)),1&t&&(e=e.replace(i,"")),2&t&&(e=e.replace(f,"")),e};e.exports=d},314:function(e,t,n){var r=n(4),o=n(312);r(r.S+r.F*(Number.parseInt!=o),"Number",{parseInt:o})},315:function(e,t,n){var r=n(45),o=n(25);n(102)("keys",function(){return function(e){return o(r(e))}})},316:function(e,t){e.exports={page:"_1Q1J48e9",content:"_1qO0DdXt",box:"Q_0XvFIr"}},317:function(e,t){e.exports={scroll:"_3p6EIz3_"}},318:function(e,t){e.exports={articleIndex:"_1CpqgFLh",shell:"Mc3_rMpE",top:"v2oUEof0",scroll:"_2Kc8w8Ny",wrapper:"_1AvIwKUL",box:"_3Ifcx1H6",li:"_1d26ZuXx",anchor:"_2y2U1GgZ",line:"_7JFyRBl1"}},319:function(e,t){e.exports={"web-map":"zA_Ni3zz",webMap:"zA_Ni3zz",menu:"ed56Pm9E",category:"_1E8Y_-sV","box-top":"u6apZKwS",boxTop:"u6apZKwS","box-bread-crumb-top":"_31kUqhGD",boxBreadCrumbTop:"_31kUqhGD","box-scroll":"RNtrKOwV",boxScroll:"RNtrKOwV","box-bread-crumb-scroll":"deLFFNKG",boxBreadCrumbScroll:"deLFFNKG"}},320:function(e,t){e.exports={label:"_2t2Yzf2M","name-box":"Ob4AB2RC",nameBox:"Ob4AB2RC",name:"Zjj-XDKY","icon-box":"rbLlGACx",iconBox:"rbLlGACx",icon:"_3V8AVmdZ",list:"VD9bwjBA","list-hide":"_1ntOdhgF",listHide:"_1ntOdhgF"}},321:function(e,t){e.exports={item:"_1YD5jxPN",link:"X2m5qvbz",line:"_1J_r90DF"}},322:function(e,t){e.exports={"web-map":"_2oeONyzL",webMap:"_2oeONyzL",menu:"_2Q9XaGwL",category:"_3B7DDQRo","box-top":"_1Crpj4zZ",boxTop:"_1Crpj4zZ","box-bread-crumb-top":"_1fZajroe",boxBreadCrumbTop:"_1fZajroe","box-scroll":"_35L30k3r",boxScroll:"_35L30k3r","box-bread-crumb-scroll":"_3AkxjlOl",boxBreadCrumbScroll:"_3AkxjlOl"}},331:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),o=function(e){return e&&e.__esModule?e:{default:e}}(r),a=n(19).bind(n(334)),u=function(e){return o.default.createElement("p",{className:a("des")},e.des)};t.default=u,e.exports=t.default},332:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=n(34),a=r(o),u=n(35),l=r(u),c=n(36),i=r(c),f=n(38),d=r(f),s=n(37),p=r(s),h=n(0),m=r(h),v=n(333),y=r(v),b=n(331),_=r(b),g=n(63),x=n(12),w=n(20),M=n(19).bind(n(335)),E=function(e){var t=e.category,n=t&&w.categoryTypeMap[t].name;return m.default.createElement("article",{className:M("text")},m.default.createElement("time",{className:M("time"),dateTime:e.publishTime},e.publishTime),m.default.createElement(S,{category:t},n),m.default.createElement(y.default,{subject:e.subject}),m.default.createElement("hr",{className:M("line")}),m.default.createElement(_.default,{des:e.des}),m.default.createElement(O,{category:t,url:e.url}))},S=(0,x.connect)(function(e){return{icon:e.headerShowReducer.icon}})(function(e){return m.default.createElement(g.CategoryLink,{rel:"category tag",category:e.category,style:e.icon?{backgroundColor:e.icon.color}:{},className:M("tip")},e.children)}),O=(0,x.connect)(function(e){return{icon:e.headerShowReducer.icon}})(function(e){function t(){var e;(0,l.default)(this,t);for(var n=arguments.length,r=Array(n),o=0;o<n;o++)r[o]=arguments[o];var u=(0,d.default)(this,(e=t.__proto__||(0,a.default)(t)).call.apply(e,[this].concat(r)));return u.state={over:!1},u.handleMouseOver=u.handleMouseOver.bind(u),u.handleMouseLeave=u.handleMouseLeave.bind(u),u}return(0,p.default)(t,e),(0,i.default)(t,[{key:"handleMouseOver",value:function(){this.setState({over:!0})}},{key:"handleMouseLeave",value:function(){this.setState({over:!1})}},{key:"render",value:function(){var e=this.state.over,t=this.props,n=T(t.icon);return m.default.createElement(g.ArticleLink,{category:t.category,url:t.url,style:e?n.over:n.leave,onMouseOver:this.handleMouseOver,onMouseLeave:this.handleMouseLeave,className:M("btn",e?"over":"leave")},"READ MORE")}}]),t}(m.default.Component)),T=function(e){return e?{over:{borderColor:e.color,color:e.color},leave:{borderColor:e.color,backgroundColor:e.color}}:{over:{},leave:{}}};t.default=E,e.exports=t.default},333:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),o=function(e){return e&&e.__esModule?e:{default:e}}(r),a=n(19).bind(n(336)),u=function(e){return o.default.createElement("h2",{className:a("title")},e.subject)};t.default=u,e.exports=t.default},334:function(e,t){e.exports={des:"_1GHWB4b9"}},335:function(e,t){e.exports={text:"DHdvb7T6",time:"_1eDpAPWU",tip:"_15_AuaYh",line:"_1YUc0jBs",btn:"_261CmcXP",leave:"hZXxv3Oo",over:"_176KMdop"}},336:function(e,t){e.exports={title:"_1vfhT4U7"}},339:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.homes=[n(124),n(123),n(122),n(119),n(118),n(117),n(116),n(115),n(114),n(113),n(112),n(111),n(121),n(110),n(109),n(108),n(107),n(106),n(120),n(125)]},362:function(e,t){}};