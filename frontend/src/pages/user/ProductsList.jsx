import React, { useEffect, useState } from "react";
import { getProducts } from "../../api/products";
import { useLocation } from "react-router-dom";
import IPhonePage from "../../components/user/productList/iphone/IPhonePage";
import StorePage from "../../components/user/productList/store/StorePage";
const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation(); // lấy url hiện tại

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getProducts();
        setProducts(res.data || []);
      } catch (err) {
        console.error("❌ Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  // gộp products theo name (giữ created_at sớm nhất) — bạn có thể thay đổi logic này
  const uniqueProducts = Object.values(
    products.reduce((acc, product) => {
      const name = product.name;
      if (
        !acc[name] ||
        new Date(product.created_at) < new Date(acc[name].created_at)
      ) {
        acc[name] = product;
      }
      return acc;
    }, {})
  );

  const path = location.pathname.toLowerCase();

  // nếu url bắt đầu bằng /iphone => render IPhonePage
  if (path.startsWith("/iphone")) {
    return <IPhonePage />;
  }

  // ngược lại render StorePage (mặc định)
  return <StorePage products={uniqueProducts} />;
};

export default ProductsList;
