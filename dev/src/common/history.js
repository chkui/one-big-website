import {categoryStructure, categoryTypeMap} from '../../data/category'
import {getBrowserType} from './browser'
import {flow} from './flow'
import {isServerEvn} from 'pwfe-dom/util'

let _History = flow(!isServerEvn()) //{valid:[true,false],name: url:}
    .then(() => window.localStorage)
    .then(storage => {
        const local = storage.history;
        return local ? JSON.parse(local) : false;
    })
    .else(() => []);
const _CategoryListStr = '/category',
    _Category = '/category/',
    _Article = '/article/',
    _About = '/about',
    _Home = '/';

/**
 * 增加浏览历史
 * @param url 页面内容
 */
export const pushHistory = (url) => {
    let foo
    if (0 === url.indexOf(_Category)) {//分类汇总页面
        foo = parseCategory;
    } else if (_CategoryListStr === url) {//分类详情页面
        foo = parseCategoryList;
    } else if (0 === url.indexOf(_Article)) {//文章页面
        foo = parseArticle;
    } else if (_About === url) {
        foo = parseAbout
    } else if (_Home === url) {//首页
        foo = parseHome;
    } else {
        foo = parasUnknown;
    }
    push(foo(url));
};

/**
 * 获取历史浏览列表
 * @returns {Array}
 */
export const getHistory = () => {
    return flow(isServerEvn()).then(() => [])
        .else(() => {
            const storage = window.localStorage;
            return _History.map(i => {
                const timeLen = storage && storage[i.timeStamp];
                if (timeLen) {
                    const duration = Number.parseInt(timeLen) - Number.parseInt(i.timeStamp);
                    i.duration = getDuration(Math.floor(duration) / 1000)
                } else {
                    i.duration = false
                }
                i.time = getTime(i.timeStamp);
                return i
            });
        });
}

export const cleanHistory = () => {
    _History = [];
    flow(window.localStorage).then(() => window.localStorage.clear()).else()
    return _History;
}

//private
//get duration Format
const getDuration = (duration) => {
    const hours = Math.floor(duration / 3600),
        minutes = Math.floor((duration - hours * 3600) / 60),
        seconds = Math.floor(duration - hours * 3600 - minutes * 60);
    let ret = `${seconds}秒`;
    minutes && (ret = `${minutes}分:${seconds}秒`)
    hours && (ret = `${hours}时:${minutes}分:${seconds}秒`)
    return ret
}
const CurrentFullYear = new Date().getFullYear()
const getTime = (timeStamp) => {
    const date = new Date(timeStamp),
        year = date.getFullYear();
    if (CurrentFullYear !== year) {
        return `${date.getFullYear()}/${p_t(date.getMonth() + 1)}/${p_t(date.getDate())} ${p_t(date.getHours())}:${p_t(date.getMinutes())}:${p_t(date.getSeconds())}`
    } else {
        return `${date.getMonth() + 1}/${p_t(date.getDate())} ${p_t(date.getHours())}:${p_t(date.getMinutes())}:${p_t(date.getSeconds())}`;
    }
};
const p_t = month => 10 > month ? `0${month}` : month

//push history to local
const push = obj => {
    const date = new Date();
    obj.browser = getBrowserType();
    obj.timeStamp = date.getTime();
    pushLocal(obj)
}
const pushLocal = obj => {
    const perObj = 0 < _History.length && _History[_History.length - 1];
    let isPush = true;
    (perObj && (perObj.code === obj.code && 100000 > obj.timeStamp - perObj.timeStamp)) && (isPush = false)
    if (isPush) {
        _History.push(obj);
        timer.push(obj.timeStamp)
        flow(!isServerEvn()).then(() => window.localStorage).then(store => store.history = JSON.stringify(_History))
    } else {
        perObj && timer.push(perObj.timeStamp)
    }
}
//end push history to local
const parseCategoryList = (url) => {
    return {
        code: 'categoryList',
        valid: true,
        name: '内容分类',
        url,
    }
};

const parseCategory = (url) => {
    return flow(url)
        .then(url => url.substr(_Category.length))
        .then(categoryType => categoryTypeMap[categoryType])
        .then(category => ({
            code: 'category',
            valid: true,
            name: `内容分类 / ${category.name}`,
            url
        }))
        .else(() => parasUnknown(url))
};

const parseArticle = (url) => {
    return flow(url)
        .then(url => url.substr(_Article.length))
        .then(srt => srt.split('/'))
        .then(cat_art => {
            let category, article;
            return flow(cat_art)
                .then(() => 2 === cat_art.length)
                .then(() => category = categoryTypeMap[cat_art[0]])
                .then(() => categoryStructure[category.code])
                .then(categoryType => article = categoryType[cat_art[1]])
                .then(() => `文章 / ${category.name} / ${article.subject}`)
                .else()
        })
        .then(name => ({
            code: 'article',
            valid: true,
            name,
            url
        }))
        .else(() => parasUnknown(url));
};

const parseAbout = (url) => {
    return {
        code: 'about',
        valid: true,
        name: '关于我们',
        url
    }
};

const parseHome = (url) => {
    return {
        code: 'home',
        valid: true,
        name: '首页',
        url
    }
};

const parasUnknown = (url) => {
    return {
        code: 'unknown',
        valid: false,
        name: `未知页面${url}`,
        url
    }
};

//browser timer
const timer = (() => {
    function Class() {
    }

    Class.prototype.push = function (id) {
        const _this = this;
        flow(!isServerEvn())
            .then(() => window.localStorage)
            .then(storage => {
                _this.ins && _this.ins.stop();
                return _this.ins = new Timer(id, storage)
            }).then(ins => ins.run()).else();
    };
    return new Class();
})();

function Timer(id, storage) {
    this.storage = storage;
    this.id = id;
    this.timerId = false;
}

Timer.prototype.run = function () {
    const _this = this;
    this.timerId = setInterval(() => {
        _this.storage[_this.id] = new Date().getTime();
    }, 1000);
};
Timer.prototype.stop = function () {
    this.storage[this.id] = new Date().getTime();
    clearInterval(this.timerId);
};
//end browser timer