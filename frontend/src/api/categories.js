import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

// GET all categories
export const getCategories = () => api.get("/categories");

// GET category by id
export const getCategoryById = (id) => api.get(`/categories/${id}`);

// CREATE category
export const createCategory = (data) => api.post("/categories", data);

// UPDATE category
export const updateCategory = (id, data) => api.put(`/categories/${id}`, data);

// DELETE category
export const deleteCategory = (id) => api.delete(`/categories/${id}`);
