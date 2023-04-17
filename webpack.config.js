const path = require('path');
const Config = require('webpack-chain');

// plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

// judge env
const isDev = process.env.NODE_ENV.toLowerCase() === 'development';
const isProduction = process.env.NODE_ENV.toLowerCase() === 'production';

// start configuring
const config = new Config();

config
    // set entry
    .entry('index')
        .add(path.resolve(__dirname, './src/index.tsx'))
        .end()
    // output
    .output
        .path(path.resolve(__dirname, './dist'))
        .filename('[name].[contenthash].bundle.js')
        .end()
    // set alias
    .resolve
        .alias
        .set('@', path.resolve(__dirname, './src'))
        .end();

// set extensions
['.js', '.jsx', '.ts', '.tsx', '.json', '.mjs'].forEach(extension => {
    config.resolve.extensions.add(extension);
});

/**
 * Set rules below
 */
// set jsx
config
    .module
    .rule('js')
    .test(/\.[jt]sx?$/i)
    .use('babel')
    .loader('babel-loader')
    .options({
        babelrc: false,
        configFile: path.resolve(__dirname, './babel.config.cjs'),
    });
config.module.rule('js').exclude.add(/node_modules/);

// set styles
config.module
    .rule('css')
        .test(/\.css$/i)
        .use('style-loader')
            .loader('style-loader')
            .end()
        .use('css-loader')
            .loader('css-loader')
            .end()
        .use('postcss-loader')
            .loader('postcss-loader')
            .end()
        .end()
    // set sass
    .rule('sass')
        .test(/\.s[ac]ss$/i)
        .use('style-loader')
            .loader('style-loader')
            .end()
        .use('css-loader')
            .loader('css-loader')
            .end()
        .use('postcss-loader')
            .loader('postcss-loader')
            .end()
        .use('sass-loader')
            .loader('sass-loader')
            .end()
        .use('style-resource')
            .loader('style-resources-loader')
            .options({
                patterns: [
                    // use scss
                    path.resolve(__dirname, './src/assets/scss/_globals.scss'),
                ],
            })
            .end()
        .end()
    // add pics
    .rule('pics')
        .test(/\.(png|svg|jpe?g|gif)$/i)
        .type('asset/resource')
        .parser({
            dataUrlCondition: {
                maxSize: 10 * 1024,
            }
        })
        .end()
    .rule('fonts')
        .test(/\.(woff2?|eot|[ot]tf)$/i)
        .type('asset/resource')
        .end();

// set plugins
config
    .plugin('HtmlWebpackPlugin')
        .use(HtmlWebpackPlugin, [
            {
                template: path.resolve(__dirname, './public/index.htm'),
                inject: 'body'
            }
        ])
        .end();

// set in develoment mode
config.when(isDev, configure => {
    configure.mode('development')
    // set devServer
    .devServer
        .port(8333)
        .hot(true)
        .end()
    // check ts in dev environment
    .plugin('ForkTsCheckerWebpackPlugin')
        .use(ForkTsCheckerWebpackPlugin, [
            {
                devServer: true
            }
        ])
        .end();
});

module.exports = config.toConfig();
