import DemoVideosScreen from '../../components/DemoVideosScreen/DemoVideosScreen';
import FooterScreen from '../../components/FooterScreen/FooterScreen';
import ForWhomScreen from '../../components/ForWhomScreen/ForWhomScreen';
import GamesScreen from '../../components/GamesScreen/GamesScreen';
import HeadScreenHeader from '../../components/HeadScreenHeader/HeadScreenHeader';
import HeadScreenTitle from '../../components/HeadScreenTitle/HeadScreenTitle';
import SampleCertificate from '../../components/SampleCertificate/SampleCertificate';
import SpeakersScreen from '../../components/SpeakersScreen/SpeakersScreen';
import StickyProduct from '../../components/StickyProduct/StickyProduct';
import TrustedScreen from '../../components/TrustedScreen/TrustedScreen';
import ViewCourseScreen from '../../components/ViewCourseScreen/ViewCourseScreen';
import WhatsInsideScreen from '../../components/WhatsInsideScreen/WhatsInsideScreen';
import css from './ArchitecturePageOne.module.css';

export default function ArchitecturePageOne({ currentInfo, scrollToSection }) {
  return (
    <>
      <div className={css.backgroundHeadScreen}>
        <HeadScreenHeader currentInfo={currentInfo} scrollToSection={scrollToSection} />
        <div className={css.container}>
          <HeadScreenTitle infoTitleAboutCourse={currentInfo} />
        </div>
      </div>
      <div className={css.container}>
        <div className={css.pageWrapper}>
          <div className={css.leftColumn}>
            <div className={css.backgroundViewCourseScreen}>
              <ViewCourseScreen currentInfo={currentInfo} />
            </div>
            <h3 className={css.titleScreens} id='forWhom'>
              For whom
            </h3>
            <ForWhomScreen infoForWhom={currentInfo} />
            <h3 className={css.titleScreens} id='who'>
              Who
            </h3>
            <SpeakersScreen speakersInfo={currentInfo} />
            <h3 className={css.titleScreens} id='weWorkedOn'>
              We worked on:
            </h3>
            <GamesScreen gamesInfo={currentInfo} />
            <h3 className={css.titleScreens} id='whatsInside'>
              What's inside
            </h3>
            <div className={css.backgroundWhatsInsideScreen}>
              <WhatsInsideScreen programCourseInfo={currentInfo} />
            </div>
            <h3 className={css.titleScreens} id='demoLessons'>
              Demo lessons
            </h3>
            <DemoVideosScreen demoVideos={currentInfo} />
            <h3 className={css.titleScreens}>Sample Certificate</h3>
            <SampleCertificate imageCerctificate={currentInfo} />
            <h3 className={css.titleScreens}>Wу are trusted by:</h3>
          </div>
          <div className={css.rightColumn}>
            <StickyProduct infoAboutProduct={currentInfo} />
          </div>
        </div>
      </div>
      <TrustedScreen imageTrusted={currentInfo} />
      <div className={css.backgroundFooterScreen}>
        <FooterScreen />
      </div>
    </>
  );
}
