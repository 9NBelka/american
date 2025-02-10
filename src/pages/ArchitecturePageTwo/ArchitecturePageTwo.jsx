import css from './ArchitecturePageTwo.module.css';
import HeadScreenHeader from '../../components/HeadScreenHeader/HeadScreenHeader';
import HeadScreenTitle from '../../components/HeadScreenTitle/HeadScreenTitle';
import { useState } from 'react';
import ViewCourseScreenB from '../../components/ViewCourseScreenB/ViewCourseScreenB';
import ForWhomScreenB from '../../components/ForWhomScreenB/ForWhomScreenB';
import GamesScreen from '../../components/GamesScreen/GamesScreen';
import WhatsInsideScreenB from '../../components/WhatsInsideScreenB/WhatsInsideScreenB';
import DemoVideosScreenB from '../../components/DemoVideosScreenB/DemoVideosScreenB';
import SpeakersScreenB from '../../components/SpeakersScreenB/SpeakersScreenB';
import ReviewsScreenB from '../../components/ReviewsScreenB/ReviewsScreenB';

export default function ArchitecturePageOne({
  currentInfo,
  scrollToSection,
  reviewsArchitecture,
  architecturePageB,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => setIsOpen(!isOpen);

  return (
    <div className={css.mainBackground}>
      <div className={css.backgroundHeadScreen}>
        <HeadScreenHeader
          currentInfo={currentInfo}
          scrollToSection={scrollToSection}
          architecturePageB={architecturePageB}
        />
        <div className={css.container}>
          <HeadScreenTitle
            infoTitleAboutCourse={currentInfo}
            architecturePageB={architecturePageB}
            toggleModal={toggleModal}
            isOpen={isOpen}
          />
        </div>
      </div>
      <div className={css.container}>
        <h3 className={css.titleScreens} id='forWhom'>
          Course Overview
        </h3>
        <ViewCourseScreenB viewCourseInfo={currentInfo} architecturePageB={architecturePageB} />
        <h3 className={css.titleScreens} id='forWhom'>
          For Who?
        </h3>
        <ForWhomScreenB infoForWhom={currentInfo} />
        <h3 className={css.titleScreens} id='forWhom'>
          Who?
        </h3>
        <SpeakersScreenB speakersInfo={currentInfo} />
        <h3 className={css.titleScreens} id='forWhom'>
          Reviews
        </h3>
        <ReviewsScreenB reviews={reviewsArchitecture} />
        <h3 className={css.titleScreens} id='forWhom'>
          We worked on:
        </h3>
        <GamesScreen gamesInfo={currentInfo} architecturePageB={architecturePageB} />
        <h3 className={css.titleScreens} id='forWhom'>
          What’s inside?
        </h3>

        <WhatsInsideScreenB programCourseInfo={currentInfo} />
        <h3 className={css.titleScreens} id='forWhom'>
          Demo lessons
        </h3>
        <DemoVideosScreenB demoVideos={currentInfo} />
      </div>
    </div>
  );
}
