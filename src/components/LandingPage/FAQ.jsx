import React from 'react';

const FAQSection = () => {
  return (
    <section className="bg-gray-200 py-12">
      <div className="container mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-8">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* FAQ Cards */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">How do I search for PG accommodations?</h3>
            <p className="text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla faucibus in felis at tincidunt.</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">Is there a fee for using the platform?</h3>
            <p className="text-gray-700">Nullam feugiat nunc eu sem lobortis condimentum. Fusce convallis aliquet est at aliquam.</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">How do I contact support?</h3>
            <p className="text-gray-700">Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
