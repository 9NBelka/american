import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity, clearCart } from '../../store/cartSlice';
import scss from './Cart.module.scss';

import { BsArrowLeftShort } from 'react-icons/bs';
import HeadScreenHeaderCart from '../../components/HeadScreenHeaderCart/HeadScreenHeaderCart';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
import CartItemsInfo from '../../components/CartItemsInfo/CartItemsInfo';
import CartTotal from '../../components/CartTotal/CartTotal';
import CartPromoCode from '../../components/CartPromoCode/CartPromoCode';
import CartSlider from '../../components/CartSlider/CartSlider';
import clsx from 'clsx';

export default function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const removedItems = useSelector((state) => state.cart.removedItems);
  const navigate = useNavigate();

  // Состояние для промокодов
  const [promoCodes, setPromoCodes] = useState([]);
  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [appliedPromoCode, setAppliedPromoCode] = useState(null);

  useEffect(() => {
    const ids = cartItems.map((item) => item.id);
    const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
    if (duplicates.length > 0) {
      console.warn('Найдены дублирующиеся ID в корзине:', duplicates);
    }
  }, [cartItems]);

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

  const totalVariants = {
    initial: { scale: 1 },
    animate: { scale: [1, 1.05, 1], transition: { duration: 0.3 } },
  };

  return (
    <div
      className={clsx(
        scss.cartBackgroundMain,
        cartItems.length <= 0 && scss.cartBackgroundMainFull,
      )}>
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
            <div className={scss.cartPromocodePhone}>
              <CartPromoCode
                promoCodeInput={promoCodeInput}
                setPromoCodeInput={setPromoCodeInput}
                appliedPromoCode={appliedPromoCode}
                handleApplyPromoCode={handleApplyPromoCode}
                handleRemovePromoCode={handleRemovePromoCode}
              />
            </div>
            <div className={scss.cartLeftBlock}>
              <CartItemsInfo
                cartItems={cartItems}
                handleUpdateQuantity={handleUpdateQuantity}
                handleRemove={handleRemove}
                handleClearCart={handleClearCart}
              />
            </div>
            <div className={scss.cartTotalBlock}>
              <CartTotal
                cartItems={cartItems}
                totalPrice={totalPrice}
                totalVariants={totalVariants}
                savings={savings}
                totalOriginalPrice={totalOriginalPrice}
              />
              <div className={scss.promoCodeAndButtonBuy}>
                <div className={scss.promoCodeBlockPhone}>
                  <CartPromoCode
                    promoCodeInput={promoCodeInput}
                    setPromoCodeInput={setPromoCodeInput}
                    appliedPromoCode={appliedPromoCode}
                    handleApplyPromoCode={handleApplyPromoCode}
                    handleRemovePromoCode={handleRemovePromoCode}
                  />
                </div>
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
            <div className={scss.cartSlider}>
              <CartSlider />
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}
