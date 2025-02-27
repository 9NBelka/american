import { useState } from 'react';
import scss from './GamesScreenC.module.scss';
import GameBlockC from './GameBlockC/GameBlockC';
import GameBlock from '../GamesScreen/GameBlock/GameBlock';

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
      <div className={scss.displayPc}>
        <div className={scss.gamesMain}>
          {gamesInfo.fourGamesScreen.slice(0, 4).map((game, index) => (
            <GameBlockC
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
            <GameBlockC
              key={4}
              greedventory={greedventory}
              toggleDescription={toggleDescription}
              gamesInfo={gamesInfo.fourGamesScreen[4]}
              expandedStates={expandedStates}
              architecturePageC={architecturePageC}
            />
          )}
        </div>
        <h6 className={scss.generalTextForGames}>{gamesInfo.fourGamesScreenGeneralText}</h6>
      </div>
      <div className={scss.displayTablet}>
        {gamesInfo.fourGamesScreen.map((gamesInfo, index) => (
          <GameBlock
            key={index}
            greedventory={greedventory}
            toggleDescription={toggleDescription}
            gamesInfo={gamesInfo}
            expandedStates={expandedStates}
            architecturePageC={architecturePageC}
          />
        ))}
        <h6 className={scss.generalTextForGames}>{gamesInfo.fourGamesScreenGeneralText}</h6>
      </div>
    </>
  );
}
