import { CircularProgress } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import { purple, red } from "@material-ui/core/colors";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import authAPI from "../services/authAPI";

const useStyles = makeStyles((theme) => ({
	paper: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: purple[500],
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

const LoginPage = ({ history }) => {
	const classes = useStyles();

	const [credentials, setCredentials] = useState({
		username: "",
		password: "",
	});

	const [apiError, setApiError] = useState({
		status: false,
		message:
			"Les informations saisies ne correspondent pas. Veuillez vérifier et réessayer.",
	});

	const [loading, setLoading] = useState(false);

	const handleChange = ({ currentTarget }) => {
		const { name, value } = currentTarget;

		setCredentials({ ...credentials, [name]: value });
	};

	const { setIsAuthenticated } = useContext(AuthContext);

	const handleSubmit = async (event) => {
		event.preventDefault();

		setLoading(true);

		try {
			await authAPI.authenticate(credentials);
			setLoading(false);
			setApiError({ ...apiError, status: false });
			setIsAuthenticated(true);
			history.replace("/tableau-de-bord");
		} catch (error) {
			setLoading(false);
			setApiError({ ...apiError, status: true });
		}
	};

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Connexion
				</Typography>
				{apiError.status && (
					<Typography variant="body2" style={{ color: red.A700 }}>
						{apiError.message}
					</Typography>
				)}
				<form className={classes.form} onSubmit={handleSubmit}>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						label="Adresse email"
						id="username"
						name="username"
						autoComplete="email"
						autoFocus
						value={credentials.username}
						onChange={handleChange}
						error={apiError.status}
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						label="Mot de passe"
						name="password"
						type="password"
						id="password"
						autoComplete="current-password"
						value={credentials.password}
						onChange={handleChange}
						error={apiError.status}
					/>
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
							"Connexion"
						)}
					</Button>
					<Grid container justify="flex-end">
						{/* <Grid item xs>
							<Link href="#" variant="body2">
								Forgot password?
							</Link>
						</Grid> */}
						<Grid item>
							<NavLink to="/inscription">
								{"Pas encore de compte? Inscivez-vous"}
							</NavLink>
						</Grid>
					</Grid>
				</form>
			</div>
		</Container>
	);
};

export default LoginPage;
