const path = require('path');
const webpack = require('webpack');
// const UglifyWebpackPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = (distRoot, optimize) => {
  const filename = optimize ? 'crude-ui.min.js' : 'crude-ui.js';
  const plugins = [
    new webpack.SourceMapDevToolPlugin({
      filename: `${filename}.map`,
    }),
  ];
  if (process.env.ANALYZE === 'true') {
    plugins.push(new BundleAnalyzerPlugin());
  }
  return {
    mode: 'production',
    optimization: {
      minimize: !!optimize,
      minimizer: [
        // new UglifyWebpackPlugin({
        //   cache: true,
        //   parallel: true,
        // }),
        new CssMinimizerPlugin({}),
      ],
    },
    entry: {
      CrudeUI: path.join(__dirname, '../components/root.ts'),
    },
    output: {
      path: distRoot,
      filename,
      library: 'CrudeUI',
      libraryTarget: 'umd',
    },
    module: {
      rules: [
        {
          test: /\.[tj]sx?$/,
          use: {
            loader: 'babel-loader?babelrc',
            options: {
              cacheDirectory: true,
              envName: `dist-${optimize ? 'prod' : 'dev'}`,
            },
          },
          exclude: /node_modules/,
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            { loader: MiniCssExtractPlugin.loader },
            {
              loader: 'css-loader',
              options: { sourceMap: true },
            },
            {
              loader: 'postcss-loader',
              // options: {
              //   postcssOptions: {
              //     plugins:
              //   }
              // }
            },
            'sass-loader',
          ],
        },
        {
          test: /\.(ttf|eot|woff|woff2|otf|svg)/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: './font/[name].[ext]',
              },
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: ['.js', '.ts', '.tsx'],
    },
    externals: [
      /^react\/.+$/,
      /^react-dom\/.+$/,
      /^lodash\/.+$/,
      /^@babel\/runtime\/.+$/,
    ],
    plugins,
  };
};
