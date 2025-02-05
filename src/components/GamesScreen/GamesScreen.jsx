import { useState } from 'react';
import scss from './GamesScreen.module.scss';
import GameBlock from './GameBlock/GameBlock';

export default function GamesScreen({ gamesInfo }) {
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
    <div className={scss.gameBlockMain}>
      {gamesInfo.fourGamesScreen.map((gamesInfo, index) => (
        <GameBlock
          key={index}
          gamesInfo={gamesInfo}
          expandedStates={expandedStates}
          toggleDescription={toggleDescription}
          getDescriptionWithLinks={getDescriptionWithLinks}
        />
      ))}
      <h6 className={scss.generalTextForGames}>{gamesInfo.fourGamesScreenGeneralText}</h6>
    </div>
  );
}
