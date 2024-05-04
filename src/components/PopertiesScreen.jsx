// PropertiesScreen.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropertyCard from './PropertyCard';
import PropertyFilters from './PropertyFilter';
import Header from './Header';
import { useRecoilState, useRecoilValue } from 'recoil';
import { searchState } from './Atom/SearchState';
import { propertyState } from './Atom/PropertyStateAtom';
import { isDarkState } from './Atom/ThemeStateAtom';

const PropertiesScreen = ({ properties }) => {
  const isDarkMode = useRecoilValue(isDarkState);
  const navigate = useNavigate();
  const [property, setProperty] = useRecoilState(propertyState);
  const { city, numRooms, minRent, maxRent, availableDate } = useRecoilValue(searchState);

  const filterProperties = (properties) => {
    return properties.filter((property) => {
      const cityMatch = city ? property.city.toLowerCase().includes(city.toLowerCase()) : true;
      const numRoomsMatch = numRooms ? property.numRooms >= numRooms : true;
      const rentMatch = property.rent >= minRent && property.rent <= maxRent;
      const availableDateMatch = availableDate ? new Date(property.availableDate) >= new Date(availableDate) : true;
      return cityMatch && numRoomsMatch && rentMatch && availableDateMatch;
    });
  };

  const handlePropertyClick = (property) => {
    setProperty(property);
    navigate(`/property/${property.propertyId}`);
  };

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className='bg-gray-200 min-h-screen flex flex-col'>
        <div className='w-full fixed z-30 mb-10'>
          <Header />
        </div>
        <div className=" pt-32 container mx-auto py-8 flex-grow">
          <div className="flex flex-col md:flex-row md:space-x-4">
            <div className="md:w-1/4 overflow-y-hidden">
              <PropertyFilters />
            </div>
            <div className="md:w-3/4">
              <div className="flex flex-wrap -mx-4"> {/* Add flex-wrap and negative margins */}
                {filterProperties(properties).map((property) => (
                  <div key={property.id} className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8 "> {/* Adjust width and add padding */}
                    <PropertyCard
                      property={property}
                      onClick={() => handlePropertyClick(property)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertiesScreen;
