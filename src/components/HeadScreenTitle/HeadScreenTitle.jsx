import css from './HeadScreenTitle.module.css';

export default function HeadScreenTitle({ infoTitleAboutCourse }) {
  return (
    <div className={css.headScreenTitle}>
      <div>
        <h4 className={css.categoryCourseText}>{infoTitleAboutCourse.categoryCourse}</h4>
        <h1 className={css.nameCourseText}>{infoTitleAboutCourse.nameCourse}</h1>
        <h2 className={css.descriptionCourseText}>{infoTitleAboutCourse.descriptionCourse}</h2>
      </div>
    </div>
  );
}
