import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  electronics: null,
  menswear: null,
  womenswear: null,
  jewelry: null,
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setElectronics: (state, action) => {
      state.electronics = action.payload;
    },
    setMenswear: (state, action) => {
      state.menswear = action.payload;
    },
    setWomenswear: (state, action) => {
      state.womenswear = action.payload;
    },
    setJewelry: (state, action) => {
      state.jewelry = action.payload;
    },
  },
});

export const { setElectronics, setMenswear, setWomenswear, setJewelry } =
  productsSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const electronics = (state) => state.products.electronics;
export const mens = (state) => state.products.menswear;
export const womens = (state) => state.products.womenswear;
export const jewelry = (state) => state.products.jewelry;

export default productsSlice.reducer;
