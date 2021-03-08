import {
	AppBar,
	IconButton,
	makeStyles,
	Toolbar,
	Typography,
} from "@material-ui/core";
import {
	Brightness3Rounded,
	BrightnessHighRounded,
	Menu,
	PowerSettingsNewRounded,
} from "@material-ui/icons";
import clsx from "clsx";
import React, { useContext } from "react";
import { withRouter } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import ThemeContext from "../contexts/ThemeContext";
import authAPI from "../services/authAPI";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	toolbar: {
		paddingRight: 24, // keep right padding when drawer closed
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	menuButton: {
		marginRight: 36,
	},
	menuButtonHidden: {
		display: "none",
	},
	title: {
		flexGrow: 1,
		color: "white",
	},
}));

const Topbar = ({ handleDrawerOpen, open, history }) => {
	const classes = useStyles();

	const { darkMode, setDarkMode } = useContext(ThemeContext);
	const { setIsAuthenticated } = useContext(AuthContext);

	const handleChangeTheme = () => {
		setDarkMode(!darkMode);
	};

	const handleLogout = () => {
		authAPI.logout();
		setIsAuthenticated(false);
		history.push("/");
	};

	return (
		<>
			<AppBar
				position="fixed"
				elevation={0}
				className={clsx(classes.appBar, open && classes.appBarShift)}
			>
				<Toolbar className={classes.toolbar}>
					<IconButton
						edge="start"
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						className={clsx(
							classes.menuButton,
							open && classes.menuButtonHidden
						)}
					>
						<Menu />
					</IconButton>
					<Typography
						component="h1"
						variant="h6"
						color="inherit"
						noWrap
						className={classes.title}
					>
						Gestion de Stock
					</Typography>
					<IconButton color="inherit" onClick={handleChangeTheme}>
						{darkMode ? <BrightnessHighRounded /> : <Brightness3Rounded />}
					</IconButton>
					<IconButton color="inherit" onClick={handleLogout}>
						<PowerSettingsNewRounded />
					</IconButton>
				</Toolbar>
			</AppBar>
		</>
	);
};

export default withRouter(Topbar);
