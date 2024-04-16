import React, { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      {/* Desktop Header */}
      <header className="bg-gray-800 bg-opacity-10 backdrop-filter backdrop-blur-lg hidden sm:flex top-0 left-0 right-0 z-10 sticky text-white p-4 flex justify-between items-center">
        <div className="flex items-center">
          {/* <img src="/path/to/your/logo.png" alt="Logo" className="h-10 mr-4" /> */}
          <span className="font-semibold text-lg">PG Finder</span>
        </div>
        <nav className="flex items-center">
          <a href="/" className="mx-2 hover:text-gray-700">
            Home
          </a>
          <a href="/services" className="mx-2 hover:text-gray-700">
            Services
          </a>
          <a href="/about" className="mx-2 hover:text-gray-700">
            About
          </a>
          <a href="/signup" className="mx-2 hover:text-gray-700">
            Signup
          </a>
          <a href="/contact" className="mx-2 hover:text-gray-700">
            Contact
          </a>
        </nav>
      </header>

      {/* Mobile Header */}
      <header className=" flex flex-col  justify-start items-center sm:hidden  top-0 left-0 z-10 sticky text-4xl text-white ">
        <div className="flex bg-gray-800 bg-opacity-10 backdrop-filter backdrop-blur-lg items-center justify-between w-full">
          <div className="flex items-center">
            <span className="font-semibold text-2xl p-3">PG Finder</span>
          </div>
          {/* Hamburger Menu Icon */}
          <div className="cursor-pointer p-2" onClick={handleMenuToggle}>
            <svg
              className="h-10 w-10 fill-current text-white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              {(
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z"
                />
              )}
            </svg>
          </div>
        </div>
        {/* Mobile Menu Items */}
        {isMenuOpen && (
          <div className="bg-gray-800 bg-opacity-10 backdrop-filter backdrop-blur-lg  w-screen">
            <nav className="flex flex-col gap-1 text-center">
              <a href="/" className="mx-2 hover:text-gray-300 pb-1">
                Home
              </a>
              <hr className="opacity-50" />
              <a href="/services" className="mx-2 hover:text-gray-300 pb-1">
                Services
              </a>
              <hr className="opacity-50" />
              <a href="/about" className="mx-2 hover:text-gray-300 pb-1">
                About
              </a>
              <hr className="opacity-50" />
              <a href="/signup" className="mx-2 hover:text-gray-300 pb-1">
                Signup
              </a>
              <hr className="opacity-50" />
              <a href="/contact" className="mx-2 hover:text-gray-300 pb-1">
                Contact
              </a>
            </nav>
          </div>
        )}
      </header>
    </div>
  );
};

export default Header;
