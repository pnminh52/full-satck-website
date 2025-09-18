import axios from "axios";

const API = "http://localhost:3000/api/users"; // base url backend

export const register = (data) => axios.post(`${API}/register`, data);
export const login = (data) => axios.post(`${API}/login`, data);

// Quên mật khẩu
export const forgotPassword = (email) => axios.post(`${API}/forgot-password`, { email });

// Reset mật khẩu
export const resetPassword = (email, token, newPassword) =>
  axios.post(`${API}/reset-password`, { email, token, newPassword });
