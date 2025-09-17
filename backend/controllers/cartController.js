import { sql } from "../config/db.js";

export const getCart = async (req, res) => {
  const userId = req.user.id;
  try {
    const cart = await sql`
      SELECT 
        c.id AS cart_id,
        c.quantity,
        p.id AS product_id,
        p.name,
        p.title,
        p.price,
        p.base_image
      FROM cart c
      JOIN products p ON p.id = c.product_id
      WHERE c.user_id = ${userId}
    `;
    res.json(cart);
  } catch (err) {
    console.error("❌ Get cart error:", err.message);
    res.status(500).json({ error: "Failed to get cart" });
  }
};


// Thêm sản phẩm vào giỏ
export const addToCart = async (req, res) => {
  const userId = req.user.id;
  const { product_id, quantity } = req.body;

  try {
    // check xem sp đã có trong giỏ chưa
    const existing = await sql`
      SELECT * FROM cart WHERE user_id = ${userId} AND product_id = ${product_id}
    `;
    if (existing.length) {
      const updated = await sql`
        UPDATE cart 
        SET quantity = quantity + ${quantity}
        WHERE id = ${existing[0].id}
        RETURNING *
      `;
      return res.json(updated[0]);
    }

    const cartItem = await sql`
      INSERT INTO cart (user_id, product_id, quantity)
      VALUES (${userId}, ${product_id}, ${quantity})
      RETURNING *
    `;
    res.status(201).json(cartItem[0]);
  } catch (err) {
    console.error("❌ Add cart error:", err.message);
    res.status(500).json({ error: "Failed to add to cart" });
  }
};

// Cập nhật số lượng
export const updateCartItem = async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params; // id của cart item
  const { quantity } = req.body;

  try {
    const updated = await sql`
      UPDATE cart
      SET quantity = ${quantity}
      WHERE id = ${id} AND user_id = ${userId}
      RETURNING *
    `;
    res.json(updated[0]);
  } catch (err) {
    console.error("❌ Update cart error:", err.message);
    res.status(500).json({ error: "Failed to update cart item" });
  }
};

// Xóa 1 item khỏi giỏ
export const deleteCartItem = async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;

  try {
    await sql`DELETE FROM cart WHERE id = ${id} AND user_id = ${userId}`;
    res.json({ message: "Item removed from cart" });
  } catch (err) {
    console.error("❌ Delete cart error:", err.message);
    res.status(500).json({ error: "Failed to delete cart item" });
  }
};
