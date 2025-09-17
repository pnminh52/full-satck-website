import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hook/useAuth";
import useToast from "../../hook/useToast";
const Header = () => {
  const toast=useToast()
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();       
    navigate("/");  
    toast.success("Logout successful!") 
  };

  return (
    <div className="border-b border-gray-300">
      <div className="h-16 flex items-center justify-between max-w-screen-xl mx-auto px-0">
        <img
          className="w-35 cursor-pointer"
          src="https://www.goodsmile.com/img/common/logo.svg"
          alt=""
        />

        <ul className="flex items-center gap-6">
          <Link to={"/cart"}>
            <li>Cart</li>
          </Link>
          {user ? (
            <>
              <li>Xin chào, {user.name}</li>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <Link to="/login">
              <li>Login</li>
            </Link>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Header;
