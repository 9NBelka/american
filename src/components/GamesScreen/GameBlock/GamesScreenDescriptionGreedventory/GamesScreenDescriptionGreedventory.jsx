import clsx from 'clsx';
import scss from './GamesScreenDescriptionGreedventory.module.scss';

export default function GamesScreenDescriptionGreedventory({
  gamesInfo,
  architecturePageB,
  architecturePageWhiteColorB,
}) {
  return (
    <h5
      className={clsx(
        scss.descriptionGameGreedventory,
        scss.descriptionGameMarg,
        architecturePageB && scss.descriptionGameGreedventoryB,
        architecturePageWhiteColorB && scss.descriptionGameGreedventoryB,
      )}>
      {gamesInfo.descriptionGame}
    </h5>
  );
}
