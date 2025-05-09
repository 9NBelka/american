import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { doc, updateDoc, setDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../firebase';

// Асинхронный thunk для отправки данных формы
export const submitForm = createAsyncThunk(
  'form/submitForm',
  async ({ page, formData }, { rejectWithValue }) => {
    try {
      const formDocRef = doc(db, 'formsPages', page);
      const formEntry = {
        ...formData,
        timestamp: new Date().toISOString(),
      };

      // Проверяем, существует ли документ, и обновляем или создаем его
      await updateDoc(formDocRef, {
        forms: arrayUnion(formEntry),
      }).catch(async (error) => {
        if (error.code === 'not-found') {
          // Если документ не существует, создаем его с начальным массивом
          await setDoc(formDocRef, {
            forms: [formEntry],
          });
        } else {
          throw error;
        }
      });

      return { page, formData };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const formSlice = createSlice({
  name: 'form',
  initialState: {
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitForm.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(submitForm.fulfilled, (state) => {
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(submitForm.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default formSlice.reducer;
