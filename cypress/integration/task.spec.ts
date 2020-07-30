describe("Task 1 – DatePicker", () => {
  beforeEach(() => {
    cy.visit("/demo/datepicker");

    cy.findAllByRole("textbox").eq(0).parent().as("datepicker");
  });

  it("Opens picker", () => {
    cy.get("@datepicker")
      .findByLabelText(/Choose date/)
      .click();

    cy.findByRole("dialog")
      .findByLabelText("Jul 30, 2020")
      .should("be.focused")
      .should("have.attr", "tabindex", "0")
      .should("have.class", "Mui-selected");
  });

  it("Selects the date from another month", () => {});

  it("Allows to input date with only keyboard", () => {});

  context("Keyboard navigation", () => {
    it("Arrow left", () => {});
    it("Arrow right", () => {});
    it("Arrow down", () => {});
    it("Arrow up", () => {});
    it("Home", () => {});
    it("End", () => {});
  });
});
