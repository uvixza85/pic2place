import React from "react";
import "./imageUpload.css"
import ExifReader from "exifreader";
import heic2any from "heic2any";
import { useState } from "react";

async function nearbySearch(latitude,longitude) {
  
    //@ts-ignore
    const { Place, SearchNearbyRankPreference } = await google.maps.importLibrary(
      "places",
    );
    
    // Restrict within the map viewport.
    let center = new google.maps.LatLng(latitude,longitude );
    const request = {
      // required parameters
      fields: ["displayName", "location"],
      locationRestriction: {
        center: center,
        radius: 500,
      },
      // optional parameters
      excludedPrimaryTypes:["car_rental",
        "gas_station",
        "parking",
        "atm",
        "bank",
        "bus_station",
        "train_station",
        "hospital",
        "hotel",
        "shopping_mall",
        "supermarket",
        "gym",
        "airport",
    ],
      maxResultCount: 2,
      rankPreference: SearchNearbyRankPreference.DISTANCE,
      language: "en-US",
      region: "us",
    };
    //@ts-ignore
    const { places } = await Place.searchNearby(request);
  
    if (places.length) {
      return places[0].displayName
    } else {
      console.log("No results");
    }
  }


function ImageUpload({ onFileSelect }){
 const [uploaded , setUploaded] = useState(false);

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
              setUploaded(true)
            const name = selectedFile.name;
            const arrayBuffer = await selectedFile.arrayBuffer();
            const tags =  ExifReader.load(arrayBuffer, { expanded: true });
            const datetimeStr = tags.exif.DateTime.value;
            const latitude = tags.gps.Latitude
            const longitude = tags.gps.Longitude

            const [rawDate, rawtime] = datetimeStr[0].split(" ");
            
            const [year, month, day] = rawDate.split(":").map(Number);
            
            const dateObj = new Date(year, month - 1, day);
            const formattedDate = dateObj.toLocaleDateString("en-GB", {
              weekday: 'long',
              day: "numeric",
              month: "long",
              year: "numeric",
            });
            const [hours, minutes] = rawtime.split(":");
            const formattedTime = `${hours}:${minutes}`;

            

            const location = nearbySearch(latitude, longitude);
            onFileSelect({
              name : name,
                url: newurl,
                Location :location,
                date:formattedDate ,
                time: formattedTime 
                
              });
              
    
        } 
        catch (err) {
            
            console.error("Error reading EXIF:", err);
            onFileSelect({
                url: newurl,
                Location:null,
            });
        
        } 
    }
    return ( 

    <div>
      <h1 className="mainheading">🧭SnappyMap</h1> 
     { (uploaded == true) ? <div className = "uploadedimg"> <label>
      <input type='file' onChange= {fileview} 
        hidden/>
        <img src="/images/uploaderm.png"  className="imagelogo1"/>
        </label>
       </div>
       :<div className = "uploadimg">
    <h1>upload Image </h1>
    <label className="impir">
    <input type='file' onChange= {fileview}  
        hidden/>
        <img src="/images/uploaderm.png"  className="imagelogo"/>
        </label>
    </div>}

    
    </div>);
          
    
}

export default ImageUpload;