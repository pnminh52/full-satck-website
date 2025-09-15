import { useEffect, useState } from "react";
import { createProduct } from "../../../api/products";
import { useNavigate } from "react-router-dom";
import { getCategories } from "../../../api/categories";

function ProductAdd() {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    thumbnail: "",
    additional_images: [""],
    category_id: null,
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getCategories();
        setCategories(res.data);
      } catch (err) {
        console.error("❌ Error fetching categories:", err.message);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.name || !form.thumbnail) {
      setError("Name and Base Image are required.");
      return;
    }
    try {
      await createProduct(form);
      navigate("/admin/products");
    } catch (err) {
      console.error("❌ Error createProduct:", err);
      setError("Cannot add product. Try again later.");
    }
  };

  const handleAdditionalImageChange = (i, value) => {
    const newImages = [...form.additional_images];
    newImages[i] = value;
    setForm({ ...form, additional_images: newImages });
  };

  const addAdditionalImage = () =>
    setForm({ ...form, additional_images: [...form.additional_images, ""] });

  const removeAdditionalImage = (i) =>
    setForm({
      ...form,
      additional_images: form.additional_images.filter((_, index) => index !== i),
    });

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">➕ Add Product</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-4 bg-white p-6 rounded-xl shadow"
      >
        {/* Basic Info */}
        <input
          className="border rounded p-2"
          placeholder="Product Name"
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
          placeholder="Base Image URL"
          value={form.thumbnail}
          onChange={(e) => setForm({ ...form, thumbnail: e.target.value })}
        />

        {/* Category */}
        <select
          value={form.category_id || ""}
          onChange={(e) =>
            setForm({
              ...form,
              category_id: e.target.value === "" ? null : Number(e.target.value),
            })
          }
          className="border rounded p-2"
        >
          <option value="">-- Select Category --</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        {/* Additional Images */}
        <div>
          <h3 className="font-semibold mb-2">📷 Additional Images</h3>
          {form.additional_images.map((img, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <input
                className="border rounded p-2 flex-1"
                placeholder="Image URL"
                value={img}
                onChange={(e) => handleAdditionalImageChange(i, e.target.value)}
              />
              <button
                type="button"
                onClick={() => removeAdditionalImage(i)}
                className="px-3 py-1 bg-red-500 text-white rounded"
              >
                ❌
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addAdditionalImage}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            ➕ Add Image
          </button>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="px-6 py-2 bg-green-600 text-white font-semibold rounded hover:bg-green-700"
        >
          ✅ Save Product
        </button>
      </form>
    </div>
  );
}

export default ProductAdd;
