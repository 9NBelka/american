import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';
import scss from './Rating.module.scss';
import clsx from 'clsx';

export default function Rating({ value, architecturePageB }) {
  const stars = Array.from({ length: 5 }, (_, i) => {
    if (value >= i + 1) {
      return (
        <BsStarFill
          key={i}
          className={clsx(scss.starFilled, architecturePageB && scss.ratingSmall)}
        />
      );
    } else if (value > i && value < i + 1) {
      return (
        <BsStarHalf
          key={i}
          className={clsx(scss.starHalf, architecturePageB && scss.ratingSmall)}
        />
      );
    } else {
      return (
        <BsStar key={i} className={clsx(scss.starEmpty, architecturePageB && scss.ratingSmall)} />
      );
    }
  });

  return <div className={clsx(scss.rating, architecturePageB && scss.ratingNoMarg)}>{stars}</div>;
}
