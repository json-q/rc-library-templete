const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');

/** @type {import("webpack").Configuration} */
const devConfig = {
  mode: 'development',
  output: {
    filename: 'rclt.js',
  },
};

module.exports = merge(devConfig, commonConfig);
