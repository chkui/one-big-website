

const reducers = {
    headerScrollReducer:require('./redux/headerReducer').headerScrollReducer,
    headerShowReducer:require('./redux/headerReducer').headerShowReducer,
    articleInfoReducer:require('./redux/articleReducer').articleInfoReducer,
    initRunLocalEnvReducer:require('./redux/appReducer').initRunLocalEnvReducer,
    categoryTypeListReducer:require('./redux/categoryReducer').categoryTypeListReducer,
    articleMapReducer:require('./redux/webMapReducer').articleMapReducer
}
module.exports = reducers
module.exports.default = module.exports