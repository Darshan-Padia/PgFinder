import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { isDarkState } from './Atom/ThemeStateAtom';
import { useRecoilState } from 'recoil';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useRecoilState(isDarkState);
  const { auth } = useAuth();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      setIsDarkMode(false);
    } else {
      setIsDarkMode(true);
    }
  }, []);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleThemeChange = () => {
    const newTheme = !isDarkMode ? 'dark' : 'light';
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <div className='shadow-md'>
      <header className={`bg-${isDarkMode ? 'gray-800' : 'white'} bg-opacity-10 backdrop-filter backdrop-blur-lg hidden sm:flex top-0 left-0 right-0 z-10 sticky text-${isDarkMode ? 'white' : 'black'} p-4 flex justify-between items-center`}>
        <div className="flex items-center">
          <span className="font-semibold text-lg">PG Finder</span>
        </div>
        <nav className="flex items-center space-x-4">
          <Link to="/" className={`hover:bg-gray-100 p-2 rounded-md transition-opacity ${isDarkMode ? 'text-white' : 'text-blue-500 font-bold'}`}>
            Home
          </Link>
          <Link to="/profile" className={`hover:bg-gray-100 p-2 rounded-md transition-opacity ${isDarkMode ? 'text-white' : 'text-blue-500 font-bold'}`}>
            Profile
          </Link>
          <Link to="/services" className={`hover:bg-gray-100 p-2 rounded-md transition-opacity ${isDarkMode ? 'text-white' : 'text-blue-500 font-bold'}`}>
            Services
          </Link>
          <Link to="/properties" className={`hover:bg-gray-100 p-2 rounded-md transition-opacity ${isDarkMode ? 'text-white' : 'text-blue-500 font-bold'}`}>
            View PGs
          </Link>
          {!auth.accessToken && (
            <Link to="/signup" className={`hover:bg-gray-100 p-2 rounded-md transition-opacity ${isDarkMode ? 'text-white' : 'text-blue-500 font-bold'}`}>
              Signup
            </Link>
          )}
          <Link to="/contact" className={`hover:bg-gray-100 p-2 rounded-md transition-opacity ${isDarkMode ? 'text-white' : 'text-blue-500 font-bold'}`}>
            Contact
          </Link>
          {/* <button onClick={handleThemeChange} className="hover:bg-gray-100 p-2 rounded-md transition-opacity">
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </button> */}
        </nav>
      </header>
      <header className={`flex flex-col justify-start items-center sm:hidden top-0 left-0 z-10 sticky text-4xl text-${isDarkMode ? 'white' : 'black'}`}>
        <div className={`flex bg-${isDarkMode ? 'gray-800' : 'white'} bg-opacity-10 backdrop-filter backdrop-blur-lg items-center justify-between w-full`}>
          <div className="flex items-center">
            <span className="font-semibold text-2xl p-3">PG Finder</span>
          </div>
          <div className="cursor-pointer p-2" onClick={handleMenuToggle}>
            <svg className="h-10 w-10 fill-current text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z"/>
            </svg>
          </div>
        </div>
        {isMenuOpen && (
          <div className={`bg-${isDarkMode ? 'gray-800' : 'white'} bg-opacity-10 backdrop-filter backdrop-blur-lg w-screen`}>
            <nav className="flex flex-col gap-1 text-center">
              <Link to="/" className={`hover:text-gray-300 pb-1 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                Home
              </Link>
              <hr className="opacity-50" />
              <Link to="/services" className={`hover:text-gray-300 pb-1 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                Services
              </Link>
              <hr className="opacity-50" />
              <Link to="/properties" className={`hover:text-gray-300 pb-1 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                View PGs
              </Link>
              <hr className="opacity-50" />
              <Link to="/signup" className={`hover:text-gray-300 pb-1 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                Signup
              </Link>
              <hr className="opacity-50" />
              <Link to="/contact" className={`hover:text-gray-300 pb-1 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                Contact
              </Link>
              <hr className="opacity-50" />
              {/* <button onClick={handleThemeChange} className="hover:text-gray-300">
                {isDarkMode ? 'Light Mode' : 'Dark Mode'}
              </button> */}
            </nav>
          </div>
        )}
      </header>
    </div>
  );
};

export default Header;
