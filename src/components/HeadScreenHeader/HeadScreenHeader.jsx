import clsx from 'clsx';
import css from './HeadScreenHeader.module.css';
// import BurgerMenu from '../BurgerMenu/BurgerMenu';
import { useEffect, useState } from 'react';

export default function HeadScreenHeader({ currentInfo, scrollToSection }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    // Проверка скролла при загрузке страницы
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={clsx(css.header, `${isScrolled ? css.headerScrolled : ''}`)}>
      <div className={css.container}>
        <nav className={css.headerNav}>
          <div className={css.headerLogosAndButtonAnswer}>
            <div>
              <img className={clsx(css.headerLogo)} src={currentInfo.logoCourse} alt='icon-logo' />
            </div>
            <div>
              <img className={css.headerLogoUnity} src={currentInfo.logoUnity} alt='icon-unity' />
            </div>
          </div>
          <ul className={css.headerNavText}>
            <li>
              <a onClick={() => scrollToSection('forWhom', 100)}>For whom?</a>
            </li>
            <li>
              <a onClick={() => scrollToSection('who', 100)}>Who?</a>
            </li>
            <li>
              <a onClick={() => scrollToSection('reviews', 100)}>Reviews</a>
            </li>
            <li>
              <a onClick={() => scrollToSection('weWorkedOn', 100)}>We worked on:</a>
            </li>
            <li>
              <a onClick={() => scrollToSection('whatsInside', 100)}>What's inside?</a>
            </li>
            <li>
              <a onClick={() => scrollToSection('demoLessons', 100)}>Demo lessons</a>
            </li>
            <li>
              <a>Our projects</a>
            </li>
          </ul>
          <ul className={css.headerList}>
            <li className={css.headerButtonAnswer}>Ask a question</li>
            <li className={css.headerButtonSingUp}>Sign Up</li>
            {/* <li><BurgerMenu isScrolled={isScrolled} /></li> */}
          </ul>
        </nav>
      </div>
    </header>
  );
}
