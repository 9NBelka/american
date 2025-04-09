import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    removedItems: [], // Новое поле для удаленных товаров
  },
  reducers: {
    addToCart: (state, action) => {
      console.log('addToCart: Текущее состояние:', state.items);
      console.log('addToCart: Добавляемый товар:', action.payload);

      const cleanPayload = {
        id: action.payload.id,
        discountPercent: action.payload.discountPercent,
        access: action.payload.access,
        categoryProduct: action.payload.categoryProduct,
        nameProduct: action.payload.nameProduct,
        priceProduct: action.payload.priceProduct,
        discountedPrice: action.payload.discountedPrice,
        imageProduct: action.payload.imageProduct,
        speakersProduct: action.payload.speakersProduct,
        available: action.payload.available,
      };

      const item = state.items.find((item) => item.id === cleanPayload.id);
      if (item) {
        item.quantity += 1;
      } else {
        state.items.push({ ...cleanPayload, quantity: 1 });
      }

      console.log('addToCart: Новое состояние:', state.items);
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    updateQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    setCart: (state, action) => {
      state.items = action.payload;
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    setRemovedItems: (state, action) => {
      state.removedItems = action.payload; // Новый редьюсер для удаленных товаров
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart, setCart, setRemovedItems } =
  cartSlice.actions;
export default cartSlice.reducer;
