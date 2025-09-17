import axios from "axios";

const API = "http://localhost:3000/api/users"; // base url backend

export const register = (data) => axios.post(`${API}/register`, data);
export const login = (data) => axios.post(`${API}/login`, data);
