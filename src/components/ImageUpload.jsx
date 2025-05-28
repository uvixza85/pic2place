import React from "react";
import "./ImageUpload.css"
import ExifReader from "exifreader";
import heic2any from "heic2any";

async function nearbySearch(latitude,longitude) {
  
    //@ts-ignore
    const { Place, SearchNearbyRankPreference } = await google.maps.importLibrary(
      "places",
    );
    
    // Restrict within the map viewport.
    let center = new google.maps.LatLng(latitude,longitude );
    const request = {
      // required parameters
      fields: ["displayName", "location", "businessStatus","types"],
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
      console.log(places[0].displayName);
      console.log(places[0].types);
      return places[0].displayName
      // Loop through and get all the results.
    } else {
      console.log("No results");
    }
  }


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
            const location = nearbySearch(latitude, longitude);
            console.log(location);
            onFileSelect({
                url: newurl,
                Location :location
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
        
    <div className = "uploadimg">
    <h1>upload image</h1>
    <input type='file' onChange= {fileview} />
    </div>
    </div>)
          
    
}

export default ImageUpload;