import { useState } from 'react';
import scss from './GamesScreen.module.scss';
import GameBlock from './GameBlock/GameBlock';
import clsx from 'clsx';

export default function GamesScreen({ gamesInfo, architecturePageB, architecturePageWhiteColorB }) {
  const [expandedStates, setExpandedStates] = useState({});

  const toggleDescription = (id) => {
    setExpandedStates((prev) => ({
      ...prev,
      [id]: !prev[id], // Переключаем только для конкретного id
    }));
  };

  const getDescriptionWithLinks = (description) => {
    return description
      .replace(
        /\biOS\b/g,
        `<a href="${gamesInfo.linkOnGameIos}" target="_blank" rel="noopener noreferrer">iOS</a>`,
      )
      .replace(
        /\bAndroid\b/g,
        `<a href="${gamesInfo.linkOnGameGoogle}" target="_blank" rel="noopener noreferrer">Android</a>`,
      );
  };

  return (
    <div
      className={clsx(
        scss.gameBlockMain,
        architecturePageB && scss.center,
        architecturePageWhiteColorB && scss.margTop,
      )}>
      <div className={clsx(architecturePageB && scss.gameBlockMainB)}>
        {gamesInfo.fourGamesScreen.map((gamesInfo, index) => (
          <GameBlock
            key={index}
            gamesInfo={gamesInfo}
            expandedStates={expandedStates}
            toggleDescription={toggleDescription}
            getDescriptionWithLinks={getDescriptionWithLinks}
            architecturePageB={architecturePageB}
            architecturePageWhiteColorB={architecturePageWhiteColorB}
          />
        ))}
      </div>
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
