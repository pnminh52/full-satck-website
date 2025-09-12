import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProducts, getProductById } from "../../api/products";

const ProductDetails = () => {
  const { id } = useParams();
  const [allVariants, setAllVariants] = useState([]); // tất cả sản phẩm cùng name
  const [product, setProduct] = useState(null); // sản phẩm hiện tại
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedVariant, setSelectedVariant] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Lấy sản phẩm hiện tại
        const res = await getProductById(id);
        const currentProduct = res.data;

        // Parse additional_images nếu là string
        const additionalImages = Array.isArray(currentProduct.additional_images)
          ? currentProduct.additional_images
          : currentProduct.additional_images
            ? JSON.parse(currentProduct.additional_images)
            : [];

        currentProduct.parsedImages = additionalImages;

        setProduct(currentProduct);
        setSelectedImage(currentProduct.image);

        // Lấy tất cả sản phẩm để lọc cùng name
        const allRes = await getProducts();
        const sameNameProducts = allRes.data
          .filter((p) => p.name === currentProduct.name)
          .map((p) => {
            const imgs = Array.isArray(p.additional_images)
              ? p.additional_images
              : p.additional_images
                ? JSON.parse(p.additional_images)
                : [];
            return { ...p, parsedImages: imgs };
          });

        setAllVariants(sameNameProducts);
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
    setSelectedVariant(variant);
  };
  

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        
      {/* Hình ảnh */}
      <div>
      {allVariants.length > 0 && (
  <div className="flex gap-6 mt-2">
    {allVariants.map((variant) => (
      <div
        key={variant.id}
        onClick={() => handleVariantClick(variant)}
        className="cursor-pointer flex items-center gap-1"
      >
        <span
          className={`inline-block w-3 h-3 rounded-full border-2  ${
            selectedVariant?.id === variant.id ? "border-[#979797]" : "border-none"
          }`}
          style={{ backgroundColor: variant.colorcode }}
        ></span>
        <span className={`text-sm 
            ${
                selectedVariant?.id === variant.id ? "font-semibold" : ""
              }
            `}>{variant.color}</span>
      </div>
    ))}
  </div>
)}
        <img
          src={selectedImage}
          alt={product.name}
          className="w-full h-96 object-cover rounded-lg mb-4"
        />

        {/* Gallery ảnh phụ */}
        <div className="flex gap-2 mb-4">
          {[product.image, ...(product.parsedImages || [])]
            .filter((img) => img)
            .map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`thumbnail-${idx}`}
                className={`w-20 h-20 object-cover rounded cursor-pointer  ${
                  selectedImage === img ? "border-gray-300 border" : ""
                }`}
                onClick={() => setSelectedImage(img)}
              />
            ))}
        </div>

        





      </div>

      {/* Thông tin sản phẩm */}
      <div className="flex flex-col justify-between">
        <div>
          <h1 className="font-thin mb-2 eb-garamond-800">{product.name}</h1>
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
