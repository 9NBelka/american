import css from './ArchitecturePageThree.module.css';
import HeadScreenTitle from '../../components/HeadScreenTitle/HeadScreenTitle';
import HeadScreenHeader from '../../components/HeadScreenHeader/HeadScreenHeader';
import ViewCourseScreenC from '../../components/ViewCourseScreenC/ViewCourseScreenC';
import ForWhomScreenC from '../../components/ForWhomScreenC/ForWhomScreenC';
import clsx from 'clsx';
import SpeakersScreenC from '../../components/SpeakersScreenC/SpeakersScreenC';

export default function ArchitecturePageThree({
  currentInfo,
  scrollToSection,
  reviewsArchitecture,
  architecturePageC,
}) {
  return (
    <>
      <div className={css.backgroundHeadScreen}>
        <HeadScreenHeader
          currentInfo={currentInfo}
          scrollToSection={scrollToSection}
          architecturePageC={architecturePageC}
        />
        <div className={css.container}>
          <HeadScreenTitle
            infoTitleAboutCourse={currentInfo}
            architecturePageC={architecturePageC}
          />
        </div>
      </div>
      <div className={css.container}>
        <h3 className={css.titleScreens}>Course Overview</h3>
        <ViewCourseScreenC viewCourseInfo={currentInfo} architecturePageC={architecturePageC} />
      </div>
      <div className={css.backgroundForWhoScreen}>
        <div className={css.container}>
          <h3 className={clsx(css.titleScreens, css.whiteColor)}>For who?</h3>
          <ForWhomScreenC infoForWhom={currentInfo} />
        </div>
      </div>
      <div className={css.container}>
        <h3 className={css.titleScreens}>Who?</h3>
        <SpeakersScreenC speakersInfo={currentInfo} />
      </div>

      <h3 className={css.titleScreens}>For who?</h3>
    </>
  );
}
