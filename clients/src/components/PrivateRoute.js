import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import jwt_decode from "jwt-decode";

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={routeProps => {
        const currentUser = localStorage.getItem("jwtToken");
        const location = routeProps.location.pathname;

        if (!currentUser)
          return (
            <Redirect
              to={{
                pathname: "/auth",
                from: location
              }}
            />
          );

        const decoded = jwt_decode(currentUser);
        const currentTime = Date.now() / 1000;

        if (decoded.exp < currentTime)
          return (
            <Redirect
              to={{
                pathname: "/auth"
              }}
            />
          );

        return <Component {...routeProps} />;
      }}
    />
  );
}

PrivateRoute.propTypes = {
  component: PropTypes.element.isRequired
};

export default PrivateRoute;
