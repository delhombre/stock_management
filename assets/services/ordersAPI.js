import axios from "axios";
import * as cache from "./cache";

function create(order) {
	return axios.post("/api/orders", order).then(async (response) => {
		const cachedOrders = await cache.get("orders");

		if (cachedOrders) {
			cache.set("orders", [...cachedOrders, response.data]);
		}

		return response;
	});
}

function update(id, order) {
	return axios.put(`/api/orders/${id}`, order).then(async (response) => {
		const cachedOrders = await cache.get("orders");
		const cachedOrder = await cache.get("orders." + id);

		if (cachedOrder) {
			cache.set("orders." + id, response.data);
		}

		if (cachedOrders) {
			const index = cachedOrders.findIndex((o) => o.id === +id);

			cachedOrders[index] = response.data;
		}

		return response;
	});
}

async function findAll() {
	const cachedOrders = await cache.get("orders");

	if (cachedOrders) return cachedOrders;

	return axios.get("/api/orders").then((response) => {
		const orders = response.data["hydra:member"];
		cache.set("orders", orders);

		return orders;
	});
}

function remove(id) {
	return axios.delete(`/api/orders/${id}`).then(async (response) => {
		const cachedOrders = await cache.get("orders");

		if (cachedOrders) {
			cache.set(
				"orders",
				cachedOrders.filter((o) => o.id !== id)
			);
		}

		return response;
	});
}

async function find(id) {
	const cachedOrder = await cache.get("orders." + id);

	if (cachedOrder) return cachedOrder;

	return axios.get(`/api/orders/${id}`).then((response) => {
		const order = response.data;

		cache.set("orders." + id, order);

		return order;
	});
}

export default {
	create,
	findAll,
	remove,
	update,
	find,
};
