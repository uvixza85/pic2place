import "./HighlightedCard.css"
import React from "react";

function ImageCard(props){
    
    return(
        <div>
            <img src={props.imgurl } className="highlight-card"    />
            {props.Latitude == null ?<h2>cant get location of this image</h2>:<h2>📍Location: {props.Latitude}</h2>};
        </div>
    );
}
export default ImageCard;