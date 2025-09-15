import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/admin/Dashboard";
import ProductList from "./pages/admin/product/ProductList";
import ProductAdd from "./pages/admin/product/ProductAdd";
import ProductEdit from "./pages/admin/product/ProductEdit";
import CategoryList from "./pages/admin/category/CategoryList";
import CategoryAdd from "./pages/admin/category/CategoryAdd";
import CategoryEdit from "./pages/admin/category/CategoryEdit";
import Homepage from "./pages/user/Homepage";
import UserLayout from "./layouts/UserLayout";
import ProductsList from "./pages/user/ProductsList";
import ProductDetails from "./pages/user/ProductDetails";
import AdminLayout from "./layouts/AdminLayout"; 
import VariantAdd from "./pages/admin/product/VariantAdd";
import VariantEdit from "./pages/admin/product/VariantEdit";
import VariantList from "./pages/admin/product/VariantList";
function App() {
  return (
    <Router>
      <Routes>
        {/* User routes */}
        <Route element={<UserLayout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/iPhone" element={<ProductsList />} />
          <Route path="/store" element={<ProductsList />} />

          <Route path="/product/:id" element={<ProductDetails />} />
        </Route>

        {/* Admin routes với AdminLayout */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<ProductList />} />
          <Route path="products/add" element={<ProductAdd />} />
          <Route path="products/edit/:id" element={<ProductEdit />} />
          <Route path="products/:id/variants" element={<VariantList />} />
<Route path="products/:id/variants/add" element={<VariantAdd />} />
<Route path="products/:id/variants/edit/:variantId" element={<VariantEdit />} />
          <Route path="categories" element={<CategoryList />} />
          <Route path="categories/add" element={<CategoryAdd />} />
          <Route path="categories/edit/:id" element={<CategoryEdit />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
