import React from "react";
import { useLocation } from "react-router-dom";

const Title = () => {
  const location = useLocation();
  let path = location.pathname.toLowerCase();

  // Bỏ dấu / ở cuối nếu có
  if (path !== "/" && path.endsWith("/")) {
    path = path.slice(0, -1);
  }

  if (path === "/store") {
    return (
      <div className="font-sf text-5xl w-1/2">
        <span className="text-black">Cửa Hàng.</span>{" "}
        <span className="text-gray-500">
          Cách tốt nhất để mua sản phẩm bạn thích.
        </span>
      </div>
    );
  }

  const titles = {
    "/iphone": "Khám phá dòng sản phẩm.",
    "/mac": "Khám phá Mac - công cụ mạnh mẽ cho mọi công việc.",
    "/ipad": "iPad. Đa năng, mạnh mẽ và dễ mang theo.",
    "/watch": "Apple Watch. Người bạn đồng hành hoàn hảo cho sức khỏe.",
  };

  const title = titles[path] || "Khám phá sản phẩm Apple.";

  return <div className="font-sf text-5xl text-black">{title}</div>;
};

export default Title;
