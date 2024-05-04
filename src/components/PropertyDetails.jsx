import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { propertyState } from './Atom/PropertyStateAtom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Header from './Header';
import { isDarkState } from './Atom/ThemeStateAtom';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

const PropertyDetailsScreen = () => {
  const axios = useAxiosPrivate();
  const navigation = useNavigate();
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [owner, setOwner] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditable, setIsEditable] = useState(false);
  const [propertyy, setPropertyy] = useRecoilState(propertyState);
  const [updatedProperty, setUpdatedProperty] = useState({});
  const [editMode, setEditMode] = useState(false); // New state for edit mode
  const darkMode = useRecoilValue(isDarkState);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    // arrow color
    
  };

  const showImages = () => {
    navigation(`/showImages/${id}`);
  };

  const fetchImages = async () => {
    try {
      const response = await axios.get(`/api/images/${id}`);
      setImages(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, [property]);

  useEffect(() => {
    const fetchPropertyData = async () => {
      try {
        const response = await axios.get(`/api/properties/${id}`);
        setProperty(response.data);
        setUpdatedProperty(response.data);
        setPropertyy(response.data);
        setOwner(response.data.owner);
      } catch (error) {
        console.error('Error fetching property data:', error);
      }
    };

    const checkOwnedByCurrentUser = async () => {
      try {
        console.log(`checkOwnedByCurrentUser: ${id}`);
        const response = await axios.get(`/api/properties/check/${id}`);
        console.log(`checkOwnedByCurrentUser: ${response.data}`);
        setIsEditable(response.data);
      } catch (error) {
        console.error('Error checking if property is owned by current user:', error);
      }
    };

    fetchPropertyData();
    checkOwnedByCurrentUser();
  }, [id]);

  const handleDeleteProperty = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this property?');
    if (confirmDelete) {
      try {
        await axios.delete(`/api/properties/${id}`);
        alert('Property deleted successfully!');
        navigation('/enlistedpgs');
      } catch (error) {
        console.error('Error deleting property:', error);
        alert('Failed to delete property. Please try again later.');
      }
    }
  };

  const handlePropertyChange = (e) => {
    setUpdatedProperty({ ...updatedProperty, [e.target.name]: e.target.value });
  };

  const handleUpdateProperty = async () => {
    try {
      const response = await axios.put(`/api/properties/${id}`, updatedProperty);
      console.log('Property updated successfully:', response.data);
      setProperty(updatedProperty);
      setEditMode(false);
    } catch (error) {
      console.error('Error updating property:', error);
    }
  };

  if (!property) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-900">
      <div className="w-full shadow-lg fixed z-30 mb-10">
        <Header />
      </div>
      <div
        className={`${darkMode ? 'bg-gray-900' : 'bg-gray-200'} min-h-screen flex items-center justify-center transition-all duration-300`}
      >
        <div
          className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6 max-w-4xl w-full transition-all duration-300`}
        >
          <div className="mb-6 flex justify-between items-center">
            <div>
              <h2 className={`text-3xl font-bold mb-2 text-${darkMode ? 'white' : 'black'}`}>{property.propertyName}</h2>
              <p className={`text-${darkMode ? 'gray-300' : 'gray-600'}`}>{property.address}</p>
            </div>
            {isEditable && (
              <div className="flex gap-2">
              <button
                className={`${darkMode ? 'bg-blue-700' : 'bg-blue-500'} ${darkMode ? 'hover:bg-blue-600' : 'hover:bg-blue-700'} text-white font-bold py-2 px-4 rounded`}
                onClick={() => setEditMode(!editMode)}
              >
                {editMode ? 'Cancel' : 'Edit'}
              </button>
              <button
                className={`bg-${darkMode ? 'red-700' : 'red-500'} ${darkMode ? 'hover:bg-red-600' : 'hover:bg-red-700'} text-white font-bold py-2 px-4 rounded`}
                onClick={handleDeleteProperty}
              >
                Delete
              </button>
            </div>
              
            )}
          </div>
          <div className="mb-6">
            <Slider {...settings}>
              {images.map((image, index) => (
                <div key={index}>
                  <img
                    src={image.image}
                    alt={property.propertyName}
                    className="w-full h-96 object-cover rounded-lg mb-4"
                  />
                </div>
              ))}
            </Slider>
            <p className={`text-${darkMode ? 'gray-200' : 'gray-800'} mt-4`}>{property.description}</p>
          </div>
          <div className="mb-6 flex justify-between items-center">
            <div>
              <h3 className={`text-xl font-semibold mb-2 text-${darkMode ? 'white' : 'black'}`}>Amenities</h3>
              <div className={`flex flex-col gap-1  text-${darkMode ? 'gray-300' : 'gray-800'}`}>
                <span className=" font-semibold">starting from ₹{property.rent} </span>
                {editMode ? (
                  <>
                    <input
                      type="text"
                      name="numRooms"
                      value={updatedProperty.numRooms || ''}
                      onChange={handlePropertyChange}
                      placeholder="Number of rooms"
                      className={`bg-${darkMode ? 'gray-700' : 'gray-200'} text-${darkMode ? 'white' : 'black'} px-2 py-1 rounded`}
                    />
                    <input
                      type="text"
                      name="numBathrooms"
                      value={updatedProperty.numBathrooms || ''}
                      onChange={handlePropertyChange}
                      placeholder="Number of bathrooms"
                      className={`bg-${darkMode ? 'gray-700' : 'gray-200'} text-${darkMode ? 'white' : 'black'} px-2 py-1 rounded`}
                    />
                    <input
                      type="text"
                      name="propertyName"
                      value={updatedProperty.propertyName || ''}
                      onChange={handlePropertyChange}
                      placeholder="Property Name"
                      className={`bg-${darkMode ? 'gray-700' : 'gray-200'} text-${darkMode ? 'white' : 'black'} px-2 py-1 rounded`}
                    />
                  </>
                ) : (
                  <span>
                    {property.numRooms} rooms, {property.numBathrooms} bathrooms
                  </span>
                )}
              </div>
            </div>
            <button
              className={`bg-${darkMode ? 'blue-700' : 'blue-500'} hover:bg-${darkMode ? 'blue-600' : 'blue-700'} text-white font-bold py-2 px-4 rounded`}
              onClick={showImages}
            >
              Show Images
            </button>
          </div>
          {/* Contact owner section */}
          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center">
              <h3 className={`text-lg font-semibold mr-4 text-${darkMode ? 'white' : 'black'}`}>Contact Owner</h3>
              <div className="flex items-center">
                <span className={`font-semibold text-${darkMode ? 'gray-300' : 'gray-800'}`}>{owner.name}</span>
                <span className={` flex flex-row gap-1 ml-2 text-${darkMode ? 'gray-300' : 'gray-600'}`}>
                  <a
                    href={`mailto:${owner.email}`}
                    className={`text-${darkMode ? 'blue-400' : 'blue-500'} hover:underline`}
                  >
                    <div className='underline'>
                      {owner.email}
                    </div>
                  </a>
                  ,
                  <a
                    href={`tel:${owner.phone}`}
                    className={`ml-2 text-${darkMode ? 'blue-400' : 'blue-500'} hover:underline`}
                  >
                    <div className='underline'>
                      {owner.phone}
                    </div>
                  </a>
                </span>
              </div>
            </div>
            <div>
              <a href={`https://wa.me/${owner.phone}`} target="_blank" rel="noopener noreferrer">
                <img src="/whatsapp-icon-svg.svg" alt="WhatsApp" className="h-8 w-8 cursor-pointer" />
              </a>
            </div>
          </div>
          {editMode && (
            <div className="flex justify-end mt-6">
              <button
                className={`bg-${darkMode ? 'green-700' : 'green-500'} hover:bg-${darkMode ? 'green-600' : 'green-700'} text-black font-bold py-2 px-4 rounded`}
                onClick={handleUpdateProperty}
              >
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsScreen;