import React from 'react';

function Navbar() {
  return (
    <nav className="bg-teal-800 text-white px-6 py-4 flex justify-between items-center">
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

      {/* Right Side - Sign In & Register Buttons */}

    </nav>
  );
}

export default Navbar;
