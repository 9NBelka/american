import clsx from 'clsx';
import scss from './CartItemsInfo.module.scss';
import { AnimatePresence, motion } from 'framer-motion';
import { BsDash, BsFillTrashFill, BsPlus } from 'react-icons/bs';
import CartSlider from '../CartSlider/CartSlider';

export default function CartItemsInfo({
  cartItems,
  handleUpdateQuantity,
  handleRemove,
  handleClearCart,
}) {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
  };

  const quantityVariants = {
    initial: { scale: 1 },
    animate: { scale: [1, 1.2, 1], transition: { duration: 0.3 } },
  };

  return (
    <>
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
              className={clsx(scss.cartItem, !item.available && scss.cartItemDisable, scss.disLine)}
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
                  <div className={scss.itemImageBlock}>
                    <img className={scss.itemImage} src={item.imageProduct} alt='productImage' />
                  </div>
                  <div className={scss.nameAndAccessItems}>
                    <h3 className={scss.itemName}>{item.nameProduct}</h3>
                    <h4 className={scss.itemAccess}>{item.access}</h4>
                  </div>
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
                        <span className={scss.discountPercent}>-{item.discountPercent}%</span>
                      </div>
                      <span className={scss.discountedPrice}>{item.discountedPrice} $</span>
                    </div>
                  ) : (
                    <span className={scss.originalPrice}>{item.priceProduct} $</span>
                  )}
                </div>
                <div className={scss.removeButtonBlock}>
                  <button className={scss.removeButton} onClick={() => handleRemove(item.id)}>
                    <BsFillTrashFill className={scss.iconTrash} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <button className={scss.clearButton} onClick={handleClearCart}>
          Clear Cart
        </button>{' '}
      </div>
      <div className={scss.cartSlider}>
        <CartSlider />
      </div>
    </>
  );
}
