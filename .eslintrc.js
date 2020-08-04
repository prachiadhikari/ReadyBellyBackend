module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    "semi" : ["error", "always"], // valid values ["off/error/warning", "always"]
    "quotes" : ["warn", "double"],
    "no-console": "off",
    "camelcase" : "warn"
  },
};
