module.exports = {
    env: {
        browser: true,
        es2022: true,
        node: true,
    },
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier', 'plugin:solid/typescript'],
    overrides: [],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint', 'prettier', 'solid'],
    rules: {
        indent: [
            'error',
            4,
            {
                SwitchCase: 1,
            },
        ],
        'linebreak-style': ['error', 'unix'],
        quotes: ['error', 'single'],
        semi: ['error', 'always'],
        'prettier/prettier': [
            'error',
            {},
            {
                usePrettierrc: true,
            },
        ],
        '@typescript-eslint/no-var-requires': 'off',
    },
};
