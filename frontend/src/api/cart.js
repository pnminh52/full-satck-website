import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

export const getCart = (token) =>
  api.get("/cart", {
    headers: { Authorization: `Bearer ${token}` },
  });

export const addToCart = (data, token) =>
  api.post("/cart", data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const updateCartItem = (id, data, token) =>
  api.put(`/cart/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteCartItem = (id, token) =>
  api.delete(`/cart/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  export const clearCart = (token) =>
    api.delete("/cart/clear", {
      headers: { Authorization: `Bearer ${token}` },
    });