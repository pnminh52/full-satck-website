import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

export const getWishlistApi = async (userId, token) => {
  const res = await api.get(`/wishlist/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const addToWishlistApi = async (userId, productId, token) => {
  const res = await api.post(
    `/wishlist/add`,
    { userId, productId },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data;
};
export const removeFromWishlistApi = async (userId, productId, token) => {
  const res = await api.delete(`/wishlist/remove`, {
    headers: { Authorization: `Bearer ${token}` },
    data: { userId, productId },
  });
  return res.data;
};
