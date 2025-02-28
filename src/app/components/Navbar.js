import React from 'react';

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-stone-700/90 backdrop-blur-sm p-4 text-white px-6 flex justify-between items-center shadow-md z-50">
      {/* Left Side - Logo */}
      <div className="flex items-center space-x-3">
        <div className="bg-white p-2 rounded-full">
          <img src="logo.jpg" alt="logo" className="w-8 h-8"/>
        </div>
        <span className="text-xl font-bold">STRAY CONNECT</span>
      </div>

      {/* Center - Navigation Links */}
      <ul className="hidden md:flex space-x-6">
        <li><a href="#" className="hover:text-gray-300">HOME</a></li>
        <li><a href="#" className="hover:text-gray-300">CITIZENS</a></li>
        <li><a href="#" className="hover:text-gray-300">WELFARE</a></li>
        <li><a href="#" className="hover:text-gray-300">BLOGS</a></li>
        <li><a href="#" className="hover:text-gray-300">CONTACT</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;
