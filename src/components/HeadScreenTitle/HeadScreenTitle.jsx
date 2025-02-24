import clsx from 'clsx';
import scss from './HeadScreenTitle.module.scss';
import FormForNewsOnEmail from '../FormForNewsOnEmail/FormForNewsOnEmail';
import FormForNewsOnEmailC from '../FormForNewsOnEmailC/FormForNewsOnEmailC';

export default function HeadScreenTitle({
  infoTitleAboutCourse,
  architecturePageA,
  architecturePageB,
  architecturePageC,
  toggleModal,
  isOpen,
  scrollToSection,
}) {
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
          {architecturePageB && <FormForNewsOnEmail toggleModal={toggleModal} isOpen={isOpen} />}
        </div>
      </div>
      <div className={scss.formForNewsOnEmailC}>{architecturePageC && <FormForNewsOnEmailC />}</div>
    </div>
  );
}
