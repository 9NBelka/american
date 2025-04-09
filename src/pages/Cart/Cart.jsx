import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity, clearCart } from '../../store/cartSlice';
import scss from './Cart.module.scss';
import { motion, AnimatePresence } from 'framer-motion';
import { BsArrowLeftShort, BsDash, BsFillTrashFill, BsPlus } from 'react-icons/bs';
import clsx from 'clsx';
import HeadScreenHeaderCart from '../../components/HeadScreenHeaderCart/HeadScreenHeaderCart';
import { useNavigate } from 'react-router-dom';
import CartSlider from '../../components/CartSlider/CartSlider';
import { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const removedItems = useSelector((state) => state.cart.removedItems); // Получаем удаленные товары
  const navigate = useNavigate();

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
  }, [removedItems]); // Зависимость от removedItems

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
  };

  const getItemPrice = (item) => {
    return 'discountedPrice' in item && item.discountedPrice > 0
      ? item.discountedPrice
      : item.priceProduct;
  };

  const totalPrice = cartItems.reduce((total, item) => {
    const itemPrice = getItemPrice(item);
    return total + itemPrice * item.quantity;
  }, 0);

  const totalOriginalPrice = cartItems.reduce(
    (total, item) => total + item.priceProduct * item.quantity,
    0,
  );

  const savings = totalOriginalPrice - totalPrice;

  const handleGoBack = () => {
    navigate(-1);
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
                <h3 className={scss.cartTotalPrice}>{totalPrice} $</h3>
                {savings > 0 && (
                  <motion.p
                    className={scss.savings}
                    key={savings}
                    variants={totalVariants}
                    initial='initial'
                    animate='animate'>
                    You saved: {savings} $
                  </motion.p>
                )}
              </motion.div>
              <div className={scss.cartTotalButtonBuyBlock}>
                <button className={scss.cartTotalButtonBuy}>Buy the course</button>
              </div>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}
