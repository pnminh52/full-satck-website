import React from 'react'
import { Link } from 'react-router-dom'
const ProductCard = ({products}) => {
  return (
    <div>
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((p) => (
            <Link
            to={`/product/${p.id}`}
              key={p.id}
              className="   flex flex-col"
            >
             <div className="w-full aspect-square">
  <img
    src={p.base_image}
    alt={p.name}
    className="w-full h-full object-cover rounded-lg"
  />
</div>

              <div className="w-full py-1 flex  space-y-1 justify-center items-center">
                              <img className="w-20 h-auto object-cover" src={p.imagecopyright} alt="" />
                             
              </div>
             <div>
                 {
                                p.status==="preorder" && (
                                  <p className="bg-green-200 px-2 inline-block text-sm text-green-700  rounded-full">Preorders Open Now </p>
                                )
                              }
                              <h2 className=" font-semibold text-sm py-1">{p.name}</h2>
                              <p className="text-gray-600 text-sm">
                  US${(Number(p.price) / 100).toLocaleString("en-US", { 
                    minimumFractionDigits: 2, 
                    maximumFractionDigits: 2 
                  })}
                </p>
                
             </div>

             
            </Link>
          ))}
        </div>
    </div>
  )
}

export default ProductCard