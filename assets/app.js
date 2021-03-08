import {
	Box,
	Container,
	CssBaseline,
	IconButton,
	makeStyles,
	Snackbar,
} from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Copyright from "./components/Copyright";
import PrivateRoute from "./components/PrivateRoute";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import AuthContext from "./contexts/AuthContext";
import SnackbarContext from "./contexts/SnackbarContext";
import ThemeContext from "./contexts/ThemeContext";
import CategoriesPage from "./pages/CategoriesPage";
import CustomersPage from "./pages/CustomersPage";
import Dashboard from "./pages/Dashboard";
import EmployeesPage from "./pages/EmployeesPage";
import InvoicesPage from "./pages/InvoicesPage";
import LoginPage from "./pages/LoginPage";
import OrdersPage from "./pages/OrdersPage";
import ProductsPage from "./pages/ProductsPage";
import RegistrationPage from "./pages/RegistrationPage";
import SuppliersPage from "./pages/SuppliersPage";
import authAPI from "./services/authAPI";
import DefaultThemeProvider from "./themes/DefaultThemeProvider";

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
	},
	appBarSpacer: theme.mixins.toolbar,
	content: {
		flexGrow: 1,
		// height: "100vh",
		overflow: "auto",
	},
	container: {
		paddingTop: theme.spacing(4),
		paddingBottom: theme.spacing(4),
	},
}));

authAPI.setup();

function App() {
	const [open, setOpen] = useState(true);
	const handleDrawerOpen = () => {
		setOpen(true);
	};
	const handleDrawerClose = () => {
		setOpen(false);
	};
	console.log("Hey I'm connected in app.js!!!");

	const classes = useStyles();

	const [darkMode, setDarkMode] = useState(false);

	const [isAuthenticated, setIsAuthenticated] = useState(
		authAPI.isAuthenticated()
	);

	const [snackbar, setSnackbar] = useState({
		open: false,
		type: "success",
		message: "",
	});

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		setSnackbar({ ...snackbar, open: false });
	};

	if (!isAuthenticated) {
		return (
			<>
				<AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
					<Switch>
						<Route exact path="/" component={LoginPage} />
						<Route path="/inscription" component={RegistrationPage} />
					</Switch>
				</AuthContext.Provider>
			</>
		);
	}

	return (
		<ThemeContext.Provider value={{ darkMode, setDarkMode }}>
			<SnackbarContext.Provider value={{ snackbar, setSnackbar }}>
				<AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
					<DefaultThemeProvider>
						<div className={classes.root}>
							<CssBaseline />
							<Topbar handleDrawerOpen={handleDrawerOpen} open={open} />
							<Sidebar handleDrawerClose={handleDrawerClose} open={open} />

							<main className={classes.content}>
								<div className={classes.appBarSpacer} />
								<Container maxWidth="lg" className={classes.container}>
									<Switch>
										<PrivateRoute
											path="/tableau-de-bord"
											component={Dashboard}
										/>
										<PrivateRoute path="/clients" component={CustomersPage} />
										<PrivateRoute path="/commandes" component={OrdersPage} />
										<PrivateRoute
											path="/fournisseurs"
											component={SuppliersPage}
										/>
										<PrivateRoute path="/produits" component={ProductsPage} />
										<PrivateRoute
											path="/categories"
											component={CategoriesPage}
										/>
										<PrivateRoute path="/factures" component={InvoicesPage} />
										<PrivateRoute path="/employes" component={EmployeesPage} />
										<Redirect from="/connexion" to="/tableau-de-bord" />
										<Redirect from="/inscription" to="/tableau-de-bord" />
									</Switch>
									<Snackbar
										anchorOrigin={{
											vertical: "top",
											horizontal: "right",
										}}
										open={snackbar.open}
										onClose={handleClose}
										message={snackbar.message}
										autoHideDuration={6000}
										action={
											<IconButton
												size="small"
												aria-label="close"
												color="inherit"
												onClick={handleClose}
											>
												<CloseIcon fontSize="small" />
											</IconButton>
										}
									/>
									<Box pt={4}>
										<Copyright />
									</Box>
								</Container>
							</main>
						</div>
					</DefaultThemeProvider>
				</AuthContext.Provider>
			</SnackbarContext.Provider>
		</ThemeContext.Provider>
	);
}

ReactDOM.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>,
	document.getElementById("helloapp")
);
