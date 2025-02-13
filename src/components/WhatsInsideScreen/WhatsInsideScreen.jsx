import { useState } from 'react';
import scss from './WhatsInsideScreen.module.scss';
import clsx from 'clsx';
import { BsCaretRightFill, BsCaretDownFill } from 'react-icons/bs';
import IntermediaryBuyNow from '../IntermediaryBuyNow/IntermediaryBuyNow';

export default function WhatsInsideScreen({
  programCourseInfo,
  toggleModal,
  isOpen,
  architecturePageB,
}) {
  const [activeIndex, setActiveIndex] = useState(null); // Хранит индекс активного спойлера

  const toggleSpoiler = (index) => {
    // Если уже открыт, закроем, иначе откроем новый
    setActiveIndex(activeIndex === index ? '' : index);
  };
  return (
    <div className={clsx(scss.whatsInsideBlock, architecturePageB && scss.whatsInsideBlockB)}>
      {programCourseInfo.insideScreen.map((info, index) => (
        <div key={index} className={scss.spoilerBlock}>
          <div
            className={clsx(
              scss.spoilerHeader,
              activeIndex === index ? scss.spoilerHeaderOpen : '',
              architecturePageB && scss.spoilerHeaderWhite,
            )}
            onClick={() => toggleSpoiler(index)}>
            <h3
              className={clsx(
                scss.insideScreenTitle,
                architecturePageB && scss.insideScreenTitleWhite,
              )}>
              {info.insideScreenTitle}
            </h3>
            <span className={clsx(scss.icon, architecturePageB && scss.iconNone)}>
              {activeIndex === index ? (
                <BsCaretDownFill
                  className={clsx(scss.iconBs, architecturePageB && scss.iconBsWhite)}
                />
              ) : (
                <BsCaretRightFill
                  className={clsx(scss.iconBs, architecturePageB && scss.iconBsWhite)}
                />
              )}
            </span>
          </div>
          <div
            className={clsx(
              scss.spoilerContent,
              activeIndex === index ? scss.open : scss.closed,
              architecturePageB && scss.openWhite,
            )}>
            <h5
              className={clsx(
                scss.insideScreenContent,
                architecturePageB && scss.insideScreenContentWhite,
              )}>
              {info.insideScreenContent}
            </h5>
          </div>
        </div>
      ))}
      <div className={architecturePageB && scss.intermediaryBuyNow}>
        <IntermediaryBuyNow toggleModal={toggleModal} isOpen={isOpen} />
      </div>
    </div>
  );
}
