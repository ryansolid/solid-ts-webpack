module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                useBuiltIns: 'usage',
                corejs: '3.32',
            },
        ],
        'solid',
        '@babel/preset-typescript',
    ],
    plugins: [
        '@babel/plugin-syntax-dynamic-import',
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-proposal-object-rest-spread',
        [
            'solid-refresh/babel',
            {
                bundler: 'webpack5', // or "rspack-esm"
            },
        ],
    ],
};
