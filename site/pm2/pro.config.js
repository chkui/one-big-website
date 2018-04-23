module.exports = {
    apps: [
        {
            name: 'MLH',
            script: './site/dist/server/server.js',
            instances: 2,
            exec_mode: 'cluster',
            env: {
                NODE_ENV: 'production'
            },
            log_date_format : 'YYYY-MM-DD HH:mm Z',
            out_file: './logs/out.log',
            error_file: './logs/err.log'
        },
    ],
};
