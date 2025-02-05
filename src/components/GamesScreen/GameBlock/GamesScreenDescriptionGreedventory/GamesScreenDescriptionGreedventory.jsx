import clsx from 'clsx';
import scss from './GamesScreenDescriptionGreedventory.module.scss';

export default function GamesScreenDescriptionGreedventory({ gamesInfo }) {
  return (
    <h5 className={clsx(scss.descriptionGameGreedventory, scss.descriptionGameMarg)}>
      {gamesInfo.descriptionGame}
    </h5>
  );
}
