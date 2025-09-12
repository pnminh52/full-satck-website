import React, { useEffect, useState } from "react";
import { getProducts } from "../../api/products";
import ProductCard from "../../components/user/productList/Productcard";
import { Link } from "react-router-dom";

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

  return (
    <div className="px-0 space-y-4 sm:px-10">
        <div>
        <img src="https://www.iprimo.jp/common/img/engagement/rings/list/hero.webp" alt="" />
    </div>
    <div className="w-[20%]"></div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 ">
      {products.map((product) => (
        <Link key={product.id} to={`/rings/${product.id}`}>
        <ProductCard product={product} />
      </Link>
      ))}
    </div>
    </div>
  );
};

export default ProductsList;
