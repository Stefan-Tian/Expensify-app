import expensesReducer from "../../reducers/expenses";
import expenses from "../fixtures/expenses";

test("should set default state", () => {
  const state = expensesReducer(undefined, { type: "@INIT" });
  expect(state).toEqual([]);
});

test("should remove expense by id", () => {
  const action = { type: "REMOVE_EXPENSE", id: expenses[1].id };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([expenses[0], expenses[2]]);
});

test("should not remove expenses if id not found", () => {
  const action = { type: "REMOVE_ACTION", id: -1 };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});

test("should add an expense", () => {
  const newExpense = {
    id: 4,
    description: "test fee",
    amount: 50000000,
    note: "so expensive"
  };
  const action = {
    type: "ADD_EXPENSE",
    expense: newExpense
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([...expenses, newExpense]);
});

test("should edit an expense by id", () => {
  const updates = { amount: 2000000 };
  const action = {
    type: "EDIT_EXPENSE",
    id: expenses[2].id,
    updates
  };
  const state = expensesReducer(expenses, action);
  expect(state[2].amount).toBe(2000000);
});

test("shoulf not edit any expense if id not found", () => {
  const updates = { notes: "I must not show!!!!!" };
  const action = {
    type: "EDIT_EXPENSE",
    id: -2,
    updates
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});

test("should set expenses", () => {
  const action = {
    type: "SET_EXPENSES",
    expenses: [expenses[1]]
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([expenses[1]]);
});
