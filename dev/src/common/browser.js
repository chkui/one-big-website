import {isServerEvn} from 'pwfe-dom/util'

/**
 * 浏览器类型枚举
 * @type {{Chrome: number, Firefox: number, Edge: number, IE: number, Safari: number, Opera: number, Other: number}}
 */
export const BrowserType = {
    Chrome: 0,
    Firefox: 1,
    Edge: 2,
    IE: 3,
    Safari: 4,
    Opera: 5,
    Other: 99
}

const currentType = isServerEvn() ? BrowserType.Other : (() => {
    const userAgent = navigator.userAgent
    if (userAgent.indexOf("Opera") > -1) {//判断是否Opera浏览器
        return BrowserType.Opera
    } else if (userAgent.indexOf("Firefox") > -1) {//判断是否Firefox浏览器
        return BrowserType.Firefox
    } else if (userAgent.indexOf("Chrome") > -1) {//判断是否chorme浏览器
        return BrowserType.Chrome
    } else if (userAgent.indexOf("Safari") > -1) { //判断是否Safari浏览器
        return BrowserType.Safari
    } else if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
        return BrowserType.IE;
    } else if (userAgent.indexOf("Trident") > -1) {
        return BrowserType.Edge;
    } else {
        return BrowserType.Other;
    }
})();

/**
 * 获取浏览器类型，返回一个枚举变量
 * @returns {BrowserType}
 */
export const getBrowserType = () => currentType