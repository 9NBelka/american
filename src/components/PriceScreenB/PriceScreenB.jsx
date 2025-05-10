import clsx from 'clsx';
import scss from './PriceScreenB.module.scss';

export default function PriceScreenB({ infoAboutProduct, handleAddToCart, products }) {
  return (
    <div className={scss.priceScreenInfoMain}>
      <div className={scss.priceScreenInfoBlock}>
        <h3>{infoAboutProduct.nameCoursePhone}</h3>
        <h6>{infoAboutProduct.descriptionCourse}</h6>
        {products.map((product) => (
          <div key={product.id}>
            <div className={scss.priceScreenInfoForCourse}>
              {product.discountPercent > 0 && (
                <div className={scss.discountPercentBlock}>
                  <div className={scss.discountPercentBlockRelative}>
                    <img src='/img/discountBackgroundImageB.png' alt='discountBackgroundImage' />
                    {product.discountPercent > 0 && <h6>-{product.discountPercent}%</h6>}
                  </div>
                </div>
              )}
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
            {product.available ? (
              <button
                className={scss.buttonNow}
                onClick={() => {
                  handleAddToCart(product);
                }}>
                Buy now
              </button>
            ) : (
              <p className={scss.availableText}>Not available</p>
            )}
          </div>
        ))}
      </div>

      <div className={scss.priceScreenImageBlock}>
        <img src={infoAboutProduct.blockInfoAboutCourseImage} className={scss.priceScreenImage} />
      </div>
    </div>
  );
}
