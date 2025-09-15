import React, {  } from "react";

const IPhoneCard = ({ product }) => {

  return (
    <div
      className="relative   rounded-lg overflow-hidden group  cursor-pointer"
     
    >
  

       <div className="w-full">
       <img
          src={ product.thumbnail}
          alt={product.name}
          className="object-cover w-full h-100 rounded-3xl transition duration-300"
        />
       {product.variants && product.variants.length > 0 && (
          <div className="flex gap-1 items-center justify-center py-4">
            {product.variants.map((v, i) => (
              <div
              key={i}
              className="w-4 h-4 rounded-full border border-gray-300"
              style={{
                backgroundColor: v.color_code,
                boxShadow: "inset 0 0 1px black", // inner shadow
              }}
              title={v.color}
            />
            
            ))}
          </div>
        )}
       </div>

      {/* Info */}
      <div className=" w-full flex flex-col gap-2 justify-center text-center ">
        <h3 className="text-2xl  font-sf">
          {product.name}
        </h3>
        <h3 className="font-medium text-gray-800 line-clamp-1">
          {product.description}
        </h3>
        <p className="text-lg font-sf">
  {product.variants && product.variants.length > 0
    ? `Từ  ${Math.min(...product.variants.map((v) => Number(v.price))).toLocaleString("vi-VN")}₫ 
       đến ${Math.max(...product.variants.map((v) => Number(v.price))).toLocaleString("vi-VN")}₫`
    : `${Number(product.price || 0).toLocaleString("vi-VN")}₫`}
</p>


      </div>
      <div className="flex items-center justify-center gap-6 py-4">
        <button className="btn-title">Tìm hiểu thêm</button>
        <p className="text-[#0071E3] underline">Mua ngay</p>
      </div>
    </div>
  );
};

export default IPhoneCard;
