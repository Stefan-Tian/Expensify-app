import { createStore } from "redux";

// Action Generator - functions that return action objects

console.log();

const incrementCount = ({ incrementBy = 1 } = {}) => ({
  type: "INCREMENT",
  incrementBy
});

const decrementCount = ({ decrementBy = 1 } = {}) => ({
  type: "DECREMENT",
  decrementBy
});

const setCount = ({ setValue = 100 } = {}) => ({
  type: "SET",
  setValue
});

const resetCount = () => ({
  type: "RESET"
});

// Reducers
// 1. Rudecers are pure functions
// 2. Never change the state itself or action

const countReducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + action.incrementBy };
    case "DECREMENT":
      const decrementBy =
        typeof action.decrementBy === "number" ? action.decrementBy : 1;
      return { count: state.count - decrementBy };
    case "RESET":
      return { count: 0 };
    case "SET":
      return { count: action.setValue };
    default:
      return state;
  }
};

const store = createStore(countReducer);

// this function will fire each time we change our state
const unsubscribe = store.subscribe(() => console.log(store.getState()));

// store is the thing that track our changing data
// we have to pass a function in createStore as the first argument

store.dispatch(incrementCount({ incrementBy: 5 }));

store.dispatch(incrementCount());

store.dispatch(resetCount());

store.dispatch(decrementCount({ decrementBy: 8 }));

store.dispatch(setCount({ setValue: 10000 }));

unsubscribe(); // the printing will stop here
