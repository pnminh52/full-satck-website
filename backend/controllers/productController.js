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
    const {
      name,
      title,
      description,
      image,
      price,
      material,
      colorCode,
      carat,
      form: formType,
      setting,
      style,
      category_id,
      additional_images,
      featured
    } = req.body;

    if (!name || !image || !price) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const [newProduct] = await sql`
    INSERT INTO products (
      name, title, description, image, price, colorCode,
      material, carat, form, setting, style,
      category_id, additional_images, featured
    )
    VALUES (
      ${name}, ${title}, ${description}, ${image}, ${price}, ${colorCode},
      ${material}, ${carat}, ${formType}, ${setting}, ${style},
      ${category_id}, ${additional_images}, ${featured}
    )
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
    const {
      name,
      title,
      description,
      image,
      price,
      material,
      carat,
      form: formType,
      colorCode,
      setting,
      style,
      category_id,
      additional_images,
      featured
    } = req.body;

    const [updatedProduct] = await sql`
    UPDATE products
    SET 
      name = ${name},
      title = ${title},
      description = ${description},
      image = ${image},
      price = ${price},
      colorCode = ${colorCode},
      material = ${material},
      carat = ${carat},
      form = ${formType},
      setting = ${setting},
      style = ${style},
      category_id = ${category_id || null},
      additional_images = COALESCE(${additional_images}::text[], '{}'),
      featured = COALESCE(${JSON.stringify(featured)}::jsonb, '[]'::jsonb)
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
