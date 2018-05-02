/**
 * Created by chkui on 2017/6/22.
 */
const path = require('path'),
    routes = require('../../dev/config/serverRoutes'),
    reducer = require('../../dev/config/reducer'),
    vendor = require('../../webpack/vendor'),
    config = {
        workDir: path.resolve(__dirname, '../..'),
        entry: './dev/src/chkui',
        outPath: './site/dist',
        app: () => require('pwfe-dom/app'),
        htmlTemplatePath: './dev/views/index.tpl.html',
        serverEntry: './site/server/entry',
        serverModule: './node_modules',
        reducer: reducer,
        routes: routes,
        vendor: vendor,
        compressJs: false,
        sourceMap: 'source-map', //测试环境生成source-map
        mergingChunk: false,
        port: 12000,
        header: () => require("../../dev/src/header"),
        footer: () => require("../../dev/src/footer"),
        static: ['./dev/views/baidu-push-link.js',
            './dev/views/robots.txt',
            './dev/views/sitemap.xml',
            './dev/views/sitemap-misc.xml',
            './dev/views/sitemap-category.xml',
            './dev/views/sitemap-article-react.xml',
            './dev/views/sitemap-article-nodejs.xml',
            './dev/views/sitemap-article-linux.xml'],
        define: {
            __RunMode: JSON.stringify('TEST'),
            __FluxLogLevel: "'Detail'",
            __History: "'Browser'"
        },
        defPageName: '随风溜达的向日葵'
    }

module.exports = config