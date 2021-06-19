const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const basePath = path.resolve(__dirname, '../../');

module.exports = {
  entry: {
    site: path.join(basePath, 'site')
  },
  output: {
    path: path.resolve(basePath, 'dist/site'),
    chunkFilename: '[chunkhash:12].js',
    filename: '[chunkhash:12].js'
  },
  optimization: {
    minimize: true
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[chunkhash:12].css'
    }),
    new HtmlWebpackPlugin({
      template: path.join(basePath, 'site/index.html'),
      favicon: path.join(basePath, 'site/assets/favicon.ico')
    }),
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('production') }),
    new webpack.optimize.ModuleConcatenationPlugin()
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  module: {
    rules: [{
      test: /\.(t|j)sx?$/,
      use: ['babel-loader'],
      include: [
        path.join(basePath, 'site'),
        path.join(basePath, 'src'),
      ]
    }, {
      test: /\.css$/,
      use: [MiniCssExtractPlugin.loader, "css-loader"]
    }, {
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader']
    }, {
      test: /\.(ttf|eot|svg|woff|woff2)(\?.+)?$/,
      use: 'file-loader?name=[hash:12].[ext]'
    }, {
      test: /\.(jpe?g|png|gif)(\?.+)?$/,
      use: 'url-loader?name=[hash:12].[ext]&limit=25000'
    }, {
      test: /\.md$/,
      use: 'raw-loader'
    }]
  },
  mode: 'production'
};
