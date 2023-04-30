module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                corejs: '3',
            },
        ],
        'solid',
        '@babel/preset-typescript',
    ],
    plugins: [
        '@babel/plugin-syntax-dynamic-import',
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-proposal-object-rest-spread',
    ],
};
