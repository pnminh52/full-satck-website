import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

// GET cart items
export const getCart = (token) =>
  api.get("/cart", {
    headers: { Authorization: `Bearer ${token}` },
  });

// ADD item to cart
export const addToCart = (data, token) =>
  api.post("/cart", data, {
    headers: { Authorization: `Bearer ${token}` },
  });

// UPDATE cart item
export const updateCartItem = (id, data, token) =>
  api.put(`/cart/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

// DELETE cart item
export const deleteCartItem = (id, token) =>
  api.delete(`/cart/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
