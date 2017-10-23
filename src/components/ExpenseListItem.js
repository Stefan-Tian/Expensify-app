import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import selectExpenses from "../selectors/expenses";
import { removeExpense } from "../actions/expenses";

export const ExpenseListItem = ({ expenses, dispatch }) => (
  <div>
    {expenses.map(({ id, description, amount, createdAt }, index) => (
      <div key={index}>
        <h3>{description}</h3>
        <p>Amount: {amount}</p>
        <p>CreatedAt: {createdAt}</p>
        <button
          onClick={() => {
            dispatch(removeExpense({ id }));
          }}
        >
          Remove
        </button>
        <Link to={`/edit/${id}`}>Edit</Link>
      </div>
    ))}
  </div>
);

const mapStateToProps = ({ expenses, filters }) => ({
  expenses: selectExpenses(expenses, filters)
});

export default connect(mapStateToProps)(ExpenseListItem);
// when we use connect dispatch is added by default
