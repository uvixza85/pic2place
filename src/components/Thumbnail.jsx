import React from "react";
import ImageCard from "./ImageCard"; // Ensure this path is correct
import "./Thumbnail.css"; // Optional: your thumbnail styles

const Thumbnail = ({ images, onSelect ,selectedImage }) => {
  return (
    <div className="thumbnail-container">
      {images.map((item) => (
        <div
          key={item.id}
          className={`thumbnail-card ${selectedImage?.id === item.id ? "selected" : ""}`}
          onClick={() => onSelect(item)}>
          <ImageCard imgurl={item.imageurl} className="thumbnail-image" />
        </div>
      ))}
    </div>
  );
};

export default Thumbnail;