module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
  globals: {
    test: 'readonly',
  },
  rules: {
    camelcase: [
      2,
      {
        properties: 'never',
        ignoreDestructuring: true,
        ignoreImports: true,
        ignoreGlobals: true,
      },
    ],
    'consistent-return': 2,
    'default-case': 2,
    'no-dupe-keys': 2,
    'no-else-return': 2,
    'no-undef': 2,
    'no-unneeded-ternary': 2,
    'no-unreachable': 2,
    'no-unused-vars': 2,
    'object-shorthand': 2,
    'operator-assignment': 2,
    'prefer-arrow-callback': 2,
    'require-await': 2,
  },
}
