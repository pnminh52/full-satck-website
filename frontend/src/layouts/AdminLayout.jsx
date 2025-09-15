import { Outlet, Link } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-1/5 bg-gray-800 text-white p-6 space-y-4">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <nav className="flex flex-col space-y-3">
          <Link to="/admin" className="hover:bg-gray-700 p-2 rounded">
            🏠 Dashboard
          </Link>
          <Link to="/admin/categories" className="hover:bg-gray-700 p-2 rounded">
            📂 Categories
          </Link>
          <Link to="/admin/products" className="hover:bg-gray-700 p-2 rounded">
            🛒 Products
          </Link>
          <Link to="/admin/orders" className="hover:bg-gray-700 p-2 rounded">
            📦 Orders
          </Link>
          <Link to="/admin/users" className="hover:bg-gray-700 p-2 rounded">
            👤 Users
          </Link>
        </nav>
      </aside>

      {/* Content */}
      <main className="w-4/5 p-6 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
