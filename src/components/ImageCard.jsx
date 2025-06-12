import React from "react";

function ImageCard(props){
    
    return(
        
            <img src={props.imgurl }  className={props.className} onClick={props.onClick}  />
         
    );
}
export default ImageCard;