import clsx from 'clsx';
import scss from './HeadScreenHeader.module.scss';
// import BurgerMenu from '../BurgerMenu/BurgerMenu';
import { useEffect, useState } from 'react';
import HeadScreenBurger from '../HeadScreenBurger/HeadScreenBurger';

export default function HeadScreenHeader({
  currentInfo,
  scrollToSection,
  architecturePageA,
  architecturePageB,
}) {
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
    <header
      className={clsx(
        scss.header,
        `${isScrolled ? scss.headerScrolled : ''}`,
        architecturePageB && scss.headerB,
      )}>
      <div className={scss.container}>
        <nav className={scss.headerNav}>
          <div className={scss.headerLogosAndButtonAnswer}>
            {architecturePageA && (
              <div>
                <img
                  className={clsx(scss.headerLogo)}
                  src={currentInfo.logoCourse}
                  alt='icon-logo'
                />
              </div>
            )}
            {architecturePageB && (
              <div>
                <img
                  className={clsx(scss.headerKnowledgeLogoMain)}
                  src={currentInfo.knowledgeLogoMain}
                  alt='icon-logo'
                />
              </div>
            )}
            {architecturePageA && (
              <div>
                <img
                  className={scss.headerLogoUnity}
                  src={currentInfo.logoUnity}
                  alt='icon-unity'
                />
              </div>
            )}
          </div>
          <ul className={clsx(scss.headerNavText, architecturePageB && scss.headerNavTextB)}>
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
            {architecturePageB && (
              <li>
                <a onClick={() => scrollToSection('price', 100)}>Price</a>
              </li>
            )}
          </ul>
          <ul className={scss.headerList}>
            {architecturePageA && <li className={scss.headerButtonAnswer}>Ask a question</li>}
            <li
              className={clsx(
                scss.headerButtonSingUp,
                architecturePageB && scss.headerButtonSingUpB,
              )}>
              Sign Up
            </li>
            <li className={scss.burgerMenu}>
              <HeadScreenBurger
                isScrolled={isScrolled}
                scrollToSection={scrollToSection}
                architecturePageB={architecturePageB}
              />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
