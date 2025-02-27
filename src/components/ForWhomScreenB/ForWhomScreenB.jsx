import { useState } from 'react';
import scss from './ForWhomScreenB.module.scss';
import clsx from 'clsx';
import ForWhomScreenBPhone from './ForWhomScreenBPhone/ForWhomScreenBPhone';

export default function ForWhomScreenB({ infoForWhom, scrollToSection }) {
  const [activeBlock, setActiveBlock] = useState(0);

  return (
    <div className={scss.infoContainer}>
      <div className={scss.leftSide}>
        <div>
          <h2>{activeBlock + 1}.</h2>
          <p>{infoForWhom.forWhomScreen[activeBlock].forWhomScreenListTextOne}</p>
          <p>{infoForWhom.forWhomScreen[activeBlock].forWhomScreenListTextTwo}</p>
          {infoForWhom.forWhomScreen[activeBlock].forWhomScreenListTextThree && (
            <p>{infoForWhom.forWhomScreen[activeBlock].forWhomScreenListTextThree}</p>
          )}
        </div>
        <div className={scss.buttons}>
          <button className={scss.buttonNow} onClick={() => scrollToSection('price', 100)}>
            Buy now
          </button>
          <button
            className={scss.buttonReadMore}
            onClick={() => scrollToSection('whatsInside', 100)}>
            Read more
          </button>
        </div>
      </div>
      <div className={scss.rightSide}>
        {infoForWhom.forWhomScreen.map((block, index) => (
          <div
            key={index}
            className={clsx(scss.block, activeBlock === index ? scss.active : '')}
            onMouseEnter={() => setActiveBlock(index)}>
            <h3>{block.forWhomScreenTitleList}</h3>
            <p>{block.forWhomScreenListTextTitle}</p>
          </div>
        ))}
      </div>
      <ForWhomScreenBPhone infoForWhom={infoForWhom} />
    </div>
  );
}
