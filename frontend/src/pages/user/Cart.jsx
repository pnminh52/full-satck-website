import React, { useEffect, useState } from "react";
import { getCart, deleteCartItem, updateCartItem } from "../../api/cart";
import useAuth from "../../hook/useAuth";
const Cart = () => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  const fetchCart = async () => {
    try {
      setLoading(true);
      const res = await getCart(token);
      // res.data mới là array chứa cart items
      const items = Array.isArray(res.data) ? res.data : [];
      setCartItems(items);
    } catch (error) {
      console.error("Failed to fetch cart:", error);
      alert("Failed to fetch cart");
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    if (user && token) {
      fetchCart();
    }
  }, [user, token]);
  
  const handleDelete = async (cartId) => {
    try {
      await deleteCartItem(cartId, token);
      setCartItems(cartItems.filter((item) => item.cart_id !== cartId));
    } catch (error) {
      console.error("Failed to delete item:", error);
      alert("Failed to delete item");
    }
  };

  const handleUpdateQuantity = async (cartId, quantity) => {
    if (quantity < 1) return;
    try {
      await updateCartItem(cartId, { quantity }, token);
      setCartItems(
        cartItems.map((item) =>
          item.cart_id === cartId ? { ...item, quantity } : item
        )
      );
    } catch (error) {
      console.error("Failed to update quantity:", error);
      alert("Failed to update quantity");
    }
  };

  if (loading) return <p>Loading cart...</p>;
  if (cartItems.length === 0) return <p>Your cart is empty.</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      <div className="flex flex-col gap-4">
        {cartItems.map((item) => (
          <div
            key={item.cart_id}
            className="flex justify-between items-center border p-2 rounded"
          >
            <div className="flex items-center gap-4">
              {item.base_image && (
                <img
                  src={item.base_image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
              )}
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-gray-500">
                  US${Number(item.price).toFixed(2)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="border px-2 rounded"
                onClick={() =>
                  handleUpdateQuantity(item.cart_id, item.quantity - 1)
                }
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                className="border px-2 rounded"
                onClick={() =>
                  handleUpdateQuantity(item.cart_id, item.quantity + 1)
                }
              >
                +
              </button>
              <button
                className="text-red-500 font-semibold"
                onClick={() => handleDelete(item.cart_id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
