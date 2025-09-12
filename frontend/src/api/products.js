import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/api",
});

// GET all products
export const getProducts = () => api.get("/products");

// GET product by id
export const getProductById = (id) => api.get(`/products/${id}`);

// CREATE product
export const createProduct = (data) => api.post("/products", data);

// UPDATE product
export const updateProduct = (id, data) => api.put(`/products/${id}`, data);

// DELETE product
export const deleteProduct = (id) => api.delete(`/products/${id}`);
