import React, { useEffect, useState } from "react";

import { getProducts } from "../../../../api/products";
import { Link } from "react-router-dom";
import IPhoneCard from "./IPhoneCard";
import Title from './../../../Title';

const IPhonePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getProducts();
        // 🔹 Lọc ra sản phẩm có name chứa "iPhone"
        const iphoneProducts = res.data.filter((p) =>
          p.name.toLowerCase().includes("iphone")
        );
        setProducts(iphoneProducts);
      } catch (err) {
        console.error("❌ Error fetching iPhones:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="body-container">
      <Title />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((product) => (
          <Link key={product.id} to={`/product/${product.id}`}>
            <IPhoneCard product={product} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default IPhonePage;
