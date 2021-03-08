import React from "react";
import CategoriesList from "../components/CategoriesList";
import CategoryCreateForm from "../components/CategoryCreateForm";

const CategoriesPage = () => {
	return (
		<>
			<CategoryCreateForm />
			<CategoriesList />
		</>
	);
};

export default CategoriesPage;
