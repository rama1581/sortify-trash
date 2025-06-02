import React from "react"; // useState and useNavigate are not used in this component, so they can be removed
import { Link } from "react-router-dom"; // Link is used, so keep it

const Navbar = () => { // Renamed to Navbar (uppercase N)
  return (
    <header className="bg-white/10 backdrop-blur-md shadow-md fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        <div className="text-3xl font-bold text-emerald-400">SortifyTrash</div>
        <nav className="space-x-6 text-gray-300 font-medium">
          <Link to="/" className="hover:text-emerald-300">Home</Link>
          <Link to="/about" className="hover:text-emerald-300">About</Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar; // Export the component so it can be imported and used elsewhere