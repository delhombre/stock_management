import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import React, { useEffect, useState } from "react";
import categoriesAPI from "../services/categoriesAPI";

const useStyles = makeStyles({
	paper: {
		overflow: "auto",
	},
});

const CategoriesList = () => {
	const classes = useStyles();

	const [categories, setCategories] = useState(null);

	const fetchCategories = async () => {
		try {
			const data = await categoriesAPI.findAll();
			setCategories(data);
		} catch (error) {
			console.error(error.response);
		}
	};

	useEffect(() => fetchCategories(), []);

	return (
		<>
			<TableContainer component={Paper} className={classes.paper}>
				<Table aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>#</TableCell>
							<TableCell>Nom</TableCell>
							<TableCell>Date de création</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{categories &&
							categories.map((category, index) => (
								<TableRow key={index}>
									<TableCell component="th" scope="row">
										{index + 1}
									</TableCell>
									<TableCell align="right">{category.name}</TableCell>
									<TableCell align="right">{category.createdAt}</TableCell>
								</TableRow>
							))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
};

export default CategoriesList;
