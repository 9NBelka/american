import ViewCourseScreenBuyNowC from './ViewCourseScreenBuyNowC/ViewCourseScreenBuyNowC';
import scss from './ViewCourseScreenC.module.scss';
import ViewCourseScreenTabletC from './ViewCourseScreenTabletC/ViewCourseScreenTabletC';
import ViewCourseScreenVideoC from './ViewCourseScreenVideoC/ViewCourseScreenVideoC';

export default function ViewCourseScreenC({ viewCourseInfo, architecturePageC }) {
  return (
    <>
      <div className={scss.viewCourseScreenMainBlock}>
        <ViewCourseScreenVideoC
          viewCourseInfo={viewCourseInfo}
          architecturePageC={architecturePageC}
        />
        <ViewCourseScreenBuyNowC viewCourseInfo={viewCourseInfo} />
      </div>
      <div className={scss.viewCourseScreenMainBlockPhone}>
        <ViewCourseScreenTabletC
          viewCourseInfo={viewCourseInfo}
          architecturePageC={architecturePageC}
        />
      </div>
    </>
  );
}
