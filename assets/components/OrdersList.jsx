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
import { blue, red } from "@material-ui/core/colors";
import Typography from "@material-ui/core/Typography";
import React, { useEffect, useState } from "react";
import ordersAPI from "../services/ordersAPI";
import Title from "./Title";

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(3),
		overflow: "auto",
		padding: theme.spacing(2),
	},
	empty: {
		color: red[500],
	},
	loading: {
		color: blue[500],
	},
}));

const OrdersList = () => {
	const classes = useStyles();

	const [orders, setOrders] = useState(null);

	const fetchOrders = async () => {
		try {
			await ordersAPI.findAll().then((data) => setOrders(data));
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		fetchOrders();
	}, []);

	if (orders !== null && orders.length === 0) {
		return (
			<Typography paragraph className={classes.empty}>
				Aucune commande enregistrée pour le moment.
			</Typography>
		);
	}

	if (!orders) {
		return (
			<Typography align="center" className={classes.loading}>
				Loading...
			</Typography>
		);
	}

	return (
		<>
			<Paper className={classes.paper}>
				<Title>Vos commandes</Title>
				<TableContainer component={Paper} className={classes.paper}>
					<Table aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell component="th" scope="row" align="right">
									#
								</TableCell>
								<TableCell component="th" scope="row">
									Produit
								</TableCell>
								<TableCell component="th" scope="row" align="right">
									Quantité
								</TableCell>
								<TableCell component="th" scope="row">
									Client
								</TableCell>
								<TableCell component="th" scope="row" align="right">
									Prix unitaire du produit
								</TableCell>
								<TableCell component="th" scope="row" align="right">
									Montant
								</TableCell>
								<TableCell component="th" scope="row">
									Date
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{orders &&
								orders.map((order, index) => (
									<TableRow key={index}>
										<TableCell component="th" scope="row" align="right">
											{index + 1}
										</TableCell>
										<TableCell>{order.product.name}</TableCell>
										<TableCell align="right">{order.quantity}</TableCell>
										<TableCell>{order.customer.firstname}</TableCell>
										<TableCell align="right">
											{order.product.price.toLocaleString()}
										</TableCell>
										<TableCell align="right">
											{(order.product.price * order.quantity).toLocaleString()}
										</TableCell>
										<TableCell>{order.createdAt}</TableCell>
									</TableRow>
								))}
						</TableBody>
					</Table>
				</TableContainer>
			</Paper>
		</>
	);
};

export default OrdersList;
