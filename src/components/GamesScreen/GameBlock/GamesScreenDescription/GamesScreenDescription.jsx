import clsx from 'clsx';
import scss from './GamesScreenDescription.module.scss';

export default function GamesScreenDescription({ gamesInfo, searchLinks, architecturePageB }) {
  return (
    <div
      className={clsx(
        scss.descriptionGameBlock,
        gamesInfo.nameGame !== 'GREEDVENTORY'
          ? scss.descriptionGameBlock
          : scss.descriptionGameBlockWidth,
        architecturePageB && scss.descriptionGameBlockB,
      )}>
      <h5
        className={clsx(scss.descriptionGame, architecturePageB && scss.descriptionGameB)}
        dangerouslySetInnerHTML={{
          __html: searchLinks(gamesInfo.shortDescription),
        }}></h5>
    </div>
  );
}
