describe("Task 1 – DatePicker", () => {
    beforeEach(() => {
        // guess, there is a bug here, cause 6 month corresponds to June, however cy.clock is
        // defined as July.
        const now = new Date(2020, 6, 30).getTime()
        cy.clock(now);

        cy.visit("/demo/datepicker");
        cy.findAllByRole("textbox").eq(0).parent().as("datepicker");
    });

    it("Opens picker", () => {
        cy.get("@datepicker")
            .findByLabelText(/Choose date/)
            .click();

        cy.executeInPicker()
            .findByLabelText("Jul 30, 2020")
            .should("be.focused")
            .should("have.attr", "tabindex", "0")
            .should("have.class", "Mui-selected");
    });

    it("Selects the date from another month", () => {
        cy.get("@datepicker")
            .findByLabelText(/Choose date/)
            .click()

        cy.executeInPicker()
            .findByLabelText("next month")
            .click();

        cy.executeInPicker()
            .findByLabelText("Aug 5, 2020")
            .click();

        cy.get("@datepicker")
            .findByPlaceholderText("mm/dd/yyyy")
            .should("have.value", "08/05/2020")
    });

    it("Allows to input date with only keyboard", () => {
        cy.get("@datepicker")
            .findAllByPlaceholderText("mm/dd/yyyy")
            .clear()
            .type("07/31/2020")

        cy.findAllByPlaceholderText("mm/dd/yyyy")
            .should("have.value", "07/31/2020")
            .should("have.attr", "aria-invalid", "false");

    });

    context("Keyboard navigation", () => {
        beforeEach( () => {
            cy.get("@datepicker")
                .findByLabelText(/Choose date/)
                .click();
        })

        it("Arrow left", () => {
            cy.get("body")
                .type("{leftarrow}");

            cy.executeInPicker()
                .findByLabelText("Jul 29, 2020")
                .should("be.focused");
        });
        it("Arrow right", () => {
            cy.get("body")
                .type("{rightarrow}");

            cy.executeInPicker()
                .findByLabelText("Jul 31, 2020")
                .should("be.focused");
        });
        it("Arrow down", () => {
            cy.get("body")
                .type("{downarrow}{downarrow}");

            cy.executeInPicker()
                .findByLabelText("Aug 13, 2020")
                .should("be.focused");
        });
        it("Arrow up", () => {
            cy.get("body")
                .type("{uparrow}");

            cy.executeInPicker()
                .findByLabelText("Jul 23, 2020")
                .should("be.focused");
        });
        it("Home", () => {
            cy.get("body")
                .type("{home}");

            cy.executeInPicker()
                .findByLabelText("Jul 26, 2020")
                .should("be.focused");
        });
        it.only("End", () => {
            cy.get("body")
                .type("{end}{end}");

            cy.executeInPicker()
                .findByLabelText("Aug 1, 2020")
                .should("be.focused");
        });
    });
});
