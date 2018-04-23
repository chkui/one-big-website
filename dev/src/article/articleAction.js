import {categoryTypeMap, categoryStructure} from '../../data/category'
import {headerShowAction, headerScrollAction} from "../header/headerAction";
import {ShowType} from "../header/headerReducer";
/*
 * 更新article的内容，注意防止数据突变
 * @param articles {
        title: 页面现实的标题,
        routes: 路由过程,
        page: 页面的副文本现实内容,
        count: 页面内容字数
    }
 */
export const articleAction = (category, id, page, count) => ({
    type: 'articleInfo',
    info: {category, id, page, count}
})

export const loadArticle = (category, id, showType) => {
    return dispatch => {
        const categoryType = categoryTypeMap[category],
            article = categoryStructure[category][id],
            icon = categoryType.icon,
            title = article.subject,
            routes = [
                {name: 'Home', url: '/'}, {name: 'Category', url: '/category'}, {
                    name: categoryTypeMap[category].name,
                    url: `/category/${category}`
                }],
            count = article.count;
        dispatch(articleAction(category, id, false, count));
        dispatch(headerShowAction(icon, {title: title, routes: routes}));
        dispatch(headerScrollAction(showType));
        article.page(page => {
            dispatch(articleAction(category, id, page, count))
        })
    }
}