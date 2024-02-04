import React from 'react';

const Header = () => {
  return (
    // glassy effect to the header 
    <header className="bg-gray-800
    bg-opacity-10 backdrop-filter backdrop-blur-lg
    
    
    top-0 left-0 right-0 z-10 sticky
     text-black p-4 flex justify-between items-center">
      <div className="flex items-center">
        <img src="/path/to/your/logo.png" alt="Logo" className="h-10 mr-4" />
        <span className="font-semibold text-lg">PG Finder</span>
      </div>
      <nav className="flex items-center">
        <a href="/" className="mx-2 hover:text-gray-700">Home</a>
        <a href="/services" className="mx-2 hover:text-gray-700">Services</a>
        <a href="/about" className="mx-2 hover:text-gray-700">About</a>
        <a href="/signup" className="mx-2 hover:text-gray-700">Signup</a>
        <a href="/contact" className="mx-2 hover:text-gray-700">Contact</a>
      </nav>
    </header>
  );
};

export default Header;