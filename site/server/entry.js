/**
 * Created by chkui on 2017/6/21.
 */
console.log('NODE_ENV', process.env.NODE_ENV)
const server = require('pwfe-server/server'),
    config = 'production' === process.env.NODE_ENV ? require('./prodConf') :
        ('mirror' === process.env.NODE_ENV ? require('./mirConf') : require('./testConf'))
server(config);