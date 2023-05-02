import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, loggedInStatus, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      loggedInStatus === "LOGGED_IN" ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

export default PrivateRoute;
