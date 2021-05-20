/* eslint import/no-extraneous-dependencies: ["off"] */

const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

new WebpackDevServer(
  webpack({
    devtool: 'eval',
    entry: [
      'webpack-dev-server/client?http://localhost:3000',
      'webpack/hot/only-dev-server',
      'react-hot-loader/patch',
      './index'
    ],
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'bundle.js'
    },
    plugins: [new webpack.HotModuleReplacementPlugin()],
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx']
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react']
            }
          },
          include: [
            path.join(__dirname, '../site'),
            path.join(__dirname, '../components'),
          ]
        },
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript']
          }
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: ['style-loader', 'css-loader', 'sass-loader']
        },
        {
          test: /\.(eot|svg|ttf|woff|woff2)(\?.+)?$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'fonts/'
              }
            }
          ]
        },
        {
          test: /\.(jpe?g|png|gif)(\?.+)?$/,
          use: 'url-loader'
        },
        {
          test: /\.md$/,
          use: 'raw-loader'
        }
      ]
    },
    mode: 'development'
  }),
  {
    publicPath: '/',
    hot: true,
    historyApiFallback: true,
    stats: { colors: true }
  }
).listen(3000, 'localhost', error => {
  if (error) {
    throw error;
  }
});