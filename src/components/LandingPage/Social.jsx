import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fab } from '@fortawesome/free-brands-svg-icons'

// icons

const SocialMediaIcons = () => {
  return (
    <section className="bg-red-100 py-8">
          <FontAwesomeIcon icon={['fab', 'apple']} />
      <FontAwesomeIcon icon={['fab', 'microsoft']} />
      <FontAwesomeIcon icon={['fab', 'google']} />
      <div className="container mx-auto flex justify-center">
       {/* social media icons twitter ,  */}
        <a href="#" className="mx-4 text-gray-600 hover:text-blue-400">
          <i className="fab fa-facebook fa-2x"></i>
        </a>
        <a href="#" className="mx-4 text-gray-600 hover:text-blue-400">
          <i className="fab fa-twitter fa-2x"></i>
        </a>
        <a href="#" className="mx-4 text-gray-600 hover:text-blue-400">
          <i className="fab fa-instagram fa-2x"></i>
        </a>
      </div>
    </section>
  );
};

export default SocialMediaIcons;