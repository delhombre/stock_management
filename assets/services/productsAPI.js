import axios from "axios";
import * as cache from "./cache";

function create(product) {
	return axios.post("/api/products", product).then(async (response) => {
		const cachedProducts = await cache.get("products");

		if (cachedProducts) {
			cache.set("products", [...cachedProducts, response.data]);
		}

		return response;
	});
}

function update(id, product) {
	return axios.put(`/api/products/${id}`, product).then(async (response) => {
		const cachedProducts = await cache.get("products");
		const cachedProduct = await cache.get("products." + id);

		if (cachedProduct) {
			cache.set("products." + id, response.data);
		}

		if (cachedProducts) {
			const index = cachedProducts.findIndex((c) => c.id === +id);

			cachedProducts[index] = response.data;
		}

		return response;
	});
}

async function findAll() {
	const cachedProducts = await cache.get("products");

	if (cachedProducts) return cachedProducts;

	return axios.get("/api/products").then((response) => {
		const products = response.data["hydra:member"];
		cache.set("products", products);

		return products;
	});
}

function remove(id) {
	return axios.delete(`/api/products/${id}`).then(async (response) => {
		const cachedProducts = await cache.get("products");

		if (cachedProducts) {
			cache.set(
				"products",
				cachedProducts.filter((c) => c.id !== id)
			);
		}

		return response;
	});
}

async function find(id) {
	const cachedProduct = await cache.get("products." + id);

	if (cachedProduct) return cachedProduct;

	return axios.get(`/api/products/${id}`).then((response) => {
		const product = response.data;

		cache.set("products." + id, product);

		return product;
	});
}

export default {
	create,
	findAll,
	remove,
	update,
	find,
};
