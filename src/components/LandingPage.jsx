import React from 'react';
import Header from './Header';
import Testimonials from './LandingPage/Testimonials';
import FeaturedListings from './LandingPage/FeaturedListings';
import NewsletterSignup from './LandingPage/NewsLetter';
import SocialMediaIcons from './LandingPage/Social';
import FAQSection from './LandingPage/FAQ';


const LandingPage = () => {
  return (
    <div>
      <Header />
      <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center py-12">
        <div className="container mx-auto flex flex-col lg:flex-row items-center justify-center">
          <div className="lg:w-1/2 px-4 lg:px-0">
            <h2 className="text-5xl font-bold text-gray-800 mb-4">Welcome to the</h2>
            <h1 className="text-7xl font-bold text-blue-600 mb-6">PG Finder</h1>
            <p className="text-lg text-gray-700 mb-8">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, possimus illum? Temporibus, doloribus quia consequatur necessitatibus sit magni nesciunt. Sit, libero reiciendis? Saepe sapiente, excepturi nemo perspiciatis deleniti repellat dolor.
            </p>
          </div>
          <div className="lg:w-1/2 px-4 lg:px-0">
            <img src="src/assets/house2.png" alt="House" className="w-full" />
          </div>
        </div>
      </div>
      <Testimonials />
      {/* <FeaturedListings /> */}
      {/* <NewsletterSignup /> */}
      <SocialMediaIcons />
      <FAQSection />
    </div>
  );
};

export default LandingPage;
