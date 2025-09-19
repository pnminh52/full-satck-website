import React, { useState, useEffect } from "react";
import ProductCard from "../../components/user/listProduct/ProductCard";
import { getWishlistApi } from "../../api/wishlist";
import useToast from "../../hook/useToast";

const Wishlist = () => {
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const toast = useToast();

  useEffect(() => {
    const fetchWishlist = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      const userId = localStorage.getItem("userId");
      if (!userId) return;

      try {
        const products = await getWishlistApi(userId, token);
        setWishlistProducts(products);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load wishlist");
      }
    };

    fetchWishlist();
  }, []);

  if (wishlistProducts.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500">
        Your wishlist is empty
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="text-2xl font-semibold mb-4">My Wishlist</h1>
      <ProductCard products={wishlistProducts} columns={4} />
    </div>
  );
};

export default Wishlist;
