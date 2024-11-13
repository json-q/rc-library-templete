module.exports = {
  presets: ['@babel/env', '@babel/typescript', '@babel/react'],
  // @babel/transform-runtime 的 helper 选项默认为 true
  plugins: ['@babel/plugin-transform-runtime'],

  env: {
    esm: {
      presets: [['@babel/env', { modules: false }]],
    },
  },
};
