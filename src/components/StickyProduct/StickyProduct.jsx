import clsx from 'clsx';
import scss from './StickyProduct.module.scss';

export default function StickyProduct({ infoAboutProduct, products, handleAddToCart }) {
  return (
    <div className={scss.stickyBlockFlex}>
      {products.map((product) => (
        <div key={product.id} className={scss.stickyBlock}>
          <div className={scss.stickyBlockVideoImage}>
            <iframe
              src={infoAboutProduct.stickyBlockVideo}
              className={scss.stickyBlockVideo}
              title='YouTube video player'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen;'
              referrerPolicy='strict-origin-when-cross-origin'></iframe>
            {product.discountedPrice && product.discountedPrice > 0 && (
              <img
                className={scss.stickyBlockDiscountImage}
                src='/img/discountBackgroundImageA.png'
              />
            )}
          </div>
          {product.discountPercent > 0 && (
            <h6 className={scss.discountPercent}>
              <span>discount</span> -{product.discountPercent}%{' '}
            </h6>
          )}
          {product.discountedPrice && product.discountedPrice > 0 ? (
            <div className={scss.priceProductBlock}>
              <h5
                className={clsx(
                  scss.stickyBlockPrice,
                  product.discountedPrice && scss.stickyBlockPriceProductLine,
                )}>
                {product.priceProduct}$
              </h5>
              <h5 className={scss.stickyBlockPrice}>{product.discountedPrice}$</h5>
            </div>
          ) : (
            <h5 className={scss.stickyBlockPrice}>{product.priceProduct}$</h5>
          )}
          {product.available ? (
            <a
              src={infoAboutProduct.stickyBlockLinkBuy}
              className={scss.stickyBlockBuyNow}
              target='_blank'
              rel='noopener noreferrer'
              onClick={() => {
                handleAddToCart(product);
              }}>
              <h5>BUY NOW</h5>
            </a>
          ) : (
            <p className={scss.availableText}>Not available</p>
          )}
          <div className={scss.stickyBlockInfoAboutCourse}>
            {infoAboutProduct.stickyBlockInfoAboutCourseTitle.map((title, index) => (
              <div key={index} className={scss.stickyBlockInfoAboutCourseBlock}>
                <h6>{title}</h6>
                <h6>{infoAboutProduct.stickyBlockInfoAboutCourse[index]}</h6>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
