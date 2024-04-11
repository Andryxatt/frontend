// // productsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
export interface ProductFilters {
  page?: number;
  limit: number;
  search?: string;
  isActive?: boolean;
  filters?: any;
  isLoaded?: boolean;
  priceRange?: any;
}
export type FindProductDto = {
  pageNumber?: number;
  limit: number;
  search?: string;
  categories?: any[];
  minPrice: number;
  maxPrice: number;
  brands?: any[];
  orderBy?: string;
  subCategories?: any[];
  gender?: string;
  colores?: any[];
  sizes?: any[];
  discount?: boolean;
  seasones?: any[];
  features?: any[];
} 
export type DefaultState = {
  filters: FindProductDto;
  isLoaded: boolean;
  isActive: boolean;
};
const initialState: DefaultState = {
 filters:{
  pageNumber: 1,
  limit: 10,
  search: '',
  minPrice: 0,
  maxPrice: 10000,
  categories: [],
  brands: [],
  orderBy: 'price',
  subCategories: [],
  colores: [],
  sizes: [],
  discount: false,
  seasones: [],
  features: [],
 },
  isLoaded: false,
  isActive: false,
};

export const blackListSlice = createSlice({
  name: 'blackList',
  initialState,
  reducers: {
    setBrands(state, action: PayloadAction<any>) {
      //update state if item allready in array remove it else add it
      const index = state.filters.brands?.findIndex((brand) => brand.item.id === action.payload.item.id);
      if (index !== -1) {
        state.filters.brands?.splice(index!, 1);
      } else {
        state.filters.brands = [...(state.filters.brands || []), action.payload]
      }
    },
    setCategories(state, action: PayloadAction<any>) {
      const index = state.filters.categories?.findIndex((category) => category.item.id === action.payload.item.id);
      if (index !== -1) {
        if(state.filters.subCategories?.length! > 0){
          state.filters.subCategories = []
        }
        state.filters.categories?.splice(index!, 1);
      } else {
        state.filters.categories = [...(state.filters.categories || []), action.payload]
      }
    },
    setColores(state, action: PayloadAction<any>) {
      const index = state.filters.colores?.findIndex((color) => color.item.name === action.payload.item.name);
      if (index !== -1) {
        state.filters.colores?.splice(index!, 1);
      } else {
        state.filters.colores = [...(state.filters.colores || []), action.payload]
      }
    },
    setDiscount(state, action: PayloadAction<boolean>) {
      state.filters.discount = action.payload;
    },
    setFeatures(state, action: PayloadAction<number[]>) {
      state.filters.features = action.payload;
    },
    setGender(state, action: PayloadAction<string>) {
      state.filters.gender = action.payload;
    },
    setOrderBy(state, action: PayloadAction<string>) {
      state.filters.orderBy = action.payload;
    },
    setPageNumber(state, action: PayloadAction<number>) {
      state.filters.pageNumber = action.payload;
    },
    setSeasones(state, action: PayloadAction<number[]>) {
      state.filters.seasones = action.payload;
    },
    setSizes(state, action: PayloadAction<any>) {
      state.filters.sizes = action.payload;
    },
    setSubCategories(state, action: PayloadAction<any>) {
      const index = state.filters.subCategories?.findIndex((subCat) => subCat.item.name === action.payload.item.name);
      if (index !== -1) {
        state.filters.subCategories?.splice(index!, 1);
      } else {
        state.filters.subCategories = [...(state.filters.subCategories || []), action.payload]
      }
    },
    setLimit(state) {
      //prvious state + 10
      state.filters.limit = state.filters.limit + 10;
    },
    setMinPrice(state, action: PayloadAction<number>) {
      state.filters.minPrice = action.payload;
    },
    setMaxPrice(state, action: PayloadAction<number>) {
      state.filters.maxPrice = action.payload;
    },
    setLoadMore(state, action: PayloadAction<number>) {
      state.filters.limit = action.payload;
    },
    clearFilters(state) {
     state.filters = initialState.filters;
    },
    setSearch(state, action: PayloadAction<string>) {
      state.filters.search = action.payload;
    },
    // loadMoreProduct(state, action: PayloadAction<number>) {
    //   state.limit = action.payload;
    // },
    // clearFilters(state) {
    //   state.search = ' ';
    //   state.filters.forEach((filter:any) => {
    //     filter.elements.forEach((element:any) => {
    //       element.status = false;
    //     });
    //   });
    //   state.priceRange = undefined;
    // },
    // setSearch(state, action: PayloadAction<string>) {
    //   state.search = action.payload;
    // },
    setActiveFilters(state, action: PayloadAction<boolean>) {
      state.isActive = action.payload;
    },
    // setFilter(state, action: PayloadAction<{ filterName: string; element: any }>) {
    //   const { filterName, element } = action.payload;

    //   const updatedFilters = state.filters.map((filter:any) => {
    //     if (filter.name === filterName) {
    //       const updatedElements = filter.elements.map((e:any) => {
    //         if (e.id.toString() === element.id) {
    //           // Create a new object with updated status
    //           return { ...e, status: element.status };
    //         }
    //         return e;
    //       });
    //       // Create a new filter object with updated elements
    //       return { ...filter, elements: updatedElements };
    //     }
    //     return filter;
    //   });

    //   return { ...state, filters: updatedFilters };
    // },
    // setPriceRange(state, action: PayloadAction<any>) {  
    //   state.priceRange = action.payload;
    // },
    // loadInitialData: (state, action: PayloadAction<any>) => {
    //   state.filters = action.payload;
    //   state.isLoaded = true;
    // },
    resetState: () => initialState,
  }
});

export const {
  resetState, setLoadMore, setBrands, setCategories, setColores, setDiscount,
  setFeatures, setGender, setOrderBy, setPageNumber, setSeasones, setSizes,
  setSubCategories, setLimit, setMinPrice, setMaxPrice,
  clearFilters, setActiveFilters, setSearch

} = blackListSlice.actions;

export default blackListSlice.reducer;

