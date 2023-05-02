const { useConfig } = require('./webpack/webpack.base');

module.exports = useConfig(process.env.NODE_ENV).toConfig();
