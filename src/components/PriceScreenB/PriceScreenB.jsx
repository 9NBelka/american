import clsx from 'clsx';
import scss from './PriceScreenB.module.scss';
import { BsChevronDown, BsChevronRight } from 'react-icons/bs';
import { useEffect, useState } from 'react';

export default function PriceScreenB({ infoAboutProduct, handleAddToCart, products, timer }) {
  // Состояние для отслеживания, какой продукт развернут
  const [expandedStates, setExpandedStates] = useState({});
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  // Функция для переключения состояния конкретного продукта
  const toggleDescription = (productId) => {
    setExpandedStates((prev) => ({
      ...prev,
      [productId]: !prev[productId], // Переключаем состояние для конкретного productId
    }));
  };

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

  return (
    <div className={scss.priceScreenInfoMain}>
      <div className={scss.priceScreenInfoBlock}>
        <h3>{infoAboutProduct.nameCoursePhone}</h3>
        <h6>{infoAboutProduct.descriptionCourse}</h6>
        <div className={scss.timerTablet}>
          {timer && (
            <div className={scss.textAndTimerBlock}>
              <p>{timer.name}</p>
              <p className={scss.descriptionTimer}>{timer.description}</p>
              <div className={scss.timer}>
                <span className={scss.daysYellow}>
                  {String(timeLeft.days).padStart(2, '0')} <span>d</span>
                </span>
                <span>
                  {String(timeLeft.hours).padStart(2, '0')} <span>h</span>
                </span>
                <span>
                  {String(timeLeft.minutes).padStart(2, '0')}
                  <span> m</span>
                </span>
                <span>
                  {String(timeLeft.seconds).padStart(2, '0')}
                  <span> s</span>
                </span>
              </div>
            </div>
          )}
        </div>
        <p className={scss.colorYellow}>{infoAboutProduct.blockInfoAboutCourseRegistration}</p>
        <p>{infoAboutProduct.blockInfoAboutCourseCourseStart}</p>
        {products.map((product) => (
          <div key={product.id} className={scss.priceScreenInfoForCourseMain}>
            <div
              className={clsx(
                scss.priceScreenInfoForCourse,
                product.id === 'dddd'
                  ? scss.priceScreenInfoForCourse
                  : scss.priceScreenInfoForCourseGrey,
              )}>
              {product.discountPercent > 0 && (
                <div className={scss.discountPercentBlock}>
                  <div className={scss.discountPercentBlockRelative}>
                    <img src='/img/discountBackgroundImageB.png' alt='discountBackgroundImage' />
                    {product.discountPercent > 0 && <h6>-{product.discountPercent}%</h6>}
                  </div>
                </div>
              )}
              <div className={scss.blockInfoAboutCourseBlock}>
                <div className={scss.blockWithInfo}>
                  <h6 className={product.id === 'dddd' ? '' : scss.textWhite}>
                    price <span>{product.access}</span>
                  </h6>
                  <div className={scss.blockWithInfoPriceAndDiscount}>
                    {product.discountedPrice && (
                      <>
                        <p
                          className={clsx(
                            scss.colorRed,
                            product.id === 'dddd' ? '' : scss.textYellow,
                          )}>
                          {product.discountedPrice}$
                        </p>
                        <p className={scss.discountPercentText}>{product.priceProduct}$</p>
                      </>
                    )}
                    {!product.discountedPrice && (
                      <p
                        className={clsx(
                          scss.colorRed,
                          product.id === 'dddd' ? '' : scss.textYellow,
                        )}>
                        {product.priceProduct}$
                      </p>
                    )}
                  </div>
                </div>
                <div className={scss.blockWithInfo}>
                  <h6 className={product.id === 'dddd' ? '' : scss.textWhite}>access to video</h6>
                  <p
                    className={clsx(
                      scss.downInfoText,
                      product.id === 'dddd' ? '' : scss.textWhite,
                    )}>
                    {product.id === 'dddd' ? 'Straightaway' : 'Once a week'}
                  </p>
                </div>
                <div className={clsx(scss.blockWithInfo, scss.blockWithInfoMini)}>
                  <h6 className={product.id === 'dddd' ? '' : scss.textWhite}>videos</h6>
                  <p
                    className={clsx(
                      scss.downInfoText,
                      product.id === 'dddd' ? '' : scss.textWhite,
                    )}>
                    32
                  </p>
                </div>
                <div className={scss.blockWithInfo}>
                  <h6 className={product.id === 'dddd' ? '' : scss.textWhite}>homework</h6>
                  <p
                    className={clsx(
                      scss.downInfoText,
                      product.id === 'dddd' ? '' : scss.textWhite,
                    )}>
                    {product.id === 'dddd' ? 'self-sufficient' : 'Individually'}
                  </p>
                </div>
                <div
                  className={clsx(scss.blockWithInfo, scss.blockWithInfoMoreInfo)}
                  onClick={() => toggleDescription(product.id)}>
                  <p
                    className={clsx(
                      scss.downInfoText,
                      product.id === 'dddd' ? '' : scss.textWhite,
                    )}>
                    More info
                  </p>
                  {expandedStates[product.id] ? (
                    <BsChevronDown
                      className={clsx(scss.icon, product.id === 'dddd' ? '' : scss.iconWhite)}
                    />
                  ) : (
                    <BsChevronRight
                      className={clsx(scss.icon, product.id === 'dddd' ? '' : scss.iconWhite)}
                    />
                  )}
                </div>
              </div>
            </div>

            {expandedStates[product.id] && (
              <div className={scss.expandedContent}>
                <ul>
                  {product.descriptionProduct.map((text, index) => (
                    <li key={`${product.id}-${index}`}>
                      {typeof text === 'object' ? text.text : text}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {product.available ? (
              <button
                className={clsx(scss.buttonNow, product.id === 'dddd' ? '' : scss.buttonYellow)}
                onClick={() => handleAddToCart(product)}>
                Buy now
              </button>
            ) : (
              <p className={scss.availableText}>Not available</p>
            )}
          </div>
        ))}
      </div>

      <div className={scss.priceScreenImageBlock}>
        {timer && (
          <div className={scss.textAndTimerBlock}>
            <p>{timer.name}</p>
            <p className={scss.descriptionTimer}>{timer.description}</p>
            <div className={scss.timer}>
              <span className={scss.daysYellow}>
                {String(timeLeft.days).padStart(2, '0')} <span>d</span>
              </span>
              <span>
                {String(timeLeft.hours).padStart(2, '0')} <span>h</span>
              </span>
              <span>
                {String(timeLeft.minutes).padStart(2, '0')}
                <span> m</span>
              </span>
              <span>
                {String(timeLeft.seconds).padStart(2, '0')}
                <span> s</span>
              </span>
            </div>
          </div>
        )}

        <img src={infoAboutProduct.blockInfoAboutCourseImage} className={scss.priceScreenImage} />
      </div>
    </div>
  );
}
