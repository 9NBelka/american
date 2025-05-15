import clsx from 'clsx';
import scss from './StickyProduct.module.scss';
import { useEffect, useState } from 'react';
import { BsClock } from 'react-icons/bs';

export default function StickyProduct({
  infoAboutProduct,
  product, // Теперь передаем один продукт, а не массив
  handleAddToCart,
  timer,
  staticProduct,
}) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timerId = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  function calculateTimeLeft() {
    if (!timer || !timer.endDate) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

    const endDate = new Date(timer.endDate).getTime();
    const now = new Date().getTime();
    const difference = endDate - now;

    if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000),
    };
  }

  // Проверяем, что продукт передан
  if (!product) return null;

  return (
    <div className={scss.stickyBlockFlex}>
      <div className={clsx(scss.stickyBlock, staticProduct && scss.staticProduct)} key={product.id}>
        <div className={scss.stickyBlockVideoImage}>
          {!staticProduct ? (
            <iframe
              src={infoAboutProduct.stickyBlockVideo}
              className={scss.stickyBlockVideo}
              title='YouTube video player'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen;'
              referrerPolicy='strict-origin-when-cross-origin'
            />
          ) : (
            <img className={scss.imageProduct} src='/img/productImageArchiPageA.png' />
          )}
          {product.discountedPrice && product.discountedPrice > 0 && (
            <img
              className={scss.stickyBlockDiscountImage}
              src='/img/discountBackgroundImageA.png'
            />
          )}

          <div className={scss.categoryBlock}>
            <p className={scss.categoryText}>{product.access}</p>
          </div>
        </div>

        {product.discountedPrice && product.discountedPrice > 0 ? (
          <div className={scss.priceProductBlock}>
            <h5 className={scss.stickyBlockPrice}>{product.discountedPrice}$</h5>
            <h5
              className={clsx(
                scss.stickyBlockPrice,
                product.discountedPrice && scss.stickyBlockPriceProductLine,
              )}>
              {product.priceProduct}$
            </h5>
            {product.discountPercent > 0 && (
              <h6 className={scss.discountPercent}>-{product.discountPercent}%</h6>
            )}
          </div>
        ) : (
          <h5 className={scss.stickyBlockPrice}>{product.priceProduct}$</h5>
        )}

        {product.discountedPrice && product.discountedPrice > 0 && (
          <div className={scss.textAndTimerBlock}>
            <BsClock className={scss.icon} />
            <p>this price is available for</p>
            <div className={scss.timer}>
              <span>
                {String(timeLeft.days).padStart(2, '0')} <span>d</span>
              </span>
              <span>
                {String(timeLeft.hours).padStart(2, '0')} <span>h</span>
              </span>
              <span>
                {String(timeLeft.minutes).padStart(2, '0')}
                <span> m</span>
              </span>
            </div>
          </div>
        )}

        {product.available ? (
          <button
            href={infoAboutProduct.stickyBlockLinkBuy}
            className={scss.stickyBlockBuyNow}
            rel='noopener noreferrer'
            onClick={() => handleAddToCart(product)}>
            <h5>BUY NOW</h5>
          </button>
        ) : (
          <p className={scss.availableText}>Not available</p>
        )}

        {/* <div className={scss.stickyBlockInfoAboutCourse}>
          {infoAboutProduct.stickyBlockInfoAboutCourseTitle.map((title, index) => (
            <div key={index} className={scss.stickyBlockInfoAboutCourseBlock}>
              <h6>{title}</h6>
              <h6>{infoAboutProduct.stickyBlockInfoAboutCourse[index]}</h6>
            </div>
          ))}
        </div> */}
        <div className={scss.expandedContent}>
          <ul>
            {product.descriptionProduct.map((text, index) => (
              <li key={`${product.id}-${index}`}>{typeof text === 'object' ? text.text : text}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
