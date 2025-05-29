import clsx from 'clsx';
import scss from './ThankYouPageArchTwo.module.scss';

export default function ThankYouPageArchTwo() {
  return (
    <div className={scss.backgroundThankPage}>
      <div className={scss.container}>
        <div className={scss.thankPageMainBlock}>
          <h1 className={scss.title}>Thank you!</h1>
          <p className={scss.textForLink}>
            Congratulations on purchasing the course! To start training, follow the link in{' '}
            <a href='#' target='_blank'>
              discord
            </a>{' '}
            to contact our manager.
          </p>
          <p className={clsx(scss.textForLink, scss.contactUs)}>
            Having a trouble?{' '}
            <a href='#' target='_blank'>
              Contact us.
            </a>{' '}
          </p>
          <a href='/architecture/b' className={scss.buttonToHomePage}>
            Continue to homepage
          </a>
        </div>
      </div>
    </div>
  );
}
