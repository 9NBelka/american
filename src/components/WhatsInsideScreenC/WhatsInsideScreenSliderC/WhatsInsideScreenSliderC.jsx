import { BsArrowLeftShort, BsArrowRightShort } from 'react-icons/bs';
import scss from './WhatsInsideScreenSliderC.module.scss';
import { useState } from 'react';

export default function WhatsInsideScreenSliderC({ programCourseInfo }) {
  const modulesCount = 5;
  const columnsPerModule = 3;
  const lessonsPerModule = Math.ceil(programCourseInfo.insideScreen.length / modulesCount);

  const modules = Array.from({ length: modulesCount }, (_, moduleIndex) => {
    const startIdx = moduleIndex * lessonsPerModule;
    const moduleLessons = programCourseInfo.insideScreen.slice(
      startIdx,
      startIdx + lessonsPerModule,
    );

    const columns = Array.from({ length: columnsPerModule }, (_, colIndex) =>
      moduleLessons.filter((_, lessonIdx) => lessonIdx % columnsPerModule === colIndex),
    );
    return columns;
  });

  // Состояние для отслеживания текущего слайда
  const [currentSlide, setCurrentSlide] = useState(0);

  // Функции переключения слайдов
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === modulesCount - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? modulesCount - 1 : prev - 1));
  };

  return (
    <div className={scss.sliderContainer}>
      {/* Контейнер слайдов */}
      <div className={scss.sliderWrapper}>
        <div
          className={scss.slidesTrack}
          style={{
            transform: `translateX(-${currentSlide * 100}%)`,
            transition: 'transform 0.5s ease',
          }}>
          {modules.map((module, moduleIndex) => (
            <div key={moduleIndex} className={scss.moduleBlock}>
              <h3>
                Module {moduleIndex + 1}:{' '}
                <span className={scss.colorWhite}>
                  {module.flat().find((lesson) => lesson)?.insideScreenModuleTitle}
                </span>
              </h3>
              <div className={scss.moduleColumns}>
                {module.map((column, colIndex) => (
                  <div key={colIndex} className={scss.insideScreenBlock}>
                    {column.map((info, lessonIndex) => (
                      <div key={lessonIndex} className={scss.insideScreenTitleAndContent}>
                        <img src={info.insideScreenImage} alt={`image ${info.insideScreenTitle}`} />
                        <h3>{info.insideScreenTitle}</h3>
                        <h5>{info.insideScreenContent}</h5>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Кнопки управления */}
      <div className={scss.sliderControls}>
        <button onClick={prevSlide} className={scss.sliderButton}>
          <BsArrowLeftShort className={scss.sliderIcon} />
          Back
        </button>
        <div className={scss.slideCounter}>
          {currentSlide + 1} / {modulesCount}
        </div>
        <button onClick={nextSlide} className={scss.sliderButton}>
          Next <BsArrowRightShort className={scss.sliderIcon} />
        </button>
      </div>
    </div>
  );
}
