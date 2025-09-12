import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProducts, getProductById } from "../../api/products";

const ProductDetails = () => {
  const { id } = useParams();
  const [allProducts, setAllProducts] = useState([]); // tất cả sản phẩm cùng tên
  const [product, setProduct] = useState(null); // sản phẩm đang hiển thị
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Lấy sản phẩm hiện tại
        const res = await getProductById(id);
        setProduct(res.data);
        setSelectedImage(res.data.image);

        // Lấy tất cả sản phẩm để lọc trùng tên
        const allRes = await getProducts();
        const sameNameProducts = allRes.data.filter(
          (p) => p.name === res.data.name
        );
        setAllProducts(sameNameProducts);
      } catch (err) {
        console.error("❌ Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!product) return <p className="text-center mt-10">Product not found</p>;

  const handleVariantClick = (variant) => {
    setProduct(variant);
    setSelectedImage(variant.image);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Hình ảnh */}
      <div>
        <img
          src={selectedImage}
          alt={product.name}
          className="w-full h-96 object-cover rounded-lg mb-4"
        />

        {/* Gallery ảnh phụ */}
        <div className="flex gap-2 mb-4">
        {[product.image, ...(product.additional_images || [])]
  .filter((img) => img) // bỏ những giá trị rỗng/null/undefined
  .map((img, idx) => (
    <img
      key={idx}
      src={img}
      alt={`thumbnail-${idx}`}
      className={`w-20 h-20 object-cover rounded cursor-pointer border ${
        selectedImage === img ? "border-blue-500" : "border-gray-300"
      }`}
      onClick={() => setSelectedImage(img)}
    />
))}

        </div>

        {/* Variants khác cùng tên */}
        {allProducts.length > 1 && (
          <div className="flex gap-2 mt-2">
            {allProducts
              .filter((p) => p.id !== product.id)
              .map((variant) => (
                <img
                  key={variant.id}
                  src={variant.image}
                  alt={variant.name}
                  className="w-16 h-16 object-cover rounded cursor-pointer border border-gray-300"
                  onClick={() => handleVariantClick(variant)}
                />
              ))}
          </div>
        )}
      </div>

      {/* Thông tin sản phẩm */}
      <div className="flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
          <p className="text-xl text-gray-700 mb-4">
            {Number(product.price).toLocaleString()} ¥
          </p>
          <p className="text-gray-600 mb-4">{product.description}</p>

          <div className="mb-4">
            <p>
              <span className="font-semibold">Material:</span> {product.material}
            </p>
            <p>
              <span className="font-semibold">Carat:</span> {product.carat}
            </p>
            <p>
              <span className="font-semibold">Style:</span> {product.style}
            </p>
          </div>
        </div>

        <button className="bg-[#453536] text-white px-6 py-3 rounded hover:bg-[#5a4b4b] transition">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
