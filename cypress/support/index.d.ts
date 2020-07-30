/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Chain to the datepicker popout root
     * @example cy.executeInDatePicker().findByText("2010")
     */
    executeInPicker: typeof import("./commands.js").executeInPicker;
    // this 2 commands are identical, but openPicker is not implemented –> please implement it yourself
    openPicker: () => void;
    done_openPicker: () => void;
  }
}
