

const reducers = {
    headerScrollReducer:require('./redux/headerReducer').headerScrollReducer,
    headerShowReducer:require('./redux/headerReducer').headerShowReducer,
    articleInfoReducer:require('./redux/articleReducer').articleInfoReducer,
    initRunLocalEnvReducer:require('./redux/appReducer').initRunLocalEnvReducer,
    categoryTypeListReducer:require('./redux/categoryReducer').categoryTypeListReducer
}
module.exports = reducers
module.exports.default = module.exports