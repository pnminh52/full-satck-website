import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../../api/products";
import Loader from './../../components/Loader';
import LeftSide from './../../components/user/productDetail/LeftSide';
import RightSide from './../../components/user/productDetail/RightSide';
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
    <div className="max-w-screen-2xl mx-auto px-25 py-10 flex gap-4">
      {/* Left */}
      <div className="w-[70%]">
        <LeftSide product={product} />
      </div>
  
      {/* Right */}
      <div className="w-[30%]">
        <div className="sticky top-4">
          <RightSide product={product} />
        </div>
      </div>
    </div>
  );
  
};

export default ProductDetails;
