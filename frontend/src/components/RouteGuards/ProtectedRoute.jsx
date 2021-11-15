import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import PAGE_ROUTES from "../../pageRoutes";

export function PrivateRoute({
  component: Component,
  isAuthenticated,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem("access") ? (
          <Component {...props} />
        ) : (
          <Redirect to={PAGE_ROUTES.LOGIN} />
        )
      }
    />
  );
}

PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.bool,
};

export default PrivateRoute;