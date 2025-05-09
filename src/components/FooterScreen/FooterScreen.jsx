import { BsWhatsapp, BsLinkedin, BsTwitterX, BsYoutube, BsReddit } from 'react-icons/bs';
import scss from './FooterScreen.module.scss';
import IntermediaryBuyNow from '../IntermediaryBuyNow/IntermediaryBuyNow';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import clsx from 'clsx';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { submitForm } from '../../store/formSlice';

const validationSchema = Yup.object({
  email: Yup.string().email('The wrong post format').required('Mail is required to fill out'),
});

export default function FooterScreen({ toggleModal, isOpen, page, scrollToSection }) {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.form);

  useEffect(() => {
    if (status === 'succeeded') {
      toast.success('The form is successfully sent!');
    } else if (status === 'failed') {
      toast.error(`Error: ${error}`);
    }
  }, [status, error]);

  const footer = true;
  return (
    <div className={scss.footerScreenBlockColumn}>
      <div className={clsx(scss.intermediaryBuyNowPhone)}>
        <IntermediaryBuyNow
          forStyle={footer}
          toggleModal={toggleModal}
          isOpen={isOpen}
          scrollToSection={scrollToSection}
        />
      </div>
      <div className={scss.footerScreenBlocks}>
        <div className={clsx(scss.footerScreenBlock, scss.footerScreenBlockNone)}>
          <h5>Join our newsletter</h5>
          <Formik
            initialValues={{ email: '' }}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
              dispatch(submitForm({ page, formData: values }));
              resetForm();
            }}>
            {() => (
              <Form className={scss.footerScreenBlockForm}>
                <div className={scss.footerScreenBlockInput}>
                  <Field
                    type='email'
                    name='email'
                    placeholder='Enter your email address'
                    disabled={status === 'loading'}
                  />
                  <button type='submit' disabled={status === 'loading'}>
                    {status === 'loading' ? 'Sending...' : 'Subscribe'}
                  </button>
                </div>
                <ErrorMessage name='email' component='div' className={scss.errorMessage} />
              </Form>
            )}
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
        <IntermediaryBuyNow
          forStyle={footer}
          toggleModal={toggleModal}
          isOpen={isOpen}
          scrollToSection={scrollToSection}
        />
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
