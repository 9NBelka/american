import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import scss from './ReviewsScreenBArticle.module.scss';
import clsx from 'clsx';
import Rating from '../../ReviewsScreen/Rating/Rating';

export default function ReviewsScreenBArticle({
  reviews, // Массив отзывов
  selectedIdx, // Индекс текущего отзыва
  setSelectedIdx, // Функция для изменения индекса
  reviewsPerPage, // Количество отзывов на странице
  expandedReviews, // Объект, хранящий состояние развернутых отзывов
  startIdx, // Индекс начала текущей группы отзывов
  toggleExpand, // Функция для переключения состояния развернутости отзыва
  architecturePageB, // Флаг для стилизации рейтинга
}) {
  const totalPages = Math.ceil(reviews.length / reviewsPerPage); // Вычисляем общее количество страниц
  const currentPage = Math.floor(selectedIdx / reviewsPerPage) + 1; // Вычисляем текущую страницу

  const endIdx = Math.min(startIdx + reviewsPerPage, reviews.length); // Определяем последний индекс текущей группы отзывов

  // Функции для переключения отзывов назад и вперед
  const handlePrev = () => setSelectedIdx((prevIdx) => Math.max(prevIdx - reviewsPerPage, 0));
  const handleNext = () =>
    setSelectedIdx((prevIdx) => Math.min(prevIdx + reviewsPerPage, reviews.length - 1));

  const isFirstGroup = selectedIdx === 0; // Проверяем, находимся ли мы в первой группе отзывов
  const isLastGroup = currentPage === totalPages; // Проверяем, находимся ли мы в последней группе отзывов

  const visibleReviews = reviews.slice(startIdx, endIdx); // Получаем текущую группу отзывов

  return (
    <div className={scss.sliderReview}>
      <div className={scss.reviewsContainer}>
        {visibleReviews.map((review, index) => {
          const reviewIndex = startIdx + index; // Вычисляем индекс отзыва в общем массиве
          const isExpanded = expandedReviews[reviewIndex] || false; // Проверяем, развернут ли отзыв

          // Проверяем, превышает ли длина отзыва порог для показа кнопки "Read more"
          const isExpandable = review.studentsFeedback.length > 1000;
          const isExpandableTablet = review.studentsFeedback.length > 600;
          const isExpandablePhone = review.studentsFeedback.length > 900;

          return (
            <article key={reviewIndex} className={scss.reviewItem}>
              <div className={scss.reviewItemColumn}>
                <img
                  className={clsx(scss.imageDiscord, scss.imageDiscordNone)}
                  src={review.imageDiscord}
                  alt={review.studentsName}
                />
              </div>
              <div className={scss.reviewItemColumn}>
                <div className={scss.reviewRatingAndStudentName}>
                  <div className={scss.ratingContainer}>
                    <Rating value={review.rating} architecturePageB={architecturePageB} />
                    <h3 className={scss.studentsNamePhone}>{review.studentsName}</h3>
                  </div>
                  <h3 className={scss.studentsNameNone}>{review.studentsName}</h3>
                  <img
                    className={scss.imageDiscordPhone}
                    src={review.imageDiscord}
                    alt={review.studentsName}
                  />
                </div>
                <div className={scss.sliderReviewBlock}>
                  <div className={scss.reviewBlock}>
                    <p className={clsx(scss.reviewText, isExpanded && scss.expanded)}>
                      {review.studentsFeedback}
                    </p>
                    {/* Добавляем тень, если текст не развернут */}
                    {isExpandable && (
                      <div
                        className={clsx(
                          isExpanded ? scss.shadowNone : scss.shadow,
                          scss.desktopOnly,
                        )}></div>
                    )}
                    {isExpandableTablet && (
                      <div
                        className={clsx(
                          isExpanded ? scss.shadowNone : scss.shadow,
                          scss.tabletpOnly,
                        )}></div>
                    )}
                    {isExpandablePhone && (
                      <div
                        className={clsx(
                          isExpanded ? scss.shadowNone : scss.shadow,
                          scss.phoneOnly,
                        )}></div>
                    )}
                  </div>

                  {/* Кнопки для разворачивания текста, если он длинный */}
                  {isExpandable && (
                    <button
                      className={clsx(scss.buttonReadMore, isExpandable && scss.buttonReadMoreNone)}
                      onClick={() => toggleExpand(reviewIndex)}>
                      {isExpanded ? 'Show less' : 'Read more'}
                    </button>
                  )}
                  {isExpandableTablet && (
                    <button
                      className={clsx(
                        scss.buttonReadMore,
                        isExpandableTablet && scss.buttonReadMoreTablet,
                      )}
                      onClick={() => toggleExpand(reviewIndex)}>
                      {isExpanded ? 'Show less' : 'Read more'}
                    </button>
                  )}
                  {isExpandablePhone && (
                    <button
                      className={clsx(
                        scss.buttonReadMore,
                        isExpandablePhone && scss.buttonReadMorePhone,
                      )}
                      onClick={() => toggleExpand(reviewIndex)}>
                      {isExpanded ? 'Show less' : 'Read more'}
                    </button>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
      {/* Навигация по отзывам */}
      <div className={scss.sliderReviewNavigation}>
        <p>
          {currentPage <= 9 ? '0' + currentPage : currentPage}/
          {totalPages <= 9 ? '0' + totalPages : totalPages}
        </p>
        <div className={scss.sliderControls}>
          <button
            className={scss.sliderReviewNavigationButton}
            disabled={isFirstGroup} // Отключаем кнопку, если это первая страница
            onClick={handlePrev}>
            <BsArrowLeft className={scss.icon} />
          </button>
          <button
            className={scss.sliderReviewNavigationButton}
            disabled={isLastGroup} // Отключаем кнопку, если это последняя страница
            onClick={handleNext}>
            <BsArrowRight className={scss.icon} />
          </button>
        </div>
      </div>
    </div>
  );
}
