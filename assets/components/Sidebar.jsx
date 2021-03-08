import {
	Divider,
	Drawer,
	IconButton,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	makeStyles,
} from "@material-ui/core";
import { ChevronLeft } from "@material-ui/icons";
import clsx from "clsx";
import React from "react";
import { withRouter } from "react-router-dom";
import { mainListItems } from "../services/listItems";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	toolbarIcon: {
		display: "flex",
		alignItems: "center",
		justifyContent: "flex-end",
		padding: "0 8px",
		...theme.mixins.toolbar,
	},
	drawerPaper: {
		position: "relative",
		whiteSpace: "nowrap",
		width: drawerWidth,
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	drawerPaperClose: {
		overflowX: "hidden",
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		width: theme.spacing(7),
		[theme.breakpoints.up("sm")]: {
			width: theme.spacing(9),
		},
	},
}));

const Sidebar = ({ handleDrawerClose, open, history }) => {
	const classes = useStyles();

	const handlePageChange = (path) => {
		history.push(path);
	};

	return (
		<>
			<Drawer
				variant="permanent"
				classes={{
					paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
				}}
				open={open}
			>
				<div className={classes.toolbarIcon}>
					<IconButton onClick={handleDrawerClose}>
						<ChevronLeft />
					</IconButton>
				</div>
				<Divider />
				<List>
					{mainListItems.map((item, index) => (
						<ListItem
							button
							key={index}
							onClick={() => handlePageChange(item.path)}
						>
							<ListItemIcon>{item.icon}</ListItemIcon>
							<ListItemText primary={item.label} />
						</ListItem>
					))}
				</List>
				{/* <Divider />
				<List>{secondaryListItems}</List> */}
			</Drawer>
		</>
	);
};

export default withRouter(Sidebar);
