import clsx from 'clsx';
import scss from './GamesScreenDescriptionGreedventory.module.scss';

export default function GamesScreenDescriptionGreedventory({
  gamesInfo,
  architecturePageB,
  architecturePageWhiteColorB,
  architecturePageC,
}) {
  return (
    <h5
      className={clsx(
        scss.descriptionGameGreedventory,
        scss.descriptionGameMarg,
        architecturePageB && scss.descriptionGameGreedventoryB,
        architecturePageWhiteColorB && scss.descriptionGameGreedventoryB,
        architecturePageC && scss.descriptionGameGreedventoryC,
      )}>
      {gamesInfo.descriptionGame}
    </h5>
  );
}
