import { useState } from "react";
import { createProduct } from "../../../api/products";
import { useNavigate } from "react-router-dom";

function ProductAdd() {
  const [form, setForm] = useState({ name: "", image: "", price: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProduct(form);
      navigate("/"); // sau khi thêm xong quay về danh sách
    } catch (err) {
      console.error("❌ Error createProduct:", err.message);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Add Product</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Image URL"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
        />
        <input
          placeholder="Price"
          type="number"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default ProductAdd;
