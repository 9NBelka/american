import scss from './ForWhomScreen.module.scss';

export default function ForWhomScreen({ infoForWhom }) {
  return (
    <div className={scss.forWhomScreenBlock}>
      {infoForWhom.forWhomScreen.map((info, index) => (
        <div key={index} className={scss.forWhomScreenBlock}>
          <h4 className={scss.forWhomScreenTitleList}>{info.forWhomScreenTitleList}</h4>
          <h5 className={scss.forWhomScreenListTextTitle}>{info.forWhomScreenListTextTitle}</h5>
          <ul className={scss.forWhomScreenList}>
            <li>{info.forWhomScreenListTextOne}</li>
            <li>{info.forWhomScreenListTextTwo}</li>
            <li>{info.forWhomScreenListTextThree}</li>
          </ul>
        </div>
      ))}
    </div>
  );
}
