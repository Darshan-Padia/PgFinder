import React from 'react';

const Testimonials = () => {
  return (
    <section className="bg-gray-200 py-12">
      <div className="container mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-8">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Testimonial Cards */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-700 mb-4">"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales odio ac libero suscipit, id maximus libero tincidunt."</p>
            <p className="text-gray-600 font-semibold">- John Doe</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-700 mb-4">"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."</p>
            <p className="text-gray-600 font-semibold">- Jane Smith</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-700 mb-4">"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium."</p>
            <p className="text-gray-600 font-semibold">- Alice Johnson</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
