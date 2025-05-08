import { configureStore } from '@reduxjs/toolkit';
import cartReducer, { setCart, setRemovedItems } from './cartSlice';
import currencyReducer from './currencySlice';
import courseReducer, { fetchCourseData, subscribeToCourseUpdates } from './courseSlice';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

// Функция для начальной загрузки и валидации корзины
const loadAndValidateCart = async (dispatch) => {
  const savedCart = localStorage.getItem('cart');
  let cartItems = [];

  if (savedCart) {
    try {
      cartItems = JSON.parse(savedCart);
    } catch (error) {
      console.error('Ошибка при парсинге данных из localStorage:', error);
      return [];
    }
  }

  if (cartItems.length === 0) return [];

  try {
    const productIds = cartItems.map((item) => item.id);
    const productsData = {};

    for (const id of productIds) {
      const docRef = doc(db, 'products', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        productsData[id] = { id: docSnap.id, ...docSnap.data() };
      }
    }

    // Фильтруем корзину: оставляем только доступные товары и обновляем данные
    const validatedItems = cartItems
      .map((item) => {
        const product = productsData[item.id];
        if (product && product.available) {
          return {
            ...item,
            priceProduct: product.priceProduct,
            discountedPrice: product.discountedPrice || 0,
            discountPercent: product.discountPercent || 0,
            available: product.available,
          };
        }
        return null;
      })
      .filter(Boolean);

    // Определяем удаленные товары
    const removedItems = cartItems.filter(
      (item) => !validatedItems.some((validated) => validated.id === item.id),
    );

    // Обновляем localStorage
    if (validatedItems.length !== cartItems.length) {
      localStorage.setItem('cart', JSON.stringify(validatedItems));
    }

    // Обновляем состояние в Redux
    dispatch(setCart(validatedItems));
    dispatch(setRemovedItems(removedItems));

    return validatedItems;
  } catch (error) {
    console.error('Ошибка при проверке доступности товаров:', error);
    dispatch(setCart(cartItems));
    dispatch(setRemovedItems([]));
    return cartItems;
  }
};

// Функция для подписки на изменения в реальном времени
const subscribeToCartUpdates = (dispatch) => {
  const savedCart = localStorage.getItem('cart');
  let cartItems = [];

  if (savedCart) {
    try {
      cartItems = JSON.parse(savedCart);
    } catch (error) {
      console.error('Ошибка при парсинге данных из localStorage:', error);
      return () => {};
    }
  }

  if (cartItems.length === 0) return () => {};

  const productIds = cartItems.map((item) => item.id);
  const unsubscribes = [];

  productIds.forEach((id) => {
    const docRef = doc(db, 'products', id);
    const unsubscribe = onSnapshot(
      docRef,
      (docSnap) => {
        if (docSnap.exists()) {
          const updatedProduct = { id: docSnap.id, ...docSnap.data() };
          const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
          const updatedCart = currentCart
            .map((item) =>
              item.id === updatedProduct.id
                ? {
                    ...item,
                    priceProduct: updatedProduct.priceProduct,
                    discountedPrice: updatedProduct.discountedPrice || 0,
                    discountPercent: updatedProduct.discountPercent || 0,
                    available: updatedProduct.available,
                  }
                : item,
            )
            .filter((item) => item.available);

          localStorage.setItem('cart', JSON.stringify(updatedCart));
          dispatch(setCart(updatedCart));

          const removedItems = currentCart.filter(
            (item) => !updatedCart.some((updated) => updated.id === item.id),
          );
          dispatch(setRemovedItems(removedItems));
        }
      },
      (error) => {
        console.error('Ошибка в подписке на обновления:', error);
      },
    );
    unsubscribes.push(unsubscribe);
  });

  return () => unsubscribes.forEach((unsubscribe) => unsubscribe());
};

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    currency: currencyReducer,
    course: courseReducer,
  },
  preloadedState: {
    cart: {
      items: [],
      removedItems: [],
    },
    currency: {
      currencies: [],
      activeCurrency: null,
      status: 'idle',
      error: null,
    },
    course: {
      course: null,
      forWhom: [],
      speakers: [],
      speakerGeneralInfo: [],
      games: [],
      modules: [],
      demoVideos: [],
      status: 'idle',
      error: null,
    },
  },
});

let unsubscribeFromCartUpdates = () => {};
let unsubscribeFromCourseUpdates = () => {};

loadAndValidateCart(store.dispatch).then(() => {
  unsubscribeFromCartUpdates = subscribeToCartUpdates(store.dispatch);
  // Fetch course data only for ArchitecturePageOne
  store.dispatch(fetchCourseData()).then(() => {
    unsubscribeFromCourseUpdates = subscribeToCourseUpdates(store.dispatch);
  });
});

export { unsubscribeFromCartUpdates, unsubscribeFromCourseUpdates };
