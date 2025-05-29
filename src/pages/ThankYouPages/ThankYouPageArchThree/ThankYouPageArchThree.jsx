import clsx from 'clsx';
import scss from './ThankYouPageArchThree.module.scss';
import { BsCheckCircle } from 'react-icons/bs';

export default function ThankYouPageArchThree() {
  return (
    <div className={scss.backgroundThankPage}>
      <div className={scss.container}>
        <div className={scss.thankPageMainBlock}>
          <div className={scss.thankPageMainBlockBackground}>
            <h1 className={scss.title}>Thank you!</h1>
            <BsCheckCircle className={scss.completeIcon} />
            <p className={scss.textForLink}>
              To start training, follow the link in{' '}
              <a href='#' target='_blank'>
                discord
              </a>{' '}
              to contact our manager.
            </p>
            <a href='/architecture/c' className={scss.buttonToHomePage}>
              Continue to homepage
            </a>
            <p className={clsx(scss.textForLink, scss.contactUs)}>
              Having a trouble?{' '}
              <a href='#' target='_blank'>
                Contact us.
              </a>{' '}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
