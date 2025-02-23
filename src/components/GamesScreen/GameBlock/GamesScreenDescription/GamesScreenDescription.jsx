import clsx from 'clsx';
import scss from './GamesScreenDescription.module.scss';

export default function GamesScreenDescription({
  gamesInfo,
  architecturePageB,
  architecturePageWhiteColorB,
  architecturePageC,
}) {
  const getDescriptionWithLinks = (description) => {
    return description
      .replace(
        /\biOS\b/g,
        `<a href="${gamesInfo.linkOnGameIos}" target="_blank" rel="noopener noreferrer">iOS</a>`,
      )
      .replace(
        /\bAndroid\b/g,
        `<a href="${gamesInfo.linkOnGameGoogle}" target="_blank" rel="noopener noreferrer">Android</a>`,
      );
  };

  return (
    <div
      className={clsx(
        scss.descriptionGameBlock,
        gamesInfo.nameGame !== 'GREEDVENTORY'
          ? scss.descriptionGameBlock
          : scss.descriptionGameBlockWidth,
        architecturePageB && scss.descriptionGameBlockB,
        architecturePageWhiteColorB && scss.descriptionGameBlockB,
        architecturePageC && scss.descriptionGameBlockC,
      )}>
      <h5
        className={clsx(
          scss.descriptionGame,
          architecturePageB && scss.descriptionGameB,
          architecturePageWhiteColorB && scss.descriptionGameB,
          architecturePageC && scss.descriptionGameC,
        )}
        dangerouslySetInnerHTML={{
          __html: getDescriptionWithLinks(gamesInfo.shortDescription),
        }}></h5>
    </div>
  );
}
