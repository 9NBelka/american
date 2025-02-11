import clsx from 'clsx';
import scss from './ViewCourseScreenB.module.scss';

export default function ViewCourseScreenB({ viewCourseInfo, architecturePageB }) {
  return (
    <div className={scss.viewCourseScreen}>
      {viewCourseInfo.viewCourseScreenTextForBPage.map((item, index) => (
        <div key={index}>
          {index % 2 === 0 ? (
            <div className={scss.viewCourseScreenBlockRow}>
              <ul className={scss.viewCourseScreenList}>
                {item.text.map((text, textIndex) => (
                  <li key={textIndex}>
                    {architecturePageB && <h5>{textIndex + 1}.</h5>}
                    <h5>{text}</h5>
                  </li>
                ))}
              </ul>

              <iframe src={item.video} allow='autoplay; encrypted-media' allowFullScreen></iframe>
            </div>
          ) : (
            <div
              className={clsx(
                scss.viewCourseScreenBlockRow,
                scss.viewCourseScreenBlockRowNoReverse,
              )}>
              <iframe src={item.video} allow='autoplay; encrypted-media' allowFullScreen></iframe>

              <ul className={scss.viewCourseScreenList}>
                {item.text.map((text, textIndex) => (
                  <li key={textIndex}>
                    {architecturePageB && <h5>{textIndex + 3}.</h5>}
                    <h5>{text}</h5>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
