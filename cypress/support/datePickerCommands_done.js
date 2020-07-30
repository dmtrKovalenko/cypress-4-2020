// ⛔️⛔️⛔️⛔️⛔️⛔️⛔️⛔️⛔️⛔️⛔️⛔️
// Please do not look here until you complete the task
// You can, but you will not learn if you will not try to solve the challenge 😢
// If you get stuck please ping speaker in the workshop chat

// @ts-check
/// <reference types="cypress" />

/** @type {(subject: Cypress.Chainable<JQuery<HTMLElement>>) => void} */
export function openPicker(el) {
  console.log(el);
  cy.wrap(el)
    .findByLabelText(/Choose date/)
    .click();
}

Cypress.Commands.add("done_openPicker", { prevSubject: true }, openPicker);
