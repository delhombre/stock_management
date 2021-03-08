import axios from "axios";
import * as cache from "./cache";

function create(category) {
	return axios.post("/api/categories", category).then(async (response) => {
		const cachedCategories = await cache.get("categories");

		if (cachedCategories) {
			cache.set("categories", [...cachedCategories, response.data]);
		}

		return response;
	});
}

function update(id, category) {
	return axios.put(`/api/categories/${id}`, category).then(async (response) => {
		const cachedCategories = await cache.get("categories");
		const cachedCategory = await cache.get("categories." + id);

		if (cachedCategory) {
			cache.set("categories." + id, response.data);
		}

		if (cachedCategories) {
			const index = cachedCategories.findIndex((c) => c.id === +id);

			cachedCategories[index] = response.data;
		}

		return response;
	});
}

async function findAll() {
	const cachedCategories = await cache.get("categories");

	if (cachedCategories) return cachedCategories;

	return axios.get("/api/categories").then((response) => {
		const categories = response.data["hydra:member"];
		cache.set("categories", categories);

		return categories;
	});
}

function remove(id) {
	return axios.delete(`/api/categories/${id}`).then(async (response) => {
		const cachedCategories = await cache.get("categories");

		if (cachedCategories) {
			cache.set(
				"categories",
				cachedCategories.filter((c) => c.id !== id)
			);
		}

		return response;
	});
}

async function find(id) {
	const cachedCategory = await cache.get("categories." + id);

	if (cachedCategory) return cachedCategory;

	return axios.get(`/api/categories/${id}`).then((response) => {
		const category = response.data;

		cache.set("categories." + id, category);

		return category;
	});
}

export default {
	create,
	findAll,
	remove,
	update,
	find,
};
