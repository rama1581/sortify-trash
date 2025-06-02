import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className='bg-[#3F7D58] text-white py-4'>
      <div className='max-w-7xl mx-auto px-6 flex items-center justify-between'>
        {/* Left Section: Sortify-Trash */}
        <div className='text-xl md:text-2xl font-bold'>
          <span className="text-white">Sortify</span><span className="text-gray-200">-Trash</span>
        </div>

        {/* Right Section: Navigation Links */}
        <nav className='flex space-x-6 text-sm md:text-base font-medium'>
          <Link to="/" className='hover:text-emerald-300 transition-colors duration-200'>Home</Link>
          <Link to="/about" className='hover:text-emerald-300 transition-colors duration-200'>About</Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;