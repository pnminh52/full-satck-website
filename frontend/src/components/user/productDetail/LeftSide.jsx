import React, { useState } from "react";
import DetailSection from './DetailSection';

const LeftSide = ({ product }) => {
  const [mainImage, setMainImage] = useState(
    product.additional_images?.[0] || product.base_image
  );

  return (
   <div>
     <div className="flex gap-4">
      {/* List ảnh phụ - scroll dọc */}
      {product.additional_images?.length > 0 && (
        <div className="w-16 h-[400px] hide-scrollbar overflow-y-auto flex flex-col gap-2 pr-1">
          {product.additional_images.map((img, i) => (
            <div
              key={i}
              className={`w-16 h-16 bg-gray-100 flex items-center justify-center  cursor-pointer  
              
              `}
              onClick={() => setMainImage(img)}
            >
              <img
                src={img}
                alt={`Additional ${i}`}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          ))}
        </div>
      )}

      {/* Ảnh chính */}
      <div className="flex-1">
        <div className="w-full h-[600px] bg-gray-100 flex items-center justify-center ">
          <img
            src={mainImage}
            alt={product.name}
            className="max-w-full max-h-full object-contain"
          />
        </div>
      </div>
    </div>
   <DetailSection product={product} />
   </div>
  );
};

export default LeftSide;
