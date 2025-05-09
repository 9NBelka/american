import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import scss from './FormForNewsOnEmailC.module.scss';
import toast from 'react-hot-toast';
import { BsTelephone, BsPerson, BsEnvelope, BsGeoAlt } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { submitForm } from '../../store/formSlice';
import { useEffect } from 'react';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Incorrect email').required('*Required field'),
  firstName: Yup.string().min(2, 'Minimum 2 characters').required('*Required field'),
  lastName: Yup.string().min(2, 'Minimum 2 characters').required('*Required field'),
  country: Yup.string().min(2, 'Minimum 2 characters').required('*Required field'),
  phone: Yup.string()
    .matches(/^\+?[0-9]{10,15}$/, 'Invalid number')
    .required('*Required field'),
});

export default function FormForNewsOnEmailC({ toggleModal, page }) {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.form);

  useEffect(() => {
    if (status === 'succeeded') {
      toast.success('The form is successfully sent!');
    } else if (status === 'failed') {
      toast.error(`Error: ${error}`);
    }
  }, [status, error]);

  return (
    <div className={scss.modalContent}>
      <h2>STUDENT ENQUIRY</h2>

      <Formik
        initialValues={{ email: '', firstName: '', lastName: '', country: '', phone: '' }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          dispatch(submitForm({ page, formData: values }));
          resetForm();
          if (toggleModal) toggleModal();
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
              <p>
                By signing up you agree to Skillshare`s Terms of Service and{' '}
                <Link to='/privacy-policy'>Privacy Policy</Link>.
              </p>
            </div>
            <div className={scss.modalContentSubmitBlock}>
              <button
                type='submit'
                className={scss.modalContentSubmitButton}
                disabled={status === 'loading'}>
                {status === 'loading' ? 'Submitting...' : 'SUBMIT'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
