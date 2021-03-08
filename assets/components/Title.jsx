import { makeStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import React from "react";

const useStyles = makeStyles(() => ({
	title: {
		fontWeight: "bold",
		textTransform: "uppercase",
		color: "#000000",
	},
}));

export default function Title(props) {
	const classes = useStyles();

	return (
		<Typography
			component="h2"
			variant="h6"
			gutterBottom
			className={classes.title}
		>
			{props.children}
		</Typography>
	);
}

Title.propTypes = {
	children: PropTypes.node,
};
