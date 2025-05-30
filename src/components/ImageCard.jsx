import React from "react";

function ImageCard(props){
    
    return(
        <div>
            <img src={props.imgurl }  className={props.className}  />
        </div>
    );
}
export default ImageCard;