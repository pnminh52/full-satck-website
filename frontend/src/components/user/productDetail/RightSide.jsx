import React from "react";
import { addToCart } from "../../../api/cart";
import { useState } from "react";

const RightSide = ({ product  }) => {

  const [loading, setLoading] = useState(false);

 const handleAddToCart = async () => {
  setLoading(true);
  try {
    const token = localStorage.getItem("token"); // lấy token
    if (!token) {
      alert("You must be logged in to add to cart");
      setLoading(false);
      return;
    }

    await addToCart({ product_id: product.id, quantity: 1 }, token);
    alert("Added to cart!");
  } catch (err) {
    console.error(err);
    alert("Failed to add to cart");
  } finally {
    setLoading(false);
  }
};

  return (
    <div>
      {/* Right: Info */}
      <div className="">
        <h1 className="text- font-semibold">{product.title}</h1>

        <h1 className="text-xl font-semibold  py-4 ">{product.name}</h1>
        {product.stock > 0 && product.stock < 50 && (
          <p className="bg-red-200 px-2 inline-block text-sm text-red-700 rounded-full">
            Few left in stock
          </p>
        )}

        {product.stock === 0 && (
          <p className="bg-gray-200 px-2 inline-block text-sm text-gray-700 rounded-full">
            Sold out
          </p>
        )}

        {product.status === "preorder" && (
          <p className="bg-green-200 px-2 inline-block text-sm text-green-700 rounded-full">
            Preorders open now
          </p>
        )}

        <p className="text-black  text-lg py-4">
  {(Number(product.price)).toLocaleString("vi-VN",{
    style: "currency",
    currency: "VND",
  })}
</p>

       {/* {
        product.status==="preorder"&&( */}
            <div>
            <p><span className="font-semibold">Preorders Open Now</span> Preorder Period: 2025/09/11〜2025/10/22 (JST) </p>
        <p className="text-gray-400">Shipping 07/2026・Limit 3 per person</p>
        </div>
        {/* )
       } */}

       
       
    

      <div className="flex flex-col gap-2 py-4">
      <button
        onClick={handleAddToCart}
          disabled={product.stock <= 0 && product.status !== "preorder"}
          className="rounded-full px-6 py-3 bg-[#FF6624] text-white font-semibold  
            cursor-pointer  disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {product.status === "preorder"
            ? "Preorder now"
            : product.stock > 0
            ? "Add to Cart"
            : "❌ Out of Stock"}
        </button>

        <button className="border rounded-full px-6 py-3 justify-center cursor-pointer font-semibold  border-[#FF6624] text-[#FF6624] flex items-center gap-2">
          <svg
            fill="#FF6624"
            height="22px"
            width="22px"
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 512.37 512.37"
            xml:space="preserve"
            stroke="#FF6624"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <g>
                {" "}
                <g>
                  {" "}
                  <path d="M475.524,72.933c-33.872-36.293-72.122-56.78-115.583-56.78c-42.308,0-79.083,19.333-103.742,52.277 c-24.591-32.968-61.208-52.277-103.49-52.277c-43.164,0-80.774,20.275-115.429,56.616 c-51.87,54.357-52.062,155.013,14.925,221.999c13.003,13.003,45.393,46.322,91.094,93.615 c21.934,22.7,44.674,46.277,67.387,69.854c7.95,8.252,15.328,15.915,21.947,22.792c6.806,7.073,6.806,7.073,8.317,8.643 c8.393,8.726,22.357,8.726,30.751,0c1.51-1.57,1.51-1.57,8.316-8.643c6.619-6.877,13.997-14.539,21.947-22.792 c22.713-23.577,45.453-47.154,66.715-69.158c46.373-47.99,78.763-81.308,91.766-94.312 C527.176,228.038,526.702,127.752,475.524,72.933z M430.275,264.599c-13.253,13.253-45.689,46.619-91.606,94.137 c-21.952,22.718-44.706,46.31-67.433,69.902c-5.236,5.435-10.224,10.615-14.91,15.482c-4.687-4.868-9.675-10.047-14.911-15.482 c-22.727-23.592-45.482-47.184-66.76-69.205c-46.591-48.215-79.026-81.58-92.279-94.833C31.961,214.185,32.102,140,68.154,102.22 c27.31-28.64,54.69-43.4,84.555-43.4c37.759,0,68.431,22.518,83.608,61.191c7.085,18.053,32.633,18.053,39.718,0 c15.143-38.586,46.063-61.191,83.907-61.191c30.166,0,57.925,14.868,84.393,43.228 C480.097,140.355,480.447,214.426,430.275,264.599z"></path>{" "}
                </g>{" "}
              </g>{" "}
            </g>
          </svg>{" "}
          Add to Watch List
        </button>
      </div>
      </div>
    </div>
  );
};

export default RightSide;
