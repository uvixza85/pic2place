import React from "react";
import "./ImageUpload.css"
//import App from "../App";
import ExifReader from "exifreader";


function ImageUpload({ onFileSelect }){


    async function fileview(event){
        const selectedFile = event.target.files[0];
        const newurl = URL.createObjectURL(selectedFile);


        try {
            const arrayBuffer = await selectedFile.arrayBuffer();
            const tags =  ExifReader.load(arrayBuffer, { expanded: true });
            const latitude = tags.gps.Latitude
            const longitude = tags.gps.Longitude
            console.log(latitude );
            console.log(longitude);
            onFileSelect({
                url: newurl,
                Latitude: latitude,
                Longitude: longitude
              });
    
          } catch (err) {
            
            console.error("Error reading EXIF:", err);
            onFileSelect({
                url: newurl,
                Latitude: null,
                Longitude: null,
            });
        
          }


        
        
    }
    return ( 
    
    <div>
        
    <div className = "uploadimg">
    <h1>upload image</h1>
    <input type='file' onChange= {fileview} />
    </div>
    </div>)
          
    
}

export default ImageUpload;