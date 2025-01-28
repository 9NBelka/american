import css from './ViewCourseScreen.module.css';
import { BsArrowRightShort } from 'react-icons/bs';

export default function ViewCourseScreen({ currentInfo }) {
  return (
    <ul className={css.viewCourseScreenList}>
      {currentInfo.viewCourseScreenText.map((text, index) => (
        <li key={index} className={css.viewCourseScreenItem}>
          <BsArrowRightShort className={css.viewCourseScreenIcon} />
          <h5>{text}</h5>
        </li>
      ))}
    </ul>
  );
}
