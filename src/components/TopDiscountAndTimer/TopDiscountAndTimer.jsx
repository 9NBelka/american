import { useEffect, useState } from 'react';
import scss from './TopDiscountAndTimer.module.scss';
import { BsX } from 'react-icons/bs';

export default function TopDiscountAndTimer({ timer, handleClose, scrollToSection }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [isCloseButton, setCloseButton] = useState(false);

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
    <div className={scss.timerBlockMain}>
      <h4 className={scss.title}>CHRISTMAS SALE</h4>
      <h4 className={scss.description}>30-70% OFF</h4>
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
        <span>
          {String(timeLeft.seconds).padStart(2, '0')} <span>s</span>
        </span>
      </div>

      <button className={scss.buttonBuy} onClick={() => scrollToSection('price-section', 100)}>
        BUY NOW
      </button>
      <button onClick={handleClose} className={scss.buttonClose}>
        <BsX className={scss.iconClose} />
      </button>
    </div>
  );
}
