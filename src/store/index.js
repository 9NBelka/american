import { configureStore } from '@reduxjs/toolkit';
import cartReducer, { setCart, setRemovedItems } from './cartSlice';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

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

    // Фильтруем корзину: оставляем только доступные товары
    const validatedItems = cartItems.filter((item) => {
      const product = productsData[item.id];
      return product && product.available === true;
    });

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

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  preloadedState: {
    cart: {
      items: [],
      removedItems: [],
    },
  },
});

// Асинхронно загружаем и проверяем корзину после создания store
loadAndValidateCart(store.dispatch);
