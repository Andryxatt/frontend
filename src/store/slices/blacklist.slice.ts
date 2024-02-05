// // productsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface ProductFilters {
  page?: number;
  limit: number;
  search?: string;
  isActive?: boolean;
  filters?: any;
}
const initialState: ProductFilters = {
  page: 1,
  limit: 10,
  search: '',
  isActive: false,
  filters: []
};

export const blackListSlice = createSlice({
  name: 'blackList',
  initialState,
  reducers: {
    loadMoreProduct(state, action: PayloadAction<number>) {
      console.log(action.payload);
      state.limit = action.payload;
    },
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    setActiveFilters(state, action: PayloadAction<boolean>) {
      state.isActive = action.payload;
    },
    setFilters(state, action: PayloadAction<{ filterName: string; element: any }>) {
      const { filterName, element } = action.payload;

      // Find the index of the existing filter with the same name
      const existingFilterIndex = state.filters.findIndex((filter: any) => filter.name === filterName);

      // If the filter exists, update it; otherwise, add a new filter
      if (existingFilterIndex !== -1) {
        state.filters[existingFilterIndex].elements = state.filters[existingFilterIndex].elements.filter(
          (item: any) => item.id !== element.id
        );
        if (element.status) {
          state.filters[existingFilterIndex].elements.push(element);
        }
        if (state.filters[existingFilterIndex].elements.length === 0) {
          state.filters.splice(existingFilterIndex, 1);
        }
      } else {
        // If the filter doesn't exist, add a new filter
        state.filters.push({ name: filterName, elements: [element] });
      }
    },

    resetState: () => initialState,
  }
});

export const { loadMoreProduct, resetState, setActiveFilters, setFilters, setSearch } =
  blackListSlice.actions;
export default blackListSlice.reducer;

