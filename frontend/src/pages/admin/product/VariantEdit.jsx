import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getVariantById, updateVariant } from "../../../api/variants";

function VariantEdit() {
  const { id, variantId } = useParams(); // product_id + variantId
  const navigate = useNavigate();
  const [form, setForm] = useState({
    color: "",
    color_code: "",
    storage: "",
    price: "",
    stock: 0,
    image: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    fetchVariant();
  }, []);

  const fetchVariant = async () => {
    try {
      const res = await getVariantById(variantId);
      setForm(res.data);
    } catch (err) {
      console.error("❌ Error fetching variant:", err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await updateVariant(variantId, { ...form, product_id: Number(id) });
      navigate(`/admin/products/${id}/variants`);
    } catch (err) {
      console.error("❌ Error updateVariant:", err.message);
      setError("Cannot update variant. Try again.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">✏️ Edit Variant</h1>
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
          placeholder="storage"
          className="border p-2 rounded"
          value={form.storage}
          onChange={(e) => setForm({ ...form, storage: e.target.value })}
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
          placeholder="Image URL"
          className="border p-2 rounded"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          ✅ Update Variant
        </button>
      </form>
    </div>
  );
}

export default VariantEdit;
