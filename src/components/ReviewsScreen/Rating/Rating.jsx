import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';
import css from './Rating.module.scss';

export default function Rating({ value }) {
  const stars = Array.from({ length: 5 }, (_, i) => {
    if (value >= i + 1) {
      return <BsStarFill key={i} className={css.starFilled} />;
    } else if (value > i && value < i + 1) {
      return <BsStarHalf key={i} className={css.starHalf} />;
    } else {
      return <BsStar key={i} className={css.starEmpty} />;
    }
  });

  return <div className={css.rating}>{stars}</div>;
}
