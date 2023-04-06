
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  entry: path.resolve(__dirname, 'src/index.tsx'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist')
  },
  devServer: {
    static: path.join(__dirname, 'dist'),
    port: 9111
  },
  mode: 'development',
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json']
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            configFile: path.resolve(__dirname, 'babel.config.cjs'),
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.htm'),
      inject: 'body'
    }),
  ]
}

module.exports = config
