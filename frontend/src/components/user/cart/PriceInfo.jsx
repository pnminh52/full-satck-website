import useShippingFee from "../../../hook/useShippingFee";

const PriceInfo = ({ cartItems }) => {
  const { address, shippingFee } = useShippingFee();

  const subtotal = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  const grandTotal = subtotal + (shippingFee ?? 0);

  return (
    <div className="mt-4 text-right">
      <p className="font-bold">
        Subtotal: {subtotal.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
      </p>

      <p className="font-bold">
        Shipping: {shippingFee === null ? "Đang tính phí..." : shippingFee.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
      </p>

      <p className="font-bold text-lg">
        Grand Total: {shippingFee === null ? "Đang tính tổng..." : grandTotal.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
      </p>
    </div>
  );
};

export default PriceInfo;
