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
import employeesAPI from "../services/employeesAPI";

const useStyles = makeStyles(() => ({
	paper: {
		overflow: "auto",
	},
}));

const EmployeesList = () => {
	const classes = useStyles();

	const [employees, setEmployees] = useState(null);

	const fetchEmployees = async () => {
		try {
			const data = await employeesAPI.findAll();
			setEmployees(data);
		} catch (error) {
			console.error(error.response);
		}
	};

	useEffect(() => fetchEmployees(), []);

	// const handleDelete = async (id) => {
	// 	const originalCustomers = [...customers];

	// 	setCustomers(customers.filter((customer) => customer.id !== id));

	// 	try {
	// 		await customersAPI.remove(id);
	// 	} catch (error) {
	// 		setCustomers(originalCustomers);
	// 		console.log(error.response);
	// 	}
	// };

	return (
		<>
			<TableContainer component={Paper} className={classes.paper}>
				<Table aria-label="simple table">
					<TableHead>
						<TableRow>
							<th>#</th>
							<th>Matricule</th>
							<th>Prénom</th>
							<th>Nom</th>
							<th>Email</th>
							<th>Téléphone</th>
							<th>Adresse</th>
							<th>Poste</th>
							<th></th>
							<th></th>
						</TableRow>
					</TableHead>
					<TableBody>
						{employees &&
							employees.map((employee, index) => (
								<TableRow key={index}>
									<TableCell component="th" scope="row">
										{index + 1}
									</TableCell>
									<TableCell>{employee.registrationNumber}</TableCell>
									<TableCell>{employee.firstname}</TableCell>
									<TableCell>{employee.lastname}</TableCell>
									<TableCell>{employee.email}</TableCell>
									<TableCell>{employee.telephone}</TableCell>
									<TableCell>{employee.address}</TableCell>
									<TableCell>{employee.job}</TableCell>
								</TableRow>
							))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
};

export default EmployeesList;
