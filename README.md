# Solid TS Webpack Starter

Really basic starter. This build has a very minimal typescript setup with webpack, and webpack dev server. It does nothing else. No CSS or anything. Use this as a quick way to get started if you intend to build your webpack config yourself.

## Upgraded at April 6th, 2023 (UTC + 8)

* Upgrade the webpack version from 4 to 5;
* Add loaders of style, include `style-loader`, `css-loader`, `postcss-loader` and `sass-loader`;
* Split the config for variant environments. You can find `webpack.common.js`, `webpack.dev.js` and `webpack.prod.js` from the folder `./conf`. You can just modify them.

## Upgraded at April 20th, 2023 (UTC + 8)

* Use `webpack-chain` to rewrite the `webpack.config.js`;
* Install `@solidjs/router`;
