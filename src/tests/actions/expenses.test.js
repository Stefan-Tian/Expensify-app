import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
  addExpense,
  startAddExpense,  
  editExpense,
  startEditExpense,
  removeExpense,
  startRemoveExpense,  
  setExpenses,
  startSetExpenses,
} from "../../actions/expenses";
import expenses from "../fixtures/expenses";
import database from "../../firebase/firebase";

const createMockStore = configureMockStore([thunk]); // provide middleware in an array

beforeEach(done => {
  const expenseData = {};
  expenses.forEach(({id, description, note, amount, createdAt}) => {
    expenseData[id] = { description, note, amount, createdAt }
  });
  database.ref("expenses").set(expenseData).then(() => done());
});

test("should remove expense action object", () => {
  const action = removeExpense({ id: "123abc" });
  expect(action).toEqual({
    type: "REMOVE_EXPENSE",
    id: "123abc"
  });
});

test("should remove expense from firebase", done => {
  const store = createMockStore({});
  const id = expenses[2].id;
  store.dispatch(startRemoveExpense({ id }))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: "REMOVE_EXPENSE",
        id
      });
      return database.ref(`expenses/${id}`).once("value");
    }).then(snapshot => { // if the snapshot is empty, it'll return NULL
      expect(snapshot.val()).toBeFalsy();
      done();
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

test("should edit expense from firebase", done => {
  const store = createMockStore({});
  const { id, amount, createdAt, description, note } = expenses[0];
  const updates = { note: "I'm updated" };
  store.dispatch(startEditExpense(id, updates))
  .then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: "EDIT_EXPENSE",
      id,
      updates
    });
    return database.ref(`expenses/${id}`).once("value");
  }).then(snapshot => {
    expect(snapshot.val().note).toBe(updates.note);
    done();
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

test("should add expense with defaults to database and store", done => {
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

test("should setup set expense action object with data", () => {
  const action = setExpenses(expenses);
  expect(action).toEqual({
    type: "SET_EXPENSES",
    expenses
  });
});

test("should fetch expenses from firebase", done => {
  const store = createMockStore({});
  store.dispatch(startSetExpenses()).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: "SET_EXPENSES",
      expenses
    });
    done();
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
