import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import ArchitecturePageOne from './pages/ArchitecturePageOne/ArchitecturePageOne';
import ArchitecturePageTwo from './pages/ArchitecturePageTwo/ArchitecturePageTwo';
import ArchitecturePageThree from './pages/ArchitecturePageThree/ArchitecturePageThree';
import allInfo from './allPagesInformation.json';

const Loading = () => <h1>Загрузка...</h1>;

const TestPage = ({ page, Component, ...restProps }) => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const savedPage = localStorage.getItem('firstPage');

    if (!savedPage) {
      // Сохраняем первую страницу в localStorage
      localStorage.setItem('firstPage', page);
      setIsLoading(false);
    } else if (savedPage !== page) {
      // Редирект на сохранённую страницу с обновлением URL
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

const App = () => {
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
            info={allInfo} // Пропс info для страницы A
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
            info={allInfo} // Пропс info для страницы B
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
            info={allInfo} // Пропс info для страницы C
          />
        }
      />
      {/* Если путь просто /architecture то перенаправляет на страницу А */}
      <Route path='/architecture' element={<ArchitecturePageOne />} />
      {/* Страница 404 */}
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
