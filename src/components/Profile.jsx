import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import Header from './Header';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const axiosPrivate = useAxiosPrivate();
  const history = useNavigate();

  useEffect(() => {
    // Fetch user data using Axios
    axiosPrivate.get('/api/users/me')
      .then(response => {
        setUserData(response.data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  const handleViewEnlistedPGs = () => {
    history('/enlistedPGs');
  };

  const handleEnlistNewPGs = () => {
    history('/services');
  };

  return (
   <div>
    <div className='w-full fixed z-30'>
      <Header />
    </div>
     <div className="h-screen bg-gray-100 text-gray-900 p-8 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl mb-4">Profile</h1>
        <div className="mx-auto w-24 h-24 mb-4 rounded-full overflow-hidden">
          <img src="https://source.unsplash.com/random/200x200" alt="Profile" className="w-full h-full object-cover" />
        </div>
        {userData ? (
          <div className="mb-4">
            <p className="mb-2">Name: {userData.username}</p>
            <p>Email: {userData.email}</p>
            {/* Add more user information as needed */}
          </div>
        ) : (
          <p>Loading...</p>
        )}
        <div className="flex justify-center mt-4">
          <button className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 mr-2 rounded" onClick={handleViewEnlistedPGs}>View Enlisted PGs</button>
          <button className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded" onClick={handleEnlistNewPGs}>Enlist New PGs</button>
        </div>
      </div>
    </div>
   </div>
  );
};

export default Profile;
