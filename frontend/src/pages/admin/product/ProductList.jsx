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
      const res = await getProducts();
      setProducts(res.data);
    } catch (err) {
      console.error("❌ Error fetchProducts:", err.message);
    }
  };
  const onClickDeleteProduct= async(id)=>{
    const confirmDelete = window.confirm("Delete?")
    if(!confirmDelete) return;

    try {
        await deleteProduct(id)
        fetchProducts()
    } catch (error) {
        console.error("❌ Error deleteProduct:", error.message);
    }

  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Products</h1>
      <Link to="/add">➕ Add Product</Link>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            <img src={p.image} alt={p.name} width="50" />
            {p.name} - ${p.price}
            <button onClick={()=>onClickDeleteProduct(p.id)}>
                Delete
            </button>
            <Link to={`/products/edit/${p.id}`}>Edit</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
