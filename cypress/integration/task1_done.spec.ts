// ⛔️⛔️⛔️⛔️⛔️⛔️⛔️⛔️⛔️⛔️⛔️⛔️
// Please do not look here until you complete the task
// You can, but you will not learn if you will not try to solve the challenge 😢
// If you get stuck please ping speaker in the workshop chat

describe("Task 1 – DatePicker", () => {
  beforeEach(() => {
    cy.clock(new Date("2020-03-08T09:59:42.963Z").getTime());
    cy.visit("/demo/datepicker");

    cy.findAllByRole("textbox").eq(0).parent().as("datepicker");
  });

  it("Opens picker", () => {
    cy.get("@datepicker").done_openPicker();

    cy.executeInPicker()
      .findByLabelText("Mar 8, 2020")
      .should("be.focused")
      .should("have.attr", "tabindex", "0")
      .should("have.class", "Mui-selected");
  });

  it("Selects the date from another month", () => {
    cy.get("@datepicker")
      .findByLabelText(/Choose date/)
      .click();

    cy.executeInPicker().findByLabelText("next month").click();
    cy.executeInPicker().findByLabelText("Apr 19, 2020").click();

    cy.get("@datepicker")
      .findByLabelText(/selected date is apr 19, 2020/i)
      .should("exist");
  });

  it("Allows to input date with only keyboard", () => {
    cy.get("@datepicker").findByRole("textbox").clear().type("04/19/2010");
    cy.get("@datepicker")
      .findByLabelText(/selected date is apr 19, 2010/i)
      .should("exist")
      .click();

    cy.executeInPicker().findByText("April").should("be.visible");
    cy.executeInPicker().findByText("2010").should("be.visible");
  });

  context("Keyboard navigation", () => {
    beforeEach(() => {
      cy.get("@datepicker")
        .findByLabelText(/Choose date/)
        .click();
    });

    it("Arrow left", () => {
      cy.get("body").type("{rightarrow}");
      cy.executeInPicker().findByLabelText("Mar 9, 2020").should("be.focused");
    });
    it("Arrow right", () => {
      cy.get("body").type("{leftarrow}");
      cy.executeInPicker().findByLabelText("Mar 7, 2020").should("be.focused");
    });
    it("Arrow down", () => {
      cy.get("body").type("{downarrow}{downarrow}");
      cy.executeInPicker().findByLabelText("Mar 22, 2020").should("be.focused");
    });
    it("Arrow up", () => {
      cy.get("body").type("{uparrow}");
      cy.executeInPicker().findByLabelText("Mar 1, 2020").should("be.focused");
    });
    it("Home", () => {
      cy.get("body").type("{leftarrow}{home}");
      cy.executeInPicker().findByLabelText("Mar 1, 2020").should("be.focused");
    });
    it("End", () => {
      cy.get("body").type("{end}");
      cy.executeInPicker().findByLabelText("Mar 14, 2020").should("be.focused");
    });
  });
});
