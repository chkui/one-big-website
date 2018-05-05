/**
 *
 * @type {{NONE: number, TOP: number, SCROLL: number, BREADCRUMBTOP: number, BREADCRUMBSCROLL: number}}
 */
export const ShowType = {
    NONE: 0, //不显示
    TOP: 1, //置顶
    SCROLL: 2, //滚动
    BREADCRUMBTOP: 3, // 有面包屑的置顶
    BREADCRUMBSCROLL: 4, // 有面包屑的滚动
}

/**
 * 当前站点信息
 * @param {Object} state
 * @param {Object} action
 */
export const headerScrollReducer = (state = {showType: ShowType.NONE}, action) => {
    switch (action.type) {
        case 'headerScroll':
            return {showType: action.showType}
        default:
            return state;
    }
}

export const headerShowReducer = (state = {icon: false, breadcrumb: false}, action) => {
    if ('headerShow' === action.type) {
        return {icon: action.icon, breadcrumb: action.breadcrumb}
    } else {
        return state
    }
}
