import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import useToast from "../../hook/useToast";
const ResetPassword = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token || !email) {
      toast.error("Invalid or missing reset link");
      navigate("/login");
    }
  }, [token, email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newPassword) return toast.error("Please enter new password");

    setLoading(true);
    try {
      await axios.post("http://localhost:3000/api/users/reset-password", {
        email,
        token,
        newPassword,
      });
      toast.success("Password reset successfully!");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.error || "Reset password failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Reset Password</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="password"
          placeholder="New password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          disabled={loading}
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
