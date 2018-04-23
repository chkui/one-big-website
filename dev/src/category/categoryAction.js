import {headerScrollAction, headerShowAction} from "../header/headerAction";
import {categoryStructure, categoryTypeMap} from "../../data/category";
import {flow} from "../common/flow";

export const categoryTypeListAction = (type) => ({
    type: 'categoryTypeList',
    list: flow(type)
        .then((type) => categoryStructure[type])
        .then((structures) => {
            const List = [];
            for (let key in structures) {
                const item = structures[key];
                item.key = key;
                List.push({
                    url: item.url,
                    subject: item.subject,
                    category: item.category,
                    categoryName: item.categoryName,
                    des:item.des
                })
            }
            return List;
        }).else()
});
export const loadCategoryAction = (categoryType, showType) => {
    return dispatch => {
        const header = flow(categoryType)
            .then(type => categoryTypeMap[type])
            .then(category => {
                return {
                    icon: category.icon,
                    breadcrumb: {
                        title: '',
                        routes: [{name: 'Home', url: '/'}, {name: 'Category', url: '/category'}]
                    }
                }
            }).else(() => {
            });
        dispatch(headerShowAction(header.icon, header.breadcrumb));
        dispatch(headerScrollAction(showType));
        dispatch(categoryTypeListAction(categoryType))
    }
};