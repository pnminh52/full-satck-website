import axios from "axios";

const API = "http://localhost:3000/api/payment";

export const createVnpayPayment = (data) =>
  axios.post(`${API}/create-payment`, data);

export const verifyVnpayPaymentReturn = (params) =>
  axios.get(`${API}/payment-return`, { params });

export const vnpayIpn = (params) =>
  axios.get(`${API}/payment/ipn`, { params });

