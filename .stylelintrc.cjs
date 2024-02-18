module.exports = {
    root: true,
    extends: ['stylelint-config-standard', 'stylelint-config-standard-scss'],
    plugins: ['stylelint-prettier'],
    rules: {
        'prettier/prettier': true,
    },
};
