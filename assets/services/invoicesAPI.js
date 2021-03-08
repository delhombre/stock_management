import axios from "axios";
import * as cache from "./cache";

function create(invoice) {
	return axios.post("/api/invoices", invoice).then(async (response) => {
		const cachedInvoices = await cache.get("invoices");

		if (cachedInvoices) {
			cache.set("invoices", [...cachedInvoices, response.data]);
		}

		return response;
	});
}

function update(id, invoice) {
	return axios.put(`/api/invoices/${id}`, invoice).then(async (response) => {
		const cachedInvoices = await cache.get("invoices");
		const cachedInvoice = await cache.get("invoices." + id);

		if (cachedInvoice) {
			cache.set("invoices." + id, response.data);
		}

		if (cachedInvoices) {
			const index = cachedInvoices.findIndex((i) => i.id === +id);

			cachedInvoices[index] = response.data;
		}

		return response;
	});
}

async function findAll() {
	const cachedInvoices = await cache.get("invoices");

	if (cachedInvoices) return cachedInvoices;

	return axios.get("/api/invoices").then((response) => {
		const invoices = response.data["hydra:member"];
		cache.set("invoices", invoices);

		return invoices;
	});
}

function remove(id) {
	return axios.delete(`/api/invoices/${id}`).then(async (response) => {
		const cachedInvoices = await cache.get("invoices");

		if (cachedInvoices) {
			cache.set(
				"invoices",
				cachedInvoices.filter((i) => i.id !== id)
			);
		}

		return response;
	});
}

async function find(id) {
	const cachedInvoice = await cache.get("invoices." + id);

	if (cachedInvoice) return cachedInvoice;

	return axios.get(`/api/invoices/${id}`).then((response) => {
		const invoice = response.data;

		cache.set("invoices." + id, invoice);

		return invoice;
	});
}

export default {
	create,
	findAll,
	remove,
	update,
	find,
};
