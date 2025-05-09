import { BsLinkedin } from 'react-icons/bs';
import scss from './AboutUsText.module.scss';
import clsx from 'clsx';

export default function AboutUsText({
  architecturePageB,
  architecturePageC,
  AboutUsTextHalfBlock,
  AboutUsTextHalfBlockDown,
  scrollToSection,
}) {
  return (
    <div
      className={clsx(
        scss.aboutUsTextAndFounders,
        architecturePageB && scss.aboutUsTextAndFoundersBPage,
        architecturePageC && scss.aboutUsTextAndFoundersCPage,
      )}>
      {!AboutUsTextHalfBlockDown && (
        <p
          className={clsx(
            scss.aboutUsText,
            architecturePageB && scss.aboutUsTextBPage,
            architecturePageC && scss.aboutUsTextCPage,
          )}>
          The course is created by the Ukrainian school{' '}
          <a href='https://lms.k-syndicate.school' target='_blank'>
            K.Syndicate.School
          </a>
        </p>
      )}
      {!AboutUsTextHalfBlock && (
        <div
          className={clsx(
            scss.foundersBlock,
            architecturePageC && !AboutUsTextHalfBlock && scss.foundersBlockCHalf,
          )}>
          <p className={scss.foundersText}>Founders:</p>
          <div className={scss.foundersBlockWithIcon}>
            <a href='https://www.linkedin.com/in/oleksii-naumenko-0766bb59/' target='_blank'>
              <p className={scss.founder}>Kate Revvo</p>
            </a>
            <a href='https://www.linkedin.com/in/kate-revvo-400721a8/' target='_blank'>
              <div
                className={clsx(
                  scss.backgroundIcon,
                  architecturePageB && scss.backgroundIconBPage,
                  architecturePageC && scss.backgroundIconCPage,
                )}>
                <BsLinkedin className={scss.icon} />
              </div>
            </a>
          </div>
          <div className={scss.foundersBlockWithIcon}>
            <a href='https://www.linkedin.com/in/oleksii-naumenko-0766bb59/' target='_blank'>
              <p className={scss.founder}>Alex Naumenko</p>
            </a>
            <a href='https://www.linkedin.com/in/oleksii-naumenko-0766bb59/' target='_blank'>
              <div
                className={clsx(
                  scss.backgroundIcon,
                  architecturePageB && scss.backgroundIconBPage,
                  architecturePageC && scss.backgroundIconCPage,
                )}>
                <BsLinkedin className={scss.icon} />
              </div>
            </a>
          </div>
        </div>
      )}
      {architecturePageC && !AboutUsTextHalfBlock && (
        <a href='#' className={scss.historyButton} onClick={() => scrollToSection('footer', 100)}>
          Read the school history
        </a>
      )}
    </div>
  );
}
