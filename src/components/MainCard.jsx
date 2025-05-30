import React from "react";
import ImageCard from "./ImageCard";
import "./MainCard.css"

function MainCard(props){
    return (
        <div className="maincard">

    <ImageCard className="image" imgurl={props.imgurl} /> 
    <div className="maincardcontent">
        <h2> {props.location} </h2>
        <p>{props.date} <br/>
        {props.time}
        </p>
    </div>
    </div>)
}
export default MainCard