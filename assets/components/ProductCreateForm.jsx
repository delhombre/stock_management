import {
	Button,
	CircularProgress,
	Grid,
	makeStyles,
	MenuItem,
	Paper,
	TextField,
} from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import SnackbarContext from "../contexts/SnackbarContext";
import categoriesAPI from "../services/categoriesAPI";
import productsAPI from "../services/productsAPI";
import suppliersAPI from "../services/suppliersAPI";
import Title from "./Title";

const useStyles = makeStyles((theme) => ({
	paper: {
		padding: theme.spacing(2),
		display: "flex",
		overflow: "auto",
		flexDirection: "row",
	},
}));

const ProductCreateForm = () => {
	const classes = useStyles();

	const [suppliers, setSuppliers] = useState(null);
	const [categories, setCategories] = useState(null);

	const fetchSuppliers = async () => {
		await suppliersAPI.findAll().then((data) => setSuppliers(data));
	};

	const fetchCategories = async () => {
		await categoriesAPI.findAll().then((data) => setCategories(data));
	};

	useEffect(() => {
		fetchSuppliers();
		fetchCategories();
	}, []);

	const [product, setProduct] = useState({
		name: "",
		quantity: "",
		price: "",
		supplier: "",
		category: "",
	});

	const handleChange = ({ currentTarget }) => {
		const { value, name } = currentTarget;

		setProduct({ ...product, [name]: value });
	};

	const [supplier, setSupplier] = useState("");
	const [category, setCategory] = useState("");

	const [loading, setLoading] = useState(false);

	const { snackbar, setSnackbar } = useContext(SnackbarContext);

	const handleSubmit = async (event) => {
		event.preventDefault();

		setLoading(true);

		try {
			await productsAPI.create({
				...product,
				supplier: `/api/suppliers/${supplier}`,
				category: `/api/categories/${category}`,
			});

			setSnackbar({
				...snackbar,
				open: true,
				message: "Le nouveau produit a été enregistré.",
			});

			setLoading(false);
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
			<Title>Ajouter un nouveau produit</Title>
			<Paper className={classes.paper}>
				<form onSubmit={handleSubmit}>
					<Grid container spacing={1}>
						{categories && (
							<Grid item xs={12} md={6} lg={3}>
								<TextField
									label="Catégorie"
									variant="outlined"
									id="category"
									name="category"
									fullWidth
									select
									required
									value={category}
									onChange={(e) => setCategory(e.target.value)}
								>
									{categories.map((option, index) => (
										<MenuItem key={index} value={option.id}>
											{option.name}
										</MenuItem>
									))}
								</TextField>
							</Grid>
						)}
						<Grid item xs={12} md={6} lg={3}>
							<TextField
								label="Nom du produit"
								variant="outlined"
								id="name"
								name="name"
								fullWidth
								value={product.name}
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12} md={6} lg={3}>
							<TextField
								label="Quantité"
								variant="outlined"
								id="quantity"
								name="quantity"
								fullWidth
								value={product.quantity}
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12} md={6} lg={3}>
							<TextField
								label="Prix unitaire"
								variant="outlined"
								id="price"
								name="price"
								fullWidth
								value={product.price}
								onChange={handleChange}
							/>
						</Grid>
						{suppliers && (
							<Grid item xs={12} md={6} lg={3}>
								<TextField
									label="Fournisseur"
									variant="outlined"
									id="supplier"
									name="supplier"
									fullWidth
									select
									required
									value={supplier}
									onChange={(e) => setSupplier(e.target.value)}
								>
									{suppliers.map((option, index) => (
										<MenuItem key={index} value={option.id}>
											{option.firstname + " " + option.lastname}
										</MenuItem>
									))}
								</TextField>
							</Grid>
						)}
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

export default ProductCreateForm;
