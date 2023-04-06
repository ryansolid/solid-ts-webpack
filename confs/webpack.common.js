const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { loadStyle } = require('./tools/LoadCssPre');

const commonConf = {
    entry: path.resolve(__dirname, '../src/index.tsx'),
    output: {
        filename: '[name].[contenthash].bundle.js',
        path: path.resolve(__dirname, '../dist')
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.mjs'],
        alias: {
            '@': path.resolve(__dirname, '../src'),
        },
    },
    module: {
        rules: [
            {
                test: /\.[jt]sx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        babelrc: false,
                        configFile: path.resolve(__dirname, '../babel.config.cjs'),
                    }
                }
            },
            loadStyle(),
            loadStyle(/\.s[ac]ss$/i, ['sass-loader', 'style-resources-loader'], [null, {
                patterns: [
                    // use scss
                    path.resolve(__dirname, '../src/assets/scss/_globals.scss'),
                ],
            }]),
            {
                test: /\.(png|svg|jpe?g|gif)$/i,
                type: 'asset/resource',
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024,
                    },
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.htm'),
            inject: 'body'
        }),
    ],
};

module.exports = {
    commonConf,
};
