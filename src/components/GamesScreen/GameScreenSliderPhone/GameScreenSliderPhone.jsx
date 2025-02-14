import { useState } from 'react';
import scss from './GameScreenSliderPhone.module.scss';

// import clsx from 'clsx';
import GameBlock from '../GameBlock/GameBlock';

export default function GameScreenSliderPhone({
  gamesInfo,
  expandedStates,
  toggleDescription,

  architecturePageB,
  architecturePageWhiteColorB,
  architecturePageBGamePhone,
}) {
  const [index, setIndex] = useState(0);
  const totalGames = gamesInfo.fourGamesScreen.length;

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % totalGames);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + totalGames) % totalGames);
  };

  return (
    <div className={scss.sliderContainer}>
      <div className={scss.sliderWrapper}>
        <div className={scss.sliderInner} style={{ transform: `translateX(-${index * 100}%)` }}>
          {gamesInfo.fourGamesScreen.map((game, idx) => (
            <div key={idx} className={scss.slide}>
              <GameBlock
                gamesInfo={game}
                expandedStates={expandedStates}
                toggleDescription={toggleDescription}
                architecturePageB={architecturePageB}
                architecturePageWhiteColorB={architecturePageWhiteColorB}
                prevSlide={prevSlide}
                nextSlide={nextSlide}
                architecturePageBGamePhone={architecturePageBGamePhone}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
