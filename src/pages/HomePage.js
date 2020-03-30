import React from 'react';
import ImageSlider from '../components/ImageSlider';
import { StateProvider } from '../ImageContext';
import ImageDetails from '../components/ImageDetails';

function HomePage() {
  return (
    <div className="home-page">
      <StateProvider>
        <ImageSlider></ImageSlider>
        <ImageDetails></ImageDetails>
      </StateProvider>
    </div>
  );
}

export default HomePage;