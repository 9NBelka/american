import clsx from 'clsx';
import scss from './GamesScreenButton.module.scss';

export default function GamesScreenButton({
  gamesInfo,
  button,
  isExpanded,
  architecturePageB,
  architecturePageWhiteColorB,
  architecturePageC,
}) {
  return (
    <button
      className={clsx(
        gamesInfo.nameGame !== 'GREEDVENTORY'
          ? scss.descriptionGameButton
          : scss.descriptionGameButtonHide,
        architecturePageB && scss.descriptionGameButtonB,
        architecturePageWhiteColorB && scss.descriptionGameButtonB,
        architecturePageC && scss.descriptionGameButtonC,
      )}
      onClick={button}>
      {isExpanded ? 'Hide' : 'Technically interesting:'}
    </button>
  );
}
