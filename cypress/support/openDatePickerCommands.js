import "@testing-library/cypress/add-commands";

export function executeInDatePicker() {
    return cy.findAllByRole("tooltip");
}

Cypress.Commands.add("executeInDatePicker", executeInDatePicker);
