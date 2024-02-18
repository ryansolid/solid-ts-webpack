const path = require('path');
const Config = require('webpack-chain');
const compose = require('compose-function');
const { loadStyles } = require('./modules/LoadStyles.js');

// plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { DefinePlugin } = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

/**
 * Generate a basic config
 * @param {Record<string, unknown>} options config options
 * @returns basic webpack conf
 */
const createBasicConfig = (options = {}) => {
    const {
        /** HTML Title */
        title = 'react-ts-webpack-starter',
        /** HTML language */
        lang = 'en',
        /** for development conf */
        isDev = true,
        /** for production conf */
        isProd = false,
    } = options || {};

    const configLoadStyle = compose(
        /** @param {Config} conf config */
        conf =>
            loadStyles(conf, {
                isDev,
                styleType: 'sass',
            }),

        /** @param {Config} conf config */
        conf =>
            loadStyles(conf, {
                isDev,
                styleType: 'scss',
                styleResourcePatterns: [
                    // use scss
                    path.resolve(__dirname, '../src/assets/scss/_globals.scss'),
                ],
            }),

        /** @param {Config} conf config */
        conf =>
            loadStyles(conf, {
                isDev,
                styleType: 'css',
                isCssModules: false,
            })
    );

    return configLoadStyle(
        new Config()
            // set entry
            .entry('index')
            .add(path.resolve(__dirname, '../src/index.tsx'))
            .end()
            // output
            .output.path(path.resolve(__dirname, '../dist'))
            .filename('[name].[contenthash].bundle.js')
            .publicPath('/')
            .end()
            // set alias
            .resolve.alias.set('@', path.resolve(__dirname, '../src'))
            .end()
            .extensions.add('.js')
            .add('.jsx')
            .add('.ts')
            .add('.tsx')
            .add('.json')
            .add('.cjs')
            .add('.mjs')
            .end()
            .end()
            .module.rule('js')
            .test(/\.[jt]sx?$/i)
            .use('babel')
            .loader('babel-loader')
            .options({ babelrc: true })
            .end()
            .exclude.add(/node_modules/)
            .end()
            .end()
            // add pics
            .rule('pics')
            .test(/\.(png|svg|jpe?g|gif)$/i)
            .type('asset/resource')
            .parser({
                dataUrlCondition: {
                    maxSize: 10 * 1024,
                },
            })
            .end()
            .rule('fonts')
            .test(/\.(woff2?|eot|[ot]tf)$/i)
            .type('asset/resource')
            .end()
            .end()
            // set plugins
            .plugin('HtmlWebpackPlugin')
            .use(HtmlWebpackPlugin, [
                {
                    template: path.resolve(__dirname, '../html/index.htm'),
                    templateParameters: {
                        lang,
                    },
                    inject: 'body',
                    favicon: path.resolve(__dirname, '../html/favicon-solid.png'),
                    title,
                },
            ])
            .end()
            .plugin('DefinePlugin')
            .use(DefinePlugin, [
                {
                    isDev,
                    isProd,
                },
            ])
            .end()
            // split chunks
            .optimization.splitChunks({
                chunks: 'all',
                minSize: 15000,
            })
            .end()
            // set in development mode
            .when(isDev, configure => {
                configure
                    .devtool('source-map')
                    .mode('development')
                    // set devServer
                    .devServer.compress(true)
                    .port(9222)
                    .hot(true)
                    .open(false)
                    .set('liveReload', false)
                    .end()
                    // check ts in dev environment
                    .plugin('ForkTsCheckerWebpackPlugin')
                    .use(ForkTsCheckerWebpackPlugin, [
                        {
                            devServer: true,
                        },
                    ])
                    .end()
                    .plugin('ESLintPlugin')
                    .use(ESLintPlugin, [
                        {
                            extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.mjs', '.cjs'],
                            fix: true,
                            threads: true,
                        },
                    ])
                    .end();
            })
            // set in production mode
            .when(isProd, configure => {
                configure
                    .devtool('eval')
                    .mode('production')
                    .optimization.minimize(true)
                    .minimizer('terser')
                    .use(TerserPlugin, [
                        {
                            extractComments: true,
                            minify: TerserPlugin.uglifyJsMinify,
                            terserOptions: {
                                ecma: 5,
                                compress: {
                                    drop_console: true,
                                    drop_debugger: true,
                                },
                            },
                        },
                    ])
                    .end()
                    // html webpack plugin
                    .end()
                    .plugin('HtmlWebpackPlugin')
                    .tap(args => [
                        ...args,
                        {
                            minify: true,
                        },
                    ])
                    .end()
                    .plugin('MiniCssExtractPlugin')
                    .use(MiniCssExtractPlugin, [
                        {
                            filename: '[name]-[contenthash].css',
                        },
                    ])
                    .end()
                    .plugin('cleanWebpackPlugin')
                    .use(CleanWebpackPlugin)
                    .end();
            })
    );
};

module.exports = {
    createBasicConfig,
};
