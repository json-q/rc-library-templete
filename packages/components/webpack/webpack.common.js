const path = require('path');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const WebpackBarPlugin = require('webpackbar');

/** @type {import("webpack").Configuration} */
module.exports = {
  bail: true,
  // devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  entry: {
    index: path.resolve(__dirname, '../src/index.ts'),
  },
  output: {
    // filename: 'jwstwe-ui.min.js',
    path: path.join(__dirname, '../dist'),
    library: 'rclt',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /.js(x?)$/,
        use: [{ loader: 'babel-loader' }],
        exclude: /node_modules/,
      },
      {
        test: /.ts(x?)$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },

  // 组件库不直接集成 react 和 react-dom
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
  },
  plugins: [new CaseSensitivePathsPlugin(), new WebpackBarPlugin()],
};
