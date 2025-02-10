import { useState } from 'react';
import css from './ReviewsScreen.module.scss';
import { BsCaretRightFill, BsCaretLeftFill } from 'react-icons/bs';
import clsx from 'clsx';
import Rating from './Rating/Rating';

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
      <div
        className={clsx(css.sliderReviewNavigationAndName, css.sliderReviewNavigationAndNamePhone)}>
        <h3>{visibleArticle.studentsName}</h3>
      </div>
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
        <div className={clsx(css.sliderReviewNavigation, css.sliderReviewNavigationNone)}>
          <p>
            {current <= 9 ? '0' + current : current}/{total <= 9 ? '0' + total : total}
          </p>
          <button
            className={css.sliderReviewNavigationButton}
            disabled={isFirstElem}
            onClick={handlePrev}>
            <BsCaretLeftFill className={css.sliderReviewNavigationButtonIcon} />
          </button>
          <p className={css.sliderReviewNavigationCount}>
            {current <= 9 ? '0' + current : current}/{total <= 9 ? '0' + total : total}
          </p>
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
