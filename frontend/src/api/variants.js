import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/api",
});

// ----------------- VARIANTS -----------------

// GET all variants
export const getVariants = () => api.get("/products_variant");

// GET variant by id
export const getVariantById = (id) => api.get(`/products_variant/${id}`);

// CREATE variant
export const createProductVariant = (data) => api.post("/products_variant", data);

// UPDATE variant
export const updateProductVariant = (id, data) => api.put(`/products_variant/${id}`, data);

// DELETE variant
export const deleteProductVariant = (id) => api.delete(`/products_variant/${id}`);
