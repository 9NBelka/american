import clsx from 'clsx';
import scss from './GamesScreenDescriptionHidden.module.scss';

export default function GamesScreenDescriptionHidden({
  gamesInfo,
  isExpanded,
  architecturePageB,
  architecturePageWhiteColorB,
  architecturePageC,
}) {
  return (
    <>
      {gamesInfo.nameGame !== 'GREEDVENTORY' && (
        <div
          className={clsx(
            scss.expandedDescription,
            isExpanded && scss.show,
            architecturePageB && scss.expandedDescriptionB,
            architecturePageC && scss.expandedDescriptionC,
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
                    architecturePageC && scss.descriptionGameC,
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
