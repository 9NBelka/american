import scss from './PriceScreenC.module.scss';

export default function PriceScreenC({ infoAboutProduct }) {
  return (
    <div className={scss.priceScreenMain}>
      <div className={scss.priceScreenCard}>
        <img
          src={infoAboutProduct.blockInfoAboutCourseImageC}
          alt={`imageCourse ${infoAboutProduct.nameCoursePhone}`}
        />
        <div className={scss.infoCourseBlock}>
          <div className={scss.infoCourseName}>
            <h6>{infoAboutProduct.categoryCourse}</h6>
            <h3>{infoAboutProduct.nameCoursePhone}</h3>
          </div>
          <div className={scss.infoCourseNameSpeakers}>
            <div>
              <p>by: </p>
            </div>
            <div>
              {infoAboutProduct.blockInfoAboutCourseSpeakers.map((nameSpeaker, index) => (
                <p key={index} className={scss.colorOrange}>
                  {nameSpeaker}
                </p>
              ))}
            </div>
          </div>
        </div>
        <div className={scss.infoCourseButtonPriceBlock}>
          <div>
            <a href={infoAboutProduct} className={scss.buttonBuy}>
              Get to buy
            </a>
          </div>
          <div>
            <h5>{infoAboutProduct.blockInfoAboutCourseJustPrice}</h5>
          </div>
        </div>
      </div>
    </div>
  );
}
