import clsx from 'clsx';
import scss from './PriceScreenBPhone.module.scss';
import { useEffect, useState } from 'react';
import { BsChevronDown, BsChevronRight, BsChevronUp } from 'react-icons/bs';

export default function PriceScreenBPhone({ infoAboutProduct, handleAddToCart, products, timer }) {
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
    <>
      <div className={scss.priceScreenInfoMain}>
        <div className={scss.priceScreenInfoBlock}>
          <p className={scss.colorYellow}>{infoAboutProduct.blockInfoAboutCourseRegistration}</p>
          <p>{infoAboutProduct.blockInfoAboutCourseCourseStart}</p>
        </div>
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
        {products.map((product, index) => (
          <div key={`${product.id}-${index}`} className={scss.priceScreenInfoForCourse}>
            <h6 className={scss.categoryCourse}>{infoAboutProduct.categoryCourse}</h6>
            <h3 className={scss.nameCourse}>{infoAboutProduct.nameCoursePhone}</h3>
            <h6 className={scss.accessCourse}>{product.access}</h6>
            <div className={scss.blockWithInfoPriceAndDiscount}>
              {product.discountedPrice && (
                <>
                  <p className={scss.colorRed}>{product.discountedPrice}$</p>
                  <p className={scss.discountPercentText}>{product.priceProduct}$</p>
                </>
              )}
              {!product.discountedPrice && <p className={scss.colorRed}>{product.priceProduct}$</p>}
            </div>
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
            {product.available ? (
              <button className={scss.buttonNow} onClick={() => handleAddToCart(product)}>
                Buy now
              </button>
            ) : (
              <p className={scss.availableText}>Not available</p>
            )}
            <div
              className={scss.blockWithInfoMoreInfo}
              onClick={() => toggleDescription(product.id)}>
              <p className={scss.downInfoText}>More info</p>
              {expandedStates[product.id] ? (
                <BsChevronUp className={scss.icon} />
              ) : (
                <BsChevronDown className={scss.icon} />
              )}
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
            {product.discountPercent > 0 && (
              <div className={scss.discountPercentBlock}>
                <div className={scss.discountPercentBlockRelative}>
                  <img src='/img/discountBackgroundImageB.png' alt='discountBackgroundImage' />
                  {product.discountPercent > 0 && <h6>-{product.discountPercent}%</h6>}
                </div>
              </div>
            )}
          </div>
        ))}
        <div className={scss.priceScreenInfoBlock}>
          <h6 className={scss.descriptionCourse}>{infoAboutProduct.descriptionCourse}</h6>
        </div>
      </div>
    </>
  );
}
