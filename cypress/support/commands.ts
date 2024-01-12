import '@testing-library/cypress/add-commands';

Cypress.Commands.overwrite(
  'select',
  (originalFn, subject, text, options = {}) => {
    return cy
      .wrap(subject)
      .type(`${text}{enter}`, { delay: 20, timeout: 10000, ...options });
  }
);
