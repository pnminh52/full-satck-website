import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createVariant } from "../../../api/variants";

function VariantAdd() {
  const { id } = useParams(); // product_id
  const navigate = useNavigate();
  const [form, setForm] = useState({
    color: "",
    color_code: "",
    size: "",
    price: "",
    stock: 0,
    image: "",
    additional_images: [""], // 👈 thêm field mảng
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await createVariant({ ...form, product_id: Number(id) });
      navigate(`/admin/products/${id}/variants`);
    } catch (err) {
      console.error("❌ Error createVariant:", err.message);
      setError("Cannot add variant. Try again.");
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
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">➕ Add Variant</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="grid gap-4 bg-white p-6 rounded shadow">
        <input
          placeholder="Color"
          className="border p-2 rounded"
          value={form.color}
          onChange={(e) => setForm({ ...form, color: e.target.value })}
        />
        <input
          placeholder="Color Code (#FFFFFF)"
          className="border p-2 rounded"
          value={form.color_code}
          onChange={(e) => setForm({ ...form, color_code: e.target.value })}
        />
        <input
          placeholder="Size"
          className="border p-2 rounded"
          value={form.size}
          onChange={(e) => setForm({ ...form, size: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          className="border p-2 rounded"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />
        <input
          type="number"
          placeholder="Stock"
          className="border p-2 rounded"
          value={form.stock}
          onChange={(e) => setForm({ ...form, stock: e.target.value })}
        />
        <input
          placeholder="Main Image URL"
          className="border p-2 rounded"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
        />

        {/* Additional Images */}
        <div>
          <h3 className="font-semibold mb-2">📷 Additional Images</h3>
          {form.additional_images.map((img, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <input
                className="border p-2 rounded flex-1"
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

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          ✅ Save Variant
        </button>
      </form>
    </div>
  );
}

export default VariantAdd;
