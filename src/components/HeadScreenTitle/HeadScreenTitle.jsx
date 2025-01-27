import css from './HeadScreenTitle.module.css';

export default function HeadScreenTitle({ infoTitleAboutCourse }) {
  return (
    <div className={css.headScreenTitle}>
      {infoTitleAboutCourse.map((info, index) => (
        <div key={index}>
          <h4 className={css.categoryCourseText}>{info.categoryCourse}</h4>
          <h1 className={css.nameCourseText}>{info.nameCourse}</h1>
          <h2 className={css.descriptionCourseText}>{info.descriptionCourse}</h2>
        </div>
      ))}
    </div>
  );
}
