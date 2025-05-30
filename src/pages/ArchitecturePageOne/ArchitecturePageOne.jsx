import { useEffect, useState } from 'react';
import DemoVideosScreen from '../../components/DemoVideosScreen/DemoVideosScreen';
import FooterScreen from '../../components/FooterScreen/FooterScreen';
import ForWhomScreen from '../../components/ForWhomScreen/ForWhomScreen';
import GamesScreen from '../../components/GamesScreen/GamesScreen';
import HeadScreenHeader from '../../components/HeadScreenHeader/HeadScreenHeader';
import HeadScreenTitle from '../../components/HeadScreenTitle/HeadScreenTitle';
import ReviewsScreen from '../../components/ReviewsScreen/ReviewsScreen';
import SampleCertificate from '../../components/SampleCertificate/SampleCertificate';
import SpeakersScreen from '../../components/SpeakersScreen/SpeakersScreen';
import StickyProduct from '../../components/StickyProduct/StickyProduct';
import TrustedScreen from '../../components/TrustedScreen/TrustedScreen';
import ViewCourseScreen from '../../components/ViewCourseScreen/ViewCourseScreen';
import WhatsInsideScreen from '../../components/WhatsInsideScreen/WhatsInsideScreen';
import css from './ArchitecturePageOne.module.css';
import FormOnBuyProduct from '../../components/FormOnBuyProduct/FormOnBuyProduct';
import { useDispatch } from 'react-redux';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { addToCart } from '../../store/cartSlice';
import JoinUsScreen from '../../components/JoinUsScreen/JoinUsScreen';
import TopDiscountAndTimer from '../../components/TopDiscountAndTimer/TopDiscountAndTimer';
import clsx from 'clsx';

export default function ArchitecturePageOne({
  currentInfo,
  scrollToSection,
  reviewsArchitecture,
  architecturePageA,
  timer,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => setIsOpen(!isOpen);
  const [products, setProducts] = useState([]);
  const [isCloseButton, setCloseButton] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSpecificProducts = async () => {
      try {
        // Запрашиваем только два конкретных товара по их id
        const productIds = ['dddd', 'ecs5']; // Укажи нужные id
        const productsData = [];

        for (const id of productIds) {
          const docRef = doc(db, 'products', id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            productsData.push({ id: docSnap.id, ...docSnap.data() });
          }
        }

        setProducts(productsData);
      } catch (error) {
        console.error('Ошибка при загрузке товаров:', error);
      }
    };

    fetchSpecificProducts();
  }, []);

  const handleAddToCart = (product) => {
    console.log('Добавляем товар в корзину:', product);
    dispatch(addToCart(product));
  };

  const handleClose = () => {
    setCloseButton(true);
  };

  const staticProduct = true;

  return (
    <>
      <div
        className={clsx(
          css.backgroundDiscountAndTimer,
          isCloseButton && css.backgroundDiscountAndTimerNone,
        )}>
        <div className={css.container}>
          <TopDiscountAndTimer
            timer={timer}
            handleClose={handleClose}
            scrollToSection={scrollToSection}
          />
        </div>
      </div>
      <div className={css.backgroundHeadScreen} id='headerToTop'>
        <HeadScreenHeader
          currentInfo={currentInfo}
          scrollToSection={scrollToSection}
          architecturePageA={architecturePageA}
          isCloseButton={isCloseButton}
        />
        <div className={css.container}>
          <HeadScreenTitle
            infoTitleAboutCourse={currentInfo}
            architecturePageA={architecturePageA}
          />
        </div>
      </div>
      <div className={css.container}>
        <div className={css.pageWrapper}>
          <div className={css.leftColumn}>
            <div className={css.stickyProduct} id='price'>
              <StickyProduct
                infoAboutProduct={currentInfo}
                toggleModal={toggleModal}
                isOpen={isOpen}
                handleAddToCart={handleAddToCart}
                timer={timer}
                product={products[0]}
              />
              <StickyProduct
                infoAboutProduct={currentInfo}
                toggleModal={toggleModal}
                isOpen={isOpen}
                handleAddToCart={handleAddToCart}
                timer={timer}
                product={products[1]}
              />
            </div>
            <div className={css.backgroundViewCourseScreen}>
              <ViewCourseScreen currentInfo={currentInfo} />
            </div>
            <h3 className={css.titleScreens}>Join Us:</h3>
            <JoinUsScreen architecturePageA={architecturePageA} />
            <h3 className={css.titleScreens} id='forWhom'>
              For who
            </h3>
            <ForWhomScreen infoForWhom={currentInfo} />
            <h3 className={css.titleScreens} id='who'>
              Who
            </h3>
            <SpeakersScreen speakersInfo={currentInfo} />
            <h3 className={css.titleScreens} id='reviews'>
              Reviews
            </h3>
            <ReviewsScreen reviews={reviewsArchitecture} />
            <h3 className={css.titleScreens} id='weWorkedOn'>
              We worked on:
            </h3>
            <GamesScreen gamesInfo={currentInfo} />
            <h3 className={css.titleScreens} id='whatsInside'>
              What`s inside
            </h3>
            <WhatsInsideScreen
              programCourseInfo={currentInfo}
              toggleModal={toggleModal}
              isOpen={isOpen}
              scrollToSection={scrollToSection}
            />
            <h3 className={css.titleScreens} id='demoLessons'>
              Demo lessons
            </h3>
            <DemoVideosScreen demoVideos={currentInfo} />
            <div className={css.productOnPc}>
              <h3 className={css.titleScreens} id='price-section'>
                Price
              </h3>
              <div className={css.productAndText}>
                <div className={css.productBlock}>
                  <StickyProduct
                    infoAboutProduct={currentInfo}
                    toggleModal={toggleModal}
                    isOpen={isOpen}
                    handleAddToCart={handleAddToCart}
                    timer={timer}
                    staticProduct={staticProduct}
                    product={products[0]}
                  />
                </div>
                <ul className={css.listProduct}>
                  <li>
                    Subscribe to our channels to miss nothing from news, promotions, promo codes.
                    Among the subscribers of our channel you can also find friends, like-minded
                    people, mentors.
                  </li>
                  <li>
                    Subscribe to our channels to miss nothing from news, promotions, promo codes.
                    Among the subscribers of our channel you can also find friends, like-minded
                    people, mentors.
                  </li>
                  <li>
                    Subscribe to our channels to miss nothing from news, promotions, promo codes.
                    Among the subscribers of our channel you can also find friends, like-minded
                    people, mentors.
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className={css.rightColumn}>
            <StickyProduct
              infoAboutProduct={currentInfo}
              toggleModal={toggleModal}
              isOpen={isOpen}
              handleAddToCart={handleAddToCart}
              product={products[1]}
              timer={timer}
            />
          </div>
        </div>
      </div>

      <div className={css.container}>
        <h3 className={css.titleScreens}>Sample Certificate</h3>
        <SampleCertificate imageCerctificate={currentInfo} />
        <h3 className={css.titleScreens}>We are trusted by:</h3>
      </div>

      <TrustedScreen imageTrusted={currentInfo} />
      <div className={css.backgroundFooterScreen}>
        <FooterScreen
          toggleModal={toggleModal}
          isOpen={isOpen}
          page='ArchitectureA'
          scrollToSection={scrollToSection}
        />
      </div>
      <FormOnBuyProduct toggleModal={toggleModal} isOpen={isOpen} />
    </>
  );
}
