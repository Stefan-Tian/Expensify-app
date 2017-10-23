import moment from "moment";

export default [
  {
    id: "1",
    description: "Gum",
    amount: 388,
    createdAt: 0,
    note: ""
  },
  {
    id: "2",
    description: "Rent",
    amount: 199995,
    createdAt: moment(0)
      .subtract(4, "days")
      .valueOf(),
    note: ""
  },
  {
    id: "3",
    description: "Credit Card",
    amount: 3000,
    createdAt: moment(0)
      .add(4, "days")
      .valueOf(),
    note: ""
  }
];
