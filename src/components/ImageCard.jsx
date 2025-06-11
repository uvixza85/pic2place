import React from "react";

function ImageCard(props){
    
    return(
        <div>
            <img src={props.imgurl }  className={props.className} onClick={props.onClick}  />
         </div>
    );
}
export default ImageCard;