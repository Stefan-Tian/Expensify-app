// Higher order component (HOC)
// -- A component that renders another component
// the purpose is to reuse code
// -- Render hijacking
// -- Prop manipulation
// -- Abstract state

import React from "react";
import ReactDOM from "react-dom";

const Info = props => (
  <div>
    <h1>Info</h1>
    <p>The info is: {props.info}</p>
  </div>
);

const withAdminWarning = WrappedComponent => props => (
  <div>
    {props.isAdmin && <p>This is private info. Please don't share.</p>}
    <WrappedComponent {...props} />
  </div> // {...props} means we pass all the props down to it's child
);

const requireAuthentication = WrappedComponent => props => (
  <div>
    {props.isAuthenticated ? (
      <WrappedComponent {...props} />
    ) : (
      <p>You need to log in to see this</p>
    )}
  </div>
);

const AdminInfo = withAdminWarning(Info);
const AuthInfo = requireAuthentication(Info);
// ReactDOM.render(
//   <AdminInfo info="I'm a college dropout." isAdmin={true} />,
//   document.getElementById("app")
// );
ReactDOM.render(
  <AuthInfo info="I'm a college dropout." isAuthenticated={true} />,
  document.getElementById("app")
);
