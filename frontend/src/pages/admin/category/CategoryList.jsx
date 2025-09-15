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
      fetchCategories();
    } catch (err) {
      console.error("❌ Error deleteCategory:", err.message);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Categories</h1>
        <Link
          to="/admin/categories/add"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          ➕ Add Category
        </Link>
      </div>

      <div className="overflow-x-auto bg-[#F5F5F7] shadow rounded">
        <table className="w-full border-collapse">
          <thead>
            <tr className=" text-left">
              <th className="p-3 border">#</th>
              <th className="p-3 border">Image</th>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Description</th>
              <th className="p-3 border text-center">Products</th>
              <th className="p-3 border text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat, index) => (
              <tr key={cat.id} className="">
                <td className="p-3 border">{index + 1}</td>
                <td className="p-3 border">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                </td>
                <td className="p-3 border font-semibold">{cat.name}</td>
                <td className="p-3 border text-gray-600">{cat.description}</td>
                <td className="p-3 border text-center">{cat.product_count}</td>
                <td className="p-3 border text-center space-x-2">
                  <Link to={`/admin/categories/edit/${cat.id}`}>
                    <button className="bg-yellow-500 px-3 py-1 text-white rounded">
                      Edit
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(cat.id)}
                    className="bg-red-500 px-3 py-1 text-white rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {categories.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center p-4 text-gray-500">
                  No categories found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CategoryList;
