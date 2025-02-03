import clsx from 'clsx';
import scss from './IntermediaryBuyNow.module.scss';

export default function IntermediaryBuyNow({ forStyle }) {
  return (
    <div
      className={clsx(
        scss.intermediaryBuyNowBlockMain,
        forStyle && scss.intermediaryBuyNowBlockMainGap,
      )}>
      <div className={scss.intermediaryBuyNowBlock}>
        <h5 className={clsx(forStyle ? scss.whiteText : '')}>Want to scale up your projects? </h5>
        <h6 className={clsx(forStyle ? scss.whiteText : '')}>
          Take our industrial solutions for systemic problems!
        </h6>
      </div>
      <div className={scss.intermediaryBuyNowBlock}>
        <a href='#'>BUY NOW</a>
      </div>
    </div>
  );
}
