// This is base webpack config that extends by webpack.[env].config.js files.
// For extending we use webpack-merge module. Documentation see here: https://github.com/survivejs/webpack-merge

const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const ChunkManifestPlugin = require('chunk-manifest-webpack2-plugin');
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const getPlugins = function() {
  return [
    // By default webpack builds files even if there is some errors.
    // This plugin prevents webpack from building if there is any error occur;
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [
          autoprefixer(),
        ]
      }
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new CaseSensitivePathsPlugin(),
    // Extract all imported node_modules into separate chunk
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      minChunks: function (module) {
        return module.context && module.context.indexOf("node_modules") !== -1;
      }
    }),

    // Extract all webpack related code into separate chunk
    new webpack.optimize.CommonsChunkPlugin({
      name: "manifest",
      minChunks: Infinity
    }),

    // Since all our chunks needs to be included into index.html automatically,
    // lets save them to special manifest.json file to use that later with HtmlWebpackPlugin
    new ChunkManifestPlugin({
      filename: "./manifest.json",
      manifestVariable: "webpackManifest"
    }),

    // Inline all webpack related code into index.html
    new InlineManifestWebpackPlugin({
      name: 'webpackManifest'
    }),

    // Automatically inject all bundles into index.html
    new HtmlWebpackPlugin({
      alwaysWriteToDisk: true,
      inject: true,
      filename: '../index.html',
      template: './app.html',
      minify: false
    }),

    // Copy all localization files to /public/assets
    // to make them accessible to server
    new CopyWebpackPlugin([{from: './locales/**/*', to: '../assets/'}]),

    // This plugin is workaround to make HtmlWebpackPlugin work with webpack-dev-server
    // See this issue https://github.com/webpack/webpack-dev-server/issues/362
    new HtmlWebpackHarddiskPlugin(),
    // new BundleAnalyzerPlugin()
  ]
};

const fallback =  { loader: 'style-loader', options: { singleton: true, sourceMap: true } };

const styleLoader = [
  { loader: 'css-loader', options: { modules: true, importLoaders: 1, localIdentName: '[name]__[local]__[hash:base64:5]' }},
  { loader: 'postcss-loader' },
  { loader: 'resolve-url-loader' },
  { loader: 'stylus-loader', options: { sourceMap: true }}
];

const getRules = function(env) {
  return [
    {
      enforce: "pre",
      test: /^(?!.*\.spec\.js$).*\.jsx?$/,
      exclude: /node_modules/,
      loader: "eslint-loader",
      options: {
        emitWarning: true,
        failOnError: true,
        failOnWarning: false,
        quiet: true
      }
    },
    {
      test: /^(?!.*\.spec\.js$).*\.jsx?$/,
      exclude: [/node_modules\/(?!@betsplay)/, '/config/*.*'],
      loader: 'babel-loader'
    },
    {
      test: /\.css$/,
      use: [
        { loader: 'style-loader', options: { singleton: true, sourceMap: true }  },
        { loader: 'css-loader', options: { sourceMap: true, importLoaders: 2 } },
        { loader: 'postcss-loader' },
        { loader: 'resolve-url-loader' }
      ]
    },

    // this loader only for toastr module
    {
      test: /\.scss$/,
      use: [
        { loader: "style-loader" },
        { loader: "css-loader", options: { sourceMap: true } },
        { loader: "sass-loader", options: { sourceMap: true }
      }]
    },
    {
      test: /\.styl$/,
      //exclude: /node_modules\/(?!@betsplay)/,
      use: env === 'production' ? ExtractTextPlugin.extract({
        fallback: fallback,
        use: styleLoader
      }) : [fallback, ...styleLoader]
    },
    {
      test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
      loader: 'file-loader',
      options: {
        limit: 10000,
        name: '[name].[hash:base64:5].[ext]'
      }
    }
  ]
};

module.exports = function (env) {
  return {
    context: path.join(__dirname, '../../'),
    entry: [
      './app.js'
    ],
    output: {
      path: path.resolve('./public/assets'),
      filename: "[name].[chunkhash].js",
      chunkFilename: "[chunkhash].js",
      publicPath: '/assets/',
    },
    module: {
      rules: getRules(env),
    },
    resolve: {
      extensions: ['.js', '.json', '.jsx', '.css', '.styl'],
      alias: {
        react: path.resolve('./node_modules/react'),
        'react-dom': path.resolve('./node_modules/react-dom'),
        'prop-types': path.resolve('./node_modules/prop-types'),
        lodash: path.resolve('./node_modules/lodash'),
        theme: path.resolve(__dirname, '../../source/theme'),
        media: path.resolve(__dirname, '../../media'),
        components: path.resolve(__dirname, '../../source/components'),
        framework: path.resolve(__dirname, '../../source/framework'),
        configs: path.resolve(__dirname, '../../config')
      }
    },
    plugins: getPlugins(),
    node: {
      fs: 'empty',
      net: 'empty',
      tls: 'empty'
    }
  }
};