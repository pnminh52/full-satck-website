import { useEffect, useState } from "react";
import { getCategories, deleteCategory } from "../../../api/categories";
import { Link } from "react-router-dom";

function CategoryList() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await getCategories();
      setCategories(res.data);
    } catch (err) {
      console.error("❌ Error fetchCategories:", err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;

    try {
      await deleteCategory(id);
      fetchCategories(); // refresh list
    } catch (err) {
      console.error("❌ Error deleteCategory:", err.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Categories</h1>
      <Link
        to="/categories/add"
        className="px-4 py-2 bg-blue-500 text-white rounded mb-4 inline-block"
      >
        ➕ Add Category
      </Link>

      <ul className="space-y-3">
        {categories.map((cat) => (
          <li
            key={cat.id}
            className="flex items-center justify-between bg-white p-3 rounded shadow"
          >
            <div className="flex items-center gap-4">
              <img src={cat.image} alt={cat.name} className="w-12 h-12 object-cover rounded" />
              <div>
                <p className="font-semibold">{cat.name}</p>
                <p className="text-gray-500 text-sm">{cat.description}</p>
              </div>
            </div>
            <button
              onClick={() => handleDelete(cat.id)}
              className="px-3 py-1 bg-red-500 text-white rounded"
            >
              ❌ Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoryList;
