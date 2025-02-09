import scss from './WhatsInsideScreenB.module.scss';

export default function WhatsInsideScreenB({ programCourseInfo }) {
  return (
    <div className={scss.insideScreenBlockMain}>
      {programCourseInfo.insideScreen.map((info, index) => (
        <div key={index} className={scss.insideScreenBlock}>
          <div className={scss.insideScreenTitleAndContent}>
            <h3>{info.insideScreenTitle}</h3>
            <h5>{info.insideScreenContent}</h5>
          </div>
        </div>
      ))}
    </div>
  );
}
