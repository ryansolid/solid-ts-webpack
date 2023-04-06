const { commonConf } = require('./webpack.common');
const { devConf } = require('./webpack.dev');
const { prodConf } = require('./webpack.prod');

module.exports = {
    commonConf,
    devConf,
    prodConf,
};
