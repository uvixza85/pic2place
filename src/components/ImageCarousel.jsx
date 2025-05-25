import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "./coraousel.css"
import ImageCard from "./ImageCard";

function ImageCarousel({imageurl}){
    var settings = {
      dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
        arrows: true,
        adaptiveHeight: true,
        // Prevent clone stacking:
        cssEase: 'ease-out',
        useCSS: true,
        variableWidth: false, // Must be false for fixed sizing
        focusOnSelect: false,
        waitForAnimate: true
        
      };
      return (
        <div className="corouselwrap">
        <Slider  className="slide" {...settings}>
      {imageurl.map((item) => (
          <div key={item.id} className="card">
           
            <ImageCard imgurl={item.imageurl} />
          </div>
        ))}
        </Slider>
        </div>
        
      );
}
export default ImageCarousel