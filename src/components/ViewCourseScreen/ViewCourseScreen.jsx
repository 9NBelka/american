import clsx from 'clsx';
import scss from './ViewCourseScreen.module.scss';
import { BsArrowRightShort } from 'react-icons/bs';

export default function ViewCourseScreen({ currentInfo, architecturePageC }) {
  return (
    <ul
      className={clsx(scss.viewCourseScreenList, architecturePageC && scss.viewCourseScreenListC)}>
      {currentInfo.viewCourseScreenText.map((text, index) => (
        <li
          key={index}
          className={clsx(
            scss.viewCourseScreenItem,
            architecturePageC && scss.viewCourseScreenItemB,
          )}>
          {!architecturePageC && <BsArrowRightShort className={scss.viewCourseScreenIcon} />}
          <h5>{text}</h5>
        </li>
      ))}
    </ul>
  );
}
