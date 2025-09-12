import { useEffect, useState } from "react";
import { getProducts } from "../../../api/products";
import { Link } from "react-router-dom";

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await getProducts();
      setProducts(res.data);
    } catch (err) {
      console.error("❌ Error fetchProducts:", err.message);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Products</h1>
      <Link to="/add">➕ Add Product</Link>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            <img src={p.image} alt={p.name} width="50" />
            {p.name} - ${p.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
