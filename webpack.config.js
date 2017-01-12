'use strict';

const path = require('path');
const webpack = require('webpack');
const loaders = require('./webpack/loaders');
const plugins = require('./webpack/plugins');
const ENV = process.env.npm_lifecycle_event;
const JiT = ENV === 'build:jit';
if (JiT) {
  console.log('AoT: false');
}
module.exports = {
  entry: {
    app: './src/main.ts',
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: process.env.NODE_ENV === 'production' ?
      '[name].[chunkhash].js' : '[name].js',
    publicPath: '/',
    sourceMapFilename: process.env.NODE_ENV === 'production' ?
      '[name].[chunkhash].js.map' : '[name].js.map',
    chunkFilename: process.env.NODE_ENV === 'production' ?
      '[name].chunk.[chunkhash].js' : '[name].js',
  },

  devtool: process.env.NODE_ENV === 'production' ?
    'source-map' :
    'inline-source-map',

  resolve: {
    extensions: ['.webpack.js', '.web.js', '.ts', '.js'],
  },

  plugins: plugins,/*.concat([
    new webpack.DllReferencePlugin({
      context: '.',
      manifest: require('./dist/polyfills-manifest.json'),
    }),
    new webpack.DllReferencePlugin({
      context: '.',
      manifest: require('./dist/vendor-manifest.json'),
    }),
  ]),*/

  devServer: {
    historyApiFallback: { index: '/' },
    proxy: {},
  },

  module: {
    rules: [
      loaders.angular,
      loaders.tslint,
      loaders.ts_JiT,
      loaders.html,
      loaders.globalCss,
      loaders.localCss,
      loaders.svg,
      loaders.eot,
      loaders.woff,
      loaders.woff2,
      loaders.ttf,
    ],
  },
};
