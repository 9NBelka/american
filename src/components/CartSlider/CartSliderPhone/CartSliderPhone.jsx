import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../store/cartSlice';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../../firebase';
import scss from './CartSliderPhone.module.scss';
import { BsArrowLeftShort, BsArrowRightShort } from 'react-icons/bs';
import clsx from 'clsx';

const ITEMS_PER_SLIDE = 1; // Количество товаров на слайде

export default function CartSliderPhone() {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Загружаем товары из Firebase и фильтруем только доступные
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        const productsData = querySnapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .filter((product) => product.available === true); // Фильтруем по available: true
        setProducts(productsData);
      } catch (error) {
        console.error('Ошибка при загрузке товаров:', error);
      }
    };

    fetchAllProducts();
  }, []);

  // Обработчики переключения слайдов
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? products.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === products.length - 1 ? 0 : prev + 1));
  };

  // Добавление товара в корзину
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  if (products.length === 0) {
    return <p>Loading products...</p>;
  }

  // Для бесконечного слайдера дублируем товары в начале и конце
  const extendedProducts = [
    ...products.slice(-ITEMS_PER_SLIDE),
    ...products,
    ...products.slice(0, ITEMS_PER_SLIDE),
  ];

  return (
    <div className={scss.sliderContainer}>
      <div className={scss.sliderButtonsAndTitle}>
        <h5 className={scss.sliderButtonsTitle}>Buy a course at a better price</h5>
        <div className={scss.sliderButtons}>
          <button className={scss.sliderButton} onClick={handlePrev}>
            <BsArrowLeftShort className={scss.sliderIcon} />
          </button>
          <button className={scss.sliderButton} onClick={handleNext}>
            <BsArrowRightShort className={scss.sliderIcon} />
          </button>
        </div>
      </div>
      <div className={scss.sliderWrapper}>
        <div
          className={scss.sliderTrack}
          style={{
            transform: `translateX(-${
              (currentIndex + ITEMS_PER_SLIDE) * (100 / ITEMS_PER_SLIDE)
            }%)`,
            transition: 'transform 0.5s ease-in-out', // Плавный переход
          }}>
          {extendedProducts.map((product, index) => (
            <div key={`${product.id}-${index}`} className={scss.sliderItem}>
              <div className={scss.productImageBlock}>
                <img
                  className={scss.productImage}
                  src={product.imageProduct}
                  alt={product.nameProduct}
                />
              </div>
              <div className={scss.productInfoBlockColumn}>
                <div className={scss.productNameAndProductCategory}>
                  <h3 className={scss.productName}>{product.nameProduct}</h3>
                  <p className={scss.productCategory}>{product.categoryProduct}</p>
                </div>
                <div
                  className={clsx(
                    scss.priceContainer,
                    product.discountedPrice <= 0 && scss.priceContainerFlexEnd,
                  )}>
                  {product.discountedPrice && product.discountedPrice > 0 ? (
                    <>
                      <span
                        className={clsx(
                          scss.originalPrice,
                          product.discountedPrice && scss.originalPriceLine,
                        )}>
                        {product.priceProduct} $
                      </span>
                      <span className={scss.discountedPrice}>{product.discountedPrice} $</span>
                    </>
                  ) : (
                    <span className={scss.originalPrice}>{product.priceProduct} $</span>
                  )}
                </div>
                <div>
                  {product.available ? (
                    <button
                      className={scss.addButton}
                      onClick={() => {
                        handleAddToCart(product);
                      }}>
                      Add to Cart
                    </button>
                  ) : (
                    <p className={scss.availableText}>not available</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
