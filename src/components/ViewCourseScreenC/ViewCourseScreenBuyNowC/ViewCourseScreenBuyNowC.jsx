import { BsClockFill, BsFillPlayBtnFill, BsPeopleFill } from 'react-icons/bs';
import scss from './ViewCourseScreenBuyNowC.module.scss';
import clsx from 'clsx';

export default function ViewCourseScreenBuyNowC({ viewCourseInfo }) {
  return (
    <div className={scss.viewCourseScreenPhoneRowBlock}>
      <div className={scss.viewCourseScreenInfoAboutProductBlock}>
        <p className={scss.registrationTextOrange}>
          {viewCourseInfo.blockInfoAboutCourseRegistration}
        </p>
        <div className={scss.infoAboutProductBlockDates}>
          <h6>Registration Period:</h6>
          <h5>{viewCourseInfo.blockInfoAboutCourseRegistrationDate}</h5>
          <h6>Course start:</h6>
          <h5>11 APR,2025</h5>
        </div>
        <div className={scss.infoAboutProductBlockInfoTimeVideoStudentsGeneral}>
          {viewCourseInfo.stickyBlockInfoAboutCourseTitle.map((title, index) => (
            <div key={index} className={scss.infoAboutProductBlockInfoTimeVideoStudents}>
              <div className={scss.infoAboutProductBlockInfoTitleAndIcon}>
                {index === 0 && <BsClockFill className={scss.icon} />}
                {index === 1 && <BsFillPlayBtnFill className={scss.icon} />}
                {index === 2 && <BsPeopleFill className={scss.icon} />}

                <h6 className={scss.infoAboutProductBlockInfoTitle}>{title}</h6>
              </div>
              <h6 className={scss.infoAboutProductBlockInfoNums}>
                {viewCourseInfo.stickyBlockInfoAboutCourse[index]}
              </h6>
            </div>
          ))}
        </div>
        <div
          className={clsx(
            scss.infoAboutProductBlockDescriptionOnCourse,
            scss.infoAboutProductBlockDescriptionOnCourseNonePhone,
          )}>
          <ul className={scss.infoAboutProductBlockDescriptionOnCourseList}>
            {viewCourseInfo.blockInfoAboutCourseCourseDescription.map((list, index) => (
              <li key={index}>{list}</li>
            ))}
          </ul>
        </div>
        <a href='#' className={scss.infoAboutProductBlockBuyNow}>
          Buy now
        </a>
      </div>
      <div
        className={clsx(
          scss.infoAboutProductBlockDescriptionOnCourse,
          scss.infoAboutProductBlockDescriptionOnCourseDisplayPhone,
        )}>
        <ul className={scss.infoAboutProductBlockDescriptionOnCourseList}>
          {viewCourseInfo.blockInfoAboutCourseCourseDescription.map((list, index) => (
            <li key={index}>{list}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
