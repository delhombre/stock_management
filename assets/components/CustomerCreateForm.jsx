import {
	Button,
	CircularProgress,
	Grid,
	makeStyles,
	MenuItem,
	Paper,
	TextField,
} from "@material-ui/core";
import React, { useContext, useState } from "react";
import SnackbarContext from "../contexts/SnackbarContext";
import customersAPI from "../services/customersAPI";
import Title from "./Title";

const useStyles = makeStyles((theme) => ({
	paper: {
		padding: theme.spacing(2),
		display: "flex",
		overflow: "auto",
		flexDirection: "row",
	},
}));

const CustomerCreateForm = () => {
	const classes = useStyles();

	const [sex, setSex] = useState("");

	const [customer, setCustomer] = useState({
		firstname: "",
		lastname: "",
		email: "",
		address: "",
		telephone: "",
		company: "",
		sex: "",
	});

	const [errors, setErrors] = useState({
		firstname: "",
		lastname: "",
		email: "",
		address: "",
		telephone: "",
		company: "",
		sex: "",
	});

	const handleChange = ({ currentTarget }) => {
		const { value, name } = currentTarget;

		setCustomer({ ...customer, [name]: value });
	};

	const [loading, setLoading] = useState(false);

	const { snackbar, setSnackbar } = useContext(SnackbarContext);

	const handleSubmit = async (event) => {
		event.preventDefault();

		setLoading(true);

		try {
			await customersAPI.create({ ...customer, sex });
			setLoading(false);
			setSnackbar({
				...snackbar,
				open: true,
				message: "Le client a bien été enregistré.",
			});
		} catch ({ response }) {
			setSnackbar({
				...snackbar,
				open: true,
				message: "Une erreur s'est produite! Veuillez réessayer",
				type: "error",
			});
			const { violations } = response.data;
			if (violations) {
				const apiErrors = {};
				violations.forEach((violation) => {
					apiErrors[violation.propertyPath] = violation.message;
				});
				setErrors(apiErrors);
				setLoading(false);
			}
		}
	};

	return (
		<>
			<Title>Ajouter un nouveau client</Title>
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
								value={customer.firstname}
								onChange={handleChange}
								error={errors.firstname ? true : false}
								helperText={errors.firstname}
							/>
						</Grid>
						<Grid item xs={12} md={6} lg={3}>
							<TextField
								label="Nom"
								variant="outlined"
								id="lastname"
								name="lastname"
								fullWidth
								value={customer.lastname}
								onChange={handleChange}
								error={errors.lastname ? true : false}
								helperText={errors.lastname}
							/>
						</Grid>
						<Grid item xs={12} md={6} lg={3}>
							<TextField
								label="Email"
								variant="outlined"
								id="email"
								name="email"
								fullWidth
								value={customer.email}
								onChange={handleChange}
								error={errors.email ? true : false}
								helperText={errors.email}
							/>
						</Grid>
						<Grid item xs={12} md={6} lg={3}>
							<TextField
								label="Genre"
								variant="outlined"
								id="sex"
								name="sex"
								fullWidth
								select
								value={sex}
								onChange={(e) => setSex(e.target.value)}
								error={errors.sex ? true : false}
								helperText={errors.sex}
							>
								{["M", "F"].map((option, index) => (
									<MenuItem key={index} value={option}>
										{option}
									</MenuItem>
								))}
							</TextField>
						</Grid>
						<Grid item xs={12} md={6} lg={3}>
							<TextField
								label="Adresse"
								variant="outlined"
								id="address"
								name="address"
								fullWidth
								value={customer.address}
								onChange={handleChange}
								error={errors.address ? true : false}
								helperText={errors.address}
							/>
						</Grid>
						<Grid item xs={12} md={6} lg={3}>
							<TextField
								label="Téléphone"
								variant="outlined"
								id="telephone"
								name="telephone"
								fullWidth
								value={customer.telephone}
								onChange={handleChange}
								error={errors.telephone ? true : false}
								helperText={errors.telephone}
							/>
						</Grid>
						<Grid item xs={12} md={6} lg={3}>
							<TextField
								label="Entreprise"
								variant="outlined"
								id="company"
								name="company"
								fullWidth
								value={customer.company}
								onChange={handleChange}
								error={errors.company ? true : false}
								helperText={errors.company}
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

export default CustomerCreateForm;
