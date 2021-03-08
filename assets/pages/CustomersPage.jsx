import React from "react";
import CustomerCreateForm from "../components/CustomerCreateForm";
import CustomersList from "../components/CustomersList";

// const useStyles = makeStyles((theme) => ({
// 	paper: {
// 		padding: theme.spacing(2),
// 		display: "flex",
// 		overflow: "auto",
// 		flexDirection: "row",
// 	},
// }));

const CustomersPage = () => {
	console.log("CustomersPage...");

	// const classes = useStyles();

	return (
		<>
			<CustomerCreateForm />
			<CustomersList />
			{/* <Grid container spacing={3}>
				<Grid container item xs={12} spacing={1}>
					<Paper className={classes.paper}>
						<Title>Ajouter un nouveau client</Title>
					</Paper>
				</Grid>
				<Grid item xs={12}>
					<Paper className={classes.paper}>
						<Orders />
					</Paper>
				</Grid>
			</Grid> */}
		</>
	);
};

export default CustomersPage;
