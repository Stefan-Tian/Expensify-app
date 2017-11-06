import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
  startAddExpense,
  addExpense,
  editExpense,
  removeExpense
} from "../../actions/expenses";
import expenses from "../fixtures/expenses";
import database from "../../firebase/firebase";

const createMockStore = configureMockStore([thunk]); // provide middleware in an array

test("should remove expense action object", () => {
  const action = removeExpense({ id: "123abc" });
  expect(action).toEqual({
    type: "REMOVE_EXPENSE",
    id: "123abc"
  });
});

test("should edit expense action object", () => {
  const action = editExpense("123abc", { note: "New note value" });
  expect(action).toEqual({
    type: "EDIT_EXPENSE",
    id: "123abc",
    updates: {
      note: "New note value"
    }
  });
});

test("should set up add expense action object with correct values", () => {
  const action = addExpense(expenses[2]);
  expect(action).toEqual({
    type: "ADD_EXPENSE",
    expense: expenses[2]
  });
});

test("should add expense to database and store", done => {
  const store = createMockStore({});
  const expenseData = {
    description: "Gym membership",
    amount: 400,
    note: "Don't forget the protein =(",
    createdAt: 1000
  };

  store.dispatch(startAddExpense(expenseData)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: "ADD_EXPENSE",
      expense: {
        id: expect.any(String),
        ...expenseData
      }
    });

    return database
      .ref(`expenses/${actions[0].expense.id}`)
      .once("value")
      .then(snapshot => {
        expect(snapshot.val()).toEqual(expenseData);
        done(); // if we don't add done, the test would already without running the "then" call
      });
  });
});

test("should add expense with defaults to database and store", () => {
  const store = createMockStore({});
  const expenseData = {
    description: "",
    amount: 0,
    note: "",
    createdAt: 0
  };

  store.dispatch(startAddExpense(expenseData)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: "ADD_EXPENSE",
      expense: {
        id: expect.any(String),
        ...expenseData
      }
    });

    return database
      .ref(`expenses/${actions[0].expense.id}`)
      .once("value")
      .then(snapshot => {
        expect(snapshot.val()).toEqual(expenseData);
        done(); // if we don't add done, the test would already without running the "then" call
      });
  });
});

// test("should set up add expense action object with default values", () => {
//   const expenseDefault = {
//     description: "",
//     amount: 0,
//     createdAt: 0,
//     note: ""
//   };
//   const action = addExpense();
//   expect(action).toEqual({
//     type: "ADD_EXPENSE",
//     expense: {
//       ...expenseDefault,
//       id: expect.any(String)
//     }
//   });
// });
