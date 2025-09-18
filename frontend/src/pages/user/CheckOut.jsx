import React from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Checkout = () => {
  const location = useLocation();
  const cartItems = location.state?.cartItems || [];

  const total = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  // Thanh toán VNPay
  const handleVnpayPayment = async () => {
    try {
      const res = await axios.post("http://localhost:3000/api/payment/create-payment", {
        amount: total,
        orderId: Date.now().toString(),
        orderInfo: "Thanh toan don hang #" + Date.now(),
      });
      if (res.data.paymentUrl) {
        window.location.href = res.data.paymentUrl;
      }
    } catch (err) {
      console.error("VNPay error:", err);
      alert("VNPay Payment failed");
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
         
        </div>
      </div>
    </div>
  );
};

export default Checkout;
