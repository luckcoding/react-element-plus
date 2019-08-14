const UglifyWebpackPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = (distRoot, optimize) => ({
  mode: 'production',
  optimization: {
    minimize: !!optimize,
    minimizer: [
      new UglifyWebpackPlugin({
        cache: true,
        parallel: true,
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
  },
  entry: './src/root.js',
  output: {
    path: distRoot,
    filename: optimize ? 'crude-ui.min.js' : 'crude-ui.js',
    library: 'CrudeUI',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            envName: `dist-${optimize ? 'prod' : 'dev'}`,
          },
        },
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ],
      },
    ],
  },
  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom',
    },
    'prop-types': {
      root: 'PropTypes',
      commonjs2: 'prop-types',
      commonjs: 'prop-types',
      amd: 'prop-types',
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: optimize ? 'crude-ui.min.css' : 'crude-ui.css',
      ignoreOrder: false,
    }),
  ],
});
