import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../../api/products";
import LeftSide from './../../components/user/productDetail/LeftSide';
import RightSide from './../../components/user/productDetail/RightSide';

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const res = await getProductById(id);
      const data = res.data;
      setProduct(data);
      if (data.variants?.length > 0) {
        setSelectedVariant(data.variants[0]);
      }
    } catch (err) {
      console.error("❌ Error fetching product:", err.message);
    }
  };

  // Cập nhật ảnh chính khi product hoặc variant thay đổi
  useEffect(() => {
    if (!product) return;
    if (selectedVariant?.image) setSelectedImage(selectedVariant.image);
    else setSelectedImage(product.base_image || null);
  }, [product, selectedVariant]);

  if (!product) return <p className="text-center mt-10">Loading...</p>;

// Tạo gallery ảnh bao gồm: ảnh chính + ảnh phụ của variant
const galleryImages = [
  selectedVariant.image,                       // ảnh chính của product
  ...(selectedVariant?.additional_images || []) // ảnh phụ của variant
].filter(Boolean); // loại bỏ undefined/null

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left: Main Image + Gallery */}
        <LeftSide selectedImage={selectedImage} product={product} galleryImages={galleryImages} setSelectedImage={setSelectedImage} />

        {/* Right: Product Info */}
       <RightSide selectedVariant={selectedVariant} product={product} setSelectedVariant={setSelectedVariant} />
      </div>

      {/* Additional Features */}
      {product.features?.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Features</h2>
          <ul className="list-disc list-inside text-gray-700">
            {product.features.map((f, idx) => (
              <li key={idx}>{f}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ProductDetails;
