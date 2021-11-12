import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      let exist = false;
      state.items = state.items.map((item, i) => {
        if (item.id === action.payload.id) {
          item.count += 1;
          exist = true;
        }
        return item;
      });
      !exist && (state.items = [...state.items, action.payload]);
    },
    removeFromBasket: (state, action) => {
      state.items = state.items.filter((item) => {
        if (item.id !== action.payload.id) return item;
      });
    },
    reduceItem: (state, action) => {
      state.items = state.items.map((item) => {
        if (item.id === action.payload.id) item.count -= 1;
        return item;
      });
    },
  },
});

export const { addToBasket, removeFromBasket, reduceItem } =
  basketSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state) => state.basket.items;

export const getItemCount = (state) =>
  state.basket.items.reduce((total, items) => (total += items.count), 0);

export const getTotalPrice = (state) =>
  state.basket.items.reduce(
    (total, items) => (total += items.price * items.count),
    0
  );

export default basketSlice.reducer;
