import css from './ArchitecturePageTwo.module.css';
import HeadScreenHeader from '../../components/HeadScreenHeader/HeadScreenHeader';
import HeadScreenTitle from '../../components/HeadScreenTitle/HeadScreenTitle';
import { useState } from 'react';
import ViewCourseScreenB from '../../components/ViewCourseScreenB/ViewCourseScreenB';
import ForWhomScreenB from '../../components/ForWhomScreenB/ForWhomScreenB';
import GamesScreen from '../../components/GamesScreen/GamesScreen';
import WhatsInsideScreen from '../../components/WhatsInsideScreen/WhatsInsideScreen';
import WhatsInsideScreenB from '../../components/WhatsInsideScreenB/WhatsInsideScreenB';
import DemoVideosScreenB from '../../components/DemoVideosScreenB/DemoVideosScreenB';
import SpeakersScreenB from '../../components/SpeakersScreenB/SpeakersScreenB';
import ReviewsScreenB from '../../components/ReviewsScreenB/ReviewsScreenB';
import PriceScreenB from '../../components/PriceScreenB/PriceScreenB';
import TrustedScreenB from '../../components/TrustedScreenB/TrustedScreenB';
import FooterScreenB from '../../components/FooterScreenB/FooterScreenB';

export default function ArchitecturePageOne({
  currentInfo,
  scrollToSection,
  reviewsArchitecture,
  architecturePageB,
  architecturePageWhiteColorB,
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

        <div className={css.gamesScreenBNonePhone}>
          <GamesScreen gamesInfo={currentInfo} architecturePageB={architecturePageB} />
        </div>
        <div className={css.gamesScreenPhone}>
          <GamesScreen
            gamesInfo={currentInfo}
            architecturePageWhiteColorB={architecturePageWhiteColorB}
          />
        </div>
        <h3 className={css.titleScreens} id='forWhom'>
          What’s inside?
        </h3>
        <div className={css.whatsInsideScreenBNonePhone}>
          <WhatsInsideScreenB programCourseInfo={currentInfo} />
        </div>
        <div className={css.whatsInsideScreenPhone}>
          <WhatsInsideScreen
            programCourseInfo={currentInfo}
            toggleModal={toggleModal}
            isOpen={isOpen}
            architecturePageB={architecturePageB}
          />
        </div>
        <h3 className={css.titleScreens} id='forWhom'>
          Demo lessons
        </h3>
        <DemoVideosScreenB demoVideos={currentInfo} />
        <h3 className={css.titleScreens} id='forWhom'>
          Price
        </h3>
        <PriceScreenB infoAboutProduct={currentInfo} />
        <h3 className={css.titleScreens} id='forWhom'>
          We worked with:
        </h3>
        <TrustedScreenB imageTrusted={currentInfo} />
        <FooterScreenB imageLogo={currentInfo} />
      </div>
    </div>
  );
}
