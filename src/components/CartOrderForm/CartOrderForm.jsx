import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../../store/cartSlice';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import scss from './CartOrderForm.module.scss';
import { useNavigate } from 'react-router-dom';
import HeadScreenHeaderCart from '../HeadScreenHeaderCart/HeadScreenHeaderCart';
import { BsArrowLeftShort } from 'react-icons/bs';
import { AnimatePresence, motion } from 'framer-motion';

export default function CartOrderForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const appliedPromoCode = useSelector((state) => state.cart.appliedPromoCode); // Assuming promo code is stored in Redux

  // Calculate total price (similar to Cart component)
  const calculateTotalPrice = () => {
    let totalPrice = cartItems.reduce((total, item) => {
      const itemPrice =
        'discountedPrice' in item && item.discountedPrice > 0
          ? item.discountedPrice
          : item.priceProduct;
      return total + itemPrice * item.quantity;
    }, 0);

    let totalOriginalPrice = cartItems.reduce(
      (total, item) => total + item.priceProduct * item.quantity,
      0,
    );

    let promoDiscount = 0;
    if (appliedPromoCode) {
      const applicableItems = cartItems.filter((item) =>
        appliedPromoCode.items.some(
          (promoItem) => promoItem.productId === item.id && promoItem.accessLevelId === item.access,
        ),
      );
      promoDiscount = applicableItems.reduce((discount, item) => {
        const itemPrice =
          'discountedPrice' in item && item.discountedPrice > 0
            ? item.discountedPrice
            : item.priceProduct;
        const discountAmount = (itemPrice * item.quantity * appliedPromoCode.discountPercent) / 100;
        return discount + discountAmount;
      }, 0);
      totalPrice -= promoDiscount;
    }

    return { totalPrice, totalOriginalPrice, promoDiscount };
  };

  const { totalPrice, totalOriginalPrice, promoDiscount } = calculateTotalPrice();

  // Form validation schema using Yup
  const validationSchema = Yup.object({
    firstName: Yup.string()
      .required('First name is required')
      .matches(/^[A-Za-z\s-]+$/i, 'First name must contain only letters, spaces, or hyphens'),
    lastName: Yup.string()
      .required('Last name is required')
      .matches(/^[A-Za-z\s-]+$/i, 'Last name must contain only letters, spaces, or hyphens'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required')
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        'Email must be a valid email address',
      ),
    phone: Yup.string()
      .required('Phone number is required')
      .matches(
        /^\+?[\d\s()-]+$/,
        'Phone number must contain only numbers, spaces, dashes, parentheses, or a leading +',
      )
      .min(7, 'Phone number must be at least 7 digits long')
      .max(15, 'Phone number must not exceed 15 digits'),
    address: Yup.string()
      .required('Address is required')
      .min(10, 'Address must be at least 10 characters long')
      .matches(
        /^[A-Za-z0-9\s,.-]+$/,
        'Address can only contain letters, numbers, spaces, commas, periods, or hyphens',
      ),
  });

  // Initial form values
  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
  };

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const orderData = {
        userDetails: {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email, // Email comes from the form input, not auth
          phone: values.phone,
          address: values.address,
        },
        items: cartItems.map((item) => ({
          id: item.id,
          nameProduct: item.nameProduct,
          priceProduct: item.priceProduct,
          discountedPrice: item.discountedPrice || 0,
          discountPercent: item.discountPercent || 0,
          quantity: item.quantity,
          access: item.access,
        })),
        totalPrice: totalPrice.toFixed(2),
        totalOriginalPrice: totalOriginalPrice.toFixed(2),
        promoCode: appliedPromoCode
          ? {
              name: appliedPromoCode.name,
              discountPercent: appliedPromoCode.discountPercent,
              applicableItems: appliedPromoCode.items,
              discountAmount: promoDiscount.toFixed(2),
            }
          : null,
        paymentStatus: 'Processing', // Default status
        createdAt: new Date().toISOString(),
      };

      // Save to Firebase 'orders' collection
      await addDoc(collection(db, 'orders'), orderData);

      // Clear the cart after successful order
      dispatch(clearCart());

      toast.success('Order placed successfully!');
      resetForm();

      // Navigate to a confirmation page or back to home
      navigate('/');
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('Failed to place order: ' + error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
  };

  const totalVariants = {
    initial: { scale: 1 },
    animate: { scale: [1, 1.05, 1], transition: { duration: 0.3 } },
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className={scss.orderFormBackgroundMain}>
      <div className={scss.orderFormContainer}>
        <HeadScreenHeaderCart />
        <div className={scss.backButtonBlock}>
          <button className={scss.backButton} onClick={handleGoBack}>
            <BsArrowLeftShort className={scss.backIcon} /> Back
          </button>
        </div>

        <h1 className={scss.orderFormTitle}>Order Checkout</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form className={scss.orderFormWrapper}>
              <div className={scss.formLeftBlock}>
                <AnimatePresence>
                  <motion.div
                    variants={itemVariants}
                    initial='hidden'
                    animate='visible'
                    exit='exit'
                    className={scss.motionDiv}>
                    <div className={scss.formGroup}>
                      <Field
                        type='text'
                        name='firstName'
                        className={scss.input}
                        placeholder='First Name'
                      />
                      <ErrorMessage name='firstName' component='div' className={scss.error} />
                    </div>

                    <div className={scss.formGroup}>
                      <Field
                        type='text'
                        name='lastName'
                        className={scss.input}
                        placeholder='Last Name'
                      />
                      <ErrorMessage name='lastName' component='div' className={scss.error} />
                    </div>

                    <div className={scss.formGroup}>
                      <Field type='email' name='email' className={scss.input} placeholder='Email' />
                      <ErrorMessage name='email' component='div' className={scss.error} />
                    </div>

                    <div className={scss.formGroup}>
                      <Field
                        type='text'
                        name='phone'
                        className={scss.input}
                        placeholder='Phone Number'
                      />
                      <ErrorMessage name='phone' component='div' className={scss.error} />
                    </div>

                    <div className={scss.formGroup}>
                      <Field
                        type='text'
                        name='address'
                        className={scss.input}
                        placeholder='Address'
                      />
                      <ErrorMessage name='address' component='div' className={scss.error} />
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className={scss.orderSummaryBlock}>
                <div className={scss.orderSummary}>
                  <motion.div variants={totalVariants} initial='initial' animate='animate'>
                    <h3>Order Summary</h3>
                  </motion.div>
                  <motion.p variants={totalVariants} initial='initial' animate='animate'>
                    Total Price: ${totalPrice.toFixed(2)}
                  </motion.p>
                  {promoDiscount > 0 && <p>Promo Discount: ${promoDiscount.toFixed(2)}</p>}
                </div>

                <div className={scss.submitButtonBlock}>
                  <button
                    type='submit'
                    className={scss.submitButton}
                    disabled={isSubmitting || cartItems.length === 0}>
                    {isSubmitting ? 'Placing Order...' : 'Place Order'}
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
        <ToastContainer />
      </div>
    </div>
  );
}
