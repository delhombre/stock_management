import React from "react";

export default React.createContext({
	isAuthenticated: false,
	// eslint-disable-next-line no-unused-vars
	setIsAuthenticated: (value) => {},
});
