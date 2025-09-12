import { sql } from "../config/db.js";

// GET all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await sql`SELECT * FROM products ORDER BY id DESC`;
    res.status(200).json(products);
  } catch (error) {
    console.error("❌ Error getAllProducts:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// GET product by ID
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const [product] = await sql`SELECT * FROM products WHERE id = ${id}`;
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error("❌ Error getProductById:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// CREATE new product
export const createProduct = async (req, res) => {
  try {
    const { name, image, price } = req.body;

    if (!name || !image || !price) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const [newProduct] = await sql`
      INSERT INTO products (name, image, price)
      VALUES (${name}, ${image}, ${price})
      RETURNING *
    `;

    res.status(201).json(newProduct);
  } catch (error) {
    console.error("❌ Error createProduct:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// UPDATE product
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, image, price } = req.body;

    const [updatedProduct] = await sql`
      UPDATE products
      SET name = ${name}, image = ${image}, price = ${price}
      WHERE id = ${id}
      RETURNING *
    `;

    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("❌ Error updateProduct:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// DELETE product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const [deletedProduct] = await sql`
      DELETE FROM products
      WHERE id = ${id}
      RETURNING *
    `;

    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleteProduct:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
