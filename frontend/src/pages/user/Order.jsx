import React, { useEffect, useState } from "react";
import { getUserOrders, getOrderDetail } from "../../api/orders";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchOrders = async () => {
      if (!token) return;
      try {
        setLoading(true);
        const res = await getUserOrders(token);
        const ordersData = res.data;

        // Lấy chi tiết sản phẩm cho mỗi đơn
        const ordersWithItems = await Promise.all(
          ordersData.map(async (order) => {
            const detailRes = await getOrderDetail(order.id, token);
            return { ...order, items: detailRes.data.items || [] };
          })
        );

        setOrders(ordersWithItems);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [token]);

  if (loading) return <p>Loading orders...</p>;
  if (!orders.length) return <p>No orders found.</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Orders</h1>
      <div className="flex flex-col gap-6">
        {orders.map((order) => (
          <div key={order.id} className="border p-4 rounded shadow">
            <p className="font-semibold mb-2">Order ID: {order.id}</p>
            <p className="mb-2">
              <strong>Total:</strong> US${order.total}
            </p>
            <p className="mb-2">
              <strong>Status:</strong> {order.status_id}
            </p>
            <p className="mb-2">
              <strong>Address:</strong> {order.address}
            </p>

            <div className="mt-2">
              <p className="font-semibold">Items:</p>
              {order.items.length === 0 ? (
                <p>No items</p>
              ) : (
                <ul className="mt-1 list-disc list-inside">
                  {order.items.map((item) => (
                    <li key={item.id}>
                      {item.name} x {item.quantity} - US${item.price}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;
