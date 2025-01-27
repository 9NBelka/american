import clsx from 'clsx';
import css from './HeadScreenHeader.module.css';
// import BurgerMenu from '../BurgerMenu/BurgerMenu';
import { useEffect, useState } from 'react';

export default function HeadScreenHeader({ info }) {
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
              {info.map((src, index) => (
                <img
                  key={index}
                  className={clsx(css.headerLogo)}
                  src={src.logoCourse}
                  alt='icon-logo'
                />
              ))}
            </div>
            <div>
              {info.map((src, index) => (
                <img
                  key={index}
                  className={css.headerLogoUnity}
                  src={src.logoUnity}
                  alt='icon-unity'
                />
              ))}
            </div>
          </div>
          <ul className={css.headerNavText}>
            <li>
              <a href='#'>For whom?</a>
            </li>
            <li>
              <a href='#'>Who?</a>
            </li>
            <li>
              <a href='#'>Reviews</a>
            </li>
            <li>
              <a href='#'>We worked on:</a>
            </li>
            <li>
              <a href='#'>What's inside?</a>
            </li>
            <li>
              <a href='#'>Demo lessons</a>
            </li>
            <li>
              <a href='#'>Our projects</a>
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
