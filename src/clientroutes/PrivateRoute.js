import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import auth from "../reducers/auth";

const PrivateRoute = ({
  
  component: Component,
  auth: { isAuthenticated },
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location },
          }}
        />
      )
    }
  />
);
console.log(auth)


const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
