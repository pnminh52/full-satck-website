import axios from "axios";

const API = "http://localhost:3000/api/users"; // base url backend

export const register = (data) => axios.post(`${API}/register`, data);
export const login = (data) => axios.post(`${API}/login`, data);
export const forgotPassword = (email) => axios.post(`${API}/forgot-password`, { email });
export const resetPassword = (email, token, newPassword) =>
  axios.post(`${API}/reset-password`, { email, token, newPassword });
export const updateProfile = (data, token) =>
    axios.put(`${API}/update-profile`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
export const getProfile = (token) =>
        axios.get(`${API}/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      