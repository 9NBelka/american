import scss from './GameBlock.module.scss';

import GamesScreenButton from './GamesScreenButton/GamesScreenButton';
import GamesScreenDescription from './GamesScreenDescription/GamesScreenDescription';
import GamesScreenDescriptionHidden from './GamesScreenDescriptionHidden/GamesScreenDescriptionHidden';
import GamesScreenGreedventoryLinks from './GamesScreenGreedventoryLinks/GamesScreenGreedventoryLinks';
import GamesScreenDescriptionGreedventory from './GamesScreenDescriptionGreedventory/GamesScreenDescriptionGreedventory';
import clsx from 'clsx';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';

export default function GameBlock({
  gamesInfo,
  expandedStates,
  toggleDescription,

  architecturePageB,
  architecturePageWhiteColorB,
  architecturePageBGamePhone,
  prevSlide,
  nextSlide,
  architecturePageC,
}) {
  return (
    <div className={clsx(scss.gamesMain, architecturePageB && scss.gamesMainB)}>
      <div
        className={clsx(
          scss.gamesBlock,
          architecturePageB && scss.gamesBlockB,
          architecturePageBGamePhone && scss.gamesBlockB,
        )}>
        <div
          className={clsx(
            scss.gamesImageblock,
            architecturePageBGamePhone && scss.gamesImageblockSliderPhone,
          )}>
          {architecturePageBGamePhone && (
            <BsArrowLeft className={scss.iconSlider} onClick={prevSlide} />
          )}
          <div className={scss.gamesImageblockSlider}>
            <img className={scss.imageGame} src={gamesInfo.imageGame} alt={gamesInfo.nameGame} />
          </div>
          {architecturePageBGamePhone && (
            <BsArrowRight className={scss.iconSlider} onClick={nextSlide} />
          )}
        </div>
        <div
          className={clsx(
            scss.gamesInfoBlock,
            architecturePageB && scss.gamesInfoBlockB,
            architecturePageWhiteColorB && scss.gamesInfoBlockB,
          )}>
          <h3
            className={clsx(
              scss.nameGame,
              architecturePageB && scss.nameGameB,
              architecturePageWhiteColorB && scss.nameGameB,
              architecturePageC && scss.nameGameC,
            )}>
            {gamesInfo.nameGame}
          </h3>
          <div className={scss.gamesInfoBlockDescriptionAndButton}>
            <GamesScreenDescription
              gamesInfo={gamesInfo}
              architecturePageB={architecturePageB}
              architecturePageWhiteColorB={architecturePageWhiteColorB}
            />
            {gamesInfo.nameGame === 'GREEDVENTORY' && (
              <div>
                <GamesScreenGreedventoryLinks
                  gamesInfo={gamesInfo}
                  architecturePageB={architecturePageB}
                  architecturePageWhiteColorB={architecturePageWhiteColorB}
                />
                <GamesScreenDescriptionGreedventory
                  gamesInfo={gamesInfo}
                  architecturePageB={architecturePageB}
                  architecturePageWhiteColorB={architecturePageWhiteColorB}
                />
              </div>
            )}
            <GamesScreenButton
              gamesInfo={gamesInfo}
              button={() => toggleDescription(gamesInfo.id)}
              isExpanded={!!expandedStates[gamesInfo.id]}
              architecturePageB={architecturePageB}
              architecturePageWhiteColorB={architecturePageWhiteColorB}
            />
          </div>
        </div>
      </div>
      <div
        className={clsx(
          scss.gamesInfoBlockDescriptionAndButtonPhone,
          architecturePageBGamePhone && scss.gamesInfoBlockDescriptionAndButtonPhoneB,
        )}>
        <GamesScreenDescription
          gamesInfo={gamesInfo}
          architecturePageB={architecturePageB}
          architecturePageWhiteColorB={architecturePageWhiteColorB}
        />
        {gamesInfo.nameGame === 'GREEDVENTORY' && (
          <div>
            <GamesScreenGreedventoryLinks
              gamesInfo={gamesInfo}
              architecturePageB={architecturePageB}
              architecturePageWhiteColorB={architecturePageWhiteColorB}
            />
            <GamesScreenDescriptionGreedventory
              gamesInfo={gamesInfo}
              architecturePageB={architecturePageB}
              architecturePageWhiteColorB={architecturePageWhiteColorB}
            />
          </div>
        )}
        <GamesScreenButton
          gamesInfo={gamesInfo}
          button={() => toggleDescription(gamesInfo.id)}
          isExpanded={!!expandedStates[gamesInfo.id]}
          architecturePageB={architecturePageB}
          architecturePageWhiteColorB={architecturePageWhiteColorB}
        />
      </div>
      <GamesScreenDescriptionHidden
        gamesInfo={gamesInfo}
        isExpanded={!!expandedStates[gamesInfo.id]}
        architecturePageB={architecturePageB}
        architecturePageWhiteColorB={architecturePageWhiteColorB}
      />
    </div>
  );
}
