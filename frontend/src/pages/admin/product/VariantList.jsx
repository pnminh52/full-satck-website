import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProductById } from "../../../api/products";
import { deleteVariant } from "../../../api/variants";

function VariantList() {
  const { id } = useParams(); // product_id
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const res = await getProductById(id);
      setProduct(res.data);
    } catch (err) {
      console.error("❌ Error fetching product:", err.message);
    }
  };

  const handleDelete = async (variantId) => {
    if (!window.confirm("Delete this variant?")) return;
    try {
      await deleteVariant(variantId);
      fetchProduct(); // reload product + variants
    } catch (err) {
      console.error("❌ Error deleteVariant:", err.message);
    }
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">
        Variants of {product.name}
      </h1>

      <Link
        to={`/admin/products/${id}/variants/add`}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        ➕ Add Variant
      </Link>

      <div className="overflow-x-auto bg-white shadow rounded mt-4">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 border">#</th>
              <th className="p-3 border">Image</th>
              <th className="p-3 border">Color</th>
              <th className="p-3 border">Color Code</th>
              <th className="p-3 border">storage</th>
              <th className="p-3 border">Price</th>
              <th className="p-3 border">Stock</th>
              <th className="p-3 border text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {product.variants?.map((v, index) => (
              <tr key={v.id} className="hover:bg-gray-50">
                <td className="p-3 border">{index + 1}</td>
                <td className="p-3 border">
                  {v.image && (
                    <img
                      src={v.image}
                      alt="variant"
                      className="w-12 h-12 object-cover rounded"
                    />
                  )}
                </td>
                <td className="p-3 border">{v.color}</td>
                <td className="p-3 border">{v.color_code}</td>
                <td className="p-3 border">{v.storage}</td>
                <td className="p-3 border">${v.price}</td>
                <td className="p-3 border">{v.stock}</td>
                <td className="p-3 border text-center space-x-2">
                  <Link to={`/admin/products/${id}/variants/edit/${v.id}`}>
                    <button className="bg-yellow-500 px-3 py-1 text-white rounded">
                      Edit
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(v.id)}
                    className="bg-red-500 px-3 py-1 text-white rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {product.variants?.length === 0 && (
              <tr>
                <td colSpan="8" className="p-4 text-center text-gray-500">
                  No variants found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default VariantList;
