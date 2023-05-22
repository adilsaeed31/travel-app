module.exports = {
  root: true,
  extends: [
    '@react-native-community',
    'plugin:@tanstack/eslint-plugin-query/recommended',
  ],
  plugins: ['@tanstack/query'],
  rules: {
    semi: ['error', 'never'],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
}
