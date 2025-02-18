import clsx from 'clsx';
import scss from './ForWhomScreenC.module.scss';

export default function ForWhomScreenC({ infoForWhom }) {
  return (
    <div className={scss.forWhomScreenMain}>
      {infoForWhom.forWhomScreen.map((info, index) => (
        <div key={index} className={scss.forWhomScreenBlock}>
          <img
            className={scss.forWhomScreenImageBackground}
            src={info.forWhomScreenImageBackground}
            alt={info.forWhomScreenTitleList}
          />
          <div className={scss.forWhomScreenBlockInfoAbsolute}>
            <div>
              <h4 className={scss.forWhomScreenTitle}>{info.forWhomScreenTitleList}</h4>
              <h4
                className={clsx(
                  scss.forWhomScreenDescription,
                  scss.forWhomScreenDescriptionSubTitle,
                )}>
                {info.forWhomScreenListTextTitle}
              </h4>
            </div>
            <div className={scss.forWhomScreenDescriptionBlock}>
              <h5 className={scss.forWhomScreenDescription}>{info.forWhomScreenListTextOne}</h5>
              <h5 className={scss.forWhomScreenDescription}>{info.forWhomScreenListTextTwo}</h5>
              <h5 className={scss.forWhomScreenDescription}>{info.forWhomScreenListTextThree}</h5>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
