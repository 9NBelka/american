import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import scss from './FormForNewsOnEmail.module.scss';
import toast from 'react-hot-toast';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import AboutUsText from '../HeadScreenTitle/AboutUsText/AboutUsText';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { submitForm } from '../../store/formSlice';

const validationSchema = Yup.object().shape({
  fullName: Yup.string().min(2, 'Minimum 2 characters').required('*Required field'),
  email: Yup.string().email('Incorrect email').required('*Required field'),
  phone: Yup.string()
    .matches(/^\+?[0-9]{10,15}$/, 'Invalid number')
    .required('*Required field'),
});

export default function FormForNewsOnEmail({ architecturePageB, page }) {
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
    <div>
      <div className={scss.modalOverlay}>
        <AboutUsText architecturePageB={architecturePageB} />
        <Formik
          initialValues={{ email: '', fullName: '', phone: '' }}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            dispatch(submitForm({ page, formData: values }));
            resetForm();
          }}>
          {() => (
            <Form className={scss.modalOverlayForm}>
              <h2>STUDENT’S FORM</h2>
              <div className={clsx(scss.modalOverlayFormInputErrorColumn, scss.firstChild)}>
                <label>full name</label>
                <Field type='text' name='fullName' placeholder='Knowledge Syndicate' />
                <ErrorMessage
                  name='fullName'
                  component='h5'
                  className={scss.modalContentErrorText}
                />
              </div>

              <div className={scss.modalOverlayFormInputErrorColumn}>
                <label>phone</label>
                <Field type='text' name='phone' placeholder='+ (380) 990915435' />
                <ErrorMessage name='phone' component='h5' className={scss.modalContentErrorText} />
              </div>

              <div className={scss.modalOverlayFormInputErrorColumn}>
                <label>email</label>
                <Field type='email' name='email' placeholder='k.syndicate@gmail.com' />
                <ErrorMessage name='email' component='h5' className={scss.modalContentErrorText} />
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
                  {status === 'loading' ? 'Sending...' : 'Send'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
