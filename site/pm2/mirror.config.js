module.exports = {
    apps: [
        {
            name: 'CHKUI',
            script: './site/dist/server/server.js',
            instances: 1,
            exec_mode: 'cluster',
            env: {
                NODE_ENV: 'mirror'
            },
            log_date_format : 'YYYY-MM-DD HH:mm Z',
            out_file: './logs/out.log',
            error_file: './logs/err.log'
        },
    ],
};
