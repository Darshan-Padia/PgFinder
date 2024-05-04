import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';

const ShowImages = () => {
  const navigation = useNavigate();
  const { id } = useParams();
  const propertyId = id;
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const path = '/image_db/22/uploadedImages-1.png';
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(`/api/images/${propertyId}`);
        setImages(response.data);
        console.log('response:', response);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* <h2>Images for Property ID: {id}</h2> */}
      <div className="flex flex-col gap-4  justify-center items-center">
          {console.log('image:', images)}
        {images.map((image, index) => (
            `${console.log(`${path}${image.image}`)}`,
          <div
          className='w-1/2'
          >
            <img 
          key={index} 
          
        //   src= merget path with image.image
            src={`${image.image}`} alt={`Image ${index + 1}`} className="w-full h-auto" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowImages;
