import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createOrder } from "../../api/orders";
import { clearCart } from "../../api/cart";
import UserInfoCard from './../../components/user/checkout/UserInfoCard';
import useToast from "../../hook/useToast";
import useShippingFee from "../../hook/useShippingFee";
import CheckOutItem from './../../components/user/checkout/CheckOutItem';
import PriceTable from "../../components/user/checkout/PriceTable";
const Checkout = () => {
  const toast = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const cartItems = location.state?.cartItems || [];

  const { address, shippingFee } = useShippingFee();
  const [userInfo, setUserInfo] = React.useState({ selectedDistrict: "", district: [] });

  React.useEffect(() => {
    if (address) setUserInfo(prev => ({ ...prev, selectedDistrict: address }));
  }, [address]);

  const total = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

// Checkout.jsx
const handleCodPayment = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    toast.error("Please login before ordering!");
    return;
  }

  const orderData = {
    items: cartItems.map(item => ({
      product_id: item.product_id,
      quantity: item.quantity,
    })),
    address: userInfo.address,             // giữ nguyên address
    selectedDistrict: userInfo.selectedDistrict, // district mới
    shippingFee
  };

  try {
    await createOrder(orderData, token); // backend sẽ lưu district vào orders
    await clearCart(token);
    toast.success("Order placed successfully!");
    navigate("/order");
  } catch (err) {
    console.error("COD error:", err.response?.data || err.message);
    toast.error("Order failed");
  }
};


  if (cartItems.length === 0) return <p>No items to checkout.</p>;

  return (
    <div className="max-w-screen-lg w-full mx-auto sm:px-30 px-4">
      <h1 className="sm:text-2xl text-xl font-semibold sm:py-6 py-4">Checkout</h1>
      <div className="flex flex-col gap-6">
        <CheckOutItem cartItems={cartItems} />

        <UserInfoCard onChange={setUserInfo} />

        <PriceTable
          total={total}
          shippingFee={shippingFee}
          handleCodPayment={handleCodPayment}
        />
      </div>
    </div>
  );
};

export default Checkout;
