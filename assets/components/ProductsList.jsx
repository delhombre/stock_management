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
import productsAPI from "../services/productsAPI";

const useStyles = makeStyles(() => ({
	paper: {
		overflow: "auto",
	},
}));

const ProductsList = () => {
	const [products, setProducts] = useState(null);

	const fetchProducts = async () => {
		try {
			const data = await productsAPI.findAll();
			setProducts(data);
		} catch (error) {
			console.error(error.response);
		}
	};

	useEffect(() => fetchProducts(), []);

	const classes = useStyles();

	return (
		<>
			<TableContainer component={Paper} className={classes.paper}>
				<Table aria-label="simple table">
					<TableHead>
						<TableRow>
							<th>#</th>
							<th>Nom</th>
							<th>Quantité</th>
							<th>Prix</th>
							<th>{"Date d'ajout"}</th>
						</TableRow>
					</TableHead>
					<TableBody>
						{products &&
							products.map((product, index) => (
								<TableRow key={index}>
									<TableCell component="th" scope="row">
										{index + 1}
									</TableCell>
									<TableCell>{product.name}</TableCell>
									<TableCell>{product.quantity}</TableCell>
									<TableCell>{product.price}</TableCell>
									<TableCell>{product.createdAt}</TableCell>
								</TableRow>
							))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
};

export default ProductsList;
