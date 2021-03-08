/* eslint-disable react/prop-types */
import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

const PrivateRoute = ({ path, component }) => {
	const { isAuthenticated } = useContext(AuthContext);

	return isAuthenticated ? (
		<Route path={path} component={component} />
	) : (
		<Redirect to="/connexion" />
	);
};

export default PrivateRoute;
