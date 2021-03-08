import axios from "axios";
import * as cache from "./cache";

function create(supplier) {
	return axios.post("/api/suppliers", supplier).then(async (response) => {
		const cachedSuppliers = await cache.get("suppliers");

		if (cachedSuppliers) {
			cache.set("suppliers", [...cachedSuppliers, response.data]);
		}

		return response;
	});
}

function update(id, supplier) {
	return axios.put(`/api/suppliers/${id}`, supplier).then(async (response) => {
		const cachedSuppliers = await cache.get("suppliers");
		const cachedSupplier = await cache.get("suppliers." + id);

		if (cachedSupplier) {
			cache.set("suppliers." + id, response.data);
		}

		if (cachedSuppliers) {
			const index = cachedSuppliers.findIndex((o) => o.id === +id);

			cachedSuppliers[index] = response.data;
		}

		return response;
	});
}

async function findAll() {
	const cachedSuppliers = await cache.get("suppliers");

	if (cachedSuppliers) return cachedSuppliers;

	return axios.get("/api/suppliers").then((response) => {
		const suppliers = response.data["hydra:member"];
		cache.set("suppliers", suppliers);

		return suppliers;
	});
}

function remove(id) {
	return axios.delete(`/api/suppliers/${id}`).then(async (response) => {
		const cachedSuppliers = await cache.get("suppliers");

		if (cachedSuppliers) {
			cache.set(
				"suppliers",
				cachedSuppliers.filter((o) => o.id !== id)
			);
		}

		return response;
	});
}

async function find(id) {
	const cachedSupplier = await cache.get("suppliers." + id);

	if (cachedSupplier) return cachedSupplier;

	return axios.get(`/api/suppliers/${id}`).then((response) => {
		const supplier = response.data;

		cache.set("suppliers." + id, supplier);

		return supplier;
	});
}

export default {
	create,
	findAll,
	remove,
	update,
	find,
};
