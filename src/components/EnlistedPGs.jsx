import React, { useState, useEffect } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import PropertyCard from './PropertyCard';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import { useRecoilValue } from 'recoil'; // Import useRecoilValue
import { isDarkState } from './Atom/ThemeStateAtom';

const EnlistedPGs = () => {
  const axiosPrivate = useAxiosPrivate();
  const isDarkMode = useRecoilValue(isDarkState);
  const navigate = useNavigate();
  const [enlistedProperties, setEnlistedProperties] = useState([]);
  const [property, setProperty] = useState(null);
  
  
  useEffect(() => {
    // Fetch enlisted properties using Axios
    axiosPrivate.get('/api/properties/me')
      .then(response => {
        setEnlistedProperties(response.data);
      })
      .catch(error => {
        console.error('Error fetching enlisted properties:', error);
      });
  }, []);

  const handlePropertyClick = (property) => {
    setProperty(property);
    navigate(`/property/${property.propertyId}`);
  };

  return (
    <div className="bg-gray-200 h-full ">
      <div className='w-full  fixed top-0 z-50 shadow-md'>
        <Header />
      </div>
      <div className="pt-20 container mx-auto py-8">
        <h1 className="text-3xl text-black font-bold mb-4">Enlisted PGs</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {enlistedProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onClick={() => handlePropertyClick(property)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EnlistedPGs;
