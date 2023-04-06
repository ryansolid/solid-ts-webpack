const webpackMerge = require('webpack-merge');
const { commonConf, devConf, prodConf } = require('./confs');

const environment = process.env.NODE_ENV;

function getConfig() {
    if (!environment) {
        throw new Error('Give an environment variable use --node-env');
    }

    return environment.toLowerCase() === 'development'
        ? webpackMerge.merge(commonConf, devConf)
        : webpackMerge.merge(commonConf, prodConf);
};

module.exports = getConfig;
