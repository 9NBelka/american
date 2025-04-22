import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

// Получение всех валют
export const fetchCurrencies = createAsyncThunk(
  'currency/fetchCurrencies',
  async (_, { rejectWithValue }) => {
    try {
      const querySnapshot = await getDocs(collection(db, 'currencies'));
      const currencies = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return currencies;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch currencies');
    }
  },
);

const currencySlice = createSlice({
  name: 'currency',
  initialState: {
    currencies: [],
    activeCurrency: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrencies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCurrencies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currencies = action.payload;
        const active = action.payload.find((c) => c.isActive);
        state.activeCurrency = active ? active.id : null;
        if (!active) {
          console.warn('No active currency found, defaulting to USD');
        }
      })
      .addCase(fetchCurrencies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default currencySlice.reducer;
