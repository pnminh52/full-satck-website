import React from 'react'

const RightSide = ({selectedVariant, product, setSelectedVariant}) => {
  return (
    <div>
         <div className="flex-1 flex flex-col gap-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>

          <p className="text-xl text-red-500 font-semibold">
            ${selectedVariant?.price || product.price || 0}
          </p>
       <div className="flex gap-4 items-center">
       {product.variants.map((v, i) => (
              <div
              key={i}
              className="w-6 h-6 cursor-pointer rounded-full border border-gray-300"
              onClick={() => setSelectedVariant(v)}
              style={{
                backgroundColor: v.color_code,
                boxShadow: "inset 0 0 1px black", // inner shadow
              }}
              title={v.color}
            />
            
            ))}
       </div>
          <p className="text-gray-600">{product.description || "No description available."}</p>

          {/* Variant Info */}
          {product.variants?.length > 0 && (
            <div>
              <h2 className="font-semibold mb-2">Available Variants:</h2>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((v) => (
                  <button
                    key={v.id}
                    className={`px-3 py-1 border rounded ${
                      selectedVariant?.id === v.id
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 text-gray-700"
                    }`}
                    onClick={() => setSelectedVariant(v)}
                  >
                    {v.color} / {v.storage} / ${v.price}
                  </button>
                ))}
              </div>
            </div>
          )}

          <p className="mt-4 text-gray-700">
            Stock: {selectedVariant?.stock ?? product.stock ?? 0}
          </p>

          <button className="mt-4 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
            Add to Cart
          </button>
        </div>
    </div>
  )
}

export default RightSide