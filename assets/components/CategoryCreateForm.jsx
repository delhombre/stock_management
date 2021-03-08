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
import categoriesAPI from "../services/categoriesAPI";
import Title from "./Title";

const useStyles = makeStyles((theme) => ({
	paper: {
		padding: theme.spacing(2),
		display: "flex",
		overflow: "auto",
		flexDirection: "row",
	},
}));

const CategoryCreateForm = () => {
	const classes = useStyles();

	const [category, setCategory] = useState({
		name: "",
	});

	const [errors, setErrors] = useState({
		name: "",
	});

	const [loading, setLoading] = useState(false);

	const handleChange = ({ currentTarget }) => {
		const { value, name } = currentTarget;

		setCategory({ [name]: value });
	};

	const { snackbar, setSnackbar } = useContext(SnackbarContext);

	const handleSubmit = async (event) => {
		event.preventDefault();

		setLoading(true);

		try {
			await categoriesAPI.create(category);

			setSnackbar({
				...snackbar,
				open: true,
				message: "Une nouvelle catégorie a été ajoutée.",
			});

			setLoading(false);

			setErrors({});

			setCategory({ name: "" });
		} catch ({ response }) {
			const { violations } = response.data;
			setSnackbar({
				...snackbar,
				open: true,
				message: "Une erreur s'est produite! Veuillez réessayer",
				type: "error",
			});
			setLoading(false);
			if (violations) {
				const apiErrors = {};
				violations.forEach((violation) => {
					apiErrors[violation.propertyPath] = violation.message;
				});
				setErrors(apiErrors);
			}
		}
	};

	return (
		<>
			<Title>Ajouter une nouvelle catégorie</Title>
			<Paper className={classes.paper}>
				<form onSubmit={handleSubmit}>
					<Grid container spacing={1}>
						<Grid item xs={12}>
							<TextField
								label="Nom de la catégorie"
								variant="outlined"
								id="name"
								name="name"
								fullWidth
								value={category.name}
								onChange={handleChange}
								error={errors.name ? true : false}
								helperText={errors.name}
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

export default CategoryCreateForm;
