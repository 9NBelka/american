import ForWhomScreen from '../../components/ForWhomScreen/ForWhomScreen';
import GamesScreen from '../../components/GamesScreen/GamesScreen';
import HeadScreenHeader from '../../components/HeadScreenHeader/HeadScreenHeader';
import HeadScreenTitle from '../../components/HeadScreenTitle/HeadScreenTitle';
import SpeakersScreen from '../../components/SpeakersScreen/SpeakersScreen';
import StickyProduct from '../../components/StickyProduct/StickyProduct';
import ViewCourseScreen from '../../components/ViewCourseScreen/ViewCourseScreen';
import css from './ArchitecturePageOne.module.css';

export default function ArchitecturePageOne({ currentInfo }) {
  return (
    <>
      <div className={css.backgroundHeadScreen}>
        <HeadScreenHeader currentInfo={currentInfo} />
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
            <h3 className={css.titleScreens}>For whom</h3>
            <ForWhomScreen infoForWhom={currentInfo} />
            <h3 className={css.titleScreens}>Who</h3>
            <SpeakersScreen speakersInfo={currentInfo} />
            <h3 className={css.titleScreens}>We worked on:</h3>
            <GamesScreen gamesInfo={currentInfo} />
          </div>
          <div className={css.rightColumn}>
            <StickyProduct infoAboutProduct={currentInfo} />
          </div>
        </div>
      </div>
    </>
  );
}
