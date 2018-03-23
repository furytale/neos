const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.config.common.js');

const getPlugins = function() {
  return [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      }
    })
  ];
};

module.exports = function(env) {
  return webpackMerge(commonConfig(), {
    entry: [
      // bundle the client for webpack-dev-server
      // and connect to the provided endpoint
      'webpack-dev-server/client?http://localhost:8080',

      // bundle the client for hot reloading
      // only- means to only hot reload for successful updates
      'webpack/hot/only-dev-server'
    ],
    output: {
      filename: "[name].js",
    },
    plugins: getPlugins(),
    devtool: 'cheap-module-source-map',
    devServer: {
      hot: true,
      compress: true,
      port: 8080,
      contentBase: './public',
      publicPath: '/assets/',
      historyApiFallback: true,
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    }
  });
};