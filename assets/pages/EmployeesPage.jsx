import React from "react";
import EmployeeCreateForm from "../components/EmployeeCreateForm";
import EmployeesList from "../components/EmployeesList";

const EmployeesPage = () => {
	return (
		<>
			<EmployeeCreateForm />
			<EmployeesList />
		</>
	);
};

export default EmployeesPage;
