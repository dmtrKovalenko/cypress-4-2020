const dateInNextMonth = Cypress.moment().add(1, "month");
const todaysDate = Cypress.moment();

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
      .findByLabelText(todaysDate.format("MMM D, YYYY"))
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
      .findByLabelText(/next month/)
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
        todaysDate.add(-1, "day").format("MM/DD/YYYY")
      );
      cy.log(todaysDate.format());
      cy.log(todaysDate.add(-1, "day").format("MM/DD/YYYY"));
      cy.log(dateInNextMonth.format());
    });

    it("Arrow right", () => {
      cy.get("body").type("{rightarrow}{enter}");
      cy.get("[data-mui-test='datepicker-example'] input").should(
        "have.value",
        todaysDate.add(1, "day").format("MM/DD/YYYY")
      );
    });

    it("Arrow down", () => {
      cy.get("body").type("{downarrow}{enter}");
      cy.get("[data-mui-test='datepicker-example'] input").should(
        "have.value",
        todaysDate.add(1, "week").format("MM/DD/YYYY")
      );
    });

    it("Arrow up", () => {
      cy.get("body").type("{uparrow}");
      cy.wait(300);
      cy.get("body").type("{enter}");

      cy.get("[data-mui-test='datepicker-example'] input").should(
        "have.value",
        todaysDate.add(-1, "week").format("MM/DD/YYYY")
      );
    });

    it("Home", () => {
      cy.get("body").type("{home}{enter}");
      cy.get("[data-mui-test='datepicker-example'] input").should(
        "have.value",
        todaysDate.startOf("week").format("MM/DD/YYYY")
      );
    });

    it("End", () => {
      cy.get("body").type("{end}{enter}");
      cy.get("[data-mui-test='datepicker-example'] input").should(
        "have.value",
        todaysDate.endOf("week").format("MM/DD/YYYY")
      );
    });
  });
});
