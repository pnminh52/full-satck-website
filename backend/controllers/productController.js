import { sql } from "../config/db.js";

// ✅ GET all products (kèm category_name)
export const getAllProducts = async (req, res) => {
  try {
    const products = await sql`
      SELECT p.*, c.name AS category_name
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      ORDER BY p.id DESC
    `;
    res.status(200).json(products);
  } catch (error) {
    console.error("❌ Error getAllProducts:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ✅ GET product by ID (kèm category_name và variants)
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const [product] = await sql`
      SELECT p.*, c.name AS category_name
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.id = ${id}
    `;

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // lấy variants kèm theo (nếu có)
    const variants = await sql`
      SELECT * FROM product_variants WHERE product_id = ${id}
    `;

    res.status(200).json({ ...product, variants });
  } catch (error) {
    console.error("❌ Error getProductById:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ✅ CREATE new product
export const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      base_image,
      additional_images = [],
      category_id,
    } = req.body;

    if (!name || !base_image) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const [newProduct] = await sql`
      INSERT INTO products (
        name, description, base_image, additional_images, category_id
      )
      VALUES (
        ${name}, ${description}, ${base_image},
        COALESCE(${additional_images}::text[], '{}'),
        ${category_id || null}
      )
      RETURNING *
    `;

    res.status(201).json(newProduct);
  } catch (error) {
    console.error("❌ Error createProduct:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ✅ UPDATE product
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      base_image,
      additional_images,
      category_id,
    } = req.body;

    const [updatedProduct] = await sql`
      UPDATE products
      SET
        name = ${name},
        description = ${description},
        base_image = ${base_image},
        additional_images = COALESCE(${additional_images}::text[], '{}'),
        category_id = ${category_id || null}
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

// ✅ DELETE product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const [deletedProduct] = await sql`
      DELETE FROM products WHERE id = ${id} RETURNING *
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
