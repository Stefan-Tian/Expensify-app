import React, { Component } from "react";
import { connect } from "react-redux";
import ExpenseForm from "./ExpenseForm";
import { addExpense } from "../actions/expenses";

export class AddExpense extends Component {
  onSubmit = expense => {
    this.props.addExpense(expense);
    this.props.history.push("/");
  };

  render() {
    return (
      <div>
        <h2>Add Expense</h2>
        <ExpenseForm onSubmit={this.onSubmit} />
      </div> // history.push would navigate me back to dashboard
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addExpense: expense => dispatch(addExpense(expense))
});

export default connect(undefined, mapDispatchToProps)(AddExpense);
// just to get the dispatch
