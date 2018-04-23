/**
 * 用于标记当前初始化运行环境，用于指导组件在初始化的时候执行方式。
 * @param state
 * @param action
 * @returns {*}
 */
export const categoryTypeListReducer = (state = {list: false}, action) => {
    switch (action.type) {
        case 'categoryTypeList':
            return {list: action.list}
        default:
            return state;
    }
}