import React from 'react';
import { useRecoilState } from 'recoil';
import { searchState } from './Atom/SearchState';

const PropertyFilters = () => {
  const [srch, setSrch] = useRecoilState(searchState);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setSrch((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 relative overflow-hidden">
      <div className="glassy-overlay absolute inset-0 bg-gradient-to-b from-white to-transparent opacity-25"></div>
      <h3 className="text-lg font-semibold text-gray-800 mb-4 relative z-10">Filters</h3>
      <div className="mb-4 relative z-10">
        <label htmlFor="city" className="block text-gray-600 font-semibold mb-2">
          City
        </label>
        <input
          type="text"
          id="city"
          name="city"
          defaultValue={srch.city || ''}
          onChange={handleFilterChange}
          className="w-full px-3 py-2 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
        />
      </div>
      <div className="mb-4 relative z-10">
        <label htmlFor="numRooms" className="block text-gray-600 font-semibold mb-2">
          Number of Rooms
        </label>
        <input
          type="number"
          id="numRooms"
          name="numRooms"
          defaultValue={srch.numRooms || ''}
          onChange={handleFilterChange}
          className="w-full px-3 py-2 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
        />
      </div>
      <div className="mb-4 relative z-10">
        <label htmlFor="minRent" className="block text-gray-600 font-semibold mb-2">
          Minimum Rent
        </label>
        <input
          type="number"
          id="minRent"
          name="minRent"
          defaultValue={srch.minRent || ''}
          onChange={handleFilterChange}
          className="w-full px-3 py-2 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
        />
      </div>
      <div className="mb-4 relative z-10">
        <label htmlFor="maxRent" className="block text-gray-600 font-semibold mb-2">
          Maximum Rent
        </label>
        <input
          type="number"
          id="maxRent"
          name="maxRent"
          defaultValue={srch.maxRent || ''}
          onChange={handleFilterChange}
          className="w-full px-3 py-2 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
        />
      </div>
      <div className="mb-4 relative z-10">
        <label htmlFor="availableDate" className="block text-gray-600 font-semibold mb-2">
          Available Date ( From )
        </label>
        <input
          type="date"
          id="availableDate"
          name="availableDate"
          defaultValue={srch.availableDate || ''}
          onChange={handleFilterChange}
          className="w-full px-3 py-2 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
        />
      </div>
    </div>
  );
};

export default PropertyFilters;
