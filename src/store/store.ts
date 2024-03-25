import {  combineReducers, configureStore } from '@reduxjs/toolkit'
import brandSlice from './slices/brand.slice'
import { apiSlice } from '../api/apiSlice'
import categorySlice from './slices/category.slice'
import subCategorySlice from './slices/subCategory.slice'
import userSlice from './slices/user.slice'
import productSlice from './slices/product.slice'
import blackListSlice from './slices/blacklist.slice'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import cartSlice from './slices/cart.slice'
const persistConfig = {
  key: 'root', 
  storage,
  whitelist: ['productSlice', 'brandSlice', 'categorySlice', 'subCategorySlice', 'userSlice', 'cartSlice'], 
};

const rootReducer =  combineReducers({
  productSlice: productSlice,
  brandSlice: brandSlice,
  categorySlice: categorySlice,
  userSlice: userSlice,
  blackListSlice: blackListSlice,
  cartSlice: cartSlice,
  subCategorySlice: subCategorySlice,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware({
    serializableCheck: false,
  }).concat(apiSlice.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
// Wrap your store with persistStore
const persistor = persistStore(store);

export { store, persistor };