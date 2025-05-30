import scss from './NotFoundPage.module.scss';
import { useNavigate } from 'react-router-dom';
import { BsBoxArrowInRight } from 'react-icons/bs';

export default function NotFoundPage() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <div className={scss.backgroundBlock}>
      <div className={scss.imageSnakes}>
        <img src='/img/NotFoundPageImageSnakes.png' alt='Snakes' />
      </div>
      <div className={scss.textsBlock}>
        <h3 className={scss.textError}>error</h3>
        <h1 className={scss.textErrorNumb}>404</h1>
        <p>the page was swallowed by monsters</p>
        <a className={scss.buttonBack} onClick={handleGoBack}>
          Back to WebSite <BsBoxArrowInRight className={scss.icon} />
        </a>
      </div>
    </div>
  );
}
