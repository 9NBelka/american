import { BsDiscord, BsYoutube } from 'react-icons/bs';
import scss from './JoinUsScreen.module.scss';
import clsx from 'clsx';

export default function JoinUsScreen({ architecturePageA, architecturePageB, architecturePageC }) {
  return (
    <div
      className={clsx(
        scss.joinUsScreenBlockMain,
        architecturePageB && scss.joinUsScreenBlockMainPageB,
        architecturePageC && scss.joinUsScreenBlockMainPageC,
      )}>
      {architecturePageC && (
        <div className={scss.titleBlock}>
          <h4 className={scss.title}>Join Us</h4>
        </div>
      )}
      <div
        className={clsx(
          scss.iconsAndTextBlock,
          architecturePageB && scss.iconsAndTextBlockPageB,
          architecturePageC && scss.iconsAndTextBlockPageC,
        )}>
        <div className={scss.iconsBlocks}>
          <a href='#' target='_blank'>
            <div
              className={clsx(
                scss.iconBlock,
                architecturePageB && scss.iconBlockPageBYouTube,
                architecturePageC && scss.iconBlockPageC,
              )}>
              <BsYoutube className={scss.icon} />
            </div>
          </a>
          <a href='#' target='_blank'>
            <div
              className={clsx(
                scss.iconBlock,
                architecturePageB && scss.iconBlockPageBTwoDiscord,
                architecturePageC && scss.iconBlockPageC,
              )}>
              <BsDiscord className={scss.icon} />
            </div>
          </a>
        </div>
        <div
          className={clsx(
            scss.textBlock,
            architecturePageB && scss.textBlockPageB,
            architecturePageC && scss.textBlockPageC,
          )}>
          <p>
            Subscribe to our channels to miss nothing from news, promotions, promo codes. Among the
            subscribers of our channel you can also find friends, like-minded people, mentors.
          </p>
          {architecturePageB && <p className={scss.redTextPageB}>Don`t miss your chance!</p>}
        </div>
      </div>
      {(architecturePageA || architecturePageC) && (
        <div className={clsx(scss.redTextBlock, architecturePageC && scss.redTextBlockPageC)}>
          <p>Don`t miss your chance!</p>
        </div>
      )}
    </div>
  );
}
