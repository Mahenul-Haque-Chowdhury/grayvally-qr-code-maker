import coreWebVitals from 'eslint-config-next/core-web-vitals';

const config = [
  ...coreWebVitals,
  {
    ignores: ['node_modules/**', '.next/**', 'out/**']
  },
  {
    rules: {
      // Cosmetic quoting in prose (terms/privacy pages)
      'react/no-unescaped-entities': 'off',
      // New react-hooks v6 advisory rules — existing patterns work correctly;
      // surface as warnings rather than blocking lint
      'react-hooks/set-state-in-effect': 'warn',
      'react-hooks/preserve-manual-memoization': 'warn'
    }
  }
];

export default config;
