// // productsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface ProductFilters {
  page?: number;
  limit: number;
  search?: string;
  isActive?: boolean;
  filters?: any;
  isLoaded?: boolean;
}
const initialState: ProductFilters = {
  page: 1,
  limit: 10,
  search: '',
  isActive: false,
  filters: [],
  isLoaded: false,
};

export const blackListSlice = createSlice({
  name: 'blackList',
  initialState,
  reducers: {
    loadMoreProduct(state, action: PayloadAction<number>) {
      state.limit = action.payload;
    },
    clearFilters(state) {
      state.search = ' ';
      state.filters.forEach((filter:any) => {
        filter.elements.forEach((element:any) => {
          element.status = false;
        });
      });
    },
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    setActiveFilters(state, action: PayloadAction<boolean>) {
      state.isActive = action.payload;
    },
    setFilter(state, action: PayloadAction<{ filterName: string; element: any }>) {
      const { filterName, element } = action.payload;
    
      const updatedFilters = state.filters.map((filter:any) => {
        if (filter.name === filterName) {
          const updatedElements = filter.elements.map((e:any) => {
            if (e.id.toString() === element.id) {
              // Create a new object with updated status
              return { ...e, status: element.status };
            }
            return e;
          });
          // Create a new filter object with updated elements
          return { ...filter, elements: updatedElements };
        }
        return filter;
      });
    
      return { ...state, filters: updatedFilters };
    },
    // setFilter(state, action: PayloadAction<{ filterName: string; element: any }>) {
    //   const { filterName, element } = action.payload;
    //   const filterIndex = state.filters.findIndex((filter:any) => filter.name === filterName);
    //   if (filterIndex !== -1) {
    //     const elementIndex = state.filters[filterIndex].elements.findIndex((e:any) => e.id.toString() === element.id);
    //     if (elementIndex !== -1) {
    //       state.filters[filterIndex].elements[elementIndex].status = element.status;
    //     }
    //   }
    // },
    loadInitialData: (state, action: PayloadAction<any>) => {
      state.filters = action.payload;
      state.isLoaded = true;
    },
    resetState: () => initialState,
  }
});

export const { loadMoreProduct, resetState, setActiveFilters, setFilter, setSearch,loadInitialData, clearFilters } =
  blackListSlice.actions;
export default blackListSlice.reducer;

