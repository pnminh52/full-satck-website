import React, {useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { createOrder } from "../../api/orders";
import { clearCart } from "../../api/cart";
import UserInfoCard from './../../components/user/checkout/UserInfoCard';
import useToast from "../../hook/useToast";
const Checkout = () => {
    const toast=useToast()
  const location = useLocation();
  const navigate = useNavigate();
  const cartItems = location.state?.cartItems || [];
  const [userInfo, setUserInfo] = useState({ phone: "", address: "" });

  const total = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );
 
  // Thanh toán VNPay
  const handleVnpayPayment = async () => {
    // try {
    //   const res = await axios.post("http://localhost:3000/api/payment/create-payment", {
    //     amount: total,
    //     orderId: Date.now().toString(),
    //     orderInfo: "Thanh toan don hang #" + Date.now(),
    //   });
    //   if (res.data.paymentUrl) {
    //     window.location.href = res.data.paymentUrl;
    //   }
    // } catch (err) {
    //   console.error("VNPay error:", err);
    //   alert("VNPay Payment failed");
    // }
    toast.error("This function is in testing phase, please pay COD!")
  };


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
      items: cartItems.map((item) => ({
        product_id: item.product_id,
        quantity: item.quantity,
      })),
      address: userInfo.address,
    };
  
    try {
      await createOrder(orderData, token);
  
      await axios.put(
        "http://localhost:3000/api/users/update-profile",
        { phone: userInfo.phone, address: userInfo.address },
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
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
        {cartItems.map((item) => (
          <div key={item.cart_id} className="flex justify-between border p-2 rounded">
            <p>
              {item.name} x {item.quantity}
            </p>
            <p>US${(item.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 text-right">
        <p className="font-bold">Total: US${total.toFixed(2)}</p>
        <div className="flex gap-4 mt-4 justify-end">
          <button
            onClick={handleVnpayPayment}
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
