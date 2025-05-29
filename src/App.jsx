import { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import ArchitecturePageOne from './pages/ArchitecturePageOne/ArchitecturePageOne';
import ArchitecturePageTwo from './pages/ArchitecturePageTwo/ArchitecturePageTwo';
import ArchitecturePageThree from './pages/ArchitecturePageThree/ArchitecturePageThree';
import TeamLead from './pages/TeamLead/TeamLead';
import allInfo from './allPagesInformation.json';
import reviewsArchitecture from './review-jsons/review-architecture.json';
import PrivacyPolicy from './pages/PrivacyPolicy/PrivacyPolicy';
import { Toaster } from 'react-hot-toast';
import { db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';
import Cart from './pages/Cart/Cart';
import CartOrderForm from './components/CartOrderForm/CartOrderForm';
import { fetchTimers } from './store/timersSlice';
import ThankYouPageArchOne from './pages/ThankYouPages/ThankYouPageArchOne/ThankYouPageArchOne';
import ThankYouPageArchTwo from './pages/ThankYouPages/ThankYouPageArchTwo/ThankYouPageArchTwo';
import ThankYouPageArchThree from './pages/ThankYouPages/ThankYouPageArchThree/ThankYouPageArchThree';

const Loading = () => <h1>Загрузка...</h1>;

const TestPage = ({ page, Component, ...restProps }) => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const savedPage = localStorage.getItem('firstPage');

    if (!savedPage) {
      // Сохраняем текущую страницу как первую
      localStorage.setItem('firstPage', page);
      setIsLoading(false);
    } else if (savedPage !== page) {
      // Если сохранённая страница отличается от текущей, делаем редирект
      navigate(`/architecture/${savedPage}`, { replace: true });
    } else {
      setIsLoading(false);
    }
  }, [page, navigate]);

  if (isLoading) {
    return <Loading />;
  }

  // Передаём restProps в целевой компонент
  return <Component {...restProps} />;
};

export default function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { timers, status: timersStatus } = useSelector((state) => state.timers);

  // Fetch timers on component mount
  useEffect(() => {
    dispatch(fetchTimers());
  }, [dispatch]);

  // Получаем id курса на основе текущего пути
  const getCourseIdByPath = (path) => {
    const course = allInfo.find((item) =>
      Array.isArray(item.path) ? item.path.some((link) => link === path) : item.path === path,
    );

    return course ? course.id : null;
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const productsCollection = collection(db, 'products');
      const productsSnapshot = await getDocs(productsCollection);
      const productsList = productsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    };
    fetchProducts();
  }, []);

  const courseId = getCourseIdByPath(location.pathname);
  const currentInfo = allInfo.find((item) => item.id === courseId);
  if (!currentInfo) {
    return <NotFoundPage />;
  }

  // Плавный скролл
  const scrollToSection = (id, offset = 0) => {
    const element = document.getElementById(id);
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  // Find timers for each page
  const timerA = timers.find((timer) => timer.id === 'ArchitectureA') || null;
  const timerB = timers.find((timer) => timer.id === 'ArchitectureB') || null;
  const timerC = timers.find((timer) => timer.id === 'ArchitectureC') || null;

  const architecturePageA = true;
  const architecturePageB = true;
  const architecturePageWhiteColorB = true;
  const architecturePageC = true;

  // Show loading state while fetching timers
  if (timersStatus === 'loading') {
    return <Loading />;
  }

  return (
    <>
      <Routes>
        {/*
         * Если путь /architecture/a то перенаправляет на страницу А - плавающий товар
         * Если путь /architecture/b то перенаправляет на страницу B - человек с компьютером (первый экран)
         * Если путь /architecture/c то перенаправляет на страницу C - синие горы (первый экран)
         */}
        {/* Страница A */}
        <Route
          path='/architecture/a'
          element={
            <TestPage
              page='a'
              Component={ArchitecturePageOne}
              currentInfo={currentInfo}
              scrollToSection={scrollToSection}
              reviewsArchitecture={reviewsArchitecture}
              architecturePageA={architecturePageA}
              timer={timerA} // Pass timer for ArchitectureA
            />
          }
        />
        {/* Страница B */}
        <Route
          path='/architecture/b'
          element={
            <TestPage
              page='b'
              Component={ArchitecturePageTwo}
              currentInfo={currentInfo}
              scrollToSection={scrollToSection}
              reviewsArchitecture={reviewsArchitecture}
              architecturePageB={architecturePageB}
              architecturePageWhiteColorB={architecturePageWhiteColorB}
              timer={timerB} // Pass timer for ArchitectureB
            />
          }
        />
        {/* Страница C */}
        <Route
          path='/architecture/c'
          element={
            <TestPage
              page='c'
              Component={ArchitecturePageThree}
              currentInfo={currentInfo}
              scrollToSection={scrollToSection}
              reviewsArchitecture={reviewsArchitecture}
              architecturePageC={architecturePageC}
              timer={timerC} // Pass timer for ArchitectureC
            />
          }
        />
        {/* Если путь просто /architecture то перенаправляет на страницу А */}
        <Route
          path='/architecture'
          element={
            <ArchitecturePageOne
              currentInfo={currentInfo}
              scrollToSection={scrollToSection}
              reviewsArchitecture={reviewsArchitecture}
              architecturePageA={architecturePageA}
              timer={timerA} // Pass timer for ArchitectureA
            />
          }
        />
        <Route
          path='/'
          element={
            <ArchitecturePageOne
              currentInfo={currentInfo}
              scrollToSection={scrollToSection}
              reviewsArchitecture={reviewsArchitecture}
              architecturePageA={architecturePageA}
              timer={timerA} // Pass timer for ArchitectureA
            />
          }
        />
        <Route path='/teamlead' element={<TeamLead />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/order' element={<CartOrderForm />} />
        <Route path='/privacy-policy' element={<PrivacyPolicy />} />
        <Route path='/thank-you-a' element={<ThankYouPageArchOne />} />
        <Route path='/thank-you-b' element={<ThankYouPageArchTwo />} />
        <Route path='/thank-you-c' element={<ThankYouPageArchThree />} />
        {/* Страница 404 */}
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
      <Toaster position='bottom-center' reverseOrder={false} />
    </>
  );
}
