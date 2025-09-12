import { useState } from "react";
import { createCategory } from "../../../api/categories";
import { useNavigate } from "react-router-dom";

function CategoryAdd() {
  const [form, setForm] = useState({ name: "", description: "", image: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createCategory(form);
      navigate("/categories"); // quay về danh sách
    } catch (err) {
      console.error("❌ Error createCategory:", err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">➕ Add Category</h1>
      <form className="grid gap-4" onSubmit={handleSubmit}>
        <input
          className="border rounded p-2"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <textarea
          className="border rounded p-2"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <input
          className="border rounded p-2"
          placeholder="Image URL"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
        />
        <button
          type="submit"
          className="px-6 py-2 bg-green-600 text-white font-semibold rounded hover:bg-green-700"
        >
          ✅ Save Category
        </button>
      </form>
    </div>
  );
}

export default CategoryAdd;
