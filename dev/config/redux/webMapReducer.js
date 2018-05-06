import {categoryStructure, categoryTypeMap} from '../../data/category'

/**
 * 右侧导航栏目显示的内容
 * @type {{
 *      None: number 什么都不显示,
 *      OwnerInfo: number 博主信息,
 *      ArticleMap: number 全站文章列表,
 *      ArticleIndex: number 单个文章索引
 * }}
 */
export const WebMapType = {
    None: 0,
    OwnerInfo: 1,
    ArticleMap: 5,
    ArticleIndex: 10
}

/**
 * 当前右侧栏目显示的内容
 * @param state
 * @param action
 * @returns {*}
 */
export const webMapTypeReducer = (state = {type: WebMapType.None}, action) => {
    if ('webMapType' === action.type) {
        return {icon: action.icon, breadcrumb: action.breadcrumb}
    } else {
        return state
    }
}

/**
 * 文章树
 * @param state
 * @param action
 * @returns {*}
 */
export const articleMapReducer = (state = {
    articleMap: (() => {
        const result = {};
        for (let key in categoryStructure) {
            result[key] = {name: categoryTypeMap[key].name, unfold: false};
        }
        return result;
    })()
}, action) => {
    if ('articleMapTree' === action.type) {
        const map = Object.assign({}, state.articleMap);
        map[action.key].unfold = action.unfold;
        return {articleMap: map}
    } else {
        return state
    }
}