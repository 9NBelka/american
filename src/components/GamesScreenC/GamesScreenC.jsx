import { useState } from 'react';
import scss from './GamesScreenC.module.scss';
import GameBlock from './GameBlock/GameBlock';

export default function GamesScreenC({ gamesInfo, architecturePageC }) {
  const [expandedStates, setExpandedStates] = useState({});

  const toggleDescription = (id) => {
    setExpandedStates((prev) => ({
      ...prev,
      [id]: !prev[id], // Переключаем только для конкретного id
    }));
  };

  const greedventory = true;
  return (
    <>
      <div className={scss.gamesMain}>
        {gamesInfo.fourGamesScreen.slice(0, 4).map((game, index) => (
          <GameBlock
            key={index}
            toggleDescription={toggleDescription}
            gamesInfo={game}
            expandedStates={expandedStates}
            architecturePageC={architecturePageC}
          />
        ))}
      </div>
      <div className={scss.fifthGame}>
        {gamesInfo.fourGamesScreen[4] && (
          <GameBlock
            key={4}
            greedventory={greedventory}
            toggleDescription={toggleDescription}
            gamesInfo={gamesInfo.fourGamesScreen[4]}
            expandedStates={expandedStates}
            architecturePageC={architecturePageC}
          />
        )}
      </div>
    </>
  );
}
