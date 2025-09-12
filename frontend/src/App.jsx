import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/admin/Dashboard";
import ProductList from "./pages/admin/product/ProductList";
import ProductAdd from "./pages/admin/product/ProductAdd";
import ProductEdit from "./pages/admin/product/ProductEdit";
import CategoryList from "./pages/admin/category/CategoryList";
import CategoryAdd from "./pages/admin/category/CategoryAdd";
import Homepage from "./pages/user/Homepage";
import UserLayout from "./layouts/UserLayout";
import ProductsList from './pages/user/ProductsList';
import ProductDetails from "./pages/user/ProductDetails";

function App() {
  return (
    <Router>
      <Routes>
        {/* User routes */}
        <Route element={<UserLayout />}>
    <Route path="/" element={<Homepage />} />
    <Route path="/rings" element={<ProductsList />} />
    <Route path="/rings/:id" element={<ProductDetails />} />

  </Route>

        {/* Admin routes */}
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/products" element={<ProductList />} />
        <Route path="/admin/products/add" element={<ProductAdd />} />
        <Route path="/admin/products/edit/:id" element={<ProductEdit />} />
        <Route path="/admin/categories" element={<CategoryList />} />
        <Route path="/admin/categories/add" element={<CategoryAdd />} />
      </Routes>
    </Router>
  );
}

export default App;
