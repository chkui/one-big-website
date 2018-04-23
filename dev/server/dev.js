/**
 * Created by chkui on 2017/6/21.
 */
const devServer = require('pwfe-server/devServer'),
    reducer = require('../config/reducer'),
    routes = require('../config/serverRoutes'),
    vendor = require('../../webpack/vendor'),
    path = require('path')
devServer({
    workDir: path.resolve(__dirname, '..'), //dev目录
    entry: './src/chkui',
    app: ()=>require('pwfe-dom/app'),
    outPath: './dist',
    runMode: 'SITE',
    localRun: false,
    reducer: reducer,
    routes: routes,
    vendor: vendor,
    header : () => require("../src/header"),
    footer : () => require("../src/footer"),
    sourceMap: "source-map",
    define:{
        __RunMode:JSON.stringify('DEV'),
        __FluxLogLevel:"'Detail'",
        __History:"'Browser'"
    },
    defPageName: '随风溜达的向日葵'
});