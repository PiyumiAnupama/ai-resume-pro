import React from 'react';

function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4 shadow-lg sticky top-0 z-50 rounded-b-lg w-full"> {/* Added w-full */}
      <div className="container mx-auto flex justify-center items-center flex-wrap"> {/* Centered content */}
        <a href="/" className="text-2xl font-bold tracking-wide hover:text-blue-200 transition duration-300 ease-in-out">
          AI Resume Pro
        </a>
        {/* Menu items removed as per request */}
      </div>
    </nav>
  );
}

export default Navbar;
