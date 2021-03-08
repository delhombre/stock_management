import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import React from "react";
import Deposits from "../components/Deposits";
import Orders from "../components/Orders";
import Title from "../components/Title";

const useStyles = makeStyles((theme) => ({
	paper: {
		padding: theme.spacing(2),
		display: "flex",
		overflow: "auto",
		flexDirection: "column",
	},
	fixedHeight: {
		height: 240,
	},
}));

const Dashboard = () => {
	const classes = useStyles();

	const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

	return (
		<>
			<Grid container spacing={3}>
				{/* Chart */}
				<Grid item xs={12} md={8} lg={9}>
					<Paper className={fixedHeightPaper}>
						<Title>TOTO</Title>
					</Paper>
				</Grid>
				{/* Recent Deposits */}
				<Grid item xs={12} md={4} lg={3}>
					<Paper className={fixedHeightPaper}>
						<Deposits />
					</Paper>
				</Grid>
				{/* Recent Orders */}
				<Grid item xs={12}>
					<Paper className={classes.paper}>
						<Orders />
					</Paper>
				</Grid>
			</Grid>
		</>
	);
};

export default Dashboard;
