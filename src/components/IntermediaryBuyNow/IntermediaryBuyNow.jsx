import clsx from 'clsx';
import scss from './IntermediaryBuyNow.module.scss';

export default function IntermediaryBuyNow({ forStyle, toggleModal, isOpen, architecturePageC }) {
  return (
    <div
      className={clsx(
        scss.intermediaryBuyNowBlockMain,
        forStyle && scss.intermediaryBuyNowBlockMainGap,
      )}>
      <div className={scss.intermediaryBuyNowBlock}>
        <h5 className={clsx(forStyle && scss.whiteText, architecturePageC && scss.whiteTextC)}>
          Want to scale up your projects?{' '}
        </h5>
        <h6
          className={clsx(
            forStyle && scss.whiteText,
            scss.whiteTextNone,
            architecturePageC && scss.whiteTextLowerC,
          )}>
          Take our industrial solutions for systemic problems!
        </h6>
      </div>
      <div
        className={clsx(
          scss.intermediaryBuyNowBlock,
          forStyle && scss.intermediaryBuyNowBlockBlue,
          architecturePageC && scss.intermediaryBuyNowBlockOrange,
        )}>
        <a rel='noopener noreferrer' onClick={toggleModal}>
          Buy now
        </a>
      </div>
    </div>
  );
}
