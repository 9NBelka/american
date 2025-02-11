import clsx from 'clsx';
import scss from './ForWhomScreenBPhone.module.scss';

export default function ForWhomScreenBPhone({ infoForWhom }) {
  return (
    <>
      {infoForWhom.forWhomScreen.map((info, index) => (
        <div
          key={index}
          className={clsx(scss.forWhomScreenBlockPhone, index == 0 && scss.firstChild)}>
          <h4>{info.forWhomScreenTitleList}</h4>
          <h5>{info.forWhomScreenListTextTitle}</h5>
          <p>{info.forWhomScreenListTextOne}</p>
          <p>{info.forWhomScreenListTextTwo}</p>
          <p>{info.forWhomScreenListTextThree}</p>
        </div>
      ))}
    </>
  );
}
