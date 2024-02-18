/**
 * @description config style loads
 * @param {import('webpack-chain')} confInstance
 * @param {import('./LoadStyles_types').OtherConf} otherConf
 * @returns the config
 */
const loadStyles = (
    confInstance,
    { isDev = true, styleType = 'css', styleResourcePatterns = [], isCssModules = true }
) => {
    const { loader: miniLoader } = require('mini-css-extract-plugin');
    const sourceMap = !isDev;

    if (styleType === 'sass') {
        return confInstance.module
            .rule('sass')
            .test(/\.sass$/i)
            .oneOf('css-modules')
            .test(/\.module\.\w+$/i)
            .use('style')
            .loader(isDev ? 'style-loader' : miniLoader)
            .end()
            .use('css')
            .loader('css-loader')
            .options({
                sourceMap,
                importLoaders: 2,
                // css-module hash
                modules: {
                    auto: resourcePath => resourcePath.endsWith('.sass'),
                    localIdentName: '[local]__[hash:base64]',
                },
            })
            .end()
            .use('postcss')
            .loader('postcss-loader')
            .options({ sourceMap })
            .end()
            .use('sass')
            .loader('sass-loader')
            .options({
                sourceMap,
                sassOptions: {
                    indentedSyntax: true,
                },
            })
            .end()
            .use('style-resource')
            .loader('style-resources-loader')
            .options({
                patterns: Array.isArray(styleResourcePatterns) ? styleResourcePatterns : [],
            })
            .end()
            .end()
            .oneOf('css-normal')
            .use('style')
            .loader(isDev ? 'style-loader' : miniLoader)
            .end()
            .use('css')
            .loader('css-loader')
            .options({
                sourceMap,
                importLoaders: 2,
                // css-module hash
                modules: false,
            })
            .end()
            .use('postcss')
            .loader('postcss-loader')
            .options({ sourceMap })
            .end()
            .use('sass')
            .loader('sass-loader')
            .options({
                sourceMap,
                sassOptions: {
                    indentedSyntax: true,
                },
            })
            .end()
            .use('style-resource')
            .loader('style-resources-loader')
            .options({
                patterns: Array.isArray(styleResourcePatterns) ? styleResourcePatterns : [],
            })
            .end()
            .end()
            .end()
            .end();
    }

    if (styleType === 'scss') {
        return confInstance.module
            .rule('scss')
            .test(/\.scss$/i)
            .oneOf('css-module')
            .test(/\.module\.\w+$/i)
            .use('style')
            .loader(isDev ? 'style-loader' : miniLoader)
            .end()
            .use('css')
            .loader('css-loader')
            .options({
                sourceMap,
                importLoaders: 2,
                // css-module hash
                modules: {
                    auto: resourcePath => resourcePath.endsWith('.scss'),
                    localIdentName: '[local]__[hash:base64]',
                },
            })
            .end()
            .use('postcss')
            .loader('postcss-loader')
            .options({ sourceMap })
            .end()
            .use('scss')
            .loader('sass-loader')
            .options({ sourceMap })
            .end()
            .use('style-resource')
            .loader('style-resources-loader')
            .options({
                patterns: Array.isArray(styleResourcePatterns) ? styleResourcePatterns : [],
            })
            .end()
            .end()
            .oneOf('css-modules')
            .use('style')
            .loader(isDev ? 'style-loader' : miniLoader)
            .end()
            .use('css')
            .loader('css-loader')
            .options({
                sourceMap,
                importLoaders: 2,
                // css-module hash
                modules: false,
            })
            .end()
            .use('postcss')
            .loader('postcss-loader')
            .options({ sourceMap })
            .end()
            .use('scss')
            .loader('sass-loader')
            .options({ sourceMap })
            .end()
            .use('style-resource')
            .loader('style-resources-loader')
            .options({
                patterns: Array.isArray(styleResourcePatterns) ? styleResourcePatterns : [],
            })
            .end()
            .end()
            .end()
            .end();
    }

    if (styleType === 'less') {
        return confInstance.module
            .rule('less')
            .test(/\.less$/i)
            .oneOf('css-modules')
            .test(/\.module\.\w+$/i)
            .use('style')
            .loader(isDev ? 'style-loader' : miniLoader)
            .end()
            .use('css')
            .loader('css-loader')
            .options({
                sourceMap,
                importLoaders: 2,
                // css-module hash
                modules: {
                    auto: resourcePath => resourcePath.endsWith('.less'),
                    localIdentName: '[local]__[hash:base64]',
                },
            })
            .end()
            .use('postcss')
            .loader('postcss-loader')
            .options({ sourceMap })
            .end()
            .use('less')
            .loader('less-loader')
            .options({ sourceMap })
            .end()
            .use('style-resource')
            .loader('style-resources-loader')
            .options({
                patterns: Array.isArray(styleResourcePatterns) ? styleResourcePatterns : [],
            })
            .end()
            .end()
            .oneOf('css-modules')
            .use('style')
            .loader(isDev ? 'style-loader' : miniLoader)
            .end()
            .use('css')
            .loader('css-loader')
            .options({
                sourceMap,
                importLoaders: 2,
                // css-module hash
                modules: false,
            })
            .end()
            .use('postcss')
            .loader('postcss-loader')
            .options({ sourceMap })
            .end()
            .use('less')
            .loader('less-loader')
            .options({ sourceMap })
            .end()
            .use('style-resource')
            .loader('style-resources-loader')
            .options({
                patterns: Array.isArray(styleResourcePatterns) ? styleResourcePatterns : [],
            })
            .end()
            .end()
            .end()
            .end();
    }

    if (styleType === 'stylus') {
        return confInstance.module
            .rule('stylus')
            .test(/\.styl(us)?$/i)
            .oneOf('css-modules')
            .test(/\.module\.\w+$/i)
            .use('style')
            .loader(isDev ? 'style-loader' : miniLoader)
            .end()
            .use('css')
            .loader('css-loader')
            .options({
                sourceMap,
                importLoaders: 2,
                // css-module hash
                modules: {
                    auto: resourcePath => resourcePath.endsWith('.styl') || resourcePath.endsWith('.stylus'),
                    localIdentName: '[local]__[hash:base64]',
                },
            })
            .end()
            .use('postcss')
            .loader('postcss-loader')
            .options({ sourceMap })
            .end()
            .use('less')
            .loader('stylus-loader')
            .options({ sourceMap })
            .end()
            .use('style-resource')
            .loader('style-resources-loader')
            .options({
                patterns: Array.isArray(styleResourcePatterns) ? styleResourcePatterns : [],
            })
            .end()
            .end()
            .oneOf('normal')
            .use('style')
            .loader(isDev ? 'style-loader' : miniLoader)
            .end()
            .use('css')
            .loader('css-loader')
            .options({
                sourceMap,
                importLoaders: 2,
                // css-module hash
                modules: false,
            })
            .end()
            .use('postcss')
            .loader('postcss-loader')
            .options({ sourceMap })
            .end()
            .use('stylus')
            .loader('stylus-loader')
            .options({ sourceMap })
            .end()
            .use('style-resource')
            .loader('style-resources-loader')
            .options({
                patterns: Array.isArray(styleResourcePatterns) ? styleResourcePatterns : [],
            })
            .end()
            .end()
            .end()
            .end();
    }

    return confInstance.module
        .rule('css')
        .test(/\.css$/i)
        .oneOf('css-module')
        .test(/\.module\.\w+$/i)
        .use('style')
        .loader(isDev ? 'style-loader' : miniLoader)
        .end()
        .use('css')
        .loader('css-loader')
        .options({
            sourceMap,
            importLoaders: 1,
            // css-module hash
            modules: {
                auto: resourcePath => resourcePath.endsWith('.css'),
                localIdentName: '[local]__[hash:base64]',
            },
        })
        .end()
        .use('postcss')
        .loader('postcss-loader')
        .options({ sourceMap })
        .end()
        .use('style-resource')
        .loader('style-resources-loader')
        .options({
            patterns: Array.isArray(styleResourcePatterns) ? styleResourcePatterns : [],
        })
        .end()
        .end()
        .oneOf('css-modules')
        .use('style')
        .loader(isDev ? 'style-loader' : miniLoader)
        .end()
        .use('css')
        .loader('css-loader')
        .options({
            sourceMap,
            importLoaders: 1,
            // css-module hash
            modules: false,
        })
        .end()
        .use('postcss')
        .loader('postcss-loader')
        .options({ sourceMap })
        .end()
        .use('style-resource')
        .loader('style-resources-loader')
        .options({
            patterns: Array.isArray(styleResourcePatterns) ? styleResourcePatterns : [],
        })
        .end()
        .end()
        .end()
        .end();
};

module.exports = {
    loadStyles,
};
