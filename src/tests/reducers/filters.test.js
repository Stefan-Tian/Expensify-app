import moment from "moment";
import filtersReducers from "../../reducers/filters";

test("should set up default filter values", () => {
  const state = filtersReducers(undefined, { type: "@INIT" });
  expect(state).toEqual({
    text: "",
    sortBy: "date",
    startDate: moment().startOf("month"),
    endDate: moment().endOf("month")
  });
});

test("should set sortBy to amount", () => {
  const state = filtersReducers(undefined, { type: "SORT_BY_AMOUNT" });
  expect(state.sortBy).toBe("amount");
});

test("should set sortBy to date", () => {
  const currentState = {
    text: "",
    sortBy: "amount",
    startDate: undefined,
    endDate: undefined
  };
  const action = { type: "SORT_BY_DATE" };
  const state = filtersReducers(currentState, action);
  expect(state.sortBy).toBe("date");
});

test("should set text filter", () => {
  const currentState = {
    text: "",
    sortBy: "date",
    startDate: undefined,
    endDate: undefined
  };
  const action = { type: "SET_TEXT_FILTER", text: "someText" };
  const state = filtersReducers(currentState, action);
  expect(state.text).toBe("someText");
});

test("should set startDate filter", () => {
  const currentState = {
    text: "",
    sortBy: "date",
    startDate: undefined,
    endDate: undefined
  };
  const action = { type: "SET_START_DATE", date: moment(0) };
  const state = filtersReducers(currentState, action);
  expect(state.startDate).toEqual(moment(0));
});

test("should set endDate filter", () => {
  const currentState = {
    text: "",
    sortBy: "date",
    startDate: undefined,
    endDate: undefined
  };
  const action = { type: "SET_END_DATE", date: moment(0) };
  const state = filtersReducers(currentState, action);
  expect(state.endDate).toEqual(moment(0));
});
