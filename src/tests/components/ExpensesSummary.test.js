import React from "react";
import { shallow } from "enzyme";
import { ExpensesSummary } from "../../components/ExpensesSummary";

test("should correctly render ExpenseSummary with 1 expense", () => {
  const wrapper = shallow(
    <ExpensesSummary expenseCount={1} expensesTotal={255} />
  );
  expect(wrapper).toMatchSnapshot();
});

test("should correctly render ExpenseSummary with multiple expenses", () => {
  const wrapper = shallow(
    <ExpensesSummary expenseCount={2} expensesTotal={99999} />
  );
  expect(wrapper).toMatchSnapshot();
});
