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
  limit?: number;
  search?: string;
  categories?: any[];
  minPrice?: number;
  maxPrice?: number;
  brands?: any[];
  orderBy?: string;
  subCategories?: any[];
  gender?: string;
  colores?: any[];
  sizes?: any[];
  discount?: boolean;
  seasones?: any[];
  features?: any[];
} & {
  isActive?: boolean;
  isLoaded?: boolean;
};
const initialState: FindProductDto = {
  pageNumber: 1,
  limit: 10,
  search: '',
  isActive: false,
  isLoaded: false,
  minPrice: 10,
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
};

export const blackListSlice = createSlice({
  name: 'blackList',
  initialState,
  reducers: {
    setBrands(state, action: PayloadAction<any>) {
      //update state if item allready in array remove it else add it
      const index = state.brands?.findIndex((brand) => brand.item.id === action.payload.item.id);
      if (index !== -1) {
        state.brands?.splice(index!, 1);
      } else {
        state.brands = [...(state.brands || []), action.payload]
      }
    },
    setCategories(state, action: PayloadAction<any>) {
      const index = state.categories?.findIndex((category) => category.item.id === action.payload.item.id);
      if (index !== -1) {
        if(state.subCategories?.length! > 0){
          state.subCategories = []
        }
        state.categories?.splice(index!, 1);
      } else {
        state.categories = [...(state.categories || []), action.payload]
      }
    },
    setColores(state, action: PayloadAction<any>) {
      const index = state.colores?.findIndex((color) => color.item.name === action.payload.item.name);
      if (index !== -1) {
        state.colores?.splice(index!, 1);
      } else {
        state.colores = [...(state.colores || []), action.payload]
      }
    },
    setDiscount(state, action: PayloadAction<boolean>) {
      state.discount = action.payload;
    },
    setFeatures(state, action: PayloadAction<number[]>) {
      state.features = action.payload;
    },
    setGender(state, action: PayloadAction<string>) {
      state.gender = action.payload;
    },
    setOrderBy(state, action: PayloadAction<string>) {
      state.orderBy = action.payload;
    },
    setPageNumber(state, action: PayloadAction<number>) {
      state.pageNumber = action.payload;
    },
    setSeasones(state, action: PayloadAction<number[]>) {
      state.seasones = action.payload;
    },
    setSizes(state, action: PayloadAction<any>) {
      state.sizes = action.payload;
    },
    setSubCategories(state, action: PayloadAction<any>) {
      const index = state.subCategories?.findIndex((subCat) => subCat.item.name === action.payload.item.name);
      if (index !== -1) {
        state.subCategories?.splice(index!, 1);
      } else {
        state.subCategories = [...(state.subCategories || []), action.payload]
      }
    },
    setLimit(state, action: PayloadAction<number>) {
      state.limit = action.payload;
    },
    setMinPrice(state, action: PayloadAction<number>) {
      state.minPrice = action.payload;
    },
    setMaxPrice(state, action: PayloadAction<number>) {
      state.maxPrice = action.payload;
    },
    setLoadMore(state, action: PayloadAction<number>) {
      state.limit = action.payload;
    },
    clearFilters(state) {
      state.pageNumber= 1;
      state.limit= 10;
      state.search = '';
      state.isActive = false;
      state.isLoaded = false;
      state.minPrice = 10;
      state.maxPrice = 10000;
      state.categories = [];
      state.brands = [];
      state.orderBy = 'price';
      state.subCategories = [];
      state.colores = [];
      state.sizes = [];
      state.discount = false;
      state.seasones = [];
      state.features = [];
    },
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
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

} =
  blackListSlice.actions;
export default blackListSlice.reducer;

