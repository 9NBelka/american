import clsx from 'clsx';
import scss from './PriceScreenB.module.scss';

export default function PriceScreenB({ infoAboutProduct }) {
  return (
    <div className={scss.priceScreenInfoMain}>
      <div className={scss.priceScreenInfoBlock}>
        <h3>{infoAboutProduct.nameCoursePhone}</h3>
        <h6>{infoAboutProduct.descriptionCourse}</h6>
        <div className={scss.priceScreenInfoForCourse}>
          {infoAboutProduct.blockInfoAboutCourseTitleB.map((title, index) => (
            <div key={index} className={scss.blockInfoAboutCourseBlock}>
              <h6>{title}</h6>
              <h6 className={clsx(index == 0 && scss.colorRed)}>
                {infoAboutProduct.blockInfoAboutCourseB[index]}
              </h6>
            </div>
          ))}
        </div>
        <p className={scss.colorYellow}>{infoAboutProduct.blockInfoAboutCourseRegistration}</p>
        <h5>{infoAboutProduct.blockInfoAboutCourseRegistrationDate}</h5>
        <p>{infoAboutProduct.blockInfoAboutCourseCourseStart}</p>
        <button className={scss.buttonNow}>Buy now</button>
      </div>
      <div className={scss.priceScreenImageBlock}>
        <img src={infoAboutProduct.blockInfoAboutCourseImage} className={scss.priceScreenImage} />
      </div>
    </div>
  );
}
