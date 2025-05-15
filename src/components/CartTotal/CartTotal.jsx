import { motion } from 'framer-motion';
import scss from './CartTotal.module.scss';
import clsx from 'clsx';

export default function CartTotal({
  cartItems,
  totalPrice,
  totalVariants,
  savings,
  totalOriginalPrice,
}) {
  return (
    <>
      <p className={scss.cartCountProducts}>There is {cartItems.length} item in your Basket</p>
      <div className={scss.cartTotalBlock}>
        <p className={clsx(scss.cartCountProducts, scss.cartCountProductsTotal)}>Total:</p>
        <div className={scss.totalContainerWidthSavings}>
          <motion.div
            className={scss.totalContainer}
            key='total-price' // Уникальный строковый ключ
            variants={totalVariants}
            initial='initial'
            animate='animate'>
            {savings > 0 && <h3 className={scss.totalOriginalPrice}>{totalOriginalPrice} $</h3>}
            <h3 className={scss.cartTotalPrice}>{totalPrice.toFixed(2)} $</h3>
          </motion.div>
          {savings > 0 && (
            <motion.p
              className={scss.savings}
              key='savings' // Уникальный строковый ключ
              variants={totalVariants}
              initial='initial'
              animate='animate'>
              You saved: {savings.toFixed(2)} $
            </motion.p>
          )}
        </div>
      </div>
    </>
  );
}
