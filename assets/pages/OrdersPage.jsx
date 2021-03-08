import React from "react";
import OrderCreateForm from "../components/OrderCreateForm";
import OrdersList from "../components/OrdersList";

const OrdersPage = () => {
	return (
		<>
			<OrderCreateForm />
			<OrdersList />
		</>
	);
};

export default OrdersPage;
