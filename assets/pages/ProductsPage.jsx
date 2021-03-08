import React from "react";
import ProductCreateForm from "../components/ProductCreateForm";
import ProductsList from "../components/ProductsList";

const ProductsPage = () => {
	return (
		<>
			<ProductCreateForm />
			<ProductsList />
		</>
	);
};

export default ProductsPage;
