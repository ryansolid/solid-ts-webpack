const { resolve } = require('path');
module.exports = {
    include: resolve(__dirname, '../../src'),
    exclude: /node_modules/i,
};
