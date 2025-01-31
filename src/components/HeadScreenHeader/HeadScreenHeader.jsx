import clsx from 'clsx';
import scss from './HeadScreenHeader.module.scss';
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
    <header className={clsx(scss.header, `${isScrolled ? scss.headerScrolled : ''}`)}>
      <div className={scss.container}>
        <nav className={scss.headerNav}>
          <div className={scss.headerLogosAndButtonAnswer}>
            <div>
              <img className={clsx(scss.headerLogo)} src={currentInfo.logoCourse} alt='icon-logo' />
            </div>
            <div>
              <img className={scss.headerLogoUnity} src={currentInfo.logoUnity} alt='icon-unity' />
            </div>
          </div>
          <ul className={scss.headerNavText}>
            <li>
              <a onClick={() => scrollToSection('forWhom', 100)}>For who?</a>
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
              <a onClick={() => scrollToSection('whatsInside', 100)}>What`s inside?</a>
            </li>
            <li>
              <a onClick={() => scrollToSection('demoLessons', 100)}>Demo lessons</a>
            </li>
          </ul>
          <ul className={scss.headerList}>
            <li className={scss.headerButtonAnswer}>Ask a question</li>
            <li className={scss.headerButtonSingUp}>Sign Up</li>
            {/* <li><BurgerMenu isScrolled={isScrolled} /></li> */}
          </ul>
        </nav>
      </div>
    </header>
  );
}
