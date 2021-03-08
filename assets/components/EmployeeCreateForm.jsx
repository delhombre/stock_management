import {
	Button,
	CircularProgress,
	Grid,
	makeStyles,
	Paper,
	TextField,
} from "@material-ui/core";
import React, { useContext, useState } from "react";
import SnackbarContext from "../contexts/SnackbarContext";
import employeesAPI from "../services/employeesAPI";
import Title from "./Title";

const useStyles = makeStyles((theme) => ({
	paper: {
		padding: theme.spacing(2),
		display: "flex",
		overflow: "auto",
		flexDirection: "row",
	},
}));

const EmployeeCreateForm = () => {
	const classes = useStyles();

	const [employee, setEmployee] = useState({
		firstname: "",
		lastname: "",
		email: "",
		telephone: "",
		address: "",
		job: "",
	});

	const handleChange = ({ currentTarget }) => {
		const { name, value } = currentTarget;

		setEmployee({ ...employee, [name]: value });
	};

	const [loading, setLoading] = useState(false);

	const { snackbar, setSnackbar } = useContext(SnackbarContext);

	const handleSubmit = async (e) => {
		e.preventDefault();

		setLoading(true);

		try {
			await employeesAPI.create(employee);

			setSnackbar({
				...snackbar,
				open: true,
				message: "Un nouvel employé a été ajouté.",
			});

			setLoading(false);
		} catch (error) {
			setSnackbar({
				...snackbar,
				open: true,
				message: "Une erreur s'est produite! Veuillez réessayer",
				type: "error",
			});
			console.error(error.response);
			setLoading(false);
		}
	};

	return (
		<>
			<Title>Ajouter un nouvel employé</Title>
			<Paper className={classes.paper}>
				<form onSubmit={handleSubmit}>
					<Grid container spacing={1}>
						<Grid item xs={12} md={6} lg={3}>
							<TextField
								label="Prénom"
								variant="outlined"
								id="firstname"
								name="firstname"
								fullWidth
								value={employee.firstname}
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12} md={6} lg={3}>
							<TextField
								label="Nom"
								variant="outlined"
								id="lastname"
								name="lastname"
								fullWidth
								value={employee.lastname}
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12} md={6} lg={3}>
							<TextField
								label="Email"
								variant="outlined"
								id="email"
								name="email"
								fullWidth
								value={employee.email}
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12} md={6} lg={3}>
							<TextField
								label="Téléphone"
								variant="outlined"
								id="telephone"
								name="telephone"
								fullWidth
								value={employee.telelphone}
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12} md={6} lg={3}>
							<TextField
								label="Adresse"
								variant="outlined"
								id="address"
								name="address"
								fullWidth
								value={employee.address}
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12} md={6} lg={3}>
							<TextField
								label="Poste"
								variant="outlined"
								id="job"
								name="job"
								fullWidth
								value={employee.job}
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<Button
								variant="contained"
								color="primary"
								type="submit"
								disabled={loading}
							>
								{loading ? (
									<CircularProgress size={20} thickness={2} />
								) : (
									"Sauvegarder"
								)}
							</Button>
						</Grid>
					</Grid>
				</form>
			</Paper>
		</>
	);
};

export default EmployeeCreateForm;
