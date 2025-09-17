import React from "react";
import { Link } from "react-router-dom";
const ProductCard = ({ products }) => {
    return (
        <div>
            <div className="grid grid-cols-1 py-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products
                  .slice() 
                  .sort((a, b) => {
                    if (a.status === "preorder" && b.status !== "preorder") return -1;
                    if (a.status !== "preorder" && b.status === "preorder") return 1;
                    return 0;
                  })
                .map((p) => (
                    <Link to={`/product/${p.id}`} key={p.id} className="   flex flex-col">
                        <div className="relative w-full aspect-square rounded-lg overflow-hidden">
                            <img
                                src={p.base_image}
                                alt={p.name}
                                className="w-full h-full object-cover rounded-lg"
                            />

                            {p.stock === 0 && (
                                <>
                                    <div className="absolute inset-0 bg-gray-400 opacity-50 z-10"></div>
                                    <div className="absolute inset-0 flex items-center justify-center z-20">
                                        <div className="w-[1px] h-full bg-white rotate-45 origin-center"></div>
                                        <div className="w-[1px] h-full bg-white -rotate-45 origin-center absolute"></div>
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="w-full py-1 flex  space-y-1 justify-center items-center">
                            <img
                                className="w-20 h-auto object-cover"
                                src={p.imagecopyright}
                                alt=""
                            />
                        </div>
                        <div>
                            {p.stock > 0 && p.stock < 50 && (
                                <p className="bg-red-200 px-2 inline-block text-sm text-red-700 rounded-full">
                                    Few left in stock
                                </p>
                            )}

                            {p.stock === 0 && (
                                <p className="bg-gray-200 px-2 inline-block text-sm text-gray-700 rounded-full">
                                    Sold out
                                </p>
                            )}

                            {p.status === "preorder" && (
                                <p className="bg-green-200 px-2 inline-block text-sm text-green-700  rounded-full">
                                    Preorders open now{" "}
                                </p>
                            )}
                            <h2 className=" font-semibold text-sm py-1">{p.name}</h2>
                            <p className="text-gray-600 text-sm">
                                US$
                                {(Number(p.price) / 100).toLocaleString("en-US", {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                })}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default ProductCard;
