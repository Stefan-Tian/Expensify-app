import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import Header from "../components/Header";

export const PrivateRoute = ({ 
  isAuthenticated, 
  component: Component,
  ...rest // everything we did not destructure will be set bt this rest operator
}) => (
  <Route {...rest} component={props => (
    isAuthenticated ? (
      <div>
        <Header />
        <Component {...props} />
      </div>
    ) : (
      <Redirect to="/" />
    )
  )} />
);

const mapStateToProps = ({ auth }) => ({
  isAuthenticated: !!auth.uid
});

export default connect(mapStateToProps)(PrivateRoute);