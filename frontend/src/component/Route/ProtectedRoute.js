import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route } from "react-router-dom";

const ProtectedRoute = ({ isAdmin, component: Component, ...rest }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);


if (loading) {
    return null; // or you can render a loading indicator
  }

  if (loading === false && isAuthenticated === false) {
    return <Navigate to="/login" />;
  }

  if (loading === false && isAdmin && user.role !== "admin") {
    return <Navigate to="/login" />;
  }

  return <Component {...rest} />;
};

export default ProtectedRoute;

  // return (
  //   <Fragment>
  //     {loading === false && (
  //       <Route
  //         {...rest}
  //         render={(props) => {
  //           if (isAuthenticated === false) {
  //             return <Navigate to="/login" />;
  //           }

  //           if (isAdmin === true && user.role !== "admin") {
  //             return <Navigate to="/login" />;
  //           }
  //           return <Component {...props} />;
  //         }}
  //       />
  //     )}
  //   </Fragment>
  // );

  //return <Route {...rest} element={<Component />} />;
