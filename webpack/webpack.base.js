const path = require('path');
const Config = require('webpack-chain');

// plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { DefinePlugin } = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const { loader: miniLoader } = MiniCssExtractPlugin;

/**
 * Generate a basic config
 * @param {Record<string, unknown>} options config options
 * @returns basic webpack conf
 */
function useConfig(options = {}) {
    const { env = process.env.NODE_ENV, title = 'solid-ts-webpack-starter', lang = 'en' } = options;
    const isDev = env.toLowerCase() === 'development';
    const isProduction = env.toLowerCase() === 'production';

    return (
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
            .options({
                babelrc: false,
                configFile: path.resolve(__dirname, '../babel.config.cjs'),
            })
            .end()
            .exclude.add(/node_modules/)
            .end()
            .end()
            // set styles
            .rule('css')
            .test(/\.css$/i)
            .use(isDev ? 'style-loader' : 'mini-loader')
            .loader(isDev ? 'style-loader' : miniLoader)
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
            .use(isDev ? 'style-loader' : 'mini-loader')
            .loader(isDev ? 'style-loader' : miniLoader)
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
                    path.resolve(__dirname, '../src/assets/scss/_globals.scss'),
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
                    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
                },
            ])
            .end()
            // split chunks
            .optimization.splitChunks({
                chunks: 'all',
                minSize: 15000,
            })
            .end()
            // set in develoment mode
            .when(isDev, configure => {
                configure
                    .devtool('source-map')
                    .mode('development')
                    // set devServer
                    .devServer.compress(true)
                    .port(8333)
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
            .when(isProduction, configure => {
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
                    .tap(args => {
                        const [htmlPluginConf] = args;

                        return [
                            {
                                ...htmlPluginConf,
                                minify: true,
                            },
                        ];
                    })
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
}

module.exports = {
    useConfig,
};
