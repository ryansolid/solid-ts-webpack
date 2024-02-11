module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                useBuiltIns: 'usage',
                corejs: '3.35',
            },
        ],
        'solid',
        '@babel/preset-typescript',
    ],
    plugins: [
        '@babel/plugin-proposal-object-rest-spread',
        [
            'solid-refresh/babel',
            {
                bundler: 'webpack5', // or "rspack-esm"
            },
        ],
    ],
};
