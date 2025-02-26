import ViewCourseScreenBuyNowC from '../ViewCourseScreenBuyNowC/ViewCourseScreenBuyNowC';
import ViewCourseScreenVideoC from '../ViewCourseScreenVideoC/ViewCourseScreenVideoC';
import scss from './ViewCourseScreenTabletC.module.scss';

export default function ViewCourseScreenTabletC({ viewCourseInfo, architecturePageC }) {
  return (
    <div className={scss.viewCourseScreenMainBlock}>
      <ViewCourseScreenVideoC
        viewCourseInfo={viewCourseInfo}
        architecturePageC={architecturePageC}
      />
      <ul className={scss.viewCourseScreenList}>
        {viewCourseInfo.viewCourseScreenText.map((text, index) => (
          <li key={index} className={scss.viewCourseScreenItem}>
            {index >= 1 && <h5>{text}</h5>}
          </li>
        ))}
      </ul>
      <ViewCourseScreenBuyNowC viewCourseInfo={viewCourseInfo} />
    </div>
  );
}
