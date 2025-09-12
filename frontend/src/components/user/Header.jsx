import React from "react";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";

const Header = () => {
  return (
    <div>
      {/* Top info bar */}
      <div className="bg-[#453536] h-7 flex items-center justify-center">
        <p className="text-white text-xs">
          Personal hand diagnosis Now in progress!
        </p>
      </div>

      {/* Main header */}
      <div className=" w-full  bg-white ">
        <div className="px-0 sm:px-10 mx-auto flex items-center justify-between h-14 px-4">
          
          {/* Hamburger menu - mobile only */}
          <div className="md:hidden">
            <MenuIcon className="text-black w-6 h-6" />
          </div>

          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="https://www.iprimo.jp/common/img/common/logo_header.svg"
              alt="Logo"
              className="h-5"
            />
          </Link>

          {/* Navigation - hidden on mobile */}
          <div className="hidden md:flex gap-8 flex-1 justify-center items-center">
            <Link to="/" className="text-black hover:text-gray-700">Home</Link>
            <Link to="/rings" className="text-black hover:text-gray-700">Explore</Link>
            <Link to="/about" className="text-black hover:text-gray-700">About</Link>
            <Link to="/services" className="text-black hover:text-gray-700">Services</Link>
            <Link to="/contact" className="text-black hover:text-gray-700">Contact</Link>
          </div>

          {/* Reservation button */}
          <button className="bg-[#453536] text-white text-xs px-3 py-1 rounded hover:bg-[#362a29]">
            Reservation
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
