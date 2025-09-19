import { useState, useEffect } from "react";
import { getProfile } from "../api/auth";
import axios from "axios";

const useShippingFee = () => {
  const [address, setAddress] = useState("");
  const [shippingFee, setShippingFee] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await getProfile(token);
        setAddress(res.data.address || "");
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    if (!address) {
      setShippingFee(0);
      return;
    }

    const fetchShipping = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/shipping?region=${address}`
        );
        setShippingFee(Number(res.data.fee) || 0);
      } catch (err) {
        console.error(err);
        setShippingFee(0);
      }
    };

    fetchShipping();
  }, [address]);

  return { address, shippingFee };
};

export default useShippingFee;
