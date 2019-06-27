// https://eslint.org/docs/user-guide/configuring
module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    node: true,
  },
  extends: ['plugin:vue/base','standard'],
  rules: {
    "camelcase": 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}
