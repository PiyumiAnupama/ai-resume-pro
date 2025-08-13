import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-6 text-center mt-12 shadow-inner rounded-t-lg">
      <div className="container mx-auto">
        <p className="mb-2 text-lg">
          &copy; {new Date().getFullYear()} AI Resume Pro. All rights reserved.
        </p>
        {/* Removed Privacy Policy, Terms of Service, Contact Us */}
        <p className="text-sm">
          Developed by <span className="font-semibold">Piyumi Piyadigama</span>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
