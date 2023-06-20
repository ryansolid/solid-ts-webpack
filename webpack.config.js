const { useConfig } = require('./webpack/webpack.base');

module.exports = useConfig({
    env: process.env.NODE_ENV,
    title: 'solid-ts-webpack-starter',
}).toConfig();
