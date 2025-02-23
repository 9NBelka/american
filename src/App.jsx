import { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import ArchitecturePageOne from './pages/ArchitecturePageOne/ArchitecturePageOne';
import ArchitecturePageTwo from './pages/ArchitecturePageTwo/ArchitecturePageTwo';
import ArchitecturePageThree from './pages/ArchitecturePageThree/ArchitecturePageThree';
import TeamLead from './pages/TeamLead/TeamLead';
import allInfo from './allPagesInformation.json';
import reviewsArchitecture from './review-jsons/review-architecture.json';

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

  // Получаем id курса на основе текущего пути
  const getCourseIdByPath = (path) => {
    const course = allInfo.find((item) =>
      Array.isArray(item.path) ? item.path.some((link) => link === path) : item.path === path,
    );

    return course ? course.id : null;
  };

  const courseId = getCourseIdByPath(location.pathname);
  const currentInfo = allInfo.find((item) => item.id === courseId);
  console.log(currentInfo); // Для отладки
  if (!currentInfo) {
    return <NotFoundPage />;
  }

  //плавный скролл
  const scrollToSection = (id, offset = 0) => {
    const element = document.getElementById(id);
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };
  const architecturePageA = true;
  const architecturePageB = true;
  const architecturePageWhiteColorB = true;
  const architecturePageC = true;
  return (
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
            scrollToSection={scrollToSection} // Пропс info для страницы A
            reviewsArchitecture={reviewsArchitecture}
            architecturePageA={architecturePageA}
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
            scrollToSection={scrollToSection} // Пропс info для страницы B
            reviewsArchitecture={reviewsArchitecture}
            architecturePageB={architecturePageB}
            architecturePageWhiteColorB={architecturePageWhiteColorB}
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
            currentInfo={currentInfo} // Пропс info для страницы C
            scrollToSection={scrollToSection}
            reviewsArchitecture={reviewsArchitecture}
            architecturePageC={architecturePageC}
          />
        }
      />
      {/* Если путь просто /architecture то перенаправляет на страницу А */}
      <Route
        path='/architecture'
        element={
          <ArchitecturePageOne
            currentInfo={currentInfo}
            scrollToSection={scrollToSection} // Пропс info для страницы A
            reviewsArchitecture={reviewsArchitecture}
            architecturePageA={architecturePageA}
          />
        }
      />
      <Route path='/teamlead' element={<TeamLead />} />
      {/* Страница 404 */}
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
}
