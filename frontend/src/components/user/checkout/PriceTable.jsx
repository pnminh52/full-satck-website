import React from 'react'

const PriceTable = ({total, shippingFee, handleCodPayment}) => {
  return (
    <div>
          <div className="mt-4 text-right">
                <p className="font-bold">
                  Subtotal: {total.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
                </p>
                <p className="font-bold">
                  Shipping: {shippingFee === null ? "Đang tính phí..." : shippingFee.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
                </p>
                <p className="font-bold text-lg">
                  Grand Total: {shippingFee === null ? "Đang tính tổng..." : (total + shippingFee).toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
                </p>
        
                <div className="flex gap-4 mt-4 justify-end">
                  {/* <button
                    onClick={() => toast.error("VNPay is in testing")}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    Pay with VNPay
                  </button> */}
                  <button
                    onClick={handleCodPayment}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Pay with COD
                  </button>
                  <button>back to cart</button>
                </div>
              </div>
    </div>
  )
}

export default PriceTable