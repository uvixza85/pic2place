import React from 'react'
import { useState } from 'react';
import './App.css'
import ImageUpload from './components/ImageUpload';
import ImageCarousel from './components/ImageCarousel';
import ImageCard from './components/ImageCard';
import MainCard from './components/MainCard';
import  { useEffect } from 'react';

function App() {
  
  const [SelectedImage, setSelectedImage] = useState(null);
  const [images, setImages] = useState([]);

      const handleFileChange = (fileObj) => {
        const { name, url, Location ,date ,time} = fileObj
        
        const newImage = {
          id: Date.now(),
          name,
          imageurl: url,
          blob: url,
          location: Location,
          date,
          time,
        };
    
        setImages((prev) => [...prev, newImage]);
        setSelectedImage(newImage);

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
      
      {SelectedImage && (
      <>
        <MainCard 
        imgurl={SelectedImage.imageurl}
        location={SelectedImage.location}
        date={SelectedImage.date}
        time={SelectedImage.time}
        name={SelectedImage.name}    className="dispimg" />
        
      </>
      )
    }
      </div>
  )
   
}

export default App
