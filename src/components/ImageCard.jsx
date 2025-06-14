import React from "react";

function ImageCard(props){
    return(
        
        <>
        {props.isVideo ? (
          <video
            src={props.imgurl}
            className={props.className}
            controls
            onClick={props.onClick}
          />
        ) : (
          <img
            src={props.imgurl}
            className={props.className}
            onClick={props.onClick}
            alt="media"
          />
        )}
      </>
         
    );
}
export default ImageCard;