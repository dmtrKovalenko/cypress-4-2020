const dateInNextMonth = Cypress.moment().add(1, "month");

describe("Task 1 – DatePicker", () => {
  beforeEach(() => {
    cy.visit("/demo/datepicker");

    cy.findAllByRole("textbox").eq(0).parent().as("datepicker");
  });

  it("Opens picker", () => {
    cy.get("@datepicker")
      .findByLabelText(/Choose date/i)
      .click();

    cy.findByRole("dialog")
      .findByLabelText(Cypress.moment().format("MMM D, YYYY"))
      .should("be.focused")
      .should("have.attr", "tabindex", "0")
      .should("have.class", "Mui-selected")
      .should("have.css", "background-color", "rgb(67, 160, 71)");
  });

  it("Selects the date from another month", () => {
    cy.get("@datepicker")
      .findByLabelText(/Choose date/i)
      .click();

    cy.executeInPicker()
      .findByLabelText(/next month/i)
      .click();
    cy.executeInPicker().contains(dateInNextMonth.format("D")).click();

    cy.get("[data-mui-test='datepicker-example'] input").should(
      "have.value",
      dateInNextMonth.format("MM/DD/YYYY")
    );
  });

  it("Allows to input date with only keyboard", () => {
    cy.get("[data-mui-test='datepicker-example'] input")
      .clear()
      .type(dateInNextMonth.format("MM/DD/YYYY"));

    cy.get("@datepicker")
      .findByLabelText(/Choose date/i)
      .click();

    cy.executeInPicker()
      .find(".Mui-selected")
      .should("have.attr", "aria-label", dateInNextMonth.format("MMM D, YYYY"));
  });

  context("Keyboard navigation", () => {
    beforeEach(() => {
      cy.get("@datepicker")
        .findByLabelText(/Choose date/i)
        .click();
    });

    it("Arrow left", () => {
      cy.get("body").type("{leftarrow}{enter}");
      cy.get("[data-mui-test='datepicker-example'] input").should(
        "have.value",
        Cypress.moment().add(-1, "day").format("MM/DD/YYYY")
      );
    });

    it("Arrow right", () => {
      cy.get("body").type("{rightarrow}{enter}");
      cy.get("[data-mui-test='datepicker-example'] input").should(
        "have.value",
        Cypress.moment().add(1, "day").format("MM/DD/YYYY")
      );
    });

    it("Arrow down", () => {
      cy.get("body").type("{downarrow}{enter}");
      cy.get("[data-mui-test='datepicker-example'] input").should(
        "have.value",
        Cypress.moment().add(1, "week").format("MM/DD/YYYY")
      );
    });

    it("Arrow up", () => {
      cy.get("body").type("{uparrow}{enter}");

      cy.get("[data-mui-test='datepicker-example'] input").should(
        "have.value",
        Cypress.moment().add(-1, "week").format("MM/DD/YYYY")
      );
    });

    it("Home", () => {
      cy.get("body").type("{home}{enter}");
      cy.get("[data-mui-test='datepicker-example'] input").should(
        "have.value",
        Cypress.moment().startOf("week").format("MM/DD/YYYY")
      );
    });

    it("End", () => {
      cy.get("body").type("{end}{enter}");
      cy.get("[data-mui-test='datepicker-example'] input").should(
        "have.value",
        Cypress.moment().endOf("week").format("MM/DD/YYYY")
      );
    });
  });
});
