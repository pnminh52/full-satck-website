import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from "./pages/admin/product/ProductList";
import ProductAdd from "./pages/admin/product/ProductAdd";
import ProductEdit from "./pages/admin/product/ProductEdit";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/add" element={<ProductAdd />} />
      </Routes>
    </Router>
  );
}

export default App;
