import React, { useState } from "react";
import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";
import { propertyState } from "./Atom/PropertyStateAtom";

const AddImages = () => {
  const [property, setProperty] = useRecoilState(propertyState);
  const propertyId = property.propertyId;
  const [files, setFiles] = useState([]);
  const [uploadStatus, setUploadStatus] = useState(null);

  const handleFileChange = (e) => {
    setFiles(e.target.files);
    // Reset upload status when new files are selected
    setUploadStatus(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    // Append files
    for (let i = 0; i < files.length; i++) {
      formData.append("uploadedImages", files[i]);
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          params: {
            propertyId: propertyId,
          },
        }
      );
      console.log(response.data);
      setUploadStatus("Images uploaded successfully!");
    } catch (error) {
      console.error(error);
      setUploadStatus("Failed to upload images. Please try again.");
    }
  };

  return (
    <div
    className="flex justify-center items-center h-screen bg-gray-200"
    >
      <div className=" flex justify-center items-center max-w-md mx-auto">
      <form
       onSubmit={handleSubmit} className="space-y-4">
        <input type="file" multiple onChange={handleFileChange} className="border rounded-md px-4 py-2 w-full" />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Upload</button>
      </form>
      {uploadStatus && <div className="bg-gray-100 border border-gray-300 rounded-md p-4">{uploadStatus}</div>}
    </div>
    </div>
  );
};

export default AddImages;
