import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import numeral from "numeral";
import selectExpenses from "../selectors/expenses";
import { startRemoveExpense } from "../actions/expenses";

export const ExpenseListItem = ({ expenses, dispatch }) => (
  <div className="content-container">
    <div className="list-header">
      <div className="show-for-mobile">Expenses</div>
      <div className="show-for-large-screen">Expense</div>
      <div className="show-for-large-screen">Amount</div>
    </div>
    <div className="list-body">
      {
        expenses.length === 0 ? (
          <div className="list-item list-item--message">
            <span>No expenses</span>
          </div>
        ) : (
          expenses.map(({ id, description, amount, createdAt, note }, index) => (
            <Link className="list-item" to={`/edit/${id}`} key={index} >
              <div>
                <h3 className="list-item__title">{description}</h3>
                <span className="list-item__sub-title">{moment(createdAt).format("MMMM Do, YYYY")}</span>
              </div>
              <h3 className="list-item__amount">{numeral(amount / 100).format("$0,0.00")}</h3>
            </Link>
          ))
        )
      }
    </div>
  </div>
);

const mapStateToProps = ({ expenses, filters }) => ({
  expenses: selectExpenses(expenses, filters)
});

export default connect(mapStateToProps)(ExpenseListItem);
// when we use connect dispatch is added by default
