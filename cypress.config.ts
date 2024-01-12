import { defineConfig } from 'cypress';
// import task from '@cypress/code-coverage/task';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      // task(on, config);
      // on('file:preprocessor', require('@cypress/code-coverage/use-babelrc'));
      return config;
    },
    env: {
      codeCoverage: {
        exclude: ['cypress/**/*.*'],
      },
    },
  },
});
