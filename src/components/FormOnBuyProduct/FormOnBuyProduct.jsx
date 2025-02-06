import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import scss from './FormOnBuyProduct.module.scss'; // Подключаем стили
import toast, { Toaster } from 'react-hot-toast';
import clsx from 'clsx';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Некорректный email').required('Обязательное поле'),
  firstName: Yup.string().min(2, 'Минимум 2 символа').required('Обязательное поле'),
  lastName: Yup.string().min(2, 'Минимум 2 символа').required('Обязательное поле'),
  country: Yup.string().required('Выберите страну'),
  phone: Yup.string()
    .matches(/^\+?[0-9]{10,15}$/, 'Некорректный номер')
    .required('Обязательное поле'),
});

export default function FormOnBuyProduct({ toggleModal, isOpen }) {
  return (
    <div>
      <div
        className={clsx(
          scss.modalOverlay,
          isOpen && scss.modalOverlayOpacity,
          !isOpen && scss.modalOverlayOpacityNone,
        )}
        onClick={toggleModal}>
        <div
          className={clsx(scss.modalContent, isOpen && scss.modalContentOpacity)}
          onClick={(e) => e.stopPropagation()}>
          <button className={scss.modalOverlayCloseIcon} onClick={toggleModal}>
            ✖
          </button>
          <h2>STUDENT FORM</h2>

          <Formik
            initialValues={{ email: '', firstName: '', lastName: '', country: '', phone: '' }}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
              toast.success('The form is successfully sent!', values);
              resetForm();
              toggleModal();
            }}>
            {() => (
              <Form className={scss.modalOverlayForm}>
                <div className={scss.modalOverlayFormInputErrorColumn}>
                  <Field type='email' name='email' placeholder='Email' />
                  <ErrorMessage
                    name='email'
                    component='h5'
                    className={scss.modalContentErrorText}
                  />
                </div>

                <div className={scss.modalOverlayFormNameAndSurname}>
                  <div className={scss.modalOverlayFormInputErrorColumn}>
                    <Field type='text' name='firstName' placeholder='First Name' />
                    <ErrorMessage
                      name='firstName'
                      component='h5'
                      className={scss.modalContentErrorText}
                    />
                  </div>
                  <div className={scss.modalOverlayFormInputErrorColumn}>
                    <Field type='text' name='lastName' placeholder='Last Name' />
                    <ErrorMessage
                      name='lastName'
                      component='h5'
                      className={scss.modalContentErrorText}
                    />
                  </div>
                </div>
                <div className={scss.modalOverlayFormInputErrorColumn}>
                  <Field type='text' name='country' placeholder='Country' />
                  <ErrorMessage
                    name='country'
                    component='h5'
                    className={scss.modalContentErrorText}
                  />
                </div>
                <div className={scss.modalOverlayFormInputErrorColumn}>
                  <Field type='text' name='phone' placeholder='Phone' />
                  <ErrorMessage
                    name='phone'
                    component='h5'
                    className={scss.modalContentErrorText}
                  />
                </div>

                <div className={scss.modalContentSubmitBlock}>
                  <button type='submit' className={scss.modalContentSubmitButton}>
                    SUBMIT
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
        <Toaster position='bottom-center' reverseOrder={false} />
      </div>
    </div>
  );
}
