import React, { useState } from 'react';
import { useAuth } from '@clerk/clerk-react';
import axios from 'axios';

const SaveCanvas = ({ canvasData, setSave }) => {
  const { getToken } = useAuth();
  const [name, setName] = useState("");

  const handleSave = async () => {
    try {
      const token = await getToken();
   
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/user/add-canvas`,
        {
          canvasData,
          name, 
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true
        }
      );

      if (response.data.success) {
        console.log('Canvas saved:', response.data);
      }
    } catch (error) {
      console.error('Error saving canvas:', error);
    } finally {
      setSave(false);
    }
  };
  

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/20'>
<div className='w-[40%] h-fit bg-gray-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center gap-4 p-4 rounded-md'>
      <h1 className="text-white text-xl font-semibold">Save Canvas</h1>
      <input
        type="text"
        placeholder='Enter project name'
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 rounded-md active:bg-white"
        
      />
    <div className="w-full flex flex-wrap justify-end items-center gap-3">
  <button
    className="bg-gray-200 text-gray-700 hover:bg-gray-300 px-4 py-2 rounded-lg transition-colors"
    onClick={() => setSave(false)}
  >
    Cancel
  </button>
  <button
    className={`px-4 py-2 rounded-lg text-white transition-colors ${
      name.trim()
        ? 'bg-green-600 hover:bg-green-700'
        : 'bg-green-300 cursor-not-allowed'
    }`}
    onClick={handleSave}
    disabled={!name.trim()}
  >
    Save
  </button>
</div>

    </div>
    </div>
  );
};

export default SaveCanvas;
