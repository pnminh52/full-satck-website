import React, { useEffect, useState } from "react";
import ProductCard from "../../components/user/listProduct/ProductCard";
import Loader from "../../components/Loader";
import SearchBar from './../../components/user/listProduct/SearchBar';
import FilterSideBar from './../../components/user/listProduct/FilterSideBar';
import { getProducts } from "../../api/products";

const ListProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Lọc theo searchTerm
  useEffect(() => {
    setFilteredProducts(
      products.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, products]);

  // Lấy tất cả sản phẩm
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await getProducts();
        setProducts(res.data || []);
      } catch (err) {
        console.error("❌ Error fetchProducts:", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="max-w-screen-xl mx-auto py-6 ">
      {loading ? (
        <div className="flex justify-center ">
          <Loader size={14} />
        </div>
      ) : (
       <div>
         <SearchBar
        filteredProducts={filteredProducts}
        setSearchTerm={setSearchTerm}
        searchTerm={searchTerm}
      />
        <div className="flex gap-4">
          
        <div className="w-full sm:w-[80%]">
           

            {products.length === 0 ? (
              <p className="text-gray-500">No products available.</p>
            ) : (
              <ProductCard products={filteredProducts} />
            )}
          </div>

          <div className="w-[20%] hidden sm:block">
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
       </div>
      )}
    </div>
  );
};

export default ListProduct;
