import React  , {useState}from "react";
import ImageCard from "./ImageCard";
import "./MainCard.css"

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Keyboard,Thumbs,EffectCreative } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-creative'
import 'swiper/css/keyboard'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'



function MainCard(props){
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [fullview , setfullview] = useState(false);

    const currentImage = props.images[activeIndex];

    
    

    return (
        <>
        <main>
          <div className="maincard">
            {/* Main Gallery */}
            <Swiper
              modules={[Navigation, Keyboard, Thumbs, EffectCreative]}
              thumbs={{ swiper: thumbsSwiper }}
              spaceBetween={10}
              slidesPerView={1}
              navigation
              effect="creative"
              keyboard
              className="main-swiper"
              onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            >
              {props.images.map((item) => (
                <SwiperSlide key={item.id}>
                    <div className="imageWrapper">
                  <ImageCard imgurl={item.imageurl} className="main-image" onClick={() => {
    console.log("Image clicked!");
    setfullview(true);
  }}/>
                  </div>
                </SwiperSlide>
                
              ))}
            </Swiper>
  
            {/* Description below gallery */}
            <div className="maincardcontent">
              <h2>📍{currentImage.location}</h2>
              <p>📅 {currentImage.date}  🕒 {currentImage.time}</p>
            </div>
            </div>
            {/* Thumbnail swiper */}
            <div className="thumbnail-wrapper"> 
            <Swiper
              modules={[Thumbs]}
              onSwiper={setThumbsSwiper}
              watchSlidesProgress
              spaceBetween={0}
              slidesPerView={Math.min(props.images.length, 5)}
              className="thumbs-swiper"
            >
              {props.images.map((item) => (
                <SwiperSlide key={`thumb-${item.id}`}>
                    
                  <ImageCard imgurl={item.imageurl} className="thumbnail-image" />
                 
                </SwiperSlide>
              ))}
            </Swiper>
             </div>
          
        </main>


        {fullview && (
    
        <div onClick={() => setfullview(false)} className="fullscreencontainer">
          <ImageCard imgurl={currentImage.imageurl} className="fullimage"/>  

      </div>)}

      </>
        );
}
export default MainCard