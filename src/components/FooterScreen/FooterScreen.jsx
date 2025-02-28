import { BsWhatsapp, BsLinkedin, BsTwitterX, BsYoutube, BsReddit } from 'react-icons/bs';
import scss from './FooterScreen.module.scss';
import IntermediaryBuyNow from '../IntermediaryBuyNow/IntermediaryBuyNow';
import { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import clsx from 'clsx';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

export default function FooterScreen({ toggleModal, isOpen }) {
  const [isSubmitted, setIsSubmitted] = useState(false); // Флаг, чтобы предотвратить повторную отправку

  // Схема валидации с использованием Yup
  const validationSchema = Yup.object({
    email: Yup.string().email('The wrong post format').required('Mail is required to fill out'),
  });

  const handleSubmit = (values, { resetForm }) => {
    if (isSubmitted) {
      toast('You have already sent a form!', {
        icon: '👏',
      });
      return;
    }

    // Здесь ты можешь отправить данные, например, на сервер
    console.log('Email sent:', values.email);

    // Помечаем форму как отправленную
    setIsSubmitted(true);
    toast.success('The form is successfully sent!');
    resetForm();
  };

  const footer = true;
  return (
    <div className={scss.footerScreenBlockColumn}>
      <div className={clsx(scss.intermediaryBuyNowPhone)}>
        <IntermediaryBuyNow forStyle={footer} toggleModal={toggleModal} isOpen={isOpen} />
      </div>
      <div className={scss.footerScreenBlocks}>
        <div className={clsx(scss.footerScreenBlock, scss.footerScreenBlockNone)}>
          <h5>Join our newsletter</h5>
          <Formik
            initialValues={{ email: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}>
            <Form className={scss.footerScreenBlockForm}>
              <div className={scss.footerScreenBlockInput}>
                <Field
                  type='email'
                  name='email'
                  placeholder='Enter your email adress'
                  disabled={isSubmitted} // Блокируем поле, если форма уже отправлена
                />

                <button type='submit' disabled={isSubmitted}>
                  Subscribe
                </button>
              </div>
              <ErrorMessage name='email' component='div' className={scss.errorMessage} />
            </Form>
          </Formik>
        </div>
        <div className={scss.footerScreenBlock}>
          <h5>Follow us:</h5>
          <div className={scss.footerScreenBlockIcons}>
            <BsLinkedin className={scss.footerScreenBlockIcon} />
            <BsTwitterX className={scss.footerScreenBlockIcon} />
            <BsYoutube className={scss.footerScreenBlockIcon} />
            <BsReddit className={scss.footerScreenBlockIcon} />
            <BsWhatsapp className={scss.footerScreenBlockIcon} />
          </div>
        </div>
      </div>
      <div className={scss.intermediaryBuyNow}>
        <IntermediaryBuyNow forStyle={footer} toggleModal={toggleModal} isOpen={isOpen} />
      </div>
      <div className={scss.footerScreenBlockInfoColumn}>
        <div className={scss.footerScreenBlockInfo}>
          <Link to='/privacy-policy'>
            <h6>Privacy Policy</h6>
          </Link>
          <Link to='/privacy-policy'>
            <h6>Privacy Policy</h6>
          </Link>
          <Link to='/privacy-policy'>
            <h6>Privacy Policy</h6>
          </Link>
        </div>
        <h6 className={scss.footerScreenGeneralInfo}>
          © 2025 - EDUCBA. ALL RIGHTS RESERVED. THE CERTIFICATION NAMES ARE THE TRADEMARKS OF THEIR
          RESPECTIVE OWNERS.
        </h6>
      </div>
    </div>
  );
}
