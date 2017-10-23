import { createStore, combineReducers } from "redux";
import uuid from "uuid";

// add expense
const addExpense = (
  { description = "", note = "", amount = 0, createdAt = 0 } = {}
) => ({
  type: "ADD_EXPENSE",
  expense: {
    id: uuid(),
    description,
    note,
    amount,
    createdAt
  }
});
// remove expense
const removeExpense = ({ id } = {}) => ({
  type: "REMOVE_EXPENSE",
  id
});

// edit expense
const editExpense = (id, updates) => ({
  type: "EDIT_EXPENSE",
  id,
  updates
});

// set_text_filter
const setTextFilter = (text = " ") => ({
  type: "SET_TEXT_FILTER",
  text
});

// sort_by_date
const sortByDate = () => ({
  type: "SORT_BY_DATE"
});

// sort_by_amount
const sortByAmount = () => ({
  type: "SORT_BY_AMOUNT"
});

// set_start_date
const setStartDate = (date = undefined) => ({
  type: "SET_START_DATE",
  date
});

// set_end_date
const setEndDate = (date = undefined) => ({
  type: "SET_END_DATE",
  date
});

// Expenses Reducer
const expensesDefaultState = [];
const expensesReducer = (state = expensesDefaultState, action) => {
  switch (action.type) {
    case "ADD_EXPENSE":
      return [...state, action.expense]; // spread operator
    case "REMOVE_EXPENSE":
      return state.filter(({ id }) => id !== action.id);
    case "EDIT_EXPENSE":
      return state.map(expense => {
        if (expense.id === action.id) {
          return {
            ...expense,
            ...action.updates
          };
        }
        return expense;
      });
    default:
      return state;
  }
};

const filtersDefaultState = {
  text: "",
  sortBy: "date",
  startDate: undefined,
  endDate: undefined
};
const filtersReducer = (state = filtersDefaultState, action) => {
  switch (action.type) {
    case "SET_TEXT_FILTER":
      return {
        ...state,
        text: action.text
      };
    case "SORT_BY_DATE":
      return {
        ...state,
        sortBy: "date"
      };
    case "SORT_BY_AMOUNT":
      return {
        ...state,
        sortBy: "amount"
      };
    case "SET_START_DATE":
      return {
        ...state,
        startDate: action.date
      };
    case "SET_END_DATE":
      return {
        ...state,
        endDate: action.date
      };
    default:
      return state;
  }
};

// timestamps (milliseconds)
// January 1st 1970 (unix epoch)

// Get visible expenses
// The startDate and endDate are undefined in the beginning.
// If they aren't a number, we can assume that those dates
// haven't been set yet so by default startDateMatch and
// endDateMatch will be true rendering all of the expenses (based on their date).
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
  return expenses
    .filter(expense => {
      const startDateMatch =
        typeof startDate !== "number" || expense.createdAt >= startDate;
      const endDateMatch =
        typeof endDate !== "number" || expense.createdAt <= endDate;
      const textMatch = expense.description
        .toLowerCase()
        .includes(text.toLowerCase());
      return startDateMatch && endDateMatch && textMatch;
    })
    .sort((a, b) => {
      if (sortBy === "date") {
        return a.createdAt < b.createdAt ? 1 : -1; // if -1 a will come first
      } else if (sortBy === "amount") {
        return a.amount < b.amount ? 1 : -1;
      }
    });
};

const store = createStore(
  combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer
  })
);

store.subscribe(() => {
  const state = store.getState();
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
  console.log(visibleExpenses);
});

const expenseOne = store.dispatch(
  addExpense({ description: "Rent", amount: 1000, createdAt: -500 })
);
const expenseTwo = store.dispatch(
  addExpense({ description: "Coffee", amount: 4, createdAt: -1000 })
);

// store.dispatch(removeExpense({ id: expenseTwo.expense.id }));
// store.dispatch(editExpense(expenseOne.expense.id, { amount: 500 }));

// store.dispatch(setTextFilter("ffe"));
// store.dispatch(setTextFilter());

store.dispatch(sortByAmount());
// store.dispatch(sortByDate());

// store.dispatch(setStartDate(2000));
// store.dispatch(setStartDate());
// store.dispatch(setEndDate(999));

// const demoState = {
//   expenses: [
//     {
//       id: "13313",
//       description: "Jan Rent",
//       note: "This is the first payment for the semester",
//       amount: 54500,
//       createAt: 0
//     }
//   ],
//   filters: {
//     text: "rent",
//     sortBy: "amount",
//     startDate: undefined,
//     endDate: undefined
//   }
// };

// const demoObject = {
//   name: "jane",
//   age: 32
// };

// const demoObject2 = {
//   ...demoObject,
//   location: "Philadelphia",
//   age: 27
// };

// console.log(demoObject2);
