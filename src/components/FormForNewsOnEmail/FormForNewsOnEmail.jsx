import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import scss from './FormForNewsOnEmail.module.scss';
import toast from 'react-hot-toast';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import AboutUsText from '../HeadScreenTitle/AboutUsText/AboutUsText';

const validationSchema = Yup.object().shape({
  fullName: Yup.string().min(2, 'Minimum 2 characters').required('*Required field'),
  email: Yup.string().email('Incorrect email').required('*Required field'),
  phone: Yup.string()
    .matches(/^\+?[0-9]{10,15}$/, 'Invalid number')
    .required('*Required field'),
});

export default function FormForNewsOnEmail({ architecturePageB }) {
  return (
    <div>
      <div className={scss.modalOverlay}>
        <AboutUsText architecturePageB={architecturePageB} />
        <Formik
          initialValues={{ email: '', fullName: '', phone: '' }}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            toast.success('The form is successfully sent!', values);
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
                <button type='submit' className={scss.modalContentSubmitButton}>
                  Send
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
