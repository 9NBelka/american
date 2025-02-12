import clsx from 'clsx';
import scss from './GamesScreenDescriptionHidden.module.scss';

export default function GamesScreenDescriptionHidden({
  gamesInfo,
  isExpanded,
  architecturePageB,
  architecturePageWhiteColorB,
}) {
  return (
    <>
      {gamesInfo.nameGame !== 'GREEDVENTORY' && (
        <div
          className={clsx(
            scss.expandedDescription,
            isExpanded && scss.show,
            architecturePageB && scss.expandedDescriptionB,
          )}>
          <ul>
            {gamesInfo.descriptionGame &&
              gamesInfo.descriptionGame.length > 0 &&
              gamesInfo.descriptionGame.map((description, index) => (
                <li
                  key={index}
                  className={clsx(
                    scss.descriptionGame,
                    architecturePageB && scss.descriptionGameB,
                    architecturePageWhiteColorB && scss.descriptionGameB,
                  )}>
                  {description}
                </li>
              ))}
          </ul>
        </div>
      )}
    </>
  );
}
