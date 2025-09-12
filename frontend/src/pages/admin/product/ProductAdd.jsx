import { useEffect, useState } from "react";
import { createProduct } from "../../../api/products";
import { useNavigate } from "react-router-dom";
import { getCategories } from "../../../api/categories";

function ProductAdd() {
    const [categories, setCategories]=useState([])
    const [form, setForm] = useState({
        name: "",
        image: "",
        price: "",
        title: "",
        description: "",
        material: "",
        carat: "",
        colorcode:"",
        category_id: "",
        form: "",
        setting: "",
        style: "",
        additional_images: [""],
        featured: [{ image: "", title: "", description: "" }],
    });

    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await createProduct({ ...form, price: Number(form.price) });
            navigate("/");
        } catch (err) {
            console.error("❌ Error createProduct:", err);
            setError("Không thể thêm sản phẩm. Thử lại sau!");
        }
    };

    const handleAdditionImageChange = (i, value) => {
        const newImages = [...form.additional_images];
        newImages[i] = value;
        setForm({ ...form, additional_images: newImages });
    };

    const addAdditionImage = () =>
        setForm({ ...form, additional_images: [...form.additional_images, ""] });

    const removeAdditionImage = (i) =>
        setForm({
            ...form,
            additional_images: form.additional_images.filter((_, index) => index !== i),
        });

    const handleFeaturedChange = (i, key, value) => {
        const newFeatured = [...form.featured];
        newFeatured[i][key] = value;
        setForm({ ...form, featured: newFeatured });
    };

    const addFeatured = () =>
        setForm({
            ...form,
            featured: [...form.featured, { image: "", title: "", description: "" }],
        });

    const removeFeatured = (i) =>
        setForm({
            ...form,
            featured: form.featured.filter((_, index) => index !== i),
        });

        useEffect(()=>{
            const fetchCategories =async()=>{
                try {
                    const res = await getCategories()
                    setCategories(res.data)
                } catch (error) {
                    console.error("❌ Error fetching categories:", error.message); 
                }
            }
            fetchCategories()
        },[])

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
                    placeholder="Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <input
                    className="border rounded p-2"
                    placeholder="Title"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
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
                <input
                    className="border rounded p-2"
                    placeholder="Price"
                    type="number"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                />
                <input
                    className="border rounded p-2"
                    placeholder="Material"
                    value={form.material}
                    onChange={(e) => setForm({ ...form, material: e.target.value })}
                />
                 <input
                    className="border rounded p-2"
                    placeholder="Color code"
                    value={form.colorcode}
                    onChange={(e) => setForm({ ...form, colorcode: e.target.value })}
                />
                <input
                    className="border rounded p-2"
                    placeholder="Carat"
                    value={form.carat}
                    onChange={(e) => setForm({ ...form, carat: e.target.value })}
                />
                <input
                    className="border rounded p-2"
                    placeholder="Form"
                    value={form.form}
                    onChange={(e) => setForm({ ...form, form: e.target.value })}
                />
                <input
                    className="border rounded p-2"
                    placeholder="Setting"
                    value={form.setting}
                    onChange={(e) => setForm({ ...form, setting: e.target.value })}
                />
                <input
                    className="border rounded p-2"
                    placeholder="Style"
                    value={form.style}
                    onChange={(e) => setForm({ ...form, style: e.target.value })}
                />
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
                                onChange={(e) => handleAdditionImageChange(i, e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={() => removeAdditionImage(i)}
                                className="px-3 py-1 bg-red-500 text-white rounded"
                            >
                                ❌
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addAdditionImage}
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                    >
                        ➕ Add Image
                    </button>
                </div>

                {/* Featured */}
                <div>
                    <h3 className="font-semibold mb-2">⭐ Featured</h3>
                    {form.featured.map((f, i) => (
                        <div key={i} className="border rounded p-3 mb-3">
                            <input
                                className="border rounded p-2 w-full mb-2"
                                placeholder="Feature Image"
                                value={f.image}
                                onChange={(e) =>
                                    handleFeaturedChange(i, "image", e.target.value)
                                }
                            />
                            <input
                                className="border rounded p-2 w-full mb-2"
                                placeholder="Feature Title"
                                value={f.title}
                                onChange={(e) =>
                                    handleFeaturedChange(i, "title", e.target.value)
                                }
                            />
                            <textarea
                                className="border rounded p-2 w-full"
                                placeholder="Feature Description"
                                value={f.description}
                                onChange={(e) =>
                                    handleFeaturedChange(i, "description", e.target.value)
                                }
                            />
                            <button
                                type="button"
                                onClick={() => removeFeatured(i)}
                                className="mt-2 px-3 py-1 bg-red-500 text-white rounded"
                            >
                                ❌ Remove Feature
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addFeatured}
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                    >
                        ➕ Add Feature
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
