import HeadScreenHeader from '../../components/HeadScreenHeader/HeadScreenHeader';
import HeadScreenTitle from '../../components/HeadScreenTitle/HeadScreenTitle';
import StickyProduct from '../../components/StickyProduct/StickyProduct';
import css from './ArchitecturePageOne.module.css';

export default function ArchitecturePageOne({ info }) {
  return (
    <div className={css.backgroundHeadScreen}>
      <HeadScreenHeader info={info} />
      <div className={css.container}>
        <div className={css.pageWrapper}>
          <div className={css.leftColumn}>
            <div className={css.backgroundHeadScreen}>
              <HeadScreenTitle infoTitleAboutCourse={info} />
            </div>
          </div>
          <div className={css.rightColumn}>
            <StickyProduct video={info} infoAboutProduct={info} />
          </div>
        </div>
      </div>
    </div>
  );
}
