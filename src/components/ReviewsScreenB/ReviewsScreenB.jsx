import { useState } from 'react';
import css from './ReviewsScreenB.module.scss';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';

import clsx from 'clsx';
import Rating from '../ReviewsScreen/Rating/Rating';

export default function ReviewsScreenB({ reviews }) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [expandedReviews, setExpandedReviews] = useState({}); // Храним развернутые отзывы

  const reviewsPerPage = 3;
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);
  const currentPage = Math.floor(selectedIdx / reviewsPerPage) + 1;

  const startIdx = selectedIdx;
  const endIdx = Math.min(startIdx + reviewsPerPage, reviews.length);

  const handlePrev = () => setSelectedIdx((prevIdx) => Math.max(prevIdx - reviewsPerPage, 0));
  const handleNext = () =>
    setSelectedIdx((prevIdx) => Math.min(prevIdx + reviewsPerPage, reviews.length - 1));

  const isFirstGroup = selectedIdx === 0;
  const isLastGroup = currentPage === totalPages;

  const visibleReviews = reviews.slice(startIdx, endIdx);

  const toggleExpand = (index) => {
    setExpandedReviews((prev) => ({
      ...prev,
      [index]: !prev[index], // Инвертируем состояние только для этого отзыва
    }));
  };

  return (
    <div className={css.sliderReview}>
      <div className={css.reviewsContainer}>
        {visibleReviews.map((review, index) => {
          const reviewIndex = startIdx + index;
          const isExpanded = expandedReviews[reviewIndex] || false;

          // Проверяем, превышает ли длина отзыва порог
          const isExpandable = review.studentsFeedback.length > 1000;

          return (
            <article key={reviewIndex} className={css.reviewItem}>
              <div className={css.ratingContainer}>
                <Rating value={review.rating} />
              </div>
              <h3>{review.studentsName}</h3>
              <div className={css.sliderReviewBlock}>
                <div className={css.reviewBlock}>
                  <p className={clsx(css.reviewText, isExpanded && css.expanded)}>
                    {review.studentsFeedback}
                  </p>
                  {isExpandable && (
                    <div className={clsx(isExpanded ? css.shadowNone : css.shadow)}></div>
                  )}
                </div>

                {/* Показываем кнопку только если отзыв можно развернуть */}
                {isExpandable && (
                  <button className={css.buttonReadMore} onClick={() => toggleExpand(reviewIndex)}>
                    {isExpanded ? 'Show less' : 'Read more'}
                  </button>
                )}
              </div>
            </article>
          );
        })}
      </div>
      <div className={css.sliderReviewNavigation}>
        <p>
          {currentPage <= 9 ? '0' + currentPage : currentPage}/
          {totalPages <= 9 ? '0' + totalPages : totalPages}
        </p>
        <div className={css.sliderControls}>
          <button
            className={css.sliderReviewNavigationButton}
            disabled={isFirstGroup}
            onClick={handlePrev}>
            <BsArrowLeft className={css.icon} />
          </button>
          <button
            className={css.sliderReviewNavigationButton}
            disabled={isLastGroup}
            onClick={handleNext}>
            <BsArrowRight className={css.icon} />
          </button>
        </div>
      </div>
    </div>
  );
}
