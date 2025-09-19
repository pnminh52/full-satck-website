import React from "react";
import { Link } from "react-router-dom";
const LeftSide = ({ cartItems, handleUpdateQuantity, handleDelete }) => {
    return (
        <div>
            <div className="flex flex-col gap-4">
                {cartItems.map((item) => (
                    <div
                        key={item.cart_id}
                        className="flex justify-between items-center  "
                    >
                        <div className="flex gap-4">
                            {item.base_image && (
                                <Link to={`/product/${item.product_id}`}>
                                    <img
                                        src={item.base_image}
                                        alt={item.name}
                                        className="w-40 h-40 object-cover rounded-lg"
                                    />
                                </Link>
                            )}
                            <div>
                                <p className="font-semibold">{item.name}</p>

                                <p className="text-black text-lg py-2 ">
                                    {Number(item.price).toLocaleString("vi-VN", {
                                        style: "currency",
                                        currency: "VND",
                                    })}
                                </p>
                                <div className="flex items-center gap-4">
                                  <div className="flex items-center">
                                  <button
                                        className={`border cursor-pointer flex items-center px-2 h-10 rounded-l-full border-gray-300 `}
                                        onClick={() =>
                                            handleUpdateQuantity(item.cart_id, item.quantity - 1)
                                        }
                                    >
                                        <svg
                                            className={`w-5 h-5 ${item.quantity === 1
                                                    ? "opacity-30 cursor-not-allowed"
                                                    : ""
                                                }`}
                                            viewBox="0 0 15 15"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                            <g
                                                id="SVGRepo_tracerCarrier"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            ></g>
                                            <g id="SVGRepo_iconCarrier">
                                                {" "}
                                                <path
                                                    fill-rule="evenodd"
                                                    clip-rule="evenodd"
                                                    d="M2 7.5C2 7.22386 2.22386 7 2.5 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H2.5C2.22386 8 2 7.77614 2 7.5Z"
                                                    fill="#000000"
                                                ></path>{" "}
                                            </g>
                                        </svg>
                                    </button>
                                    <p className="px-6 flex items-center justify-center border-gray-300 border-t border-b h-10">
                                        {item.quantity}
                                    </p>
                                    <button
                                        className={`border cursor-pointer flex items-center px-2 h-10 rounded-r-full border-gray-300 `}
                                        onClick={() =>
                                            handleUpdateQuantity(item.cart_id, item.quantity + 1)
                                        }
                                    >
                                        <svg
                                            className={`w-5 h-5 ${item.quantity === 3
                                                    ? "opacity-30 cursor-not-allowed"
                                                    : ""
                                                }`}
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                            <g
                                                id="SVGRepo_tracerCarrier"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            ></g>
                                            <g id="SVGRepo_iconCarrier">
                                                {" "}
                                                <path
                                                    d="M13 3C13 2.44772 12.5523 2 12 2C11.4477 2 11 2.44772 11 3V11H3C2.44772 11 2 11.4477 2 12C2 12.5523 2.44772 13 3 13H11V21C11 21.5523 11.4477 22 12 22C12.5523 22 13 21.5523 13 21V13H21C21.5523 13 22 12.5523 22 12C22 11.4477 21.5523 11 21 11H13V3Z"
                                                    fill="#0F0F0F"
                                                ></path>{" "}
                                            </g>
                                        </svg>
                                    </button>
                                  </div>
                                    <button
                                        className="cursor-pointer text-red-500 flex items-center justify-center font-semibold w-10 h-10 border border-[#FF0000] rounded-full"
                                        onClick={() => handleDelete(item.cart_id)}
                                    >
                                        <svg
                                            className="w-5 h-5 rotate-45"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                            <g
                                                id="SVGRepo_tracerCarrier"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            ></g>
                                            <g id="SVGRepo_iconCarrier">
                                                {" "}
                                                <path
                                                    d="M13 3C13 2.44772 12.5523 2 12 2C11.4477 2 11 2.44772 11 3V11H3C2.44772 11 2 11.4477 2 12C2 12.5523 2.44772 13 3 13H11V21C11 21.5523 11.4477 22 12 22C12.5523 22 13 21.5523 13 21V13H21C21.5523 13 22 12.5523 22 12C22 11.4477 21.5523 11 21 11H13V3Z"
                                                    fill="#FF0000"
                                                ></path>{" "}
                                            </g>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LeftSide;
