/* eslint import/no-extraneous-dependencies: 0 */
const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const env = process.env.WEBPACK_BUILD || process.env.NODE_ENV || 'development';

module.exports = {
  mode: env,
  devtool: 'source-map',
  devServer: {
    port: 4001,
    inline: false,
    disableHostCheck: true,
    contentBase: './build',
    historyApiFallback: true,
    stats: {
      chunks: false
    }
  },
  entry: './docs/lib/app.js',
  node: {
    fs: 'empty'
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve('./build'),
    libraryTarget: 'umd',
    // globalObject: '(typeof self !== \'undefined\' ? self : this)'
  },
  plugins: [
    new HtmlWebPackPlugin({
      inject: true,
      template: './docs/lib/index.html',
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([{ from: './docs/static', to: 'assets' }]),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env)
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/[name].css',
      chunkFilename: 'assets/[id].css'
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader?cacheDirectory'
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
    ]
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      '@crude/ui': path.resolve('./src')
    }
  }
}