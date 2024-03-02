'use client'
import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './sliderStyle.css'; // Adjust the path as needed

  
function Slideshow() {
  // Settings for the slider
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div className='p-10  flex justify-center items-center'>
      <div style={{ maxWidth: '1200px', width: '100%' }} className="p-6 mx-auto">
        <div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-medium mb-10 text-center">ShopEasy Features</h2>
            {/* <p className="text-secondary-color text-sm md:text-base lg:text-xl xl:text-2xl text-center mb-4 mt-4">
              subtitle
            </p> */}
        </div>
        {/* <p className="mb-12 text-sm md:text-base lg:text-xl xl:text-2xl text-center text-secondary-color">Start with your practice’s overall MIPS score and top six measures. 
            Scroll to review scores for all measures and drill down for individual measure performance detail. 
            The heatmap and graphical view display performance visually and support further data analysis.
            Filter data by TIN, date, measure, and individual provider. 
            Download data to help support measure improvement activities.</p> */}
        <div className = "even-shadow m-0">
            <Slider {...settings}>
            <div>
                <img src="/img/slide1.png" alt="Slide 1" className="object-contain mx-auto" style={{ width: '100%', height: 'auto' }} />
            </div>
            <div>
                <img src="/img/slide2.png" alt="Slide 2" className="object-contain mx-auto" style={{ width: '100%', height: 'auto' }} />
            </div>
            </Slider>
        </div>
      </div>
    </div>
  );
}

export default Slideshow;
