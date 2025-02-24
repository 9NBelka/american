import clsx from 'clsx';
import { useState } from 'react';

import scss from './ReviewsScreenC.module.scss';
import Reviews from './Reviews/Reviews';

export default function ReviewsScreenC({ reviews }) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const reviewsPerPage = 3;
  const reviewsPerPagePhone = 1;

  return (
    <>
      <div className={scss.reviewsPc}>
        <Reviews
          reviews={reviews}
          selectedIdx={selectedIdx}
          setSelectedIdx={setSelectedIdx}
          reviewsPerPage={reviewsPerPage}
        />
      </div>
      <div className={scss.reviewsPhone}>
        <Reviews
          reviews={reviews}
          selectedIdx={selectedIdx}
          setSelectedIdx={setSelectedIdx}
          reviewsPerPage={reviewsPerPagePhone}
        />
      </div>
    </>
  );
}
