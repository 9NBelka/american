import clsx from 'clsx';
import scss from './GamesScreenDescription.module.scss';

export default function GamesScreenDescription({ gamesInfo, searchLinks }) {
  return (
    <div
      className={clsx(
        scss.descriptionGameBlock,
        gamesInfo.nameGame !== 'GREEDVENTORY'
          ? scss.descriptionGameBlock
          : scss.descriptionGameBlockWidth,
      )}>
      <h5
        className={scss.descriptionGame}
        dangerouslySetInnerHTML={{
          __html: searchLinks(gamesInfo.shortDescription),
        }}></h5>
    </div>
  );
}
