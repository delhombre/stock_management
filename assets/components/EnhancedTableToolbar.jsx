/* eslint-disable no-mixed-spaces-and-tabs */
import { makeStyles, Toolbar, Typography } from "@material-ui/core";
import React from "react";

const useToolbarStyles = makeStyles((theme) => ({
	root: {
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(1),
	},
}));

const EnhancedTableToolbar = ({ title }) => {
	const classes = useToolbarStyles();

	return (
		<Toolbar className={classes.root}>
			<Typography
				className={classes.title}
				variant="h6"
				id="tableTitle"
				component="div"
			>
				{title}
			</Typography>
		</Toolbar>
	);
};

export default EnhancedTableToolbar;
