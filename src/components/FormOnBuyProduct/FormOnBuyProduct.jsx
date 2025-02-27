import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import scss from './FormOnBuyProduct.module.scss'; // Подключаем стили
import toast from 'react-hot-toast';
import clsx from 'clsx';
import { BsXLg } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Incorrect email').required('*Required field'),
  firstName: Yup.string().min(2, 'Minimum 2 characters').required('*Required field'),
  lastName: Yup.string().min(2, 'Minimum 2 characters').required('*Required field'),
  country: Yup.string().min(2, 'Minimum 2 characters').required('*Required field'),
  phone: Yup.string()
    .matches(/^\+?[0-9]{10,15}$/, 'Invalid number')
    .required('*Required field'),
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
          <BsXLg className={scss.modalOverlayCloseIcon} onClick={toggleModal} />

          <h2>STUDENT FORM</h2>

          <Formik
            initialValues={{ email: '', firstName: '', lastName: '', country: '', phone: '' }}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
              toast.success('The form is successfully sent!', values);
              resetForm();
              // toggleModal();
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
                <div className={scss.formPrivacyPolicy}>
                  <p>
                    By signing up you agree to Skillshare`s Terms of Service and{' '}
                    <Link to='/privacy-policy'>Privacy Policy</Link>.
                  </p>
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
      </div>
    </div>
  );
}
