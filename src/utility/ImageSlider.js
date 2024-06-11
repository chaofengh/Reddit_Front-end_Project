import React, { useState } from 'react';
import { ArrowBigLeft, ArrowBigRight, Circle, CircleDot } from 'lucide-react';
import './ImageSlider.css';

export const ImageSlider = ({ images }) => {
  const [imageIndex, setImageIndex] = useState(0);

  const showNextImage = () => {
    setImageIndex((index) => (index === images.length - 1 ? 0 : index + 1));
  };

  const showPrevImage = () => {
    setImageIndex((index) => (index === 0 ? images.length - 1 : index - 1));
  };

  return (
    <div aria-label="Image Slider" className="image-slider">
        <button
            onClick={showPrevImage}
            className="img-slider-btn prev"
            aria-label="View Previous Image"
        >
            <ArrowBigLeft aria-hidden />
        </button>
      <div className="image-container">


        {images.map(({ url, alt }, index) => (
          <img
            key={url}
            src={url}
            alt={alt}
            aria-hidden={imageIndex !== index}
            className="img-slider-img"
            style={{ transform: `translateX(${-100 * imageIndex}%)` }}
          />
        ))}

        
      </div>
      <button
            onClick={showNextImage}
            className="img-slider-btn next"
            aria-label="View Next Image">
            <ArrowBigRight aria-hidden />
        </button>

      <div className="dots-container">
        {images.map((_, index) => (
          <button
            key={index}
            className="img-slider-dot-btn"
            aria-label={`View Image ${index + 1}`}
            onClick={() => setImageIndex(index)}
          >
            {index === imageIndex ? (
              <CircleDot aria-hidden />
            ) : (
              <Circle aria-hidden />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

