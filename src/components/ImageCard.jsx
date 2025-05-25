import React from "react";
import "./HighlightedCard.css"

function ImageCard(props){
    return(
        <div>
            <img src={props.imgurl } className="img-card"/>
            <h2>location</h2>
        </div>
    );
}
export default ImageCard;