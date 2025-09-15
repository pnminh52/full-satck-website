import axios from "axios";

const API_URL = "http://localhost:3000/api/product-variants";

// Lấy danh sách tất cả biến thể
export const getAllVariants = () => {
  return axios.get(API_URL);
};

// Lấy biến thể theo ID
export const getVariantById = (id) => {
  return axios.get(`${API_URL}/${id}`);
};

// Thêm mới biến thể
export const createVariant = (variantData) => {
  return axios.post(API_URL, variantData);
};

// Cập nhật biến thể
export const updateVariant = (id, variantData) => {
  return axios.put(`${API_URL}/${id}`, variantData);
};

// Xoá biến thể
export const deleteVariant = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};
