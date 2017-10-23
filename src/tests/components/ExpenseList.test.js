import React from "react";
import { shallow } from "enzyme";
import ExpenseList from "../../components/ExpenseList";

test("should render ExpenseList with expenses", () => {
  const wrapper = shallow(<ExpenseList />);
  expect(wrapper).toMatchSnapshot();
});
