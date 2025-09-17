import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProducts } from "../../api/products";
import ProductCard from "../../components/user/listProduct/ProductCard";
import Loader from "../../components/Loader";
import SearchBar from './../../components/user/listProduct/SearchBar';
const ListProductByCategory = () => {
  const { id } = useParams(); // lấy category_id từ URL
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false); // state loading
  const [searchTerm, setSearchTerm] = useState("");
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  useEffect(() => {
    fetchProducts();
  }, [id]);

  const fetchProducts = async () => {
    setLoading(true); // bắt đầu loading
    try {
      const res = await getProducts();
      const filtered = res.data.filter((p) => String(p.category_id) === id);
      setProducts(filtered);
    } catch (err) {
      console.error("❌ Error fetchProducts:", err.message);
    } finally {
      setLoading(false); // kết thúc loading
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto py-6">

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader size={14} /> {/* hiển thị loader */}
        </div>
      ) : (
        <div className="flex gap-4">
          <div className="w-[80%]">
          <SearchBar filteredProducts={filteredProducts} setSearchTerm={setSearchTerm}  searchTerm={searchTerm}/>

            {products.length === 0 ? (
              <p className="text-gray-500">No products found in this category.</p>
            ) : (
              <ProductCard products={filteredProducts} />
            )}
          </div>
          <div className="w-[20%]">
            filter
          </div>
        </div>
      )}
    </div>
  );
};

export default ListProductByCategory;
