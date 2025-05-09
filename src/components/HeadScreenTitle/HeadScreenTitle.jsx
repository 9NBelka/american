import clsx from 'clsx';
import scss from './HeadScreenTitle.module.scss';
import FormForNewsOnEmail from '../FormForNewsOnEmail/FormForNewsOnEmail';
import FormForNewsOnEmailC from '../FormForNewsOnEmailC/FormForNewsOnEmailC';
import AboutUsText from './AboutUsText/AboutUsText';

export default function HeadScreenTitle({
  infoTitleAboutCourse,
  architecturePageA,
  architecturePageB,
  architecturePageC,
  toggleModal,
  isOpen,
  scrollToSection,
  page,
}) {
  const AboutUsTextHalfBlock = true;
  const AboutUsTextHalfBlockDown = true;
  return (
    <div className={clsx(architecturePageC && scss.headScreenMainBlockRow)}>
      <div
        className={clsx(
          scss.headScreenTitle,
          architecturePageB && scss.headScreenTitleB,
          architecturePageC && scss.headScreenTitleC,
        )}>
        {architecturePageA && (
          <iframe
            src={infoTitleAboutCourse.stickyBlockVideo}
            className={scss.headScreenVideoPhone}
            allow='autoplay; encrypted-media'
            allowFullScreen></iframe>
        )}
        <div
          className={clsx(
            architecturePageB && scss.headScreenCourseInfoB,
            architecturePageC && scss.headScreenCourseInfoC,
          )}>
          {architecturePageC && (
            <AboutUsText
              architecturePageC={architecturePageC}
              AboutUsTextHalfBlock={AboutUsTextHalfBlock}
            />
          )}
          <h4
            className={clsx(
              scss.categoryCourseText,
              architecturePageB && scss.categoryCourseTextB,
              architecturePageC && scss.categoryCourseTextC,
            )}>
            {infoTitleAboutCourse.categoryCourse}
          </h4>
          <h1
            className={clsx(
              scss.nameCourseText,
              architecturePageB && scss.nameCourseTextB,
              architecturePageC && scss.nameCourseTextC,
            )}>
            {infoTitleAboutCourse.nameCourse}
          </h1>
          <h1
            className={clsx(
              scss.nameCoursePhone,
              architecturePageB && scss.nameCoursePhoneB,
              architecturePageC && scss.nameCoursePhoneC,
            )}>
            {infoTitleAboutCourse.nameCoursePhone}
          </h1>
          <h2
            className={clsx(
              scss.descriptionCourseText,
              architecturePageB && scss.descriptionCourseTextB,
              architecturePageC && scss.descriptionCourseTextC,
            )}>
            {infoTitleAboutCourse.descriptionCourse}
          </h2>
          {architecturePageA && <AboutUsText />}
          {architecturePageB && (
            <a href='#' className={scss.headScreenButtonAnswer}>
              Ask a quention
            </a>
          )}
          {architecturePageC && (
            <a
              href='#'
              className={scss.headScreenButtonMoreInfo}
              onClick={() => scrollToSection('whatsInside', 100)}>
              More information
            </a>
          )}
          {architecturePageC && (
            <AboutUsText
              architecturePageC={architecturePageC}
              AboutUsTextHalfBlockDown={AboutUsTextHalfBlockDown}
              scrollToSection={scrollToSection}
            />
          )}

          {architecturePageB && (
            <FormForNewsOnEmail
              toggleModal={toggleModal}
              isOpen={isOpen}
              architecturePageB={architecturePageB}
              page={page}
            />
          )}
        </div>
      </div>
      <div className={scss.formForNewsOnEmailC}>
        {architecturePageC && <FormForNewsOnEmailC page={page} />}
      </div>
    </div>
  );
}
