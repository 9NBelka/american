import clsx from 'clsx';
import scss from './HeadScreenTitle.module.scss';
import FormForNewsOnEmail from '../FormForNewsOnEmail/FormForNewsOnEmail';

export default function HeadScreenTitle({
  infoTitleAboutCourse,
  architecturePageA,
  architecturePageB,
  toggleModal,
  isOpen,
}) {
  return (
    <div className={clsx(scss.headScreenTitle, architecturePageB && scss.headScreenTitleB)}>
      {architecturePageA && (
        <iframe
          src={infoTitleAboutCourse.stickyBlockVideo}
          className={scss.headScreenVideoPhone}
          allow='autoplay; encrypted-media'
          allowFullScreen></iframe>
      )}
      <div className={clsx(architecturePageB && scss.headScreenCourseInfoB)}>
        <h4
          className={clsx(scss.categoryCourseText, architecturePageB && scss.categoryCourseTextB)}>
          {infoTitleAboutCourse.categoryCourse}
        </h4>
        <h1 className={clsx(scss.nameCourseText, architecturePageB && scss.nameCourseTextB)}>
          {infoTitleAboutCourse.nameCourse}
        </h1>
        <h1 className={scss.nameCoursePhone}>{infoTitleAboutCourse.nameCoursePhone}</h1>
        <h2
          className={clsx(
            scss.descriptionCourseText,
            architecturePageB && scss.descriptionCourseTextB,
          )}>
          {infoTitleAboutCourse.descriptionCourse}
        </h2>
        {architecturePageB && (
          <a href='#' className={scss.headScreenButtonAnswer}>
            Ask a quention
          </a>
        )}
        {architecturePageB && <FormForNewsOnEmail toggleModal={toggleModal} isOpen={isOpen} />}
      </div>
    </div>
  );
}
