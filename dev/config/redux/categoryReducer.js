/**
 * 用于标记当前初始化运行环境，用于指导组件在初始化的时候执行方式。
 * @param state
 * @param action
 * @returns {*}
 */
export const categoryTypeListReducer = (state = {listInfo: {list:false, type:false}}, action) => {
    switch (action.type) {
        case 'categoryTypeList':
            return {listInfo: action.listInfo}
        default:
            return state;
    }
}