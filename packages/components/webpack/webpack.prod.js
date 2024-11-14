const { merge } = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const commonConfig = require('./webpack.common');

/** @type {import("webpack").Configuration} */
const prodConfig = {
  mode: 'production',
  output: {
    filename: 'rclt.min.js',
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
};

module.exports = merge(prodConfig, commonConfig);
