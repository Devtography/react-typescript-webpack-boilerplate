const lodash = require('lodash');
const path = require('path');
const webpack = require('webpack');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const isEnvProduction = process.env.NODE_ENV === 'production';
const isEnvDevelopment = process.env.NODE_ENV === 'development';
const isDebugClient = process.env.DEBUG_ENV === 'client';

const commonConfig = {
  devtool: isEnvDevelopment ? 'source-map' : false,
  mode: isEnvProduction ? 'production' : 'development',
  node: {
    __dirname: false,
    __filename: false,
  },
  optimization: {
    minimizer: [new TerserPlugin()],
  },
  resolve: {
    alias: {
      _: path.join(__dirname, 'src'),
      _app: path.join(__dirname, 'src/app'),
      _types: path.join(__dirname, 'src/types'),
      _utils: path.join(__dirname, 'src/utils'),
      _public: path.join(__dirname, 'public'),
    },
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
      },
      {
        test: /\.(jpg|png|svg|ico|icns)$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        },
      },
    ],
  }, // end module
};

// #region WebApp module
const webAppModule = lodash.cloneDeep(commonConfig);
webAppModule.entry = './src/app/index.tsx';
webAppModule.output = {
  filename: '[name].bundle.js',
  chunkFilename: '[name].bundle.js',
  path: path.join(__dirname, 'dist'),
  publicPath: '/',
};
webAppModule.resolve.extensions.push('.css', '.scss');
webAppModule.module.rules.push({
  test: /\.(scss|css)$/,
  use: ['style-loader', 'css-loader', 'sass-loader'],
});
webAppModule.devServer = {
  static: {
    directory: path.join(__dirname, 'public'),
  },
  port: 3000,
  hot: true,
  historyApiFallback: true,
};
webAppModule.optimization.moduleIds = isEnvProduction ? 'size' : 'named';
webAppModule.optimization.splitChunks = {
  chunks: 'all',
  cacheGroups: {
    vendor: {
      test: /[\\/]node_modules[\\/]/,
      name(module) {
        // get the name. E.g. node_modules/packageName/not/this/part.js
        // or node_modules/packageName
        const packageName = module.context.match(
          /[\\/]node_modules[\\/](.*?)([\\/]|$)/
        )[1];

        // npm package names are URL-safe, but some servers don't like @ symbols
        return `npm.${packageName.replace('@', '')}`;
      },
    },
  },
};
webAppModule.plugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': isEnvProduction ?
      JSON.stringify('production') : JSON.stringify('development'),
  }),
  new CompressionWebpackPlugin({
    test: /\.js$|\.css$|\.html$/,
    minRatio: 1,
  }),
  new CopyPlugin({
    patterns: [
      { from: './public/favicon.ico', to: './favicon.ico' },
      {
        from: './public/img',
        to: './img',
        noErrorOnMissing: true,
      },
    ]
  }),
  new HtmlWebpackPlugin({
    minify: {
      collapseWhitespace: true,
      removeComments: true,
      removeAttributeQuotes: true,
    },
    template: path.resolve(__dirname, './public/index.html'),
  }),
  new webpack.HotModuleReplacementPlugin(),
];
// #endregion

module.exports = webAppModule;
