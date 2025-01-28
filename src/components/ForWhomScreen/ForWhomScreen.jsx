import css from './ForWhomScreen.module.css';

export default function ForWhomScreen({ infoForWhom }) {
  return (
    <div className={css.forWhomScreenBlock}>
      {infoForWhom.forWhomScreen.map((info, index) => (
        <div key={index} className={css.forWhomScreenBlock}>
          <h4 className={css.forWhomScreenTitleList}>{info.forWhomScreenTitleList}</h4>
          <h5 className={css.forWhomScreenListTextTitle}>{info.forWhomScreenListTextTitle}</h5>
          <ul className={css.forWhomScreenList}>
            <li>{info.forWhomScreenListTextOne}</li>
            <li>{info.forWhomScreenListTextTwo}</li>
            <li>{info.forWhomScreenListTextThree}</li>
          </ul>
        </div>
      ))}
    </div>
  );
}
