import scss from './ViewCourseScreen.module.scss';
import { BsArrowRightShort } from 'react-icons/bs';

export default function ViewCourseScreen({ currentInfo }) {
  return (
    <ul className={scss.viewCourseScreenList}>
      {currentInfo.viewCourseScreenText.map((text, index) => (
        <li key={index} className={scss.viewCourseScreenItem}>
          <BsArrowRightShort className={scss.viewCourseScreenIcon} />
          <h5>{text}</h5>
        </li>
      ))}
    </ul>
  );
}
