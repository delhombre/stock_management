import { CircularProgress } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import { blue } from "@material-ui/core/colors";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import usersAPI from "../services/usersAPI";

const useStyles = makeStyles((theme) => ({
	paper: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: blue[500],
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

const RegistrationPage = ({ history }) => {
	const classes = useStyles();

	const [user, setUser] = useState({
		firstname: "",
		lastname: "",
		email: "",
		password: "",
	});

	const [errors, setErrors] = useState({
		firstname: "",
		lastname: "",
		email: "",
		password: "",
	});

	const [loading, setLoading] = useState(false);

	const handleChange = ({ currentTarget }) => {
		const { value, name } = currentTarget;

		setUser({ ...user, [name]: value });
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		setLoading(true);

		try {
			await usersAPI.register(user);
			setLoading(false);
			setErrors({});
			history.replace("/");
		} catch ({ response }) {
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

	console.log("inscription");

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Inscription
				</Typography>
				<form className={classes.form} onSubmit={handleSubmit}>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<TextField
								label="Prénom"
								variant="outlined"
								id="firstname"
								name="firstname"
								autoComplete="fname"
								required
								fullWidth
								autoFocus
								value={user.firstname}
								onChange={handleChange}
								error={errors.firstname ? true : false}
								helperText={errors.firstname}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								label="Nom"
								variant="outlined"
								id="lastname"
								name="lastname"
								autoComplete="lname"
								required
								fullWidth
								value={user.lastname}
								onChange={handleChange}
								error={errors.lastname ? true : false}
								helperText={errors.lastname}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								label="Adresse email"
								variant="outlined"
								id="email"
								name="email"
								autoComplete="email"
								required
								fullWidth
								value={user.email}
								onChange={handleChange}
								error={errors.email ? true : false}
								helperText={errors.email}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								label="Mot de passe"
								variant="outlined"
								id="password"
								name="password"
								type="password"
								autoComplete="current-password"
								required
								fullWidth
								value={user.password}
								onChange={handleChange}
								error={errors.password ? true : false}
								helperText={errors.password}
							/>
						</Grid>
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						disabled={loading}
					>
						{loading ? (
							<CircularProgress size={20} thickness={2} />
						) : (
							"Inscription"
						)}
					</Button>
					<Grid container justify="flex-end">
						<Grid item>
							<NavLink to="/">Vous avez déjà un compte? Connectez-vous</NavLink>
						</Grid>
					</Grid>
				</form>
			</div>
		</Container>
	);
};

export default RegistrationPage;
