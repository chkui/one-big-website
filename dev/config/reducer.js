

const reducers = {
    headerScrollReducer:require('../src/header/headerReducer').headerScrollReducer,
    headerShowReducer:require('../src/header/headerReducer').headerShowReducer,
    articleInfoReducer:require('../src/article/articleReducer').articleInfoReducer,
    initRunLocalEnvReducer:require('../src/appReducer').initRunLocalEnvReducer,
    categoryTypeListReducer:require('../src/category/categoryReducer').categoryTypeListReducer
}
module.exports = reducers
module.exports.default = module.exports