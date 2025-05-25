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

      const handleFileChange = (file) => {
        setSelectedFile(file);
        console.log('File received in App.jsx:', file);
        setImages((prev) => [...prev, { id: Date.now(), 
          imageurl: file,
          blob: file }]);
        
        
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
        <ImageCard imgurl={selectedFile} className="dispimg" />
        
        <ImageCarousel imageurl={images} />
      </>
      )
    }
      </div>
  )
   
}

export default App
