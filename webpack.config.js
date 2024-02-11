const { createBasicConfig } = require('./webpack');

module.exports = environment => {
    const { dev, prod } = environment;
    const { NODE_ENV = 'development' } = process.env;

    return createBasicConfig({
        title: 'solid-ts-webpack-starter',
        lang: 'zh-CN',
        isDev: Boolean(dev && NODE_ENV === 'development'),
        isProd: Boolean(prod && NODE_ENV === 'production'),
    }).toConfig();
};
