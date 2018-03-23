const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.config.common.js');
const WebpackChunkHash = require('webpack-chunk-hash');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const getPlugins = function() {
  return [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
        'BABEL_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new UglifyJsPlugin({
      parallel: true,
      exclude: [/\.min\.js$/gi],
      uglifyOptions: {
        ie8: false,
        ecma: 8,
        output: {
          comments: false,
          beautify: false,
        },
        compress: {
          drop_console: true,
          keep_infinity: true,
        },
        warnings: false
      }
    }),
    new WebpackChunkHash(),
    new webpack.HashedModuleIdsPlugin(),
    new ExtractTextPlugin({
      filename: "[name].[contenthash].css",
      allChunks: true,
      ignoreOrder: false
    }),
    new OptimizeCssAssetsPlugin({
      cssProcessor: require('cssnano'),
      cssProcessorOptions: { discardComments: { removeAll: true } },
      canPrint: true
    })
  ];
};

module.exports = function(env) {
  return webpackMerge(commonConfig(env), {
    devtool: false,
    plugins: getPlugins()
  })
};