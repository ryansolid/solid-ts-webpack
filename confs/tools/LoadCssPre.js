const _ = require('lodash');
const inExclude = require('./InExclude');

/**
 * Generate css-preprocessor loader item.
 * @param {string|RegExp} test extends. The default is /\.css$/i
 * @param {string|string[]|null} loader loader name or loader names
 * @param {Record<string, unknown> | (Record<string, unknown>|null)[]} options loader options. If loader is an array, options should also be an array whose length is equal to the 'loader'.
 * @returns A css-preprocessor loader item.
 */
function loadStyle (test = /\.css$/i, loader = null, options = {}) {
    const used = [
        'style-loader',
        'css-loader',
        'postcss-loader'
    ];

    const basic = {
        test,
        ...inExclude,
    };

    if (!loader) {
        return {
            ...basic,
            use: used,
        };
    }

    const use = [...used];

    if (Array.isArray(loader)) {
        if (
            !Array.isArray(options)
            || loader.length !== options.length
        ) {
            throw new Error('NOTICE: when you pass only one loader as an array, the param "options" should also be an array whose length is equal to the "loader".');
        }

        _.zip(loader, options).forEach(
            ([loaderName, loaderOption]) => {
                if (loaderName && loaderOption) {
                    if (Object.keys(loaderOption).length) {
                        use.push(
                            {
                                loader: loaderName,
                                options: loaderOption,
                            }
                        );
                    }
                    else {
                        use.push(loaderName);
                    }
                } else if (loaderName && !loaderOption) {
                    use.push(loaderName);
                } else {
                    throw new Error('NOTICE: loader name should not be empty or any falsy value');
                }
            }
        );
    }
    else {
        if (Array.isArray(options)) {
            throw new Error('NOTICE: when you pass only one loader as string, the param "options" should be an object instead of an array.');
        }

        Object.keys(options).length
            ? use.push(loader)
            : use.push(
                {
                    loader,
                    options
                }
            );
    }

    return {
        ...basic,
        use
    };
}

module.exports = {
    loadStyle
};
