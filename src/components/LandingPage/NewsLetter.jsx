import React from 'react';

const NewsletterSignup = () => {
  return (
    <section className="bg-gray-200 py-12">
      <div className="container mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-6">Subscribe to Our Newsletter</h2>
        <form className="flex flex-col items-center">
          <input type="email" placeholder="Enter your email" className="bg-white border border-gray-300 rounded-md py-2 px-4 mb-4 w-full md:w-1/2" />
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md w-full md:w-1/2">Subscribe</button>
        </form>
      </div>
    </section>
  );
};

export default NewsletterSignup;
