import axios from "axios";
import * as cache from "./cache";

function create(employee) {
	return axios.post("/api/employees", employee).then(async (response) => {
		const cachedEmployees = await cache.get("employees");

		if (cachedEmployees) {
			cache.set("employees", [...cachedEmployees, response.data]);
		}

		return response;
	});
}

function update(id, employee) {
	return axios.put(`/api/employees/${id}`, employee).then(async (response) => {
		const cachedEmployees = await cache.get("employees");
		const cachedEmployee = await cache.get("employees." + id);

		if (cachedEmployee) {
			cache.set("employees." + id, response.data);
		}

		if (cachedEmployees) {
			const index = cachedEmployees.findIndex((c) => c.id === +id);

			cachedEmployees[index] = response.data;
		}

		return response;
	});
}

async function findAll() {
	const cachedEmployees = await cache.get("employees");

	if (cachedEmployees) return cachedEmployees;

	return axios.get("/api/employees").then((response) => {
		const employees = response.data["hydra:member"];
		cache.set("employees", employees);

		return employees;
	});
}

function remove(id) {
	return axios.delete(`/api/employees/${id}`).then(async (response) => {
		const cachedEmployees = await cache.get("employees");

		if (cachedEmployees) {
			cache.set(
				"employees",
				cachedEmployees.filter((c) => c.id !== id)
			);
		}

		return response;
	});
}

async function find(id) {
	const cachedEmployee = await cache.get("employees." + id);

	if (cachedEmployee) return cachedEmployee;

	return axios.get(`/api/employees/${id}`).then((response) => {
		const employee = response.data;

		cache.set("employees." + id, employee);

		return employee;
	});
}

export default {
	create,
	findAll,
	remove,
	update,
	find,
};
