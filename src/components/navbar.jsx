import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="bg-[#3F7D58] backdrop-blur-md shadow-md fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        <div className="text-3xl font-bold text-white">SortifyTrash</div>
        <nav className="space-x-6 text-white font-medium">
          <Link to="/" className="hover:text-gray-300 transition-colors duration-200">
            Home
          </Link>
          <Link to="/about" className="hover:text-gray-300 transition-colors duration-200">
            About
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
