import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import scss from './FormForNewsOnEmailC.module.scss'; // Подключаем стили
import toast, { Toaster } from 'react-hot-toast';
import clsx from 'clsx';
import { BsTelephone, BsPerson, BsEnvelope, BsGeoAlt } from 'react-icons/bs';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Incorrect email').required('*Required field'),
  firstName: Yup.string().min(2, 'Minimum 2 characters').required('*Required field'),
  lastName: Yup.string().min(2, 'Minimum 2 characters').required('*Required field'),
  country: Yup.string().min(2, 'Minimum 2 characters').required('*Required field'),
  phone: Yup.string()
    .matches(/^\+?[0-9]{10,15}$/, 'Invalid number')
    .required('*Required field'),
});

export default function FormForNewsOnEmailC({ toggleModal, isOpen }) {
  return (
    <div className={scss.modalContent}>
      <h2>STUDENT ENQUIRY</h2>

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
              <div className={scss.iconAndInput}>
                <BsPerson className={scss.iconInput} />
                <Field type='text' name='firstName' placeholder='Your name' />
              </div>
              <ErrorMessage
                name='firstName'
                component='h5'
                className={scss.modalContentErrorText}
              />
            </div>
            <div className={scss.modalOverlayFormInputErrorColumn}>
              <div className={scss.iconAndInput}>
                <BsPerson className={scss.iconInput} />
                <Field type='text' name='lastName' placeholder='Last Name' />
              </div>
              <ErrorMessage name='lastName' component='h5' className={scss.modalContentErrorText} />
            </div>
            <div className={scss.modalOverlayFormInputErrorColumn}>
              <div className={scss.iconAndInput}>
                <BsTelephone className={scss.iconInput} />
                <Field type='text' name='phone' placeholder='Mobile no' />
              </div>
              <ErrorMessage name='phone' component='h5' className={scss.modalContentErrorText} />
            </div>
            <div className={scss.modalOverlayFormInputErrorColumn}>
              <div className={scss.iconAndInput}>
                <BsEnvelope className={scss.iconInput} />
                <Field type='email' name='email' placeholder='Email id' />
              </div>
              <ErrorMessage name='email' component='h5' className={scss.modalContentErrorText} />
            </div>

            <div className={scss.modalOverlayFormInputErrorColumn}>
              <div className={scss.iconAndInput}>
                <BsGeoAlt className={scss.iconInput} />
                <Field type='text' name='country' placeholder='Country' />
              </div>
              <ErrorMessage name='country' component='h5' className={scss.modalContentErrorText} />
            </div>
            <div className={scss.formPrivacyPolicy}>
              <p>By signing up you agree to Skillshare's Terms of Service and Privacy Policy.</p>
            </div>
            <div className={scss.modalContentSubmitBlock}>
              <button type='submit' className={scss.modalContentSubmitButton}>
                SUBMIT
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <Toaster position='bottom-center' reverseOrder={false} />
    </div>
  );
}
