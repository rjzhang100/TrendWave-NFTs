import React from "react";
import "./ImageGallery.css";

const Photo = ({ src, alt, description }) => {
  console.log("description", description);
  return (
    <>
      <div className="image-container">
        <img className="image" src={src} alt={alt} />
        <div className="image-description">{description}</div>
      </div>
    </>
  );
};

function ImageGallery({ nfts }) {
  return (
    <div className="gallery-container">
      <h1>Photo Gallery</h1>
      <div className="gallery-grid">
        {/* {photos.map((photo, index) => (
          <Photo key={index} src={photo.src} alt={photo.alt} />
        ))} */}
        {nfts.map((nft, index) =>
          nft.metadata.description === "doggy" ||
          nft.metadata.description === "Doggy" ? (
            <></>
          ) : (
            <Photo
              key={index}
              src={nft.metadata.media}
              description={nft.metadata.description}
              alt="nft-pic"
            />
          )
        )}
      </div>
    </div>
  );
}

export default ImageGallery;
