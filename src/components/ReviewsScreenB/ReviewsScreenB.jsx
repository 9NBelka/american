import { useState } from 'react';
import scss from './ReviewsScreenB.module.scss';
import ReviewsScreenBArticle from './ReviewsScreenBArticle/ReviewsScreenBArticle';

export default function ReviewsScreenB({ reviews, architecturePageB }) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [expandedReviews, setExpandedReviews] = useState({}); // Храним развернутые отзывы

  const reviewsPerPage = 3;
  const reviewsPerPagePhone = 1;

  const startIdx = selectedIdx;

  const toggleExpand = (index) => {
    setExpandedReviews((prev) => ({
      ...prev,
      [index]: !prev[index], // Инвертируем состояние только для этого отзыва
    }));
  };

  return (
    <>
      <div className={scss.displayPcAndTablet}>
        <ReviewsScreenBArticle
          reviews={reviews}
          selectedIdx={selectedIdx}
          setSelectedIdx={setSelectedIdx}
          reviewsPerPage={reviewsPerPage}
          expandedReviews={expandedReviews}
          startIdx={startIdx}
          toggleExpand={toggleExpand}
          architecturePageB={architecturePageB}
        />
      </div>
      <div className={scss.displayPhone}>
        <ReviewsScreenBArticle
          reviews={reviews}
          selectedIdx={selectedIdx}
          setSelectedIdx={setSelectedIdx}
          reviewsPerPage={reviewsPerPagePhone}
          expandedReviews={expandedReviews}
          startIdx={startIdx}
          toggleExpand={toggleExpand}
          architecturePageB={architecturePageB}
        />
      </div>
    </>
  );
}
