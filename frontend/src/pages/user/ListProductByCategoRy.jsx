import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProducts } from "../../api/products";
import ProductCard from "../../components/user/listProduct/ProductCard";
import Loader from "../../components/Loader";
import SearchBar from './../../components/user/listProduct/SearchBar';
import FilterSideBar from './../../components/user/listProduct/FilterSideBar';
const ListProductByCategory = () => {
  const { id } = useParams(); // lấy category_id từ URL
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false); // state loading
  const [searchTerm, setSearchTerm] = useState("");

  const [filteredProducts, setFilteredProducts] = useState(products);
  useEffect(() => {
    setFilteredProducts(
      products.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, products]);
  
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await getProducts();
        let filtered = res.data;
        if (id) {
          filtered = res.data.filter((p) => String(p.category_id) === id);
        }
        setProducts(filtered);
      } catch (err) {
        console.error("❌ Error fetchProducts:", err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchProducts();
  }, [id]); // chỉ phụ thuộc vào id
  
  

  return (
    <div className="max-w-screen-xl mx-auto py-6 min-h-screen">

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader size={14} /> {/* hiển thị loader */}
        </div>
      ) : (
        <div className="flex gap-4">
        <div className="w-[80%]">
          <SearchBar
            filteredProducts={filteredProducts}
            setSearchTerm={setSearchTerm}
            searchTerm={searchTerm}
          />
      
          {products.length === 0 ? (
            <p className="text-gray-500">No products found in this category.</p>
          ) : (
            <ProductCard products={filteredProducts} />
          )}
        </div>
      
        <div className="w-[20%]">
          <div className="sticky top-4">
            <FilterSideBar
              products={products}
              setFilteredProducts={setFilteredProducts}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
          </div>
        </div>
      </div>
      
      )}
    </div>
  );
};

export default ListProductByCategory;
