/**
 * Created by chkui on 2017/6/22.
 */
require('pwfe-server/builder')((() => {
    switch (process.env.NODE_BUILDER) {
        case 'TEST':
            return require('./testConf')
        case 'MIR':
            return require('./mirConf')
        case 'PRO':
            return require('./prodConf')
    }
})())