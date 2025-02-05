import clsx from 'clsx';
import scss from './GamesScreenButton.module.scss';

export default function GamesScreenButton({ gamesInfo, button, isExpanded }) {
  return (
    <button
      className={clsx(
        gamesInfo.nameGame !== 'GREEDVENTORY'
          ? scss.descriptionGameButton
          : scss.descriptionGameButtonHide,
      )}
      onClick={button}>
      {isExpanded ? 'Hide' : 'Technically interesting:'}
    </button>
  );
}
