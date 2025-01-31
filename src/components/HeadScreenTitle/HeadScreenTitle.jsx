import scss from './HeadScreenTitle.module.scss';

export default function HeadScreenTitle({ infoTitleAboutCourse }) {
  return (
    <div className={scss.headScreenTitle}>
      <div>
        <h4 className={scss.categoryCourseText}>{infoTitleAboutCourse.categoryCourse}</h4>
        <h1 className={scss.nameCourseText}>{infoTitleAboutCourse.nameCourse}</h1>
        <h2 className={scss.descriptionCourseText}>{infoTitleAboutCourse.descriptionCourse}</h2>
      </div>
    </div>
  );
}
