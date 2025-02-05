import scss from './GameBlock.module.scss';

import GamesScreenButton from './GamesScreenButton/GamesScreenButton';
import GamesScreenDescription from './GamesScreenDescription/GamesScreenDescription';
import GamesScreenDescriptionHidden from './GamesScreenDescriptionHidden/GamesScreenDescriptionHidden';
import GamesScreenGreedventoryLinks from './GamesScreenGreedventoryLinks/GamesScreenGreedventoryLinks';
import GamesScreenDescriptionGreedventory from './GamesScreenDescriptionGreedventory/GamesScreenDescriptionGreedventory';

export default function GameBlock({
  gamesInfo,
  expandedStates,
  toggleDescription,
  getDescriptionWithLinks,
}) {
  return (
    <div className={scss.gamesMain}>
      <div className={scss.gamesBlock}>
        <div className={scss.gamesImageblock}>
          <img className={scss.imageGame} src={gamesInfo.imageGame} alt={gamesInfo.nameGame} />
        </div>
        <div className={scss.gamesInfoBlock}>
          <h3 className={scss.nameGame}>{gamesInfo.nameGame}</h3>
          <div className={scss.gamesInfoBlockDescriptionAndButton}>
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
      />
    </div>
  );
}
