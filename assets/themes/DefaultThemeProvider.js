import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import { blueGrey } from "@material-ui/core/colors";
import React, { useContext } from "react";
import ThemeContext from "../contexts/ThemeContext";

const DefaultThemeProvider = ({ children }) => {
	const { darkMode } = useContext(ThemeContext);

	const theme = createMuiTheme({
		palette: {
			type: darkMode ? "dark" : "light",
			primary: {
				main: blueGrey[500],
			},
			secondary: {
				main: "#f44336",
			},
		},
		// primary: {
		// 	light: "#757ce8",
		// 	main: "#3f50b5",
		// 	dark: "#002884",
		// 	contrastText: "#fff",
		// },
		// secondary: {
		// 	light: "#ff7961",
		// 	main: "#f44336",
		// 	dark: "#ba000d",
		// 	contrastText: "#000",
		// },
	});

	return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
};

export default DefaultThemeProvider;
