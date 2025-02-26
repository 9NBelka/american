import ViewCourseScreen from '../../ViewCourseScreen/ViewCourseScreen';
import scss from './ViewCourseScreenVideoC.module.scss';

export default function ViewCourseScreenVideoC({ viewCourseInfo, architecturePageC }) {
  return (
    <div className={scss.viewCourseScreenBlockVideoText}>
      <iframe
        src={viewCourseInfo.stickyBlockVideo}
        className={scss.viewCourseScreenVideo}
        title='YouTube video player'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen;'
        referrerPolicy='strict-origin-when-cross-origin'></iframe>
      <div className={scss.viewCourseScreenText}>
        <ViewCourseScreen currentInfo={viewCourseInfo} architecturePageC={architecturePageC} />
      </div>
      <ul className={scss.viewCourseScreenList}>
        {viewCourseInfo.viewCourseScreenText.map((text, index) => (
          <li key={index} className={scss.viewCourseScreenItem}>
            {index === 0 && <h5>{text}</h5>}
          </li>
        ))}
      </ul>
    </div>
  );
}
