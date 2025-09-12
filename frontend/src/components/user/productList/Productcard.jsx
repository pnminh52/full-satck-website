import React from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const ProductCard = ({ product }) => {
  return (
    <div className="relative border cursor-pointer border-gray-300 overflow-hidden transition duration-300 group h-100">
      {/* Heart icon */}
      <div className="absolute top-2 right-2 z-10">
        <FavoriteBorderIcon className="text-black rounded-full w-12 h-12 bg-white " />
      </div>

      {/* Image */}
      <img
        src={product.image}
        alt={product.name}
        className="w-full absolute top-1/2 -translate-y-1/2 h-48 object-cover"
      />

      {/* Overlay */}
      <div className="absolute z-11 inset-0 bg-gray-400 opacity-0 group-hover:opacity-20 transition duration-300"></div>

      {/* Info */}
      <div className=" absolute bottom-4 left-4 z-10">
        <h3 className="">{product.name}</h3>
        <p className="text-sm font-thin">
          {Number(product.price).toLocaleString()} ¥
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
