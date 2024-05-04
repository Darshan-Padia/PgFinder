import React, { useState } from 'react';
import Header from './Header';
import Testimonials from './LandingPage/Testimonials';
import SocialMediaIcons from './LandingPage/Social';
import FAQSection from './LandingPage/FAQ';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { axiosPrivate } from '../api/axios';
import { isDarkState } from './Atom/ThemeStateAtom';
import { useRecoilValue } from 'recoil';

const LandingPage = () => {
  const isDarkMode = useRecoilValue(isDarkState);
  const [loading, setLoading] = useState(false);
  const { auth, setAuth } = useAuth();

  const handleLogout = async () => {
    console.log(`from handle logout email = ${auth.email}`);
    try {
      await axiosPrivate.post('/api/auth/logout', {
        withCredentials: true
      }).then((response) => {
        console.log(response.data);
        setAuth({});
        window.location.reload();
      });
    } catch (err) {
      console.error(err);
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={isDarkMode ? 'dark' : ''}> {/* Apply dark mode class if isDarkMode is true */}
      <div className='fixed w-full'>
        <Header />
      </div>
      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-300'} min-h-screen flex flex-col justify-center items-center py-12`}>
        <div className="container mx-auto flex flex-col lg:flex-row items-center justify-center">
          <div className="lg:w-1/2 px-4 lg:px-0">
            <h2 className={`text-5xl font-bold text-${isDarkMode ? 'white' : 'gray-800'} mb-4`}>Welcome to the</h2>
            <h1 className={`text-7xl font-bold text-${isDarkMode ? 'yellow-400' : 'blue-600'} mb-6`}>PG Finder</h1>
            <p className={`text-lg text-${isDarkMode ? 'gray-300' : 'gray-700'} mb-8`}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, possimus illum? Temporibus, doloribus quia consequatur necessitatibus sit magni nesciunt. Sit, libero reiciendis? Saepe sapiente, excepturi nemo perspiciatis deleniti repellat dolor.
            </p>
            {auth.accessToken && (
              <button
                className={`bg-${isDarkMode ? 'red-600' : 'red-500'} hover:bg-${isDarkMode ? 'red-700' : 'red-500'} text-white font-bold py-2 px-4 rounded mt-4`}
                onClick={handleLogout}
              >
                Logout
              </button>
            )}
          </div>
          <div className="lg:w-1/2 px-4 lg:px-0">
            <img src="src/assets/house2.png" alt="House" className="w-full" />
          </div>
        </div>
      </div>
      <Testimonials />
      <SocialMediaIcons />
      <FAQSection />
    </div>
  );
};

export default LandingPage;
