'use strict';

const webpack = require('webpack');
const path = require('path');
const ENV = process.env.npm_lifecycle_event;
const JiT = ENV === 'build:jit';
if (JiT) {
  console.log('AoT: false');
}
module.exports = {
  entry: {
    vendor: [path.join(__dirname, 'src', 'vendor.ts')],
    polyfills: [path.join(__dirname, 'src', 'polyfills.ts')],
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].dll.js',
    library: '[name]',
    publicPath: '/',
  },

  plugins: [
    new webpack.DllPlugin({
      // The path to the manifest file which maps between
      // modules included in a bundle and the internal IDs
      // within that bundle
      path: 'dist/[name]-manifest.json',
      // The name of the global variable which the library's
      // require function has been assigned to. This must match the
      // output.library option above
      name: '[name]',
      context: path.resolve(__dirname, 'src'),
    }),
  ],
};
