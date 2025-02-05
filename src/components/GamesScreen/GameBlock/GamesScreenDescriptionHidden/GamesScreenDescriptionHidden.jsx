import clsx from 'clsx';
import scss from './GamesScreenDescriptionHidden.module.scss';

export default function GamesScreenDescriptionHidden({ gamesInfo, isExpanded }) {
  return (
    <>
      {gamesInfo.nameGame !== 'GREEDVENTORY' && (
        <div className={clsx(scss.expandedDescription, isExpanded && scss.show)}>
          <ul>
            {gamesInfo.descriptionGame &&
              gamesInfo.descriptionGame.length > 0 &&
              gamesInfo.descriptionGame.map((description, index) => (
                <li key={index} className={scss.descriptionGame}>
                  {description}
                </li>
              ))}
          </ul>
        </div>
      )}
    </>
  );
}
