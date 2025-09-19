import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createOrder } from "../../api/orders";
import { clearCart } from "../../api/cart";
import UserInfoCard from './../../components/user/checkout/UserInfoCard';
import useToast from "../../hook/useToast";
import useShippingFee from "../../hook/useShippingFee";

const Checkout = () => {
  const toast = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const cartItems = location.state?.cartItems || [];

  const { address, shippingFee } = useShippingFee();
  const [userInfo, setUserInfo] = React.useState({ phone: "", address: "" });

  React.useEffect(() => {
    if (address) setUserInfo(prev => ({ ...prev, address }));
  }, [address]);

  const total = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  const handleCodPayment = async () => {
    if (!userInfo.phone || !userInfo.address) {
      toast.error("Please fill in both phone and address!");
      return;
    }

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
      address: userInfo.address,
      shippingFee,
      region: userInfo.address
    };

    try {
      await createOrder(orderData, token);

      await fetch(`http://localhost:3000/api/users/update-profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ phone: userInfo.phone, address: userInfo.address })
      });

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
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      <div className="flex flex-col gap-4">
        {cartItems.map(item => (
          <div key={item.cart_id} className="flex justify-between border p-2 rounded">
            <p>{item.name} x {item.quantity}</p>
            <p>{(item.price * item.quantity).toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 text-right">
        <p className="font-bold">
          Subtotal: {total.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
        </p>
        <p className="font-bold">
          Shipping: {shippingFee === null ? "Đang tính phí..." : shippingFee.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
        </p>
        <p className="font-bold text-lg">
          Grand Total: {shippingFee === null ? "Đang tính tổng..." : (total + shippingFee).toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
        </p>

        <div className="flex gap-4 mt-4 justify-end">
          <button
            onClick={() => toast.error("VNPay is in testing")}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Pay with VNPay
          </button>
          <button
            onClick={handleCodPayment}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Pay with COD
          </button>
        </div>
      </div>

      <UserInfoCard onChange={setUserInfo} />
    </div>
  );
};

export default Checkout;
