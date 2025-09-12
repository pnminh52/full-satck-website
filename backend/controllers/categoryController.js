import { sql } from "../config/db.js";

// GET all categories
export const getAllCategories = async (req, res) => {
  try {
    const categories = await sql`SELECT * FROM categories ORDER BY id DESC`;
    res.status(200).json(categories);
  } catch (error) {
    console.error("❌ Error getAllCategories:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// GET category by ID
export const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const [category] = await sql`SELECT * FROM categories WHERE id = ${id}`;
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.status(200).json(category);
  } catch (error) {
    console.error("❌ Error getCategoryById:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// CREATE new category
export const createCategory = async (req, res) => {
  try {
    const { name, description, image } = req.body;

    if (!name || !image) {
      return res.status(400).json({ error: "Name and Image are required" });
    }

    const [newCategory] = await sql`
      INSERT INTO categories (name, description, image)
      VALUES (${name}, ${description || null}, ${image})
      RETURNING *
    `;

    res.status(201).json(newCategory);
  } catch (error) {
    console.error("❌ Error createCategory:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// UPDATE category
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, image } = req.body;

    const [updatedCategory] = await sql`
      UPDATE categories
      SET name = ${name}, description = ${description}, image = ${image}
      WHERE id = ${id}
      RETURNING *
    `;

    if (!updatedCategory) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.status(200).json(updatedCategory);
  } catch (error) {
    console.error("❌ Error updateCategory:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// DELETE category
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const [deletedCategory] = await sql`
      DELETE FROM categories
      WHERE id = ${id}
      RETURNING *
    `;

    if (!deletedCategory) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleteCategory:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
