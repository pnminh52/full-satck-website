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
import PriceInfo from "./../../components/user/cart/PriceInfo";
import LeftSide from "./../../components/user/cart/LeftSide";
import Loader from "./../../components/Loader";

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

  if (loading) {
    return (
      <p >
        <Loader />
      </p>
    );
  }
  if (cartItems.length === 0) return <p>Your cart is empty.</p>;

  return (
    <div className="max-w-screen-xl w-full mx-auto sm:px-30 px-4">
      <h1 className="sm:text-2xl text-xl  font-semibold sm:py-6 py-4">Your Cart</h1>

      <div className="flex flex-col lg:flex-row gap-4 ">
        <div className="w-full sm:w-[70%]">
          <LeftSide
            cartItems={cartItems}
            handleUpdateQuantity={handleUpdateQuantity}
            handleDelete={handleDelete}
          />
        </div>
        <div className="w-full sm:w-[30%] sticky top-4 self-start">
          <PriceInfo handleCheckout={handleCheckout} cartItems={cartItems} />
        </div>
      </div>
    </div>
  );
};

export default Cart;
