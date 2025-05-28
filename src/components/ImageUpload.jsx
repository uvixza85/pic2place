import React from "react";
import "./ImageUpload.css"
import ExifReader from "exifreader";
import heic2any from "heic2any";


function ImageUpload({ onFileSelect }){


    async function fileview(event){
        const selectedFile = event.target.files[0];
        var newurl; 

        try {

            if (selectedFile.type === "image/heic" || selectedFile.name.toLowerCase().endsWith(".heic")) {
                // Convert HEIC to JPEG Blob
                const convertedBlob = await heic2any({ blob: selectedFile, toType: "image/jpeg" });
                const fileToUse = new File([convertedBlob], selectedFile.name.replace(/\.heic$/i, ".jpeg"), { type: "image/jpeg" });
                newurl = URL.createObjectURL(fileToUse);
              } else {
                newurl = URL.createObjectURL(selectedFile);
              }

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