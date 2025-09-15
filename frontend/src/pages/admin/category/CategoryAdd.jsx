import { useState } from "react";
import { createCategory } from "../../../api/categories";
import { useNavigate } from "react-router-dom";

function CategoryAdd() {
  const [form, setForm] = useState({ name: "", description: "", image: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ validate cơ bản
    if (!form.name.trim() || !form.image.trim()) {
      setError("⚠️ Name và Image URL là bắt buộc");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await createCategory(form);

      // reset form
      setForm({ name: "", description: "", image: "" });

      // quay về danh sách
      navigate("/admin/categories");
    } catch (err) {
      console.error("❌ Error createCategory:", err.message);
      setError("Không thể thêm category. Vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">➕ Add Category</h1>

      {error && <p className="text-red-500 mb-3">{error}</p>}

      <form className="grid gap-4" onSubmit={handleSubmit}>
        <input
          className="border rounded p-2"
          placeholder="Name *"
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
          placeholder="Image URL *"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
        />

        <button
          type="submit"
          disabled={loading}
          className={`px-6 py-2 text-white font-semibold rounded ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading ? "⏳ Saving..." : "✅ Save Category"}
        </button>
      </form>
    </div>
  );
}

export default CategoryAdd;
