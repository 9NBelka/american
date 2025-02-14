import { useState } from 'react';
import scss from './GamesScreen.module.scss';
import GameBlock from './GameBlock/GameBlock';
import clsx from 'clsx';
import GameScreenSliderPhone from './GameScreenSliderPhone/GameScreenSliderPhone';

export default function GamesScreen({ gamesInfo, architecturePageB, architecturePageWhiteColorB }) {
  const [expandedStates, setExpandedStates] = useState({});

  const toggleDescription = (id) => {
    setExpandedStates((prev) => ({
      ...prev,
      [id]: !prev[id], // Переключаем только для конкретного id
    }));
  };

  const architecturePageBGamePhone = true;

  return (
    <div
      className={clsx(
        scss.gameBlockMain,
        architecturePageB && scss.center,
        architecturePageWhiteColorB && scss.margTop,
      )}>
      <div
        className={clsx(
          architecturePageB && scss.gameBlockMainB,
          architecturePageWhiteColorB && scss.gameBlockMainB,
        )}>
        {gamesInfo.fourGamesScreen.map((gamesInfo, index) => (
          <GameBlock
            key={index}
            gamesInfo={gamesInfo}
            expandedStates={expandedStates}
            toggleDescription={toggleDescription}
            architecturePageB={architecturePageB}
            architecturePageWhiteColorB={architecturePageWhiteColorB}
          />
        ))}
      </div>
      {architecturePageWhiteColorB && (
        <div className={clsx(architecturePageBGamePhone && scss.architecturePageBGamePhone)}>
          <GameScreenSliderPhone
            gamesInfo={gamesInfo}
            expandedStates={expandedStates}
            toggleDescription={toggleDescription}
            architecturePageB={architecturePageB}
            architecturePageWhiteColorB={architecturePageWhiteColorB}
            architecturePageBGamePhone={architecturePageBGamePhone}
          />
        </div>
      )}

      <h6
        className={clsx(
          scss.generalTextForGames,
          architecturePageB && scss.generalTextForGamesB,
          architecturePageWhiteColorB && scss.generalTextForGamesWhiteColorB,
        )}>
        {gamesInfo.fourGamesScreenGeneralText}
      </h6>
    </div>
  );
}
