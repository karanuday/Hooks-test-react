import React from 'react';
import CustomCarousel from './Carousel';
import ImageContext from '../ImageContext';

function ImageSlider() {
  return (
    <div className="slider">
      <h3>Images</h3>
      <hr/>
      <ImageContext.Consumer>
        {
          context => {
            return <CustomCarousel items={context.images} onClick={context.selectImage}></CustomCarousel>;
          }
        }
      </ImageContext.Consumer>
    </div>
  );
}

export default ImageSlider;