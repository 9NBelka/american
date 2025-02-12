import scss from './GameBlock.module.scss';

import GamesScreenButton from './GamesScreenButton/GamesScreenButton';
import GamesScreenDescription from './GamesScreenDescription/GamesScreenDescription';
import GamesScreenDescriptionHidden from './GamesScreenDescriptionHidden/GamesScreenDescriptionHidden';
import GamesScreenGreedventoryLinks from './GamesScreenGreedventoryLinks/GamesScreenGreedventoryLinks';
import GamesScreenDescriptionGreedventory from './GamesScreenDescriptionGreedventory/GamesScreenDescriptionGreedventory';
import clsx from 'clsx';

export default function GameBlock({
  gamesInfo,
  expandedStates,
  toggleDescription,
  getDescriptionWithLinks,
  architecturePageB,
  architecturePageWhiteColorB,
}) {
  return (
    <div className={clsx(scss.gamesMain, architecturePageB && scss.gamesMainB)}>
      <div className={clsx(scss.gamesBlock, architecturePageB && scss.gamesBlockB)}>
        <div className={scss.gamesImageblock}>
          <img className={scss.imageGame} src={gamesInfo.imageGame} alt={gamesInfo.nameGame} />
        </div>
        <div className={clsx(scss.gamesInfoBlock, architecturePageB && scss.gamesInfoBlockB)}>
          <h3
            className={clsx(
              scss.nameGame,
              architecturePageB && scss.nameGameB,
              architecturePageWhiteColorB && scss.nameGameB,
            )}>
            {gamesInfo.nameGame}
          </h3>
          <div className={scss.gamesInfoBlockDescriptionAndButton}>
            <GamesScreenDescription
              gamesInfo={gamesInfo}
              searchLinks={getDescriptionWithLinks}
              architecturePageB={architecturePageB}
              architecturePageWhiteColorB={architecturePageWhiteColorB}
            />
            {gamesInfo.nameGame === 'GREEDVENTORY' && (
              <div>
                <GamesScreenGreedventoryLinks
                  gamesInfo={gamesInfo}
                  architecturePageB={architecturePageB}
                  architecturePageWhiteColorB={architecturePageWhiteColorB}
                />
                <GamesScreenDescriptionGreedventory
                  gamesInfo={gamesInfo}
                  architecturePageB={architecturePageB}
                  architecturePageWhiteColorB={architecturePageWhiteColorB}
                />
              </div>
            )}
            <GamesScreenButton
              gamesInfo={gamesInfo}
              button={() => toggleDescription(gamesInfo.id)}
              isExpanded={!!expandedStates[gamesInfo.id]}
              architecturePageB={architecturePageB}
              architecturePageWhiteColorB={architecturePageWhiteColorB}
            />
          </div>
        </div>
      </div>
      <div className={scss.gamesInfoBlockDescriptionAndButtonPhone}>
        <GamesScreenDescription gamesInfo={gamesInfo} searchLinks={getDescriptionWithLinks} />
        {gamesInfo.nameGame === 'GREEDVENTORY' && (
          <div>
            <GamesScreenGreedventoryLinks gamesInfo={gamesInfo} />
            <GamesScreenDescriptionGreedventory gamesInfo={gamesInfo} />
          </div>
        )}
        <GamesScreenButton
          gamesInfo={gamesInfo}
          button={() => toggleDescription(gamesInfo.id)}
          isExpanded={!!expandedStates[gamesInfo.id]}
        />
      </div>
      <GamesScreenDescriptionHidden
        gamesInfo={gamesInfo}
        isExpanded={!!expandedStates[gamesInfo.id]}
        architecturePageB={architecturePageB}
        architecturePageWhiteColorB={architecturePageWhiteColorB}
      />
    </div>
  );
}
