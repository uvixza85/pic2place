import React from "react";

import { useState } from "react";
import "./ImageUpload.css"
import App from "../App";


function ImageUpload({ onFileSelect }){


    async function fileview(event){
        const selectedFile = event.target.files[0];
        const newurl = URL.createObjectURL(selectedFile);
        onFileSelect(newurl);
        
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