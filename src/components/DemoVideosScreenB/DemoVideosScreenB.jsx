import { useState } from 'react';
import scss from './DemoVideosScreenB.module.scss';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';

export default function DemoVideosScreenB({ demoVideos }) {
  const totalSlides = demoVideos.demoVideos.demoVideosTitle.length;
  const [currentIndex, setCurrentIndex] = useState(1); // Начинаем с 1

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev < totalSlides ? prev + 1 : prev));
  };

  return (
    <div className={scss.sliderContainer}>
      <div className={scss.sliderText}>
        <span>
          {currentIndex <= 9 ? '0' + currentIndex : currentIndex}/
          {totalSlides <= 9 ? '0' + totalSlides : totalSlides}
        </span>
        <h3>{demoVideos.demoVideos.demoVideosTitle[currentIndex - 1]}</h3>
        <p>{demoVideos.demoVideos.demoVideosDescription[currentIndex - 1]}</p>
        <div className={scss.sliderControls}>
          <button onClick={prevSlide} disabled={currentIndex === 1}>
            <BsArrowLeft className={scss.icon} />
          </button>
          <button onClick={nextSlide} disabled={currentIndex === totalSlides}>
            <BsArrowRight className={scss.icon} />
          </button>
        </div>
      </div>
      <div className={scss.sliderVideo}>
        <iframe
          src={demoVideos.demoVideos.demoVideosLink[currentIndex - 1]}
          title='Demo Video'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen></iframe>
      </div>
    </div>
  );
}
