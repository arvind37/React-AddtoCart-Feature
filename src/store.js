import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialCartState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0
};

const loadCartState = () => {
  const savedCart = localStorage.getItem('cart');
  if (savedCart) {
    return JSON.parse(savedCart);
  }
  return initialCartState;
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: loadCartState(),
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);
      state.totalQuantity++;
      state.totalPrice += newItem.price;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          title: newItem.title,
          price: newItem.price,
          quantity: 1
        });
      } else {
        existingItem.quantity++;
      }
      saveCartState(state);
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const itemToRemove = state.items.find(item => item.id === id);
      if (itemToRemove) {
        state.totalQuantity -= itemToRemove.quantity;
        state.totalPrice -= itemToRemove.price * itemToRemove.quantity;
        state.items = state.items.filter(item => item.id !== id);
        saveCartState(state);
      }
    }
  }
});

const saveCartState = (state) => {
  localStorage.setItem('cart', JSON.stringify(state));
};

export const cartActions = cartSlice.actions;

const store = configureStore({
  reducer: { cart: cartSlice.reducer }
});

export default store;
