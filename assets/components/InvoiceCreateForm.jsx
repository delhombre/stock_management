import {
	Button,
	CircularProgress,
	Grid,
	makeStyles,
	MenuItem,
	Paper,
	TextField,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import invoicesAPI from "../services/invoicesAPI";
import ordersAPI from "../services/ordersAPI";
import Title from "./Title";

const API_STATUS = {
	Annulée: "CANCELLED",
	Payée: "PAID",
	"En attente": "SENT",
};

const useStyles = makeStyles((theme) => ({
	paper: {
		padding: theme.spacing(2),
	},
}));

const InvoiceCreateForm = () => {
	const [invoice, setInvoice] = useState({
		customerOrder: "",
		paidAmount: "",
		status,
	});
	const [orders, setOrders] = useState([]);

	const [order, setOrder] = useState("");

	const fetchOrders = async () => {
		const data = await ordersAPI.findAll();

		setOrders(data);
	};

	const [status, setStatus] = useState("");

	useEffect(() => {
		fetchOrders();
	}, []);

	const handleChange = ({ currentTarget }) => {
		const { value, name } = currentTarget;

		setInvoice({ ...invoice, [name]: value });
	};

	const [loading, setLoading] = useState(false);

	const handleSubmit = async (event) => {
		event.preventDefault();

		setLoading(true);

		try {
			console.log({
				...invoice,
				status: status ? API_STATUS[status] : "",
				customerOrder: `/api/orders/${order}`,
			});

			await invoicesAPI.create({
				...invoice,
				status: status ? API_STATUS[status] : "",
				customerOrder: `/api/orders/${order}`,
			});

			setLoading(false);
		} catch (error) {
			console.error(error);
			setLoading(false);
		}
	};

	const classes = useStyles();

	return (
		<>
			<Title>Créer une nouvelle facture</Title>
			<Paper className={classes.paper}>
				<form onSubmit={handleSubmit}>
					<Grid container spacing={1}>
						{orders && (
							<Grid item xs={12} md={6} lg={3}>
								<TextField
									label="Commande"
									variant="outlined"
									id="customerOrder"
									name="customerOrder"
									fullWidth
									required
									select
									value={order}
									onChange={(event) => setOrder(event.target.value)}
								>
									{orders.map((order, index) => (
										<MenuItem key={index} value={order.id}>
											{order.id}
										</MenuItem>
									))}
								</TextField>
							</Grid>
						)}

						<Grid item xs={12} md={6} lg={3}>
							<TextField
								label="Montant payée"
								variant="outlined"
								id="paidAmount"
								name="paidAmount"
								fullWidth
								required
								value={invoice.paidAmount}
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

export default InvoiceCreateForm;
