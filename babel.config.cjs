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
        [
            'solid-refresh/babel',
            {
                bundler: 'webpack5', // or "rspack-esm"
            },
        ],
    ],
};
