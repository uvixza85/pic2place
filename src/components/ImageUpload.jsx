import React from "react";
import HighlightedCard from "./HighlightedCard";
import { useState } from "react";
import "./ImageUpload.css"


function ImageUpload(){
const [imagefile  , setImageFile] = useState(null);
const[fileuploaded ,setFileuploaded] = useState(false)

    async function fileview(event){
        const selectedFile = event.target.files[0];
        const newurl = URL.createObjectURL(selectedFile);
        setImageFile(newurl);
        setFileuploaded(true);
        
    }
    return ( 
    
    <div>
        
    <div className = "uploadimg">
    <h1>upload image</h1>
    <input type='file' onChange= {fileview} />
    </div>
    {fileuploaded}? <HighlightedCard imgurl= {imagefile}/>
    
    </div>)
          
    
}

export default ImageUpload;