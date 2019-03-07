'use strict';

module.exports = appInfo => {
    const config = exports = {};

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1546939106096_2392';

    // 上传文件存放地址
    config.uploadDir = 'app/public/upload/admin/';

    // add your config here
    config.middleware = [ 'jsonRes' ];
    config.jsonRes = {
        match: '/admin',
    };

    config.view = {
        defaultViewEngine: 'nunjucks',
        mapping: {
            '.html': 'nunjucks',
        },
    };

    config.mongoose = {
        client: {
            url: 'mongodb://tesco:zsf123.@127.0.0.1/tesco',
            options: {},
        },
    };

    config.cors = {
        origin: '*',
        allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
    };

    config.security = {
        csrf: {
            headerName: 'x-csrf-token', // 通过 header 传递 CSRF token 的默认字段为 x-csrf-token
        },
    };

    return config;
};
