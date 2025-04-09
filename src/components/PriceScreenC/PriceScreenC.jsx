import clsx from 'clsx';
import scss from './PriceScreenC.module.scss';

export default function PriceScreenC({ infoAboutProduct, handleAddToCart, products }) {
  return (
    <div className={scss.priceScreenMain}>
      {products.map((product) => (
        <div key={product.id} className={scss.priceScreenCard}>
          {product.discountPercent > 0 && <h6>-{product.discountPercent}%</h6>}

          <img
            src={infoAboutProduct.blockInfoAboutCourseImageC}
            alt={`imageCourse ${infoAboutProduct.nameCoursePhone}`}
          />
          <div className={scss.infoCourseBlock}>
            <div className={scss.infoCourseName}>
              <h6>{product.categoryProduct}</h6>
              <h3>{product.nameProduct}</h3>
              <h6>{product.access}</h6>
            </div>
            <div className={scss.infoCourseNameSpeakers}>
              <div>
                <p>by: </p>
              </div>
              <div>
                {product.speakersProduct.map((nameSpeaker, index) => (
                  <p key={index} className={scss.colorOrange}>
                    {nameSpeaker}
                  </p>
                ))}
              </div>
            </div>
          </div>
          <div className={scss.infoCourseButtonPriceBlock}>
            <div>
              {product.available ? (
                <button
                  className={scss.buttonBuy}
                  onClick={() => {
                    handleAddToCart(product);
                  }}>
                  Get to buy
                </button>
              ) : (
                <button
                  className={scss.buttonBuy}
                  onClick={() => {
                    handleAddToCart(product);
                  }}>
                  Get to buy
                </button>
              )}
            </div>
            <div>
              {product.discountedPrice && product.discountedPrice > 0 ? (
                <div className={scss.priceProductBlock}>
                  <h5
                    className={clsx(
                      scss.priceProduct,
                      product.discountedPrice && scss.priceProductLine,
                    )}>
                    {product.priceProduct}$
                  </h5>
                  <h5 className={scss.priceProduct}>{product.discountedPrice}$</h5>
                </div>
              ) : (
                <h5 className={scss.priceProduct}>{product.priceProduct}$</h5>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
