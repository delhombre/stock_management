import React from "react";
import SupplierCreateForm from "../components/SupplierCreateForm";
import SuppliersList from "../components/SuppliersList";

const SuppliersPage = () => {
	return (
		<>
			<SupplierCreateForm />
			<SuppliersList />
		</>
	);
};

export default SuppliersPage;
