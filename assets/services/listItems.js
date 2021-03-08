/* eslint-disable no-undef */
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import {
	AssignmentRounded,
	AssignmentTurnedInOutlined,
	BarChartRounded,
	CategoryRounded,
	DashboardRounded,
	GroupRounded,
	LayersRounded,
	ShoppingCartRounded,
} from "@material-ui/icons";
import AssignmentIcon from "@material-ui/icons/Assignment";
import React from "react";

export const mainListItems = [
	{
		label: "Tableau de bord",
		path: "/tableau-de-bord",
		icon: <DashboardRounded />,
	},
	{
		label: "Commandes",
		path: "/commandes",
		icon: <ShoppingCartRounded />,
	},
	{
		label: "Clients",
		path: "/clients",
		icon: <GroupRounded />,
	},
	{
		label: "Fournisseurs",
		path: "/fournisseurs",
		icon: <AssignmentRounded />,
	},
	{
		label: "Produits-Articles",
		path: "/produits",
		icon: <LayersRounded />,
	},
	{
		label: "Factures",
		path: "/factures",
		icon: <AssignmentTurnedInOutlined />,
	},
	{
		label: "Catégories",
		path: "/categories",
		icon: <CategoryRounded />,
	},
	{
		label: "Employés",
		path: "/employes",
		icon: <LayersRounded />,
	},
	{
		label: "Rapport",
		path: "/rapport",
		icon: <BarChartRounded />,
	},
];

export const secondaryListItems = (
	<>
		<ListSubheader inset>Saved reports</ListSubheader>
		<ListItem button>
			<ListItemIcon>
				<AssignmentIcon />
			</ListItemIcon>
			<ListItemText primary="Current month" />
		</ListItem>
		<ListItem button>
			<ListItemIcon>
				<AssignmentIcon />
			</ListItemIcon>
			<ListItemText primary="Last quarter" />
		</ListItem>
		<ListItem button>
			<ListItemIcon>
				<AssignmentIcon />
			</ListItemIcon>
			<ListItemText primary="Year-end sale" />
		</ListItem>
	</>
);
