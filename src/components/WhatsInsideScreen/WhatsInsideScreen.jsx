import { useState } from 'react';
import scss from './WhatsInsideScreen.module.scss';
import clsx from 'clsx';
import { BsCaretRightFill, BsCaretDownFill } from 'react-icons/bs';
import IntermediaryBuyNow from '../IntermediaryBuyNow/IntermediaryBuyNow';

export default function WhatsInsideScreen({ programCourseInfo, toggleModal, isOpen }) {
  const [activeIndex, setActiveIndex] = useState(null); // Хранит индекс активного спойлера

  const toggleSpoiler = (index) => {
    // Если уже открыт, закроем, иначе откроем новый
    setActiveIndex(activeIndex === index ? '' : index);
  };
  return (
    <div className={scss.whatsInsideBlock}>
      {programCourseInfo.insideScreen.map((info, index) => (
        <div key={index} className={scss.spoilerBlock}>
          <div
            className={clsx(
              scss.spoilerHeader,
              activeIndex === index ? scss.spoilerHeaderOpen : '',
            )}
            onClick={() => toggleSpoiler(index)}>
            <h3 className={scss.insideScreenTitle}>{info.insideScreenTitle}</h3>
            <span className={scss.icon}>
              {activeIndex === index ? (
                <BsCaretDownFill className={scss.iconBs} />
              ) : (
                <BsCaretRightFill className={scss.iconBs} />
              )}
            </span>
          </div>
          <div
            className={`${scss.spoilerContent} ${activeIndex === index ? scss.open : scss.closed}`}>
            <h5 className={scss.insideScreenContent}>{info.insideScreenContent}</h5>
          </div>
        </div>
      ))}
      <IntermediaryBuyNow toggleModal={toggleModal} isOpen={isOpen} />
    </div>
  );
}
