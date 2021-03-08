import { Badge, TableContainer } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import React, { useEffect, useState } from "react";
import customersAPI from "../services/customersAPI";

const useStyles = makeStyles((theme) => ({
	paper: {
		padding: theme.spacing(2),
		display: "flex",
		overflow: "auto",
		flexDirection: "column",
		marginTop: theme.spacing(3),
	},
}));

const CustomersList = () => {
	const classes = useStyles();

	const [customers, setCustomers] = useState(null);

	const fetchCustomers = async () => {
		try {
			const data = await customersAPI.findAll();
			setCustomers(data);
		} catch (error) {
			console.error(error.response);
		}
	};

	useEffect(() => fetchCustomers(), []);

	const handleDelete = async (id) => {
		const originalCustomers = [...customers];

		setCustomers(customers.filter((customer) => customer.id !== id));

		try {
			await customersAPI.remove(id);
		} catch (error) {
			setCustomers(originalCustomers);
			console.log(error.response);
		}
	};

	return (
		<>
			<TableContainer component={Paper} className={classes.paper}>
				<Table aria-label="simple table">
					<TableHead>
						<TableRow>
							<th>#</th>
							<th>Code</th>
							<th>Client</th>
							<th>Email</th>
							<th>Téléphone</th>
							<th>Adresse</th>
							<th>Sexe</th>
							<th>Entreprise</th>
							<th>Commandes</th>
							<th></th>
							<th></th>
						</TableRow>
					</TableHead>
					<TableBody>
						{customers &&
							customers.map((customer, index) => (
								<TableRow key={index}>
									<TableCell>{index + 1}</TableCell>
									<TableCell component="th" scope="row">
										{customer.code}
									</TableCell>
									<TableCell>
										{customer.firstname + " " + customer.lastname}
									</TableCell>
									<TableCell>{customer.email}</TableCell>
									<TableCell>{customer.telephone}</TableCell>
									<TableCell>{customer.address}</TableCell>
									<TableCell>{customer.sex}</TableCell>
									<TableCell>{customer.company}</TableCell>
									<TableCell>
										<Badge badgeContent={customer.orders.length}></Badge>
									</TableCell>
									<TableCell>
										<Button variant="outlined" color="inherit" size="small">
											Modifier
										</Button>
									</TableCell>
									<TableCell>
										<Button
											variant="contained"
											color="secondary"
											size="small"
											disabled={customer.orders.length > 0}
											onClick={() => handleDelete(customer.id)}
										>
											Supprimer
										</Button>
									</TableCell>
								</TableRow>
							))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
};

export default CustomersList;
