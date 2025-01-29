import { useState } from 'react';
import scss from './GamesScreen.module.scss';
import clsx from 'clsx';

export default function GamesScreen({ gamesInfo }) {
  return (
    <div className={scss.gameBlockMain}>
      {gamesInfo.fourGamesScreen.map((gamesInfo, index) => (
        <GameBlock key={index} gamesInfo={gamesInfo} />
      ))}
      <h6 className={scss.generalTextForGames}>{gamesInfo.fourGamesScreenGeneralText}</h6>
    </div>
  );
}

function GameBlock({ gamesInfo }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

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
    <div className={scss.gamesGap}>
      <div className={scss.gamesBlock}>
        <div className={scss.gamesImageblock}>
          <img className={scss.imageGame} src={gamesInfo.imageGame} alt={gamesInfo.nameGame} />
        </div>
        <div className={scss.gamesInfoBlock}>
          <h3 className={scss.nameGame}>{gamesInfo.nameGame}</h3>
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
                __html: getDescriptionWithLinks(gamesInfo.shortDescription),
              }}></h5>
          </div>
          {gamesInfo.nameGame !== 'GREEDVENTORY' ? (
            ''
          ) : (
            <div>
              <div className={scss.linkOnGameGreedventoryBlock}>
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
              <h5 className={clsx(scss.descriptionGame, scss.descriptionGameMarg)}>
                {gamesInfo.descriptionGame}
              </h5>
            </div>
          )}
          <button
            className={clsx(
              gamesInfo.nameGame !== 'GREEDVENTORY'
                ? scss.descriptionGameButton
                : scss.descriptionGameButtonHide,
            )}
            onClick={toggleDescription}>
            {isExpanded ? 'Hide' : 'Technically interesting:'}
          </button>
        </div>
      </div>
      {gamesInfo.nameGame !== 'GREEDVENTORY' ? (
        <div className={clsx(scss.expandedDescription, isExpanded ? scss.show : '')}>
          <ul>
            {gamesInfo.descriptionGame && gamesInfo.descriptionGame.length > 0 ? (
              gamesInfo.descriptionGame.map((description, index) => (
                <li key={index} className={scss.descriptionGame}>
                  {description}
                </li>
              ))
            ) : (
              <p className={scss.descriptionGame}>No additional description.</p>
            )}
          </ul>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}
