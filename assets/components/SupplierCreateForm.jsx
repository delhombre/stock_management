import {
	Box,
	Button,
	CircularProgress,
	FormControl,
	FormControlLabel,
	Grid,
	makeStyles,
	Paper,
	Radio,
	RadioGroup,
	TextField,
	Typography,
} from "@material-ui/core";
import React, { useContext, useState } from "react";
import SnackbarContext from "../contexts/SnackbarContext";
import suppliersAPI from "../services/suppliersAPI";
import Title from "./Title";

const useStyles = makeStyles((theme) => ({
	paper: {
		padding: theme.spacing(2),
		display: "flex",
		overflow: "auto",
		flexDirection: "row",
	},
	formControl: {
		// margin: theme.spacing(3),
	},
}));

const Company = ({ supplier, handleChange, loading }) => {
	return (
		<>
			<Grid item xs={12} md={6} lg={3}>
				<TextField
					label="Nom de l'entreprise"
					variant="outlined"
					id="company"
					name="company"
					fullWidth
					required
					value={supplier.company}
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
					value={supplier.email}
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
					required
					value={supplier.telephone}
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
					value={supplier.address}
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
		</>
	);
};

const Particular = ({ supplier, handleChange, loading }) => {
	return (
		<>
			<Grid item xs={12} md={6} lg={3}>
				<TextField
					label="Prénom"
					variant="outlined"
					id="firstname"
					name="firstname"
					fullWidth
					required
					value={supplier.firstname}
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
					required
					value={supplier.lastname}
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
					required
					value={supplier.telephone}
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
					value={supplier.email}
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
					value={supplier.address}
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
		</>
	);
};

const SupplierCreateForm = () => {
	const classes = useStyles();

	const [company, setCompany] = useState(false);
	const [particular, setParticular] = useState(false);

	const [value, setValue] = useState("");

	const handleRadioChange = (event) => {
		setValue(event.target.value);

		if (event.target.value === "company") {
			setParticular(false);
			setCompany(true);
		} else if (event.target.value === "particular") {
			setCompany(false);
			setParticular(true);
		}
	};

	const [supplier, setSupplier] = useState({
		company: "",
		email: "",
		telephone: "",
		address: "",
		firstname: "",
		lastname: "",
	});

	const handleChange = ({ currentTarget }) => {
		const { value, name } = currentTarget;

		setSupplier({ ...supplier, [name]: value });
	};

	const [loading, setLoading] = useState(false);

	const { snackbar, setSnackbar } = useContext(SnackbarContext);

	const handleSubmit = async (event) => {
		event.preventDefault();

		setLoading(true);

		try {
			await suppliersAPI.create(supplier);
			setLoading(false);
			setSnackbar({
				...snackbar,
				open: true,
				message: "Le nouveau fournisseur a été enregistré.",
			});
		} catch (error) {
			setSnackbar({
				...snackbar,
				open: true,
				message: "Une erreur s'est produite! Veuillez réessayer",
				type: "error",
			});
			console.error(error);
			setLoading(false);
		}
	};

	return (
		<>
			<Title>Ajouter un nouveau fournisseur</Title>
			<Paper className={classes.paper}>
				<form onSubmit={handleSubmit}>
					<Box mb={2}>
						<Typography variant="subtitle1">
							Choisissez votre type de fournisseur
						</Typography>
						<FormControl className={classes.formControl}>
							<RadioGroup
								name="choice"
								row
								value={value}
								onChange={handleRadioChange}
							>
								<FormControlLabel
									value="company"
									control={<Radio color="default" />}
									label="Société"
								/>
								<FormControlLabel
									value="particular"
									control={<Radio />}
									label="Particulier"
								/>
							</RadioGroup>
						</FormControl>
					</Box>
					<Grid container spacing={1}>
						{company && (
							<Company
								supplier={supplier}
								handleChange={handleChange}
								loading={loading}
							/>
						)}
						{particular && (
							<Particular
								supplier={supplier}
								handleChange={handleChange}
								loading={loading}
							/>
						)}
					</Grid>
				</form>
			</Paper>
		</>
	);
};

export default SupplierCreateForm;
