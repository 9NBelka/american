import clsx from 'clsx';
import scss from './HeadScreenHeader.module.scss';
import { useEffect, useState } from 'react';
import HeadScreenBurger from '../HeadScreenBurger/HeadScreenBurger';
import { Link } from 'react-router-dom';
import { BsCartFill } from 'react-icons/bs';
import { useSelector } from 'react-redux'; // Добавляем useSelector для доступа к Redux

export default function HeadScreenHeader({
  currentInfo,
  scrollToSection,
  architecturePageA,
  architecturePageB,
  architecturePageC,
  isCloseButton,
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const cartItems = useSelector((state) => state.cart.items); // Получаем товары из корзины

  // Считаем общее количество товаров (суммируем quantity)
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

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
        architecturePageC && scss.headerC,
        isCloseButton && scss.headerDefault,
      )}>
      <div className={scss.container}>
        <nav className={scss.headerNav}>
          <div className={scss.headerLogosAndButtonAnswer}>
            {(architecturePageA || architecturePageC) && (
              <div>
                <img
                  className={clsx(scss.headerLogo)}
                  src={currentInfo.logoCourse}
                  alt='icon-logo'
                  onClick={() => scrollToSection('headerToTop', 100)}
                />
              </div>
            )}
            {architecturePageB && (
              <div>
                <img
                  className={clsx(scss.headerKnowledgeLogoMain)}
                  src={currentInfo.knowledgeLogoMain}
                  alt='icon-logo'
                  onClick={() => scrollToSection('headerToTop', 100)}
                />
              </div>
            )}
            {(architecturePageA || architecturePageC) && (
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
            {(architecturePageB || architecturePageC) && (
              <li>
                <a onClick={() => scrollToSection('price', 100)}>Price</a>
              </li>
            )}
            {architecturePageA && (
              <li>
                <a onClick={() => scrollToSection('price-section', 100)}>Price</a>
              </li>
            )}
          </ul>
          <ul className={scss.headerList}>
            <Link to='/cart' className={scss.cartLink}>
              <BsCartFill className={scss.cartIcon} />
              {cartItemCount > 0 && <span className={scss.cartItemCount}>{cartItemCount}</span>}
            </Link>
            {(architecturePageA || architecturePageC) && (
              <li
                className={clsx(
                  scss.headerButtonAnswer,
                  architecturePageC && scss.headerButtonAnswerC,
                )}>
                Ask a question
              </li>
            )}
            <Link to='https://lms-jet-one.vercel.app/signUp'>
              <li
                className={clsx(
                  scss.headerButtonSingUp,
                  architecturePageB && scss.headerButtonSingUpB,
                  architecturePageC && scss.headerButtonSingUpC,
                )}>
                Sign Up
              </li>
            </Link>
            <Link to='/cart' className={clsx(scss.cartLink, scss.cartLinkTablet)}>
              <BsCartFill className={scss.cartIcon} />
              {cartItemCount > 0 && <span className={scss.cartItemCount}>{cartItemCount}</span>}
            </Link>
            <li className={scss.burgerMenu}>
              <HeadScreenBurger
                isScrolled={isScrolled}
                scrollToSection={scrollToSection}
                architecturePageB={architecturePageB}
                architecturePageC={architecturePageC}
              />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
