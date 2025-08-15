import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunks
export const getCart = createAsyncThunk(
  'cart/getCart',
  async (_, { rejectWithValue, getState }) => {
    try {
      const { token } = getState().auth;
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
      
      const response = await axios.get('/api/cart', config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async (itemData, { rejectWithValue, getState }) => {
    try {
      const { token } = getState().auth;
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
      
      const response = await axios.post('/api/cart/add', itemData, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateCartItem = createAsyncThunk(
  'cart/updateCartItem',
  async (updateData, { rejectWithValue, getState }) => {
    try {
      const { token } = getState().auth;
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
      
      const response = await axios.put('/api/cart/update', updateData, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async (productId, { rejectWithValue, getState }) => {
    try {
      const { token } = getState().auth;
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
      
      const response = await axios.delete(`/api/cart/remove/${productId}`, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const clearCart = createAsyncThunk(
  'cart/clearCart',
  async (_, { rejectWithValue, getState }) => {
    try {
      const { token } = getState().auth;
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
      
      const response = await axios.delete('/api/cart/clear', config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getCartTotal = createAsyncThunk(
  'cart/getCartTotal',
  async (_, { rejectWithValue, getState }) => {
    try {
      const { token } = getState().auth;
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
      
      const response = await axios.get('/api/cart/total', config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  items: [],
  loading: false,
  error: null,
  total: 0,
  itemCount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    // Local cart actions for immediate UI updates
    addItemLocal: (state, action) => {
      const { productId, name, price, image, quantity = 1 } = action.payload;
      const existingItem = state.items.find(item => item.productId === productId);
      
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({ productId, name, price, image, quantity });
      }
      
      // Update totals
      state.total = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      state.itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
    },
    updateItemLocal: (state, action) => {
      const { productId, quantity } = action.payload;
      const itemIndex = state.items.findIndex(item => item.productId === productId);
      
      if (itemIndex !== -1) {
        if (quantity <= 0) {
          state.items.splice(itemIndex, 1);
        } else {
          state.items[itemIndex].quantity = quantity;
        }
        
        // Update totals
        state.total = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        state.itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
      }
    },
    removeItemLocal: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter(item => item.productId !== productId);
      
      // Update totals
      state.total = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      state.itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
    },
    clearCartLocal: (state) => {
      state.items = [];
      state.total = 0;
      state.itemCount = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Cart
      .addCase(getCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.cart;
        state.total = action.payload.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        state.itemCount = action.payload.cart.reduce((sum, item) => sum + item.quantity, 0);
      })
      .addCase(getCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch cart';
      })
      // Add to Cart
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.cart;
        state.total = action.payload.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        state.itemCount = action.payload.cart.reduce((sum, item) => sum + item.quantity, 0);
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to add item to cart';
      })
      // Update Cart Item
      .addCase(updateCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.cart;
        state.total = action.payload.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        state.itemCount = action.payload.cart.reduce((sum, item) => sum + item.quantity, 0);
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to update cart item';
      })
      // Remove from Cart
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.cart;
        state.total = action.payload.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        state.itemCount = action.payload.cart.reduce((sum, item) => sum + item.quantity, 0);
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to remove item from cart';
      })
      // Clear Cart
      .addCase(clearCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(clearCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = [];
        state.total = 0;
        state.itemCount = 0;
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to clear cart';
      })
      // Get Cart Total
      .addCase(getCartTotal.fulfilled, (state, action) => {
        state.total = parseFloat(action.payload.total);
        state.itemCount = action.payload.itemCount;
      });
  },
});

export const { 
  clearError, 
  addItemLocal, 
  updateItemLocal, 
  removeItemLocal, 
  clearCartLocal 
} = cartSlice.actions;
export default cartSlice.reducer;

