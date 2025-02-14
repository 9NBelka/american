import clsx from 'clsx';
import scss from './PriceScreenBPhone.module.scss';

export default function PriceScreenBPhone({ infoAboutProduct }) {
  return (
    <>
      <div className={scss.priceScreenInfoMain}>
        <div className={scss.priceScreenInfoBlock}>
          <p className={scss.colorYellow}>{infoAboutProduct.blockInfoAboutCourseRegistration}</p>
          <h5>{infoAboutProduct.blockInfoAboutCourseRegistrationDate}</h5>
          <p>{infoAboutProduct.blockInfoAboutCourseCourseStart}</p>
        </div>
        <div className={scss.priceScreenInfoForCourse}>
          <h6 className={scss.categoryCourse}>{infoAboutProduct.categoryCourse}</h6>
          <h3 className={scss.nameCourse}>{infoAboutProduct.nameCoursePhone}</h3>
          <h4 className={scss.priceCourse}>{infoAboutProduct.blockInfoAboutCourseJustPrice}</h4>
          <div className={scss.blockInfoAboutCourseBlockRow}>
            {infoAboutProduct.blockInfoAboutCourseTitleB.map((title, index) => (
              <div
                key={index}
                className={clsx(scss.blockInfoAboutCourseBlock, index == 0 && scss.displayNone)}>
                <h6>{title}</h6>
                <h6>{infoAboutProduct.blockInfoAboutCourseB[index]}</h6>
              </div>
            ))}
          </div>
          <button className={scss.buttonNow}>Buy now</button>
        </div>
        <div className={scss.priceScreenInfoBlock}>
          <h6 className={scss.descriptionCourse}>{infoAboutProduct.descriptionCourse}</h6>
        </div>
      </div>
    </>
  );
}
