import { BsWhatsapp } from 'react-icons/bs';
import scss from './FooterScreen.module.scss';
import IntermediaryBuyNow from '../IntermediaryBuyNow/IntermediaryBuyNow';
import { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export default function FooterScreen() {
  const [isSubmitted, setIsSubmitted] = useState(false); // Флаг, чтобы предотвратить повторную отправку

  // Схема валидации с использованием Yup
  const validationSchema = Yup.object({
    email: Yup.string()
      .email('The wrong post format') // Проверка на формат email
      .required('Mail is required to fill out'),
  });

  const handleSubmit = (values) => {
    if (isSubmitted) {
      alert('You have already sent a form!');
      return;
    }

    // Здесь ты можешь отправить данные, например, на сервер
    console.log('Email sent:', values.email);

    // Помечаем форму как отправленную
    setIsSubmitted(true);
    alert('The form is successfully sent!');
  };

  const footer = true;
  return (
    <div className={scss.footerScreenBlockColumn}>
      <div className={scss.footerScreenBlocks}>
        <div className={scss.footerScreenBlock}>
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
            <BsWhatsapp className={scss.footerScreenBlockIcon} />
            <BsWhatsapp className={scss.footerScreenBlockIcon} />
            <BsWhatsapp className={scss.footerScreenBlockIcon} />
            <BsWhatsapp className={scss.footerScreenBlockIcon} />
            <BsWhatsapp className={scss.footerScreenBlockIcon} />
          </div>
        </div>
      </div>
      <IntermediaryBuyNow forStyle={footer} />
      <div className={scss.footerScreenBlockInfoColumn}>
        <div className={scss.footerScreenBlockInfo}>
          <a href='#'>
            <h6>Privacy Policy</h6>
          </a>
          <a href='#'>
            <h6>Privacy Policy</h6>
          </a>
          <a href='#'>
            <h6>Privacy Policy</h6>
          </a>
        </div>
        <h6 className={scss.footerScreenGeneralInfo}>
          © 2025 - EDUCBA. ALL RIGHTS RESERVED. THE CERTIFICATION NAMES ARE THE TRADEMARKS OF THEIR
          RESPECTIVE OWNERS.
        </h6>
      </div>
    </div>
  );
}
