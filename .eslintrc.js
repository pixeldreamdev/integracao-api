module.exports = {
  parser: '@babel/eslint-parser',
  extends: [
    'next/core-web-vitals',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['prettier', 'react-hooks'],
  rules: {
    'prettier/prettier': ['error', {}, { usePrettierrc: true }],
    'react/no-unescaped-entities': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
  parserOptions: {
    requireConfigFile: false,
    babelOptions: {
      presets: ['next/babel'],
    },
  },
};
