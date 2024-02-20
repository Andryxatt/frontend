module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'react', 'react-hooks'],
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:react/recommended',
      'plugin:react-hooks/recommended',
      // If you have prettier installed, you can extend its recommended config
      // 'plugin:prettier/recommended',
    ],
    settings: {
      react: {
        version: 'detect', // Automatically detect the React version
      },
    },
    rules: {
      // Add your project specific rules here
      // For example:
      // 'react/prop-types': 'off', // Disable prop-types validation
    },
  };
  