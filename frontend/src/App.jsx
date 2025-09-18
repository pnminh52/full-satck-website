import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Dashboard from "./pages/admin/Dashboard";
import ProductList from "./pages/admin/product/ProductList";
import ProductAdd from "./pages/admin/product/ProductAdd";
import ProductEdit from "./pages/admin/product/ProductEdit";
import CategoryList from "./pages/admin/category/CategoryList";
import CategoryAdd from "./pages/admin/category/CategoryAdd";
import CategoryEdit from "./pages/admin/category/CategoryEdit";
import Homepage from "./pages/user/Homepage";
import ForgotPassword from "./pages/user/ForgotPassword";
import ResetPassword from "./pages/user/ResetPassword";
import UserLayout from "./layouts/UserLayout";

import AdminLayout from "./layouts/AdminLayout"; 
import ProductDetails from "./pages/user/ProductDetails";
import ListProduct from "./pages/user/ListProduct";
import Login from "./pages/user/Login";
import Register from "./pages/user/Register";
import Cart from "./pages/user/Cart";
import CheckOut from "./pages/user/CheckOut";
function App() {
  return (
    <Router>
        <ToastContainer 
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
      />
      <Routes>
    
        {/* User routes */}
        <Route element={<UserLayout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/product" element={<ListProduct />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<CheckOut />} />

          <Route path="/forgot-password" element={ <ForgotPassword/>} />
<Route path="/reset-password" element={<ResetPassword />} />


       
        </Route>

        {/* Admin routes với AdminLayout */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<ProductList />} />
          <Route path="products/add" element={<ProductAdd />} />
          <Route path="products/edit/:id" element={<ProductEdit />} />
          <Route path="categories" element={<CategoryList />} />
          <Route path="categories/add" element={<CategoryAdd />} />
          <Route path="categories/edit/:id" element={<CategoryEdit />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
