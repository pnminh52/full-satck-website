import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../../api/products";
import Loader from './../../components/Loader';
const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await getProductById(id);
        setProduct(res.data);
      } catch (err) {
        console.error("❌ Error fetchProduct:", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return <p className="text-center mt-10"><Loader /></p>;
  }

  if (!product) {
    return <p className="text-center mt-10 text-red-500">Product not found</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Left: Images */}
      <div>
        <img
          src={product.base_image}
          alt={product.name}
          className="w-full h-[400px] object-cover rounded-lg shadow"
        />
        {product.additional_images?.length > 0 && (
          <div className="flex gap-2 mt-4 overflow-x-auto">
            {product.additional_images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`Additional ${i}`}
                className="w-24 h-24 object-cover rounded border cursor-pointer hover:scale-105 transition"
              />
            ))}
          </div>
        )}
      </div>

      {/* Right: Info */}
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
        <p className="text-gray-500 mb-2">{product.series}</p>
        <p className="text-xl font-semibold text-green-600 mb-4">
          ${product.price}
        </p>
        <p className="text-gray-700 mb-4">{product.description}</p>

        <p className="mb-2">
          <span className="font-semibold">Stock:</span>{" "}
          {product.stock > 0 ? product.stock : "Out of stock"}
        </p>
        <p className="mb-2">
          <span className="font-semibold">Release Date:</span>{" "}
          {product.release_date || "N/A"}
        </p>
        <p className="mb-2">
          <span className="font-semibold">Manufacturer:</span>{" "}
          {product.manufacturer || "N/A"}
        </p>

        <button
        
          disabled={product.stock <= 0}
          className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {product.stock > 0 ? "➕ Add to Cart" : "❌ Out of Stock"}
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
