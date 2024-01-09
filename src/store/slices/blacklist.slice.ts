// // productsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface ProductFilters {
  page?: number;
  limit: number;
  search?: string;
  isActive?: boolean;
}
const initialState: ProductFilters = {
  page: 1,
  limit: 10,
  search: '',
  isActive: false,
};

 export const blackListSlice = createSlice({
  name: 'blackList',
  initialState,
   reducers: {
    loadMoreProduct(state, action: PayloadAction<number>) {
      console.log(action.payload);
      state.limit = action.payload;
    },
    setActiveFilters(state, action: PayloadAction<boolean>) {
      state.isActive = action.payload;
    },
    resetState: () => initialState,
  }
});

export const { loadMoreProduct, resetState, setActiveFilters } =
blackListSlice.actions;
export default blackListSlice.reducer;

