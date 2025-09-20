import React from 'react'
import { Link } from 'react-router-dom'
const CheckOutItem = ({cartItems}) => {
  return (
   <div className="flex flex-col gap-4">
                 {cartItems.map((item) => (
                 <div
                 key={item.cart_id}
                 className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2"
               >
                         <div className=" w-full flex justify-between gap-4">
                               {item.base_image && (
                                                             <Link to={`/product/${item.product_id}`}>
                                                                <img
                               src={item.base_image}
                               alt={item.name}
                               className="sm:w-40 w-50 aspect-square  object-cover rounded-lg"
                             />
                             
                                                             </Link>
                                                         )}
                        
                             <div className=" w-full  flex flex-col gap-1 truncate">
                             <p className="font-semibold sm:text-md text-sm line-clamp-2">
     {item.name}
   </p>
                                 <p className="text-black sm:text-lg text-md  ">
                                     {Number(item.price).toLocaleString("vi-VN", {
                                         style: "currency",
                                         currency: "VND",
                                     })}
                                 </p>
                               
                             </div>
                         </div>
                     </div>
                 ))}

    </div>
  )
}

export default CheckOutItem