/** @type {import("stylelint").Config} */
module.exports = {
  plugins: ['stylelint-order'],
  customSyntax: 'postcss-less',
  extends: [
    'stylelint-config-recommended',
    'stylelint-prettier/recommended',
    'stylelint-config-recess-order',
    'stylelint-config-standard-less',
  ],
  rules: {
    'color-function-notation': null,
    'less/no-duplicate-variables': null,
  },
  ignoreFiles: ['**/.js', '/*.jsx', '/.tsx', '**/.ts', '**/dist/**', '**/es/**', '**/lib/**', '**/node_modules/**'],
};
