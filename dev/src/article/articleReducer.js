/**
 * 当前站点信息
 * @param {Object} state
 * @param {Object} action
 */
export const articleInfoReducer = (state = {
    category: false,
    id: false,
    page: false,
    count: 0
}, action) => {
    switch (action.type) {
        case 'articleInfo':
            return action.info
        default:
            return state;
    }
};