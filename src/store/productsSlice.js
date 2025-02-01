// src/store/productsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categories: [],  // Array of categories
  user: null,      // Admin login state
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // Add a new category with a title and image
    addCategory: (state, action) => {
      state.categories.push({
        id: action.payload.id,      // Unique ID for the category
        title: action.payload.title,
        image: action.payload.image,
        subcategories: [],          // Subcategories (if any)
        products: [],               // Products if no subcategories
      });
    },
    
    // Add a subcategory inside a specific category
    addSubcategory: (state, action) => {
      const { categoryId, subcategory } = action.payload;
      const category = state.categories.find(cat => cat.id === categoryId);
      if (category) {
        category.subcategories.push({
          id: subcategory.id,
          title: subcategory.title,
          image: subcategory.image,
          products: [],  // Subcategory will have products
        });
      }
    },

    // Add a product either inside a category or subcategory
    addProduct: (state, action) => {
      const { categoryId, subcategoryId, product } = action.payload;
      const category = state.categories.find(cat => cat.id === categoryId);

      if (subcategoryId) {
        // If subcategoryId is present, add the product to the subcategory
        const subcategory = category.subcategories.find(sub => sub.id === subcategoryId);
        if (subcategory) {
          subcategory.products.push(product);
        }
      } else {
        // Else add the product directly to the category (if no subcategory)
        category.products.push(product);
      }
    },

    // Set the admin user login
    setUser: (state, action) => {
      state.user = action.payload;
    },

    // Log out the admin user
    logoutUser: (state) => {
      state.user = null;
    },
  },
});

// Export the actions
export const { addCategory, addSubcategory, addProduct, setUser, logoutUser } = productsSlice.actions;

// Export the reducer
export default productsSlice.reducer;
