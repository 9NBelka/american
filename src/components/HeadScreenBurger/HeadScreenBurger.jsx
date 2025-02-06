import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import {
  BsInstagram,
  BsList,
  BsXLg,
  BsController,
  BsCpu,
  BsPlugin,
  BsPeople,
  BsTelegram,
  BsFacebook,
  BsYoutube,
  BsDiscord,
  BsCaretRight,
  BsWhatsapp,
  BsLinkedin,
  BsTwitterX,
  BsReddit,
} from 'react-icons/bs';
import css from './HeadScreenBurger.module.scss';
import { NavLink } from 'react-router-dom';

export default function HeadScreenBurger({ scrollToSection }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null); // Реф для меню

  const toggleMenu = () => setIsOpen(!isOpen);

  // Закрытие меню при клике вне его
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <div onClick={toggleMenu} className={css.burgerIcon}>
        <BsList
          className={clsx(
            css.headerIconBurger,
            isOpen ? css.headerIconBurgerNone : css.headerIconBurger,
          )}
        />
      </div>
      <div ref={menuRef} className={clsx(css.menu, { [css.open]: isOpen })}>
        <div>
          <div className={css.menuLogoAndIcon}>
            <img className={css.menuLogo} src='/src/assets/img/logoBurger.webp' alt='menuLogo' />
            <BsXLg onClick={toggleMenu} className={css.headerIconBurger} />
          </div>
          {/* <h5 className={css.menuListTitle}>Courses</h5>
          <ul className={css.menuList}>
            <li>
              <div className={css.menuListIconSection}>
                <BsController className={css.menuListIcons} />
                <NavLink to='/architecture' className={css.menuListPoint}>
                  <h4>Architecture</h4>
                </NavLink>
              </div>
            </li>
            <li>
              <div className={css.menuListIconSection}>
                <BsPeople className={css.menuListIcons} />
                <NavLink to='/teamlead' className={css.menuListPoint}>
                  <h4>TeamLead</h4>
                </NavLink>
              </div>
            </li>
            <li>
              <div className={css.menuListIconSection}>
                <BsCpu className={css.menuListIcons} />
                <NavLink to='/architecture' className={css.menuListPoint}>
                  <h4>UnitTesting</h4>
                </NavLink>
              </div>
            </li>
            <li>
              <div className={css.menuListIconSection}>
                <BsPlugin className={css.menuListIcons} />
                <NavLink to='/architecture' className={css.menuListPoint}>
                  <h4>UtilityAI</h4>
                </NavLink>
              </div>
            </li>
            <li>
              <div className={css.menuListIconSection}>
                <BsPlugin className={css.menuListIcons} />
                <NavLink to='/architecture' className={css.menuListPoint}>
                  <h4>Addressables</h4>
                </NavLink>
              </div>
            </li>
            <li>
              <div className={css.menuListIconSection}>
                <BsPlugin className={css.menuListIcons} />
                <NavLink to='/architecture' className={css.menuListPoint}>
                  <h4>ECS</h4>
                </NavLink>
              </div>
              <h6 className={css.menuListNewCourse}>new</h6>
            </li>
          </ul> */}
          <h5 className={css.menuListTitle}>Navigation</h5>
          <ul className={css.menuList}>
            <li>
              <div className={css.menuListIconSection}>
                <BsCaretRight className={css.menuListIcons} />
                <a className={css.menuListPoint} onClick={() => scrollToSection('forWhom', 100)}>
                  <h4>For who?</h4>
                </a>
              </div>
            </li>
            <li>
              <div className={css.menuListIconSection}>
                <BsCaretRight className={css.menuListIcons} />
                <a className={css.menuListPoint} onClick={() => scrollToSection('who', 100)}>
                  <h4>Who?</h4>
                </a>
              </div>
            </li>
            <li>
              <div className={css.menuListIconSection}>
                <BsCaretRight className={css.menuListIcons} />
                <a className={css.menuListPoint} onClick={() => scrollToSection('reviews', 100)}>
                  <h4>Reviews</h4>
                </a>
              </div>
            </li>
            <li>
              <div className={css.menuListIconSection}>
                <BsCaretRight className={css.menuListIcons} />
                <a className={css.menuListPoint} onClick={() => scrollToSection('weWorkedOn', 100)}>
                  <h4>We worked on:</h4>
                </a>
              </div>
            </li>
            <li>
              <div className={css.menuListIconSection}>
                <BsCaretRight className={css.menuListIcons} />
                <a
                  className={css.menuListPoint}
                  onClick={() => scrollToSection('whatsInside', 100)}>
                  <h4>What`s inside?</h4>
                </a>
              </div>
            </li>
            <li>
              <div className={css.menuListIconSection}>
                <BsCaretRight className={css.menuListIcons} />
                <a
                  className={css.menuListPoint}
                  onClick={() => scrollToSection('demoLessons', 100)}>
                  <h4>Demo lessons</h4>
                </a>
              </div>
              {/* <h6 className={css.menuListNewCourse}>new</h6> */}
            </li>
          </ul>
        </div>
        <div className={css.menuListIconsAnd}>
          <div className={css.menuListSocialIcons}>
            <BsLinkedin className={css.menuListSocialIcon} />
            <BsTwitterX className={css.menuListSocialIcon} />
            <BsYoutube className={css.menuListSocialIcon} />
            <BsReddit className={css.menuListSocialIcon} />
            <BsWhatsapp className={css.menuListSocialIcon} />
          </div>
          <h5 className={css.menuAuthor}>Authorization</h5>
        </div>
      </div>
    </>
  );
}
