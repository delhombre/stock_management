import {
	makeStyles,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import suppliersAPI from "../services/suppliersAPI";

const useStyles = makeStyles(() => ({
	paper: {
		overflow: "auto",
	},
}));

const SuppliersList = () => {
	const [suppliers, setSuppliers] = useState(null);

	const fetchSuppliers = async () => {
		try {
			const data = await suppliersAPI.findAll();
			setSuppliers(data);
		} catch (error) {
			console.error(error.response);
		}
	};

	useEffect(() => fetchSuppliers(), []);

	const classes = useStyles();

	return (
		<>
			<TableContainer component={Paper} className={classes.paper}>
				<Table aria-label="simple table">
					<TableHead>
						<TableRow>
							<th>#</th>
							<th>Entreprise</th>
							<th>Email</th>
							<th>Téléphone</th>
							<th>Adresse</th>
							<th>Prénom</th>
							<th>Nom</th>
							<th></th>
							<th></th>
						</TableRow>
					</TableHead>
					<TableBody>
						{suppliers &&
							suppliers.map((supplier, index) => (
								<TableRow key={index}>
									<TableCell component="th" scope="row">
										{index + 1}
									</TableCell>
									<TableCell>{supplier.company}</TableCell>
									<TableCell>{supplier.email}</TableCell>
									<TableCell>{supplier.telephone}</TableCell>
									<TableCell>{supplier.address}</TableCell>
									<TableCell>{supplier.firstname}</TableCell>
									<TableCell>{supplier.lastname}</TableCell>
								</TableRow>
							))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
};

export default SuppliersList;
