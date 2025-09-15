import { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "../../../api/products";
import { Link } from "react-router-dom";

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await getProducts(); // API trả kèm variants
      setProducts(res.data);
    } catch (err) {
      console.error("❌ Error fetchProducts:", err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await deleteProduct(id);
      fetchProducts();
    } catch (err) {
      console.error("❌ Error deleteProduct:", err.message);
    }
  };

  const formatPriceRange = (variants) => {
    if (!variants || variants.length === 0) return "N/A";
    const prices = variants.map((v) => v.price);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    return min === max ? `$${min}` : `$${min} - $${max}`;
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Products</h1>
        <Link
          to="/admin/products/add"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          ➕ Add Product
        </Link>
        
      </div>

      <div className="overflow-x-auto bg-white shadow rounded">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 border">#</th>
              <th className="p-3 border">Image</th>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Price Range</th>
              <th className="p-3 border">Category</th>
              <th className="p-3 border text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p, index) => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="p-3 border">{index + 1}</td>
                <td className="p-3 border">
                  <img
                    src={p.thumbnail}
                    alt={p.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                </td>
                <td className="p-3 border font-semibold">{p.name}</td>
                <td className="p-3 border">{formatPriceRange(p.variants)}</td>
                <td className="p-3 border">{p.category_name || "None"}</td>
                <td className="p-3 border text-center space-x-2">
                  <Link to={`/admin/products/edit/${p.id}`}>
                    <button className="bg-yellow-500 px-3 py-1 text-white rounded">
                      Edit
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="bg-red-500 px-3 py-1 text-white rounded"
                  >
                    Delete
                  </button>
                  <Link to={`/admin/products/${p.id}/variants`}>
  <button className="bg-purple-500 px-3 py-1 text-white rounded">
    Variants
  </button>
</Link>

                </td>
              </tr>
            ))}

            {products.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center p-4 text-gray-500">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductList;
