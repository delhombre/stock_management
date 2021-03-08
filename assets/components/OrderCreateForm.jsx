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
import customersAPI from "../services/customersAPI";
import ordersAPI from "../services/ordersAPI";
import productsAPI from "../services/productsAPI";
import Title from "./Title";

const useStyles = makeStyles((theme) => ({
	paper: {
		padding: theme.spacing(2),
		display: "flex",
		overflow: "auto",
		flexDirection: "row",
	},
}));

const API_STATUS = {
	Annulée: "CANCELLED",
	"En attente": "SENT",
	Payée: "PAID",
};

const OrderCreateForm = () => {
	const classes = useStyles();

	const [order, setOrder] = useState({
		customer: "",
		product: "",
		quantity: "",
		status: "",
	});

	const [client, setClient] = useState("");
	const [customers, setCustomers] = useState(null);

	const [products, setProducts] = useState(null);
	const [product, setProduct] = useState("");

	const [status, setStatus] = useState("");

	const fetchCustomers = () => {
		customersAPI.findAll().then((data) => setCustomers(data));
	};

	const fetchProducts = async () => {
		productsAPI.findAll().then((data) => setProducts(data));
	};

	useEffect(() => {
		fetchCustomers();
		fetchProducts();
	}, []);

	const handleChange = ({ currentTarget }) => {
		const { value, name } = currentTarget;

		setOrder({ ...order, [name]: value });
	};

	const [loading, setLoading] = useState(false);

	const { snackbar, setSnackbar } = useContext(SnackbarContext);

	const handleSubmit = async (event) => {
		event.preventDefault();

		setLoading(true);

		try {
			await ordersAPI.create({
				...order,
				customer: `/api/customers/${client}`,
				product: `/api/products/${product}`,
				status: status ? API_STATUS[status] : "",
			});
			setLoading(false);
			setSnackbar({
				...snackbar,
				open: true,
				message: "La commande a été enregistrée avec succès",
			});
		} catch (error) {
			setLoading(false);
			console.error(error);
			setSnackbar({
				...snackbar,
				open: true,
				type: "error",
				message: "Une erreur s'est produite! Veuillez réessayer.",
			});
		}
	};

	return (
		<>
			<Title>Ajouter une nouvelle commande</Title>
			<Paper className={classes.paper}>
				<form onSubmit={handleSubmit}>
					<Grid container spacing={1}>
						{customers && (
							<Grid item xs={12} md={6} lg={3}>
								<TextField
									label="Client"
									variant="outlined"
									id="client"
									name="client"
									fullWidth
									select
									value={client}
									onChange={(event) => setClient(event.target.value)}
								>
									{customers.map((customer, index) => (
										<MenuItem key={index} value={customer.id}>
											{customer.firstname}
										</MenuItem>
									))}
								</TextField>
							</Grid>
						)}

						{products && (
							<Grid item xs={12} md={6} lg={3}>
								<TextField
									label="Produit"
									variant="outlined"
									id="product"
									name="product"
									fullWidth
									select
									value={product}
									onChange={(event) => setProduct(event.target.value)}
								>
									{products.map((option, index) => (
										<MenuItem key={index} value={option.id}>
											{option.name}
										</MenuItem>
									))}
								</TextField>
							</Grid>
						)}

						<Grid item xs={12} md={6} lg={3}>
							<TextField
								label="Quantité"
								variant="outlined"
								id="quantity"
								name="quantity"
								fullWidth
								value={order.quantity}
								onChange={handleChange}
							/>
						</Grid>

						<Grid item xs={12} md={6} lg={3}>
							<TextField
								label="Status"
								variant="outlined"
								id="status"
								name="status"
								fullWidth
								select
								required
								value={status}
								onChange={(e) => setStatus(e.target.value)}
							>
								{["Payée", "Annulée", "En attente"].map((option, index) => (
									<MenuItem key={index} value={option}>
										{option}
									</MenuItem>
								))}
							</TextField>
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

export default OrderCreateForm;
