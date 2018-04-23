const path = require('path'),
    webpack = require('webpack'),
    vendor = require('../../webpack/vendor')
    HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    target: 'web',
    node: {
        fs: 'empty'
    },
    devtool: 'source-map',
    context: path.resolve(__dirname, '..'),
    entry: {
        bundle: './src/chkui',
        vendor: vendor
    },
    output: {
        path: path.resolve(__dirname, "../dist"),
        filename: '[name].js',
        chunkFilename: 'chunk.[name].js',
        publicPath: '/'
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: [{
                loader: 'babel-loader',
                options: { presets: ['es2015', 'stage-0', 'react'] }
            }],
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader'
            ]
        }, {
            test: /\.scss$/,
            use: [
                'style-loader',
                'css-loader?modules&camelCase&importLoaders=1&localIdentName=[local][hash:base64:5]',
                {
                    loader:'postcss-loader',
                    options: {
                        plugins: function() {
                            return [
                                require('autoprefixer')()
                            ];
                        }
                    }
                },
                'sass-loader'
            ]
        }, {
            test: /\.(png|jpg|svg)$/,
            use:['url-loader?limit=25000']
        }, {
            test: /\.json$/,
            use: ['json-loader']
        }, {
            test: /\.html$/,
            use: ['html-loader?minimize=false']
        }]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({name:'vendor',fileName:'vendor.js'}),
        new HtmlWebpackPlugin({
            filename: '../dist/index.html',
            template: './views/index.client.tpl.html'
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
            __RunMode:JSON.stringify("DEV"),
            __WithCredentials:true,
            __FluxLogLevel:"'Detail'",
            __History:"'Hash'"
        }),
        new webpack.NormalModuleReplacementPlugin(
            /\/iconv-loader$/, 'node-noop'
        )
    ],
    performance: { //fix the windows OS warning, the issue is local https://stackoverflow.com/questions/41159817/how-to-disable-optimize-warnings-in-webpack-2/41159932
        hints: false
    },
    devServer: {
        disableHostCheck: true
    }
}
