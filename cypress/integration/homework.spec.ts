// Your homework is to cover with tests the DateRangePicker component from https://next.material-ui-pickers.dev/demo/daterangepicker
// Then please open a PR from your fork repository to the https://github.com/dmtrKovalenko/cypress-4-2020
// Review will be done in 1-3 days :) 
describe("Homework – DateRangePicker", () => {
    beforeEach(() => {
        // guess, there is a bug here, cause 6 month corresponds to June, however cy.clock is
        // defined as July.
        const now = new Date(2020, 7, 3).getTime()
        cy.clock(now);
        cy.visit("/demo/daterangepicker");

        cy.get(".MuiPickersDateRangePickerInput-root").eq(0).as("dateRangePicker");
    });

    it('Opens datepicker for Check-in', function () {
        cy.get("@dateRangePicker")
            .contains("Check-in")
            .parent()
            .find("input")
            .click();

        cy.executeInDatePicker()
            .findByLabelText("Aug 3, 2020")
            .should("be.enabled")
            .should("have.attr", "tabindex", "-1")
            .should("have.attr", "data-mui-test", "DateRangeDay");
    });

    it('Opens datepicker for Check-out', function () {
        cy.get("@dateRangePicker")
            .contains("Check-out")
            .parent()
            .find("input")
            .click();

        cy.executeInDatePicker()
            .findByLabelText("Aug 3, 2020")
            .should("be.enabled")
            .should("have.attr", "tabindex", "-1")
            .should("have.attr", "data-mui-test", "DateRangeDay");
    });

    it('Provide date range in calendar with keyboard', function () {
        cy.get("@dateRangePicker")
            .contains("Check-in")
            .parent()
            .find("input")
            .clear()
            .type("07/31/2020");

        cy.get("@dateRangePicker")
            .contains("Check-out")
            .parent()
            .find("input")
            .clear()
            .type("08/28/2020");

        cy.get("@dateRangePicker")
            .contains("Check-in")
            .parent()
            .find("input")
            .should("have.value", "07/31/2020");

        cy.get("@dateRangePicker")
            .contains("Check-out")
            .parent()
            .find("input")
            .should("have.value", "08/28/2020");
    });

    it.only('Select date range in date picker', function () {
        cy.get("@dateRangePicker")
            .contains("Check-in")
            .parent()
            .find("input")
            .click();

        cy.executeInDatePicker()
            .findByLabelText("Aug 4, 2020")
            .click();

        cy.executeInDatePicker()
            .findByLabelText("Aug 28, 2020")
            .click();

        cy.get("@dateRangePicker")
            .contains("Check-in")
            .parent()
            .find("input")
            .should("have.value", "08/04/2020");

        cy.get("@dateRangePicker")
            .contains("Check-out")
            .parent()
            .find("input")
            .should("have.value", "08/28/2020")

        cy.get("@dateRangePicker")
            .contains("Check-in")
            .parent()
            .find("input")
            .click();

        cy.executeInDatePicker()
            .findByLabelText("Aug 4, 2020")
            .should("be.enabled")
            .should("have.focus");

        cy.executeInDatePicker()
            .findByLabelText("Aug 28, 2020")
            .should("have.focus")
            .should("be.focused");
    });

});
