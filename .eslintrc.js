module.exports = {
  extends: 'airbnb-base',
  plugins: ['mocha'],
  env: {
    mocha: true,
    node: true
  },
  rules: {
    'linebreak-style': ['error', 'windows'],
    'func-names': ['error', 'never'],
    'no-console': 'off',
    'no-param-reassign': ['error', { props: false }],
    'no-shadow': ['error', { allow: ['err', 'error'] }]
  }
};
