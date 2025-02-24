import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import clsx from 'clsx';
import scss from './Reviews.module.scss';

export default function Reviews({ reviews, selectedIdx, setSelectedIdx, reviewsPerPage }) {
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);
  const currentPage = Math.floor(selectedIdx / reviewsPerPage) + 1;

  const handlePrev = () => setSelectedIdx((prev) => Math.max(prev - reviewsPerPage, 0));
  const handleNext = () =>
    setSelectedIdx((prev) => Math.min(prev + reviewsPerPage, reviews.length - reviewsPerPage));

  const visibleReviews = reviews.slice(selectedIdx, selectedIdx + reviewsPerPage);

  return (
    <div className={scss.sliderReview}>
      <div className={scss.reviewsContainer}>
        {visibleReviews.map((review, index) => (
          <article key={selectedIdx + index} className={scss.reviewItem}>
            <div className={scss.reviewItemColumn}>
              <h3 className={scss.studentsName}>{review.studentsName}</h3>
              <div className={scss.reviewBlock}>
                <p className={scss.reviewText}>{review.studentsFeedback}</p>
                <div className={scss.shadow}></div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className={scss.sliderControls}>
        <button
          className={scss.sliderReviewNavigationButton}
          disabled={selectedIdx === 0}
          onClick={handlePrev}>
          <BsArrowLeft className={scss.icon} />
        </button>
        <p>
          {currentPage.toString().padStart(2, '0')}/{totalPages.toString().padStart(2, '0')}
        </p>
        <button
          className={scss.sliderReviewNavigationButton}
          disabled={currentPage === totalPages}
          onClick={handleNext}>
          <BsArrowRight className={scss.icon} />
        </button>
      </div>
    </div>
  );
}
