import clsx from 'clsx';
import GamesScreenButton from '../../GamesScreen/GameBlock/GamesScreenButton/GamesScreenButton';
import GamesScreenDescription from '../../GamesScreen/GameBlock/GamesScreenDescription/GamesScreenDescription';
import GamesScreenDescriptionGreedventory from '../../GamesScreen/GameBlock/GamesScreenDescriptionGreedventory/GamesScreenDescriptionGreedventory';
import GamesScreenDescriptionHidden from '../../GamesScreen/GameBlock/GamesScreenDescriptionHidden/GamesScreenDescriptionHidden';
import GamesScreenGreedventoryLinks from '../../GamesScreen/GameBlock/GamesScreenGreedventoryLinks/GamesScreenGreedventoryLinks';
import scss from './GameBlockC.module.scss';

export default function GameBlockC({
  gamesInfo,
  expandedStates,
  toggleDescription,
  architecturePageC,
  greedventory,
}) {
  return (
    <>
      <div className={clsx(scss.gamesBlock, greedventory && scss.gamesBlockGreedVentory)}>
        <div className={scss.gamesImageblock}>
          {greedventory ? (
            <img
              className={scss.imageGame}
              src={gamesInfo.imageGameGVFullSize}
              alt={gamesInfo.nameGame}
            />
          ) : (
            <img className={scss.imageGame} src={gamesInfo.imageGame} alt={gamesInfo.nameGame} />
          )}
        </div>
        <div className={scss.gamesInfoBlock}>
          <h3 className={scss.nameGame}>{gamesInfo.nameGame}</h3>
          <div className={scss.gamesInfoBlockDescriptionAndButton}>
            <GamesScreenDescription gamesInfo={gamesInfo} architecturePageC={architecturePageC} />
            {gamesInfo.nameGame === 'GREEDVENTORY' && (
              <div>
                <GamesScreenGreedventoryLinks
                  gamesInfo={gamesInfo}
                  architecturePageC={architecturePageC}
                />
                <GamesScreenDescriptionGreedventory
                  gamesInfo={gamesInfo}
                  architecturePageC={architecturePageC}
                />
              </div>
            )}
            <GamesScreenButton
              gamesInfo={gamesInfo}
              button={() => toggleDescription(gamesInfo.id)}
              isExpanded={!!expandedStates[gamesInfo.id]}
              architecturePageC={architecturePageC}
            />
          </div>
        </div>
        <GamesScreenDescriptionHidden
          gamesInfo={gamesInfo}
          isExpanded={!!expandedStates[gamesInfo.id]}
          architecturePageC={architecturePageC}
        />
      </div>
    </>
  );
}
