import axios from "axios";
import * as cache from "./cache";

function create(customer) {
	return axios.post("/api/customers", customer).then(async (response) => {
		const cachedCustomers = await cache.get("customers");

		if (cachedCustomers) {
			cache.set("customers", [...cachedCustomers, response.data]);
		}

		return response;
	});
}

function update(id, customer) {
	return axios.put(`/api/customers/${id}`, customer).then(async (response) => {
		const cachedCustomers = await cache.get("customers");
		const cachedCustomer = await cache.get("customers." + id);

		if (cachedCustomer) {
			cache.set("customers." + id, response.data);
		}

		if (cachedCustomers) {
			const index = cachedCustomers.findIndex((c) => c.id === +id);

			cachedCustomers[index] = response.data;
		}

		return response;
	});
}

async function findAll() {
	const cachedCustomers = await cache.get("customers");

	if (cachedCustomers) return cachedCustomers;

	return axios.get("/api/customers").then((response) => {
		const customers = response.data["hydra:member"];
		cache.set("customers", customers);

		return customers;
	});
}

function remove(id) {
	return axios.delete(`/api/customers/${id}`).then(async (response) => {
		const cachedCustomers = await cache.get("customers");

		if (cachedCustomers) {
			cache.set(
				"customers",
				cachedCustomers.filter((c) => c.id !== id)
			);
		}

		return response;
	});
}

async function find(id) {
	const cachedCustomer = await cache.get("customers." + id);

	if (cachedCustomer) return cachedCustomer;

	return axios.get(`/api/customers/${id}`).then((response) => {
		const customer = response.data;

		cache.set("customers." + id, customer);

		return customer;
	});
}

export default {
	create,
	findAll,
	remove,
	update,
	find,
};
