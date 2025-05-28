import React from 'react'
import { useState } from 'react';
import './App.css'
import ImageUpload from './components/ImageUpload';
import ImageCarousel from './components/ImageCarousel';
import ImageCard from './components/ImageCard';
import  { useEffect } from 'react';

function App() {
  
  const [selectedFile, setSelectedFile] = useState(null);
  const [images, setImages] = useState([]);
  const [Location , setLocation ] = useState(null);

      const handleFileChange = (fileObj) => {
        const {  url, Latitude, Longitude } = fileObj;

        setSelectedFile(url);
        setLocation(Latitude);
        console.log("File received:", url);
        console.log("Latitude received:", Latitude);
        console.log("Longitude received:", Longitude);

        setImages((prev) => [...prev, { 
          id: Date.now(), 
          imageurl: url,
          blob: url,
        location: Latitude }]);
        
        
        //console.log(images);

      };
      useEffect(() => {
        return () => {
          images.forEach(image => {
            if (image.imageurl.startsWith('blob:')) {
              URL.revokeObjectURL(image.imageurl);
            }
          });
        };
      }, []);

  return (
    <div className='mainpage'>
      <ImageUpload onFileSelect={handleFileChange}/>
      
      {selectedFile && (
      <>
        <ImageCard imgurl={selectedFile}  Latitude = {Location} className="dispimg" />
        
        <ImageCarousel imageurl={images}  />
      </>
      )
    }
      </div>
  )
   
}

export default App
