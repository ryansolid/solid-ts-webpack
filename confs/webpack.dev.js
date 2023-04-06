const { resolve } = require('path');

const devConf = {
    mode: 'development',
    devServer: {
        static: resolve(__dirname, '../dist'),
        port: 9111
    },
};

module.exports = {
    devConf,
};
