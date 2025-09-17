import React, { useState } from "react";
import { login } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hook/useAuth"; 
import useToast from "../../hook/useToast";

const Login = () => {
  const toast=useToast()
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login: contextLogin } = useAuth(); 

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(form);
      const { token, user } = res.data;
  
      contextLogin(user, token);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
  
      toast.success("Login successful!"); 
      navigate("/");
    } catch (err) {
      const errMsg = err.response?.data?.error || "Login failed";
      setError(errMsg);
      toast.error(errMsg); 
    }
  };
  

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Login</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
