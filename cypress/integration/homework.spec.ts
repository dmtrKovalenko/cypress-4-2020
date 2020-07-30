// Your homework is to cover with tests the DateRangePicker component from https://next.material-ui-pickers.dev/demo/daterangepicker
// Then please open a PR from your fork repository to the https://github.com/dmtrKovalenko/cypress-4-2020
// Review will be done in 1-3 days :) 
describe("Homework – DateRangePicker", () => {
  beforeEach(() => {
    cy.visit("/demo/daterangepicker");

    cy.get(".MuiPickersDateRangePickerInput-root").eq(0).as("dateRangePicker");
  });
});
