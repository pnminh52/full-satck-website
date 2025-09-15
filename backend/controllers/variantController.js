import { sql } from "../config/db.js";

// ✅ GET all variants
export const getAllVariants = async (req, res) => {
  try {
    const variants = await sql`
      SELECT * FROM product_variants ORDER BY id DESC
    `;
    res.status(200).json(variants);
  } catch (error) {
    console.error("❌ Error getAllVariants:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ✅ GET variant by ID
export const getVariantById = async (req, res) => {
  try {
    const { id } = req.params;
    const [variant] = await sql`
      SELECT * FROM product_variants WHERE id = ${id}
    `;
    if (!variant) {
      return res.status(404).json({ error: "Variant not found" });
    }
    res.status(200).json(variant);
  } catch (error) {
    console.error("❌ Error getVariantById:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ✅ CREATE variant
export const createVariant = async (req, res) => {
  try {
    const { product_id, color, color_code, storage, price, stock, image,  additional_images } =
      req.body;

    if (!product_id || !price) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const [newVariant] = await sql`
      INSERT INTO product_variants 
        (product_id, color, color_code, storage, price, stock, image,  additional_images)
      VALUES 
        (${product_id}, ${color}, ${color_code}, ${storage}, ${price}, ${stock || 0}, ${image}, ${ additional_images})
      RETURNING *
    `;

    res.status(201).json(newVariant);
  } catch (error) {
    console.error("❌ Error createVariant:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ✅ UPDATE variant
export const updateVariant = async (req, res) => {
  try {
    const { id } = req.params;
    const { color, color_code, storage, price, stock, image,  additional_images } = req.body;

    const [updatedVariant] = await sql`
      UPDATE product_variants
      SET color = ${color},
          color_code = ${color_code},
          storage = ${storage},
           additional_images= ${ additional_images}
          price = ${price},
          stock = ${stock},
          image = ${image}
      WHERE id = ${id}
      RETURNING *
    `;

    if (!updatedVariant) {
      return res.status(404).json({ error: "Variant not found" });
    }

    res.status(200).json(updatedVariant);
  } catch (error) {
    console.error("❌ Error updateVariant:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ✅ DELETE variant
export const deleteVariant = async (req, res) => {
  try {
    const { id } = req.params;

    const [deletedVariant] = await sql`
      DELETE FROM product_variants WHERE id = ${id} RETURNING *
    `;

    if (!deletedVariant) {
      return res.status(404).json({ error: "Variant not found" });
    }

    res.status(200).json({ message: "Variant deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleteVariant:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
