import React from 'react';

function Navbar() {
  return (
    <nav className="bg-teal-800 text-white px-6 py-4 flex justify-between items-center">
      {/* Left Side - Logo */}
      <div className="flex items-center space-x-3">
        <div className="bg-white p-2 rounded-full">
          <img src="https://img.icons8.com/ios-filled/50/000000/paw-print.png" alt="logo" className="w-8 h-8"/>
        </div>
        <span className="text-xl font-bold">Stray Connect</span>
      </div>

      {/* Center - Navigation Links */}
      <ul className="hidden md:flex space-x-6">
        <li><a href="#" className="hover:text-gray-300">HOME</a></li>
        <li><a href="#" className="hover:text-gray-300">CITIZENS</a></li>
        <li><a href="#" className="hover:text-gray-300">ORGANIZATION</a></li>
        <li><a href="#" className="hover:text-gray-300">BLOGS</a></li>
        <li><a href="#" className="hover:text-gray-300">CONTACT</a></li>
      </ul>

      {/* Right Side - Sign In & Register Buttons */}
      <div className="space-x-3">
        <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300">Sign in</button>
        <button className="bg-teal-600 px-4 py-2 rounded-md hover:bg-teal-700">Register</button>
      </div>
    </nav>
  );
}

export default Navbar;
