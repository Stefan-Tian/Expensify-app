// set_text_filter
export const setTextFilter = (text = "") => ({
  type: "SET_TEXT_FILTER",
  text
});

// sort_by_date
export const sortByDate = () => ({
  type: "SORT_BY_DATE"
});

// sort_by_amount
export const sortByAmount = () => ({
  type: "SORT_BY_AMOUNT"
});

// set_start_date
export const setStartDate = (date = undefined) => ({
  type: "SET_START_DATE",
  date
});

// set_end_date
export const setEndDate = (date = undefined) => ({
  type: "SET_END_DATE",
  date
});
