import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../../hook/useAuth";

const UserInfoCard = ({ onChange }) => {
  const { user: authUser } = useAuth();
  const [user, setUser] = useState(null);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await axios.get("http://localhost:3000/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);

        setPhone(res.data.phone || "");
        setAddress(res.data.address || "");

        onChange && onChange({
          phone: res.data.phone || "",
          address: res.data.address || ""
        });
      } catch (err) {
        console.error("Failed to fetch user profile:", err);
      }
    };

    fetchUserProfile();
  }, [onChange]);

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
    onChange && onChange({ phone: e.target.value, address });
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
    onChange && onChange({ phone, address: e.target.value });
  };

  if (!user) return null;

  return (
    <div className="border p-4 rounded mb-4">
      <h2 className="text-lg font-semibold mb-2">User Information</h2>

      <div className="flex flex-col gap-2 mb-2">
        <label>Name</label>
        <input type="text" value={user.name} readOnly className="border rounded px-2 py-1 w-full bg-gray-100" />
      </div>

      <div className="flex flex-col gap-2 mb-2">
        <label>Email</label>
        <input type="email" value={user.email} readOnly className="border rounded px-2 py-1 w-full bg-gray-100" />
      </div>

      <div className="flex flex-col gap-2 mb-2">
        <label>Phone <span className="text-red-500">*</span></label>
        <input
          type="text"
          value={phone}
          onChange={handlePhoneChange}
          className="border rounded px-2 py-1 w-full"
          readOnly={!!user.phone}
          placeholder={user.phone ? "" : "Enter your phone"}
          required
        />
      </div>

      <div className="flex flex-col gap-2 mb-2">
        <label>Address <span className="text-red-500">*</span></label>
        <input
          type="text"
          value={address}
          onChange={handleAddressChange}
          className="border rounded px-2 py-1 w-full"
          readOnly={!!user.address}
          placeholder={user.address ? "" : "Enter your address"}
          required
        />
      </div>
    </div>
  );
};

export default UserInfoCard;
