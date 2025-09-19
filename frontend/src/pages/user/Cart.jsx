import React, { useEffect, useState } from "react";
import {
  getCart,
  deleteCartItem,
  updateCartItem,
  clearCart,
} from "../../api/cart";
import useAuth from "../../hook/useAuth";
import { Link, useNavigate } from "react-router-dom";
import useToast from "../../hook/useToast";
import PriceInfo from './../../components/user/cart/PriceInfo';
import LeftSide from './../../components/user/cart/LeftSide';

const Cart = () => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const toast = useToast();

  const fetchCart = async () => {
    try {
      setLoading(true);
      const res = await getCart(token);
      const items = Array.isArray(res.data)
        ? res.data.map((item) => ({
            ...item,
            product_id: item.product_id || item.id,
          }))
        : [];
      setCartItems(items);
    } catch (error) {
      console.error("Failed to fetch cart:", error);
      toast.error("Failed to fetch cart");
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
      toast.success("Item removed");
    } catch (error) {
      console.error("Failed to delete item:", error);
      toast.error("Failed to delete item");
    }
  };

  const handleDeleteAll = async () => {
    try {
      await clearCart(token);
      setCartItems([]);
      toast.success("All items removed");
    } catch (error) {
      console.error("Failed to clear cart:", error);
      toast.error("Failed to clear cart");
    }
  };

  const handleUpdateQuantity = async (cartId, quantity) => {
    if (quantity < 1) return;
    if (quantity > 3) {
      toast.error("Maximum 3 units per item");
      return;
    }

    try {
      await updateCartItem(cartId, { quantity }, token);
      setCartItems(
        cartItems.map((item) =>
          item.cart_id === cartId ? { ...item, quantity } : item
        )
      );
    } catch (error) {
      console.error("Failed to update quantity:", error);
      toast.error("Failed to update quantity");
    }
  };

  const handleCheckout = () => {
    navigate("/checkout", { state: { cartItems } });
  };

  if (loading) return <p>Loading cart...</p>;
  if (cartItems.length === 0) return <p>Your cart is empty.</p>;

  return (
    <div className="max-w-screen-xl mx-auto px-50">
      <h1 className="text-2xl font-semibold py-6">Your Cart</h1>

      {cartItems.length >= 2 && (
        <div className="mb-4 flex justify-end">
          <button
            onClick={handleDeleteAll}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Delete All
          </button>
        </div>
      )}

   <div className="flex gap-6 items-center">
   <LeftSide cartItems={cartItems} handleUpdateQuantity={handleUpdateQuantity} handleDelete={handleDelete} />
   <PriceInfo cartItems={cartItems} />
   </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={handleCheckout}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
