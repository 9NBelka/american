import clsx from 'clsx';
import scss from './GamesScreenGreedventoryLinks.module.scss';

export default function GamesScreenGreedventoryLinks({
  gamesInfo,
  architecturePageB,
  architecturePageWhiteColorB,
  architecturePageC,
}) {
  return (
    <div
      className={clsx(
        scss.linkOnGameGreedventoryBlock,
        architecturePageB && scss.linkOnGameGreedventoryBlockB,
        architecturePageWhiteColorB && scss.linkOnGameGreedventoryBlockB,
        architecturePageC && scss.linkOnGameGreedventoryBlockC,
      )}>
      {gamesInfo.linksGame.includes('Steam') && (
        <a href={gamesInfo.linkOnGameSteam} target='_blank' rel='noopener noreferrer'>
          <h6 className={scss.linkOnGameGreedventory}>Steam,</h6>
        </a>
      )}
      {gamesInfo.linksGame.includes('GOG') && (
        <a href={gamesInfo.linkOnGameGoG} target='_blank' rel='noopener noreferrer'>
          <h6 className={scss.linkOnGameGreedventory}>GOG</h6>
        </a>
      )}
    </div>
  );
}
