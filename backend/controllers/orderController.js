import { sql } from "../config/db.js";

// Lấy danh sách đơn hàng của user
export const getUserOrders = async (req, res) => {
  const userId = req.user.id; // giả sử bạn đã middleware auth để attach user
  try {
    const orders = await sql`
      SELECT o.id, o.total, o.status_id, os.name AS status, o.address, o.created_at
      FROM orders o
      LEFT JOIN order_status os ON o.status_id = os.id
      WHERE o.user_id = ${userId}
      ORDER BY o.created_at DESC
    `;
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lấy chi tiết đơn hàng
export const getOrderDetail = async (req, res) => {
  const orderId = req.params.id;
  const userId = req.user.id;
  try {
    const order = await sql`
      SELECT o.id, o.total, o.status_id, os.name AS status, o.address, o.created_at
      FROM orders o
      LEFT JOIN order_status os ON o.status_id = os.id
      WHERE o.id = ${orderId} AND o.user_id = ${userId}
    `;

    if (!order.length) return res.status(404).json({ error: "Order not found" });

    const items = await sql`
      SELECT oi.id, oi.product_id, p.name, p.base_image, oi.quantity, oi.price
      FROM order_items oi
      JOIN products p ON oi.product_id = p.id
      WHERE oi.order_id = ${orderId}
    `;

    res.json({ ...order[0], items });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Tạo đơn hàng (COD)
export const createOrder = async (req, res) => {
  const userId = req.user.id;
  const { items, address } = req.body; // items: [{ product_id, quantity }]
  console.log("Body received:", req.body);

  if (!items || !items.length) return res.status(400).json({ error: "No items in order" });

  try {
    // Tính tổng
    let total = 0;
    for (const item of items) {
      const product = await sql`SELECT price, stock FROM products WHERE id = ${item.product_id}`;
      if (!product.length) return res.status(400).json({ error: "Product not found" });
      if (product[0].stock < item.quantity) return res.status(400).json({ error: "Insufficient stock" });

      total += Number(product[0].price) * item.quantity;
    }

    // Tạo đơn hàng
    const [order] = await sql`
      INSERT INTO orders (user_id, total, status_id, address)
      VALUES (${userId}, ${total}, 1, ${address}) RETURNING *
    `;

    // Thêm chi tiết sản phẩm
    for (const item of items) {
      const product = await sql`SELECT price, stock FROM products WHERE id = ${item.product_id}`;
      await sql`
        INSERT INTO order_items (order_id, product_id, quantity, price)
        VALUES (${order.id}, ${item.product_id}, ${item.quantity}, ${product[0].price})
      `;

      // Trừ tồn kho
      await sql`
        UPDATE products SET stock = stock - ${item.quantity} WHERE id = ${item.product_id}
      `;
    }

    res.status(201).json({ message: "Order created successfully", orderId: order.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Cập nhật trạng thái đơn hàng (admin)
export const updateOrderStatus = async (req, res) => {
  const orderId = req.params.id;
  const { status_id } = req.body;

  try {
    const [order] = await sql`SELECT * FROM orders WHERE id = ${orderId}`;
    if (!order) return res.status(404).json({ error: "Order not found" });

    await sql`
      UPDATE orders SET status_id = ${status_id} WHERE id = ${orderId}
    `;

    res.json({ message: "Order status updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
