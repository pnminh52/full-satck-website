import React, { useEffect, useState } from "react";
import { getProducts } from "../../api/products";

import { Link } from "react-router-dom";
import ProductCard from "../../components/user/productList/Productcard";

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getProducts();
        setProducts(res.data);
      } catch (err) {
        console.error("❌ Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  // 🔹 Gộp sản phẩm theo name, giữ created_at sớm nhất
  const uniqueProducts = Object.values(
    products.reduce((acc, product) => {
      const name = product.name;
      if (!acc[name] || new Date(product.created_at) < new Date(acc[name].created_at)) {
        acc[name] = product;
      }
      return acc;
    }, {})
  );

  return (
    <div className="px-0 space-y-4 sm:px-10">
      <div>
        <img
          src="https://www.iprimo.jp/common/img/engagement/rings/list/hero.webp"
          alt=""
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {uniqueProducts.map((product) => (
          <Link key={product.id} to={`/rings/${product.id}`}>
            <ProductCard product={product} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductsList;
