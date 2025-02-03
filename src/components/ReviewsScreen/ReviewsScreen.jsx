import { useState } from 'react';
import css from './ReviewsScreen.module.scss';
import { BsCaretRightFill, BsCaretLeftFill } from 'react-icons/bs';
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';

function Rating({ value }) {
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

export default function ReviewsScreen({ reviews }) {
  const [selectedIdx, setSelectedIdx] = useState(0);

  const handlePrev = () => setSelectedIdx((prevIdx) => Math.max(prevIdx - 1, 0));
  const handleNext = () => setSelectedIdx((prevIdx) => Math.min(prevIdx + 1, reviews.length - 1));

  const isFirstElem = selectedIdx === 0;
  const isLastElem = selectedIdx === reviews.length - 1;
  const visibleArticle = reviews[selectedIdx];
  const current = selectedIdx + 1;
  const total = reviews.length;

  return (
    <div className={css.sliderReview}>
      <article>
        <div className={css.ratingContainer}>
          <Rating value={visibleArticle.rating} />
        </div>
        <div className={css.sliderReviewBlock}>
          <p>{visibleArticle.studentsFeedback}</p>
        </div>
      </article>
      <div className={css.sliderReviewNavigationAndName}>
        <h3>{visibleArticle.studentsName}</h3>
        <div className={css.sliderReviewNavigation}>
          <p>
            {current <= 9 ? '0' + current : current}/{total <= 9 ? '0' + total : total}
          </p>
          <button
            className={css.sliderReviewNavigationButton}
            disabled={isFirstElem}
            onClick={handlePrev}>
            <BsCaretLeftFill className={css.sliderReviewNavigationButtonIcon} />
          </button>
          <button
            className={css.sliderReviewNavigationButton}
            disabled={isLastElem}
            onClick={handleNext}>
            <BsCaretRightFill className={css.sliderReviewNavigationButtonIcon} />
          </button>
        </div>
      </div>
    </div>
  );
}
