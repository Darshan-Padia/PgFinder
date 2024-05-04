import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { useRecoilValue } from 'recoil';
import { propertyState } from './Atom/PropertyStateAtom';

const PropertyCard = ({ property, onClick }) => {
  const propertyId = property.propertyId;
  const [imgs, setImgs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`/api/images/${propertyId}`).then(response => {
      setImgs(response.data);
      setLoading(false);
    });
  }, [propertyId]);

  return (
    <div
      className="bg-gray-200 rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105 w-full md:w-96"
      onClick={onClick}
    >
      {loading ? (
        <div className="w-full h-64 flex items-center justify-center bg-gray-200">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-500"></div>
        </div>
      ) : (
        <>
          <div className="relative h-64">
            <img
              src={
                imgs.length > 0
                  ? imgs[0].image
                  : 'https://cdn.pixabay.com/photo/2020/01/03/05/36/house-4737447_1280.png'
              }
              alt={property.propertyName}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 left-2 bg-gray-800 text-white px-2 py-1 rounded">
              {property.propertyType}
            </div>
          </div>
          <div className="p-4">
            <h3 className="text-gray-900 text-xl font-semibold mb-2">
              {property.propertyName}
            </h3>
            <p className="text-gray-600 mb-2">{property.address}</p>
            <div className="flex flex-col md:flex-row justify-between mb-2">
              <div className="text-gray-700 font-semibold mb-2 md:mb-0">
                ₹{property.rent}
              </div>
              <div className="flex items-center">
                <span className="text-gray-700 mr-4">
                  {property.numRooms} rooms
                </span>
                <span className="text-gray-700">
                  {property.numBathrooms} bathrooms
                </span>
              </div>
            </div>
            <button className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-300">
              View Property
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PropertyCard;  