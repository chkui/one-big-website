/**
 * Created by chkui on 2017/6/9.
 * 路由配置表
 */
//解决服务器端没有ensure方法的问题，直接用源生的require替换
if (typeof require.ensure !== 'function') {
    require.ensure = function (dependencies, callback) {
        callback(require)
    }
}

//路由配置
export default [{//首页
    id: "home",
    url: "/",
    component: (call) => {
        require.ensure([], require => {
            call(require("../src/home"))
        }, 'home')
    }
}, {//内容
    id: "article",
    url: "/article/:category/:id",
    component: (call) => {
        require.ensure([], require => {
            call(require("../src/article"))
        }, 'article')
    }
}, {//分类页面
    id: "categoryList",
    url: "/category",
    component: (call) => {
        require.ensure([], require => {
            call(require("../src/categoryList"))
        }, 'categoryList')
    }
}, {//分类详情页面
    id: "category",
    url: "/category/:type",
    component: (call) => {
        require.ensure([], require => {
            call(require("../src/category"))
        }, 'category')
    },
    renderRule: true
}, {//关于
    id: "about",
    url: "/about",
    component: (call) => {
        require.ensure([], require => {
            call(require("../src/about"))
        }, 'about')
    },
    renderRule: true,
}, {
    id: "search",
    component: (call) => {
        require.ensure([], require => {
            call(require("../src/search"))
        }, 'search')
    }
}, {
    id: "error404",
    component: (call) => {
        require.ensure([], require => {
            call(require("../src/error/error404"))
        }, 'error404')
    }
}];