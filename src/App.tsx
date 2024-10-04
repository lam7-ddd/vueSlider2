import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Autoplay, Parallax } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/parallax';
import './App.css';

interface SlideData {
  id: number;
  imageUrl: string;
  comment: string;
}

const App: React.FC = () => {
  const [slides, setSlides] = useState<SlideData[]>([]);
  const [backgroundImages, setBackgroundImages] = useState<string[]>([]);

  useEffect(() => {
    fetch('/slides.json')
      .then(response => response.json())
      .then(data => {
        setSlides(data.slides);
        setBackgroundImages(data.backgroundImages);
      })
      .catch(error => console.error('Error loading slide data:', error));
  }, []);

  return (
    <div className="app">
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop={true}
        modules={[EffectCoverflow, Autoplay]}
        className="mySwiper"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="slide-content">
              <div className="image-container">
                <img src={slide.imageUrl} alt={`Slide ${slide.id}`} />
              </div>
              <div className="comment-container">
                <p className="slide-comment">{slide.comment}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        speed={5000}
        autoplay={{
          delay: 1,
          disableOnInteraction: false,
        }}
        loop={true}
        modules={[Autoplay, Parallax]}
        className="background-swiper"
        parallax={true}
      >
        {backgroundImages.map((imageUrl, index) => (
          <SwiperSlide key={index}>
            <div className="parallax-bg" data-swiper-parallax="-23%">
              <img src={imageUrl} alt={`Background ${index + 1}`} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default App;