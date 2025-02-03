import scss from './HeadScreenTitle.module.scss';

export default function HeadScreenTitle({ infoTitleAboutCourse }) {
  return (
    <div className={scss.headScreenTitle}>
      <iframe
        src={infoTitleAboutCourse.stickyBlockVideo}
        className={scss.headScreenVideoPhone}
        allow='autoplay; encrypted-media'
        allowFullScreen></iframe>
      <div>
        <h4 className={scss.categoryCourseText}>{infoTitleAboutCourse.categoryCourse}</h4>
        <h1 className={scss.nameCourseText}>{infoTitleAboutCourse.nameCourse}</h1>
        <h1 className={scss.nameCoursePhone}>{infoTitleAboutCourse.nameCoursePhone}</h1>
        <h2 className={scss.descriptionCourseText}>{infoTitleAboutCourse.descriptionCourse}</h2>
      </div>
    </div>
  );
}
