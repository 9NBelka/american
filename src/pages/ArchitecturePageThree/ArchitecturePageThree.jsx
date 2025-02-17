import css from './ArchitecturePageThree.module.css';
import HeadScreenTitle from '../../components/HeadScreenTitle/HeadScreenTitle';
import HeadScreenHeader from '../../components/HeadScreenHeader/HeadScreenHeader';
import ViewCourseScreenC from '../../components/ViewCourseScreenC/ViewCourseScreenC';

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
    </>
  );
}
