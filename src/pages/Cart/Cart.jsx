import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity, clearCart } from '../../store/cartSlice';
import scss from './Cart.module.scss';
import { motion, AnimatePresence } from 'framer-motion';
import { BsArrowLeftShort, BsDash, BsFillTrashFill, BsPlus } from 'react-icons/bs';
import clsx from 'clsx';
import HeadScreenHeaderCart from '../../components/HeadScreenHeaderCart/HeadScreenHeaderCart';
import { useNavigate } from 'react-router-dom';
import CartSlider from '../../components/CartSlider/CartSlider';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';

export default function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const removedItems = useSelector((state) => state.cart.removedItems);
  const navigate = useNavigate();

  // Состояние для промокодов
  const [promoCodes, setPromoCodes] = useState([]);
  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [appliedPromoCode, setAppliedPromoCode] = useState(null);

  // Загружаем промокоды из Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'promoCodes'),
      (snapshot) => {
        const promoCodeList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPromoCodes(promoCodeList);
      },
      (error) => {
        console.error('Ошибка при загрузке промокодов:', error);
        toast.error('Ошибка при загрузке промокодов: ' + error.message);
      },
    );

    return () => unsubscribe();
  }, []);

  // Показываем уведомление, если есть удаленные товары
  useEffect(() => {
    if (removedItems.length > 0) {
      const removedNames = removedItems.map((item) => item.nameProduct).join(', ');
      toast.warn(`Removed unavailable items: ${removedNames}`, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }, [removedItems]);

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleUpdateQuantity = (id, quantity) => {
    if (quantity < 1) {
      dispatch(removeFromCart(id));
    } else {
      dispatch(updateQuantity({ id, quantity }));
    }
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    setAppliedPromoCode(null); // Сбрасываем промокод при очистке корзины
    setPromoCodeInput(''); // Очищаем поле ввода
  };

  const getItemPrice = (item) => {
    return 'discountedPrice' in item && item.discountedPrice > 0
      ? item.discountedPrice
      : item.priceProduct;
  };

  // Вычисляем итоговую цену с учетом промокода
  const calculateTotalPrice = () => {
    let totalPrice = cartItems.reduce((total, item) => {
      const itemPrice = getItemPrice(item);
      return total + itemPrice * item.quantity;
    }, 0);

    let totalOriginalPrice = cartItems.reduce(
      (total, item) => total + item.priceProduct * item.quantity,
      0,
    );

    let promoDiscount = 0;
    if (appliedPromoCode) {
      // Проверяем, какие товары в корзине соответствуют промокоду
      const applicableItems = cartItems.filter((item) =>
        appliedPromoCode.items.some(
          (promoItem) => promoItem.productId === item.id && promoItem.accessLevelId === item.access,
        ),
      );

      // Вычисляем скидку от промокода только для применимых товаров
      promoDiscount = applicableItems.reduce((discount, item) => {
        const itemPrice = getItemPrice(item);
        const discountAmount = (itemPrice * item.quantity * appliedPromoCode.discountPercent) / 100;
        return discount + discountAmount;
      }, 0);

      totalPrice -= promoDiscount;
    }

    return { totalPrice, totalOriginalPrice, promoDiscount };
  };

  const { totalPrice, totalOriginalPrice, promoDiscount } = calculateTotalPrice();
  const savings = totalOriginalPrice - totalPrice;

  const handleGoBack = () => {
    navigate(-1);
  };

  // Обработчик применения промокода
  const handleApplyPromoCode = () => {
    if (!promoCodeInput) {
      toast.error('Please enter the promo code.');
      return;
    }

    const promoCode = promoCodes.find(
      (promo) => promo.name.toLowerCase() === promoCodeInput.toLowerCase(),
    );

    if (!promoCode) {
      toast.error('Promo code not found.');
      return;
    }

    if (!promoCode.available) {
      toast.error('The promotional code is invalid.');
      return;
    }

    if (promoCode.expiryDate) {
      const expiry = new Date(promoCode.expiryDate);
      const now = new Date();
      if (now > expiry) {
        toast.error('The promo code has expired.');
        return;
      }
    }

    // Проверяем, есть ли в корзине товары, соответствующие промокоду
    const applicableItems = cartItems.filter((item) =>
      promoCode.items.some(
        (promoItem) => promoItem.productId === item.id && promoItem.accessLevelId === item.access,
      ),
    );

    if (applicableItems.length === 0) {
      toast.error('The promo code does not apply to items in your cart.');
      return;
    }

    setAppliedPromoCode(promoCode);
    toast.success('Promo code successfully applied!');
  };

  // Обработчик сброса промокода
  const handleRemovePromoCode = () => {
    setAppliedPromoCode(null);
    setPromoCodeInput('');
    toast.info('Promo code removed.');
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
  };

  const quantityVariants = {
    initial: { scale: 1 },
    animate: { scale: [1, 1.2, 1], transition: { duration: 0.3 } },
  };

  const totalVariants = {
    initial: { scale: 1 },
    animate: { scale: [1, 1.05, 1], transition: { duration: 0.3 } },
  };

  return (
    <div className={scss.cartBackgroundMain}>
      <div className={scss.cartContainer}>
        <HeadScreenHeaderCart />
        <div className={scss.backButtonBlock}>
          <button className={scss.backButton} onClick={handleGoBack}>
            <BsArrowLeftShort className={scss.backIcon} /> Back
          </button>
        </div>
        <h1 className={scss.cartTitle}>Basket</h1>
        {cartItems.length === 0 ? (
          <p className={scss.emptyCart}>Cart is empty</p>
        ) : (
          <div className={scss.cartLeftRightBlock}>
            <div className={scss.cartLeftBlock}>
              <div className={scss.cartItems}>
                <div className={scss.cartItemsTitle}>
                  <p>Product</p>
                  <p>Tariff</p>
                  <p>Quantity</p>
                  <p>Price</p>
                  <p></p>
                </div>
                <AnimatePresence>
                  {cartItems.map((item) => (
                    <motion.div
                      key={item.id}
                      className={clsx(scss.cartItem, !item.available && scss.cartItemDisable)}
                      variants={itemVariants}
                      initial='hidden'
                      animate='visible'
                      exit='exit'>
                      {!item.available && (
                        <p className={scss.unavailableNotice}>
                          This item is currently unavailable. Please refresh the page.
                        </p>
                      )}
                      <div className={scss.itemInfo}>
                        <div className={scss.imageAndNameProduct}>
                          <img
                            className={scss.itemImage}
                            src={item.imageProduct}
                            alt='productImage'
                          />
                          <h3 className={scss.itemName}>{item.nameProduct}</h3>
                        </div>
                        <h4 className={scss.itemAccess}>{item.access}</h4>
                        <div className={scss.quantityContainer}>
                          <button
                            className={scss.quantityButton}
                            onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}>
                            <BsDash className={scss.icon} />
                          </button>
                          <motion.span
                            key={item.quantity}
                            variants={quantityVariants}
                            initial='initial'
                            animate='animate'
                            className={scss.quantity}>
                            {item.quantity}
                          </motion.span>
                          <button
                            className={scss.quantityButton}
                            onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}>
                            <BsPlus className={scss.icon} />
                          </button>
                        </div>
                        <div className={scss.priceContainer}>
                          {'discountedPrice' in item && item.discountedPrice > 0 ? (
                            <div className={scss.priceContainerColumn}>
                              <div className={scss.originalPriceAndDiscountPercentBlock}>
                                <span
                                  className={clsx(
                                    scss.originalPrice,
                                    item.discountedPrice && scss.originalPriceLine,
                                  )}>
                                  {item.priceProduct} $
                                </span>
                                <span className={scss.discountPercent}>
                                  -{item.discountPercent}%
                                </span>
                              </div>
                              <span className={scss.discountedPrice}>{item.discountedPrice} $</span>
                            </div>
                          ) : (
                            <span className={scss.originalPrice}>{item.priceProduct} $</span>
                          )}
                        </div>
                        <div className={scss.removeButtonBlock}>
                          <button
                            className={scss.removeButton}
                            onClick={() => handleRemove(item.id)}>
                            <BsFillTrashFill className={scss.iconTrash} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                <button className={scss.clearButton} onClick={handleClearCart}>
                  Clear Cart
                </button>
              </div>
              <CartSlider />
            </div>
            <div className={scss.cartTotalBlock}>
              <p className={scss.cartCountProducts}>
                There is {cartItems.length} item in your Basket
              </p>
              <motion.div
                className={scss.totalContainer}
                key={totalPrice}
                variants={totalVariants}
                initial='initial'
                animate='animate'>
                {savings > 0 && <h3 className={scss.totalOriginalPrice}>{totalOriginalPrice} $</h3>}
                <h3 className={scss.cartTotalPrice}>{totalPrice.toFixed(2)} $</h3>
                {savings > 0 && (
                  <motion.p
                    className={scss.savings}
                    key={savings}
                    variants={totalVariants}
                    initial='initial'
                    animate='animate'>
                    You saved: {savings.toFixed(2)} $
                  </motion.p>
                )}
              </motion.div>
              {/* Поле ввода промокода и кнопка "Применить" */}
              <div className={scss.promoCodeContainer}>
                <input
                  type='text'
                  value={promoCodeInput}
                  onChange={(e) => setPromoCodeInput(e.target.value)}
                  placeholder='Promo code'
                  className={scss.promoCodeInput}
                  disabled={!!appliedPromoCode} // Отключаем поле ввода, если промокод применен
                />
                <button
                  className={scss.applyPromoButton}
                  onClick={handleApplyPromoCode}
                  disabled={!!appliedPromoCode} // Отключаем кнопку, если промокод применен
                >
                  Apply
                </button>
              </div>
              {appliedPromoCode && (
                <div className={scss.promoAppliedContainer}>
                  <p className={scss.promoApplied}>
                    Promo applied: {appliedPromoCode.name} (
                    <span>-{appliedPromoCode.discountPercent}%</span>)
                  </p>
                  <button className={scss.removePromoButton} onClick={handleRemovePromoCode}>
                    Remove
                  </button>
                </div>
              )}
              <div className={scss.cartTotalButtonBuyBlock}>
                <button
                  className={scss.cartTotalButtonBuy}
                  onClick={() => navigate('/order')}
                  disabled={cartItems.length === 0}>
                  Buy the course
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}
