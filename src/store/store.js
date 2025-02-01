// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './productsSlice'; // Import your slice

const store = configureStore({
  reducer: {
    products: productsReducer, // Add reducers here
  },
});

export default store;
